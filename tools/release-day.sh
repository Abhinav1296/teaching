#!/usr/bin/env bash
# Release ONE day's folder to the student GitHub repo.
# Safe by design: stages only the named Day_XX folder (plus datasets on Day 7),
# never "git add ." — so future days / answer keys can't leak.
#
# Usage (run from trainer-repo/):
#   bash tools/release-day.sh 03
#   bash tools/release-day.sh 07 --with-datasets
#   bash tools/release-day.sh 03 --dry-run
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: release-day.sh <day 00-10> [--with-datasets] [--dry-run]"
  exit 1
fi

day_in=$1; shift
with_datasets=false; dry_run=false
for a in "$@"; do
  case "$a" in
    --with-datasets) with_datasets=true ;;
    --dry-run)       dry_run=true ;;
    *) echo "Unknown option: $a"; exit 1 ;;
  esac
done
printf -v day "%02d" "$((10#$day_in))"   # normalise 7 -> 07 (10# avoids octal)

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
student_repo="$(cd "$script_dir/../../student-repo" && pwd)"

folder=$(cd "$student_repo" && ls -d Day_${day}_*/ 2>/dev/null | head -n1 | sed 's:/*$::')
if [ -z "${folder}" ]; then
  echo "No folder 'Day_${day}_*' found in $student_repo"; exit 1
fi

cd "$student_repo"
[ -d .git ] || { echo "student-repo is not a git repo yet. Do the one-time setup first."; exit 1; }

paths=("$folder")
$with_datasets && paths+=("datasets")

echo "About to release from $student_repo :"
for p in "${paths[@]}"; do echo "   + $p"; done

if $dry_run; then
  echo "[dry-run] git add -- ${paths[*]}"
  echo "[dry-run] git commit -m 'Release Day ${day}: ${folder}'"
  echo "[dry-run] git push origin main"
  echo "[dry-run] Nothing was changed."
  exit 0
fi

git add -- "${paths[@]}"
git commit -m "Release Day ${day}: ${folder}"
git push origin main
echo ""
echo "Released Day ${day}. Now tell students:  git pull upstream main"
