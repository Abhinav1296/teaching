# 🎓 FoodCo Bootcamp — TRAINER BUNDLE (private)

This folder is **yours only. Never push it to GitHub.** It sits next to `student-repo/` (the public repo) as a sibling folder:

```
data analytics/
├── student-repo/     ← the GitHub repo. Public. Pushed ONE DAY AT A TIME.
└── trainer-repo/     ← THIS. Local only. Your plan, answer keys, decks, prep sheets.
```

## 📦 What's in here

| File / folder | What it is |
|---------------|-----------|
| `MASTER_PLAN.md` | The full 10-day plan (all scenarios, tasks, your demos) — the big picture. |
| `DAILY_PUSH_PLAYBOOK.md` | **Read this.** Exactly what to push each morning + the commands. |
| `tools/release-day.ps1` / `.sh` | One-command release: stages + commits + pushes just one day's folder. |
| `tools/generate_data.py` | The seeded data generator. Re-run to rebuild all CSVs + `foodco.db`. |
| `Day_00 … Day_10/prep.md` | **Your run-sheet for each day** — minute-by-minute, with visuals. Open this the night before. |
| `Day_00 … Day_10/trainer_notes.md` | Your 10-min live-demo script **+ the verified answer key.** |
| `Day_00 … Day_10/<deck>.pptx` | The demo-driven slide deck to project in class. |

## 🔑 The three golden rules
1. **Only `student-repo/` goes to GitHub.** This `trainer-repo/` never does.
2. **Release one day at a time** — push each `Day_XX` folder the morning you teach it, so students practise `git pull` daily. See `DAILY_PUSH_PLAYBOOK.md`.
3. **Answer keys live here, not in the student repo.** Students get `instructions.md` + data; you keep `trainer_notes.md` + decks + prep.

## 🔁 Your daily loop (same every day)
```
Night before →  open  Day_XX/prep.md   (run-sheet) + skim trainer_notes.md
Morning      →  release Day_XX   (tools/release-day.ps1 XX)  → tell students to pull
In class      →  project Day_XX/<deck>.pptx, run the 10-min demo, float, reveal answers
Twice a day   →  teach the SAME Day_XX to batch 1 (morning) and batch 2 (afternoon)
```
> You teach each day's 3-hour class **twice** (two student batches, same content). You only **release once** — batch 2 pulls the same folder.

## 🧭 Where to start
1. Read `DAILY_PUSH_PLAYBOOK.md` once, end to end.
2. Do a dry-run of Day 0 setup yourself (create the GitHub repo, test `release-day`).
3. The night before each teaching day, open that day's `prep.md`.
