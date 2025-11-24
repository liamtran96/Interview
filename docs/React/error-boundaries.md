---
sidebar_position: 21
---

# Error Boundaries

## What are Error Boundaries?

**Error Boundaries** are React components that **catch JavaScript errors** anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire app.

## Why Error Boundaries?

Without error boundaries, errors in components crash the entire React app:

```jsx
// ❌ Error crashes the entire app
function BrokenComponent() {
  throw new Error('Something went wrong!');
  return <div>Never renders</div>;
}

function App() {
  return (
    <div>
      <Header />
      <BrokenComponent /> {/* Crashes everything! */}
      <Footer />
    </div>
  );
}
```

With error boundaries:
```jsx
// ✅ Error is contained, app continues working
<ErrorBoundary fallback={<ErrorMessage />}>
  <BrokenComponent /> {/* Only this fails */}
</ErrorBoundary>
```

## Creating an Error Boundary

Error boundaries are **class components** that define `static getDerivedStateFromError()` or `componentDidCatch()`:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error('Error caught:', error, errorInfo);
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### Usage

```jsx
function App() {
  return (
    <ErrorBoundary>
      <Header />
      <MainContent />
      <Sidebar />
    </ErrorBoundary>
  );
}
```

## Advanced Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log to error tracking service (e.g., Sentry, LogRocket)
    logError(error, errorInfo);
  }

  reset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Oops! Something went wrong.</h1>
          <details>
            <summary>Error details</summary>
            <p>{this.state.error?.toString()}</p>
            <pre>{this.state.errorInfo?.componentStack}</pre>
          </details>
          <button onClick={this.reset}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## What Error Boundaries Catch

✅ **Catches:**
- Errors in render methods
- Errors in lifecycle methods
- Errors in constructors
- Errors in child component tree

❌ **Does NOT catch:**
- Event handlers (use try/catch)
- Async code (setTimeout, promises)
- Server-side rendering errors
- Errors in error boundary itself

```jsx
// ✅ Caught by error boundary
function Component() {
  if (someCondition) {
    throw new Error('Render error');
  }
  return <div>Content</div>;
}

// ❌ NOT caught by error boundary
function Component() {
  const handleClick = () => {
    throw new Error('Event handler error'); // Use try/catch
  };

  useEffect(() => {
    setTimeout(() => {
      throw new Error('Async error'); // Use try/catch
    }, 1000);
  }, []);

  return <button onClick={handleClick}>Click</button>;
}
```

## Handling Event Handler Errors

```jsx
function Component() {
  const [error, setError] = useState(null);

  const handleClick = () => {
    try {
      riskyOperation();
    } catch (err) {
      setError(err);
      logError(err);
    }
  };

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return <button onClick={handleClick}>Click</button>;
}
```

## Error Boundary Placement

### Strategy 1: Top-level Boundary

```jsx
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Router>
        <Routes />
      </Router>
    </ErrorBoundary>
  );
}
```

### Strategy 2: Granular Boundaries

```jsx
function Dashboard() {
  return (
    <div>
      <ErrorBoundary fallback={<div>Header failed</div>}>
        <Header />
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Sidebar failed</div>}>
        <Sidebar />
      </ErrorBoundary>

      <ErrorBoundary fallback={<div>Content failed</div>}>
        <MainContent />
      </ErrorBoundary>
    </div>
  );
}
```

### Strategy 3: Route-level Boundaries

```jsx
function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <ErrorBoundary fallback={<DashboardError />}>
            <Dashboard />
          </ErrorBoundary>
        }
      />
      <Route
        path="/profile"
        element={
          <ErrorBoundary fallback={<ProfileError />}>
            <Profile />
          </ErrorBoundary>
        }
      />
    </Routes>
  );
}
```

## Common Interview Questions

### Q1: What are Error Boundaries and why do we need them?

**Answer:**

**Error Boundaries** are React components that catch errors in their child tree.

**Why we need them:**
- Prevent entire app crash from one component error
- Provide fallback UI for better UX
- Log errors for debugging
- Graceful degradation

**Example:**
```jsx
// Without: Entire app crashes
<App>
  <BrokenComponent /> {/* Error crashes everything */}
</App>

// With: Only affected section shows error
<ErrorBoundary fallback={<ErrorUI />}>
  <BrokenComponent /> {/* Only this section fails */}
</ErrorBoundary>
```

### Q2: What errors do Error Boundaries NOT catch?

**Answer:**

Error boundaries **do NOT** catch:

1. **Event handlers** - Use try/catch
2. **Async code** - Promises, setTimeout
3. **Server-side rendering**
4. **Errors in the boundary itself**

```jsx
// ❌ NOT caught
function Component() {
  // Event handler - use try/catch
  const handleClick = () => {
    throw new Error('Not caught!');
  };

  // Async - use try/catch or .catch()
  useEffect(() => {
    fetchData().then(() => {
      throw new Error('Not caught!');
    });
  }, []);
}
```

### Q3: Why must Error Boundaries be class components?

**Answer:**

As of React 18, **Error Boundaries must be class components** because:
- `getDerivedStateFromError` and `componentDidCatch` are class-only lifecycle methods
- No equivalent hooks exist yet

**Workaround:** Use a library like `react-error-boundary` or create one class boundary and reuse it:

```jsx
// One class boundary
class ErrorBoundary extends Component { /*...*/ }

// Reuse everywhere
function App() {
  return (
    <ErrorBoundary>
      <MyFunctionalComponents />
    </ErrorBoundary>
  );
}
```

### Q4: How do you test Error Boundaries?

**Answer:**

```jsx
import { render, screen } from '@testing-library/react';

// Suppress console.error for test
const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

test('shows fallback on error', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary fallback={<div>Error occurred</div>}>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText('Error occurred')).toBeInTheDocument();
  spy.mockRestore();
});
```

## Using react-error-boundary Library

Popular library that simplifies error boundaries:

```bash
npm install react-error-boundary
```

### Basic Usage

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state
      }}
      onError={(error, errorInfo) => {
        // Log error
        logError(error, errorInfo);
      }}
    >
      <MyApp />
    </ErrorBoundary>
  );
}
```

### With Reset Keys

```jsx
function Component({ userId }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      resetKeys={[userId]} // Reset when userId changes
    >
      <UserProfile userId={userId} />
    </ErrorBoundary>
  );
}
```

### useErrorHandler Hook

```jsx
import { useErrorHandler } from 'react-error-boundary';

function Component() {
  const handleError = useErrorHandler();

  const handleClick = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      handleError(error); // Propagate to nearest ErrorBoundary
    }
  };

  return <button onClick={handleClick}>Click</button>;
}
```

## Best Practices

1. **Place strategically** - Both top-level and granular
2. **Log errors** - Send to monitoring service (Sentry, LogRocket)
3. **Provide recovery** - Reset button, retry logic
4. **User-friendly messages** - Don't show stack traces to users
5. **Different fallbacks** - Per section/route
6. **Test error states** - Ensure fallbacks work
7. **Handle async errors** - Use try/catch or .catch()

## Real-World Example

```jsx
import { Component } from 'react';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to Sentry
    Sentry.captureException(error, {
      contexts: { react: { componentStack: errorInfo.componentStack } }
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-container">
          <h1>Something went wrong</h1>
          <p>We've been notified and are working on a fix.</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage across app
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ErrorBoundary fallback={<NavError />}>
          <Navigation />
        </ErrorBoundary>

        <ErrorBoundary fallback={<RouteError />}>
          <Routes />
        </ErrorBoundary>
      </Router>
    </ErrorBoundary>
  );
}
```

## Key Takeaways

- Error Boundaries prevent entire app crashes
- Must be class components (no hook equivalent yet)
- Catch render errors, not event/async errors
- Place at multiple levels for better UX
- Always log errors to monitoring services
- Provide recovery mechanisms (reset, retry)
- Use libraries like `react-error-boundary` for easier implementation

## Resources

- [Error Boundaries Docs](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
- [Error Handling in React](https://react.dev/learn/error-boundaries)
