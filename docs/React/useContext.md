---
sidebar_position: 6
---

# useContext Hook

## What is useContext?

`useContext` is a React Hook that lets you **read and subscribe to context** from your component. It provides a way to pass data through the component tree without having to pass props down manually at every level.

## Basic Syntax

```javascript
const value = useContext(SomeContext);
```

## The Problem: Prop Drilling

Without Context, you need to pass props through intermediate components:

```jsx
// ❌ Prop Drilling - passing props through many levels
function App() {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });

  return <Dashboard user={user} />;
}

function Dashboard({ user }) {
  return <Sidebar user={user} />;
}

function Sidebar({ user }) {
  return <Profile user={user} />;
}

function Profile({ user }) {
  return <div>Hello, {user.name}!</div>;
}
```

## The Solution: Context API

Context lets you share data without prop drilling:

### Step 1: Create Context

```javascript
import { createContext } from 'react';

const UserContext = createContext(null);
```

### Step 2: Provide Context

```jsx
function App() {
  const [user, setUser] = useState({ name: 'John', theme: 'dark' });

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}
```

### Step 3: Consume Context with useContext

```jsx
function Profile() {
  const user = useContext(UserContext);

  return <div>Hello, {user.name}!</div>;
}
```

## Complete Example

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext('light');

// 2. App provides the context
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </ThemeContext.Provider>
  );
}

// 3. Intermediate component (no props needed!)
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// 4. Deep component uses context
function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button className={theme}>
      I am a {theme} button
    </button>
  );
}
```

## Providing Multiple Values

You can provide objects with multiple values:

```jsx
const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState({ name: 'John', age: 30 });

  // Provide both user and setter
  const value = {
    user,
    updateUser: setUser
  };

  return (
    <UserContext.Provider value={value}>
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  const { user, updateUser } = useContext(UserContext);

  return (
    <div>
      <p>{user.name}</p>
      <button onClick={() => updateUser({ ...user, name: 'Jane' })}>
        Change Name
      </button>
    </div>
  );
}
```

## Default Values

Context can have a default value:

```jsx
// Default value used when no Provider is found
const ThemeContext = createContext('light');

function Component() {
  const theme = useContext(ThemeContext); // 'light' if no Provider
  return <div>{theme}</div>;
}
```

## Common Interview Questions

### Q1: When should you use Context vs Props?

**Answer:**

**Use Props when:**
- Data is only needed by direct children
- Component should be reusable
- Data flow is simple and clear

**Use Context when:**
- Data is needed by many components at different levels
- Avoiding prop drilling through many layers
- Global data (theme, auth, language)

### Q2: What causes re-renders with Context?

**Answer:**

**All components using `useContext` re-render when the context value changes**, even if they only use part of it.

```jsx
// ❌ BAD - Creates new object every render, causing all consumers to re-render
function App() {
  const [user, setUser] = useState({ name: 'John' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Child />
    </UserContext.Provider>
  );
}

// ✅ GOOD - Memoize the value
function App() {
  const [user, setUser] = useState({ name: 'John' });

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      <Child />
    </UserContext.Provider>
  );
}
```

### Q3: Can you use multiple contexts in one component?

**Answer:** Yes! You can consume multiple contexts:

```jsx
const ThemeContext = createContext('light');
const UserContext = createContext(null);

function Component() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <div className={theme}>
      Hello, {user.name}!
    </div>
  );
}
```

### Q4: How do you avoid unnecessary re-renders with Context?

**Answer:**

**Solution 1: Split contexts**

```jsx
// Instead of one large context
const AppContext = createContext({ user, theme, settings });

// Split into multiple contexts
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const SettingsContext = createContext({});
```

**Solution 2: Memoize context value**

```jsx
function App() {
  const [user, setUser] = useState({ name: 'John' });

  const value = useMemo(
    () => ({ user, setUser }),
    [user] // Only recreate when user changes
  );

  return (
    <UserContext.Provider value={value}>
      <Child />
    </UserContext.Provider>
  );
}
```

**Solution 3: Use React.memo for components**

```jsx
const ExpensiveComponent = memo(function ExpensiveComponent() {
  // Won't re-render unless its props change
  return <div>Expensive computation...</div>;
});
```

## Creating a Custom Context Hook

Best practice: Create a custom hook for each context:

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const AuthContext = createContext(null);

// 2. Create custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

// 3. Create provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    // Login logic
    setUser({ name: username });
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, logout }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Usage
function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

function Dashboard() {
  const { user, login, logout } = useAuth();

  if (!user) {
    return <button onClick={() => login('john', 'pass')}>Login</button>;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## Real-World Example: Theme Switcher

```jsx
import { createContext, useContext, useState, useMemo } from 'react';

const ThemeContext = createContext(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      colors: theme === 'light'
        ? { bg: '#fff', text: '#000' }
        : { bg: '#000', text: '#fff' }
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      <div style={{
        backgroundColor: value.colors.bg,
        color: value.colors.text,
        minHeight: '100vh'
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Usage
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
    </ThemeProvider>
  );
}

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}
```

## Common Pitfalls

### 1. Creating New Objects Every Render

```jsx
// ❌ BAD - New object every render
function App() {
  const [count, setCount] = useState(0);

  return (
    <MyContext.Provider value={{ count, setCount }}>
      <Child />
    </MyContext.Provider>
  );
}

// ✅ GOOD - Memoized value
function App() {
  const [count, setCount] = useState(0);
  const value = useMemo(() => ({ count, setCount }), [count]);

  return (
    <MyContext.Provider value={value}>
      <Child />
    </MyContext.Provider>
  );
}
```

### 2. Not Checking for Null Context

```jsx
// ❌ BAD - May crash if used outside Provider
function Component() {
  const value = useContext(MyContext);
  return <div>{value.data}</div>; // Error if value is null!
}

// ✅ GOOD - Check for null
function Component() {
  const value = useContext(MyContext);

  if (!value) {
    throw new Error('Component must be used within MyProvider');
  }

  return <div>{value.data}</div>;
}
```

### 3. Too Much in One Context

```jsx
// ❌ BAD - Everything in one context
const AppContext = createContext({
  user: null,
  theme: 'light',
  language: 'en',
  notifications: [],
  settings: {}
});

// ✅ GOOD - Split into focused contexts
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const NotificationContext = createContext([]);
```

## Best Practices

1. **Create custom hooks** - Wrap useContext in custom hooks for better DX
2. **Memoize context values** - Prevent unnecessary re-renders
3. **Split contexts** - Keep contexts focused on one concern
4. **Provide sensible defaults** - Make context work without Provider when possible
5. **Validate context usage** - Throw errors if used outside Provider
6. **Keep context close** - Don't make everything global
7. **Document context shape** - Use TypeScript or JSDoc

## TypeScript Example

```tsx
interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const user = await loginAPI(email, password);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, logout }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
```

## Key Takeaways

- `useContext` reads values from Context without prop drilling
- Always wrap context in custom hooks for better error handling
- Memoize context values to prevent unnecessary re-renders
- Split large contexts into smaller, focused ones
- Context is great for global state (theme, auth, i18n)
- Not a replacement for all prop passing - use judiciously

## Resources

- [React Context Official Docs](https://react.dev/reference/react/useContext)
- [Context API Guide](https://react.dev/learn/passing-data-deeply-with-context)
