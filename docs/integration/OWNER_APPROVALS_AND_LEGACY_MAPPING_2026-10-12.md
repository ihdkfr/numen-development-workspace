# NUMEN — Approved Legacy Integration & Current-State Audit
Updated: 12 October 2026. **Scope: project-planner changes only.** Roblox game repository `ihdkfr/SoulSurvival` is unchanged.

## Owner-approved choices (binding for new planning)
The owner answered these choices directly on 12 October 2026:

| Decision | Choice | Meaning |
|---|---|---|
| A01 / C02 | **B** | Move Hueco Mundo to its own **Roblox Place in the same experience**, using a non-destructive staged migration of the world currently in the main place. |
| A02 / C03 | **A** | Keep **Focus** for the original 0–100 transformation/awakening meter. Call blade/body/technique/aura allocation **Channel**. Keep reiatsu reserve, output/release %, control and sensing distinct. |
| A03 / C04 | **A** | Expanded ~80-minute Soul Reaper Academy stays **on hold**. Existing classes, exams and Academy code must not be erased. |
| A04 / C11 | **A** | Sōkatsui is a **volumetric 3D blue spiritual-flame burst** (concentrated white-blue core; jagged blue flame lobes visible from all sides) and **not** just Cero recoloured as a narrow beam. |
| A05 / C07 | **A** | Use the **newer ten-line Hollow redesign** mainly on a shared humanoid rig. Historical quadruped/flyer proposals are superseded; individual model sheets still require approval. |

**Unchanged prior owner decisions:** human-in-Karakura start, Hollow rebirth in Hueco Mundo, locked Standard Cero appearance, stylised anime direction, fair and independently-tested task completions. Reuse existing game code; do not assume that any feature described in the old plan is necessarily in a playable state.

## Non-destructive integration policy
- The independent NUMEN baseline retains **20 phases / 281 original task entries**. Neither its original task IDs nor saved team edits are overwritten.
- The full original plan is archived at [SoulSurvival_original_plan_2026-10-12.md](../legacy/SoulSurvival_original_plan_2026-10-12.md): **9 phases, 63 parent tasks, 93 subtasks**.
- 63 curated parent links and 93 *provisional inherited* subtask links are stored in `legacy-plan.js`, total 156 source entries.
- 19 codebase implementation-status records are additionally linked to 60 NUMEN tasks. Implementation reports are *not equivalent* to Studio tests.
- `legacy-plan.js` carries the approved decisions, conflict register, old task metadata, and supplemental instructions for 36 current roadmap tasks.
- The live site adds an **Approved designs** page, **Plan reconciliation** page, and task-detail panels showing source links, the owner's direction, and reported game code.
- These records are **read-only planning evidence**; actual task progress, assignments, attachments, and approvals continue to use the team cloud database unchanged.

## A01: Hueco Mundo separate-Place migration runbook
Affected tasks: `02.04`, `09.20`, `13.01`, `13.06`, `13.10`, `13.11`, `13.13`, `17.07`.

1. **Audit existing source and assets:** locate current Hueco Mundo terrain generator, server/client world services, coordinates, lighting, Las Noches, Menos Forest, AI spawn markers, portals and feature flags in `SoulSurvival`. Confirm which are source controlled and which reside only in a Roblox `.rbxl` or published Place.
2. **Create a recoverable snapshot:** save and version existing place + assets, note Roblox Place IDs, store test instructions. Avoid deleting/rebuilding the working main-place world.
3. **Create a second Roblox Place** within the **existing game experience/universe**, not a second unrelated experience. Keep it private/test-only until verified.
4. **Prepare destination:** transfer/reuse the current Hueco Mundo terrain/materials and server-client modules as appropriate; refactor any reliance on global main-place coordinates. Preserve the approved landscape/art direction.
5. **Spawn and travel contracts:** add valid Hueco Mundo spawn for new Hollows, Garganta destination/return and server-side access checks. Keep the Human World/Rukongai access rules.
6. **Persistence:** test a living character's profile across TeleportService boundaries, death/rejoin, interrupted teleport and destination-server failure. Never create duplicate player data or overwrite a valid profile with a blank record.
7. **Performance:** verify startup, client FPS, server memory, terrain loading and multiple accounts, including phone and 2+ clients. Compare StreamingEnabled OFF with measured alternatives **only after C16 is answered**.
8. **Acceptance and cutover:** sign off entry and exit, spawn safety, saved progression, visual appearance and rollback path in a published test environment. **Only then** propose retirement of the original main-place Hueco Mundo, requiring a separate explicit approval.

This is an architectural target, **not a claim the migration has been executed**. The older runbook is retained as art/engineering source material, even where its same-place assumption is now superseded.

## A02: Reiatsu channel contract
- **Focus:** existing 0–100 transformation progression/meter, with historically noted feature-gated thresholds 30/60/85/100. Verify present code before editing.
- **Channel:** distribution of available spiritual output to **Blade**, **Body**, **Technique**, **Aura** (or Auto, if approved later). It is not the Focus meter.
- **Reserve:** total/current reiatsu pool. **Release %:** share of personal maximum, not relative power across characters. **Control:** efficiency/stability. **Sensing:** observer-relative perception and concealment.
- Suggested Alt+key controls from old research remain a **proposal**, requiring a collision audit with existing inputs, gamepad and touch.
- Accept only when independent game services and UI cannot accidentally mix up Focus and Channel. Server validates resource state and pressure constraints.

## A03: Academy hold
Keep the old Academy research, 80-minute outline, class subjects, NPC concepts, rolling lesson system, clock and dorm proposals discoverable. Do **not** delete source code. Newly scoped expanded Academy content waits; basic existing Academy mechanics remain subject to verification and existing feature switches. Do not mark on-hold tasks done just because a code module exists.

## A04: Sōkatsui volumetric flame
Visual target: violent blue flame eruption with concentrated white-blue centre, broad uneven layers, sharp tongues of flame and a genuine three-dimensional silhouette visible from front/back/left/right/top. Avoid laser/2D billboard look. Blender planes/meshes and procedural/particle tricks are tools rather than a reason to stop at three flat overlapping textures. Benchmarks: multi-angle in-engine captures, mobile quality tier, memory/FX budget, readable telegraph and ability integration. Keep Standard Cero visually locked; share only suitable supporting code/shape primitives.

## A05: Hollow redesign
The new ten-line concept direction supersedes the **older** ten species/rig plan; mainly humanoid rigs, reusable animation base and per-line bone plates, masks and silhouettes. Old approved prototypes and the visual quality gates remain reference material, but a later concept must not automatically overwrite any individually locked asset without sign-off. Do not treat the ten line designs as ten completed working models.

## Current implementation truth
Source references: [SoulSurvival game repository](https://github.com/ihdkfr/SoulSurvival/tree/rukongai-v2), especially `src/shared/Config.lua`, `docs/BUILD_REPORT_89_ONWARD.md`, `docs/UPDATE_2026-09-25.md`, `docs/plan/OWNER_PRIORITY_OVERRIDE.md`, `docs/plan/CONTRADICTIONS.md`.

- The checked game source reports **Config.Build 245**; older September handover screenshots and tests were made on earlier builds, not a claim Build 245 was Studio-verified.
- Code for first-life/Plus, Hollow, Soul Reaper, Quincy, Fullbring, Reiatsu, fights, progression, worlds and saving is extensive, often controlled by feature flags or needing assets and runtime validation.
- The game repo's owner's verification rule says **done means played in Studio**, Output clean, client FPS budget and visual approval. Do not auto-complete NUMEN tasks from old checkboxes or source-file presence.
- Historic owner notes also say **StreamingEnabled remains OFF**; this can clash with a streamed separate world design and is now conflict **C16**.

## Remaining decisions, not changed by this update
| ID | Issue | A | B |
|---|---|---|---|
| C05 | Power rerolls | Earned/free realignment only | Optional 79 Robux non-random convenience alongside free access |
| C06 | Character slots | Separate characters; no slot-to-slot benefits | Modest Spiritual Legacy energy/growth bonus to later slots |
| C09 | Dangai travel | Safe authorised Senkaimon, dangerous story/unauthorised Dangai | Dangerous sweeper on normal routes too |
| C10 | Legacy progress | Preserve marks as evidence until separately tested | Auto-import old completion marks into new progress (not recommended) |
| C12 | Canon teacher names | Original NPC teachers; anime references remain research only | Named canon guests **only with rights** |
| C13 | Neon rule | Restrict Neon to small cores/accent use while respecting current locked art | Enforce historic zero-Neon rule everywhere |
| C14 | First task 00.01 | Audit existing GDD and code rather than rewrite | Start a fresh GDD ignoring existing work |
| C15 | Visual references | Only newest owner-approved sheets control new art | Treat all archived references as approved, including superseded versions |
| C16 | StreamingEnabled | Keep OFF during migration until measured tests justify reconsideration | Allow ON in dedicated Hueco Mundo after explicit performance benchmarks |

All are left **unresolved** pending user direction; the recommendation does not approve an option.

## Ownership and collaborative workflow
In the NUMEN website, use **Team & activity** to assign any task to a signed-in teammate or reserve it until they join. The task stays one shared record, and any changes/approvals appear in the team history. Use task notes, images and checklist results to prove that the current code passes the game's Studio requirements.

The live code is in [NUMEN workspace repository](https://github.com/ihdkfr/numen-development-workspace). Separate GitHub commits control the website; team task data stays in Supabase, unaffected by these planning integration commits.
