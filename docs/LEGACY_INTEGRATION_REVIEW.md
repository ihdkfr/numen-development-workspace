# NUMEN — Existing Game + Legacy Design Integration Review
**Prepared 12 October 2026. No destructive merge performed.**

## 1. Integration policy — preserve, don't replace

- **Existing authoritative game implementation:** private GitHub repo `ihdkfr/SoulSurvival`, default branch `rukongai-v2`. Its currently visible `src/shared/Config.lua` says **Build 245**; the later 9 October export mentions **local Build 246** for some terrain experiments. This proves neither the local build is pushed nor that every coded feature is Studio-tested. Confirm the running Studio build before declaring features complete.
- **Existing design/task history:** original `# Soul Survival plan.txt` (9 phases and detailed notes, task owners and old completion marks). This is stronger evidence for the *original plan's* statuses than the newly generated roadmap, but does not automatically establish acceptance of the corresponding new roadmap task.
- **Independent roadmap:** 20 phases / 281 *new* tasks; serves as the organising sequence, not the replacement for your earlier design decisions.
- **Soul Reaper research:** `Life_of_a_Soul_Reaper_COMPLETE_Game_Design_Research_Master.docx` (25 main chapters, embedded images and caveats). It includes a *Rukongai-first* design, but a newer original-plan note says human-in-Karakura start should be retained; see decision C1.
- **Earlier discussions:** include the **Soul Record** (choices, teachers, relationships, failures, Division and their effects on the inner spirit/awakening), reiatsu system, Blender Sōkatsui exploration, locked approved reference sheets and existing Rukongai/Seireitei work. Where these are reported from conversation rather than a verified code file, tag them `CONVERSATION / DESIGN`, not `BUILT`.
- **Shared NUMEN planner:** online Supabase workspace may contain new edits; **do not reset, wholesale import, or overwrite its 281 seed tasks or team activity**. A new mapping should only add links/specifications and proposed verification work until reviewed.

### Status vocabulary to use consistently

- `DESIGN / OWNER-APPROVED`: a decision or visual target has been chosen; does **not** mean built.
- `CODE PRESENT / NOT STUDIO VERIFIED`: implementation exists but is not known to work in Studio.
- `STUDIO VERIFIED`: tested running in Roblox Studio with evidence.
- `VISUAL LOCKED`: no creative changes except allowed maintenance; for Standard Cero, owner phrase **“unlock the Cero”** is required before changing the effect structure.
- `IN PROGRESS`, `PLANNED`, `ON HOLD`, `SUPERSEDED`, `REQUIRES DECISION`.
- Only completed + accepted tasks increase the finished-progress counter. Prior work should create verification tasks where necessary.

## 2. Design areas to merge without removing the independent build order

| Design group | Specific concepts and existing history to preserve | Destination in NUMEN |
|---|---|---|
| Human / ghost opening | ordinary human Karakura, spiritually aware everyday life, school, spirit sightings, Hollow encounter, death into Plus, choices and Konsō | Codex: Opening & Death / Roadmap 07–08 |
| Soul Record | event/deed timeline; choices, relationships, teachers, setbacks, reputation and Divisions feed personalised stories, spirit temperament and transformations | Codex: Soul Record / Roadmap 02, 06–08 |
| Reiatsu foundations | Reiryoku reserves, true Reiatsu output, control, concealment, own-max release %, uptime drain, perception and Reikaku | Codex: Spiritual Energy / Roadmap 12 |
| Reiatsu concentration / routing | blade/body/technique/aura channels, auto mode, input modifier concept Alt+wheel and contextual shortcuts; separate 0–100 form-gating resource currently called focus | Codex + Combat mechanics + HUD / Roadmap 03, 08, 12 |
| Pressure and danger | one server-side physical pressure field; observer-relative visual/sensory response; slow, kneel, hands-and-knees, possible death in allowed zones with protection against unavoidable griefing | Codex + Combat mechanics / Roadmap 04, 12, 15 |
| Soul Reaper beginner | Rukongai discovery, Academy recruitment, admission, teaching/trials, field training, officer duties, personalised Shikai, eventual Bankai, divisional rank | Codex: Soul Reaper Life / Roadmap 08 |
| Academy complex | monumental white-and-gold exterior; 80-minute on-demand first-run design; classes and canon guest teachers; 24-minute day/night (16+8), ~36 players/campus server, 12/class, ~100 dorm beds/campus; flexible roommates; graduation/exams need design | Codex: Academy (currently ON HOLD) / Roadmap 08 & 13 |
| Zanpakutō | Soul Imprint six traits, three player choices, trial, modular persistent Inner World, spirit bond, Asauchi→Shikai→Bankai, curated 100-power library in prior roadmap | Codex + Combat move library / Roadmap 08, 12 |
| Spiritual Legacy | later slots have unrelated characters; possible nonstacking earned starting-energy/growth bonus from best earlier character, no power skills inherited | Codex: Character Slots / Roadmap 02 & 08 — decision required |
| Hollow origins | Plus/Chain encroachment, Hueco-only birth; living-world Hollow attacks are arrivals through Garganta; Seireitei barriers restrict routes | Codex: Hollow Life / Roadmap 09 & 13 |
| Hollow evolution | Fishbone→Gillian→Adjuchas→Vasto Lorde→Arrancar/Resurrección; appetite, instinct, regression risk, forms and combat roles | Codex + Combat / Roadmap 09 & 12 |
| Hollow design bible | ten original aspects/animals: Kaijin, Polilla, Hiena, Ciervo, Alcaudón, Medusa, Escarabajo, Anguila, Buitre, Oso/Avispa variants; confirm original roster numbering using actual art bible | Codex: Hollow Species + asset/approval refs / Roadmap 09 & 16 |
| Hollow modelling pipeline | Blender R15 rigs, body H/Q/F decisions, parameterised bone-plate kit, species materials, model QA captures and export to Studio; prior rejected iteration imagery should not be accepted | Assets + Codex: Model Pipeline / Roadmap 09, 16 |
| Standard Cero | red Grimmjow-inspired effect, in-game 76/100 visual locked 11 Oct; open tasks: limited camera pulse, sound sourcing, performance/LOD; do not alter visual structure | Combat & VFX: move + VFX entry, linked to Roadmap 12/16/17 |
| Kidō / related attacks | Gran Rey Cero, Cero Oscuras, Bala, Hadō Shakkahō, Sōkatsui, Byakurai; Bakudō Sai and Rikujōkōrō; reusable shape classes; latest Sōkatsui 3D flame direction must be reconciled | Combat & VFX with separate move/VFX/animation/audio nodes / Roadmap 12/16 |
| Hueco Mundo world | white dunes, black cliffs, Menos Forest sinkholes, Las Noches primary dome and towers, six visual concepts, no fake night, landscape scale 5x proposal, bake-once tests, place/streaming decision | Codex: World + Assets + Roadmap 13 |
| Soul Society / Rukongai | radial Seireitei, four Great Gates, 13 Divisions, Central 46, Sōkyoku, 320 planned Rukongai districts, W01 Junrinan benchmark; 29 Sep owner brief supersedes early moats and layouts | Codex: World + Asset references / Roadmap 13 |
| Multiple races | Shinigami, Hollow, Quincy, Fullbringer; prior source code also includes Visored route; keep the implemented systems in inventory while alpha/beta scope remains deliberately smaller | Codex: Race Mechanics / Roadmap 08–11 |
| Combat and multiplayer | lights/heavies, blocking, parry, dodge, flashstep, grab, guard breaks, aerial, counterplay, lag compensation, PvP safety and ranked/faction play | Combat mechanics / Roadmap 03–05, 12, 15 |
| Living world and systemic RPG | NPC schedules, shops, memory and relationships, spiritual-layer perception, soul balance, dynamic realm incidents, missions, raids, social/faction power | Codex: World Simulation / Roadmap 05–07, 14–15 |
| Tools and workflow | Rojo, Lune tests, Studio capture rig, Blender MCP, RBXMonkey feasibility, art references, source control, test runs and creator approvals; 3% Claude weekly usage cap/session in older plan is an owner working rule | Codex: Development Workflows / Roadmap 01 & 17 |
| Locked asset archive | 15 previously approved prototype sheets, Hollow masks, Rukongai/Seireitei map concepts, detailed Academy exterior and interiors; verify actual file availability before claiming an asset migrated | Assets: Approved / Rejected / Historical / Roadmap 16 |
| Branding | NUMEN project name, minimalist silver horned-mask 'N' visual on black; preserve original identity rather than generic Bleach imagery | Branding + Assets / Roadmap 00,16 |
| Monetisation | earned progression and permanent power growth; cosmetics/convenience only, no paid random ability rerolls; older document floated a paid direct change | Codex: Economy / Roadmap 18 — decision/conflict |

## 3. Conflicts / overlaps requiring an explicit owner decision

This is the **complete initial conflict list**. The first five are the only questions to answer immediately; the rest can be decided next. Each option is a legitimate documented or inferred branch, not an automatic merge choice.

**C1 — First playable spawn (FIRST WAVE).**
- A (newer original plan & game spec): player begins **human in Karakura**, undergoes the opening/Plus progression, then reaches Rukongai after Konsō.
- B (older independent Academy research): spawn as a **soul in Rukongai**, discover the Academy directly.
- Recommendation: A; preserve B as a *chapter after Konsō* rather than the initial spawn.

**C2 — Academy implementation priority (FIRST WAVE).**
- A (newer original plan): **Academy design stays ON HOLD**. Document it in full but do not mark Academy code as next work; focus on existing game/combat/world quality.
- B (independent 281 baseline): implement a minimal Academy in early Soul Reaper alpha, expand later.
- Recommendation: A until you explicitly release the hold.

**C3 — Two different things called ‘focus’ (FIRST WAVE).**
- A: separate **Reiatsu Direction/Channel** (blade/body/technique/aura) from **Form Resonance / Readiness** (0–100 resource for Shikai/Bankai gates), reserving *Concentration* for spell stability if desired.
- B: keep both labelled Focus with distinct contexts; requires UI explanation and risks confusion.
- Recommendation: A. The mechanics aren't mutually exclusive; only naming/controls are unresolved.

**C4 — Hueco Mundo architecture (FIRST WAVE).**
- A: preserve the **current main-place realm**, existing code and runbook (latest original plan says it already exists there), tune landscape size and bake strategy while keeping current `StreamingEnabled` policy unless performance testing demands change.
- B: rebuild/migrate it to a **separate Roblox place** as the earlier world-scale proposal says; use Garganta teleports and place-specific streaming. More migration risk.
- Recommendation: A for now. Current export contains both stories and a runbook-wins statement.

**C5 — Sōkatsui visual construction (FIRST WAVE).**
- A: newer Blender design direction: a **true volumetric blue-white flame burst** with overlapping 3D-angle coverage, fire motion, and Roblox-efficient VFX layering; keep compatible shared VFX primitives but not merely a recoloured Cero.
- B: original plan: a **cheap recolour/retime** of Standard Cero shape classes.
- Recommendation: A based on newer explicit requests, with cost/performance gate.

**C6 — Character slots / Spiritual Legacy (LATER WAVE).**
- A: unrelated slots share no starting power or growth advantage.
- B: unrelated slots gain a small capped and nonstacking earned starting-energy/growth bonus from the strongest previous slot; no inherited powers, name, sword or family relationship.
- Both appear in sources. Docx latter is user-corrected and later, but original plan still calls this an owner decision. Ask before implementation.

**C7 — Paid direct Zanpakutō change (LATER WAVE).**
- A: all power changes earned via gameplay; Robux cosmetic and optional storage only. This follows the existing code handover's 'never sell power' rule and user's prior decision.
- B: optional ~79 Robux *direct selection*, not random spins, alongside free progression routes (unconfirmed working proposal in Oct document).
- Recommendation: A as prior explicit preference. Do not silently add B into a shop.

**C8 — Use of brand-name characters (LATER WAVE; art/IP).**
- A: original inspiration and original names/designs, with canon figures only as unshipped research.
- B: licensed-character-style in-world teachers/cameos planned in Academy research.
- 28 Sep owner priority says **no canon characters as playable**, but does not itself settle canon NPCs or branding/licensing. Need explicit release-safe decision before production.

**C9 — Rendering rules (LATER WAVE; Cero override).**
- A: stylised anime art Bible; modest Neon on effect cores and small props, no large sky dim, no camera-facing 2D VFX pretending to be geometry; locked Standard Cero must remain untouched.
- B: earlier universal prohibition of Neon and a hard LightEmission ≤0.35.
- Newer owner art style and working Cero favour A. If selected, mark universal ban SUPERSEDED rather than trying to satisfy incompatible tests.

**C10 — Different ‘completed’ meanings (LATER WAVE, status integration).**
- A: preserve old `Done` or `Locked` as **historical state**, but new tasks remain *Needs verification* unless a current Studio test/approval proves completion.
- B: mark a matching new task Done automatically whenever older planner says Done.
- Recommendation: A to avoid deceptive dashboard percentages and loss of existing QA context.

**C11 — Original roadmap task 00.01 vs working game:** 00.01 is a vision-writing task, but a codebase, original spec, features, art and design decisions exist. Keep as an audit/ratification task that compares the actual plan and current game, not a request to invent a fresh game pitch and ignore existing scope.

**C12 — Which visual reference is approved:** Current Hollow/Academy sheets include earlier exploratory drafts and newer approved larger versions. Archive historical drafts clearly; use owner-approved version only as acceptance-test target, not every picture indiscriminately.

## 4. No-duplicate merge architecture

**Roadmap:** 281-task build order remains. Existing work is mapped to tasks with `source`, `build_version`, `proof`, `owner`, `verification_status` and legacy IDs. If a genuinely new system is missing, create a new task after owner approval, not an overlapping copy.

**Codex:** substantial game systems (Soul Record, Reiryoku/Reiatsu, personal Inner Worlds, Academy, travel, slots, world design and lore) get dedicated readable specifications. Preserve original notes and their version/LOCKED/WORKING/SUPERSEDED labels.

**Combat & VFX:** mechanics → individual attacks → visual/animation/audio designs. Standard Cero is locked; variants inherit shared primitives but cannot modify the Standard definition. Include all 10 original Hollow fighting styles, Soul Reaper techniques and pressure mechanics with linked tasks.

**Assets:** preserve approved image names, file IDs, Blender screenshot references and original source paths. Missing binary assets remain `REFERENCED / FILE NOT FOUND`, never appear as completed imports.

**Ideas Board:** genuinely undecided or speculative suggestions; do NOT silently promote them to planned mandatory tasks.

**Dashboard/Workshop:** surface `VERIFY EXISTING WORK` tasks before new development that would rebuild something already present. Select next work by prerequisites, blockers and approved status, not just the lowest numerical task ID.

## 5. Current technical evidence and next verification actions

- Game repository: visible `Config.Build = 245`, `rukongai-v2`, code areas for Hollow, Soul Reaper, Quincy, Fullbringer, Visored, combat, realms and maps. This establishes **code presence**, not a recent Studio pass.
- Old planner (11 Oct): Standard Cero V3→V10 visually rated **76/100 and locked**; reference at `docs/vfx/cero_v8/video/cero_preview.mp4`, pending camera/audio/performance work only.
- World work (9 Oct): older blueprint calls for separate Hueco place; newer runbook says match a realm **already present in the main place**, no rebuilding from zero; latest map concepts and placeholders were not all Studio verified.
- September owner priority: stylised anime (not old realism), approved radial Seireitei map, 10 Hollow forms and related variants, curated Zanpakutō library, independent image approval manifest; specific docs take precedence over older alternative art experiments.
- Online planner contains existing shared edits. First make an online **backup** and export local-mode work before any task migration.
- No production scripts or game map files have been modified as part of this review.

## 6. Merge gates (after owner answers conflicts)

1. Save full source copies in an archive with tags and provenance; filter out accidental secrets before publication.
2. Audit old task titles, descriptions, statuses, subtask owners and media references against the 281 new tasks. Link matches without duplication.
3. Create detailed Codex design sections, combat/VFX records and a separate concept archive. Mark all imported drafts appropriately.
4. Verify files and screenshots: only existing binaries are attached; referenced/missing artifacts are named as missing.
5. Create a 'Current game: Verify / Repair / Continue' intake in Workshop, deriving actual next jobs from implemented code and Studio acceptance checks.
6. Test two-user sync, approvals, edit history and rollback; protect previously saved cloud records.
7. Only then allow the updated dashboard to recommend tasks from the reconciled plan.

## 7. Source provenance

- `[LEGACY EXPORT · 12 OCT]`: `/mnt/data/# Soul Survival plan.txt` (owner's own task export; statuses and full notes preserved at source).
- `[ACADEMY RESEARCH · 9 OCT]`: `Life_of_a_Soul_Reaper_COMPLETE_Game_Design_Research_Master.docx` (25 sections, 12 image-archive subjects; headings and tables checked).
- `[PRIOR DISCUSSION]`: Soul Record and contemporary Blender Sōkatsui instructions; until matched to local script file, these are plans/experiments rather than verified shipped content.
- `[GAME REPOSITORY]`: `ihdkfr/SoulSurvival` default branch `rukongai-v2`, inspected `README.md`, `src/shared/Config.lua`, `docs/MASTER_SPEC.md`, `docs/MASTER_PLAN.md`, `docs/DEEP_DESIGN.md`, `docs/HANDOVER_CLAUDE.md`, `docs/plan/OWNER_PRIORITY_OVERRIDE.md`, `docs/plan/CONTRADICTIONS.md` (document dates/statuses vary; newer ownership decisions supersede older conflicts).
- `[NEW BASELINE]`: `NUMEN_Complete_Independent_Bleach_RPG_Blueprint.md` and `NUMEN_Independent_Planner_Import.json` (20 phases/281 proposed tasks, not a truthful count of actual work remaining).

## Appendix A — Legacy task inventory (source-preserving pointers)

These are the original top-level tasks, not replacements for the 281-task blueprint. The original export also contains subtasks and often many paragraphs of notes. Keep the source data verbatim during actual import, even though short descriptions are shown here.

| Legacy phase | Original task | Legacy status / owner | Child tasks | Related NUMEN phases | Snapshot summary |
|---|---|---|---:|---|---|
| 01 | Cero visual build (v3 → v10) | Locked, Claude Code | 5 | 12,16,17 | Beam body, bands, mouth, far-end impact and release dressing. Rated 76 in game and locked. |
| 01 | Camera shake fix | To do, Claude Code, 1 short session | 4 | 12,16,17 | The release shake is too strong and too long. Camera module only; no VFX instance is touched. |
| 01 | Sound effects | To do, Claude Code, Usman signs off by ear, 1 session | 4 | 12,16,17 | Replace the five placeholder hooks in `CeroDefinitions.Standard.sound` with real assets; hook names stay. |
| 01 | Performance pass | To do, Claude Code | 3 | 12,16,17 | Pooling, tier behaviour, mobile caps. Allowed while locked only if the High tier on PC stays pixel-identical: capture before/after from cero_side_close and |
| 02 | Gran Rey Cero | To do, Claude Code, 1 session | 3 | 12,16 | Blue, wider, longer hold; Arrancar tier. Recolour, resize and retime of the standard definition. |
| 02 | Cero Oscuras | To do, Claude Code | 0 | 12,16 | Black beam with a green rim, Vasto Lorde tier. Same kit, inverted body and rim colours. |
| 02 | Bala | To do, Claude Code | 0 | 12,16 | Short fast red bolt: mouth release strip + travel body, about 0.3 s, no hold. The Hollow's spam move, so it must be cheaper than the Cero. |
| 02 | Hadō set (recolours) | To do, Claude Code, 1 session each | 3 | 12,16 | Shakkahō, Sōkatsui, Byakurai built from the Cero shape kit (core, slivers, rings, streaks). |
| 02 | Bakudō set | To do, Claude Code | 0 | 12,16 | Sai #1, Rikujōkōrō #61 light beams; RING-THIN and STREAK classes only, world-space. |
| 02 | Texture variants library | Done, ChatGPT images, uploaded by Usman | 0 | 12,16 | band_01-03, burst_01-02, streak_01-02, ring_01-02, smoke_01, lick_01 in `assets/vfx/gen/` with SOURCES.md. Keep every variant. |
| 02 | VFX rules sheet | Done | 0 | 12,16 | No sky dim (neon and emissive instead); Neon on the core only; nothing shaped faces the camera; shape class beats name; captures cropped beside the referen |
| 03 | Hollow design bible | In progress, Claude | 2 | 09,16 | Canon, evolution ladder, Kubo's conventions, the ten lines with animal / aspect / style / gimmick / signatures / fragment / hole / Resurrección / Cero colo |
| 03 | Two-page art bible for modellers | To do, Claude Code, 1 session | 0 | 09,16 | Plate, mask, palette, silhouette and scale rules so no modeller (human or script) guesses. |
| 03 | Lock the ten lines | To do, Usman + Claude | 0 | 09,16 | Per line: animal, aspect of death, fighting style, gimmick, three signature moves, mask fragment, hole position, Resurrección name, Cero colour. |
| 03 | Decide the Fishbone roster at launch | To do, Usman | 0 | 09,16 | Ten body plans = five rigs and five animation sets, more work than the whole Adjuchas line. Keep 08 Strider, 09 Brute, 10 Crawler on body H; Q (01 Kaijin,  |
| 03 | Devour / evolution mechanic | To do, Usman | 0 | 09,16 | Eat-or-regress, partially-eaten = frozen evolution, pack-bite loyalty. Decide how much the game simulates; watch griefing and snowballing. |
| 04 | Ideas for Hollows (ten fresh line designs) | In progress, Claude designed; Usman reviews each line, Concepts ~32 h in ChatGPT · Models ~32 sessions (~96% of one weekly allowance over 10-11 weeks) + ~11 sessions engineering | 10 | 09,16 | Ten new lines built for the audience that loves Ulquiorra, Grimmjow and Starrk: aspect, personality, full Arrancar appearance, every Hollow stage from four |
| 04 | Ideas for hollows  | In progress | 0 | 09,16 | decide the type of look, traits, animal featurs and maks designs  |
| 04 | Blockouts from the sheets | To do, Usman, one afternoon; Tripo free tier (~8/month) or one cloud-GPU hour with Hunyuan3D | 0 | 09,16 | Front/side/back of each sheet → GLB blockouts for massing and silhouette only. Test Kaijin first: if one clean-up pass makes it shippable, the separate bas |
| 04 | Build the Vasto Lorde hero model | To do, Claude Code (Blender MCP), about 4–6 sessions (estimate; was a $200–500 commission) | 0 | 09,16 | The hero piece, humanoid, sets the bar the rest are judged against. Rigged FBX, clean quads, UVs, cage, T-pose, Blender source. |
| 04 | Base body H (humanoid) | To do, Claude Code (Blender MCP), or a 4-hour live session, about 3–4 sessions (estimate; was a $150–300 commission) | 4 | 09,16 | Matte dark flesh body; plates welded on separately. 6–9k tris, quad topology, UV-unwrapped, outer cage, T-pose, Blender source included. |
| 04 | Bone-plate kit (Blender bpy) | To do, Claude Code, 2–3 sessions | 6 | 09,16 | Hard-surface pieces are what scripts do well: each is a bpy function with 6–10 parameters; each plate exports as its own MeshPart under 2,000 tris. |
| 04 | Kaijin pilot (Adjuchas 01 end to end) | To do, Claude Code | 0 | 09,16 | Kit on body H, materials, rig, gates. Proves the method before the other nine. |
| 04 | Rig + animation set for body H | To do, Claude Code | 0 | 09,16 | One locomotion set, one attack set, one Cero cast. Plates ride bones rigidly; max 4 influences per vertex, none on root. RBXMonkey carries rig and animatio |
| 04 | Species materials | To do, Claude Code | 0 | 09,16 | Two SurfaceAppearances: bone (cream, roughness 0.6, baked edge darkening, emissive crack mask for enrage) and flesh (near-black, roughness 0.9). One red em |
| 04 | Adjuchas 02–10 as parameter files | To do, Claude Code, about a session each | 0 | 09,16 | Each variant is a parameter file placing kit pieces on body H's bones plus the two-colour palette. |
| 04 | Base bodies Q and F | To do | 0 | 09,16 | Only after H has proven the pipeline, and only if the animal forms are needed at launch. |
| 04 | Model gates | To do, Claude Code | 0 | 09,16 | Captures at front/side/back/threequarter beside the sheet: silhouette matches at 150 studs, plate count and placement match, four colours only, under 12,00 |
| 05 | Shared kit by stage | To do, Usman + Claude | 0 | 09,12,05 | Cero tiers, Bala, Hierro, Sonído, regeneration, Garganta: which stage unlocks each. |
| 05 | Per-line signature moves | To do, Claude Code | 0 | 09,12,05 | Three per line from the bible; each reuses the Cero shape kit (core, slivers, rings, streaks) in the line's Cero colour. |
| 05 | Resurrección (Arrancar) | To do | 0 | 09,12,05 | Returns the Hollow form: model swap to the line's plate kit, Cero colour change, Zanpakutō = mask fragment. |
| 05 | Enemy AI / fighting styles | To do, Claude Code | 0 | 09,12,05 | Per-line style from the bible (ambusher, brawler, swarm, ranged). Hollows spam Cero, so every effect they use must stay cheap. |
| 06 | Hueco Mundo design and build guide | In progress, Claude researched; Usman approves, ~20 Claude Code sessions (~60% of a weekly allowance) + ~6 h of your time | 0 | 13,09,17 | Verdict on the six concepts, canon requirements, what Peroxide, Project Mugetsu and Type Soul do, art direction rules, world layout, the Roblox build metho |
| 06 | How to build it in Roblox: pipeline and panel-by-panel breakdown | In progress, Claude researched; Claude Code builds, ~20 sessions, as in the build list | 0 | 13,09,17 | Build inside Roblox, driven by Claude Code: terrain written by code for sand and salt, a Blender mesh kit for hard edges, lighting and atmosphere for mood, |
| 06 | Step-by-step runbook: match the six panels (Claude Code) | To do, Claude Code builds; Usman answers Q1 to Q7, picks variants, re-bakes, about 23 sessions (about 70% of one weekly allowance at the 3% cap), 8 weeks at three a week | 0 | 13,09,17 | Every step Claude Code takes to make the existing Hueco Mundo realm match concept sheet v2: rules it never breaks, a one-change-at-a-time compare loop, a f |
| 06 | World scale: Hueco Mundo as its own place, about 5x the area, baked once | To do, Claude Code builds; Usman answers W-Q1 to W-Q8, creates the place, runs the phone and party tests, about 14 sessions (about 40% of one weekly allowance at the 3% cap) | 9 | 13,09,17 | Owner decisions 8 to 9 Oct: Hueco Mundo moves into its own place (Garganta teleport, streaming on), about 16,000 studs across (5x), the desert generated on |
| 06 | Build Hueco Mundo | To do, Claude Code; Usman answers the owner questions, picks variants and re-bakes, 6 to 7 weeks at three sessions a week | 17 | 13,09,17 | The build now follows the step-by-step runbook (task above, Phases 0 to 13). The subtasks below are the first draft: the greybox and the new terrain genera |
| 07 | Studio capture rig | Done, Claude Code | 0 | 01,17 | `tools/studio/capture_rig.luau` presets: cero_side_close, cero_side_wide, cero_rear34, cero_front, cero_charge_front. |
| 07 | Screenshot / compare loop | Done | 0 | 01,17 | Studio MCP execute_luau + screen capture; captures cropped beside the reference at the same scale. |
| 07 | Session rules in CLAUDE.md | Done | 0 | 01,17 | One governing contract per feature; 3% weekly usage cap per session; numbers after pictures; never save the place, never push. |
| 07 | Sine VFX shortlist workflow | Done | 0 | 01,17 | Owner shortlists library assets into `Workspace.<Feature>SineShortlist`; Claude Code captures each on the dark plate before use and stops if the class is w |
| 07 | Blender MCP + RBXMonkey check | To do, Claude Code | 0 | 01,17 | Confirm a scripted plate exports from Blender and lands in Studio welded to a bone before the kit is built. |
| 08 | Scope this phase | To do, Usman | 0 | 08,13 | List the Shinigami/Zanpakutō kit, maps and progression once the Hollow side is playable. |
| 08 | Hueco Mundo terrain (ground only) | To do, Claude Code, 3-4 sessions · about 8-12% weekly | 7 | 08,13 | Six terrain types from the reference image: dune sea, mountain edge, crater basin, sinkhole field, the empty Menos cavern, flats and ravine. Ground, sand a |
| 08 | Hueco Mundo dressing (trees, life, Las Noches) | To do, Claude Code, 2-3 sessions · about 6-9% weekly | 9 | 08,13 | The finished look for the six scenes: Las Noches as the huge landmark seen from every zone (shaped like the anime: shallow dome, flared cylinder towers, cu |
| 08 | Bigger Hueco Mundo: its own place, 5x the area | To do, Claude Code + Usman, about 10-14 sessions | 7 | 08,13 | Merged into the "World scale" task in the Hueco Mundo (world) phase: one contract, docs/contracts/HUECO_WORLD_SCALE.md v1.1 (5x, baked once, ring kept with |
| 09 | Read first: decisions and clashes | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | The doc's locked decisions in one list, plus a table of where it clashes with today's game and what we do about each clash. |
| 09 | Zanpakutō: personal choice, inner world, rebirth | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | How each player's three awakening choices are picked, how Inner Worlds are built from modules, the sword spirit, growth to Bankai, and fair ways to change  |
| 09 | Spiritual Legacy across character slots | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | A strong earlier character gives later slots a small head start in energy and growth. Account progress only: no family story, no skills carried over. |
| 09 | Reiatsu release, concealment and focus | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | Release % is a share of your own power. Formulas for output and upkeep, where the energy goes (blade, body, technique, aura), the Alt controls, HUD and sen |
| 09 | Seeing reiatsu relative to your level | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | One real output on the server, but each player sees it scaled to their own strength. Ratio table, aura size curve and labels. |
| 09 | Pressure: oppression, collapse and lethal exposure | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | How a much stronger player's pressure slows, kneels and floors a weaker one; how the weaker one can survive; Spiritual Integrity and death; effects on huma |
| 09 | Chain of Fate and where Hollows are born | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | Extreme pressure can kill a human and break their chain; the new Hollow is always reborn in Hueco Mundo. Rescue timing, population records and the Human Wo |
| 09 | Hollow travel: Garganta stages | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | Hollows are born in Hueco Mundo and earn travel in three stages: Human World first, then Rukongai. Seireitei stays behind its barrier. |
| 09 | Dangai, Senkaimon and time distortion | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | Safe authorised Senkaimon trips, the dangerous unauthorised run with Kōryū and the Cleaner, rare stabilised training with capped rewards, and how the world |
| 09 | Academy: way in, story and timing | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | ON HOLD. How a new soul gets recruited in Rukongai, the entrance screening, the four-stage 80-minute first run, and the requirements to sit the exams. Brid |
| 09 | Academy: teachers and subjects | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | ON HOLD. The teacher roster (canon and guest), how a lesson runs, and every beginner subject with its drills. |
| 09 | Academy: multiplayer lessons and day/night | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | ON HOLD. On-demand lessons so nobody waits, 36 players per server and 12 per lesson, NPC classmates, flexible timetables, a shared 24-minute day with optio |
| 09 | Academy: campus, buildings and dorms | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | ON HOLD. The owner's gold-roof front as the anchor, the full building list, the interior sheets, the 100-bed dorm plan with consent-based roommates, and th |
| 09 | Bleach lore and reference links | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | Key terms, why Ichigo is strong and why his power swings, the canon pressure scenes, every link from the doc, and the scenes to use as visual reference. |
| 09 | Numbers to tune | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | Every placeholder number and formula from the doc in one table, with worked examples. None of them are final. |
| 09 | Superseded ideas and how decisions changed | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | What NOT to build, what is still open, and the 30 steps of the research conversation, so nobody revives an idea the owner dropped. |
| 09 | Before shipping: test list | To do, Design only (owner + ChatGPT research, 9 Oct) | 0 | 08,12,13 | What the doc puts in scope for later, what it leaves out, and the eleven checks to pass before any of these systems goes live. |

**Inventory count:** 63 legacy top-level task records, and 93 nested checklist lines visible under them. Statuses and source task IDs must be preserved, not inferred from the new roadmap.