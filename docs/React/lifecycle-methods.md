---
sidebar_position: 22
---

# Lifecycle Methods (Class Components)

## What are Lifecycle Methods?

**Lifecycle methods** are special methods in class components that run at specific points in a component's life. While **function components with hooks are now preferred**, understanding lifecycle methods is important for:
- Maintaining legacy codebases
- Interview questions
- Understanding React fundamentals

## Component Lifecycle Phases

```
Mounting → Updating → Unmounting
   ↓         ↓           ↓
  Born    Changes      Dies
```

## Lifecycle Diagram

```
MOUNTING
├─ constructor()
├─ static getDerivedStateFromProps()
├─ render()
├─ componentDidMount()

UPDATING (props/state change)
├─ static getDerivedStateFromProps()
├─ shouldComponentUpdate()
├─ render()
├─ getSnapshotBeforeUpdate()
└─ componentDidUpdate()

UNMOUNTING
└─ componentWillUnmount()

ERROR HANDLING
├─ static getDerivedStateFromError()
└─ componentDidCatch()
```

## Mounting Phase

Methods called when component is being inserted into the DOM.

### 1. constructor()

**Purpose:** Initialize state and bind methods

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props); // Must call super first!

    // Initialize state
    this.state = {
      count: 0,
      data: null
    };

    // Bind methods (if not using arrow functions)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return <button onClick={this.handleClick}>{this.state.count}</button>;
  }
}
```

**Rules:**
- Must call `super(props)` first
- Don't call `setState()` here
- Don't cause side effects or subscriptions

### 2. static getDerivedStateFromProps()

**Purpose:** Update state based on props changes (rarely needed)

```jsx
class MyComponent extends React.Component {
  state = { derivedValue: null };

  static getDerivedStateFromProps(props, state) {
    // Return object to update state, or null for no update
    if (props.value !== state.derivedValue) {
      return { derivedValue: props.value };
    }
    return null;
  }

  render() {
    return <div>{this.state.derivedValue}</div>;
  }
}
```

### 3. render()

**Purpose:** Return JSX to display

```jsx
render() {
  return (
    <div>
      <h1>{this.props.title}</h1>
      <p>{this.state.count}</p>
    </div>
  );
}
```

**Rules:**
- Must be pure (no side effects)
- Don't modify state
- Returns JSX, null, string, number, portal, or fragment

### 4. componentDidMount()

**Purpose:** Side effects after component mounts (API calls, subscriptions, timers)

```jsx
componentDidMount() {
  // Fetch data
  fetch('/api/users')
    .then(res => res.json())
    .then(data => this.setState({ users: data }));

  // Start timer
  this.timer = setInterval(() => {
    this.setState({ time: Date.now() });
  }, 1000);

  // Add event listener
  window.addEventListener('resize', this.handleResize);

  // Direct DOM manipulation (if needed)
  this.element.focus();
}
```

**Equivalent hook:** `useEffect(() => { ... }, [])`

## Updating Phase

Methods called when props or state change.

### 1. shouldComponentUpdate()

**Purpose:** Optimize by preventing unnecessary renders

```jsx
shouldComponentUpdate(nextProps, nextState) {
  // Return false to skip render
  if (this.props.id === nextProps.id) {
    return false; // No need to re-render
  }
  return true;
}
```

**Equivalent:** `React.memo()` or `useMemo()`

### 2. getSnapshotBeforeUpdate()

**Purpose:** Capture DOM info before update (rarely needed)

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  // Capture scroll position before update
  if (prevProps.list.length < this.props.list.length) {
    return this.listRef.scrollHeight;
  }
  return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // Use snapshot to adjust scroll
  if (snapshot !== null) {
    this.listRef.scrollTop += this.listRef.scrollHeight - snapshot;
  }
}
```

### 3. componentDidUpdate()

**Purpose:** Side effects after update

```jsx
componentDidUpdate(prevProps, prevState, snapshot) {
  // Fetch new data when prop changes
  if (this.props.userId !== prevProps.userId) {
    this.fetchUser(this.props.userId);
  }

  // Update DOM
  if (this.state.count !== prevState.count) {
    document.title = `Count: ${this.state.count}`;
  }
}
```

**Equivalent hook:** `useEffect(() => { ... }, [dependencies])`

**Rules:**
- Can call `setState()` but wrap in condition to avoid infinite loop
- Compare with prevProps/prevState before making changes

## Unmounting Phase

### componentWillUnmount()

**Purpose:** Cleanup before component is destroyed

```jsx
componentWillUnmount() {
  // Clear timers
  clearInterval(this.timer);

  // Remove event listeners
  window.removeEventListener('resize', this.handleResize);

  // Cancel network requests
  this.abortController.abort();

  // Unsubscribe
  this.subscription.unsubscribe();
}
```

**Equivalent hook:** Cleanup function in `useEffect`

```jsx
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  };
}, []);
```

## Error Handling

### 1. static getDerivedStateFromError()

**Purpose:** Update state when error occurs

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

### 2. componentDidCatch()

**Purpose:** Log error information

```jsx
componentDidCatch(error, errorInfo) {
  console.error('Error:', error);
  console.error('Component stack:', errorInfo.componentStack);

  // Log to error tracking service
  logErrorToService(error, errorInfo);
}
```

## Complete Example

```jsx
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    this.abortController?.abort();
  }

  fetchUser = async () => {
    this.setState({ loading: true, error: null });

    this.abortController = new AbortController();

    try {
      const response = await fetch(`/api/users/${this.props.userId}`, {
        signal: this.abortController.signal
      });
      const user = await response.json();
      this.setState({ user, loading: false });
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.setState({ error: error.message, loading: false });
      }
    }
  };

  render() {
    const { user, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!user) return <div>No user found</div>;

    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    );
  }
}
```

## Hooks Equivalent

| Class Lifecycle | Hooks Equivalent |
|----------------|------------------|
| `constructor()` | `useState()` |
| `componentDidMount()` | `useEffect(() => {...}, [])` |
| `componentDidUpdate()` | `useEffect(() => {...}, [deps])` |
| `componentWillUnmount()` | `useEffect(() => { return () => {...} }, [])` |
| `shouldComponentUpdate()` | `React.memo()`, `useMemo()` |
| `getDerivedStateFromProps()` | Update state during render |
| `componentDidCatch()` | No hook equivalent (use class) |

### Conversion Example

```jsx
// Class component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  componentWillUnmount() {
    document.title = 'React App';
  }

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}

// Function component with hooks
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;

    return () => {
      document.title = 'React App';
    };
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

## Common Interview Questions

### Q1: What are the main lifecycle phases?

**Answer:**

**Three main phases:**
1. **Mounting** - Component is created and inserted into DOM
2. **Updating** - Component re-renders due to prop/state changes
3. **Unmounting** - Component is removed from DOM

**Plus error handling:**
4. **Error** - Component catches errors in children

### Q2: When does componentDidMount() run?

**Answer:**

`componentDidMount()` runs **once after the component mounts** (inserted into DOM).

**Use for:**
- API calls
- Setting up subscriptions
- Timers
- DOM manipulation

**Equivalent:** `useEffect(() => { ... }, [])`

### Q3: How do you prevent unnecessary re-renders?

**Answer:**

**Use `shouldComponentUpdate()`:**

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return this.props.id !== nextProps.id;
}
```

**Or extend `PureComponent`:**

```jsx
class MyComponent extends React.PureComponent {
  // Automatically does shallow comparison
}
```

**Hooks equivalent:** `React.memo()`

### Q4: What's the difference between componentWillMount and componentDidMount?

**Answer:**

- **componentWillMount** (deprecated) - Ran before render
- **componentDidMount** - Runs after first render

**Why componentWillMount was removed:**
- Could run multiple times with async rendering
- Side effects should happen after mount
- Use constructor for initialization instead

**Use componentDidMount for:**
- API calls
- Subscriptions
- Any side effects

## Deprecated Lifecycle Methods

These are **deprecated** and should not be used:

- ❌ `componentWillMount()`
- ❌ `componentWillReceiveProps()`
- ❌ `componentWillUpdate()`

**Use instead:**
- `componentDidMount()`
- `componentDidUpdate()`
- `getDerivedStateFromProps()`

## Best Practices

1. **Use function components** - Hooks are simpler and more powerful
2. **Clean up in componentWillUnmount** - Prevent memory leaks
3. **Avoid getDerivedStateFromProps** - Usually unnecessary
4. **Compare props in componentDidUpdate** - Prevent infinite loops
5. **Use Error Boundaries** - Catch errors gracefully
6. **Don't call setState in constructor** - Initialize directly
7. **Cancel async in unmount** - Prevent "setState on unmounted component" warnings

## Key Takeaways

- Lifecycle methods are for class components
- Three phases: Mounting, Updating, Unmounting
- componentDidMount: After first render (like useEffect with [])
- componentDidUpdate: After re-render (like useEffect with deps)
- componentWillUnmount: Before removal (like useEffect cleanup)
- Function components with hooks are now preferred
- Error boundaries still require class components

## Resources

- [Lifecycle Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [React Component Docs](https://react.dev/reference/react/Component)
- [Legacy Lifecycle Methods](https://legacy.reactjs.org/docs/react-component.html)
