---
sidebar_position: 4
---

# Custom Hooks

## What are Custom Hooks?

Custom hooks are **JavaScript functions** that let you extract and reuse stateful logic across multiple components. They follow the same rules as built-in hooks and must start with the word "use".

## Why Use Custom Hooks?

1. **Reuse logic** across components
2. **Cleaner components** - separate concerns
3. **Easier testing** - test logic independently
4. **Better organization** - keep related logic together

## Basic Structure

```javascript
function useCustomHook(initialValue) {
  // Use built-in hooks
  const [state, setState] = useState(initialValue);

  // Custom logic
  function customFunction() {
    // ...
  }

  // Return what you need
  return { state, customFunction };
}
```

:::tip Naming Convention
Always start custom hook names with `use` (e.g., `useFetch`, `useAuth`, `useLocalStorage`). This tells React it's a hook and helps enforce the Rules of Hooks.
:::

## Common Custom Hooks Examples

### 1. useLocalStorage - Persist State

```javascript
function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value) => {
    try {
      // Allow value to be a function like useState
      const valueToStore = value instanceof Function
        ? value(storedValue)
        : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function App() {
  const [name, setName] = useLocalStorage('name', 'Guest');

  return (
    <input
      value={name}
      onChange={e => setName(e.target.value)}
    />
  );
}
```

### 2. useFetch - Data Fetching

```javascript
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function Users() {
  const { data, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 3. useToggle - Boolean State

```javascript
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// Usage
function Menu() {
  const [isOpen, toggleMenu] = useToggle(false);

  return (
    <div>
      <button onClick={toggleMenu}>
        {isOpen ? 'Close' : 'Open'} Menu
      </button>
      {isOpen && <nav>Menu items...</nav>}
    </div>
  );
}
```

### 4. useDebounce - Delay State Updates

```javascript
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout to update debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timeout if value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage - Search with debounce
function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch) {
      // Make API call with debounced search term
      console.log('Searching for:', debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="Search users..."
    />
  );
}
```

### 5. useWindowSize - Track Window Dimensions

```javascript
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Usage
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
      {width < 768 ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### 6. usePrevious - Get Previous Value

```javascript
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## Common Interview Questions

### Q1: What are the rules for creating custom hooks?

**Answer:**
1. **Name must start with "use"** - e.g., `useFetch`, `useAuth`
2. **Follow Rules of Hooks** - only call at top level, only in React functions
3. **Can use other hooks** - both built-in and custom hooks
4. **Should be pure functions** - same inputs = same outputs

### Q2: Can custom hooks return anything?

**Answer:** Yes! Custom hooks can return:
- **Arrays** (like `useState`): `[value, setValue]`
- **Objects**: `{ data, loading, error }`
- **Primitives**: just a value
- **Nothing**: `undefined` for hooks with only side effects

Choose based on what's most convenient for users of your hook.

### Q3: Do custom hooks share state between components?

**Answer:** **No!** Each component that uses a custom hook gets its own **isolated state**. Custom hooks share **logic**, not state.

```javascript
function ComponentA() {
  const [value] = useLocalStorage('key', 0); // Independent state
}

function ComponentB() {
  const [value] = useLocalStorage('key', 0); // Separate independent state
}
```

Both components have their own state, but the logic for localStorage is shared.

## Advanced Custom Hook Patterns

### Combining Multiple Hooks

```javascript
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use another custom hook
  const debouncedUrl = useDebounce(url, 300);

  useEffect(() => {
    // Fetch with debounced URL
    // ...
  }, [debouncedUrl]);

  return { data, loading, error };
}
```

### Returning Callbacks

```javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
}

// Usage
function App() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Testing Custom Hooks

Use `@testing-library/react-hooks`:

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

test('should increment counter', () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## Best Practices

1. **Start with "use"** - Required for React to identify it as a hook
2. **Keep hooks focused** - One hook, one responsibility
3. **Document your hooks** - Explain parameters and return values
4. **Handle edge cases** - null checks, error handling, cleanup
5. **Make hooks reusable** - Accept parameters to customize behavior
6. **Return consistent shape** - Don't change return type based on conditions
7. **Use TypeScript** - Add type safety to your hooks

## Common Use Cases for Custom Hooks

- **Form handling** - `useForm`, `useFormField`
- **Authentication** - `useAuth`, `useUser`
- **API calls** - `useFetch`, `useQuery`, `useMutation`
- **Browser APIs** - `useLocalStorage`, `useMediaQuery`, `useGeolocation`
- **UI state** - `useToggle`, `useModal`, `useToast`
- **Performance** - `useDebounce`, `useThrottle`, `useMemoCompare`

## Interview Coding Challenge

**Question:** Create a custom hook `useArray` that provides helper methods for array manipulation.

**Solution:**

```javascript
function useArray(initialArray = []) {
  const [array, setArray] = useState(initialArray);

  const push = useCallback((element) => {
    setArray(arr => [...arr, element]);
  }, []);

  const filter = useCallback((callback) => {
    setArray(arr => arr.filter(callback));
  }, []);

  const update = useCallback((index, newElement) => {
    setArray(arr => [
      ...arr.slice(0, index),
      newElement,
      ...arr.slice(index + 1)
    ]);
  }, []);

  const remove = useCallback((index) => {
    setArray(arr => [
      ...arr.slice(0, index),
      ...arr.slice(index + 1)
    ]);
  }, []);

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  return { array, set: setArray, push, filter, update, remove, clear };
}

// Usage
function TodoList() {
  const { array: todos, push, remove } = useArray([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    push(input);
    setInput('');
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => remove(i)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Key Takeaways

- Custom hooks extract reusable logic from components
- Must start with "use" and follow Rules of Hooks
- Each component gets its own isolated state
- Can combine multiple hooks to create powerful abstractions
- Great for DRY (Don't Repeat Yourself) principle
- Make code more maintainable and testable
