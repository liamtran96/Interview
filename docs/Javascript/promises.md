---
sidebar_position: 2
---

# Promises

## What is a Promise?

A **Promise** is an object representing the eventual completion (or failure) of an asynchronous operation. It's a way to handle async code more elegantly than callbacks.

## Promise States

A Promise can be in one of three states:

1. **Pending** - Initial state, neither fulfilled nor rejected
2. **Fulfilled** - Operation completed successfully
3. **Rejected** - Operation failed

```javascript
const promise = new Promise((resolve, reject) => {
  // Async operation
  if (success) {
    resolve(value); // Fulfilled
  } else {
    reject(error); // Rejected
  }
});
```

## Basic Promise Usage

```javascript
// Creating a promise
const fetchUser = new Promise((resolve, reject) => {
  setTimeout(() => {
    const user = { id: 1, name: 'John' };
    resolve(user); // Success
    // reject(new Error('User not found')); // Failure
  }, 1000);
});

// Consuming a promise
fetchUser
  .then(user => {
    console.log('User:', user);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Promise settled');
  });
```

## Common Interview Questions

### Q1: What problem do Promises solve?

**Answer:**

Promises solve **callback hell** (also called "pyramid of doom"):

```javascript
// ❌ Callback Hell
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getFinalData(c, function(d) {
        console.log(d);
      });
    });
  });
});

// ✅ Promises - Much cleaner!
getData()
  .then(a => getMoreData(a))
  .then(b => getEvenMoreData(b))
  .then(c => getFinalData(c))
  .then(d => console.log(d))
  .catch(error => console.error(error));
```

### Q2: How do you create a Promise?

**Answer:**

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Async operation
  const success = true;

  if (success) {
    resolve('Success!'); // Fulfilled
  } else {
    reject('Failed!'); // Rejected
  }
});
```

### Q3: What's the difference between .then() and .catch()?

**Answer:**

- **`.then()`** - Handles fulfilled promises (success)
- **`.catch()`** - Handles rejected promises (errors)
- **`.finally()`** - Runs regardless of outcome

```javascript
promise
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Error:', error))
  .finally(() => console.log('Cleanup code'));
```

### Q4: Can you chain Promises?

**Answer:**

Yes! Each `.then()` returns a new Promise:

```javascript
fetch('/api/user')
  .then(response => response.json())      // Returns promise
  .then(user => fetch(`/api/posts/${user.id}`)) // Returns promise
  .then(response => response.json())      // Returns promise
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

## Promise Methods

### Promise.resolve()

Creates a fulfilled promise:

```javascript
const promise = Promise.resolve('Immediate value');

promise.then(value => console.log(value)); // 'Immediate value'

// Useful for converting values to promises
async function getData() {
  return Promise.resolve({ data: 'test' });
}
```

### Promise.reject()

Creates a rejected promise:

```javascript
const promise = Promise.reject(new Error('Something went wrong'));

promise.catch(error => console.error(error)); // Error: Something went wrong
```

### Promise.all()

Waits for **all** promises to fulfill (or one to reject):

```javascript
const promise1 = fetch('/api/users');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    console.log('All data loaded!');
  })
  .catch(error => {
    console.error('One failed:', error);
  });
```

**Use case:** When you need all results before proceeding.

**Caveat:** If **any** promise rejects, the whole thing fails!

### Promise.allSettled()

Waits for **all** promises to settle (fulfilled or rejected):

```javascript
const promises = [
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success')
];

Promise.allSettled(promises)
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 'Success' },
    //   { status: 'rejected', reason: 'Error' },
    //   { status: 'fulfilled', value: 'Another success' }
    // ]
  });
```

**Use case:** When you want all results, even if some fail.

### Promise.race()

Returns the **first** promise to settle (fulfill or reject):

```javascript
const slow = new Promise(resolve => setTimeout(() => resolve('Slow'), 2000));
const fast = new Promise(resolve => setTimeout(() => resolve('Fast'), 100));

Promise.race([slow, fast])
  .then(result => console.log(result)); // 'Fast'
```

**Use case:** Timeout implementation, fastest data source wins.

### Promise.any()

Returns the **first** promise to **fulfill** (ignores rejections unless all reject):

```javascript
const p1 = Promise.reject('Error 1');
const p2 = new Promise(resolve => setTimeout(() => resolve('Success'), 100));
const p3 = Promise.reject('Error 2');

Promise.any([p1, p2, p3])
  .then(result => console.log(result)) // 'Success'
  .catch(errors => console.error(errors)); // Only if all reject
```

**Use case:** Trying multiple sources, need just one success.

## Real-World Examples

### Example 1: Fetch API

```javascript
function getUser(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(user => {
      console.log('User:', user);
      return user;
    })
    .catch(error => {
      console.error('Failed to fetch user:', error);
      throw error; // Re-throw to propagate error
    });
}
```

### Example 2: Timeout Wrapper

```javascript
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), ms);
  });

  return Promise.race([promise, timeout]);
}

// Usage
withTimeout(fetch('/api/data'), 5000)
  .then(data => console.log(data))
  .catch(error => console.error(error)); // 'Timeout' if takes > 5s
```

### Example 3: Retry Logic

```javascript
function retry(fn, maxAttempts = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt(attemptNumber) {
      fn()
        .then(resolve)
        .catch(error => {
          if (attemptNumber >= maxAttempts) {
            reject(error);
          } else {
            console.log(`Attempt ${attemptNumber} failed, retrying...`);
            setTimeout(() => attempt(attemptNumber + 1), delay);
          }
        });
    }
    attempt(1);
  });
}

// Usage
retry(() => fetch('/api/unreliable-endpoint'))
  .then(data => console.log(data))
  .catch(error => console.error('Failed after retries:', error));
```

## Common Pitfalls

### 1. Forgetting to return

```javascript
// ❌ WRONG - Doesn't chain properly
getData()
  .then(data => {
    processData(data); // Not returned!
  })
  .then(result => {
    console.log(result); // undefined!
  });

// ✅ CORRECT - Return the promise
getData()
  .then(data => {
    return processData(data); // Returned
  })
  .then(result => {
    console.log(result); // Has value
  });
```

### 2. Not handling errors

```javascript
// ❌ WRONG - Unhandled rejection
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));
// If fetch fails, error is unhandled!

// ✅ CORRECT - Always add .catch()
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### 3. Promise constructor anti-pattern

```javascript
// ❌ WRONG - Unnecessary Promise wrapper
function getUserData() {
  return new Promise((resolve, reject) => {
    fetch('/api/user')
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
}

// ✅ CORRECT - fetch already returns a Promise
function getUserData() {
  return fetch('/api/user')
    .then(response => response.json());
}
```

### 4. Parallel execution mistake

```javascript
// ❌ SLOW - Sequential execution
async function sequential() {
  const user = await getUser();      // Wait 1s
  const posts = await getPosts();    // Wait 1s
  const comments = await getComments(); // Wait 1s
  // Total: 3s
}

// ✅ FAST - Parallel execution
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments()
  ]);
  // Total: 1s (all happen simultaneously)
}
```

## Promise vs Callback

| Callbacks | Promises |
|-----------|----------|
| Nested (callback hell) | Chainable |
| Error handling scattered | Centralized `.catch()` |
| Hard to compose | Easy to compose with `Promise.all()` |
| No built-in error propagation | Errors bubble up automatically |

## Interview Coding Challenge

**Question:** Implement a function that fetches user data and their posts in parallel, then combines them.

**Solution:**

```javascript
async function getUserWithPosts(userId) {
  try {
    const [user, posts] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/posts?userId=${userId}`).then(r => r.json())
    ]);

    return {
      ...user,
      posts
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Alternative with .then() chaining
function getUserWithPosts(userId) {
  return Promise.all([
    fetch(`/api/users/${userId}`).then(r => r.json()),
    fetch(`/api/posts?userId=${userId}`).then(r => r.json())
  ])
  .then(([user, posts]) => ({
    ...user,
    posts
  }))
  .catch(error => {
    console.error('Error fetching data:', error);
    throw error;
  });
}
```

## Best Practices

1. **Always handle errors** - Add `.catch()` or `try/catch`
2. **Return promises** in `.then()` for proper chaining
3. **Use Promise.all()** for parallel operations
4. **Avoid Promise constructor anti-pattern** - Use existing promises
5. **Keep chains shallow** - Extract complex logic into functions
6. **Use async/await** for better readability (covered in next section)

## Key Takeaways

- Promises represent eventual completion/failure of async operations
- Three states: Pending, Fulfilled, Rejected
- Use `.then()` for success, `.catch()` for errors, `.finally()` for cleanup
- `Promise.all()` for parallel operations (all must succeed)
- `Promise.race()` for first to complete
- `Promise.allSettled()` waits for all (doesn't fail if one fails)
- Always handle errors to avoid unhandled rejections
- Promises are chainable and composable
