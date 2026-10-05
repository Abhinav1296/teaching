# Day 5 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
Use a ~20-row sample of `orders_enriched.csv`.
1. **(3 min)** Select the data ▸ **Insert ▸ PivotTable**. Drag `city` to **Rows**, `order_value` to **Values**. "I never wrote a formula — Excel aggregated for me."
2. **(2 min)** Right-click the value ▸ **Value Field Settings** ▸ switch **Sum → Average**. Then back to Sum. Show how the whole table recomputes.
3. **(2 min)** Drag `cuisine` under `city` in Rows → instant two-level breakdown. Remove it. "Reshaping a report = dragging a field."
4. **(2 min)** **Insert ▸ Slicer** on `city`; click buttons and watch it filter.
5. **(1 min)** With the pivot selected, **Insert PivotChart** (clustered bar). Done — "that's the dashboard; the rest is just more pivots."

## ✅ Expected answers (verified against the full dataset)
- **% late by city (Average of is_late), worst→best:**
  Mumbai ≈ **65%**, Delhi ≈ 42%, Bengaluru ≈ 40%, Chennai ≈ 26%, Pune ≈ 19%, Hyderabad ≈ 15%.
  → **Headline:** *"Mumbai is our delivery problem — ~2 in 3 orders arrive late, 4× Hyderabad's rate."*
- **Top cuisines by revenue (delivered):** Healthy, Chinese, Desserts lead the pack (close race; order can shift a little by filter). Students should name the top 1–2 confidently.
- **Orders by hour:** clear bimodal peaks at **lunch (12–14)** and **dinner (19–22)**.
- **Revenue by city:** fairly even across the 6 cities (Hyderabad slightly highest by volume) — the *interesting* story is the late-rate, not revenue. Good discussion: "revenue looks fine everywhere, but service quality is wildly uneven."

> Exact rupee figures depend on the generated data; have students read them off their own pivot. The **shape** (Mumbai worst on lateness, bimodal peaks) is stable.

## 💡 Teaching points / gotchas
- If `order_value` shows **Count** instead of **Sum**, it imported as text — re-type the column (callback to Day 3 cleaning).
- "% late" as **Average of a 1/0 column** is the aha moment — write it on the board.
- Slicer controlling multiple pivots: they must share the same PivotCache (built from the same source) — *Report Connections* on the slicer.
- Push the analytical leap: "Mumbai is worst — but *why*? That's a **diagnostic** question (Day 2 vocabulary), and you'll answer it with window functions on Day 9."
