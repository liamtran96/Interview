---
sidebar_position: 17
---

# Code Splitting & Lazy Loading

## What is Code Splitting?

**Code splitting** is breaking your app into smaller chunks that are loaded on-demand, rather than loading everything upfront. This reduces initial load time and improves performance.

## Why Code Splitting?

**Problem without code splitting:**
```
User visits homepage
  ↓
Downloads entire app (5MB)
  ↓
Waits 10 seconds
  ↓
Finally sees homepage
```

**With code splitting:**
```
User visits homepage
  ↓
Downloads only homepage code (500KB)
  ↓
Sees homepage immediately (1 second)
  ↓
Other pages load when needed
```

## React.lazy()

`React.lazy()` lets you render a dynamic import as a regular component.

### Basic Syntax

```jsx
import { lazy, Suspense } from 'react';

// ❌ Static import - Loads immediately
import HeavyComponent from './HeavyComponent';

// ✅ Dynamic import - Loads when needed
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### How It Works

```jsx
// 1. Define lazy component
const Dashboard = lazy(() => import('./Dashboard'));

// 2. Wrap in Suspense with fallback
<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>

// 3. React loads Dashboard.js when component renders
// 4. Shows Spinner while loading
// 5. Renders Dashboard when loaded
```

## Suspense

`Suspense` lets you display a fallback while child components are loading.

### Basic Example

```jsx
import { lazy, Suspense } from 'react';

const Comments = lazy(() => import('./Comments'));

function Post() {
  return (
    <div>
      <h1>My Post</h1>
      <p>Post content...</p>

      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments />
      </Suspense>
    </div>
  );
}
```

### Multiple Suspense Boundaries

```jsx
function App() {
  return (
    <div>
      {/* Header loads independently */}
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      {/* Main content loads independently */}
      <Suspense fallback={<MainSkeleton />}>
        <MainContent />
      </Suspense>

      {/* Sidebar loads independently */}
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
```

### Nested Suspense

```jsx
function Dashboard() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Stats />

      {/* Nested suspense for slower component */}
      <Suspense fallback={<ChartLoading />}>
        <ExpensiveChart />
      </Suspense>

      <RecentActivity />
    </Suspense>
  );
}
```

## Route-Based Code Splitting

Split code by route for optimal performance:

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load each route
const Home = lazy(() => import('./routes/Home'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const Profile = lazy(() => import('./routes/Profile'));
const Settings = lazy(() => import('./routes/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

## Named Exports with Lazy

`React.lazy` only works with default exports:

```jsx
// ❌ WRONG - Named export
export function MyComponent() {
  return <div>Hello</div>;
}

const MyComponent = lazy(() => import('./MyComponent')); // Error!

// ✅ OPTION 1 - Use default export
export default function MyComponent() {
  return <div>Hello</div>;
}

const MyComponent = lazy(() => import('./MyComponent'));

// ✅ OPTION 2 - Re-export as default
export { MyComponent };

const MyComponent = lazy(() =>
  import('./MyComponent').then(module => ({
    default: module.MyComponent
  }))
);
```

## Component-Based Code Splitting

Split heavy components:

```jsx
import { lazy, Suspense, useState } from 'react';

// Lazy load heavy components
const VideoPlayer = lazy(() => import('./VideoPlayer'));
const ImageEditor = lazy(() => import('./ImageEditor'));
const DataTable = lazy(() => import('./DataTable'));

function App() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div>
      <button onClick={() => setShowVideo(true)}>Load Video</button>

      {showVideo && (
        <Suspense fallback={<div>Loading video player...</div>}>
          <VideoPlayer src="video.mp4" />
        </Suspense>
      )}
    </div>
  );
}
```

## Library Code Splitting

Lazy load heavy libraries:

```jsx
function ExportButton({ data }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);

    // Load XLSX library only when needed (1.5MB)
    const XLSX = await import('xlsx');

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'export.xlsx');

    setExporting(false);
  };

  return (
    <button onClick={handleExport} disabled={exporting}>
      {exporting ? 'Exporting...' : 'Export to Excel'}
    </button>
  );
}
```

## Common Interview Questions

### Q1: What is code splitting and why is it important?

**Answer:**

**Code splitting** breaks your app into smaller chunks loaded on-demand.

**Benefits:**
1. **Faster initial load** - Download less code upfront
2. **Better performance** - Load only what's needed
3. **Improved UX** - Users see content faster
4. **Reduced bandwidth** - Save data for users

**Example:**
```jsx
// Without code splitting
import Dashboard from './Dashboard'; // Loads immediately (2MB)

// With code splitting
const Dashboard = lazy(() => import('./Dashboard')); // Loads when needed
```

### Q2: How does React.lazy() work?

**Answer:**

`React.lazy()` enables dynamic imports for components:

```jsx
// 1. Define lazy component
const MyComponent = lazy(() => import('./MyComponent'));

// 2. Wrap in Suspense
<Suspense fallback={<Loading />}>
  <MyComponent />
</Suspense>

// 3. React:
//    - Shows fallback immediately
//    - Loads MyComponent.js in background
//    - Renders MyComponent when loaded
```

**Key points:**
- Only works with default exports
- Must be wrapped in Suspense
- Returns a Promise

### Q3: What is Suspense and how does it work with lazy?

**Answer:**

**Suspense** displays a fallback while async components load.

```jsx
<Suspense fallback={<Spinner />}>
  <LazyComponent />
</Suspense>

// 1. LazyComponent starts loading
// 2. Suspense shows <Spinner />
// 3. When loaded, Suspense shows <LazyComponent />
```

**Suspense features:**
- Multiple lazy components under one boundary
- Nested Suspense boundaries
- Works with React.lazy and data fetching (experimental)

### Q4: Where should you place Suspense boundaries?

**Answer:**

**Strategy depends on UX:**

**Option 1: Top-level (all-or-nothing)**
```jsx
<Suspense fallback={<PageLoader />}>
  <Header />
  <Main />
  <Footer />
</Suspense>
// Shows loader until everything loads
```

**Option 2: Granular (progressive loading)**
```jsx
<Suspense fallback={<HeaderSkeleton />}>
  <Header />
</Suspense>
<Suspense fallback={<MainSkeleton />}>
  <Main />
</Suspense>
// Each section loads independently
```

**Best practice:** Balance between too many (jarring) and too few (slow).

## Advanced Patterns

### Preloading

Start loading before component renders:

```jsx
const Dashboard = lazy(() => import('./Dashboard'));

// Preload on hover
function NavLink() {
  const preload = () => {
    // Triggers download
    import('./Dashboard');
  };

  return (
    <Link to="/dashboard" onMouseEnter={preload}>
      Dashboard
    </Link>
  );
}
```

### Error Handling

```jsx
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load dashboard</div>}>
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### Retry on Failure

```jsx
function lazyWithRetry(componentImport, retries = 3, interval = 1000) {
  return lazy(() =>
    new Promise((resolve, reject) => {
      const attemptImport = (retriesLeft) => {
        componentImport()
          .then(resolve)
          .catch((error) => {
            if (retriesLeft === 0) {
              reject(error);
              return;
            }

            setTimeout(() => {
              attemptImport(retriesLeft - 1);
            }, interval);
          });
      };

      attemptImport(retries);
    })
  );
}

// Usage
const Dashboard = lazyWithRetry(() => import('./Dashboard'));
```

### Loading Multiple Components

```jsx
function App() {
  const [showModals, setShowModals] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModals(true)}>
        Open Modals
      </button>

      {showModals && (
        <Suspense fallback={<div>Loading modals...</div>}>
          {/* Both load in parallel, shows fallback until both ready */}
          <Modal1 />
          <Modal2 />
        </Suspense>
      )}
    </div>
  );
}
```

## Webpack Magic Comments

Control chunk names and loading:

```jsx
// Name the chunk
const Dashboard = lazy(() =>
  import(/* webpackChunkName: "dashboard" */ './Dashboard')
);

// Prefetch (load during idle time)
const Dashboard = lazy(() =>
  import(/* webpackPrefetch: true */ './Dashboard')
);

// Preload (load in parallel with parent)
const Dashboard = lazy(() =>
  import(/* webpackPreload: true */ './Dashboard')
);
```

## Best Practices

1. **Route-based splitting first** - Biggest wins
2. **Split heavy components** - Charts, editors, players
3. **Lazy load modals/dialogs** - Only when opened
4. **Appropriate Suspense boundaries** - Balance UX and performance
5. **Error boundaries** - Handle loading failures
6. **Preload on intent** - Hover, focus, viewport
7. **Monitor bundle size** - Use webpack-bundle-analyzer
8. **Test loading states** - Ensure fallbacks work

## Common Pitfalls

### 1. No Suspense Boundary

```jsx
// ❌ ERROR - No Suspense
const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return <Dashboard />; // Error!
}

// ✅ Must wrap in Suspense
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
```

### 2. Named Exports

```jsx
// ❌ WRONG - Named export
export function MyComponent() {}

const MyComponent = lazy(() => import('./MyComponent')); // Error!

// ✅ Use default export
export default function MyComponent() {}
```

### 3. Too Many Chunks

```jsx
// ❌ BAD - Too granular
const Button = lazy(() => import('./Button'));
const Input = lazy(() => import('./Input'));
const Label = lazy(() => import('./Label'));

// ✅ GOOD - Bundle related components
const FormComponents = lazy(() => import('./FormComponents'));
```

## Measuring Impact

```bash
# Build and analyze
npm run build

# Analyze bundle
npx webpack-bundle-analyzer build/stats.json

# Check chunk sizes
ls -lh build/static/js/
```

## Key Takeaways

- Code splitting reduces initial bundle size
- React.lazy() + Suspense for component-level splitting
- Route-based splitting has biggest impact
- Always wrap lazy components in Suspense
- Handle loading errors with Error Boundaries
- Preload on user intent for better UX
- Monitor and optimize bundle sizes

## Resources

- [Code Splitting Docs](https://react.dev/reference/react/lazy)
- [Suspense](https://react.dev/reference/react/Suspense)
- [Lazy Loading](https://react.dev/learn/lazy-loading)
- [webpack Code Splitting](https://webpack.js.org/guides/code-splitting/)
