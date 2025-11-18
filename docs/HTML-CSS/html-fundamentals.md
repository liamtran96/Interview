---
sidebar_position: 1
---

# HTML Fundamentals

## What is HTML?

**HTML (HyperText Markup Language)** is the standard markup language for creating web pages. It describes the structure and semantic meaning of web content.

:::info Latest Version
HTML5 is the current standard, continuously evolving with new features and APIs.
:::

## HTML Document Structure

### Basic HTML Template

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

**Key Elements:**
- `<!DOCTYPE html>` - Declares HTML5 document type
- `<html>` - Root element with `lang` attribute for accessibility
- `<head>` - Contains metadata (not visible on page)
- `<meta charset="UTF-8">` - Character encoding
- `<meta name="viewport">` - Responsive design support
- `<body>` - Contains visible content

## Semantic HTML Elements

**Semantic elements** clearly describe their meaning to both the browser and developer.

### Page Structure Elements

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Blog Post</title>
</head>
<body>
  <!-- Header: Site branding, navigation -->
  <header>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <!-- Main: Primary content of document -->
  <main>
    <!-- Article: Independent, self-contained content -->
    <article>
      <header>
        <h1>Article Title</h1>
        <p>Published on <time datetime="2025-11-18">November 18, 2025</time></p>
      </header>

      <!-- Section: Thematic grouping of content -->
      <section>
        <h2>Introduction</h2>
        <p>Content goes here...</p>
      </section>

      <!-- Aside: Tangentially related content -->
      <aside>
        <h3>Related Links</h3>
        <ul>
          <li><a href="#">Related Article 1</a></li>
        </ul>
      </aside>
    </article>
  </main>

  <!-- Footer: Footer information -->
  <footer>
    <p>&copy; 2025 Company Name</p>
  </footer>
</body>
</html>
```

### Common Semantic Elements

| Element | Purpose | Example Use Case |
|---------|---------|------------------|
| `<header>` | Introductory content | Site header, article header |
| `<nav>` | Navigation links | Main menu, breadcrumbs |
| `<main>` | Main content | Primary page content |
| `<article>` | Self-contained content | Blog post, news article |
| `<section>` | Thematic grouping | Chapters, tabs |
| `<aside>` | Tangential content | Sidebar, callout box |
| `<footer>` | Footer content | Copyright, contact info |
| `<figure>` | Self-contained media | Image with caption |
| `<figcaption>` | Caption for figure | Image description |

## Forms and Input Elements

### Form Structure

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

| Type | Purpose | Browser Support |
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

## Text Formatting and Content

### Headings and Paragraphs

```html
<h1>Main Heading (only one per page)</h1>
<h2>Section Heading</h2>
<h3>Subsection Heading</h3>
<h4>Minor Heading</h4>
<h5>Smaller Heading</h5>
<h6>Smallest Heading</h6>

<p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
```

:::warning Heading Hierarchy
Always maintain proper heading hierarchy (h1 → h2 → h3). Don't skip levels for accessibility and SEO.
:::

### Text Formatting Elements

```html
<!-- Bold (semantic importance) -->
<strong>Important text</strong>

<!-- Italic (semantic emphasis) -->
<em>Emphasized text</em>

<!-- Bold (visual only) -->
<b>Bold text without importance</b>

<!-- Italic (visual only) -->
<i>Italic text without emphasis</i>

<!-- Marked/Highlighted -->
<mark>Highlighted text</mark>

<!-- Small print -->
<small>Fine print or disclaimer</small>

<!-- Deleted text -->
<del>Deleted text</del>

<!-- Inserted text -->
<ins>Inserted text</ins>

<!-- Subscript and superscript -->
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

<!-- Start from different number -->
<ol start="5">
  <li>Fifth step</li>
  <li>Sixth step</li>
</ol>

<!-- Different numbering types -->
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

## Links and Navigation

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

:::info Security Note
Always use `rel="noopener noreferrer"` with `target="_blank"` to prevent security vulnerabilities.
:::

## Images and Media

### Images

```html
<!-- Basic image -->
<img src="image.jpg" alt="Description for accessibility">

<!-- Responsive image with width/height -->
<img
  src="image.jpg"
  alt="Description"
  width="800"
  height="600"
  loading="lazy"
>

<!-- Picture element for responsive images -->
<picture>
  <source media="(min-width: 800px)" srcset="large.jpg">
  <source media="(min-width: 400px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Responsive image">
</picture>

<!-- Figure with caption -->
<figure>
  <img src="chart.jpg" alt="Sales chart">
  <figcaption>Figure 1: Sales data for Q4 2025</figcaption>
</figure>
```

### Audio and Video

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

## HTML5 APIs and Features

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

### Details and Summary

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

<!-- Button with description -->
<button aria-label="Close dialog" aria-describedby="close-description">
  ×
</button>
<span id="close-description" hidden>Closes the dialog window</span>

<!-- Live region for dynamic content -->
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

<!-- Complex image with longdesc -->
<img
  src="complex-diagram.png"
  alt="Flowchart of user authentication process"
  longdesc="auth-description.html"
>
```

## Interview Questions

### Q1: What is the difference between `<div>` and `<span>`?

**Answer:**

| Feature | `<div>` | `<span>` |
|---------|---------|----------|
| **Type** | Block-level element | Inline element |
| **Display** | Takes full width | Takes only necessary width |
| **Line Break** | Starts on new line | Does not start on new line |
| **Use Case** | Container for sections | Container for small text portions |

```html
<!-- div: block-level -->
<div>This div takes full width</div>
<div>New line automatically</div>

<!-- span: inline -->
<p>This is <span style="color: red;">red text</span> inline.</p>
```

### Q2: What are semantic HTML elements and why are they important?

**Answer:**

**Semantic elements** clearly describe their meaning:

**Benefits:**
1. **SEO** - Search engines understand content structure
2. **Accessibility** - Screen readers navigate better
3. **Maintainability** - Code is more readable
4. **Future-proofing** - Better browser support

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

### Q3: What is the difference between `<strong>` and `<b>`, `<em>` and `<i>`?

**Answer:**

**Semantic vs Visual:**

| Semantic | Visual | Purpose |
|----------|--------|---------|
| `<strong>` | `<b>` | Strong importance |
| `<em>` | `<i>` | Emphasis |

```html
<!-- Semantic: Conveys meaning -->
<strong>Warning!</strong> This is important.
<em>Please</em> read carefully.

<!-- Visual: Only styling -->
<b>Bold text</b> without importance.
<i>Italic text</i> without emphasis.
```

**Use semantic tags for:**
- Better accessibility (screen readers)
- SEO (search engines understand importance)
- Semantic meaning in code

### Q4: What are data attributes and how do you use them?

**Answer:**

**Data attributes** store custom data on HTML elements using `data-*` prefix:

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

  // Access via dataset
  console.log(article.dataset.postId);     // "123"
  console.log(article.dataset.category);   // "technology"
  console.log(article.dataset.views);      // "1500"

  // Modify data attribute
  article.dataset.views = "1501";
</script>
```

**Use cases:**
- Store metadata for JavaScript
- Configuration data
- State management
- Analytics tracking

### Q5: What is the purpose of the DOCTYPE declaration?

**Answer:**

`<!DOCTYPE html>` tells the browser which HTML version to use:

```html
<!DOCTYPE html> <!-- HTML5 -->
```

**Purpose:**
1. **Standards mode** - Browser renders in standards-compliant mode
2. **Prevents quirks mode** - Avoids legacy rendering behavior
3. **Required** - Must be first line of HTML document

**Without DOCTYPE:**
- Browser may enter "quirks mode"
- Inconsistent rendering across browsers
- CSS may behave unexpectedly

### Q6: What is the difference between `<section>`, `<article>`, and `<div>`?

**Answer:**

| Element | Purpose | When to Use |
|---------|---------|-------------|
| `<section>` | Thematic grouping of content | Related content with heading |
| `<article>` | Self-contained, independent content | Blog post, news article, comment |
| `<div>` | Generic container (no semantic meaning) | Styling or JavaScript targeting |

```html
<!-- article: Independent content -->
<article>
  <h2>Blog Post Title</h2>
  <p>Complete blog post content...</p>
</article>

<!-- section: Thematic grouping -->
<section>
  <h2>Related Posts</h2>
  <article>Post 1</article>
  <article>Post 2</article>
</section>

<!-- div: No semantic meaning -->
<div class="wrapper">
  <div class="container">...</div>
</div>
```

### Q7: What are the new input types in HTML5?

**Answer:**

HTML5 introduced several new input types with built-in validation:

```html
<!-- Email (validates format) -->
<input type="email" required>

<!-- URL (validates URL format) -->
<input type="url">

<!-- Number (with min/max/step) -->
<input type="number" min="0" max="100" step="5">

<!-- Range (slider) -->
<input type="range" min="0" max="100" value="50">

<!-- Date picker -->
<input type="date">

<!-- Time picker -->
<input type="time">

<!-- Color picker -->
<input type="color">

<!-- Search (styling hints for browsers) -->
<input type="search">

<!-- Telephone (mobile keyboard) -->
<input type="tel">
```

**Benefits:**
- Built-in browser validation
- Better mobile keyboards
- Consistent user experience
- Less JavaScript needed

### Q8: What is the purpose of the `alt` attribute in images?

**Answer:**

The `alt` attribute provides **alternative text** for images:

```html
<img src="chart.jpg" alt="Sales chart showing 25% growth in Q4">
```

**Purposes:**
1. **Accessibility** - Screen readers read alt text for visually impaired users
2. **SEO** - Search engines use alt text to understand images
3. **Fallback** - Displayed if image fails to load
4. **Context** - Explains image content

**Best practices:**
```html
<!-- Good: Descriptive -->
<img src="dog.jpg" alt="Golden retriever playing fetch in park">

<!-- Bad: Too generic -->
<img src="dog.jpg" alt="Image">

<!-- Decorative: Empty alt -->
<img src="decoration.png" alt="">
```

### Q9: What is the difference between `<script>`, `<script async>`, and `<script defer>`?

**Answer:**

| Attribute | Download | Execution | Use Case |
|-----------|----------|-----------|----------|
| None | Blocks HTML parsing | Immediate | Legacy code |
| `async` | Parallel | As soon as downloaded | Independent scripts (analytics) |
| `defer` | Parallel | After HTML parsed | Scripts that need DOM |

```html
<!-- Regular: Blocks parsing -->
<script src="script.js"></script>

<!-- Async: Execute ASAP (order not guaranteed) -->
<script src="analytics.js" async></script>

<!-- Defer: Execute after DOM ready (order guaranteed) -->
<script src="app.js" defer></script>
```

**Visual representation:**
```
Regular: HTML → [BLOCKED] → Script → Continue HTML
Async:   HTML → (Script downloads) → [Script executes] → Continue
Defer:   HTML → (Script downloads) → HTML done → Script executes
```

### Q10: What is the purpose of the `meta viewport` tag?

**Answer:**

The viewport meta tag controls how a webpage is displayed on mobile devices:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Breakdown:**
- `width=device-width` - Match screen width
- `initial-scale=1.0` - Initial zoom level (100%)

**Additional options:**
```html
<!-- Prevent zooming -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- Allow zooming up to 2x -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
```

**Without viewport tag:**
- Mobile browsers render at desktop width (~980px)
- Users must pinch to zoom
- Poor mobile experience

**With viewport tag:**
- Content fits mobile screen
- Responsive design works correctly
- Better user experience

## Best Practices

1. **Always use semantic HTML** - Improves accessibility and SEO
2. **Include alt text on images** - Essential for accessibility
3. **Use proper heading hierarchy** - h1 → h2 → h3 (don't skip levels)
4. **Label form inputs** - Associate `<label>` with `<input>` via `for` attribute
5. **Use `rel="noopener noreferrer"` with `target="_blank"`** - Security
6. **Validate your HTML** - Use W3C validator
7. **Use meaningful class/id names** - Improves maintainability
8. **Keep HTML simple** - Don't over-nest elements
9. **Use HTML5 input types** - Built-in validation and better UX
10. **Test accessibility** - Use screen readers and keyboard navigation

## Resources

- [MDN HTML Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3C HTML Specification](https://html.spec.whatwg.org/)
- [HTML Validator](https://validator.w3.org/)
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
