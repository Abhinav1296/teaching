"""
FoodCo Bootcamp — master dataset generator
=============================================
Generates ONE coherent, referentially-consistent dataset universe for a fictional
Indian food-delivery + quick-commerce startup, "FoodCo", and lays the files into
each day's folder so the datasets build on each other across all 10 days.

Baked-in analytical signals (so student tasks have REAL answers):
  * A Q3 (Jul-Sep 2025) retention dip  -> Day 9 / Day 10 cohort analysis
  * Fraud patterns on ~2-3% of payments -> Day 8 / Day 10 fraud detection
  * Late-delivery hotspots (city + peak hour + unreliable riders) -> Day 5 / 6 / 9

Run from anywhere:  python datasets/generate_data.py
Re-runnable and deterministic (fixed seed). Safe to delete generated files and rerun.

Dependencies: pandas (for the xlsx-friendly outputs) + stdlib (csv, json, sqlite3).
"""

import csv
import json
import os
import random
import sqlite3
import datetime as dt

random.seed(42)

HERE = os.path.dirname(os.path.abspath(__file__))        # .../datasets
ROOT = os.path.dirname(HERE)                             # project root

# ---------------------------------------------------------------------------
# Day-folder names (kept in one place so data placement stays consistent)
# ---------------------------------------------------------------------------
DAYS = {
    "D01": "Day_01_Data_Foundations",
    "D02": "Day_02_Analytics_Types_and_Ethics",
    "D03": "Day_03_Data_Cleaning_PowerQuery",
    "D04": "Day_04_Lookups",
    "D05": "Day_05_Pivot_Reporting",
    "D06": "Day_06_Macros_Automation",
    "D07": "Day_07_SQL_Basics",
    "D08": "Day_08_SQL_Joins",
    "D09": "Day_09_Window_Functions",
    "D10": "Day_10_CTE_Reporting_Capstone",
}


def p(*parts):
    return os.path.join(ROOT, *parts)


def ensure(*dirs):
    for d in dirs:
        os.makedirs(d, exist_ok=True)


def write_csv(path, fieldnames, rows):
    ensure(os.path.dirname(path))
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        for r in rows:
            w.writerow(r)


# ---------------------------------------------------------------------------
# Reference pools
# ---------------------------------------------------------------------------
CITIES = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai"]
# city traffic factor -> how much extra delivery delay the city tends to add
CITY_TRAFFIC = {"Bengaluru": 1.2, "Mumbai": 1.35, "Delhi": 1.3,
                "Hyderabad": 1.0, "Pune": 1.05, "Chennai": 1.1}

CUISINES = ["North Indian", "South Indian", "Chinese", "Italian",
            "Biryani", "Desserts", "Healthy", "Street Food"]

PAYMENTS = ["UPI", "Credit Card", "Debit Card", "Wallet", "Cash on Delivery"]
VEHICLES = ["Bike", "Scooter", "Bicycle", "EV Scooter"]

FIRST = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Krishna",
         "Ishaan", "Rohan", "Ananya", "Diya", "Saanvi", "Aadhya", "Myra", "Anika",
         "Navya", "Kiara", "Riya", "Priya", "Neha", "Pooja", "Kavya", "Meera",
         "Rahul", "Karan", "Siddharth", "Varun", "Nikhil", "Ayaan", "Fatima",
         "Zara", "Aisha", "Tara", "Isha", "Nisha", "Deepa", "Sneha", "Manish", "Gaurav"]
LAST = ["Sharma", "Verma", "Patel", "Reddy", "Nair", "Iyer", "Gupta", "Mehta",
        "Shah", "Rao", "Menon", "Pillai", "Kulkarni", "Joshi", "Desai", "Khan",
        "Chatterjee", "Banerjee", "Das", "Bose", "Singh", "Kaur", "Ahuja", "Malhotra"]

REST_PREFIX = ["Spice", "Royal", "Urban", "The Great", "Little", "Golden", "Masala",
               "Tandoori", "Coastal", "Street", "Grand", "Namma", "Bombay", "Delhi",
               "Green", "Hungry", "Curry", "Flavours of", "House of", "Desi"]
REST_SUFFIX = {
    "North Indian": ["Darbar", "Dhaba", "Rasoi", "Tandoor", "Kitchen"],
    "South Indian": ["Tiffins", "Udupi", "Sagar", "Meals", "Mess"],
    "Chinese": ["Wok", "Dragon", "Noodle Bar", "Garden", "Express"],
    "Italian": ["Pizzeria", "Trattoria", "Pasta Co.", "Forno", "Cucina"],
    "Biryani": ["Biryani House", "Handi", "Dum", "Nawab", "Zaika"],
    "Desserts": ["Sweets", "Bakes", "Scoops", "Patisserie", "Cakery"],
    "Healthy": ["Greens", "Bowl Co.", "Fit Kitchen", "Salad Bar", "Nourish"],
    "Street Food": ["Chaat", "Corner", "Junction", "Tapri", "Bites"],
}

MENU = {
    "North Indian": [("Paneer Butter Masala", 280), ("Dal Makhani", 220),
                     ("Butter Naan", 60), ("Chicken Curry", 320), ("Jeera Rice", 160)],
    "South Indian": [("Masala Dosa", 120), ("Idli Vada", 90), ("Filter Coffee", 50),
                     ("Ghee Pongal", 140), ("Meals Thali", 180)],
    "Chinese": [("Veg Hakka Noodles", 190), ("Chicken Fried Rice", 230),
                ("Gobi Manchurian", 180), ("Spring Rolls", 150), ("Chilli Paneer", 240)],
    "Italian": [("Margherita Pizza", 350), ("Pepperoni Pizza", 450),
                ("Alfredo Pasta", 320), ("Garlic Bread", 150), ("Tiramisu", 220)],
    "Biryani": [("Chicken Biryani", 300), ("Mutton Biryani", 420),
                ("Veg Biryani", 220), ("Egg Biryani", 240), ("Raita", 50)],
    "Desserts": [("Gulab Jamun", 90), ("Chocolate Brownie", 160),
                 ("Ice Cream Tub", 250), ("Rasmalai", 120), ("Red Velvet Slice", 180)],
    "Healthy": [("Quinoa Bowl", 320), ("Greek Salad", 260), ("Grilled Chicken Bowl", 360),
                ("Smoothie", 180), ("Oats Breakfast", 200)],
    "Street Food": [("Pani Puri", 80), ("Vada Pav", 50), ("Pav Bhaji", 140),
                    ("Samosa Chaat", 120), ("Masala Chai", 30)],
}
CATEGORY = {"Pizza": "Main", "Biryani": "Main"}  # not heavily used; category derived below


def category_for(name):
    low = name.lower()
    if any(w in low for w in ["coffee", "chai", "smoothie", "coffee"]):
        return "Beverage"
    if any(w in low for w in ["jamun", "brownie", "ice cream", "rasmalai", "velvet",
                              "tiramisu", "sweets"]):
        return "Dessert"
    if any(w in low for w in ["naan", "bread", "raita", "roll", "samosa", "puri",
                              "vada pav", "idli"]):
        return "Starter"
    return "Main"


# ---------------------------------------------------------------------------
# 1. Customers
# ---------------------------------------------------------------------------
N_CUSTOMERS = 500
customers = []
used_emails = set()
for i in range(1, N_CUSTOMERS + 1):
    fn = random.choice(FIRST)
    ln = random.choice(LAST)
    name = f"{fn} {ln}"
    email = f"{fn.lower()}.{ln.lower()}{random.randint(1, 999)}@example.com"
    while email in used_emails:
        email = f"{fn.lower()}.{ln.lower()}{random.randint(1, 9999)}@example.com"
    used_emails.add(email)
    phone = "+91-" + str(random.randint(70000, 99999)) + str(random.randint(10000, 99999))
    # signups spread Jun 2024 -> Sep 2025, slightly fewer in Q3-2025
    start = dt.date(2024, 6, 1)
    span_days = (dt.date(2025, 9, 20) - start).days
    sd = start + dt.timedelta(days=random.randint(0, span_days))
    # thin out Q3-2025 acquisition a little (retention story)
    if sd >= dt.date(2025, 7, 1) and random.random() < 0.35:
        sd = sd - dt.timedelta(days=random.randint(120, 300))
    city = random.choice(CITIES)
    loyalty = round(random.uniform(0.2, 0.95), 2)
    dob = dt.date(random.randint(1975, 2004), random.randint(1, 12), random.randint(1, 28))
    customers.append({
        "customer_id": f"C{ i:04d}",
        "customer_name": name,
        "email": email,
        "phone": phone,
        "date_of_birth": dob.isoformat(),
        "signup_date": sd.isoformat(),
        "city": city,
        "loyalty": loyalty,  # internal field, dropped from public customer file
    })

cust_by_id = {c["customer_id"]: c for c in customers}

# ---------------------------------------------------------------------------
# 2. Restaurants
# ---------------------------------------------------------------------------
N_REST = 60
restaurants = []
used_names = set()
for i in range(1, N_REST + 1):
    cuisine = random.choice(CUISINES)
    name = f"{random.choice(REST_PREFIX)} {random.choice(REST_SUFFIX[cuisine])}"
    tries = 0
    while name in used_names and tries < 10:
        name = f"{random.choice(REST_PREFIX)} {random.choice(REST_SUFFIX[cuisine])}"
        tries += 1
    used_names.add(name)
    restaurants.append({
        "restaurant_id": f"R{i:03d}",
        "restaurant_name": name,
        "city": random.choice(CITIES),
        "cuisine": cuisine,
        "avg_rating": round(random.uniform(3.2, 4.9), 1),
        "commission_pct": random.choice([15, 18, 20, 22, 25]),
        "is_active": random.random() < 0.9,
    })
rest_by_id = {r["restaurant_id"]: r for r in restaurants}
rest_by_city = {}
for r in restaurants:
    rest_by_city.setdefault(r["city"], []).append(r)

# ---------------------------------------------------------------------------
# 3. Delivery partners (riders)
# ---------------------------------------------------------------------------
N_PARTNERS = 120
partners = []
for i in range(1, N_PARTNERS + 1):
    city = random.choice(CITIES)
    reliability = random.random()  # 0 = always late, 1 = always on time
    jd = dt.date(2024, 1, 1) + dt.timedelta(days=random.randint(0, 600))
    partners.append({
        "partner_id": f"P{i:03d}",
        "partner_name": f"{random.choice(FIRST)} {random.choice(LAST)}",
        "city": city,
        "vehicle_type": random.choice(VEHICLES),
        "rating": round(2.8 + reliability * 2.1, 1),  # 2.8 - 4.9
        "joined_date": jd.isoformat(),
        "_reliability": reliability,
    })
part_by_id = {p_["partner_id"]: p_ for p_ in partners}
part_by_city = {}
for pt in partners:
    part_by_city.setdefault(pt["city"], []).append(pt)

# ---------------------------------------------------------------------------
# 4. Menu items
# ---------------------------------------------------------------------------
menu_items = []
item_counter = 1
rest_menu = {}  # restaurant_id -> list of item dicts
for r in restaurants:
    items = MENU[r["cuisine"]]
    rest_menu[r["restaurant_id"]] = []
    for (iname, base_price) in items:
        price = int(base_price * random.uniform(0.9, 1.25))
        item = {
            "item_id": f"M{item_counter:05d}",
            "restaurant_id": r["restaurant_id"],
            "item_name": iname,
            "category": category_for(iname),
            "price": price,
        }
        menu_items.append(item)
        rest_menu[r["restaurant_id"]].append(item)
        item_counter += 1
item_by_id = {m["item_id"]: m for m in menu_items}

# ---------------------------------------------------------------------------
# 5. Orders + order_items + payments  (with retention / fraud / lateness signals)
# ---------------------------------------------------------------------------
MONTHS = [(2025, m) for m in range(1, 10)]  # Jan .. Sep 2025
# Retention factor by month: healthy Jan-Jun, visible dip in Q3 (Jul-Sep)
MONTH_FACTOR = {1: 0.90, 2: 0.88, 3: 0.87, 4: 0.86, 5: 0.85, 6: 0.84,
                7: 0.60, 8: 0.54, 9: 0.50}

PEAK_HOURS = [12, 13, 14, 19, 20, 21, 22]
OFF_HOURS = [9, 10, 11, 15, 16, 17, 18, 23]


def random_datetime(year, month):
    # pick a day in the month
    if month == 2:
        maxday = 28
    elif month in (4, 6, 9, 11):
        maxday = 30
    else:
        maxday = 31
    day = random.randint(1, maxday)
    hour = random.choice(PEAK_HOURS * 3 + OFF_HOURS)  # weight peaks
    minute = random.randint(0, 59)
    return dt.datetime(year, month, day, hour, minute)


orders = []
order_items = []
payments = []
order_counter = 1
oi_counter = 1
pay_counter = 1

# track orders-per-customer-per-day for a fraud (velocity) signal
daily_count = {}

for (yr, mo) in MONTHS:
    month_end = dt.date(yr, mo, 28)
    factor = MONTH_FACTOR[mo]
    for c in customers:
        if dt.date.fromisoformat(c["signup_date"]) > month_end:
            continue
        active_prob = c["loyalty"] * factor
        if random.random() > active_prob:
            continue
        n_orders = random.choices([1, 2, 3, 4], weights=[50, 30, 15, 5])[0]
        for _ in range(n_orders):
            odt = random_datetime(yr, mo)
            # restaurant: usually same city; ~3% cross-city (edge / fraud signal)
            cross_city = random.random() < 0.03
            if cross_city:
                other = [ct for ct in CITIES if ct != c["city"]]
                r_city = random.choice(other)
            else:
                r_city = c["city"]
            rlist = rest_by_city.get(r_city) or restaurants
            r = random.choice(rlist)
            plist = part_by_city.get(r_city) or partners
            pt = random.choice(plist)

            # order items
            menu = rest_menu[r["restaurant_id"]]
            k = random.randint(1, min(3, len(menu)))
            chosen = random.sample(menu, k)
            order_value = 0
            this_items = []
            for it in chosen:
                qty = random.choices([1, 2, 3], weights=[70, 22, 8])[0]
                line = it["price"] * qty
                order_value += line
                this_items.append((it, qty, line))

            # delivery timing. promised time is padded with a buffer; an order is
            # only LATE when the hotspot penalties (city traffic + unreliable rider
            # + peak hour) eat through that buffer. ~1/3 of orders end up late, and
            # lateness concentrates in high-traffic cities / bad riders / peak hours.
            promised = random.randint(25, 45)
            buffer = 24
            city_penalty = (CITY_TRAFFIC[r_city] - 1.0) * 35   # Hyd 0 .. Mumbai ~12
            rider_penalty = (1 - pt["_reliability"]) * 20       # 0 .. 20
            peak_penalty = 6 if odt.hour in PEAK_HOURS else 0
            noise = random.gauss(0, 5)
            delivered = int(round(promised - buffer + city_penalty + rider_penalty
                                  + peak_penalty + noise))
            delivered = max(12, delivered)

            # status
            status = random.choices(["Delivered", "Cancelled", "Refunded"],
                                    weights=[92, 6, 2])[0]

            # rating (only for delivered)
            if status == "Delivered":
                late_by = delivered - promised
                base = 5.0 - max(0, late_by) * 0.06 - random.uniform(0, 0.8)
                rating = int(max(1, min(5, round(base))))
            else:
                rating = ""
                delivered = ""  # not delivered

            pay_method = random.choice(PAYMENTS)
            oid = f"O{order_counter:06d}"

            # velocity tracking for fraud
            dkey = (c["customer_id"], odt.date().isoformat())
            daily_count[dkey] = daily_count.get(dkey, 0) + 1

            orders.append({
                "order_id": oid,
                "customer_id": c["customer_id"],
                "restaurant_id": r["restaurant_id"],
                "partner_id": pt["partner_id"],
                "order_datetime": odt.strftime("%Y-%m-%d %H:%M:%S"),
                "city": r_city,
                "promised_minutes": promised,
                "delivered_minutes": delivered,
                "order_value": order_value,
                "payment_method": pay_method,
                "status": status,
                "rating": rating,
                "_cross_city": cross_city,
                "_signup": c["signup_date"],
            })
            for (it, qty, line) in this_items:
                order_items.append({
                    "order_item_id": f"OI{oi_counter:06d}",
                    "order_id": oid,
                    "item_id": it["item_id"],
                    "item_name": it["item_name"],
                    "quantity": qty,
                    "unit_price": it["price"],
                    "line_amount": line,
                })
                oi_counter += 1
            order_counter += 1

# ---------------------------------------------------------------------------
# Payments + fraud flags (computed after orders so velocity is known)
# ---------------------------------------------------------------------------
for o in orders:
    c = cust_by_id[o["customer_id"]]
    signup = dt.date.fromisoformat(o["_signup"])
    odate = dt.datetime.strptime(o["order_datetime"], "%Y-%m-%d %H:%M:%S").date()
    days_since_signup = (odate - signup).days
    vel = daily_count[(o["customer_id"], odate.isoformat())]

    reasons = []
    if o["_cross_city"]:
        reasons.append("billing/delivery city mismatch")
    if days_since_signup <= 7 and o["order_value"] > 1500:
        reasons.append("new account high-value order")
    if vel >= 4:
        reasons.append("rapid repeat orders (velocity)")
    if o["payment_method"] == "Credit Card" and o["order_value"] > 2000 and random.random() < 0.2:
        reasons.append("high-value card, manual review")

    is_flagged = len(reasons) > 0 and random.random() < 0.6  # not every match flags
    pay_status = random.choices(["Success", "Failed", "Pending"], weights=[94, 4, 2])[0]
    if o["status"] == "Cancelled":
        pay_status = random.choice(["Failed", "Success"])

    amount = o["order_value"]
    # on a few flagged orders, introduce an amount mismatch (Day 10 can catch it via join)
    if is_flagged and random.random() < 0.3:
        amount = o["order_value"] + random.choice([250, 500, 999, -200])

    payments.append({
        "payment_id": f"PM{pay_counter:06d}",
        "order_id": o["order_id"],
        "amount": amount,
        "payment_method": o["payment_method"],
        "payment_status": pay_status,
        "is_flagged": 1 if is_flagged else 0,
        "fraud_reason": "; ".join(reasons) if is_flagged else "",
    })
    pay_counter += 1

# ---------------------------------------------------------------------------
# Public field sets (drop internal underscore fields)
# ---------------------------------------------------------------------------
CUST_FIELDS = ["customer_id", "customer_name", "email", "phone",
               "date_of_birth", "signup_date", "city"]
REST_FIELDS = ["restaurant_id", "restaurant_name", "city", "cuisine",
               "avg_rating", "commission_pct", "is_active"]
PART_FIELDS = ["partner_id", "partner_name", "city", "vehicle_type",
               "rating", "joined_date"]
MENU_FIELDS = ["item_id", "restaurant_id", "item_name", "category", "price"]
ORDER_FIELDS = ["order_id", "customer_id", "restaurant_id", "partner_id",
                "order_datetime", "city", "promised_minutes", "delivered_minutes",
                "order_value", "payment_method", "status", "rating"]
OI_FIELDS = ["order_item_id", "order_id", "item_id", "item_name",
             "quantity", "unit_price", "line_amount"]
PAY_FIELDS = ["payment_id", "order_id", "amount", "payment_method",
              "payment_status", "is_flagged", "fraud_reason"]


def clean(rows, fields):
    out = []
    for r in rows:
        out.append({k: r.get(k, "") for k in fields})
    return out


cust_pub = clean(customers, CUST_FIELDS)
rest_pub = clean(restaurants, REST_FIELDS)
part_pub = clean(partners, PART_FIELDS)
menu_pub = clean(menu_items, MENU_FIELDS)
orders_pub = clean(orders, ORDER_FIELDS)
oi_pub = clean(order_items, OI_FIELDS)
pay_pub = clean(payments, PAY_FIELDS)

# ---------------------------------------------------------------------------
# Write canonical CSVs to datasets/
# ---------------------------------------------------------------------------
DS = p("datasets")
ensure(DS)
write_csv(p("datasets", "customers.csv"), CUST_FIELDS, cust_pub)
write_csv(p("datasets", "restaurants.csv"), REST_FIELDS, rest_pub)
write_csv(p("datasets", "delivery_partners.csv"), PART_FIELDS, part_pub)
write_csv(p("datasets", "menu_items.csv"), MENU_FIELDS, menu_pub)
write_csv(p("datasets", "orders.csv"), ORDER_FIELDS, orders_pub)
write_csv(p("datasets", "order_items.csv"), OI_FIELDS, oi_pub)
write_csv(p("datasets", "payments.csv"), PAY_FIELDS, pay_pub)

# ---------------------------------------------------------------------------
# Build the SQLite database (zero-setup for the SQL module)
# ---------------------------------------------------------------------------
DBPATH = p("datasets", "foodco.db")
if os.path.exists(DBPATH):
    os.remove(DBPATH)
conn = sqlite3.connect(DBPATH)
cur = conn.cursor()
cur.executescript(
    """
    CREATE TABLE customers(
        customer_id TEXT PRIMARY KEY, customer_name TEXT, email TEXT, phone TEXT,
        date_of_birth TEXT, signup_date TEXT, city TEXT);
    CREATE TABLE restaurants(
        restaurant_id TEXT PRIMARY KEY, restaurant_name TEXT, city TEXT, cuisine TEXT,
        avg_rating REAL, commission_pct INTEGER, is_active INTEGER);
    CREATE TABLE delivery_partners(
        partner_id TEXT PRIMARY KEY, partner_name TEXT, city TEXT, vehicle_type TEXT,
        rating REAL, joined_date TEXT);
    CREATE TABLE menu_items(
        item_id TEXT PRIMARY KEY, restaurant_id TEXT, item_name TEXT, category TEXT,
        price INTEGER);
    CREATE TABLE orders(
        order_id TEXT PRIMARY KEY, customer_id TEXT, restaurant_id TEXT, partner_id TEXT,
        order_datetime TEXT, city TEXT, promised_minutes INTEGER, delivered_minutes INTEGER,
        order_value INTEGER, payment_method TEXT, status TEXT, rating INTEGER);
    CREATE TABLE order_items(
        order_item_id TEXT PRIMARY KEY, order_id TEXT, item_id TEXT, item_name TEXT,
        quantity INTEGER, unit_price INTEGER, line_amount INTEGER);
    CREATE TABLE payments(
        payment_id TEXT PRIMARY KEY, order_id TEXT, amount INTEGER, payment_method TEXT,
        payment_status TEXT, is_flagged INTEGER, fraud_reason TEXT);
    """
)


def to_db(table, fields, rows):
    placeholders = ",".join(["?"] * len(fields))
    cur.executemany(
        f"INSERT INTO {table} ({','.join(fields)}) VALUES ({placeholders})",
        [tuple((r[f] if r[f] != "" else None) for f in fields) for r in rows],
    )


to_db("customers", CUST_FIELDS, cust_pub)
to_db("restaurants", REST_FIELDS, rest_pub)
to_db("delivery_partners", PART_FIELDS, part_pub)
to_db("menu_items", MENU_FIELDS, menu_pub)
to_db("orders", ORDER_FIELDS, orders_pub)
to_db("order_items", OI_FIELDS, oi_pub)
to_db("payments", PAY_FIELDS, pay_pub)
conn.commit()
conn.close()

# ---------------------------------------------------------------------------
# schema.sql (portable DDL for Postgres / MySQL / SQLite)
# ---------------------------------------------------------------------------
schema_sql = """-- FoodCo analytics schema (portable DDL)
-- Works on SQLite / PostgreSQL / MySQL with minor type tweaks.
-- To load the CSVs: see SETUP.md in the repo root.

DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS delivery_partners;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    customer_id    VARCHAR(10) PRIMARY KEY,
    customer_name  VARCHAR(100),
    email          VARCHAR(150),
    phone          VARCHAR(30),
    date_of_birth  DATE,
    signup_date    DATE,
    city           VARCHAR(50)
);

CREATE TABLE restaurants (
    restaurant_id   VARCHAR(10) PRIMARY KEY,
    restaurant_name VARCHAR(120),
    city            VARCHAR(50),
    cuisine         VARCHAR(50),
    avg_rating      DECIMAL(2,1),
    commission_pct  INTEGER,
    is_active       INTEGER
);

CREATE TABLE delivery_partners (
    partner_id    VARCHAR(10) PRIMARY KEY,
    partner_name  VARCHAR(100),
    city          VARCHAR(50),
    vehicle_type  VARCHAR(30),
    rating        DECIMAL(2,1),
    joined_date   DATE
);

CREATE TABLE menu_items (
    item_id        VARCHAR(10) PRIMARY KEY,
    restaurant_id  VARCHAR(10) REFERENCES restaurants(restaurant_id),
    item_name      VARCHAR(120),
    category       VARCHAR(30),
    price          INTEGER
);

CREATE TABLE orders (
    order_id          VARCHAR(12) PRIMARY KEY,
    customer_id       VARCHAR(10) REFERENCES customers(customer_id),
    restaurant_id     VARCHAR(10) REFERENCES restaurants(restaurant_id),
    partner_id        VARCHAR(10) REFERENCES delivery_partners(partner_id),
    order_datetime    TIMESTAMP,
    city              VARCHAR(50),
    promised_minutes  INTEGER,
    delivered_minutes INTEGER,
    order_value       INTEGER,
    payment_method    VARCHAR(30),
    status            VARCHAR(20),
    rating            INTEGER
);

CREATE TABLE order_items (
    order_item_id  VARCHAR(12) PRIMARY KEY,
    order_id       VARCHAR(12) REFERENCES orders(order_id),
    item_id        VARCHAR(10) REFERENCES menu_items(item_id),
    item_name      VARCHAR(120),
    quantity       INTEGER,
    unit_price     INTEGER,
    line_amount    INTEGER
);

CREATE TABLE payments (
    payment_id     VARCHAR(12) PRIMARY KEY,
    order_id       VARCHAR(12) REFERENCES orders(order_id),
    amount         INTEGER,
    payment_method VARCHAR(30),
    payment_status VARCHAR(20),
    is_flagged     INTEGER,
    fraud_reason   VARCHAR(200)
);
"""
with open(p("datasets", "schema.sql"), "w", encoding="utf-8") as f:
    f.write(schema_sql)

# ---------------------------------------------------------------------------
# DAY 3 — "dirty" raw_orders.csv  (Power Query cleaning target)
# ---------------------------------------------------------------------------
# Take a sample of orders and make them realistically messy.
sample = orders_pub[:1400]
dirty_rows = []
date_formats = ["%Y-%m-%d %H:%M:%S", "%d-%m-%Y", "%d/%m/%Y %H:%M", "%m/%d/%Y", "%Y.%m.%d"]
city_variants = {
    "Bengaluru": ["Bengaluru", "bengaluru", "BENGALURU", "Bengaluru ", "Bangalore"],
    "Mumbai": ["Mumbai", "mumbai", "MUMBAI", " Mumbai", "Bombay"],
    "Delhi": ["Delhi", "delhi", "DELHI", "New Delhi", "Delhi "],
    "Hyderabad": ["Hyderabad", "hyderabad", "HYDERABAD", "Hyd", "Hyderabad "],
    "Pune": ["Pune", "pune", "PUNE", " Pune", "Pune "],
    "Chennai": ["Chennai", "chennai", "CHENNAI", "Madras", "Chennai "],
}
status_variants = {
    "Delivered": ["Delivered", "delivered", "DELIVERED", "Delivered "],
    "Cancelled": ["Cancelled", "cancelled", "CANCELLED", "Canceled"],
    "Refunded": ["Refunded", "refunded", "REFUNDED"],
}

for o in sample:
    dtobj = dt.datetime.strptime(o["order_datetime"], "%Y-%m-%d %H:%M:%S")
    fmt = random.choice(date_formats)
    date_str = dtobj.strftime(fmt)

    city = random.choice(city_variants[o["city"]])
    status = random.choice(status_variants[o["status"]])
    pay = o["payment_method"] + (" " if random.random() < 0.3 else "")

    # order_value sometimes as "₹1,234" string, sometimes blank
    ov = o["order_value"]
    r = random.random()
    if r < 0.05:
        ov_str = ""  # missing value (null)
    elif r < 0.20:
        ov_str = f"Rs. {ov:,}"
    elif r < 0.30:
        ov_str = f"{ov:,}"
    else:
        ov_str = str(ov)

    cust = o["customer_id"] if random.random() > 0.03 else ""  # some nulls
    delivered = o["delivered_minutes"]
    if delivered != "" and random.random() < 0.02:
        delivered = -random.randint(1, 15)  # impossible negative -> outlier to catch

    dirty_rows.append({
        "Order ID": o["order_id"],
        "Order Date": date_str,
        "Customer ID": cust,
        "City": city,
        "Restaurant ID": o["restaurant_id"],
        "Partner ID": o["partner_id"],
        "Payment Method": pay,
        "Order Value": ov_str,
        "Promised Mins": o["promised_minutes"],
        "Delivered Mins": delivered,
        "Status": status,
        "Rating": o["rating"],
    })

# inject ~40 full-duplicate rows
for _ in range(40):
    dirty_rows.append(dict(random.choice(dirty_rows)))
random.shuffle(dirty_rows)

DIRTY_FIELDS = ["Order ID", "Order Date", "Customer ID", "City", "Restaurant ID",
                "Partner ID", "Payment Method", "Order Value", "Promised Mins",
                "Delivered Mins", "Status", "Rating"]
write_csv(p(DAYS["D03"], "raw_orders.csv"), DIRTY_FIELDS, dirty_rows)

# ---------------------------------------------------------------------------
# DAY 4 — clean orders + lookup tables
# ---------------------------------------------------------------------------
# A clean (but NOT yet enriched) orders file: ids only, no names.
write_csv(p(DAYS["D04"], "orders_clean.csv"), ORDER_FIELDS, orders_pub)
write_csv(p(DAYS["D04"], "restaurants.csv"), REST_FIELDS, rest_pub)
write_csv(p(DAYS["D04"], "delivery_partners.csv"), PART_FIELDS, part_pub)

# ---------------------------------------------------------------------------
# DAY 5 & 6 — enriched orders (ids resolved to names) for pivots + macros
# ---------------------------------------------------------------------------
ENRICH_FIELDS = ["order_id", "order_datetime", "order_date", "order_hour",
                 "customer_id", "city", "restaurant_name", "cuisine",
                 "partner_name", "vehicle_type", "order_value", "payment_method",
                 "status", "promised_minutes", "delivered_minutes", "is_late",
                 "delay_minutes", "rating"]
enriched = []
for o in orders_pub:
    r = rest_by_id[o["restaurant_id"]]
    pt = part_by_id[o["partner_id"]]
    dtobj = dt.datetime.strptime(o["order_datetime"], "%Y-%m-%d %H:%M:%S")
    delivered = o["delivered_minutes"]
    if delivered == "":
        is_late, delay = "", ""
    else:
        delay = int(delivered) - int(o["promised_minutes"])
        is_late = 1 if delay > 0 else 0
    enriched.append({
        "order_id": o["order_id"],
        "order_datetime": o["order_datetime"],
        "order_date": dtobj.strftime("%Y-%m-%d"),
        "order_hour": dtobj.hour,
        "customer_id": o["customer_id"],
        "city": o["city"],
        "restaurant_name": r["restaurant_name"],
        "cuisine": r["cuisine"],
        "partner_name": pt["partner_name"],
        "vehicle_type": pt["vehicle_type"],
        "order_value": o["order_value"],
        "payment_method": o["payment_method"],
        "status": o["status"],
        "promised_minutes": o["promised_minutes"],
        "delivered_minutes": delivered,
        "is_late": is_late,
        "delay_minutes": delay if delivered != "" else "",
        "rating": o["rating"],
    })
write_csv(p(DAYS["D05"], "orders_enriched.csv"), ENRICH_FIELDS, enriched)
write_csv(p(DAYS["D06"], "orders_enriched.csv"), ENRICH_FIELDS, enriched)

# ---------------------------------------------------------------------------
# DAY 1 — Foundations: data-type artifacts to classify
# ---------------------------------------------------------------------------
d1 = p(DAYS["D01"], "data")
ensure(d1)
# (a) structured sample
write_csv(os.path.join(d1, "orders_sample.csv"), ORDER_FIELDS, orders_pub[:40])
# (b) semi-structured JSON app event log
events = []
for o in orders_pub[:25]:
    events.append({
        "event": "order_placed",
        "order_id": o["order_id"],
        "ts": o["order_datetime"],
        "device": random.choice(["android", "ios", "web"]),
        "app_version": random.choice(["8.2.1", "8.3.0", "9.0.0"]),
        "payload": {"city": o["city"], "value": o["order_value"],
                    "items": random.randint(1, 4), "coupon": random.choice([None, "SAVE20", "FREEDEL"])},
    })
with open(os.path.join(d1, "app_events.json"), "w", encoding="utf-8") as f:
    json.dump(events, f, indent=2)
# (c) unstructured customer reviews
reviews = [
    "Food was delicious but the delivery took forever, almost an hour!",
    "Loved the biryani 😋 rider was super polite. Will order again.",
    "Order arrived cold and the packaging was leaking. Very disappointed.",
    "App kept crashing at checkout, had to retry 3 times.",
    "Best dosa in Bengaluru, hands down. 5 stars.",
    "Charged me twice for one order, still waiting for refund.",
    "Decent food, nothing special. Delivery was on time though.",
    "Why is there no vegan option for the pasta? Please add more.",
    "Rider could not find my address, no call, order cancelled.",
    "Amazing offers this week, saved 200 rupees with the coupon!",
]
with open(os.path.join(d1, "customer_reviews.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(reviews))
# (d) semi-structured GPS pings (one delivery)
gps = []
t0 = dt.datetime(2025, 3, 14, 20, 5, 0)
lat, lon = 12.9716, 77.5946
for i in range(15):
    lat += random.uniform(-0.004, 0.004)
    lon += random.uniform(-0.004, 0.004)
    gps.append({"ping_ts": (t0 + dt.timedelta(seconds=i * 40)).strftime("%Y-%m-%d %H:%M:%S"),
                "order_id": "O000007", "lat": round(lat, 5), "lon": round(lon, 5),
                "speed_kmph": round(random.uniform(0, 45), 1)})
write_csv(os.path.join(d1, "gps_pings.csv"),
          ["ping_ts", "order_id", "lat", "lon", "speed_kmph"], gps)
# (e) the classification worksheet students fill in
inventory = [
    ("orders_sample.csv", "Rows and columns of completed orders", "", ""),
    ("app_events.json", "Nested JSON logged by the mobile app", "", ""),
    ("customer_reviews.txt", "Free-text reviews typed by customers", "", ""),
    ("gps_pings.csv", "Rider location pings during a delivery", "", ""),
    ("menu_photo.jpg", "A photo of a restaurant menu board", "", ""),
    ("support_call.mp3", "Audio recording of a support call", "", ""),
    ("payments.csv", "Transaction records with status", "", ""),
    ("whatsapp_complaint.txt", "A customer complaint pasted from chat", "", ""),
]
write_csv(os.path.join(d1, "data_inventory.csv"),
          ["artifact", "description", "your_classification", "which_analytics_type"],
          [{"artifact": a, "description": d, "your_classification": c, "which_analytics_type": w}
           for (a, d, c, w) in inventory])

# ---------------------------------------------------------------------------
# DAY 2 — Analytics types + ethics
# ---------------------------------------------------------------------------
d2 = p(DAYS["D02"], "data")
ensure(d2)
# business questions to classify
questions = [
    "What was our total revenue in August 2025?",
    "Why did average delivery time increase in Mumbai last month?",
    "Which customers are most likely to churn next month?",
    "What discount should we offer each customer to maximise retention?",
    "How many orders were cancelled yesterday?",
    "Which restaurant will have the highest demand this weekend?",
    "What is driving the spike in refund requests?",
    "What is the best rider allocation to minimise late deliveries?",
    "What was the average order value by city last quarter?",
    "Are new customers worth more over 6 months than one-time buyers?",
]
write_csv(os.path.join(d2, "business_questions.csv"),
          ["question_id", "business_question", "analytics_type_descriptive_diagnostic_predictive_prescriptive"],
          [{"question_id": i + 1, "business_question": q,
            "analytics_type_descriptive_diagnostic_predictive_prescriptive": ""}
           for i, q in enumerate(questions)])
# a PII-heavy customer extract for the governance/ethics audit
write_csv(os.path.join(d2, "customers_pii.csv"), CUST_FIELDS, cust_pub[:60])
# orders sample reused for descriptive stats
write_csv(os.path.join(d2, "orders_sample.csv"), ORDER_FIELDS, orders_pub[:200])

# ---------------------------------------------------------------------------
# Summary
# ---------------------------------------------------------------------------
print("=== FoodCo data generated ===")
print(f"customers         : {len(cust_pub)}")
print(f"restaurants       : {len(rest_pub)}")
print(f"delivery_partners : {len(part_pub)}")
print(f"menu_items        : {len(menu_pub)}")
print(f"orders            : {len(orders_pub)}")
print(f"order_items       : {len(oi_pub)}")
print(f"payments          : {len(pay_pub)}")
flagged = sum(1 for x in pay_pub if x["is_flagged"] == 1)
print(f"flagged payments  : {flagged} ({flagged/len(pay_pub)*100:.1f}%)")
late = sum(1 for e in enriched if e["is_late"] == 1)
delivered_ct = sum(1 for e in enriched if e["is_late"] != "")
print(f"late deliveries   : {late}/{delivered_ct} delivered ({late/delivered_ct*100:.1f}%)")
print(f"dirty raw rows    : {len(dirty_rows)} (incl. 40 injected duplicates)")
print(f"SQLite DB         : {DBPATH}")
print("Done.")
