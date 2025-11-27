---
sidebar_position: 25
---

# Design Patterns in JavaScript

## Creational Patterns

### Singleton

Ensure only one instance exists.

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.data = [];
  }

  addData(item) {
    this.data.push(item);
  }

  getData() {
    return this.data;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true
```

### Factory

Create objects without specifying exact class.

```javascript
class Dog {
  speak() { return "Woof!"; }
}

class Cat {
  speak() { return "Meow!"; }
}

class AnimalFactory {
  createAnimal(type) {
    switch(type) {
      case 'dog': return new Dog();
      case 'cat': return new Cat();
      default: throw new Error('Unknown animal');
    }
  }
}

const factory = new AnimalFactory();
const dog = factory.createAnimal('dog');
console.log(dog.speak()); // "Woof!"
```

### Builder

Construct complex objects step by step.

```javascript
class UserBuilder {
  constructor() {
    this.user = {};
  }

  setName(name) {
    this.user.name = name;
    return this;
  }

  setAge(age) {
    this.user.age = age;
    return this;
  }

  setEmail(email) {
    this.user.email = email;
    return this;
  }

  build() {
    return this.user;
  }
}

const user = new UserBuilder()
  .setName('John')
  .setAge(30)
  .setEmail('john@example.com')
  .build();
```

## Structural Patterns

### Module

Encapsulate code into modules.

```javascript
const CounterModule = (function() {
  let count = 0; // Private

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

console.log(CounterModule.increment()); // 1
console.log(CounterModule.getCount());  // 1
```

### Decorator

Add behavior to objects dynamically.

```javascript
class Coffee {
  cost() {
    return 5;
  }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 2;
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }

  cost() {
    return this.coffee.cost() + 1;
  }
}

let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);

console.log(coffee.cost()); // 8
```

### Proxy

Control access to an object.

```javascript
const user = {
  name: 'John',
  age: 30
};

const handler = {
  get(target, prop) {
    console.log(`Accessing ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const proxyUser = new Proxy(user, handler);
proxyUser.name; // "Accessing name"
proxyUser.age = 31; // "Setting age to 31"
```

## Behavioral Patterns

### Observer (Pub/Sub)

Subscribe to and notify events.

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

const emitter = new EventEmitter();

emitter.on('userLogin', (user) => {
  console.log(`${user} logged in`);
});

emitter.emit('userLogin', 'John'); // "John logged in"
```

### Strategy

Select algorithm at runtime.

```javascript
class PaymentStrategy {
  pay(amount) {}
}

class CreditCardStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} with credit card`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} with PayPal`);
  }
}

class ShoppingCart {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  checkout(amount) {
    this.strategy.pay(amount);
  }
}

const cart = new ShoppingCart(new CreditCardStrategy());
cart.checkout(100); // "Paid 100 with credit card"

cart.setStrategy(new PayPalStrategy());
cart.checkout(50); // "Paid 50 with PayPal"
```

### Command

Encapsulate requests as objects.

```javascript
class Command {
  execute() {}
}

class LightOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }

  execute() {
    this.light.on();
  }
}

class Light {
  on() {
    console.log('Light is ON');
  }

  off() {
    console.log('Light is OFF');
  }
}

class RemoteControl {
  submit(command) {
    command.execute();
  }
}

const light = new Light();
const lightOn = new LightOnCommand(light);
const remote = new RemoteControl();

remote.submit(lightOn); // "Light is ON"
```

## Key Takeaways

- **Singleton** - One instance only
- **Factory** - Create objects without specifying class
- **Observer** - Pub/sub pattern for events
- **Strategy** - Select algorithm at runtime
- **Decorator** - Add behavior dynamically
- **Module** - Encapsulate private data

## Resources

- [Patterns.dev](https://www.patterns.dev/)
- [JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
