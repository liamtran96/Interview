---
sidebar_position: 2
---

# Next.js 16 New Features

## What's New in Next.js 16?

Next.js 16 was released on **October 21, 2025** with major improvements to performance, caching, and developer experience.

:::info Latest Version
Next.js 16.0.3 is the latest stable version as of November 2025.
:::

## Major New Features

### 1. Turbopack (Now Stable & Default)

**Turbopack** is now the **default bundler** for all Next.js applications!

**Performance Improvements:**
- ⚡ **5-10x faster Fast Refresh**
- ⚡ **2-5x faster builds**
- ⚡ Over 50% of dev sessions now run on Turbopack

```bash
# No configuration needed - Turbopack is default!
npm run dev
# Automatically uses Turbopack
```

**Key Benefits:**
- Instant feedback during development
- Faster time-to-interactive
- Better memory efficiency
- Optimized for large applications

### 2. Cache Components & Partial Pre-Rendering (PPR)

New caching model with explicit control:

```tsx
// app/products/page.tsx
import { unstable_cache } from 'next/cache'

// Cache expensive operations
const getCachedProducts = unstable_cache(
  async () => {
    return await db.products.findMany()
  },
  ['products'],
  {
    revalidate: 3600, // 1 hour
    tags: ['products']
  }
)

export default async function ProductsPage() {
  const products = await getCachedProducts()
  return <ProductList products={products} />
}
```

**New Cache Control Functions:**

```tsx
import { updateTag, refresh, revalidateTag } from 'next/cache'

// Update cache tag
await updateTag('products')

// Refresh cache
await refresh()

// Revalidate specific tag
await revalidateTag('products')
```

### 3. Proxy System (Replaces Middleware)

**Breaking Change:** `middleware.ts` is replaced by `proxy.ts`

```tsx
// proxy.ts (NEW in v16)
export default function proxy(request: Request) {
  const url = new URL(request.url)

  // Authentication check
  if (!request.headers.get('authorization')) {
    return Response.redirect(new URL('/login', url))
  }

  // Rewrite request
  if (url.pathname.startsWith('/api/v1')) {
    return Response.rewrite(new URL('/api/v2' + url.pathname.slice(7), url))
  }
}
```

**Key Differences:**
- Clearer network boundary
- Better performance
- Simplified API

### 4. React 19.2 Support

Full support for React 19.2 features:

**View Transitions:**
```tsx
'use client'

import { useTransition } from 'react'

export default function Page() {
  const [isPending, startTransition] = useTransition()

  const navigate = () => {
    startTransition(() => {
      // Smooth page transitions
      router.push('/about')
    })
  }
}
```

**useEffectEvent:**
```tsx
import { useEffectEvent } from 'react'

function Component({ url }) {
  const onLoad = useEffectEvent(() => {
    console.log('Loaded:', url)
  })

  useEffect(() => {
    fetch(url).then(onLoad)
  }, [url]) // No stale closures!
}
```

### 5. React Compiler (Stable)

Automatic memoization without manual optimization:

```tsx
// Before: Manual memoization
const MemoizedComponent = memo(function Component({ data }) {
  const processed = useMemo(() => expensiveOperation(data), [data])
  return <div>{processed}</div>
})

// After: React Compiler does it automatically
function Component({ data }) {
  const processed = expensiveOperation(data) // Auto-memoized!
  return <div>{processed}</div>
}
```

**Enable React Compiler:**
```js
// next.config.js
module.exports = {
  experimental: {
    reactCompiler: true
  }
}
```

### 6. Next.js DevTools MCP

AI-assisted debugging with **Model Context Protocol**:

```bash
# Install DevTools MCP
npx @next/devtools mcp init
```

**Features:**
- Contextual insight into your application
- AI-powered error analysis
- Performance recommendations
- Automatic fix suggestions

### 7. Enhanced Development Logs

Detailed request and build logs:

```
GET /api/products 200 in 45ms
  - Database query: 30ms
  - Serialization: 10ms
  - Network: 5ms

Build completed in 2.5s
  - Turbopack compile: 1.2s
  - Route generation: 0.8s
  - Optimization: 0.5s
```

### 8. Turbopack File System Caching (Beta)

Even faster startup for large apps:

```js
// next.config.js
module.exports = {
  experimental: {
    turbo: {
      fileSystemCache: true // Beta feature
    }
  }
}
```

## Breaking Changes in Next.js 16

### 1. Async Data Access Required

**❌ Old Way (Synchronous):**
```tsx
// This now throws an error!
export default function Page({ params, searchParams }) {
  const id = params.id // ❌ Error
  const query = searchParams.q // ❌ Error
}
```

**✅ New Way (Async):**
```tsx
export default async function Page({ params, searchParams }) {
  const { id } = await params // ✅ Correct
  const { q } = await searchParams // ✅ Correct
}
```

### 2. Headers, Cookies, DraftMode Must Be Awaited

```tsx
import { cookies, headers, draftMode } from 'next/headers'

// ❌ Old Way
export function MyComponent() {
  const cookieStore = cookies()
  const headersList = headers()
}

// ✅ New Way
export async function MyComponent() {
  const cookieStore = await cookies()
  const headersList = await headers()
  const { isEnabled } = await draftMode()
}
```

### 3. Middleware Replaced by Proxy

```tsx
// ❌ middleware.ts (removed)
export function middleware(request) {
  // ...
}

// ✅ proxy.ts (new)
export default function proxy(request) {
  // ...
}
```

### 4. Removed Features

- **AMP Support** - Completely removed
- **Runtime Configs** - Use environment variables instead
- **`next lint`** - Use ESLint CLI or Biome directly

## Migration Guide

### Step 1: Update Dependencies

```bash
npm install next@latest react@latest react-dom@latest
```

### Step 2: Update Async Access

```tsx
// Find all instances of params/searchParams
// Add async and await

export default async function Page({ params }) {
  const { slug } = await params // Add await
}
```

### Step 3: Migrate Middleware to Proxy

```bash
# Rename file
mv middleware.ts proxy.ts

# Update function signature
# Change: export function middleware()
# To: export default function proxy()
```

### Step 4: Update Cache APIs

```tsx
// Update revalidatePath/revalidateTag calls
import { revalidateTag } from 'next/cache'

await revalidateTag('products') // Add await if needed
```

## Interview Questions

### Q1: What's the main difference between Next.js 14 and 16?

**Answer:**

| Feature | Next.js 14 | Next.js 16 |
|---------|------------|------------|
| **Bundler** | Webpack (default) | Turbopack (default) |
| **Build Speed** | Baseline | 2-5x faster |
| **Middleware** | middleware.ts | proxy.ts |
| **Data Access** | Synchronous OK | Must be async |
| **React Version** | React 18 | React 19.2 |
| **Compiler** | Experimental | Stable |

### Q2: Why does params need to be awaited in v16?

**Answer:**

Next.js 16 makes `params` and `searchParams` **async** to support:
1. **Dynamic rendering** - Better optimization
2. **Streaming** - Improved performance
3. **Better caching** - More control over cache behavior

This aligns with Next.js's move toward more explicit async behavior.

### Q3: What are the benefits of Turbopack?

**Answer:**

**Turbopack benefits:**
1. **5-10x faster Fast Refresh** - Instant feedback
2. **2-5x faster builds** - Quicker deployments
3. **Better memory usage** - Handles large apps
4. **Incremental compilation** - Only rebuilds what changed
5. **Built in Rust** - Native performance

## Best Practices for Next.js 16

1. **Use Turbopack** - It's now the default, embrace it
2. **Await everything** - params, searchParams, cookies, headers
3. **Use cache() for expensive operations** - Explicit caching
4. **Enable React Compiler** - Automatic optimization
5. **Migrate to proxy.ts** - Better network boundaries
6. **Use updateTag/refresh** - New cache control APIs
7. **Leverage DevTools MCP** - AI-assisted debugging

## Performance Comparison

```
Next.js 14 vs Next.js 16:

Development Build:
14: 8.2s
16: 3.5s (2.3x faster)

Fast Refresh:
14: 450ms
16: 60ms (7.5x faster)

Production Build:
14: 45s
16: 22s (2x faster)
```

## Key Takeaways

- Next.js 16 is a major performance upgrade
- Turbopack is now stable and default
- All data access must be async (breaking change)
- proxy.ts replaces middleware.ts
- React 19.2 and React Compiler are fully supported
- Cache control is more explicit and powerful
- DevTools MCP provides AI-assisted debugging
- Migration is straightforward with clear upgrade paths

## Resources

- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Turbopack Documentation](https://nextjs.org/docs/app/api-reference/turbopack)
- [Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [React 19.2 Features](https://react.dev/blog/2025/10/01/react-19-2)
