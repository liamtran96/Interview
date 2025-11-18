---
sidebar_position: 2
---

# Row Level Security (RLS)

## What is Row Level Security?

**Row Level Security (RLS)** is PostgreSQL's built-in feature that provides fine-grained access control at the **row level**. It ensures users can only access data they're authorized to see, enforced at the database level.

:::tip Database-Level Security
RLS policies are enforced in the database, making them immune to client-side bypasses or bugs in application code.
:::

## Why Use RLS?

1. **Security by default** - Database enforces access control
2. **No bypassing** - Can't be circumvented from client
3. **Simplified code** - No need for complex WHERE clauses
4. **Audit trail** - See exactly who accessed what
5. **Multi-tenant** - Perfect for SaaS applications

## Basic RLS Setup

### Step 1: Enable RLS

```sql
-- Enable RLS on table
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

:::warning Default Behavior
When RLS is enabled, **NO ONE** can access the table (even owners) until policies are created!
:::

### Step 2: Create Policies

```sql
-- Allow users to see their own posts
CREATE POLICY "Users can view own posts"
  ON posts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert posts
CREATE POLICY "Users can insert own posts"
  ON posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update their posts
CREATE POLICY "Users can update own posts"
  ON posts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their posts
CREATE POLICY "Users can delete own posts"
  ON posts
  FOR DELETE
  USING (auth.uid() = user_id);
```

## Policy Operations

### FOR Operations

| Operation | Purpose |
|-----------|---------|
| `FOR SELECT` | Read access |
| `FOR INSERT` | Create access |
| `FOR UPDATE` | Modify access |
| `FOR DELETE` | Remove access |
| `FOR ALL` | All operations |

### USING vs WITH CHECK

- **USING** - Which rows are visible to user (for SELECT, UPDATE, DELETE)
- **WITH CHECK** - Which rows can be created/modified (for INSERT, UPDATE)

```sql
-- Example: Users can see all posts, but only modify their own
CREATE POLICY "View all, edit own"
  ON posts
  FOR UPDATE
  USING (true)                 -- Can see all posts
  WITH CHECK (auth.uid() = user_id);  -- But can only update own
```

## Common RLS Patterns

### 1. User-Owned Data

```sql
-- Users can only access their own data
CREATE POLICY "Users own data"
  ON profiles
  FOR ALL
  USING (auth.uid() = id);
```

### 2. Public Read, Private Write

```sql
-- Everyone can read, only owner can write
CREATE POLICY "Public read"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Owner write"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner update"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Owner delete"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);
```

### 3. Team/Organization Access

```sql
-- Users in same organization can see each other's data
CREATE POLICY "Team access"
  ON documents
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id
      FROM user_organizations
      WHERE user_id = auth.uid()
    )
  );
```

### 4. Role-Based Access

```sql
-- Admin can see all, users see their own
CREATE POLICY "Role based access"
  ON posts
  FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.uid() = user_id
  );
```

### 5. Status-Based Access

```sql
-- Published posts are public, drafts are private
CREATE POLICY "Published posts public"
  ON posts
  FOR SELECT
  USING (
    status = 'published' OR
    (status = 'draft' AND auth.uid() = user_id)
  );
```

## Advanced Patterns

### Multi-Tenant SaaS

```sql
-- Tenant isolation
CREATE POLICY "Tenant isolation"
  ON orders
  FOR ALL
  USING (
    tenant_id = (
      SELECT tenant_id
      FROM users
      WHERE id = auth.uid()
    )
  );
```

### Hierarchical Permissions

```sql
-- Manager sees team data, user sees own data
CREATE POLICY "Hierarchical access"
  ON tasks
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    auth.uid() IN (
      SELECT manager_id
      FROM team_members
      WHERE user_id = tasks.user_id
    )
  );
```

### Time-Based Access

```sql
-- Access expires after certain time
CREATE POLICY "Time limited access"
  ON temporary_shares
  FOR SELECT
  USING (
    shared_with_user_id = auth.uid() AND
    expires_at > NOW()
  );
```

### Content Sharing

```sql
-- Owner + explicitly shared users can access
CREATE POLICY "Owner and shared users"
  ON documents
  FOR SELECT
  USING (
    owner_id = auth.uid() OR
    id IN (
      SELECT document_id
      FROM document_shares
      WHERE user_id = auth.uid()
    )
  );
```

## Helper Functions

### auth.uid()

Returns current user's ID:

```sql
SELECT auth.uid();  -- Returns UUID of current user
```

### auth.jwt()

Returns JWT claims as JSON:

```sql
-- Access custom claims
SELECT auth.jwt() ->> 'email';
SELECT auth.jwt() ->> 'role';
SELECT auth.jwt() -> 'app_metadata' ->> 'subscription';
```

### auth.role()

Returns current database role:

```sql
SELECT auth.role();  -- Returns 'authenticated', 'anon', etc.
```

## Testing RLS Policies

### Test as specific user

```sql
-- Switch to user role
SET ROLE authenticated;
SET request.jwt.claim.sub = 'user-uuid-here';

-- Test query
SELECT * FROM posts;

-- Reset
RESET ROLE;
```

### Test with Supabase Client

```javascript
// Test as authenticated user
const { data, error } = await supabase
  .from('posts')
  .select('*')

console.log(data)  // Only returns posts user can see per RLS
```

## Common Pitfalls

### 1. Forgetting to Enable RLS

```sql
-- ❌ Table without RLS - Anyone can access!
CREATE TABLE posts (...);

-- ✅ Always enable RLS
CREATE TABLE posts (...);
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
```

### 2. Overly Permissive Policies

```sql
-- ❌ BAD - Allows access to all rows!
CREATE POLICY "Too permissive"
  ON sensitive_data
  FOR ALL
  USING (true);

-- ✅ GOOD - Properly restricted
CREATE POLICY "Restricted"
  ON sensitive_data
  FOR ALL
  USING (auth.uid() = user_id);
```

### 3. Performance Issues

```sql
-- ❌ SLOW - Subquery in every check
CREATE POLICY "Slow policy"
  ON posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM complex_join_table WHERE ...
    )
  );

-- ✅ FAST - Use indexed columns
CREATE POLICY "Fast policy"
  ON posts FOR SELECT
  USING (user_id = auth.uid());
-- Make sure user_id is indexed!
```

### 4. Forgetting WITH CHECK

```sql
-- ❌ Can bypass on INSERT
CREATE POLICY "Missing WITH CHECK"
  ON posts FOR INSERT
  USING (auth.uid() = user_id);  -- Wrong clause!

-- ✅ Correct
CREATE POLICY "Proper INSERT policy"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## RLS with Real-time

RLS works with Supabase Real-time:

```javascript
// Only receives changes user can see per RLS
const channel = supabase
  .channel('posts-channel')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      // User only gets updates for posts they have RLS access to
      console.log(payload)
    }
  )
  .subscribe()
```

## Performance Optimization

### 1. Index Policy Columns

```sql
-- Add index on columns used in RLS policies
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_organization_id ON posts(organization_id);
```

### 2. Simplify Policy Logic

```sql
-- ❌ Complex subquery
CREATE POLICY "Complex"
  ON posts FOR SELECT
  USING (
    user_id IN (
      SELECT user_id FROM teams WHERE team_id IN (
        SELECT team_id FROM user_teams WHERE user_id = auth.uid()
      )
    )
  );

-- ✅ Denormalize if possible
-- Add team_id column to posts, then:
CREATE POLICY "Simple"
  ON posts FOR SELECT
  USING (team_id IN (
    SELECT team_id FROM user_teams WHERE user_id = auth.uid()
  ));
```

### 3. Use Function for Complex Logic

```sql
-- Create function for reusable logic
CREATE FUNCTION user_has_access(resource_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM permissions
    WHERE user_id = auth.uid() AND resource_id = $1
  );
$$ LANGUAGE SQL SECURITY DEFINER;

-- Use in policy
CREATE POLICY "Function based"
  ON documents FOR SELECT
  USING (user_has_access(id));
```

## Bypassing RLS (Service Role)

```javascript
// ⚠️ DANGER: Bypasses ALL RLS policies
// Only use on server-side!
const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey  // Service role key
)

// This query bypasses RLS
const { data } = await supabaseAdmin
  .from('posts')
  .select('*')  // Returns ALL posts, ignoring RLS
```

:::danger Service Role Key
NEVER expose service role key to client! It bypasses all RLS policies.
:::

## Interview Questions

### Q1: What's the difference between USING and WITH CHECK?

**Answer:**

- **USING** - Which existing rows are visible/accessible
- **WITH CHECK** - Which new/modified rows are allowed

```sql
-- Example: See all posts, but only edit own
CREATE POLICY "See all, edit own"
  ON posts FOR UPDATE
  USING (true)                    -- Can see all posts
  WITH CHECK (auth.uid() = user_id);  -- But can only save if owns it
```

### Q2: How do you test RLS policies?

**Answer:**

1. **SQL**: Use `SET ROLE` and `SET request.jwt.claim.sub`
2. **Client**: Test with real authenticated users
3. **Automated**: Create test users and verify access

```sql
-- Test as specific user
SET ROLE authenticated;
SET request.jwt.claim.sub = 'user-uuid';
SELECT * FROM posts;  -- See what this user sees
RESET ROLE;
```

### Q3: Can RLS impact performance?

**Answer:**

Yes, if policies are complex or columns aren't indexed:

**Solutions:**
1. **Index policy columns** - Especially foreign keys
2. **Simplify logic** - Avoid nested subqueries
3. **Denormalize** - Add redundant columns if needed
4. **Cache results** - Use materialized views for complex checks

## Best Practices

1. **Always enable RLS** on tables with sensitive data
2. **Test policies thoroughly** with different users
3. **Index columns** used in policy conditions
4. **Keep policies simple** for better performance
5. **Use functions** for complex reusable logic
6. **Never expose service role key** to client
7. **Document policies** - Comment why each exists
8. **Monitor performance** - Use EXPLAIN ANALYZE

## Key Takeaways

- RLS provides database-level row access control
- Enabled with `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- USING clause filters which rows are visible
- WITH CHECK validates new/modified rows
- Works seamlessly with Supabase Real-time
- auth.uid() returns current authenticated user
- Service role key bypasses ALL policies (server-only!)
- Index columns used in policies for performance
- Test policies thoroughly before production
