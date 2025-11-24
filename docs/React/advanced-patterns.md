---
sidebar_position: 27
---

# Advanced React Patterns

## Higher-Order Components (HOC)

**HOC** is a function that takes a component and returns a new component with additional props or behavior.

### Basic HOC

```jsx
// HOC function
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage
function UserList({ users }) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

const UserListWithLoading = withLoading(UserList);

// Use in app
<UserListWithLoading isLoading={loading} users={users} />
```

### Authentication HOC

```jsx
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} user={user} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

### Multiple HOCs

```jsx
const EnhancedComponent = withAuth(withLoading(withTheme(MyComponent)));

// Better with compose
import { compose } from 'redux';

const enhance = compose(
  withAuth,
  withLoading,
  withTheme
);

const EnhancedComponent = enhance(MyComponent);
```

## Render Props

**Render props** is a technique where a component takes a function as a prop that returns React elements.

### Basic Render Props

```jsx
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage
<Mouse render={({ x, y }) => (
  <p>Mouse is at: {x}, {y}</p>
)} />
```

### Children as Function

```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return children({ data, loading });
}

// Usage
<DataFetcher url="/api/users">
  {({ data, loading }) => (
    loading ? <Spinner /> : <UserList users={data} />
  )}
</DataFetcher>
```

## Compound Components

Components that work together to form a complete UI.

### Basic Compound Component

```jsx
// Parent component
function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isActive: index === activeIndex,
          onSelect: () => setActiveIndex(index)
        });
      })}
    </div>
  );
}

// Child component
function Tab({ label, isActive, onSelect, children }) {
  return (
    <div>
      <button
        className={isActive ? 'active' : ''}
        onClick={onSelect}
      >
        {label}
      </button>
      {isActive && <div>{children}</div>}
    </div>
  );
}

// Usage
<Tabs>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
  <Tab label="Tab 3">Content 3</Tab>
</Tabs>
```

### Context-Based Compound Components

```jsx
const TabsContext = createContext();

function Tabs({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ index, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);

  return (
    <button
      className={activeIndex === index ? 'active' : ''}
      onClick={() => setActiveIndex(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  const { activeIndex } = useContext(TabsContext);
  return <div>{React.Children.toArray(children)[activeIndex]}</div>;
}

// Usage
<Tabs>
  <TabList>
    <Tab index={0}>Tab 1</Tab>
    <Tab index={1}>Tab 2</Tab>
    <Tab index={2}>Tab 3</Tab>
  </TabList>
  <TabPanels>
    <div>Panel 1</div>
    <div>Panel 2</div>
    <div>Panel 3</div>
  </TabPanels>
</Tabs>
```

## Controlled vs Uncontrolled Components

### Controlled Component

Parent controls the state:

```jsx
function ControlledInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// Usage
function Form() {
  const [text, setText] = useState('');
  return <ControlledInput value={text} onChange={setText} />;
}
```

### Uncontrolled Component

Component manages its own state:

```jsx
function UncontrolledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

## Custom Hooks Pattern

Extract reusable logic:

```jsx
// Custom hook
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return [value, { toggle, setTrue, setFalse }];
}

// Usage
function Modal() {
  const [isOpen, { toggle, setTrue, setFalse }] = useToggle(false);

  return (
    <>
      <button onClick={setTrue}>Open</button>
      {isOpen && (
        <div className="modal">
          <button onClick={setFalse}>Close</button>
        </div>
      )}
    </>
  );
}
```

## State Reducer Pattern

Give users control over internal state management:

```jsx
function useCounter(initialCount = 0, reducer) {
  const [count, dispatch] = useReducer(
    reducer || defaultReducer,
    initialCount
  );

  const increment = () => dispatch({ type: 'INCREMENT' });
  const decrement = () => dispatch({ type: 'DECREMENT' });
  const reset = () => dispatch({ type: 'RESET', payload: initialCount });

  return { count, increment, decrement, reset };
}

function defaultReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'RESET':
      return action.payload;
    default:
      return state;
  }
}

// Usage with custom reducer
function customReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 2; // Custom: increment by 2
    case 'DECREMENT':
      return Math.max(0, state - 1); // Custom: never go below 0
    default:
      return defaultReducer(state, action);
  }
}

function Counter() {
  const { count, increment, decrement } = useCounter(0, customReducer);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Props Getter Pattern

Provide pre-configured props:

```jsx
function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const getToggleProps = (props = {}) => ({
    ...props,
    onClick: () => setIsOpen(!isOpen),
    'aria-expanded': isOpen,
    'aria-haspopup': true
  });

  const getMenuProps = (props = {}) => ({
    ...props,
    hidden: !isOpen,
    role: 'menu'
  });

  return {
    isOpen,
    getToggleProps,
    getMenuProps
  };
}

// Usage
function Dropdown() {
  const { isOpen, getToggleProps, getMenuProps } = useDropdown();

  return (
    <div>
      <button {...getToggleProps()}>
        Toggle Menu
      </button>
      <ul {...getMenuProps()}>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </div>
  );
}
```

## Common Interview Questions

### Q1: What are Higher-Order Components?

**Answer:**

**HOC** is a function that takes a component and returns a new enhanced component.

```jsx
function withAuth(Component) {
  return function AuthComponent(props) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
}

// Usage
const ProtectedPage = withAuth(Dashboard);
```

**Use cases:** Authentication, logging, data fetching, theming

### Q2: HOC vs Hooks vs Render Props?

**Answer:**

| Pattern | Pros | Cons | Use When |
|---------|------|------|----------|
| **HOC** | Reusable, composable | Wrapper hell, name collisions | Legacy code |
| **Hooks** | Simple, no nesting | Function components only | **Modern (preferred)** |
| **Render Props** | Flexible, explicit | Callback hell | Library APIs |

```jsx
// HOC
const Enhanced = withFeature(Component);

// Hooks (preferred)
function Component() {
  const value = useFeature();
}

// Render Props
<Feature>
  {value => <Component value={value} />}
</Feature>
```

### Q3: What are Compound Components?

**Answer:**

**Compound components** work together as a single unit with shared state.

```jsx
// Example: Tabs
<Tabs>
  <Tab label="Tab 1">Content 1</Tab>
  <Tab label="Tab 2">Content 2</Tab>
</Tabs>

// Components share state internally
// Better API, flexible composition
```

**Benefits:** Flexible, clear API, shared state

### Q4: What is the State Reducer pattern?

**Answer:**

**State Reducer** lets users customize internal state logic:

```jsx
function useCounter(initialCount, reducer) {
  const [count, dispatch] = useReducer(
    reducer || defaultReducer,
    initialCount
  );

  return { count, dispatch };
}

// User provides custom reducer
function customReducer(state, action) {
  // Custom logic
  return state + 2; // Increment by 2 instead of 1
}

const counter = useCounter(0, customReducer);
```

**Benefits:** Flexibility, inversion of control

## When to Use Each Pattern

### Use Hooks:
- ✅ Most cases (modern standard)
- ✅ Reusable logic
- ✅ State management
- ✅ Side effects

### Use HOC:
- Working with legacy code
- Need to wrap many components
- Third-party integration

### Use Render Props:
- Library API design
- Maximum flexibility
- Dynamic rendering logic

### Use Compound Components:
- Related components (tabs, accordion)
- Flexible composition
- Shared implicit state

## Best Practices

1. **Prefer Hooks over HOC** - Simpler, no nesting
2. **Use Compound Components for related UI** - Tabs, Dropdowns
3. **Avoid deeply nested Render Props** - Callback hell
4. **Custom Hooks for logic reuse** - Clean and composable
5. **Props Getter for accessibility** - Pre-configured props
6. **State Reducer for flexibility** - User control over behavior

## Key Takeaways

- **HOC**: Function that wraps component, adds behavior
- **Render Props**: Function as child/prop for flexible rendering
- **Compound Components**: Related components sharing implicit state
- **Custom Hooks**: Modern way to reuse stateful logic (preferred)
- **State Reducer**: Give users control over internal state
- **Props Getter**: Provide pre-configured props for accessibility
- **Use Hooks** for most cases in modern React

## Resources

- [React Patterns](https://reactpatterns.com/)
- [Advanced React Patterns](https://kentcdodds.com/blog/advanced-react-patterns)
- [React Hooks](https://react.dev/reference/react)
