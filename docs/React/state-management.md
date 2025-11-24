---
sidebar_position: 15
---

# State Management Patterns

## What is State Management?

**State management** is how you organize and manage data that changes over time in your React application. Proper state management is crucial for maintainable, scalable applications.

## Types of State

### 1. Local State
State used by a single component.

```jsx
function Counter() {
  const [count, setCount] = useState(0); // Local state

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 2. Shared State
State used by multiple components.

```jsx
function Parent() {
  const [user, setUser] = useState(null); // Shared state

  return (
    <div>
      <Header user={user} />
      <Profile user={user} setUser={setUser} />
      <Settings user={user} />
    </div>
  );
}
```

### 3. Global State
State accessible anywhere in the app.

```jsx
// Global state with Context
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router />
    </UserContext.Provider>
  );
}
```

## Lifting State Up

**Lifting state up** means moving state to the closest common ancestor.

### Problem: Sibling Communication

```jsx
// ❌ Siblings can't share state directly
function App() {
  return (
    <div>
      <ComponentA /> {/* Has count state */}
      <ComponentB /> {/* Needs count */}
    </div>
  );
}
```

### Solution: Lift to Parent

```jsx
// ✅ Lift state to common parent
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ComponentA count={count} setCount={setCount} />
      <ComponentB count={count} />
    </div>
  );
}

function ComponentA({ count, setCount }) {
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

function ComponentB({ count }) {
  return <p>Count is: {count}</p>;
}
```

## Prop Drilling

**Prop drilling** is passing props through intermediate components that don't need them.

### Problem

```jsx
// ❌ Prop drilling - passing through many levels
function App() {
  const [user, setUser] = useState(null);

  return <Dashboard user={user} setUser={setUser} />;
}

function Dashboard({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />; // Just passing through
}

function Sidebar({ user, setUser }) {
  return <UserMenu user={user} setUser={setUser} />; // Still passing through
}

function UserMenu({ user, setUser }) {
  return <div>{user?.name}</div>; // Finally used here!
}
```

### Solutions

#### Solution 1: Context API

```jsx
// ✅ Use Context to avoid prop drilling
const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Dashboard />
    </UserContext.Provider>
  );
}

function Dashboard() {
  return <Sidebar />; // No props!
}

function Sidebar() {
  return <UserMenu />; // No props!
}

function UserMenu() {
  const { user, setUser } = useContext(UserContext); // Direct access!
  return <div>{user?.name}</div>;
}
```

#### Solution 2: Component Composition

```jsx
// ✅ Composition - pass components instead of data
function App() {
  const [user, setUser] = useState(null);

  return (
    <Dashboard>
      <Sidebar>
        <UserMenu user={user} setUser={setUser} />
      </Sidebar>
    </Dashboard>
  );
}

function Dashboard({ children }) {
  return <div className="dashboard">{children}</div>;
}

function Sidebar({ children }) {
  return <aside>{children}</aside>;
}

function UserMenu({ user, setUser }) {
  return <div>{user?.name}</div>;
}
```

## State Management Patterns

### 1. Local State (useState)

**When to use:**
- State only used by one component
- Simple, independent state
- UI-only state (open/closed, selected)

```jsx
function Accordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>Content</div>}
    </div>
  );
}
```

### 2. Lifted State

**When to use:**
- Multiple components need same state
- Sibling communication
- Parent controls child state

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);

  return (
    <div>
      <TodoInput onAdd={(todo) => setTodos([...todos, todo])} />
      <TodoList todos={todos} onToggle={(id) => {/* update */}} />
      <TodoStats todos={todos} />
    </div>
  );
}
```

### 3. Context (useContext)

**When to use:**
- Many components at different levels need state
- Avoid prop drilling
- Theme, auth, language

```jsx
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
    Toggle theme
  </button>;
}
```

### 4. Reducer (useReducer)

**When to use:**
- Complex state logic
- Multiple related state values
- State transitions

```jsx
const initialState = { count: 0, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count]
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

### 5. External Libraries

**When to use:**
- Large-scale apps
- Complex global state
- Advanced features (devtools, middleware, persistence)

#### Redux

```jsx
// Store
const store = createStore(rootReducer);

// Provider
function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

// Usage
function Component() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch({ type: 'INCREMENT' })}>
      {count}
    </button>
  );
}
```

#### Zustand (Simpler Alternative)

```jsx
import create from 'zustand';

// Store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 })
}));

// Usage
function Component() {
  const { count, increment, reset } = useStore();

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

## Common Interview Questions

### Q1: What is lifting state up and when should you do it?

**Answer:**

**Lifting state up** means moving state to the nearest common ancestor component.

**When to lift:**
- Multiple components need same state
- Sibling components need to communicate
- Parent needs to control child state

**Example:**
```jsx
// Before: Each has own state
function ComponentA() {
  const [value, setValue] = useState('');
}

function ComponentB() {
  const [value, setValue] = useState(''); // Duplicate!
}

// After: Lifted to parent
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <ComponentA value={value} setValue={setValue} />
      <ComponentB value={value} />
    </>
  );
}
```

### Q2: What is prop drilling and how do you avoid it?

**Answer:**

**Prop drilling** is passing props through intermediate components that don't use them.

**Solutions:**
1. **Context API** - Direct access without drilling
2. **Component composition** - Pass components as children
3. **State management library** - Redux, Zustand

```jsx
// Prop drilling problem
<A user={user}>
  <B user={user}>
    <C user={user}>
      <D user={user} /> {/* Finally used */}
    </C>
  </B>
</A>

// Solution: Context
<UserContext.Provider value={user}>
  <A>
    <B>
      <C>
        <D /> {/* useContext(UserContext) */}
      </C>
    </B>
  </A>
</UserContext.Provider>
```

### Q3: When should you use Context vs Redux?

**Answer:**

| Context | Redux |
|---------|-------|
| Built into React | External library |
| Simple API | More boilerplate |
| Good for infrequent updates | Optimized for frequent updates |
| Theme, auth, i18n | Complex global state |
| Small to medium apps | Large apps |

**Use Context when:**
- Simple global state
- Infrequent updates
- Don't need middleware/devtools

**Use Redux when:**
- Complex state logic
- Need middleware (logging, async)
- Advanced devtools
- Time-travel debugging

### Q4: What's the difference between local and global state?

**Answer:**

| Local State | Global State |
|-------------|--------------|
| Single component | Many components |
| useState, useReducer | Context, Redux |
| UI state (open/closed) | User data, theme |
| Fast, simple | More complex |

```jsx
// Local state
function Modal() {
  const [isOpen, setIsOpen] = useState(false); // Local
}

// Global state
const UserContext = createContext();
function App() {
  const [user, setUser] = useState(null); // Global
  return (
    <UserContext.Provider value={user}>
      <Router />
    </UserContext.Provider>
  );
}
```

## Best Practices

1. **Keep state as local as possible** - Only lift when needed
2. **Choose the right tool** - Don't use Redux for everything
3. **Avoid prop drilling** - Use Context or composition
4. **Normalize state shape** - Flat structures, not nested
5. **Single source of truth** - Don't duplicate state
6. **Derived state** - Calculate from existing state, don't store
7. **Colocate state** - Keep state close to where it's used

## State Management Decision Tree

```
Is state used by one component?
└─ Yes → useState (local state)
└─ No → Is it used by siblings?
    └─ Yes → Lift to parent
    └─ No → Is it used across many levels?
        └─ Yes → Context or state library
        └─ Complex logic?
            └─ Yes → useReducer or Redux
            └─ No → Context
```

## Key Takeaways

- Start with local state, lift only when needed
- Prop drilling is when props pass through unused components
- Context solves prop drilling for infrequent updates
- useReducer for complex state logic
- External libraries (Redux, Zustand) for large-scale apps
- Keep state as local and simple as possible

## Resources

- [Managing State](https://react.dev/learn/managing-state)
- [Choosing State Structure](https://react.dev/learn/choosing-the-state-structure)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Zustand](https://github.com/pmndrs/zustand)
