---
sidebar_position: 18
---

# JavaScript Type Systems

## Types of Typing

JavaScript is **dynamically typed** and uses **duck typing**, but understanding different typing systems helps in interviews and when working with TypeScript.

## 1. Dynamic vs Static Typing

### Dynamic Typing (JavaScript)

Types are checked at **runtime**. Variables can hold any type.

```javascript
let x = 42;        // number
x = "hello";       // now string
x = true;          // now boolean
x = { id: 1 };     // now object

// No errors - JavaScript allows this
```

### Static Typing (TypeScript, Java, C++)

Types are checked at **compile time**. Variables have fixed types.

```typescript
// TypeScript
let x: number = 42;
x = "hello"; // ✗ Error: Type 'string' is not assignable to type 'number'
```

## 2. Implicit vs Explicit Type Conversion

### Implicit Coercion (Automatic)

JavaScript automatically converts types when needed.

```javascript
// String coercion
console.log("5" + 3);      // "53" (number → string)
console.log("5" - 3);      // 2 (string → number)
console.log("5" * "2");    // 10 (both → numbers)

// Boolean coercion
if ("hello") {             // string → true
  console.log("Truthy");
}

if (0) {                   // 0 → false
  console.log("Won't run");
}

// Comparison coercion
console.log(5 == "5");     // true (loose equality, type coercion)
console.log(null == undefined); // true (special case)
console.log(0 == false);   // true (0 → false)
```

**Implicit coercion rules:**
```javascript
// To String
String(123)           // "123"
123 + ""              // "123"

// To Number  
Number("123")         // 123
+"123"                // 123
"123" - 0             // 123

// To Boolean
Boolean(1)            // true
!!1                   // true
```

### Explicit Conversion (Manual)

Deliberately convert types using constructors or methods.

```javascript
// To String
String(123);           // "123"
(123).toString();      // "123"
JSON.stringify(obj);   // '{"key":"value"}'

// To Number
Number("123");         // 123
parseInt("123");       // 123
parseFloat("3.14");    // 3.14
+"123";                // 123 (unary plus)

// To Boolean
Boolean(1);            // true
!!1;                   // true (double negation)

// To Object
Object("hello");       // String object
```

**Best practice:** Use explicit conversion for clarity.

```javascript
// ❌ Implicit (unclear)
const total = value + "";

// ✅ Explicit (clear intent)
const total = String(value);
```

## 3. Nominal vs Structural Typing

### Nominal Typing (Java, C++)

Types match by **name**.

```java
// Java - nominal typing
class Animal {}
class Dog extends Animal {}

Animal a = new Dog(); // ✓ Works (Dog IS-A Animal by name)
```

### Structural Typing (TypeScript)

Types match by **structure** (shape).

```typescript
// TypeScript - structural typing
interface Point {
  x: number;
  y: number;
}

interface Coordinate {
  x: number;
  y: number;
}

const point: Point = { x: 1, y: 2 };
const coord: Coordinate = point; // ✓ Works (same structure)
```

**JavaScript uses duck typing** (runtime version of structural typing).

## 4. Duck Typing

"If it walks like a duck and quacks like a duck, it's a duck."

JavaScript doesn't care about types, only **behavior** (what properties/methods it has).

```javascript
// Not actual ducks, but behave like ducks
const duck = {
  quack() { console.log("Quack!"); }
};

const person = {
  quack() { console.log("I can quack!"); }
};

const robot = {
  quack() { console.log("Beep quack!"); }
};

// Function doesn't check type, only behavior
function makeItQuack(thing) {
  if (thing.quack) {
    thing.quack(); // Works for anything with quack()
  }
}

makeItQuack(duck);   // "Quack!"
makeItQuack(person); // "I can quack!"
makeItQuack(robot);  // "Beep quack!"
```

**Real-world example:**

```javascript
// Array-like objects (not arrays, but behave like arrays)
function example() {
  // 'arguments' is array-like (has length, indices)
  console.log(arguments.length);        // Works
  console.log(arguments[0]);            // Works
  // arguments.push(1);                 // ✗ Doesn't work (not real array)
  
  // Convert to real array
  const arr = Array.from(arguments);    // ✓ Works
  arr.push(1);                          // ✓ Works
}

example(1, 2, 3);
```

**Duck typing in practice:**

```javascript
// Iterable protocol - anything with [Symbol.iterator]
const customIterable = {
  [Symbol.iterator]() {
    let i = 0;
    return {
      next() {
        return i < 3 
          ? { value: i++, done: false }
          : { done: true };
      }
    };
  }
};

// for...of works (duck typing - has iterator)
for (let val of customIterable) {
  console.log(val); // 0, 1, 2
}
```

## Type Checking in JavaScript

### typeof Operator

```javascript
console.log(typeof 42);              // "number"
console.log(typeof "hello");         // "string"
console.log(typeof true);            // "boolean"
console.log(typeof undefined);       // "undefined"
console.log(typeof Symbol());        // "symbol"
console.log(typeof 100n);            // "bigint"
console.log(typeof {});              // "object"
console.log(typeof []);              // "object" ⚠️
console.log(typeof null);            // "object" ⚠️ (historical bug)
console.log(typeof function(){});    // "function"
```

**Better type checking:**

```javascript
// Array check
Array.isArray([]);              // true
Array.isArray({});              // false

// Null check
value === null;                 // true only for null

// Object check (not null, not array)
typeof value === 'object' && value !== null && !Array.isArray(value);

// instanceof (checks prototype chain)
[] instanceof Array;            // true
new Date() instanceof Date;     // true
```

### instanceof Operator

```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(dog instanceof Dog);      // true
console.log(dog instanceof Animal);   // true
console.log(dog instanceof Object);   // true

// Primitives
console.log("hello" instanceof String); // false (primitive)
console.log(new String("hello") instanceof String); // true (object)
```

## Common Interview Questions

### Q1: What is the difference between implicit and explicit type conversion?

**Answer:**

**Implicit (Coercion):** JavaScript automatically converts types
```javascript
"5" + 3;           // "53" (number → string)
"5" - 3;           // 2 (string → number)
if ("hello") {}    // string → boolean
```

**Explicit (Conversion):** Manually convert using functions
```javascript
String(3);         // "3"
Number("5");       // 5
Boolean("hello");  // true
```

### Q2: What is duck typing?

**Answer:**

**Duck typing**: "If it looks like a duck and quacks like a duck, it's a duck."

JavaScript checks **behavior**, not **type**.

```javascript
function makeNoise(animal) {
  if (animal.speak) {
    animal.speak(); // Don't care what type, just needs speak()
  }
}

const dog = { speak: () => console.log("Woof") };
const cat = { speak: () => console.log("Meow") };

makeNoise(dog); // Works
makeNoise(cat); // Works
```

### Q3: What are falsy values in JavaScript?

**Answer:**

**6 falsy values:**
1. `false`
2. `0` (and `-0`)
3. `""` (empty string)
4. `null`
5. `undefined`
6. `NaN`

**Everything else is truthy:**
```javascript
if ([]) {}      // ✓ Runs (empty array is truthy!)
if ({}) {}      // ✓ Runs (empty object is truthy!)
if ("0") {}     // ✓ Runs (string "0" is truthy!)
if ("false") {} // ✓ Runs (string "false" is truthy!)
```

### Q4: Explain == vs ===

**Answer:**

**`==` (Loose equality):** Compares values with type coercion
```javascript
5 == "5";              // true (coerces "5" to 5)
null == undefined;     // true (special case)
0 == false;            // true (0 coerced to false)
```

**`===` (Strict equality):** Compares values AND types, no coercion
```javascript
5 === "5";             // false (different types)
null === undefined;    // false (different types)
0 === false;           // false (different types)
```

**Best practice:** Always use `===` and `!==`

## Type Coercion Gotchas

```javascript
// String concatenation wins
console.log(1 + 2 + "3");     // "33" (not "123")
console.log("3" + 1 + 2);     // "312"

// Math operations convert to numbers
console.log("5" - 2);         // 3
console.log("5" * "2");       // 10
console.log("5" / "2");       // 2.5

// Arrays in math
console.log([1] + [2]);       // "12" (both → strings)
console.log([1] - [2]);       // -1 (both → numbers)

// Objects
console.log({} + {});         // "[object Object][object Object]"
console.log({} - {});         // NaN

// Equality quirks
console.log([] == ![]);       // true ⚠️
console.log([] == false);     // true ⚠️
console.log("" == false);     // true ⚠️
```

## Best Practices

1. **Use strict equality** (`===`) instead of loose (`==`)
2. **Explicit conversion** over implicit when intent matters
3. **Type checking** - Use `typeof`, `Array.isArray()`, `instanceof`
4. **Avoid** relying on type coercion tricks
5. **TypeScript** - Consider for large projects (static typing)
6. **JSDoc comments** - Add type hints in plain JavaScript

```javascript
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}
```

## Key Takeaways

- **Dynamic typing** - Types checked at runtime
- **Implicit coercion** - Automatic type conversion
- **Explicit conversion** - Manual type conversion
- **Duck typing** - Check behavior, not type
- **Structural typing** - Match by structure (TypeScript)
- **Nominal typing** - Match by name (Java, C++)
- Use `===` for comparisons
- Understand falsy values
- Be aware of type coercion gotchas

## Resources

- [MDN Type Coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)
- [JavaScript.info Type Conversions](https://javascript.info/type-conversions)
- [You Don't Know JS: Types & Grammar](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/types%20%26%20grammar/README.md)
