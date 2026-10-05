#!/usr/bin/env pwsh
# Release ONE day's folder to the student GitHub repo.
# Safe by design: it stages only the named Day_XX folder (plus datasets on Day 7),
# never "git add ." — so future days / answer keys can't leak.
#
# Usage (run from trainer-repo/):
#   tools/release-day.ps1 03
#   tools/release-day.ps1 07 --with-datasets
#   tools/release-day.ps1 03 --dry-run
$ErrorActionPreference = "Stop"

$rawArgs = $args
if ($rawArgs.Count -lt 1) {
  Write-Host "Usage: release-day.ps1 <day 00-10> [--with-datasets] [--dry-run]" -ForegroundColor Yellow
  exit 1
}
$day = ([string]$rawArgs[0]).PadLeft(2, '0')
$withDatasets = ($rawArgs -contains "--with-datasets") -or ($rawArgs -contains "-WithDatasets")
$dryRun       = ($rawArgs -contains "--dry-run")       -or ($rawArgs -contains "-DryRun")

$scriptDir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$studentRepo = Resolve-Path (Join-Path $scriptDir "..\..\student-repo")

$folder = Get-ChildItem -Path $studentRepo -Directory -Filter "Day_${day}_*" | Select-Object -First 1
if (-not $folder) {
  Write-Host "No folder 'Day_${day}_*' found in $studentRepo" -ForegroundColor Red
  exit 1
}
$folderName = $folder.Name

Push-Location $studentRepo
try {
  if (-not (Test-Path ".git")) {
    Write-Host "student-repo is not a git repo yet. Do the one-time setup in DAILY_PUSH_PLAYBOOK.md first." -ForegroundColor Red
    exit 1
  }

  $paths = @($folderName)
  if ($withDatasets) { $paths += "datasets" }

  Write-Host "About to release from $studentRepo :" -ForegroundColor Cyan
  $paths | ForEach-Object { Write-Host "   + $_" }

  if ($dryRun) {
    Write-Host "[dry-run] git add -- $($paths -join ' ')" -ForegroundColor DarkGray
    Write-Host "[dry-run] git commit -m 'Release Day ${day}: $folderName'" -ForegroundColor DarkGray
    Write-Host "[dry-run] git push origin main" -ForegroundColor DarkGray
    Write-Host "[dry-run] Nothing was changed." -ForegroundColor Green
    exit 0
  }

  git add -- $paths
  git commit -m "Release Day ${day}: $folderName"
  git push origin main
  Write-Host "`nReleased Day ${day}. Now tell students:  git pull upstream main" -ForegroundColor Green
}
finally { Pop-Location }
