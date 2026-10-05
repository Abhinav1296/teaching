# 🗓️ Day 4 prep — Lookups: *a lookup is a join you do by hand*

**Module 2 · Advanced Excel** · Tool: Excel · **one 3-hour class, taught twice**

> Enrich the orders table by pulling `restaurant_name`, `cuisine`, and `city` from a second table — and flag where the delivery city ≠ the restaurant city. Teach VLOOKUP as the interview question, XLOOKUP as what they'll actually use, and plant the seed: *this exact enrichment is one `JOIN` on Day 8.*

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the 10-min demo (break VLOOKUP three ways: wrong index, `TRUE` match, missing `$`), the INDEX-MATCH left-lookup, `IFERROR`, and `XLOOKUP`.
- [ ] Open the deck `Day_04_deck.pptx` once; click through it.
- [ ] Have the two tiny demo tables ready — a 5-row `orders` and a 4-row `restaurants`.

## 🌅 This morning — release Day 4
```powershell
tools/release-day.ps1 04
```
Students run `git pull upstream main` to get `Day_04_Lookups/`.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 4 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: VLOOKUP, break it, rebuild  :00:00, 10m
    Read the brief                         :00:10, 5m
    section Build
    Enrich orders + mismatch flag          :00:15, 120m
    section Share
    Show & tell: compare approaches        :02:15, 30m
    section Wrap
    Submit your PR                         :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | Live-type a VLOOKUP, break it three ways, rebuild with INDEX-MATCH (looks *left*), wrap in IFERROR, finish with XLOOKUP. |
| 0:10–0:15 | **Brief** | Students read `instructions.md`. |
| 0:15–2:15 | **Build** | They add 4 lookup columns to `orders` and build a `city_mismatch` flag. |
| 2:15–2:45 | **Show & tell** | Compare: who used VLOOKUP, who used INDEX-MATCH, who caught the drift bug. |
| 2:45–3:00 | **Wrap** | Students commit + open their Day 4 PR, preview Day 5. |

## 🎬 The demo in one line
Type a VLOOKUP, **break it on purpose** (wrong column index, `TRUE` on unsorted data, un-anchored range on drag), then rebuild it cleaner with INDEX-MATCH + IFERROR, and show XLOOKUP does it in one call. Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
The `orders` table enriched with 4 lookup columns **plus** a `city_mismatch` flag (delivery city ≠ restaurant city), as a Pull Request.

## ⚠️ Watch-outs
- **The #1 bug:** a non-absolute lookup range drifts on drag-down. Anchor it with `$` — this is where most of the morning's "it's wrong!" tickets come from.
- **#2:** keys pasted with trailing spaces silently fail to match → `TRIM()` the key. Nice callback to Day 3.
- INDEX-MATCH's `MATCH` last argument `0` = exact match (the VLOOKUP `FALSE` equivalent).
- Say it out loud: **a VLOOKUP *is* a join.** On Day 8 they'll do this across the whole table in one statement — no dragging.

## 🏃 Running ahead? (fills a light day)
- The `city_mismatch` count lands around **~3%** — those are deliberate cross-city edge cases, and a fraud signal they'll revisit on Days 8 and 10.
- 365 users: redo the whole column with a single XLOOKUP and a built-in not-found value.
- *"What breaks if the lookup table has duplicate keys?"* (VLOOKUP takes the first — demo it.)

## ➡️ Tomorrow
**Day 5 — PivotTables & reporting.** Release with `tools/release-day.ps1 05`. Pre-read: `../Day_05_Pivot_Reporting/prep.md`.
