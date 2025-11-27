---
sidebar_position: 17
---

# Functional Programming in JavaScript

## What is Functional Programming?

**Functional Programming (FP)** is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data.

## Core Principles

### 1. Pure Functions

A **pure function** always returns the same output for the same input and has no side effects.

```javascript
// ✅ Pure function
function add(a, b) {
  return a + b;
}

add(2, 3); // Always returns 5

// ❌ Impure function (side effects)
let total = 0;
function addToTotal(value) {
  total += value; // Modifies external state
  return total;
}

// ❌ Impure function (non-deterministic)
function random() {
  return Math.random(); // Different output each time
}
```

### 2. Immutability

Never modify data; create new copies instead.

```javascript
// ❌ Mutating
const numbers = [1, 2, 3];
numbers.push(4); // Modifies original

// ✅ Immutable
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4]; // Creates new array
```

### 3. First-Class Functions

Functions are treated as values - can be assigned, passed, and returned.

```javascript
// Assign to variable
const greet = function(name) {
  return `Hello, ${name}`;
};

// Pass as argument
function execute(fn, value) {
  return fn(value);
}
execute(greet, 'John'); // "Hello, John"

// Return from function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = createMultiplier(2);
double(5); // 10
```

### 4. Higher-Order Functions

Functions that take functions as arguments or return functions.

```javascript
// map, filter, reduce are higher-order functions
[1, 2, 3].map(x => x * 2);       // [2, 4, 6]
[1, 2, 3].filter(x => x > 1);    // [2, 3]
[1, 2, 3].reduce((a, b) => a + b, 0); // 6
```

## Common FP Techniques

### Map

Transform each element in an array.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Double each number
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Extract property
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
const names = users.map(u => u.name);
console.log(names); // ['John', 'Jane']
```

### Filter

Keep only elements that pass a test.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Keep only even numbers
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// Filter objects
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 17 }
];
const adults = users.filter(u => u.age >= 18);
console.log(adults); // [{ name: 'John', age: 30 }]
```

### Reduce

Accumulate values into a single result.

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Product
const product = numbers.reduce((acc, n) => acc * n, 1);
console.log(product); // 120

// Group by property
const users = [
  { name: 'John', role: 'admin' },
  { name: 'Jane', role: 'user' },
  { name: 'Bob', role: 'admin' }
];

const byRole = users.reduce((acc, user) => {
  if (!acc[user.role]) acc[user.role] = [];
  acc[user.role].push(user);
  return acc;
}, {});
// { admin: [John, Bob], user: [Jane] }
```

### Chaining

Combine multiple operations.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers
  .filter(n => n % 2 === 0)   // [2, 4, 6]
  .map(n => n * 2)             // [4, 8, 12]
  .reduce((sum, n) => sum + n, 0); // 24

console.log(result); // 24
```

## Function Composition

Combining functions to create new functions.

```javascript
// Simple composition
const compose = (f, g) => x => f(g(x));

const add1 = x => x + 1;
const multiply2 = x => x * 2;

const add1ThenMultiply2 = compose(multiply2, add1);
console.log(add1ThenMultiply2(5)); // (5 + 1) * 2 = 12

// Multiple function composition
const composeMany = (...fns) => x => 
  fns.reduceRight((v, f) => f(v), x);

const subtract3 = x => x - 3;
const combined = composeMany(subtract3, multiply2, add1);
console.log(combined(5)); // ((5 + 1) * 2) - 3 = 9
```

## Point-Free Style

Writing functions without mentioning arguments.

```javascript
// NOT point-free
const double = numbers => numbers.map(n => n * 2);

// Point-free
const double = numbers => numbers.map(multiply(2));

// Helper
const multiply = factor => value => value * factor;

// Usage
double([1, 2, 3]); // [2, 4, 6]
```

## Avoiding Side Effects

```javascript
// ❌ Side effect - modifies external variable
let count = 0;
function increment() {
  count++;
}

// ✅ No side effects - pure function
function increment(count) {
  return count + 1;
}

// ❌ Side effect - modifies input
function addItem(array, item) {
  array.push(item);
  return array;
}

// ✅ No side effects - returns new array
function addItem(array, item) {
  return [...array, item];
}
```

## Recursion

Function calling itself (FP alternative to loops).

```javascript
// Factorial
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
factorial(5); // 120

// Sum array
function sum(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sum(arr.slice(1));
}
sum([1, 2, 3, 4, 5]); // 15

// Flatten array
function flatten(arr) {
  return arr.reduce((acc, item) =>
    Array.isArray(item) 
      ? [...acc, ...flatten(item)]
      : [...acc, item],
    []
  );
}
flatten([1, [2, [3, 4], 5]]); // [1, 2, 3, 4, 5]
```

## Common FP Patterns

### Partial Application

```javascript
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = greet.bind(null, 'Hello');
sayHello('John'); // "Hello, John!"
```

### Currying

```javascript
const curry = fn => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
};

const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6
```

### Memoization

```javascript
const memoize = fn => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const fib = memoize(n => {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
});

fib(40); // Fast!
```

## Common Interview Questions

### Q1: What is a pure function?

**Answer:**

A **pure function**:
1. Same input → Same output (deterministic)
2. No side effects (doesn't modify external state)

```javascript
// ✅ Pure
function add(a, b) {
  return a + b;
}

// ❌ Not pure (side effect)
let total = 0;
function addToTotal(n) {
  total += n;
  return total;
}

// ❌ Not pure (non-deterministic)
function getRandom() {
  return Math.random();
}
```

### Q2: Implement map, filter, and reduce

**Answer:**

```javascript
// map
Array.prototype.myMap = function(fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(fn(this[i], i, this));
  }
  return result;
};

// filter
Array.prototype.myFilter = function(fn) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// reduce
Array.prototype.myReduce = function(fn, initial) {
  let acc = initial;
  for (let i = 0; i < this.length; i++) {
    acc = fn(acc, this[i], i, this);
  }
  return acc;
};
```

### Q3: What is function composition?

**Answer:**

Combining multiple functions to create a new function.

```javascript
const compose = (...fns) => x => 
  fns.reduceRight((v, f) => f(v), x);

const add1 = x => x + 1;
const multiply2 = x => x * 2;

const addThenMultiply = compose(multiply2, add1);
addThenMultiply(5); // (5 + 1) * 2 = 12
```

## Benefits of FP

1. **Predictable** - Pure functions always return same result
2. **Testable** - Easy to test pure functions
3. **Reusable** - Functions can be composed and reused
4. **Maintainable** - Less bugs from mutable state
5. **Parallel** - Pure functions safe for concurrency

## Key Takeaways

- **Pure functions** - No side effects, deterministic
- **Immutability** - Never modify data, create new copies
- **Higher-order functions** - map, filter, reduce
- **Function composition** - Combine functions
- **Avoid side effects** - Make code predictable
- **First-class functions** - Functions as values
- **Recursion** - Alternative to loops

## Resources

- [MDN Functional Programming](https://developer.mozilla.org/en-US/docs/Glossary/Functional_programming)
- [JavaScript.info Functional](https://javascript.info/)
- [Functional-Light JavaScript](https://github.com/getify/Functional-Light-JS)
