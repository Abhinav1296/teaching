# 🧰 TOOLS — what to install, where to get it, how to check it works

On-the-spot reference for the bootcamp. Keep this open on Day 0/Day 1 so you can unblock anyone fast.

> **The short version:** everyone needs **Git + a spreadsheet** by Day 1, and **DB Browser for SQLite** by Day 7. Nothing here costs money.

---

## ⏱️ What's needed, and by when

| Tool | For | Needed by | Cost |
|------|-----|-----------|------|
| **Git** (+ a GitHub account) | Every day — pull the day's folder, submit work as a PR | **Day 1** | Free |
| **Microsoft Excel** (2016+ / 365) | Modules 1–2: Power Query, Pivots, Macros/VBA | **Day 1** | Free\* |
| **DB Browser for SQLite** | Module 3: all SQL days, reads `foodco.db` | **Day 7** | Free |
| Power BI Desktop *or* Tableau Public | Day 10 BI bonus only | Day 10 (optional) | Free |

\* Excel is paid software, but any 2016+ install or a Microsoft 365 / Excel-for-web account works. Google Sheets covers Days 1–2 but **not** Power Query or VBA — Excel is required for Days 3 and 6.

---

## 1. Git + GitHub (Day 1)

**Download Git:** https://git-scm.com/downloads (Windows installer; accept all defaults).
**Create a free GitHub account:** https://github.com/signup

**Verify (any terminal / Git Bash):**
```bash
git --version
```
**First-time identity (once per machine):**
```bash
git config --global user.name "Their Name"
git config --global user.email "their@email.com"
```

**The daily student loop** (they run this — it's the Day 0 lesson):
```bash
git pull upstream main     # get today's folder
# ...do the work...
git add Day_0X_Folder/
git commit -m "Day X: my work"
git push origin main       # then open a Pull Request on GitHub
```

> **On-the-spot fixes:**
> - *"git not recognised"* → Git isn't installed or terminal needs reopening after install.
> - *"no upstream"* → they cloned instead of forked; have them `git remote add upstream <your-repo-url>`.
> - *Push rejected* → `git pull upstream main` first, then push.

---

## 2. Microsoft Excel (Days 1–6)

**Get it:** already on most Windows machines. No install? Free **Excel for the web** at https://office.com (sign in with any Microsoft account).

**Enable the Developer tab** (needed Day 6 for macros):
> File ▸ Options ▸ Customize Ribbon ▸ tick **Developer** ▸ OK

**Check the features are present:**
- **Power Query** (Day 3): *Data ▸ Get Data* exists.
- **Pivot Tables** (Day 5): *Insert ▸ PivotTable* exists.
- **Macros/VBA** (Day 6): Developer tab visible ▸ *Visual Basic* button opens the editor.

> **On-the-spot fixes:**
> - Mac/Chromebook user → Excel-for-web covers Days 1–5; VBA recording is limited, so **pair them with a Windows user on Day 6**.
> - Power Query missing → they're on an old/Starter edition; use Excel-for-web or a lab machine.

---

## 3. DB Browser for SQLite (Day 7)

**Download:** https://sqlitebrowser.org (free, no server, Windows/Mac/Linux).

> ⚠️ **Flag this on Day 6** so nobody arrives Day 7 without it — it's a fresh install mid-course, and it's the first time the whole class switches tools (Excel → SQL).

**Use it:**
1. Open DB Browser ▸ **Open Database** ▸ select `datasets/foodco.db`.
2. **Execute SQL** tab ▸ type the query ▸ press **▶ (F5)**.
3. Results show below; **Save** to a `.sql` file for their PR.

> **On-the-spot fixes:**
> - *"database is locked"* → they have the DB open in two tools; close one.
> - No `foodco.db` yet → it releases **with Day 7** (`tools/release-day.ps1 07 --with-datasets`), not before.
> - Prefers the "real" stack → Postgres/MySQL instructions are in `student-repo/SETUP.md` (Option B).

---

## 4. BI bonus — Power BI / Tableau (Day 10, optional)

- **Power BI Desktop** (Windows, free): https://aka.ms/pbidesktopstore
- **Tableau Public** (Win/Mac, free): https://public.tableau.com/en-us/s/download

Both connect to the CSVs in `datasets/` directly (simplest), or to `foodco.db` via an ODBC driver. Only needed for the Day 10 visualisation bonus.

---

## 🧑‍🏫 Trainer-only tools (you, not students)

You need these **once**, to rebuild decks or regenerate data. Students never touch them.

| Tool | For | Install |
|------|-----|---------|
| **Node.js** (LTS) | Rebuild the `.pptx` decks from source | https://nodejs.org → then `cd tools/decks && npm install` |
| **Python 3.9+** + `pandas` | Regenerate the dataset (`generate_data.py`, seed=42) | https://python.org → `pip install pandas` |
| **GitHub CLI** (`gh`) | Create/push the repos | https://cli.github.com → `gh auth login` |

**Rebuild a deck after editing its source** (from `tools/decks/`):
```bash
node gen_day01.js "../../Day_01_Data_Foundations/Day_01_deck.pptx"   # Day 1 only
node build_all.js "../.."                                            # Day 0 + Days 2–10
```
> ⚠️ **Close the .pptx in PowerPoint first** — an open deck is file-locked and the rebuild fails with `EBUSY`.

**Regenerate the data** (from `trainer-repo/`):
```bash
python tools/generate_data.py      # writes CSVs + foodco.db into ../student-repo/datasets/
```
Same seed → identical data every time, so the answer keys stay valid.
