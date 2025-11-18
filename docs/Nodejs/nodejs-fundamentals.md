---
sidebar_position: 1
---

# Node.js Fundamentals

## What is Node.js?

**Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server-side, outside of a web browser.

:::info Key Characteristics
- **Event-driven architecture** - Non-blocking I/O operations
- **Single-threaded** - Uses event loop for concurrency
- **Asynchronous** - Non-blocking operations by default
- **Fast** - Built on Chrome's V8 engine
:::

## Why Node.js?

**Advantages:**
1. **JavaScript everywhere** - Same language for frontend and backend
2. **Non-blocking I/O** - Handles concurrent operations efficiently
3. **Large ecosystem** - npm with millions of packages
4. **Fast execution** - V8 engine compiles to machine code
5. **Scalability** - Great for I/O-intensive applications
6. **Active community** - Large, active developer community

**Best for:**
- Real-time applications (chat, gaming)
- API servers and microservices
- Streaming applications
- I/O-intensive operations
- Single-page applications

**Not ideal for:**
- CPU-intensive operations (blocks event loop)
- Heavy computation tasks

## Event Loop

The **event loop** is the heart of Node.js's asynchronous behavior.

### How Event Loop Works

```
   ┌───────────────────────────┐
┌─>│           timers          │  setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │  I/O callbacks deferred to next loop
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │  Internal use
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │  Retrieve new I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │  setImmediate callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │      close callbacks      │  socket.on('close', ...)
│  └───────────────────────────┘
└──────────────────────────────┘
```

### Event Loop Example

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. Timeout');
}, 0);

setImmediate(() => {
  console.log('3. Immediate');
});

Promise.resolve().then(() => {
  console.log('4. Promise');
});

console.log('5. End');

// Output:
// 1. Start
// 5. End
// 4. Promise (microtask, runs before timers)
// 2. Timeout
// 3. Immediate
```

**Order of execution:**
1. **Synchronous code** - Runs first
2. **Microtasks** - Promises, process.nextTick
3. **Macrotasks** - setTimeout, setImmediate, I/O

## Modules

**Modules** are reusable blocks of code that encapsulate related functionality.

### CommonJS Modules (Traditional)

```javascript
// math.js - Exporting
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// Or export individual functions
// exports.add = add;
// exports.subtract = subtract;

// app.js - Importing
const math = require('./math');
console.log(math.add(5, 3)); // 8

// Or destructuring
const { add, subtract } = require('./math');
console.log(add(5, 3)); // 8
```

### ES Modules (Modern)

```javascript
// math.mjs - Exporting
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

// Default export
export default function multiply(a, b) {
  return a * b;
}

// app.mjs - Importing
import multiply, { add, subtract } from './math.mjs';

console.log(add(5, 3));      // 8
console.log(multiply(5, 3)); // 15
```

**Enable ES Modules in package.json:**
```json
{
  "type": "module"
}
```

### Built-in Modules

```javascript
// File System
const fs = require('fs');

// Path
const path = require('path');

// HTTP
const http = require('http');

// Events
const EventEmitter = require('events');

// Streams
const { Readable, Writable } = require('stream');

// Operating System
const os = require('os');

// URL
const url = require('url');

// Crypto
const crypto = require('crypto');
```

## Asynchronous Patterns

### 1. Callbacks

```javascript
const fs = require('fs');

// Callback pattern (error-first callback)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});

// Callback hell (anti-pattern)
fs.readFile('file1.txt', 'utf8', (err1, data1) => {
  if (err1) return console.error(err1);
  fs.readFile('file2.txt', 'utf8', (err2, data2) => {
    if (err2) return console.error(err2);
    fs.readFile('file3.txt', 'utf8', (err3, data3) => {
      if (err3) return console.error(err3);
      console.log('All files read');
    });
  });
});
```

### 2. Promises

```javascript
const fs = require('fs').promises;

// Promise-based
fs.readFile('file.txt', 'utf8')
  .then(data => {
    console.log('File contents:', data);
  })
  .catch(err => {
    console.error('Error reading file:', err);
  });

// Promise chaining
fs.readFile('file1.txt', 'utf8')
  .then(data1 => {
    console.log('File 1:', data1);
    return fs.readFile('file2.txt', 'utf8');
  })
  .then(data2 => {
    console.log('File 2:', data2);
    return fs.readFile('file3.txt', 'utf8');
  })
  .then(data3 => {
    console.log('File 3:', data3);
  })
  .catch(err => {
    console.error('Error:', err);
  });

// Creating promises
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(1000).then(() => console.log('1 second later'));
```

### 3. Async/Await (Recommended)

```javascript
const fs = require('fs').promises;

// Clean, readable async code
async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    console.log('File 1:', data1);

    const data2 = await fs.readFile('file2.txt', 'utf8');
    console.log('File 2:', data2);

    const data3 = await fs.readFile('file3.txt', 'utf8');
    console.log('File 3:', data3);
  } catch (err) {
    console.error('Error:', err);
  }
}

readFiles();

// Parallel execution
async function readFilesParallel() {
  try {
    const [data1, data2, data3] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8'),
      fs.readFile('file3.txt', 'utf8')
    ]);
    console.log('All files read:', data1, data2, data3);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

### 4. Event Emitters

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Register listener
myEmitter.on('event', (arg1, arg2) => {
  console.log('Event occurred:', arg1, arg2);
});

// Emit event
myEmitter.emit('event', 'Hello', 'World');
// Output: Event occurred: Hello World

// Real-world example: HTTP server
const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request received:', req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000);
```

## File System (fs)

### Reading Files

```javascript
const fs = require('fs');
const fsPromises = require('fs').promises;

// 1. Synchronous (blocks event loop)
try {
  const data = fs.readFileSync('file.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}

// 2. Asynchronous (callback)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// 3. Promise-based (recommended)
async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### Writing Files

```javascript
const fs = require('fs').promises;

// Write file
async function writeFile() {
  try {
    await fs.writeFile('output.txt', 'Hello World', 'utf8');
    console.log('File written successfully');
  } catch (err) {
    console.error('Error writing file:', err);
  }
}

// Append to file
async function appendFile() {
  try {
    await fs.appendFile('output.txt', '\nNew line', 'utf8');
    console.log('Content appended');
  } catch (err) {
    console.error('Error:', err);
  }
}
```

### Working with Directories

```javascript
const fs = require('fs').promises;
const path = require('path');

// Create directory
async function createDir() {
  try {
    await fs.mkdir('new-folder', { recursive: true });
    console.log('Directory created');
  } catch (err) {
    console.error(err);
  }
}

// Read directory
async function readDir() {
  try {
    const files = await fs.readdir('.');
    console.log('Files:', files);
  } catch (err) {
    console.error(err);
  }
}

// Check if file exists
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// Delete file
async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log('File deleted');
  } catch (err) {
    console.error('Error:', err);
  }
}
```

### File Stats

```javascript
const fs = require('fs').promises;

async function getFileInfo(filePath) {
  try {
    const stats = await fs.stat(filePath);

    console.log('Is file:', stats.isFile());
    console.log('Is directory:', stats.isDirectory());
    console.log('Size:', stats.size, 'bytes');
    console.log('Created:', stats.birthtime);
    console.log('Modified:', stats.mtime);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

## Streams

**Streams** are objects for handling data in chunks, useful for processing large files or continuous data.

### Types of Streams

1. **Readable** - Read data from source
2. **Writable** - Write data to destination
3. **Duplex** - Both readable and writable
4. **Transform** - Modify data while reading/writing

### Readable Streams

```javascript
const fs = require('fs');

// Create readable stream
const readStream = fs.createReadStream('large-file.txt', {
  encoding: 'utf8',
  highWaterMark: 16 * 1024 // 16KB chunks
});

// Read data in chunks
readStream.on('data', (chunk) => {
  console.log('Received chunk:', chunk.length, 'bytes');
});

readStream.on('end', () => {
  console.log('Finished reading');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});

// Pause/Resume
readStream.pause();
setTimeout(() => {
  readStream.resume();
}, 1000);
```

### Writable Streams

```javascript
const fs = require('fs');

const writeStream = fs.createWriteStream('output.txt');

// Write data
writeStream.write('Line 1\n');
writeStream.write('Line 2\n');
writeStream.write('Line 3\n');

// End stream
writeStream.end();

writeStream.on('finish', () => {
  console.log('Write completed');
});

writeStream.on('error', (err) => {
  console.error('Error:', err);
});
```

### Piping Streams

```javascript
const fs = require('fs');

// Copy file using streams
const readStream = fs.createReadStream('source.txt');
const writeStream = fs.createWriteStream('destination.txt');

// Pipe: Pass output of read stream to write stream
readStream.pipe(writeStream);

writeStream.on('finish', () => {
  console.log('File copied successfully');
});

// Chaining pipes
const zlib = require('zlib');

// Compress file
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

// Decompress file
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('output.txt'));
```

### Transform Streams

```javascript
const { Transform } = require('stream');

// Create uppercase transform stream
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Use transform stream
process.stdin
  .pipe(upperCaseTransform)
  .pipe(process.stdout);

// Example: CSV parser
const csvParser = new Transform({
  transform(chunk, encoding, callback) {
    const lines = chunk.toString().split('\n');
    lines.forEach(line => {
      const [name, age] = line.split(',');
      this.push(JSON.stringify({ name, age }) + '\n');
    });
    callback();
  }
});
```

## Path Module

```javascript
const path = require('path');

// Join paths
const filePath = path.join('/users', 'john', 'documents', 'file.txt');
// Result: /users/john/documents/file.txt

// Resolve paths (returns absolute path)
const absolutePath = path.resolve('docs', 'file.txt');
// Result: /current/working/directory/docs/file.txt

// Parse path
const parsed = path.parse('/users/john/file.txt');
console.log(parsed);
// {
//   root: '/',
//   dir: '/users/john',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Get directory name
path.dirname('/users/john/file.txt');  // '/users/john'

// Get base name
path.basename('/users/john/file.txt'); // 'file.txt'

// Get extension
path.extname('/users/john/file.txt');  // '.txt'

// Normalize path
path.normalize('/users//john/../jane/file.txt');
// Result: /users/jane/file.txt
```

## HTTP Server

### Basic HTTP Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  // Request handling
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);

  // Response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

### Routing

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } else if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: ['John', 'Jane'] }));
  } else if (req.url === '/api/users' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User created', data }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000);
```

## Process and Global Objects

### Process Object

```javascript
// Command line arguments
console.log(process.argv);
// ['node', 'script.js', 'arg1', 'arg2']

// Environment variables
console.log(process.env.NODE_ENV);
console.log(process.env.PORT);

// Current directory
console.log(process.cwd());

// Process ID
console.log(process.pid);

// Exit process
process.exit(0); // Success
process.exit(1); // Error

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});
```

### Global Objects

```javascript
// __dirname - Current directory path
console.log(__dirname);

// __filename - Current file path
console.log(__filename);

// setTimeout, setInterval (same as browser)
setTimeout(() => console.log('Timeout'), 1000);
setInterval(() => console.log('Interval'), 1000);

// setImmediate (Node.js specific)
setImmediate(() => console.log('Immediate'));

// console
console.log('Log');
console.error('Error');
console.warn('Warning');
console.table([{ name: 'John', age: 30 }]);
console.time('timer');
// ... code ...
console.timeEnd('timer');
```

## Interview Questions

### Q1: What is Node.js and how does it work?

**Answer:**

**Node.js** is a JavaScript runtime built on Chrome's V8 engine that executes JavaScript code outside a web browser.

**Key characteristics:**
1. **Event-driven** - Uses events and callbacks for async operations
2. **Non-blocking I/O** - Doesn't wait for I/O operations to complete
3. **Single-threaded** - Uses single thread with event loop
4. **V8 engine** - Compiles JavaScript to machine code for fast execution

**How it works:**
```javascript
// Traditional blocking I/O (not Node.js)
const data = readFileSync('file.txt'); // Waits here
console.log(data);
processData(data); // Must wait for read to complete

// Node.js non-blocking I/O
readFile('file.txt', (err, data) => {
  console.log(data);
  processData(data);
});
// Code continues executing immediately
console.log('Reading file...');
```

**Benefits:**
- Handles many concurrent connections efficiently
- Fast for I/O-intensive applications
- JavaScript everywhere (frontend + backend)

**Not ideal for:**
- CPU-intensive tasks (blocks event loop)
- Heavy computational work

### Q2: What is the event loop in Node.js?

**Answer:**

The **event loop** is the mechanism that handles asynchronous operations in Node.js.

**How it works:**
1. **Call Stack** - Executes synchronous code
2. **Callback Queue** - Holds callbacks from async operations
3. **Event Loop** - Checks if call stack is empty, then moves callbacks from queue to stack

```javascript
console.log('1. Start');

setTimeout(() => {
  console.log('2. Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise');
});

console.log('4. End');

// Output:
// 1. Start
// 4. End
// 3. Promise (microtask queue, higher priority)
// 2. Timeout (macrotask queue)
```

**Event Loop Phases:**
1. **Timers** - setTimeout, setInterval
2. **Pending callbacks** - I/O callbacks
3. **Idle, prepare** - Internal use
4. **Poll** - Retrieve new I/O events
5. **Check** - setImmediate callbacks
6. **Close callbacks** - socket.on('close')

**Microtasks vs Macrotasks:**
- **Microtasks** (higher priority): Promises, process.nextTick
- **Macrotasks**: setTimeout, setImmediate, I/O

### Q3: What is the difference between `require()` and `import`?

**Answer:**

| Feature | `require()` | `import` |
|---------|-------------|----------|
| **Type** | CommonJS | ES Modules |
| **Loading** | Synchronous | Asynchronous (can be) |
| **Where** | Anywhere in code | Top of file |
| **Dynamic** | Yes | Limited |
| **Default in Node.js** | Yes (< v13) | No (need `"type": "module"`) |

```javascript
// CommonJS (require)
const fs = require('fs');
const { readFile } = require('fs');

// Can be conditional
if (condition) {
  const module = require('./module');
}

// ES Modules (import)
import fs from 'fs';
import { readFile } from 'fs';

// Must be at top level
// if (condition) {
//   import module from './module'; // ✗ Error
// }

// Dynamic import (ES Modules)
if (condition) {
  const module = await import('./module'); // ✓ OK
}
```

**Enable ES Modules:**
```json
// package.json
{
  "type": "module"
}
```

**Best Practice:** Use ES Modules for new projects (modern standard).

### Q4: What are streams in Node.js and why use them?

**Answer:**

**Streams** are objects for handling data in chunks instead of loading everything into memory.

**Types of streams:**
1. **Readable** - Read data (e.g., fs.createReadStream)
2. **Writable** - Write data (e.g., fs.createWriteStream)
3. **Duplex** - Both read and write (e.g., network socket)
4. **Transform** - Modify data (e.g., compression)

**Why use streams:**
1. **Memory efficient** - Process large files without loading all into memory
2. **Time efficient** - Start processing before all data is available
3. **Composable** - Chain operations with .pipe()

```javascript
// Without streams (loads entire file into memory)
const fs = require('fs');
const data = fs.readFileSync('large-file.txt'); // Uses lots of memory
console.log(data);

// With streams (memory efficient)
const readStream = fs.createReadStream('large-file.txt');
readStream.on('data', (chunk) => {
  console.log('Chunk:', chunk.length, 'bytes');
  // Process chunk immediately
});

// Piping example: Copy file
fs.createReadStream('source.txt')
  .pipe(fs.createWriteStream('destination.txt'));

// Chaining: Compress file
const zlib = require('zlib');
fs.createReadStream('file.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('file.txt.gz'));
```

### Q5: What is the difference between synchronous and asynchronous functions?

**Answer:**

| Feature | Synchronous | Asynchronous |
|---------|-------------|--------------|
| **Blocking** | Yes, blocks execution | No, doesn't block |
| **Performance** | Slower for I/O | Faster for I/O |
| **Use Case** | Simple scripts, initialization | Web servers, I/O operations |

```javascript
const fs = require('fs');

// Synchronous (blocks event loop)
console.log('1. Before');
const data = fs.readFileSync('file.txt', 'utf8'); // Waits here
console.log('2. Data:', data);
console.log('3. After');

// Output:
// 1. Before
// 2. Data: (file contents)
// 3. After

// Asynchronous (non-blocking)
console.log('1. Before');
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log('2. Data:', data); // Executes later
});
console.log('3. After'); // Doesn't wait for file read

// Output:
// 1. Before
// 3. After
// 2. Data: (file contents)
```

**Best Practice:**
- **Use async** for I/O operations in web servers
- **Use sync** only for initialization or simple scripts
- Never use sync in web servers (blocks all requests)

### Q6: What is callback hell and how do you avoid it?

**Answer:**

**Callback hell** (pyramid of doom) is deeply nested callbacks that are hard to read and maintain.

```javascript
// Callback hell
fs.readFile('file1.txt', 'utf8', (err1, data1) => {
  if (err1) return console.error(err1);
  fs.readFile('file2.txt', 'utf8', (err2, data2) => {
    if (err2) return console.error(err2);
    fs.readFile('file3.txt', 'utf8', (err3, data3) => {
      if (err3) return console.error(err3);
      console.log('All done');
    });
  });
});
```

**Solutions:**

**1. Promises:**
```javascript
const fs = require('fs').promises;

fs.readFile('file1.txt', 'utf8')
  .then(data1 => fs.readFile('file2.txt', 'utf8'))
  .then(data2 => fs.readFile('file3.txt', 'utf8'))
  .then(data3 => console.log('All done'))
  .catch(err => console.error(err));
```

**2. Async/Await (recommended):**
```javascript
async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
    const data3 = await fs.readFile('file3.txt', 'utf8');
    console.log('All done');
  } catch (err) {
    console.error(err);
  }
}
```

**3. Named functions:**
```javascript
function readFile1(callback) {
  fs.readFile('file1.txt', 'utf8', callback);
}

function readFile2(err, data1) {
  if (err) return handleError(err);
  fs.readFile('file2.txt', 'utf8', readFile3);
}

function readFile3(err, data2) {
  if (err) return handleError(err);
  console.log('All done');
}

readFile1(readFile2);
```

### Q7: What is middleware in Express.js?

**Answer:**

**Middleware** are functions that have access to the request and response objects and can modify them or end the request-response cycle.

**Types of middleware:**
1. **Application-level** - Bound to app instance
2. **Router-level** - Bound to router instance
3. **Error-handling** - Has 4 parameters
4. **Built-in** - Provided by Express
5. **Third-party** - From npm packages

```javascript
const express = require('express');
const app = express();

// Application-level middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // Pass to next middleware
});

// Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files

// Route-specific middleware
function authenticate(req, res, next) {
  if (req.headers.authorization) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

app.get('/api/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected data' });
});

// Error-handling middleware (must have 4 parameters)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});
```

**Middleware execution order:**
```javascript
app.use(middleware1); // Executes first
app.use(middleware2); // Executes second
app.get('/route', middleware3, handler); // Executes third, then handler
```

### Q8: What is `process.nextTick()` and how is it different from `setImmediate()`?

**Answer:**

Both schedule callbacks but execute at different times in the event loop.

| Feature | `process.nextTick()` | `setImmediate()` |
|---------|---------------------|------------------|
| **When** | Before next event loop | After I/O events |
| **Priority** | Higher | Lower |
| **Phase** | Between event loop phases | Check phase |

```javascript
console.log('1. Start');

setImmediate(() => {
  console.log('2. Immediate');
});

process.nextTick(() => {
  console.log('3. Next Tick');
});

setTimeout(() => {
  console.log('4. Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('5. Promise');
});

console.log('6. End');

// Output:
// 1. Start
// 6. End
// 3. Next Tick (highest priority)
// 5. Promise (microtask)
// 4. Timeout (macrotask, timers phase)
// 2. Immediate (macrotask, check phase)
```

**When to use:**
- **process.nextTick()**: When you need to execute callback ASAP before I/O
- **setImmediate()**: When you want to execute after I/O events

**Warning:** Excessive `process.nextTick()` can starve the event loop.

### Q9: How do you handle errors in Node.js?

**Answer:**

**1. Try-Catch (Synchronous):**
```javascript
try {
  const data = fs.readFileSync('file.txt', 'utf8');
} catch (err) {
  console.error('Error reading file:', err);
}
```

**2. Error-first Callbacks:**
```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(data);
});
```

**3. Promises (catch):**
```javascript
fs.promises.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error('Error:', err));
```

**4. Async/Await (try-catch):**
```javascript
async function readFile() {
  try {
    const data = await fs.promises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err);
  }
}
```

**5. Global Error Handlers:**
```javascript
// Uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Exit process
});

// Unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});
```

**6. Express Error Middleware:**
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

### Q10: What is the difference between `__dirname` and `process.cwd()`?

**Answer:**

| Feature | `__dirname` | `process.cwd()` |
|---------|-------------|-----------------|
| **Type** | Variable | Function |
| **Returns** | Directory of current file | Directory where process started |
| **Changes** | No | Yes (with process.chdir()) |

```javascript
// File: /home/user/project/src/utils/helper.js

console.log(__dirname);
// Output: /home/user/project/src/utils

console.log(process.cwd());
// Output: /home/user/project (where you ran `node` command)

// Change working directory
process.chdir('/home/user/other');
console.log(process.cwd());
// Output: /home/user/other

console.log(__dirname);
// Output: /home/user/project/src/utils (unchanged)
```

**Use cases:**
- **`__dirname`**: Load files relative to current script
- **`process.cwd()`**: Load config files from project root

```javascript
const path = require('path');

// Load file relative to current script
const configPath = path.join(__dirname, 'config.json');

// Load file from project root
const rootConfig = path.join(process.cwd(), 'config.json');
```

## Best Practices

1. **Use async/await** - Modern, readable async code
2. **Handle errors properly** - Never ignore errors
3. **Use streams for large files** - Memory efficient
4. **Avoid blocking operations** - Don't use sync functions in production
5. **Use environment variables** - Configuration and secrets
6. **Implement graceful shutdown** - Handle SIGTERM, cleanup resources
7. **Use process managers** - PM2, forever for production
8. **Log appropriately** - Use logging libraries (Winston, Pino)
9. **Security** - Validate input, use helmet, rate limiting
10. **Use ES Modules** - Modern standard for new projects

## Resources

- [Node.js Official Documentation](https://nodejs.org/docs/latest/api/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Node.js Design Patterns](https://www.nodejsdesignpatterns.com/)
- [npm Documentation](https://docs.npmjs.com/)
- [Express.js Documentation](https://expressjs.com/)
