# How to write task steps and "Show me how" lines

Every NUMEN task has up to 6 short **steps**. Under each step there is a **"Show me how"** drop-down: 2 to 6 click-by-click lines that someone who has never done it before can follow. These files feed `reorder.js`; run `node tools/plan-reorder/lint.js <file>` after editing.

## Who reads this
The owner: 17, building the game mostly with Claude Code on a Windows PC. Assume they have never used git, a terminal, Blender scripts or Roblox's publishing tools before. Plain British English, no em dashes, no jargon without a short explanation in brackets the first time.

**Never write "Usman".** Speak to the owner as "you". Claude Code is "Claude Code".

## File format
```
S01.01 | Save all your game work to GitHub
W: one or two short sentences, under 30 words
1. Ask Claude Code to list the loose files in the game folder.
   - Open Claude Code in the main game folder (see "How to: the basics" in the Codex).
   - Type: "List every file git isn't tracking yet. Don't change anything."
   - Read the list. It should include the Cero and Hueco contract files.
2. Next step...
   - how line
   - how line
D: one sentence you can check by playing or looking
```
- Keep the task id, title, `W:` and `D:` lines as they are, except: replace "Usman" with "you" and fix the grammar.
- Steps: 1 to 6, each starting with a verb, 20 words or fewer. Say **who** does it when it isn't you: "Ask Claude Code to ...". You may reword, merge or split steps, but keep the same work and order.
- How lines: 2 to 6 per step, each starting with "- " (indent with three spaces), each one concrete action, 30 words or fewer.
- Other task ids stay in the S01.01 form; the script swaps them for the new ids.

## How to write the "how" lines
- One physical action per line: open this, press that, type this, look for that.
- Put exact words to type to Claude Code in double quotes: `Type: "..."`. These messages should be short, specific and safe. Claude Code sessions follow the game repo's rules: they never save the place, never push, never force anything, and they stop and ask when something clashes.
- End a step with a check where possible: "You should see ...", "If you see red text in Output, copy it into a note".
- Don't invent buttons, menus, file names or numbers you can't see in the task's original text. If you're not sure exactly how a tool works, say what to achieve ("Open the place the way you normally do") or ask Claude Code to show the way ("Type: \"Tell me exactly which file to open and how. Don't change anything.\"").
- Don't repeat the basics in every step: point to **"How to: the basics" in the Codex** for opening Claude Code in the game folder, opening the game in Studio with Rojo, pressing Play, reading Output, taking a capture, adding a note, attaching a file and submitting for review.

## Safe, correct patterns to reuse
- **Something Claude Code builds:** open Claude Code in the game folder; in NUMEN press **Copy Claude build brief** on this task and paste it in; then type the step, e.g. `Type: "Do step 2 only: ... Then stop and report."`; check its report says what changed and how it was tested.
- **Saving work in git (commit):** you don't need to know git. `Type: "Commit these changes with a clear message. Never commit .rbxl files or tools/lune/out."` Claude Code shows what it committed.
- **Uploading to GitHub (push), which only you do:** `Type: "Give me the exact command to push this branch. Don't run it."` Then open Command Prompt in the game folder (in File Explorer, open the folder, click the address bar, type cmd, press Enter), paste the command and press Enter. You should see a line ending in the branch name.
- **Playing in Studio:** open the game in Studio with Rojo connected; press Play (F5); do the thing; open View > Output and look for red lines; press Stop.
- **Publishing a test copy** (needed for teleports between places): ask Claude Code which place to publish and how, then do it yourself in Studio with File > Publish to Roblox As... into a private test game, never the live game.
- **Saving the place** (Claude Code never does this): in Studio press File > Save to File (or Ctrl+S) and keep the name Claude Code tells you.
- **Your decision or review:** read the original detail on the task page (Extra detail (for Claude Code)); write your answer in your own words in Notes and press Save note; if it's a yes, tick the step.
- **ChatGPT design sheets:** open the task's Extra detail, copy prompt 1, paste it into ChatGPT, save the image, attach it to the task with + Attach result, repeat for each prompt.
- **Blender work:** Claude Code drives Blender through Blender MCP: open Blender first, make sure the MCP add-on says it's connected, then give Claude Code the step.
- **Proof and handing in:** attach captures with + Attach result, write what passed or failed in Notes, tick the checklist, press Submit for review.

## Example
```
S06.02 | Fix the Cero camera shake
W: The screen shakes too much and too long when the Cero fires.
1. Ask Claude Code to make one short shake when the Cero fires.
   - Open Claude Code in the game folder and paste this task's Claude build brief.
   - Type: "Do the release shake only: one short pulse when the Cero fires. Camera module only. Then stop and report."
   - Check its report says only the camera module changed.
2. Ask Claude Code to add a tiny shake while holding.
   - Type: "Now add the small hold tremor from the spec. Then stop and report."
3. Ask Claude Code to add one shake when it hits.
   - Type: "Now add the impact pulse and the small zoom on impact. Then stop and report."
4. Ask Claude Code to shake less when you're far away.
   - Type: "Now scale the shake down with distance, full within 20 studs and zero at 80. Then stop and report."
5. Record before and after and judge it yourself.
   - Type: "Take before and after captures from the cero_side_close preset and tell me where they are."
   - Open both pictures or videos and watch them side by side.
   - Play it yourself in Studio: press Play, fire the Cero, look at the shake.
   - Attach the captures with + Attach result and write what you think in Notes.
D: You fire the Cero and the shake feels right.
```
(Steps 2 to 4 above would each need a second how line, such as a check.)
