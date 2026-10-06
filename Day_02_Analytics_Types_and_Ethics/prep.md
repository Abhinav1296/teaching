# 🗓️ Day 2 prep — Analytics types & data ethics (**6-hour deep version**)

**Module 1 · Foundations** · Tool: Excel + a text viewer · **one 6-hour class, single batch**

> Two big ideas: the four analytics lenses (descriptive → diagnostic → predictive → prescriptive) and data ethics / PII. The 6-hour format means you don't rush — you teach it, they practise it twice, and you debate the gray areas properly.
>
> **Continuity hook (use it out loud):** *"Yesterday you learned `SUM`, `COUNTIF`/`SUMIFS`, `IF`, `TEXT`, `LEFT`. Today you'll reuse the exact same functions — `RIGHT`/`LEFT`/`MID`/`TEXT` to protect people's data, and `SUM`/`AVERAGE`/`COUNT` to tell the past from the future."* This makes Day 2 feel like a continuation, not a reset.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — the demo scripts, the answer key for **all 15** questions, the full masking-lab solution, the DPDP context, and the ethics role-play answers.
- [ ] Open the deck `Day_02_deck.pptx` once; click through it.
- [ ] Have `data/customers_pii.csv` open so the PII columns (`customer_name`, `email`, `phone`, `date_of_birth`) are ready to point at.
- [ ] Rehearse the two live formulas once: phone `="xxxxxx"&RIGHT(D2,4)` and email `=LEFT(C2,2)&"***@"&MID(C2,FIND("@",C2)+1,50)`.

## 🌅 This morning — release Day 2 + post to Classroom
```powershell
tools/release-day.ps1 02
```
Students run `git pull upstream main` to get `Day_02_Analytics_Types_and_Ethics/`. Then in **Google Classroom → Classwork → Day 2**, post the deck (export to PDF) + a one-line "today's task" note as a Material.

## ⏱️ Your 6-hour run-sheet (single batch, 2 breaks)

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:05 | **Warm-up** | Recap yesterday's functions in one breath, then the continuity hook above. |
| 0:05–0:25 | **Demo 1 — 4 lenses** | Ask ONE orders table four questions: *what happened / why / what's next / what to do.* Answer the descriptive one live with `=COUNTIFS(...)` (yesterday's function) — then show the predictive one **can't** be done with a formula. That contrast *is* the lesson. |
| 0:25–1:10 | **Build A** | Students tag Q1–Q10 in `business_questions.csv` individually, then pair up and compare. |
| 1:10–1:40 | **Debate A** | Referee the borderline ones as a class (diagnostic vs predictive). Then throw up **bonus Q11–Q15** and argue them. |
| 1:40–1:50 | ☕ **Break** | |
| 1:50–2:15 | **Demo 2 — the ethics flip** | Open `customers_pii.csv`. Mask a **phone** live (`RIGHT`), then an **email** (`LEFT`+`MID`+`FIND`). "We cut risk without losing the ability to match a support ticket." |
| 2:15–2:35 | **Teach — governance** | Direct identifiers vs **quasi-identifiers** (city + DOB can re-identify); consent, purpose limitation, data minimisation. Ground it in India's **DPDP Act 2023** (FoodCo is an Indian company — this is real for them). |
| 2:35–3:45 | **Build B** | Students build a full **"safe-to-share" masked customer table** — a masking formula for every PII column — and write `audit.md` (PII list, rule per column, the one risky question). |
| 3:45–3:55 | ☕ **Break** | |
| 3:55–4:40 | **Build C** | On `orders_sample.csv`: `SUM` / `AVERAGE` / `COUNT` for total revenue, AOV, order count (yesterday's functions), then the one-sentence "why can't these predict the future?" |
| 4:40–5:25 | **Role-play — ethics desk** | Four stakeholder requests (in `trainer_notes.md`). Groups decide **answer / refuse / answer only masked-&-aggregated** and justify. Same role-play format you used for Excel yesterday. |
| 5:25–5:55 | **Show & tell** | 3–4 students share; reveal the key; debate the gray tags and masking choices. |
| 5:55–6:00 | **Wrap** | Commit + open the Day 2 PR; preview Day 3 (Power Query — "tomorrow the data is messy on purpose"). |

## 🎬 The two demos in one line each
1. **4 lenses:** four questions about one orders table — the first answerable with a formula *today*, the last needing a model — so the types define themselves.
2. **Mask-the-phone:** one live formula turns raw PII into safe data; that single keystroke opens the entire ethics discussion.

## 📤 What students submit (as a PR)
`business_questions_solved.csv` (all 15 tagged) + a `safe_customers.csv`/sheet (every PII column masked) + `audit.md` (PII list, masking rules, one risky question + why) + the 3 descriptive numbers.

## ⚠️ Watch-outs
- **Diagnostic vs predictive** is the classic mix-up: "*why* did retention drop" (diagnostic) vs "*will* it drop next quarter" (predictive). You'll referee this — that's the point.
- Students miss that **`date_of_birth` + `city`** together re-identify someone even without a name. Push on quasi-identifiers.
- "It's just test data" → *that is the discussion.* Governance habits are built on practice data.
- In the masking lab, don't let them mask the **`customer_id`** — that's the analysis key you deliberately keep.

## ➡️ Tomorrow
**Day 3 — Data cleaning with Power Query.** Module 2 (Advanced Excel) proper begins. Release with `tools/release-day.ps1 03`. Pre-read: `../Day_03_Data_Cleaning_PowerQuery/prep.md`. With 6 hours you can also fold in a core-Excel-functions recap if yesterday's block needs reinforcing.
