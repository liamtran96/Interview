---
sidebar_position: 6
---

# Closure trong JavaScript

## Closure là gì?

**Closure** là khi một hàm có thể "nhớ" và truy cập các biến từ phạm vi bên ngoài nó, ngay cả khi phạm vi đó đã kết thúc thực thi. Hãy tưởng tượng như một cái ba lô mà hàm mang theo, chứa tất cả các biến cần thiết.

## Ví dụ đơn giản

```javascript
function outerFunction(x) {
  // Đây là biến trong hàm bên ngoài

  function innerFunction(y) {
    // Hàm bên trong có thể truy cập cả x và y
    return x + y;
  }

  return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(3)); // Kết quả: 8
```

### Điều gì đã xảy ra:

1. `outerFunction(5)` chạy và tạo biến `x = 5`
2. Nó trả về `innerFunction`
3. Dù `outerFunction` đã chạy xong, `innerFunction` vẫn nhớ `x = 5`
4. Khi gọi `addFive(3)`, nó dùng giá trị `x` đã được lưu

## Ví dụ thực tế: Bộ đếm

```javascript
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter1()); // 3

const counter2 = createCounter();
console.log(counter2()); // 1 (bộ đếm riêng biệt!)
```

Mỗi bộ đếm có biến `count` riêng mà không ai có thể truy cập trực tiếp từ bên ngoài.

## Tại sao Closure hữu ích?

1. **Bảo vệ dữ liệu**: Biến được bảo vệ khỏi sự can thiệp từ bên ngoài
2. **Tạo hàm tùy chỉnh**: Tạo ra các hàm có chức năng đặc biệt
3. **Xử lý bất đồng bộ**: Duy trì trạng thái trong các thao tác async

## Lỗi thường gặp

```javascript
// Cách này KHÔNG hoạt động như mong muốn
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // In ra 3, 3, 3
  }, 1000);
}

// Cách này hoạt động ĐÚNG
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // In ra 0, 1, 2
  }, 1000);
}
```

**Giải thích**: Từ khóa `let` tạo ra phạm vi mới cho mỗi lần lặp, còn `var` thì không.

## Ví dụ thêm: Tạo hàm nhân

```javascript
function createMultiplier(number) {
  return function (x) {
    return x * number;
  };
}

const multiplyBy2 = createMultiplier(2);
const multiplyBy10 = createMultiplier(10);

console.log(multiplyBy2(5)); // 10
console.log(multiplyBy10(3)); // 30
```

## Ví dụ nâng cao: Quản lý trạng thái

```javascript
function createUserManager() {
  let users = [];

  return {
    add: function (name) {
      users.push(name);
      return `Đã thêm ${name}`;
    },

    remove: function (name) {
      const index = users.indexOf(name);
      if (index > -1) {
        users.splice(index, 1);
        return `Đã xóa ${name}`;
      }
      return `Không tìm thấy ${name}`;
    },

    getAll: function () {
      return [...users]; // Trả về bản sao để bảo vệ dữ liệu gốc
    },
  };
}

const userManager = createUserManager();
console.log(userManager.add("Minh")); // "Đã thêm Minh"
console.log(userManager.add("Lan")); // "Đã thêm Lan"
console.log(userManager.getAll()); // ["Minh", "Lan"]
console.log(userManager.remove("Minh")); // "Đã xóa Minh"
console.log(userManager.getAll()); // ["Lan"]
```

## Những điểm cần nhớ

- ✅ Closure xảy ra tự động trong JavaScript
- ✅ Hàm bên trong có thể truy cập biến của hàm bên ngoài
- ✅ Các biến được "nhớ" ngay cả sau khi hàm bên ngoài kết thúc
- ✅ Mỗi closure độc lập và có bản sao biến riêng
- ✅ Đây là cách JavaScript duy trì trạng thái mà không cần biến toàn cục

## Thực hành

Hãy thử tự tạo các ví dụ và thực hành! Khái niệm sẽ trở nên rõ ràng hơn qua việc luyện tập.

### Bài tập đề xuất:

1. Tạo một hàm tính lãi suất với closure
2. Xây dựng một bộ đếm có thể tăng/giảm
3. Tạo một hệ thống cache đơn giản

---

_Chúc bạn học JavaScript vui vẻ và thành công! 🚀_
