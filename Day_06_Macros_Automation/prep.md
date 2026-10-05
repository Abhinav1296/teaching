# 🗓️ Day 6 prep — Macros & automation: *record once, run forever*

**Module 2 · Advanced Excel** · Tool: Excel + Developer tab (VBA) · **one 3-hour class, taught twice**

> The close of Module 2. The recorder writes the code; students only edit a value and wire it to a button. Automation sits *on top of* the Day 3 pipeline and the Day 5 report — today ties the Excel module together into one click.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the record-a-macro demo, the reference `RefreshOpsReport` macro (paste if a student is stuck), and the `.xlsm` save-type trap.
- [ ] Open the deck `Day_06_deck.pptx` once; click through it.
- [ ] Enable the **Developer** tab on the training machine (File ▸ Options ▸ Customize Ribbon).
- [ ] Note that the `is_late` column letter differs after each import — the reference macro's `$P2=1` assumes column P; you'll adjust live.

## 🌅 This morning — release Day 6
```powershell
tools/release-day.ps1 06
```
Students run `git pull upstream main` to get `Day_06_Macros_Automation/`.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 6 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: record, edit, button        :00:00, 10m
    Read the brief                         :00:10, 5m
    section Build
    Build the one-click refresh macro       :00:15, 120m
    section Share
    Show & tell: click each other's buttons :02:15, 30m
    section Wrap
    Submit your PR                         :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | Record 3 formatting actions, open the generated VBA, change one `RGB(...)` literal, re-run (`F5`), wire it to a Form Control button — and warn about the `.xlsm` save. |
| 0:10–0:15 | **Brief** | Students read `instructions.md`. |
| 0:15–2:15 | **Build** | They build a one-click "refresh ops report" macro and attach it to a button. |
| 2:15–2:45 | **Show & tell** | Students click each other's buttons; compare recorded vs hand-trimmed code. |
| 2:45–3:00 | **Wrap** | Students commit the `.xlsm` + open their Day 6 PR, preview Day 7. |

## 🎬 The demo in one line
Record three formatting actions, open the generated VBA, change one `RGB` value and re-run, then wire it to a button — "the recorder wrote the code; I only edited a value" — and **save as `.xlsm` or the macro vanishes.** Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
An `.xlsm` workbook with a one-click "refresh ops report" macro wired to a button, as a Pull Request.

## ⚠️ Watch-outs
- **The single most common ticket:** saving as `.xlsx` silently drops the macro ("my macro disappeared!"). Save-type discipline is the lesson.
- **Absolute vs relative recording** changes everything — keep "Use Relative References" **off** when formatting a fixed header row.
- `.xlsm` trips the macro-security bar. Explain *why* (macros can be malicious) — a clean callback to Day 2 ethics/governance.
- If `RefreshAll` errors, it's usually a broken Power Query connection — a reminder that automation rests on the Day 3 pipeline.

## 🏃 Running ahead? (fills a light day)
- Strip the recorder's `.Select` noise to show the hand-written version — first taste of "clean code."
- Add conditional formatting to red-shade late orders (the `$P2=1` block in the reference macro).
- *"What at FoodCo would you automate to run every morning?"*

## ➡️ Tomorrow
**Day 7 — SQL basics.** Module 3 (SQL) begins and we switch tools to **DB Browser for SQLite**. The full FoodCo dataset + `foodco.db` ship **with Day 7**. ⚠️ Tell students tonight to install DB Browser (https://sqlitebrowser.org) so Day 7 isn't an install clinic. Release with `tools/release-day.ps1 07`. Pre-read: `../Day_07_SQL_Basics/prep.md`.
