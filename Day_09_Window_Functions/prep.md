# 🗓️ Day 9 prep — Window functions: *keep every row, add context*

**Module 3 · SQL** · Tool: DB Browser for SQLite · **one 3-hour class, taught twice**

> The power tools. Rank within a city, let a row see its neighbour (`LAG`), run a running total — all **without collapsing rows** the way `GROUP BY` does. This is also where students *prove* the Q3 retention dip baked into the data: June 213 active → July 143, a ~33% drop that never recovers.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the `ROW_NUMBER`/`RANK`/`DENSE_RANK` + `LAG` + running-total demo, and the verified Q3 finding (Jun 213 → Jul 143 → Aug 161 → Sep 144).
- [ ] Open the deck `Day_09_deck.pptx` once; click through it.
- [ ] Confirm the bundled `foodco.db` opens in a **current** DB Browser — window functions need SQLite ≥ 3.25 (2018). If a student's tool errors, update it.

## 🌅 This morning — release Day 9
```powershell
tools/release-day.ps1 09
```
Students run `git pull upstream main` to get `Day_09_Window_Functions/`.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 9 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: PARTITION, LAG, running sum :00:00, 10m
    Read the brief                         :00:10, 5m
    section Build
    Rank, lag, and prove the Q3 dip        :00:15, 120m
    section Share
    Show & tell: the retention finding     :02:15, 30m
    section Wrap
    Submit your PR                         :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | `ROW_NUMBER() OVER (PARTITION BY city …)` — counter restarts per city; swap to `RANK`/`DENSE_RANK` on ties; `LAG` sees a neighbour with no self-join; `SUM() OVER (ORDER BY …)` = running total. |
| 0:10–0:15 | **Brief** | Students read `instructions.md`. |
| 0:15–2:15 | **Build** | Top restaurant per city, running monthly revenue, days-between-orders via `LAG`, and monthly-active-customers (the Q3 dip). |
| 2:15–2:45 | **Show & tell** | Students report the Q3 finding and argue what it means. |
| 2:45–3:00 | **Wrap** | Students commit their `.sql` + open their Day 9 PR, preview Day 10. |

## 🎬 The demo in one line
`PARTITION BY` restarts the counter per city; `RANK` vs `ROW_NUMBER` splits on ties; `LAG` lets a row read its neighbour without a self-join; `SUM() OVER` accumulates — "windows keep every row and add context." Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
A `.sql` file — top restaurant per city, running monthly revenue, days-between-a-customer's-orders via `LAG`, and the monthly-active-customers query that **shows the Q3 dip** — as a Pull Request.

## ⚠️ Watch-outs
- Using `GROUP BY` for the `LAG` question loses the per-order detail — the whole point of a window is to *keep* rows.
- `ROW_NUMBER` breaks ties arbitrarily (non-deterministic #1); for "the single top restaurant," that's actually safer than `RANK`. Make them choose consciously.
- Forgetting the `OVER()` `ORDER BY` on a running total → it sums the whole partition instead of accumulating.
- Mixing an aggregate and a window at the same level → stage it with a `WITH` (CTE). Good warm-up for Day 10.
- Older SQLite (< 3.25) has **no** window functions — the bundled db + current DB Browser are fine.

## 🏃 Running ahead? (fills a light day)
- `DENSE_RANK` vs `RANK` on the rider leaderboard — show the gap behaviour.
- A 7-day moving average with `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`.
- *"Is the Q3 dip fewer **new** customers or existing ones leaving?"* → the cohort query on Day 10 separates the two.

## ➡️ Tomorrow
**Day 10 — CTEs, views & the capstone.** Release with `tools/release-day.ps1 10`. Pre-read: `../Day_10_CTE_Reporting_Capstone/prep.md`.
