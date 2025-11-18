---
sidebar_position: 1
---

# React Hooks Overview

## What are React Hooks?

React Hooks are **functions** that let you "hook into" React features from functional components. They were introduced in React 16.8 to enable functional components to use state and lifecycle features without writing class components.

## Why were Hooks introduced?

1. **Simplify component logic** - Easier to reuse stateful logic between components
2. **Avoid class confusion** - No need to understand `this` binding
3. **Better code organization** - Related logic stays together
4. **Smaller bundle size** - Functional components are more minifiable

## Rules of Hooks

:::warning Important Rules
You must follow these rules when using hooks:

1. **Only call hooks at the top level** - Never inside loops, conditions, or nested functions
2. **Only call hooks from React functions** - Call them from functional components or custom hooks
:::

### Why these rules matter?

```javascript
// ❌ WRONG - Conditional hook call
function MyComponent({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // This breaks React!
  }
}

// ✅ CORRECT - Hook at top level
function MyComponent({ condition }) {
  const [state, setState] = useState(0);

  if (condition) {
    // Use the state here
  }
}
```

React relies on the order hooks are called to maintain state correctly between renders.

## Built-in Hooks

### Basic Hooks

| Hook | Purpose |
|------|---------|
| `useState` | Manage component state |
| `useEffect` | Perform side effects |
| `useContext` | Access React Context |

### Additional Hooks

| Hook | Purpose |
|------|---------|
| `useReducer` | Complex state logic (alternative to useState) |
| `useCallback` | Memoize functions |
| `useMemo` | Memoize values |
| `useRef` | Access DOM elements or persist values |
| `useImperativeHandle` | Customize instance value exposed to parent |
| `useLayoutEffect` | Synchronous side effects before paint |
| `useDebugValue` | Display custom label in React DevTools |

## Common Interview Questions

### Q1: What is the difference between class components and functional components with hooks?

**Answer:**

```javascript
// Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('Mounted');
  }

  render() {
    return <button onClick={() => this.setState({ count: this.state.count + 1 })}>
      Count: {this.state.count}
    </button>;
  }
}

// Functional Component with Hooks
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Mounted');
  }, []);

  return <button onClick={() => setCount(count + 1)}>
    Count: {count}
  </button>;
}
```

**Key differences:**
- Functional components are shorter and easier to read
- No `this` keyword confusion
- Hooks allow better code organization
- Can extract custom logic into custom hooks

### Q2: Can you use hooks in class components?

**Answer:** No, hooks only work in functional components. If you have a class component and want to use hooks, you need to convert it to a functional component.

### Q3: What happens if you break the Rules of Hooks?

**Answer:** Breaking the rules can cause:
- State being mixed up between different hooks
- Stale closures
- Unexpected behavior
- React errors

React uses the order of hook calls to associate state with each hook. Conditional hook calls break this association.

## Custom Hooks

You can create your own hooks to **reuse stateful logic**:

```javascript
// Custom hook for fetching data
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{data.name}</div>;
}
```

:::tip Custom Hook Naming
Always start custom hook names with `use` (e.g., `useFetch`, `useAuth`, `useLocalStorage`). This helps React identify them as hooks and enforce the Rules of Hooks.
:::

## Best Practices

1. **Keep hooks at the top level** - Never nest them in conditions or loops
2. **Name custom hooks with `use` prefix** - Makes them easily identifiable
3. **Extract reusable logic** - Create custom hooks for shared functionality
4. **One hook per concern** - Don't combine unrelated logic in one hook
5. **Use ESLint plugin** - Install `eslint-plugin-react-hooks` to catch mistakes

## Resources

- [React Hooks Official Docs](https://react.dev/reference/react)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
