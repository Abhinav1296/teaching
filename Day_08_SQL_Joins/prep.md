# 🗓️ Day 8 prep — SQL joins: *yesterday's VLOOKUP, but one statement does the whole table*

**Module 3 · SQL** · Tool: DB Browser for SQLite · **one 3-hour class, taught twice**

> The callback that lands the module: a join is the Day 4 VLOOKUP — but one statement enriches the whole table, no dragging. INNER keeps the matches; LEFT + `IS NULL` finds the gaps (customers who never ordered). Two overlapping circles on the whiteboard carry the whole lesson.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the two-circle Venn demo and the verified key (**never-ordered customers = 63**; **flagged payments ≈ 54**, ~2%).
- [ ] Open the deck `Day_08_deck.pptx` once; click through it.
- [ ] Have the `orders` / `customers` / `restaurants` / `payments` keys handy to sketch on the board.

## 🌅 This morning — release Day 8
```powershell
tools/release-day.ps1 08
```
Students run `git pull upstream main` to get `Day_08_SQL_Joins/`.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 8 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: INNER -> LEFT -> chain 3     :00:00, 10m
    Read the brief                          :00:10, 5m
    section Build
    Join, enrich, find the gaps             :00:15, 120m
    section Share
    Show & tell: never-ordered + fraud      :02:15, 30m
    section Wrap
    Submit your PR                          :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | INNER join orders↔customers; swap to `LEFT JOIN` + `WHERE o.order_id IS NULL` → the never-ordered crescent; chain a 3rd table. |
| 0:10–0:15 | **Brief** | Students read `instructions.md`. |
| 0:15–2:15 | **Build** | 3-table INNER join, top-10 customers by spend, never-ordered (63), the flagged-payments fraud view (~54). |
| 2:15–2:45 | **Show & tell** | Reveal the counts; debate the fan-out trap before it bites on Day 10. |
| 2:45–3:00 | **Wrap** | Students commit their `.sql` + open their Day 8 PR, preview Day 9. |

## 🎬 The demo in one line
INNER join two tables ("only rows that match both sides"), switch to `LEFT JOIN … WHERE order_id IS NULL` to shade the never-ordered crescent, then chain a third table — "this is yesterday's VLOOKUP, one statement, whole table." Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
A `.sql` file with a 3-table INNER join (delivered orders + customer + restaurant), top-10 customers by spend, never-ordered customers (**63**), and a flagged-payments fraud view (**≈54**), as a Pull Request.

## ⚠️ Watch-outs
- **"Never ordered"** must key on `o.order_id IS NULL`, **not** `o.rating IS NULL` — rating is null on cancelled orders too, so it over-counts.
- SQLite tolerates a dropped non-aggregated `GROUP BY` column and returns arbitrary rows — show *why* that's dangerous.
- `RIGHT JOIN` errors in older SQLite → swap the operands. (Mention Postgres/MySQL 8 do `FULL OUTER`.)
- **Fan-out:** joining `order_items` then `SUM(order_value)` double-counts (value repeats per line). Flag it today — it bites them on Day 10.

## 🏃 Running ahead? (fills a light day)
- The busiest-rider-per-city query is a clean window-function teaser for Day 9.
- *"How many of the 63 never-ordered customers are in each city?"*
- Sanity-check: INNER (delivered + matched) vs LEFT (all 500 customers, 63 with NULL order columns).

## ➡️ Tomorrow
**Day 9 — Window functions.** Release with `tools/release-day.ps1 09`. Pre-read: `../Day_09_Window_Functions/prep.md`.
