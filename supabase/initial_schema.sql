-- NUMEN Development Workspace · Cloud collaboration schema
-- Run ONCE in Supabase > SQL Editor, using your own Supabase project.
-- Uses Supabase Auth identities, private team membership, RLS, record revisions,
-- an authenticated activity log and private file attachments.
-- IMPORTANT: Never paste your Supabase service_role or secret API key into the HTML.

create extension if not exists pgcrypto;

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text not null unique default encode(gen_random_bytes(12), 'hex'),
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  team_id uuid not null references public.teams(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null check (role in ('owner','member')),
  joined_at timestamptz not null default now(),
  primary key (team_id,user_id)
);

create table if not exists public.workspace_items (
  team_id uuid not null references public.teams(id) on delete cascade,
  item_id text not null,
  payload jsonb not null default '{}'::jsonb,
  revision integer not null default 1,
  updated_at timestamptz not null default now(),
  updated_by uuid not null references auth.users(id),
  primary key (team_id,item_id),
  constraint item_id_length check (length(item_id) between 2 and 140)
);

create table if not exists public.item_events (
  id bigint generated always as identity primary key,
  team_id uuid not null references public.teams(id) on delete cascade,
  item_id text not null,
  actor_id uuid not null references auth.users(id),
  summary text not null,
  created_at timestamptz not null default now()
);
create index if not exists idx_numen_events_team on public.item_events(team_id,created_at desc);

-- SECURITY DEFINER helpers avoid recursive RLS lookups on team_members.
create or replace function public.numen_is_member(p_team uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.team_members where team_id=p_team and user_id=auth.uid());
$$;
create or replace function public.numen_is_owner(p_team uuid)
returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.team_members where team_id=p_team and user_id=auth.uid() and role='owner');
$$;

alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.workspace_items enable row level security;
alter table public.item_events enable row level security;

create policy "NUMEN read my teams" on public.teams for select to authenticated using(public.numen_is_member(id));
create policy "NUMEN read my members" on public.team_members for select to authenticated using(public.numen_is_member(team_id));
create policy "NUMEN read my work" on public.workspace_items for select to authenticated using(public.numen_is_member(team_id));
create policy "NUMEN read my audit log" on public.item_events for select to authenticated using(public.numen_is_member(team_id));
-- No direct INSERT/UPDATE/DELETE policies for workspace, memberships or event logs.
-- Mutations happen through the protected RPC functions below.

grant select on public.teams, public.team_members, public.workspace_items, public.item_events to authenticated;

create or replace function public.numen_create_team(p_team_name text,p_display_name text)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_team uuid;
begin
  if auth.uid() is null then raise exception 'Please sign in'; end if;
  if length(trim(coalesce(p_team_name,''))) not between 2 and 100 then raise exception 'Team name must have 2–100 characters'; end if;
  if length(trim(coalesce(p_display_name,''))) not between 1 and 70 then raise exception 'Please enter your display name'; end if;
  insert into public.teams(name,created_by) values(trim(p_team_name),auth.uid()) returning id into v_team;
  insert into public.team_members(team_id,user_id,display_name,role) values(v_team,auth.uid(),trim(p_display_name),'owner');
  return v_team;
end $$;

create or replace function public.numen_join_team(p_invite_code text,p_display_name text)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_team uuid;
begin
  if auth.uid() is null then raise exception 'Please sign in'; end if;
  if length(trim(coalesce(p_display_name,''))) not between 1 and 70 then raise exception 'Enter a display name'; end if;
  select id into v_team from public.teams where invite_code=lower(trim(coalesce(p_invite_code,'')));
  if v_team is null then raise exception 'Invite code not recognised'; end if;
  insert into public.team_members(team_id,user_id,display_name,role)
  values(v_team,auth.uid(),trim(p_display_name),'member')
  on conflict (team_id,user_id) do update set display_name=excluded.display_name;
  return v_team;
end $$;

create or replace function public.numen_save_record(
  p_team_id uuid,p_item_id text,p_payload jsonb,p_expected_revision integer,p_summary text
) returns jsonb language plpgsql security definer set search_path=public as $$
declare
  v_revision integer;
  v_previous jsonb;
  v_prev_status text;
  v_new_status text;
  v_payload jsonb;
  v_exists boolean;
begin
  if auth.uid() is null or not public.numen_is_member(p_team_id) then raise exception 'Not an authorised team member'; end if;
  if length(coalesce(p_item_id,'')) not between 2 and 140 then raise exception 'Invalid record id'; end if;
  if jsonb_typeof(p_payload) <> 'object' then raise exception 'Payload must be a JSON object'; end if;
  if octet_length(p_payload::text) > 524288 then raise exception 'Record too large; store media in storage, not JSON'; end if;
  if length(coalesce(p_summary,'')) > 250 then raise exception 'Activity message too long'; end if;
  select revision,payload into v_revision,v_previous
    from public.workspace_items where team_id=p_team_id and item_id=p_item_id for update;
  v_exists:=FOUND;
  v_payload:=p_payload;
  v_prev_status:=coalesce(v_previous->>'status','todo');
  v_new_status:=coalesce(v_payload->>'status','todo');
  if p_item_id like 'task:%' then
    if v_prev_status='done' and v_new_status<>'done' and not public.numen_is_owner(p_team_id) then
      raise exception 'Only the team owner may reopen approved work';
    end if;
    if v_new_status='done' and v_prev_status is distinct from 'done' then
      if not public.numen_is_owner(p_team_id) then raise exception 'Only the team owner can approve a completed task'; end if;
      v_payload:=jsonb_set(v_payload,'{approvedBy}',to_jsonb(auth.uid()::text),true);
      v_payload:=jsonb_set(v_payload,'{completedBy}',to_jsonb(coalesce(v_previous->>'completedBy',auth.uid()::text)),true);
      v_payload:=jsonb_set(v_payload,'{approvedAt}',to_jsonb(now()::text),true);
    elsif v_new_status='review' then
      v_payload:=jsonb_set(v_payload,'{completedBy}',to_jsonb(case when v_prev_status='review' then coalesce(v_previous->>'completedBy',auth.uid()::text) else auth.uid()::text end),true);
      v_payload:=jsonb_set(v_payload,'{approvedBy}','""'::jsonb,true);
      v_payload:=jsonb_set(v_payload,'{approvedAt}','""'::jsonb,true);
    elsif v_prev_status='done' and v_new_status<>'done' then
      if not public.numen_is_owner(p_team_id) then raise exception 'Only the team owner may reopen approved work'; end if;
      v_payload:=jsonb_set(v_payload,'{approvedBy}','""'::jsonb,true);
      v_payload:=jsonb_set(v_payload,'{approvedAt}','""'::jsonb,true);
    end if;
    -- Stop anyone other than the owner from silently changing completion approvals.
    if v_new_status='done' and v_prev_status='done' then
      v_payload:=jsonb_set(v_payload,'{completedBy}',to_jsonb(coalesce(v_previous->>'completedBy',auth.uid()::text)),true);
      v_payload:=jsonb_set(v_payload,'{approvedAt}',to_jsonb(coalesce(v_previous->>'approvedAt',now()::text)),true);
    end if;
    if not public.numen_is_owner(p_team_id) and v_new_status='done' and v_prev_status='done' then
      if (v_payload->>'approvedBy') is distinct from (v_previous->>'approvedBy') then
        raise exception 'Only the team owner can change an approval';
      end if;
    end if;
  end if;
  if v_exists then
    if v_revision<>p_expected_revision then raise exception 'NUMEN_CONFLICT: task was edited elsewhere. Refresh before saving.'; end if;
    update public.workspace_items
       set payload=v_payload,revision=revision+1,updated_at=now(),updated_by=auth.uid()
     where team_id=p_team_id and item_id=p_item_id returning revision into v_revision;
  else
    if p_expected_revision<>0 then raise exception 'NUMEN_CONFLICT: task record changed. Refresh.'; end if;
    insert into public.workspace_items(team_id,item_id,payload,revision,updated_by)
      values(p_team_id,p_item_id,v_payload,1,auth.uid()) returning revision into v_revision;
  end if;
  insert into public.item_events(team_id,item_id,actor_id,summary)
    values(p_team_id,p_item_id,auth.uid(),left(coalesce(p_summary,'updated a record'),250));
  return jsonb_build_object('version',v_revision,'data',v_payload);
end $$;

revoke all on function public.numen_create_team(text,text) from public,anon;
revoke all on function public.numen_join_team(text,text) from public,anon;
revoke all on function public.numen_save_record(uuid,text,jsonb,integer,text) from public,anon;
revoke all on function public.numen_is_member(uuid) from public,anon;
revoke all on function public.numen_is_owner(uuid) from public,anon;
grant execute on function public.numen_create_team(text,text),public.numen_join_team(text,text),public.numen_save_record(uuid,text,jsonb,integer,text),public.numen_is_member(uuid),public.numen_is_owner(uuid) to authenticated;

-- Images and other attachments are private; paths begin with team UUID.
insert into storage.buckets(id,name,public,file_size_limit)
values('numen-assets','numen-assets',false,8388608)
on conflict(id) do nothing;
create policy "NUMEN member can download files" on storage.objects for select to authenticated
  using(bucket_id='numen-assets' and public.numen_is_member((split_part(name,'/',1))::uuid));
create policy "NUMEN member can upload files" on storage.objects for insert to authenticated
  with check(bucket_id='numen-assets' and public.numen_is_member((split_part(name,'/',1))::uuid));
-- No UPDATE/DELETE file policies by default: old files may remain until an owner does cleanup.

-- Enable realtime for task updates (run only once; may already be added).
alter publication supabase_realtime add table public.workspace_items;
alter publication supabase_realtime add table public.item_events;