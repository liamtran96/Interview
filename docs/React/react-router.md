---
sidebar_position: 24
---

# React Router

## What is React Router?

**React Router** is the standard routing library for React. It enables navigation between different views/pages in a single-page application (SPA).

```bash
npm install react-router-dom
```

## Basic Setup

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Core Concepts

### 1. BrowserRouter

Wraps your app to enable routing:

```jsx
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      {/* Your app */}
    </BrowserRouter>
  );
}
```

### 2. Routes & Route

Define route mappings:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/users/:id" element={<UserProfile />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 3. Link & NavLink

Navigate between routes:

```jsx
import { Link, NavLink } from 'react-router-dom';

// Link - Basic navigation
<Link to="/about">About</Link>

// NavLink - Adds "active" class when route matches
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
>
  About
</NavLink>
```

## Dynamic Routes (URL Parameters)

```jsx
// Define route with parameter
<Route path="/users/:userId" element={<UserProfile />} />

// Access parameter in component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();

  return <div>User ID: {userId}</div>;
}

// Navigate to dynamic route
<Link to="/users/123">User 123</Link>
```

## Programmatic Navigation

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (credentials) => {
    await login(credentials);
    navigate('/dashboard'); // Navigate after login
  };

  return <form onSubmit={handleSubmit}>...</form>;
}

// Navigate with options
navigate('/dashboard', { replace: true }); // Replace current entry
navigate(-1); // Go back
navigate(1); // Go forward
```

## Nested Routes

```jsx
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="users" element={<Users />}>
          <Route path=":userId" element={<UserProfile />} />
          <Route path="new" element={<NewUser />} />
        </Route>
      </Route>
    </Routes>
  );
}

// Layout component with Outlet
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Child routes render here */}
      <Footer />
    </div>
  );
}
```

## Protected Routes

```jsx
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## Query Parameters

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q');
  const page = searchParams.get('page') || 1;

  const handleSearch = (newQuery) => {
    setSearchParams({ q: newQuery, page: 1 });
  };

  return (
    <div>
      <p>Searching for: {query}</p>
      <p>Page: {page}</p>
    </div>
  );
}

// Navigate with query params
<Link to="/search?q=react&page=2">Search</Link>
```

## Common Patterns

### 1. 404 Not Found

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} /> {/* Catch all */}
</Routes>
```

### 2. Redirects

```jsx
import { Navigate } from 'react-router-dom';

<Routes>
  <Route path="/old-path" element={<Navigate to="/new-path" replace />} />
</Routes>
```

### 3. Active Links

```jsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
  style={({ isActive }) => ({
    color: isActive ? 'red' : 'black'
  })}
>
  About
</NavLink>
```

### 4. Route Guards

```jsx
function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
```

### 5. Lazy Loading Routes

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const Profile = lazy(() => import('./Profile'));

<Routes>
  <Route
    path="/dashboard"
    element={
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    }
  />
  <Route
    path="/profile"
    element={
      <Suspense fallback={<Loading />}>
        <Profile />
      </Suspense>
    }
  />
</Routes>
```

## Common Interview Questions

### Q1: What is React Router and why do we need it?

**Answer:**

**React Router** enables client-side routing in SPAs.

**Why we need it:**
- Navigate without page refresh
- Manage browser history
- Deep linking (shareable URLs)
- Dynamic route matching
- Nested routes

```jsx
// Without router - single page, no URLs
function App() {
  const [page, setPage] = useState('home');
  if (page === 'home') return <Home />;
  if (page === 'about') return <About />;
}

// With router - proper URLs and browser history
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

### Q2: Link vs NavLink vs useNavigate?

**Answer:**

| Link | NavLink | useNavigate |
|------|---------|-------------|
| Basic navigation | Active styling | Programmatic |
| `<Link to="/about">` | `<NavLink to="/about">` | `navigate('/about')` |
| No active state | Knows if active | In event handlers |

```jsx
// Link - Simple navigation
<Link to="/about">About</Link>

// NavLink - Styled when active
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active' : ''}
/>

// useNavigate - Programmatic
const navigate = useNavigate();
navigate('/about');
```

### Q3: How do you handle protected routes?

**Answer:**

```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Q4: How do you access route parameters?

**Answer:**

```jsx
// Define route
<Route path="/users/:userId/posts/:postId" element={<Post />} />

// Access params
import { useParams } from 'react-router-dom';

function Post() {
  const { userId, postId } = useParams();
  return <div>User {userId}, Post {postId}</div>;
}

// Navigate
<Link to="/users/123/posts/456">View Post</Link>
```

## Best Practices

1. **Use BrowserRouter** - Better than HashRouter for most apps
2. **Lazy load routes** - Improve initial load time
3. **Protect sensitive routes** - Authentication guards
4. **Use NavLink for navigation** - Shows active state
5. **Handle 404s** - Catch-all route with `path="*"`
6. **Nested routes** - Organize related routes
7. **Query params for filters** - Keep URL shareable

## Key Takeaways

- React Router enables SPA navigation with URLs
- BrowserRouter wraps app, Routes/Route define paths
- Link for navigation, useNavigate for programmatic routing
- useParams for URL parameters, useSearchParams for query strings
- Protected routes check authentication before rendering
- Lazy load routes for better performance
- Nested routes with Outlet for layouts

## Resources

- [React Router Official Docs](https://reactrouter.com/)
- [React Router Tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial)
