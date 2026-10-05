# 🗓️ Day 7 prep — SQL basics: *WHERE filters rows, HAVING filters groups*

**Module 3 · SQL** · Tool: DB Browser for SQLite · **one 3-hour class, taught twice**

> Module 3 opens. Same FoodCo data they cleaned in Excel — now a real database. Build one query up live, clause by clause, and land hard on the single most-tested distinction: **WHERE filters rows, HAVING filters groups.** Today is also the first time the whole dataset ships.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the clause-by-clause demo and the verified answer key (2,405 delivered orders, ₹1.35M revenue, 561 AOV; city counts).
- [ ] Open the deck `Day_07_deck.pptx` once; click through it.
- [ ] **Datasets release today** — confirm `foodco.db` + the CSVs are in the Day 7 folder, and open the `.db` in DB Browser once so you know it's intact.
- [ ] Confirm the training machine has DB Browser installed, and have the install link ready for students who missed the Day 6 heads-up.

## 🌅 This morning — release Day 7
```powershell
tools/release-day.ps1 07
```
Students run `git pull upstream main` to get `Day_07_SQL_Basics/`. **This release carries the whole dataset + `foodco.db`** — it's the first time students get the database, so expect a few open/install hiccups in the first 15 minutes.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 7 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: build a query clause by clause :00:00, 10m
    Read the brief                            :00:10, 5m
    section Build
    Answer the 5 query questions              :00:15, 120m
    section Share
    Show & tell: compare queries              :02:15, 30m
    section Wrap
    Submit your PR                            :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | In DB Browser ▸ Execute SQL: `SELECT … LIMIT 5` → add `WHERE` → swap to `GROUP BY` → `HAVING` → `ORDER BY`. Punchline on the board. |
| 0:10–0:15 | **Brief** | Students read `instructions.md`. (Allow extra slack here for stragglers opening `foodco.db`.) |
| 0:15–2:15 | **Build** | They answer the 5 questions (counts, revenue, AOV, group-by-city, a HAVING filter). |
| 2:15–2:45 | **Show & tell** | Compare queries — same answer, different clause order; catch the WHERE-vs-HAVING slips. |
| 2:45–3:00 | **Wrap** | Students commit their `.sql` + open their Day 7 PR, preview Day 8. |

## 🎬 The demo in one line
Build **one** query live, clause by clause — SELECT → WHERE → GROUP BY → HAVING → ORDER BY — so the room watches "each row is a *group* now, not an order," landing on *WHERE filters rows, HAVING filters groups*. Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
A `.sql` file answering the 5 questions (total/revenue/AOV of delivered orders, orders per city, a count with a threshold, payment-method revenue, a HAVING filter), as a Pull Request.

## ⚠️ Watch-outs
- Putting an aggregate in `WHERE` (`WHERE COUNT(*)>400`) → must be `HAVING`. This is *the* lesson; expect it repeatedly.
- Forgetting `status='Delivered'` → double-counting cancelled/refunded revenue.
- `ORDER BY` before `GROUP BY` → syntax error. Reinforce clause order.
- Reaching for `SUM(order_value)` when the question wants `COUNT(*)` of qualifying rows.

## 🏃 Running ahead? (fills a light day)
- `LIMIT` as a safety habit on big tables.
- *"Which city has the highest **AOV**, not just the most orders?"*
- Tease joins: *"How would you add the customer's **name** to each row?"* — you can't, yet. That's Day 8.

## ➡️ Tomorrow
**Day 8 — SQL joins.** Release with `tools/release-day.ps1 08`. Pre-read: `../Day_08_SQL_Joins/prep.md`.
