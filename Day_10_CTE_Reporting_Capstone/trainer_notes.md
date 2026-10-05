# Day 10 — Trainer notes (keep students out of this file)

## 🎬 Your 10-minute live demo
1. **(5 min) Nested → CTE refactor.** Put an ugly 2-level nested subquery on screen:
   ```sql
   SELECT * FROM (
     SELECT restaurant_id, SUM(order_value) rev FROM orders GROUP BY restaurant_id
   ) WHERE rev > (SELECT AVG(rev) FROM (
     SELECT SUM(order_value) rev FROM orders GROUP BY restaurant_id));
   ```
   Rewrite it live as stacked CTEs (see Q1 below). Point: "Same answer, but now I can *read* it, and each CTE is independently testable."
2. **(3 min)** `CREATE VIEW exec_report AS <select>;` then `SELECT * FROM exec_report;`. "Your dashboard points at this one name; the SQL lives here, not in Tableau."
3. **(2 min)** Show a view auto-updates: insert/delete a row (or just note it) and re-select — the view reflects it. Tie the bootcamp together: Day 1 pile of files → Day 10 live report.

## ✅ Answer key (verified)
```sql
-- 1. Nested subquery -> CTEs: restaurants above their CITY's average revenue
WITH rest_rev AS (
  SELECT r.restaurant_id, r.restaurant_name, r.city, SUM(o.order_value) AS revenue
  FROM orders o JOIN restaurants r ON o.restaurant_id = r.restaurant_id
  WHERE o.status='Delivered'
  GROUP BY r.restaurant_id, r.restaurant_name, r.city),
city_avg AS (
  SELECT city, AVG(revenue) AS avg_rev FROM rest_rev GROUP BY city)
SELECT rr.city, rr.restaurant_name, rr.revenue, ROUND(ca.avg_rev,0) AS city_avg
FROM rest_rev rr JOIN city_avg ca ON rr.city = ca.city
WHERE rr.revenue > ca.avg_rev
ORDER BY rr.city, rr.revenue DESC;        -- 32 restaurants beat their city average

-- 2. Fraud report
WITH fraud AS (
  SELECT pm.payment_id, c.customer_name, o.city, o.order_value, pm.amount,
         (pm.amount - o.order_value) AS diff, pm.is_flagged, pm.fraud_reason
  FROM payments pm
  JOIN orders o    ON pm.order_id = o.order_id
  JOIN customers c ON o.customer_id = c.customer_id)
SELECT * FROM fraud
WHERE is_flagged = 1 OR diff <> 0
ORDER BY ABS(diff) DESC, is_flagged DESC;

-- 3. Retention (monthly active) — proves the Q3 dip
SELECT substr(order_datetime,1,7) AS ym,
       COUNT(DISTINCT customer_id) AS active_customers,
       COUNT(*) AS orders
FROM orders GROUP BY ym ORDER BY ym;
-- Jun 213 (peak) -> Jul 143 -> Aug 161 -> Sep 144

-- 3b. STRETCH cohort: of customers who signed up in month X, how many ever ordered later?
WITH cust AS (SELECT customer_id, substr(signup_date,1,7) AS cohort FROM customers),
     act  AS (SELECT DISTINCT customer_id, substr(order_datetime,1,7) AS ym FROM orders)
SELECT c.cohort,
       COUNT(DISTINCT c.customer_id) AS cohort_size,
       COUNT(DISTINCT CASE WHEN a.ym > c.cohort THEN a.customer_id END) AS retained_later
FROM cust c LEFT JOIN act a ON c.customer_id = a.customer_id
WHERE c.cohort >= '2025-01'
GROUP BY c.cohort ORDER BY c.cohort;
-- later cohorts (Jul+) retain far less -> acquisition quality fell in Q3

-- 4. Top 5 products by revenue
SELECT item_name, SUM(line_amount) AS revenue, SUM(quantity) AS units
FROM order_items GROUP BY item_name ORDER BY revenue DESC LIMIT 5;
-- Quinoa Bowl, Grilled Chicken Bowl, Chilli Paneer, Chicken Fried Rice, Greek Salad

-- 5. Ship the view (example: the ops exec report)
CREATE VIEW exec_report AS
SELECT city,
       COUNT(*) AS orders,
       SUM(order_value) AS revenue,
       ROUND(100.0 * AVG(CASE WHEN status='Delivered' AND delivered_minutes > promised_minutes
                              THEN 1.0 WHEN status='Delivered' THEN 0.0 END), 1) AS late_pct
FROM orders GROUP BY city;
SELECT * FROM exec_report ORDER BY late_pct DESC;
-- Mumbai 65.4% late, ... Hyderabad 15.5%
```

## ⚠️ Common mistakes
- **Fan-out double counting:** joining `order_items` into the revenue report inflates `SUM(order_value)` (value repeats per line). Aggregate items in their own CTE, then join the totals.
- `CREATE VIEW` fails if the view already exists → `DROP VIEW IF EXISTS exec_report;` first.
- Cohort `WHERE a.ym > c.cohort` vs `>=`: decide whether the signup month itself counts as "retained." (We used `>`, i.e. ordered in a *later* month.)
- Trying to index/parameterise a VIEW like a table — it's a stored query, not a materialised table (in SQLite).

## 🏁 Capstone debrief prompts for the class
- Which city should Ops fix first, and what's the one-line pitch to the COO? (Mumbai lateness.)
- Does the fraud list look like real fraud or false positives? How would you tune the rules?
- The Q3 dip: is it fewer *new* customers, or existing ones leaving? (The cohort query separates the two.)
