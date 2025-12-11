---
sidebar_position: 1
---

# HTML Fundamentals

## HTML là gì?

**HTML (HyperText Markup Language)** là ngôn ngữ đánh dấu chuẩn để tạo các trang web. Nó mô tả cấu trúc và ý nghĩa ngữ nghĩa của nội dung web.

:::info Phiên bản mới nhất
HTML5 là tiêu chuẩn hiện tại, liên tục phát triển với các tính năng và APIs mới.
:::

## Cấu trúc tài liệu HTML

### Template HTML cơ bản

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Page description for SEO">
  <title>Page Title</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Hello World</h1>
  <script src="script.js"></script>
</body>
</html>
```

**Các phần tử chính:**
- `<!DOCTYPE html>` - Khai báo loại tài liệu HTML5
- `<html>` - Phần tử gốc với thuộc tính `lang` cho accessibility
- `<head>` - Chứa metadata (không hiển thị trên trang)
- `<meta charset="UTF-8">` - Mã hóa ký tự
- `<meta name="viewport">` - Hỗ trợ responsive design
- `<body>` - Chứa nội dung hiển thị

## Semantic HTML Elements

**Semantic elements** mô tả rõ ràng ý nghĩa của chúng cho cả trình duyệt và developer.

### Page Structure Elements

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Blog Post</title>
</head>
<body>
  <!-- Header: Branding site, navigation -->
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main: Nội dung chính của tài liệu -->
  <main>
    <!-- Article: Nội dung độc lập, tự chứa -->
    <article>
      <header>
        <h1>Article Title</h1>
        <p>Published on <time datetime="2025-11-18">November 18, 2025</time></p>
      </header>

      <!-- Section: Nhóm nội dung theo chủ đề -->
      <section>
        <h2>Introduction</h2>
        <p>Content goes here...</p>
      </section>

      <!-- Aside: Nội dung liên quan gián tiếp -->
      <aside>
        <h3>Related Links</h3>
        <ul>
          <li><a href="#">Related Article 1</a></li>
        </ul>
      </aside>
    </article>
  </main>

  <!-- Footer: Thông tin footer -->
  <footer>
    <p>&copy; 2025 Company Name</p>
  </footer>
</body>
</html>
```

### Semantic Elements thường dùng

| Element | Mục đích | Ví dụ Use Case |
|---------|---------|------------------|
| `<header>` | Nội dung giới thiệu | Site header, article header |
| `<nav>` | Navigation links | Main menu, breadcrumbs |
| `<main>` | Nội dung chính | Nội dung trang chính |
| `<article>` | Nội dung tự chứa | Blog post, news article |
| `<section>` | Nhóm theo chủ đề | Chapters, tabs |
| `<aside>` | Nội dung phụ | Sidebar, callout box |
| `<footer>` | Nội dung footer | Copyright, contact info |
| `<figure>` | Media tự chứa | Image with caption |
| `<figcaption>` | Caption cho figure | Image description |

## Forms và Input Elements

### Cấu trúc Form

```html
<form action="/submit" method="POST">
  <!-- Text Input -->
  <label for="username">Username:</label>
  <input
    type="text"
    id="username"
    name="username"
    required
    minlength="3"
    maxlength="20"
    placeholder="Enter username"
  >

  <!-- Email Input (HTML5 validation) -->
  <label for="email">Email:</label>
  <input
    type="email"
    id="email"
    name="email"
    required
  >

  <!-- Password Input -->
  <label for="password">Password:</label>
  <input
    type="password"
    id="password"
    name="password"
    required
    minlength="8"
  >

  <!-- Number Input -->
  <label for="age">Age:</label>
  <input
    type="number"
    id="age"
    name="age"
    min="18"
    max="100"
  >

  <!-- Date Input -->
  <label for="birthdate">Birth Date:</label>
  <input
    type="date"
    id="birthdate"
    name="birthdate"
  >

  <!-- Select Dropdown -->
  <label for="country">Country:</label>
  <select id="country" name="country" required>
    <option value="">Select country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </select>

  <!-- Radio Buttons -->
  <fieldset>
    <legend>Gender:</legend>
    <label>
      <input type="radio" name="gender" value="male" required>
      Male
    </label>
    <label>
      <input type="radio" name="gender" value="female">
      Female
    </label>
    <label>
      <input type="radio" name="gender" value="other">
      Other
    </label>
  </fieldset>

  <!-- Checkboxes -->
  <label>
    <input type="checkbox" name="terms" required>
    I agree to the terms and conditions
  </label>

  <!-- Textarea -->
  <label for="message">Message:</label>
  <textarea
    id="message"
    name="message"
    rows="5"
    cols="30"
    placeholder="Enter your message"
  ></textarea>

  <!-- Submit Button -->
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

### HTML5 Input Types

| Type | Mục đích | Hỗ trợ trình duyệt |
|------|---------|-----------------|
| `email` | Email validation | Built-in validation |
| `url` | URL validation | Built-in validation |
| `tel` | Phone number | Mobile keyboard |
| `number` | Numeric input | Spinner controls |
| `range` | Slider | Visual slider |
| `date` | Date picker | Native date picker |
| `time` | Time picker | Native time picker |
| `color` | Color picker | Native color picker |
| `search` | Search field | Styling hints |

## Text Formatting và Content

### Headings và Paragraphs

```html
<h1>Main Heading (chỉ một trên mỗi trang)</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Minor Heading</h4>
<h5>Smaller Heading</h5>
<h6>Smallest Heading</h6>

<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
```

:::warning Thứ bậc Heading
Luôn duy trì thứ bậc heading đúng (h1 → h2 → h3). Không bỏ qua các cấp cho accessibility và SEO.
:::

### Text Formatting Elements

```html
<!-- Bold (semantic importance) -->
<strong>Important text</strong>

<!-- Italic (semantic emphasis) -->
<em>Emphasized text</em>

<!-- Bold (chỉ visual) -->
<b>Bold text without importance</b>

<!-- Italic (chỉ visual) -->
<i>Italic text without emphasis</i>

<!-- Marked/Highlighted -->
<mark>Highlighted text</mark>

<!-- Small print -->
<small>Fine print or disclaimer</small>

<!-- Deleted text -->
<del>Deleted text</del>

<!-- Inserted text -->
<ins>Inserted text</ins>

<!-- Subscript và superscript -->
H<sub>2</sub>O
E = mc<sup>2</sup>

<!-- Code -->
<code>const x = 10;</code>

<!-- Preformatted text -->
<pre>
  Line breaks    and  spacing
  are preserved  exactly
</pre>

<!-- Blockquote -->
<blockquote cite="https://source.com">
  <p>This is a quote from another source.</p>
</blockquote>
```

## Lists

### Unordered Lists

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3
    <ul>
      <li>Nested item 1</li>
      <li>Nested item 2</li>
    </ul>
  </li>
</ul>
```

### Ordered Lists

```html
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>

<!-- Bắt đầu từ số khác -->
<ol start="5">
  <li>Fifth step</li>
  <li>Sixth step</li>
</ol>

<!-- Các kiểu đánh số khác -->
<ol type="A">
  <li>Type A</li>
  <li>Type B</li>
</ol>
```

### Description Lists

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language</dd>

  <dt>CSS</dt>
  <dd>Cascading Style Sheets</dd>

  <dt>JavaScript</dt>
  <dd>Programming language for web browsers</dd>
</dl>
```

## Links và Navigation

### Basic Links

```html
<!-- External link -->
<a href="https://example.com">External Link</a>

<!-- External link (new tab) -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Open in New Tab
</a>

<!-- Email link -->
<a href="mailto:contact@example.com">Send Email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call Us</a>

<!-- Internal anchor link -->
<a href="#section-id">Jump to Section</a>

<!-- Download link -->
<a href="document.pdf" download>Download PDF</a>
```

:::info Lưu ý bảo mật
Luôn sử dụng `rel="noopener noreferrer"` với `target="_blank"` để ngăn chặn các lỗ hổng bảo mật.
:::

## Images và Media

### Images

```html
<!-- Basic image -->
<img src="image.jpg" alt="Description for accessibility">

<!-- Responsive image với width/height -->
<img
  src="image.jpg"
  alt="Description"
  width="800"
  height="600"
  loading="lazy"
>

<!-- Picture element cho responsive images -->
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Responsive image">
</picture>

<!-- Figure với caption -->
<figure>
  <img src="chart.jpg" alt="Sales chart">
  <figcaption>Figure 1: Sales data for Q4 2025</figcaption>
</figure>
```

### Audio và Video

```html
<!-- Audio -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>

<!-- Video -->
<video width="640" height="360" controls poster="thumbnail.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <track kind="subtitles" src="subtitles_en.vtt" srclang="en" label="English">
  Your browser does not support the video tag.
</video>

<!-- Embedded YouTube video -->
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen>
</iframe>
```

## Tables

```html
<table>
  <caption>Monthly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
      <th scope="col">Profit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$10,000</td>
      <td>$3,000</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$12,000</td>
      <td>$3,600</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Total</td>
      <td>$22,000</td>
      <td>$6,600</td>
    </tr>
  </tfoot>
</table>
```

## HTML5 APIs và Features

### Data Attributes

```html
<article
  data-post-id="123"
  data-author="John Doe"
  data-published="2025-11-18"
>
  <h2>Article Title</h2>
</article>

<script>
  const article = document.querySelector('article');
  console.log(article.dataset.postId); // "123"
  console.log(article.dataset.author); // "John Doe"
</script>
```

### Content Editable

```html
<div contenteditable="true">
  This content can be edited by the user.
</div>
```

### Details và Summary

```html
<details>
  <summary>Click to expand</summary>
  <p>This content is hidden by default and can be toggled.</p>
</details>
```

## Accessibility Best Practices

### ARIA Attributes

```html
<!-- Landmark roles -->
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<!-- Button với description -->
<button aria-label="Close dialog" aria-describedby="close-description">
  ×
</button>
<span id="close-description" hidden>Closes the dialog window</span>

<!-- Live region cho dynamic content -->
<div role="alert" aria-live="assertive">
  Form submitted successfully!
</div>

<!-- Tab interface -->
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel-2">Tab 2</button>
</div>
<div role="tabpanel" id="panel-1">Panel 1 content</div>
<div role="tabpanel" id="panel-2" hidden>Panel 2 content</div>
```

### Alt Text Best Practices

```html
<!-- Informative image -->
<img src="chart.png" alt="Bar chart showing 25% increase in sales">

<!-- Decorative image (empty alt) -->
<img src="decoration.png" alt="">

<!-- Image as link -->
<a href="/home">
  <img src="logo.png" alt="Company Name Home">
</a>

<!-- Complex image với longdesc -->
<img
  src="complex-diagram.png"
  alt="Flowchart of user authentication process"
  longdesc="auth-description.html"
>
```

## Câu hỏi phỏng vấn

### Q1: Sự khác biệt giữa `<div>` và `<span>` là gì?

**Trả lời:**

| Feature | `<div>` | `<span>` |
|---------|---------|----------|
| **Type** | Block-level element | Inline element |
| **Display** | Chiếm toàn bộ chiều rộng | Chỉ chiếm chiều rộng cần thiết |
| **Line Break** | Bắt đầu dòng mới | Không bắt đầu dòng mới |
| **Use Case** | Container cho sections | Container cho các phần text nhỏ |

```html
<!-- div: block-level -->
<div>This div takes full width</div>
<div>New line automatically</div>

<!-- span: inline -->
<p>This is <span style="color: red;">red text</span> inline.</p>
```

### Q2: Semantic HTML elements là gì và tại sao chúng quan trọng?

**Trả lời:**

**Semantic elements** mô tả rõ ràng ý nghĩa của chúng:

**Lợi ích:**
1. **SEO** - Công cụ tìm kiếm hiểu cấu trúc nội dung
2. **Accessibility** - Screen readers điều hướng tốt hơn
3. **Maintainability** - Code dễ đọc hơn
4. **Future-proofing** - Hỗ trợ trình duyệt tốt hơn

```html
<!-- ❌ Non-semantic -->
<div id="header">
  <div id="nav">...</div>
</div>
<div id="main">...</div>

<!-- ✅ Semantic -->
<header>
  <nav>...</nav>
</header>
<main>...</main>
```

### Q3: Sự khác biệt giữa `<strong>` và `<b>`, `<em>` và `<i>` là gì?

**Trả lời:**

**Semantic vs Visual:**

| Semantic | Visual | Mục đích |
|----------|--------|---------|
| `<strong>` | `<b>` | Tầm quan trọng mạnh |
| `<em>` | `<i>` | Emphasis |

```html
<!-- Semantic: Truyền đạt ý nghĩa -->
<strong>Warning!</strong> This is important.
<em>Please</em> read carefully.

<!-- Visual: Chỉ styling -->
<b>Bold text</b> without importance.
<i>Italic text</i> without emphasis.
```

**Sử dụng semantic tags cho:**
- Accessibility tốt hơn (screen readers)
- SEO (công cụ tìm kiếm hiểu tầm quan trọng)
- Ý nghĩa ngữ nghĩa trong code

### Q4: Data attributes là gì và cách sử dụng chúng?

**Trả lời:**

**Data attributes** lưu trữ dữ liệu tùy chỉnh trên HTML elements sử dụng tiền tố `data-*`:

```html
<article
  data-post-id="123"
  data-category="technology"
  data-views="1500"
>
  <h2>Article Title</h2>
</article>

<script>
  const article = document.querySelector('article');

  // Truy cập qua dataset
  console.log(article.dataset.postId);     // "123"
  console.log(article.dataset.category);   // "technology"
  console.log(article.dataset.views);      // "1500"

  // Thay đổi data attribute
  article.dataset.views = "1501";
</script>
```

**Use cases:**
- Lưu trữ metadata cho JavaScript
- Configuration data
- State management
- Analytics tracking

### Q5: Mục đích của DOCTYPE declaration là gì?

**Trả lời:**

`<!DOCTYPE html>` cho trình duyệt biết phiên bản HTML nào được sử dụng:

```html
<!DOCTYPE html> <!-- HTML5 -->
```

**Mục đích:**
1. **Standards mode** - Trình duyệt render ở chế độ tuân thủ tiêu chuẩn
2. **Ngăn quirks mode** - Tránh hành vi render cũ
3. **Bắt buộc** - Phải là dòng đầu tiên của tài liệu HTML

**Không có DOCTYPE:**
- Trình duyệt có thể vào "quirks mode"
- Rendering không nhất quán giữa các trình duyệt
- CSS có thể hoạt động không như mong đợi

### Q6: Sự khác biệt giữa `<section>`, `<article>`, và `<div>` là gì?

**Trả lời:**

| Element | Mục đích | Khi nào sử dụng |
|---------|---------|-------------|
| `<section>` | Nhóm nội dung theo chủ đề | Nội dung liên quan với heading |
| `<article>` | Nội dung tự chứa, độc lập | Blog post, news article, comment |
| `<div>` | Generic container (không có ý nghĩa semantic) | Styling hoặc JavaScript targeting |

```html
<!-- article: Nội dung độc lập -->
<article>
  <h2>Blog Post Title</h2>
  <p>Complete blog post content...</p>
</article>

<!-- section: Nhóm theo chủ đề -->
<section>
  <h2>Related Posts</h2>
  <article>Post 1</article>
  <article>Post 2</article>
</section>

<!-- div: Không có ý nghĩa semantic -->
<div class="wrapper">
  <div class="container">...</div>
</div>
```

### Q7: Các input types mới trong HTML5 là gì?

**Trả lời:**

HTML5 giới thiệu nhiều input types mới với validation tích hợp:

```html
<!-- Email (validates format) -->
<input type="email" required>

<!-- URL (validates URL format) -->
<input type="url">

<!-- Number (với min/max/step) -->
<input type="number" min="0" max="100" step="5">

<!-- Range (slider) -->
<input type="range" min="0" max="100" value="50">

<!-- Date picker -->
<input type="date">

<!-- Time picker -->
<input type="time">

<!-- Color picker -->
<input type="color">

<!-- Search (styling hints cho trình duyệt) -->
<input type="search">

<!-- Telephone (mobile keyboard) -->
<input type="tel">
```

**Lợi ích:**
- Validation tích hợp của trình duyệt
- Mobile keyboards tốt hơn
- User experience nhất quán
- Ít JavaScript cần thiết hơn

### Q8: Mục đích của thuộc tính `alt` trong images là gì?

**Trả lời:**

Thuộc tính `alt` cung cấp **alternative text** cho images:

```html
<img src="chart.jpg" alt="Sales chart showing 25% growth in Q4">
```

**Mục đích:**
1. **Accessibility** - Screen readers đọc alt text cho người khiếm thị
2. **SEO** - Công cụ tìm kiếm sử dụng alt text để hiểu images
3. **Fallback** - Hiển thị nếu image không tải được
4. **Context** - Giải thích nội dung image

**Best practices:**
```html
<!-- Tốt: Mô tả rõ ràng -->
<img src="dog.jpg" alt="Golden retriever playing fetch in park">

<!-- Không tốt: Quá chung chung -->
<img src="dog.jpg" alt="Image">

<!-- Decorative: Empty alt -->
<img src="decoration.png" alt="">
```

### Q9: Sự khác biệt giữa `<script>`, `<script async>`, và `<script defer>` là gì?

**Trả lời:**

| Attribute | Download | Execution | Use Case |
|-----------|----------|-----------|----------|
| None | Chặn HTML parsing | Ngay lập tức | Legacy code |
| `async` | Song song | Ngay khi tải xong | Independent scripts (analytics) |
| `defer` | Song song | Sau khi HTML parsed | Scripts cần DOM |

```html
<!-- Regular: Chặn parsing -->
<script src="script.js"></script>

<!-- Async: Thực thi ASAP (không đảm bảo thứ tự) -->
<script src="analytics.js" async></script>

<!-- Defer: Thực thi sau khi DOM ready (đảm bảo thứ tự) -->
<script src="app.js" defer></script>
```

**Biểu diễn trực quan:**
```
Regular: HTML → [BLOCKED] → Script → Continue HTML
Async:   HTML → (Script downloads) → [Script executes] → Continue
Defer:   HTML → (Script downloads) → HTML done → Script executes
```

### Q10: Mục đích của thẻ `meta viewport` là gì?

**Trả lời:**

Thẻ viewport meta kiểm soát cách webpage hiển thị trên mobile devices:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Phân tích:**
- `width=device-width` - Khớp chiều rộng màn hình
- `initial-scale=1.0` - Mức zoom ban đầu (100%)

**Tùy chọn bổ sung:**
```html
<!-- Ngăn zooming (tránh trừ khi cần thiết) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- Cho phép zoom lên đến 2x -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
```

**Không có viewport tag:**
- Mobile browsers render ở desktop width (~980px)
- Người dùng phải pinch để zoom
- Trải nghiệm mobile kém

**Với viewport tag:**
- Nội dung vừa màn hình mobile
- Responsive design hoạt động đúng
- Trải nghiệm người dùng tốt hơn

## Best Practices

1. **Luôn sử dụng semantic HTML** - Cải thiện accessibility và SEO
2. **Bao gồm alt text trên images** - Thiết yếu cho accessibility
3. **Sử dụng thứ bậc heading đúng** - h1 → h2 → h3 (không bỏ qua cấp)
4. **Label form inputs** - Liên kết `<label>` với `<input>` qua thuộc tính `for`
5. **Sử dụng `rel="noopener noreferrer"` với `target="_blank"`** - Bảo mật
6. **Validate HTML của bạn** - Sử dụng W3C validator
7. **Sử dụng tên class/id có ý nghĩa** - Cải thiện maintainability
8. **Giữ HTML đơn giản** - Không lồng quá nhiều phần tử
9. **Sử dụng HTML5 input types** - Validation tích hợp và UX tốt hơn
10. **Test accessibility** - Sử dụng screen readers và keyboard navigation

## Resources

- [MDN HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3C HTML Specification](https://html.spec.whatwg.org/)
- [HTML Validator](https://validator.w3.org/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
