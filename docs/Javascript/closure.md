---
sidebar_position: 6
---

# JavaScript Closures

## What is a Closure?

A **closure** is the combination of a function bundled together with references to its surrounding state (the **lexical environment**). In other words, a closure gives a function access to its outer scope.

:::info Key Concept
A closure is created every time a function is created. When a function is defined inside another function, the inner function has access to the outer function's variables, even after the outer function has finished executing.
:::

### Simple Definition

**A closure is when a function "remembers" variables from the place where it was created, even after that place has finished executing.**

```javascript
function outer() {
  const message = "Hello";

  function inner() {
    console.log(message); // Can access 'message' from outer
  }

  return inner;
}

const myFunction = outer();
myFunction(); // "Hello" - Still has access to 'message'!
```

## Lexical Scope

**Lexical scope** means that the scope of a variable is determined by where it is written in the code (at "author time"), not where it is executed (at "runtime").

```javascript
const globalVar = "I'm global";

function outerFunction() {
  const outerVar = "I'm from outer";

  function innerFunction() {
    const innerVar = "I'm from inner";

    // Can access all variables due to lexical scoping
    console.log(globalVar);  // ✓ Has access
    console.log(outerVar);   // ✓ Has access
    console.log(innerVar);   // ✓ Has access
  }

  innerFunction();
  // console.log(innerVar); // ✗ Error: innerVar is not defined
}

outerFunction();
// console.log(outerVar); // ✗ Error: outerVar is not defined
```

### Scope Chain

JavaScript uses a **scope chain** to resolve variable names. When a variable is accessed, JavaScript searches:

1. **Local scope** (current function)
2. **Outer function scope**
3. **Outer function's outer scope**
4. ... continues up the chain
5. **Global scope**

```javascript
const global = "Global scope";

function level1() {
  const var1 = "Level 1";

  function level2() {
    const var2 = "Level 2";

    function level3() {
      const var3 = "Level 3";

      // Scope chain: level3 → level2 → level1 → global
      console.log(var3);   // Found in level3
      console.log(var2);   // Found in level2 (parent)
      console.log(var1);   // Found in level1 (grandparent)
      console.log(global); // Found in global scope
    }

    level3();
  }

  level2();
}

level1();
```

## How Closures Work

When a function is created, it maintains a reference to its lexical environment. This environment includes all variables that were in-scope when the function was defined.

```javascript
function createGreeting(greeting) {
  // greeting is stored in this function's lexical environment

  return function(name) {
    // This inner function has access to 'greeting'
    // even after createGreeting has finished executing
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeting("Hello");
const sayHi = createGreeting("Hi");

sayHello("Alice");  // "Hello, Alice!"
sayHi("Bob");       // "Hi, Bob!"

// Each closure maintains its own lexical environment
```

**What happens:**
1. `createGreeting("Hello")` executes
2. `greeting` is set to `"Hello"`
3. Inner function is returned (with reference to its lexical environment)
4. `createGreeting` finishes, but `greeting` is NOT garbage collected
5. When `sayHello("Alice")` is called, it still has access to `greeting = "Hello"`

## Practical Use Cases

### 1. Data Privacy / Encapsulation

```javascript
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable

  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited $${amount}. New balance: $${balance}`;
      }
      return "Invalid amount";
    },

    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `Withdrew $${amount}. New balance: $${balance}`;
      }
      return "Invalid amount or insufficient funds";
    },

    getBalance() {
      return `Current balance: $${balance}`;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.getBalance()); // "Current balance: $1000"
console.log(account.deposit(500)); // "Deposited $500. New balance: $1500"
console.log(account.withdraw(200)); // "Withdrew $200. New balance: $1300"

// Cannot access balance directly
console.log(account.balance); // undefined (private!)
```

### 2. Factory Functions

```javascript
function createCounter(start = 0, step = 1) {
  let count = start;

  return {
    increment() {
      count += step;
      return count;
    },

    decrement() {
      count -= step;
      return count;
    },

    reset() {
      count = start;
      return count;
    },

    getValue() {
      return count;
    }
  };
}

const counter1 = createCounter(0, 1);
const counter2 = createCounter(100, 10);

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2

console.log(counter2.increment()); // 110
console.log(counter2.decrement()); // 100

// Each counter has its own independent state
```

### 3. Function Currying

```javascript
// Basic currying
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const multiplyBy5 = multiply(5);
console.log(multiplyBy5(3));  // 15
console.log(multiplyBy5(10)); // 50

// Advanced currying
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

const curriedSum = curry(sum);
console.log(curriedSum(1)(2)(3));     // 6
console.log(curriedSum(1, 2)(3));     // 6
console.log(curriedSum(1)(2, 3));     // 6
```

### 4. Memoization

```javascript
function memoize(fn) {
  const cache = {}; // Closure maintains cache

  return function(...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log('Returning from cache');
      return cache[key];
    }

    console.log('Computing result');
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

function expensiveCalculation(n) {
  // Simulate expensive operation
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += i;
  }
  return result;
}

const memoizedCalc = memoize(expensiveCalculation);

console.log(memoizedCalc(1000000)); // Computing result
console.log(memoizedCalc(1000000)); // Returning from cache (instant!)
console.log(memoizedCalc(2000000)); // Computing result
console.log(memoizedCalc(1000000)); // Returning from cache
```

### 5. Event Handlers / Callbacks

```javascript
function setupButtons() {
  const buttons = document.querySelectorAll('button');

  buttons.forEach((button, index) => {
    button.addEventListener('click', function() {
      // Closure captures 'button' and 'index'
      console.log(`Button ${index} clicked`);
      button.style.backgroundColor = 'blue';
    });
  });
}

// Each event handler maintains reference to its button and index
```

### 6. Module Pattern

```javascript
const Calculator = (function() {
  // Private variables and functions
  let result = 0;

  function log(operation, value) {
    console.log(`${operation}: ${value}, Result: ${result}`);
  }

  // Public API
  return {
    add(value) {
      result += value;
      log('Add', value);
      return this; // Method chaining
    },

    subtract(value) {
      result -= value;
      log('Subtract', value);
      return this;
    },

    multiply(value) {
      result *= value;
      log('Multiply', value);
      return this;
    },

    divide(value) {
      if (value !== 0) {
        result /= value;
        log('Divide', value);
      }
      return this;
    },

    getResult() {
      return result;
    },

    clear() {
      result = 0;
      log('Clear', 0);
      return this;
    }
  };
})();

// Usage
Calculator
  .add(10)      // Add: 10, Result: 10
  .multiply(5)  // Multiply: 5, Result: 50
  .subtract(20) // Subtract: 20, Result: 30
  .divide(3);   // Divide: 3, Result: 10

console.log(Calculator.getResult()); // 10
```

## Common Pitfalls

### 1. Closures in Loops (var vs let)

```javascript
// ❌ Problem with var (all closures reference same variable)
function createButtonsVar() {
  for (var i = 0; i < 5; i++) {
    setTimeout(function() {
      console.log(i); // Prints: 5, 5, 5, 5, 5
    }, 100);
  }
}

// Why? All closures reference the same 'i' variable
// By the time setTimeout executes, loop has finished and i = 5

// ✓ Solution 1: Use let (block scope)
function createButtonsLet() {
  for (let i = 0; i < 5; i++) {
    setTimeout(function() {
      console.log(i); // Prints: 0, 1, 2, 3, 4
    }, 100);
  }
}

// Why? 'let' creates new binding for each iteration

// ✓ Solution 2: Use IIFE with var
function createButtonsIIFE() {
  for (var i = 0; i < 5; i++) {
    (function(index) {
      setTimeout(function() {
        console.log(index); // Prints: 0, 1, 2, 3, 4
      }, 100);
    })(i);
  }
}

// Why? IIFE creates new scope with 'index' parameter
```

### 2. Memory Leaks

```javascript
// ❌ Potential memory leak
function createHeavyObject() {
  const hugeArray = new Array(1000000).fill('data');

  return function() {
    // This closure keeps reference to hugeArray
    // even if we only need one value
    return hugeArray[0];
  };
}

const fn = createHeavyObject();
// hugeArray stays in memory even though we only use first element

// ✓ Solution: Only capture what you need
function createLightObject() {
  const hugeArray = new Array(1000000).fill('data');
  const firstElement = hugeArray[0];

  return function() {
    // Only captures firstElement, not entire array
    return firstElement;
  };
}
```

### 3. Accidental Global Variables

```javascript
function createClosure() {
  // ❌ Forgot 'let', 'const', or 'var'
  count = 0; // Creates global variable!

  return function() {
    return ++count;
  };
}

const counter = createClosure();
console.log(window.count); // 0 (global variable created!)

// ✓ Solution: Always use let, const, or var
function createClosureCorrect() {
  let count = 0; // Properly scoped

  return function() {
    return ++count;
  };
}
```

## Memory Management

### How Garbage Collection Works with Closures

```javascript
function outer() {
  const used = "I am used";
  const unused = "I am not used";

  return function inner() {
    console.log(used);
    // 'unused' is NOT referenced by inner function
    // Modern JS engines can garbage collect 'unused'
  };
}

const fn = outer();
// Only 'used' is kept in memory (in modern engines)
```

**Note:** Modern JavaScript engines (V8, SpiderMonkey) optimize closures and only retain variables that are actually referenced.

### Circular References (Old Issue)

```javascript
// Old problem in IE (fixed in modern browsers)
function assignHandler() {
  const element = document.getElementById('myDiv');
  const id = element.id;

  element.onclick = function() {
    console.log(id); // Use 'id' instead of 'element'
  };

  // Break circular reference (not needed in modern browsers)
  // element = null;
}
```

## Performance Considerations

```javascript
// ❌ Creating closure in loop (less efficient)
function processArray(arr) {
  arr.forEach(function(item) {
    setTimeout(function() {
      console.log(item); // New closure for each item
    }, 100);
  });
}

// ✓ Better: Reuse function reference
function processArrayOptimized(arr) {
  function logItem(item) {
    return function() {
      console.log(item);
    };
  }

  arr.forEach(function(item) {
    setTimeout(logItem(item), 100);
  });
}

// ✓ Best: Avoid closure if not needed
function processArrayBest(arr) {
  arr.forEach(function(item) {
    setTimeout(console.log, 100, item); // Pass as argument
  });
}
```

## Interview Questions

### Q1: What is a closure in JavaScript?

**Answer:**

A **closure** is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has finished executing.

```javascript
function makeAdder(x) {
  return function(y) {
    return x + y; // Closure: accesses 'x' from outer scope
  };
}

const add5 = makeAdder(5);
console.log(add5(3)); // 8 (x=5 is "remembered")
```

**Key points:**
- Created automatically when a function is defined
- Maintains reference to outer scope variables
- Enables data privacy and functional programming patterns

### Q2: What is the difference between scope and closure?

**Answer:**

| Concept | Definition | Duration |
|---------|------------|----------|
| **Scope** | Accessibility of variables | During function execution |
| **Closure** | Preserved scope after execution | After function completes |

```javascript
function example() {
  let x = 10; // 'x' is in scope here

  function inner() {
    console.log(x); // Closure: accessing 'x' from outer scope
  }

  return inner;
} // Scope of 'x' ends here

const fn = example();
fn(); // 10 - Closure preserves access to 'x'
```

**Scope** = Where variables are accessible
**Closure** = How variables are preserved after scope ends

### Q3: Explain the closure loop problem with var.

**Answer:**

**Problem:**
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints: 3, 3, 3 (not 0, 1, 2)
  }, 100);
}
```

**Why:**
- `var` has function scope, not block scope
- All setTimeout callbacks reference the same `i` variable
- By the time callbacks execute, loop has finished and `i = 3`

**Solutions:**

**1. Use let (block scope):**
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints: 0, 1, 2
  }, 100);
}
// 'let' creates new binding for each iteration
```

**2. Use IIFE (Immediately Invoked Function Expression):**
```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Prints: 0, 1, 2
    }, 100);
  })(i);
}
// IIFE creates new scope with parameter 'j'
```

**3. Use forEach:**
```javascript
[0, 1, 2].forEach(function(i) {
  setTimeout(function() {
    console.log(i); // Prints: 0, 1, 2
  }, 100);
});
// forEach callback creates new scope for each iteration
```

### Q4: What are the practical uses of closures?

**Answer:**

**1. Data Privacy (Encapsulation):**
```javascript
function createSecret() {
  let secret = "my secret";
  return {
    getSecret: () => secret,
    setSecret: (value) => { secret = value; }
  };
}
```

**2. Function Factory:**
```javascript
function multiplier(factor) {
  return (x) => x * factor;
}
const double = multiplier(2);
```

**3. Module Pattern:**
```javascript
const Module = (function() {
  let privateVar = 0;
  return {
    increment: () => ++privateVar
  };
})();
```

**4. Currying:**
```javascript
const add = (a) => (b) => a + b;
const add5 = add(5);
```

**5. Memoization:**
```javascript
function memoize(fn) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    return cache[key] || (cache[key] = fn(...args));
  };
}
```

### Q5: Can closures cause memory leaks?

**Answer:**

**Yes**, if not used carefully. Closures retain references to outer scope variables, preventing garbage collection.

**Potential memory leak:**
```javascript
function createLeak() {
  const hugeData = new Array(1000000).fill('data');

  return function() {
    // Closure keeps reference to hugeData
    // even if we only need one value
    return hugeData[0];
  };
}
```

**Solution: Only capture what you need:**
```javascript
function noLeak() {
  const hugeData = new Array(1000000).fill('data');
  const firstItem = hugeData[0];

  return function() {
    return firstItem; // Only captures firstItem
  };
}
```

**Best practices:**
- ✅ Only reference variables you need
- ✅ Set references to null when done
- ✅ Remove event listeners when not needed
- ✅ Use WeakMap for object references

### Q6: What is the module pattern?

**Answer:**

The **module pattern** uses closures to create private and public members.

```javascript
const Counter = (function() {
  // Private variables
  let count = 0;

  function logCount() {
    console.log(`Count: ${count}`);
  }

  // Public API
  return {
    increment() {
      count++;
      logCount();
      return this;
    },

    decrement() {
      count--;
      logCount();
      return this;
    },

    getCount() {
      return count;
    }
  };
})();

Counter.increment().increment(); // Count: 1, Count: 2
console.log(Counter.getCount()); // 2
console.log(Counter.count);      // undefined (private!)
```

**Benefits:**
- ✅ Data privacy (private variables)
- ✅ Namespace management
- ✅ Clean public API
- ✅ Prevents global pollution

### Q7: Explain lexical scope.

**Answer:**

**Lexical scope** means a function's scope is determined by where it's written in the code, not where it's executed.

```javascript
const global = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    const innerVar = "Inner";

    // Lexical scope: Can access all outer variables
    console.log(global);   // ✓ Accessible
    console.log(outerVar); // ✓ Accessible
    console.log(innerVar); // ✓ Accessible
  }

  inner();
}

outer();
```

**Key point:** JavaScript uses **static (lexical) scoping**, not **dynamic scoping**.

```javascript
const x = "global";

function outer() {
  const x = "outer";

  function inner() {
    console.log(x); // "outer" (lexical scope)
  }

  return inner;
}

const fn = outer();
const x = "different";
fn(); // "outer" (not "different")
// Scope determined by where inner() was defined, not where it's called
```

### Q8: What is the difference between closure and callback?

**Answer:**

| Feature | Closure | Callback |
|---------|---------|----------|
| **Definition** | Function with access to outer scope | Function passed as argument |
| **Purpose** | Preserve scope | Deferred execution |
| **Relationship** | Can be related but different concepts | Often uses closures |

**Closure:**
```javascript
function outer(x) {
  return function inner(y) {
    return x + y; // Closure: accesses 'x'
  };
}
```

**Callback:**
```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("data"); // Callback: passed as argument
  }, 1000);
}
```

**Callback with Closure:**
```javascript
function process(data) {
  const prefix = "Processed: ";

  setTimeout(function() {
    // This is both a callback AND a closure
    console.log(prefix + data); // Closure: accesses 'prefix'
  }, 1000);
}
```

### Q9: How do you debug closures?

**Answer:**

**1. Use debugger:**
```javascript
function outer() {
  const x = 10;

  return function inner() {
    debugger; // Pause here
    console.log(x);
  };
}
```

**2. Chrome DevTools:**
- Set breakpoint in inner function
- Inspect "Scope" panel
- View "Closure" section to see captured variables

**3. Console logging:**
```javascript
function outer(x) {
  console.log('Outer scope, x:', x);

  return function inner(y) {
    console.log('Inner scope, x:', x, 'y:', y);
    return x + y;
  };
}
```

**4. Check memory usage:**
```javascript
// Chrome DevTools → Memory → Take heap snapshot
// Look for detached DOM nodes or unexpected closures
```

### Q10: What is an IIFE and how does it relate to closures?

**Answer:**

**IIFE (Immediately Invoked Function Expression)** is a function that runs immediately after being defined.

```javascript
(function() {
  // Code here
})();

// or

(function() {
  // Code here
}());
```

**Relationship with closures:**

**1. Create private scope:**
```javascript
(function() {
  const private = "I'm private";
  window.publicAPI = {
    getPrivate: () => private // Closure
  };
})();

console.log(publicAPI.getPrivate()); // "I'm private"
console.log(private); // Error: not defined
```

**2. Capture variables in loops:**
```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j); // 0, 1, 2
    }, 100);
  })(i); // IIFE captures 'i' as 'j'
}
```

**3. Module pattern:**
```javascript
const Module = (function() {
  let privateVar = 0;

  return {
    increment: () => ++privateVar,
    get: () => privateVar
  };
})();
```

## Best Practices

1. **Use closures for data privacy** - Encapsulate private variables
2. **Avoid unnecessary closures** - Don't create closures in loops if not needed
3. **Use let/const instead of var** - Block scope prevents common closure bugs
4. **Be mindful of memory** - Only capture variables you need
5. **Use modern patterns** - Modules, classes when appropriate
6. **Document closure intent** - Make it clear when using closures for specific purposes
7. **Test closure behavior** - Verify variables are captured correctly
8. **Use linters** - ESLint can catch common closure mistakes
9. **Profile memory usage** - Check for memory leaks in long-running applications
10. **Prefer clarity over cleverness** - Write readable closure code

## Resources

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [You Don't Know JS: Scope & Closures](https://github.com/getify/You-Dont-Know-JS)
- [JavaScript.info: Closures](https://javascript.info/closure)
- [Eloquent JavaScript: Functions](https://eloquentjavascript.net/03_functions.html)
- [V8 Blog: Understanding V8's Optimizations](https://v8.dev/blog)
