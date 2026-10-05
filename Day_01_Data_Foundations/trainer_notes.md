# Day 1 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
**Goal:** let the files *show* the difference — do not define terms on a slide.

1. **(2 min)** Open `data/orders_sample.csv` in Excel. Point: "one value per cell, every row the same shape. I can `=SUM(order_value)` right now." → that's **structured**.
2. **(3 min)** Open `data/app_events.json` in a browser/VS Code. Point at the nested `payload` object and the `coupon: null`. "There *is* structure — keys — but it's nested and ragged. Excel can't sum this until I flatten it." → **semi-structured**. Mention GPS pings are the same idea (structured-ish log, but a stream).
3. **(3 min)** Open `data/customer_reviews.txt`. "No rows, no columns, emojis, opinions. There is zero I can `=AVERAGE()` here until I turn text into numbers (sentiment)." → **unstructured**.
4. **(2 min)** Show the lifecycle as a path, live: this CSV is *collected* → the reviews need *cleaning/parsing* → both feed *analysis* → the pivot you'll build Day 5 is *reporting*. End on: "Today you just label the pile. The rest of the bootcamp is turning the messy ones into the clean one."

## ✅ Answer key — `data_inventory.csv`
| artifact | classification | lifecycle / analytics use |
|----------|---------------|---------------------------|
| orders_sample.csv | Structured | ready to analyse/report (descriptive) |
| app_events.json | Semi-structured | needs flatten/parse before analysis |
| customer_reviews.txt | Unstructured | needs NLP/sentiment to become analysable |
| gps_pings.csv | Semi-structured | event/time-series stream; aggregate before use |
| menu_photo.jpg | Unstructured | needs OCR/vision to extract data |
| support_call.mp3 | Unstructured | needs transcription first |
| payments.csv | Structured | ready to analyse (fraud/finance) |
| whatsapp_complaint.txt | Unstructured | free text; parse/sentiment |

**3 bullets (model answer):**
- Straight into Excel: `orders_sample.csv`, `payments.csv`.
- Parse/flatten first: `app_events.json`, `gps_pings.csv`.
- Can't analyse until converted: `customer_reviews.txt`, `menu_photo.jpg`, `support_call.mp3`, `whatsapp_complaint.txt`.

## ⚠️ Common student mistakes
- Calling JSON "unstructured" — it has structure, just nested → **semi-structured**.
- Calling a CSV of GPS pings fully "structured" — fine to accept, but push them: it's a *stream/log*, closer to semi-structured in practice.
- Confusing *file format* with *data type* (a `.txt` can hold structured data; a `.csv` of free-text notes is still unstructured content).
