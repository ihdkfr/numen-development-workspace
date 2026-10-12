# NUMEN Development Workspace

The **NUMEN Command Centre** is a browser-based development planner for a two-person Roblox game team.

- **Live site:** https://numen-development-workspace.pages.dev
- **Source:** `index.html`; Cloudflare Pages deploys the GitHub `main` branch.
- **Database:** Supabase project `rvvilkqxphdpkepojwnr` (London / eu-west-2).
- **Schema:** `supabase/initial_schema.sql` (already applied to the existing project; **do not rerun blindly**).
- **Plan:** The Soul Survival plan (14 phases, 182 tasks, owner decisions, codex) is in `data/plan-data.js` and `data/codex-data.js`, with images in `plan-assets/`. It replaced the earlier NUMEN blueprint on 13 Oct 2026; that blueprint, the original-plan data and any team records made for it are kept on the **Archive** page and in `archive/`. See `docs/PLAN_MOVE_2026-10-13.md`. Task changes, comments, ideas, custom combat designs and media metadata are saved separately in Supabase.

## First-time team setup

1. In [Supabase > Authentication > URL Configuration](https://supabase.com/dashboard/project/rvvilkqxphdpkepojwnr/auth/url-configuration), set **Site URL** to `https://numen-development-workspace.pages.dev` and add the same URL (and `https://numen-development-workspace.pages.dev/**` if needed) to **Redirect URLs**. Save.
2. Visit the [NUMEN website](https://numen-development-workspace.pages.dev), click **Enable team sync** in the sidebar, then create an email/password account. Confirm the email if prompted.
3. The first account clicks **Create team**. This account becomes the owner and alone may approve completed tasks.
4. Go to **Team & activity** and copy the invitation code. Give it privately to your teammate.
5. The teammate opens the same website, creates their own email/password account and chooses **Join existing team** with the invitation code.
6. Both accounts should see the same workspace. Test by adding a note to one task, then refreshing on the other computer.
7. If either person edited tasks in **local-only mode** first, use **Settings > Import saved local work** after joining the team. This imports records missing from the team; existing shared records are deliberately skipped to avoid overwrites. Export a **full backup** before importing.

## Collaboration and permissions

- The Supabase *publishable* key in the public website is intentionally public. **Never** commit Supabase secret keys, service-role keys, passwords or private tokens.
- All shared planning data is stored in RLS-protected tables and cannot be read anonymously.
- Attachments use a private Supabase Storage bucket; only team members may fetch signed URLs.
- Each save carries a revision number. When a teammate's change conflicts, refresh and review before saving again.
- A server-side activity log records authenticated actions.
- The plan's tasks remain available even if the shared database has no edits. Records saved for the earlier blueprint are never deleted; they appear on the Archive page.

## Recovery and safe editing

- Use **Settings > Export full backup** regularly. A code backup in GitHub does **not** contain your team task records.
- The local workspace is separate from cloud mode. If you log out, locally saved edits will still be on that browser.
- Update `index.html` in GitHub: Cloudflare automatically publishes changes to the same URL.
- All code changes should preserve the plan's source data, tasks, media and team security rules.
- Free-tier quotas apply; large attachments may hit the current 8 MB per-file limit.
- The hosted website is publicly reachable, even though shared team records require authentication. Hosting privacy would require an additional access-control layer.

## Important notes

Supabase Auth **URL configuration requires a one-time dashboard setting**, since the currently available connection does not expose it. Email authentication must be tested using your real accounts; the software and schema were deployed without creating anyone's account.
