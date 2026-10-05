# Day 3 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
Use a tiny 6-row junk sample (type it, or copy 6 rows from `raw_orders.csv`).
1. **(2 min)** *Data ▸ Get Data ▸ From Text/CSV* → **Transform Data** to open the Power Query editor. Show the **Applied Steps** panel on the right — "this is a recorded recipe, not a one-time edit."
2. **(2 min)** Right-click a column header ▸ **Remove Duplicates**. Then select all columns ▸ **Home ▸ Remove Rows ▸ Remove Duplicates**. Watch the step get added.
3. **(2 min)** Select City ▸ **Transform ▸ Format ▸ Trim**, then **Transform ▸ Format ▸ Capitalize Each Word**. Then **Replace Values** `Bangalore → Bengaluru`.
4. **(2 min)** Select Order Value ▸ **Replace Values** `Rs. →` (empty) and `, →` (empty) ▸ **Change Type ▸ Whole Number**. Point at any error cells.
5. **(2 min)** **Close & Load To… ▸ Table** on an existing sheet. Then change a value in the source CSV, hit **Data ▸ Refresh All**, and show the clean table update itself. Punchline: "tomorrow's dirty file cleans itself."

## ✅ Expected clean result
- **Cities:** exactly 6 → `Bengaluru, Mumbai, Delhi, Hyderabad, Pune, Chennai`.
  Aliases to map: `Bangalore→Bengaluru`, `Bombay→Mumbai`, `Madras→Chennai`, `Hyd→Hyderabad`, `New Delhi→Delhi`.
- **Duplicates removed:** ~40 exact-duplicate rows were injected.
- **Nulls:** ~3% of rows have blank Customer ID; ~5% have blank Order Value. Dropping blanks removes on the order of ~100 rows — exact count varies; the important thing is they *state* the number and the rule.
- **Order Value:** `Rs. 1,234` and `1,234` → `1234` (Whole Number). No text left.
- **Dates:** all coerce to one Date type despite 5 source formats.
- **Delivered Mins:** a handful of negatives (~2% of the sampled rows) → set to null/removed.
- **Status/Payment:** trimmed + Title Case; `Canceled→Cancelled`.

## 💡 Teaching points / gotchas
- **"Using Locale"** conversion solves the `dd-mm-yyyy` vs `mm/dd/yyyy` ambiguity — some rows are genuinely ambiguous (e.g. 03/04 vs 04/03); acknowledge there's no perfect answer, which is *why* clean source data matters.
- Order of steps matters: **Trim before Replace**, or trailing-space variants won't match.
- Removing vs keeping nulls is a **business decision** — make them justify it (Finance would rather *flag and investigate* blank values than silently delete revenue).
- The whole point: no manual cell edits. If they "fixed" cells by hand, the file won't refresh next month.
