---
sidebar_position: 7
---

# useReducer Hook

## What is useReducer?

`useReducer` is a React Hook that lets you manage **complex state logic** using a reducer function. It's an alternative to `useState` when you have multiple state values or complex state transitions.

## Basic Syntax

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

- **`state`** - Current state value
- **`dispatch`** - Function to trigger state updates
- **`reducer`** - Function that determines how state changes
- **`initialState`** - Initial state value

## When to Use useReducer vs useState

| useState | useReducer |
|----------|------------|
| Simple state (single value) | Complex state (multiple related values) |
| Independent state updates | State transitions depend on previous state |
| Few state updates | Many different state updates |
| State logic is simple | State logic is complex |

## Basic Example

```jsx
import { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}
```

## Reducer Pattern Explained

A reducer is a **pure function** that takes the current state and an action, then returns a new state:

```javascript
function reducer(currentState, action) {
  // Calculate and return new state
  return newState;
}
```

**Rules:**
1. **Pure function** - No side effects
2. **Returns new state** - Don't mutate existing state
3. **Same input = same output** - Predictable

## Actions with Payload

Actions can carry additional data in a `payload`:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

// Usage
dispatch({ type: 'ADD_TODO', payload: { id: 1, text: 'Learn React' } });
dispatch({ type: 'REMOVE_TODO', payload: 1 });
```

## Complete Todo List Example

```jsx
import { useReducer } from 'react';

const initialState = {
  todos: [],
  filter: 'all' // 'all', 'active', 'completed'
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add todo..."
        />
        <button type="submit">Add</button>
      </form>

      <div>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'all' })}>
          All
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'active' })}>
          Active
        </button>
        <button onClick={() => dispatch({ type: 'SET_FILTER', payload: 'completed' })}>
          Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}>
        Clear Completed
      </button>
    </div>
  );
}
```

## Lazy Initialization

For expensive initial state calculations, use a third parameter (init function):

```jsx
function init(initialCount) {
  // Expensive computation
  return {
    count: initialCount,
    history: []
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count]
      };
    default:
      return state;
  }
}

function Counter({ initialCount }) {
  // init only runs once
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return <div>Count: {state.count}</div>;
}
```

## Common Interview Questions

### Q1: When should you use useReducer instead of useState?

**Answer:**

Use **useReducer** when:
1. **Multiple related state values** that change together
2. **Complex state logic** with many different updates
3. **Next state depends on previous state**
4. **Testing** - easier to test pure reducer functions
5. **Performance** - can optimize with useCallback

Use **useState** when:
1. Simple, independent state values
2. Few state updates
3. State doesn't have complex interdependencies

### Q2: How is useReducer similar to Redux?

**Answer:**

Both use the **same reducer pattern**:

**Similarities:**
- Reducer function: `(state, action) => newState`
- Actions with type and payload
- Predictable state updates
- Pure functions

**Differences:**

| useReducer | Redux |
|------------|-------|
| Component-level state | Global state |
| No middleware | Middleware support |
| Built into React | External library |
| Simpler setup | More boilerplate |

```jsx
// useReducer (local state)
const [state, dispatch] = useReducer(reducer, initialState);

// Redux (global state)
const dispatch = useDispatch();
const state = useSelector(state => state);
```

### Q3: Can you dispatch actions from useEffect?

**Answer:** Yes! This is a common pattern:

```jsx
function UserProfile({ userId }) {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => {
        dispatch({ type: 'FETCH_SUCCESS', payload: user });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      });
  }, [userId]);

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  return <div>{state.user?.name}</div>;
}
```

### Q4: How do you type useReducer in TypeScript?

**Answer:**

```typescript
type State = {
  count: number;
  error: string | null;
};

type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'RESET':
      return { count: 0, error: null };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, error: null });

  // TypeScript knows these are valid actions
  dispatch({ type: 'INCREMENT' });
  dispatch({ type: 'SET_ERROR', payload: 'Something went wrong' });

  // TypeScript error - invalid action
  // dispatch({ type: 'INVALID' });

  return <div>{state.count}</div>;
}
```

## Advanced Patterns

### 1. Extracting Action Creators

```jsx
// Action creators
const actions = {
  increment: () => ({ type: 'INCREMENT' }),
  decrement: () => ({ type: 'DECREMENT' }),
  addBy: (value) => ({ type: 'ADD', payload: value }),
  reset: () => ({ type: 'RESET' })
};

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <button onClick={() => dispatch(actions.increment())}>+</button>
      <button onClick={() => dispatch(actions.addBy(5))}>+5</button>
      <button onClick={() => dispatch(actions.reset())}>Reset</button>
    </div>
  );
}
```

### 2. Combining with Context

Share dispatch across components:

```jsx
const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
}

// Usage
function TodoList() {
  const { state, dispatch } = useTodos();

  return (
    <ul>
      {state.todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

### 3. Multiple Reducers

```jsx
function App() {
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);
  const [todoState, todoDispatch] = useReducer(todoReducer, initialTodoState);
  const [uiState, uiDispatch] = useReducer(uiReducer, initialUIState);

  return (
    <div>
      {/* Use different reducers for different concerns */}
    </div>
  );
}
```

## Best Practices

1. **Keep reducers pure** - No side effects, API calls, or mutations
2. **Use meaningful action types** - 'ADD_TODO' not 'UPDATE'
3. **Always return new state** - Don't mutate existing state
4. **Handle unknown actions** - Throw error or return state
5. **Use TypeScript** - Type safety for actions and state
6. **Extract action creators** - Reusable action creators
7. **Combine with Context** - For component-tree-wide state
8. **Test reducers** - Easy to test pure functions

## Testing Reducers

```javascript
import { describe, it, expect } from 'vitest';

describe('todoReducer', () => {
  it('should add a todo', () => {
    const initialState = { todos: [] };
    const action = { type: 'ADD_TODO', payload: 'Learn React' };
    const newState = todoReducer(initialState, action);

    expect(newState.todos).toHaveLength(1);
    expect(newState.todos[0].text).toBe('Learn React');
  });

  it('should toggle todo completion', () => {
    const initialState = {
      todos: [{ id: 1, text: 'Test', completed: false }]
    };
    const action = { type: 'TOGGLE_TODO', payload: 1 };
    const newState = todoReducer(initialState, action);

    expect(newState.todos[0].completed).toBe(true);
  });
});
```

## Common Pitfalls

### 1. Mutating State

```jsx
// ❌ BAD - Mutates state
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      state.items.push(action.payload); // Mutation!
      return state;
  }
}

// ✅ GOOD - Returns new state
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload]
      };
  }
}
```

### 2. Forgetting Default Case

```jsx
// ❌ BAD - No default case
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    // No default!
  }
}

// ✅ GOOD - Handle unknown actions
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
      // or return state;
  }
}
```

### 3. Side Effects in Reducer

```jsx
// ❌ BAD - Side effects in reducer
function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_USER':
      fetch('/api/user'); // Side effect!
      return { ...state, loading: true };
  }
}

// ✅ GOOD - Side effects in useEffect
function Component() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(user => dispatch({ type: 'SET_USER', payload: user }));
  }, []);
}
```

## Key Takeaways

- `useReducer` is for complex state logic with multiple related values
- Reducers are pure functions: `(state, action) => newState`
- Actions have a `type` and optional `payload`
- Great for state machines and complex state transitions
- Easier to test than useState logic
- Combine with Context for app-wide state management
- Similar pattern to Redux but component-scoped

## Resources

- [useReducer Official Docs](https://react.dev/reference/react/useReducer)
- [Reducer Pattern Guide](https://react.dev/learn/extracting-state-logic-into-a-reducer)
