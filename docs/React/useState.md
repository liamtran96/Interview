---
sidebar_position: 2
---

# useState Hook

## What is useState?

`useState` is a React Hook that lets you **add state to functional components**. It returns a stateful value and a function to update it.

## Basic Syntax

```javascript
const [state, setState] = useState(initialValue);
```

- **`state`** - The current state value
- **`setState`** - Function to update the state
- **`initialValue`** - The initial state value (can be any type)

## Simple Example

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Common Interview Questions

### Q1: How does setState work?

**Answer:** `setState` **schedules** a re-render of the component. It doesn't update the state immediately.

```javascript
function Example() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count); // Still 0! State update is async
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### Q2: How do you update state based on previous state?

**Answer:** Use the **functional update form**:

```javascript
// ❌ WRONG - Can cause issues with multiple updates
setCount(count + 1);
setCount(count + 1); // Still only increments by 1!

// ✅ CORRECT - Use functional update
setCount(prevCount => prevCount + 1);
setCount(prevCount => prevCount + 1); // Increments by 2!
```

### Q3: Can you use multiple useState hooks in one component?

**Answer:** Yes! You can have multiple state variables:

```javascript
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
    </form>
  );
}
```

### Q4: What types of values can useState hold?

**Answer:** **Any JavaScript type**:

```javascript
// Primitives
const [count, setCount] = useState(0);
const [name, setName] = useState('John');
const [isActive, setIsActive] = useState(true);

// Objects
const [user, setUser] = useState({ name: 'John', age: 30 });

// Arrays
const [items, setItems] = useState([1, 2, 3]);

// Functions (use lazy initialization)
const [value, setValue] = useState(() => expensiveComputation());
```

## Updating Objects and Arrays

:::warning Important
State should be treated as **immutable**. Always create new objects/arrays instead of modifying existing ones.
:::

### Updating Objects

```javascript
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
    email: 'john@example.com'
  });

  // ❌ WRONG - Mutating state directly
  function updateAge() {
    user.age = 31; // Don't do this!
    setUser(user);
  }

  // ✅ CORRECT - Create new object
  function updateAge() {
    setUser({
      ...user,
      age: 31
    });
  }

  // ✅ ALSO CORRECT - Using functional update
  function updateAge() {
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  }
}
```

### Updating Arrays

```javascript
function TodoList() {
  const [todos, setTodos] = useState(['Task 1', 'Task 2']);

  // Add item
  function addTodo(newTodo) {
    setTodos([...todos, newTodo]); // or todos.concat(newTodo)
  }

  // Remove item
  function removeTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  // Update item
  function updateTodo(index, newValue) {
    setTodos(todos.map((todo, i) =>
      i === index ? newValue : todo
    ));
  }
}
```

## Lazy Initialization

If your initial state requires **expensive computation**, use a function:

```javascript
// ❌ BAD - Runs on every render
const [state, setState] = useState(expensiveComputation());

// ✅ GOOD - Runs only once
const [state, setState] = useState(() => expensiveComputation());
```

Example:

```javascript
function Component() {
  // This runs only on first render
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('data');
    return stored ? JSON.parse(stored) : [];
  });
}
```

## Common Pitfalls

### 1. Stale State in Callbacks

```javascript
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // ❌ This uses stale count value
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps - count is always 0 in this closure

  // ✅ Solution: Use functional update
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
```

### 2. Object Reference Issues

```javascript
function App() {
  const [user, setUser] = useState({ name: 'John' });

  // ❌ React won't re-render if object reference is same
  function updateName() {
    user.name = 'Jane';
    setUser(user); // Same reference!
  }

  // ✅ Create new object
  function updateName() {
    setUser({ ...user, name: 'Jane' });
  }
}
```

## Interview Coding Challenge

**Question:** Create a toggle button component that switches between "ON" and "OFF".

**Solution:**

```javascript
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

// Alternative with functional update (better for complex logic)
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(prev => !prev)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

## Best Practices

1. **Use functional updates** when new state depends on old state
2. **Don't mutate state** - always create new objects/arrays
3. **Use lazy initialization** for expensive initial values
4. **Split related state** into separate useState calls for better organization
5. **Consider useReducer** for complex state logic

## Key Takeaways

- `useState` adds state to functional components
- State updates are asynchronous
- Always treat state as immutable
- Use functional updates for state that depends on previous value
- Can have multiple useState hooks in one component
