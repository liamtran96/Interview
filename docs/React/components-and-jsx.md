---
sidebar_position: 1
---

# React Components and JSX

## What are React Components?

**React components** are the building blocks of React applications. They are JavaScript functions or classes that return React elements (JSX), which describe what should appear on the screen.

:::info React 19
This guide covers React 19 features including the new Actions API, Compiler, and modern component patterns.
:::

## JSX (JavaScript XML)

**JSX** is a syntax extension that looks like HTML but allows you to write HTML-like code in JavaScript. It makes React code more readable and expressive.

###Basic JSX Syntax

```jsx
// JSX
const element = <h1>Hello, World!</h1>;

// Compiles to JavaScript
const element = React.createElement('h1', null, 'Hello, World!');
```

### JSX Rules

```jsx
// 1. Single root element (or Fragment)
// ✗ Multiple roots
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

// ✓ Wrapped in single element
return (
  <div>
    <h1>Title</h1>
    <p>Paragraph</p>
  </div>
);

// ✓ Using Fragment
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);

// 2. Close all tags
<img src="image.jpg" />  // ✓ Self-closing
<br />                    // ✓ Self-closing
<div></div>               // ✓ Closing tag

// 3. CamelCase for attributes
<div className="container">  // Not "class"
<label htmlFor="input">      // Not "for"
<button onClick={handler}>   // Not "onclick"

// 4. JavaScript expressions in curly braces
const name = "John";
return <h1>Hello, {name}!</h1>; // "Hello, John!"
```

### Embedding JavaScript Expressions

```jsx
function App() {
  const name = "John";
  const age = 30;
  const isAdult = age >= 18;

  return (
    <div>
      {/* Variables */}
      <p>Name: {name}</p>

      {/* Expressions */}
      <p>Next year: {age + 1}</p>

      {/* Conditional rendering */}
      <p>Status: {isAdult ? "Adult" : "Minor"}</p>

      {/* Function calls */}
      <p>Uppercase: {name.toUpperCase()}</p>

      {/* Template literals */}
      <p>{`${name} is ${age} years old`}</p>

      {/* Comments in JSX */}
      {/* This is a comment */}
    </div>
  );
}
```

### Conditional Rendering

```jsx
function Greeting({ isLoggedIn, username }) {
  // Method 1: if-else
  if (isLoggedIn) {
    return <h1>Welcome back, {username}!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }

  // Method 2: Ternary operator
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back, {username}!</h1>
      ) : (
        <h1>Please sign in.</h1>
      )}
    </div>
  );

  // Method 3: Logical AND (&&)
  return (
    <div>
      {isLoggedIn && <h1>Welcome back, {username}!</h1>}
      {!isLoggedIn && <h1>Please sign in.</h1>}
    </div>
  );

  // Method 4: Nullish coalescing (??)
  return <h1>Welcome, {username ?? "Guest"}!</h1>;
}
```

### Lists and Keys

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: "Learn React", done: true },
    { id: 2, text: "Build app", done: false },
    { id: 3, text: "Deploy", done: false }
  ];

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text} - {todo.done ? "✓" : "○"}
        </li>
      ))}
    </ul>
  );
}

// ⚠️ Keys must be unique and stable
// ✗ Bad: Using index as key (causes issues with reordering)
{todos.map((todo, index) => <li key={index}>{todo.text}</li>)}

// ✓ Good: Using unique ID
{todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
```

## Function Components

**Function components** are the modern, recommended way to write React components.

### Basic Function Component

```jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}

// Arrow function syntax
const Welcome = () => {
  return <h1>Hello, World!</h1>;
};

// Implicit return (no curly braces)
const Welcome = () => <h1>Hello, World!</h1>;
```

### Component Composition

```jsx
function Header() {
  return <header><h1>My App</h1></header>;
}

function Footer() {
  return <footer><p>&copy; 2025</p></footer>;
}

function MainContent() {
  return <main><p>Content goes here</p></main>;
}

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}
```

## Props

**Props** (properties) are **read-only** data passed from a parent component to a child component.

### Basic Props

```jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Using the component
<Greeting name="John" />

// Destructuring props (preferred)
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### Multiple Props

```jsx
function UserCard({ name, age, email, isActive }) {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <span className={isActive ? "active" : "inactive"}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </div>
  );
}

// Usage
<UserCard
  name="John Doe"
  age={30}
  email="john@example.com"
  isActive={true}
/>
```

### Default Props

```jsx
// Method 1: Default parameters
function Button({ text = "Click me", type = "button" }) {
  return <button type={type}>{text}</button>;
}

// Method 2: Destructuring with defaults
function Button(props) {
  const { text = "Click me", type = "button" } = props;
  return <button type={type}>{text}</button>;
}

// Usage
<Button />  // Uses defaults
<Button text="Submit" type="submit" />
```

### Children Prop

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Usage
<Card>
  <h2>Title</h2>
  <p>Content goes here</p>
</Card>
```

### Props Validation with TypeScript

```tsx
// Using TypeScript (recommended)
interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

function Button({ text, onClick, type = "button", disabled = false }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
```

### Spreading Props

```jsx
function Button(props) {
  return <button {...props}>{props.children}</button>;
}

// All props are passed to the button element
<Button type="submit" className="btn-primary" onClick={handleClick}>
  Submit
</Button>
```

## Component Patterns

### Container/Presentation Pattern

```jsx
// Presentation Component (dumb, presentational)
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// Container Component (smart, stateful)
function UserListContainer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return <UserList users={users} />;
}
```

### Compound Components

```jsx
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          isActive: index === activeTab,
          onClick: () => setActiveTab(index)
        })
      )}
    </div>
  );
}

function Tab({ label, isActive, onClick }) {
  return (
    <button
      className={isActive ? "active" : ""}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// Usage
<Tabs>
  <Tab label="Tab 1" />
  <Tab label="Tab 2" />
  <Tab label="Tab 3" />
</Tabs>
```

### Render Props Pattern

```jsx
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <p>Mouse position: {x}, {y}</p>
  )}
/>
```

### Higher-Order Components (HOC)

```jsx
// HOC that adds loading state
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <Component {...props} />;
  };
}

// Usage
const UserListWithLoading = withLoading(UserList);

<UserListWithLoading isLoading={loading} users={users} />
```

## Event Handling

```jsx
function EventDemo() {
  // Event handler function
  const handleClick = (event) => {
    console.log("Clicked!", event);
  };

  // With parameter
  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  // Prevent default
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div>
      {/* Inline handler */}
      <button onClick={() => console.log("Inline")}>
        Inline
      </button>

      {/* Function reference */}
      <button onClick={handleClick}>
        Click
      </button>

      {/* With parameter (arrow function wrapper) */}
      <button onClick={() => handleDelete(123)}>
        Delete
      </button>

      {/* Form submit */}
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>

      {/* Other events */}
      <input
        onChange={(e) => console.log(e.target.value)}
        onFocus={() => console.log("Focused")}
        onBlur={() => console.log("Blurred")}
      />
    </div>
  );
}
```

## Styling Components

### Inline Styles

```jsx
function StyledComponent() {
  const styles = {
    container: {
      backgroundColor: "#f0f0f0",
      padding: "20px",
      borderRadius: "8px"
    },
    title: {
      color: "#333",
      fontSize: "24px"
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Title</h1>
    </div>
  );
}
```

### CSS Classes

```jsx
// Import CSS file
import './Button.css';

function Button({ variant = "primary" }) {
  return (
    <button className={`btn btn-${variant}`}>
      Click me
    </button>
  );
}
```

### CSS Modules

```jsx
// Button.module.css
import styles from './Button.module.css';

function Button() {
  return (
    <button className={styles.button}>
      Click me
    </button>
  );
}
```

### Conditional Classes

```jsx
function Alert({ type, message }) {
  const classes = `alert ${type === 'error' ? 'alert-error' : 'alert-success'}`;

  return (
    <div className={classes}>
      {message}
    </div>
  );
}

// Using classnames library (recommended)
import classNames from 'classnames';

function Alert({ type, message, isVisible }) {
  return (
    <div className={classNames('alert', {
      'alert-error': type === 'error',
      'alert-success': type === 'success',
      'alert-visible': isVisible
    })}>
      {message}
    </div>
  );
}
```

## React 19 Features

### Actions API (React 19)

```jsx
// Server actions without explicit useState
function CommentForm({ postId }) {
  async function submitComment(formData) {
    'use server';

    const comment = formData.get('comment');
    await saveComment(postId, comment);
  }

  return (
    <form action={submitComment}>
      <textarea name="comment" required />
      <button type="submit">Post Comment</button>
    </form>
  );
}

// With useActionState hook
import { useActionState } from 'react';

function CommentForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const comment = formData.get('comment');
      await saveComment(comment);
      return { success: true };
    },
    { success: false }
  );

  return (
    <form action={formAction}>
      <textarea name="comment" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Posting...' : 'Post Comment'}
      </button>
      {state.success && <p>Comment posted!</p>}
    </form>
  );
}
```

### React Compiler (React 19)

```jsx
// Before: Manual memoization
const MemoizedComponent = memo(function Component({ data }) {
  const processed = useMemo(() => expensiveOperation(data), [data]);
  return <div>{processed}</div>;
});

// After: React Compiler auto-memoizes
function Component({ data }) {
  // Automatically memoized by React Compiler
  const processed = expensiveOperation(data);
  return <div>{processed}</div>;
}
```

## Interview Questions

### Q1: What is JSX and why do we use it?

**Answer:**

**JSX (JavaScript XML)** is a syntax extension that allows you to write HTML-like code in JavaScript.

**Why use JSX:**
1. **More readable** - Looks like HTML, easier to visualize UI
2. **Type safety** - Catches errors at compile time
3. **Full JavaScript power** - Can embed expressions, loops, conditionals
4. **Optimizations** - Compiled to optimized JavaScript

```jsx
// JSX
const element = <h1>Hello, {name}!</h1>;

// Compiles to
const element = React.createElement('h1', null, `Hello, ${name}!`);
```

**Key rules:**
- Single root element (or Fragment)
- Close all tags
- Use camelCase for attributes (`className`, `onClick`)
- Use curly braces for JavaScript expressions

### Q2: What is the difference between functional and class components?

**Answer:**

| Feature | Function Components | Class Components |
|---------|---------------------|------------------|
| **Syntax** | Simple function | ES6 class |
| **State** | Hooks (useState) | this.state |
| **Lifecycle** | Hooks (useEffect) | Lifecycle methods |
| **this** | No `this` binding | Requires `this` |
| **Performance** | Slightly better | Slightly slower |
| **Recommended** | Yes (modern) | Legacy |

```jsx
// Function Component (Modern)
function Welcome({ name }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Mounted");
  }, []);

  return <h1>Hello, {name}!</h1>;
}

// Class Component (Legacy)
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log("Mounted");
  }

  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

**Best Practice:** Use function components with hooks (modern standard).

### Q3: What are props and how do they work?

**Answer:**

**Props** (properties) are **read-only** data passed from parent to child components.

**Key characteristics:**
- Passed from parent to child (unidirectional data flow)
- **Immutable** (cannot be modified by child)
- Can be any data type (string, number, object, function, etc.)

```jsx
// Parent component
function App() {
  return <Greeting name="John" age={30} />;
}

// Child component
function Greeting({ name, age }) {
  // ✗ Cannot modify props
  // name = "Jane"; // Error in strict mode

  return <h1>Hello, {name}! You are {age} years old.</h1>;
}
```

**Props vs State:**
- **Props:** Passed from parent, immutable
- **State:** Managed within component, mutable

### Q4: What is the purpose of keys in React lists?

**Answer:**

**Keys** help React identify which items have changed, been added, or removed in lists.

**Why keys are important:**
1. **Performance** - React can efficiently update only changed items
2. **State preservation** - Correct state association with elements
3. **Prevent bugs** - Avoid incorrect rendering with reordering

```jsx
// ✗ Bad: No key
{items.map(item => <li>{item.name}</li>)}

// ✗ Bad: Using index as key (problems with reordering)
{items.map((item, index) => <li key={index}>{item.name}</li>)}

// ✓ Good: Using unique, stable ID
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

**Key rules:**
- Must be **unique** among siblings
- Must be **stable** (same key for same item across renders)
- Should be **string or number**

**When index is okay:**
- Static list (never reordered)
- No items added/removed
- Items have no unique ID

### Q5: What is the difference between controlled and uncontrolled components?

**Answer:**

| Feature | Controlled | Uncontrolled |
|---------|------------|--------------|
| **Data source** | React state | DOM |
| **Updates** | Via setState | Direct DOM manipulation |
| **Value access** | From state | Via ref |
| **Recommended** | Yes (more predictable) | Special cases |

**Controlled Component:**
```jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}
// React state is single source of truth
```

**Uncontrolled Component:**
```jsx
function UncontrolledInput() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return <input ref={inputRef} defaultValue="Initial" />;
}
// DOM is source of truth
```

**When to use uncontrolled:**
- File inputs (must be uncontrolled)
- Simple forms with no validation
- Integrating with non-React code

### Q6: What is component composition in React?

**Answer:**

**Component composition** is the practice of building complex UIs by combining smaller, reusable components.

```jsx
// Small, focused components
function Header() {
  return <header><h1>My App</h1></header>;
}

function Nav() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  );
}

function MainContent({ children }) {
  return <main>{children}</main>;
}

// Composed into larger component
function App() {
  return (
    <div>
      <Header />
      <Nav />
      <MainContent>
        <h2>Welcome</h2>
        <p>Content goes here</p>
      </MainContent>
    </div>
  );
}
```

**Benefits:**
1. **Reusability** - Components can be used in multiple places
2. **Maintainability** - Easier to update isolated components
3. **Testability** - Test small components independently
4. **Readability** - Clear structure and intent

**Composition vs Inheritance:**
React recommends **composition** over inheritance for code reuse.

### Q7: How do you handle events in React?

**Answer:**

React events are named using camelCase and passed as functions.

```jsx
function EventHandling() {
  // Event handler
  const handleClick = (event) => {
    console.log("Clicked!", event);
  };

  // With parameter
  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  // Prevent default
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div>
      {/* Method 1: Function reference */}
      <button onClick={handleClick}>Click</button>

      {/* Method 2: Inline arrow function */}
      <button onClick={() => handleDelete(123)}>Delete</button>

      {/* Method 3: Inline function */}
      <button onClick={(e) => console.log(e)}>Log</button>

      {/* Form events */}
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => console.log(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

**Key differences from DOM events:**
- **CamelCase** naming (`onClick` not `onclick`)
- **Pass function** not string (`onClick={handler}` not `onclick="handler()"`)
- **Cannot return false** to prevent default (must call `event.preventDefault()`)
- **Synthetic events** - Cross-browser wrapper around native event

### Q8: What are React Fragments and when should you use them?

**Answer:**

**Fragments** let you group elements without adding extra DOM nodes.

```jsx
// Problem: Extra div in DOM
function Items() {
  return (
    <div>  {/* Unnecessary wrapper */}
      <li>Item 1</li>
      <li>Item 2</li>
    </div>
  );
}

// Solution 1: Fragment (verbose)
function Items() {
  return (
    <React.Fragment>
      <li>Item 1</li>
      <li>Item 2</li>
    </React.Fragment>
  );
}

// Solution 2: Short syntax (recommended)
function Items() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}

// Solution 3: With key (when mapping)
function ItemList({ items }) {
  return items.map(item => (
    <React.Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </React.Fragment>
  ));
}
```

**Use Fragments when:**
- Returning multiple elements
- Avoiding unnecessary DOM nodes
- Better performance (less DOM manipulation)
- Cleaner HTML structure

### Q9: What is the children prop and how is it used?

**Answer:**

The **children prop** contains the content between the opening and closing tags of a component.

```jsx
// Receiving children
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Using the component
<Card>
  <h2>Title</h2>
  <p>Content goes here</p>
</Card>

// children is equivalent to:
<Card children={
  <>
    <h2>Title</h2>
    <p>Content goes here</p>
  </>
} />
```

**Advanced patterns:**

```jsx
// Manipulating children
function Wrapper({ children }) {
  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="wrapper-item">
          {child}
        </div>
      ))}
    </div>
  );
}

// Render props with children
function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}>
      {children(position)}
    </div>
  );
}

// Usage
<MouseTracker>
  {({ x, y }) => <p>Mouse: {x}, {y}</p>}
</MouseTracker>
```

### Q10: What are the new features in React 19?

**Answer:**

**React 19** (released December 2024) introduces major new features:

**1. Actions API** - First-class server mutations:
```jsx
function CommentForm() {
  async function submitComment(formData) {
    'use server';
    await saveComment(formData.get('comment'));
  }

  return (
    <form action={submitComment}>
      <textarea name="comment" />
      <button type="submit">Post</button>
    </form>
  );
}
```

**2. React Compiler** - Automatic memoization:
```jsx
// No need for memo, useMemo, useCallback
// React Compiler optimizes automatically
function Component({ data }) {
  const processed = expensiveOperation(data);
  return <div>{processed}</div>;
}
```

**3. New Hooks:**
- `use()` - Conditional hook calling
- `useActionState` - Form state management
- `useFormStatus` - Form pending state
- `useOptimistic` - Optimistic UI updates

**4. Improvements:**
- Better hydration error messages
- Support for async scripts
- Built-in support for stylesheets, fonts, preloading
- Document metadata management

**5. Breaking Changes:**
- Removed legacy APIs (ReactDOM.render())
- Stricter rules for keys
- Removed some deprecated features

## Best Practices

1. **Use function components** - Modern standard, hooks are powerful
2. **Keep components small** - Single responsibility principle
3. **Use TypeScript** - Type safety prevents bugs
4. **Destructure props** - More readable: `({ name })` not `(props)`
5. **Use keys in lists** - Stable, unique IDs, not indexes
6. **Avoid inline functions** - Define outside render for performance
7. **Use composition** - Build complex UIs from small components
8. **Use Fragments** - Avoid unnecessary DOM nodes
9. **Name components clearly** - `UserProfileCard` not `Component1`
10. **Follow React naming conventions** - Components: PascalCase, props: camelCase

## Resources

- [React Official Documentation](https://react.dev/)
- [React 19 Release Notes](https://react.dev/blog/2024/12/05/react-19)
- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Patterns](https://reactpatterns.com/)
