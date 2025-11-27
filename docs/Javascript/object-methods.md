---
sidebar_position: 28
---

# Object.create & Object.assign

## Object.create()

Creates new object with specified prototype.

```javascript
// Create object with prototype
const animal = {
  eats: true,
  walk() {
    console.log('Animal walks');
  }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log(rabbit.eats);  // true (inherited)
console.log(rabbit.jumps); // true (own property)
rabbit.walk();             // "Animal walks"
```

### Object.create(null)

Create object with no prototype (pure dictionary).

```javascript
const obj = Object.create(null);

console.log(obj.toString);  // undefined (no prototype)
obj.hasOwnProperty = 'value'; // ✓ No conflict

// Useful for hash maps
const map = Object.create(null);
map['__proto__'] = 'value'; // ✓ Safe
```

### With Property Descriptors

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
    writable: false, // Read-only
    enumerable: true
  }
});

person.name = 'Jane'; // ✓ Works
// person.age = 31;   // ✗ Doesn't work (not writable)
```

## Object.assign()

Copies properties from source(s) to target (shallow copy).

```javascript
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = Object.assign(target, source);

console.log(result); // { a: 1, b: 3, c: 4 }
console.log(target); // { a: 1, b: 3, c: 4 } (modified!)
```

### Cloning Objects

```javascript
const original = { a: 1, b: 2 };

// Shallow clone
const clone = Object.assign({}, original);

clone.a = 99;
console.log(original.a); // 1 (not affected)
```

### Merging Objects

```javascript
const defaults = {
  theme: 'light',
  fontSize: 14,
  language: 'en'
};

const userPrefs = {
  theme: 'dark',
  fontSize: 16
};

const config = Object.assign({}, defaults, userPrefs);
console.log(config);
// { theme: 'dark', fontSize: 16, language: 'en' }
```

### Shallow Copy Warning

```javascript
const original = {
  name: 'John',
  address: {
    city: 'NYC'
  }
};

const copy = Object.assign({}, original);

copy.address.city = 'LA';
console.log(original.address.city); // 'LA' (mutated!)

// Use deep clone for nested objects
const deepCopy = JSON.parse(JSON.stringify(original));
// Or use structuredClone (modern browsers)
const deepCopy2 = structuredClone(original);
```

## Object.create() vs Object.assign()

| Feature | Object.create() | Object.assign() |
|---------|----------------|-----------------|
| **Purpose** | Set prototype | Copy properties |
| **Returns** | New object | Target object |
| **Modifies target** | No | Yes |
| **Inheritance** | Yes | No |

```javascript
// Object.create - sets prototype
const parent = { inherited: true };
const child = Object.create(parent);
console.log(child.inherited); // true (from prototype)

// Object.assign - copies properties
const obj1 = { a: 1 };
const obj2 = Object.assign({}, obj1);
console.log(obj2.a); // 1 (own property)
```

## Other Useful Object Methods

### Object.keys/values/entries()

```javascript
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj);     // ['a', 'b', 'c']
Object.values(obj);   // [1, 2, 3]
Object.entries(obj);  // [['a', 1], ['b', 2], ['c', 3]]
```

### Object.freeze/seal()

```javascript
const obj = { a: 1, b: 2 };

// Freeze - can't add, delete, or modify
Object.freeze(obj);
obj.a = 99;  // No effect
obj.c = 3;   // No effect
delete obj.b; // No effect

// Seal - can modify, can't add/delete
Object.seal(obj);
obj.a = 99;  // ✓ Works
obj.c = 3;   // ✗ No effect
```

### Object.getPrototypeOf/setPrototypeOf()

```javascript
const animal = { eats: true };
const rabbit = Object.create(animal);

console.log(Object.getPrototypeOf(rabbit) === animal); // true

// Change prototype (avoid in production)
Object.setPrototypeOf(rabbit, { jumps: true });
```

## Common Interview Questions

### Q1: What's the difference between Object.create() and new?

**Answer:**

```javascript
// Object.create() - sets prototype
const animal = { eats: true };
const rabbit = Object.create(animal);
console.log(rabbit.eats); // true (inherited)

// new - calls constructor
function Animal() {
  this.eats = true;
}
const dog = new Animal();
console.log(dog.eats); // true (own property)
```

### Q2: What's the difference between shallow clone and deep clone?

**Answer:**

**Shallow Clone:**
- Copies only the first level of properties
- Nested objects/arrays are still referenced (not copied)
- Mutating nested objects affects the original

**Deep Clone:**
- Recursively copies all levels
- Creates completely independent copy
- Mutating nested objects doesn't affect the original

```javascript
const original = {
  name: 'John',
  age: 30,
  address: {
    city: 'NYC',
    zip: '10001'
  },
  hobbies: ['reading', 'gaming']
};

// ========== SHALLOW CLONE ==========
const shallow = Object.assign({}, original);
// or: const shallow = { ...original };

// Top-level changes DON'T affect original ✓
shallow.name = 'Jane';
console.log(original.name); // 'John' (unchanged)

// Nested changes DO affect original ✗
shallow.address.city = 'LA';
console.log(original.address.city); // 'LA' (mutated!)

shallow.hobbies.push('cooking');
console.log(original.hobbies); // ['reading', 'gaming', 'cooking'] (mutated!)

// ========== DEEP CLONE ==========

// Method 1: JSON (most common)
const deep1 = JSON.parse(JSON.stringify(original));

// Method 2: structuredClone (modern, recommended)
const deep2 = structuredClone(original);

// Nested changes DON'T affect original ✓
deep1.address.city = 'SF';
console.log(original.address.city); // 'NYC' (unchanged)

deep1.hobbies.push('swimming');
console.log(original.hobbies); // ['reading', 'gaming'] (unchanged)
```

**Comparison:**

| Feature | Shallow Clone | Deep Clone |
|---------|--------------|------------|
| **Top-level copy** | ✅ Independent | ✅ Independent |
| **Nested objects** | ❌ Referenced | ✅ Copied |
| **Performance** | Fast | Slower |
| **Use case** | Simple objects | Nested structures |
| **Methods** | `{...obj}`, `Object.assign()` | `JSON.parse(JSON.stringify())`, `structuredClone()` |

**When to use each:**

```javascript
// Use SHALLOW clone when:
// - Object has no nested structures
// - You only need to modify top-level properties
const user = { name: 'John', age: 30 };
const copy = { ...user }; // Shallow is fine

// Use DEEP clone when:
// - Object has nested objects/arrays
// - You need complete independence
const config = {
  server: { host: 'localhost', port: 3000 },
  database: { url: 'mongodb://...', options: {} }
};
const copy = structuredClone(config); // Need deep clone
```

**Deep Clone Limitations:**

```javascript
// JSON.parse(JSON.stringify()) loses:
const obj = {
  func: () => {},           // ❌ Functions removed
  date: new Date(),         // ❌ Becomes string
  undefined: undefined,     // ❌ Property removed
  symbol: Symbol('id'),     // ❌ Property removed
  circular: obj             // ❌ Error: circular reference
};

// structuredClone() is better but still doesn't copy:
const obj2 = {
  func: () => {},           // ❌ Error: functions not cloneable
  // But handles: Date, RegExp, Map, Set, ArrayBuffer, etc. ✅
};

// For complete cloning (including functions), use libraries:
// - Lodash: _.cloneDeep(obj)
// - Ramda: R.clone(obj)
```

### Q3: When to use Object.create(null)?

**Answer:**

Use for pure dictionaries (hash maps) to avoid prototype pollution.

```javascript
const map = Object.create(null);

map['toString'] = 'value'; // Safe
map['__proto__'] = 'value'; // Safe

// No inherited properties
console.log(map.toString); // 'value', not function
```

## Key Takeaways

- **Object.create()** - Create object with specified prototype
- **Object.assign()** - Shallow copy properties
- **Object.create(null)** - Create prototype-less object
- **Shallow copy** - Nested objects still reference originals
- **Deep clone** - Use JSON or structuredClone for nested objects

## Resources

- [MDN Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [MDN Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
