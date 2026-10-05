# 🗓️ Day 2 prep — Analytics types & data ethics: *what question is this, and what are we allowed to do with the data?*

**Module 1 · Foundations** · Tool: Excel + a text viewer · **one 3-hour class, taught twice**

> Two ideas today: the four analytics lenses (descriptive → diagnostic → predictive → prescriptive) and data ethics / PII. Keep it concrete — every "type" is just a *question you could ask the orders table*. The ethics half lands the moment you mask a real phone number on screen.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — your 10-min demo (4 lenses on one table, mask-the-phone beat) + the answer key for the 10 question tags + the ethics-audit model answer.
- [ ] Open the deck `Day_02_deck.pptx` once; click through it.
- [ ] Have the customer file open so the PII columns (`customer_name`, `email`, `phone`, `date_of_birth`) are ready to point at.
- [ ] Decide how you'll mask the phone number live (hide the middle digits) — that's the beat that opens the ethics discussion.

## 🌅 This morning — release Day 2
```powershell
tools/release-day.ps1 02
```
Students run `git pull upstream main` to get `Day_02_Analytics_Types_and_Ethics/`.

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 2 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Demo
    Live demo: 4 lenses + mask a phone     :00:00, 10m
    Read the brief                         :00:10, 5m
    section Build
    Classify 10 questions + PII audit      :00:15, 120m
    section Share
    Show & tell: compare + debate           :02:15, 30m
    section Wrap
    Submit your PR                          :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:10 | **Demo** | Ask the same orders table four questions: *what happened / why / what's likely next / what should we do.* Then mask a phone number to open ethics. |
| 0:10–0:15 | **Brief** | Students read the day's `instructions.md`. |
| 0:15–2:15 | **Build** | They tag 10 business questions by analytics type and audit the customer data for PII. |
| 2:15–2:45 | **Show & tell** | 2–3 students share; class debates the gray ones (is a star rating PII? is "why is Mumbai late" diagnostic or predictive?). |
| 2:45–3:00 | **Wrap** | Reveal the key, students commit + open their Day 2 PR, preview Day 3. |

## 🎬 The demo in one line
Four questions about **one** orders table — what happened, why, what's next, what to do — then mask a phone number live to flip into ethics. Don't lecture the definitions; let the questions carry them. Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
A classification of 10 FoodCo business questions into the four analytics types **plus** a short PII / ethics audit of the customer data (which columns are personal, what you'd mask or restrict), as a Pull Request.

## ⚠️ Watch-outs
- Diagnostic vs predictive is the classic mix-up: "*why* did retention drop" (diagnostic) vs "*will* it drop next quarter" (predictive). Expect to referee this.
- Students treat PII as "the obvious ones." Push them: `date_of_birth` and `phone` are as sensitive as a name — and a free-text review can leak identity too.
- The mask-the-phone moment is the whole lesson. If a student says "but it's just test data," that *is* the discussion — governance habits are built on practice data.

## 🏃 Running ahead? (fills a light day)
- Add 5 more questions and have them argue the borderline ones.
- Debate: *"Which FoodCo data would you be most uncomfortable selling to a partner, and why?"*
- Set up Day 3: *"The data we clean tomorrow is messy on purpose — what kinds of dirt would you expect in real orders?"*

## ➡️ Tomorrow
**Day 3 — Data cleaning with Power Query.** Module 2 (Advanced Excel) begins. Release with `tools/release-day.ps1 03`. Pre-read: `../Day_03_Data_Cleaning_PowerQuery/prep.md`.
