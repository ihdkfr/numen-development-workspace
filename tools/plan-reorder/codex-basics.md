# How to: the basics

The things almost every task needs. The **Show me how** drop-downs on each step point here instead of repeating them.

## Open Claude Code in the game folder
The game folder is `C:\Users\usman\Downloads\SoulSurvival-project`. Task T01.01 may tell you to use the second copy, `SoulSurvival-cero-v6`, until the two are joined.
1. **Claude desktop app:** open it, start a new Claude Code session, and choose the game folder when it asks which folder to work in.
2. **Or a terminal:** open the game folder in File Explorer, click the address bar, type `cmd` and press Enter. In the black window type `claude` and press Enter.
3. Check the first thing Claude Code says mentions the game folder, not some other folder.

## Give Claude Code a task
1. In NUMEN, open the task and press **Copy Claude build brief**.
2. Paste it into Claude Code and press Enter.
3. Then type the step you want, for example: "Do step 1 only. Then stop and report."
4. Read its report. It should say what it changed, how it tested it, and what it couldn't check.
5. One task per session. When it's done, close the session and start a fresh one for the next task.

## Open the game in Roblox Studio
1. Open Roblox Studio and open the game's place the way you normally do.
2. Make sure Rojo is connected: the Rojo plugin should say it's connected. If you're not sure how, ask Claude Code: "Tell me exactly how to connect Rojo for this project. Don't change anything."
3. If Claude Code needs to see Studio, Studio MCP must be on too. Ask Claude Code to check it can see Studio.

## Play-test and read Output
1. In Studio press **Play** (or F5).
2. Do the thing you're testing.
3. Open **View > Output**. Red lines are errors.
4. Copy any red lines into a note on the task.
5. Press **Stop** (Shift+F5) when you're done.

## Take a capture (proof)
1. For a quick picture: press the Windows key + Shift + S and drag over the screen.
2. For a video: press the Windows key + Alt + R to start and stop recording (Xbox Game Bar).
3. For effects with fixed camera spots, ask Claude Code to take the capture with the capture rig and tell you where it saved it.

## Save your work in git (commit)
You don't need to learn git commands. Type to Claude Code: "Commit these changes with a clear message. Never commit .rbxl files or tools/lune/out." It shows you what it saved.

## Upload to GitHub (push), which only you do
1. Type to Claude Code: "Give me the exact command to push this branch. Don't run it."
2. Open Command Prompt in the game folder (File Explorer, click the address bar, type `cmd`, press Enter).
3. Paste the command and press Enter.
4. It should finish without the word "error" or "rejected". If it doesn't, paste the message into Claude Code and ask what it means. Never use a command with `--force` in it.

## Save the place (Claude Code never does this)
In Studio press **File > Save to File** (Ctrl+S). Keep the file name Claude Code tells you, and never commit `.rbxl` files to git.

## Write a note, attach proof and hand in
1. On the task page, scroll to **Notes & development journal**, type what you did and what you saw, and press **Save note**.
2. Under **Completed work & evidence**, press **+ Attach result** and choose your pictures or videos.
3. Tick each step in **Steps & checklist** that's finished.
4. Press **Submit for review** at the top of the task. Only you, the owner, can approve it.
5. When it's approved, type how many sessions it really took into **Actual sessions**.

## When something goes wrong
- Copy the exact error message into Claude Code and ask: "What does this mean and what's the safest fix? Don't change anything yet."
- If Claude Code fails the same thing three times, stop, write what happened in a note, and set the task to **Blocked**.
