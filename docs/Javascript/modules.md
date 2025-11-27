---
sidebar_position: 11
---

# ES6 Modules (Import/Export)

## What are ES6 Modules?

**ES6 Modules** (ECMAScript Modules) are the official standard for organizing JavaScript code into reusable pieces. Each module is a separate file with its own scope.

:::info Module Benefits
- **Encapsulation** - Each module has its own scope
- **Reusability** - Import modules anywhere
- **Maintainability** - Organize code into logical files
- **Dead code elimination** - Bundlers can remove unused exports
:::

## Export

### Named Exports

```javascript
// math.js

// Export individual declarations
export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export class Calculator {
  multiply(a, b) {
    return a * b;
  }
}
```

**Or export all at once:**

```javascript
// math.js

const PI = 3.14159;

function add(a, b) {
  return a + b;
}

class Calculator {
  multiply(a, b) {
    return a * b;
  }
}

// Export at bottom
export { PI, add, Calculator };
```

**Rename while exporting:**

```javascript
const PI = 3.14159;
const add = (a, b) => a + b;

export { PI as pi, add as sum };
```

### Default Export

Each module can have **one** default export:

```javascript
// calculator.js

export default class Calculator {
  add(a, b) {
    return a + b;
  }
}
```

**Or:**

```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }
}

export default Calculator;
```

**Default export patterns:**

```javascript
// Function
export default function greet(name) {
  return `Hello, ${name}`;
}

// Arrow function
export default (name) => `Hello, ${name}`;

// Object
export default {
  name: 'App',
  version: '1.0.0'
};

// Value
export default 42;
```

### Mixing Named and Default Exports

```javascript
// user.js

export default class User {
  constructor(name) {
    this.name = name;
  }
}

export const ADMIN_ROLE = 'admin';
export const USER_ROLE = 'user';

export function validateUser(user) {
  return user.name.length > 0;
}
```

## Import

### Named Imports

```javascript
// app.js

import { PI, add, Calculator } from './math.js';

console.log(PI);           // 3.14159
console.log(add(2, 3));    // 5
const calc = new Calculator();
```

**Import with rename:**

```javascript
import { add as sum, PI as pi } from './math.js';

console.log(sum(2, 3));  // 5
console.log(pi);         // 3.14159
```

**Import everything:**

```javascript
import * as math from './math.js';

console.log(math.PI);
console.log(math.add(2, 3));
const calc = new math.Calculator();
```

### Default Import

```javascript
// Import default export (any name works)
import Calculator from './calculator.js';

const calc = new Calculator();
```

**Default import can use any name:**

```javascript
import Calc from './calculator.js';
import MyCalculator from './calculator.js';
import Whatever from './calculator.js';
// All reference the same default export
```

### Mixing Named and Default Imports

```javascript
import User, { ADMIN_ROLE, USER_ROLE, validateUser } from './user.js';

const admin = new User('Admin');
console.log(ADMIN_ROLE);
```

### Dynamic Imports

```javascript
// Load module conditionally or on-demand
async function loadModule() {
  const module = await import('./module.js');
  module.doSomething();
}

// With destructuring
async function loadMath() {
  const { add, multiply } = await import('./math.js');
  console.log(add(2, 3));
}

// Conditional loading
if (condition) {
  const module = await import('./heavy-module.js');
  module.run();
}
```

## Module Scope

Each module has its own scope - variables are not global:

```javascript
// module1.js
const secret = 'Private to module1';
export const public = 'Exported from module1';

// module2.js
import { public } from './module1.js';
console.log(public);  // ✓ Works
console.log(secret);  // ✗ Error: secret is not defined
```

## Re-exporting

```javascript
// utils/index.js - Barrel export

// Re-export from other modules
export { add, subtract } from './math.js';
export { formatDate } from './date.js';
export { default as User } from './user.js';

// Re-export all (except default)
export * from './helpers.js';

// Re-export all with namespace
export * as math from './math.js';
```

**Now import from one place:**

```javascript
import { add, subtract, formatDate, User } from './utils/index.js';
```

## Common Patterns

### Singleton Pattern

```javascript
// database.js

class Database {
  constructor() {
    this.connection = null;
  }

  connect() {
    // Connection logic
  }
}

// Export single instance
export default new Database();
```

```javascript
// app.js
import db from './database.js';

db.connect();
// Same instance everywhere it's imported
```

### Config Module

```javascript
// config.js

export const config = {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  timeout: 5000,
  debug: true
};

export const API_VERSION = 'v1';
```

### Utility Functions

```javascript
// utils.js

export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
```

## Common Interview Questions

### Q1: What is the difference between named and default exports?

**Answer:**

| Feature | Named Export | Default Export |
|---------|-------------|----------------|
| **Per module** | Multiple | One |
| **Import name** | Must match export name | Any name |
| **Import syntax** | `{ name }` | `name` |
| **Recommended for** | Multiple utilities | Main export |

```javascript
// Named exports
export const a = 1;
export const b = 2;
import { a, b } from './module.js';  // Names must match

// Default export
export default class User {}
import User from './module.js';      // Any name works
import MyUser from './module.js';    // Also works
```

### Q2: Can you have both named and default exports?

**Answer:** Yes!

```javascript
// user.js

// Default export
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// Named exports
export const ADMIN = 'admin';
export const USER = 'user';
```

```javascript
// Import both
import User, { ADMIN, USER } from './user.js';
```

### Q3: What is the difference between `export default` and `export`?

**Answer:**

```javascript
// Default export
export default function greet() {}
import greet from './module.js';      // No braces
import anyName from './module.js';    // Can use any name

// Named export
export function greet() {}
import { greet } from './module.js';  // Must use braces
import { greet as g } from './module.js'; // Rename with 'as'
```

**Only ONE default export per module, but MANY named exports.**

### Q4: What is tree shaking?

**Answer:**

**Tree shaking** is the process of removing unused code from the final bundle.

```javascript
// utils.js

export function used() {
  return 'I am used';
}

export function notUsed() {
  return 'I am not used';
}
```

```javascript
// app.js
import { used } from './utils.js';

used(); // Only this is imported
```

**Result:** Bundlers (Webpack, Rollup) remove `notUsed()` from final bundle.

**Why it works:**
- ES6 modules are static (can analyze at build time)
- Bundlers can determine what's used/unused
- Dead code is eliminated

**Not possible with CommonJS** (require/module.exports) because it's dynamic.

### Q5: What are barrel exports?

**Answer:**

**Barrel exports** consolidate multiple module exports into a single module.

```javascript
// components/Button.js
export default function Button() {}

// components/Input.js
export default function Input() {}

// components/Modal.js
export default function Modal() {}

// components/index.js (Barrel)
export { default as Button } from './Button.js';
export { default as Input } from './Input.js';
export { default as Modal } from './Modal.js';
```

**Usage:**

```javascript
// Instead of:
import Button from './components/Button.js';
import Input from './components/Input.js';
import Modal from './components/Modal.js';

// Use:
import { Button, Input, Modal } from './components/index.js';
```

### Q6: What is the difference between `import * as` and importing everything?

**Answer:**

```javascript
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calculator {}

// Namespace import
import * as math from './math.js';
console.log(math.PI);           // 3.14
console.log(math.add(1, 2));    // 3
console.log(math.default);      // Calculator class

// Import everything separately
import Calculator, { PI, add } from './math.js';
console.log(PI);                // 3.14
console.log(add(1, 2));         // 3
console.log(Calculator);        // Calculator class
```

## ES Modules vs CommonJS

### ES Modules (ES6)

```javascript
// Export
export const value = 42;
export default function() {}

// Import
import fn, { value } from './module.js';
```

**Features:**
- Static (analyzed at compile time)
- Asynchronous loading
- Tree shaking possible
- Native browser support
- File extension required (`.js`)

### CommonJS (Node.js)

```javascript
// Export
exports.value = 42;
module.exports = function() {}

// Import
const fn = require('./module');
```

**Features:**
- Dynamic (runtime)
- Synchronous loading
- No tree shaking
- Node.js default (changing)
- No file extension needed

### Interoperability

```javascript
// Use ES modules in Node.js

// package.json
{
  "type": "module"
}

// Or use .mjs extension
// file.mjs
```

## Dynamic Imports (Code Splitting)

```javascript
// Lazy load heavy module
button.addEventListener('click', async () => {
  const module = await import('./heavy-module.js');
  module.run();
});

// Conditional loading
async function loadTranslations(lang) {
  const translations = await import(`./lang/${lang}.js`);
  return translations.default;
}

// With error handling
async function loadModule() {
  try {
    const module = await import('./module.js');
    module.init();
  } catch (error) {
    console.error('Failed to load module:', error);
  }
}
```

**Benefits:**
- Reduce initial bundle size
- Load code on demand
- Improve performance

## Module Loading in HTML

```html
<!-- ES6 Module -->
<script type="module" src="app.js"></script>

<!-- Module features: -->
<!-- - Deferred by default -->
<!-- - Strict mode automatically -->
<!-- - Module scope (not global) -->
<!-- - Can use import/export -->

<!-- Fallback for older browsers -->
<script nomodule src="fallback.js"></script>
```

## Best Practices

1. **One module per file** - Keep files focused
2. **Use named exports** - For better tree shaking
3. **Default export for main** - Component/class that represents the module
4. **Barrel exports** - For organizing related exports
5. **Avoid circular dependencies** - Design modules to avoid cycles
6. **Use dynamic imports** - For code splitting
7. **Keep module scope clean** - Don't pollute global scope
8. **Consistent naming** - Match import name to file name

## Common Pitfalls

### 1. Missing File Extension

```javascript
// ❌ WRONG (in browser)
import { add } from './math';

// ✅ CORRECT
import { add } from './math.js';
```

### 2. Circular Dependencies

```javascript
// a.js
import { b } from './b.js';
export const a = 'a';

// b.js
import { a } from './a.js';  // ⚠️ Circular!
export const b = 'b';

// Solution: Refactor to remove cycle
```

### 3. Incorrect Named Import

```javascript
// module.js
export default function greet() {}

// ❌ WRONG
import { greet } from './module.js';  // greet is undefined

// ✅ CORRECT
import greet from './module.js';
```

## Key Takeaways

- ES6 modules use `import` and `export`
- Named exports: multiple per module, names must match
- Default export: one per module, any import name
- Modules have their own scope (not global)
- Static imports for tree shaking
- Dynamic imports for code splitting
- `import *` creates namespace
- Barrel exports consolidate multiple modules

## Resources

- [MDN ES6 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [JavaScript.info Modules](https://javascript.info/modules)
- [ES Modules in Node.js](https://nodejs.org/api/esm.html)
- [Exploring JS: Modules](https://exploringjs.com/es6/ch_modules.html)
