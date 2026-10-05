# 🗓️ Day 3 prep — Data cleaning with Power Query: *build a pipeline, not a one-off scrub*

**Module 2 · Advanced Excel** · Tool: Excel + Power Query · **one 3-hour class, taught twice**

> Real data is dirty on purpose here: six cities spelled five ways, `Rs.`/commas inside numbers, text dates, duplicate rows, negative delivery minutes. The point isn't to tidy one file — it's to build an **Applied Steps** pipeline that re-runs on refresh. First day of Module 2.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the 6-row junk demo, the expected clean result (6 clean cities, ~40 dupes gone, `Rs.`/comma stripped, dates coerced, negative delivery mins flagged), and the teaching gotchas.
- [ ] Open the deck `Day_03_deck.pptx` once; click through it.
- [ ] Load the dirty source file into Power Query once so the **Applied Steps** panel is fresh in your hands.
- [ ] Burn in the order gotcha: **Trim before Replace**, or trailing spaces survive the city clean-up.

## 🌅 This morning — release Day 3
```powershell
tools/release-day.ps1 03
```
Students run `git pull upstream main` to get `Day_03_Data_Cleaning_PowerQuery/`.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 3 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: 6-row mess -> pipeline      :00:00, 10m
    Read the brief                         :00:10, 5m
    section Build
    Clean orders in Power Query            :00:15, 120m
    section Share
    Show & tell: compare Applied Steps     :02:15, 30m
    section Wrap
    Submit your PR                         :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | Take a 6-row mess; build an Applied-Steps pipeline: Trim → standardise cities → strip `Rs.`/commas → coerce dates → remove duplicates. Refresh to prove it re-runs. |
| 0:10–0:15 | **Brief** | Students read `instructions.md`. |
| 0:15–2:15 | **Build** | They clean the full dirty `orders` file in Power Query, steps visible. |
| 2:15–2:45 | **Show & tell** | Compare Applied Steps lists — who handled nulls and negatives, and *how*. |
| 2:45–3:00 | **Wrap** | Students commit + open their Day 3 PR, preview Day 4. |

## 🎬 The demo in one line
A 6-row mess becomes a **repeatable** pipeline you can refresh — Trim, standardise, strip currency, coerce dates, dedupe — each step named in the Applied Steps panel. Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
A cleaned `orders` table built in Power Query (Applied Steps visible — not hand-edited cells), as a Pull Request.

## ⚠️ Watch-outs
- **Trim before Replace** — otherwise `" Mumbai"` and `"Mumbai"` stay two different cities and the dedupe misses them.
- **Nulls are a business decision**, not an automatic delete. Make them say what a null `rating` *means* before they drop it.
- **Negative delivery minutes are a real signal** — flag them, don't silently zero them out. (They resurface in later analysis.)
- Automation sits *on top of* this pipeline — tell them Day 6 will wrap today's work in a one-click macro.

## 🏃 Running ahead? (fills a light day)
- Add an `is_late` column (delivered vs promised minutes) — they'll lean on it from Day 5 on.
- Clean a second file and merge the queries.
- *"How would you run this cleaning every morning on a fresh feed?"* → teases Day 6.

## ➡️ Tomorrow
**Day 4 — Lookups (VLOOKUP / INDEX-MATCH / XLOOKUP).** Release with `tools/release-day.ps1 04`. Pre-read: `../Day_04_Lookups/prep.md`.
