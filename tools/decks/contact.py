import os, re
from PIL import Image, ImageDraw, ImageFont

QA = os.path.dirname(os.path.abspath(__file__))
decks = [d for d in sorted(os.listdir(QA)) if os.path.isdir(os.path.join(QA, d)) and d.startswith("Day_")]

def slide_num(fn):
    m = re.search(r"(\d+)", fn)
    return int(m.group(1)) if m else 0

THUMB_W = 480
COLS = 3
PAD = 14
LABEL_H = 20

for d in decks:
    folder = os.path.join(QA, d)
    pngs = sorted([f for f in os.listdir(folder) if f.lower().endswith(".png")], key=slide_num)
    if not pngs:
        continue
    thumbs = []
    for f in pngs:
        im = Image.open(os.path.join(folder, f)).convert("RGB")
        r = THUMB_W / im.width
        thumbs.append((slide_num(f), im.resize((THUMB_W, int(im.height * r)))))
    th = thumbs[0][1].height
    rows = (len(thumbs) + COLS - 1) // COLS
    cell_h = th + LABEL_H
    W = COLS * THUMB_W + (COLS + 1) * PAD
    H = rows * cell_h + (rows + 1) * PAD
    sheet = Image.new("RGB", (W, H), (28, 30, 46))
    draw = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("arialbd.ttf", 15)
    except Exception:
        font = ImageFont.load_default()
    for i, (num, im) in enumerate(thumbs):
        row, col = divmod(i, COLS)
        x = PAD + col * (THUMB_W + PAD)
        y = PAD + row * (cell_h + PAD)
        draw.text((x + 2, y), f"Slide {num}", fill=(244, 185, 66), font=font)
        sheet.paste(im, (x, y + LABEL_H))
    out = os.path.join(QA, f"contact_{d}.png")
    sheet.save(out)
    print("WROTE", out, f"({len(thumbs)} slides)")
