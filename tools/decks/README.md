# Classroom deck generators

These scripts generate every day's **student-facing classroom deck** (`Day_XX_deck.pptx`)
that lives inside each `Day_XX_*/` folder. They are the single source of truth — edit the
script and rebuild, never hand-edit the `.pptx`.

> Trainer-side only. This folder (and all decks) live in **trainer-repo**, which is never
> pushed to GitHub. Students never see the decks or these scripts.

## Files

| File | What it is |
|------|------------|
| `lib.js` | Shared palette, fonts, and primitive slide builders (title, section, content, card, badge, codeBox). |
| `kit.js` | Reusable classroom-deck slide templates (timeline, scenario, demo, task, folder, submit, recap, concept, cardsRow). Requires `lib.js`. |
| `gen_day01.js` | Day 1 deck — the **approved visual template**. Built on its own because it has a bespoke onboarding timeline. |
| `build_all.js` | Day 0 + Days 2–10. Per-day config objects + custom concept slides, all composed from `kit.js`. |
| `export_all.ps1` | QA: exports every deck to PNG via PowerPoint COM (no LibreOffice on this box). |
| `contact.py` | QA: builds one contact-sheet PNG per deck from the exported slides (needs `pip install pillow`). |

## Rebuild

```powershell
cd tools/decks
npm install           # first time only — pulls pptxgenjs
node gen_day01.js "..\..\Day_01_Data_Foundations\Day_01_deck.pptx"
node build_all.js "..\.."      # writes Day_00 + Day_02..Day_10 decks into their folders
```

`build_all.js` takes the **trainer-repo root** as its one argument and writes each deck to
`Day_XX_*/Day_XX_deck.pptx`.

## Validate + visually QA (optional)

```powershell
# schema check (uses the pptx skill's validator)
python <pptx-skill>/scripts/office/validate.py ..\..\Day_02_Analytics_Types_and_Ethics\Day_02_deck.pptx

# render to PNG + contact sheets (paths inside the scripts point at the QA scratch dir — edit if needed)
powershell -File export_all.ps1
python contact.py
```

## House rules baked into the decks

- **Student-facing classroom decks.** Trainer logistics (run-sheet, teach-twice, night-before,
  answer keys) live in each day's `prep.md` / `trainer_notes.md`, **not** in the deck.
- Every day follows the same rhythm slide: Live demo → Read the brief → You build → Show & tell → Submit your PR.
  (Day 0 and Day 1 have their own special timelines.)
- One continuous FoodCo dataset; decks reference the same files students clean in Excel and query in SQL.
