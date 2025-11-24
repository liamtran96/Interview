---
sidebar_position: 11
---

# Concurrent Features (React 18+)

## What are Concurrent Features?

React 18 introduced **Concurrent Rendering**, allowing React to pause, resume, or abandon rendering work. This enables better user experiences by keeping the UI responsive during expensive updates.

## Key Concurrent Hooks

### 1. useTransition
### 2. useDeferredValue

## useTransition

`useTransition` lets you mark state updates as **non-urgent** (transitions), keeping the UI responsive.

### Basic Syntax

```javascript
const [isPending, startTransition] = useTransition();
```

- **`isPending`** - Boolean indicating if transition is in progress
- **`startTransition`** - Function to mark updates as transitions

### Problem: Blocking Updates

```jsx
// ❌ WITHOUT useTransition - UI freezes during filtering
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Expensive filtering blocks typing!
    const filtered = hugeList.filter(item =>
      item.name.includes(value)
    );
    setResults(filtered);
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {/* Input feels laggy */}
      <ResultsList items={results} />
    </div>
  );
}
```

### Solution: Mark as Transition

```jsx
// ✅ WITH useTransition - Input stays responsive
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    const value = e.target.value;

    // Update input immediately (urgent)
    setQuery(value);

    // Defer expensive filtering (non-urgent)
    startTransition(() => {
      const filtered = hugeList.filter(item =>
        item.name.includes(value)
      );
      setResults(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ResultsList items={results} />
    </div>
  );
}
```

### Real-World Example: Tab Switching

```jsx
function TabContainer() {
  const [tab, setTab] = useState('about');
  const [isPending, startTransition] = useTransition();

  const selectTab = (nextTab) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <button onClick={() => selectTab('about')}>About</button>
      <button onClick={() => selectTab('posts')}>Posts</button>
      <button onClick={() => selectTab('contact')}>Contact</button>

      {isPending && <Spinner />}

      {tab === 'about' && <AboutTab />}
      {tab === 'posts' && <PostsTab />} {/* Expensive to render */}
      {tab === 'contact' && <ContactTab />}
    </div>
  );
}
```

## useDeferredValue

`useDeferredValue` lets you defer updating a value, showing the old value while new value loads.

### Basic Syntax

```javascript
const deferredValue = useDeferredValue(value);
```

- **`value`** - The value you want to defer
- **Returns** - Deferred version of the value

### When to Use

- **useTransition**: When you control the state update
- **useDeferredValue**: When you receive a prop/value from parent

### Example: Deferred Search

```jsx
function SearchPage({ query }) {
  // Defer the query value
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div>
      <SearchInput value={query} /> {/* Updates immediately */}
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <SearchResults query={deferredQuery} /> {/* Updates later */}
      </div>
    </div>
  );
}
```

### Comparison

```jsx
// Using useTransition
function Component() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (value) => {
    setQuery(value);
    startTransition(() => {
      // Deferred update
    });
  };
}

// Using useDeferredValue
function Component({ query }) {
  const deferredQuery = useDeferredValue(query);

  return <Results query={deferredQuery} />;
}
```

## Common Interview Questions

### Q1: What is concurrent rendering?

**Answer:**

**Concurrent rendering** allows React to work on multiple renders simultaneously and interrupt rendering work.

**Key benefits:**
1. **Keeps UI responsive** - Can pause expensive renders
2. **Better UX** - Prioritizes urgent updates
3. **Automatic batching** - Groups state updates
4. **Smoother transitions** - Between UI states

**Example:**
```jsx
// React can interrupt this expensive render
startTransition(() => {
  setHugeList(newData); // Non-urgent
});

// To handle this urgent update
setQuery(userInput); // Urgent - immediate
```

### Q2: useTransition vs useDeferredValue?

**Answer:**

| useTransition | useDeferredValue |
|---------------|------------------|
| You control the update | Value comes from parent |
| Wrap setState in startTransition | Defer a prop/value |
| Get isPending state | No pending state |
| For event handlers | For derived values |

```jsx
// useTransition - you control the update
const [isPending, startTransition] = useTransition();
startTransition(() => setData(newData));

// useDeferredValue - defer a value
const deferredValue = useDeferredValue(propValue);
```

### Q3: What's the difference between transitions and regular updates?

**Answer:**

| Regular Updates | Transitions |
|-----------------|-------------|
| **Urgent** - Block UI | **Non-urgent** - Interruptible |
| User input, clicks | Filtering, sorting |
| Can't be interrupted | Can be interrupted |
| Immediate | Can be delayed |

```jsx
// Regular update - urgent
setQuery(e.target.value); // Input must update now!

// Transition - non-urgent
startTransition(() => {
  setResults(filtered); // Can wait if needed
});
```

### Q4: Does useTransition work with Suspense?

**Answer:** Yes! They work great together:

```jsx
function App() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const selectTab = (nextTab) => {
    startTransition(() => {
      setTab(nextTab);
    });
  };

  return (
    <div>
      <Tabs onSelect={selectTab} />
      <Suspense fallback={<Spinner />}>
        {isPending ? <PreviousTab /> : <NextTab tab={tab} />}
      </Suspense>
    </div>
  );
}
```

## Advanced Patterns

### Optimistic UI with useTransition

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [isPending, startTransition] = useTransition();

  const addTodo = async (text) => {
    // Optimistic update
    const optimisticTodo = { id: Date.now(), text, pending: true };
    setTodos(prev => [...prev, optimisticTodo]);

    // Actual API call (transition)
    startTransition(async () => {
      const newTodo = await api.createTodo(text);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === optimisticTodo.id ? newTodo : todo
        )
      );
    });
  };

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      {isPending && <p>Saving...</p>}
      <TodoList todos={todos} />
    </div>
  );
}
```

### Debouncing with useDeferredValue

```jsx
function SearchWithDebounce() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // This only runs when deferredQuery changes (after debounce)
  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/search?q=${deferredQuery}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(setResults);

    return () => controller.abort();
  }, [deferredQuery]);

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <Results query={deferredQuery} />
    </div>
  );
}
```

### Progressive Enhancement

```jsx
function DataGrid({ data }) {
  const [sortedData, setSortedData] = useState(data);
  const [isPending, startTransition] = useTransition();

  const sort = (column) => {
    startTransition(() => {
      const sorted = [...data].sort((a, b) =>
        a[column] > b[column] ? 1 : -1
      );
      setSortedData(sorted);
    });
  };

  return (
    <div>
      <button onClick={() => sort('name')}>Sort by Name</button>
      <button onClick={() => sort('date')}>Sort by Date</button>

      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {sortedData.map(item => (
          <DataRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
```

## Best Practices

1. **Use for expensive updates** - Not all updates need transitions
2. **Show pending state** - Use isPending for loading indicators
3. **Keep input responsive** - Never wrap input updates in transitions
4. **Combine with Suspense** - Better loading states
5. **Test on slow devices** - Benefits more noticeable
6. **Don't overuse** - Only for CPU-intensive updates

## Common Pitfalls

### 1. Wrapping Urgent Updates

```jsx
// ❌ BAD - Input feels laggy
startTransition(() => {
  setQuery(e.target.value); // User input should be urgent!
});

// ✅ GOOD - Keep input immediate
setQuery(e.target.value);
startTransition(() => {
  setResults(filtered); // Only defer expensive work
});
```

### 2. Not Using isPending

```jsx
// ❌ BAD - No feedback during transition
const [, startTransition] = useTransition();

// ✅ GOOD - Show feedback
const [isPending, startTransition] = useTransition();

return (
  <div>
    {isPending && <Spinner />}
    <Results />
  </div>
);
```

### 3. Expecting Immediate Updates

```jsx
// ❌ BAD - Don't rely on immediate updates
startTransition(() => {
  setData(newData);
  console.log(data); // Still old data!
});

// ✅ GOOD - Use callback or effect
startTransition(() => {
  setData(newData);
});

useEffect(() => {
  console.log(data); // New data
}, [data]);
```

## Key Takeaways

- **useTransition**: Mark updates as non-urgent, keep UI responsive
- **useDeferredValue**: Defer updating a value to show stale content
- Concurrent features improve perceived performance
- Use isPending to show loading states
- Don't wrap urgent updates (user input) in transitions
- Works great with Suspense for better UX
- React 18+ feature

## Resources

- [useTransition Docs](https://react.dev/reference/react/useTransition)
- [useDeferredValue Docs](https://react.dev/reference/react/useDeferredValue)
- [Concurrent React](https://react.dev/blog/2022/03/29/react-v18)
