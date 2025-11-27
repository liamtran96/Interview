---
sidebar_position: 5
---

# The 'this' Keyword

## What is 'this'?

`this` is a keyword in JavaScript that refers to the object that is executing the current function. The value of `this` is determined by **how a function is called**, not where it's defined.

:::warning Common Confusion
`this` does NOT refer to the function itself or its lexical scope. It refers to the **execution context** - the object that called the function.
:::

## The Four Rules of 'this'

### 1. Default Binding (Global Context)

```javascript
function showThis() {
  console.log(this);
}

showThis(); // Window (in browser) or global (in Node.js)

// In strict mode
function showThisStrict() {
  'use strict';
  console.log(this);
}

showThisStrict(); // undefined
```

**Rule:** When a function is called without any context, `this` defaults to the global object (or `undefined` in strict mode).

### 2. Implicit Binding (Object Method)

```javascript
const person = {
  name: 'John',
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

person.greet(); // "Hello, I'm John"
// 'this' refers to 'person' because greet was called on person
```

**Rule:** When a function is called as a method of an object, `this` refers to that object.

#### Lost Context Problem

```javascript
const person = {
  name: 'John',
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

const greetFunc = person.greet;
greetFunc(); // "Hello, I'm undefined"
// Context lost! Now it's just a regular function call
```

### 3. Explicit Binding (call, apply, bind)

```javascript
function greet() {
  console.log(`Hello, I'm ${this.name}`);
}

const person = { name: 'John' };

// call() - invoke immediately
greet.call(person); // "Hello, I'm John"

// apply() - invoke immediately with array of arguments
greet.apply(person); // "Hello, I'm John"

// bind() - create new function with bound 'this'
const greetJohn = greet.bind(person);
greetJohn(); // "Hello, I'm John"
```

**Rule:** `call`, `apply`, and `bind` explicitly set what `this` should be.

### 4. new Binding (Constructor)

```javascript
function Person(name) {
  this.name = name;
  console.log(this);
}

const john = new Person('John');
// 'this' refers to the new object being created
```

**Rule:** When a function is called with `new`, `this` refers to the newly created object.

## 'this' in Different Contexts

### Arrow Functions

```javascript
// Arrow functions DON'T have their own 'this'
// They inherit 'this' from parent scope (lexical 'this')

const person = {
  name: 'John',
  greet: function() {
    const arrowFunc = () => {
      console.log(this.name); // Inherits 'this' from greet
    };
    arrowFunc();
  }
};

person.greet(); // "John"
```

```javascript
// Common pitfall with arrow functions as methods
const person = {
  name: 'John',
  greet: () => {
    console.log(this.name); // 'this' is NOT person!
  }
};

person.greet(); // undefined (this is global/window)
```

**Rule:** Arrow functions inherit `this` from their enclosing scope. They ignore all binding rules.

### Event Handlers

```javascript
// Regular function - 'this' refers to element
button.addEventListener('click', function() {
  console.log(this); // <button> element
});

// Arrow function - 'this' refers to enclosing scope
button.addEventListener('click', () => {
  console.log(this); // NOT the button!
});
```

### setTimeout/setInterval

```javascript
const person = {
  name: 'John',
  greet() {
    setTimeout(function() {
      console.log(this.name); // undefined (this is global)
    }, 1000);
  }
};

// Solution 1: Arrow function
const person = {
  name: 'John',
  greet() {
    setTimeout(() => {
      console.log(this.name); // "John" (inherits 'this')
    }, 1000);
  }
};

// Solution 2: bind()
const person = {
  name: 'John',
  greet() {
    setTimeout(function() {
      console.log(this.name); // "John"
    }.bind(this), 1000);
  }
};
```

## call(), apply(), and bind()

### call()

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'John' };

greet.call(person, 'Hello', '!'); // "Hello, I'm John!"
// call(thisArg, arg1, arg2, ...)
```

### apply()

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'John' };

greet.apply(person, ['Hello', '!']); // "Hello, I'm John!"
// apply(thisArg, [argsArray])
```

**Difference:** `call` takes arguments separately, `apply` takes them as an array.

### bind()

```javascript
function greet(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

const person = { name: 'John' };

const greetJohn = greet.bind(person);
greetJohn('Hello'); // "Hello, I'm John"
greetJohn('Hi');    // "Hi, I'm John"

// bind() returns a NEW function with 'this' permanently bound
```

#### Partial Application with bind()

```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: 'John' };

// Pre-set 'this' AND first argument
const sayHello = greet.bind(person, 'Hello');
sayHello('!'); // "Hello, I'm John!"
sayHello('?'); // "Hello, I'm John?"
```

## Common Patterns and Solutions

### Preserving Context in Callbacks

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  // ❌ PROBLEM: Lost context
  incrementWrong() {
    setTimeout(function() {
      this.count++; // 'this' is undefined or global
    }, 1000);
  }

  // ✅ SOLUTION 1: Arrow function
  incrementArrow() {
    setTimeout(() => {
      this.count++; // Inherits 'this' from incrementArrow
    }, 1000);
  }

  // ✅ SOLUTION 2: bind()
  incrementBind() {
    setTimeout(function() {
      this.count++;
    }.bind(this), 1000);
  }

  // ✅ SOLUTION 3: Store 'this' in variable
  incrementVar() {
    const self = this;
    setTimeout(function() {
      self.count++;
    }, 1000);
  }
}
```

### Method Borrowing

```javascript
const person1 = {
  name: 'John',
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

const person2 = { name: 'Jane' };

// Borrow person1's method for person2
console.log(person1.greet.call(person2)); // "Hello, I'm Jane"
```

### Array-like to Array Conversion

```javascript
function logArgs() {
  // 'arguments' is array-like, not a real array
  const argsArray = Array.prototype.slice.call(arguments);
  console.log(argsArray);
}

logArgs(1, 2, 3); // [1, 2, 3]

// Modern way (ES6)
function logArgsModern(...args) {
  console.log(args); // Real array
}
```

## Common Interview Questions

### Q1: What does 'this' refer to in different contexts?

**Answer:**

```javascript
// 1. Global context
console.log(this); // Window (browser) or global (Node.js)

// 2. Object method
const obj = {
  method() {
    console.log(this); // obj
  }
};
obj.method();

// 3. Constructor
function Person(name) {
  this.name = name; // New object being created
}
new Person('John');

// 4. Arrow function
const arrowFunc = () => {
  console.log(this); // Inherits from parent scope
};

// 5. Event handler
button.addEventListener('click', function() {
  console.log(this); // button element
});

// 6. Explicit binding
function greet() {
  console.log(this.name);
}
greet.call({ name: 'John' }); // Explicitly set to { name: 'John' }
```

### Q2: What is the difference between call, apply, and bind?

**Answer:**

| Method | Execution | Arguments | Returns |
|--------|-----------|-----------|---------|
| `call()` | Immediate | Separate | Function result |
| `apply()` | Immediate | Array | Function result |
| `bind()` | Later | Separate | New function |

```javascript
function greet(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

const person = { name: 'John' };

// call - execute now, args separate
greet.call(person, 'Hello', '!'); // "Hello, I'm John!"

// apply - execute now, args in array
greet.apply(person, ['Hello', '!']); // "Hello, I'm John!"

// bind - returns new function for later
const greetJohn = greet.bind(person, 'Hello');
greetJohn('!'); // "Hello, I'm John!"
```

### Q3: How do arrow functions handle 'this'?

**Answer:**

Arrow functions **don't have their own `this`**. They inherit `this` from the parent scope (lexical `this`).

```javascript
// Regular function - 'this' depends on how it's called
const obj1 = {
  name: 'Regular',
  greet: function() {
    console.log(this.name);
  }
};
obj1.greet(); // "Regular"
const fn = obj1.greet;
fn(); // undefined (context lost)

// Arrow function - 'this' inherited from parent
const obj2 = {
  name: 'Arrow',
  greet: () => {
    console.log(this.name); // 'this' is NOT obj2!
  }
};
obj2.greet(); // undefined (this is global/window)

// Useful pattern: Arrow function inside method
const obj3 = {
  name: 'John',
  hobbies: ['reading', 'coding'],
  showHobbies() {
    this.hobbies.forEach(hobby => {
      // Arrow function inherits 'this' from showHobbies
      console.log(`${this.name} likes ${hobby}`);
    });
  }
};
obj3.showHobbies();
// "John likes reading"
// "John likes coding"
```

### Q4: What happens to 'this' in nested functions?

**Answer:**

```javascript
const obj = {
  name: 'John',
  outer() {
    console.log(this.name); // "John" (this is obj)

    function inner() {
      console.log(this.name); // undefined (this is global/window)
    }
    inner();
  }
};

obj.outer();
```

**Solutions:**

```javascript
// Solution 1: Save 'this' in variable
const obj = {
  name: 'John',
  outer() {
    const self = this;
    function inner() {
      console.log(self.name); // "John"
    }
    inner();
  }
};

// Solution 2: Arrow function
const obj = {
  name: 'John',
  outer() {
    const inner = () => {
      console.log(this.name); // "John" (inherits 'this')
    };
    inner();
  }
};

// Solution 3: bind()
const obj = {
  name: 'John',
  outer() {
    function inner() {
      console.log(this.name); // "John"
    }
    inner.call(this); // or inner.bind(this)()
  }
};
```

### Q5: Can you change 'this' in an arrow function?

**Answer:** **No!** Arrow functions ignore all binding rules.

```javascript
const obj = { name: 'John' };

const arrowFunc = () => {
  console.log(this.name);
};

// call, apply, bind have NO EFFECT on arrow functions
arrowFunc.call(obj);  // undefined (doesn't work)
arrowFunc.apply(obj); // undefined (doesn't work)
const bound = arrowFunc.bind(obj);
bound(); // undefined (doesn't work)

// Arrow functions ALWAYS use lexical 'this'
```

### Q6: What is 'this' in a class?

**Answer:**

```javascript
class Person {
  constructor(name) {
    this.name = name; // 'this' refers to new instance
  }

  // Regular method
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }

  // Arrow function property
  greetArrow = () => {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const john = new Person('John');

// Regular method - context can be lost
const greet = john.greet;
greet(); // undefined (context lost)

// Arrow function - context preserved
const greetArrow = john.greetArrow;
greetArrow(); // "Hello, I'm John" (context preserved!)
```

**When to use arrow functions in classes:**
- Event handlers
- Callbacks
- Any time you need to preserve `this` context

## Priority of 'this' Binding

When multiple rules apply, this is the priority (highest to lowest):

1. **`new` binding** - `new` keyword
2. **Explicit binding** - `call`, `apply`, `bind`
3. **Implicit binding** - Method call (obj.method())
4. **Default binding** - Global or undefined

```javascript
function greet() {
  console.log(this.name);
}

const obj1 = { name: 'Obj1' };
const obj2 = { name: 'Obj2' };

// Explicit binding beats implicit
obj1.greet = greet;
obj1.greet.call(obj2); // "Obj2" (explicit wins)

// new binding beats explicit
const boundGreet = greet.bind(obj1);
new boundGreet(); // undefined (new wins, creates new object)
```

## Best Practices

1. **Use arrow functions** - For callbacks and when you want to preserve `this`
2. **Avoid `this` in global scope** - Use modules or IIFE
3. **Be explicit** - Use `call`, `apply`, `bind` when intent isn't clear
4. **Use arrow function properties in classes** - For event handlers
5. **Understand the context** - Know how your function will be called
6. **Consider modern patterns** - Classes, modules reduce `this` confusion
7. **Test your assumptions** - Log `this` when debugging

## Common Pitfalls

### 1. Lost Context

```javascript
// ❌ PROBLEM
const obj = {
  name: 'John',
  greet() {
    console.log(this.name);
  }
};

setTimeout(obj.greet, 1000); // undefined

// ✅ SOLUTION
setTimeout(() => obj.greet(), 1000); // "John"
// or
setTimeout(obj.greet.bind(obj), 1000); // "John"
```

### 2. Arrow Functions as Methods

```javascript
// ❌ WRONG
const obj = {
  name: 'John',
  greet: () => {
    console.log(this.name); // 'this' is NOT obj!
  }
};

// ✅ CORRECT
const obj = {
  name: 'John',
  greet() {
    console.log(this.name);
  }
};
```

### 3. Nested Functions

```javascript
// ❌ PROBLEM
const obj = {
  name: 'John',
  showHobbies() {
    ['reading'].forEach(function(hobby) {
      console.log(this.name); // undefined
    });
  }
};

// ✅ SOLUTION
const obj = {
  name: 'John',
  showHobbies() {
    ['reading'].forEach(hobby => {
      console.log(this.name); // "John"
    });
  }
};
```

## Key Takeaways

- `this` refers to the execution context, not the function itself
- Four binding rules: default, implicit, explicit, new
- Arrow functions inherit `this` from parent scope
- `call` and `apply` invoke immediately, `bind` returns new function
- Priority: new > explicit > implicit > default
- Arrow functions can't have `this` changed
- Common issues: lost context, nested functions, callbacks

## Resources

- [MDN 'this'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [JavaScript.info 'this'](https://javascript.info/object-methods)
- [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/tree/1st-ed/this%20%26%20object%20prototypes)
