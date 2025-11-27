---
sidebar_position: 3
---

# ES6 Classes & Object-Oriented Programming

## What are ES6 Classes?

**ES6 Classes** are syntactic sugar over JavaScript's existing prototype-based inheritance. They provide a cleaner, more intuitive syntax for creating objects and implementing inheritance.

:::info Note
Classes are just functions under the hood. They don't introduce a new object-oriented model to JavaScript.
:::

## Class Syntax

### Basic Class Declaration

```javascript
class Person {
  // Constructor - runs when new instance is created
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // Method (added to prototype)
  greet() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }

  // Method
  birthday() {
    this.age++;
  }
}

// Create instance
const john = new Person('John', 30);
console.log(john.greet()); // "Hello, I'm John and I'm 30 years old."
john.birthday();
console.log(john.age); // 31
```

### Class Expression

```javascript
// Named class expression
const Person = class PersonClass {
  constructor(name) {
    this.name = name;
  }
};

// Anonymous class expression
const Animal = class {
  constructor(name) {
    this.name = name;
  }
};
```

## Class Features

### Constructor

```javascript
class User {
  constructor(username, email) {
    // Instance properties
    this.username = username;
    this.email = email;
    this.createdAt = new Date();
  }
}

const user = new User('john_doe', 'john@example.com');
console.log(user.username); // "john_doe"
console.log(user.createdAt); // Current date
```

**Rules:**
- Only one constructor per class
- Constructor is optional (default constructor is used if not provided)
- Must use `new` keyword to create instances

### Methods

```javascript
class Calculator {
  add(a, b) {
    return a + b;
  }

  subtract(a, b) {
    return a - b;
  }

  // Method with default parameters
  multiply(a, b = 1) {
    return a * b;
  }
}

const calc = new Calculator();
console.log(calc.add(5, 3));      // 8
console.log(calc.multiply(5));    // 5 (b defaults to 1)
```

### Getters and Setters

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius; // Convention: _ for private-like properties
  }

  // Getter - access like a property
  get radius() {
    return this._radius;
  }

  // Setter - set like a property
  set radius(value) {
    if (value <= 0) {
      throw new Error('Radius must be positive');
    }
    this._radius = value;
  }

  get diameter() {
    return this._radius * 2;
  }

  get area() {
    return Math.PI * this._radius ** 2;
  }
}

const circle = new Circle(5);
console.log(circle.radius);   // 5 (calls getter)
console.log(circle.diameter); // 10
console.log(circle.area);     // 78.54...

circle.radius = 10;           // Calls setter
console.log(circle.diameter); // 20

// circle.radius = -5;        // Error: Radius must be positive
```

### Static Methods and Properties

```javascript
class MathUtils {
  // Static method - called on class, not instance
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }

  // Static property (ES2022)
  static PI = 3.14159;

  // Instance method
  calculate() {
    return "Instance method";
  }
}

// Call static methods on class
console.log(MathUtils.add(5, 3));      // 8
console.log(MathUtils.PI);             // 3.14159

// Cannot call static method on instance
const utils = new MathUtils();
// utils.add(5, 3);  // Error: utils.add is not a function

// Can call instance method
console.log(utils.calculate()); // "Instance method"
```

**Common use cases for static methods:**
- Factory functions
- Utility functions
- Creating instances in specific ways

```javascript
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // Static factory method
  static createAdmin(name, email) {
    const user = new User(name, email);
    user.role = 'admin';
    return user;
  }

  static createGuest() {
    return new User('Guest', 'guest@example.com');
  }
}

const admin = User.createAdmin('John', 'john@example.com');
console.log(admin.role); // "admin"

const guest = User.createGuest();
console.log(guest.name); // "Guest"
```

## Inheritance

### Extends Keyword

```javascript
// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound.`;
  }

  sleep() {
    return `${this.name} is sleeping.`;
  }
}

// Child class extends parent
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // MUST call super() before using 'this'
    this.breed = breed;
  }

  // Override parent method
  speak() {
    return `${this.name} barks!`;
  }

  // New method
  fetch() {
    return `${this.name} fetches the ball!`;
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
console.log(dog.speak());  // "Buddy barks!" (overridden)
console.log(dog.sleep());  // "Buddy is sleeping." (inherited)
console.log(dog.fetch());  // "Buddy fetches the ball!" (new method)
console.log(dog.breed);    // "Golden Retriever"
```

### Super Keyword

```javascript
class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  getInfo() {
    return `${this.brand} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(brand, model, doors) {
    super(brand, model); // Call parent constructor
    this.doors = doors;
  }

  getInfo() {
    // Call parent method
    const parentInfo = super.getInfo();
    return `${parentInfo} with ${this.doors} doors`;
  }
}

const car = new Car('Toyota', 'Camry', 4);
console.log(car.getInfo()); // "Toyota Camry with 4 doors"
```

**Super rules:**
- Must call `super()` before accessing `this` in child constructor
- Use `super.methodName()` to call parent methods
- Cannot use `super` in regular functions (only in classes)

### Multi-level Inheritance

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    return `${this.name} is eating.`;
  }
}

class Mammal extends Animal {
  constructor(name, furColor) {
    super(name);
    this.furColor = furColor;
  }

  feedMilk() {
    return `${this.name} is feeding milk.`;
  }
}

class Dog extends Mammal {
  constructor(name, furColor, breed) {
    super(name, furColor);
    this.breed = breed;
  }

  bark() {
    return `${this.name} barks!`;
  }
}

const dog = new Dog('Buddy', 'brown', 'Labrador');
console.log(dog.eat());      // "Buddy is eating." (from Animal)
console.log(dog.feedMilk()); // "Buddy is feeding milk." (from Mammal)
console.log(dog.bark());     // "Buddy barks!" (from Dog)
```

## Private Fields (ES2022)

```javascript
class BankAccount {
  // Private field (starts with #)
  #balance = 0;
  #pin;

  constructor(initialBalance, pin) {
    this.#balance = initialBalance;
    this.#pin = pin;
  }

  // Public method to access private field
  getBalance(pin) {
    if (pin !== this.#pin) {
      throw new Error('Invalid PIN');
    }
    return this.#balance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  // Private method
  #validatePin(pin) {
    return pin === this.#pin;
  }

  withdraw(amount, pin) {
    if (!this.#validatePin(pin)) {
      throw new Error('Invalid PIN');
    }
    if (amount <= this.#balance) {
      this.#balance -= amount;
      return amount;
    }
    return 0;
  }
}

const account = new BankAccount(1000, '1234');
console.log(account.getBalance('1234')); // 1000

account.deposit(500);
console.log(account.getBalance('1234')); // 1500

// account.#balance;  // SyntaxError: Private field '#balance' must be declared
```

## Common Interview Questions

### Q1: What is the difference between class and function constructor?

**Answer:**

**Classes** (ES6):
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}
```

**Function Constructor** (ES5):
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, ${this.name}`;
};
```

**Key Differences:**

| Feature | Class | Function Constructor |
|---------|-------|---------------------|
| **Syntax** | Cleaner, more intuitive | More verbose |
| **Hoisting** | Not hoisted | Hoisted |
| **Strict mode** | Always in strict mode | Not by default |
| **`new` required** | Must use `new` | Works without `new` (creates global vars!) |
| **Methods** | Non-enumerable by default | Enumerable on prototype |
| **`super`** | Has `super` keyword | No `super` |

**Both create the same result:**
```javascript
const p1 = new Person('John');
const p2 = new Person('Jane');

console.log(p1.greet()); // "Hello, John"
console.log(p2.greet()); // "Hello, Jane"
```

### Q2: What happens if you don't call super() in a child class?

**Answer:**

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name, age) {
    // ❌ WRONG - No super() call
    this.age = age; // ReferenceError: Must call super constructor
  }
}

// ✅ CORRECT
class Child extends Parent {
  constructor(name, age) {
    super(name);  // MUST call super() first
    this.age = age;
  }
}
```

**Rule:** Must call `super()` before accessing `this` in a child class constructor.

**Why?** The parent constructor initializes the `this` object. Without calling `super()`, `this` doesn't exist yet.

### Q3: What are static methods and when to use them?

**Answer:**

**Static methods** belong to the class itself, not instances.

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  // Instance method
  greet() {
    return `Hello, ${this.name}`;
  }

  // Static method
  static compareAge(user1, user2) {
    return user1.age - user2.age;
  }

  static createAnonymous() {
    return new User('Anonymous');
  }
}

// Call on instance
const user = new User('John');
user.greet(); // ✓ Works

// Call on class
User.createAnonymous(); // ✓ Works
User.compareAge(user1, user2); // ✓ Works

// ❌ WRONG
user.createAnonymous(); // Error: not a function
```

**Use static methods for:**
1. **Utility functions** - Don't need instance data
2. **Factory functions** - Create instances in specific ways
3. **Comparison functions** - Compare multiple instances
4. **Constants** - Define class-level constants

### Q4: How do you create private fields in JavaScript classes?

**Answer:**

**ES2022 Private Fields** (Modern):
```javascript
class Person {
  #ssn; // Private field

  constructor(name, ssn) {
    this.name = name;  // Public
    this.#ssn = ssn;   // Private
  }

  getSSN(authorized) {
    if (authorized) {
      return this.#ssn;
    }
    return '***-**-****';
  }
}

const person = new Person('John', '123-45-6789');
console.log(person.name);     // "John" (public)
// console.log(person.#ssn);  // SyntaxError
console.log(person.getSSN(true)); // "123-45-6789"
```

**Old Pattern** (Convention with closures):
```javascript
function Person(name, ssn) {
  // Private variable (closure)
  let _ssn = ssn;

  // Public property
  this.name = name;

  // Public method accessing private variable
  this.getSSN = function(authorized) {
    if (authorized) {
      return _ssn;
    }
    return '***-**-****';
  };
}
```

### Q5: What is the difference between methods defined in constructor vs prototype?

**Answer:**

```javascript
class Person {
  constructor(name) {
    this.name = name;

    // Method in constructor - NEW COPY for each instance
    this.greet1 = function() {
      return `Hello, ${this.name}`;
    };
  }

  // Method on prototype - SHARED across all instances
  greet2() {
    return `Hello, ${this.name}`;
  }
}

const p1 = new Person('John');
const p2 = new Person('Jane');

console.log(p1.greet1 === p2.greet1); // false (different functions)
console.log(p1.greet2 === p2.greet2); // true (same function)
```

**Memory impact:**
- **Constructor methods**: Each instance gets its own copy (more memory)
- **Prototype methods**: All instances share one copy (less memory)

**Best practice:** Use prototype methods (class method syntax) unless you need unique functions per instance.

## OOP Principles in JavaScript

### 1. Encapsulation

```javascript
class User {
  #password;

  constructor(username, password) {
    this.username = username;
    this.#password = this.#hash(password);
  }

  #hash(password) {
    return `hashed_${password}`;
  }

  verifyPassword(password) {
    return this.#hash(password) === this.#password;
  }
}

const user = new User('john', 'secret123');
console.log(user.verifyPassword('secret123')); // true
// user.#password;  // Error: Cannot access private field
```

### 2. Inheritance

```javascript
class Shape {
  constructor(color) {
    this.color = color;
  }

  describe() {
    return `A ${this.color} shape`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  describe() {
    return `${super.describe()} with area ${this.area().toFixed(2)}`;
  }
}
```

### 3. Polymorphism

```javascript
class Animal {
  speak() {
    return 'Some sound';
  }
}

class Dog extends Animal {
  speak() {
    return 'Woof!';
  }
}

class Cat extends Animal {
  speak() {
    return 'Meow!';
  }
}

function makeAnimalSpeak(animal) {
  console.log(animal.speak()); // Polymorphism - same method, different behavior
}

makeAnimalSpeak(new Dog()); // "Woof!"
makeAnimalSpeak(new Cat()); // "Meow!"
```

### 4. Abstraction

```javascript
class Database {
  constructor(config) {
    this.config = config;
    this.#connect();
  }

  #connect() {
    // Complex connection logic hidden
    console.log('Connecting to database...');
  }

  #query(sql) {
    // Complex query logic hidden
    return [];
  }

  // Simple public interface
  getUsers() {
    return this.#query('SELECT * FROM users');
  }

  addUser(user) {
    return this.#query(`INSERT INTO users VALUES (${user})`);
  }
}

const db = new Database(config);
db.getUsers(); // Simple interface, complex logic hidden
```

## Best Practices

1. **Use class syntax** - Cleaner than function constructors
2. **Use private fields** - For true encapsulation (ES2022+)
3. **Prefer composition over inheritance** - Avoid deep inheritance chains
4. **Use static methods** - For utility functions and factories
5. **Call super() first** - In child class constructors
6. **Use getters/setters** - For validation and computed properties
7. **Keep classes focused** - Single Responsibility Principle
8. **Document public APIs** - Make clear what's public vs private

## Key Takeaways

- Classes are syntactic sugar over prototypes
- Use `extends` for inheritance, `super` for parent access
- Private fields (#) provide true encapsulation (ES2022+)
- Static methods belong to class, instance methods to instances
- Methods on prototype are shared, methods in constructor are duplicated
- JavaScript supports OOP principles: encapsulation, inheritance, polymorphism, abstraction

## Resources

- [MDN Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [JavaScript.info OOP](https://javascript.info/classes)
- [Private Class Features](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
