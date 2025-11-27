---
sidebar_position: 27
---

# OOP Principles: Inheritance, Polymorphism, Code Reuse

## Four Pillars of OOP

### 1. Encapsulation

Hide internal state and require interaction through methods.

```javascript
class BankAccount {
  #balance = 0; // Private field

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return amount;
    }
    return 0;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
// account.#balance; // SyntaxError: Private field
```

### 2. Inheritance

Child classes inherit from parent classes.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }

  sleep() {
    console.log(`${this.name} is sleeping`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  // Override
  speak() {
    console.log(`${this.name} barks`);
  }

  // New method
  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

const dog = new Dog('Buddy', 'Labrador');
dog.speak();  // "Buddy barks" (overridden)
dog.sleep();  // "Buddy is sleeping" (inherited)
dog.fetch();  // "Buddy fetches the ball" (new)
```

### 3. Polymorphism

Objects of different types can be used through same interface.

```javascript
class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }

  area() {
    return this.side ** 2;
  }
}

// Polymorphism - same method, different behavior
function printArea(shape) {
  console.log(`Area: ${shape.area()}`);
}

printArea(new Circle(5));  // Different implementation
printArea(new Square(4));  // Different implementation
```

### 4. Abstraction

Hide complex implementation details, show only necessary features.

```javascript
class CoffeeMachine {
  #waterAmount = 0;
  #temperature = 0;

  // Simple public interface
  makeCoffee() {
    this.#boilWater();
    this.#brewCoffee();
    this.#pour();
    return "Coffee ready!";
  }

  // Complex internal methods (hidden)
  #boilWater() {
    this.#temperature = 100;
  }

  #brewCoffee() {
    // Complex brewing logic
  }

  #pour() {
    this.#waterAmount = 0;
  }
}

const machine = new CoffeeMachine();
machine.makeCoffee(); // Simple interface, complex internals hidden
```

## Code Reuse Patterns

### Composition Over Inheritance

```javascript
// ❌ Inheritance (tight coupling)
class FlyingDog extends Dog, Flying { } // Can't extend multiple!

// ✅ Composition (flexible)
const canFly = {
  fly() {
    console.log('Flying!');
  }
};

const canSwim = {
  swim() {
    console.log('Swimming!');
  }
};

class Duck {
  constructor() {
    Object.assign(this, canFly, canSwim);
  }
}

const duck = new Duck();
duck.fly();  // "Flying!"
duck.swim(); // "Swimming!"
```

### Mixins

```javascript
const timestampMixin = {
  createdAt: Date.now(),
  updatedAt: Date.now(),
  
  touch() {
    this.updatedAt = Date.now();
  }
};

class User {
  constructor(name) {
    this.name = name;
    Object.assign(this, timestampMixin);
  }
}

const user = new User('John');
console.log(user.createdAt); // timestamp
user.touch();
console.log(user.updatedAt); // updated timestamp
```

## SOLID Principles

### S - Single Responsibility

```javascript
// ❌ Multiple responsibilities
class User {
  constructor(name) {
    this.name = name;
  }

  save() {
    // Save to database
  }

  sendEmail() {
    // Send email
  }

  generateReport() {
    // Generate report
  }
}

// ✅ Single responsibility each
class User {
  constructor(name) {
    this.name = name;
  }
}

class UserRepository {
  save(user) {
    // Save to database
  }
}

class EmailService {
  send(user, message) {
    // Send email
  }
}
```

### O - Open/Closed

Open for extension, closed for modification.

```javascript
// ✅ Open/Closed
class Discount {
  calculate(order) {
    return 0;
  }
}

class PercentageDiscount extends Discount {
  constructor(percent) {
    super();
    this.percent = percent;
  }

  calculate(order) {
    return order.total * (this.percent / 100);
  }
}

class FixedDiscount extends Discount {
  constructor(amount) {
    super();
    this.amount = amount;
  }

  calculate(order) {
    return this.amount;
  }
}
```

### L - Liskov Substitution

Subtypes must be substitutable for base types.

```javascript
class Bird {
  fly() {
    console.log('Flying');
  }
}

// ❌ Violates LSP (Penguin can't fly)
class Penguin extends Bird {
  fly() {
    throw new Error("Can't fly");
  }
}

// ✅ Proper design
class Bird {
  move() {
    console.log('Moving');
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log('Flying');
  }
}

class Penguin extends Bird {
  swim() {
    console.log('Swimming');
  }
}
```

## Key Takeaways

- **Encapsulation** - Hide internal state
- **Inheritance** - Reuse code through parent-child relationship
- **Polymorphism** - Same interface, different implementations
- **Abstraction** - Hide complexity
- **Composition > Inheritance** - More flexible
- **SOLID** - Principles for better OOP design

## Resources

- [MDN OOP](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_programming)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
