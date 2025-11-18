---
sidebar_position: 3
---

# PostgreSQL Queries and Joins

## Introduction

PostgreSQL is a powerful, open-source relational database system. Understanding queries, joins, and optimization is essential for backend development.

:::info PostgreSQL 18
This guide covers PostgreSQL 18 features including async I/O, skip scan, and temporal constraints.
:::

## Basic Queries

### SELECT Statement

```sql
-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT id, username, email FROM users;

-- With alias
SELECT
  id AS user_id,
  username AS name,
  email AS contact_email
FROM users;

-- Distinct values
SELECT DISTINCT status FROM orders;

-- Limit results
SELECT * FROM users LIMIT 10;

-- Offset (pagination)
SELECT * FROM users LIMIT 10 OFFSET 20;
```

### WHERE Clause

```sql
-- Equality
SELECT * FROM users WHERE status = 'active';

-- Comparison operators
SELECT * FROM products WHERE price > 100;
SELECT * FROM products WHERE stock <= 10;

-- Multiple conditions (AND)
SELECT * FROM orders
WHERE status = 'pending'
  AND total > 1000;

-- Multiple conditions (OR)
SELECT * FROM users
WHERE role = 'admin'
   OR role = 'moderator';

-- BETWEEN
SELECT * FROM orders
WHERE created_at BETWEEN '2025-01-01' AND '2025-01-31';

-- IN
SELECT * FROM users
WHERE country IN ('US', 'UK', 'CA');

-- NOT IN
SELECT * FROM users
WHERE status NOT IN ('banned', 'deleted');

-- LIKE (pattern matching)
SELECT * FROM users
WHERE email LIKE '%@gmail.com';

-- ILIKE (case-insensitive)
SELECT * FROM users
WHERE username ILIKE 'john%';

-- IS NULL / IS NOT NULL
SELECT * FROM users WHERE phone IS NULL;
SELECT * FROM users WHERE phone IS NOT NULL;
```

### ORDER BY

```sql
-- Ascending (default)
SELECT * FROM users ORDER BY created_at;

-- Descending
SELECT * FROM users ORDER BY created_at DESC;

-- Multiple columns
SELECT * FROM users
ORDER BY last_name ASC, first_name ASC;

-- NULL handling
SELECT * FROM users
ORDER BY phone NULLS LAST;
```

### Aggregate Functions

```sql
-- COUNT
SELECT COUNT(*) FROM users;
SELECT COUNT(DISTINCT country) FROM users;

-- SUM
SELECT SUM(total) FROM orders;

-- AVG
SELECT AVG(price) FROM products;

-- MIN / MAX
SELECT MIN(price), MAX(price) FROM products;

-- Multiple aggregates
SELECT
  COUNT(*) AS total_orders,
  SUM(total) AS total_revenue,
  AVG(total) AS avg_order_value,
  MIN(total) AS min_order,
  MAX(total) AS max_order
FROM orders;
```

### GROUP BY

```sql
-- Group by single column
SELECT
  status,
  COUNT(*) AS count
FROM orders
GROUP BY status;

-- Group by multiple columns
SELECT
  country,
  status,
  COUNT(*) AS count
FROM users
GROUP BY country, status
ORDER BY country, status;

-- With aggregates
SELECT
  user_id,
  COUNT(*) AS order_count,
  SUM(total) AS total_spent,
  AVG(total) AS avg_order_value
FROM orders
GROUP BY user_id
ORDER BY total_spent DESC;
```

### HAVING Clause

```sql
-- Filter grouped results
SELECT
  user_id,
  COUNT(*) AS order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;

-- Multiple conditions
SELECT
  category,
  COUNT(*) AS product_count,
  AVG(price) AS avg_price
FROM products
GROUP BY category
HAVING COUNT(*) > 10 AND AVG(price) > 50;
```

## Joins

### INNER JOIN

Returns rows with matching values in both tables.

```sql
-- Basic INNER JOIN
SELECT
  users.id,
  users.username,
  orders.id AS order_id,
  orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Multiple joins
SELECT
  users.username,
  orders.id AS order_id,
  products.name AS product_name,
  order_items.quantity
FROM users
INNER JOIN orders ON users.id = orders.user_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id;

-- With WHERE
SELECT
  users.username,
  orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
  AND orders.total > 100;
```

### LEFT JOIN (LEFT OUTER JOIN)

Returns all rows from the left table and matching rows from the right table (NULL if no match).

```sql
-- Basic LEFT JOIN
SELECT
  users.id,
  users.username,
  orders.id AS order_id,
  orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- Find users with no orders
SELECT
  users.id,
  users.username
FROM users
LEFT JOIN orders ON users.id = orders.user_id
WHERE orders.id IS NULL;

-- Count orders per user (including users with 0 orders)
SELECT
  users.username,
  COUNT(orders.id) AS order_count
FROM users
LEFT JOIN orders ON users.id = orders.user_id
GROUP BY users.id, users.username;
```

### RIGHT JOIN (RIGHT OUTER JOIN)

Returns all rows from the right table and matching rows from the left table.

```sql
-- Basic RIGHT JOIN
SELECT
  users.username,
  orders.id AS order_id,
  orders.total
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;

-- Rarely used (can be rewritten as LEFT JOIN)
-- This RIGHT JOIN:
SELECT * FROM users RIGHT JOIN orders ON users.id = orders.user_id;

-- Is equivalent to this LEFT JOIN:
SELECT * FROM orders LEFT JOIN users ON orders.user_id = users.id;
```

### FULL OUTER JOIN

Returns all rows from both tables (NULL for non-matching rows).

```sql
-- Basic FULL OUTER JOIN
SELECT
  users.id AS user_id,
  users.username,
  orders.id AS order_id,
  orders.total
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id;

-- Find unmatched rows from both tables
SELECT
  users.username,
  orders.id AS order_id
FROM users
FULL OUTER JOIN orders ON users.id = orders.user_id
WHERE users.id IS NULL OR orders.id IS NULL;
```

### CROSS JOIN

Returns the Cartesian product of both tables (all possible combinations).

```sql
-- Basic CROSS JOIN
SELECT
  colors.name AS color,
  sizes.name AS size
FROM colors
CROSS JOIN sizes;

-- Result:
-- Red, Small
-- Red, Medium
-- Red, Large
-- Blue, Small
-- Blue, Medium
-- Blue, Large
```

### SELF JOIN

Join a table to itself.

```sql
-- Find employees and their managers
SELECT
  e.name AS employee,
  m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- Find users in the same city
SELECT
  u1.username AS user1,
  u2.username AS user2,
  u1.city
FROM users u1
INNER JOIN users u2 ON u1.city = u2.city AND u1.id < u2.id
ORDER BY u1.city;
```

## Subqueries

### Subquery in WHERE

```sql
-- Find users who placed orders above average
SELECT username
FROM users
WHERE id IN (
  SELECT user_id
  FROM orders
  WHERE total > (SELECT AVG(total) FROM orders)
);

-- Find products never ordered
SELECT name
FROM products
WHERE id NOT IN (
  SELECT DISTINCT product_id
  FROM order_items
);
```

### Subquery in SELECT

```sql
-- Include subquery result in SELECT
SELECT
  id,
  username,
  (SELECT COUNT(*) FROM orders WHERE orders.user_id = users.id) AS order_count,
  (SELECT COALESCE(SUM(total), 0) FROM orders WHERE orders.user_id = users.id) AS total_spent
FROM users;
```

### Subquery in FROM (Derived Table)

```sql
-- Use subquery as a table
SELECT
  category,
  avg_price
FROM (
  SELECT
    category,
    AVG(price) AS avg_price
  FROM products
  GROUP BY category
) AS category_stats
WHERE avg_price > 100;
```

### EXISTS

```sql
-- Find users who placed at least one order
SELECT username
FROM users
WHERE EXISTS (
  SELECT 1
  FROM orders
  WHERE orders.user_id = users.id
);

-- Find users who never placed an order
SELECT username
FROM users
WHERE NOT EXISTS (
  SELECT 1
  FROM orders
  WHERE orders.user_id = users.id
);
```

## Common Table Expressions (CTE)

### Basic CTE

```sql
-- Define reusable subquery
WITH active_users AS (
  SELECT id, username
  FROM users
  WHERE status = 'active'
)
SELECT
  active_users.username,
  COUNT(orders.id) AS order_count
FROM active_users
LEFT JOIN orders ON active_users.id = orders.user_id
GROUP BY active_users.username;
```

### Multiple CTEs

```sql
WITH
high_value_orders AS (
  SELECT user_id, total
  FROM orders
  WHERE total > 1000
),
user_stats AS (
  SELECT
    user_id,
    COUNT(*) AS order_count,
    SUM(total) AS total_spent
  FROM high_value_orders
  GROUP BY user_id
)
SELECT
  users.username,
  user_stats.order_count,
  user_stats.total_spent
FROM users
INNER JOIN user_stats ON users.id = user_stats.user_id;
```

### Recursive CTE

```sql
-- Organization hierarchy
WITH RECURSIVE employee_hierarchy AS (
  -- Base case: Top-level managers
  SELECT
    id,
    name,
    manager_id,
    1 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- Recursive case: Employees reporting to previous level
  SELECT
    e.id,
    e.name,
    e.manager_id,
    eh.level + 1
  FROM employees e
  INNER JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, name;
```

## Window Functions

### Basic Window Functions

```sql
-- ROW_NUMBER
SELECT
  username,
  total,
  ROW_NUMBER() OVER (ORDER BY total DESC) AS rank
FROM orders;

-- RANK (same values get same rank, gaps after ties)
SELECT
  username,
  total,
  RANK() OVER (ORDER BY total DESC) AS rank
FROM orders;

-- DENSE_RANK (no gaps after ties)
SELECT
  username,
  total,
  DENSE_RANK() OVER (ORDER BY total DESC) AS rank
FROM orders;
```

### Partition By

```sql
-- Rank within each category
SELECT
  category,
  name,
  price,
  RANK() OVER (PARTITION BY category ORDER BY price DESC) AS rank_in_category
FROM products;

-- Running total per user
SELECT
  user_id,
  order_date,
  total,
  SUM(total) OVER (
    PARTITION BY user_id
    ORDER BY order_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM orders;
```

### LAG and LEAD

```sql
-- Compare with previous row
SELECT
  order_date,
  total,
  LAG(total) OVER (ORDER BY order_date) AS previous_order,
  total - LAG(total) OVER (ORDER BY order_date) AS difference
FROM orders;

-- Compare with next row
SELECT
  order_date,
  total,
  LEAD(total) OVER (ORDER BY order_date) AS next_order
FROM orders;
```

## Transactions

### Basic Transaction

```sql
BEGIN;

-- Multiple operations
INSERT INTO orders (user_id, total) VALUES (1, 100);
UPDATE users SET balance = balance - 100 WHERE id = 1;
INSERT INTO order_items (order_id, product_id, quantity) VALUES (LASTVAL(), 5, 2);

COMMIT;  -- Save changes
-- or
ROLLBACK;  -- Undo changes
```

### Savepoints

```sql
BEGIN;

INSERT INTO orders (user_id, total) VALUES (1, 100);

SAVEPOINT order_created;

UPDATE products SET stock = stock - 1 WHERE id = 5;

-- Rollback to savepoint (keeps order insert)
ROLLBACK TO SAVEPOINT order_created;

COMMIT;
```

### Transaction Isolation Levels

```sql
-- Read Uncommitted (PostgreSQL treats as Read Committed)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- Read Committed (default)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Repeatable Read
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Serializable (strictest)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
-- Your queries
COMMIT;
```

## Indexes

### Creating Indexes

```sql
-- B-tree index (default)
CREATE INDEX idx_users_email ON users(email);

-- Unique index
CREATE UNIQUE INDEX idx_users_email_unique ON users(email);

-- Compound index
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- Partial index
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

-- Expression index
CREATE INDEX idx_users_lower_email ON users(LOWER(email));

-- GIN index (for arrays, JSONB, full-text search)
CREATE INDEX idx_users_tags ON users USING GIN(tags);

-- GiST index (for geometric data)
CREATE INDEX idx_locations ON places USING GIST(location);

-- BRIN index (for large, naturally ordered tables)
CREATE INDEX idx_logs_created ON logs USING BRIN(created_at);
```

### Managing Indexes

```sql
-- List all indexes
SELECT * FROM pg_indexes WHERE tablename = 'users';

-- Drop index
DROP INDEX idx_users_email;

-- Rebuild index
REINDEX INDEX idx_users_email;

-- Rebuild all indexes on table
REINDEX TABLE users;
```

## Query Optimization

### EXPLAIN

```sql
-- See query execution plan
EXPLAIN SELECT * FROM users WHERE email = 'john@example.com';

-- With execution statistics
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'john@example.com';

-- Detailed output
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT * FROM orders WHERE user_id = 123;
```

### Common Optimization Techniques

```sql
-- ❌ Bad: Function on indexed column (doesn't use index)
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- ✓ Good: Expression index or case-insensitive comparison
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- ❌ Bad: Leading wildcard (doesn't use index)
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- ✓ Good: No leading wildcard (uses index)
SELECT * FROM users WHERE email LIKE 'john%';

-- ❌ Bad: OR with different columns (may not use indexes)
SELECT * FROM users WHERE email = 'john@example.com' OR phone = '1234567890';

-- ✓ Good: Use UNION for better performance
SELECT * FROM users WHERE email = 'john@example.com'
UNION
SELECT * FROM users WHERE phone = '1234567890';

-- ❌ Bad: SELECT * (fetches unnecessary columns)
SELECT * FROM users;

-- ✓ Good: Select only needed columns
SELECT id, username, email FROM users;
```

## Interview Questions

### Q1: What are the different types of joins in PostgreSQL?

**Answer:**

| Join Type | Returns | Use Case |
|-----------|---------|----------|
| **INNER JOIN** | Matching rows from both tables | Most common, data exists in both |
| **LEFT JOIN** | All left + matching right | Include all from left table |
| **RIGHT JOIN** | All right + matching left | Include all from right table |
| **FULL OUTER JOIN** | All from both tables | Show all data with matches |
| **CROSS JOIN** | Cartesian product | Generate combinations |
| **SELF JOIN** | Table joined to itself | Hierarchies, relationships |

```sql
-- Example data
-- users: [1:John, 2:Jane, 3:Bob]
-- orders: [order1:user1, order2:user1, order3:user4]

-- INNER JOIN: 2 rows (only users 1 with orders)
SELECT users.username, orders.id
FROM users INNER JOIN orders ON users.id = orders.user_id;

-- LEFT JOIN: 3 rows (all users, NULLs for users without orders)
SELECT users.username, orders.id
FROM users LEFT JOIN orders ON users.id = orders.user_id;

-- FULL OUTER JOIN: 4 rows (all users + orphaned order3)
SELECT users.username, orders.id
FROM users FULL OUTER JOIN orders ON users.id = orders.user_id;
```

### Q2: What is the difference between WHERE and HAVING?

**Answer:**

| Feature | WHERE | HAVING |
|---------|-------|--------|
| **Applied to** | Individual rows | Grouped results |
| **When** | Before grouping | After grouping |
| **Can use aggregates** | No | Yes |

```sql
-- WHERE: Filter rows before grouping
SELECT
  country,
  COUNT(*) AS user_count
FROM users
WHERE status = 'active'  -- Filter individual rows
GROUP BY country;

-- HAVING: Filter groups after aggregation
SELECT
  country,
  COUNT(*) AS user_count
FROM users
GROUP BY country
HAVING COUNT(*) > 100;  -- Filter grouped results

-- Both together
SELECT
  country,
  COUNT(*) AS user_count
FROM users
WHERE status = 'active'  -- Filter rows first
GROUP BY country
HAVING COUNT(*) > 100;   -- Then filter groups
```

### Q3: What are indexes and why are they important?

**Answer:**

**Indexes** are special data structures that improve query performance by allowing faster data retrieval.

**How indexes work:**
```sql
-- Without index: Full table scan (slow)
SELECT * FROM users WHERE email = 'john@example.com';
-- Scans all rows

-- With index: Index scan (fast)
CREATE INDEX idx_users_email ON users(email);
SELECT * FROM users WHERE email = 'john@example.com';
-- Uses index, finds row immediately
```

**Index types:**

**1. B-tree (default):** General purpose, most common
```sql
CREATE INDEX idx_users_email ON users(email);
```

**2. GIN:** Arrays, JSONB, full-text search
```sql
CREATE INDEX idx_users_tags ON users USING GIN(tags);
SELECT * FROM users WHERE tags @> ARRAY['admin'];
```

**3. GiST:** Geometric data, ranges
```sql
CREATE INDEX idx_locations ON places USING GIST(location);
```

**4. BRIN:** Very large, naturally ordered tables
```sql
CREATE INDEX idx_logs_created ON logs USING BRIN(created_at);
```

**Trade-offs:**
- ✅ Faster SELECT queries
- ❌ Slower INSERT/UPDATE/DELETE (must update index)
- ❌ More storage space

### Q4: What is ACID in database transactions?

**Answer:**

**ACID** ensures reliable database transactions:

**1. Atomicity:** All or nothing
```sql
BEGIN;
-- Either both succeed or both fail
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- Both changes saved
-- or
ROLLBACK;  -- Both changes undone
```

**2. Consistency:** Database remains in valid state
```sql
-- Constraints ensure consistency
ALTER TABLE accounts ADD CONSTRAINT positive_balance CHECK (balance >= 0);

-- This transaction would fail (consistency preserved)
BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;  -- Would go negative
COMMIT;  -- Fails, rollback
```

**3. Isolation:** Concurrent transactions don't interfere
```sql
-- Transaction 1
BEGIN;
SELECT balance FROM accounts WHERE id = 1;  -- Reads: 1000
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
COMMIT;

-- Transaction 2 (concurrent)
BEGIN;
SELECT balance FROM accounts WHERE id = 1;  -- Still reads: 1000 (isolated)
COMMIT;
```

**4. Durability:** Committed changes persist
```sql
BEGIN;
INSERT INTO orders VALUES (1, 100);
COMMIT;  -- Data is permanently saved, survives crashes
```

### Q5: What are window functions and how do they differ from GROUP BY?

**Answer:**

**Window functions** perform calculations across rows without collapsing them (unlike GROUP BY).

| Feature | GROUP BY | Window Functions |
|---------|----------|------------------|
| **Rows** | Collapses to groups | Preserves all rows |
| **Result** | One row per group | One row per input row |
| **Calculations** | Per group | Across window |

```sql
-- Sample data
-- orders: [user1:100, user1:200, user2:150, user2:250]

-- GROUP BY: 2 rows (one per user)
SELECT
  user_id,
  SUM(total) AS total_spent
FROM orders
GROUP BY user_id;

-- Result:
-- user1, 300
-- user2, 400

-- Window function: 4 rows (all original rows)
SELECT
  user_id,
  total,
  SUM(total) OVER (PARTITION BY user_id) AS user_total,
  SUM(total) OVER () AS grand_total
FROM orders;

-- Result:
-- user1, 100, 300, 700
-- user1, 200, 300, 700
-- user2, 150, 400, 700
-- user2, 250, 400, 700
```

**Common window functions:**
- **ROW_NUMBER()** - Unique number for each row
- **RANK()** - Ranking with gaps
- **DENSE_RANK()** - Ranking without gaps
- **LAG()/LEAD()** - Access previous/next row
- **SUM()/AVG()/COUNT()** - Aggregates over window

### Q6: Explain the difference between DELETE, TRUNCATE, and DROP.

**Answer:**

| Command | Removes | Speed | Can Rollback | Triggers |
|---------|---------|-------|--------------|----------|
| **DELETE** | Rows (filtered) | Slow | Yes | Yes |
| **TRUNCATE** | All rows | Fast | Yes (in transaction) | No |
| **DROP** | Entire table | Fast | Yes (in transaction) | N/A |

```sql
-- DELETE: Remove specific rows
DELETE FROM users WHERE status = 'inactive';
-- Can use WHERE, fires triggers, can rollback

-- TRUNCATE: Remove all rows
TRUNCATE TABLE users;
-- Faster than DELETE, resets sequences, no triggers

-- DROP: Remove entire table
DROP TABLE users;
-- Removes table structure and data
```

**Use cases:**
- **DELETE**: Remove specific rows, need triggers
- **TRUNCATE**: Reset table quickly, development/testing
- **DROP**: Remove table permanently

### Q7: What is a subquery and when should you use it?

**Answer:**

A **subquery** is a query nested inside another query.

**Types of subqueries:**

**1. Scalar subquery (returns single value)**
```sql
SELECT username
FROM users
WHERE id = (SELECT user_id FROM orders WHERE id = 123);
```

**2. Multiple-row subquery (with IN, ANY, ALL)**
```sql
SELECT username
FROM users
WHERE id IN (SELECT user_id FROM orders WHERE total > 1000);
```

**3. Correlated subquery (references outer query)**
```sql
SELECT username
FROM users u
WHERE (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) > 5;
```

**vs JOIN:**
```sql
-- Subquery (less efficient for large datasets)
SELECT username
FROM users
WHERE id IN (SELECT user_id FROM orders WHERE status = 'completed');

-- JOIN (more efficient)
SELECT DISTINCT users.username
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed';
```

**Use subqueries when:**
- ✅ Need scalar value
- ✅ More readable for simple queries
- ✅ Using EXISTS/NOT EXISTS

**Use JOINs when:**
- ✅ Better performance (usually)
- ✅ Need columns from multiple tables
- ✅ Large datasets

### Q8: What is the difference between UNION and UNION ALL?

**Answer:**

| Feature | UNION | UNION ALL |
|---------|-------|-----------|
| **Duplicates** | Removed | Kept |
| **Performance** | Slower (deduplication) | Faster |
| **Use case** | Need unique results | All results, including duplicates |

```sql
-- Sample data
-- table1: [1, 2, 3]
-- table2: [3, 4, 5]

-- UNION: Removes duplicates (3 appears once)
SELECT id FROM table1
UNION
SELECT id FROM table2;
-- Result: 1, 2, 3, 4, 5

-- UNION ALL: Keeps duplicates (3 appears twice)
SELECT id FROM table1
UNION ALL
SELECT id FROM table2;
-- Result: 1, 2, 3, 3, 4, 5
```

**Best practice:** Use UNION ALL if you know there are no duplicates or duplicates are acceptable (faster).

### Q9: What is MVCC (Multi-Version Concurrency Control)?

**Answer:**

**MVCC** allows concurrent transactions without locking by maintaining multiple versions of data.

**How it works:**

```sql
-- Initial state: account balance = 1000

-- Transaction 1 (not committed yet)
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Creates new version: balance = 900 (not visible to others)

-- Transaction 2 (concurrent)
BEGIN;
SELECT balance FROM accounts WHERE id = 1;
-- Reads old version: balance = 1000 (snapshot isolation)
COMMIT;

-- Transaction 1 commits
COMMIT;
-- New version becomes visible

-- Transaction 3 (after commit)
SELECT balance FROM accounts WHERE id = 1;
-- Reads new version: balance = 900
```

**Benefits:**
- ✅ No read locks (readers don't block writers)
- ✅ No write locks on reads (writers don't block readers)
- ✅ Better concurrency
- ✅ Each transaction sees consistent snapshot

**Vacuum:** PostgreSQL uses VACUUM to remove old versions and reclaim space.

### Q10: How do you optimize slow queries in PostgreSQL?

**Answer:**

**1. Use EXPLAIN ANALYZE:**
```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'john@example.com';
```

**2. Create appropriate indexes:**
```sql
-- Identify slow queries
CREATE INDEX idx_users_email ON users(email);
```

**3. Optimize query structure:**
```sql
-- ❌ Bad: Function on indexed column
SELECT * FROM users WHERE LOWER(email) = 'john@example.com';

-- ✓ Good: Create expression index
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
```

**4. Select only needed columns:**
```sql
-- ❌ Bad
SELECT * FROM users;

-- ✓ Good
SELECT id, username, email FROM users;
```

**5. Use EXISTS instead of COUNT:**
```sql
-- ❌ Bad (counts all rows)
SELECT * FROM users WHERE (SELECT COUNT(*) FROM orders WHERE user_id = users.id) > 0;

-- ✓ Good (stops at first match)
SELECT * FROM users WHERE EXISTS (SELECT 1 FROM orders WHERE user_id = users.id);
```

**6. Use appropriate JOIN types:**
```sql
-- Use INNER JOIN instead of LEFT JOIN if possible (faster)
```

**7. Partition large tables:**
```sql
CREATE TABLE orders_2025_01 PARTITION OF orders
FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
```

**8. Update statistics:**
```sql
ANALYZE users;
VACUUM ANALYZE users;
```

**9. Increase work_mem for complex queries:**
```sql
SET work_mem = '256MB';
```

**10. Monitor with pg_stat_statements:**
```sql
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

## Best Practices

1. **Use indexes wisely** - Index frequently queried columns, but not excessively
2. **Use transactions** - For multiple related operations
3. **Avoid SELECT *** - Select only needed columns
4. **Use EXPLAIN** - Understand query execution plans
5. **Normalize appropriately** - Balance between normalization and performance
6. **Use connection pooling** - Manage database connections efficiently
7. **Use prepared statements** - Prevent SQL injection and improve performance
8. **Monitor query performance** - Regularly check slow queries
9. **Use appropriate data types** - Right-sized types save storage and improve performance
10. **Regular maintenance** - VACUUM, ANALYZE, and update statistics

## Resources

- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/current/)
- [PostgreSQL 18 Release Notes](https://www.postgresql.org/docs/18/release-18.html)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [PostgreSQL Performance Tips](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [EXPLAIN Documentation](https://www.postgresql.org/docs/current/using-explain.html)
- [PostgreSQL Indexes](https://www.postgresql.org/docs/current/indexes.html)
