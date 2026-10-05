// Reusable classroom-deck slide templates, ported from the approved Day 1 look.
// Every deck (Day 0, Days 2-10) is composed from these so the set stays identical.
const L = require("./lib.js");
const { P, F, PAGE } = L;

// small right-pointing connector arrow
function arrow(s, x1, x2, y, label, color) {
  s.addShape("line", { x: x1, y, w: x2 - x1, h: 0, line: { color: color || P.slate, width: 2.25, endArrowType: "triangle" } });
  if (label) s.addText(label, { x: x1 - 0.3, y: y - 0.5, w: x2 - x1 + 0.6, h: 0.35, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 11.5, bold: true, color: color || P.slate });
}

// SLIDE: "How today runs" timeline (slide-2 layout)
function timelineSlide(pres, o) {
  const s = L.contentSlide(pres, o.title || "How today runs", o.eyebrow || "Today");
  const steps = o.steps;
  const n = steps.length;
  const colW = (PAGE.w - 2 * PAGE.m) / n;
  s.addShape("line", { x: PAGE.m + colW / 2, y: 3.75, w: colW * (n - 1), h: 0, line: { color: P.line, width: 2 } });
  steps.forEach((st, i) => {
    const cx = PAGE.m + colW * (i + 0.5);
    s.addText(st.t, { x: cx - colW / 2, y: 2.55, w: colW, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.head, fontSize: 19, bold: true, color: P.ink });
    L.badge(s, cx - 0.33, 3.42, 0.66, String(i + 1), st.c, P.white);
    s.addText(st.l, { x: cx - colW / 2, y: 4.2, w: colW, h: 0.9, isTextBox: true, margin: 0, align: "center", valign: "top", fontFace: F.body, fontSize: 14, color: P.slate });
  });
  if (o.note) s.addText(o.note, { x: PAGE.m, y: 5.9, w: PAGE.w - 2 * PAGE.m, h: 0.6, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14 });
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// SLIDE: scenario (slide-5 layout) — scenario card + file chips + navy callout
function scenarioSlide(pres, o) {
  const s = L.contentSlide(pres, o.title, o.eyebrow || "The business scenario");
  L.card(s, { x: PAGE.m, y: 1.75, w: 7.0, h: 2.35, fill: P.cloud, line: P.line });
  s.addText(o.scenario, { x: PAGE.m + 0.3, y: 1.95, w: 6.4, h: 1.95, isTextBox: true, margin: 0, valign: "middle", fontFace: F.body, fontSize: 15.5, lineSpacingMultiple: 1.1, align: "left" });
  const files = o.files || [];
  const fx = 8.0, fw = 4.7;
  files.forEach((f, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = fx + col * (fw / 2 + 0.1), y = 1.8 + row * 0.78;
    const d = !!f.deliverable;
    s.addText(f.name, { x, y, w: fw / 2 - 0.05, h: 0.62, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.08, fill: { color: d ? P.goldLt : P.white }, line: { color: d ? P.gold : P.line, width: 1 }, align: "center", valign: "middle", fontFace: "Consolas", fontSize: 11, color: P.ink, shadow: L.shadow() });
  });
  s.addText(o.callout, { x: PAGE.m, y: 4.75, w: PAGE.w - 2 * PAGE.m, h: 1.0, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.06, fill: { color: P.navy }, align: "center", valign: "middle", fontFace: F.head, fontSize: 20 });
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// SLIDE: live demo (dark, slide-8 layout). Either panels[] or code{lines}.
function demoSlide(pres, o) {
  const s = pres.addSlide();
  L.fullBg(s, P.navy);
  L.deco(s, P.coral, 20);
  L.kicker(s, o.eyebrow || "Live demo", P.gold);
  s.addText(o.title, { x: PAGE.m, y: 0.95, w: 11.5, h: 0.9, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 32, bold: true, color: P.white });
  if (o.panels) {
    const cw = 3.75, gap = 0.42;
    o.panels.forEach((p, i) => {
      const x = PAGE.m + i * (cw + gap);
      s.addShape("roundRect", { x, y: 2.15, w: cw, h: 3.3, rectRadius: 0.06, fill: { color: "FFFFFF" }, line: { type: "none" }, shadow: L.shadow() });
      s.addText(p.t, { x: x + 0.1, y: 2.22, w: cw - 0.2, h: 0.5, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: "Consolas", fontSize: 12, bold: true, color: p.c });
      s.addText(p.body, { x: x + 0.22, y: 2.8, w: cw - 0.44, h: 2.5, isTextBox: true, margin: 0, valign: "top", fontFace: "Consolas", fontSize: 12, color: P.ink, lineSpacingMultiple: 1.1, align: "left" });
    });
  } else if (o.code) {
    const lines = o.code;
    const h = Math.min(3.5, 0.5 + lines.length * 0.36);
    const y = 2.35;
    s.addShape("roundRect", { x: 1.6, y, w: 10.13, h, rectRadius: 0.06, fill: { color: "0E1533" }, line: { type: "none" }, shadow: L.shadow() });
    const runs = lines.map((ln, i) => ({ text: ln + (i < lines.length - 1 ? "\n" : ""), options: { breakLine: true, color: ln.trim().startsWith("--") || ln.trim().startsWith("#") ? "7F8AB5" : "7FE3CF", fontFace: "Consolas" } }));
    s.addText(runs, { x: 1.9, y: y + 0.18, w: 9.5, h: h - 0.36, isTextBox: true, margin: 0, valign: "middle", fontSize: o.codeSize || 15, align: "left", lineSpacingMultiple: 1.25 });
  }
  if (o.tagline) s.addText(o.tagline, { x: PAGE.m, y: 5.95, w: PAGE.w - 2 * PAGE.m, h: 0.6, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 16, italic: true, color: "CAD2E6" });
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// SLIDE: your task (slide-9 layout) — up to 4 steps + "done when" card
function taskSlide(pres, o) {
  const s = L.contentSlide(pres, o.title, o.eyebrow || "Hands-on");
  const steps = o.steps;
  const n = steps.length;
  const sp = n <= 3 ? 1.08 : 1.02;
  steps.forEach((st, i) => {
    const y = 1.95 + i * sp;
    L.badge(s, PAGE.m, y, 0.6, String(i + 1), P.coral, P.white);
    s.addText([
      { text: st[0] + "\n", options: { bold: true, fontSize: 16.5, color: P.ink, breakLine: true } },
      { text: st[1], options: { fontSize: 13, color: P.slate } },
    ], { x: PAGE.m + 0.85, y: y - 0.05, w: 7.6, h: sp, isTextBox: true, margin: 0, valign: "middle", fontFace: F.body, lineSpacingMultiple: 1.0, align: "left" });
  });
  const ch = Math.max(3.25, n * sp);
  L.card(s, { x: 8.75, y: 1.95, w: 3.95, h: ch, fill: P.tealLt, line: P.teal });
  s.addText([
    { text: "DONE WHEN\n\n", options: { bold: true, fontSize: 11, color: P.teal, charSpacing: 2, breakLine: true } },
    ...o.doneWhen,
  ], { x: 9.05, y: 2.2, w: 3.4, h: ch - 0.5, isTextBox: true, margin: 0, valign: "top", fontFace: F.body, lineSpacingMultiple: 1.15, align: "left" });
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// SLIDE: what's in your folder (slide-10 layout) — auto-aligned tree + pull card
function folderSlide(pres, o) {
  const s = L.contentSlide(pres, o.title, o.eyebrow || "Pull it first");
  const tree = o.tree;
  const col = Math.max(...tree.map((t) => t[0].length)) + 2;
  L.codeBox(s, { x: PAGE.m, y: 1.9, w: 7.4, h: 4.1, fs: 13.5, accent: "CAD2E6", lines: tree.map(([p, c]) => (c ? p.padEnd(col) + "# " + c : p)) });
  L.card(s, { x: 8.35, y: 1.9, w: 4.35, h: 4.1, fill: P.cloud, line: P.line });
  s.addText("Get today's folder", { x: 8.65, y: 2.15, w: 3.8, h: 0.5, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 15, bold: true, color: P.ink, align: "left" });
  L.codeBox(s, { x: 8.65, y: 2.7, w: 3.75, h: 0.75, fs: 12.5, accent: "7FE3CF", lines: ["git pull upstream main"] });
  s.addText(o.pullNote || [
    { text: "Not there yet?  ", options: { bold: true, color: P.coral } },
    { text: "The trainer releases each day's folder in the morning. Pull again in a minute.", options: { color: P.slate } },
  ], { x: 8.65, y: 3.7, w: 3.8, h: 1.9, isTextBox: true, margin: 0, valign: "top", fontFace: F.body, fontSize: 13, lineSpacingMultiple: 1.15, align: "left" });
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// SLIDE: submit (slide-11 layout) — standard git flow + constant tips
function submitSlide(pres, o) {
  const s = L.contentSlide(pres, o.title || "Hand it in — your Pull Request", o.eyebrow || "Wrap · 15 min");
  L.codeBox(s, {
    x: PAGE.m, y: 1.95, w: 7.5, h: 3.9, fs: 14, accent: "7FE3CF",
    lines: [
      "git pull upstream main",
      "git checkout -b " + o.branch,
      "git add " + o.folder + "/",
      'git commit -m "' + o.commit + '"',
      "git push origin " + o.branch,
      "# then click 'Compare & pull request' on GitHub",
    ],
  });
  const tips = [
    ["Stage only your folder", "git add " + o.folder + "/ — never git add ."],
    ["Push to origin (your fork)", "not upstream — that's the trainer's."],
    ["The PR is your submission", "the trainer reviews a couple live."],
  ];
  tips.forEach((t, i) => {
    const y = 1.95 + i * 1.32;
    L.card(s, { x: 8.45, y, w: 4.25, h: 1.15, fill: P.cloud, line: P.line });
    s.addText([
      { text: t[0] + "\n", options: { bold: true, fontSize: 13.5, color: P.ink, breakLine: true } },
      { text: t[1], options: { fontSize: 11, color: P.slate, fontFace: i === 0 ? "Consolas" : F.body } },
    ], { x: 8.7, y: y + 0.08, w: 3.8, h: 1.0, isTextBox: true, margin: 0, valign: "middle", fontFace: F.body, lineSpacingMultiple: 1.0, align: "left" });
  });
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// SLIDE: recap + tomorrow (dark, slide-12 layout)
function recapSlide(pres, o) {
  const s = pres.addSlide();
  L.fullBg(s, P.navy);
  L.deco(s, P.teal, 15);
  L.kicker(s, "Recap", P.gold);
  s.addText(o.title, { x: PAGE.m, y: 1.1, w: 11.5, h: 1.0, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 34, bold: true, color: P.white });
  const chips = o.chips;
  const cw = 3.75, gap = 0.42;
  chips.forEach((c, i) => {
    const x = PAGE.m + i * (cw + gap);
    s.addText(c, { x, y: 2.75, w: cw, h: 1.15, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.08, fill: { color: "FFFFFF", transparency: 90 }, line: { color: P.white, width: 1, transparency: 55 }, align: "center", valign: "middle", fontFace: F.body, fontSize: 14.5, bold: true, color: P.white });
  });
  s.addText([
    { text: (o.tomorrowLabel || "TOMORROW") + "   ", options: { bold: true, color: P.navy, charSpacing: 2 } },
    { text: o.tomorrow, options: { color: P.navy, bold: true } },
  ], { x: PAGE.m, y: 4.9, w: PAGE.w - 2 * PAGE.m, h: 1.0, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.06, fill: { color: P.gold }, align: "center", valign: "middle", fontFace: F.head, fontSize: 18 });
  if (o.notes) s.addNotes(o.notes);
  return s;
}

// generic concept slide starter (light)
function concept(pres, title, eyebrow) {
  return L.contentSlide(pres, title, eyebrow || "The core idea");
}

// a row of equal cards with coloured header + body; returns nothing
function cardsRow(s, o) {
  const items = o.items;
  const n = items.length;
  const gap = o.gap == null ? 0.42 : o.gap;
  const cw = (PAGE.w - 2 * PAGE.m - gap * (n - 1)) / n;
  const y = o.y, h = o.h;
  items.forEach((it, i) => {
    const x = PAGE.m + i * (cw + gap);
    L.card(s, { x, y, w: cw, h, fill: it.fill || P.cloud, line: it.line || P.line, shadow: true });
    let cy = y + 0.3;
    if (it.badge) {
      s.addShape("ellipse", { x: x + cw / 2 - 0.3, y: cy, w: 0.6, h: 0.6, fill: { color: it.color }, line: { type: "none" } });
      s.addText(it.badge, { x: x + cw / 2 - 0.3, y: cy, w: 0.6, h: 0.6, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 18, bold: true, color: P.white });
      cy += 0.8;
    }
    s.addText(it.head, { x: x + 0.15, y: cy, w: cw - 0.3, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.head, fontSize: it.headSize || 17, bold: true, color: it.color || P.ink });
    cy += 0.55;
    if (it.body) s.addText(it.body, { x: x + 0.25, y: cy, w: cw - 0.5, h: y + h - cy - 0.2, isTextBox: true, margin: 0, valign: "top", fontFace: F.body, fontSize: it.bodySize || 13, color: P.ink, lineSpacingMultiple: 1.1, align: it.bodyAlign || "left" });
  });
  return cw;
}

module.exports = { L, P, F, PAGE, arrow, timelineSlide, scenarioSlide, demoSlide, taskSlide, folderSlide, submitSlide, recapSlide, concept, cardsRow };
