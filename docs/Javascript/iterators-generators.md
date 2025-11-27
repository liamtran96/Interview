---
sidebar_position: 12
---

# Iterators and Generators

## What are Iterators?

An **iterator** is an object that implements the **Iterator Protocol**: it has a `next()` method that returns `{ value, done }`.

```javascript
// Simple iterator
const iterator = {
  current: 0,
  last: 3,
  
  next() {
    if (this.current <= this.last) {
      return { value: this.current++, done: false };
    }
    return { value: undefined, done: true };
  }
};

console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

## Iterable Protocol

An **iterable** is an object that implements the **Iterable Protocol**: it has a `[Symbol.iterator]` method that returns an iterator.

```javascript
const range = {
  from: 1,
  to: 5,
  
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      
      next() {
        if (this.current <= this.last) {
          return { value: this.current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

// Now it's iterable!
for (let num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}

// Spread operator works
console.log([...range]); // [1, 2, 3, 4, 5]
```

## Generators

**Generators** are functions that can pause and resume execution. They automatically create iterators.

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

### Generator Syntax

```javascript
// Function declaration
function* gen() {
  yield 1;
}

// Function expression
const gen = function*() {
  yield 1;
};

// Method in object
const obj = {
  *gen() {
    yield 1;
  }
};

// Method in class
class MyClass {
  *gen() {
    yield 1;
  }
}
```

### yield Keyword

```javascript
function* generator() {
  console.log('Start');
  yield 1;
  console.log('After first yield');
  yield 2;
  console.log('After second yield');
  return 3;
}

const gen = generator();

console.log(gen.next()); // "Start", { value: 1, done: false }
console.log(gen.next()); // "After first yield", { value: 2, done: false }
console.log(gen.next()); // "After second yield", { value: 3, done: true }
```

### Infinite Generators

```javascript
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const seq = infiniteSequence();

console.log(seq.next().value); // 0
console.log(seq.next().value); // 1
console.log(seq.next().value); // 2
// Can continue forever...
```

### Generator with Input

```javascript
function* echo() {
  while (true) {
    const value = yield;
    console.log(value);
  }
}

const gen = echo();
gen.next();           // Start generator
gen.next('Hello');    // "Hello"
gen.next('World');    // "World"
```

## Common Patterns

### Range Generator

```javascript
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (let num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

console.log([...range(1, 3)]); // [1, 2, 3]
```

### Fibonacci Generator

```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5
```

### ID Generator

```javascript
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3
```

### Tree Traversal

```javascript
const tree = {
  value: 1,
  children: [
    {
      value: 2,
      children: [{ value: 4 }, { value: 5 }]
    },
    {
      value: 3,
      children: [{ value: 6 }]
    }
  ]
};

function* traverseTree(node) {
  yield node.value;
  if (node.children) {
    for (let child of node.children) {
      yield* traverseTree(child); // Delegate to another generator
    }
  }
}

console.log([...traverseTree(tree)]); // [1, 2, 4, 5, 3, 6]
```

## yield* Delegation

```javascript
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield* gen1(); // Delegate to gen1
  yield 3;
}

console.log([...gen2()]); // [1, 2, 3]
```

## Common Interview Questions

### Q1: What is the difference between an iterator and a generator?

**Answer:**

| Iterator | Generator |
|----------|-----------|
| Object with `next()` method | Function with `function*` syntax |
| Manually manage state | State managed automatically |
| Return `{ value, done }` | Use `yield` keyword |
| More boilerplate | Concise syntax |

```javascript
// Iterator
const iterator = {
  current: 0,
  next() {
    return { value: this.current++, done: false };
  }
};

// Generator (easier!)
function* generator() {
  let i = 0;
  while (true) yield i++;
}
```

### Q2: How do generators help with lazy evaluation?

**Answer:**

Generators compute values **on demand**, not all at once.

```javascript
// Generates values lazily - doesn't create array
function* range(n) {
  for (let i = 0; i < n; i++) {
    yield i;
  }
}

// Only generates first 5 values
const gen = range(1000000);
for (let i of gen) {
  if (i >= 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}
// Didn't create 1 million values in memory!
```

## Key Takeaways

- Iterators implement `next()` method
- Iterables implement `[Symbol.iterator]` method
- Generators create iterators automatically
- `yield` pauses generator execution
- `yield*` delegates to another generator
- Generators enable lazy evaluation
- Useful for infinite sequences, tree traversal, async flows

## Resources

- [MDN Iterators and Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
- [JavaScript.info Generators](https://javascript.info/generators)
