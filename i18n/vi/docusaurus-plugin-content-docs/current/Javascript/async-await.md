---
sidebar_position: 3
---

# Async/Await

## Async/Await là gì?

`async/await` là **cú pháp đường (syntactic sugar)** được xây dựng trên Promises giúp code bất đồng bộ trông và hoạt động giống như code đồng bộ hơn, làm cho nó dễ đọc và viết hơn.

## Cú pháp cơ bản

```javascript
// async function trả về một Promise
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data; // Tự động được bọc trong Promise
}

// Sử dụng
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

## Từ khóa `async`

- Khiến function **trả về một Promise**
- Cho phép sử dụng `await` bên trong function

```javascript
// Hai cách viết này tương đương:
async function getUser() {
  return 'John';
}

function getUser() {
  return Promise.resolve('John');
}

// Cả hai đều trả về một Promise
getUser().then(user => console.log(user)); // 'John'
```

## Từ khóa `await`

- **Tạm dừng** việc thực thi cho đến khi Promise hoàn thành
- Chỉ có thể được sử dụng bên trong `async` function
- Trả về giá trị đã fulfilled hoặc throw nếu rejected

```javascript
async function example() {
  // Chờ promise resolve
  const user = await fetchUser();
  console.log(user); // Giá trị đã được unwrap

  // Không có await
  const userPromise = fetchUser();
  console.log(userPromise); // Promise object
}
```

## Các câu hỏi phỏng vấn thường gặp

### Q1: Sự khác biệt giữa Promises và Async/Await là gì?

**Trả lời:**

Chúng giống nhau! `async/await` là syntactic sugar của Promises.

```javascript
// Sử dụng Promises
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

// Sử dụng Async/Await - Sạch hơn nhiều!
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

### Q2: Làm thế nào để xử lý lỗi với async/await?

**Trả lời:**

Sử dụng khối **try/catch**:

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
    throw error; // Re-throw hoặc xử lý
  }
}
```

### Q3: Bạn có thể sử dụng await mà không có async không?

**Trả lời:**

**Không** (ngoại trừ ở top-level trong modules):

```javascript
// ❌ LỖI - Không thể dùng await trong non-async function
function getData() {
  const data = await fetch('/api/data'); // SyntaxError!
}

// ✅ ĐÚNG - async function
async function getData() {
  const data = await fetch('/api/data');
}

// ✅ CŨNG ĐÚNG - Top-level await (trong ES modules)
const data = await fetch('/api/data');
```

### Q4: Async function trả về gì?

**Trả lời:**

Luôn trả về một **Promise**, ngay cả khi bạn return một giá trị thông thường:

```javascript
async function getValue() {
  return 42; // Giá trị thông thường
}

getValue().then(value => console.log(value)); // 42

// Tương đương với:
function getValue() {
  return Promise.resolve(42);
}
```

## Thực thi song song vs tuần tự

### Tuần tự (Chậm)

```javascript
// ❌ CHẬM - Chờ từng operation
async function sequential() {
  const user = await getUser();      // 1s
  const posts = await getPosts();    // 1s
  const comments = await getComments(); // 1s
  // Tổng: 3 giây
  return { user, posts, comments };
}
```

### Song song (Nhanh)

```javascript
// ✅ NHANH - Tất cả operations chạy đồng thời
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    getUser(),       // Tất cả bắt đầu
    getPosts(),      // cùng một
    getComments()    // thời điểm
  ]);
  // Tổng: 1 giây (thời gian của operation chậm nhất)
  return { user, posts, comments };
}
```

### Song song với xử lý lỗi riêng biệt

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

## Ví dụ thực tế

### Ví dụ 1: Lấy dữ liệu người dùng

```javascript
async function getUserProfile(userId) {
  try {
    // Lấy user và posts song song
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

### Ví dụ 2: Xử lý form với validation

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

### Ví dụ 3: Retry logic

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return await response.json();
      }

      // Nếu không phải lần thử cuối, chờ trước khi retry
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

### Ví dụ 4: Gọi API với rate limit

```javascript
async function fetchAllPages(baseUrl, maxPages = 10) {
  const results = [];

  for (let page = 1; page <= maxPages; page++) {
    try {
      const response = await fetch(`${baseUrl}?page=${page}`);
      const data = await response.json();

      results.push(...data);

      // Nếu không còn dữ liệu, thoát
      if (data.length === 0) break;

      // Rate limit: chờ 100ms giữa các requests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
      break;
    }
  }

  return results;
}
```

### Ví dụ 5: Triển khai timeout

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

## Những lỗi thường gặp

### 1. Quên await

```javascript
// ❌ SAI - Quên await
async function getData() {
  const data = fetchData(); // Trả về Promise, không phải data!
  console.log(data); // Promise object
  return data;
}

// ✅ ĐÚNG - Sử dụng await
async function getData() {
  const data = await fetchData();
  console.log(data); // Dữ liệu thực tế
  return data;
}
```

### 2. Quên try/catch

```javascript
// ❌ SAI - Không xử lý lỗi
async function getUser() {
  const response = await fetch('/api/user');
  return await response.json();
  // Nếu fetch thất bại, lỗi không được xử lý!
}

// ✅ ĐÚNG - Xử lý lỗi
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

### 3. Sử dụng await trong loops (tuần tự)

```javascript
// ❌ CHẬM - Thực thi tuần tự
async function processUsers(userIds) {
  const users = [];
  for (const id of userIds) {
    const user = await fetchUser(id); // Chờ từng cái!
    users.push(user);
  }
  return users;
}

// ✅ NHANH - Thực thi song song
async function processUsers(userIds) {
  const promises = userIds.map(id => fetchUser(id));
  return await Promise.all(promises);
}
```

### 4. Không return await

```javascript
// ❌ VẤN ĐỀ TIỀM ẨN - Lỗi không được catch
async function wrapper() {
  try {
    return fetchData(); // Promise được return, không được await
  } catch (error) {
    console.log('Never caught!');
  }
}

// ✅ ĐÚNG - await để catch lỗi
async function wrapper() {
  try {
    return await fetchData();
  } catch (error) {
    console.log('Error caught!', error);
  }
}
```

## Async/Await với Array methods

### map()

```javascript
// Lấy tất cả users song song
async function getAllUsers(userIds) {
  const promises = userIds.map(async (id) => {
    return await fetchUser(id);
  });

  return await Promise.all(promises);
}
```

### filter()

```javascript
// Filter với async predicate
async function filterAsync(array, predicate) {
  const results = await Promise.all(array.map(predicate));
  return array.filter((_, index) => results[index]);
}

// Sử dụng
const activeUsers = await filterAsync(users, async (user) => {
  const status = await checkUserStatus(user.id);
  return status === 'active';
});
```

### reduce()

```javascript
// Reduce với async operation (tuần tự)
async function reduceAsync(array, asyncFn, initialValue) {
  let accumulator = initialValue;

  for (const item of array) {
    accumulator = await asyncFn(accumulator, item);
  }

  return accumulator;
}
```

## Top-Level Await

Trong ES modules, bạn có thể sử dụng `await` ở top level:

```javascript
// config.mjs
const response = await fetch('/api/config');
export const config = await response.json();

// app.mjs
import { config } from './config.mjs';
console.log(config);
```

## Thử thách coding phỏng vấn

**Câu hỏi:** Viết một function lấy dữ liệu user, posts của họ, và comments cho mỗi post, tất cả được tối ưu hóa về hiệu suất.

**Giải pháp:**

```javascript
async function getUserFullData(userId) {
  try {
    // Bước 1: Lấy user và posts song song
    const [user, posts] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/posts`).then(r => r.json())
    ]);

    // Bước 2: Lấy comments cho tất cả posts song song
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

## Best practices

1. **Luôn sử dụng try/catch** để xử lý lỗi
2. **Sử dụng Promise.all()** cho các operations song song
3. **Tránh await trong loops** - dẫn đến thực thi tuần tự
4. **Thêm timeouts** cho network requests
5. **Cân nhắc Promise.allSettled()** khi một số failures có thể chấp nhận được
6. **Sử dụng AbortController** cho các requests có thể hủy
7. **Return await trong try/catch** để catch lỗi đúng cách
8. **Thêm loading states** trong các ứng dụng UI

## Async/Await vs Promises - Khi nào nên dùng

| Dùng Async/Await | Dùng Promises |
|-----------------|--------------|
| Operations tuần tự | Single async operation đơn giản |
| Nhiều await calls | Chaining rõ ràng hơn |
| Xử lý lỗi bằng try/catch | Nhiều nhánh |
| Logic phức tạp dễ đọc hơn | Code library/framework |

## Những điểm chính cần nhớ

- `async/await` là syntactic sugar của Promises
- `async` khiến function trả về một Promise
- `await` tạm dừng thực thi cho đến khi Promise resolves
- Sử dụng try/catch để xử lý lỗi
- Sử dụng Promise.all() cho operations song song
- Tránh await trong loops để có hiệu suất tốt hơn
- Luôn xử lý lỗi
- Async functions luôn trả về Promises
