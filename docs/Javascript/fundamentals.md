---
sidebar_position: 1
---

# JavaScript Fundamentals

## What is JavaScript?

**JavaScript** is a high-level, interpreted programming language that enables interactive web pages. It's a core technology of the web alongside HTML and CSS.

:::info ECMAScript
JavaScript implements the **ECMAScript** specification. ES2024/ES2025 are the latest versions with new features like temporal API, pattern matching, and more.
:::

## Variables and Data Types

### Variable Declarations

```javascript
// var (function-scoped, avoid in modern code)
var x = 10;

// let (block-scoped, can be reassigned)
let y = 20;
y = 30; // ✓ OK

// const (block-scoped, cannot be reassigned)
const z = 40;
z = 50; // ✗ Error: Assignment to constant variable

// const with objects (reference is constant, not content)
const person = { name: 'John' };
person.name = 'Jane'; // ✓ OK (modifying property)
person = {}; // ✗ Error (reassigning reference)
```

**Best Practice:** Use `const` by default, `let` when you need to reassign, never use `var`.

### Data Types

**Primitive Types** (immutable):

```javascript
// 1. Number
let integer = 42;
let float = 3.14;
let negative = -10;
let scientific = 2.998e8; // 299800000

// Special number values
let infinity = Infinity;
let negInfinity = -Infinity;
let notANumber = NaN; // Not a Number

// 2. BigInt (for very large integers)
let bigNum = 1234567890123456789012345678901234567890n;
let bigNum2 = BigInt("9007199254740991");

// 3. String
let single = 'Single quotes';
let double = "Double quotes";
let template = `Template literal with ${integer}`;

// 4. Boolean
let isTrue = true;
let isFalse = false;

// 5. Undefined (declared but not assigned)
let notAssigned;
console.log(notAssigned); // undefined

// 6. Null (intentional absence of value)
let empty = null;

// 7. Symbol (unique identifier)
let sym1 = Symbol('description');
let sym2 = Symbol('description');
console.log(sym1 === sym2); // false (always unique)
```

**Reference Type:**

```javascript
// 8. Object (including arrays, functions, dates, etc.)
let obj = { name: 'John', age: 30 };
let arr = [1, 2, 3];
let func = function() { };
let date = new Date();
```

### Type Checking

```javascript
// typeof operator
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 100n);        // "bigint"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" (arrays are objects!)
console.log(typeof null);        // "object" (historical bug)
console.log(typeof function(){}); // "function"

// Better array check
Array.isArray([]);     // true
Array.isArray({});     // false

// Better null check
value === null;        // true for null only
```

## Type Conversion

### Implicit Conversion (Coercion)

```javascript
// String coercion
console.log("5" + 3);      // "53" (number to string)
console.log("5" - 3);      // 2 (string to number)
console.log("5" * "2");    // 10 (both to numbers)

// Boolean coercion
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean(null));     // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));      // false
console.log(Boolean([]));       // true (empty array is truthy!)
console.log(Boolean({}));       // true (empty object is truthy!)

// Loose equality (== performs type coercion)
console.log(5 == "5");     // true
console.log(null == undefined); // true
console.log(0 == false);   // true

// Strict equality (=== no coercion)
console.log(5 === "5");    // false
console.log(null === undefined); // false
```

**Best Practice:** Always use `===` and `!==` (strict equality).

### Explicit Conversion

```javascript
// To Number
Number("42");      // 42
parseInt("42px");  // 42 (stops at first non-digit)
parseFloat("3.14"); // 3.14
+"42";             // 42 (unary plus operator)

// To String
String(42);        // "42"
(42).toString();   // "42"
42 + "";           // "42"

// To Boolean
Boolean(1);        // true
!!1;               // true (double negation)
```

## Operators

### Arithmetic Operators

```javascript
let a = 10, b = 3;

console.log(a + b);  // 13 (addition)
console.log(a - b);  // 7  (subtraction)
console.log(a * b);  // 30 (multiplication)
console.log(a / b);  // 3.333... (division)
console.log(a % b);  // 1  (modulus/remainder)
console.log(a ** b); // 1000 (exponentiation, ES2016)

// Increment/Decrement
let x = 5;
console.log(x++);    // 5 (post-increment, returns then increments)
console.log(x);      // 6
console.log(++x);    // 7 (pre-increment, increments then returns)
```

### Comparison Operators

```javascript
console.log(5 > 3);    // true
console.log(5 < 3);    // false
console.log(5 >= 5);   // true
console.log(5 <= 5);   // true
console.log(5 == "5"); // true (loose equality)
console.log(5 === "5"); // false (strict equality)
console.log(5 != "5"); // false (loose inequality)
console.log(5 !== "5"); // true (strict inequality)
```

### Logical Operators

```javascript
// AND (&&) - returns first falsy value or last value
console.log(true && true);   // true
console.log(true && false);  // false
console.log("hello" && 0);   // 0
console.log("hello" && "world"); // "world"

// OR (||) - returns first truthy value or last value
console.log(false || true);  // true
console.log(0 || "hello");   // "hello"
console.log("" || "default"); // "default"

// NOT (!)
console.log(!true);          // false
console.log(!0);             // true
console.log(!"hello");       // false

// Nullish Coalescing (??) - ES2020
console.log(null ?? "default");     // "default"
console.log(undefined ?? "default"); // "default"
console.log(0 ?? "default");        // 0 (0 is not nullish!)
console.log("" ?? "default");       // "" (empty string is not nullish!)
```

### Other Operators

```javascript
// Ternary operator
let age = 20;
let status = age >= 18 ? "adult" : "minor";

// Optional chaining (?.) - ES2020
let user = { address: { city: "NYC" } };
console.log(user?.address?.city);    // "NYC"
console.log(user?.phone?.number);    // undefined (no error)

// Spread operator (...) - ES2015
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
```

## Functions

### Function Declaration

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("John")); // "Hello, John!"
```

### Function Expression

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

### Arrow Functions (ES2015)

```javascript
// Basic syntax
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Shorter syntax (implicit return)
const greet2 = name => `Hello, ${name}!`;

// No parameters
const sayHello = () => "Hello!";

// Multiple parameters
const add = (a, b) => a + b;

// Returning objects (wrap in parentheses)
const makePerson = (name, age) => ({ name, age });
```

**Arrow functions vs regular functions:**
- No `this` binding (inherits from parent scope)
- No `arguments` object
- Cannot be used as constructors
- More concise syntax

### Default Parameters (ES2015)

```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(greet());        // "Hello, Guest!"
console.log(greet("John"));  // "Hello, John!"
```

### Rest Parameters (ES2015)

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

## Arrays

### Creating Arrays

```javascript
// Array literal
let arr = [1, 2, 3, 4, 5];

// Array constructor
let arr2 = new Array(5); // Array with 5 empty slots
let arr3 = new Array(1, 2, 3); // [1, 2, 3]

// Array.from() - ES2015
let arr4 = Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']
let arr5 = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

### Array Methods

```javascript
let arr = [1, 2, 3, 4, 5];

// Access
arr[0];           // 1 (first element)
arr[arr.length - 1]; // 5 (last element)

// Add/Remove
arr.push(6);      // Add to end → [1, 2, 3, 4, 5, 6]
arr.pop();        // Remove from end → returns 6
arr.unshift(0);   // Add to start → [0, 1, 2, 3, 4, 5]
arr.shift();      // Remove from start → returns 0

// Splice (add/remove anywhere)
arr.splice(2, 1);         // Remove 1 element at index 2
arr.splice(2, 0, 'a', 'b'); // Insert 'a', 'b' at index 2

// Slice (extract section)
arr.slice(1, 3);  // [2, 3] (doesn't modify original)

// Find
arr.indexOf(3);   // 2 (index of first occurrence)
arr.includes(3);  // true
arr.find(x => x > 3);  // 4 (first element > 3)
arr.findIndex(x => x > 3); // 3 (index of first element > 3)

// Transform
arr.map(x => x * 2);     // [2, 4, 6, 8, 10]
arr.filter(x => x > 2);  // [3, 4, 5]
arr.reduce((sum, x) => sum + x, 0); // 15

// Iterate
arr.forEach((value, index) => {
  console.log(`${index}: ${value}`);
});

// Check
arr.some(x => x > 4);    // true (at least one > 4)
arr.every(x => x > 0);   // true (all > 0)

// Sort (mutates array!)
arr.sort((a, b) => a - b); // Ascending
arr.sort((a, b) => b - a); // Descending

// Join
arr.join(', ');   // "1, 2, 3, 4, 5"

// Reverse (mutates array!)
arr.reverse();    // [5, 4, 3, 2, 1]
```

### Array Destructuring (ES2015)

```javascript
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements
let [first, , third] = [1, 2, 3];

// Rest pattern
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
let [x = 0, y = 0] = [1];
console.log(x, y); // 1 0
```

## Objects

### Creating Objects

```javascript
// Object literal
let person = {
  name: 'John',
  age: 30,
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

// Object constructor
let person2 = new Object();
person2.name = 'Jane';

// Object.create()
let person3 = Object.create(person);
```

### Accessing Properties

```javascript
let person = { name: 'John', age: 30 };

// Dot notation
console.log(person.name);  // "John"

// Bracket notation
console.log(person['age']); // 30

// Dynamic property access
let prop = 'name';
console.log(person[prop]); // "John"
```

### Object Methods

```javascript
let person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  city: 'NYC'
};

// Keys, Values, Entries
Object.keys(person);    // ['firstName', 'lastName', 'age', 'city']
Object.values(person);  // ['John', 'Doe', 30, 'NYC']
Object.entries(person); // [['firstName', 'John'], ['lastName', 'Doe'], ...]

// Assign (merge objects)
let target = { a: 1 };
let source = { b: 2, c: 3 };
Object.assign(target, source); // { a: 1, b: 2, c: 3 }

// Freeze (make immutable)
Object.freeze(person);
person.age = 31; // No effect in strict mode, silent failure in normal mode

// Seal (prevent add/delete, allow modify)
Object.seal(person);
```

### Computed Property Names (ES2015)

```javascript
let propName = 'age';

let person = {
  name: 'John',
  [propName]: 30,           // age: 30
  ['first' + 'Name']: 'John' // firstName: 'John'
};
```

### Object Destructuring (ES2015)

```javascript
let person = { name: 'John', age: 30, city: 'NYC' };

// Basic
let { name, age } = person;
console.log(name, age); // "John" 30

// Rename
let { name: fullName, age: years } = person;
console.log(fullName, years); // "John" 30

// Default values
let { name, country = 'USA' } = person;
console.log(country); // "USA"

// Rest pattern
let { name, ...rest } = person;
console.log(rest); // { age: 30, city: 'NYC' }
```

### Shorthand Properties (ES2015)

```javascript
let name = 'John';
let age = 30;

// Old way
let person1 = { name: name, age: age };

// Shorthand
let person2 = { name, age }; // { name: 'John', age: 30 }
```

## Control Flow

### Conditional Statements

```javascript
// if-else
if (age >= 18) {
  console.log("Adult");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}

// switch
switch (day) {
  case 'Monday':
    console.log("Start of week");
    break;
  case 'Friday':
    console.log("End of week");
    break;
  default:
    console.log("Midweek");
}

// Ternary
let status = age >= 18 ? "Adult" : "Minor";
```

### Loops

```javascript
let arr = [1, 2, 3, 4, 5];

// for loop
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// for...of (iterate values) - ES2015
for (let value of arr) {
  console.log(value);
}

// for...in (iterate keys)
let obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key, obj[key]);
}

// while
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do-while
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

// forEach
arr.forEach((value, index) => {
  console.log(index, value);
});
```

## Error Handling

```javascript
try {
  // Code that may throw error
  throw new Error("Something went wrong");
} catch (error) {
  // Handle error
  console.error(error.message);
} finally {
  // Always executes
  console.log("Cleanup");
}

// Custom errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid input");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  }
}
```

## Interview Questions

### Q1: What are the data types in JavaScript?

**Answer:**

**8 data types in JavaScript:**

**Primitive types** (immutable, stored by value):
1. **Number** - `42`, `3.14`, `Infinity`, `NaN`
2. **BigInt** - `1234567890123456789012345678901234567890n`
3. **String** - `"hello"`, `'world'`, `` `template` ``
4. **Boolean** - `true`, `false`
5. **Undefined** - Variable declared but not assigned
6. **Null** - Intentional absence of value
7. **Symbol** - Unique identifier (ES2015)

**Reference type** (mutable, stored by reference):
8. **Object** - `{}`, `[]`, `function(){}`, `new Date()`, etc.

```javascript
// Primitives (pass by value)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)

// Objects (pass by reference)
let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 20;
console.log(obj1.value); // 20 (changed!)
```

### Q2: What is the difference between `null` and `undefined`?

**Answer:**

| Feature | `undefined` | `null` |
|---------|-------------|--------|
| **Type** | `undefined` | `object` (historical bug) |
| **Meaning** | Variable declared but not assigned | Intentional absence of value |
| **Assignment** | Automatically assigned by JavaScript | Must be explicitly assigned |
| **Use Case** | Default value for uninitialized variables | Explicitly indicate "no value" |

```javascript
let x; // undefined (declared but not assigned)
let y = null; // null (explicitly assigned)

console.log(typeof x); // "undefined"
console.log(typeof y); // "object"

console.log(x == y);   // true (loose equality)
console.log(x === y);  // false (strict equality)
```

### Q3: What is the difference between `==` and `===`?

**Answer:**

| Operator | Name | Type Conversion | Comparison |
|----------|------|-----------------|------------|
| `==` | Loose equality | Yes | Converts types before comparing |
| `===` | Strict equality | No | Compares value and type |

```javascript
// Loose equality (==)
console.log(5 == "5");     // true (string converted to number)
console.log(null == undefined); // true
console.log(0 == false);   // true

// Strict equality (===)
console.log(5 === "5");    // false (different types)
console.log(null === undefined); // false
console.log(0 === false);  // false
```

**Best Practice:** Always use `===` and `!==` to avoid unexpected behavior.

### Q4: What is the difference between `let`, `const`, and `var`?

**Answer:**

| Feature | `var` | `let` | `const` |
|---------|-------|-------|---------|
| **Scope** | Function | Block | Block |
| **Hoisting** | Yes (initialized as undefined) | Yes (not initialized) | Yes (not initialized) |
| **Reassignment** | Yes | Yes | No |
| **Redeclaration** | Yes | No | No |
| **Temporal Dead Zone** | No | Yes | Yes |

```javascript
// var: Function-scoped
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (accessible outside block)
}

// let: Block-scoped
function test2() {
  if (true) {
    let y = 10;
  }
  console.log(y); // ReferenceError
}

// const: Cannot reassign
const z = 10;
z = 20; // TypeError

// But can modify object properties
const obj = { value: 10 };
obj.value = 20; // ✓ OK
obj = {}; // ✗ Error
```

**Best Practice:** Use `const` by default, `let` when you need to reassign, never use `var`.

### Q5: What is hoisting in JavaScript?

**Answer:**

**Hoisting** is JavaScript's behavior of moving declarations to the top of their scope during compilation.

```javascript
// Function hoisting
greet(); // Works! "Hello"

function greet() {
  console.log("Hello");
}

// var hoisting (declaration hoisted, not assignment)
console.log(x); // undefined (not ReferenceError)
var x = 10;
console.log(x); // 10

// Equivalent to:
var x;
console.log(x); // undefined
x = 10;

// let/const hoisting (Temporal Dead Zone)
console.log(y); // ReferenceError (cannot access before initialization)
let y = 20;

// Function expressions are NOT hoisted
greet2(); // TypeError: greet2 is not a function
var greet2 = function() {
  console.log("Hello");
};
```

### Q6: What is the difference between function declaration and function expression?

**Answer:**

```javascript
// Function Declaration
function greet() {
  return "Hello";
}
// - Hoisted (can call before declaration)
// - Has a name
// - Creates a binding in current scope

// Function Expression
const greet2 = function() {
  return "Hello";
};
// - NOT hoisted (cannot call before assignment)
// - Can be anonymous or named
// - Variable hoisted, but not the function

// Arrow Function (ES2015)
const greet3 = () => "Hello";
// - NOT hoisted
// - No `this` binding
// - Cannot be used as constructor
// - More concise
```

**When to use:**
- **Declaration:** Top-level functions, need hoisting
- **Expression:** Callbacks, conditionally defined functions
- **Arrow:** Short callbacks, when you don't need `this`

### Q7: What are truthy and falsy values in JavaScript?

**Answer:**

**Falsy values** (convert to `false` in Boolean context):
- `false`
- `0` and `-0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

**Everything else is truthy:**
- `true`
- Non-zero numbers (including negative)
- Non-empty strings (including `"0"`, `"false"`)
- Objects and arrays (even empty ones!)
- Functions

```javascript
// Falsy
if (0) { } // Doesn't execute
if ("") { } // Doesn't execute
if (null) { } // Doesn't execute

// Truthy
if (1) { } // Executes
if ("0") { } // Executes (string "0" is truthy!)
if ([]) { } // Executes (empty array is truthy!)
if ({}) { } // Executes (empty object is truthy!)

// Common pattern: default values
function greet(name) {
  name = name || "Guest"; // Use "Guest" if name is falsy
  console.log(`Hello, ${name}!`);
}

// Modern: Nullish coalescing (??)
function greet2(name) {
  name = name ?? "Guest"; // Use "Guest" only if name is null/undefined
  console.log(`Hello, ${name}!`);
}
```

### Q8: What is the difference between `.map()`, `.filter()`, and `.reduce()`?

**Answer:**

```javascript
let numbers = [1, 2, 3, 4, 5];

// map() - Transform each element, returns new array (same length)
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter() - Keep elements that pass test, returns new array (≤ length)
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce() - Reduce array to single value
let sum = numbers.reduce((total, n) => total + n, 0);
// 15

// Combined example
let result = numbers
  .filter(n => n > 2)       // [3, 4, 5]
  .map(n => n * 2)          // [6, 8, 10]
  .reduce((sum, n) => sum + n, 0); // 24
```

### Q9: What is the spread operator and how is it used?

**Answer:**

The **spread operator** (`...`) expands iterables into individual elements.

```javascript
// Arrays
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Copy array
let copy = [...arr1]; // Shallow copy

// Function arguments
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(...arr1)); // 6

// Objects (ES2018)
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };
let merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Override properties
let updated = { ...obj1, b: 10 }; // { a: 1, b: 10 }
```

### Q10: What is destructuring in JavaScript?

**Answer:**

**Destructuring** extracts values from arrays or objects into distinct variables.

**Array destructuring:**
```javascript
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Skip elements
let [first, , third] = [1, 2, 3];

// Rest pattern
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(tail); // [2, 3, 4, 5]

// Swap variables
let x = 1, y = 2;
[x, y] = [y, x]; // Swap
```

**Object destructuring:**
```javascript
let person = { name: 'John', age: 30, city: 'NYC' };

// Basic
let { name, age } = person;

// Rename
let { name: fullName } = person;

// Default values
let { country = 'USA' } = person;

// Rest pattern
let { name, ...rest } = person;
console.log(rest); // { age: 30, city: 'NYC' }

// Nested
let user = {
  name: 'John',
  address: { city: 'NYC', zip: '10001' }
};
let { address: { city } } = user;
console.log(city); // "NYC"
```

## Best Practices

1. **Use strict mode** - `"use strict";` catches common mistakes
2. **Use `const` by default** - Only use `let` when you need to reassign
3. **Use `===` instead of `==`** - Avoid unexpected type coercion
4. **Use arrow functions** - For short callbacks and when you don't need `this`
5. **Use template literals** - For string interpolation
6. **Use destructuring** - More readable code
7. **Use spread operator** - For copying and merging
8. **Avoid global variables** - Use modules and proper scoping
9. **Handle errors** - Use try/catch for operations that may fail
10. **Write descriptive variable names** - `isUserLoggedIn` not `flag1`

## Resources

- [MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [ECMAScript Specification](https://tc39.es/ecma262/)
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [Babel](https://babeljs.io/) - JavaScript compiler for modern features
