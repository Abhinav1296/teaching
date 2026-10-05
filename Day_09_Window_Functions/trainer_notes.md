# Day 9 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
On a handful of orders:
1. **(3 min)** `SELECT city, order_value, ROW_NUMBER() OVER (PARTITION BY city ORDER BY order_value DESC) AS rn FROM orders LIMIT 15;` — point at the counter **restarting** per city. That's `PARTITION BY`.
2. **(2 min)** Swap `ROW_NUMBER` → `RANK` → `DENSE_RANK` on a column with ties; show how ties/gaps differ.
3. **(3 min)** `SELECT customer_id, order_datetime, LAG(order_value) OVER (PARTITION BY customer_id ORDER BY order_datetime) AS prev FROM orders;` — "the row can now see its neighbour **without a self-join**."
4. **(2 min)** `SUM(order_value) OVER (ORDER BY order_datetime)` → a running total. Contrast with `GROUP BY` which would collapse the rows. Punchline: **windows keep every row and add context.**

## ✅ Answer key (verified)
```sql
-- 1. Top restaurant per city
WITH rev AS (
  SELECT r.city, r.restaurant_name, SUM(o.order_value) AS revenue
  FROM orders o JOIN restaurants r ON o.restaurant_id=r.restaurant_id
  WHERE o.status='Delivered'
  GROUP BY r.city, r.restaurant_name)
SELECT city, restaurant_name, revenue FROM (
  SELECT *, RANK() OVER (PARTITION BY city ORDER BY revenue DESC) rk FROM rev)
WHERE rk = 1;
-- -> Bengaluru: Flavours of Nourish | Delhi: Hungry Bowl Co. | Hyderabad: Tandoori Salad Bar
--    Mumbai: Golden Dragon | Chennai: Golden Tandoor | Pune: Little Forno

-- 2. Running monthly revenue
WITH m AS (
  SELECT substr(order_datetime,1,7) AS ym, SUM(order_value) AS rev
  FROM orders WHERE status='Delivered' GROUP BY ym)
SELECT ym, rev, SUM(rev) OVER (ORDER BY ym) AS running_total FROM m ORDER BY ym;

-- 3. Days between a customer's orders
SELECT customer_id, order_datetime,
       LAG(order_datetime) OVER (PARTITION BY customer_id ORDER BY order_datetime) AS prev_order,
       CAST(julianday(order_datetime)
            - julianday(LAG(order_datetime) OVER (PARTITION BY customer_id ORDER BY order_datetime))
            AS INT) AS gap_days
FROM orders ORDER BY customer_id, order_datetime;

-- 5. Rank riders per city
SELECT city, partner_name, trips,
       DENSE_RANK() OVER (PARTITION BY city ORDER BY trips DESC) AS rk
FROM (SELECT p.city, p.partner_name, COUNT(*) trips
      FROM orders o JOIN delivery_partners p ON o.partner_id=p.partner_id
      GROUP BY p.city, p.partner_name);
```
**The Q3 finding (monthly active customers):**
```
2025-06  213  (peak)
2025-07  143   <- ~33% drop
2025-08  161
2025-09  144
```
→ **Yes, retention dips in Q3.** Jan–Jun grows steadily (137→213 active), then July collapses ~33% and never recovers to the June level. Running revenue (Q2) also shows June as the strongest month.

## ⚠️ Common mistakes
- Using `GROUP BY` for #3 and losing the per-order detail — the whole point of a window is to *keep* rows.
- `RANK` vs `ROW_NUMBER` on ties: `ROW_NUMBER` breaks ties arbitrarily (non-deterministic #1). For "the single top restaurant," `ROW_NUMBER` is safer when they want exactly one.
- Forgetting the `OVER()` `ORDER BY` on a running total → it sums the whole partition instead of accumulating.
- Mixing an aggregate and a window in the same level without a CTE — have them stage with `WITH`.
- Older SQLite (<3.25, 2018) lacks window functions. The bundled `foodco.db` + a current DB Browser are fine; if a student's tool errors, update it.
