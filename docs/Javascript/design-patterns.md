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

## Real-World Examples

### 1. Singleton Pattern in Production

**Redux Store**

```javascript
// Redux uses Singleton to ensure one store per application
import { createStore } from 'redux';

const store = createStore(reducer);

// Throughout your app, you import the same store instance
export default store;

// Usage in different files
import store from './store';
store.dispatch(action); // Always same instance
```

**Database Connection**

```javascript
// MongoDB connection (real production code)
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = null;
    Database.instance = this;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }

    this.connection = await MongoClient.connect(process.env.MONGO_URI);
    return this.connection;
  }
}

// Usage across application
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true - same connection
```

### 2. Factory Pattern in Popular Libraries

**React.createElement**

```javascript
// React internally uses Factory pattern
React.createElement('div', { className: 'container' }, 'Hello');
React.createElement(MyComponent, { prop: 'value' });

// JSX is just syntactic sugar for factories
<div className="container">Hello</div>
// ↓ Compiled to ↓
React.createElement('div', { className: 'container' }, 'Hello');
```

**jQuery Element Creation**

```javascript
// jQuery uses Factory pattern extensively
$('<div>');        // Creates div element
$('<p>');          // Creates p element
$('<button>');     // Creates button element

// Different types of objects from same interface
$('#id');          // Creates jQuery object from ID
$('.class');       // Creates jQuery object from class
$('div');          // Creates jQuery object from tag
```

**Axios Instance Factory**

```javascript
// Create different HTTP clients with different configs
const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 1000,
  headers: { 'Authorization': 'Bearer token' }
});

const authClient = axios.create({
  baseURL: 'https://auth.example.com',
  timeout: 5000
});

// Each instance configured differently but same interface
apiClient.get('/users');
authClient.post('/login');
```

### 3. Observer Pattern in Frameworks

**Node.js EventEmitter**

```javascript
// Used extensively in Node.js
const EventEmitter = require('events');

class Server extends EventEmitter {
  start() {
    // Server logic...
    this.emit('started', { port: 3000 });
  }
}

const server = new Server();

server.on('started', (data) => {
  console.log(`Server running on port ${data.port}`);
});

server.on('started', (data) => {
  console.log('Log to monitoring system');
});

server.start();
```

**React/Vue State Management**

```javascript
// MobX uses Observer pattern
import { observable, autorun } from 'mobx';

const store = observable({
  count: 0,
  todos: []
});

// Auto-runs when observed data changes
autorun(() => {
  console.log('Count changed:', store.count);
});

store.count = 1; // Automatically triggers autorun
```

**DOM Events**

```javascript
// Browser DOM uses Observer pattern
button.addEventListener('click', handler1);
button.addEventListener('click', handler2);
button.addEventListener('click', handler3);

button.click(); // Notifies all observers
```

### 4. Module Pattern Evolution

**Classic Module Pattern**

```javascript
// Before ES6 Modules (still used in some legacy code)
const ShoppingCart = (function() {
  // Private variables
  let items = [];
  let total = 0;

  // Private methods
  function calculateTotal() {
    total = items.reduce((sum, item) => sum + item.price, 0);
  }

  // Public API
  return {
    addItem(item) {
      items.push(item);
      calculateTotal();
    },

    getTotal() {
      return total;
    },

    getItemCount() {
      return items.length;
    }
  };
})();

ShoppingCart.addItem({ name: 'Book', price: 20 });
console.log(ShoppingCart.getTotal()); // 20
// console.log(items); // Error: items is private
```

**Modern ES6 Modules**

```javascript
// utils.js - Module pattern with ES6
let cache = {}; // Private

function memoize(fn) {
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

export { memoize }; // Public API
// cache is private, can't be imported
```

### 5. Decorator Pattern in Middleware

**Express.js Middleware**

```javascript
// Express middleware is decorator pattern
const express = require('express');
const app = express();

// Each middleware decorates the request/response
app.use(express.json());              // Adds JSON parsing
app.use(authenticate);                 // Adds authentication
app.use(logger);                       // Adds logging
app.use(rateLimiter);                  // Adds rate limiting

app.get('/api/users', (req, res) => {
  // Request has been decorated by all middleware
  res.json(users);
});
```

**TypeScript/Babel Decorators**

```javascript
// Real-world decorators in TypeScript
class UserService {
  @Cache(60) // Cache for 60 seconds
  @Log       // Log method calls
  @Retry(3)  // Retry 3 times on failure
  async getUser(id) {
    return fetch(`/api/users/${id}`);
  }
}
```

**Higher-Order Components (React)**

```javascript
// HOC is decorator pattern in React
function withAuth(Component) {
  return function AuthComponent(props) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };
}

// Decorate components
const ProtectedProfile = withAuth(Profile);
const ProtectedDashboard = withAuth(Dashboard);
```

### 6. Strategy Pattern for Flexibility

**Passport.js Authentication**

```javascript
// Different authentication strategies
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;

// Local strategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    // Authenticate with username/password
  }
));

// Google OAuth strategy
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {
  // Authenticate with Google
}));

// Switch strategy at runtime
app.post('/login', passport.authenticate('local'));
app.get('/auth/google', passport.authenticate('google'));
```

**Payment Processing**

```javascript
// Real e-commerce payment strategies
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  processPayment(amount) {
    return this.strategy.pay(amount);
  }
}

class StripeStrategy {
  async pay(amount) {
    const stripe = require('stripe')(process.env.STRIPE_KEY);
    return await stripe.charges.create({ amount });
  }
}

class PayPalStrategy {
  async pay(amount) {
    const paypal = require('paypal-rest-sdk');
    return await paypal.payment.create({ amount });
  }
}

class CryptoStrategy {
  async pay(amount) {
    // Cryptocurrency payment
  }
}

// Usage in checkout
const processor = new PaymentProcessor(new StripeStrategy());
await processor.processPayment(100);

// Switch payment method
processor.setStrategy(new PayPalStrategy());
await processor.processPayment(100);
```

### 7. Proxy Pattern for Control

**Vue 3 Reactivity**

```javascript
// Vue 3 uses Proxy for reactivity
const state = new Proxy({
  count: 0,
  message: 'Hello'
}, {
  get(target, prop) {
    console.log(`Reading ${prop}`);
    track(target, prop); // Track dependency
    return target[prop];
  },

  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    trigger(target, prop); // Trigger updates
    return true;
  }
});

// Automatically tracks and triggers updates
state.count++; // Triggers re-render
```

**API Rate Limiting**

```javascript
// Rate limit API calls with Proxy
function createRateLimitedAPI(api, maxCalls, timeWindow) {
  const calls = [];

  return new Proxy(api, {
    get(target, prop) {
      if (typeof target[prop] === 'function') {
        return function(...args) {
          const now = Date.now();
          const recentCalls = calls.filter(time => now - time < timeWindow);

          if (recentCalls.length >= maxCalls) {
            throw new Error('Rate limit exceeded');
          }

          calls.push(now);
          return target[prop](...args);
        };
      }
      return target[prop];
    }
  });
}

// Usage
const api = {
  getUser: (id) => fetch(`/api/users/${id}`),
  getPosts: (id) => fetch(`/api/posts/${id}`)
};

const rateLimitedAPI = createRateLimitedAPI(api, 10, 60000); // 10 calls per minute
```

### 8. Builder Pattern for Fluent APIs

**Popular Library Examples**

```javascript
// Moment.js uses Builder pattern
moment()
  .startOf('day')
  .add(1, 'hour')
  .subtract(30, 'minutes')
  .format('YYYY-MM-DD HH:mm');

// Axios request builder
axios
  .post('/api/users')
  .timeout(5000)
  .auth('token')
  .headers({ 'Content-Type': 'application/json' })
  .data({ name: 'John' })
  .then(response => console.log(response));

// Knex.js SQL query builder
knex('users')
  .where('age', '>', 18)
  .andWhere('active', true)
  .orderBy('name')
  .limit(10)
  .offset(20)
  .select('name', 'email');
```

**Email Builder**

```javascript
// Building complex email with builder
class EmailBuilder {
  constructor() {
    this.email = {
      to: [],
      cc: [],
      bcc: [],
      attachments: []
    };
  }

  to(address) {
    this.email.to.push(address);
    return this;
  }

  cc(address) {
    this.email.cc.push(address);
    return this;
  }

  subject(text) {
    this.email.subject = text;
    return this;
  }

  body(content) {
    this.email.body = content;
    return this;
  }

  attach(file) {
    this.email.attachments.push(file);
    return this;
  }

  send() {
    // Send email via SMTP
    return sendEmail(this.email);
  }
}

// Usage (real production code)
await new EmailBuilder()
  .to('user@example.com')
  .cc('manager@example.com')
  .subject('Monthly Report')
  .body('Please find attached...')
  .attach('report.pdf')
  .attach('data.xlsx')
  .send();
```

### 9. Command Pattern for Undo/Redo

**Redux Actions**

```javascript
// Redux uses Command pattern
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const ADD_TODO = 'ADD_TODO';

// Commands (actions)
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const addTodo = (text) => ({ type: ADD_TODO, payload: text });

// Invoker (store)
store.dispatch(increment());
store.dispatch(addTodo('Buy milk'));

// Supports undo/redo
const history = [];
history.push(increment());
history.push(addTodo('Buy milk'));

// Undo
const lastAction = history.pop();
```

**Text Editor Undo/Redo**

```javascript
// Real text editor undo/redo (like Google Docs)
class TextEditor {
  constructor() {
    this.content = '';
    this.history = [];
    this.currentIndex = -1;
  }

  execute(command) {
    command.execute();
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(command);
    this.currentIndex++;
  }

  undo() {
    if (this.currentIndex >= 0) {
      this.history[this.currentIndex].undo();
      this.currentIndex--;
    }
  }

  redo() {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      this.history[this.currentIndex].execute();
    }
  }
}

class InsertTextCommand {
  constructor(editor, text, position) {
    this.editor = editor;
    this.text = text;
    this.position = position;
  }

  execute() {
    this.editor.content =
      this.editor.content.slice(0, this.position) +
      this.text +
      this.editor.content.slice(this.position);
  }

  undo() {
    this.editor.content =
      this.editor.content.slice(0, this.position) +
      this.editor.content.slice(this.position + this.text.length);
  }
}

// Usage
const editor = new TextEditor();
editor.execute(new InsertTextCommand(editor, 'Hello', 0));
editor.execute(new InsertTextCommand(editor, ' World', 5));
editor.undo(); // Removes ' World'
editor.redo(); // Adds ' World' back
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
