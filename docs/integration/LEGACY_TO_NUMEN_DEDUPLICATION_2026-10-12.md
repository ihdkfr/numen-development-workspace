# SoulSurvival → NUMEN: non-destructive reconciliation and overlap register
Prepared 12 October 2026. **Planning integration only; no game development is authorised by this document.**

## Actual plans compared
- **Current organising plan:** 20 phases, 281 numbered NUMEN seed tasks (read from `index.html#seedData`). Maintain IDs, content, phase order, and all user/team overrides.
- **Old plan:** 9 phases, 63 parent items and 93 subtasks (156 entries), preserved verbatim in `legacy-plan.js` and `docs/legacy/SoulSurvival_original_plan_2026-10-12.md`.
- **Existing link coverage:** all 156 original entries already have a primary destination; 63 parent links are curated, 93 subtask links provisional. A primary destination is **not** proof that the entire old item is covered by that one new task.
- **Previous approvals:** A01–A05 and C16–C40 are planning requirements, not completed work. Design choices must never silently change the new task status.
- **Work verification:** distinguish prior checklist ticks, code present, Studio-verified playtest, visual lock, owner-approved design, deferred work, and rejected historical variants.

## Merge rule: integrate requirements, do not clone tasks
A single old item can describe several responsibilities now separated across the independent roadmap. Keep one **canonical NUMEN task per deliverable**, attach the old task as supporting context, and add cross-links to other tasks when the old requirement covers multiple disciplines. Never copy the original task wholesale into each destination. Avoid granting completion across related tasks on the basis of any old checkboxes.

## Specific overlapping items and their canonical owners
| Legacy item / topic | Primary existing mapping | Additional required cross-link and rule |
|---|---|---|
| legacy-001 Standard Cero visual | 16.05 VFX core | 12.04 projectile mechanics, 17.06 fight performance; locked visual **must not be rebuilt** |
| legacy-007 Cero camera shake | 16.05 VFX core | 03 camera/feedback and 17 performance/testing; only camera feedback is open |
| legacy-012 Cero sound | 16.11 sound bus | 16.05 effect hooks; source/licence verification stays part of sound delivery |
| legacy-034 / legacy-038 Hollow art bible/ten lines | 09.01 evolution graph | 09.03 rig, 09.12 Adjuchas and 16.09 character art; latest owner-approved ten-line humanoid direction supersedes older Q/F rig requirements |
| legacy-041 / legacy-052/071 Hollow model designs | 09.12 / 09.03 | Retain as historical design evidence, not locked build requirements when superseded by C07 |
| legacy-068 rig and animations | 03.11 animation priority | 09.03 playable rig and 16.09 model-kit QA; priority rules alone do not complete an animation set |
| legacy-080 / legacy-132 Hueco own Place | 13.10 portals | 13.06 desert, 13.11 load optimisation, 13.13 navigation, 09.20 Garganta; C16–C40 are future-stage requirements |
| legacy-141 Zanpakutō personal/inner world | 08.14 spirit interaction | 08.01 progression design and 12 transformations/abilities; keep bond and persistent inner world distinct |
| legacy-142 Spiritual Legacy | 02.02 profile loading | Do not implement cross-slot bonuses until C06 is decided; independent per-character slots are maintained |
| legacy-143 Reiatsu / Focus | 12.10 release/conceal | 12.01 ability state and 12.09 sensing; Focus vs Channel distinction approved C03 |
| legacy-145 spiritual pressure | 12.11 pressure field | 12.09 sensing and 15 fair PvP; no unapproved permanent griefing zones |
| legacy-147 Garganta | 09.20 Hollow travel | 13.10 portals, 13.13 recovery; C18/C19 supersede same-Place travel concept as final target |
| legacy-148 Dangai / Senkaimon | 13.10 portals | Story travel and route risk unresolved C09: do not select normal-route sweeper difficulty by inference |
| legacy-149–152 Academy | 08.05/08.09/08.11/13.05 | Existing Academy code retained, expanded 80-minute Academy content ON HOLD under C04 |
| legacy-155 superseded design log | 00.09 lore/IP decision ledger | Historical proposals remain readable; only newest owner-approved choice drives work |

## Plan inconsistencies requiring amendment of task *guidance*, not source tasks
1. **NUMEN 00.01** says 'Write a one-page game pitch' as if no game exists. Existing `docs/GAME_DESIGN.md`, `docs/MASTER_SPEC.md` and old plan must be audited first. The independent seed title remains; fulfilment means reconcile and confirm the existing pitch, not overwrite it. Historic conflict C14 should record this as the recommended default, but is *not automatically approved*.
2. **NUMEN 13.11** says 'Add streamed world optimisation'. The owner explicitly chose **C16 A / C17 A**, StreamingEnabled OFF and no custom region unloading. Interpret 13.11 as optimising full-place loading, LOD, asset budgets and benchmarks. Do not silently switch streaming on.
3. **NUMEN 09.20 / 13.10** and the historic game Garganta use same-Place movement. The future destination is another Roblox Place (A01, C18, C19). Reuse existing effects and progression while adding cross-Place transport only when scheduled and approved.
4. **NUMEN 08.05–08.11** references a playable Academy slice. Maintain existing gameplay and tests. Do not treat the expanded Academy curriculum and dorm proposal as in-progress under the current C04 hold.
5. **NUMEN 16.05** covers VFX broadly. Standard Cero is visually locked, whereas Sōkatsui has an approved 3D flame direction and still requires modelling. Sharing VFX infrastructure does **not** authorise changing Standard Cero.
6. **Hollow forms and models:** superseded old Q/F body designs are reference history, not implementation instructions. The current humanoid ten-line design is the source direction; approved individual sheets still govern locked assets.
7. **Legacy check marks vs NUMEN completion:** C10 remains formally unresolved, but the existing non-destructive policy already forbids automatic completion from legacy ticks. Continue this safe default pending explicit owner choice.
8. **Character-slot inheritance, power reroll purchases, normal Dangai risk, canon teacher appearances, Neon blanket ban, visual-reference authority** remain undecided items C05/C06/C09/C12/C13/C15. Do not implement competing alternatives.

## Recommended continuation of the actual workspace project
1. Validate all **63 curated** and **93 provisional** mappings; prioritise the cross-domain items above and anything where a provisional subtask title does not actually match its destination.
2. For each canonical task attach concise **requirements inherited**, **existing code reference**, **approved design**, **acceptance evidence still required**, **dependencies**, and **historical/superseded notes**. Do not copy the old plan indiscriminately into the task description.
3. Surface overlaps using cross-links instead of creating redundant tasks or moving their old IDs.
4. Resolve only genuine policy choices that affect near-term tasks, in small grouped owner questions. Never ask unrelated world-design questions.
5. Reconcile team status in a separate later operation, only after protected backups, authenticated owner approval and Studio evidence. **No Supabase mutation as part of this merge**.

## Change-control boundaries
This register is additive, may be cross-linked from task guidance, and does not change the 281 canonical task definitions, team progress, original archive, Roblox code, game assets or published Places.
