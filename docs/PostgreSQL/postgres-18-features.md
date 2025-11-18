---
sidebar_position: 2
---

# PostgreSQL 18 New Features

## What's New in PostgreSQL 18?

PostgreSQL 18 was released on **September 25, 2025** with major performance improvements and new features.

:::info Latest Version
PostgreSQL 18.1 is the latest version as of November 2025.
:::

## Major New Features

### 1. Asynchronous I/O (AIO)

The biggest performance improvement in PostgreSQL 18!

**What is it?**
An asynchronous I/O subsystem that lets PostgreSQL issue **multiple I/O requests concurrently** instead of waiting for each to finish sequentially.

**Performance Impact:**
- Up to **3x faster** sequential scans
- Faster bitmap heap scans
- Faster VACUUM operations
- Better overall throughput

**How to use:**

```sql
-- Check current I/O method
SHOW io_method;

-- Set I/O method (default is 'worker')
SET io_method = 'io_uring';  -- Linux only, requires kernel 5.1+

-- Options:
-- 'worker' - Worker-based AIO (default, all platforms)
-- 'io_uring' - Linux io_uring (best performance on Linux)
```

**When it helps:**
- Large table scans
- Analytics queries
- Data warehouse operations
- Bulk data loading

**Example:**

```sql
-- This query benefits from AIO
SELECT * FROM large_table WHERE category = 'electronics';

-- Before (v17): 5.2 seconds
-- After (v18): 1.8 seconds (3x faster!)
```

### 2. Skip Scan

Allows using multi-column B-tree indexes even when prefix columns are missing from WHERE clause.

**Traditional Problem:**

```sql
-- Index on (status, created_at)
CREATE INDEX idx_orders ON orders(status, created_at);

-- This uses the index (v17 and v18)
SELECT * FROM orders WHERE status = 'pending' AND created_at > '2025-01-01';

-- This DOESN'T use index in v17
SELECT * FROM orders WHERE created_at > '2025-01-01';
-- Must do full table scan because status is missing!
```

**PostgreSQL 18 Solution:**

```sql
-- Now in v18, this USES the index with skip scan!
SELECT * FROM orders WHERE created_at > '2025-01-01';

-- Skip scan "skips" through distinct status values
-- Much faster than full table scan
```

**How Skip Scan Works:**

1. Finds distinct values of prefix column (status)
2. For each value, scans the index for matching rows
3. Combines results

**When to use:**
- Multi-column indexes
- Queries that don't filter on prefix columns
- Low cardinality prefix columns

**Check if skip scan is used:**

```sql
EXPLAIN SELECT * FROM orders WHERE created_at > '2025-01-01';

-- Look for "Index Skip Scan" in output
```

### 3. Temporal Constraints

Support for constraints over **time ranges** and **date ranges**.

**WITHOUT OVERLAPS** for PRIMARY KEY and UNIQUE:

```sql
-- Prevent overlapping reservations
CREATE TABLE bookings (
  room_id INTEGER,
  booking_period TSRANGE,
  CONSTRAINT no_overlaps
    PRIMARY KEY (room_id, booking_period WITHOUT OVERLAPS)
);

-- This works
INSERT INTO bookings VALUES (101, '[2025-01-01, 2025-01-05)');

-- This fails (overlaps with first booking)
INSERT INTO bookings VALUES (101, '[2025-01-03, 2025-01-07)');
-- ERROR: conflicting key value violates exclusion constraint
```

**PERIOD for FOREIGN KEY**:

```sql
-- Employee must exist during project period
CREATE TABLE projects (
  employee_id INTEGER,
  project_period TSRANGE,
  CONSTRAINT employee_exists_during_project
    FOREIGN KEY (employee_id, PERIOD project_period)
    REFERENCES employees (id, PERIOD employment_period)
);
```

**Real-world use cases:**
- Hotel bookings (no overlapping room reservations)
- Employee schedules (no double-booking)
- Conference rooms
- Equipment rentals
- Appointment scheduling

### 4. uuidv7() Function

Generate **timestamp-ordered UUIDs**:

```sql
-- Old way (random UUIDs)
SELECT gen_random_uuid();
-- Output: a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11

-- New way (time-ordered UUIDs)
SELECT uuidv7();
-- Output: 018d3f4c-5c7e-7000-8000-000000000000
--         ^^^^^^^^ - timestamp prefix
```

**Why UUIDv7?**

| UUIDv4 (Random) | UUIDv7 (Time-ordered) |
|----------------|---------------------|
| Random order | Chronological order |
| Poor index performance | Excellent index performance |
| No temporal info | Sortable by time |

**Benefits:**
- Better B-tree index performance
- Sortable by creation time
- Compatible with existing UUID columns
- Standard RFC draft

**Usage:**

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuidv7(),
  event_type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- IDs are naturally ordered by insertion time
SELECT id FROM events ORDER BY id;
```

### 5. Virtual Generated Columns (Default)

Generated columns now **compute on read** instead of storing values:

```sql
-- In PostgreSQL 18, this is VIRTUAL by default
CREATE TABLE products (
  price NUMERIC(10, 2),
  tax_rate NUMERIC(3, 2),
  price_with_tax NUMERIC(10, 2) GENERATED ALWAYS AS (price * (1 + tax_rate))
);

-- Computed when queried, not stored!
SELECT price_with_tax FROM products;
```

**Virtual vs Stored:**

| Virtual (v18 default) | Stored (v17 default) |
|---------------------|------------------|
| Computed on read | Computed on write |
| No storage space | Uses disk space |
| Always current | Can be stale |
| Slightly slower reads | Faster reads |

**When to use STORED:**

```sql
-- Use STORED if:
-- 1. Column queried frequently
-- 2. Computation is expensive
-- 3. Need to index the column
CREATE TABLE products (
  price NUMERIC(10, 2),
  discount NUMERIC(10, 2),
  final_price NUMERIC(10, 2)
    GENERATED ALWAYS AS (price - discount) STORED
);

CREATE INDEX idx_final_price ON products(final_price);
```

### 6. OAuth Authentication Support

Native OAuth 2.0 authentication:

```sql
-- Configure OAuth provider
CREATE SERVER oauth_server
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (
    oauth_provider 'google',
    oauth_client_id 'your-client-id'
  );
```

**Benefits:**
- Native integration with OAuth providers
- No external authentication service needed
- Works with Google, Azure AD, Okta, etc.

### 7. OLD and NEW in RETURNING

Access both old and new values in RETURNING clause:

```sql
-- See before and after values in UPDATE
UPDATE products
  SET price = price * 1.10
  WHERE category = 'electronics'
  RETURNING
    OLD.price AS old_price,
    NEW.price AS new_price,
    NEW.price - OLD.price AS increase;

-- Output:
-- old_price | new_price | increase
-- 100.00    | 110.00    | 10.00
-- 50.00     | 55.00     | 5.00
```

**Works with:**
- INSERT (only NEW)
- UPDATE (both OLD and NEW)
- DELETE (only OLD)
- MERGE (both OLD and NEW)

### 8. JSON Features

#### JSON_TABLE Improvements

```sql
-- Convert JSON array to table
SELECT *
FROM JSON_TABLE(
  '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]',
  '$[*]' COLUMNS(
    name TEXT PATH '$.name',
    age INTEGER PATH '$.age'
  )
);

-- Output:
--  name  | age
-- -------+-----
--  John  | 30
--  Jane  | 25
```

#### JSON Subscripting

```sql
-- Array-like access to JSON
SELECT data['users'][0]['name']
FROM json_data;
```

## Performance Improvements

### Parallel Query Improvements

```sql
-- Better parallelization for:
-- - Aggregates
-- - Window functions
-- - CTEs
-- - Subqueries

SET max_parallel_workers_per_gather = 4;

SELECT category, AVG(price)
FROM products
GROUP BY category;
-- Now uses parallel aggregation more efficiently
```

### Improved COPY Performance

```sql
-- Faster bulk data loading
COPY large_table FROM 'data.csv' WITH (FORMAT csv);

-- v17: 45 seconds
-- v18: 32 seconds (30% faster)
```

### Better Statistics

```sql
-- More accurate query planning
ANALYZE products;

-- Extended statistics for correlated columns
CREATE STATISTICS products_stats (dependencies)
ON category, brand FROM products;
```

## Interview Questions

### Q1: What is the main performance improvement in PostgreSQL 18?

**Answer:**

**Asynchronous I/O (AIO)** is the biggest improvement:
- Issues multiple I/O requests concurrently
- Up to 3x faster sequential scans
- Benefits analytics and data warehouse workloads
- Two implementations: 'worker' (default, all platforms) and 'io_uring' (Linux only)

### Q2: How does skip scan work?

**Answer:**

Skip scan allows using multi-column indexes even when prefix columns are missing:

```sql
-- Index: (status, date)
CREATE INDEX idx ON orders(status, date);

-- v17: Full table scan (status missing)
-- v18: Skip scan (iterate through status values, scan each)
SELECT * FROM orders WHERE date > '2025-01-01';
```

Works by "skipping" through distinct values of prefix columns.

### Q3: What are temporal constraints?

**Answer:**

Constraints over time/date ranges to prevent overlaps:

```sql
-- Prevent double-booking
CREATE TABLE bookings (
  room_id INT,
  period TSRANGE,
  PRIMARY KEY (room_id, period WITHOUT OVERLAPS)
);
```

Perfect for scheduling, bookings, and time-based data.

## Migration Guide

### From PostgreSQL 17 to 18

```sql
-- 1. Backup your database
pg_dump mydatabase > backup.sql

-- 2. Install PostgreSQL 18
-- (Platform-specific)

-- 3. Initialize new cluster
initdb -D /path/to/pg18/data

-- 4. Stop old server
pg_ctl stop -D /path/to/pg17/data

-- 5. Use pg_upgrade
pg_upgrade \
  -b /usr/pgsql-17/bin \
  -B /usr/pgsql-18/bin \
  -d /path/to/pg17/data \
  -D /path/to/pg18/data

-- 6. Start new server
pg_ctl start -D /path/to/pg18/data

-- 7. Test application
-- 8. Run ANALYZE
ANALYZE;
```

## Best Practices for PostgreSQL 18

1. **Enable AIO** - Test `io_uring` on Linux for best performance
2. **Use uuidv7()** - For new UUID columns (better index performance)
3. **Leverage skip scan** - Create multi-column indexes freely
4. **Use temporal constraints** - For time-based data
5. **Default to virtual** - Only use STORED for expensive calculations
6. **Monitor performance** - Use EXPLAIN ANALYZE to see new features in action
7. **Update statistics** - Run ANALYZE after upgrade

## Key Takeaways

- PostgreSQL 18 focuses on **performance** and **developer experience**
- **AIO** provides up to 3x faster I/O operations
- **Skip scan** makes multi-column indexes more useful
- **Temporal constraints** prevent time range overlaps
- **uuidv7()** generates time-ordered UUIDs (better performance)
- **Virtual columns** are now default (compute on read)
- **OAuth support** for native authentication
- **OLD/NEW** in RETURNING for before/after values
- Released September 2025, stable and production-ready
