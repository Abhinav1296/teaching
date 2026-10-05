$ErrorActionPreference = "Stop"
$trainer = "C:\Users\abhip\Downloads\data analytics\trainer-repo"
$qa = Join-Path $PSScriptRoot "qa"
$decks = @(
  @{ dir = "Day_00_Git_Onboarding"; file = "Day_00_deck.pptx" },
  @{ dir = "Day_02_Analytics_Types_and_Ethics"; file = "Day_02_deck.pptx" },
  @{ dir = "Day_03_Data_Cleaning_PowerQuery"; file = "Day_03_deck.pptx" },
  @{ dir = "Day_04_Lookups"; file = "Day_04_deck.pptx" },
  @{ dir = "Day_05_Pivot_Reporting"; file = "Day_05_deck.pptx" },
  @{ dir = "Day_06_Macros_Automation"; file = "Day_06_deck.pptx" },
  @{ dir = "Day_07_SQL_Basics"; file = "Day_07_deck.pptx" },
  @{ dir = "Day_08_SQL_Joins"; file = "Day_08_deck.pptx" },
  @{ dir = "Day_09_Window_Functions"; file = "Day_09_deck.pptx" },
  @{ dir = "Day_10_CTE_Reporting_Capstone"; file = "Day_10_deck.pptx" }
)
$ppt = New-Object -ComObject PowerPoint.Application
foreach ($d in $decks) {
  $src = Join-Path $trainer (Join-Path $d.dir $d.file)
  $out = Join-Path $qa $d.dir
  if (Test-Path $out) { Remove-Item $out -Recurse -Force }
  New-Item -ItemType Directory -Path $out | Out-Null
  $pres = $ppt.Presentations.Open($src, $true, $false, $false)
  $pres.Export($out, "PNG", 1280, 720)
  $pres.Close()
  Write-Output ("EXPORTED " + $d.dir)
}
$ppt.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
Write-Output "DONE"
