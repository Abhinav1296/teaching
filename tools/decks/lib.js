// Shared deck library for the FoodCo bootcamp decks.
// Clean, neutral, demo-driven. No brand. Warm "food-delivery" accents.
const pptxgen = require("pptxgenjs");

const P = {
  navy:   "1F2A5A", // dark slide background
  navy2:  "151E42", // deeper navy
  coral:  "F0544F", // primary warm accent (FoodCo)
  orange: "FF8C42", // secondary warm
  teal:   "138A72", // "action / go" (git, tasks)
  tealLt: "E2F3EF",
  gold:   "F4B942", // highlight
  ink:    "1B1B2F", // body text on light
  slate:  "5B6472", // muted text
  cloud:  "F4F6F9", // light card background
  cloud2: "ECEFF4",
  line:   "DCE2EA", // hairline
  white:  "FFFFFF",
  coralLt:"FDE8E7",
  goldLt: "FDF3DA",
};

const F = { head: "Calibri", body: "Calibri" };

const PAGE = { w: 13.33, h: 7.5, m: 0.62 };

function newDeck(meta) {
  const pres = new pptxgen();
  pres.defineLayout({ name: "W", width: PAGE.w, height: PAGE.h });
  pres.layout = "W";
  pres.author = "FoodCo Bootcamp";
  pres.theme = { headFontFace: F.head, bodyFontFace: F.body };
  return pres;
}

const shadow = () => ({ type: "outer", color: "1B1B2F", opacity: 0.16, blur: 7, offset: 3, angle: 90 });

function fullBg(slide, color) {
  slide.background = { color };
}

// big decorative circle bleeding off the top-right corner (the motif)
function deco(slide, color, opacity) {
  slide.addShape("ellipse", { x: 10.4, y: -2.3, w: 5.2, h: 5.2, fill: { color, transparency: opacity == null ? 0 : opacity }, line: { type: "none" } });
  slide.addShape("ellipse", { x: 12.5, y: 2.1, w: 2.0, h: 2.0, fill: { color, transparency: 55 }, line: { type: "none" } });
}

function kicker(slide, text, color) {
  slide.addText(text.toUpperCase(), {
    x: PAGE.m, y: 0.5, w: 9, h: 0.4, isTextBox: true, margin: 0,
    fontFace: F.head, fontSize: 12, bold: true, color, charSpacing: 3, align: "left",
  });
}

// DARK title slide
function titleSlide(pres, o) {
  const s = pres.addSlide();
  fullBg(s, P.navy);
  deco(s, P.coral, 0);
  s.addShape("ellipse", { x: 11.0, y: 4.6, w: 1.1, h: 1.1, fill: { color: P.gold }, line: { type: "none" } });
  kicker(s, o.kicker || "FoodCo Data Analytics Bootcamp", P.gold);
  s.addText(o.title, { x: PAGE.m, y: 2.35, w: 10.4, h: 1.5, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 46, bold: true, color: P.white, align: "left" });
  if (o.subtitle) s.addText(o.subtitle, { x: PAGE.m, y: 3.75, w: 10.2, h: 0.9, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 24, color: P.coral, italic: true, align: "left" });
  if (o.tags) {
    let x = PAGE.m;
    o.tags.forEach((t) => {
      const w = 0.42 + t.length * 0.105;
      s.addText(t, { x, y: 5.55, w, h: 0.46, isTextBox: true, margin: 0, shape: "roundRect", rectRadius: 0.1, fill: { color: P.white, transparency: 88 }, line: { color: P.white, width: 0.75, transparency: 50 }, align: "center", valign: "middle", fontFace: F.body, fontSize: 12, color: P.white });
      x += w + 0.2;
    });
  }
  if (o.footer) s.addText(o.footer, { x: PAGE.m, y: 6.65, w: 11, h: 0.4, isTextBox: true, margin: 0, fontFace: F.body, fontSize: 12, color: "AEB6C7", align: "left" });
  return s;
}

// DARK section divider
function sectionSlide(pres, o) {
  const s = pres.addSlide();
  fullBg(s, P.navy2);
  s.addText(o.num || "", { x: PAGE.m, y: 1.7, w: 4, h: 2.2, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 150, bold: true, color: P.coral, align: "left" });
  s.addText(o.title, { x: PAGE.m, y: 4.05, w: 11.8, h: 1.3, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 38, bold: true, color: P.white, align: "left" });
  if (o.subtitle) s.addText(o.subtitle, { x: PAGE.m, y: 5.25, w: 11.8, h: 0.8, isTextBox: true, margin: 0, fontFace: F.body, fontSize: 18, color: P.gold, align: "left" });
  return s;
}

// LIGHT content slide with a standard top title; returns slide + content top y
function contentSlide(pres, title, eyebrow) {
  const s = pres.addSlide();
  fullBg(s, P.white);
  if (eyebrow) s.addText(eyebrow.toUpperCase(), { x: PAGE.m, y: 0.46, w: 12, h: 0.32, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 11.5, bold: true, color: P.coral, charSpacing: 2.5 });
  s.addText(title, { x: PAGE.m, y: eyebrow ? 0.78 : 0.55, w: 12.1, h: 0.9, isTextBox: true, margin: 0, fontFace: F.head, fontSize: 30, bold: true, color: P.ink, align: "left" });
  return s;
}

// a labelled card (rounded rect) — optionally with a title + body
function card(s, o) {
  s.addShape("roundRect", { x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.08, fill: { color: o.fill || P.cloud }, line: o.line ? { color: o.line, width: 1 } : { type: "none" }, shadow: o.shadow ? shadow() : undefined });
}

// small round "badge" with a number/letter
function badge(s, x, y, d, text, fill, color) {
  s.addShape("ellipse", { x, y, w: d, h: d, fill: { color: fill }, line: { type: "none" } });
  s.addText(text, { x, y, w: d, h: d, isTextBox: true, margin: 0, align: "center", valign: "middle", fontFace: F.head, fontSize: d * 22, bold: true, color });
}

// code / command block on a dark card
function codeBox(s, o) {
  s.addShape("roundRect", { x: o.x, y: o.y, w: o.w, h: o.h, rectRadius: 0.06, fill: { color: P.navy2 }, line: { type: "none" }, shadow: shadow() });
  const runs = o.lines.map((ln, i) => ({ text: ln + (i < o.lines.length - 1 ? "\n" : ""), options: { breakLine: true, color: ln.trim().startsWith("#") ? "7F8AB5" : (o.accent || "7FE3CF"), fontFace: "Consolas" } }));
  s.addText(runs, { x: o.x + 0.22, y: o.y + 0.14, w: o.w - 0.44, h: o.h - 0.28, isTextBox: true, margin: 0, valign: "top", fontSize: o.fs || 13, align: "left", lineSpacingMultiple: 1.15 });
}

module.exports = { pptxgen, P, F, PAGE, newDeck, shadow, fullBg, deco, kicker, titleSlide, sectionSlide, contentSlide, card, badge, codeBox };
