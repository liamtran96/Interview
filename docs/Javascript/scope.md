---
sidebar_position: 19
---

# Scope in JavaScript

## What is Scope?

**Scope** determines where variables are accessible in your code. It's the current context of execution.

## Types of Scope

### 1. Global Scope

Variables declared outside any function or block are **global**.

```javascript
const globalVar = "I'm global";

function example() {
  console.log(globalVar); // ✓ Accessible
}

example();
console.log(globalVar); // ✓ Accessible everywhere
```

**In browsers:**
```javascript
var x = 10;
console.log(window.x); // 10 (var creates window property)

let y = 20;
console.log(window.y); // undefined (let/const don't)
```

### 2. Function Scope

Variables declared with `var` inside a function are **function-scoped**.

```javascript
function example() {
  var functionScoped = "Only inside function";
  
  if (true) {
    var alsoFunctionScoped = "Also in function scope";
  }
  
  console.log(functionScoped);      // ✓ Works
  console.log(alsoFunctionScoped);  // ✓ Works (not block-scoped!)
}

// console.log(functionScoped); // ✗ Error: not defined
```

### 3. Block Scope

Variables declared with `let` and `const` are **block-scoped** (within `{}`).

```javascript
{
  let blockScoped = "Only in this block";
  const alsoBlockScoped = "Also block-scoped";
  var notBlockScoped = "Function-scoped";
}

// console.log(blockScoped);     // ✗ Error
// console.log(alsoBlockScoped); // ✗ Error
console.log(notBlockScoped);     // ✓ Works (var ignores blocks)
```

**Block scope examples:**

```javascript
// if blocks
if (true) {
  let x = 10;
  var y = 20;
}
// console.log(x); // ✗ Error
console.log(y);    // ✓ 20

// for loops
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
// console.log(i); // ✗ Error (block-scoped)

for (var j = 0; j < 3; j++) {
  console.log(j); // 0, 1, 2
}
console.log(j); // ✓ 3 (function-scoped!)
```

### 4. Lexical Scope (Static Scope)

Functions are executed using the scope where they were **defined**, not where they're **called**.

```javascript
const name = "Global";

function outer() {
  const name = "Outer";
  
  function inner() {
    console.log(name); // Uses 'name' from where inner was defined
  }
  
  return inner;
}

const innerFunc = outer();
innerFunc(); // "Outer" (lexical scope)
```

**Lexical scope hierarchy:**

```javascript
const global = "global";

function level1() {
  const var1 = "level1";
  
  function level2() {
    const var2 = "level2";
    
    function level3() {
      const var3 = "level3";
      
      // Can access all outer scopes
      console.log(global); // ✓
      console.log(var1);   // ✓
      console.log(var2);   // ✓
      console.log(var3);   // ✓
    }
    
    level3();
    // console.log(var3); // ✗ Cannot access inner scope
  }
  
  level2();
}

level1();
```

## Scope Chain

When JavaScript looks for a variable, it searches up the scope chain.

```javascript
const a = "global a";

function outer() {
  const b = "outer b";
  
  function inner() {
    const c = "inner c";
    
    console.log(a); // Found in global scope
    console.log(b); // Found in outer scope
    console.log(c); // Found in inner scope
  }
  
  inner();
}

outer();
```

**Lookup process:**
1. Check local scope (current function)
2. Check outer function scope
3. Check outer's outer scope
4. ...continue up the chain
5. Check global scope
6. If not found → `ReferenceError`

## Variable Shadowing

Inner scope variable "shadows" (hides) outer scope variable with same name.

```javascript
const name = "Global";

function outer() {
  const name = "Outer";
  
  function inner() {
    const name = "Inner";
    console.log(name); // "Inner" (shadows outer variables)
  }
  
  inner();
  console.log(name); // "Outer"
}

outer();
console.log(name); // "Global"
```

## var vs let vs const Scope

| Feature | var | let | const |
|---------|-----|-----|-------|
| **Scope** | Function | Block | Block |
| **Hoisting** | Yes (initialized as undefined) | Yes (not initialized - TDZ) | Yes (not initialized - TDZ) |
| **Re-declaration** | Yes | No | No |
| **Reassignment** | Yes | Yes | No |
| **Global window property** | Yes (in browser) | No | No |

```javascript
function example() {
  // var - function scoped
  if (true) {
    var x = 1;
  }
  console.log(x); // ✓ 1
  
  // let - block scoped
  if (true) {
    let y = 2;
  }
  // console.log(y); // ✗ Error
  
  // const - block scoped, can't reassign
  if (true) {
    const z = 3;
    // z = 4; // ✗ Error
  }
  // console.log(z); // ✗ Error
}
```

## Temporal Dead Zone (TDZ)

The time between entering scope and variable declaration where `let`/`const` variables can't be accessed.

```javascript
{
  // TDZ starts
  // console.log(x); // ✗ ReferenceError: Cannot access 'x' before initialization
  
  let x = 10; // TDZ ends
  console.log(x); // ✓ 10
}
```

**var vs let/const:**

```javascript
console.log(varVariable); // undefined (hoisted)
var varVariable = 10;

console.log(letVariable); // ✗ ReferenceError (TDZ)
let letVariable = 20;
```

## Closures and Scope

Closures "remember" their lexical scope even after outer function returns.

```javascript
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
// counter.count; // undefined (private)
```

## Common Interview Questions

### Q1: What's the difference between function scope and block scope?

**Answer:**

**Function scope (var):**
- Variables accessible anywhere in function
- Ignores block boundaries

**Block scope (let/const):**
- Variables only accessible in block `{}`
- Respects block boundaries

```javascript
function example() {
  if (true) {
    var functionScoped = "var";
    let blockScoped = "let";
  }
  
  console.log(functionScoped); // ✓ Works
  // console.log(blockScoped);  // ✗ Error
}
```

### Q2: Explain lexical scope

**Answer:**

**Lexical scope**: Functions use variables from where they're **defined**, not where they're **called**.

```javascript
const x = "global";

function outer() {
  const x = "outer";
  
  return function inner() {
    console.log(x); // Uses x from outer (where defined)
  };
}

const fn = outer();
fn(); // "outer" (not "global")
```

### Q3: What is the Temporal Dead Zone?

**Answer:**

**TDZ**: Period between entering scope and variable declaration where `let`/`const` can't be accessed.

```javascript
{
  // TDZ starts for x
  // console.log(x); // ✗ ReferenceError
  
  let x = 10; // TDZ ends
  console.log(x); // ✓ Works
}
```

`var` has no TDZ:
```javascript
console.log(y); // undefined (hoisted)
var y = 20;
```

### Q4: What is variable shadowing?

**Answer:**

Inner variable "shadows" outer variable with same name.

```javascript
let x = "outer";

function example() {
  let x = "inner"; // Shadows outer x
  console.log(x); // "inner"
}

example();
console.log(x); // "outer"
```

## Common Pitfalls

### 1. var in loops

```javascript
// ❌ Problem with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3 (all see same i)

// ✅ Solution with let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2 (each iteration has own i)
```

### 2. Accidental Global Variables

```javascript
function example() {
  x = 10; // ⚠️ Creates global variable!
}

example();
console.log(x); // 10

// Solution: use strict mode
'use strict';
function example() {
  x = 10; // ✗ ReferenceError
}
```

### 3. Nested Scope Confusion

```javascript
let value = "outer";

function test() {
  console.log(value); // undefined (not "outer"!)
  let value = "inner";
}

test();
// Why? Hoisting creates TDZ for inner 'value'
```

## Best Practices

1. **Use `const` by default** - Prevents accidental reassignment
2. **Use `let`** - When you need to reassign
3. **Avoid `var`** - Use let/const for block scoping
4. **Use strict mode** - Prevents accidental globals
5. **Minimize global variables** - Use modules, IIFE
6. **Understand lexical scope** - Know where variables come from
7. **Be aware of closures** - Functions remember their scope

## Key Takeaways

- **Scope** determines variable accessibility
- **Function scope** - `var` accessible in entire function
- **Block scope** - `let`/`const` accessible only in block
- **Lexical scope** - Functions use scope where defined
- **Scope chain** - JavaScript looks up the chain for variables
- **TDZ** - `let`/`const` can't be accessed before declaration
- **Shadowing** - Inner variables hide outer variables with same name
- **Closures** remember their lexical scope

## Resources

- [MDN Scope](https://developer.mozilla.org/en-US/docs/Glossary/Scope)
- [JavaScript.info Variable Scope](https://javascript.info/closure)
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures)
