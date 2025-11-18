---
sidebar_position: 1
---

# Next.js Fundamentals (v14+)

## What is Next.js?

Next.js is a **React framework** for building full-stack web applications. It provides features like server-side rendering, static site generation, and API routes out of the box.

:::info Latest Version
This guide covers **Next.js 14+** with the **App Router** (the recommended approach as of 2024).
:::

## Key Features (Beginner Level)

### 1. File-Based Routing

Routes are created by adding files to the `app` directory:

```
app/
├── page.tsx                 → / (homepage)
├── about/
│   └── page.tsx            → /about
├── blog/
│   ├── page.tsx            → /blog
│   └── [slug]/
│       └── page.tsx        → /blog/:slug
```

### 2. Server Components (Default)

All components in the App Router are **Server Components** by default:

```tsx
// app/page.tsx - Server Component (default)
export default function Home() {
  // Runs on server
  return <h1>Hello from Server!</h1>
}
```

### 3. Client Components

Use `"use client"` directive for client-side interactivity:

```tsx
// app/components/Counter.tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

## Common Interview Questions (Beginner)

### Q1: What is Next.js and why use it?

**Answer:**

Next.js is a React framework that provides:

**Key Benefits:**
- **Built-in routing** - File-based, no extra library needed
- **Server-side rendering (SSR)** - Better SEO and performance
- **Static generation (SSG)** - Pre-render pages at build time
- **API routes** - Build backend endpoints in same project
- **Image optimization** - Automatic image optimization
- **TypeScript support** - First-class TypeScript support

**Use Next.js when:**
- SEO is important
- Need server-side rendering
- Building full-stack applications
- Want better performance out of the box

### Q2: What's the difference between App Router and Pages Router?

**Answer:**

| App Router (New - v13+) | Pages Router (Legacy) |
|------------------------|---------------------|
| `app/` directory | `pages/` directory |
| Server Components default | Client Components default |
| Nested layouts | No nested layouts |
| Better performance | Older approach |
| Recommended for new projects | Maintenance mode |

```
// App Router (New)
app/
├── layout.tsx
└── page.tsx

// Pages Router (Legacy)
pages/
├── _app.tsx
└── index.tsx
```

### Q3: What are Server Components?

**Answer:**

**Server Components** render on the server and send HTML to client. They:

- **Run on server only** - No client-side JavaScript bundle
- **Can access backend directly** - Database, file system, etc.
- **Better performance** - Smaller JavaScript bundles
- **Better security** - API keys stay on server

```tsx
// Server Component (default in app/)
async function getData() {
  const res = await fetch('https://api.example.com/data')
  return res.json()
}

export default async function Page() {
  const data = await getData()
  return <div>{data.title}</div>
}
```

## Rendering Methods (Intermediate Level)

### 1. Server-Side Rendering (SSR)

Renders HTML on **every request**:

```tsx
// app/page.tsx
async function getUser() {
  const res = await fetch('https://api.example.com/user', {
    cache: 'no-store' // Don't cache - fresh data every request
  })
  return res.json()
}

export default async function Page() {
  const user = await getUser()
  return <h1>Welcome {user.name}</h1>
}
```

**Use SSR when:**
- Data changes frequently
- Need personalized content
- Real-time data required

### 2. Static Site Generation (SSG)

Renders HTML at **build time**:

```tsx
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug)
  return <article>{post.content}</article>
}
```

**Use SSG when:**
- Content doesn't change often
- Same content for all users
- Best performance needed

### 3. Incremental Static Regeneration (ISR)

Static pages that **update periodically**:

```tsx
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // Revalidate every hour
  })
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  return <div>{/* render posts */}</div>
}
```

**Use ISR when:**
- Content updates occasionally
- Need static speed + fresh content
- E-commerce, blogs, news sites

## Data Fetching (Intermediate Level)

### Fetch API with Caching

Next.js extends `fetch()` with caching options:

```tsx
// Force cache (default for SSG)
fetch('https://api.example.com/data', { cache: 'force-cache' })

// No cache (SSR - always fresh)
fetch('https://api.example.com/data', { cache: 'no-store' })

// Revalidate (ISR - update periodically)
fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // 1 hour
})

// Revalidate with tags
fetch('https://api.example.com/data', {
  next: { tags: ['posts'] }
})
```

### Loading States

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading...</div>
}

// app/dashboard/page.tsx
export default async function Dashboard() {
  const data = await fetchData() // Automatic loading state
  return <div>{data}</div>
}
```

### Error Handling

```tsx
// app/dashboard/error.tsx
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

## Layouts and Templates (Intermediate)

### Root Layout (Required)

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>Navigation</nav>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  )
}
```

### Nested Layouts

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div>
      <aside>Dashboard Sidebar</aside>
      <main>{children}</main>
    </div>
  )
}

// app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>Dashboard</h1>
}
// Both layouts (root + dashboard) render
```

## Dynamic Routes (Intermediate)

### Single Dynamic Segment

```tsx
// app/blog/[slug]/page.tsx
export default function BlogPost({ params }) {
  return <h1>Post: {params.slug}</h1>
}

// /blog/hello → params.slug = "hello"
```

### Multiple Dynamic Segments

```tsx
// app/blog/[category]/[slug]/page.tsx
export default function Post({ params }) {
  return (
    <div>
      Category: {params.category}
      Slug: {params.slug}
    </div>
  )
}

// /blog/tech/nextjs → category="tech", slug="nextjs"
```

### Catch-All Segments

```tsx
// app/docs/[...slug]/page.tsx
export default function Docs({ params }) {
  return <div>Slug: {params.slug.join('/')}</div>
}

// /docs/a/b/c → params.slug = ['a', 'b', 'c']
```

## API Routes (Intermediate)

### Route Handlers

```tsx
// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const users = await getUsers()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()
  const user = await createUser(body)
  return NextResponse.json(user)
}
```

### Dynamic API Routes

```tsx
// app/api/users/[id]/route.ts
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getUser(params.id)
  return NextResponse.json(user)
}
```

## Advanced Concepts (Senior Level)

### Server Actions

Execute server-side code from client components:

```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const post = await db.post.create({
    data: { title }
  })
  revalidatePath('/posts')
  return post
}

// app/create-post.tsx
'use client'

import { createPost } from './actions'

export default function CreatePost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Create</button>
    </form>
  )
}
```

### Streaming with Suspense

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'

async function Analytics() {
  const data = await fetchAnalytics() // Slow
  return <div>{data}</div>
}

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading analytics...</div>}>
        <Analytics />
      </Suspense>
    </div>
  )
}
```

### Parallel Routes

```tsx
// app/dashboard/@analytics/page.tsx
// app/dashboard/@users/page.tsx
// app/dashboard/layout.tsx

export default function Layout({ analytics, users }) {
  return (
    <div>
      <div>{analytics}</div>
      <div>{users}</div>
    </div>
  )
}
```

### Route Groups

Organize routes without affecting URL:

```
app/
├── (marketing)/
│   ├── about/page.tsx      → /about
│   └── contact/page.tsx    → /contact
└── (shop)/
    ├── products/page.tsx   → /products
    └── cart/page.tsx       → /cart
```

## Metadata API (SEO - Senior Level)

### Static Metadata

```tsx
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
  description: 'Welcome to my app',
}

export default function Page() {
  return <h1>Home</h1>
}
```

### Dynamic Metadata

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  }
}
```

## Performance Optimization (Senior Level)

### Image Optimization

```tsx
import Image from 'next/image'

export default function Page() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority // Load immediately
    />
  )
}
```

### Font Optimization

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

## Best Practices

1. **Use Server Components by default** - Only use Client Components when needed
2. **Fetch data where you need it** - Colocate data fetching with components
3. **Use loading.tsx and error.tsx** - Better UX
4. **Implement proper caching** - Understand cache, no-store, revalidate
5. **Use TypeScript** - Better type safety
6. **Optimize images** - Use next/image
7. **Use Server Actions** - For mutations instead of API routes

## Key Takeaways

- Next.js 14+ uses App Router (app/ directory)
- Server Components are default (better performance)
- Three rendering methods: SSR, SSG, ISR
- File-based routing with dynamic segments
- Built-in layouts, loading, and error handling
- Server Actions for server-side mutations
- Streaming with Suspense for better UX
- Metadata API for SEO
