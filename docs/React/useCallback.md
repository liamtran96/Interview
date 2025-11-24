---
sidebar_position: 10
---

# useCallback Hook

## What is useCallback?

`useCallback` is a React Hook that **memoizes a function** so it maintains the same reference across renders unless dependencies change. It prevents unnecessary re-creation of functions.

## Basic Syntax

```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b] // Dependencies
);
```

- **First argument**: The function to memoize
- **Second argument**: Dependency array
- **Returns**: Memoized function reference

## When to Use useCallback

Use `useCallback` when:
1. **Passing callbacks to memoized child components** (with React.memo)
2. **Function is a dependency** of useEffect, useMemo, or another hook
3. **Creating expensive event handlers** in lists

:::warning Don't Overuse
Like `useMemo`, `useCallback` has overhead. Only use when needed for performance.
:::

## Problem: Function Recreated Every Render

```jsx
// ❌ WITHOUT useCallback
function Parent() {
  const [count, setCount] = useState(0);

  // New function created on every render!
  const handleClick = () => {
    console.log('Clicked');
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

const ExpensiveChild = memo(function ExpensiveChild({ onClick }) {
  console.log('Child rendered'); // Renders every time!
  return <button onClick={onClick}>Click me</button>;
});
```

## Solution: Memoize Callback

```jsx
// ✅ WITH useCallback
function Parent() {
  const [count, setCount] = useState(0);

  // Same function reference across renders
  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []); // No dependencies - never changes

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}

const ExpensiveChild = memo(function ExpensiveChild({ onClick }) {
  console.log('Child rendered'); // Only once!
  return <button onClick={onClick}>Click me</button>;
});
```

## Real-World Examples

### Example 1: Optimizing Child Components

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Memoize callbacks to prevent child re-renders
  const addTodo = useCallback((text) => {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false }]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}

// Memoized children only re-render when props actually change
const TodoInput = memo(function TodoInput({ onAdd }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
});
```

### Example 2: useCallback with useEffect

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);

  // Memoize fetch function
  const fetchResults = useCallback(async () => {
    const response = await fetch(`/api/search?q=${query}`);
    const data = await response.json();
    setResults(data);
  }, [query]); // Re-create when query changes

  useEffect(() => {
    fetchResults();
  }, [fetchResults]); // fetchResults as dependency

  return (
    <ul>
      {results.map(result => (
        <li key={result.id}>{result.title}</li>
      ))}
    </ul>
  );
}
```

### Example 3: Event Handlers in Lists

```jsx
function UserList({ users }) {
  const [selectedId, setSelectedId] = useState(null);

  // Without useCallback, each user gets a new callback every render
  const handleSelect = useCallback((id) => {
    setSelectedId(id);
    console.log('Selected user:', id);
  }, []);

  return (
    <ul>
      {users.map(user => (
        <UserItem
          key={user.id}
          user={user}
          onSelect={handleSelect}
          isSelected={user.id === selectedId}
        />
      ))}
    </ul>
  );
}

const UserItem = memo(function UserItem({ user, onSelect, isSelected }) {
  return (
    <li
      onClick={() => onSelect(user.id)}
      style={{ fontWeight: isSelected ? 'bold' : 'normal' }}
    >
      {user.name}
    </li>
  );
});
```

## Common Interview Questions

### Q1: What's the difference between useCallback and useMemo?

**Answer:**

| useCallback | useMemo |
|-------------|---------|
| Returns **memoized function** | Returns **memoized value** |
| `useCallback(fn, deps)` | `useMemo(() => value, deps)` |

```jsx
// useCallback - Memoize the function itself
const handleClick = useCallback(() => {
  doSomething();
}, []);

// useMemo - Memoize the result of calling the function
const result = useMemo(() => {
  return computeExpensiveValue();
}, []);

// These are equivalent:
const memoizedCallback = useCallback(fn, deps);
const memoizedCallback = useMemo(() => fn, deps);
```

### Q2: When is useCallback actually useful?

**Answer:**

**Useful when:**
1. Passing callbacks to **memoized child components**
2. Function is a **dependency of hooks** (useEffect, useMemo, etc.)
3. **Expensive inline functions** in large lists

**Not useful when:**
1. Simple event handlers not passed as props
2. Child components aren't memoized
3. Function recreate cost < useCallback overhead

```jsx
// ❌ NOT USEFUL - Child not memoized
function Parent() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);

  return <Child onClick={handleClick} />; // Child always re-renders anyway
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}

// ✅ USEFUL - Child is memoized
const MemoizedChild = memo(Child);

function Parent() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);

  return <MemoizedChild onClick={handleClick} />; // Prevents re-render
}
```

### Q3: Can you use state inside useCallback?

**Answer:** Yes, but you need to **include it in dependencies**:

```jsx
function Component() {
  const [count, setCount] = useState(0);

  // ❌ WRONG - Stale closure
  const handleClick = useCallback(() => {
    console.log(count); // Always logs 0!
  }, []); // Missing count dependency

  // ✅ OPTION 1 - Include in dependencies
  const handleClick = useCallback(() => {
    console.log(count); // Logs current count
  }, [count]); // Re-create when count changes

  // ✅ OPTION 2 - Use functional setState
  const increment = useCallback(() => {
    setCount(c => c + 1); // No count dependency needed
  }, []);

  return (
    <button onClick={increment}>
      Count: {count}
    </button>
  );
}
```

### Q4: What are stale closures and how to avoid them?

**Answer:**

**Stale closure**: When a callback uses an old value because dependencies weren't updated.

```jsx
function Component() {
  const [count, setCount] = useState(0);

  // ❌ STALE CLOSURE
  const logCount = useCallback(() => {
    console.log(count); // Captures initial count (0)
  }, []); // Empty deps!

  // 3 solutions:

  // ✅ Solution 1: Include dependency
  const logCount = useCallback(() => {
    console.log(count);
  }, [count]);

  // ✅ Solution 2: Use ref
  const countRef = useRef(count);
  useEffect(() => { countRef.current = count; }, [count]);

  const logCount = useCallback(() => {
    console.log(countRef.current);
  }, []);

  // ✅ Solution 3: Use functional update
  const increment = useCallback(() => {
    setCount(c => c + 1); // No closure issue
  }, []);
}
```

## Advanced Patterns

### Combining Multiple Callbacks

```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 0
  });

  // Generic field updater
  const updateField = useCallback((field) => {
    return (value) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };
  }, []);

  // Create memoized handlers
  const updateName = useMemo(() => updateField('name'), [updateField]);
  const updateEmail = useMemo(() => updateField('email'), [updateField]);
  const updateAge = useMemo(() => updateField('age'), [updateField]);

  return (
    <form>
      <Input value={formData.name} onChange={updateName} />
      <Input value={formData.email} onChange={updateEmail} />
      <Input value={formData.age} onChange={updateAge} />
    </form>
  );
}
```

### Custom Hook with useCallback

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  // Memoize toggle function
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  // Memoize setters
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, toggle, setTrue, setFalse];
}

// Usage
function Component() {
  const [isOpen, toggle, open, close] = useToggle(false);

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={open}>Open</button>
      <button onClick={close}>Close</button>
      {isOpen && <Modal onClose={close} />}
    </div>
  );
}
```

### Debounced Callback

```jsx
function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

// Usage
function SearchBox() {
  const [query, setQuery] = useState('');

  const search = useDebouncedCallback((value) => {
    console.log('Searching for:', value);
    // API call here
  }, 500);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    search(value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

## Common Pitfalls

### 1. Missing Dependencies

```jsx
// ❌ BAD - Missing dependency
function Component({ userId }) {
  const fetchUser = useCallback(async () => {
    const user = await fetch(`/api/users/${userId}`);
    // Uses userId but not in dependencies!
  }, []);

  // ✅ GOOD - Include all dependencies
  const fetchUser = useCallback(async () => {
    const user = await fetch(`/api/users/${userId}`);
  }, [userId]);
}
```

### 2. Unnecessary useCallback

```jsx
// ❌ BAD - Unnecessary, child not memoized
function Parent() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);

  return <Child onClick={handleClick} />;
}

function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}

// ✅ GOOD - Either skip useCallback or memo the child
function Parent() {
  const handleClick = () => console.log('click');
  return <MemoizedChild onClick={handleClick} />;
}

const MemoizedChild = memo(Child);
```

### 3. Overusing in Event Handlers

```jsx
// ❌ BAD - Not needed for simple onClick
function Component() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return <button onClick={handleClick}>Click</button>;
}

// ✅ GOOD - Inline is fine
function Component() {
  return (
    <button onClick={() => console.log('clicked')}>
      Click
    </button>
  );
}
```

## useCallback + React.memo Pattern

```jsx
// Parent component
function ProductList({ products }) {
  const [cart, setCart] = useState([]);

  // Memoize callbacks
  const addToCart = useCallback((product) => {
    setCart(prev => [...prev, product]);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  }, []);

  return (
    <div>
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          onAdd={addToCart}
          onRemove={removeFromCart}
        />
      ))}
      <Cart items={cart} />
    </div>
  );
}

// Memoized child - only re-renders if props change
const Product = memo(function Product({ product, onAdd, onRemove }) {
  console.log('Rendering product:', product.name);

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => onAdd(product)}>Add to Cart</button>
      <button onClick={() => onRemove(product.id)}>Remove</button>
    </div>
  );
});
```

## Best Practices

1. **Use with React.memo** - Main use case
2. **Include all dependencies** - Use ESLint plugin
3. **Don't overuse** - Has overhead, measure first
4. **Functional updates** - Avoid stale closures
5. **Custom hooks** - Great for reusable callback logic
6. **Combine with useMemo** - For complex optimizations
7. **Profile first** - Use React DevTools to find bottlenecks

## Performance Comparison

```jsx
// Measure impact
function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback
  console.time('without');
  const handleClick1 = () => console.log('click');
  console.timeEnd('without');

  // With useCallback
  console.time('with');
  const handleClick2 = useCallback(() => console.log('click'), []);
  console.timeEnd('with');

  // Result: useCallback is actually slower for simple cases!
  // Only use when preventing child re-renders
}
```

## Key Takeaways

- `useCallback` memoizes functions to maintain same reference
- Primary use: Passing callbacks to memoized child components
- Must include all dependencies in dependency array
- Don't overuse - has overhead, only use when needed
- Prevents stale closures when used correctly
- Combine with `React.memo` for child optimization
- Use ESLint to catch missing dependencies

## Resources

- [useCallback Official Docs](https://react.dev/reference/react/useCallback)
- [React.memo](https://react.dev/reference/react/memo)
- [Performance Optimization](https://react.dev/learn/render-and-commit)
