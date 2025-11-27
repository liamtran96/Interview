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

## State Batching and Queueing

### How React Batches State Updates

React **batches multiple state updates** in event handlers to prevent unnecessary re-renders and improve performance.

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);  // Doesn't re-render yet
    setCount(count + 1);  // Doesn't re-render yet
    setCount(count + 1);  // Batched - only 1 re-render after handler completes
    console.log(count);   // Still 0! Updates happen after handler
  }

  // Result: count is still 1, not 3!
  // All three updates use the same count value (0)
  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Why batching matters:**
- **Performance** - One re-render instead of three
- **Consistency** - No partial UI states
- **Predictability** - All state updates complete together

### The Update Queue

React processes state updates **sequentially** in a queue during the next render.

#### Direct Values (Replaces Queue)

```javascript
function handleClick() {
  setNumber(number + 5);  // Replace with number + 5
  setNumber(number + 5);  // Replace with number + 5
  setNumber(number + 5);  // Replace with number + 5
}
// Result: number + 5 (not number + 15)
// Each update uses the same snapshot value
```

**What happens:**
1. Start with `number = 0`
2. Queue: "replace with 0 + 5"
3. Queue: "replace with 0 + 5"
4. Queue: "replace with 0 + 5"
5. React processes queue → Final value: `5`

#### Updater Functions (Updates Queue)

```javascript
function handleClick() {
  setNumber(n => n + 5);  // Update: take prev, add 5
  setNumber(n => n + 5);  // Update: take prev, add 5
  setNumber(n => n + 5);  // Update: take prev, add 5
}
// Result: number + 15 (each update builds on previous)
```

**What happens:**
1. Start with `number = 0`
2. Queue: `n => n + 5` (0 + 5 = 5)
3. Queue: `n => n + 5` (5 + 5 = 10)
4. Queue: `n => n + 5` (10 + 5 = 15)
5. React processes queue → Final value: `15`

### Mixing Direct Values and Updater Functions

**Order matters** when mixing update types:

```javascript
function handleClick() {
  setNumber(number + 5);     // Replace: 0 + 5 = 5
  setNumber(n => n + 1);     // Update: 5 + 1 = 6
  setNumber(42);             // Replace: 42
  setNumber(n => n + 1);     // Update: 42 + 1 = 43
}
// Result: 43
```

**Step-by-step queue processing:**

| Update | Queue Instruction | Result |
|--------|------------------|--------|
| `setNumber(number + 5)` | "replace with 5" | 5 |
| `setNumber(n => n + 1)` | "n + 1" | 6 |
| `setNumber(42)` | "replace with 42" | 42 |
| `setNumber(n => n + 1)` | "n + 1" | 43 |

### Practical Examples

#### Example 1: Multiple Increments

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // ❌ WRONG - Only increments by 1
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // All use same count value (0)
  }

  function handleClickCorrect() {
    // ✅ CORRECT - Increments by 3
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    // Each uses result of previous
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Wrong (+1)</button>
      <button onClick={handleClickCorrect}>Correct (+3)</button>
    </div>
  );
}
```

#### Example 2: Mixed Updates

```javascript
function NumberGame() {
  const [number, setNumber] = useState(0);

  function processNumber() {
    setNumber(number + 5);     // 0 + 5 = 5
    setNumber(n => n * 2);     // 5 * 2 = 10
    setNumber(100);            // Replace with 100
    setNumber(n => n - 50);    // 100 - 50 = 50
  }

  return (
    <div>
      <p>Number: {number}</p>
      <button onClick={processNumber}>Process</button>
    </div>
  );
}
```

#### Example 3: Form Submission

```javascript
function Form() {
  const [data, setData] = useState({ name: '', submitted: false });

  function handleSubmit(e) {
    e.preventDefault();

    // ❌ WRONG - submitted might be false during API call
    setData({ ...data, submitted: true });
    api.submit(data);

    // ✅ CORRECT - Ensure using latest data
    setData(prev => ({ ...prev, submitted: true }));
    setData(prev => {
      api.submit(prev);
      return prev;
    });
  }
}
```

### React 18: Automatic Batching Everywhere

Before React 18, batching only worked in event handlers. React 18 enables **automatic batching everywhere**:

```javascript
// React 17: NOT batched (2 re-renders)
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

// React 18: Batched (1 re-render)
setTimeout(() => {
  setCount(c => c + 1);  // Batched
  setFlag(f => !f);      // Batched
}, 1000);
```

**Now batched in:**
- ✅ Event handlers (always batched)
- ✅ Promises
- ✅ setTimeout/setInterval
- ✅ Native event handlers
- ✅ Any other async code

**Opt-out of batching (rare):**

```javascript
import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(c => c + 1);
}); // Re-renders immediately

flushSync(() => {
  setFlag(f => !f);
}); // Re-renders immediately
// Total: 2 re-renders
```

### Common Interview Questions

#### Q: Why use updater functions?

**Answer:**

**Use updater functions when:**
1. New state depends on previous state
2. Multiple updates in one handler
3. Updates in async code (timers, promises)

```javascript
// ❌ Don't - Relies on stale value
setCount(count + 1);

// ✅ Do - Always uses latest value
setCount(c => c + 1);
```

#### Q: What's the difference between these?

```javascript
// Version A
setNumber(number + 1);
setNumber(number + 1);

// Version B
setNumber(n => n + 1);
setNumber(n => n + 1);
```

**Answer:**

- **Version A**: Both use same `number` value → Increments by 1
- **Version B**: Second uses result of first → Increments by 2

**Version A queue:**
```
number = 0
Replace with 0 + 1 = 1
Replace with 0 + 1 = 1
Final: 1
```

**Version B queue:**
```
number = 0
n => n + 1: 0 → 1
n => n + 1: 1 → 2
Final: 2
```

#### Q: When does React process the update queue?

**Answer:**

React processes the queue **after your event handler completes**:

```javascript
function handleClick() {
  console.log('Before:', count);  // 0

  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);

  console.log('After:', count);   // Still 0!
  // State hasn't updated yet
}

// After handleClick completes:
// React processes queue → count becomes 3
// Component re-renders with new value
```

### Rules for Updater Functions

1. **Must be pure** - No side effects
2. **Only return new state** - Don't mutate
3. **Can't call setState inside** - Infinite loop

```javascript
// ✅ CORRECT - Pure function
setCount(c => c + 1);

// ❌ WRONG - Side effect
setCount(c => {
  console.log(c);  // Side effect!
  return c + 1;
});

// ❌ WRONG - Calling setState inside
setCount(c => {
  setOtherState(c);  // Don't do this!
  return c + 1;
});
```

### When to Use Each Approach

| Scenario | Use | Example |
|----------|-----|---------|
| Single update with current value | Direct value | `setCount(5)` |
| Update based on previous | Updater function | `setCount(c => c + 1)` |
| Multiple updates in handler | Updater function | See examples above |
| Independent updates | Direct value | `setName('John')` |
| Computed from props | Direct value | `setTotal(price * quantity)` |
| Toggle boolean | Updater function | `setOn(prev => !prev)` |

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
