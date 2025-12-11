---
sidebar_position: 2
---

# useState Hook

## useState là gì?

`useState` là một React Hook cho phép bạn **thêm state vào functional components**. Nó trả về một giá trị state và một hàm để cập nhật nó.

## Cú pháp cơ bản

```javascript
const [state, setState] = useState(initialValue);
```

- **`state`** - Giá trị state hiện tại
- **`setState`** - Hàm để cập nhật state
- **`initialValue`** - Giá trị state ban đầu (có thể là bất kỳ kiểu dữ liệu nào)

## Ví dụ đơn giản

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Câu hỏi phỏng vấn thường gặp

### Q1: setState hoạt động như thế nào?

**Trả lời:** `setState` **lên lịch** một lần re-render của component. Nó không cập nhật state ngay lập tức.

```javascript
function Example() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    console.log(count); // Vẫn là 0! Cập nhật state là async
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### Q2: Làm thế nào để cập nhật state dựa trên state trước đó?

**Trả lời:** Sử dụng **functional update form**:

```javascript
// ❌ SAI - Có thể gây ra vấn đề với nhiều cập nhật
setCount(count + 1);
setCount(count + 1); // Vẫn chỉ tăng 1!

// ✅ ĐÚNG - Sử dụng functional update
setCount(prevCount => prevCount + 1);
setCount(prevCount => prevCount + 1); // Tăng 2!
```

### Q3: Bạn có thể sử dụng nhiều useState hooks trong một component không?

**Trả lời:** Có! Bạn có thể có nhiều biến state:

```javascript
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
    </form>
  );
}
```

### Q4: useState có thể lưu trữ những kiểu giá trị nào?

**Trả lời:** **Bất kỳ kiểu dữ liệu JavaScript nào**:

```javascript
// Primitives
const [count, setCount] = useState(0);
const [name, setName] = useState('John');
const [isActive, setIsActive] = useState(true);

// Objects
const [user, setUser] = useState({ name: 'John', age: 30 });

// Arrays
const [items, setItems] = useState([1, 2, 3]);

// Functions (sử dụng lazy initialization)
const [value, setValue] = useState(() => expensiveComputation());
```

## Cập nhật Objects và Arrays

:::warning Quan trọng
State nên được xem như **immutable**. Luôn tạo objects/arrays mới thay vì sửa đổi những cái đã tồn tại.
:::

### Cập nhật Objects

```javascript
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
    email: 'john@example.com'
  });

  // ❌ SAI - Mutating state trực tiếp
  function updateAge() {
    user.age = 31; // Đừng làm thế này!
    setUser(user);
  }

  // ✅ ĐÚNG - Tạo object mới
  function updateAge() {
    setUser({
      ...user,
      age: 31
    });
  }

  // ✅ CŨNG ĐÚNG - Sử dụng functional update
  function updateAge() {
    setUser(prevUser => ({
      ...prevUser,
      age: prevUser.age + 1
    }));
  }
}
```

### Cập nhật Arrays

```javascript
function TodoList() {
  const [todos, setTodos] = useState(['Task 1', 'Task 2']);

  // Thêm item
  function addTodo(newTodo) {
    setTodos([...todos, newTodo]); // hoặc todos.concat(newTodo)
  }

  // Xóa item
  function removeTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  // Cập nhật item
  function updateTodo(index, newValue) {
    setTodos(todos.map((todo, i) =>
      i === index ? newValue : todo
    ));
  }
}
```

## Lazy Initialization

Nếu state ban đầu của bạn yêu cầu **tính toán tốn kém**, hãy sử dụng một hàm:

```javascript
// ❌ TỆ - Chạy ở mỗi lần render
const [state, setState] = useState(expensiveComputation());

// ✅ TỐT - Chỉ chạy một lần
const [state, setState] = useState(() => expensiveComputation());
```

Ví dụ:

```javascript
function Component() {
  // Chỉ chạy ở lần render đầu tiên
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('data');
    return stored ? JSON.parse(stored) : [];
  });
}
```

## State Batching và Queueing

### React batches State Updates như thế nào

React **batches nhiều state updates** trong event handlers để ngăn re-renders không cần thiết và cải thiện hiệu suất.

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);  // Chưa re-render
    setCount(count + 1);  // Chưa re-render
    setCount(count + 1);  // Batched - chỉ 1 re-render sau khi handler hoàn thành
    console.log(count);   // Vẫn là 0! Updates xảy ra sau handler
  }

  // Kết quả: count vẫn là 1, không phải 3!
  // Cả ba updates đều sử dụng cùng giá trị count (0)
  return <button onClick={handleClick}>Count: {count}</button>;
}
```

**Tại sao batching quan trọng:**
- **Hiệu suất** - Một re-render thay vì ba
- **Tính nhất quán** - Không có UI states một phần
- **Tính dự đoán được** - Tất cả state updates hoàn thành cùng nhau

### Update Queue

React xử lý state updates **tuần tự** trong một queue trong lần render tiếp theo.

#### Direct Values (Thay thế Queue)

```javascript
function handleClick() {
  setNumber(number + 5);  // Thay thế bằng number + 5
  setNumber(number + 5);  // Thay thế bằng number + 5
  setNumber(number + 5);  // Thay thế bằng number + 5
}
// Kết quả: number + 5 (không phải number + 15)
// Mỗi update sử dụng cùng giá trị snapshot
```

**Điều gì xảy ra:**
1. Bắt đầu với `number = 0`
2. Queue: "thay thế bằng 0 + 5"
3. Queue: "thay thế bằng 0 + 5"
4. Queue: "thay thế bằng 0 + 5"
5. React xử lý queue → Giá trị cuối cùng: `5`

#### Updater Functions (Updates Queue)

```javascript
function handleClick() {
  setNumber(n => n + 5);  // Update: lấy prev, cộng 5
  setNumber(n => n + 5);  // Update: lấy prev, cộng 5
  setNumber(n => n + 5);  // Update: lấy prev, cộng 5
}
// Kết quả: number + 15 (mỗi update xây dựng trên update trước đó)
```

**Điều gì xảy ra:**
1. Bắt đầu với `number = 0`
2. Queue: `n => n + 5` (0 + 5 = 5)
3. Queue: `n => n + 5` (5 + 5 = 10)
4. Queue: `n => n + 5` (10 + 5 = 15)
5. React xử lý queue → Giá trị cuối cùng: `15`

### Kết hợp Direct Values và Updater Functions

**Thứ tự quan trọng** khi kết hợp các loại update:

```javascript
function handleClick() {
  setNumber(number + 5);     // Thay thế: 0 + 5 = 5
  setNumber(n => n + 1);     // Update: 5 + 1 = 6
  setNumber(42);             // Thay thế: 42
  setNumber(n => n + 1);     // Update: 42 + 1 = 43
}
// Kết quả: 43
```

**Xử lý queue từng bước:**

| Update | Queue Instruction | Result |
|--------|------------------|--------|
| `setNumber(number + 5)` | "thay thế bằng 5" | 5 |
| `setNumber(n => n + 1)` | "n + 1" | 6 |
| `setNumber(42)` | "thay thế bằng 42" | 42 |
| `setNumber(n => n + 1)` | "n + 1" | 43 |

### Ví dụ thực tế

#### Ví dụ 1: Nhiều Increments

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // ❌ SAI - Chỉ tăng 1
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Tất cả đều sử dụng cùng giá trị count (0)
  }

  function handleClickCorrect() {
    // ✅ ĐÚNG - Tăng 3
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
    // Mỗi cái sử dụng kết quả của cái trước đó
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Wrong (+1)</button>
      <button onClick={handleClickCorrect}>Correct (+3)</button>
    </div>
  );
}
```

#### Ví dụ 2: Mixed Updates

```javascript
function NumberGame() {
  const [number, setNumber] = useState(0);

  function processNumber() {
    setNumber(number + 5);     // 0 + 5 = 5
    setNumber(n => n * 2);     // 5 * 2 = 10
    setNumber(100);            // Thay thế bằng 100
    setNumber(n => n - 50);    // 100 - 50 = 50
  }

  return (
    <div>
      <p>Number: {number}</p>
      <button onClick={processNumber}>Process</button>
    </div>
  );
}
```

#### Ví dụ 3: Form Submission

```javascript
function Form() {
  const [data, setData] = useState({ name: '', submitted: false });

  function handleSubmit(e) {
    e.preventDefault();

    // ❌ SAI - submitted có thể là false trong lúc API call
    setData({ ...data, submitted: true });
    api.submit(data);

    // ✅ ĐÚNG - Đảm bảo sử dụng data mới nhất
    setData(prev => ({ ...prev, submitted: true }));
    setData(prev => {
      api.submit(prev);
      return prev;
    });
  }
}
```

### React 18: Automatic Batching Ở mọi nơi

Trước React 18, batching chỉ hoạt động trong event handlers. React 18 kích hoạt **automatic batching ở mọi nơi**:

```javascript
// React 17: KHÔNG batched (2 re-renders)
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}, 1000);

// React 18: Batched (1 re-render)
setTimeout(() => {
  setCount(c => c + 1);  // Batched
  setFlag(f => !f);      // Batched
}, 1000);
```

**Bây giờ batched trong:**
- ✅ Event handlers (luôn batched)
- ✅ Promises
- ✅ setTimeout/setInterval
- ✅ Native event handlers
- ✅ Bất kỳ async code nào khác

**Opt-out khỏi batching (hiếm khi):**

```javascript
import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(c => c + 1);
}); // Re-renders ngay lập tức

flushSync(() => {
  setFlag(f => !f);
}); // Re-renders ngay lập tức
// Tổng: 2 re-renders
```

### Câu hỏi phỏng vấn thường gặp

#### Q: Tại sao sử dụng updater functions?

**Trả lời:**

**Sử dụng updater functions khi:**
1. State mới phụ thuộc vào state trước đó
2. Nhiều updates trong một handler
3. Updates trong async code (timers, promises)

```javascript
// ❌ Không nên - Dựa vào giá trị cũ
setCount(count + 1);

// ✅ Nên - Luôn sử dụng giá trị mới nhất
setCount(c => c + 1);
```

#### Q: Sự khác biệt giữa những cái này là gì?

```javascript
// Version A
setNumber(number + 1);
setNumber(number + 1);

// Version B
setNumber(n => n + 1);
setNumber(n => n + 1);
```

**Trả lời:**

- **Version A**: Cả hai sử dụng cùng giá trị `number` → Tăng 1
- **Version B**: Cái thứ hai sử dụng kết quả của cái đầu tiên → Tăng 2

**Version A queue:**
```
number = 0
Thay thế bằng 0 + 1 = 1
Thay thế bằng 0 + 1 = 1
Cuối cùng: 1
```

**Version B queue:**
```
number = 0
n => n + 1: 0 → 1
n => n + 1: 1 → 2
Cuối cùng: 2
```

#### Q: Khi nào React xử lý update queue?

**Trả lời:**

React xử lý queue **sau khi event handler của bạn hoàn thành**:

```javascript
function handleClick() {
  console.log('Before:', count);  // 0

  setCount(c => c + 1);
  setCount(c => c + 1);
  setCount(c => c + 1);

  console.log('After:', count);   // Vẫn là 0!
  // State chưa được cập nhật
}

// Sau khi handleClick hoàn thành:
// React xử lý queue → count trở thành 3
// Component re-renders với giá trị mới
```

### Quy tắc cho Updater Functions

1. **Phải là pure** - Không có side effects
2. **Chỉ return state mới** - Không mutate
3. **Không thể gọi setState bên trong** - Vòng lặp vô hạn

```javascript
// ✅ ĐÚNG - Pure function
setCount(c => c + 1);

// ❌ SAI - Side effect
setCount(c => {
  console.log(c);  // Side effect!
  return c + 1;
});

// ❌ SAI - Gọi setState bên trong
setCount(c => {
  setOtherState(c);  // Đừng làm thế này!
  return c + 1;
});
```

### Khi nào sử dụng mỗi cách tiếp cận

| Tình huống | Sử dụng | Ví dụ |
|----------|-----|---------|
| Update đơn với giá trị hiện tại | Direct value | `setCount(5)` |
| Update dựa trên giá trị trước đó | Updater function | `setCount(c => c + 1)` |
| Nhiều updates trong handler | Updater function | Xem ví dụ trên |
| Updates độc lập | Direct value | `setName('John')` |
| Tính toán từ props | Direct value | `setTotal(price * quantity)` |
| Toggle boolean | Updater function | `setOn(prev => !prev)` |

## Lỗi thường gặp

### 1. Stale State trong Callbacks

```javascript
function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // ❌ Sử dụng giá trị count cũ
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps - count luôn là 0 trong closure này

  // ✅ Giải pháp: Sử dụng functional update
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
```

### 2. Object Reference Issues

```javascript
function App() {
  const [user, setUser] = useState({ name: 'John' });

  // ❌ React sẽ không re-render nếu object reference giống nhau
  function updateName() {
    user.name = 'Jane';
    setUser(user); // Reference giống nhau!
  }

  // ✅ Tạo object mới
  function updateName() {
    setUser({ ...user, name: 'Jane' });
  }
}
```

## Interview Coding Challenge

**Câu hỏi:** Tạo một toggle button component chuyển đổi giữa "ON" và "OFF".

**Giải pháp:**

```javascript
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

// Thay thế với functional update (tốt hơn cho logic phức tạp)
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(prev => !prev)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

## Best Practices

1. **Sử dụng functional updates** khi state mới phụ thuộc vào state cũ
2. **Không mutate state** - luôn tạo objects/arrays mới
3. **Sử dụng lazy initialization** cho giá trị ban đầu tốn kém
4. **Tách state liên quan** thành các lần gọi useState riêng biệt để tổ chức tốt hơn
5. **Cân nhắc useReducer** cho state logic phức tạp

## Key Takeaways

- `useState` thêm state vào functional components
- State updates là asynchronous
- Luôn xem state như immutable
- Sử dụng functional updates cho state phụ thuộc vào giá trị trước đó
- Có thể có nhiều useState hooks trong một component
