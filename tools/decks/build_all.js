// Builds Day 0 + Days 2-10 classroom decks into the trainer-repo day folders.
// Day 1 is built by gen_day01.js (already approved). Run: node build_all.js <trainer-repo path>
const path = require("path");
const L = require("./lib.js");
const K = require("./kit.js");
const { P, F, PAGE } = L;

const OUTDIR = process.argv[2];
if (!OUTDIR) { console.error("Usage: node build_all.js <trainer-repo path>"); process.exit(1); }

/* ---------------- small helpers ---------------- */
function chip(s, x, y, w, h, text, o) {
  o = o || {};
  s.addText(text, { x, y, w, h, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: o.r == null ? 0.08 : o.r, fill: { color: o.fill || P.cloud2 }, line: o.line ? { color: o.line, width: 1 } : { type: "none" }, align: o.align || "center", valign: "middle", fontFace: o.mono ? "Consolas" : F.body, fontSize: o.fs || 13, bold: !!o.bold, color: o.color || P.ink });
}
function cap(s, x, y, w, text) {
  s.addText(text, { x, y, w, h: 0.5, isTextBox: true, margin: 0, align: "center", valign: "top", fontFace: F.body, fontSize: 11.5, color: P.slate });
}
function bullets(s, x, y, w, h, items, color, fs) {
  s.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, color: color || P.ink, paraSpaceAfter: 7 } })), { x, y, w, h, isTextBox: true, margin: 0, valign: "top", fontFace: F.body, fontSize: fs || 13.5, align: "left" });
}
function venn(s, cx, cy, type) {
  const d = 0.82, lx = cx - 0.67, rx = cx - 0.15;
  const light = (x) => s.addShape("ellipse", { x, y: cy, w: d, h: d, fill: { color: P.cloud2 }, line: { color: P.slate, width: 1 } });
  const fill = (x) => s.addShape("ellipse", { x, y: cy, w: d, h: d, fill: { color: P.teal, transparency: 32 }, line: { color: P.teal, width: 1.75 } });
  if (type === "FULL") { fill(lx); fill(rx); }
  else if (type === "LEFT") { fill(lx); light(rx); }
  else if (type === "RIGHT") { light(lx); fill(rx); }
  else { light(lx); light(rx); s.addShape("ellipse", { x: cx - 0.13, y: cy + 0.13, w: 0.26, h: d - 0.26, fill: { color: P.teal }, line: { type: "none" } }); }
}
// Day 1 slide-4 style git model (used by Day 0)
function gitModelSlide(pres) {
  const s = L.contentSlide(pres, "You get work by pulling, you submit by a Pull Request", "The GitHub workflow");
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
  K.arrow(s, 4.23, 5.0, 2.62, "fork (once)");
  K.arrow(s, 8.33, 9.1, 2.62, "clone / pull");
  s.addText([
    { text: "Every morning: ", options: { color: P.slate } },
    { text: "git pull upstream main", options: { fontFace: "Consolas", color: P.teal, bold: true } },
    { text: "  brings down the day's new folder.", options: { color: P.slate } },
  ], { x: 0.9, y: 3.55, w: 11.5, h: 0.4, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 13.5 });
  s.addText("To hand in your work", { x: PAGE.m, y: 4.35, w: 11, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 15, bold: true, color: P.ink });
  const chips = ["new branch", "add", "commit", "push → open PR"];
  const cw = 2.6, gap = 0.5;
  chips.forEach((c, i) => {
    const x = PAGE.m + i * (cw + gap);
    chip(s, x, 4.85, cw, 0.62, c, { fill: i === chips.length - 1 ? P.teal : P.cloud2, color: i === chips.length - 1 ? P.white : P.ink, bold: i === chips.length - 1, fs: 13.5, r: 0.09 });
    if (i < chips.length - 1) s.addShape("line", { x: x + cw + 0.06, y: 5.16, w: gap - 0.12, h: 0, line: { color: P.slate, width: 1.75, endArrowType: "triangle" } });
  });
  s.addText("Full step-by-step in GIT_WORKFLOW.md — and we'll do it together right now.", { x: PAGE.m, y: 5.95, w: 12, h: 0.4, isTextBox: true, margin: 0, fontFace: F.body, fontSize: 12.5, italic: true, color: P.slate });
  s.addNotes("Draw this on the whiteboard too and keep it up all day. origin = your fork (push here), upstream = my repo (pull here). The #1 student error is pushing to upstream.");
}

/* ---------------- shared rhythm ---------------- */
const RHYTHM = [
  { t: "10 min", l: "Live demo", c: P.coral },
  { t: "5 min", l: "Read the brief", c: P.teal },
  { t: "120 min", l: "You build", c: P.orange },
  { t: "30 min", l: "Show & tell", c: P.gold },
  { t: "15 min", l: "Submit your PR", c: P.navy },
];
const RNOTE = [
  { text: "The demo is short on purpose", options: { bold: true, color: P.ink } },
  { text: "  —  today is about you doing it, not watching.", options: { color: P.slate } },
];

function buildTitle(pres, d) {
  L.titleSlide(pres, { kicker: `FoodCo Data Analytics Bootcamp · Day ${d.n}`, title: d.title, subtitle: d.sub, tags: d.tags, footer: `100% hands-on  ·  ${d.sessionLen || "3-hour"} session  ·  ${d.module}` });
}

/* ================= DAY CONFIGS ================= */
const DAYS = [];

/* ---- DAY 2 ---- */
DAYS.push({
  n: 2, nn: "02", dir: "Day_02_Analytics_Types_and_Ethics", module: "Module 1 of 3",
  sessionLen: "6-hour",
  title: "Analytics Types & Ethics", sub: "What kind of question is this — and should we even answer it?",
  tags: ["Descriptive", "Predictive", "Prescriptive", "PII", "DPDP"],
  rhythm: [
    { t: "25 min", l: "2 demos — 4 lenses + mask a phone", c: P.coral },
    { t: "75 min", l: "Build A — tag & debate 15 Qs", c: P.orange },
    { t: "70 min", l: "Build B — safe-to-share table", c: P.teal },
    { t: "45 min", l: "Build C — 3 descriptive stats", c: P.gold },
    { t: "45 min", l: "Ethics-desk role-play", c: P.navy },
    { t: "30 min", l: "Show & tell + open your PR", c: P.coral },
  ],
  rhythmNote: [
    { text: "Two 10-min breaks across the day. ", options: { color: P.slate } },
    { text: "The demos are short on purpose", options: { bold: true, color: P.ink } },
    { text: " — today you build it, twice.", options: { color: P.slate } },
  ],
  scenario: {
    title: "Fifteen questions, one data-ethics problem", eyebrow: "The business scenario",
    scenario: [
      { text: "Leadership fires fifteen questions at the new team", options: { bold: true, color: P.ink } },
      { text: " — from “what was revenue in August?” to “what discount keeps each customer?”. Meanwhile Legal flags that the customer table is ", options: { color: P.slate } },
      { text: "full of personal data nobody has reviewed", options: { bold: true, color: P.coral } },
      { text: " — and FoodCo answers to India’s DPDP Act.", options: { color: P.slate } },
    ],
    files: [{ name: "business_questions.csv", deliverable: true }, { name: "customers_pii.csv" }, { name: "orders_sample.csv" }, { name: "→ safe_customers.csv", deliverable: true }],
    callout: [{ text: "Two jobs today:  ", options: { color: P.white } }, { text: "classify the questions, then make the data safe to share.", options: { bold: true, color: P.gold } }],
    notes: "Hook on the tension: the business wants answers, Legal wants safety. Both are your job now. 15 questions (10 core + 5 bonus) and a real masking build.",
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "The four types of analytics", "The core idea");
      K.cardsRow(s, {
        y: 1.95, h: 3.7, items: [
          { badge: "1", color: P.teal, head: "Descriptive", body: "What happened?\n\n“Revenue in August?”", bodyAlign: "center", headSize: 16 },
          { badge: "2", color: P.orange, head: "Diagnostic", body: "Why did it happen?\n\n“Why did Mumbai dip?”", bodyAlign: "center", headSize: 16 },
          { badge: "3", color: P.coral, head: "Predictive", body: "What will happen?\n\n“Who will churn?”", bodyAlign: "center", headSize: 16 },
          { badge: "4", color: P.navy, head: "Prescriptive", body: "What should we do?\n\n“What discount keeps them?”", bodyAlign: "center", headSize: 16 },
        ],
      });
      s.addText([
        { text: "Value & difficulty climb left → right.  ", options: { bold: true, color: P.ink } },
        { text: "Most companies live in column 1 and wish they were in column 4.", options: { color: P.slate } },
      ], { x: PAGE.m, y: 5.9, w: PAGE.w - 2 * PAGE.m, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14 });
      s.addNotes("Don't lecture the definitions — anchor each to a real FoodCo question. The jump from Descriptive to Predictive is the jump from a formula to a project.");
    },
    (pres) => {
      const s = K.concept(pres, "Mask before you share — your safe-to-share table", "Data ethics · Build B");
      const cols = [
        { x: PAGE.m, w: 2.5, h: "Column" },
        { x: 3.25, w: 6.3, h: "Masking rule  (yesterday’s text functions)" },
        { x: 9.75, w: 2.95, h: "Result" },
      ];
      const rowY = 1.95, rh = 0.66;
      cols.forEach((c) => s.addText(c.h, { x: c.x, y: rowY, w: c.w, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 12, bold: true, color: P.teal, align: "left" }));
      const rows = [
        ["customer_id", "KEEP — it’s a pseudonym / your analysis key", "C0001", true],
        ["customer_name", '=LEFT(B2,1)&". "&MID(B2,FIND(" ",B2)+1,1)&"."', "K. S.", false],
        ["email", '=LEFT(C2,2)&"***@"&MID(C2,FIND("@",C2)+1,50)', "kr***@example.com", false],
        ["phone", '="xxxxxx"&RIGHT(D2,4)', "xxxxxx2098", false],
        ["date_of_birth", '=TEXT(E2,"yyyy")   — year only / age band', "1996", false],
      ];
      rows.forEach((r, i) => {
        const y = rowY + 0.52 + i * rh;
        if (i % 2 === 0) s.addShape("roundRect", { x: PAGE.m - 0.1, y: y - 0.03, w: PAGE.w - 2 * PAGE.m + 0.2, h: rh, rectRadius: 0.04, fill: { color: P.cloud }, line: { type: "none" } });
        s.addText(r[0], { x: cols[0].x, y, w: cols[0].w, h: rh - 0.06, isTextBox: true, margin: 0, valign: "middle", fontFace: "Consolas", fontSize: 12, bold: true, color: r[3] ? P.teal : P.ink, align: "left" });
        s.addText(r[1], { x: cols[1].x, y, w: cols[1].w, h: rh - 0.06, isTextBox: true, margin: 0, valign: "middle", fontFace: r[3] ? F.body : "Consolas", fontSize: r[3] ? 12 : 11, color: r[3] ? P.slate : P.ink, align: "left" });
        s.addText(r[2], { x: cols[2].x, y, w: cols[2].w, h: rh - 0.06, isTextBox: true, margin: 0, valign: "middle", fontFace: "Consolas", fontSize: 12, bold: true, color: P.teal, align: "left" });
      });
      s.addText([
        { text: "city", options: { fontFace: "Consolas", color: P.ink, bold: true } },
        { text: " stays readable but is a ", options: { color: P.slate } },
        { text: "quasi-identifier", options: { bold: true, color: P.coral } },
        { text: " — city + date of birth can re-identify someone with no name attached.", options: { color: P.slate } },
      ], { x: PAGE.m, y: 5.95, w: PAGE.w - 2 * PAGE.m, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 13 });
      s.addNotes("This IS Build B. Every formula is one they used yesterday — LEFT / RIGHT / MID / FIND / TEXT. The lesson: masking isn't a new skill, it's yesterday's skill aimed at a privacy problem. Do NOT let them mask customer_id — that's the analysis key you keep.");
    },
    (pres) => {
      const s = K.concept(pres, "You can — but should you?  India’s DPDP Act 2023", "Governance");
      K.cardsRow(s, {
        y: 1.95, h: 3.3, items: [
          { badge: "1", color: P.teal, head: "Consent", body: "Collect personal data only with clear, informed consent for a stated purpose.", bodyAlign: "center", headSize: 16 },
          { badge: "2", color: P.orange, head: "Purpose limit", body: "Data taken to deliver food can’t be silently reused — e.g. sold to a partner.", bodyAlign: "center", headSize: 16 },
          { badge: "3", color: P.coral, head: "Minimisation", body: "Don’t keep what you don’t need. Why store a full DOB when an age band works?", bodyAlign: "center", headSize: 16 },
          { badge: "4", color: P.navy, head: "Data fiduciary", body: "The company is accountable for protecting it — a breach carries real penalties.", bodyAlign: "center", headSize: 16 },
        ],
      });
      s.addText([
        { text: "Capability ≠ permission.  ", options: { bold: true, color: P.gold } },
        { text: "You can compute “average order value by age” — governance decides whether you should.", options: { color: P.white } },
      ], { x: PAGE.m, y: 5.5, w: PAGE.w - 2 * PAGE.m, h: 0.85, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.06, fill: { color: P.navy }, align: "center", valign: "middle", fontFace: F.head, fontSize: 16 });
      s.addNotes("FoodCo is an Indian company, so DPDP is their real law — four words they'll remember. Land 'capability ≠ permission': the whole ethics-desk role-play hangs on it.");
    },
  ],
  demo: {
    title: "A formula vs a project — then mask live", eyebrow: "Two live demos",
    code: [
      '=COUNTIFS(order_date, "yesterday")   -- "how many orders?"  → answerable NOW  (Descriptive)',
      '-- "who will churn next month?"       → needs history + a model, not a formula  (Predictive)',
      '',
      '="xxxxxx"&RIGHT(D2,4)                         -- mask a phone  → xxxxxx2098',
      '=LEFT(C2,2)&"***@"&MID(C2,FIND("@",C2)+1,50)  -- mask an email → kr***@example.com',
    ],
    codeSize: 12.5,
    tagline: "One question is a formula; the other is a project. One formula turns raw PII into safe data.",
    notes: "Demo 1 (4 lenses): type the COUNTIFS live — instant — then ask the room what 'who will churn' actually requires (history + a model). Demo 2 (mask): mask a phone with RIGHT, then an email with LEFT+MID+FIND. Say out loud: these are yesterday's functions.",
  },
  task: {
    title: "Classify, make safe, then decide", eyebrow: "Hands-on · most of the day",
    steps: [
      ["Tag all 15 questions", "Descriptive / Diagnostic / Predictive / Prescriptive in business_questions.csv (10 core + 5 bonus)."],
      ["Build a safe-to-share table", "A masking formula for every PII column in customers_pii.csv (LEFT/RIGHT/MID/FIND/TEXT) → safe_customers.csv. Keep customer_id."],
      ["Three descriptive stats", "Total revenue, AOV, order count on orders_sample.csv — then: why can't these predict the future?"],
      ["The ethics desk", "For 4 stakeholder requests decide answer / refuse / answer only masked-&-aggregated — and justify each."],
    ],
    doneWhen: [{ text: "15 Qs tagged · safe_customers.csv fully masked (customer_id kept) · 3 stats done · audit.md records your rules + the one risky question.", options: { fontSize: 13, color: P.ink } }],
    notes: "Float and challenge their tags — many questions sit between two types. In Build B, don't let them mask customer_id. In the ethics desk, 'refuse everything' is wrong — the skill is knowing when masked-&-aggregated makes it OK.",
  },
  folder: {
    title: "What's in Day_02_Analytics_Types_and_Ethics/",
    tree: [["Day_02_Analytics_Types_and_Ethics/", ""], ["├── instructions.md", "read this"], ["├── data/", ""], ["│   ├── business_questions.csv", "tag all 15"], ["│   ├── customers_pii.csv", "audit & mask"], ["│   └── orders_sample.csv", "3 quick stats"]],
  },
  submit: { branch: "day02-yourname", folder: "Day_02_Analytics_Types_and_Ethics", commit: "Day 2: analytics types + PII masking audit" },
  recap: {
    title: "You can classify questions — and make data safe to share",
    chips: ["descriptive → prescriptive", "a safe-to-share masked table", "DPDP & the ethics desk"],
    tomorrow: "Day 3 — clean the messy order export with Power Query  (Module 2 begins)",
    notes: "Bridge: now we know what questions to ask; the next 4 days are about getting data clean enough to answer them in Excel.",
  },
});

/* ---- DAY 3 ---- */
DAYS.push({
  n: 3, nn: "03", dir: "Day_03_Data_Cleaning_PowerQuery", module: "Module 2 of 3",
  title: "Data Cleaning with Power Query", sub: "Turn a garbage export into a table Finance can trust",
  tags: ["Power Query", "Dedupe", "Standardise", "Types"],
  scenario: {
    title: "Finance can't total the quarter", eyebrow: "The business scenario",
    scenario: [
      { text: "Finance tried to total last quarter's revenue from the raw order export and got garbage", options: { bold: true, color: P.ink } },
      { text: " — duplicate rows, blank values, five date formats, “₹1,234”-style text amounts, and city names spelled six different ways. They need a table they can trust.", options: { color: P.slate } },
    ],
    files: [{ name: "raw_orders.csv  (1,440 dirty rows)" }, { name: "→ clean_orders", deliverable: true }],
    callout: [{ text: "Don't fix it by hand.  ", options: { color: P.white } }, { text: "Record a recipe that re-cleans next month's file too.", options: { bold: true, color: P.gold } }],
    notes: "Open raw_orders.csv on the projector for 10 seconds — let them groan at the mess. That groan is the motivation.",
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "Dirty in, trusted out", "The core idea");
      L.card(s, { x: PAGE.m, y: 1.9, w: 5.3, h: 3.6, fill: P.coralLt, line: P.coral });
      s.addText("raw_orders.csv — dirty", { x: PAGE.m + 0.3, y: 2.1, w: 4.7, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 15, bold: true, color: P.coral, align: "left" });
      bullets(s, PAGE.m + 0.35, 2.6, 4.6, 2.7, ["Duplicate rows", "Blank Customer ID / value", "Five date formats", "“Rs. 1,234” text amounts", "Bangalore / BENGALURU / bengaluru", "Negative delivery times"], P.ink, 13);
      K.arrow(s, 6.05, 7.05, 3.7, null, P.slate);
      L.card(s, { x: 7.2, y: 1.9, w: 5.5, h: 3.6, fill: P.tealLt, line: P.teal });
      s.addText("clean_orders — trusted", { x: 7.5, y: 2.1, w: 4.9, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 15, bold: true, color: P.teal, align: "left" });
      bullets(s, 7.55, 2.6, 4.8, 2.7, ["One row per order", "Nulls removed or flagged", "One real date type", "Real numbers you can SUM", "“Bengaluru” everywhere", "Valid delivery times"], P.ink, 13);
      s.addText([
        { text: "Every click becomes an Applied Step", options: { bold: true, color: P.ink } },
        { text: "  —  a recipe that re-cleans next month's file for free.", options: { color: P.slate } },
      ], { x: PAGE.m, y: 5.75, w: PAGE.w - 2 * PAGE.m, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14 });
      s.addNotes("The big idea isn't the cleaning — it's that Power Query RECORDS it. Manual cleaning dies the moment a new file arrives.");
    },
  ],
  demo: {
    title: "Clean a junk sample live", eyebrow: "Live demo · 10 min",
    code: ["Data ▸ Get Data ▸ From Text/CSV", "Remove Duplicates", "Transform ▸ Format ▸ Trim", "Replace Values:   Bangalore → Bengaluru", "Change Type:      Order Value → Decimal", "Change Type:      Order Date  → Date"],
    codeSize: 14,
    tagline: "Watch the Applied Steps panel record every click — that panel IS your reusable recipe.",
    notes: "Use a 6-row junk sample. Point at Applied Steps after every action. Then delete a step to show it's editable.",
  },
  task: {
    title: "Clean raw_orders.csv", eyebrow: "Hands-on · 2 hours",
    steps: [
      ["Load it into Power Query", "Data ▸ Get Data ▸ From Text/CSV."],
      ["Clean it", "Dedupe; handle null ID/value; standardise City; “₹1,234” text → number; one date type; fix negative times."],
      ["Load to a sheet", "Output the result as clean_orders."],
      ["Report your drops", "How many rows did you remove, and why?"],
    ],
    doneWhen: [{ text: "A clean_orders sheet loads from the Applied Steps, and you can state your row-drop count + reason.", options: { fontSize: 14, color: P.ink } }],
    notes: "clean_orders becomes the input for Day 4's lookups — this file is not throwaway.",
  },
  folder: {
    title: "What's in Day_03_Data_Cleaning_PowerQuery/",
    tree: [["Day_03_Data_Cleaning_PowerQuery/", ""], ["├── instructions.md", "read this"], ["└── raw_orders.csv", "1,440 dirty rows"]],
  },
  submit: { branch: "day03-yourname", folder: "Day_03_Data_Cleaning_PowerQuery", commit: "Day 3: Power Query clean_orders" },
  recap: {
    title: "You can turn garbage into a trusted table",
    chips: ["dedupe · nulls · types", "standardise messy text", "Applied Steps = a recipe"],
    tomorrow: "Day 4 — enrich the clean table with VLOOKUP / INDEX-MATCH / XLOOKUP",
  },
});

/* ---- DAY 4 ---- */
DAYS.push({
  n: 4, nn: "04", dir: "Day_04_Lookups", module: "Module 2 of 3",
  title: "Lookups: VLOOKUP · INDEX-MATCH · XLOOKUP", sub: "Turn ID codes into a report humans can actually read",
  tags: ["VLOOKUP", "INDEX-MATCH", "XLOOKUP", "IFERROR"],
  scenario: {
    title: "A report full of useless codes", eyebrow: "The business scenario",
    scenario: [
      { text: "The clean orders table only has ID codes", options: { bold: true, color: P.ink } },
      { text: " — R017, P092 — useless in a report nobody can read. The CXO wants restaurant ", options: { color: P.slate } },
      { text: "name, cuisine, partner name and rating", options: { bold: true, color: P.coral } },
      { text: " next to every order.", options: { color: P.slate } },
    ],
    files: [{ name: "orders_clean.csv", deliverable: true }, { name: "restaurants.csv" }, { name: "delivery_partners.csv" }],
    callout: [{ text: "Stop copy-pasting.  ", options: { color: P.white } }, { text: "Let a lookup pull the right row every time.", options: { bold: true, color: P.gold } }],
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "What a lookup actually does", "The core idea");
      s.addText([
        { text: "=VLOOKUP(", options: { color: P.ink } },
        { text: "lookup_value", options: { color: P.teal, bold: true } },
        { text: ", ", options: { color: P.ink } },
        { text: "table", options: { color: P.orange, bold: true } },
        { text: ", ", options: { color: P.ink } },
        { text: "col_index", options: { color: P.coral, bold: true } },
        { text: ", ", options: { color: P.ink } },
        { text: "FALSE", options: { color: P.navy, bold: true } },
        { text: ")", options: { color: P.ink } },
      ], { x: PAGE.m, y: 1.95, w: PAGE.w - 2 * PAGE.m, h: 0.7, isTextBox: true, margin: 0, align: "center", fontFace: "Consolas", fontSize: 24 });
      const args = [
        { t: "lookup_value", c: P.teal, d: "what to find\n(A2)" },
        { t: "table", c: P.orange, d: "where to look\n(Rest!$A:$C)" },
        { t: "col_index", c: P.coral, d: "which column\n(2)" },
        { t: "FALSE", c: P.navy, d: "EXACT match\n— always" },
      ];
      const cw = 2.75, gap = 0.42, startX = (PAGE.w - (4 * cw + 3 * gap)) / 2;
      args.forEach((a, i) => {
        const x = startX + i * (cw + gap);
        chip(s, x, 2.95, cw, 0.6, a.t, { fill: a.c, color: P.white, bold: true, mono: true, fs: 13 });
        s.addText(a.d, { x, y: 3.65, w: cw, h: 0.8, isTextBox: true, margin: 0, align: "center", valign: "top", fontFace: F.body, fontSize: 12.5, color: P.slate, lineSpacingMultiple: 1.0 });
      });
      const opts = [["VLOOKUP", "simple, left → right"], ["INDEX-MATCH", "any direction"], ["XLOOKUP", "modern (Excel 365)"]];
      const ow = 3.75, og = 0.42;
      opts.forEach((o, i) => {
        const x = PAGE.m + i * (ow + og);
        L.card(s, { x, y: 4.75, w: ow, h: 1.0, fill: P.cloud, line: P.line });
        s.addText([{ text: o[0] + "\n", options: { bold: true, fontSize: 14, color: P.ink, breakLine: true } }, { text: o[1], options: { fontSize: 12, color: P.slate } }], { x, y: 4.85, w: ow, h: 0.8, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: F.head, lineSpacingMultiple: 1.0 });
      });
      s.addNotes("The one thing they must remember: the 4th argument is FALSE (exact). Approximate match is the silent killer.");
    },
  ],
  demo: {
    title: "Build it, break it, bulletproof it", eyebrow: "Live demo · 10 min",
    code: ["=VLOOKUP(A2, Rest!$A:$C, 2, FALSE)     -- pull name by code", "-- break it: wrong col_index → wrong data", "-- break it: TRUE (approx) → silent mismatches", "=INDEX(Rest!$B:$B, MATCH(A2, Rest!$A:$A, 0))", '=IFERROR(VLOOKUP(...), "Unknown")      -- no more #N/A'],
    codeSize: 13.5,
    tagline: "FALSE means exact match. Forget it and your report lies quietly.",
    notes: "Break it on purpose first (wrong index, TRUE). Seeing the wrong-but-not-error result is what makes exact-match stick.",
  },
  task: {
    title: "Enrich every order row", eyebrow: "Hands-on · 2 hours",
    steps: [
      ["Add lookup columns", "Pull restaurant_name + cuisine from restaurants.csv; partner_name + rating from delivery_partners.csv."],
      ["Redo one with INDEX-MATCH", "(and XLOOKUP if you're on Excel 365)."],
      ["Wrap in IFERROR", "Missing matches read “Unknown”, not #N/A."],
      ["Bonus: find the mismatch", "One restaurant has orders in a city it doesn't operate in."],
    ],
    doneWhen: [{ text: "Every order row shows readable names + rating, errors handled, and you found the odd city out.", options: { fontSize: 14, color: P.ink } }],
  },
  folder: {
    title: "What's in Day_04_Lookups/",
    tree: [["Day_04_Lookups/", ""], ["├── instructions.md", "read this"], ["├── orders_clean.csv", "add columns here"], ["├── restaurants.csv", "lookup table"], ["└── delivery_partners.csv", "lookup table"]],
  },
  submit: { branch: "day04-yourname", folder: "Day_04_Lookups", commit: "Day 4: enriched orders with lookups" },
  recap: {
    title: "You can join tables without a database",
    chips: ["VLOOKUP / INDEX-MATCH / XLOOKUP", "exact match & IFERROR", "codes → readable names"],
    tomorrow: "Day 5 — turn the enriched table into a one-page pivot dashboard",
  },
});

/* ---- DAY 5 ---- */
DAYS.push({
  n: 5, nn: "05", dir: "Day_05_Pivot_Reporting", module: "Module 2 of 3",
  title: "Pivot Tables & Charts", sub: "Build the one-page dashboard that ends gut-feel Mondays",
  tags: ["PivotTable", "Slicer", "Timeline", "PivotChart"],
  scenario: {
    title: "End the Monday gut-feel argument", eyebrow: "The business scenario",
    scenario: [
      { text: "Every Monday leadership argues from gut feel.", options: { bold: true, color: P.ink } },
      { text: " You're going to end that — build the one-page dashboard that answers “where's the money, and where are we failing on delivery?” at a glance.", options: { color: P.slate } },
    ],
    files: [{ name: "orders_enriched.csv" }, { name: "→ Dashboard sheet", deliverable: true }],
    callout: [{ text: "Where's the money —  ", options: { color: P.white } }, { text: "and which city is drowning in late orders?", options: { bold: true, color: P.gold } }],
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "One pivot answers many questions", "The core idea");
      L.codeBox(s, { x: PAGE.m, y: 2.0, w: 4.4, h: 2.5, fs: 12, accent: "CAD2E6", lines: ["order  city     value", "1001   Mumbai   540", "1002   Pune     320", "1003   Mumbai   710", "1004   Delhi    280", "…1,440 rows"] });
      K.arrow(s, 5.2, 6.3, 3.25, "drag", P.slate);
      L.card(s, { x: 6.5, y: 2.0, w: 3.2, h: 2.5, fill: P.tealLt, line: P.teal });
      s.addText([{ text: "City      Revenue\n", options: { bold: true, color: P.teal, breakLine: true } }, { text: "Mumbai    1,250\nPune        320\nDelhi       280", options: { color: P.ink } }], { x: 6.7, y: 2.2, w: 2.9, h: 2.1, isTextBox: true, margin: 0, valign: "top", fontFace: "Consolas", fontSize: 12.5, lineSpacingMultiple: 1.2, align: "left" });
      s.addText([{ text: "Rows = City,  Values = Sum(order_value).  ", options: { bold: true, color: P.ink } }, { text: "Drag a field — every number recomputes.", options: { color: P.slate } }], { x: 10.0, y: 2.6, w: 2.8, h: 1.4, isTextBox: true, margin: 0, valign: "middle", fontFace: F.body, fontSize: 13, lineSpacingMultiple: 1.1, align: "left" });
      const ch = ["revenue by city", "by cuisine", "top-5 restaurants", "orders by hour", "% late by city"];
      const cw = 2.3, gap = 0.2, startX = (PAGE.w - (5 * cw + 4 * gap)) / 2;
      ch.forEach((c, i) => chip(s, startX + i * (cw + gap), 5.1, cw, 0.6, c, { fill: P.cloud2, color: P.ink, fs: 11.5 }));
      s.addText("The five pivots you'll build today", { x: PAGE.m, y: 4.65, w: PAGE.w - 2 * PAGE.m, h: 0.35, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 12, italic: true, color: P.slate });
      s.addNotes("The 'aha' is that one pivot is five reports — you just drag fields. Nobody hand-writes a SUMIF after seeing this.");
    },
  ],
  demo: {
    title: "A pivot from 20 rows", eyebrow: "Live demo · 10 min",
    code: ["Insert ▸ PivotTable", "Rows:    City", "Values:  Sum of order_value     (toggle Sum ↔ Average)", "Insert ▸ Slicer:  City", "Insert ▸ PivotChart"],
    codeSize: 14,
    tagline: "Drag one field and every number recomputes — this is why we never hand-type a SUMIF again.",
    notes: "Drag City in and out of Rows live. Switch Sum↔Average with one click. Add the slicer last — the 'wow'.",
  },
  task: {
    title: "Build the ops dashboard", eyebrow: "Hands-on · 2 hours",
    steps: [
      ["Build 5 pivots", "Revenue by city; by cuisine; top-5 restaurants; orders by hour; % late by city."],
      ["Add a Slicer + Timeline", "Slicer on city, Timeline on order date."],
      ["Build the Dashboard sheet", "Drop 2 PivotCharts onto one sheet."],
      ["Write the CEO headline", "The one finding you'd lead with."],
    ],
    doneWhen: [{ text: "A Dashboard sheet with 2+ charts, a working slicer/timeline, and your one-line CEO headline.", options: { fontSize: 14, color: P.ink } }],
  },
  folder: {
    title: "What's in Day_05_Pivot_Reporting/",
    tree: [["Day_05_Pivot_Reporting/", ""], ["├── instructions.md", "read this"], ["└── orders_enriched.csv", "build pivots from this"]],
  },
  submit: { branch: "day05-yourname", folder: "Day_05_Pivot_Reporting", commit: "Day 5: pivot dashboard" },
  recap: {
    title: "You can build a dashboard in minutes",
    chips: ["PivotTables & PivotCharts", "Slicers & Timelines", "a one-page ops review"],
    tomorrow: "Day 6 — automate the whole report into one button with a macro",
  },
});

/* ---- DAY 6 ---- */
DAYS.push({
  n: 6, nn: "06", dir: "Day_06_Macros_Automation", module: "Module 2 of 3",
  title: "Macros & Automation", sub: "Turn 20 minutes of clicking into one button",
  tags: ["Macro Recorder", "VBA", "Conditional Formatting", "Button"],
  scenario: {
    title: "The same 20 minutes, every morning", eyebrow: "The business scenario",
    scenario: [
      { text: "You now rebuild that ops report every single morning", options: { bold: true, color: P.ink } },
      { text: " — format headers, red-flag late orders, refresh the pivot. It's 20 minutes of mind-numbing clicking. Automate the whole thing into one button.", options: { color: P.slate } },
    ],
    files: [{ name: "orders_enriched.csv" }, { name: "→ report.xlsm", deliverable: true }],
    callout: [{ text: "Do it once by hand.  ", options: { color: P.white } }, { text: "Make the computer do it forever.", options: { bold: true, color: P.gold } }],
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "Record → read → assign", "The core idea");
      K.cardsRow(s, {
        y: 2.1, h: 3.1, items: [
          { badge: "1", color: P.teal, head: "Record", body: "Developer ▸ Record Macro, then do the formatting once by hand.", bodyAlign: "center", headSize: 17 },
          { badge: "2", color: P.orange, head: "Read", body: "Alt+F11 opens the VBA the recorder wrote for you.", bodyAlign: "center", headSize: 17 },
          { badge: "3", color: P.coral, head: "Assign", body: "Hook it to a Form-Control button on the sheet.", bodyAlign: "center", headSize: 17 },
        ],
      });
      s.addText([{ text: "The recorder writes the code.  ", options: { bold: true, color: P.ink } }, { text: "You just read it and tweak one line.", options: { color: P.slate } }], { x: PAGE.m, y: 5.5, w: PAGE.w - 2 * PAGE.m, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14 });
      s.addNotes("Demystify VBA: they are not 'learning to code', they are reading what the recorder produced and changing a value.");
    },
  ],
  demo: {
    title: "The recorder writes your code", eyebrow: "Live demo · 10 min",
    code: ["Sub RefreshReport()", "    Rows(1).Font.Bold = True", "    Columns.AutoFit", "    ThisWorkbook.RefreshAll", '    MsgBox "Report refreshed: " & Now()', "End Sub"],
    codeSize: 14,
    tagline: "Record three clicks, change one colour in the code, re-run. That's automation.",
    notes: "Record live, Stop, Alt+F11 to reveal the code, change one literal (colour index), re-run, then drop the button.",
  },
  task: {
    title: "Automate the report", eyebrow: "Hands-on · 2 hours",
    steps: [
      ["Record the macro", "Bold+colour header, auto-fit, red-flag is_late=1 rows, refresh pivots."],
      ["Read the VBA", "Alt+F11 — see the code the recorder wrote."],
      ["Assign to a button", "Form Control button on the sheet; save as .xlsm."],
      ["Bonus: add a MsgBox", 'MsgBox "Report refreshed: " & Now().'],
    ],
    doneWhen: [{ text: "A .xlsm with one button that formats + refreshes the whole report in a single click.", options: { fontSize: 14, color: P.ink } }],
  },
  folder: {
    title: "What's in Day_06_Macros_Automation/",
    tree: [["Day_06_Macros_Automation/", ""], ["├── instructions.md", "read this"], ["└── orders_enriched.csv", "automate on this → .xlsm"]],
  },
  submit: { branch: "day06-yourname", folder: "Day_06_Macros_Automation", commit: "Day 6: one-button report macro" },
  recap: {
    title: "You can automate a report into one click",
    chips: ["record a macro", "read & edit VBA", "a button anyone can press"],
    tomorrow: "Day 7 — the data moves into a database; your first SQL  (Module 3 begins)",
    notes: "Bridge to SQL: Excel was great, but the data has outgrown it. Tomorrow the same FoodCo data lives in a database.",
  },
});

/* ---- DAY 7 ---- */
DAYS.push({
  n: 7, nn: "07", dir: "Day_07_SQL_Basics", module: "Module 3 of 3",
  title: "SQL Foundations", sub: "Ask the database directly: SELECT · WHERE · GROUP BY · HAVING",
  tags: ["SELECT", "WHERE", "GROUP BY", "HAVING"],
  scenario: {
    title: "The data outgrew Excel", eyebrow: "The business scenario",
    scenario: [
      { text: "The data now lives in a database.", options: { bold: true, color: P.ink } },
      { text: " Ops wants fast answers — busiest cities, highest-value orders, which cuisines clear a volume bar — straight from SQL.", options: { color: P.slate } },
    ],
    files: [{ name: "answers.sql", deliverable: true }, { name: "../datasets/foodco.db" }],
    callout: [{ text: "Same FoodCo data you cleaned in Excel  ", options: { color: P.white } }, { text: "— now you query it.", options: { bold: true, color: P.gold } }],
    notes: "Emphasise continuity: this is the SAME data universe, just in a database now. DB Browser for SQLite, zero setup.",
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "The anatomy of a query", "The core idea");
      L.card(s, { x: PAGE.m, y: 1.95, w: 7.3, h: 3.75, fill: P.cloud, line: P.line });
      const q = [
        ["SELECT", "city, COUNT(*), SUM(order_value)", P.teal],
        ["FROM", "orders", P.slate],
        ["WHERE", "status = 'Delivered'", P.orange],
        ["GROUP BY", "city", P.coral],
        ["HAVING", "COUNT(*) > 400", P.navy],
        ["ORDER BY", "2 DESC", P.slate],
      ];
      q.forEach((ln, i) => {
        const y = 2.2 + i * 0.56;
        s.addText([{ text: ln[0] + " ", options: { bold: true, color: ln[2], fontFace: "Consolas", fontSize: 15 } }, { text: ln[1], options: { color: P.ink, fontFace: "Consolas", fontSize: 15 } }], { x: PAGE.m + 0.35, y, w: 6.8, h: 0.5, isTextBox: true, margin: 0, valign: "middle", align: "left" });
      });
      L.card(s, { x: 8.35, y: 1.95, w: 4.35, h: 3.75, fill: P.goldLt, line: P.gold });
      s.addText([
        { text: "THE GOLDEN RULE\n\n", options: { bold: true, fontSize: 11, color: "9A7B10", charSpacing: 2, breakLine: true } },
        { text: "WHERE", options: { bold: true, fontFace: "Consolas", color: P.orange, fontSize: 16 } },
        { text: " filters ", options: { color: P.ink, fontSize: 15 } },
        { text: "rows\n", options: { bold: true, color: P.ink, fontSize: 15, breakLine: true } },
        { text: "(before grouping)\n\n", options: { color: P.slate, fontSize: 13, breakLine: true } },
        { text: "HAVING", options: { bold: true, fontFace: "Consolas", color: P.navy, fontSize: 16 } },
        { text: " filters ", options: { color: P.ink, fontSize: 15 } },
        { text: "groups\n", options: { bold: true, color: P.ink, fontSize: 15, breakLine: true } },
        { text: "(after grouping)", options: { color: P.slate, fontSize: 13 } },
      ], { x: 8.7, y: 2.2, w: 3.7, h: 3.3, isTextBox: true, margin: 0, valign: "top", fontFace: F.body, lineSpacingMultiple: 1.1, align: "left" });
      s.addNotes("Clause order is also execution order to teach: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. The golden rule is the single most-tested idea.");
    },
  ],
  demo: {
    title: "Build a query clause by clause", eyebrow: "Live demo · 10 min",
    code: ["SELECT city, COUNT(*) AS orders, SUM(order_value) AS revenue", "FROM orders", "WHERE status = 'Delivered'", "GROUP BY city", "HAVING COUNT(*) > 100", "ORDER BY revenue DESC;"],
    codeSize: 14,
    tagline: "Add one clause at a time. WHERE filters rows; HAVING filters groups.",
    notes: "Run it incrementally — SELECT+FROM, then add WHERE, then GROUP BY, then HAVING. Watch the result shrink each time.",
  },
  task: {
    title: "Answer Ops in SQL", eyebrow: "Hands-on · 2 hours",
    steps: [
      ["Totals", "Overall total & average order value."],
      ["Group & sort", "Order count by city (GROUP BY), sorted desc."],
      ["Filter", "Orders above ₹1,500 (WHERE); delivered-only revenue by payment method."],
      ["HAVING + takeaways", "Cities with more than 400 orders; one-line takeaway under each query."],
    ],
    doneWhen: [{ text: "answers.sql runs clean against foodco.db with a business takeaway under every query.", options: { fontSize: 14, color: P.ink } }],
  },
  folder: {
    title: "What's in Day_07_SQL_Basics/",
    tree: [["Day_07_SQL_Basics/", ""], ["├── instructions.md", "read this"], ["├── answers.sql", "write queries here"], ["└── ../datasets/foodco.db", "the database"]],
    pullNote: [{ text: "The database ", options: { color: P.slate } }, { text: "foodco.db", options: { fontFace: "Consolas", color: P.ink } }, { text: " lands in ", options: { color: P.slate } }, { text: "datasets/", options: { fontFace: "Consolas", color: P.ink } }, { text: " today — open it in DB Browser for SQLite.", options: { color: P.slate } }],
  },
  submit: { branch: "day07-yourname", folder: "Day_07_SQL_Basics", commit: "Day 7: SELECT / GROUP BY / HAVING" },
  recap: {
    title: "You can interrogate a database",
    chips: ["SELECT · WHERE · GROUP BY", "aggregates & HAVING", "rows vs groups"],
    tomorrow: "Day 8 — JOIN tables for the full 360° order view",
  },
});

/* ---- DAY 8 ---- */
DAYS.push({
  n: 8, nn: "08", dir: "Day_08_SQL_Joins", module: "Module 3 of 3",
  title: "Joins: the 360° order view", sub: "No single table tells the whole story",
  tags: ["INNER", "LEFT", "RIGHT", "FULL"],
  scenario: {
    title: "The win-back target list", eyebrow: "The business scenario",
    scenario: [
      { text: "No single table tells the full story.", options: { bold: true, color: P.ink } },
      { text: " Marketing wants the top customers and which registered customers have ", options: { color: P.slate } },
      { text: "never ordered", options: { bold: true, color: P.coral } },
      { text: ", so they can be win-back targeted.", options: { color: P.slate } },
    ],
    files: [{ name: "answers.sql", deliverable: true }, { name: "../datasets/foodco.db" }],
    callout: [{ text: "Top customers —  ", options: { color: P.white } }, { text: "and the 63 who signed up but never ordered.", options: { bold: true, color: P.gold } }],
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "Four ways to combine two tables", "The core idea");
      const joins = [["INNER", "only rows that match in both"], ["LEFT", "all of the left + matches"], ["RIGHT", "all of the right + matches"], ["FULL", "everything from both"]];
      const cw = 2.85, gap = 0.4, startX = (PAGE.w - (4 * cw + 3 * gap)) / 2;
      joins.forEach((j, i) => {
        const x = startX + i * (cw + gap);
        L.card(s, { x, y: 2.0, w: cw, h: 3.5, fill: P.cloud, line: P.line, shadow: true });
        venn(s, x + cw / 2, 2.35, j[0]);
        s.addText(j[0] + " JOIN", { x, y: 3.5, w: cw, h: 0.45, isTextBox: true, margin: 0, align: "center", fontFace: F.head, fontSize: 16, bold: true, color: P.teal });
        s.addText(j[1], { x: x + 0.2, y: 4.0, w: cw - 0.4, h: 1.2, isTextBox: true, margin: 0, align: "center", valign: "top", fontFace: F.body, fontSize: 12.5, color: P.slate, lineSpacingMultiple: 1.05 });
      });
      s.addText([{ text: "Shaded = what the query returns.  ", options: { bold: true, color: P.ink } }, { text: "LEFT JOIN + IS NULL is how you find who's missing.", options: { color: P.slate } }], { x: PAGE.m, y: 5.75, w: PAGE.w - 2 * PAGE.m, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14 });
      s.addNotes("Draw the Venns on the whiteboard as the query runs. INNER vs LEFT is the whole day; RIGHT/FULL are variations.");
    },
  ],
  demo: {
    title: "INNER keeps matches, LEFT keeps everyone", eyebrow: "Live demo · 10 min",
    code: ["-- INNER: only rows matching in both tables", "SELECT c.name, o.order_value FROM customers c", "JOIN orders o ON o.customer_id = c.customer_id;", "-- LEFT + IS NULL: who never ordered", "SELECT c.name FROM customers c", "LEFT JOIN orders o ON o.customer_id = c.customer_id", "WHERE o.order_id IS NULL;"],
    codeSize: 13.5,
    tagline: "INNER keeps matches. LEFT keeps everyone — then IS NULL reveals who's missing.",
    notes: "Run INNER, note the row count. Switch to LEFT, count jumps. Add IS NULL — the 63 no-order customers appear.",
  },
  task: {
    title: "Build the 360° view", eyebrow: "Hands-on · 2 hours",
    steps: [
      ["INNER JOIN 3 tables", "orders + customers + restaurants: name, restaurant, cuisine, value."],
      ["Find who never ordered", "LEFT JOIN customers→orders, WHERE order_id IS NULL (there are 63)."],
      ["Busiest rider per city", "Join delivery_partners."],
      ["Fraud + names", "Join orders→payments; list flagged orders with the customer's name."],
    ],
    doneWhen: [{ text: "All four queries run, and you can explain how INNER vs LEFT changed your row counts.", options: { fontSize: 14, color: P.ink } }],
  },
  folder: {
    title: "What's in Day_08_SQL_Joins/",
    tree: [["Day_08_SQL_Joins/", ""], ["├── instructions.md", "read this"], ["├── answers.sql", "write joins here"], ["└── ../datasets/foodco.db", "the database"]],
  },
  submit: { branch: "day08-yourname", folder: "Day_08_SQL_Joins", commit: "Day 8: joins — 360 order view" },
  recap: {
    title: "You can combine tables — and find what's missing",
    chips: ["INNER vs LEFT / RIGHT / FULL", "IS NULL finds orphans", "multi-table reports"],
    tomorrow: "Day 9 — window functions: ranking, running totals & churn gaps",
  },
});

/* ---- DAY 9 ---- */
DAYS.push({
  n: 9, nn: "09", dir: "Day_09_Window_Functions", module: "Module 3 of 3",
  title: "Window Functions", sub: "Let a row see its neighbours: ranking, running totals, churn gaps",
  tags: ["RANK", "ROW_NUMBER", "LAG", "Running total"],
  scenario: {
    title: "Is retention really dropping?", eyebrow: "The business scenario",
    scenario: [
      { text: "Leadership is alarmed: retention seems to have dropped in Q3.", options: { bold: true, color: P.ink } },
      { text: " They want the #1 restaurant per city, a running monthly revenue total, and how long each customer waits between orders — to spot who's slipping toward churn.", options: { color: P.slate } },
    ],
    files: [{ name: "answers.sql", deliverable: true }, { name: "../datasets/foodco.db" }],
    callout: [{ text: "Prove the Q3 retention dip  ", options: { color: P.white } }, { text: "in the numbers.", options: { bold: true, color: P.gold } }],
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "A row can see its neighbours", "The core idea");
      L.card(s, { x: PAGE.m, y: 2.0, w: 5.8, h: 3.4, fill: P.cloud, line: P.line });
      s.addText("PARTITION BY city  →  counter restarts", { x: PAGE.m + 0.3, y: 2.2, w: 5.2, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 14, bold: true, color: P.teal, align: "left" });
      s.addText([{ text: "city      row_number\n", options: { bold: true, color: P.slate, breakLine: true } }, { text: "Mumbai       1\nMumbai       2\nPune         1   ← restarts\nPune         2", options: { color: P.ink } }], { x: PAGE.m + 0.35, y: 2.7, w: 5.2, h: 2.5, isTextBox: true, margin: 0, valign: "top", fontFace: "Consolas", fontSize: 13, lineSpacingMultiple: 1.25, align: "left" });
      L.card(s, { x: 6.9, y: 2.0, w: 5.8, h: 3.4, fill: P.cloud, line: P.line });
      s.addText("LAG()  →  pulls the previous row in", { x: 7.2, y: 2.2, w: 5.2, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 14, bold: true, color: P.coral, align: "left" });
      s.addText([{ text: "order date   prev (LAG)\n", options: { bold: true, color: P.slate, breakLine: true } }, { text: "Sep 02        —\nSep 20     Sep 02\nOct 15     Sep 20   ← gap 25d", options: { color: P.ink } }], { x: 7.25, y: 2.7, w: 5.2, h: 2.5, isTextBox: true, margin: 0, valign: "top", fontFace: "Consolas", fontSize: 13, lineSpacingMultiple: 1.25, align: "left" });
      s.addText([{ text: "No self-join needed.  ", options: { bold: true, color: P.ink } }, { text: "The window travels with each row.", options: { color: P.slate } }], { x: PAGE.m, y: 5.6, w: PAGE.w - 2 * PAGE.m, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14 });
      s.addNotes("The mental model: an ordinary aggregate collapses rows; a window keeps every row but lets it peek at its group/neighbours.");
    },
  ],
  demo: {
    title: "Rank per city, peek at the previous row", eyebrow: "Live demo · 10 min",
    code: ["-- #1 per city: counter restarts each partition", "ROW_NUMBER() OVER (PARTITION BY city", "                   ORDER BY revenue DESC)", "-- put this customer's previous order on the row", "LAG(order_datetime) OVER (PARTITION BY customer_id", "                          ORDER BY order_datetime)"],
    codeSize: 13.5,
    tagline: "PARTITION BY = restart per group. LAG = peek at the previous row.",
    notes: "Show the counter restarting per city live. Then LAG to put the previous value beside the current — 'neighbours without a self-join'.",
  },
  task: {
    title: "Measure the churn signal", eyebrow: "Hands-on · 2 hours",
    steps: [
      ["Top restaurant per city", "RANK()/ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue DESC)."],
      ["Running monthly revenue", "SUM() OVER (ORDER BY month)."],
      ["Days since last order", "LAG(order_datetime) per customer."],
      ["Flag the slippers", "Customers whose gap jumped in Jul–Sep; confirm the Q3 dip."],
    ],
    doneWhen: [{ text: "Each window query runs, and your numbers show the Q3 retention drop.", options: { fontSize: 14, color: P.ink } }],
  },
  folder: {
    title: "What's in Day_09_Window_Functions/",
    tree: [["Day_09_Window_Functions/", ""], ["├── instructions.md", "read this"], ["├── answers.sql", "write windows here"], ["└── ../datasets/foodco.db", "the database"]],
  },
  submit: { branch: "day09-yourname", folder: "Day_09_Window_Functions", commit: "Day 9: window functions + churn gaps" },
  recap: {
    title: "You can rank, run totals, and measure gaps",
    chips: ["PARTITION BY & RANK", "running totals", "LAG for churn gaps"],
    tomorrow: "Day 10 — capstone: CTEs, a VIEW, and the exec report into BI",
  },
});

/* ---- DAY 10 ---- */
DAYS.push({
  n: 10, nn: "10", dir: "Day_10_CTE_Reporting_Capstone", module: "Module 3 of 3",
  title: "CTEs & the Executive Report", sub: "Capstone: one clean reporting layer for Power BI / Tableau",
  tags: ["CTE (WITH)", "Subqueries", "VIEW", "BI"],
  scenario: {
    title: "The capstone: one reporting layer", eyebrow: "The business scenario",
    scenario: [
      { text: "The exec team wants ONE reporting layer combining everything", options: { bold: true, color: P.ink } },
      { text: " — a fraud watchlist, a monthly retention/cohort view, and top-5 products by revenue — clean enough to plug straight into Power BI or Tableau.", options: { color: P.slate } },
    ],
    files: [{ name: "answers.sql", deliverable: true }, { name: "../datasets/foodco.db" }],
    callout: [{ text: "Everything you've learned  ", options: { color: P.white } }, { text: "— into one query your BI tool points at.", options: { bold: true, color: P.gold } }],
    notes: "This is the victory lap — it reuses fraud (payments), retention (windows) and joins from the whole week.",
  },
  concepts: [
    (pres) => {
      const s = K.concept(pres, "Nested mess → named steps", "The core idea");
      L.card(s, { x: PAGE.m, y: 1.95, w: 5.6, h: 3.4, fill: P.coralLt, line: P.coral });
      s.addText("Nested subquery — unreadable", { x: PAGE.m + 0.3, y: 2.12, w: 5.0, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 14, bold: true, color: P.coral, align: "left" });
      s.addText("SELECT * FROM (\n  SELECT ... FROM (\n    SELECT ... FROM payments\n    WHERE ...\n  ) x JOIN ...\n) y WHERE ...", { x: PAGE.m + 0.35, y: 2.6, w: 5.1, h: 2.6, isTextBox: true, margin: 0, valign: "top", fontFace: "Consolas", fontSize: 12.5, color: P.ink, lineSpacingMultiple: 1.2, align: "left" });
      K.arrow(s, 6.35, 7.15, 3.65, null, P.slate);
      L.card(s, { x: 7.3, y: 1.95, w: 5.4, h: 3.4, fill: P.tealLt, line: P.teal });
      s.addText("WITH — named, readable steps", { x: 7.6, y: 2.12, w: 4.8, h: 0.4, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 14, bold: true, color: P.teal, align: "left" });
      s.addText("WITH fraud AS ( ... ),\n     cohort AS ( ... )\nSELECT *\nFROM fraud\nJOIN cohort USING (month);", { x: 7.65, y: 2.6, w: 4.9, h: 2.6, isTextBox: true, margin: 0, valign: "top", fontFace: "Consolas", fontSize: 12.5, color: P.ink, lineSpacingMultiple: 1.2, align: "left" });
      s.addText([{ text: "Then wrap it in a VIEW  ", options: { bold: true, color: P.ink } }, { text: "— your dashboard points at one name: ", options: { color: P.slate } }, { text: "exec_report", options: { fontFace: "Consolas", color: P.navy, bold: true } }, { text: ".", options: { color: P.slate } }], { x: PAGE.m, y: 5.55, w: PAGE.w - 2 * PAGE.m, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 14 });
      s.addNotes("A CTE just names a step so humans can read it. A VIEW saves the whole report under one name that BI tools select from.");
    },
  ],
  demo: {
    title: "Refactor to CTEs, then save a VIEW", eyebrow: "Live demo · 10 min",
    code: ["WITH fraud AS (", "    SELECT o.order_id, c.name, p.amount - o.order_value AS gap", "    FROM payments p", "    JOIN orders o    ON o.order_id = p.order_id", "    JOIN customers c ON c.customer_id = o.customer_id", "    WHERE p.is_flagged = 1 )", "SELECT * FROM fraud WHERE gap <> 0;"],
    codeSize: 12.5,
    tagline: "A CTE names a step. A VIEW saves the whole report. BI just points at it.",
    notes: "Take a 3-level nested query and refactor live into stacked CTEs. Then CREATE VIEW exec_report AS … and SELECT * FROM it.",
  },
  task: {
    title: "Build the exec reporting layer", eyebrow: "Hands-on · 2 hours",
    steps: [
      ["Refactor to CTEs", "Turn a messy nested subquery into readable WITH blocks."],
      ["Fraud report", "payments + orders + customers, incl. amount mismatches."],
      ["Retention + top products", "Monthly cohort proving the Q3 drop; top-5 items by revenue."],
      ["Save a VIEW (+ bonus BI)", "CREATE VIEW exec_report; bonus: connect Power BI / Tableau."],
    ],
    doneWhen: [{ text: "A readable CTE report + an exec_report VIEW that a BI tool could chart directly.", options: { fontSize: 14, color: P.ink } }],
  },
  folder: {
    title: "What's in Day_10_CTE_Reporting_Capstone/",
    tree: [["Day_10_CTE_Reporting_Capstone/", ""], ["├── instructions.md", "read this"], ["├── answers.sql", "build the report here"], ["└── ../datasets/foodco.db", "the database"]],
  },
  submit: { branch: "day10-yourname", folder: "Day_10_CTE_Reporting_Capstone", commit: "Day 10: CTE exec report + VIEW" },
  recap: {
    title: "You built an exec reporting layer end to end",
    chips: ["CTEs over nested subqueries", "a reusable VIEW", "BI-ready output"],
    tomorrow: "Raw files → clean data → SQL insight. That's the whole pipeline. 🎉",
    tomorrowLabel: "YOU DID IT",
    notes: "Close the whole arc: Day 1 they couldn't name a data type; today they shipped a reporting layer. Celebrate it.",
  },
});

/* ================= BUILD ================= */
function buildDay(d) {
  const pres = L.newDeck();
  buildTitle(pres, d);
  K.timelineSlide(pres, { steps: d.rhythm || RHYTHM, note: d.rhythmNote || RNOTE });
  K.scenarioSlide(pres, d.scenario);
  d.concepts.forEach((fn) => fn(pres));
  K.demoSlide(pres, d.demo);
  K.taskSlide(pres, d.task);
  K.folderSlide(pres, d.folder);
  K.submitSlide(pres, d.submit);
  K.recapSlide(pres, d.recap);
  const out = path.join(OUTDIR, d.dir, `Day_${d.nn}_deck.pptx`);
  return pres.writeFile({ fileName: out }).then(() => console.log("WROTE", out));
}

function buildDay0() {
  const pres = L.newDeck();
  L.titleSlide(pres, { kicker: "FoodCo Data Analytics Bootcamp · Day 0", title: "Welcome — let's set up GitHub", subtitle: "Fork → pull → Pull Request: how you'll get work and hand it in", tags: ["Fork", "Clone", "Pull", "Pull Request"], footer: "The first 40 minutes of Day 1  ·  do this with me" });
  // statement slide
  const s2 = L.contentSlide(pres, "The whole job, in one line", "Why we start here");
  s2.addText([
    { text: "You receive work by ", options: { color: P.ink } },
    { text: "PULLING", options: { bold: true, color: P.teal } },
    { text: ".\nYou hand it in with a ", options: { color: P.ink } },
    { text: "PULL REQUEST", options: { bold: true, color: P.coral } },
    { text: ".", options: { color: P.ink } },
  ], { x: PAGE.m, y: 2.3, w: PAGE.w - 2 * PAGE.m, h: 2.0, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: 36, bold: true, lineSpacingMultiple: 1.15 });
  s2.addText("That's the entire GitHub workflow. Everything else is detail.", { x: PAGE.m, y: 4.6, w: PAGE.w - 2 * PAGE.m, h: 0.5, isTextBox: true, margin: 0, align: "center", fontFace: F.body, fontSize: 16, italic: true, color: P.slate });
  s2.addNotes("Say this line out loud twice. If they leave with only this, the rest of the bootcamp's Git runs itself.");
  gitModelSlide(pres);
  // setup steps
  K.taskSlide(pres, {
    title: "Set up — do it with me", eyebrow: "Together · ~25 min",
    steps: [
      ["Install & sign in", "Git (git-scm.com) + a GitHub account. Auth with GitHub CLI or GitHub Desktop."],
      ["Fork the repo", "Click Fork on the class repo — now you have your own copy."],
      ["Clone your fork", "git clone <your fork URL>"],
      ["Add the upstream", "git remote add upstream <class repo URL>"],
    ],
    doneWhen: [{ text: "git remote -v", options: { fontFace: "Consolas", fontSize: 13, color: P.ink } }, { text: " shows ", options: { fontSize: 14, color: P.ink } }, { text: "origin", options: { fontFace: "Consolas", fontSize: 13, color: P.teal, bold: true } }, { text: " (yours) and ", options: { fontSize: 14, color: P.ink } }, { text: "upstream", options: { fontFace: "Consolas", fontSize: 13, color: P.navy, bold: true } }, { text: " (trainer's).", options: { fontSize: 14, color: P.ink } }],
    notes: "Decide ONE auth method before class and demo only that. Pushing to upstream (403) = they cloned my repo, not their fork.",
  });
  K.submitSlide(pres, { title: "Your first Pull Request", eyebrow: "Together · ~10 min", branch: "add-yourname", folder: "roster", commit: "Add <name> to roster", notes: "Merge each roster PR live — the first dopamine hit of the course. Use roster/<firstname-lastname>.md so PRs don't collide." });
  K.recapSlide(pres, {
    title: "You can fork, clone, pull & PR",
    chips: ["fork = your safe copy", "pull = get the new work", "Pull Request = hand it in"],
    tomorrow: "NOW → Day 1: Data Foundations", tomorrowLabel: "NEXT",
    notes: "Roll straight into the Day 1 demo. Stragglers finish their roster PR during the hands-on block.",
  });
  const out = path.join(OUTDIR, "Day_00_Git_Onboarding", "Day_00_deck.pptx");
  return pres.writeFile({ fileName: out }).then(() => console.log("WROTE", out));
}

(async () => {
  const only = process.argv[3]; // optional single-day filter, e.g. `node build_all.js <path> 2`
  if (!only) await buildDay0();
  for (const d of DAYS) {
    if (only && String(d.n) !== String(only)) continue;
    await buildDay(d);
  }
  console.log("ALL DONE");
})();
