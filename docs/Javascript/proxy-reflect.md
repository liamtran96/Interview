---
sidebar_position: 14
---

# Proxy and Reflect

## What is Proxy?

**Proxy** creates a wrapper around an object, allowing you to intercept and customize operations (like property access, assignment, function calls, etc.).

```javascript
const target = {
  name: 'John',
  age: 30
};

const handler = {
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // "Getting name", "John"
console.log(proxy.age);  // "Getting age", 30
```

## Proxy Traps

**Traps** are methods that intercept operations:

### get Trap

```javascript
const handler = {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    return `Property '${property}' not found`;
  }
};

const obj = new Proxy({ name: 'John' }, handler);

console.log(obj.name);  // "John"
console.log(obj.age);   // "Property 'age' not found"
```

### set Trap

```javascript
const handler = {
  set(target, property, value) {
    if (property === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[property] = value;
    return true; // Indicate success
  }
};

const person = new Proxy({}, handler);

person.age = 30;  // ✓ Works
// person.age = '30'; // ✗ Error: Age must be a number
```

### has Trap

```javascript
const handler = {
  has(target, property) {
    if (property.startsWith('_')) {
      return false; // Hide private properties
    }
    return property in target;
  }
};

const obj = new Proxy({ name: 'John', _secret: '123' }, handler);

console.log('name' in obj);    // true
console.log('_secret' in obj); // false (hidden)
```

### deleteProperty Trap

```javascript
const handler = {
  deleteProperty(target, property) {
    if (property.startsWith('_')) {
      throw new Error('Cannot delete private properties');
    }
    delete target[property];
    return true;
  }
};

const obj = new Proxy({ name: 'John', _id: 1 }, handler);

delete obj.name;  // ✓ Works
// delete obj._id; // ✗ Error: Cannot delete private properties
```

### apply Trap (Functions)

```javascript
const handler = {
  apply(target, thisArg, args) {
    console.log(`Calling with args: ${args}`);
    return target.apply(thisArg, args);
  }
};

const sum = (a, b) => a + b;
const proxySum = new Proxy(sum, handler);

console.log(proxySum(2, 3)); // "Calling with args: 2,3", 5
```

### construct Trap

```javascript
const handler = {
  construct(target, args) {
    console.log(`Creating instance with: ${args}`);
    return new target(...args);
  }
};

class Person {
  constructor(name) {
    this.name = name;
  }
}

const ProxyPerson = new Proxy(Person, handler);
const john = new ProxyPerson('John'); // "Creating instance with: John"
```

## Common Patterns

### Validation

```javascript
const validator = {
  set(target, property, value) {
    if (property === 'age') {
      if (typeof value !== 'number' || value < 0 || value > 150) {
        throw new RangeError('Invalid age');
      }
    }
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, validator);

person.age = 30;   // ✓ Works
// person.age = -5; // ✗ Error: Invalid age
// person.age = 200; // ✗ Error: Invalid age
```

### Negative Array Indices

```javascript
const negativeArray = (array) => {
  return new Proxy(array, {
    get(target, property) {
      const index = Number(property);
      if (index < 0) {
        return target[target.length + index];
      }
      return target[property];
    }
  });
};

const arr = negativeArray([1, 2, 3, 4, 5]);

console.log(arr[-1]); // 5 (last element)
console.log(arr[-2]); // 4 (second-to-last)
```

### Property Change Tracking

```javascript
const trackChanges = (obj) => {
  const changes = [];
  
  return new Proxy(obj, {
    set(target, property, value) {
      changes.push({ property, oldValue: target[property], newValue: value });
      target[property] = value;
      return true;
    },
    getChanges() {
      return changes;
    }
  });
};

const obj = trackChanges({ name: 'John', age: 30 });

obj.name = 'Jane';
obj.age = 31;

console.log(obj.getChanges());
// [
//   { property: 'name', oldValue: 'John', newValue: 'Jane' },
//   { property: 'age', oldValue: 30, newValue: 31 }
// ]
```

### Private Properties

```javascript
const createPrivate = (obj) => {
  return new Proxy(obj, {
    get(target, property) {
      if (property.startsWith('_')) {
        throw new Error(`Cannot access private property ${property}`);
      }
      return target[property];
    },
    set(target, property, value) {
      if (property.startsWith('_')) {
        throw new Error(`Cannot set private property ${property}`);
      }
      target[property] = value;
      return true;
    }
  });
};

const obj = createPrivate({ name: 'John', _secret: '123' });

console.log(obj.name);    // "John"
// console.log(obj._secret); // Error: Cannot access private property
```

## Reflect API

**Reflect** is a built-in object that provides methods for interceptable JavaScript operations.

### Why Reflect?

```javascript
// Instead of:
const handler = {
  get(target, property) {
    return target[property]; // Direct access
  }
};

// Use Reflect:
const handler = {
  get(target, property) {
    return Reflect.get(target, property); // Cleaner
  }
};
```

### Reflect Methods

```javascript
const obj = { name: 'John', age: 30 };

// Get property
Reflect.get(obj, 'name'); // "John"

// Set property
Reflect.set(obj, 'age', 31); // true

// Has property
Reflect.has(obj, 'name'); // true

// Delete property
Reflect.deleteProperty(obj, 'age'); // true

// Get own property descriptor
Reflect.getOwnPropertyDescriptor(obj, 'name');

// Get prototype
Reflect.getPrototypeOf(obj); // Object.prototype

// Set prototype
Reflect.setPrototypeOf(obj, null);

// Prevent extensions
Reflect.preventExtensions(obj);

// Is extensible
Reflect.isExtensible(obj);

// Own keys
Reflect.ownKeys(obj); // ['name', 'age']
```

### Proxy + Reflect

```javascript
const handler = {
  get(target, property, receiver) {
    console.log(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    console.log(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

const obj = new Proxy({ name: 'John' }, handler);

obj.name; // "Getting name"
obj.age = 30; // "Setting age to 30"
```

## Common Interview Questions

### Q1: What is the difference between Proxy and Object.defineProperty?

**Answer:**

| Proxy | Object.defineProperty |
|-------|----------------------|
| Intercepts entire object | Intercepts specific properties |
| Can intercept new properties | Only defined properties |
| Can intercept property deletion | Cannot intercept deletion |
| Can intercept function calls | Cannot intercept calls |
| More flexible | More limited |

```javascript
// Object.defineProperty - limited
Object.defineProperty(obj, 'name', {
  get() { return value; },
  set(newValue) { value = newValue; }
});
// Must define for each property

// Proxy - flexible
new Proxy(obj, {
  get(target, property) { /* ... */ },
  set(target, property, value) { /* ... */ }
});
// Works for all properties, even new ones
```

### Q2: What is Reflect used for?

**Answer:**

**Reflect** provides:
1. Default behavior for all proxy traps
2. Cleaner syntax than using operators
3. Returns boolean success/failure (vs throwing errors)

```javascript
// Without Reflect
delete obj.property; // true/false or throws

// With Reflect
Reflect.deleteProperty(obj, 'property'); // Always returns true/false
```

## Key Takeaways

- **Proxy** wraps objects to intercept operations
- **Traps** are handler methods that intercept operations
- **Reflect** provides default implementations for all traps
- Use Proxy for validation, tracking, privacy, virtualization
- Reflect methods match Proxy traps one-to-one

## Resources

- [MDN Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [MDN Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [JavaScript.info Proxy](https://javascript.info/proxy)
