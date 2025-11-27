---
sidebar_position: 15
---

# Advanced Functions

## IIFE (Immediately Invoked Function Expression)

**IIFE** is a function that runs as soon as it's defined.

```javascript
// Basic IIFE
(function() {
  console.log('IIFE executed!');
})();

// With parameters
(function(name) {
  console.log(`Hello, ${name}!`);
})('John');

// Arrow IIFE
(() => {
  console.log('Arrow IIFE!');
})();

// With return value
const result = (function() {
  return 42;
})();
console.log(result); // 42
```

**Use cases:**
- Avoid global scope pollution
- Create private variables
- Module pattern

```javascript
// Module pattern with IIFE
const counter = (function() {
  let count = 0; // Private variable
  
  return {
    increment() {
      return ++count;
    },
    decrement() {
      return --count;
    },
    getCount() {
      return count;
    }
  };
})();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
// counter.count; // undefined (private)
```

## Higher-Order Functions

Functions that take functions as arguments or return functions.

```javascript
// Takes function as argument
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log); // 0, 1, 2

// Returns function
function greaterThan(n) {
  return (m) => m > n;
}

const greaterThan10 = greaterThan(10);
console.log(greaterThan10(11)); // true
console.log(greaterThan10(9));  // false
```

## Currying

Converting a function with multiple arguments into a sequence of functions with single arguments.

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3); // 6

// Curried version
function addCurried(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
addCurried(1)(2)(3); // 6

// Arrow function version
const addCurried = a => b => c => a + b + c;
addCurried(1)(2)(3); // 6
```

**Practical example:**

```javascript
// Curried multiply
const multiply = a => b => a * b;

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**Generic curry function:**

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
console.log(curriedSum(1)(2, 3)); // 6
```

## Partial Application

Pre-filling some arguments of a function.

```javascript
function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

// Partial application using bind
const sayHello = greet.bind(null, 'Hello');

console.log(sayHello('John')); // "Hello, John!"
console.log(sayHello('Jane')); // "Hello, Jane!"

// Manual partial application
function partial(fn, ...presetArgs) {
  return (...laterArgs) => fn(...presetArgs, ...laterArgs);
}

const sayGoodbye = partial(greet, 'Goodbye');
console.log(sayGoodbye('John')); // "Goodbye, John!"
```

## Function Composition

Combining multiple functions to create a new function.

```javascript
// Compose (right to left)
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

const add1 = x => x + 1;
const multiply2 = x => x * 2;
const subtract3 = x => x - 3;

const combined = compose(subtract3, multiply2, add1);

console.log(combined(5)); // (5 + 1) * 2 - 3 = 9

// Pipe (left to right)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const combined2 = pipe(add1, multiply2, subtract3);
console.log(combined2(5)); // ((5 + 1) * 2) - 3 = 9
```

## Debouncing

Delays function execution until after a pause in events.

```javascript
function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Usage
const handleSearch = debounce((query) => {
  console.log(`Searching for: ${query}`);
}, 500);

handleSearch('a');
handleSearch('ab');
handleSearch('abc'); // Only this executes after 500ms
```

**Real-world example:**

```javascript
// Search input
const searchInput = document.querySelector('#search');

const search = (query) => {
  fetch(`/api/search?q=${query}`)
    .then(res => res.json())
    .then(data => console.log(data));
};

const debouncedSearch = debounce(search, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

## Throttling

Limits function execution to once per time period.

```javascript
function throttle(fn, limit) {
  let inThrottle;
  
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const handleScroll = throttle(() => {
  console.log('Scroll event');
}, 1000);

window.addEventListener('scroll', handleScroll);
// Executes max once per second, no matter how much you scroll
```

**Debounce vs Throttle:**

```
Debounce: __________X (waits for pause)
Events:   |||||||||||  (rapid events)

Throttle: X____X____X (executes at intervals)
Events:   |||||||||||  (rapid events)
```

## Memoization

Caching function results based on inputs.

```javascript
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('From cache');
      return cache.get(key);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoize(fibonacci);

console.log(memoizedFib(40)); // Slow first time
console.log(memoizedFib(40)); // "From cache" - instant!
```

## Once Function

Function that can only be called once.

```javascript
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

const initialize = once(() => {
  console.log('Initializing...');
  return { initialized: true };
});

initialize(); // "Initializing..."
initialize(); // Does nothing
initialize(); // Does nothing
```

## Common Interview Questions

### Q1: What is the difference between debounce and throttle?

**Answer:**

**Debounce:** Waits for pause in events
- Use for: Search input, window resize, form validation

**Throttle:** Executes at most once per time period
- Use for: Scroll events, mouse move, API rate limiting

```javascript
// Debounce - wait 500ms after last event
const debounced = debounce(fn, 500);
input.addEventListener('input', debounced);

// Throttle - execute max once per second
const throttled = throttle(fn, 1000);
window.addEventListener('scroll', throttled);
```

### Q2: Implement a curry function

**Answer:**

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

// Usage
function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3)); // 6
console.log(curriedSum(1, 2)(3)); // 6
```

### Q3: What is memoization and when to use it?

**Answer:**

**Memoization** caches function results to avoid recalculation.

**Use when:**
- Expensive calculations
- Pure functions (same input → same output)
- Frequently called with same arguments

```javascript
const memoizedFib = memoize(fibonacci);

// First call: calculates
memoizedFib(40); // Slow

// Second call: returns cached
memoizedFib(40); // Instant!
```

## Key Takeaways

- **IIFE** - Execute function immediately, create private scope
- **Higher-order functions** - Take or return functions
- **Currying** - Transform multi-arg function to single-arg chain
- **Partial application** - Pre-fill some arguments
- **Composition** - Combine functions
- **Debounce** - Wait for pause before executing
- **Throttle** - Limit execution frequency
- **Memoization** - Cache results for performance

## Resources

- [MDN Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [JavaScript.info Advanced Functions](https://javascript.info/advanced-functions)
- [Lodash Debounce/Throttle](https://lodash.com/docs/)
