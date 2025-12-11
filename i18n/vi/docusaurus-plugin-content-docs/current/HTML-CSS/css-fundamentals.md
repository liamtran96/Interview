---
sidebar_position: 2
---

# CSS Fundamentals

## CSS là gì?

**CSS (Cascading Style Sheets)** là ngôn ngữ stylesheet được sử dụng để mô tả cách trình bày các tài liệu HTML. Nó kiểm soát layout, màu sắc, font chữ và tổng thể giao diện trực quan.

:::info Phiên bản mới nhất
CSS3 là tiêu chuẩn hiện tại, liên tục phát triển với các modules và tính năng mới.
:::

## Cú pháp CSS

```css
/* Selector { property: value; } */
selector {
  property: value;
  another-property: value;
}
```

### Thêm CSS vào HTML

```html
<!-- 1. Inline CSS (độ ưu tiên cao nhất) -->
<p style="color: red; font-size: 16px;">Styled text</p>

<!-- 2. Internal CSS (trong <head>) -->
<style>
  p {
    color: red;
    font-size: 16px;
  }
</style>

<!-- 3. External CSS (được khuyến nghị) -->
<link rel="stylesheet" href="styles.css">
```

## CSS Selectors

### Basic Selectors

```css
/* Universal selector */
* {
  margin: 0;
  padding: 0;
}

/* Element selector */
p {
  color: black;
}

/* Class selector */
.button {
  padding: 10px 20px;
}

/* ID selector */
#header {
  background-color: blue;
}

/* Multiple selectors */
h1, h2, h3 {
  font-family: Arial, sans-serif;
}
```

### Combinator Selectors

```css
/* Descendant selector (tất cả phần tử lồng nhau) */
div p {
  color: blue;
}

/* Child selector (chỉ con trực tiếp) */
div > p {
  color: red;
}

/* Adjacent sibling (phần tử ngay sau) */
h1 + p {
  font-size: 18px;
}

/* General sibling (tất cả phần tử anh em sau) */
h1 ~ p {
  margin-top: 10px;
}
```

### Attribute Selectors

```css
/* Có attribute */
input[required] {
  border: 2px solid red;
}

/* Khớp chính xác */
input[type="text"] {
  padding: 5px;
}

/* Bắt đầu với */
a[href^="https"] {
  color: green;
}

/* Kết thúc với */
a[href$=".pdf"] {
  background: url('pdf-icon.png');
}

/* Chứa */
a[href*="example"] {
  font-weight: bold;
}

/* Phân tách bằng khoảng trắng (class names) */
div[class~="active"] {
  display: block;
}
```

### Pseudo-Classes

```css
/* Trạng thái link */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* Trạng thái input */
input:focus {
  outline: 2px solid blue;
}

input:disabled {
  opacity: 0.5;
}

input:checked + label {
  font-weight: bold;
}

/* Structural pseudo-classes */
li:first-child { font-weight: bold; }
li:last-child { margin-bottom: 0; }
li:nth-child(2) { color: red; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(even) { background: white; }
li:nth-child(3n) { color: blue; }

/* Pseudo-classes hữu ích khác */
p:not(.special) { color: gray; }
div:empty { display: none; }
input:valid { border: 2px solid green; }
input:invalid { border: 2px solid red; }
```

### Pseudo-Elements

```css
/* First letter và line */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}

p::first-line {
  color: blue;
}

/* Before và after */
.button::before {
  content: "→ ";
}

.button::after {
  content: " ←";
}

/* Selection highlight */
::selection {
  background: yellow;
  color: black;
}

/* Placeholder text */
input::placeholder {
  color: #999;
  font-style: italic;
}
```

## Box Model

**Mỗi phần tử HTML là một hộp chữ nhật** với bốn khu vực:

```
┌─────────────────────────────────────┐
│           Margin (transparent)       │
│  ┌──────────────────────────────┐  │
│  │    Border                     │  │
│  │  ┌───────────────────────┐  │  │
│  │  │   Padding             │  │  │
│  │  │  ┌────────────────┐  │  │  │
│  │  │  │   Content      │  │  │  │
│  │  │  │  (text/image)  │  │  │  │
│  │  │  └────────────────┘  │  │  │
│  │  └───────────────────────┘  │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Thuộc tính Box Model

```css
.box {
  /* Content */
  width: 200px;
  height: 150px;

  /* Padding (khoảng cách bên trong border) */
  padding: 20px;
  /* hoặc */
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 10px;
  padding-left: 15px;
  /* hoặc viết tắt */
  padding: 10px 15px; /* top/bottom left/right */
  padding: 10px 15px 20px; /* top left/right bottom */

  /* Border */
  border: 2px solid black;
  /* hoặc */
  border-width: 2px;
  border-style: solid; /* solid, dashed, dotted, double */
  border-color: black;
  /* các cạnh riêng lẻ */
  border-top: 1px solid red;

  /* Margin (khoảng cách bên ngoài border) */
  margin: 20px;
  /* quy tắc viết tắt giống padding */
  margin: 10px 20px;
  margin: 10px 20px 30px 40px; /* top right bottom left */
}
```

### Box-Sizing

```css
/* Mặc định: content-box */
.box1 {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Tổng chiều rộng = 200 + 40 + 10 = 250px */
}

/* Border-box (bao gồm padding và border) */
.box2 {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Tổng chiều rộng = 200px (padding/border đã bao gồm) */
}

/* Best practice: Áp dụng cho tất cả phần tử */
* {
  box-sizing: border-box;
}
```

## Thuộc tính Display

```css
/* Block: Chiếm toàn bộ chiều rộng, bắt đầu dòng mới */
div {
  display: block;
}

/* Inline: Chỉ chiếm chiều rộng cần thiết, không xuống dòng */
span {
  display: inline;
  /* Không thể set width/height trên inline elements */
}

/* Inline-block: Kết hợp cả hai */
.button {
  display: inline-block;
  width: 100px; /* Có thể set dimensions */
  height: 40px;
}

/* None: Loại bỏ khỏi document flow */
.hidden {
  display: none;
}

/* Các phương pháp layout hiện đại */
.flex-container {
  display: flex;
}

.grid-container {
  display: grid;
}
```

## Positioning

### Static (Mặc định)

```css
/* Positioning mặc định */
.static {
  position: static;
  /* top, right, bottom, left không có hiệu lực */
}
```

### Relative

```css
/* Định vị tương đối so với vị trí bình thường */
.relative {
  position: relative;
  top: 10px; /* Di chuyển 10px xuống từ vị trí bình thường */
  left: 20px; /* Di chuyển 20px sang phải từ vị trí bình thường */
  /* Không gian trong normal flow được giữ nguyên */
}
```

### Absolute

```css
/* Định vị tương đối so với positioned ancestor gần nhất */
.container {
  position: relative; /* Thiết lập positioning context */
}

.absolute {
  position: absolute;
  top: 0;
  right: 0;
  /* Loại bỏ khỏi normal document flow */
  /* Định vị tương đối so với .container */
}
```

### Fixed

```css
/* Định vị tương đối so với viewport */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* Giữ nguyên vị trí khi scroll */
  /* Loại bỏ khỏi normal document flow */
}
```

### Sticky

```css
/* Kết hợp giữa relative và fixed */
.sticky-nav {
  position: sticky;
  top: 0;
  /* Hoạt động như relative cho đến khi scroll đến ngưỡng */
  /* Sau đó hoạt động như fixed */
}
```

## Z-Index và Stacking Context

```css
/* Z-index kiểm soát thứ tự xếp chồng */
.layer1 {
  position: relative; /* z-index chỉ hoạt động trên positioned elements */
  z-index: 1;
}

.layer2 {
  position: relative;
  z-index: 2; /* Hiển thị phía trên layer1 */
}

.layer3 {
  position: relative;
  z-index: -1; /* Hiển thị phía sau normal flow */
}

/* Ví dụ stacking context */
.parent {
  position: relative;
  z-index: 1;
}

.child {
  position: absolute;
  z-index: 9999; /* Không thể thoát khỏi stacking context của parent */
}
```

## Colors

```css
/* Named colors */
color: red;
color: blue;

/* Hexadecimal */
color: #ff0000; /* Red */
color: #f00; /* Viết tắt */
color: #ff000080; /* Với alpha (50% opacity) */

/* RGB */
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5); /* Với alpha */

/* HSL (Hue, Saturation, Lightness) */
color: hsl(0, 100%, 50%); /* Red */
color: hsla(0, 100%, 50%, 0.5); /* Với alpha */

/* Hiện đại: OKLCH (độ đồng đều về mặt nhận thức tốt hơn) */
color: oklch(0.5 0.2 250); /* Lightness Chroma Hue */

/* Transparent */
color: transparent;

/* Current color */
border-color: currentColor; /* Kế thừa màu text */
```

## Typography

```css
.text {
  /* Font family */
  font-family: Arial, Helvetica, sans-serif;
  font-family: "Times New Roman", serif;
  font-family: Courier, monospace;

  /* Font size */
  font-size: 16px;
  font-size: 1rem; /* Tương đối so với root font size */
  font-size: 1.5em; /* Tương đối so với parent font size */

  /* Font weight */
  font-weight: normal; /* 400 */
  font-weight: bold; /* 700 */
  font-weight: 300; /* Light */
  font-weight: 600; /* Semi-bold */

  /* Font style */
  font-style: normal;
  font-style: italic;

  /* Text decoration */
  text-decoration: none;
  text-decoration: underline;
  text-decoration: line-through;

  /* Text transformation */
  text-transform: uppercase;
  text-transform: lowercase;
  text-transform: capitalize;

  /* Text alignment */
  text-align: left;
  text-align: center;
  text-align: right;
  text-align: justify;

  /* Line height */
  line-height: 1.5; /* 1.5x font size */
  line-height: 24px;

  /* Letter spacing */
  letter-spacing: 2px;
  letter-spacing: 0.1em;

  /* Word spacing */
  word-spacing: 5px;

  /* Text shadow */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  /* x-offset y-offset blur color */
}
```

## Backgrounds

```css
.background {
  /* Color */
  background-color: #f0f0f0;

  /* Image */
  background-image: url('image.jpg');

  /* Repeat */
  background-repeat: no-repeat;
  background-repeat: repeat-x; /* Chỉ ngang */
  background-repeat: repeat-y; /* Chỉ dọc */

  /* Position */
  background-position: center center;
  background-position: top right;
  background-position: 10px 20px;

  /* Size */
  background-size: cover; /* Bao phủ toàn bộ phần tử */
  background-size: contain; /* Vừa vặn bên trong phần tử */
  background-size: 100px 200px;

  /* Attachment */
  background-attachment: fixed; /* Cố định khi scroll */
  background-attachment: scroll; /* Scroll cùng nội dung */

  /* Viết tắt */
  background: #f0f0f0 url('image.jpg') no-repeat center / cover;

  /* Multiple backgrounds */
  background:
    url('front.png') center / contain no-repeat,
    url('back.jpg') center / cover no-repeat;

  /* Gradient backgrounds */
  background: linear-gradient(to right, red, blue);
  background: linear-gradient(45deg, red, yellow, green);
  background: radial-gradient(circle, red, blue);
}
```

## Units

### Absolute Units

```css
.absolute {
  width: 100px;  /* Pixels (phổ biến nhất) */
  width: 1cm;    /* Centimeters */
  width: 1in;    /* Inches */
  width: 1pt;    /* Points (1/72 của inch) */
}
```

### Relative Units

```css
.relative {
  /* em: Tương đối so với parent font size */
  font-size: 2em; /* 2x parent font size */
  padding: 1em;   /* 1x current element font size */

  /* rem: Tương đối so với root (html) font size */
  font-size: 1.5rem; /* 1.5x root font size */
  margin: 2rem;

  /* Percentage: Tương đối so với parent */
  width: 50%; /* 50% của parent width */

  /* Viewport units */
  width: 100vw;  /* 100% của viewport width */
  height: 100vh; /* 100% của viewport height */
  font-size: 5vmin; /* 5% của viewport dimension nhỏ hơn */
  font-size: 5vmax; /* 5% của viewport dimension lớn hơn */

  /* Dựa trên ký tự */
  width: 20ch; /* Chiều rộng của 20 ký tự "0" */
}
```

## Specificity

**Specificity** xác định quy tắc CSS nào được áp dụng khi nhiều quy tắc nhắm đến cùng một phần tử.

### Thứ bậc Specificity

```
!important > Inline styles > ID > Class/Attribute/Pseudo-class > Element/Pseudo-element
```

### Tính toán Specificity

```css
/* Specificity: (0, 0, 0, 1) */
p { color: black; }

/* Specificity: (0, 0, 1, 0) */
.text { color: blue; }

/* Specificity: (0, 1, 0, 0) */
#header { color: red; }

/* Specificity: (0, 0, 1, 1) */
p.text { color: green; }

/* Specificity: (0, 1, 1, 1) */
div#header .text { color: purple; }

/* Specificity: (1, 0, 0, 0) - Inline style */
<p style="color: orange;">

/* Specificity: Ghi đè mọi thứ */
p { color: yellow !important; }
```

**Định dạng Specificity:** (inline, IDs, classes, elements)

```css
/* Ví dụ tính toán */
h1 { }                  /* 0,0,0,1 */
.nav { }                /* 0,0,1,0 */
#header { }             /* 0,1,0,0 */
div.nav { }             /* 0,0,1,1 */
ul li a.active { }      /* 0,0,1,3 */
#header nav ul li { }   /* 0,1,0,3 */
```

## The Cascade

**Cascade** xác định styles nào được áp dụng khi nhiều quy tắc có specificity bằng nhau.

### Thứ tự ưu tiên

1. **User agent styles** (mặc định của trình duyệt)
2. **User styles** (cài đặt trình duyệt của người dùng)
3. **Author styles** (CSS của bạn)
   - External stylesheets
   - Internal `<style>` tags
   - Inline `style` attributes
4. **!important rules** (ghi đè mọi thứ)

```css
/* Quy tắc sau ghi đè quy tắc trước (cùng specificity) */
p { color: blue; }
p { color: red; } /* Thắng */

/* Quy tắc cụ thể hơn thắng */
p { color: blue; }
.text { color: red; } /* Thắng (specificity cao hơn) */

/* !important ghi đè specificity */
p { color: blue !important; }
#text { color: red; } /* Blue thắng do !important */
```

## Overflow

```css
.container {
  width: 200px;
  height: 100px;

  /* Cắt nội dung */
  overflow: hidden;

  /* Hiển thị scrollbars luôn */
  overflow: scroll;

  /* Hiển thị scrollbars chỉ khi cần */
  overflow: auto;

  /* Mặc định: Nội dung tràn ra ngoài */
  overflow: visible;

  /* Các trục riêng lẻ */
  overflow-x: hidden;
  overflow-y: scroll;

  /* Text overflow */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* "Text that overflows..." */
}
```

## Float và Clear

```css
/* Float elements (phương pháp layout cũ) */
.float-left {
  float: left;
  width: 50%;
}

.float-right {
  float: right;
  width: 50%;
}

/* Clear floats */
.clear {
  clear: both; /* Clear cả left và right floats */
  clear: left; /* Chỉ clear left floats */
  clear: right; /* Chỉ clear right floats */
}

/* Clearfix hack (chứa floats) */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

## Câu hỏi phỏng vấn

### Q1: Sự khác biệt giữa `display: none` và `visibility: hidden` là gì?

**Trả lời:**

| Property | Loại bỏ khỏi Layout | Giữ không gian | Accessibility |
|----------|---------------------|----------------|---------------|
| `display: none` | Có | Không | Ẩn khỏi screen readers |
| `visibility: hidden` | Không | Có | Ẩn khỏi screen readers |
| `opacity: 0` | Không | Có | Hiển thị cho screen readers |

```css
/* display: none - Loại bỏ hoàn toàn */
.hidden1 {
  display: none;
  /* Phần tử không chiếm không gian, không thể tương tác */
}

/* visibility: hidden - Ẩn nhưng giữ không gian */
.hidden2 {
  visibility: hidden;
  /* Phần tử chiếm không gian, không thể tương tác */
}

/* opacity: 0 - Trong suốt nhưng vẫn tương tác được */
.hidden3 {
  opacity: 0;
  /* Phần tử chiếm không gian, CÓ THỂ tương tác (có thể click) */
}
```

### Q2: Giải thích CSS Box Model.

**Trả lời:**

**CSS Box Model** mô tả cách mỗi phần tử HTML được biểu diễn dưới dạng một hộp chữ nhật:

```
Total Width = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right

Total Height = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
```

**Ví dụ:**
```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}

/* Với box-sizing: content-box (mặc định) */
/* Total width = 200 + 40 + 10 + 20 = 270px */

/* Với box-sizing: border-box */
/* Total width = 200px (padding và border đã bao gồm) */
```

**Best Practice:**
```css
* {
  box-sizing: border-box; /* Làm cho sizing trực quan hơn */
}
```

### Q3: CSS specificity là gì và nó được tính như thế nào?

**Trả lời:**

**Specificity** xác định quy tắc CSS nào được áp dụng khi nhiều quy tắc nhắm đến cùng một phần tử.

**Tính toán:** (inline, IDs, classes, elements)

```css
/* Element selector: (0,0,0,1) */
p { color: black; }

/* Class selector: (0,0,1,0) */
.text { color: blue; }

/* ID selector: (0,1,0,0) */
#header { color: red; }

/* Combination: (0,1,1,2) */
div#header p.text { color: green; }

/* Inline style: (1,0,0,0) */
<p style="color: orange;">

/* !important: Ghi đè tất cả */
p { color: yellow !important; }
```

**Quy tắc:**
1. Specificity cao hơn thắng
2. Specificity bằng nhau: quy tắc cuối thắng
3. `!important` ghi đè specificity (tránh sử dụng)

### Q4: Sự khác biệt giữa đơn vị `em` và `rem` là gì?

**Trả lời:**

| Unit | Tương đối so với | Use Case |
|------|-------------|----------|
| `em` | Font size của phần tử parent | Sizing cấp component |
| `rem` | Font size của phần tử root (`<html>`) | Sizing toàn cục, nhất quán |

```css
html {
  font-size: 16px; /* 1rem = 16px */
}

.parent {
  font-size: 20px;
}

.child {
  font-size: 2em;  /* 2 × 20px = 40px (tương đối parent) */
  padding: 2rem;   /* 2 × 16px = 32px (tương đối root) */
}
```

**Vấn đề compounding với `em`:**
```css
.parent {
  font-size: 1.2em; /* 19.2px nếu root là 16px */
}

.child {
  font-size: 1.2em; /* 1.2 × 19.2px = 23.04px (tích lũy!) */
}
```

**Best Practice:** Sử dụng `rem` cho sizing nhất quán trên toàn site.

### Q5: Giải thích CSS positioning (static, relative, absolute, fixed, sticky).

**Trả lời:**

| Position | Hành vi | Use Case |
|----------|----------|----------|
| `static` | Mặc định, normal flow | Hầu hết phần tử |
| `relative` | Offset từ vị trí bình thường | Điều chỉnh nhỏ |
| `absolute` | Định vị tương đối so với positioned ancestor gần nhất | Tooltips, dropdowns |
| `fixed` | Định vị tương đối so với viewport | Fixed headers, modals |
| `sticky` | Kết hợp relative + fixed | Sticky headers |

```css
/* Static: Mặc định */
.static {
  position: static;
}

/* Relative: Offset từ vị trí bình thường */
.relative {
  position: relative;
  top: 10px; /* Di chuyển xuống 10px */
}

/* Absolute: Loại bỏ khỏi flow, định vị tương đối parent */
.container {
  position: relative; /* Positioning context */
}
.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

/* Fixed: Luôn hiển thị trong viewport */
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
}

/* Sticky: Chuyển từ relative sang fixed */
.sticky-nav {
  position: sticky;
  top: 0; /* Dính khi scroll đến top */
}
```

### Q6: Sự khác biệt giữa `inline`, `block`, và `inline-block` là gì?

**Trả lời:**

| Display | Line Break | Width/Height | Padding/Margin |
|---------|------------|--------------|----------------|
| `block` | Có | Toàn bộ chiều rộng mặc định | Tất cả các cạnh |
| `inline` | Không | Chiều rộng nội dung | Chỉ ngang |
| `inline-block` | Không | Chiều rộng nội dung | Tất cả các cạnh |

```css
/* Block: Chiếm toàn bộ chiều rộng, bắt đầu dòng mới */
div {
  display: block;
  width: 200px; /* ✓ Hoạt động */
  height: 100px; /* ✓ Hoạt động */
  margin: 10px; /* ✓ Hoạt động tất cả các cạnh */
}

/* Inline: Chảy cùng text, không thể set dimensions */
span {
  display: inline;
  width: 200px; /* ✗ Bị bỏ qua */
  height: 100px; /* ✗ Bị bỏ qua */
  margin: 10px 20px; /* ✓ Chỉ left/right hoạt động */
}

/* Inline-block: Kết hợp cả hai */
.button {
  display: inline-block;
  width: 200px; /* ✓ Hoạt động */
  height: 50px; /* ✓ Hoạt động */
  margin: 10px; /* ✓ Hoạt động tất cả các cạnh */
  /* Không ép xuống dòng */
}
```

### Q7: Làm thế nào để căn giữa một div theo cả chiều ngang và dọc?

**Trả lời:**

**Phương pháp 1: Flexbox (Hiện đại, được khuyến nghị)**
```css
.parent {
  display: flex;
  justify-content: center; /* Ngang */
  align-items: center;     /* Dọc */
  height: 100vh;
}
```

**Phương pháp 2: Grid (Hiện đại, được khuyến nghị)**
```css
.parent {
  display: grid;
  place-items: center; /* Cả hai trục */
  height: 100vh;
}
```

**Phương pháp 3: Absolute + Transform (Cũ)**
```css
.parent {
  position: relative;
  height: 100vh;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**Phương pháp 4: Margin Auto (Chỉ ngang)**
```css
.child {
  width: 200px;
  margin: 0 auto; /* Căn giữa theo chiều ngang */
}
```

### Q8: CSS cascade là gì và nó hoạt động như thế nào?

**Trả lời:**

**Cascade** là thuật toán xác định quy tắc CSS nào được áp dụng khi nhiều quy tắc nhắm đến cùng một phần tử.

**Thứ tự ưu tiên:**
1. **Importance:** Quy tắc `!important`
2. **Specificity:** Selectors cụ thể hơn thắng
3. **Source order:** Quy tắc sau ghi đè quy tắc trước

**Ví dụ:**
```css
/* Ví dụ 1: Source order (cùng specificity) */
p { color: blue; }
p { color: red; }  /* ✓ Thắng (sau) */

/* Ví dụ 2: Specificity */
p { color: blue; }
.text { color: red; }  /* ✓ Thắng (cụ thể hơn) */

/* Ví dụ 3: !important */
p { color: blue !important; }
#text { color: red; }  /* Blue thắng (!important) */
```

**Inheritance:**
- Một số thuộc tính kế thừa từ parent (color, font-family)
- Một số không kế thừa (margin, padding, border)

```css
.parent {
  color: red; /* Được kế thừa bởi children */
  margin: 20px; /* KHÔNG được kế thừa */
}
```

### Q9: Sự khác biệt giữa `class` và `id` trong CSS là gì?

**Trả lời:**

| Feature | `class` | `id` |
|---------|---------|------|
| **Tính duy nhất** | Có thể tái sử dụng | Phải là duy nhất |
| **Specificity** | Thấp hơn (0,0,1,0) | Cao hơn (0,1,0,0) |
| **JavaScript** | `getElementsByClassName()` | `getElementById()` |
| **Syntax** | `.classname` | `#idname` |
| **Best Use** | Styling nhiều phần tử | Phần tử duy nhất, anchors |

```html
<!-- Class: Tái sử dụng -->
<div class="button">Button 1</div>
<div class="button">Button 2</div>

<!-- ID: Duy nhất -->
<div id="header">Header</div>
```

```css
/* Class selector */
.button {
  padding: 10px 20px;
}

/* ID selector (specificity cao hơn) */
#header {
  background: blue;
}
```

**Best Practice:**
- Sử dụng **classes** cho styling (tái sử dụng, linh hoạt)
- Sử dụng **IDs** một cách tiết kiệm (anchors, JavaScript targets, styles ưu tiên cao)

### Q10: Pseudo-classes và pseudo-elements là gì? Sự khác biệt là gì?

**Trả lời:**

**Pseudo-classes** chọn phần tử dựa trên **trạng thái**:
```css
/* Trạng thái phần tử */
a:hover { color: red; }
input:focus { border: 2px solid blue; }
input:disabled { opacity: 0.5; }

/* Dựa trên vị trí */
li:first-child { font-weight: bold; }
li:nth-child(odd) { background: #f0f0f0; }

/* Validation */
input:valid { border-color: green; }
input:invalid { border-color: red; }
```

**Pseudo-elements** style **một phần của phần tử**:
```css
/* Content injection */
.button::before {
  content: "→ ";
}

.button::after {
  content: " ←";
}

/* First letter/line */
p::first-letter {
  font-size: 2em;
}

/* Selection */
::selection {
  background: yellow;
}

/* Placeholder */
input::placeholder {
  color: #999;
}
```

**Sự khác biệt chính:**
- Pseudo-classes: **Dấu hai chấm đơn** `:hover`, nhắm đến **trạng thái phần tử**
- Pseudo-elements: **Dấu hai chấm kép** `::before`, nhắm đến **một phần của phần tử**

## Best Practices

1. **Sử dụng `box-sizing: border-box`** - Làm cho sizing trực quan hơn
2. **Tránh `!important`** - Sử dụng specificity đúng cách thay thế
3. **Sử dụng classes thay vì IDs** - Tái sử dụng hơn và specificity thấp hơn
4. **Cách tiếp cận Mobile-first** - Bắt đầu với styles mobile, thêm desktop với media queries
5. **Sử dụng CSS variables** - Cho theming dễ bảo trì
6. **Sử dụng flexbox/grid** - Phương pháp layout hiện đại, không phải floats
7. **Sử dụng rem cho font sizes** - Tôn trọng preferences của người dùng
8. **Giảm thiểu specificity** - Dễ ghi đè và bảo trì hơn
9. **Nhóm các thuộc tính liên quan** - Cải thiện khả năng đọc
10. **Sử dụng CSS preprocessors** - SASS/LESS cho tổ chức tốt hơn

## Resources

- [MDN CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/) - Tương thích trình duyệt
- [CSS Specificity Calculator](https://specificity.keegan.st/)
- [Flexbox Froggy](https://flexboxfroggy.com/) - Học flexbox
- [Grid Garden](https://cssgridgarden.com/) - Học grid
