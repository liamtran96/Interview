---
sidebar_position: 3
---

# Async/Await

## What is Async/Await?

`async/await` is **syntactic sugar** over Promises that makes asynchronous code look and behave more like synchronous code, making it easier to read and write.

## Basic Syntax

```javascript
// async function returns a Promise
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data; // Automatically wrapped in Promise
}

// Usage
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## The `async` Keyword

- Makes a function **return a Promise**
- Allows use of `await` inside the function

```javascript
// These are equivalent:
async function getUser() {
  return 'John';
}

function getUser() {
  return Promise.resolve('John');
}

// Both return a Promise
getUser().then(user => console.log(user)); // 'John'
```

## The `await` Keyword

- **Pauses** execution until Promise settles
- Can only be used inside `async` functions
- Returns the fulfilled value or throws if rejected

```javascript
async function example() {
  // Wait for promise to resolve
  const user = await fetchUser();
  console.log(user); // Value is unwrapped

  // Without await
  const userPromise = fetchUser();
  console.log(userPromise); // Promise object
}
```

## Common Interview Questions

### Q1: What's the difference between Promises and Async/Await?

**Answer:**

They're the same thing! `async/await` is syntactic sugar over Promises.

```javascript
// Using Promises
function getUserData() {
  return fetch('/api/user')
    .then(response => response.json())
    .then(user => {
      return fetch(`/api/posts/${user.id}`);
    })
    .then(response => response.json())
    .then(posts => {
      return { user, posts };
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

// Using Async/Await - Much cleaner!
async function getUserData() {
  try {
    const userResponse = await fetch('/api/user');
    const user = await userResponse.json();

    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();

    return { user, posts };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

### Q2: How do you handle errors with async/await?

**Answer:**

Use **try/catch** blocks:

```javascript
async function fetchUser() {
  try {
    const response = await fetch('/api/user');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; // Re-throw or handle
  }
}
```

### Q3: Can you use await without async?

**Answer:**

**No** (except at top-level in modules):

```javascript
// ❌ ERROR - Can't use await in non-async function
function getData() {
  const data = await fetch('/api/data'); // SyntaxError!
}

// ✅ CORRECT - async function
async function getData() {
  const data = await fetch('/api/data');
}

// ✅ ALSO CORRECT - Top-level await (in ES modules)
const data = await fetch('/api/data');
```

### Q4: What does an async function return?

**Answer:**

Always returns a **Promise**, even if you return a regular value:

```javascript
async function getValue() {
  return 42; // Regular value
}

getValue().then(value => console.log(value)); // 42

// Equivalent to:
function getValue() {
  return Promise.resolve(42);
}
```

## Parallel vs Sequential Execution

### Sequential (Slow)

```javascript
// ❌ SLOW - Waits for each operation
async function sequential() {
  const user = await getUser();      // 1s
  const posts = await getPosts();    // 1s
  const comments = await getComments(); // 1s
  // Total: 3 seconds
  return { user, posts, comments };
}
```

### Parallel (Fast)

```javascript
// ✅ FAST - All operations happen simultaneously
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    getUser(),       // All start
    getPosts(),      // at the same
    getComments()    // time
  ]);
  // Total: 1 second (time of slowest)
  return { user, posts, comments };
}
```

### Parallel with Individual Error Handling

```javascript
async function parallelWithErrorHandling() {
  const [userResult, postsResult, commentsResult] = await Promise.allSettled([
    getUser(),
    getPosts(),
    getComments()
  ]);

  const user = userResult.status === 'fulfilled' ? userResult.value : null;
  const posts = postsResult.status === 'fulfilled' ? postsResult.value : [];
  const comments = commentsResult.status === 'fulfilled' ? commentsResult.value : [];

  return { user, posts, comments };
}
```

## Real-World Examples

### Example 1: Fetching User Data

```javascript
async function getUserProfile(userId) {
  try {
    // Fetch user and posts in parallel
    const [userRes, postsRes] = await Promise.all([
      fetch(`/api/users/${userId}`),
      fetch(`/api/users/${userId}/posts`)
    ]);

    // Parse JSON responses
    const user = await userRes.json();
    const posts = await postsRes.json();

    return {
      ...user,
      posts,
      postCount: posts.length
    };
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
}
```

### Example 2: Form Submission with Validation

```javascript
async function handleSubmit(formData) {
  try {
    // Validate
    await validateForm(formData);

    // Submit
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Submission failed');
    }

    const result = await response.json();
    console.log('Success:', result);
    return result;
  } catch (error) {
    console.error('Submission error:', error);
    throw error;
  }
}
```

### Example 3: Retry Logic

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return await response.json();
      }

      // If not last attempt, wait before retry
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }

  throw new Error(`Failed after ${maxRetries} attempts`);
}
```

### Example 4: Rate-Limited API Calls

```javascript
async function fetchAllPages(baseUrl, maxPages = 10) {
  const results = [];

  for (let page = 1; page <= maxPages; page++) {
    try {
      const response = await fetch(`${baseUrl}?page=${page}`);
      const data = await response.json();

      results.push(...data);

      // If no more data, break
      if (data.length === 0) break;

      // Rate limit: wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }

  return results;
}
```

### Example 5: Timeout Implementation

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}
```

## Common Pitfalls

### 1. Forgetting await

```javascript
// ❌ WRONG - Forgot await
async function getData() {
  const data = fetchData(); // Returns Promise, not data!
  console.log(data); // Promise object
  return data;
}

// ✅ CORRECT - Use await
async function getData() {
  const data = await fetchData();
  console.log(data); // Actual data
  return data;
}
```

### 2. Forgetting try/catch

```javascript
// ❌ WRONG - No error handling
async function getUser() {
  const response = await fetch('/api/user');
  return await response.json();
  // If fetch fails, error is unhandled!
}

// ✅ CORRECT - Handle errors
async function getUser() {
  try {
    const response = await fetch('/api/user');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### 3. Using await in loops (sequential)

```javascript
// ❌ SLOW - Sequential execution
async function processUsers(userIds) {
  const users = [];
  for (const id of userIds) {
    const user = await fetchUser(id); // Waits for each!
    users.push(user);
  }
  return users;
}

// ✅ FAST - Parallel execution
async function processUsers(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  return await Promise.all(promises);
}
```

### 4. Not returning await

```javascript
// ❌ POTENTIAL ISSUE - Error not caught
async function wrapper() {
  try {
    return fetchData(); // Promise returned, not awaited
  } catch (error) {
    console.log('Never caught!');
  }
}

// ✅ CORRECT - await to catch errors
async function wrapper() {
  try {
    return await fetchData();
  } catch (error) {
    console.log('Error caught!', error);
  }
}
```

## Async/Await with Array Methods

### map()

```javascript
// Get all users in parallel
async function getAllUsers(userIds) {
  const promises = userIds.map(async (id) => {
    return await fetchUser(id);
  });

  return await Promise.all(promises);
}
```

### filter()

```javascript
// Filter with async predicate
async function filterAsync(array, predicate) {
  const results = await Promise.all(array.map(predicate));
  return array.filter((_, index) => results[index]);
}

// Usage
const activeUsers = await filterAsync(users, async (user) => {
  const status = await checkUserStatus(user.id);
  return status === 'active';
});
```

### reduce()

```javascript
// Reduce with async operation (sequential)
async function reduceAsync(array, asyncFn, initialValue) {
  let accumulator = initialValue;

  for (const item of array) {
    accumulator = await asyncFn(accumulator, item);
  }

  return accumulator;
}
```

## Top-Level Await

In ES modules, you can use `await` at the top level:

```javascript
// config.mjs
const response = await fetch('/api/config');
export const config = await response.json();

// app.mjs
import { config } from './config.mjs';
console.log(config);
```

## Interview Coding Challenge

**Question:** Write a function that fetches user data, their posts, and comments for each post, all optimized for performance.

**Solution:**

```javascript
async function getUserFullData(userId) {
  try {
    // Step 1: Fetch user and their posts in parallel
    const [user, posts] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/posts`).then(r => r.json())
    ]);

    // Step 2: Fetch comments for all posts in parallel
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const comments = await fetch(`/api/posts/${post.id}/comments`)
          .then(r => r.json());
        return { ...post, comments };
      })
    );

    return {
      ...user,
      posts: postsWithComments
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
```

## Best Practices

1. **Always use try/catch** for error handling
2. **Use Promise.all()** for parallel operations
3. **Avoid await in loops** - leads to sequential execution
4. **Add timeouts** for network requests
5. **Consider Promise.allSettled()** when some failures are acceptable
6. **Use AbortController** for cancellable requests
7. **Return await in try/catch** to properly catch errors
8. **Add loading states** in UI applications

## Async/Await vs Promises - When to Use

| Use Async/Await | Use Promises |
|-----------------|--------------|
| Sequential operations | Simple single async operation |
| Multiple await calls | Chaining is clearer |
| Try/catch error handling | Multiple branches |
| More readable for complex logic | Library/framework code |

## Key Takeaways

- `async/await` is syntactic sugar over Promises
- `async` makes function return a Promise
- `await` pauses execution until Promise resolves
- Use try/catch for error handling
- Use Promise.all() for parallel operations
- Avoid await in loops for better performance
- Always handle errors
- async functions always return Promises
