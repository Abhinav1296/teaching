const L = require("./lib.js");
const { P, F, PAGE } = L;
const OUT = process.argv[2] || "Day_01_deck.pptx";
const pres = L.newDeck();

/* ---------- 1. TITLE ---------- */
(() => {
  const s = L.titleSlide(pres, {
    kicker: "FoodCo Data Analytics Bootcamp · Day 1",
    title: "Data Foundations",
    subtitle: "What kind of data is this?",
    tags: ["Structured", "Semi-structured", "Unstructured"],
    footer: "100% hands-on  ·  3-hour session  ·  Module 1 of 3",
  });
  s.addNotes("Day 1 opener. Keep it to 60 seconds. The real lesson is seeing the shape of data, not memorising definitions. Mention: today also sets up our GitHub workflow for the whole bootcamp.");
})();

/* ---------- 2. TODAY'S FLOW ---------- */
(() => {
  const s = L.contentSlide(pres, "How today runs", "Today");
  const steps = [
    { t: "40 min", l: "Set up GitHub", c: P.teal },
    { t: "15 min", l: "Live demo", c: P.coral },
    { t: "80 min", l: "You build", c: P.orange },
    { t: "25 min", l: "Show & tell", c: P.gold },
    { t: "15 min", l: "Submit your PR", c: P.navy },
  ];
  const n = steps.length;
  const colW = (PAGE.w - 2 * PAGE.m) / n;
  s.addShape("line", { x: PAGE.m + colW / 2, y: 3.75, w: colW * (n - 1), h: 0, line: { color: P.line, width: 2 } });
  steps.forEach((st, i) => {
    const cx = PAGE.m + colW * (i + 0.5);
    s.addText(st.t, { x: cx - colW / 2, y: 2.55, w: colW, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.head, fontSize: 19, bold: true, color: P.ink });
    L.badge(s, cx - 0.33, 3.42, 0.66, String(i + 1), st.c, P.white);
    s.addText(st.l, { x: cx - colW / 2, y: 4.2, w: colW, h: 0.9, isTextBox: true, margin: 0, align: "center", valign: "top", fontFace: F.body, fontSize: 14, color: P.slate });
  });
  s.addText([
    { text: "Most of today is yours", options: { bold: true, color: P.ink } },
    { text: "  —  we set up, watch one quick demo, then you spend ", options: { color: P.slate } },
    { text: "80 minutes hands-on", options: { bold: true, color: P.teal } },
    { text: " on real FoodCo data.", options: { color: P.slate } },
  ], { x: PAGE.m, y: 5.9, w: PAGE.w - 2 * PAGE.m, h: 0.6, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14 });
  s.addNotes("Walk the timeline fast, 60 sec. Reassure them the 40-min GitHub setup is one-time; from tomorrow it's a 2-minute pull. Keep the room's energy on 'you build' — that's the point of the day.");
})();

/* ---------- 3. SECTION: TEAM WORKFLOW ---------- */
(() => {
  const s = L.sectionSlide(pres, { num: "A", title: "First — how the team works", subtitle: "You receive work by pulling. You hand it in with a Pull Request." });
  s.addNotes("Frame Git as the team's operating system, not a separate 'coding' topic. They'll do this every day.");
})();

/* ---------- 4. GIT MODEL ---------- */
(() => {
  const s = L.contentSlide(pres, "You get work by pulling, you submit by a Pull Request", "GitHub workflow");
  const boxes = [
    { x: 0.9, t: "upstream", d: "trainer's repo\n(new folders daily)", c: P.navy },
    { x: 5.0, t: "your fork", d: "your copy on GitHub", c: P.teal },
    { x: 9.1, t: "your laptop", d: "local clone", c: P.coral },
  ];
  boxes.forEach((b) => {
    L.card(s, { x: b.x, y: 2.0, w: 3.33, h: 1.3, fill: P.cloud, line: P.line, shadow: true });
    s.addText([
      { text: b.t + "\n", options: { bold: true, fontSize: 18, color: b.c, breakLine: true } },
      { text: b.d, options: { fontSize: 12.5, color: P.slate } },
    ], { x: b.x, y: 2.08, w: 3.33, h: 1.15, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: F.head, lineSpacingMultiple: 1.0 });
  });
  const arrow = (x1, x2, label) => {
    s.addShape("line", { x: x1, y: 2.62, w: x2 - x1, h: 0, line: { color: P.slate, width: 2.25, endArrowType: "triangle" } });
    s.addText(label, { x: x1 - 0.3, y: 2.12, w: x2 - x1 + 0.6, h: 0.35, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 11.5, bold: true, color: P.slate });
  };
  arrow(4.23, 5.0, "fork (once)");
  arrow(8.33, 9.1, "clone / pull");
  s.addText([
    { text: "Every morning: ", options: { color: P.slate } },
    { text: "git pull upstream main", options: { fontFace: "Consolas", color: P.teal, bold: true } },
    { text: "  brings down the day's new folder.", options: { color: P.slate } },
  ], { x: 0.9, y: 3.55, w: 11.5, h: 0.4, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 13.5 });

  s.addText("To hand in your work", { x: PAGE.m, y: 4.35, w: 11, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 15, bold: true, color: P.ink });
  const chips = ["new branch", "add", "commit", "push → open PR"];
  const cw = 2.6, gap = 0.5, startX = PAGE.m;
  chips.forEach((c, i) => {
    const x = startX + i * (cw + gap);
    s.addText(c, { x, y: 4.85, w: cw, h: 0.62, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.09, fill: { color: i === chips.length - 1 ? P.teal : P.cloud2 }, line: { type: "none" }, align: "center", valign: "middle", fontFace: F.body, fontSize: 13.5, bold: i === chips.length - 1, color: i === chips.length - 1 ? P.white : P.ink });
    if (i < chips.length - 1) s.addShape("line", { x: x + cw + 0.06, y: 5.16, w: gap - 0.12, h: 0, line: { color: P.slate, width: 1.75, endArrowType: "triangle" } });
  });
  s.addText("Full step-by-step in GIT_WORKFLOW.md — and you'll do it live in the next 40 minutes.", { x: PAGE.m, y: 5.95, w: 12, h: 0.4, isTextBox: true, margin: 0, fontFace: F.body, fontSize: 12.5, italic: true, color: P.slate });
  s.addNotes("Draw this on the whiteboard too. origin = your fork (push here), upstream = my repo (pull here). The #1 student error is pushing to upstream.");
})();

/* ---------- 5. SCENARIO ---------- */
(() => {
  const s = L.contentSlide(pres, "Your first morning at FoodCo", "The business scenario");
  L.card(s, { x: PAGE.m, y: 1.75, w: 7.0, h: 2.35, fill: P.cloud, line: P.line });
  s.addText([
    { text: "Ops just dumped eight random files on your desk", options: { bold: true, color: P.ink, breakLine: true } },
    { text: "— spreadsheets, app logs, customer reviews, a menu photo, GPS pings. Before anyone can analyse anything, leadership needs you to say ", options: { color: P.slate } },
    { text: "what each type of data is", options: { bold: true, color: P.coral } },
    { text: " and where it sits in the analytics lifecycle.", options: { color: P.slate } },
  ], { x: PAGE.m + 0.3, y: 1.95, w: 6.4, h: 1.95, isTextBox: true, margin: 0, valign: "middle", fontFace: F.body, fontSize: 15.5, lineSpacingMultiple: 1.1 });

  const files = ["orders_sample.csv", "app_events.json", "customer_reviews.txt", "gps_pings.csv", "menu_photo.jpg", "data_inventory.csv"];
  const fx = 8.0, fw = 4.7;
  files.forEach((f, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = fx + col * (fw / 2 + 0.1), y = 1.8 + row * 0.78;
    const isDeliv = f === "data_inventory.csv";
    s.addText(f, { x, y, w: fw / 2 - 0.05, h: 0.62, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.08, fill: { color: isDeliv ? P.goldLt : P.white }, line: { color: isDeliv ? P.gold : P.line, width: 1 }, align: "center", valign: "middle", fontFace: "Consolas", fontSize: 11, color: P.ink, shadow: L.shadow() });
  });

  s.addText([
    { text: "Before anyone can analyse anything:  ", options: { color: P.white } },
    { text: "what IS each of these files?", options: { bold: true, color: P.gold } },
  ], { x: PAGE.m, y: 4.75, w: PAGE.w - 2 * PAGE.m, h: 1.0, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.06, fill: { color: P.navy }, align: "center", valign: "middle", fontFace: F.head, fontSize: 20 });
  s.addNotes("This is the hook. The yellow file (data_inventory.csv) is the one they fill in — the deliverable.");
})();

/* ---------- 6. THREE SHAPES ---------- */
(() => {
  const s = L.contentSlide(pres, "Three shapes of data", "The core idea");
  const cols = [
    { h: "Structured", c: P.teal, ex: "orders_sample.csv · payments", shape: "Neat rows × columns", verd: "Straight into Excel" },
    { h: "Semi-structured", c: P.orange, ex: "app_events.json", shape: "Nested keys, no fixed grid", verd: "Parse it first" },
    { h: "Unstructured", c: P.coral, ex: "customer_reviews.txt · photos", shape: "Free text & images", verd: "Transform before analysis" },
  ];
  const cw = 3.75, gap = 0.42;
  cols.forEach((c, i) => {
    const x = PAGE.m + i * (cw + gap);
    L.card(s, { x, y: 1.85, w: cw, h: 4.55, fill: P.cloud, line: P.line, shadow: true });
    s.addShape("ellipse", { x: x + cw / 2 - 0.33, y: 2.15, w: 0.66, h: 0.66, fill: { color: c.c }, line: { type: "none" } });
    s.addText(["S", "J", "U"][i], { x: x + cw / 2 - 0.33, y: 2.15, w: 0.66, h: 0.66, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 22, bold: true, color: P.white });
    s.addText(c.h, { x, y: 2.95, w: cw, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.head, fontSize: 19, bold: true, color: c.c });
    s.addText([
      { text: "EXAMPLE\n", options: { fontSize: 10, bold: true, color: P.slate, charSpacing: 2, breakLine: true } },
      { text: c.ex + "\n\n", options: { fontSize: 13, color: P.ink, fontFace: "Consolas", breakLine: true } },
      { text: "SHAPE\n", options: { fontSize: 10, bold: true, color: P.slate, charSpacing: 2, breakLine: true } },
      { text: c.shape, options: { fontSize: 13.5, color: P.ink } },
    ], { x: x + 0.3, y: 3.55, w: cw - 0.6, h: 1.6, isTextBox: true, margin: 0, valign: "top", fontFace: F.body, lineSpacingMultiple: 1.05, align: "left" });
    s.addText(c.verd, { x: x + 0.3, y: 5.55, w: cw - 0.6, h: 0.6, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.1, fill: { color: c.c, transparency: 86 }, line: { color: c.c, width: 1 }, align: "center", valign: "middle", fontFace: F.body, fontSize: 12.5, bold: true, color: P.ink });
  });
  s.addNotes("Don't lecture these. Point back to the three files you opened in the demo. The 'verdict' row is the practical payoff: can I use it now, or not?");
})();

/* ---------- 7. LIFECYCLE ---------- */
(() => {
  const s = L.contentSlide(pres, "Where does each file sit in the lifecycle?", "The analytics lifecycle");
  const stages = [
    { t: "Collect", d: "gather raw files", c: "8894A8" },
    { t: "Clean", d: "fix & standardise", c: P.orange },
    { t: "Analyse", d: "find the answer", c: P.teal },
    { t: "Report", d: "tell the story", c: P.navy },
  ];
  const n = stages.length, cw = 2.75, gap = 0.35, startX = (PAGE.w - (n * cw + (n - 1) * gap)) / 2;
  stages.forEach((st, i) => {
    const x = startX + i * (cw + gap);
    s.addShape("chevron", { x, y: 2.7, w: cw, h: 1.15, fill: { color: st.c }, line: { type: "none" } });
    s.addText([
      { text: st.t + "\n", options: { bold: true, fontSize: 17, color: P.white, breakLine: true } },
      { text: st.d, options: { fontSize: 11.5, color: "FFFFFF" } },
    ], { x: x + (i === 0 ? 0 : 0.2), y: 2.7, w: cw - 0.35, h: 1.15, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: F.head, lineSpacingMultiple: 0.95 });
  });
  s.addText([
    { text: "Today you're at the very start:  ", options: { color: P.slate } },
    { text: "Collect", options: { bold: true, color: "8894A8" } },
    { text: "  →  describe what you actually have. The next 9 days walk the rest of the arrow.", options: { color: P.slate } },
  ], { x: PAGE.m, y: 4.55, w: PAGE.w - 2 * PAGE.m, h: 0.6, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14.5 });
  s.addNotes("Tie each of the three data shapes to where it needs work: unstructured/semi need Clean before Analyse; structured can skip ahead.");
})();

/* ---------- 8. LIVE DEMO (dark) ---------- */
(() => {
  const s = pres.addSlide();
  L.fullBg(s, P.navy);
  L.deco(s, P.coral, 20);
  L.kicker(s, "Live demo · 15 min", P.gold);
  s.addText("Three files, three shapes", { x: PAGE.m, y: 0.95, w: 11.5, h: 0.9, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 32, bold: true, color: P.white });
  const panels = [
    { t: "orders_sample.csv", body: "id, city, value\n1001, Mumbai, 540\n1002, Pune, 320\n1003, Delhi, 710", c: P.teal },
    { t: "app_events.json", body: '{\n  "user": 42,\n  "event": "add_to_cart",\n  "items": [ 7, 9 ]\n}', c: P.orange },
    { t: "customer_reviews.txt", body: '"Driver was late but the\nbiryani was still hot.\nWould order again!"', c: P.coral },
  ];
  const cw = 3.75, gap = 0.42;
  panels.forEach((p, i) => {
    const x = PAGE.m + i * (cw + gap);
    s.addShape("roundRect", { x, y: 2.15, w: cw, h: 3.3, rectRadius: 0.06, fill: { color: "FFFFFF" }, line: { type: "none" }, shadow: L.shadow() });
    s.addText(p.t, { x: x + 0.1, y: 2.22, w: cw - 0.2, h: 0.5, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: "Consolas", fontSize: 12, bold: true, color: p.c });
    s.addText(p.body, { x: x + 0.22, y: 2.8, w: cw - 0.44, h: 2.5, isTextBox: true, margin: 0, valign: "top", fontFace: "Consolas", fontSize: 12, color: P.ink, lineSpacingMultiple: 1.1, align: "left" });
  });
  s.addText("No definitions on a slide — I open the files and you SEE the difference.", { x: PAGE.m, y: 5.75, w: PAGE.w - 2 * PAGE.m, h: 0.6, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 16, italic: true, color: "CAD2E6" });
  s.addNotes("Open the real files side by side (Excel + Notepad). Point at the shape, not the content. 3–4 minutes, then let them loose.");
})();

/* ---------- 9. YOUR TASK ---------- */
(() => {
  const s = L.contentSlide(pres, "Your task — build data_inventory.csv", "Hands-on · 80 min");
  const steps = [
    ["Open each artifact in data/", "Spreadsheets in Excel, the rest in a text viewer."],
    ["Label every file", "Structured / Semi-structured / Unstructured — and its lifecycle stage."],
    ["Write 3 bullet points", "Which go straight to Excel? Which need parsing? Which can't be analysed as-is?"],
  ];
  steps.forEach((st, i) => {
    const y = 1.95 + i * 1.08;
    L.badge(s, PAGE.m, y, 0.6, String(i + 1), P.coral, P.white);
    s.addText([
      { text: st[0] + "\n", options: { bold: true, fontSize: 16.5, color: P.ink, breakLine: true } },
      { text: st[1], options: { fontSize: 13.5, color: P.slate } },
    ], { x: PAGE.m + 0.85, y: y - 0.05, w: 7.6, h: 1.0, isTextBox: true, margin: 0, valign: "middle", fontFace: F.body, lineSpacingMultiple: 1.0, align: "left" });
  });
  L.card(s, { x: 8.75, y: 1.95, w: 3.95, h: 3.25, fill: P.tealLt, line: P.teal });
  s.addText([
    { text: "DONE WHEN\n\n", options: { bold: true, fontSize: 11, color: P.teal, charSpacing: 2, breakLine: true } },
    { text: "Every row in ", options: { fontSize: 14, color: P.ink } },
    { text: "data_inventory.csv", options: { fontSize: 13, color: P.ink, fontFace: "Consolas" } },
    { text: " is labelled, and your 3 bullets are written.", options: { fontSize: 14, color: P.ink } },
  ], { x: 9.05, y: 2.2, w: 3.4, h: 2.75, isTextBox: true, margin: 0, valign: "top", fontFace: F.body, lineSpacingMultiple: 1.15, align: "left" });
  s.addNotes("Float and unblock. The debate over the gray-zone files (GPS pings, review ratings) is the real learning — let it happen.");
})();

/* ---------- 10. YOUR FOLDER ---------- */
(() => {
  const s = L.contentSlide(pres, "What's in Day_01_Data_Foundations/", "Pull it first");
  const tree = [
    ["Day_01_Data_Foundations/", ""],
    ["├── instructions.md", "read this"],
    ["├── data/", ""],
    ["│   ├── orders_sample.csv", "structured"],
    ["│   ├── app_events.json", "semi-structured"],
    ["│   ├── customer_reviews.txt", "unstructured"],
    ["│   ├── gps_pings.csv", "structured-ish"],
    ["│   └── data_inventory.csv", "<< fill this in"],
  ];
  const col = Math.max(...tree.map((t) => t[0].length)) + 2;
  L.codeBox(s, {
    x: PAGE.m, y: 1.9, w: 7.4, h: 4.1, fs: 13.5, accent: "CAD2E6",
    lines: tree.map(([p, c]) => (c ? p.padEnd(col) + "# " + c : p)),
  });
  L.card(s, { x: 8.35, y: 1.9, w: 4.35, h: 4.1, fill: P.cloud, line: P.line });
  s.addText([
    { text: "Get today's folder\n", options: { bold: true, fontSize: 15, color: P.ink, breakLine: true } },
  ], { x: 8.65, y: 2.15, w: 3.8, h: 0.5, isTextBox: true, margin: 0, fontFace: F.head, align: "left" });
  L.codeBox(s, { x: 8.65, y: 2.7, w: 3.75, h: 0.75, fs: 12.5, accent: "7FE3CF", lines: ["git pull upstream main"] });
  s.addText([
    { text: "Not there yet?  ", options: { bold: true, color: P.coral } },
    { text: "The trainer releases each day's folder in the morning. Pull again in a minute.", options: { color: P.slate } },
  ], { x: 8.65, y: 3.7, w: 3.8, h: 1.9, isTextBox: true, margin: 0, valign: "top", fontFace: F.body, fontSize: 13, lineSpacingMultiple: 1.15, align: "left" });
  s.addNotes("Reinforce the daily pull habit here. On Day 1 their first pull is right after they clone.");
})();

/* ---------- 11. SUBMIT ---------- */
(() => {
  const s = L.contentSlide(pres, "Hand it in — your 2nd Pull Request", "Wrap · 15 min");
  L.codeBox(s, {
    x: PAGE.m, y: 1.95, w: 7.5, h: 3.9, fs: 14, accent: "7FE3CF",
    lines: [
      "git pull upstream main",
      "git checkout -b day01-yourname",
      "git add Day_01_Data_Foundations/",
      'git commit -m "Day 1: data inventory"',
      "git push origin day01-yourname",
      "# then click 'Compare & pull request' on GitHub",
    ],
  });
  const tips = [
    ["Stage only your folder", "git add Day_01…/ — never git add ."],
    ["Push to origin (your fork)", "not upstream — that's the trainer's."],
    ["The PR is your submission", "the trainer reviews a couple live."],
  ];
  tips.forEach((t, i) => {
    const y = 1.95 + i * 1.32;
    L.card(s, { x: 8.45, y, w: 4.25, h: 1.15, fill: P.cloud, line: P.line });
    s.addText([
      { text: t[0] + "\n", options: { bold: true, fontSize: 13.5, color: P.ink, breakLine: true } },
      { text: t[1], options: { fontSize: 11.5, color: P.slate } },
    ], { x: 8.7, y: y + 0.08, w: 3.8, h: 1.0, isTextBox: true, margin: 0, valign: "middle", fontFace: F.body, lineSpacingMultiple: 1.0, align: "left" });
  });
  s.addNotes("This is their 2nd PR (first was the roster). By repeating it daily it becomes muscle memory. Review 1-2 PRs on the projector.");
})();

/* ---------- 12. RECAP + TOMORROW ---------- */
(() => {
  const s = pres.addSlide();
  L.fullBg(s, P.navy);
  L.deco(s, P.teal, 15);
  L.kicker(s, "Recap", P.gold);
  s.addText("You can now SEE data types", { x: PAGE.m, y: 1.1, w: 11.5, h: 1.0, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 34, bold: true, color: P.white });
  const chips = ["structured vs semi vs unstructured", "the analytics lifecycle", "the daily Git loop"];
  const cw = 3.75, gap = 0.42;
  chips.forEach((c, i) => {
    const x = PAGE.m + i * (cw + gap);
    s.addText(c, { x, y: 2.75, w: cw, h: 1.15, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.08, fill: { color: "FFFFFF", transparency: 90 }, line: { color: P.white, width: 1, transparency: 55 }, align: "center", valign: "middle", fontFace: F.body, fontSize: 14.5, bold: true, color: P.white });
  });
  s.addText([
    { text: "TOMORROW   ", options: { bold: true, color: P.navy, charSpacing: 2 } },
    { text: "Day 2 — the 4 types of analytics + a data-ethics & PII audit", options: { color: P.navy, bold: true } },
  ], { x: PAGE.m, y: 4.9, w: PAGE.w - 2 * PAGE.m, h: 1.0, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.06, fill: { color: P.gold }, align: "center", valign: "middle", fontFace: F.head, fontSize: 18 });
  s.addNotes("Close by connecting to Day 2: now that we know what KINDS of data exist, tomorrow we ask what KINDS of questions we can put to it — and the ethics of doing so.");
})();

pres.writeFile({ fileName: OUT }).then((f) => console.log("WROTE", f));
