# 🍔 FoodCo Data Analytics Bootcamp — 10-Day Intensive (100% Hands-On)

> **Zero lectures. Every concept is learned by doing.** Students fork the public course repo (`student-repo/`), `git pull` the day's folder each morning, read `instructions.md`, and solve a real business problem using one continuous dataset that grows with them across all 10 days. *(This `MASTER_PLAN.md` is your trainer-side copy — see [How this repo is organised](#how-this-repo-is-organised--two-repos-side-by-side).)*

---

## The story that runs through everything

You've all just joined **FoodCo**, a fast-growing Indian food-delivery & quick-commerce startup operating in Bengaluru, Mumbai, Delhi, Hyderabad, Pune, and Chennai. You are the brand-new analytics team. Over 10 days you will take the company's raw, messy operational data and turn it into clean reports, automated dashboards, and SQL-powered answers that leadership actually uses to make decisions.

**One dataset, ten days.** The messy order export you clean in Excel in Week 1 is the *same* data you will query in SQL in Week 2. Nothing is throwaway.

```
         MODULE 1                 MODULE 2                        MODULE 3
      Foundations              Advanced Excel                 SQL for Analytics
     (Day 1 – Day 2)           (Day 3 – Day 6)                 (Day 7 – Day 10)

  Raw artifacts  ──►  raw_orders.csv ──► clean ──► enrich ──► pivot ──► automate
  (CSV/JSON/txt)           │   (Power Query)  (VLOOKUP)  (Pivots)   (Macros)
                           │
                           └──────────────►  foodco.db  ──► SELECT ──► JOIN ──► WINDOW ──► CTE
                                             (same entities, now in a database)
```

---

## How this repo is organised — two repos, side by side

The course lives in **two sibling repos**. Students only ever see the first one; everything that would spoil the answers lives in the second, which **never leaves your machine.**

```
data analytics/
├── student-repo/            ← PUBLIC. Forked by students. Pushed ONE DAY AT A TIME.
│   ├── README.md            ← student-facing course intro
│   ├── SETUP.md             ← Excel, DB Browser for SQLite, Git
│   ├── GIT_WORKFLOW.md      ← fork → pull upstream → branch → PR
│   ├── .gitignore
│   ├── datasets/            ← the FoodCo data universe — RELEASED WITH DAY 7, not before
│   │   ├── customers.csv  restaurants.csv  delivery_partners.csv  menu_items.csv
│   │   ├── orders.csv  order_items.csv  payments.csv
│   │   ├── schema.sql       ← portable DDL (SQLite / PostgreSQL / MySQL)
│   │   ├── foodco.db      ← prebuilt SQLite DB (zero setup for the SQL module)
│   │   └── DATA_DICTIONARY.md
│   └── Day_00 … Day_10/     ← each has instructions.md + that day's data files ONLY
│
└── trainer-repo/            ← PRIVATE (this repo). Never pushed. Your whole kit.
    ├── MASTER_PLAN.md       ← you are here (the full 10-day plan)
    ├── TRAINER_README.md    ← what's in this bundle + the three golden rules
    ├── DAILY_PUSH_PLAYBOOK.md ← exactly what to push each morning + the commands
    ├── tools/
    │   ├── generate_data.py ← seeded generator → writes into student-repo/datasets/
    │   ├── release-day.ps1 / .sh ← one-command, safe, single-folder release
    │   └── decks/           ← the pptxgenjs deck generators (rebuild any deck)
    └── Day_00 … Day_10/     ← each has trainer_notes.md + prep.md + Day_XX_deck.pptx
```

**Who gets what, per day:**
- **Students** (in `student-repo/Day_XX/`) get `instructions.md` — the scenario, the files, the exact task — plus that day's data files. Nothing else.
- **You** (in `trainer-repo/Day_XX/`) get three files they never see: `trainer_notes.md` (your 10-min demo script **+ the verified answer key**), `prep.md` (your minute-by-minute run-sheet — open it the night before), and `Day_XX_deck.pptx` (the classroom deck you project).

**The daily mechanic** — release one `Day_XX` folder from `student-repo/` the morning you teach it (students then `git pull`), so future answers stay hidden and students practise Git daily. ⚠️ Never `git add .` in `student-repo/`; it would leak all 10 days. The `tools/release-day.ps1 XX` script does it safely. Full details and the release schedule are in [`DAILY_PUSH_PLAYBOOK.md`](DAILY_PUSH_PLAYBOOK.md); the bundle tour is in [`TRAINER_README.md`](TRAINER_README.md).

---

## The 10-day map

| Day | Module | Theme | Core skill | Dataset used |
|----|--------|-------|-----------|--------------|
| 01 | Foundations | Data types & the analytics lifecycle | Structured / semi / unstructured | Mixed artifacts (CSV, JSON, txt, GPS) |
| 02 | Foundations | 4 analytics types + data ethics | Descriptive→Prescriptive, PII audit | `business_questions.csv`, `customers_pii.csv` |
| 03 | Adv. Excel | Data cleaning with **Power Query** | Nulls, dupes, types, standardisation | `raw_orders.csv` (dirty) |
| 04 | Adv. Excel | **VLOOKUP / INDEX-MATCH / XLOOKUP** | Enriching a fact table with lookups | `orders_clean.csv` + lookup tables |
| 05 | Adv. Excel | **Pivot Tables & Charts** | Sales/ops reporting & dashboard | `orders_enriched.csv` |
| 06 | Adv. Excel | **Macros & automation** | Record VBA, conditional formatting | `orders_enriched.csv` |
| 07 | SQL | **SELECT / WHERE / GROUP BY / HAVING** | Aggregation & filtering | `foodco.db` |
| 08 | SQL | **Joins** (INNER / LEFT / RIGHT / FULL) | Combining tables, finding orphans | `foodco.db` |
| 09 | SQL | **Window functions** (RANK, LAG, LEAD) | Ranking, running totals, churn gaps | `foodco.db` |
| 10 | SQL | **CTEs, subqueries & reporting** (capstone) | Fraud + retention report → BI | `foodco.db` |

**Signals baked into the data** (so the tasks have real answers): a visible **Q3 retention dip** (active customers peak in June, fall ~30% in Jul–Sep), **~2% fraudulent payments** with detectable patterns, and **late-delivery hotspots** (Mumbai ~65% late vs Hyderabad ~15%; peak hours ~2× off-peak).

---

## Daily rhythm (no lecture time)

| Time | What happens |
|------|-------------|
| 0:00–0:10 | **Trainer live demo** (projector) — you live-code the one function/query of the day on a tiny example. No slides. |
| 0:10–0:15 | Students open `instructions.md`, read the scenario + task. |
| 0:15–2:15 | **Hands-on.** Students build the deliverable. You float and unblock. |
| 2:15–2:45 | **Show & tell.** 2–3 students screen-share their answer; class compares numbers. |
| 2:45–3:00 | You reveal the "official" answer from `trainer_notes.md`; discuss gotchas. |

---

# The full day-by-day plan

Each day below lists the four things you asked for: **(1) Folder & files, (2) Business scenario, (3) Practical task, (4) Your 10-minute live demo.** The same detail lives in each day's `instructions.md` (student view) and `trainer_notes.md` (your demo + solution).

---

## 📅 Day 1 — Data Foundations: what *kind* of data is this?

**1. Folder & files** — `Day_01_Data_Foundations/`
```
instructions.md   trainer_notes.md
data/ orders_sample.csv  app_events.json  customer_reviews.txt
      gps_pings.csv  data_inventory.csv
```
**2. Business scenario** — It's your first morning at FoodCo and Ops has dumped eight random files on your desk — spreadsheets, app logs, customer reviews, a menu photo. Before anyone can analyse anything, leadership needs you to say *what each type of data is* and *where it sits in the analytics lifecycle*.

**3. Practical task** — Open each artifact in `data/`. Fill `data_inventory.csv`: label every artifact **Structured / Semi-structured / Unstructured**, and note which lifecycle stage (collect → clean → analyse → report) it belongs to. Then write 3 bullet points: which of these files could go straight into Excel, which need parsing first, and which can't be analysed without being transformed.

**4. Your 10-min live demo** — Open `orders_sample.csv`, `app_events.json`, and `customer_reviews.txt` side by side (Excel + Notepad). Point at the shape of each: rows×columns vs. nested keys vs. free prose. Don't define the terms on a slide — let the files *show* the difference.

---

## 📅 Day 2 — Analytics types & data ethics

**1. Folder & files** — `Day_02_Analytics_Types_and_Ethics/`
```
instructions.md   trainer_notes.md
data/ business_questions.csv  customers_pii.csv  orders_sample.csv
```
**2. Business scenario** — Leadership fires ten questions at the new team, from "what was revenue in August?" to "what discount should we give each customer to keep them?". Meanwhile Legal flags that the customer table is full of personal data and nobody has reviewed it.

**3. Practical task** — (a) In `business_questions.csv`, tag each of the 10 questions as **Descriptive / Diagnostic / Predictive / Prescriptive**. (b) Open `customers_pii.csv` and run a mini **governance audit**: highlight every column that is PII, propose a masking rule for each (e.g., show only last 4 of phone), and flag one question from part (a) that would be unethical to answer with this data as-is. (c) In Google Sheets, compute 3 descriptive stats on `orders_sample.csv` (total revenue, avg order value, order count) to feel the difference between "describing" and "predicting".

**4. Your 10-min live demo** — Take one question ("how many orders yesterday?" vs "which customers will churn?") and show live how the first is answered with `=COUNT()` today while the second needs a model + history. Then open `customers_pii.csv` and mask a phone number live with `="xxxxx"&RIGHT(C2,4)`.

---

## 📅 Day 3 — Data cleaning with Power Query

**1. Folder & files** — `Day_03_Data_Cleaning_PowerQuery/`
```
instructions.md   trainer_notes.md   raw_orders.csv   (dirty: 1,440 rows)
```
**2. Business scenario** — Finance tried to total last quarter's revenue from the raw order export and got garbage — the file has duplicate rows, blank values, five different date formats, "₹1,234"-style text amounts, and city names spelled six different ways. They need a trustworthy clean table.

**3. Practical task** — Load `raw_orders.csv` into **Power Query**. Remove duplicate rows; remove/flag rows with null Customer ID or Order Value; **trim & standardise** City (`bengaluru`, `BENGALURU`, `Bangalore` → `Bengaluru`); convert Order Value text ("Rs. 1,234") to a real number; set a single date type on Order Date; fix the impossible negative delivery times. Load the result to a sheet as `clean_orders`. Report: how many rows did you drop, and why?

**4. Your 10-min live demo** — On a 6-row junk sample: Data ▸ **Get Data ▸ From Text/CSV**, then live-click **Remove Duplicates**, **Trim**, **Replace Values**, and **Change Type**. Show the **Applied Steps** panel updating — emphasise that Power Query *records the recipe* so tomorrow's file cleans itself.

---

## 📅 Day 4 — Lookups: VLOOKUP / INDEX-MATCH / XLOOKUP

**1. Folder & files** — `Day_04_Lookups/`
```
instructions.md   trainer_notes.md
orders_clean.csv   restaurants.csv   delivery_partners.csv
```
**2. Business scenario** — The clean orders table only has ID codes (`R017`, `P092`) — useless in a report nobody can read. The CXO wants an orders sheet that shows restaurant **name**, **cuisine**, delivery **partner name**, and the partner's **rating** next to every order.

**3. Practical task** — In `orders_clean.csv`, add columns and use **VLOOKUP** (then redo at least one with **INDEX-MATCH** and, if on Excel 365, **XLOOKUP**) to pull `restaurant_name`, `cuisine` from `restaurants.csv` and `partner_name`, `rating` from `delivery_partners.csv`. Wrap lookups in **IFERROR** so missing matches read "Unknown" instead of `#N/A`. Bonus: one restaurant has orders in a city it doesn't operate in — find it with a lookup mismatch.

**4. Your 10-min live demo** — Two tiny tables on screen. Live-type `=VLOOKUP(A2, Rest!$A:$C, 2, FALSE)`, break it on purpose (wrong column index, approximate match TRUE) so they see the classic failures, then rebuild the same result with `INDEX(MATCH())` and wrap in `IFERROR`.

---

## 📅 Day 5 — Pivot Tables & Pivot Charts (the weekly ops review)

**1. Folder & files** — `Day_05_Pivot_Reporting/`
```
instructions.md   trainer_notes.md   orders_enriched.csv
```
**2. Business scenario** — Every Monday the leadership team argues from gut feel. You're going to end that: build the one-page dashboard that answers "where's the money and where are we failing on delivery?" at a glance.

**3. Practical task** — From `orders_enriched.csv` build pivot tables for: **revenue by city**, **revenue by cuisine**, **top 5 restaurants by revenue**, **orders by hour of day**, and **% late deliveries by city**. Add a **Slicer** for city and a **Timeline** for order date. Drop two **Pivot Charts** onto a `Dashboard` sheet. Write the one headline finding you'd tell the CEO (hint: look at which city is drowning in late orders).

**4. Your 10-min live demo** — Insert ▸ PivotTable on a 20-row sample. Drag City to Rows, Order Value to Values, switch Sum↔Average, add a Slicer, then **Insert PivotChart**. Show how dragging one field re-computes everything — "this is why we never hand-type a SUMIF again."

---

## 📅 Day 6 — Macros & automation

**1. Folder & files** — `Day_06_Macros_Automation/`
```
instructions.md   trainer_notes.md   orders_enriched.csv
```
**2. Business scenario** — You now rebuild that ops report every single morning: format headers, red-flag the late orders, refresh the pivot. It's 20 minutes of mind-numbing clicking. Automate the whole thing into one button.

**3. Practical task** — **Record a macro** that: bolds + colours the header row, auto-fits columns, applies **conditional formatting** to turn `is_late = 1` rows red, and refreshes all pivots. Stop recording, open the VBA editor to read the generated code, then assign the macro to a **button** on the sheet. Save as `.xlsm`. Bonus: add a `MsgBox "Report refreshed: " & Now()` line by hand.

**4. Your 10-min live demo** — Developer ▸ **Record Macro**, do three formatting actions, Stop. Open **Alt+F11** and show the recorded VBA. Change one literal (a colour index) in code, re-run, and drop a button on the sheet via **Form Controls**. Message: "the macro recorder writes the code *for* you — you just edit it."

---

## 📅 Day 7 — SQL foundations: SELECT / WHERE / GROUP BY / HAVING

**1. Folder & files** — `Day_07_SQL_Basics/`
```
instructions.md   trainer_notes.md   answers.sql   (uses ../datasets/foodco.db)
```
**2. Business scenario** — The data has outgrown Excel and now lives in a database. Ops wants fast answers: busiest cities, highest-value orders, which cuisines clear a volume bar — straight from SQL.

**3. Practical task** — Against `foodco.db`, write queries in `answers.sql`: total & average order value overall; order count **by city** (GROUP BY) sorted desc; orders above ₹1,500 (WHERE); delivered-only revenue by payment method; and cities with **more than 400 orders** (GROUP BY … HAVING — kept single-table; cuisine/customer questions need joins, which land Day 8). Write one sentence under each query stating the business takeaway.

**4. Your 10-min live demo** — On the `orders` table: `SELECT` a few columns, add a `WHERE status='Delivered'`, then `GROUP BY city` with `COUNT(*)` and `SUM(order_value)`, and finish by bolting on `HAVING COUNT(*) > 100`. Stress the clause order and that **WHERE filters rows, HAVING filters groups.**

---

## 📅 Day 8 — Joins: the 360° order view

**1. Folder & files** — `Day_08_SQL_Joins/`
```
instructions.md   trainer_notes.md   answers.sql   (uses ../datasets/foodco.db)
```
**2. Business scenario** — No single table tells the full story. Marketing wants to know who the top customers are *and* which registered customers have **never ordered** so they can be win-back targeted.

**3. Practical task** — Write: an **INNER JOIN** of `orders` + `customers` + `restaurants` showing customer name, restaurant name, cuisine, value; a **LEFT JOIN** from `customers` to `orders` with `WHERE order_id IS NULL` to list **customers who never ordered** (there are 63); a join to `delivery_partners` to find each city's busiest rider; and a join of `orders` to `payments` to list flagged/fraud orders with the customer's name attached. Note how INNER vs LEFT changes your row counts.

**4. Your 10-min live demo** — Two tables (`orders`, `customers`). Show `INNER JOIN` returns only matches, then switch to `LEFT JOIN` and add `WHERE c.customer_id IS NULL` to reveal the "no-match" rows. Draw the two-circle Venn on the whiteboard *as* the query runs.

---

## 📅 Day 9 — Window functions: ranking, running totals & churn gaps

**1. Folder & files** — `Day_09_Window_Functions/`
```
instructions.md   trainer_notes.md   answers.sql   (uses ../datasets/foodco.db)
```
**2. Business scenario** — Leadership is alarmed: retention seems to have dropped in Q3. They want the #1 restaurant **per city**, a running revenue total by month, and — the big one — how long each customer waits between orders, to spot who's slipping toward churn.

**3. Practical task** — Using window functions on `foodco.db`: `RANK()`/`ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue DESC)` for top restaurant per city; a **running monthly revenue total** with `SUM() OVER (ORDER BY month)`; `LAG(order_datetime) OVER (PARTITION BY customer_id ORDER BY order_datetime)` to compute **days since that customer's previous order**; and flag customers whose gap jumped in Jul–Sep. Confirm the Q3 dip in the numbers.

**4. Your 10-min live demo** — On a handful of orders: `ROW_NUMBER() OVER (PARTITION BY city ORDER BY order_value DESC)` and show the counter restart per city. Then `LAG(order_value)` to put the previous row's value on the current row — "windows let a row see its neighbours without a self-join."

---

## 📅 Day 10 — CTEs, subqueries & the executive report (capstone)

**1. Folder & files** — `Day_10_CTE_Reporting_Capstone/`
```
instructions.md   trainer_notes.md   answers.sql   (uses ../datasets/foodco.db)
```
**2. Business scenario** — Capstone. The exec team wants ONE reporting layer that combines everything: a **fraud watchlist**, a **monthly retention/cohort view**, and **top-5 products by revenue** — clean enough to plug straight into Power BI / Tableau.

**3. Practical task** — Refactor a messy nested subquery into readable **CTEs** (`WITH`). Build: (a) a fraud report joining `payments` + `orders` + `customers`, including payment-vs-order **amount mismatches**; (b) a monthly cohort/retention table proving the Q3 drop; (c) top 5 menu items by revenue via `order_items`. Save the final reporting query as a `VIEW`, then (bonus) connect `foodco.db` to **Power BI or Tableau** and build one chart on top of the view.

**4. Your 10-min live demo** — Take a 3-level nested subquery and refactor it live into two stacked CTEs, showing readability win. Then `CREATE VIEW exec_report AS …` and `SELECT * FROM exec_report` — "your dashboard tool just points at this one view."

---

## For the trainer

- **Reproducible data:** everything comes from `tools/generate_data.py` (seed = 42), which writes into `student-repo/datasets/`. Delete the CSVs/DB and re-run `python tools/generate_data.py` to regenerate identical data, or change the seed for a fresh cohort.
- **Answer keys** live in each day's `trainer_notes.md` — here in `trainer-repo/` **only**. They never ship to GitHub; students get `instructions.md` + data in `student-repo/`.
- **Night-before run-sheets:** each day's `prep.md` (here in `trainer-repo/`) is your minute-by-minute plan — demo one-liner, run-sheet, watch-outs, release command.
- **Setup:** see [`../student-repo/SETUP.md`](../student-repo/SETUP.md). The SQL module needs only the free **DB Browser for SQLite** — no server install — but `schema.sql` + the CSVs let advanced students load PostgreSQL/MySQL instead.
- **Data dictionary:** [`../student-repo/datasets/DATA_DICTIONARY.md`](../student-repo/datasets/DATA_DICTIONARY.md).

Happy teaching. 🚀
