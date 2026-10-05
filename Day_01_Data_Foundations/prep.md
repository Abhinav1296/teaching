# 🗓️ Day 1 prep — Data Foundations: *what kind of data is this?*

**Module 1 · Foundations** · Tool: Excel + any text viewer · **one 3-hour class, taught twice**

> Day 1 is deliberately light on content (great — it leaves room for the Git onboarding). The learning goal is a *feel* for structured vs semi-structured vs unstructured data, not definitions. Let the files do the teaching.

## 🌙 The night before (10 min)
- [ ] Read [`trainer_notes.md`](trainer_notes.md) — your demo script + the answer key for `data_inventory.csv`.
- [ ] Open the deck `Day_01_deck.pptx` once; click through it.
- [ ] Confirm you've done the **one-time GitHub setup** (repo created, `Day_00` live). See `../DAILY_PUSH_PLAYBOOK.md`.
- [ ] Have the 5 artifact files open on your machine so the demo is instant.

## 🌅 This morning — release Day 1
```powershell
tools/release-day.ps1 01
```
Students run `git pull upstream main` to get `Day_01_Data_Foundations/`. (Day 1 only: they clone during onboarding, so their *first* `pull` is right after.)

## ⏱️ Your 3-hour run-sheet (run this twice — morning + afternoon batch)

```mermaid
gantt
    title Day 1 — one 3-hour class
    dateFormat HH:mm
    axisFormat %H:%M
    section Onboard
    Git onboarding block (see Day_00)      :00:00, 40m
    section Demo
    Live demo: 3 files side by side        :00:40, 15m
    Read instructions.md                   :00:55, 5m
    section Build
    Classify artifacts + fill inventory    :01:00, 80m
    section Share
    Show & tell: compare labels            :02:20, 25m
    section Wrap
    Reveal answers + commit/PR + preview   :02:45, 15m
```

| Time | Block | What you do |
|------|-------|-------------|
| 0:00–0:40 | **Onboarding** | Run the Day 0 Git block (fork → clone → first PR). See `../Day_00_Git_Onboarding/prep.md`. |
| 0:40–0:55 | **Demo** | Open `orders_sample.csv`, `app_events.json`, `customer_reviews.txt` side by side. Point at the *shape* of each. |
| 0:55–1:00 | **Brief** | Students read `instructions.md`. |
| 1:00–2:20 | **Build** | They open each file in `data/` and fill `data_inventory.csv` (Structured / Semi / Unstructured + lifecycle stage). |
| 2:20–2:45 | **Show & tell** | 2–3 students share their labels; class debates the tricky ones (GPS pings? reviews?). |
| 2:45–3:00 | **Wrap** | Reveal the key, students commit + open their Day 1 PR, preview Day 2. |

## 🎬 The demo in one line
Three files, three *shapes*: rows×columns (CSV) vs nested keys (JSON) vs free prose (txt). Don't define the words — show them. Full script in [`trainer_notes.md`](trainer_notes.md).

## 📤 What students submit
A completed `data_inventory.csv` (+ their 3 bullet points) as a Pull Request. This is their **second** PR — the daily rhythm begins.

## ⚠️ Watch-outs
- Students want one "right" answer. Embrace the gray zones (a review *rating* is structured, the review *text* isn't) — that debate IS the lesson.
- Someone will try to open the `.json` in Excel and panic. Good — that's the point of "needs parsing first."

## 🏃 Running ahead? (fills the light Day 1)
- Add a round: *"Name 3 more data sources FoodCo has and classify them"* (app crash logs, support call recordings, delivery photos, star ratings).
- Have fast finishers help onboarding stragglers finish their roster PR — reinforces Git for both.
- Mini-debate: *"Which of these is hardest to analyse, and why?"* → sets up the cleaning pain of Day 3.

## ➡️ Tomorrow
**Day 2 — Analytics types & data ethics.** Release with `tools/release-day.ps1 02`. Pre-read: `../Day_02_Analytics_Types_and_Ethics/prep.md`.
