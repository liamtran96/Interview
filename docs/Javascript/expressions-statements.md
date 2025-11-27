---
sidebar_position: 20
---

# Expressions vs Statements

## What's the Difference?

**Expression**: Produces a value
**Statement**: Performs an action

```javascript
// Expression - produces value
5 + 3;
"hello";
myFunction();
x > 10 ? "yes" : "no";

// Statement - performs action
let x = 5;
if (x > 10) { }
for (let i = 0; i < 10; i++) { }
```

## Expressions

### Types of Expressions

```javascript
// Arithmetic expression
2 + 2;  // 4

// String expression
"Hello" + " World";  // "Hello World"

// Logical expression
true && false;  // false

// Function expression
const add = function(a, b) { return a + b; };

// Arrow function expression
const multiply = (a, b) => a * b;

// Object expression
({ name: "John", age: 30 });

// Array expression
[1, 2, 3];

// Ternary expression
age >= 18 ? "adult" : "minor";

// Assignment expression (produces value!)
x = 5;  // Produces 5
```

**Key**: All expressions can be used where a value is expected.

```javascript
// Expression as function argument
console.log(2 + 2);  // 2 + 2 is expression

// Expression in array
const arr = [1, 2 + 3, 4];  // 2 + 3 is expression

// Expression in object
const obj = { result: 5 * 2 };  // 5 * 2 is expression
```

## Statements

### Types of Statements

```javascript
// Variable declaration statement
let x = 10;
const name = "John";

// If statement
if (x > 5) {
  console.log("Greater");
}

// Loop statements
for (let i = 0; i < 10; i++) { }
while (condition) { }

// Switch statement
switch (value) {
  case 1:
    break;
  default:
    break;
}

// Try-catch statement
try {
  // code
} catch (error) {
  // handle error
}

// Return statement
function example() {
  return value;
}

// Break/Continue statements
break;
continue;

// Import/Export statements
import { something } from './module';
export default value;
```

**Key**: Statements cannot be used where a value is expected.

```javascript
// ✗ Can't use statement where value expected
console.log(if (true) { 5 }); // SyntaxError

// ✓ Must use expression
console.log(true ? 5 : 0); // Works
```

## Expression Statements

Some expressions can be used as statements:

```javascript
// Function call (expression used as statement)
console.log("Hello");

// Assignment (expression used as statement)
x = 5;

// Increment (expression used as statement)
x++;
```

## Function Expressions vs Function Declarations

### Function Declaration (Statement)

```javascript
// Function Declaration
function greet() {
  return "Hello";
}

// Hoisted - can call before declaration
sayHi();
function sayHi() {
  return "Hi";
}
```

### Function Expression

```javascript
// Function Expression
const greet = function() {
  return "Hello";
};

// Not hoisted - cannot call before
// sayHi(); // ✗ Error
const sayHi = function() {
  return "Hi";
};
```

### IIFE (Immediately Invoked Function Expression)

```javascript
// Expression (wrapped in parentheses)
(function() {
  console.log("IIFE");
})();

// Also expression
(function() {
  console.log("IIFE");
}());
```

## Common Interview Questions

### Q1: What's the difference between expression and statement?

**Answer:**

**Expression**: Produces a value
```javascript
2 + 2;
"hello";
true && false;
x > 10 ? "yes" : "no";
```

**Statement**: Performs an action
```javascript
let x = 5;
if (x > 10) { }
for (...) { }
```

**Key difference**: Expressions can be used where values are needed, statements cannot.

### Q2: Can you use if as an expression?

**Answer:**

No, `if` is a statement. Use **ternary operator** for conditional expressions:

```javascript
// ✗ Can't use if as expression
const value = if (true) { 5 } else { 0 };  // SyntaxError

// ✓ Use ternary
const value = true ? 5 : 0;  // Works
```

## Key Takeaways

- **Expression** = produces value
- **Statement** = performs action
- Expressions can be used where values needed
- Statements cannot be used as values
- Some expressions can be statements
- Ternary operator is expression, if is statement

## Resources

- [MDN Expressions and Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [MDN Statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)
