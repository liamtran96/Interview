---
sidebar_position: 26
---

# Server Components (React 19)

## What are Server Components?

**React Server Components (RSC)** allow you to write components that render **on the server** and send the output to the client. They reduce JavaScript bundle size and improve performance.

:::info React 19
Server Components are a stable feature in React 19, primarily used with frameworks like Next.js 13+.
:::

## Server vs Client Components

| Server Components | Client Components |
|-------------------|-------------------|
| Render on server | Render on client |
| No JavaScript to client | Sends JavaScript |
| Can access backend directly | No backend access |
| No interactivity | Full interactivity |
| No hooks (useState, useEffect) | All hooks available |
| **Default in Next.js 13+** | Add `'use client'` |

## Basic Example

```jsx
// app/page.jsx - Server Component (default)
async function HomePage() {
  // Directly access database - no API needed!
  const posts = await db.posts.findMany();

  return (
    <div>
      <h1>Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

export default HomePage;
```

## Client Components

Add `'use client'` directive for interactivity:

```jsx
// components/Counter.jsx - Client Component
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## Mixing Server and Client

```jsx
// app/page.jsx - Server Component
import Counter from './Counter'; // Client Component

async function HomePage() {
  const data = await fetchData(); // Server-side

  return (
    <div>
      <h1>Server Component</h1>
      <p>{data.message}</p>

      {/* Client component for interactivity */}
      <Counter />
    </div>
  );
}
```

## Benefits of Server Components

### 1. Smaller Bundle Size

```jsx
// Server Component - No JS sent to client
import { format } from 'date-fns'; // 500KB library

function BlogPost({ post }) {
  return (
    <article>
      <time>{format(post.date, 'MMMM dd, yyyy')}</time>
      <h1>{post.title}</h1>
    </article>
  );
}
```

### 2. Direct Backend Access

```jsx
// No API route needed!
async function Users() {
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

### 3. Automatic Code Splitting

Each Server Component is automatically code-split.

### 4. Better Performance

- Less JavaScript to download
- Faster initial load
- SEO-friendly (fully rendered HTML)

## Data Fetching

### Server Component (async/await)

```jsx
async function Posts() {
  const posts = await fetch('https://api.example.com/posts');

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

### Client Component (useEffect)

```jsx
'use client';

import { useState, useEffect } from 'react';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## When to Use Each

### Use Server Components for:
- ✅ Fetching data
- ✅ Accessing backend resources
- ✅ Keeping sensitive info on server
- ✅ Large dependencies (stays on server)
- ✅ SEO-critical content

### Use Client Components for:
- ✅ Interactivity (onClick, onChange)
- ✅ State (useState, useReducer)
- ✅ Effects (useEffect)
- ✅ Browser APIs (localStorage, window)
- ✅ Event listeners

## Common Patterns

### 1. Server Component with Client Islands

```jsx
// app/page.jsx - Server Component
import LikeButton from './LikeButton'; // Client
import Comments from './Comments'; // Client

async function PostPage({ id }) {
  const post = await getPost(id); // Server-side

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      {/* Client component for interactivity */}
      <LikeButton postId={post.id} />
      <Comments postId={post.id} />
    </article>
  );
}
```

### 2. Passing Data to Client Components

```jsx
// Server Component
async function Page() {
  const data = await fetchData();

  return <ClientComponent data={data} />;
}

// Client Component
'use client';

function ClientComponent({ data }) {
  const [selected, setSelected] = useState(data[0]);

  return (
    <select onChange={e => setSelected(e.target.value)}>
      {data.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
```

### 3. Streaming with Suspense

```jsx
import { Suspense } from 'react';

async function SlowComponent() {
  await delay(3000);
  return <div>Loaded!</div>;
}

function Page() {
  return (
    <div>
      <h1>Fast Content</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

## Common Interview Questions

### Q1: What are React Server Components?

**Answer:**

**Server Components** render on the server and send HTML to client.

**Benefits:**
- Smaller JavaScript bundles
- Direct backend access
- Better performance
- Automatic code splitting

```jsx
// Server Component - Renders on server
async function Posts() {
  const posts = await db.posts.findMany();
  return <ul>{posts.map(...)}</ul>;
}

// Client Component - Interactive
'use client';
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={...}>{count}</button>;
}
```

### Q2: Server Components vs SSR (Server-Side Rendering)?

**Answer:**

| Server Components | SSR |
|-------------------|-----|
| Components render on server | Full page renders on server |
| Can mix with client components | Entire page is SSR |
| Zero JavaScript for server parts | All components hydrate |
| Always server-rendered | Can be client-rendered after |

**SSR:** Entire page rendered on server, then hydrated on client
**RSC:** Some components server-only, some client-only

### Q3: Can you use hooks in Server Components?

**Answer:**

**No!** Server Components cannot use:
- ❌ useState, useReducer
- ❌ useEffect, useLayoutEffect
- ❌ useContext (with client context)
- ❌ Event handlers (onClick, onChange)
- ❌ Browser APIs

**But can:**
- ✅ Use async/await
- ✅ Access backend directly
- ✅ Import server-only modules

```jsx
// ❌ WRONG
async function ServerComponent() {
  const [count, setCount] = useState(0); // Error!
}

// ✅ CORRECT
async function ServerComponent() {
  const data = await fetchData(); // This works!
}
```

### Q4: How do you decide Server vs Client Component?

**Answer:**

**Decision tree:**
```
Does it need interactivity (clicks, state)?
├─ Yes → Client Component ('use client')
└─ No → Can it fetch data?
    ├─ Yes → Server Component (default)
    └─ No → Server Component (default)
```

**Examples:**
- **Server:** Static content, data fetching, SEO
- **Client:** Forms, modals, animations, user interactions

## Limitations

### Server Components Cannot:
- Use React hooks (useState, useEffect)
- Use browser APIs (window, localStorage)
- Attach event handlers
- Use Context that requires client state

### Client Components Cannot:
- Import server-only modules
- Directly access backend
- Use async component functions

## Best Practices

1. **Default to Server Components** - Use client only when needed
2. **Push 'use client' down** - Make client boundary as small as possible
3. **Pass serializable props** - Functions can't be passed to server components
4. **Use Suspense** - For streaming and loading states
5. **Server for data fetching** - Keep API calls server-side
6. **Client for interactivity** - Forms, animations, state

## Key Takeaways

- Server Components render on server, reduce bundle size
- Default in Next.js 13+, add 'use client' for interactivity
- Cannot use hooks or event handlers in Server Components
- Mix Server and Client components for optimal performance
- Server Components can directly access backend/database
- Use Client Components for interactivity and state
- Suspense enables streaming and progressive rendering

## Resources

- [Server Components RFC](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React 19 Docs](https://react.dev/blog/2024/12/05/react-19)
