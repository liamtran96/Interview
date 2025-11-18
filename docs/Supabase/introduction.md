---
sidebar_position: 1
---

# Supabase Fundamentals

## What is Supabase?

Supabase is an **open-source Firebase alternative** built on PostgreSQL. It provides a complete backend-as-a-service (BaaS) with real-time databases, authentication, storage, and serverless functions.

:::info Official Tagline
"The open source Firebase alternative. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings."
:::

## Core Features

### 1. PostgreSQL Database

Every Supabase project includes a **full PostgreSQL database**:

```sql
-- Create table with RLS
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Users can view their own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);
```

### 2. Auto-Generated APIs

Supabase automatically generates a **RESTful API** from your database schema:

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Select
const { data, error } = await supabase
  .from('posts')
  .select('*')

// Insert
const { data, error } = await supabase
  .from('posts')
  .insert({ title: 'Hello', content: 'World' })

// Update
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated' })
  .eq('id', postId)

// Delete
const { data, error } = await supabase
  .from('posts')
  .delete()
  .eq('id', postId)
```

### 3. Authentication

Built-in authentication with multiple providers:

```javascript
// Email/Password signup
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Magic link (passwordless)
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com'
})

// OAuth (Google, GitHub, etc.)
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()

// Sign out
await supabase.auth.signOut()
```

### 4. Real-time Subscriptions

Listen to database changes in real-time:

```javascript
// Subscribe to INSERT events
const channel = supabase
  .channel('posts-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('New post:', payload.new)
    }
  )
  .subscribe()

// Subscribe to all changes
supabase
  .channel('all-changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Change:', payload)
    }
  )
  .subscribe()

// Unsubscribe
channel.unsubscribe()
```

### 5. Storage

File storage with CDN and image transformations:

```javascript
// Upload file
const { data, error } = await supabase
  .storage
  .from('avatars')
  .upload('public/avatar1.png', file)

// Download file
const { data, error } = await supabase
  .storage
  .from('avatars')
  .download('public/avatar1.png')

// Get public URL
const { data } = supabase
  .storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png')

// Image transformation
const { data } = supabase
  .storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png', {
    transform: {
      width: 200,
      height: 200,
      resize: 'cover'
    }
  })
```

### 6. Edge Functions

Serverless TypeScript functions powered by Deno:

```typescript
// supabase/functions/hello/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  const { name } = await req.json()

  return new Response(
    JSON.stringify({ message: `Hello ${name}!` }),
    { headers: { 'Content-Type': 'application/json' } }
  )
})
```

```javascript
// Call from client
const { data, error } = await supabase.functions.invoke('hello', {
  body: { name: 'World' }
})
```

## Common Interview Questions

### Q1: What is Supabase and how does it differ from Firebase?

**Answer:**

| Feature | Supabase | Firebase |
|---------|----------|----------|
| **Database** | PostgreSQL (SQL) | Firestore (NoSQL) |
| **Open Source** | Yes | No |
| **Self-Hosting** | Yes | No |
| **Query Language** | SQL | Custom queries |
| **Real-time** | PostgreSQL triggers | Native |
| **Pricing** | More predictable | Can be expensive |
| **Vendor Lock-in** | Low (standard Postgres) | High |

**Key Difference:** Supabase uses PostgreSQL, giving you the full power of SQL, relations, joins, and standard database features.

### Q2: What is Row Level Security (RLS)?

**Answer:**

**Row Level Security** is PostgreSQL's built-in feature that restricts which rows users can access based on policies.

```sql
-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own posts
CREATE POLICY "Users see own posts"
  ON posts FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can only insert their own posts
CREATE POLICY "Users insert own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can only update their own posts
CREATE POLICY "Users update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can only delete their own posts
CREATE POLICY "Users delete own posts"
  ON posts FOR DELETE
  USING (auth.uid() = user_id);
```

**Why it matters:** RLS provides database-level security, ensuring data protection even if client-side code has bugs.

### Q3: How does Supabase Real-time work?

**Answer:**

Supabase Real-time uses PostgreSQL's **replication** features:

1. **Database Changes** → PostgreSQL triggers
2. **WAL (Write-Ahead Log)** → Change detection
3. **Broadcast** → WebSocket to subscribed clients
4. **RLS Enforcement** → Only sends data user can access

```javascript
// Real-time with RLS
const channel = supabase
  .channel('my-channel')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `room_id=eq.${roomId}` // Filter in subscription
    },
    (payload) => {
      // Only receives messages from this room
      // AND that user has RLS permission to see
      console.log(payload.new)
    }
  )
  .subscribe()
```

## Setting Up Supabase

### 1. Create Project

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Init project
supabase init

# Start local development
supabase start
```

### 2. Connect from Client

```bash
npm install @supabase/supabase-js
```

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### 3. TypeScript Types

```bash
# Generate TypeScript types from database
npx supabase gen types typescript --project-id your-project-id > types/supabase.ts
```

```typescript
import { Database } from './types/supabase'

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Now you have full type safety!
const { data, error } = await supabase
  .from('posts')
  .select('*')
// data is typed as Database['public']['Tables']['posts']['Row'][]
```

## Authentication Patterns

### Server-Side Auth (Next.js)

```typescript
// app/api/protected/route.ts
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return Response.json({ user })
}
```

### Protected Route Pattern

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if not authenticated
  if (!user && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}
```

## Storage Patterns

### File Upload with Progress

```javascript
const { data, error } = await supabase
  .storage
  .from('documents')
  .upload('folder/file.pdf', file, {
    onUploadProgress: (progress) => {
      console.log(`${progress.loaded}/${progress.total}`)
    }
  })
```

### Resumable Uploads (Large Files)

```javascript
const { data, error } = await supabase
  .storage
  .from('videos')
  .upload('large-video.mp4', file, {
    cacheControl: '3600',
    upsert: false,
    duplex: 'half' // Enables resumable uploads
  })
```

### Storage with RLS

```sql
-- Enable RLS on storage
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Users can only upload to their own folder
CREATE POLICY "Users upload to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Users can only read their own files
CREATE POLICY "Users read own files"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
```

## Best Practices

1. **Always enable RLS** - Never trust client-side security
2. **Use service role key carefully** - Only on server, bypasses RLS
3. **Type your database** - Generate TypeScript types
4. **Use Edge Functions** - For complex business logic
5. **Optimize queries** - Use indexes, select only needed columns
6. **Handle errors properly** - Check error object
7. **Use connection pooling** - For serverless environments
8. **Regular backups** - Enable automatic backups

## Common Patterns

### CRUD with RLS

```javascript
// Create with user_id automatically set
const { data, error } = await supabase
  .from('posts')
  .insert({
    title: 'My Post',
    content: 'Content here'
    // user_id is set automatically via RLS policy
  })

// Read with RLS filtering
const { data, error } = await supabase
  .from('posts')
  .select('*')
  // Only returns posts user can see per RLS

// Update with RLS check
const { data, error } = await supabase
  .from('posts')
  .update({ title: 'Updated' })
  .eq('id', postId)
  // Only updates if user owns post per RLS
```

### Real-time Chat

```javascript
// Subscribe to new messages
const channel = supabase
  .channel('room-1')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: 'room_id=eq.1'
    },
    (payload) => {
      setMessages(prev => [...prev, payload.new])
    }
  )
  .subscribe()

// Send message
const sendMessage = async (text) => {
  await supabase
    .from('messages')
    .insert({
      room_id: 1,
      text,
      user_id: user.id
    })
}
```

## Key Takeaways

- Supabase is an open-source Firebase alternative built on PostgreSQL
- Every feature is backed by PostgreSQL (database, auth, storage)
- Row Level Security provides database-level access control
- Real-time uses PostgreSQL replication and respects RLS
- Edge Functions run on Deno for serverless TypeScript
- Auto-generated APIs from database schema
- Full TypeScript support with generated types
- Self-hostable and no vendor lock-in
