---
sidebar_position: 2
---

# CSS Grid

## CSS Grid là gì?

**CSS Grid** là một hệ thống layout **hai chiều** mạnh mẽ để tạo các layout phức tạp với hàng và cột cùng lúc.

## Thiết lập cơ bản

```html
<div class="grid-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>
```

```css
.grid-container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* 3 cột */
  grid-template-rows: 100px 100px;          /* 2 hàng */
  gap: 10px;
}
```

## Thuộc tính của Grid Container

### grid-template-columns / grid-template-rows

Định nghĩa kích thước cột và hàng:

```css
.grid {
  /* Kích thước cố định */
  grid-template-columns: 200px 300px 200px;

  /* Fractions (fr) - đơn vị linh hoạt */
  grid-template-columns: 1fr 2fr 1fr;

  /* Kết hợp các đơn vị */
  grid-template-columns: 200px 1fr 200px;

  /* Hàm repeat() */
  grid-template-columns: repeat(3, 1fr); /* 3 cột bằng nhau */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive */
}
```

### gap

Khoảng cách giữa các grid items:

```css
.grid {
  gap: 20px;             /* Cả hàng và cột */
  row-gap: 10px;         /* Chỉ khoảng cách hàng */
  column-gap: 20px;      /* Chỉ khoảng cách cột */
}
```

### grid-template-areas

Các khu vực grid được đặt tên:

```css
.grid {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

### justify-items / align-items

Căn chỉnh items bên trong các ô grid của chúng:

```css
.grid {
  justify-items: start | end | center | stretch;  /* Ngang */
  align-items: start | end | center | stretch;    /* Dọc */
}
```

### justify-content / align-content

Căn chỉnh toàn bộ grid bên trong container:

```css
.grid {
  justify-content: start | end | center | space-between | space-around;
  align-content: start | end | center | space-between | space-around;
}
```

## Thuộc tính của Grid Item

### grid-column / grid-row

Định vị items sử dụng số thứ tự đường kẻ:

```css
.item {
  grid-column: 1 / 3;  /* Bắt đầu ở đường kẻ 1, kết thúc ở đường kẻ 3 */
  grid-row: 1 / 2;
}

/* Viết tắt */
.item {
  grid-column: 1 / span 2;  /* Bắt đầu ở 1, kéo dài 2 cột */
  grid-row: 1 / span 2;     /* Bắt đầu ở 1, kéo dài 2 hàng */
}
```

### grid-area

Viết tắt cho grid-row-start / grid-column-start / grid-row-end / grid-column-end:

```css
.item {
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}

/* Hoặc sử dụng khu vực đã đặt tên */
.item {
  grid-area: header;
}
```

## Các câu hỏi phỏng vấn thường gặp

### Q1: Sự khác biệt giữa Grid và Flexbox là gì?

**Trả lời:**

| Grid | Flexbox |
|------|---------|
| **2D** (hàng VÀ cột) | **1D** (hàng HOẶC cột) |
| Layout-first | Content-first |
| Tốt hơn cho page layouts | Tốt hơn cho components |
| Có thể chồng lấp items | Items không chồng lấp |

```css
/* Grid - Page layout */
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
}

/* Flexbox - Navigation */
.nav {
  display: flex;
  gap: 1rem;
}
```

### Q2: Đơn vị fr có nghĩa là gì?

**Trả lời:**

`fr` (fraction) đại diện cho **một phần của không gian có sẵn**.

```css
.grid {
  grid-template-columns: 1fr 2fr 1fr;
  /* Cột đầu tiên: 1/4 không gian */
  /* Cột thứ hai: 2/4 không gian */
  /* Cột thứ ba: 1/4 không gian */
}
```

### Q3: Làm thế nào để tạo một grid responsive?

**Trả lời:**

Sử dụng `repeat()` với `auto-fit` hoặc `auto-fill` và `minmax()`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
/* Tự động điều chỉnh số cột dựa trên chiều rộng container */
```

## Ví dụ thực tế

### Ví dụ 1: Layout trang cơ bản

```html
<div class="page">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Main Content</main>
  <footer>Footer</footer>
</div>
```

```css
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  gap: 1rem;
}

header { grid-area: header; }
aside { grid-area: sidebar; }
main { grid-area: main; }
footer { grid-area: footer; }
```

### Ví dụ 2: Grid Card responsive

```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Ví dụ 3: Thư viện ảnh

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 200px;
  gap: 10px;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Ảnh nổi bật kéo dài 2 cột và 2 hàng */
.featured {
  grid-column: span 2;
  grid-row: span 2;
}
```

### Ví dụ 4: Dashboard Layout

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.widget-large {
  grid-column: span 8;
}

.widget-small {
  grid-column: span 4;
}

.widget-full {
  grid-column: span 12;
}
```

## Kỹ thuật nâng cao

### Auto-Fit vs Auto-Fill

```css
/* auto-fit: Thu gọn các track trống */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* auto-fill: Giữ các track trống */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

### Implicit Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* Tự động tạo hàng khi cần */
  grid-auto-rows: 200px;

  /* Hoặc tự động tạo cột */
  grid-auto-columns: 200px;
  grid-auto-flow: column;
}
```

### Chồng lấp Items

```css
.item1 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.item2 {
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  /* Items có thể chồng lấp! */
}
```

## Các pattern thường dùng

### Layout căn giữa với Max Width

```css
.grid {
  display: grid;
  grid-template-columns: 1fr min(1200px, 100%) 1fr;
}

.content {
  grid-column: 2;
}
```

### Holy Grail Layout

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "left content right"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
```

### Hệ thống 12 cột

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.col-6 { grid-column: span 6; }  /* Chiều rộng một nửa */
.col-4 { grid-column: span 4; }  /* Chiều rộng một phần ba */
.col-3 { grid-column: span 3; }  /* Chiều rộng một phần tư */
```

## Best Practices

1. **Dùng Grid cho layouts, Flexbox cho components**
2. **Dùng đơn vị fr** cho kích thước linh hoạt
3. **Dùng minmax()** cho responsive grids
4. **Named areas** cho layouts phức tạp
5. **Mobile-first** - Grid đơn giản trên mobile, phức tạp trên desktop

```css
/* Cách tiếp cận Mobile-first */
.grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Những điểm chính cần nhớ

- Grid dành cho layouts hai chiều
- Đơn vị `fr` cho kích thước linh hoạt
- `repeat(auto-fit, minmax())` cho responsive grids
- `grid-template-areas` cho layouts đã đặt tên
- Có thể chồng lấp items (khác Flexbox)
- Dùng cho page layouts, dashboards, galleries
- Hỗ trợ trình duyệt tốt hơn bạn nghĩ (tất cả trình duyệt hiện đại)
