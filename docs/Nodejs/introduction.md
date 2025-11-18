---
sidebar_position: 0
---

# Introduction

## What is Node.js?

Node.js is a **JavaScript runtime** built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side, outside of the browser.

## Key Features

### 1. Asynchronous and Event-Driven

```javascript
// Non-blocking I/O
const fs = require('fs');

// Async file read - doesn't block execution
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log('This runs immediately!');
```

### 2. Single-Threaded but Highly Scalable

- Uses a **single thread** with **event loop**
- Can handle thousands of concurrent connections
- Non-blocking I/O operations

### 3. NPM - World's Largest Package Registry

```bash
npm install express
npm install mongoose
```

## Common Interview Questions

### Q1: What is Node.js and why use it?

**Answer:**

Node.js is a JavaScript runtime environment that executes JavaScript code outside a web browser. Key benefits:

1. **Same language** - Use JavaScript for frontend and backend
2. **Fast execution** - V8 engine compiles JS to native machine code
3. **Non-blocking I/O** - Handle multiple requests efficiently
4. **Large ecosystem** - Over 1 million packages on NPM
5. **Real-time applications** - Perfect for WebSocket, chat apps, live updates

**Best for:**
- REST APIs
- Real-time applications (chat, gaming)
- Microservices
- Streaming applications
- Server-side rendering (Next.js, Nuxt.js)

**Not ideal for:**
- CPU-intensive tasks (video encoding, image processing)
- Heavy computation (use Python, Go, or worker threads instead)

### Q2: How does Node.js work?

**Answer:**

```
┌─────────────────────────┐
│  Client Requests        │
└──────────┬──────────────┘
           │
     ┌─────▼─────┐
     │ Event Loop │ ◄── Single Thread
     └─────┬─────┘
           │
     ┌─────▼─────────────┐
     │  Event Queue      │
     └─────┬─────────────┘
           │
     ┌─────▼──────────────────┐
     │  Non-blocking I/O      │
     │  (libuv thread pool)   │
     └─────┬──────────────────┘
           │
     ┌─────▼─────┐
     │ Callbacks │
     └───────────┘
```

1. Requests come in
2. Event loop picks them up (single thread)
3. I/O operations go to thread pool
4. When complete, callbacks are executed

### Q3: What is the Event Loop?

**Answer:**

The **Event Loop** is what makes Node.js asynchronous. It continuously checks the event queue and executes callbacks.

```javascript
console.log('1 - Start');

setTimeout(() => {
  console.log('2 - Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3 - Promise');
});

console.log('4 - End');

// Output:
// 1 - Start
// 4 - End
// 3 - Promise  (microtask - higher priority)
// 2 - Timeout  (macrotask)
```

**Event Loop Phases:**

1. **Timers** - Execute `setTimeout` and `setInterval` callbacks
2. **Pending callbacks** - Execute I/O callbacks
3. **Poll** - Retrieve new I/O events
4. **Check** - Execute `setImmediate()` callbacks
5. **Close callbacks** - Execute close event callbacks

**Microtasks vs Macrotasks:**
- **Microtasks** (higher priority): Promises, `process.nextTick()`
- **Macrotasks** (lower priority): `setTimeout`, `setInterval`, `setImmediate`

### Q4: What is the difference between Node.js and Browser JavaScript?

**Answer:**

| Feature | Node.js | Browser |
|---------|---------|---------|
| **Environment** | Server-side | Client-side |
| **Global object** | `global` | `window` |
| **Modules** | CommonJS, ES Modules | ES Modules |
| **APIs** | `fs`, `http`, `path`, `crypto` | DOM, `fetch`, `localStorage` |
| **Purpose** | Backend services | User interfaces |

```javascript
// Node.js
const fs = require('fs');
fs.readFileSync('file.txt');

// Browser
document.querySelector('#button');
localStorage.setItem('key', 'value');
```

## Module System

### CommonJS (Traditional)

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3)); // 5
```

### ES Modules (Modern)

```javascript
// math.mjs or with "type": "module" in package.json
export function add(a, b) {
  return a + b;
}

// app.mjs
import { add } from './math.mjs';
console.log(add(2, 3)); // 5
```

## Error Handling

### Error-First Callbacks (Traditional Pattern)

```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});
```

### Promises

```javascript
const fs = require('fs').promises;

fs.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Async/Await

```javascript
const fs = require('fs').promises;

async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

## Package.json Basics

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

### Version Numbers (Semver)

```
^4.18.0  →  ^MAJOR.MINOR.PATCH
```

- **^** - Compatible with version (allows MINOR and PATCH updates)
- **~** - Approximately equivalent (allows PATCH updates only)
- **No symbol** - Exact version

## Global Objects

```javascript
// __dirname - current directory path
console.log(__dirname); // /home/user/project

// __filename - current file path
console.log(__filename); // /home/user/project/app.js

// process - info about current process
console.log(process.env.NODE_ENV); // development
console.log(process.argv); // command line arguments

// global - global namespace (like window in browser)
global.myVar = 'hello';
```

## Best Practices

1. **Use async/await** instead of callbacks
2. **Handle errors** properly (try/catch, error middleware)
3. **Use environment variables** for config
4. **Validate input** to prevent security issues
5. **Use helmet** for security headers
6. **Implement logging** (winston, pino)
7. **Use process managers** (PM2) in production

## Common Modules

### Built-in Modules

```javascript
const fs = require('fs');        // File system
const http = require('http');    // HTTP server
const path = require('path');    // File paths
const os = require('os');        // Operating system
const crypto = require('crypto'); // Cryptography
const events = require('events'); // Event emitter
```

### Popular NPM Packages

```javascript
const express = require('express');     // Web framework
const mongoose = require('mongoose');   // MongoDB ORM
const axios = require('axios');         // HTTP client
const dotenv = require('dotenv');       // Environment variables
const bcrypt = require('bcrypt');       // Password hashing
const jsonwebtoken = require('jsonwebtoken'); // JWT
```

## Interview Coding Challenge

**Question:** Create a simple HTTP server that responds with "Hello World".

**Solution:**

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

## Key Takeaways

- Node.js runs JavaScript on the server using V8 engine
- Single-threaded with event loop for handling concurrent requests
- Non-blocking I/O makes it highly scalable
- Perfect for I/O-intensive apps, not CPU-intensive tasks
- Large ecosystem with NPM packages
- Asynchronous by default (callbacks, promises, async/await)
