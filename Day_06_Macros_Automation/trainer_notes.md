# Day 6 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
1. **(2 min)** Developer ▸ **Record Macro**, name it `DemoFormat`, Store in *This Workbook*.
2. **(2 min)** Do three visible things: bold the header row, fill it dark, auto-fit columns. **Stop Recording.**
3. **(3 min)** **Alt + F11** → open the module → read the generated code aloud. Change one literal live — e.g. `.Interior.Color = RGB(0,112,192)` to a different RGB — and re-run (`F5`). Show the colour change. "The recorder wrote the code; I only edited a value."
4. **(2 min)** Back on the sheet: **Developer ▸ Insert ▸ Button (Form Control)**, draw it, assign `DemoFormat`. Click it → instant formatting.
5. **(1 min)** Save As → show the `.xlsm` choice and warn: pick the wrong type and the macro vanishes.

## ✅ Reference macro (paste if a student is stuck)
```vba
Sub RefreshOpsReport()
    With Range("A1").CurrentRegion.Rows(1)
        .Font.Bold = True
        .Font.Color = RGB(255, 255, 255)
        .Interior.Color = RGB(31, 78, 120)
    End With
    Cells.EntireColumn.AutoFit
    ActiveWindow.FreezePanes = False
    Range("A2").Select
    ActiveWindow.FreezePanes = True

    ' Red-shade late orders. Assumes is_late is column P — adjust to your layout.
    Dim rng As Range
    Set rng = Range("A2", Range("A2").End(xlDown).Offset(0, 20))
    rng.FormatConditions.Delete
    rng.FormatConditions.Add Type:=xlExpression, Formula1:="=$P2=1"
    rng.FormatConditions(1).Interior.Color = RGB(255, 199, 206)

    ActiveWorkbook.RefreshAll
    MsgBox "Report refreshed: " & Now()
End Sub
```
> The `$P2=1` column letter depends on where `is_late` lands after import — tell students to check and adjust. This is a *feature*: they must read their own sheet.

## 💡 Teaching points / gotchas
- **Absolute vs relative recording:** the "Use Relative References" toggle changes everything. For formatting a fixed header, keep it **absolute** (off).
- The recorder is verbose (lots of `.Select`) — point it out, then show how the hand-written version drops the `.Select` noise. Good first taste of "clean code".
- **Security:** `.xlsm` files trigger the macro-warning bar. Explain *why* (macros can be malicious) — ties back to Day 2 ethics/governance.
- If `RefreshAll` errors, it's usually a broken Power Query connection — a nice reminder that automation sits *on top of* the Day 3 pipeline.
- Save-type mistake (`.xlsx`) silently drops the macro — the single most common "my macro disappeared!" support ticket.
