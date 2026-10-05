# Day 0 — Trainer notes: Git & GitHub onboarding

> Taught as the **first ~40 minutes of Day 1** (before the data-foundations content). Your goal: every student ends with a merged Pull Request. If they can fork → clone → pull → PR, the rest of the bootcamp's Git runs itself.

## 🎬 Your live demo (project your screen, ~12 min)
Do the *whole loop* once, slowly, narrating. Use a throwaway GitHub account or your own fork so you can delete it after.

1. **(2 min) The mental model.** Draw two boxes on the whiteboard: **upstream** (my repo, where new days appear) and **your fork** (your copy, where you push). Arrow down = `clone`/`pull`; arrow up = `push` → `Pull Request`. Keep this drawing up all day.
2. **(2 min) Fork.** On GitHub, click **Fork**. "Now you have your own copy — you can't break mine."
3. **(3 min) Clone + remotes.** `git clone <your fork>`, then `git remote add upstream <my repo>`, then `git remote -v`. Point: "`origin` = yours (you push here), `upstream` = mine (you pull here)."
4. **(3 min) Make a change + PR.** Create `roster/trainer.md`, `git add roster/`, `git commit -m "..."`, `git push origin main`, then on GitHub click **Compare & pull request** → base = my repo. Show the PR appear.
5. **(2 min) Merge it live.** Switch to the upstream repo, merge your own PR, and show the file now in `main`. "That green merge is what you're chasing today."

## ✅ What students produce
A `roster/<name>.md` file submitted as a PR to your repo. Merge each one live (or in small batches) — students love watching their change land in `main`.

## 🧯 Setup gotchas (you WILL hit these)
- **No Git installed:** Windows → [git-scm.com](https://git-scm.com) installer; Mac → `xcode-select --install`. Have the link ready.
- **Auth fails on push:** GitHub no longer accepts passwords. Easiest fix for a classroom: install **GitHub CLI** (`gh auth login`) or have them use the **GitHub Desktop** app. Decide which *before* class and demo that one.
- **Pushing to upstream (403):** they cloned your repo directly instead of their fork. Fix: re-clone their fork, or `git remote set-url origin <their fork>`.
- **Everyone named "roster.md":** have them use `roster/<firstname-lastname>.md` so PRs don't collide.
- **Line-ending noise on Windows:** harmless; `git config --global core.autocrlf true` quiets it.

## 🗣️ One-liners that land
- "You receive work by **pulling**. You hand in work by a **Pull Request**. That's the whole job."
- "Your fork is your sandbox — you literally cannot break the class repo. Experiment freely."
- "We do this every morning for 10 days. By Friday it's muscle memory."

## ⏱️ If onboarding runs long
Fork + first PR for 20–30 people can eat time. If you're over 45 min, park the slow ones with a buddy and start the Day 1 demo — they can finish the PR during the hands-on block (the roster PR isn't blocking).
