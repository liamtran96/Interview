---
sidebar_position: 3
---

# Next.js Routing and Data Fetching

## Introduction

Next.js provides a **file-system based router** where the folder structure in your project defines your routes. With Next.js 16, the App Router (using the `app/` directory) is the modern, recommended approach.

:::info Next.js 16
This guide covers Next.js 16 with the App Router, Server Components, and React 19.2 features.
:::

## App Router Basics

### File-System Routing

```
app/
├── page.tsx                 # / (home)
├── about/
│   └── page.tsx            # /about
├── blog/
│   ├── page.tsx            # /blog
│   └── [slug]/
│       └── page.tsx        # /blog/[slug] (dynamic)
├── dashboard/
│   ├── layout.tsx          # Shared layout
│   ├── page.tsx            # /dashboard
│   ├── settings/
│   │   └── page.tsx        # /dashboard/settings
│   └── analytics/
│       └── page.tsx        # /dashboard/analytics
└── api/
    └── users/
        └── route.ts        # API route: /api/users
```

### Special Files

| File | Purpose |
|------|---------|
| `page.tsx` | Page UI (publicly accessible route) |
| `layout.tsx` | Shared layout for segment and children |
| `loading.tsx` | Loading UI (Suspense boundary) |
| `error.tsx` | Error UI (Error boundary) |
| `not-found.tsx` | 404 UI |
| `route.ts` | API endpoint |
| `template.tsx` | Re-rendered layout |
| `default.tsx` | Parallel routes fallback |

## Pages

### Basic Page

```tsx
// app/page.tsx (Home page)
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js 16</h1>
      <p>This is the home page</p>
    </div>
  );
}
```

### Page with Params

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  // Next.js 16: Must await params
  const { slug } = await params;

  return (
    <div>
      <h1>Blog Post: {slug}</h1>
    </div>
  );
}
```

### Page with Search Params

```tsx
// app/search/page.tsx
export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  // Next.js 16: Must await searchParams
  const { q, page } = await searchParams;

  return (
    <div>
      <h1>Search Results</h1>
      <p>Query: {q || 'No query'}</p>
      <p>Page: {page || '1'}</p>
    </div>
  );
}
```

## Layouts

### Root Layout (Required)

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>© 2025 My App</footer>
      </body>
    </html>
  );
}
```

### Nested Layouts

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard">
      <aside>
        <nav>
          <a href="/dashboard">Overview</a>
          <a href="/dashboard/settings">Settings</a>
          <a href="/dashboard/analytics">Analytics</a>
        </nav>
      </aside>
      <div className="content">{children}</div>
    </div>
  );
}
```

**Layouts are shared** across all pages in that segment and remain mounted during navigation.

## Dynamic Routes

### Single Dynamic Segment

```tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <h1>Post: {slug}</h1>;
}

// Matches:
// /blog/hello-world
// /blog/nextjs-tutorial
```

### Multiple Dynamic Segments

```tsx
// app/blog/[category]/[slug]/page.tsx
export default async function BlogPost({
  params
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params;

  return (
    <div>
      <p>Category: {category}</p>
      <h1>Post: {slug}</h1>
    </div>
  );
}

// Matches:
// /blog/tech/nextjs-tutorial
// /blog/design/ui-patterns
```

### Catch-All Segments

```tsx
// app/docs/[...slug]/page.tsx
export default async function DocsPage({
  params
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params;

  return (
    <div>
      <h1>Docs: {slug.join('/')}</h1>
    </div>
  );
}

// Matches:
// /docs/getting-started
// /docs/api/routes/introduction
// /docs/guides/authentication/oauth
```

### Optional Catch-All

```tsx
// app/shop/[[...categories]]/page.tsx
export default async function ShopPage({
  params
}: {
  params: Promise<{ categories?: string[] }>
}) {
  const { categories } = await params;

  return (
    <div>
      <h1>Shop</h1>
      {categories ? (
        <p>Categories: {categories.join(' > ')}</p>
      ) : (
        <p>All Products</p>
      )}
    </div>
  );
}

// Matches:
// /shop (categories = undefined)
// /shop/electronics
// /shop/electronics/phones
```

## Navigation

### Link Component

```tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* Basic link */}
      <Link href="/">Home</Link>

      {/* Dynamic link */}
      <Link href="/blog/nextjs-tutorial">Read Post</Link>

      {/* With query params */}
      <Link href="/search?q=nextjs&page=1">Search</Link>

      {/* Programmatic navigation */}
      <Link href={{
        pathname: '/search',
        query: { q: 'nextjs', page: 1 }
      }}>
        Search
      </Link>

      {/* Prefetch (default: true) */}
      <Link href="/about" prefetch={false}>About</Link>

      {/* Replace history */}
      <Link href="/login" replace>Login</Link>

      {/* External link */}
      <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
        Next.js
      </Link>
    </nav>
  );
}
```

### useRouter Hook (Client Component)

```tsx
'use client';

import { useRouter } from 'next/navigation';

export default function NavigationButtons() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>

      <button onClick={() => router.back()}>
        Go Back
      </button>

      <button onClick={() => router.forward()}>
        Go Forward
      </button>

      <button onClick={() => router.refresh()}>
        Refresh
      </button>

      {/* With options */}
      <button onClick={() => router.push('/blog/123', { scroll: false })}>
        Navigate without scrolling
      </button>
    </div>
  );
}
```

### Redirect

```tsx
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <div>Profile Page</div>;
}
```

## Server Components vs Client Components

### Server Components (Default)

**Server Components** render on the server and send HTML to the client.

```tsx
// app/posts/page.tsx (Server Component by default)
export default async function PostsPage() {
  // Can directly access backend resources
  const posts = await db.posts.findMany();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

**Benefits:**
- ✅ Direct database/API access
- ✅ Zero client JavaScript
- ✅ Better SEO
- ✅ Faster initial load
- ✅ Secure (secrets don't leak to client)

**Limitations:**
- ❌ No hooks (useState, useEffect, etc.)
- ❌ No browser APIs
- ❌ No event handlers

### Client Components

**Client Components** render on the client and enable interactivity.

```tsx
'use client';  // Must add this directive

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Use Client Components for:**
- ✅ Interactivity (onClick, onChange, etc.)
- ✅ State (useState, useReducer)
- ✅ Effects (useEffect, useLayoutEffect)
- ✅ Browser APIs (localStorage, window, etc.)
- ✅ Custom hooks

### Composing Server and Client Components

```tsx
// app/dashboard/page.tsx (Server Component)
import ClientCounter from './ClientCounter';
import ServerStats from './ServerStats';

export default async function DashboardPage() {
  const stats = await fetchStats();

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Server Component */}
      <ServerStats stats={stats} />

      {/* Client Component */}
      <ClientCounter />
    </div>
  );
}
```

**Best Practice:** Keep Client Components as small and deep as possible.

```tsx
// ❌ Bad: Entire page is Client Component
'use client';

export default function Page() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />  {/* Doesn't need to be client */}
      <Counter count={count} setCount={setCount} />
      <Footer />  {/* Doesn't need to be client */}
    </div>
  );
}

// ✓ Good: Only interactive part is Client Component
// page.tsx (Server Component)
export default function Page() {
  return (
    <div>
      <Header />
      <ClientCounter />
      <Footer />
    </div>
  );
}

// ClientCounter.tsx
'use client';
export default function ClientCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

## Data Fetching

### Server Component Data Fetching

```tsx
// app/posts/page.tsx
export default async function PostsPage() {
  // Direct async/await in Server Component
  const response = await fetch('https://api.example.com/posts');
  const posts = await response.json();

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
    </div>
  );
}
```

### Fetch with Caching

```tsx
// Cached by default (revalidate every hour)
const response = await fetch('https://api.example.com/posts', {
  next: { revalidate: 3600 }
});

// No caching
const response = await fetch('https://api.example.com/posts', {
  cache: 'no-store'
});

// Force cache
const response = await fetch('https://api.example.com/posts', {
  cache: 'force-cache'
});
```

### Parallel Data Fetching

```tsx
export default async function Page() {
  // ❌ Sequential (slow)
  const user = await fetchUser();
  const posts = await fetchPosts();
  const comments = await fetchComments();

  // ✓ Parallel (fast)
  const [user, posts, comments] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);

  return <div>...</div>;
}
```

### Client-Side Data Fetching

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.example.com/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Using SWR (Recommended for Client-Side)

```tsx
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function PostsList() {
  const { data, error, isLoading } = useSWR('/api/posts', fetcher, {
    refreshInterval: 3000,  // Refresh every 3 seconds
    revalidateOnFocus: true // Revalidate on window focus
  });

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## Static and Dynamic Rendering

### Static Rendering (Default)

```tsx
// app/blog/page.tsx
// Rendered at build time
export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

### Dynamic Rendering

**Triggers:** Using dynamic functions or uncached data fetches

```tsx
import { headers, cookies } from 'next/headers';

export default async function Page() {
  // Using dynamic functions makes route dynamic
  const headersList = await headers();
  const cookieStore = await cookies();

  return <div>Dynamic Page</div>;
}
```

### Force Dynamic

```tsx
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  // Always rendered on each request
  const data = await fetchRealtimeData();

  return <div>{data}</div>;
}
```

### Incremental Static Regeneration (ISR)

```tsx
// app/posts/[id]/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPost(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
```

## Loading and Error States

### Loading UI

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>Loading dashboard...</p>
    </div>
  );
}
```

**Creates Suspense boundary automatically:**
```tsx
<Suspense fallback={<Loading />}>
  <Page />
</Suspense>
```

### Error UI

```tsx
// app/dashboard/error.tsx
'use client';  // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### Not Found UI

```tsx
// app/blog/[slug]/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <h2>Post Not Found</h2>
      <p>Could not find the requested post.</p>
    </div>
  );
}
```

**Trigger not-found:**
```tsx
import { notFound } from 'next/navigation';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPost(slug);

  if (!post) {
    notFound();  // Renders not-found.tsx
  }

  return <article>{post.title}</article>;
}
```

## API Routes

### Basic API Route

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.users.findMany();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.users.create({ data: body });

  return NextResponse.json(user, { status: 201 });
}
```

### Dynamic API Routes

```typescript
// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await db.users.findUnique({ where: { id } });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const user = await db.users.update({ where: { id }, data: body });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await db.users.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
```

### Request Object

```typescript
export async function POST(request: Request) {
  // Get JSON body
  const body = await request.json();

  // Get form data
  const formData = await request.formData();
  const name = formData.get('name');

  // Get headers
  const token = request.headers.get('authorization');

  // Get URL search params
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');

  return NextResponse.json({ success: true });
}
```

## Interview Questions

### Q1: What is the difference between the Pages Router and App Router?

**Answer:**

| Feature | Pages Router (`pages/`) | App Router (`app/`) |
|---------|------------------------|---------------------|
| **Introduced** | Next.js 9 | Next.js 13 |
| **Default** | Legacy | Modern (recommended) |
| **Routing** | File-based | Folder-based |
| **Layouts** | `_app.tsx` | `layout.tsx` (nested) |
| **Data Fetching** | getServerSideProps, getStaticProps | async Server Components |
| **Server Components** | No | Yes |
| **Streaming** | No | Yes (Suspense) |

```tsx
// Pages Router
// pages/blog/[slug].tsx
export async function getServerSideProps({ params }) {
  const post = await fetchPost(params.slug);
  return { props: { post } };
}

export default function BlogPost({ post }) {
  return <article>{post.title}</article>;
}

// App Router
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  return <article>{post.title}</article>;
}
```

**Migration:** Use App Router for new projects, Pages Router is in maintenance mode.

### Q2: What are Server Components and when should you use them?

**Answer:**

**Server Components** render on the server and send HTML to the client (zero client JavaScript).

**Benefits:**
- ✅ Direct backend access (database, APIs)
- ✅ Better performance (smaller bundle)
- ✅ Better SEO (fully rendered HTML)
- ✅ Secure (secrets don't leak)

```tsx
// Server Component (default in App Router)
export default async function UsersList() {
  // Direct database access
  const users = await db.users.findMany();

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

**Use Server Components for:**
- Data fetching
- Direct backend access
- Content rendering
- SEO-critical pages

**Use Client Components for:**
- Interactivity (useState, onClick)
- Browser APIs (localStorage, window)
- Effects (useEffect)
- Third-party interactive libraries

### Q3: What is the difference between static and dynamic rendering?

**Answer:**

**Static Rendering** (default): Pre-rendered at build time, served from CDN.

```tsx
// app/blog/page.tsx
export default async function BlogPage() {
  // Fetched at build time
  const posts = await fetch('https://api.example.com/posts').then(r => r.json());

  return <div>{posts.map(post => <div key={post.id}>{post.title}</div>)}</div>;
}
```

**Dynamic Rendering**: Rendered on each request.

```tsx
import { cookies, headers } from 'next/headers';

// Automatically dynamic (uses dynamic functions)
export default async function Page() {
  const cookieStore = await cookies();
  const headersList = await headers();

  return <div>Dynamic Page</div>;
}

// Or force dynamic
export const dynamic = 'force-dynamic';
```

| Feature | Static | Dynamic |
|---------|--------|---------|
| **Rendering** | Build time | Request time |
| **Performance** | Fastest (CDN) | Slower |
| **Data freshness** | Stale | Always fresh |
| **Use case** | Blogs, docs | Dashboards, user-specific |

**Hybrid:** Use ISR for best of both worlds.

### Q4: How do you handle authentication in Next.js App Router?

**Answer:**

**Approach 1: Middleware (for global protection)**
```tsx
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*']
};
```

**Approach 2: Server Component (page-level)**
```tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function ProtectedPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('auth-token');

  if (!session) {
    redirect('/login');
  }

  return <div>Protected Content</div>;
}
```

**Approach 3: Server Actions (forms)**
```tsx
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const session = await authenticateUser(email, password);

  if (session) {
    const cookieStore = await cookies();
    cookieStore.set('auth-token', session.token);
    redirect('/dashboard');
  }

  return { error: 'Invalid credentials' };
}
```

### Q5: What is Incremental Static Regeneration (ISR)?

**Answer:**

**ISR** allows you to update static pages after build time without rebuilding the entire site.

```tsx
// app/posts/[id]/page.tsx
export const revalidate = 60; // Revalidate every 60 seconds

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await fetchPost(id);

  return <article>{post.title}</article>;
}
```

**How it works:**
1. **First request**: Serves stale cached page
2. **Background**: Regenerates page
3. **Subsequent requests**: Serve fresh page

**Benefits:**
- ✅ Fast (served from cache)
- ✅ Fresh data (periodic updates)
- ✅ Scalable (no server load)

**On-Demand Revalidation:**
```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const { path } = await request.json();

  revalidatePath(path);
  // or
  revalidateTag('posts');

  return Response.json({ revalidated: true });
}
```

### Q6: How do you optimize data fetching in Next.js?

**Answer:**

**1. Use Server Components (reduce client JavaScript)**
```tsx
// ✓ Server Component - zero client JS
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

**2. Parallel Data Fetching**
```tsx
// ✓ Parallel (fast)
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
]);
```

**3. Caching**
```tsx
// Cache for 1 hour
const response = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 }
});
```

**4. Request Deduplication (automatic)**
```tsx
// These are automatically deduplicated
const user1 = await fetchUser(id);
const user2 = await fetchUser(id); // Uses cached result
```

**5. Streaming with Suspense**
```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

**6. Use SWR for Client-Side**
```tsx
'use client';
import useSWR from 'swr';

export default function Component() {
  const { data } = useSWR('/api/data', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5000
  });
}
```

### Q7: What are Route Handlers (API Routes) in the App Router?

**Answer:**

**Route Handlers** are API endpoints defined in `route.ts` files.

```typescript
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

// GET /api/posts
export async function GET(request: Request) {
  const posts = await db.posts.findMany();
  return NextResponse.json(posts);
}

// POST /api/posts
export async function POST(request: Request) {
  const body = await request.json();
  const post = await db.posts.create({ data: body });
  return NextResponse.json(post, { status: 201 });
}
```

**Dynamic Routes:**
```typescript
// app/api/posts/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await db.posts.findUnique({ where: { id } });
  return NextResponse.json(post);
}
```

**Supported methods:** GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

**vs Server Actions:**
- **Route Handlers**: RESTful APIs, external consumption
- **Server Actions**: Form submissions, component actions

### Q8: How does routing work in Next.js App Router?

**Answer:**

Next.js uses **file-system based routing** in the `app/` directory.

**Basic Routes:**
```
app/
├── page.tsx           → /
├── about/page.tsx     → /about
└── blog/page.tsx      → /blog
```

**Dynamic Routes:**
```
app/blog/[slug]/page.tsx  → /blog/:slug
app/blog/[category]/[slug]/page.tsx  → /blog/:category/:slug
```

**Catch-All Routes:**
```
app/docs/[...slug]/page.tsx  → /docs/*
app/shop/[[...categories]]/page.tsx  → /shop or /shop/*
```

**Route Groups (don't affect URL):**
```
app/(marketing)/about/page.tsx  → /about
app/(app)/dashboard/page.tsx    → /dashboard
```

**Parallel Routes:**
```
app/@modal/login/page.tsx
app/@sidebar/nav/page.tsx
app/page.tsx
```

**Intercepting Routes:**
```
app/(..)photo/[id]/page.tsx  → Intercepts /photo/[id]
```

### Q9: What is the purpose of layout.tsx and how is it different from template.tsx?

**Answer:**

**layout.tsx:**
- Shared UI that **persists** across navigations
- State is **preserved**
- Doesn't re-render on navigation

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />  {/* Persists across /dashboard/* routes */}
      <main>{children}</main>
    </div>
  );
}
```

**template.tsx:**
- Shared UI that **re-renders** on navigation
- State is **reset**
- Creates new instance for each child

```tsx
// app/template.tsx
export default function Template({ children }) {
  return (
    <div>
      <Analytics />  {/* Remounts on every navigation */}
      {children}
    </div>
  );
}
```

| Feature | layout.tsx | template.tsx |
|---------|-----------|--------------|
| **Re-renders** | No | Yes |
| **State** | Preserved | Reset |
| **Use case** | Navigation, shared UI | Analytics, animations |

### Q10: How do you implement prefetching and optimization in Next.js?

**Answer:**

**1. Automatic Prefetching (Link component)**
```tsx
import Link from 'next/link';

// Automatically prefetches on hover/visible
<Link href="/about">About</Link>

// Disable prefetching
<Link href="/about" prefetch={false}>About</Link>
```

**2. Programmatic Prefetching**
```tsx
'use client';
import { useRouter } from 'next/navigation';

export default function Component() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);
}
```

**3. Image Optimization**
```tsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  priority  // Preload (above fold)
  placeholder="blur"  // Show blur while loading
  blurDataURL="..."
/>
```

**4. Font Optimization**
```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

**5. Script Optimization**
```tsx
import Script from 'next/script';

<Script
  src="https://example.com/script.js"
  strategy="lazyOnload"  // or "beforeInteractive" | "afterInteractive"
/>
```

**6. Metadata Optimization**
```tsx
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    images: ['/og-image.jpg']
  }
};
```

## Best Practices

1. **Use Server Components by default** - Add 'use client' only when needed
2. **Keep Client Components small** - Push them as deep as possible in component tree
3. **Use parallel data fetching** - Promise.all() for independent requests
4. **Implement proper loading states** - loading.tsx and Suspense
5. **Handle errors gracefully** - error.tsx for error boundaries
6. **Use ISR for semi-static content** - Balance between static and dynamic
7. **Optimize images and fonts** - Use Next.js built-in components
8. **Implement proper caching** - Use revalidate and cache options
9. **Use Route Handlers for APIs** - Clean separation of concerns
10. **Follow Next.js conventions** - Use recommended file structure

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [App Router Guide](https://nextjs.org/docs/app)
- [Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React Server Components](https://react.dev/reference/rsc/server-components)
