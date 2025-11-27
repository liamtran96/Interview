---
sidebar_position: 10
---

# Event Loop & Asynchronous JavaScript

## What is the Event Loop?

The **Event Loop** is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It handles executing code, collecting and processing events, and executing queued sub-tasks.

:::info Single-Threaded JavaScript
JavaScript has a single call stack, meaning it can only execute one thing at a time. The event loop enables async behavior without multi-threading.
:::

## Components of the Event Loop

### 1. Call Stack

The **call stack** tracks where in the program we are. When a function is called, it's pushed onto the stack. When it returns, it's popped off.

```javascript
function first() {
  console.log('First');
  second();
  console.log('First again');
}

function second() {
  console.log('Second');
}

first();

// Call stack execution:
// 1. Push first()
// 2. Log "First"
// 3. Push second()
// 4. Log "Second"
// 5. Pop second()
// 6. Log "First again"
// 7. Pop first()
```

### 2. Web APIs (Browser APIs)

Functions like `setTimeout`, `fetch`, DOM events are handled by Web APIs (provided by the browser), not JavaScript itself.

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

console.log('End');

// Output:
// "Start"
// "End"
// "Timeout"

// Why? setTimeout is handled by Web API, callback goes to queue
```

### 3. Task Queue (Macrotask Queue)

Also called the **callback queue**. Holds callbacks from Web APIs waiting to be executed.

**Examples of macrotasks:**
- `setTimeout`
- `setInterval`
- `setImmediate` (Node.js)
- I/O operations
- UI rendering

### 4. Microtask Queue

Higher priority than the task queue. All microtasks execute before the next macrotask.

**Examples of microtasks:**
- `Promise.then/catch/finally`
- `queueMicrotask()`
- `MutationObserver`
- `process.nextTick()` (Node.js)

## How the Event Loop Works

```
┌─────────────────────────┐
│    Call Stack           │
│    (Execute code)       │
└─────────────────────────┘
           ↓
┌─────────────────────────┐
│    Microtask Queue      │ ← Higher priority
│    (Promises, etc.)     │
└─────────────────────────┘
           ↓
┌─────────────────────────┐
│    Macrotask Queue      │ ← Lower priority
│    (setTimeout, etc.)   │
└─────────────────────────┘
           ↓
        Repeat
```

**The Loop:**
1. Execute code in call stack until empty
2. Execute ALL microtasks (until microtask queue is empty)
3. Execute ONE macrotask from queue
4. Repeat from step 2

## Examples

### Basic Example

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

Promise.resolve().then(() => {
  console.log('3');
});

console.log('4');

// Output: 1, 4, 3, 2

// Execution order:
// 1. console.log('1') - synchronous, immediate
// 2. setTimeout - sent to Web API
// 3. Promise.then - added to microtask queue
// 4. console.log('4') - synchronous, immediate
// 5. Call stack empty → process microtasks
// 6. console.log('3') - microtask
// 7. Microtask queue empty → process macrotask
// 8. console.log('2') - macrotask
```

### Microtasks vs Macrotasks

```javascript
console.log('Script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
  })
  .then(() => {
    console.log('Promise 2');
  });

console.log('Script end');

// Output:
// Script start
// Script end
// Promise 1
// Promise 2
// setTimeout

// Why?
// 1. Sync code runs first (Script start, Script end)
// 2. ALL microtasks run (Promise 1, Promise 2)
// 3. ONE macrotask runs (setTimeout)
```

### Nested Timers

```javascript
setTimeout(() => {
  console.log('Timeout 1');
  setTimeout(() => {
    console.log('Timeout 2');
  }, 0);
}, 0);

setTimeout(() => {
  console.log('Timeout 3');
}, 0);

// Output:
// Timeout 1
// Timeout 3
// Timeout 2

// Why?
// 1. Both outer timeouts added to queue
// 2. First outer timeout executes → logs "Timeout 1"
// 3. Inner timeout added to queue (goes to end)
// 4. Second outer timeout executes → logs "Timeout 3"
// 5. Inner timeout executes → logs "Timeout 2"
```

### Promises and setTimeout

```javascript
setTimeout(() => console.log('1'), 0);

Promise.resolve().then(() => console.log('2'));
Promise.resolve().then(() => console.log('3'));

setTimeout(() => console.log('4'), 0);

console.log('5');

// Output: 5, 2, 3, 1, 4

// Order:
// 1. Sync: 5
// 2. Microtasks: 2, 3 (both promises)
// 3. Macrotasks: 1, 4 (both timeouts, in order)
```

### Microtask Chain

```javascript
Promise.resolve().then(() => {
  console.log('Promise 1');
  Promise.resolve().then(() => {
    console.log('Promise 2');
  });
});

Promise.resolve().then(() => {
  console.log('Promise 3');
});

// Output:
// Promise 1
// Promise 3
// Promise 2

// Why?
// Microtasks process level by level:
// Level 1: Promise 1, Promise 3
// Level 2: Promise 2
```

## Common Interview Questions

### Q1: What is the output of this code?

```javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('End');

// Output: Start, End, Promise, Timeout

// Explanation:
// 1. "Start" - synchronous
// 2. setTimeout - sent to macrotask queue
// 3. Promise - sent to microtask queue
// 4. "End" - synchronous
// 5. Call stack empty → microtasks first
// 6. "Promise" - microtask
// 7. "Timeout" - macrotask
```

### Q2: Explain the difference between microtasks and macrotasks

**Answer:**

| Feature | Microtasks | Macrotasks |
|---------|-----------|------------|
| **Priority** | Higher | Lower |
| **When** | After each task, all microtasks run | One per event loop cycle |
| **Examples** | Promises, queueMicrotask | setTimeout, setInterval |
| **Processing** | ALL microtasks before next macrotask | ONE macrotask at a time |

```javascript
// Microtasks - ALL execute before next macrotask
Promise.resolve().then(() => console.log(1));
Promise.resolve().then(() => console.log(2));
Promise.resolve().then(() => console.log(3));
setTimeout(() => console.log(4), 0);

// Output: 1, 2, 3, 4
// All 3 promises run, then timeout
```

### Q3: Why does setTimeout(fn, 0) not execute immediately?

**Answer:**

`setTimeout(fn, 0)` schedules the callback to run **after the current code finishes** and **after all microtasks**.

```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
}, 0);

console.log('3');

// Output: 1, 3, 2

// Even with 0ms delay:
// 1. setTimeout sends callback to macrotask queue
// 2. Sync code finishes (1, 3)
// 3. Microtasks run (if any)
// 4. Then macrotask runs (2)
```

**Minimum delay:** Browsers have a minimum timeout of ~4ms (not truly 0).

### Q4: What happens if a microtask creates more microtasks?

**Answer:**

They're added to the microtask queue and executed in the same cycle, potentially **blocking the event loop**!

```javascript
// ⚠️ INFINITE LOOP!
Promise.resolve().then(function loop() {
  console.log('Microtask');
  Promise.resolve().then(loop); // Creates another microtask
});

// This will block the event loop!
// Microtasks keep getting added and executed
// Macrotasks never get a chance to run
```

**Safe version with macrotask:**
```javascript
setTimeout(function loop() {
  console.log('Macrotask');
  setTimeout(loop, 0); // Allows event loop to continue
}, 0);
```

### Q5: What is the output?

```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');

// Output:
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

// Explanation:
// 1. Sync: script start, async1 start, async2, promise1, script end
// 2. Microtasks: async1 end (await), promise2
// 3. Macrotask: setTimeout
```

## async/await and Event Loop

```javascript
// async/await is syntactic sugar for Promises

// This:
async function example() {
  await somePromise();
  console.log('After await');
}

// Is equivalent to:
function example() {
  return somePromise().then(() => {
    console.log('After await');
  });
}

// Both add "After await" to microtask queue
```

## Event Loop in Node.js

Node.js has a more complex event loop with multiple phases:

```
   ┌───────────────────────────┐
┌─>│           timers          │ ← setTimeout, setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ ← I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ ← Internal
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ ← Incoming connections, data
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ ← setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │      close callbacks      │ ← socket.on('close')
│  └───────────────────────────┘
└──────────────────────────────┘
```

**Key differences:**
- `process.nextTick()` - Runs before microtasks (highest priority)
- `setImmediate()` - Runs in check phase

```javascript
// Node.js specific
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('promise'));

// Output: nextTick, promise, immediate
```

## Best Practices

1. **Don't block the event loop** - Avoid long-running sync code
2. **Use Web Workers** - For CPU-intensive tasks
3. **Understand async timing** - Know when callbacks run
4. **Avoid microtask loops** - Don't create infinite microtask chains
5. **Use async/await** - Cleaner than .then() chains
6. **Be careful with setTimeout(fn, 0)** - Not truly immediate
7. **Profile performance** - Use Chrome DevTools Performance tab

## Common Patterns

### Deferring Execution

```javascript
// Defer to next tick
setTimeout(() => {
  // Runs after current code finishes
}, 0);

// Or using Promise (microtask)
Promise.resolve().then(() => {
  // Runs after sync code, before macrotasks
});
```

### Breaking Up Long Tasks

```javascript
// ❌ BAD - Blocks event loop
function processItems(items) {
  items.forEach(item => {
    // Expensive operation
    process(item);
  });
}

// ✅ GOOD - Allows event loop to breathe
async function processItems(items) {
  for (const item of items) {
    await new Promise(resolve => setTimeout(resolve, 0));
    process(item); // Each iteration allows other tasks to run
  }
}
```

## Visualization Tool

Use this in browser console to see event loop in action:

```javascript
function log(message, color) {
  console.log(`%c${message}`, `color: ${color}`);
}

log('Sync 1', 'black');

setTimeout(() => log('Timeout 1', 'red'), 0);

Promise.resolve().then(() => log('Promise 1', 'blue'));

setTimeout(() => log('Timeout 2', 'red'), 0);

Promise.resolve().then(() => log('Promise 2', 'blue'));

log('Sync 2', 'black');

// Black (sync) → Blue (microtasks) → Red (macrotasks)
```

## Key Takeaways

- JavaScript is single-threaded with one call stack
- Event loop enables non-blocking async operations
- Microtasks (Promises) have higher priority than macrotasks (setTimeout)
- ALL microtasks execute before next macrotask
- `await` adds continuation to microtask queue
- Understand execution order: sync → microtasks → macrotasks
- Don't block the event loop with long-running sync code

## Resources

- [Jake Archibald Event Loop Talk](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
- [MDN Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [JavaScript.info Event Loop](https://javascript.info/event-loop)
- [Node.js Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [Loupe Visualizer](http://latentflip.com/loupe/) - Interactive event loop visualization
