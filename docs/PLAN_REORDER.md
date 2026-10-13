# Plan reorder, 13 October 2026

The owner asked for the plan to be put into 14 phases done one after another, with 29 missing tasks added, a time estimate on every task and every task rewritten in plain English. This file records what changed and the old-to-new id table.

## What changed

- **Phases.** 14 new phases (01 Set up and check what you have, to 14 After launch), each with a goal and a gate.
- **Tasks.** 182 tasks moved into the new order and 29 new tasks added: 211 in all. Every old task is used exactly once.
- **Ids.** Every task has a new id, T01.01 and up, in its new order. No S id or old 01.01-style id is reused. Each moved task keeps its old S id in `aliases`.
- **Saved team work.** NUMEN reads a task's team record from `task:<T id>`. If there is none, it reads the first alias that has one, so notes, files, checklists and history saved under the S id show on the new task. The first save then writes the record under the T id. The old S record is never changed or deleted. Records whose id is an alias no longer show on the Archive page.
- **Wording.** Every task has a short title, a plain "What it is", up to six numbered steps and a one-line "Done when". The old title, why, instructions, acceptance, estimate and notes are kept word for word in the task's details under "Original detail", shown on the task page as "Extra detail (for Claude Code)" and included in the Claude build brief.
- **Status.** Each moved task keeps its starting status and locked flag. New tasks start as To do. Tasks named "Built so far" are now "Check what's built".
- **Time.** Each task has `estimate_sessions` (best case) and `estimate_tricky`, exactly as the owner gave them. A session is one sitting with Claude Code, about 1 to 3 hours, at 7 sessions a week.
- **Owner decisions.** Unchanged, with the same ids.
- **Codex.** "Read first" rewritten, "Words explained" added, the new Phase 02 decisions added to "Open questions for the owner", and every S id in the codex and Combat & VFX records changed to its T id.

## Totals

| Phase | Tasks | Best case (sessions) | If tricky (sessions) |
|---|---|---|---|
| 01 Set up and check what you have | 24 | 11.5 | 21.5 |
| 02 Decide the big things | 11 | 6 | 6 |
| 03 Build the maps | 25 | 54.5 | 83 |
| 04 Player basics | 8 | 9.5 | 14 |
| 05 Movement and spiritual power | 9 | 14 | 21.5 |
| 06 Combat | 9 | 14.5 | 21.5 |
| 07 Characters and models | 35 | 42 | 56.5 |
| 08 Animation and VFX | 16 | 12.5 | 15.5 |
| 09 Powers | 16 | 50.5 | 70 |
| 10 Story and life | 19 | 31 | 47 |
| 11 Multiplayer and living world | 14 | 27 | 41 |
| 12 Look, sound and menus | 6 | 13 | 18.5 |
| 13 Launch | 12 | 19 | 28.5 |
| 14 After launch | 7 | not estimated | not estimated |
| **All** | **211** | **305** | **444.5** |

About 44 to 64 weeks at 7 sessions a week.

## Old id to new id

| Old id | New id | New title |
|---|---|---|
| S01.01 | T01.01 | Save all your game work to GitHub |
| S01.02 | T01.04 | Play every route and fix the spawn wait |
| S01.03 | T01.05 | Measure how fast the game runs now |
| S01.04 | T01.06 | Keep Claude's rules file up to date |
| S01.05 | T01.07 | Check what's built: realms and world tech |
| S01.06 | T01.08 | Check what's built: Soul Society |
| S01.07 | T03.15 | Rebuild the Soul Society landscape |
| S01.08 | T03.16 | Build the Seireitei houses and streets |
| S01.09 | T03.17 | Build Sōkyoku Hill and Central 46 |
| S01.10 | T03.18 | Build the 13 Division neighbourhoods |
| S01.11 | T03.19 | Build the middle Rukongai districts |
| S01.12 | T03.20 | Add real textures to Soul Society |
| S01.13 | T03.21 | Roll out all 320 districts |
| S01.14 | T03.22 | Bring Soul Society to life |
| S01.15 | T01.09 | Check what's built: the old Hueco Mundo |
| S01.16 | T03.01 | Approve the big Hueco desert pictures |
| S01.17 | T03.02 | Test the separate Hueco Mundo place |
| S01.18 | T03.03 | Test the Garganta trip both ways |
| S01.19 | T03.04 | Bake the desert into the Hueco place |
| S01.20 | T03.05 | Make Las Noches visible from far away |
| S01.21 | T03.06 | Judge the sandstorm at the desert edge |
| S01.22 | T03.07 | Add things to find in the desert |
| S01.23 | T02.11 | Match the Hueco rules to 12 Oct answers |
| S01.24 | T03.08 | Speed test Hueco Mundo with 20 players |
| S01.25 | T03.09 | Pick a scene spot for each concept panel |
| S01.26 | T03.10 | Make Hueco Mundo match the concept art |
| S01.27 | T03.11 | Reshape Las Noches to the agreed design |
| S01.28 | T03.12 | Build the six Hueco zones |
| S01.29 | T01.10 | Check what's built: Karakura |
| S01.30 | T03.23 | Rebuild Karakura town |
| S01.31 | T03.25 | Speed test every map |
| S02.01 | T07.01 | Save the Hollow design bible |
| S02.02 | T07.02 | Write a two-page art guide for modellers |
| S02.03 | T07.03 | Collect ideas for Hollows |
| S02.04 | T07.04 | Approve the ten Hollow lines overview |
| S02.05 | T07.05 | Design Hollow line 1: Polilla the moth |
| S02.06 | T07.06 | Design Hollow line 2: Hiena the hyena |
| S02.07 | T07.07 | Design Hollow line 3: Ciervo the stag |
| S02.08 | T07.08 | Design Hollow line 4: Alcaudón the shrike |
| S02.09 | T07.09 | Design Hollow line 5: Medusa the jellyfish |
| S02.10 | T07.10 | Design Hollow line 6: Escarabajo the beetle |
| S02.11 | T07.11 | Design Hollow line 7: Anguila the eel |
| S02.12 | T07.12 | Design Hollow line 8: Buitre the vulture |
| S02.13 | T07.13 | Design Hollow line 9: Oso the bear |
| S02.14 | T07.14 | Design Hollow line 10: Avispa the hornet queen |
| S02.15 | T07.15 | Lock the ten Hollow lines |
| S02.16 | T07.16 | Decide which Fishbone forms launch first |
| S02.17 | T07.17 | Decide how eating and evolving works |
| S03.01 | T07.18 | Check Blender can send models to Studio |
| S03.02 | T01.11 | Check what's built: models waiting for upload |
| S03.03 | T07.19 | Make rough 3D shapes from the sheets |
| S03.04 | T07.20 | Build the shared Hollow body |
| S03.05 | T07.21 | Build the bone plate kit |
| S03.06 | T07.22 | Make the Hollow bone and skin materials |
| S03.07 | T07.23 | Rig and animate the shared body |
| S03.08 | T07.24 | Build one full Hollow line as a test |
| S03.09 | T07.25 | Build the other nine Hollow lines |
| S03.10 | T07.26 | Set up the model checks |
| S03.11 | T07.27 | Build the Vasto Lorde hero model |
| S03.12 | T07.28 | Keep the Gillian as it is |
| S03.13 | T07.29 | Put the locked Vasto Lorde look in game |
| S03.14 | T07.30 | Design how Arrancar look |
| S03.15 | T07.31 | Design how Resurrección forms look |
| S03.16 | T07.32 | Finish the human and Plus looks |
| S03.17 | T07.33 | Design the Shinigami uniforms and swords |
| S03.18 | T07.34 | Design the Visored masks |
| S03.19 | T07.35 | Finish Substitute, Gigai and Mod Soul looks |
| S04.01 | T01.12 | Check what's built: spiritual power and movement |
| S04.02 | T05.06 | Build Channel: where your power goes |
| S04.03 | T05.07 | Build reserve, release and control values |
| S04.04 | T05.08 | Build hiding and sensing spiritual pressure |
| S04.05 | T05.09 | Build pressure that floors weak players |
| S04.06 | T05.05 | Check the spiritual power controls |
| S04.07 | T05.02 | Finish Shunpo, steps 3 to 6 |
| S04.08 | T05.03 | Finish Airwalk, steps 3 to 7 |
| S04.09 | T05.01 | Build one movement system for every form |
| S04.10 | T05.04 | Build each race's fast movement |
| S05.01 | T01.13 | Check what's built: combat |
| S05.02 | T06.01 | Polish basic attacks and blocking |
| S05.03 | T06.02 | Build the four Shinigami fighting arts |
| S05.04 | T06.04 | Decide which Hollow stage unlocks what |
| S05.05 | T09.13 | Build Hollow and Adjuchas fighting |
| S05.06 | T09.14 | Build three signature moves per Hollow line |
| S05.07 | T09.15 | Build Vasto Lorde and Arrancar fighting |
| S05.08 | T09.16 | Build the Resurrección release |
| S05.09 | T06.07 | Build enemy AI and fighting styles |
| S05.10 | T08.15 | Build transformation and finisher cutscenes |
| S05.11 | T06.09 | Make combat work on controller and phone |
| S05.12 | T06.03 | Build skill trees |
| S06.01 | T08.01 | Cero look: locked |
| S06.02 | T08.02 | Fix the Cero camera shake |
| S06.03 | T08.03 | Add the Cero sound effects |
| S06.04 | T08.04 | Make the Cero run faster |
| S06.05 | T01.14 | Check what's built: Cero and effects library |
| S06.06 | T08.07 | Build the Gran Rey Cero |
| S06.07 | T08.08 | Build the Cero Oscuras |
| S06.08 | T08.09 | Build the Bala |
| S06.09 | T08.10 | Build Shakkahō, Kido #31 |
| S06.10 | T08.11 | Build Sōkatsui, a 3D blue flame burst |
| S06.11 | T08.12 | Build Byakurai, Kido #4 |
| S06.12 | T08.13 | Build the binding spells |
| S06.13 | T08.05 | Texture variants library: done |
| S06.14 | T08.06 | VFX rules sheet: done |
| S06.15 | T08.16 | Set effect quality levels for each device |
| S07.01 | T01.15 | Check what's built: Zanpakutō and Bankai |
| S07.02 | T09.07 | Design Zanpakutō 11 to 20 |
| S07.03 | T09.08 | Design Zanpakutō 21 to 40 |
| S07.04 | T09.09 | Design Zanpakutō 41 to 60 |
| S07.05 | T09.10 | Design Zanpakutō 61 to 80 |
| S07.06 | T09.11 | Design Zanpakutō 81 to 100 and lock them |
| S07.07 | T09.12 | Build the Zanpakutō moves |
| S07.08 | T02.04 | Decide how players change their power |
| S08.01 | T02.03 | Answer the open handover questions |
| S08.02 | T01.16 | Check what's built: the Soul Reaper path |
| S08.03 | T10.01 | Polish the opening: human, death, ghost |
| S08.04 | T10.02 | Build the first hour and a tutorial boss |
| S08.05 | T10.03 | Build the Soul Record |
| S08.06 | T04.02 | Map the level stages from 1 to 150 |
| S08.07 | T10.04 | Build Rukongai, Academy exams and Divisions |
| S08.08 | T10.10 | Bigger Academy: on hold |
| S08.09 | T09.01 | Build the Soul Imprint |
| S08.10 | T09.02 | Build the sword awakening trial |
| S08.11 | T09.03 | Build the bond with your sword spirit |
| S08.12 | T09.04 | Build the Inner Worlds |
| S08.13 | T09.05 | Build Shikai stages 1 to 8 |
| S08.14 | T09.06 | Build Bankai |
| S08.15 | T10.05 | Build Division jobs, seats and captains |
| S08.16 | T10.06 | Build friends, rivals and mentors |
| S08.17 | T10.07 | Build stories that react to your life |
| S08.18 | T10.08 | Build safe and dangerous Dangai trips |
| S08.19 | T10.09 | Build a bonus for later character slots |
| S09.01 | T01.17 | Check what's built: the Hollow path |
| S09.02 | T10.11 | Make every new Hollow start in Hueco Mundo |
| S09.03 | T10.12 | Build death by pressure into a Hollow |
| S09.04 | T10.13 | Build eating, hunger and evolving |
| S09.05 | T10.14 | Build Hollow family traits |
| S09.06 | T10.15 | Build Garganta unlocks in stages |
| S09.07 | T10.16 | Build Hueco arrival, checkpoints and spawn choice |
| S09.08 | T10.17 | Build Hueco Mundo storms and hazards |
| S09.09 | T03.13 | Make Las Noches outside playable |
| S09.10 | T03.14 | Finish the Las Noches entrance and inside |
| S09.11 | T10.18 | Build Arrancar ranks and the Espada |
| S10.01 | T01.18 | Check what's built: the living world |
| S10.02 | T11.01 | Build law, reputation, money and nemesis Hollows |
| S10.03 | T11.05 | Build events, raids and war |
| S10.04 | T06.05 | Build gear and loadout limits |
| S10.05 | T11.06 | Build world events |
| S10.06 | T11.07 | Build faction raids with goals |
| S10.07 | T11.12 | Build ranked 1v1 and team queue |
| S10.08 | T11.09 | Build invasion missions |
| S10.09 | T11.10 | Build a big faction battle event |
| S10.10 | T11.11 | Build risky expeditions |
| S10.11 | T11.04 | Build faction reputation |
| S10.12 | T11.08 | Build a co-op wave raid |
| S11.01 | T01.19 | Check what's built: menus, sound and looks |
| S11.02 | T12.01 | Finish the HUD and menus |
| S11.03 | T12.02 | Finish the character creator |
| S11.04 | T12.04 | Add all the sound and music |
| S11.05 | T12.05 | Add camera and accessibility settings |
| S11.06 | T12.03 | Build stances and weapon looks |
| S12.01 | T01.20 | Check what's built: saving and safety |
| S12.02 | T13.01 | Make the game load and run faster |
| S12.03 | T13.02 | Check saves are safe before launch |
| S12.04 | T13.03 | Stop cheaters without blocking fast players |
| S12.05 | T13.04 | Test with 20 players and slow devices |
| S12.06 | T13.05 | Play every path from start to finish |
| S12.07 | T13.06 | Do a final look walkthrough |
| S12.08 | T13.10 | Set up the game for launch |
| S12.09 | T13.12 | Run a closed test, then a soft launch |
| S13.01 | T14.01 | Check what's built: Quincy and others (off) |
| S13.02 | T14.02 | Switch on homes, stadium and extras |
| S13.03 | T14.03 | Decide when Quincy and Fullbringer open |
| S13.04 | T14.04 | Write the Quincy look guide |
| S13.05 | T14.05 | Write the Fullbringer look guide |
| S13.06 | T14.06 | Plan later story arcs safely |
| S13.07 | T14.07 | Design technique upgrades with trade-offs |
| S14.01 | T01.21 | Studio capture rig: done |
| S14.02 | T01.22 | Picture compare loop: done |
| S14.03 | T01.23 | Claude Code session rules: done |
| S14.04 | T01.24 | Effects shortlist workflow: done |
| S14.05 | T01.03 | Save the Hueco matching tools |
| S14.06 | T01.02 | Run all the game's tests |

## New tasks

| New id | Title | Who |
|---|---|---|
| T02.01 | Write the core loop and pacing sheet | Usman |
| T02.02 | Decide what's in version 1 | Usman |
| T02.05 | Decide what happens when you're knocked down or die | Usman |
| T02.06 | Decide races at launch, clans and Vizard | Usman |
| T02.07 | Decide how the game makes money | Usman |
| T02.08 | Decide server size and private servers | Usman |
| T02.09 | Check names that could get the game taken down | Usman |
| T02.10 | Answer Roblox's maturity questions on paper | Usman |
| T03.24 | Mark gameplay spots on every map | Claude Code |
| T04.01 | Saving, inventory and money | Claude Code |
| T04.03 | Mission boards and daily and weekly quests | Claude Code |
| T04.04 | Knock-downs, grips, dying and leaving mid-fight | Claude Code |
| T04.05 | Parties | Claude Code |
| T04.06 | Safe chat, report button and admin tools | Claude Code |
| T04.07 | Track where players quit | Claude Code |
| T04.08 | Set up server size and private servers | Claude Code |
| T06.06 | Loot drops | Claude Code |
| T06.08 | Boss system and boss list | Claude Code |
| T08.14 | Animations for every playable form | Claude Code |
| T10.19 | Vizard path (only if you said yes in Phase 02) | Claude Code |
| T11.02 | Trading between players | Claude Code |
| T11.03 | Player groups and bases | Claude Code |
| T11.13 | Achievements and titles | Claude Code |
| T11.14 | Codes and limited-time events | Claude Code |
| T12.06 | Store page: icon, thumbnails, trailer and description | Claude Code |
| T13.07 | Build the shop | Claude Code |
| T13.08 | Fill in Roblox's maturity questionnaire | Claude Code |
| T13.09 | Final name and copyright check | Claude Code |
| T13.11 | Discord, wiki and socials | Claude Code |

## How it was made

`tools/plan-reorder/reorder.js` reads the plan, the order (`order.txt`), the phases (`phases.txt`), the rewrites (`rewrites-old-phase-*.txt`), the new tasks (`new-tasks.txt`) and the codex text, then writes `data/plan-data.js`, `data/codex-data.js` and this file. It refuses to run twice.
