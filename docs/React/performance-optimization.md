---
sidebar_position: 16
---

# Performance Optimization

## Why Optimize React Performance?

React is fast by default, but as apps grow, you may need optimization techniques to maintain performance. The goal is to **reduce unnecessary re-renders** and **expensive computations**.

## React DevTools Profiler

Before optimizing, **measure first** using React DevTools Profiler.

### How to Use Profiler

1. Install React DevTools browser extension
2. Open DevTools → Profiler tab
3. Click Record → Interact with app → Stop
4. Analyze flame chart and ranked chart

**What to look for:**
- Components that render frequently
- Long render times
- Unnecessary re-renders

```jsx
// Wrap sections to profile
import { Profiler } from 'react';

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Dashboard />
    </Profiler>
  );
}

function onRenderCallback(
  id, // "App"
  phase, // "mount" or "update"
  actualDuration, // Time spent rendering
  baseDuration, // Estimated time without memoization
  startTime, // When render started
  commitTime // When committed
) {
  console.log(`${id} took ${actualDuration}ms`);
}
```

## React.memo

`React.memo` is a Higher-Order Component that **memoizes component** to prevent re-renders when props haven't changed.

### Basic Usage

```jsx
// Without memo - re-renders every time parent renders
function ExpensiveComponent({ data }) {
  console.log('Rendering...');
  return <div>{data.name}</div>;
}

// With memo - only re-renders when data changes
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  console.log('Rendering...');
  return <div>{data.name}</div>;
});
```

### When to Use React.memo

✅ **Use when:**
- Component renders often with same props
- Component is expensive to render
- Pure component (same props = same output)

❌ **Don't use when:**
- Component always renders with new props
- Component is cheap to render
- Props change frequently

### Example

```jsx
import { memo } from 'react';

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild name={name} />
    </div>
  );
}

// Without memo: Re-renders when count changes
function ExpensiveChild({ name }) {
  console.log('Child rendering');
  return <div>{name}</div>;
}

// With memo: Only re-renders when name changes
const ExpensiveChild = memo(function ExpensiveChild({ name }) {
  console.log('Child rendering');
  return <div>{name}</div>;
});
```

### Custom Comparison Function

```jsx
const MyComponent = memo(function MyComponent({ user }) {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip render)
  // Return false if props changed (re-render)
  return prevProps.user.id === nextProps.user.id;
});
```

## useMemo Hook

Memoize expensive **calculations**.

```jsx
function Component({ items, filter }) {
  // Without useMemo - recalculates every render
  const filteredItems = items.filter(item => item.type === filter);

  // With useMemo - only recalculates when dependencies change
  const filteredItems = useMemo(
    () => items.filter(item => item.type === filter),
    [items, filter]
  );

  return <List items={filteredItems} />;
}
```

## useCallback Hook

Memoize **functions** to prevent recreation.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback - new function every render
  const handleClick = () => {
    console.log('Clicked');
  };

  // With useCallback - same function reference
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return <MemoizedChild onClick={handleClick} />;
}

const MemoizedChild = memo(function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
});
```

## Key Optimization Techniques

### 1. Avoid Inline Object/Array Creation

```jsx
// ❌ BAD - New object every render
<Component style={{ color: 'red' }} />

// ✅ GOOD - Reuse same object
const style = { color: 'red' };
<Component style={style} />

// Or use useMemo
const style = useMemo(() => ({ color: 'red' }), []);
<Component style={style} />
```

### 2. Use Proper Keys in Lists

```jsx
// ❌ BAD - Index as key
{items.map((item, index) => (
  <Item key={index} {...item} />
))}

// ✅ GOOD - Stable unique key
{items.map(item => (
  <Item key={item.id} {...item} />
))}
```

### 3. Virtualize Long Lists

For lists with 100+ items, use windowing/virtualization:

```jsx
import { FixedSizeList } from 'react-window';

function LongList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

### 4. Lazy Load Components

```jsx
import { lazy, Suspense } from 'react';

// Load only when needed
const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 5. Debounce/Throttle Expensive Operations

```jsx
import { useDeferredValue } from 'react';

function SearchResults({ query }) {
  // Defer updates to keep input responsive
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(
    () => searchItems(deferredQuery),
    [deferredQuery]
  );

  return <ResultsList items={results} />;
}
```

### 6. Code Splitting by Route

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const Dashboard = lazy(() => import('./routes/Dashboard'));
const Profile = lazy(() => import('./routes/Profile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

## Common Interview Questions

### Q1: How do you optimize React performance?

**Answer:**

**Key techniques:**
1. **React.memo** - Prevent unnecessary re-renders
2. **useMemo/useCallback** - Memoize values/functions
3. **Code splitting** - Load only what's needed
4. **Virtualization** - Render only visible items
5. **Lazy loading** - Defer non-critical components
6. **Proper keys** - Help React identify changes
7. **Profiling** - Measure before optimizing

### Q2: When should you use React.memo?

**Answer:**

**Use React.memo when:**
- Component renders often with same props
- Component is expensive to render
- Props are primitive or stable references

**Don't use when:**
- Props change every render
- Component is cheap (< 1ms)
- Premature optimization

```jsx
// ✅ GOOD use case
const UserCard = memo(function UserCard({ user }) {
  return (
    <div>
      <Avatar userId={user.id} />
      <ExpensiveChart data={user.stats} />
    </div>
  );
});

// ❌ BAD use case
const Button = memo(function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
});
// Too simple, memo overhead > benefit
```

### Q3: What's the difference between useMemo and React.memo?

**Answer:**

| useMemo | React.memo |
|---------|------------|
| Hook | Higher-Order Component |
| Memoizes **value/calculation** | Memoizes **component** |
| Inside component | Wraps component |
| `useMemo(() => value, deps)` | `memo(Component)` |

```jsx
// useMemo - Memoize calculation
function Component({ items }) {
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price, 0),
    [items]
  );
  return <div>Total: {total}</div>;
}

// React.memo - Memoize component
const Component = memo(function Component({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <div>Total: {total}</div>;
});
```

### Q4: How does React's reconciliation affect performance?

**Answer:**

**Reconciliation** is how React updates the DOM efficiently:

1. **Virtual DOM diffing** - Compares old vs new
2. **Minimal updates** - Only changes what's different
3. **Batching** - Groups multiple updates

**Performance impact:**
- Changing element type = destroy/recreate (slow)
- Same element type = update props (fast)
- Keys in lists = efficient reordering

```jsx
// Slow - Element type changes
{isLink ? <a href="/">Home</a> : <button>Home</button>}

// Fast - Same element
<button onClick={isLink ? navigate : handleClick}>Home</button>
```

## Performance Anti-Patterns

### 1. Premature Optimization

```jsx
// ❌ Don't optimize everything
const Button = memo(function Button({ children }) {
  return <button>{children}</button>;
});

// ✅ Only optimize when needed (after profiling)
function Button({ children }) {
  return <button>{children}</button>;
}
```

### 2. Over-Memoization

```jsx
// ❌ BAD - Too much memoization
function Component({ a, b }) {
  const sum = useMemo(() => a + b, [a, b]); // Overhead > benefit
  const double = useMemo(() => a * 2, [a]); // Too simple
  return <div>{sum} {double}</div>;
}

// ✅ GOOD - No memoization needed
function Component({ a, b }) {
  const sum = a + b;
  const double = a * 2;
  return <div>{sum} {double}</div>;
}
```

### 3. Creating Functions in Render

```jsx
// ❌ BAD - New function every render
function Parent() {
  return (
    <Child
      onClick={() => console.log('click')}
      style={{ color: 'red' }}
    />
  );
}

// ✅ GOOD - Reuse references
function Parent() {
  const handleClick = useCallback(() => console.log('click'), []);
  const style = useMemo(() => ({ color: 'red' }), []);

  return <MemoizedChild onClick={handleClick} style={style} />;
}
```

## Bundle Size Optimization

### 1. Analyze Bundle

```bash
# Create React App
npm run build
npx source-map-explorer 'build/static/js/*.js'

# Vite
npm run build
npx vite-bundle-visualizer
```

### 2. Tree Shaking

```jsx
// ❌ BAD - Imports entire library
import _ from 'lodash';
const result = _.chunk(array, 3);

// ✅ GOOD - Import only what you need
import chunk from 'lodash/chunk';
const result = chunk(array, 3);
```

### 3. Dynamic Imports

```jsx
// Load heavy library only when needed
async function handleExport() {
  const XLSX = await import('xlsx');
  XLSX.writeFile(workbook, 'export.xlsx');
}
```

## Performance Checklist

✅ **Development:**
- [ ] Use React DevTools Profiler
- [ ] Identify slow components
- [ ] Check for unnecessary re-renders
- [ ] Profile before optimizing

✅ **Rendering:**
- [ ] Use React.memo for expensive components
- [ ] useMemo for expensive calculations
- [ ] useCallback for event handlers
- [ ] Proper keys in lists
- [ ] Avoid inline objects/arrays

✅ **Code Splitting:**
- [ ] Lazy load routes
- [ ] Lazy load heavy components
- [ ] Dynamic imports for large libraries

✅ **Lists:**
- [ ] Virtualize long lists (100+ items)
- [ ] Stable unique keys
- [ ] Pagination or infinite scroll

✅ **Bundle:**
- [ ] Analyze bundle size
- [ ] Tree shaking
- [ ] Code splitting
- [ ] Remove unused dependencies

## Best Practices

1. **Measure first** - Don't optimize prematurely
2. **Profile in production mode** - Dev mode is slower
3. **Use React.memo judiciously** - Only when needed
4. **Combine techniques** - memo + useMemo + useCallback
5. **Optimize user-perceived performance** - Prioritize above-the-fold content
6. **Monitor in production** - Use performance monitoring tools

## Key Takeaways

- React is fast by default, optimize when needed
- Use React DevTools Profiler to identify bottlenecks
- React.memo prevents component re-renders
- useMemo/useCallback prevent value/function recreation
- Virtualize long lists, lazy load heavy components
- Measure before and after optimization
- Don't over-optimize simple components

## Resources

- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
- [Optimizing Performance](https://react.dev/learn/render-and-commit)
- [React.memo](https://react.dev/reference/react/memo)
- [useMemo](https://react.dev/reference/react/useMemo)
- [useCallback](https://react.dev/reference/react/useCallback)
- [react-window](https://github.com/bvaughn/react-window)
