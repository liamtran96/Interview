---
sidebar_position: 1
---

# PostgreSQL Fundamentals

## What is PostgreSQL?

PostgreSQL is a powerful, open-source **object-relational database system** (ORDBMS) with over 35 years of active development. It's known for reliability, feature robustness, and performance.

:::info Latest Version
This guide covers **PostgreSQL 18** (released November 2025) with new features like async I/O, skip scans, and temporal constraints.
:::

## Key Features

### 1. ACID Compliance

PostgreSQL is fully **ACID compliant**, ensuring data integrity:

| Property | Description |
|----------|-------------|
| **Atomicity** | All operations in a transaction complete or none do |
| **Consistency** | Database remains in a valid state |
| **Isolation** | Concurrent transactions don't interfere |
| **Durability** | Committed data is permanently stored |

### 2. Advanced Data Types

```sql
-- Traditional types
INT, VARCHAR, BOOLEAN, TIMESTAMP

-- Advanced types
JSON, JSONB, ARRAY, HSTORE, UUID, INET, CIDR

-- Custom types
CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');
```

### 3. Extensible

- Custom functions, operators, data types
- Foreign Data Wrappers (FDW)
- Extensions (PostGIS, pgcrypto, etc.)

## Common Interview Questions (Beginner)

### Q1: What is PostgreSQL and why use it?

**Answer:**

PostgreSQL is an advanced open-source relational database that supports both SQL (relational) and JSON (non-relational) querying.

**Key Benefits:**
- **ACID compliant** - Guarantees data integrity
- **Advanced features** - Full-text search, JSON support, window functions
- **Extensible** - Custom types, functions, operators
- **Standards compliant** - Follows SQL standards closely
- **Reliable** - Battle-tested for 35+ years
- **Free and open-source** - No licensing costs

**Use PostgreSQL when:**
- Need strong data integrity
- Complex queries required
- Supporting both relational and JSON data
- Require advanced features (CTEs, window functions, etc.)
- Building scalable applications

### Q2: What are the main data types in PostgreSQL?

**Answer:**

**Numeric Types:**
- `INTEGER`, `BIGINT`, `SMALLINT` - Whole numbers
- `NUMERIC(precision, scale)`, `DECIMAL` - Exact decimals
- `REAL`, `DOUBLE PRECISION` - Floating point

**Character Types:**
- `VARCHAR(n)` - Variable-length with limit
- `CHAR(n)` - Fixed-length, padded
- `TEXT` - Unlimited length

**Date/Time Types:**
- `DATE` - Date only
- `TIME` - Time only
- `TIMESTAMP` - Date and time
- `INTERVAL` - Time span

**Boolean:**
- `BOOLEAN` - TRUE, FALSE, NULL

**Advanced Types:**
```sql
-- JSON
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  data JSONB -- Faster than JSON, supports indexing
);

-- Array
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  tags TEXT[] -- Array of text
);

-- UUID
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);
```

### Q3: What's the difference between VARCHAR, CHAR, and TEXT?

**Answer:**

| Type | Storage | Padding | Use Case |
|------|---------|---------|----------|
| `CHAR(n)` | Fixed length | Space-padded | Fixed-size codes (country codes) |
| `VARCHAR(n)` | Variable length | No padding | Limited-length strings |
| `TEXT` | Variable length | No padding | Unlimited text |

```sql
-- Examples
CREATE TABLE examples (
  country_code CHAR(2),      -- Always 2 chars: 'US', 'UK'
  username VARCHAR(50),       -- Up to 50 chars
  bio TEXT                    -- Unlimited length
);
```

**Performance:** In PostgreSQL, `VARCHAR` and `TEXT` have nearly identical performance. Use `TEXT` unless you need to enforce a length limit.

## Basic CRUD Operations

### Create (INSERT)

```sql
-- Insert single row
INSERT INTO users (name, email, age)
VALUES ('John Doe', 'john@example.com', 30);

-- Insert multiple rows
INSERT INTO users (name, email, age)
VALUES
  ('Alice', 'alice@example.com', 25),
  ('Bob', 'bob@example.com', 35);

-- Insert and return inserted data
INSERT INTO users (name, email)
VALUES ('Charlie', 'charlie@example.com')
RETURNING id, name, created_at;
```

### Read (SELECT)

```sql
-- Select all
SELECT * FROM users;

-- Select specific columns
SELECT id, name, email FROM users;

-- With conditions
SELECT * FROM users
WHERE age >= 25 AND status = 'active';

-- Ordering
SELECT * FROM users
ORDER BY created_at DESC
LIMIT 10;

-- Aggregations
SELECT COUNT(*), AVG(age), MAX(age)
FROM users
WHERE age >= 18;
```

### Update (UPDATE)

```sql
-- Update single record
UPDATE users
SET email = 'newemail@example.com'
WHERE id = 1;

-- Update multiple records
UPDATE users
SET status = 'inactive'
WHERE last_login < NOW() - INTERVAL '1 year';

-- Update and return
UPDATE users
SET updated_at = NOW()
WHERE id = 1
RETURNING *;
```

### Delete (DELETE)

```sql
-- Delete specific records
DELETE FROM users
WHERE status = 'deleted';

-- Delete with subquery
DELETE FROM users
WHERE id IN (
  SELECT user_id FROM banned_users
);

-- Delete and return
DELETE FROM users
WHERE id = 1
RETURNING *;
```

## Constraints

### Primary Key

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
  email VARCHAR(255) UNIQUE NOT NULL
);
```

### Foreign Key

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE  -- Delete posts when user is deleted
);
```

### Check Constraint

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  price NUMERIC(10, 2) CHECK (price > 0),
  discount_percent INTEGER CHECK (discount_percent BETWEEN 0 AND 100)
);
```

### Unique Constraint

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  username VARCHAR(50) UNIQUE
);
```

### NOT NULL

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## Joins

### INNER JOIN

```sql
-- Get users with their posts
SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id;
```

### LEFT JOIN

```sql
-- Get all users, even without posts
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name;
```

### RIGHT JOIN

```sql
-- Get all posts, even if user deleted
SELECT p.title, u.name
FROM users u
RIGHT JOIN posts p ON u.id = p.user_id;
```

### FULL OUTER JOIN

```sql
-- Get all users and all posts
SELECT u.name, p.title
FROM users u
FULL OUTER JOIN posts p ON u.id = p.user_id;
```

## Aggregate Functions

```sql
-- Count, Sum, Avg, Min, Max
SELECT
  COUNT(*) as total_users,
  COUNT(DISTINCT country) as countries,
  AVG(age) as avg_age,
  MIN(created_at) as first_user,
  MAX(created_at) as last_user
FROM users;

-- GROUP BY
SELECT country, COUNT(*) as user_count
FROM users
GROUP BY country
HAVING COUNT(*) > 10
ORDER BY user_count DESC;
```

## Transactions

```sql
-- Begin transaction
BEGIN;

-- Multiple operations
INSERT INTO accounts (user_id, balance)
VALUES (1, 1000);

UPDATE accounts
SET balance = balance - 100
WHERE user_id = 1;

UPDATE accounts
SET balance = balance + 100
WHERE user_id = 2;

-- Commit (make permanent)
COMMIT;

-- Or rollback (undo all changes)
ROLLBACK;
```

## Best Practices

1. **Use PRIMARY KEY** on all tables
2. **Create indexes** on frequently queried columns
3. **Use FOREIGN KEY constraints** for referential integrity
4. **Use transactions** for multiple related operations
5. **Normalize data** to reduce redundancy
6. **Use EXPLAIN ANALYZE** to optimize queries
7. **Regular VACUUM** and ANALYZE for maintenance
8. **Use connection pooling** in applications

## PostgreSQL vs MySQL

| Feature | PostgreSQL | MySQL |
|---------|-----------|-------|
| **ACID Compliance** | Full | Depends on engine (InnoDB yes) |
| **Data Types** | More advanced (JSON, Array, etc.) | Basic types |
| **Standards Compliance** | Strict SQL standards | Less strict |
| **Full-Text Search** | Built-in | Basic |
| **JSON Support** | Excellent (JSONB) | Good |
| **Window Functions** | Full support | Limited |
| **CTEs** | Recursive supported | Limited |
| **Performance** | Excellent for complex queries | Fast for simple reads |

## Key Takeaways

- PostgreSQL is a powerful, ACID-compliant relational database
- Supports advanced data types (JSON, arrays, UUIDs, etc.)
- Full SQL standard compliance
- Excellent for complex queries and data integrity
- Highly extensible and customizable
- Free and open-source
- Latest version (18) adds async I/O, skip scans, temporal constraints
