---
sidebar_position: 23
---

# JavaScript Engines

## What is a JavaScript Engine?

A JavaScript engine is a program that executes JavaScript code. Different browsers use different engines.

| Browser | Engine | Developer |
|---------|--------|-----------|
| Chrome | V8 | Google |
| Firefox | SpiderMonkey | Mozilla |
| Safari | JavaScriptCore (Nitro) | Apple |
| Edge | V8 | Microsoft |
| Node.js | V8 | Google |

## How JavaScript Engines Work

### 1. Parsing

Convert source code into Abstract Syntax Tree (AST).

```javascript
// Source code
function add(a, b) {
  return a + b;
}

// Becomes AST (simplified)
{
  type: "FunctionDeclaration",
  id: { type: "Identifier", name: "add" },
  params: [
    { type: "Identifier", name: "a" },
    { type: "Identifier", name: "b" }
  ],
  body: {
    type: "ReturnStatement",
    argument: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Identifier", name: "a" },
      right: { type: "Identifier", name: "b" }
    }
  }
}
```

### 2. Compilation

JavaScript uses **Just-In-Time (JIT)** compilation.

```
Source Code → Parser → AST → Interpreter → Bytecode
                                    ↓
                              Profiler (monitors hot code)
                                    ↓
                          Optimizing Compiler → Machine Code
```

**Interpreter**: Quickly executes code line-by-line (Ignition in V8).

**Compiler**: Slowly optimizes frequently-run code (TurboFan in V8).

### 3. Execution

Execute bytecode or optimized machine code.

## V8 Engine (Chrome/Node.js)

### Compilation Pipeline

```
JavaScript → Parser → AST → Ignition (Interpreter) → Bytecode
                                        ↓
                              TurboFan (Optimizing Compiler)
                                        ↓
                                  Machine Code
```

### Hidden Classes

V8 optimizes object property access using hidden classes.

```javascript
// Objects with same structure share hidden class
function Point(x, y) {
  this.x = x;
  this.y = y;
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);
// p1 and p2 share same hidden class ✓

// Adding properties in different order creates different hidden classes
const p3 = {};
p3.x = 1;
p3.y = 2; // Hidden class: {x, y}

const p4 = {};
p4.y = 2;
p4.x = 1; // Different hidden class: {y, x} ✗
```

**Best Practice**: Initialize objects in same order.

```javascript
// ✅ Good - same structure
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// ❌ Bad - different structures
const p1 = { x: 1, y: 2 };
const p2 = { y: 2, x: 1 }; // Different hidden class!
```

### Inline Caching

V8 caches property locations for faster access.

```javascript
function getX(point) {
  return point.x;
}

// First call: lookup property 'x'
getX({ x: 1, y: 2 });

// Subsequent calls: use cached location (fast!)
getX({ x: 3, y: 4 });
getX({ x: 5, y: 6 });
```

**Monomorphic** (fastest): Function always receives same shape.
**Polymorphic**: Function receives 2-4 different shapes.
**Megamorphic** (slowest): Function receives many different shapes.

```javascript
// ✅ Monomorphic (fast)
class Point { constructor(x, y) { this.x = x; this.y = y; } }
function getX(p) { return p.x; }

const points = [new Point(1, 2), new Point(3, 4)];
points.forEach(p => getX(p)); // All same shape

// ❌ Megamorphic (slow)
function getValue(obj) { return obj.value; }

getValue({ value: 1 });
getValue({ value: 2, extra: true });
getValue({ other: 'data', value: 3 });
// Many different shapes!
```

## Optimization Techniques

### 1. Avoid Deoptimization

V8 optimizes code based on assumptions. Breaking them causes deoptimization.

```javascript
function add(a, b) {
  return a + b;
}

// V8 assumes 'add' always receives numbers
add(1, 2);    // Optimized for numbers
add(3, 4);
add(5, 6);

add("x", "y"); // Deoptimization! Now handles strings too
```

**Best Practice**: Use consistent types.

```javascript
// ✅ Good
function addNumbers(a, b) {
  return a + b;
}

function addStrings(a, b) {
  return a + b;
}

// ❌ Bad
function add(a, b) {
  return a + b; // Sometimes numbers, sometimes strings
}
```

### 2. Avoid Large Objects

```javascript
// ❌ Bad - large object
const user = {
  name: 'John',
  age: 30,
  email: 'john@example.com',
  address: { /* ... */ },
  preferences: { /* ... */ },
  // ... 50 more properties
};

// ✅ Good - smaller objects
const user = { name: 'John', age: 30 };
const userContact = { email: 'john@example.com' };
const userAddress = { /* ... */ };
```

### 3. Avoid Changing Object Shape

```javascript
// ❌ Bad
const obj = { a: 1 };
obj.b = 2;        // Shape changed
delete obj.a;     // Shape changed again

// ✅ Good
const obj = { a: 1, b: 2 };
```

### 4. Use Arrays for Collections

```javascript
// ❌ Bad - object as array
const obj = {};
obj[0] = 'a';
obj[1] = 'b';
obj[2] = 'c';

// ✅ Good - actual array
const arr = ['a', 'b', 'c'];
```

### 5. Avoid Sparse Arrays

```javascript
// ❌ Bad - sparse array (holes)
const arr = [];
arr[0] = 1;
arr[1000] = 2; // Creates 999 holes

// ✅ Good - dense array
const arr = [1, 2, 3, 4, 5];
```

## Memory Management

### Garbage Collection

V8 uses **generational garbage collection**.

**Young Generation** (short-lived objects):
- Scavenge algorithm
- Fast, frequent collections

**Old Generation** (long-lived objects):
- Mark-Sweep-Compact
- Slower, less frequent

```javascript
// Young generation
function createTemp() {
  const temp = { x: 1, y: 2 }; // Dies after function returns
  return temp.x + temp.y;
}

// Old generation
const global = { data: [] }; // Lives long, moves to old generation
```

### Memory Leaks

```javascript
// ❌ Memory leak - global variables
function leak() {
  leakedVar = 'oops'; // No var/let/const = global!
}

// ❌ Memory leak - forgotten timers
const interval = setInterval(() => {
  console.log('Running...');
}, 1000);
// Never cleared!

// ✅ Fixed
const interval = setInterval(() => {
  console.log('Running...');
}, 1000);
clearInterval(interval); // Clear when done

// ❌ Memory leak - event listeners
element.addEventListener('click', handler);
// Never removed!

// ✅ Fixed
element.addEventListener('click', handler);
element.removeEventListener('click', handler); // Remove when done
```

## Performance Best Practices

### 1. Write Predictable Code

```javascript
// ✅ Good - predictable
function calculate(x) {
  return x * 2;
}

// ❌ Bad - unpredictable
function calculate(x) {
  if (typeof x === 'string') return parseInt(x) * 2;
  if (Array.isArray(x)) return x.length * 2;
  return x * 2;
}
```

### 2. Use Modern Syntax

```javascript
// ✅ Good - optimized
const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2);

// ❌ Bad - harder to optimize
const arr = [1, 2, 3];
const doubled = [];
for (let i = 0; i < arr.length; i++) {
  doubled.push(arr[i] * 2);
}
```

### 3. Avoid try/catch in Hot Paths

```javascript
// ❌ Bad - try/catch prevents optimization
function hot(x) {
  try {
    return x * 2;
  } catch (e) {
    return 0;
  }
}

// ✅ Good - move try/catch out
function hot(x) {
  return x * 2;
}

function safe(x) {
  try {
    return hot(x);
  } catch (e) {
    return 0;
  }
}
```

### 4. Initialize All Properties

```javascript
// ✅ Good - all properties defined
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// ❌ Bad - properties added later
class Point {
  constructor(x, y) {
    this.x = x;
    // y added later
  }
}
```

## Common Interview Questions

### Q1: What is JIT compilation?

**Answer:**

JIT (Just-In-Time) compilation compiles code during execution, not before.

**Advantages:**
- Faster startup (no pre-compilation)
- Runtime optimizations based on actual usage
- Adaptive optimization

**Process:**
1. Interpreter executes code quickly
2. Profiler identifies hot code (frequently run)
3. Compiler optimizes hot code to machine code
4. Execute optimized code (much faster)

### Q2: What are hidden classes in V8?

**Answer:**

Hidden classes optimize object property access by tracking object structure.

Objects with same properties in same order share hidden class, enabling:
- Fast property access (direct memory offset)
- Inline caching
- Optimized code generation

**Best Practice:** Create objects with same structure.

```javascript
// Same hidden class
const p1 = { x: 1, y: 2 };
const p2 = { x: 3, y: 4 };

// Different hidden classes
const p3 = { x: 1, y: 2 };
const p4 = { y: 2, x: 1 }; // Different order!
```

### Q3: How does garbage collection work in V8?

**Answer:**

V8 uses **generational garbage collection**:

1. **Young Generation** (Scavenge):
   - New objects allocated here
   - Fast, frequent collections
   - Survivors promoted to old generation

2. **Old Generation** (Mark-Sweep-Compact):
   - Long-lived objects
   - Mark reachable objects
   - Sweep unreachable objects
   - Compact fragmented memory

### Q4: What causes deoptimization?

**Answer:**

Deoptimization occurs when V8's assumptions break:

**Causes:**
- Type changes (`number` → `string`)
- Shape changes (adding/deleting properties)
- Array becoming sparse
- Using `arguments` object
- Deep recursion

**Prevention:**
- Use consistent types
- Don't modify object shapes
- Use dense arrays
- Avoid `try/catch` in hot paths

## Key Takeaways

- **JavaScript engines** - V8, SpiderMonkey, JavaScriptCore
- **JIT compilation** - Interpreter + optimizing compiler
- **Hidden classes** - Optimize property access
- **Inline caching** - Cache property locations
- **Garbage collection** - Generational (young/old)
- **Optimization** - Write predictable, consistent code
- **Avoid deoptimization** - Consistent types and shapes

## Resources

- [How JavaScript Engines Work](https://mathiasbynens.be/notes/shapes-ics)
- [V8 Engine Documentation](https://v8.dev/docs)
- [JavaScript Engines: How Do They Work?](https://www.freecodecamp.org/news/javascript-engine-and-runtime-explained/)
