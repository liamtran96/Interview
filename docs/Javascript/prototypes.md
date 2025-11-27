---
sidebar_position: 4
---

# Prototypal Inheritance

## What is a Prototype?

In JavaScript, every object has an internal link to another object called its **prototype**. When you try to access a property, JavaScript first looks in the object itself, then in its prototype, then the prototype's prototype, and so on up the **prototype chain**.

:::info Key Concept
JavaScript is a prototype-based language. Inheritance is achieved through prototypes, not traditional classes (even ES6 classes use prototypes under the hood).
:::

## The Prototype Chain

```javascript
const animal = {
  eats: true,
  walk() {
    console.log('Animal walks');
  }
};

const rabbit = {
  jumps: true
};

// Set animal as prototype of rabbit
rabbit.__proto__ = animal;

console.log(rabbit.eats);  // true (found in prototype)
console.log(rabbit.jumps); // true (found in rabbit itself)
rabbit.walk();             // "Animal walks" (inherited from animal)
```

### How the Lookup Works

```javascript
const obj = { a: 1 };
obj.__proto__ = { b: 2 };
obj.__proto__.__proto__ = { c: 3 };

console.log(obj.a); // 1 (found in obj)
console.log(obj.b); // 2 (found in obj.__proto__)
console.log(obj.c); // 3 (found in obj.__proto__.__proto__)
console.log(obj.d); // undefined (not found anywhere in chain)
```

**Lookup order:**
1. `obj` itself
2. `obj.__proto__`
3. `obj.__proto__.__proto__`
4. ...continues until `null`

## `__proto__` vs `prototype`

This is the most confusing part for beginners. They are **different things**:

### `__proto__` - The Actual Prototype Link

```javascript
const obj = {};
console.log(obj.__proto__); // Object.prototype

// __proto__ is the ACTUAL prototype of an object
// It's what JavaScript uses for the prototype chain
```

### `prototype` - Constructor's Template

```javascript
function Person(name) {
  this.name = name;
}

// Person.prototype is used when creating new instances
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const john = new Person('John');

// john's __proto__ points to Person.prototype
console.log(john.__proto__ === Person.prototype); // true
```

### The Relationship

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return `${this.name} is eating`;
};

const dog = new Animal('Buddy');

// KEY RELATIONSHIPS:
console.log(dog.__proto__ === Animal.prototype);              // true
console.log(Animal.prototype.constructor === Animal);         // true
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true
```

**Diagram:**
```
dog {name: "Buddy"}
  ↓ __proto__
Animal.prototype {eat: function, constructor: Animal}
  ↓ __proto__
Object.prototype {toString: function, ...}
  ↓ __proto__
null
```

## Constructor Functions

### Basic Constructor

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add method to prototype
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}, ${this.age} years old`;
};

const person1 = new Person('John', 30);
const person2 = new Person('Jane', 25);

console.log(person1.greet()); // "Hello, I'm John, 30 years old"
console.log(person2.greet()); // "Hello, I'm Jane, 25 years old"

// Both share the same method (memory efficient)
console.log(person1.greet === person2.greet); // true
```

### What Happens with `new`

```javascript
function Person(name) {
  // 1. A new empty object is created
  // 2. This object's __proto__ is set to Person.prototype
  // 3. 'this' is bound to the new object
  this.name = name;
  // 4. The new object is returned (unless you explicitly return an object)
}

const person = new Person('John');

// Equivalent to:
const person = {
  name: 'John',
  __proto__: Person.prototype
};
```

### Forgetting `new` - Common Mistake

```javascript
function Person(name) {
  this.name = name;
}

// ❌ WRONG - Forgot 'new'
const person = Person('John');
console.log(person);      // undefined
console.log(window.name); // "John" (created global variable!)

// ✅ CORRECT
const person = new Person('John');
console.log(person.name); // "John"
```

## Inheritance with Prototypes

### Prototype Chain Inheritance

```javascript
// Parent constructor
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return `${this.name} is eating`;
};

Animal.prototype.sleep = function() {
  return `${this.name} is sleeping`;
};

// Child constructor
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific method
Dog.prototype.bark = function() {
  return `${this.name} says Woof!`;
};

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.eat());   // "Buddy is eating" (inherited)
console.log(dog.sleep()); // "Buddy is sleeping" (inherited)
console.log(dog.bark());  // "Buddy says Woof!" (own method)
```

### Why Object.create()?

```javascript
// ❌ WRONG WAY
Dog.prototype = Animal.prototype;
// Problem: Modifying Dog.prototype also modifies Animal.prototype

// ❌ ALSO WRONG
Dog.prototype = new Animal();
// Problem: Calls Animal constructor (side effects, unnecessary instance properties)

// ✅ CORRECT WAY
Dog.prototype = Object.create(Animal.prototype);
// Creates new object with Animal.prototype as __proto__
// No side effects, clean inheritance
```

## Object.create()

### What is Object.create()?

```javascript
// Object.create(proto) creates a new object with proto as its [[Prototype]]

const animal = {
  eats: true,
  walk() {
    console.log('Walking...');
  }
};

// Create new object with animal as prototype
const rabbit = Object.create(animal);

rabbit.jumps = true;

console.log(rabbit.eats);  // true (inherited)
console.log(rabbit.jumps); // true (own property)
rabbit.walk();             // "Walking..." (inherited)

console.log(rabbit.__proto__ === animal); // true
```

### Object.create() with Properties

```javascript
const person = Object.create(Object.prototype, {
  name: {
    value: 'John',
    writable: true,
    enumerable: true,
    configurable: true
  },
  age: {
    value: 30,
    writable: true,
    enumerable: true,
    configurable: true
  }
});

console.log(person.name); // "John"
console.log(person.age);  // 30
```

### Creating Object with No Prototype

```javascript
// Create object with NO prototype
const obj = Object.create(null);

console.log(obj.__proto__);           // undefined
console.log(obj.toString);            // undefined
console.log(Object.getPrototypeOf(obj)); // null

// Useful for creating "clean" objects (dictionaries)
// No inherited properties, no surprises
```

## Checking Prototypes

### instanceof

```javascript
function Animal() {}
function Dog() {}

Dog.prototype = Object.create(Animal.prototype);

const dog = new Dog();

console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
```

### isPrototypeOf()

```javascript
const animal = {
  eats: true
};

const rabbit = Object.create(animal);

console.log(animal.isPrototypeOf(rabbit)); // true
console.log(Object.prototype.isPrototypeOf(rabbit)); // true
```

### hasOwnProperty()

```javascript
const animal = {
  eats: true
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log('jumps' in rabbit); // true
console.log('eats' in rabbit);  // true (inherited)

console.log(rabbit.hasOwnProperty('jumps')); // true (own property)
console.log(rabbit.hasOwnProperty('eats'));  // false (inherited)
```

### Object.getPrototypeOf()

```javascript
const animal = { eats: true };
const rabbit = Object.create(animal);

console.log(Object.getPrototypeOf(rabbit) === animal); // true

// Modern way (preferred over __proto__)
Object.setPrototypeOf(rabbit, { jumps: true });
```

## Common Interview Questions

### Q1: Explain the difference between `__proto__` and `prototype`

**Answer:**

**`prototype`** is a property of **constructor functions**:
- Used as a template when creating instances with `new`
- Defines what the `__proto__` of instances will be

**`__proto__`** is a property of **all objects**:
- Points to the actual prototype object
- Used for the prototype chain lookup

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, ${this.name}`;
};

const john = new Person('John');

// Person.prototype - Template for instances
console.log(typeof Person.prototype); // "object"

// john.__proto__ - Actual prototype of john
console.log(john.__proto__ === Person.prototype); // true

// Person.prototype.constructor points back to Person
console.log(Person.prototype.constructor === Person); // true
```

### Q2: How do you implement inheritance in JavaScript?

**Answer:**

**Modern way (ES6 Classes):**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return `${this.name} eats`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    return `${this.name} barks`;
  }
}

const dog = new Dog('Buddy', 'Lab');
console.log(dog.eat());  // "Buddy eats" (inherited)
console.log(dog.bark()); // "Buddy barks"
```

**Traditional way (Prototypes):**
```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  return `${this.name} eats`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  return `${this.name} barks`;
};
```

### Q3: What happens when you access a property on an object?

**Answer:**

JavaScript follows the **prototype chain**:

```javascript
const obj = { a: 1 };
obj.__proto__ = { b: 2 };
obj.__proto__.__proto__ = { c: 3 };

// Accessing obj.b:
// 1. Look in obj itself - NOT FOUND
// 2. Look in obj.__proto__ - FOUND! Return 2
```

**Steps:**
1. Check if property exists on object itself
2. If not, check object's prototype (`__proto__`)
3. If not, check prototype's prototype
4. Continue up the chain until `null`
5. If never found, return `undefined`

**Performance note:** Deeper chains are slower. Keep inheritance shallow.

### Q4: How do you create an object without a prototype?

**Answer:**

```javascript
// Object with no prototype
const obj = Object.create(null);

console.log(obj.__proto__);        // undefined
console.log(obj.toString);         // undefined
console.log(Object.keys(obj));     // []

// Safe to use as pure dictionary
obj.hasOwnProperty = 'value'; // ✓ No conflicts
obj.toString = 'string';      // ✓ No conflicts
```

**Use cases:**
- Dictionary/hash maps - No inherited properties
- Avoid property name conflicts
- Performance - No prototype chain lookup

### Q5: Why should you use Object.create() instead of `new` for inheritance?

**Answer:**

```javascript
function Animal() {
  this.eats = true;
}

// ❌ WRONG
function Dog() {}
Dog.prototype = new Animal();
// Problems:
// 1. Calls Animal constructor (side effects)
// 2. Creates unnecessary instance properties
// 3. Animal's constructor runs every time

// ✅ CORRECT
function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
// Benefits:
// 1. No constructor call
// 2. Clean prototype chain
// 3. No unnecessary properties
```

### Q6: What is the prototype chain of a regular object?

**Answer:**

```javascript
const obj = { a: 1 };

// Prototype chain:
obj
  → Object.prototype (has toString, hasOwnProperty, etc.)
    → null

console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__);         // null
```

**For arrays:**
```javascript
const arr = [1, 2, 3];

// Prototype chain:
arr
  → Array.prototype (has push, pop, map, etc.)
    → Object.prototype (has toString, hasOwnProperty, etc.)
      → null

console.log(arr.__proto__ === Array.prototype);           // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
```

## Advanced Patterns

### Mixins

```javascript
// Mixin - add functionality from multiple sources
const canEat = {
  eat() {
    return `${this.name} is eating`;
  }
};

const canWalk = {
  walk() {
    return `${this.name} is walking`;
  }
};

const canSwim = {
  swim() {
    return `${this.name} is swimming`;
  }
};

function Person(name) {
  this.name = name;
}

// Copy methods from mixins
Object.assign(Person.prototype, canEat, canWalk);

const john = new Person('John');
console.log(john.eat());  // "John is eating"
console.log(john.walk()); // "John is walking"
// john.swim(); // Error - not included
```

### Prototypal Inheritance Without Constructors

```javascript
// Pure prototypal pattern (no constructors)
const animal = {
  init(name) {
    this.name = name;
    return this;
  },
  eat() {
    return `${this.name} is eating`;
  }
};

const rabbit = Object.create(animal).init('Fluffy');
console.log(rabbit.eat()); // "Fluffy is eating"
```

## Best Practices

1. **Use ES6 classes** - Cleaner syntax than prototypes
2. **Avoid `__proto__`** - Use `Object.getPrototypeOf()` and `Object.setPrototypeOf()`
3. **Keep chains shallow** - Deep prototype chains slow property access
4. **Use `hasOwnProperty()`** - To check own vs inherited properties
5. **Don't modify native prototypes** - Avoid `Array.prototype.myMethod = ...`
6. **Use Object.create()** - For clean inheritance without constructor calls
7. **Prefer composition** - Over deep inheritance hierarchies

## Key Takeaways

- Every object has a prototype (internal `[[Prototype]]` link)
- Prototype chain: object → prototype → prototype's prototype → ... → null
- `prototype` is for constructor functions, `__proto__` is for instances
- `new` creates object with constructor's prototype
- Object.create() creates object with specified prototype
- Classes are syntactic sugar over prototypes
- JavaScript uses prototypal inheritance, not classical inheritance

## Resources

- [MDN Inheritance and the Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [JavaScript.info Prototypes](https://javascript.info/prototypes)
- [You Don't Know JS: this & Object Prototypes](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/README.md)
