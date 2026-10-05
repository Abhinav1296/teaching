# 🗓️ Day 5 prep — PivotTables & reporting: *reshape a report by dragging, not formulas*

**Module 2 · Advanced Excel** · Tool: Excel · **one 3-hour class, taught twice**

> Today students find the headline of the whole bootcamp: **Mumbai is the delivery problem — ~65% of orders arrive late, ~4× Hyderabad's rate.** They'll get there with zero formulas — just dragging fields. The aha moment to write on the board: *"% late = Average of a 1/0 column."*

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the pivot demo (Rows/Values → Sum→Average → two-level → slicer → PivotChart) and the verified answers (% late by city, top cuisines, bimodal hour peaks).
- [ ] Open the deck `Day_05_deck.pptx` once; click through it.
- [ ] Have `orders_enriched.csv` ready, plus a ~20-row sample for the live demo.

## 🌅 This morning — release Day 5
```powershell
tools/release-day.ps1 05
```
Students run `git pull upstream main` to get `Day_05_Pivot_Reporting/`.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 5 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: drag fields, slicer, chart  :00:00, 10m
    Read the brief                         :00:10, 5m
    section Build
    Build the ops report (4 pivots)        :00:15, 120m
    section Share
    Show & tell: the Mumbai headline       :02:15, 30m
    section Wrap
    Submit your PR                         :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | Drag `city`→Rows, `order_value`→Values ("I never wrote a formula"); Sum→Average; `Average of is_late` = % late; add a slicer + PivotChart. |
| 0:10–0:15 | **Brief** | Students read `instructions.md`. |
| 0:15–2:15 | **Build** | They build % late by city, top cuisines by revenue, orders by hour, revenue by city — with a slicer and one PivotChart. |
| 2:15–2:45 | **Show & tell** | Students read the Mumbai late-rate off their own pivot and pitch the one-line headline. |
| 2:45–3:00 | **Wrap** | Students commit + open their Day 5 PR, preview Day 6. |

## 🎬 The demo in one line
Drag `city` to Rows and `order_value` to Values — "I never wrote a formula" — then the aha: `Average of is_late` **is** the % late rate; finish with a slicer and a PivotChart. Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
A pivot report answering **% late by city, top cuisines by revenue, orders by hour, revenue by city** — with a slicer and one PivotChart — plus a one-line headline for the COO. As a Pull Request.

## ⚠️ Watch-outs
- If `order_value` defaults to **Count** instead of Sum, it imported as **text** → re-type the column (Day 3 cleaning callback).
- **"% late = Average of a 1/0 column"** is the moment the room gets pivots. Write it on the board and make them say it back.
- A single slicer driving **multiple** pivots needs them on a shared PivotCache (same source) → *Report Connections* on the slicer.
- The *interesting* story is the late-rate, not revenue — revenue is fairly even across cities. Good discussion: "service quality is wildly uneven even though revenue looks fine everywhere."

## 🏃 Running ahead? (fills a light day)
- *"Mumbai is worst — but **why**?"* That's a **diagnostic** question (Day 2 vocabulary) they'll answer with window functions on Day 9.
- Add a `cuisine` × `city` crosstab, or a Timeline filter on `order_datetime`.
- Have them rank cities best→worst and sanity-check against the expected shape (Mumbai ≈65%, Hyderabad ≈15%).

## ➡️ Tomorrow
**Day 6 — Macros & automation (VBA).** Release with `tools/release-day.ps1 06`. Pre-read: `../Day_06_Macros_Automation/prep.md`.
