---
sidebar_position: 5
---

# Responsive Design

## Responsive Design là gì?

**Responsive Web Design (RWD)** là cách tiếp cận thiết kế web giúp các trang web hiển thị tốt trên tất cả các thiết bị và kích thước màn hình bằng cách tự động thích ứng với màn hình.

:::info Khái niệm chính
**"Mobile-first"** approach: Thiết kế cho mobile trước, sau đó nâng cao cho màn hình lớn hơn.
:::

## Viewport Meta Tag

**Thiết yếu** cho responsive design:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Không có viewport tag:** Mobile browsers render ở desktop width (~980px)
**Với viewport tag:** Nội dung vừa màn hình mobile đúng cách

## Media Queries

**Media queries** áp dụng các styles khác nhau dựa trên đặc điểm thiết bị.

### Cú pháp cơ bản

```css
/* Cách tiếp cận Mobile-first (được khuyến nghị) */
/* Base styles cho mobile */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet trở lên */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* Desktop trở lên */
@media (min-width: 1024px) {
  .container {
    width: 960px;
  }
}

/* Large desktop */
@media (min-width: 1280px) {
  .container {
    width: 1200px;
  }
}
```

### Breakpoints thường dùng

```css
/* Mobile (mặc định) */
/* 0px - 767px */

/* Tablet */
@media (min-width: 768px) {
  /* Styles cho tablet */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Styles cho desktop */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* Styles cho màn hình lớn */
}
```

### Media Query Features

```css
/* Dựa trên chiều rộng */
@media (min-width: 600px) { }
@media (max-width: 999px) { }
@media (min-width: 600px) and (max-width: 999px) { }

/* Dựa trên chiều cao */
@media (min-height: 600px) { }

/* Orientation */
@media (orientation: portrait) { }
@media (orientation: landscape) { }

/* Resolution */
@media (min-resolution: 2dppx) { /* Màn hình Retina */ }

/* Khả năng hover */
@media (hover: hover) {
  /* Thiết bị hỗ trợ hover (chuột) */
  .button:hover { background: blue; }
}

@media (hover: none) {
  /* Touch devices */
  .button:active { background: blue; }
}

/* Prefers color scheme */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #ffffff;
  }
}

/* Prefers reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

## Fluid Layouts

### Fluid Width

```css
/* Fixed width (không responsive) */
.container {
  width: 960px; /* ✗ Không thích ứng */
}

/* Fluid width (responsive) */
.container {
  width: 90%; /* ✓ Thích ứng với màn hình */
  max-width: 1200px;
  margin: 0 auto;
}
```

### Fluid Typography

```css
/* Fixed typography */
h1 {
  font-size: 32px; /* ✗ Giống nhau trên mọi thiết bị */
}

/* Responsive typography */
h1 {
  font-size: 6vw; /* ✓ Tỷ lệ với viewport */
  font-size: clamp(24px, 5vw, 48px); /* Tốt hơn: Min, preferred, max */
}

/* Sử dụng calc() */
h1 {
  font-size: calc(20px + 2vw);
}
```

### Fluid Images

```css
/* Làm images responsive */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Responsive background images */
.hero {
  background-image: url('hero.jpg');
  background-size: cover;
  background-position: center;
  height: 400px;
}

/* Picture element cho art direction */
```

```html
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Responsive image">
</picture>
```

## Responsive Units

### Viewport Units

```css
.hero {
  /* Viewport width/height */
  width: 100vw;  /* 100% của viewport width */
  height: 100vh; /* 100% của viewport height */

  /* Min/max của viewport dimensions */
  font-size: 5vmin; /* 5% của dimension nhỏ hơn */
  font-size: 5vmax; /* 5% của dimension lớn hơn */
}
```

### Percentage

```css
.column {
  width: 50%; /* 50% của parent */
  padding: 2%; /* 2% của parent width */
}
```

### rem vs em

```css
/* rem: Tương đối so với root font size */
html {
  font-size: 16px; /* 1rem = 16px */
}

.button {
  padding: 1rem; /* 16px */
  font-size: 1.25rem; /* 20px */
}

/* em: Tương đối so với parent font size */
.parent {
  font-size: 20px;
}

.child {
  font-size: 0.8em; /* 16px (0.8 × 20px) */
}
```

## Modern CSS Functions

### clamp()

**Function tốt nhất cho responsive design:**

```css
/* clamp(minimum, preferred, maximum) */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* Không bao giờ nhỏ hơn 1.5rem */
  /* Tỷ lệ với viewport ở 5vw */
  /* Không bao giờ lớn hơn 3rem */
}

.container {
  width: clamp(300px, 90%, 1200px);
  padding: clamp(1rem, 3vw, 3rem);
}
```

### min() và max()

```css
/* max(): Sử dụng giá trị lớn hơn */
.box {
  width: max(50%, 300px);
  /* Ít nhất 300px, hoặc 50% nếu lớn hơn */
}

/* min(): Sử dụng giá trị nhỏ hơn */
.box {
  width: min(90%, 1200px);
  /* Tối đa 1200px, hoặc 90% nếu nhỏ hơn */
}
```

## Container Queries (Hiện đại)

**Style elements dựa trên kích thước container của chúng** (không phải viewport):

```css
/* Định nghĩa container */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* Query container */
.card {
  padding: 1rem;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 150px 1fr;
  }
}

@container card (min-width: 600px) {
  .card {
    font-size: 1.2rem;
  }
}
```

## Responsive Patterns

### Mobile Navigation

```css
/* Mobile: Hamburger menu */
.nav-toggle {
  display: block;
}

.nav-menu {
  display: none;
  flex-direction: column;
}

.nav-menu.active {
  display: flex;
}

/* Desktop: Horizontal menu */
@media (min-width: 768px) {
  .nav-toggle {
    display: none;
  }

  .nav-menu {
    display: flex;
    flex-direction: row;
  }
}
```

### Responsive Grid

```css
/* Mobile: Xếp chồng cột */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: 2 cột */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 cột */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Hiện đại: Auto-responsive (không cần media queries!) */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
```

### Responsive Typography

```css
/* Mobile-first typography scale */
body {
  font-size: 16px;
  line-height: 1.6;
}

h1 { font-size: clamp(2rem, 5vw, 3.5rem); }
h2 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
h3 { font-size: clamp(1.25rem, 3vw, 2rem); }

p {
  font-size: clamp(1rem, 2vw, 1.125rem);
}
```

### Show/Hide Content

```css
/* Ẩn trên mobile, hiện trên desktop */
.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .desktop-only {
    display: block;
  }
}

/* Hiện trên mobile, ẩn trên desktop */
.mobile-only {
  display: block;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
}
```

## Touch-Friendly Design

```css
/* Larger tap targets cho mobile */
.button {
  min-height: 44px; /* Khuyến nghị của Apple */
  min-width: 44px;
  padding: 12px 24px;
}

/* Loại bỏ hover effects trên touch devices */
@media (hover: hover) {
  .button:hover {
    background: blue;
  }
}

/* Touch-specific interactions */
.card {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation; /* Vô hiệu hóa double-tap zoom */
}
```

## Performance Optimization

### Responsive Images

```html
<!-- Modern responsive images -->
<img
  src="small.jpg"
  srcset="small.jpg 500w,
          medium.jpg 1000w,
          large.jpg 2000w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
  alt="Responsive image"
  loading="lazy"
>
```

### Loading Strategies

```html
<!-- Lazy load images -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded">

<!-- Preload critical resources -->
<link rel="preload" href="hero.jpg" as="image">

<!-- Async load CSS cho performance -->
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
```

## Câu hỏi phỏng vấn

### Q1: Mobile-first design là gì và tại sao nên sử dụng?

**Trả lời:**

**Mobile-first** có nghĩa là thiết kế cho mobile devices trước, sau đó dần dần nâng cao cho màn hình lớn hơn.

```css
/* Mobile-first (được khuyến nghị) */
.container {
  width: 100%; /* Base: Mobile */
}

@media (min-width: 768px) {
  .container {
    width: 750px; /* Enhancement: Tablet */
  }
}

/* Desktop-first (không được khuyến nghị) */
.container {
  width: 1200px; /* Base: Desktop */
}

@media (max-width: 767px) {
  .container {
    width: 100%; /* Override: Mobile */
  }
}
```

**Lợi ích:**
1. **Performance** - Mobile tải ít styles hơn
2. **Progressive enhancement** - Bắt đầu đơn giản, thêm độ phức tạp
3. **Mobile usage** - Lưu lượng mobile vượt desktop
4. **Easier maintenance** - Thêm tính năng thay vì loại bỏ

### Q2: Giải thích sự khác biệt giữa `em`, `rem`, `%`, và viewport units.

**Trả lời:**

| Unit | Tương đối so với | Use Case |
|------|-------------|----------|
| `em` | Parent font size | Component spacing |
| `rem` | Root font size | Global typography |
| `%` | Parent element | Layout widths |
| `vw/vh` | Viewport size | Full-screen sections |

```css
html {
  font-size: 16px; /* Root */
}

.parent {
  font-size: 20px;
  width: 500px;
}

.child {
  font-size: 2em;   /* 40px (2 × parent 20px) */
  padding: 2rem;    /* 32px (2 × root 16px) */
  width: 50%;       /* 250px (50% của parent 500px) */
  height: 50vh;     /* 50% của viewport height */
}
```

### Q3: CSS media queries là gì và chúng hoạt động như thế nào?

**Trả lời:**

**Media queries** áp dụng CSS rules dựa trên đặc điểm thiết bị:

```css
/* Cú pháp cơ bản */
@media (condition) {
  /* Styles áp dụng khi condition là true */
}

/* Ví dụ thường dùng */
@media (min-width: 768px) {
  /* Styles cho màn hình 768px trở lên */
}

@media (max-width: 767px) {
  /* Styles cho màn hình 767px trở xuống */
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles chỉ cho tablets */
}

@media (orientation: landscape) {
  /* Styles cho landscape orientation */
}

@media (prefers-color-scheme: dark) {
  /* Styles cho dark mode */
}

@media print {
  /* Styles cho in ấn */
}
```

**Best Practice:** Sử dụng `min-width` cho mobile-first approach.

### Q4: Thẻ viewport meta là gì và tại sao nó quan trọng?

**Trả lời:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Mục đích:**
- **`width=device-width`** - Sử dụng chiều rộng thực của thiết bị
- **`initial-scale=1.0`** - Mức zoom ban đầu (100%)

**Không có viewport tag:**
```
Mobile browser giả định desktop width (~980px)
→ Render phiên bản desktop
→ Người dùng phải zoom và pan
→ Trải nghiệm mobile kém
```

**Với viewport tag:**
```
Mobile browser sử dụng chiều rộng thiết bị thực
→ Render phiên bản mobile-optimized
→ Nội dung vừa màn hình
→ Trải nghiệm mobile tốt
```

**Tùy chọn bổ sung:**
```html
<!-- Ngăn zooming (tránh trừ khi cần thiết) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- Cho phép zoom giới hạn -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
```

### Q5: Làm thế nào để làm images responsive?

**Trả lời:**

**Phương pháp 1: Basic responsive image**
```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

**Phương pháp 2: srcset cho resolution switching**
```html
<img
  src="small.jpg"
  srcset="small.jpg 500w,
          medium.jpg 1000w,
          large.jpg 2000w"
  sizes="(max-width: 600px) 100vw,
         50vw"
  alt="Responsive image"
>
```

**Phương pháp 3: Picture element cho art direction**
```html
<picture>
  <source media="(min-width: 1024px)" srcset="desktop.jpg">
  <source media="(min-width: 768px)" srcset="tablet.jpg">
  <img src="mobile.jpg" alt="Different images for different screens">
</picture>
```

**Phương pháp 4: Background images**
```css
.hero {
  background-image: url('mobile.jpg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .hero {
    background-image: url('desktop.jpg');
  }
}
```

### Q6: Sự khác biệt giữa adaptive và responsive design là gì?

**Trả lời:**

| Feature | Responsive Design | Adaptive Design |
|---------|-------------------|-----------------|
| **Layout** | Fluid, liên tục | Fixed breakpoints |
| **Flexibility** | Thích ứng với mọi kích thước | Chỉ kích thước cụ thể |
| **Implementation** | CSS media queries | Multiple fixed layouts |
| **Maintenance** | Dễ hơn (một codebase) | Khó hơn (nhiều layouts) |

**Responsive Design:**
```css
.container {
  width: 90%; /* Fluid */
  max-width: 1200px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

**Adaptive Design:**
```css
.container {
  width: 320px; /* Cố định cho mobile */
}

@media (min-width: 768px) {
  .container {
    width: 768px; /* Cố định cho tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    width: 1024px; /* Cố định cho desktop */
  }
}
```

**Cách tiếp cận hiện đại:** Sử dụng responsive design (fluid layouts).

### Q7: Làm thế nào để tối ưu hóa responsive websites cho performance?

**Trả lời:**

**1. Lazy load images:**
```html
<img src="image.jpg" loading="lazy" alt="Lazy loaded">
```

**2. Responsive images (tránh tải images lớn trên mobile):**
```html
<img
  srcset="small.jpg 500w, large.jpg 2000w"
  sizes="(max-width: 600px) 100vw, 50vw"
  src="small.jpg"
  alt="Optimized image"
>
```

**3. Critical CSS (inline critical styles):**
```html
<style>
  /* Critical above-the-fold styles */
</style>
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
```

**4. Minimize CSS:**
```css
/* Sử dụng mobile-first để tải ít CSS hơn trên mobile */
.container { width: 100%; }

@media (min-width: 768px) {
  .container { width: 750px; }
}
```

**5. Tối ưu hóa media queries:**
```css
/* Không tốt: Quá nhiều breakpoints */
@media (min-width: 320px) { }
@media (min-width: 375px) { }
@media (min-width: 425px) { }

/* Tốt: Strategic breakpoints */
@media (min-width: 768px) { }
@media (min-width: 1024px) { }
```

### Q8: Function `clamp()` là gì và nó hữu ích cho responsive design như thế nào?

**Trả lời:**

**`clamp(minimum, preferred, maximum)`** - Đặt giá trị tăng/giảm trong giới hạn.

```css
/* Responsive font size */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* Min: 1.5rem (24px) */
  /* Preferred: 5vw (tỷ lệ với viewport) */
  /* Max: 3rem (48px) */
}

/* Responsive spacing */
.section {
  padding: clamp(1rem, 5vw, 5rem);
}

/* Responsive width */
.container {
  width: clamp(300px, 90%, 1200px);
  /* Không bao giờ nhỏ hơn 300px */
  /* Không bao giờ lớn hơn 1200px */
  /* Fluid giữa các giá trị đó */
}
```

**Lợi ích:**
- **Một dòng** thay vì nhiều media queries
- **Smooth scaling** giữa min và max
- **Ngăn giá trị cực đoan** trên màn hình rất nhỏ/lớn

**Trước `clamp()`:**
```css
h1 {
  font-size: 1.5rem;
}

@media (min-width: 768px) {
  h1 { font-size: 2rem; }
}

@media (min-width: 1024px) {
  h1 { font-size: 2.5rem; }
}

@media (min-width: 1280px) {
  h1 { font-size: 3rem; }
}
```

**Sau `clamp()`:**
```css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

### Q9: Làm thế nào để xử lý touch events vs hover events?

**Trả lời:**

**Vấn đề:** Touch devices không có hover state.

**Giải pháp:** Sử dụng `@media (hover)` để phát hiện khả năng hover:

```css
/* Base styles (tất cả thiết bị) */
.button {
  padding: 12px 24px;
  background: blue;
  transition: background 0.3s;
}

/* Thiết bị có khả năng hover (chuột) */
@media (hover: hover) {
  .button:hover {
    background: darkblue;
  }
}

/* Touch devices */
@media (hover: none) {
  .button:active {
    background: darkblue;
  }
}

/* Thay thế: Kết hợp */
.button:hover,
.button:focus,
.button:active {
  background: darkblue;
}
```

**Cân nhắc cụ thể cho touch:**
```css
.button {
  /* Larger tap targets */
  min-height: 44px;
  min-width: 44px;

  /* Loại bỏ tap highlight */
  -webkit-tap-highlight-color: transparent;

  /* Vô hiệu hóa double-tap zoom */
  touch-action: manipulation;
}
```

### Q10: Container queries là gì và chúng khác media queries như thế nào?

**Trả lời:**

**Media Queries:** Style dựa trên **kích thước viewport**
**Container Queries:** Style dựa trên **kích thước parent container**

```css
/* Container queries (hiện đại) */
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  padding: 1rem;
}

/* Style dựa trên container width, không phải viewport */
@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 150px 1fr;
  }
}

@container card (min-width: 600px) {
  .card {
    font-size: 1.2rem;
  }
}
```

**Lợi ích:**
- **Component-level responsiveness** - Components thích ứng với container của chúng
- **Reusability** - Cùng component hoạt động trong các contexts khác nhau
- **Không cần biết viewport** - Component không quan tâm đến page layout

**Ví dụ use case:**
```html
<!-- Cùng card component, containers khác nhau -->
<div class="sidebar"> <!-- Hẹp -->
  <div class="card">...</div> <!-- Thích ứng với không gian hẹp -->
</div>

<div class="main-content"> <!-- Rộng -->
  <div class="card">...</div> <!-- Thích ứng với không gian rộng -->
</div>
```

## Best Practices

1. **Cách tiếp cận Mobile-first** - Thiết kế cho mobile, nâng cao cho desktop
2. **Sử dụng relative units** - `rem`, `em`, `%`, `vw/vh` thay vì `px`
3. **Strategic breakpoints** - Dựa trên nội dung, không phải thiết bị
4. **Test trên thiết bị thực** - Emulators không bắt được mọi thứ
5. **Touch-friendly targets** - Tối thiểu 44×44px tap targets
6. **Tối ưu hóa images** - Sử dụng `srcset`, lazy loading, WebP format
7. **Sử dụng `clamp()`** - Cho fluid, bounded responsive values
8. **Minimize breakpoints** - Ít hơn là tốt hơn, sử dụng fluid layouts
9. **Accessible** - Test với keyboard, screen readers
10. **Performance** - Lazy load, critical CSS, tối ưu media queries

## Resources

- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
- [Can I Use](https://caniuse.com/) - Hỗ trợ trình duyệt
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [BrowserStack](https://www.browserstack.com/) - Device testing
