---
sidebar_position: 2
---

# Express.js & Middleware

## What is Express.js?

Express.js is a **minimal and flexible Node.js web application framework** that provides a robust set of features for web and mobile applications.

## Basic Express Server

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## What is Middleware?

Middleware functions are functions that have access to:
- **Request object** (`req`)
- **Response object** (`res`)
- **Next middleware** function (`next`)

### Middleware Flow

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

## Types of Middleware

### 1. Application-Level Middleware

Bound to `app` object using `app.use()`:

```javascript
const express = require('express');
const app = express();

// Runs for ALL routes
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // MUST call next() to pass control
});

// Runs for routes starting with /user
app.use('/user', (req, res, next) => {
  console.log('User route accessed');
  next();
});
```

### 2. Router-Level Middleware

Bound to `express.Router()`:

```javascript
const router = express.Router();

router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

router.get('/users', (req, res) => {
  res.send('Users list');
});

app.use('/api', router);
```

### 3. Built-in Middleware

```javascript
// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

### 4. Third-Party Middleware

```javascript
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());           // Enable CORS
app.use(helmet());         // Security headers
app.use(morgan('dev'));    // HTTP request logger
```

### 5. Error-Handling Middleware

**Must have 4 parameters** (err, req, res, next):

```javascript
// Error handling middleware (comes LAST)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message
  });
});
```

## Common Interview Questions

### Q1: What is middleware and how does it work?

**Answer:**

Middleware is a function that sits between the request and response. It can:
1. **Execute code**
2. **Modify req/res objects**
3. **End request-response cycle**
4. **Call next middleware** using `next()`

```javascript
function myMiddleware(req, res, next) {
  console.log('Middleware executed');
  req.customProperty = 'Hello';
  next(); // Pass control to next middleware
}

app.use(myMiddleware);

app.get('/', (req, res) => {
  res.send(req.customProperty); // 'Hello'
});
```

### Q2: What's the difference between app.use() and app.get()?

**Answer:**

| `app.use()` | `app.get()` |
|-------------|-------------|
| **Any HTTP method** (GET, POST, etc.) | **Only GET** requests |
| **Any path** (if no path specified) | **Specific path** required |
| Used for **middleware** | Used for **route handlers** |
| Can have **path prefix** | Exact or parameterized path |

```javascript
// Runs for ALL methods on /api/*
app.use('/api', middleware);

// Runs only for GET /api/users
app.get('/api/users', handler);
```

### Q3: What happens if you don't call next()?

**Answer:**

The request **hangs** and never completes. The client waits indefinitely (until timeout).

```javascript
// ❌ BAD - Request hangs
app.use((req, res, next) => {
  console.log('Middleware');
  // Forgot to call next()!
});

app.get('/', (req, res) => {
  res.send('Hello'); // Never reached!
});
```

### Q4: How do you pass errors to error-handling middleware?

**Answer:**

Call `next(error)` with an error object:

```javascript
app.get('/user/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      // Pass error to error handler
      return next(new Error('User not found'));
    }
    res.json(user);
  } catch (err) {
    next(err); // Pass error to error handler
  }
});

// Error handler catches it
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

## Middleware Execution Order

**Order matters!** Middleware runs in the order it's defined:

```javascript
const express = require('express');
const app = express();

// 1. First middleware
app.use((req, res, next) => {
  console.log('1');
  next();
});

// 2. Second middleware
app.use((req, res, next) => {
  console.log('2');
  next();
});

// 3. Route handler
app.get('/', (req, res) => {
  console.log('3');
  res.send('Done');
});

// Output when GET / is requested:
// 1
// 2
// 3
```

## Practical Middleware Examples

### 1. Authentication Middleware

```javascript
function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user to request
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Use on protected routes
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
```

### 2. Logging Middleware

```javascript
function loggerMiddleware(req, res, next) {
  const start = Date.now();

  // Log when response finishes
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });

  next();
}

app.use(loggerMiddleware);
```

### 3. Request Validation Middleware

```javascript
function validateUser(req, res, next) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }

  if (!email.includes('@')) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }

  next();
}

app.post('/users', validateUser, (req, res) => {
  // Validation passed, create user
  res.json({ message: 'User created' });
});
```

### 4. CORS Middleware

```javascript
function corsMiddleware(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
}

app.use(corsMiddleware);
```

### 5. Rate Limiting Middleware

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later'
});

app.use('/api/', limiter);
```

## Complete Express App Example

```javascript
const express = require('express');
const app = express();

// 1. Built-in middleware (first)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Third-party middleware
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// 3. Custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 4. Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World', time: req.requestTime });
});

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: 'John' }]);
});

// 5. Error handling (last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// 6. 404 handler (very last)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Common Middleware Packages

| Package | Purpose |
|---------|---------|
| `body-parser` | Parse request bodies (built into Express now) |
| `cors` | Enable CORS |
| `helmet` | Security headers |
| `morgan` | HTTP request logger |
| `compression` | Gzip compression |
| `express-validator` | Input validation |
| `express-rate-limit` | Rate limiting |
| `cookie-parser` | Parse cookies |

## Best Practices

1. **Order matters** - Place middleware in correct order
2. **Always call next()** - Unless ending the request
3. **Use error handlers** - Always have error handling middleware
4. **Keep middleware focused** - One responsibility per middleware
5. **Use third-party middleware** - Don't reinvent the wheel
6. **Handle async errors** - Use try/catch or async error handlers
7. **Validate early** - Validate input before processing

## Interview Coding Challenge

**Question:** Create middleware that checks if a user is authenticated using a simple API key.

**Solution:**

```javascript
function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({
      error: 'API key required'
    });
  }

  // In real app, check against database
  const validKeys = ['key123', 'key456'];

  if (!validKeys.includes(apiKey)) {
    return res.status(403).json({
      error: 'Invalid API key'
    });
  }

  next();
}

// Use on protected routes
app.get('/api/data', apiKeyAuth, (req, res) => {
  res.json({ data: 'Secret data' });
});
```

## Key Takeaways

- Middleware functions have access to `req`, `res`, and `next`
- Order of middleware matters
- Must call `next()` to pass control to next middleware
- Error handlers have 4 parameters: `(err, req, res, next)`
- Can use app-level, router-level, and error-handling middleware
- Express has built-in middleware for common tasks
- Many third-party middleware packages available
