---
sidebar_position: 1
---

# CSS Flexbox

## Flexbox là gì?

**Flexbox** (Flexible Box Layout) là một mô hình layout CSS để sắp xếp các phần tử trong không gian **một chiều** (theo hàng hoặc cột). Nó giúp dễ dàng căn chỉnh, phân bổ và định kích thước các phần tử.

## Flex Container vs Flex Items

```html
<div class="container">  <!-- Flex Container -->
  <div>Item 1</div>      <!-- Flex Item -->
  <div>Item 2</div>      <!-- Flex Item -->
  <div>Item 3</div>      <!-- Flex Item -->
</div>
```

```css
.container {
  display: flex; /* Kích hoạt flexbox */
}
```

## Thuộc tính của Flex Container

### display

```css
.container {
  display: flex;        /* Flex container ở cấp block */
  display: inline-flex; /* Flex container ở cấp inline */
}
```

### flex-direction

Kiểm soát hướng của trục chính:

```css
.container {
  flex-direction: row;            /* → (mặc định) */
  flex-direction: row-reverse;    /* ← */
  flex-direction: column;         /* ↓ */
  flex-direction: column-reverse; /* ↑ */
}
```

### justify-content

Căn chỉnh các phần tử dọc theo **trục chính**:

```css
.container {
  justify-content: flex-start;    /* ←—— (mặc định) */
  justify-content: flex-end;      /* ——→ */
  justify-content: center;        /* -—- */
  justify-content: space-between; /* |-  -| */
  justify-content: space-around;  /* -| |- */
  justify-content: space-evenly;  /* |- -|- -| */
}
```

### align-items

Căn chỉnh các phần tử dọc theo **trục ngang**:

```css
.container {
  align-items: stretch;     /* ||| (mặc định) */
  align-items: flex-start;  /* Trên cùng */
  align-items: flex-end;    /* Dưới cùng */
  align-items: center;      /* Giữa */
  align-items: baseline;    /* Baseline của text */
}
```

### flex-wrap

Kiểm soát việc xuống hàng:

```css
.container {
  flex-wrap: nowrap;       /* Một dòng (mặc định) */
  flex-wrap: wrap;         /* Nhiều dòng, từ trên xuống dưới */
  flex-wrap: wrap-reverse; /* Nhiều dòng, từ dưới lên trên */
}
```

### align-content

Căn chỉnh **nhiều dòng** (chỉ hoạt động với `flex-wrap`):

```css
.container {
  flex-wrap: wrap;
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
  align-content: stretch; /* (mặc định) */
}
```

### gap

Khoảng cách giữa các phần tử:

```css
.container {
  gap: 20px;           /* Cả hàng và cột */
  row-gap: 10px;       /* Chỉ khoảng cách hàng */
  column-gap: 20px;    /* Chỉ khoảng cách cột */
}
```

## Thuộc tính của Flex Item

### flex-grow

Mức độ phần tử phát triển so với các phần tử khác:

```css
.item {
  flex-grow: 0; /* Không phát triển (mặc định) */
  flex-grow: 1; /* Phát triển đều nhau */
  flex-grow: 2; /* Phát triển gấp đôi */
}
```

### flex-shrink

Mức độ phần tử co lại:

```css
.item {
  flex-shrink: 1; /* Co lại nếu cần (mặc định) */
  flex-shrink: 0; /* Không co lại */
}
```

### flex-basis

Kích thước ban đầu trước khi phát triển/co lại:

```css
.item {
  flex-basis: auto;  /* Sử dụng kích thước nội dung (mặc định) */
  flex-basis: 200px; /* Kích thước cố định */
  flex-basis: 50%;   /* Phần trăm */
}
```

### flex (Viết tắt)

```css
.item {
  flex: 1;              /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  flex: 0 0 200px;      /* Không grow, không shrink, basis 200px */
  flex: 1 1 auto;       /* Grow, shrink, basis auto */
}
```

### align-self

Ghi đè `align-items` cho từng phần tử riêng lẻ:

```css
.item {
  align-self: auto;       /* Kế thừa từ container (mặc định) */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: baseline;
  align-self: stretch;
}
```

### order

Thay đổi thứ tự hiển thị:

```css
.item1 { order: 2; }
.item2 { order: 1; } /* Hiển thị đầu tiên */
.item3 { order: 3; }
```

## Các câu hỏi phỏng vấn thường gặp

### Q1: Sự khác biệt giữa justify-content và align-items là gì?

**Trả lời:**

- **`justify-content`** - Căn chỉnh dọc theo **trục chính** (ngang trong row, dọc trong column)
- **`align-items`** - Căn chỉnh dọc theo **trục ngang** (dọc trong row, ngang trong column)

```css
.container {
  display: flex;
  flex-direction: row; /* Trục chính: ngang → */

  justify-content: center; /* Căn giữa theo chiều ngang */
  align-items: center;     /* Căn giữa theo chiều dọc */
}
```

### Q2: Làm thế nào để căn giữa một div với Flexbox?

**Trả lời:**

```css
.container {
  display: flex;
  justify-content: center; /* Ngang */
  align-items: center;     /* Dọc */
  height: 100vh;
}
```

### Q3: flex: 1 có nghĩa là gì?

**Trả lời:**

`flex: 1` là viết tắt của:
- `flex-grow: 1` - Phần tử có thể phát triển
- `flex-shrink: 1` - Phần tử có thể co lại
- `flex-basis: 0%` - Bắt đầu từ 0, sau đó phát triển

Nó làm cho các phần tử **phát triển đều nhau** để lấp đầy không gian có sẵn.

## Ví dụ thực tế

### Ví dụ 1: Thanh điều hướng

```html
<nav class="navbar">
  <div class="logo">Logo</div>
  <ul class="nav-links">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
  <button>Login</button>
</nav>
```

```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
```

### Ví dụ 2: Layout Card

```html
<div class="cards">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>
```

```css
.cards {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, tối thiểu 300px */
  padding: 2rem;
  background: #f0f0f0;
}
```

### Ví dụ 3: Holy Grail Layout

```html
<div class="container">
  <header>Header</header>
  <div class="content">
    <aside>Sidebar</aside>
    <main>Main Content</main>
  </div>
  <footer>Footer</footer>
</div>
```

```css
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  display: flex;
  flex: 1; /* Chiếm phần không gian còn lại */
}

aside {
  flex: 0 0 200px; /* Sidebar có chiều rộng cố định */
}

main {
  flex: 1; /* Lấp đầy không gian còn lại */
}
```

## Flexbox vs Grid

| Flexbox | Grid |
|---------|------|
| **Một chiều** (hàng HOẶC cột) | **Hai chiều** (hàng VÀ cột) |
| Kích thước dựa trên nội dung | Kích thước dựa trên grid |
| Tốt hơn cho components | Tốt hơn cho page layouts |
| Kích thước phần tử linh hoạt | Grid tracks cố định |

```css
/* Dùng Flexbox cho: */
.navbar { display: flex; }
.buttons { display: flex; }

/* Dùng Grid cho: */
.page-layout { display: grid; }
.photo-gallery { display: grid; }
```

## Các pattern thường dùng

### Cột có độ rộng bằng nhau

```css
.item {
  flex: 1; /* Tất cả phần tử có độ rộng bằng nhau */
}
```

### Sidebar cố định + Nội dung linh hoạt

```css
.sidebar {
  flex: 0 0 250px; /* Cố định 250px */
}

.content {
  flex: 1; /* Chiếm không gian còn lại */
}
```

### Căn giữa mọi thứ

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

### Responsive Wrap

```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1 1 200px; /* Tối thiểu 200px, xuống hàng nếu cần */
}
```

## Best Practices

1. **Dùng gap thay vì margin** - Sạch hơn và dễ dự đoán hơn
2. **Ưu tiên flex shorthand** - `flex: 1` thay vì các thuộc tính riêng lẻ
3. **Mobile-first** - Bắt đầu với column, dùng media queries cho row
4. **Không dùng cho page layout** - Dùng Grid cho layouts 2D
5. **Test wrapping behavior** - Đảm bảo nội dung xuống hàng đúng cách

## Hỗ trợ trình duyệt

Flexbox được hỗ trợ trên tất cả các trình duyệt hiện đại. Đối với các trình duyệt cũ:

```css
.container {
  display: -webkit-box;   /* Safari cũ */
  display: -ms-flexbox;   /* IE 10 */
  display: flex;          /* Hiện đại */
}
```

## Những điểm chính cần nhớ

- Flexbox dành cho layouts một chiều
- Container có `display: flex`
- Trục chính: `justify-content`
- Trục ngang: `align-items`
- `flex: 1` làm cho các phần tử phát triển đều nhau
- Dùng `gap` cho khoảng cách
- `flex-wrap: wrap` cho responsive layouts
- Tuyệt vời cho navigation, cards, buttons
