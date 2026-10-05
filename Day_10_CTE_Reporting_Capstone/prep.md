# 🗓️ Day 10 prep — CTEs, views & the capstone: *from a pile of files to a live report*

**Module 3 · SQL** · Tool: DB Browser for SQLite · **one 3-hour class, taught twice (capstone)**

> The finale. Refactor an ugly nested subquery into readable, independently-testable stacked CTEs; ship a `CREATE VIEW` the dashboard points at; and close the loop — Day 1's pile of files becomes Day 10's one live report. Leave real time at the end for the capstone debrief; that conversation is the graduation.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the nested→CTE refactor demo, `CREATE VIEW`, the full capstone answer key (32 restaurants beat their city average; fraud report; retention proof; top-5 products; the `exec_report` view, Mumbai 65% late), and the **capstone debrief prompts**.
- [ ] Open the deck `Day_10_deck.pptx` once; click through it.
- [ ] Plan your clock so **15–20 min** survives at the end for the class debrief — don't let the build eat it.

## 🌅 This morning — release Day 10
```powershell
tools/release-day.ps1 10
```
Students run `git pull upstream main` to get `Day_10_CTE_Reporting_Capstone/`.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 10 — one 3-hour class (capstone)
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: nested -> CTE, CREATE VIEW  :00:00, 10m
    Read the brief                         :00:10, 5m
    section Build
    The capstone report                    :00:15, 110m
    section Share
    Capstone debrief (whole class)         :02:05, 40m
    section Wrap
    Submit final PR + graduate             :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | Put an ugly 2-level nested subquery on screen; rewrite it live as stacked CTEs. Then `CREATE VIEW exec_report AS …` and point the "dashboard" at one name. |
| 0:10–0:15 | **Brief** | Students read `instructions.md`. |
| 0:15–2:05 | **Build** | Nested→CTE refactor, fraud report, retention query, top-5 products, and a shipped `exec_report` VIEW. |
| 2:05–2:45 | **Capstone debrief** | Run the three class prompts (below). This is the main event — not a filler. |
| 2:45–3:00 | **Wrap** | Students commit their capstone `.sql` + open their final PR. Graduate them. |

## 🎬 The demo in one line
Rewrite a 2-level nested subquery as stacked, independently-testable CTEs — "same answer, but now I can *read* it" — then `CREATE VIEW exec_report` so the dashboard points at one name, the SQL living in the database. Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
The capstone `.sql` — nested→CTE refactor (restaurants above their city's average), fraud report, retention (monthly-active) query, top-5 products, and a shipped `exec_report` **VIEW** — plus a one-line pitch to the COO. As a Pull Request.

## ⚠️ Watch-outs
- **Fan-out double-counting** (the Day 8 warning comes due): joining `order_items` into the revenue report inflates `SUM(order_value)`. Aggregate items in their own CTE, then join the totals.
- `CREATE VIEW` fails if the view already exists → `DROP VIEW IF EXISTS exec_report;` first.
- Cohort `WHERE a.ym > c.cohort` vs `>=` — decide whether the signup month itself counts as "retained." (The key uses `>`.)
- A VIEW is a stored query, not a materialised table — you can't index or parameterise it like one (in SQLite).

## 🏁 Capstone debrief — run these with the whole class
- **Which city should Ops fix first, and what's the one-line pitch to the COO?** (Mumbai lateness, ~65%.)
- **Does the fraud list look like real fraud or false positives?** How would you tune the rules?
- **The Q3 dip — fewer *new* customers, or existing ones leaving?** (The cohort query separates acquisition from churn.)

## 🎓 After the capstone
**Bootcamp complete — no further release.** Collect the final PRs, celebrate, and point graduates at their capstone debrief answers as the portfolio piece: *from a Day 1 pile of files to a Day 10 live executive report.*
