# 🚀 DAILY PUSH PLAYBOOK — releasing the course one day at a time

The whole point: students should only ever see **what you're teaching today**, and they should get it by running `git pull` themselves. This teaches Git *and* keeps future answers hidden. Here's exactly how.

---

## 🧠 The mechanic (how this works)

Your `student-repo/` folder already contains **all 10 days** on disk. But Git only sends to GitHub what you've **committed**. So the trick is simple:

> **Commit and push ONE `Day_XX` folder on the morning you teach it.** The other day folders just sit on your disk *untracked* — Git (and therefore GitHub, and therefore students) can't see them until you add them.

⚠️ **The one rule that matters: never run `git add .` or `git add -A`** in `student-repo/`. That would stage *all* days at once and leak the whole course. Always add a specific folder — or just use the `release-day` script, which does it safely for you.

---

## 0️⃣ One-time setup (before Day 0)

```bash
cd student-repo

# 1. Start the repo
git init -b main
git config user.name "Trainer Name"
git config user.email "trainer@example.com"

# 2. Stage ONLY the course skeleton + Day 0 (NOT the day folders, NOT datasets yet)
git add README.md SETUP.md GIT_WORKFLOW.md .gitignore Day_00_Git_Onboarding/
git commit -m "Course skeleton + Day 0 Git onboarding"

# 3. Create the GitHub repo and push (uses GitHub CLI; or create it in the browser)
gh repo create foodco-bootcamp --public --source . --push
#   …or, if you made the empty repo on github.com:
#   git remote add origin https://github.com/<you>/foodco-bootcamp.git
#   git push -u origin main
```
Then have students **fork** this repo and do `Day_00_Git_Onboarding/`.

✅ After this, GitHub shows **only** the README, setup docs, and `Day_00`. The 10 content folders and `datasets/` are still invisible to students.

---

## 📆 The release schedule

Each row is one morning. Run the command **before your first batch**, then tell students to `git pull upstream main`.

| Teaching day | Release this | Quick command (from `trainer-repo/`) |
|---|---|---|
| Day 1 | `Day_01_Data_Foundations/` | `tools/release-day.ps1 01` |
| Day 2 | `Day_02_Analytics_Types_and_Ethics/` | `tools/release-day.ps1 02` |
| Day 3 | `Day_03_Data_Cleaning_PowerQuery/` | `tools/release-day.ps1 03` |
| Day 4 | `Day_04_Lookups/` | `tools/release-day.ps1 04` |
| Day 5 | `Day_05_Pivot_Reporting/` | `tools/release-day.ps1 05` |
| Day 6 | `Day_06_Macros_Automation/` | `tools/release-day.ps1 06` |
| **Day 7** | **`datasets/` + `Day_07_SQL_Basics/`** | `tools/release-day.ps1 07 --with-datasets` |
| Day 8 | `Day_08_SQL_Joins/` | `tools/release-day.ps1 08` |
| Day 9 | `Day_09_Window_Functions/` | `tools/release-day.ps1 09` |
| Day 10 | `Day_10_CTE_Reporting_Capstone/` | `tools/release-day.ps1 10` |

> **Day 7 is special:** the SQL days read `../datasets/foodco.db`, so you must release the `datasets/` folder together with Day 7. The `--with-datasets` flag does this. (Release it Day 7, not earlier, so the SQL answers aren't browsable during the Excel week.)

---

## ⌨️ Doing it by hand (if you skip the script)

```bash
cd student-repo
git add Day_03_Data_Cleaning_PowerQuery/
git commit -m "Release Day 3: Data cleaning with Power Query"
git push origin main
```
For Day 7, also `git add datasets/` before the commit.

---

## 🧰 Using the release script

From the `trainer-repo/` folder:

- **Windows (PowerShell):** `tools/release-day.ps1 03`
- **Mac/Linux (bash):** `bash tools/release-day.sh 03`
- **With datasets (Day 7):** add `--with-datasets`
- **Dry run (see what it would push, change nothing):** add `--dry-run`

The script refuses to run `git add .`, pushes only the folder you name, and prints the commit so you can confirm before students pull.

---

## 🙋 Handling student Pull Requests
Students submit each day's work as a PR to your repo. You don't have to merge them all — reviewing 1–2 live on the projector is a great teaching moment ("here's what a good commit message looks like"). For the Day 0 roster PRs, merging them live lets each student watch their change land in `main`.

## ♻️ If you need to re-release or fix a day
Just edit the files and run the release command again — it makes a new commit. Students get the fix on their next `git pull`.
