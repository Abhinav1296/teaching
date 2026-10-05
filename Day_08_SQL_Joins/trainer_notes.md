# Day 8 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
Whiteboard two overlapping circles (orders ∩ customers) and build the query as you talk.
1. **(3 min)** `SELECT o.order_id, c.customer_name FROM orders o JOIN customers c ON o.customer_id=c.customer_id LIMIT 5;` — "only rows that match on both sides."
2. **(3 min)** Change `JOIN` → `LEFT JOIN` and reverse: start from `customers`. Add `WHERE o.order_id IS NULL`. The result = customers with no orders → shade that crescent of the Venn.
3. **(2 min)** Chain a third table (`restaurants`) to show joins compose.
4. **(2 min)** Note SQLite lacks `RIGHT`/`FULL` — swap operands for RIGHT; mention Postgres/MySQL8 do `FULL OUTER`. Callback: "this is yesterday's VLOOKUP — but one statement joins the whole table, no dragging."

## ✅ Answer key (verified)
```sql
-- 1. INNER (3 tables)
SELECT o.order_id, c.customer_name, r.restaurant_name, r.cuisine, o.order_value
FROM orders o
JOIN customers c   ON o.customer_id = c.customer_id
JOIN restaurants r ON o.restaurant_id = r.restaurant_id
WHERE o.status='Delivered';

-- 2. Top 10 customers by spend
SELECT c.customer_id, c.customer_name, SUM(o.order_value) AS total_spend, COUNT(*) AS orders
FROM customers c JOIN orders o ON c.customer_id=o.customer_id
GROUP BY c.customer_id, c.customer_name
ORDER BY total_spend DESC LIMIT 10;

-- 3. Never ordered  -> 63 customers
SELECT c.customer_id, c.customer_name, c.city
FROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id
WHERE o.order_id IS NULL;

-- 4. Busiest rider per city (window version; a GROUP BY + MAX works too)
WITH t AS (
  SELECT p.city, p.partner_name, COUNT(*) trips
  FROM orders o JOIN delivery_partners p ON o.partner_id=p.partner_id
  GROUP BY p.city, p.partner_name)
SELECT city, partner_name, trips FROM (
  SELECT *, RANK() OVER (PARTITION BY city ORDER BY trips DESC) rk FROM t)
WHERE rk=1;

-- 5. Fraud view
SELECT pm.payment_id, c.customer_name, o.order_value, pm.amount, pm.fraud_reason
FROM payments pm
JOIN orders o    ON pm.order_id = o.order_id
JOIN customers c ON o.customer_id = c.customer_id
WHERE pm.is_flagged = 1;
```
**Key numbers:** never-ordered customers = **63**; flagged payments ≈ **54** (~2%). INNER (Q1) returns only delivered orders that match a customer AND restaurant; LEFT (Q3) returns all 500 customers, 63 of whom have NULL order columns.

## ⚠️ Common mistakes
- `WHERE o.rating IS NULL` instead of `o.order_id IS NULL` for "never ordered" — rating is null on cancelled orders too, so it over-counts. Use the join key / PK.
- Dropping the `GROUP BY` non-aggregated column (SQLite tolerates it and returns arbitrary rows — show why that's dangerous).
- Expecting `RIGHT JOIN` to work in SQLite (older versions error). Swap sides.
- Fan-out: joining `order_items` and then `SUM(order_value)` double-counts (value repeats per item line). Flag this early — it bites them on Day 10.
