---
sidebar_position: 25
---

# Testing React Components

## Why Test React Components?

**Testing ensures:**
- Components work as expected
- Changes don't break existing functionality
- Better code quality and confidence
- Documentation of component behavior

## Testing Libraries

### React Testing Library (Recommended)

Tests components like users interact with them.

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Key Principles

1. **Test behavior, not implementation**
2. **Query by accessibility roles**
3. **Test from user's perspective**
4. **Avoid testing internal state**

## Basic Component Test

```jsx
// Button.jsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Querying Elements

### Recommended Query Priority

1. **getByRole** - Accessibility-first
2. **getByLabelText** - Form elements
3. **getByPlaceholderText** - Inputs
4. **getByText** - Non-interactive elements
5. **getByTestId** - Last resort

```jsx
// getByRole - BEST
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /username/i });

// getByLabelText - Good for forms
screen.getByLabelText('Email');

// getByPlaceholderText
screen.getByPlaceholderText('Enter your name');

// getByText
screen.getByText('Welcome');

// getByTestId - Last resort
screen.getByTestId('custom-element');
```

### Query Variants

```jsx
// getBy - Throws if not found
screen.getByText('Hello');

// queryBy - Returns null if not found
screen.queryByText('Hello'); // null or element

// findBy - Async, waits for element
await screen.findByText('Hello');

// Multiple elements
screen.getAllByRole('listitem');
screen.queryAllByRole('listitem');
await screen.findAllByRole('listitem');
```

## Testing User Interactions

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// fireEvent - Low-level DOM events
fireEvent.click(button);
fireEvent.change(input, { target: { value: 'hello' } });

// userEvent - Simulates real user behavior (RECOMMENDED)
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'hello');
await user.selectOptions(select, 'option1');
await user.clear(input);
```

## Testing Forms

```jsx
// LoginForm.jsx
function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({ email, password });
    }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

// LoginForm.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('submits form with email and password', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();

  render(<LoginForm onSubmit={handleSubmit} />);

  // Fill out form
  await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
  await user.type(screen.getByPlaceholderText('Password'), 'password123');

  // Submit
  await user.click(screen.getByText('Login'));

  // Assert
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

## Testing Async Code

```jsx
// UserProfile.jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

// UserProfile.test.jsx
import { render, screen, waitFor } from '@testing-library/react';

test('displays user name after loading', async () => {
  // Mock fetch
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ name: 'John Doe' })
    })
  );

  render(<UserProfile userId="123" />);

  // Initially loading
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for user name
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // Alternative: findBy (combines getBy + waitFor)
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});
```

## Mocking

### Mock Functions

```jsx
const mockFn = jest.fn();
mockFn('arg1', 'arg2');

expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
expect(mockFn).toHaveBeenCalledTimes(1);
```

### Mock API Calls

```jsx
// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked' })
  })
);

// Mock axios
jest.mock('axios');
axios.get.mockResolvedValue({ data: { name: 'John' } });
```

### Mock Modules

```jsx
// Mock entire module
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ name: 'John' }))
}));

// Use in test
import { fetchUser } from './api';
fetchUser.mockResolvedValue({ name: 'Jane' });
```

## Testing Hooks

Use `@testing-library/react-hooks`:

```jsx
import { renderHook, act } from '@testing-library/react';

// useCounter.js
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  return { count, increment, decrement };
}

// useCounter.test.js
test('increments counter', () => {
  const { result } = renderHook(() => useCounter(0));

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## Testing Context

```jsx
// Wrap component with context provider
import { render, screen } from '@testing-library/react';
import { ThemeContext } from './ThemeContext';

test('displays theme color', () => {
  render(
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      <MyComponent />
    </ThemeContext.Provider>
  );

  expect(screen.getByText('dark')).toBeInTheDocument();
});
```

## Common Interview Questions

### Q1: What is React Testing Library?

**Answer:**

**React Testing Library** tests components from user's perspective.

**Key principles:**
- Test behavior, not implementation
- Query by accessibility
- Avoid testing state/props directly

```jsx
// ❌ Bad - Testing implementation
expect(component.state.count).toBe(1);

// ✅ Good - Testing behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### Q2: getBy vs queryBy vs findBy?

**Answer:**

| Query | Throws | Async | Use When |
|-------|--------|-------|----------|
| getBy | Yes | No | Element should exist |
| queryBy | No | No | Check element doesn't exist |
| findBy | Yes | Yes | Element appears async |

```jsx
// getBy - Element must exist
screen.getByText('Hello'); // Throws if not found

// queryBy - Check absence
expect(screen.queryByText('Hello')).not.toBeInTheDocument();

// findBy - Wait for element
await screen.findByText('Hello'); // Waits up to 1s
```

### Q3: How do you test async components?

**Answer:**

```jsx
test('loads and displays user', async () => {
  render(<UserProfile userId="123" />);

  // Wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  // Or use findBy (recommended)
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});
```

### Q4: How do you mock API calls?

**Answer:**

```jsx
// Option 1: Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ name: 'John' })
  })
);

// Option 2: MSW (Mock Service Worker)
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ name: 'John' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## Best Practices

1. **Test behavior, not implementation**
2. **Use getByRole when possible**
3. **Avoid test IDs** - Use semantic queries
4. **Test user interactions** - Click, type, submit
5. **Mock external dependencies** - APIs, modules
6. **Don't test third-party libraries**
7. **Keep tests simple and readable**
8. **Use userEvent over fireEvent**

## Key Takeaways

- React Testing Library tests from user's perspective
- Use getByRole for accessibility-first queries
- userEvent simulates real user behavior
- findBy queries wait for async elements
- Mock API calls with jest.fn() or MSW
- Test behavior, not implementation details
- Focus on what users see and do

## Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Playground](https://testing-playground.com/)
