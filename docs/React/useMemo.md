---
sidebar_position: 9
---

# useMemo Hook

## What is useMemo?

`useMemo` is a React Hook that **memoizes (caches) a computed value** so it's only recalculated when dependencies change. It optimizes performance by avoiding expensive calculations on every render.

## Basic Syntax

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- **First argument**: Function that returns the computed value
- **Second argument**: Dependency array
- **Returns**: The memoized value

## When to Use useMemo

Use `useMemo` when:
1. **Expensive calculations** - Complex computations that slow down renders
2. **Referential equality** - Preventing object/array recreation for child props
3. **Performance optimization** - Profiling shows performance issues

:::warning Don't Overuse
`useMemo` has overhead. Only use it when you have actual performance problems. React 19's compiler may handle this automatically.
:::

## Problem: Expensive Recalculation

```jsx
// ❌ WITHOUT useMemo - Recalculates every render
function ProductList({ products, filter }) {
  // This runs on EVERY render, even if products/filter didn't change
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredProducts.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

## Solution: Memoize Expensive Calculation

```jsx
// ✅ WITH useMemo - Only recalculates when dependencies change
function ProductList({ products, filter }) {
  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]); // Only recalculate if these change

  return (
    <ul>
      {filteredProducts.map(p => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

## Real-World Examples

### Example 1: Expensive Calculation

```jsx
function DataAnalysis({ data }) {
  // Expensive calculation - only run when data changes
  const statistics = useMemo(() => {
    console.log('Computing statistics...');

    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / data.length;
    const sorted = [...data].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];

    return { sum, mean, median };
  }, [data]);

  return (
    <div>
      <p>Sum: {statistics.sum}</p>
      <p>Mean: {statistics.mean}</p>
      <p>Median: {statistics.median}</p>
    </div>
  );
}
```

### Example 2: Preventing Object Recreation

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3]);

  // ❌ WITHOUT useMemo - Creates new object every render
  // Child re-renders even when items haven't changed
  const itemsConfig = { items, type: 'numbers' };

  // ✅ WITH useMemo - Same object reference if items unchanged
  const memoizedConfig = useMemo(
    () => ({ items, type: 'numbers' }),
    [items]
  );

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild config={memoizedConfig} />
    </div>
  );
}

const ExpensiveChild = memo(function ExpensiveChild({ config }) {
  console.log('Child rendered');
  return <div>{config.items.length} items</div>;
});
```

### Example 3: Sorted/Filtered Lists

```jsx
function TodoList({ todos, sortBy, filterCompleted }) {
  const processedTodos = useMemo(() => {
    console.log('Processing todos...');

    // Filter
    let result = todos;
    if (filterCompleted) {
      result = result.filter(todo => !todo.completed);
    }

    // Sort
    if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'date') {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [todos, sortBy, filterCompleted]);

  return (
    <ul>
      {processedTodos.map(todo => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  );
}
```

## Common Interview Questions

### Q1: When should you use useMemo?

**Answer:**

**Use useMemo when:**
1. Expensive calculations (confirmed by profiling)
2. Passing objects/arrays to child components (with React.memo)
3. Dependency of another hook (useEffect, useMemo)

**Don't use useMemo when:**
1. Calculation is cheap
2. Creating primitive values (strings, numbers, booleans)
3. You haven't measured performance impact

```jsx
// ❌ DON'T - Overhead > benefit
const doubled = useMemo(() => count * 2, [count]);

// ✅ DO - Simple calculation
const doubled = count * 2;
```

### Q2: What's the difference between useMemo and useCallback?

**Answer:**

| useMemo | useCallback |
|---------|-------------|
| **Memoizes a value** | **Memoizes a function** |
| Returns computed value | Returns function itself |
| `useMemo(() => value, deps)` | `useCallback(fn, deps)` |

```jsx
// useMemo - Memoize VALUE
const expensiveValue = useMemo(() => {
  return computeExpensive(a, b);
}, [a, b]);

// useCallback - Memoize FUNCTION
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

// Note: These are equivalent!
const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);
```

### Q3: Does useMemo guarantee the value won't be recalculated?

**Answer:** **No!** `useMemo` is a **performance hint**, not a guarantee.

React **may** recalculate the value even if dependencies haven't changed:
- To free up memory for offscreen components
- During server rendering
- For debugging

**Never rely on `useMemo` for correctness** - only use it for performance.

```jsx
// ❌ BAD - Relying on useMemo for correctness
const userPermissions = useMemo(() => {
  // This MUST run when user changes
  return calculatePermissions(user);
}, [user]);

// ✅ GOOD - Use for performance, but code works without it
const expensiveData = useMemo(() => {
  return processData(data); // Works fine even if recalculated
}, [data]);
```

### Q4: What happens if you forget dependencies?

**Answer:** You'll have **stale closures** - using old values:

```jsx
function Component({ a, b }) {
  // ❌ BAD - Missing 'b' dependency
  const result = useMemo(() => {
    return a + b; // Uses old 'b' value!
  }, [a]); // Missing 'b'

  // ✅ GOOD - Include all dependencies
  const result = useMemo(() => {
    return a + b;
  }, [a, b]);
}
```

**Solution:** Use ESLint plugin `eslint-plugin-react-hooks` to catch missing dependencies.

## Advanced Patterns

### Memoizing Context Value

```jsx
function MyProvider({ children }) {
  const [state, setState] = useState(initialState);

  // Prevent unnecessary re-renders of context consumers
  const value = useMemo(
    () => ({
      state,
      updateState: setState
    }),
    [state]
  );

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
}
```

### Chaining useMemo

```jsx
function Component({ data, filter, sortOrder }) {
  // Step 1: Filter
  const filteredData = useMemo(() => {
    return data.filter(item => item.category === filter);
  }, [data, filter]);

  // Step 2: Sort (depends on filtered data)
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      return sortOrder === 'asc' ? a.value - b.value : b.value - a.value;
    });
  }, [filteredData, sortOrder]);

  return <List items={sortedData} />;
}
```

### useMemo with useCallback

```jsx
function SearchComponent({ items }) {
  const [query, setQuery] = useState('');

  // Memoize filtered results
  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  // Memoize callback that uses memoized value
  const handleSelect = useCallback((item) => {
    console.log('Selected from', filteredItems.length, 'items');
  }, [filteredItems]);

  return <Results items={filteredItems} onSelect={handleSelect} />;
}
```

## Common Pitfalls

### 1. Memoizing Everything

```jsx
// ❌ BAD - Unnecessary memoization
function Component({ a, b }) {
  const sum = useMemo(() => a + b, [a, b]); // Overhead > benefit
  const doubled = useMemo(() => a * 2, [a]); // Too simple
  const message = useMemo(() => `Hello ${a}`, [a]); // Strings are cheap

  return <div>{sum} {doubled} {message}</div>;
}

// ✅ GOOD - No memoization needed
function Component({ a, b }) {
  const sum = a + b;
  const doubled = a * 2;
  const message = `Hello ${a}`;

  return <div>{sum} {doubled} {message}</div>;
}
```

### 2. Missing Dependencies

```jsx
// ❌ BAD - Missing dependency
function Component({ items, multiplier }) {
  const processed = useMemo(() => {
    return items.map(item => item.value * multiplier);
  }, [items]); // Missing multiplier!

  return <List items={processed} />;
}

// ✅ GOOD - All dependencies included
function Component({ items, multiplier }) {
  const processed = useMemo(() => {
    return items.map(item => item.value * multiplier);
  }, [items, multiplier]);

  return <List items={processed} />;
}
```

### 3. Memoizing Without React.memo

```jsx
// ❌ BAD - useMemo without memo on child
function Parent() {
  const [count, setCount] = useState(0);

  const config = useMemo(() => ({ theme: 'dark' }), []);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child config={config} /> {/* Still re-renders every time! */}
    </div>
  );
}

// Child without memo - always re-renders
function Child({ config }) {
  return <div>{config.theme}</div>;
}

// ✅ GOOD - Wrap child with memo
const Child = memo(function Child({ config }) {
  return <div>{config.theme}</div>;
});
```

## Measuring Performance

Use React DevTools Profiler to identify performance issues:

```jsx
function Component({ data }) {
  console.time('filter');
  const filtered = data.filter(item => item.active);
  console.timeEnd('filter');

  // If filtering is slow, add useMemo
  const memoizedFiltered = useMemo(() => {
    console.log('Filtering...');
    return data.filter(item => item.active);
  }, [data]);

  return <List items={memoizedFiltered} />;
}
```

## Best Practices

1. **Measure first** - Don't optimize prematurely
2. **Use React DevTools Profiler** - Find actual bottlenecks
3. **Include all dependencies** - Use ESLint plugin
4. **Don't memoize primitives** - Strings, numbers, booleans are cheap
5. **Combine with React.memo** - For child component optimization
6. **Keep calculations pure** - No side effects in useMemo
7. **Consider React 19 Compiler** - May auto-optimize

## React 19 Compiler

React 19 introduces an automatic compiler that handles memoization:

```jsx
// React 19 with compiler - auto-optimized!
function Component({ data, filter }) {
  // Compiler automatically memoizes when beneficial
  const filtered = data.filter(item => item.type === filter);

  return <List items={filtered} />;
}
```

With the compiler, you may not need `useMemo` as often.

## Key Takeaways

- `useMemo` memoizes computed values to avoid expensive recalculations
- Only use when you have **measured** performance problems
- Include all dependencies in dependency array
- Combine with `React.memo` for component optimization
- Don't rely on `useMemo` for correctness - it's a performance hint
- React 19's compiler may auto-optimize, reducing need for useMemo

## Resources

- [useMemo Official Docs](https://react.dev/reference/react/useMemo)
- [Performance Optimization](https://react.dev/learn/render-and-commit)
- [React DevTools Profiler](https://react.dev/learn/react-developer-tools)
