# Day 2 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
1. **(4 min) One question, four lenses.** Put this on screen and answer each live:
   - "How many orders yesterday?" → `=COUNTIFS(date, yesterday)` → **Descriptive** (answerable *now*).
   - "Why did Mumbai's delivery time jump?" → you'd slice by rider/hour → **Diagnostic**.
   - "Which customers will churn next month?" → needs history + a model → **Predictive** (you *can't* do it with one formula — that's the point).
   - "What discount keeps each customer?" → needs the prediction *plus* an optimisation → **Prescriptive**.
2. **(4 min) Mask a phone live.** Open `data/customers_pii.csv`. In a blank column type `="xxxxxx"&RIGHT(D2,4)` on the phone; drag down. "We just reduced risk without losing the ability to match a support ticket." Do the same idea for email: `=LEFT(C2,2)&"***@"&MID(C2,FIND("@",C2)+1,50)`.
3. **(2 min)** Land the ethics point: you *can* compute "average order value by age group" — but should you *price-discriminate by age*? That's where governance (consent, fairness, regulation) overrides capability.

## ✅ Answer key — `business_questions.csv`
| # | question | type |
|---|----------|------|
| 1 | Total revenue in August 2025 | **Descriptive** |
| 2 | Why did avg delivery time increase in Mumbai | **Diagnostic** |
| 3 | Which customers likely to churn next month | **Predictive** |
| 4 | What discount to maximise retention | **Prescriptive** |
| 5 | How many orders cancelled yesterday | **Descriptive** |
| 6 | Which restaurant highest demand this weekend | **Predictive** |
| 7 | What is driving the spike in refunds | **Diagnostic** |
| 8 | Best rider allocation to minimise late deliveries | **Prescriptive** |
| 9 | Average order value by city last quarter | **Descriptive** |
| 10 | Are new customers worth more over 6 months | **Predictive** (CLV; accept Diagnostic if argued well) |

## ✅ Ethics audit model answer
**PII columns in `customers_pii.csv`:** `customer_name`, `email`, `phone`, `date_of_birth`. (`city` is quasi-identifier; `customer_id` is a pseudonym — safer.)

**Masking rules (examples):**
- `customer_name` → initials only, or hash to an ID.
- `email` → keep first 2 chars + domain: `ne***@example.com`.
- `phone` → `xxxxxx` + last 4.
- `date_of_birth` → keep year only, or bucket into age bands.

**Risky question:** #4 ("what discount to give *each customer*") or #10 (value by cohort) — pricing differently per person using personal attributes raises **fairness / discrimination / consent** issues. Must be done on consented, aggregated, non-protected attributes.

**Part C numbers** will depend on the 200-row sample; the teaching point is that total/avg/count only *describe the past* — they carry no mechanism to forecast the future, which needs historical patterns + a model.

## ⚠️ Common mistakes
- Tagging #6/#10 as Descriptive — they're about the *future* → Predictive.
- Forgetting `date_of_birth` is PII (it's a strong re-identifier combined with city).
- Masking the *analysis key* (`customer_id`) — that's the one you usually keep.
