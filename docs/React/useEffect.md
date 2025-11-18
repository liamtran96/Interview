---
sidebar_position: 3
---

# useEffect Hook

## What is useEffect?

`useEffect` is a React Hook that lets you **perform side effects** in functional components. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.

## Basic Syntax

```javascript
useEffect(() => {
  // Side effect code here

  return () => {
    // Cleanup code here (optional)
  };
}, [dependencies]);
```

## What are Side Effects?

Side effects are operations that affect something outside the component:

- **Fetching data** from APIs
- **Subscriptions** (WebSocket, event listeners)
- **DOM manipulation** (updating title, focus management)
- **Timers** (setTimeout, setInterval)
- **Logging** and analytics
- **localStorage** operations

## Dependency Array Patterns

### 1. No Dependency Array - Runs After Every Render

```javascript
useEffect(() => {
  console.log('Runs after every render');
});
```

### 2. Empty Array - Runs Once (Mount Only)

```javascript
useEffect(() => {
  console.log('Runs only once after initial render');

  // Like componentDidMount
  fetchData();
}, []); // Empty array = no dependencies
```

### 3. With Dependencies - Runs When Dependencies Change

```javascript
useEffect(() => {
  console.log('Runs when count changes');
  document.title = `Count: ${count}`;
}, [count]); // Runs when count changes
```

## Common Interview Questions

### Q1: What's the difference between these dependency patterns?

```javascript
// Pattern 1: No array - runs after every render
useEffect(() => {
  console.log('Every render');
});

// Pattern 2: Empty array - runs once
useEffect(() => {
  console.log('Mount only');
}, []);

// Pattern 3: With deps - runs when deps change
useEffect(() => {
  console.log('When count changes');
}, [count]);
```

**Answer:**
- **No array**: Effect runs after every render (risky - can cause infinite loops)
- **Empty array `[]`**: Effect runs only once after initial mount
- **With dependencies**: Effect runs when any dependency value changes

### Q2: How do you clean up side effects?

**Answer:** Return a **cleanup function** from the effect:

```javascript
useEffect(() => {
  // Subscribe
  const subscription = someAPI.subscribe(data => {
    console.log(data);
  });

  // Cleanup function (runs before next effect and on unmount)
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### Q3: When does the cleanup function run?

**Answer:** The cleanup function runs:
1. **Before the next effect runs** (if dependencies changed)
2. **When the component unmounts**

```javascript
useEffect(() => {
  console.log('Effect runs');

  return () => {
    console.log('Cleanup runs');
  };
}, [count]);

// When count changes:
// 1. "Cleanup runs" (from previous effect)
// 2. "Effect runs" (new effect)
```

## Real-World Examples

### Example 1: Data Fetching

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        if (!cancelled) {
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchUser();

    // Cleanup: prevent state update if component unmounts
    return () => {
      cancelled = true;
    };
  }, [userId]); // Re-fetch when userId changes

  if (loading) return <div>Loading...</div>;
  return <div>{user?.name}</div>;
}
```

### Example 2: Event Listeners

```javascript
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty array = add listener once

  return <div>Mouse: ({position.x}, {position.y})</div>;
}
```

### Example 3: Timer/Interval

```javascript
function Countdown({ initialSeconds }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds(s => s - 1);
    }, 1000);

    // Cleanup: clear interval
    return () => clearInterval(timer);
  }, [seconds]); // Re-run when seconds changes

  return <div>Time remaining: {seconds}s</div>;
}
```

### Example 4: Document Title

```javascript
function PageTitle({ title }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    // Restore previous title on unmount
    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return null;
}
```

## Common Pitfalls

### 1. Infinite Loop

```javascript
// ❌ INFINITE LOOP - Missing dependency array
function BadExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // Causes re-render, which triggers effect again!
  }); // No dependency array!
}

// ✅ FIXED - Add dependency array
function GoodExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(c => c + 1);
  }, []); // Runs only once
}
```

### 2. Missing Dependencies

```javascript
// ❌ STALE CLOSURE - Missing count in dependencies
function BadExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Always logs 0!
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Missing count dependency!
}

// ✅ OPTION 1 - Add count to dependencies
function GoodExample1() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Logs current count
    }, 1000);

    return () => clearInterval(timer);
  }, [count]); // Include count
}

// ✅ OPTION 2 - Use functional update
function GoodExample2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => {
        console.log(c); // Always current count
        return c;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // No dependencies needed
}
```

### 3. Race Conditions in Async Effects

```javascript
// ❌ RACE CONDITION - Can update state with stale data
function BadExample({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data); // May be from previous userId!
    }
    fetchUser();
  }, [userId]);
}

// ✅ FIXED - Use cleanup to prevent stale updates
function GoodExample({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();

      if (!cancelled) {
        setUser(data);
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [userId]);
}
```

## useEffect vs useLayoutEffect

| useEffect | useLayoutEffect |
|-----------|----------------|
| Runs **after** paint | Runs **before** paint |
| Asynchronous | Synchronous (blocks paint) |
| Most common use case | DOM measurements, animations |
| Better for performance | Use sparingly |

```javascript
// useLayoutEffect example - measuring DOM
function MeasureComponent() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setHeight(ref.current.offsetHeight);
  }, []);

  return <div ref={ref}>Height: {height}px</div>;
}
```

## Best Practices

1. **Always specify dependencies** - Don't leave the array empty unless intentional
2. **Clean up side effects** - Remove listeners, cancel subscriptions, clear timers
3. **Handle race conditions** - Use cleanup flags for async operations
4. **Use ESLint** - Install `eslint-plugin-react-hooks` to catch missing dependencies
5. **Extract complex effects** - Create custom hooks for reusable logic
6. **Avoid objects/arrays in dependencies** - They create new references each render

## Interview Coding Challenge

**Question:** Create a component that fetches and displays a random user from an API, with a refresh button.

**Solution:**

```javascript
function RandomUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();

        if (!cancelled) {
          setUser(data.results[0]);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      cancelled = true;
    };
  }, [refresh]); // Re-fetch when refresh changes

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user?.name?.first} {user?.name?.last}</h2>
      <button onClick={() => setRefresh(r => r + 1)}>
        Refresh
      </button>
    </div>
  );
}
```

## Key Takeaways

- `useEffect` is for side effects (data fetching, subscriptions, DOM updates)
- Dependency array controls when effect runs
- Always clean up side effects that need it
- Watch out for infinite loops and race conditions
- Use ESLint to catch missing dependencies
