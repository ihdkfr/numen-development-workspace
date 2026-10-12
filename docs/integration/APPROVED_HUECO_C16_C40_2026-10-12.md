# NUMEN decision reconciliation: C16–C40
Approved 12 October 2026. Planning-only supplement to the existing 20-phase, 281-task roadmap and 156 legacy links.

## Governing rules
- These approvals are **design/planning requirements**, not implementation, completion, Studio verification, or a change in development priority.
- The independent NUMEN roadmap remains the organising plan. The 9-phase SoulSurvival plan remains archived, with 63 curated parent and 93 provisional subtask links unchanged.
- The separate Hueco Mundo Place is an **approved future migration**, not a migration already carried out. Existing SoulSurvival code, world assets, approved visual designs, game experience and Supabase task records stay untouched.
- Earlier approvals A01–A05 and all prior locked designs remain authoritative. C23 overrides only the earlier automatic active-respawn selection assumed in C20/C21.
- Use the game's existing services, source and tests when implementing in the future. Require owner approval for implementation and acceptance, with **done means played in Studio**.

## Recorded choices
| ID | Choice | Owner-approved requirement |
|---|---|---|
| C16 | A | Keep StreamingEnabled OFF initially; only revisit after benchmarks and new approval. |
| C17 | A | Keep the whole Hueco Mundo environment loaded; no custom region unloading. |
| C18 | B | Cinematic Garganta passage and loading transition for a cross-Place teleport. |
| C19 | B | Cinematic arrival, temporary server-controlled damage protection and no outgoing attacks while protected. |
| C20 | B amended | Progress-based valid respawn checkpoints, with active-spawn selection amended by C23. |
| C21 | C amended | Story checkpoint unlocks automatic, optional exploration checkpoints manually activated; active-spawn selection amended by C23. |
| C22 | C | Distinct story checkpoint Reiatsu markers; subtle environment-integrated optional markers. |
| C23 | A | VV: Ultimatum-inspired eligible player-selected active spawn, saved per character, server eligibility validation and safe fallback. This is a design adaptation, not a claim of VV's verified persistence mechanics. |
| C24 | A | No fast travel within Hueco Mundo. Ordinary movement abilities and separately approved cross-Place Garganta travel remain. |
| C25 | B | Selective hazards; most desert areas have no environmental damage. |
| C26 | C | Race-, ability- and progression-based environmental resistance, balanced across races and separate from PvP damage. |
| C27 | A | Hazard warnings through changes in environment and sound only; no hazard-warning UI. |
| C28 | B | Spiritual storms cause damage and reduced visibility; unstable Reiatsu disrupts energy recovery; corrosive terrain deals exposure damage. |
| C29 | A | Environmental effects cease immediately upon exit; lost health does not automatically return. |
| C30 | C | Roaming storms and temporary disturbances change hazard locations. |
| C31 | B | Regular minor disturbances and uncommon major storms, regionally weighted, with relatively stable major routes. |
| C32 | B | Hazards affect ordinary PvE and open-world PvP; protect major bosses, important progression encounters and designated arenas. |
| C33 | A | Roaming environmental hazards affect players only, not NPCs or wildlife. |
| C34 | B | Shared server-controlled hazard positions, intensity and timing; client visuals adapt independently, without affecting authoritative gameplay. |
| C35 | B | High-quality adaptive storms, layered particles, moving sand and atmospheric distortion. |
| C36 | B | Only severe storms cause limited wind/movement resistance; Shunpo, Sonído and Hirenkyaku remain functional. |
| C37 | A | Fully protected safe zones; hazards divert around settlements, hubs, checkpoints and important NPC locations; no storm effects inside. |
| C38 | B | Distant storms visible on the horizon with lightweight rendering, adding detail as players approach. |
| C39 | B | Storms change local darkness, sand visibility, spiritual distortion and apparent moonlight; restore baseline on exit. |
| C40 | B | Modular, individually tested implementation in small, verified GitHub commits when development is separately authorised. |

## Mapping to existing NUMEN roadmap
These are **additional task guidance links**, never replacements for the 156 source mappings:

- World architecture/loading, Garganta and arrival (C16–C19): 13.01, 13.06, 13.10, 13.11, 13.13, 13.14, 09.20, 02.04, 17.07.
- Checkpoints, spawn, no fast travel (C20–C24): 13.06, 13.10, 13.13, 09.20, 02.04.
- Environmental gameplay and hazards (C25–C34): 13.01, 13.06, 13.11, 13.13, 12.01, 15.01, 17.07.
- Visuals, safety and modular quality gates (C35–C40): 13.01, 13.06, 13.11, 13.13, 16.07, 17.07.

These task links are contextual cross-references and should be checked against each task's current scope before implementation.

## Existing-code conflicts for later implementation review
- `SoulSurvival/default.project.json` currently maps Hueco Mundo alongside other realms in one Rojo Place; the separate-Place migration has not been performed.
- `src/server/AbilityService.lua` currently uses `PivotTo` for Garganta travel, not `TeleportAsync` between Places.
- `src/server/HuecoMundoService.lua` emits sandstorm notices, in conflict with C27's environmental-only warnings.
- Existing Hueco weather, visuals, Reishi rain, sky events, character data and spawn systems should be reused and reconciled rather than discarded.
- The NUMEN workspace and Supabase are planning/collaboration infrastructure. No gameplay task is marked complete by adding these records.

## Integrity verification
- 20 original phases and 281 seed tasks retained.
- 63 parent mappings + 93 provisional subtask mappings retained.
- A01–A05 approvals retained; open choices C05, C06, C09, C10, C12–C15 remain unresolved.
- C16 changes from unresolved to approved A; C17–C40 are added approvals.
- No game repository, published Roblox Place or Supabase team records modified.
