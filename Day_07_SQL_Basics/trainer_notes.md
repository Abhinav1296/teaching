# Day 7 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
In DB Browser ▸ Execute SQL, build one query up live, clause by clause:
1. **(2 min)** `SELECT order_id, city, order_value FROM orders LIMIT 5;` — "this is reading, nothing more."
2. **(2 min)** Add `WHERE status = 'Delivered'`. "Filtering rows."
3. **(3 min)** Replace columns with `SELECT city, COUNT(*), SUM(order_value) … GROUP BY city`. "Now each row is a *group*, not an order."
4. **(2 min)** Add `HAVING COUNT(*) > 100` then `ORDER BY 2 DESC`. Punchline on the board: **WHERE filters rows, HAVING filters groups** — the single most-tested distinction.
5. **(1 min)** Mention `LIMIT` for safety on big tables.

## ✅ Answer key (verified against foodco.db)
```sql
-- 1.
SELECT COUNT(*) AS orders, SUM(order_value) AS revenue, ROUND(AVG(order_value),1) AS aov
FROM orders WHERE status='Delivered';
-- -> 2405 orders, 1,349,707 revenue, 561.2 AOV

-- 2.
SELECT city, COUNT(*) AS n FROM orders GROUP BY city ORDER BY n DESC;
-- -> Hyderabad 480, Mumbai 458, Bengaluru 435, Pune 425, Chennai 425, Delhi 373

-- 3.
SELECT COUNT(*) FROM orders WHERE order_value > 1500;          -- -> 58

-- 4.
SELECT payment_method, SUM(order_value) AS revenue
FROM orders WHERE status='Delivered'
GROUP BY payment_method ORDER BY revenue DESC;
-- -> fairly even across all 5 methods (Debit/Credit/UPI/Wallet/COD ~260-280k each)

-- 5.
SELECT city, COUNT(*) AS n FROM orders
GROUP BY city HAVING COUNT(*) > 400 ORDER BY n DESC;
-- -> 5 cities clear 400 (everyone except Delhi)
```
> Exact totals are stable for seed 42. If a student regenerated with a new seed, the *shape* holds (fairly even payment split, one city below 400).

## ⚠️ Common mistakes
- Putting an aggregate in `WHERE` (`WHERE COUNT(*)>400`) → must be `HAVING`.
- Forgetting `status='Delivered'` and double-counting cancelled/refunded revenue.
- `ORDER BY` before `GROUP BY` (syntax error) — reinforce the clause order.
- Using `SUM(order_value)` for #3 when they want `COUNT(*)` of qualifying rows.
