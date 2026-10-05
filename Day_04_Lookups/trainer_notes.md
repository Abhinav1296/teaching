# Day 4 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
Two tiny tables on screen: a 5-row `orders` and a 4-row `restaurants`.
1. **(3 min)** Live-type `=VLOOKUP(A2, Rest!$A:$C, 2, FALSE)`. Drag down. Then **break it on purpose**:
   - change `2` to `3` → wrong column returned (teach: the index counts from the lookup column).
   - change `FALSE` to `TRUE` → wrong/approx match on unsorted data (teach: almost always use FALSE).
   - forget the `$` and drag → range drifts (teach: absolute refs).
2. **(3 min)** Rebuild the same column with `=INDEX(Rest!$B:$B, MATCH(A2, Rest!$A:$A, 0))`. Point out it can look **left**, which VLOOKUP can't.
3. **(2 min)** Wrap in `=IFERROR(…, "Unknown")`; delete a key in the lookup table to show `#N/A` → `Unknown`.
4. **(2 min)** If on 365: `=XLOOKUP(A2, Rest!$A:$A, Rest!$B:$B, "Unknown")` — one function, built-in not-found value. "VLOOKUP is the interview question; XLOOKUP is what you'll actually use."

## ✅ Expected result
- 4 new columns resolve cleanly; no `#N/A` after IFERROR.
- `city_mismatch` flag: `=IF(order_city = VLOOKUP(restaurant_id, Rest!, city_col, FALSE), "", "MISMATCH")`.
  There are a small number (~3% of orders) where delivery city ≠ restaurant city — these are the deliberate cross-city edge cases (also the Day 8/10 fraud signal). Exact count varies with the data; the skill is building the flag, not hitting a magic number.

## 💡 Teaching points / gotchas
- The #1 student bug: non-absolute lookup range drifting on drag-down.
- #2: pasting IDs with trailing spaces (from an earlier copy) → lookups "mysteriously" fail → `TRIM()` the key. Nice callback to Day 3.
- INDEX-MATCH's MATCH last arg `0` = exact match (the VLOOKUP FALSE equivalent).
- Reinforce: a VLOOKUP *is* a join. Tell them: "On Day 8 you'll do this exact enrichment in SQL with one `JOIN` across the whole table at once — no dragging."
