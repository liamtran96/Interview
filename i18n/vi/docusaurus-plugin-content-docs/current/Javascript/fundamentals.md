---
sidebar_position: 1
---

# Kiến Thức Cơ Bản về JavaScript

## JavaScript là gì?

**JavaScript** là một ngôn ngữ lập trình cấp cao, được thông dịch (interpreted), cho phép tạo ra các trang web tương tác. Đây là một trong ba công nghệ cốt lõi của web cùng với HTML và CSS.

:::info ECMAScript
JavaScript triển khai đặc tả **ECMAScript**. ES2024/ES2025 là các phiên bản mới nhất với các tính năng như temporal API, pattern matching và nhiều hơn nữa.
:::

## Biến và Kiểu Dữ Liệu

### Khai Báo Biến

```javascript
// var (function-scoped, tránh dùng trong code hiện đại)
var x = 10;

// let (block-scoped, có thể gán lại)
let y = 20;
y = 30; // ✓ OK

// const (block-scoped, không thể gán lại)
const z = 40;
z = 50; // ✗ Error: Assignment to constant variable

// const với object (reference là hằng số, không phải nội dung)
const person = { name: 'John' };
person.name = 'Jane'; // ✓ OK (sửa thuộc tính)
person = {}; // ✗ Error (gán lại reference)
```

**Best Practice:** Sử dụng `const` mặc định, `let` khi cần gán lại, không bao giờ dùng `var`.

### Kiểu Dữ Liệu

**Primitive Types** (bất biến - immutable):

```javascript
// 1. Number
let integer = 42;
let float = 3.14;
let negative = -10;
let scientific = 2.998e8; // 299800000

// Các giá trị number đặc biệt
let infinity = Infinity;
let negInfinity = -Infinity;
let notANumber = NaN; // Not a Number

// 2. BigInt (cho số nguyên rất lớn)
let bigNum = 1234567890123456789012345678901234567890n;
let bigNum2 = BigInt("9007199254740991");

// 3. String
let single = 'Single quotes';
let double = "Double quotes";
let template = `Template literal with ${integer}`;

// 4. Boolean
let isTrue = true;
let isFalse = false;

// 5. Undefined (đã khai báo nhưng chưa gán giá trị)
let notAssigned;
console.log(notAssigned); // undefined

// 6. Null (cố ý không có giá trị)
let empty = null;

// 7. Symbol (định danh duy nhất)
let sym1 = Symbol('description');
let sym2 = Symbol('description');
console.log(sym1 === sym2); // false (luôn luôn duy nhất)
```

**Reference Type:**

```javascript
// 8. Object (bao gồm array, function, date, v.v.)
let obj = { name: 'John', age: 30 };
let arr = [1, 2, 3];
let func = function() { };
let date = new Date();
```

### Kiểm Tra Kiểu

```javascript
// toán tử typeof
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 100n);        // "bigint"
console.log(typeof {});          // "object"
console.log(typeof []);          // "object" (array là object!)
console.log(typeof null);        // "object" (lỗi lịch sử)
console.log(typeof function(){}); // "function"

// Kiểm tra array tốt hơn
Array.isArray([]);     // true
Array.isArray({});     // false

// Kiểm tra null tốt hơn
value === null;        // true chỉ cho null
```

## Chuyển Đổi Kiểu

### Chuyển Đổi Ngầm (Coercion)

```javascript
// Chuyển sang string
console.log("5" + 3);      // "53" (number sang string)
console.log("5" - 3);      // 2 (string sang number)
console.log("5" * "2");    // 10 (cả hai sang number)

// Chuyển sang boolean
console.log(Boolean(0));        // false
console.log(Boolean(""));       // false
console.log(Boolean(null));     // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN));      // false
console.log(Boolean([]));       // true (array rỗng là truthy!)
console.log(Boolean({}));       // true (object rỗng là truthy!)

// So sánh lỏng lẻo (== thực hiện type coercion)
console.log(5 == "5");     // true
console.log(null == undefined); // true
console.log(0 == false);   // true

// So sánh nghiêm ngặt (=== không có coercion)
console.log(5 === "5");    // false
console.log(null === undefined); // false
```

**Best Practice:** Luôn sử dụng `===` và `!==` (so sánh nghiêm ngặt).

### Chuyển Đổi Tường Minh

```javascript
// Sang Number
Number("42");      // 42
parseInt("42px");  // 42 (dừng ở ký tự không phải số đầu tiên)
parseFloat("3.14"); // 3.14
+"42";             // 42 (toán tử unary plus)

// Sang String
String(42);        // "42"
(42).toString();   // "42"
42 + "";           // "42"

// Sang Boolean
Boolean(1);        // true
!!1;               // true (phủ định kép)
```

## Toán Tử

### Toán Tử Số Học

```javascript
let a = 10, b = 3;

console.log(a + b);  // 13 (cộng)
console.log(a - b);  // 7  (trừ)
console.log(a * b);  // 30 (nhân)
console.log(a / b);  // 3.333... (chia)
console.log(a % b);  // 1  (modulus/số dư)
console.log(a ** b); // 1000 (lũy thừa, ES2016)

// Tăng/Giảm
let x = 5;
console.log(x++);    // 5 (post-increment, trả về rồi tăng)
console.log(x);      // 6
console.log(++x);    // 7 (pre-increment, tăng rồi trả về)
```

### Toán Tử So Sánh

```javascript
console.log(5 > 3);    // true
console.log(5 < 3);    // false
console.log(5 >= 5);   // true
console.log(5 <= 5);   // true
console.log(5 == "5"); // true (so sánh lỏng lẻo)
console.log(5 === "5"); // false (so sánh nghiêm ngặt)
console.log(5 != "5"); // false (không bằng lỏng lẻo)
console.log(5 !== "5"); // true (không bằng nghiêm ngặt)
```

### Toán Tử Logic

```javascript
// AND (&&) - trả về giá trị falsy đầu tiên hoặc giá trị cuối cùng
console.log(true && true);   // true
console.log(true && false);  // false
console.log("hello" && 0);   // 0
console.log("hello" && "world"); // "world"

// OR (||) - trả về giá trị truthy đầu tiên hoặc giá trị cuối cùng
console.log(false || true);  // true
console.log(0 || "hello");   // "hello"
console.log("" || "default"); // "default"

// NOT (!)
console.log(!true);          // false
console.log(!0);             // true
console.log(!"hello");       // false

// Nullish Coalescing (??) - ES2020
console.log(null ?? "default");     // "default"
console.log(undefined ?? "default"); // "default"
console.log(0 ?? "default");        // 0 (0 không phải là nullish!)
console.log("" ?? "default");       // "" (string rỗng không phải nullish!)
```

### Toán Tử Khác

```javascript
// Toán tử ba ngôi (ternary)
let age = 20;
let status = age >= 18 ? "adult" : "minor";

// Optional chaining (?.) - ES2020
let user = { address: { city: "NYC" } };
console.log(user?.address?.city);    // "NYC"
console.log(user?.phone?.number);    // undefined (không có lỗi)

// Spread operator (...) - ES2015
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];  // [1, 2, 3, 4, 5]

let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }
```

## Function

### Function Declaration

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("John")); // "Hello, John!"
```

### Function Expression

```javascript
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

### Arrow Function (ES2015)

```javascript
// Cú pháp cơ bản
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Cú pháp ngắn hơn (implicit return)
const greet2 = name => `Hello, ${name}!`;

// Không có tham số
const sayHello = () => "Hello!";

// Nhiều tham số
const add = (a, b) => a + b;

// Trả về object (bọc trong dấu ngoặc đơn)
const makePerson = (name, age) => ({ name, age });
```

**Arrow function vs regular function:**
- Không có binding `this` (kế thừa từ parent scope)
- Không có object `arguments`
- Không thể dùng làm constructor
- Cú pháp ngắn gọn hơn

### Default Parameter (ES2015)

```javascript
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(greet());        // "Hello, Guest!"
console.log(greet("John"));  // "Hello, John!"
```

### Rest Parameter (ES2015)

```javascript
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

## Array

### Tạo Array

```javascript
// Array literal
let arr = [1, 2, 3, 4, 5];

// Array constructor
let arr2 = new Array(5); // Array với 5 slot rỗng
let arr3 = new Array(1, 2, 3); // [1, 2, 3]

// Array.from() - ES2015
let arr4 = Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']
let arr5 = Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
```

### Phương Thức Array

```javascript
let arr = [1, 2, 3, 4, 5];

// Truy cập
arr[0];           // 1 (phần tử đầu tiên)
arr[arr.length - 1]; // 5 (phần tử cuối cùng)

// Thêm/Xóa
arr.push(6);      // Thêm vào cuối → [1, 2, 3, 4, 5, 6]
arr.pop();        // Xóa từ cuối → trả về 6
arr.unshift(0);   // Thêm vào đầu → [0, 1, 2, 3, 4, 5]
arr.shift();      // Xóa từ đầu → trả về 0

// Splice (thêm/xóa ở bất kỳ đâu)
arr.splice(2, 1);         // Xóa 1 phần tử tại index 2
arr.splice(2, 0, 'a', 'b'); // Chèn 'a', 'b' tại index 2

// Slice (trích xuất một phần)
arr.slice(1, 3);  // [2, 3] (không thay đổi array gốc)

// Tìm kiếm
arr.indexOf(3);   // 2 (index của lần xuất hiện đầu tiên)
arr.includes(3);  // true
arr.find(x => x > 3);  // 4 (phần tử đầu tiên > 3)
arr.findIndex(x => x > 3); // 3 (index của phần tử đầu tiên > 3)

// Biến đổi
arr.map(x => x * 2);     // [2, 4, 6, 8, 10]
arr.filter(x => x > 2);  // [3, 4, 5]
arr.reduce((sum, x) => sum + x, 0); // 15

// Lặp
arr.forEach((value, index) => {
  console.log(`${index}: ${value}`);
});

// Kiểm tra
arr.some(x => x > 4);    // true (ít nhất một > 4)
arr.every(x => x > 0);   // true (tất cả > 0)

// Sắp xếp (thay đổi array gốc!)
arr.sort((a, b) => a - b); // Tăng dần
arr.sort((a, b) => b - a); // Giảm dần

// Nối
arr.join(', ');   // "1, 2, 3, 4, 5"

// Đảo ngược (thay đổi array gốc!)
arr.reverse();    // [5, 4, 3, 2, 1]
```

### Array Destructuring (ES2015)

```javascript
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Bỏ qua phần tử
let [first, , third] = [1, 2, 3];

// Rest pattern
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Giá trị mặc định
let [x = 0, y = 0] = [1];
console.log(x, y); // 1 0
```

## Object

### Tạo Object

```javascript
// Object literal
let person = {
  name: 'John',
  age: 30,
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

// Object constructor
let person2 = new Object();
person2.name = 'Jane';

// Object.create()
let person3 = Object.create(person);
```

### Truy Cập Thuộc Tính

```javascript
let person = { name: 'John', age: 30 };

// Dot notation
console.log(person.name);  // "John"

// Bracket notation
console.log(person['age']); // 30

// Truy cập thuộc tính động
let prop = 'name';
console.log(person[prop]); // "John"
```

### Phương Thức Object

```javascript
let person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  city: 'NYC'
};

// Key, Value, Entry
Object.keys(person);    // ['firstName', 'lastName', 'age', 'city']
Object.values(person);  // ['John', 'Doe', 30, 'NYC']
Object.entries(person); // [['firstName', 'John'], ['lastName', 'Doe'], ...]

// Assign (gộp object)
let target = { a: 1 };
let source = { b: 2, c: 3 };
Object.assign(target, source); // { a: 1, b: 2, c: 3 }

// Freeze (làm bất biến)
Object.freeze(person);
person.age = 31; // Không có hiệu lực trong strict mode, thất bại im lặng trong normal mode

// Seal (ngăn thêm/xóa, cho phép sửa)
Object.seal(person);
```

### Computed Property Name (ES2015)

```javascript
let propName = 'age';

let person = {
  name: 'John',
  [propName]: 30,           // age: 30
  ['first' + 'Name']: 'John' // firstName: 'John'
};
```

### Object Destructuring (ES2015)

```javascript
let person = { name: 'John', age: 30, city: 'NYC' };

// Cơ bản
let { name, age } = person;
console.log(name, age); // "John" 30

// Đổi tên
let { name: fullName, age: years } = person;
console.log(fullName, years); // "John" 30

// Giá trị mặc định
let { name, country = 'USA' } = person;
console.log(country); // "USA"

// Rest pattern
let { name, ...rest } = person;
console.log(rest); // { age: 30, city: 'NYC' }
```

### Shorthand Property (ES2015)

```javascript
let name = 'John';
let age = 30;

// Cách cũ
let person1 = { name: name, age: age };

// Shorthand
let person2 = { name, age }; // { name: 'John', age: 30 }
```

## Cấu Trúc Điều Khiển

### Câu Lệnh Điều Kiện

```javascript
// if-else
if (age >= 18) {
  console.log("Adult");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}

// switch
switch (day) {
  case 'Monday':
    console.log("Start of week");
    break;
  case 'Friday':
    console.log("End of week");
    break;
  default:
    console.log("Midweek");
}

// Ternary
let status = age >= 18 ? "Adult" : "Minor";
```

### Vòng Lặp

```javascript
let arr = [1, 2, 3, 4, 5];

// vòng lặp for
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// for...of (lặp giá trị) - ES2015
for (let value of arr) {
  console.log(value);
}

// for...in (lặp key)
let obj = { a: 1, b: 2, c: 3 };
for (let key in obj) {
  console.log(key, obj[key]);
}

// while
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do-while
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

// forEach
arr.forEach((value, index) => {
  console.log(index, value);
});
```

## Xử Lý Lỗi

```javascript
try {
  // Code có thể gây lỗi
  throw new Error("Something went wrong");
} catch (error) {
  // Xử lý lỗi
  console.error(error.message);
} finally {
  // Luôn thực thi
  console.log("Cleanup");
}

// Custom error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid input");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  }
}
```

## Câu Hỏi Phỏng Vấn

### Q1: Các kiểu dữ liệu trong JavaScript là gì?

**Trả lời:**

**8 kiểu dữ liệu trong JavaScript:**

**Kiểu nguyên thủy (primitive)** (bất biến, lưu theo giá trị):
1. **Number** - `42`, `3.14`, `Infinity`, `NaN`
2. **BigInt** - `1234567890123456789012345678901234567890n`
3. **String** - `"hello"`, `'world'`, `` `template` ``
4. **Boolean** - `true`, `false`
5. **Undefined** - Biến đã khai báo nhưng chưa gán giá trị
6. **Null** - Cố ý không có giá trị
7. **Symbol** - Định danh duy nhất (ES2015)

**Kiểu tham chiếu (reference)** (có thể thay đổi, lưu theo tham chiếu):
8. **Object** - `{}`, `[]`, `function(){}`, `new Date()`, v.v.

```javascript
// Primitive (truyền theo giá trị)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (không thay đổi)

// Object (truyền theo tham chiếu)
let obj1 = { value: 10 };
let obj2 = obj1;
obj2.value = 20;
console.log(obj1.value); // 20 (đã thay đổi!)
```

### Q2: Sự khác biệt giữa `null` và `undefined` là gì?

**Trả lời:**

| Đặc điểm | `undefined` | `null` |
|---------|-------------|--------|
| **Kiểu** | `undefined` | `object` (lỗi lịch sử) |
| **Ý nghĩa** | Biến đã khai báo nhưng chưa gán giá trị | Cố ý không có giá trị |
| **Gán giá trị** | Tự động được JavaScript gán | Phải gán tường minh |
| **Use Case** | Giá trị mặc định cho biến chưa khởi tạo | Chỉ định tường minh "không có giá trị" |

```javascript
let x; // undefined (đã khai báo nhưng chưa gán)
let y = null; // null (gán tường minh)

console.log(typeof x); // "undefined"
console.log(typeof y); // "object"

console.log(x == y);   // true (so sánh lỏng lẻo)
console.log(x === y);  // false (so sánh nghiêm ngặt)
```

### Q3: Sự khác biệt giữa `==` và `===` là gì?

**Trả lời:**

| Toán tử | Tên | Chuyển đổi kiểu | So sánh |
|----------|------|-----------------|------------|
| `==` | So sánh lỏng lẻo | Có | Chuyển đổi kiểu trước khi so sánh |
| `===` | So sánh nghiêm ngặt | Không | So sánh cả giá trị và kiểu |

```javascript
// So sánh lỏng lẻo (==)
console.log(5 == "5");     // true (string chuyển sang number)
console.log(null == undefined); // true
console.log(0 == false);   // true

// So sánh nghiêm ngặt (===)
console.log(5 === "5");    // false (kiểu khác nhau)
console.log(null === undefined); // false
console.log(0 === false);  // false
```

**Best Practice:** Luôn sử dụng `===` và `!==` để tránh hành vi không mong muốn.

### Q4: Sự khác biệt giữa `let`, `const`, và `var` là gì?

**Trả lời:**

| Đặc điểm | `var` | `let` | `const` |
|---------|-------|-------|---------|
| **Scope** | Function | Block | Block |
| **Hoisting** | Có (khởi tạo là undefined) | Có (không khởi tạo) | Có (không khởi tạo) |
| **Gán lại** | Có | Có | Không |
| **Khai báo lại** | Có | Không | Không |
| **Temporal Dead Zone** | Không | Có | Có |

```javascript
// var: Function-scoped
function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (truy cập được ngoài block)
}

// let: Block-scoped
function test2() {
  if (true) {
    let y = 10;
  }
  console.log(y); // ReferenceError
}

// const: Không thể gán lại
const z = 10;
z = 20; // TypeError

// Nhưng có thể sửa thuộc tính object
const obj = { value: 10 };
obj.value = 20; // ✓ OK
obj = {}; // ✗ Error
```

**Best Practice:** Sử dụng `const` mặc định, `let` khi cần gán lại, không bao giờ dùng `var`.

### Q5: Hoisting trong JavaScript là gì?

**Trả lời:**

**Hoisting** là hành vi của JavaScript di chuyển các khai báo lên đầu scope của chúng trong quá trình biên dịch.

```javascript
// Function hoisting
greet(); // Hoạt động! "Hello"

function greet() {
  console.log("Hello");
}

// var hoisting (khai báo được hoisted, không phải gán giá trị)
console.log(x); // undefined (không phải ReferenceError)
var x = 10;
console.log(x); // 10

// Tương đương với:
var x;
console.log(x); // undefined
x = 10;

// let/const hoisting (Temporal Dead Zone)
console.log(y); // ReferenceError (không thể truy cập trước khi khởi tạo)
let y = 20;

// Function expression KHÔNG được hoisted
greet2(); // TypeError: greet2 is not a function
var greet2 = function() {
  console.log("Hello");
};
```

### Q6: Sự khác biệt giữa function declaration và function expression là gì?

**Trả lời:**

```javascript
// Function Declaration
function greet() {
  return "Hello";
}
// - Được hoisted (có thể gọi trước khi khai báo)
// - Có tên
// - Tạo binding trong scope hiện tại

// Function Expression
const greet2 = function() {
  return "Hello";
};
// - KHÔNG được hoisted (không thể gọi trước khi gán)
// - Có thể anonymous hoặc có tên
// - Biến được hoisted, nhưng function thì không

// Arrow Function (ES2015)
const greet3 = () => "Hello";
// - KHÔNG được hoisted
// - Không có binding `this`
// - Không thể dùng làm constructor
// - Ngắn gọn hơn
```

**Khi nào sử dụng:**
- **Declaration:** Function cấp cao nhất, cần hoisting
- **Expression:** Callback, function được định nghĩa có điều kiện
- **Arrow:** Callback ngắn, khi không cần `this`

### Q7: Giá trị truthy và falsy trong JavaScript là gì?

**Trả lời:**

**Giá trị Falsy** (chuyển thành `false` trong ngữ cảnh Boolean):
- `false`
- `0` và `-0`
- `""` (string rỗng)
- `null`
- `undefined`
- `NaN`

**Mọi thứ khác là truthy:**
- `true`
- Số khác 0 (bao gồm số âm)
- String không rỗng (bao gồm `"0"`, `"false"`)
- Object và array (kể cả rỗng!)
- Function

```javascript
// Falsy
if (0) { } // Không thực thi
if ("") { } // Không thực thi
if (null) { } // Không thực thi

// Truthy
if (1) { } // Thực thi
if ("0") { } // Thực thi (string "0" là truthy!)
if ([]) { } // Thực thi (array rỗng là truthy!)
if ({}) { } // Thực thi (object rỗng là truthy!)

// Pattern phổ biến: giá trị mặc định
function greet(name) {
  name = name || "Guest"; // Dùng "Guest" nếu name là falsy
  console.log(`Hello, ${name}!`);
}

// Hiện đại: Nullish coalescing (??)
function greet2(name) {
  name = name ?? "Guest"; // Dùng "Guest" chỉ khi name là null/undefined
  console.log(`Hello, ${name}!`);
}
```

### Q8: Sự khác biệt giữa `.map()`, `.filter()`, và `.reduce()` là gì?

**Trả lời:**

```javascript
let numbers = [1, 2, 3, 4, 5];

// map() - Biến đổi mỗi phần tử, trả về array mới (cùng độ dài)
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter() - Giữ các phần tử vượt qua điều kiện, trả về array mới (≤ độ dài)
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce() - Rút gọn array thành một giá trị duy nhất
let sum = numbers.reduce((total, n) => total + n, 0);
// 15

// Ví dụ kết hợp
let result = numbers
  .filter(n => n > 2)       // [3, 4, 5]
  .map(n => n * 2)          // [6, 8, 10]
  .reduce((sum, n) => sum + n, 0); // 24
```

### Q9: Spread operator là gì và cách sử dụng?

**Trả lời:**

**Spread operator** (`...`) mở rộng các iterable thành các phần tử riêng lẻ.

```javascript
// Array
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Sao chép array
let copy = [...arr1]; // Shallow copy

// Đối số function
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(...arr1)); // 6

// Object (ES2018)
let obj1 = { a: 1, b: 2 };
let obj2 = { c: 3, d: 4 };
let merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Ghi đè thuộc tính
let updated = { ...obj1, b: 10 }; // { a: 1, b: 10 }
```

### Q10: Destructuring trong JavaScript là gì?

**Trả lời:**

**Destructuring** trích xuất giá trị từ array hoặc object thành các biến riêng biệt.

**Array destructuring:**
```javascript
let [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1 2 3

// Bỏ qua phần tử
let [first, , third] = [1, 2, 3];

// Rest pattern
let [head, ...tail] = [1, 2, 3, 4, 5];
console.log(tail); // [2, 3, 4, 5]

// Hoán đổi biến
let x = 1, y = 2;
[x, y] = [y, x]; // Hoán đổi
```

**Object destructuring:**
```javascript
let person = { name: 'John', age: 30, city: 'NYC' };

// Cơ bản
let { name, age } = person;

// Đổi tên
let { name: fullName } = person;

// Giá trị mặc định
let { country = 'USA' } = person;

// Rest pattern
let { name, ...rest } = person;
console.log(rest); // { age: 30, city: 'NYC' }

// Lồng nhau
let user = {
  name: 'John',
  address: { city: 'NYC', zip: '10001' }
};
let { address: { city } } = user;
console.log(city); // "NYC"
```

## Best Practice

1. **Sử dụng strict mode** - `"use strict";` bắt các lỗi phổ biến
2. **Sử dụng `const` mặc định** - Chỉ dùng `let` khi cần gán lại
3. **Sử dụng `===` thay vì `==`** - Tránh type coercion không mong muốn
4. **Sử dụng arrow function** - Cho callback ngắn và khi không cần `this`
5. **Sử dụng template literal** - Cho string interpolation
6. **Sử dụng destructuring** - Code dễ đọc hơn
7. **Sử dụng spread operator** - Để sao chép và gộp
8. **Tránh biến toàn cục** - Sử dụng module và scope phù hợp
9. **Xử lý lỗi** - Sử dụng try/catch cho các thao tác có thể thất bại
10. **Đặt tên biến mô tả** - `isUserLoggedIn` không phải `flag1`

## Tài Nguyên

- [MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [ECMAScript Specification](https://tc39.es/ecma262/)
- [Can I Use](https://caniuse.com/) - Tương thích trình duyệt
- [Babel](https://babeljs.io/) - JavaScript compiler cho các tính năng hiện đại
