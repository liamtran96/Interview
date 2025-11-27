---
sidebar_position: 13
---

# Map, Set, WeakMap, WeakSet

## Map

**Map** is a collection of keyed data items, like an object. But the main difference is that **Map allows keys of any type**.

### Creating a Map

```javascript
const map = new Map();

// Add entries
map.set('name', 'John');
map.set('age', 30);
map.set(true, 'boolean key');

// Get values
console.log(map.get('name')); // "John"
console.log(map.get('age'));  // 30

// Check if key exists
console.log(map.has('name')); // true

// Get size
console.log(map.size); // 3

// Delete entry
map.delete('age');

// Clear all
map.clear();
```

### Any Type as Key

```javascript
const map = new Map();

// Object as key
const obj = { id: 1 };
map.set(obj, 'value');
console.log(map.get(obj)); // "value"

// Function as key
const fn = () => {};
map.set(fn, 'function value');

// NaN as key (works in Map, unlike objects)
map.set(NaN, 'NaN value');
console.log(map.get(NaN)); // "NaN value"
```

### Map Iteration

```javascript
const map = new Map([
  ['name', 'John'],
  ['age', 30],
  ['city', 'NYC']
]);

// for...of
for (let [key, value] of map) {
  console.log(`${key}: ${value}`);
}

// forEach
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// Iterate keys
for (let key of map.keys()) {
  console.log(key);
}

// Iterate values
for (let value of map.values()) {
  console.log(value);
}

// Iterate entries
for (let entry of map.entries()) {
  console.log(entry); // [key, value]
}
```

### Map vs Object

| Feature | Map | Object |
|---------|-----|--------|
| **Key types** | Any type | String/Symbol only |
| **Key order** | Insertion order | Not guaranteed (mostly insertion order in modern JS) |
| **Size** | `map.size` | `Object.keys(obj).length` |
| **Iteration** | Directly iterable | Need `Object.keys()` |
| **Performance** | Better for frequent add/remove | Better for static data |

```javascript
// Object limitations
const obj = {};
obj[{id: 1}] = 'value';
console.log(obj); // { "[object Object]": "value" } - key converted to string!

// Map works correctly
const map = new Map();
map.set({id: 1}, 'value');
console.log(map.get({id: 1})); // undefined - different object reference
const key = {id: 1};
map.set(key, 'value');
console.log(map.get(key)); // "value" - same reference
```

## Set

**Set** is a collection of unique values. Each value may occur only once.

### Creating a Set

```javascript
const set = new Set();

// Add values
set.add(1);
set.add(2);
set.add(3);
set.add(2); // Ignored - already exists

console.log(set.size); // 3

// Check if value exists
console.log(set.has(2)); // true

// Delete value
set.delete(2);

// Clear all
set.clear();
```

### Remove Duplicates from Array

```javascript
const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(numbers)];
console.log(unique); // [1, 2, 3, 4, 5]
```

### Set Iteration

```javascript
const set = new Set(['a', 'b', 'c']);

// for...of
for (let value of set) {
  console.log(value);
}

// forEach
set.forEach(value => {
  console.log(value);
});

// Convert to array
const array = Array.from(set);
const array2 = [...set];
```

## WeakMap

**WeakMap** is like Map, but keys must be objects and are **weakly referenced** (can be garbage collected).

```javascript
let obj = { name: 'John' };

const weakMap = new WeakMap();
weakMap.set(obj, 'value');

console.log(weakMap.get(obj)); // "value"

obj = null; // Remove reference
// Now obj can be garbage collected, even though it's in WeakMap
```

**Limitations:**
- Keys must be objects (not primitives)
- Not iterable
- No `size`, `clear()`, `keys()`, `values()`

**Use cases:**
- Store metadata about objects
- Cache/memoization
- Private data

```javascript
// Private data pattern
const privateData = new WeakMap();

class Person {
  constructor(name, ssn) {
    this.name = name;
    privateData.set(this, { ssn });
  }
  
  getSSN() {
    return privateData.get(this).ssn;
  }
}

const person = new Person('John', '123-45-6789');
console.log(person.name); // "John"
console.log(person.getSSN()); // "123-45-6789"
// person.ssn is not accessible
```

## WeakSet

**WeakSet** is like Set, but values must be objects and are weakly referenced.

```javascript
let obj1 = { id: 1 };
let obj2 = { id: 2 };

const weakSet = new WeakSet([obj1, obj2]);

console.log(weakSet.has(obj1)); // true

obj1 = null; // Can be garbage collected
```

**Limitations:**
- Values must be objects
- Not iterable
- No `size`, `clear()`, `keys()`, `values()`

**Use cases:**
- Track object references
- Avoid memory leaks

## Common Interview Questions

### Q1: When would you use Map over an Object?

**Answer:**

Use **Map** when:
1. Keys are not strings/symbols
2. Need to iterate in insertion order
3. Frequently add/remove entries
4. Need to know size efficiently

Use **Object** when:
5. Simple string-keyed data
6. JSON serialization needed
7. Working with existing APIs

```javascript
// Map - better for dynamic data
const cache = new Map();
cache.set(userObj, userData);

// Object - better for static config
const config = {
  apiUrl: 'https://api.com',
  timeout: 5000
};
```

### Q2: How do you remove duplicates from an array?

**Answer:**

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];

// Method 1: Set + spread
const unique1 = [...new Set(arr)];

// Method 2: Set + Array.from
const unique2 = Array.from(new Set(arr));

// Method 3: filter
const unique3 = arr.filter((item, index) => arr.indexOf(item) === index);

console.log(unique1); // [1, 2, 3, 4, 5]
```

### Q3: What is the difference between Map and WeakMap?

**Answer:**

| Map | WeakMap |
|-----|---------|
| Keys can be any type | Keys MUST be objects |
| Strong references | Weak references (can be GC'd) |
| Iterable | NOT iterable |
| Has `size`, `clear()` | No `size`, `clear()` |
| Use for general mapping | Use for metadata/caching |

```javascript
// Map - prevents garbage collection
const map = new Map();
let obj = { id: 1 };
map.set(obj, 'value');
obj = null; // Object still in memory (map holds reference)

// WeakMap - allows garbage collection
const weakMap = new WeakMap();
let obj2 = { id: 2 };
weakMap.set(obj2, 'value');
obj2 = null; // Object can be garbage collected
```

## Key Takeaways

- **Map** - Key-value pairs, any key type, ordered, iterable
- **Set** - Unique values, iterable
- **WeakMap** - Object keys only, weak references, not iterable
- **WeakSet** - Object values only, weak references, not iterable
- Use WeakMap/WeakSet to avoid memory leaks
- Set is perfect for removing duplicates

## Resources

- [MDN Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [MDN WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
