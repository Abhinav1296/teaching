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

## ✅ Answer key — bonus questions (6-hour "go deeper" set)
| # | question | type | note for the debate |
|---|----------|------|---------------------|
| 11 | Revenue lost to cancelled orders last quarter | **Descriptive** | measuring the past; `=SUMIFS(value, status, "Cancelled")`. |
| 12 | Will Hyderabad cross 10,000 orders next month | **Predictive** | "will" + "if the trend holds" = forecast. |
| 13 | Which two factors best explain late riders | **Diagnostic** | "explain why" = root cause. |
| 14 | Open next dark store in Pune or Chennai first | **Prescriptive** | recommend an action / choice. |
| 15 | Is the Q3 drop seasonal or real churn | **Diagnostic** (accept **Predictive** if argued) | the *best* borderline one — diagnosing a past pattern, but if they frame it as "forecasting whether it continues," Predictive is defensible. Let them fight it out. |

## 🧪 Masking lab — full solution (`customers_pii.csv`)
This is the heart of the 6-hour version: students build a **safe-to-share** copy using *yesterday's* text functions. Model answers (row 2 examples):

| Column | Verdict | Masking formula | Result |
|--------|---------|-----------------|--------|
| `customer_id` | **KEEP** (pseudonym / analysis key) | — | `C0001` |
| `customer_name` | PII | `=LEFT(B2,1)&". "&MID(B2,FIND(" ",B2)+1,1)&"."` | `K. S.` |
| `email` | PII | `=LEFT(C2,2)&"***@"&MID(C2,FIND("@",C2)+1,50)` | `kr***@example.com` |
| `phone` | PII | `="xxxxxx"&RIGHT(D2,4)` | `xxxxxx2098` |
| `date_of_birth` | PII (strong re-identifier) | year only `=TEXT(E2,"yyyy")`, or age band | `1996` |
| `signup_date` | low risk | keep (or `=TEXT(F2,"yyyy-mm")`) | `2024-09` |
| `city` | **quasi-identifier** | keep but flag — city + DOB can re-identify | `Mumbai` |

> Teaching beat: `LEFT`, `MID`, `RIGHT`, `FIND`, `TEXT` are **exactly** the functions from Day 1. Masking isn't a new skill — it's yesterday's skill pointed at a privacy problem. Say that explicitly.

## 🇮🇳 India context — DPDP Act 2023 (2 min, do mention it)
FoodCo is an Indian company, so this is their real law. Keep it to four words they'll remember:
- **Consent** — collect personal data only with clear, informed consent for a stated purpose.
- **Purpose limitation** — data collected to deliver food can't be silently reused to, e.g., sell to a partner.
- **Data minimisation** — don't collect/keep what you don't need (why store full DOB if an age band works?).
- **Data fiduciary** — the company is accountable for protecting it; a breach has real penalties.

## 🎭 Ethics role-play — "the ethics desk" (model answers)
Four stakeholder requests; each group decides **Answer / Refuse / Answer only masked-&-aggregated** and justifies. (Same role-play format they used for Excel yesterday.)

| Request | Verdict | Why |
|---------|---------|-----|
| **Marketing:** "Give me the phone numbers of everyone who churned so we can cold-call them." | **Refuse (as-is)** | No consent for marketing calls; purpose limitation. Offer an *aggregated* churn segment instead. |
| **Partner brand:** "Sell us your customer list segmented by age." | **Refuse** | Selling PII without consent — straight DPDP violation. |
| **CEO:** "Show me average order value by age band." | **Answer (masked & aggregated)** | Aggregated, no individual exposed — fine on age *bands*, not raw DOB. |
| **Ops:** "Which customers live closest to our new Pune dark store?" | **Answer only masked/aggregated** | Individual addresses = re-identification risk; give counts per pincode, not names. |

> The thread through all four: **capability ≠ permission.** You *can* compute all of these — governance decides whether you *should*.

## ⚠️ Common mistakes
- Tagging #6/#10/#12 as Descriptive — they're about the *future* → Predictive.
- Forgetting `date_of_birth` is PII (it's a strong re-identifier combined with city).
- Masking the *analysis key* (`customer_id`) — that's the one you usually keep.
- In the role-play, saying "refuse" to everything — the skill is knowing *when masked-&-aggregated makes it OK*, not blanket refusal.
