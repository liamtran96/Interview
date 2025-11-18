---
sidebar_position: 2
---

# CSS Fundamentals

## What is CSS?

**CSS (Cascading Style Sheets)** is a stylesheet language used to describe the presentation of HTML documents. It controls layout, colors, fonts, and overall visual appearance.

:::info Latest Version
CSS3 is the current standard, continuously evolving with new modules and features.
:::

## CSS Syntax

```css
/* Selector { property: value; } */
selector {
  property: value;
  another-property: value;
}
```

### Adding CSS to HTML

```html
<!-- 1. Inline CSS (highest specificity) -->
<p style="color: red; font-size: 16px;">Styled text</p>

<!-- 2. Internal CSS (in <head>) -->
<style>
  p {
    color: red;
    font-size: 16px;
  }
</style>

<!-- 3. External CSS (recommended) -->
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
/* Descendant selector (all nested) */
div p {
  color: blue;
}

/* Child selector (direct children only) */
div > p {
  color: red;
}

/* Adjacent sibling (immediately after) */
h1 + p {
  font-size: 18px;
}

/* General sibling (all siblings after) */
h1 ~ p {
  margin-top: 10px;
}
```

### Attribute Selectors

```css
/* Has attribute */
input[required] {
  border: 2px solid red;
}

/* Exact match */
input[type="text"] {
  padding: 5px;
}

/* Starts with */
a[href^="https"] {
  color: green;
}

/* Ends with */
a[href$=".pdf"] {
  background: url('pdf-icon.png');
}

/* Contains */
a[href*="example"] {
  font-weight: bold;
}

/* Space-separated (class names) */
div[class~="active"] {
  display: block;
}
```

### Pseudo-Classes

```css
/* Link states */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* Input states */
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

/* Other useful pseudo-classes */
p:not(.special) { color: gray; }
div:empty { display: none; }
input:valid { border: 2px solid green; }
input:invalid { border: 2px solid red; }
```

### Pseudo-Elements

```css
/* First letter and line */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}

p::first-line {
  color: blue;
}

/* Before and after */
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

## The Box Model

**Every HTML element is a rectangular box** with four areas:

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

### Box Model Properties

```css
.box {
  /* Content */
  width: 200px;
  height: 150px;

  /* Padding (space inside border) */
  padding: 20px;
  /* or */
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 10px;
  padding-left: 15px;
  /* or shorthand */
  padding: 10px 15px; /* top/bottom left/right */
  padding: 10px 15px 20px; /* top left/right bottom */

  /* Border */
  border: 2px solid black;
  /* or */
  border-width: 2px;
  border-style: solid; /* solid, dashed, dotted, double */
  border-color: black;
  /* individual sides */
  border-top: 1px solid red;

  /* Margin (space outside border) */
  margin: 20px;
  /* same shorthand rules as padding */
  margin: 10px 20px;
  margin: 10px 20px 30px 40px; /* top right bottom left */
}
```

### Box-Sizing

```css
/* Default: content-box */
.box1 {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200 + 40 + 10 = 250px */
}

/* Border-box (includes padding and border) */
.box2 {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 200px (padding/border included) */
}

/* Best practice: Apply to all elements */
* {
  box-sizing: border-box;
}
```

## Display Property

```css
/* Block: Takes full width, starts on new line */
div {
  display: block;
}

/* Inline: Takes only necessary width, no line break */
span {
  display: inline;
  /* Cannot set width/height on inline elements */
}

/* Inline-block: Best of both worlds */
.button {
  display: inline-block;
  width: 100px; /* Can set dimensions */
  height: 40px;
}

/* None: Removes from document flow */
.hidden {
  display: none;
}

/* Modern layout methods */
.flex-container {
  display: flex;
}

.grid-container {
  display: grid;
}
```

## Positioning

### Static (Default)

```css
/* Default positioning */
.static {
  position: static;
  /* top, right, bottom, left have no effect */
}
```

### Relative

```css
/* Positioned relative to its normal position */
.relative {
  position: relative;
  top: 10px; /* Moves 10px down from normal position */
  left: 20px; /* Moves 20px right from normal position */
  /* Space in normal flow is preserved */
}
```

### Absolute

```css
/* Positioned relative to nearest positioned ancestor */
.container {
  position: relative; /* Establishes positioning context */
}

.absolute {
  position: absolute;
  top: 0;
  right: 0;
  /* Removed from normal document flow */
  /* Positioned relative to .container */
}
```

### Fixed

```css
/* Positioned relative to viewport */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* Stays in place when scrolling */
  /* Removed from normal document flow */
}
```

### Sticky

```css
/* Hybrid of relative and fixed */
.sticky-nav {
  position: sticky;
  top: 0;
  /* Acts relative until scroll threshold */
  /* Then acts fixed */
}
```

## Z-Index and Stacking Context

```css
/* Z-index controls stacking order */
.layer1 {
  position: relative; /* z-index only works on positioned elements */
  z-index: 1;
}

.layer2 {
  position: relative;
  z-index: 2; /* Appears above layer1 */
}

.layer3 {
  position: relative;
  z-index: -1; /* Appears behind normal flow */
}

/* Stacking context example */
.parent {
  position: relative;
  z-index: 1;
}

.child {
  position: absolute;
  z-index: 9999; /* Cannot escape parent's stacking context */
}
```

## Colors

```css
/* Named colors */
color: red;
color: blue;

/* Hexadecimal */
color: #ff0000; /* Red */
color: #f00; /* Shorthand */
color: #ff000080; /* With alpha (50% opacity) */

/* RGB */
color: rgb(255, 0, 0);
color: rgba(255, 0, 0, 0.5); /* With alpha */

/* HSL (Hue, Saturation, Lightness) */
color: hsl(0, 100%, 50%); /* Red */
color: hsla(0, 100%, 50%, 0.5); /* With alpha */

/* Modern: OKLCH (better perceptual uniformity) */
color: oklch(0.5 0.2 250); /* Lightness Chroma Hue */

/* Transparent */
color: transparent;

/* Current color */
border-color: currentColor; /* Inherits text color */
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
  font-size: 1rem; /* Relative to root font size */
  font-size: 1.5em; /* Relative to parent font size */

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
  background-repeat: repeat-x; /* Horizontal only */
  background-repeat: repeat-y; /* Vertical only */

  /* Position */
  background-position: center center;
  background-position: top right;
  background-position: 10px 20px;

  /* Size */
  background-size: cover; /* Cover entire element */
  background-size: contain; /* Fit inside element */
  background-size: 100px 200px;

  /* Attachment */
  background-attachment: fixed; /* Fixed during scroll */
  background-attachment: scroll; /* Scrolls with content */

  /* Shorthand */
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
  width: 100px;  /* Pixels (most common) */
  width: 1cm;    /* Centimeters */
  width: 1in;    /* Inches */
  width: 1pt;    /* Points (1/72 of inch) */
}
```

### Relative Units

```css
.relative {
  /* em: Relative to parent font size */
  font-size: 2em; /* 2x parent font size */
  padding: 1em;   /* 1x current element font size */

  /* rem: Relative to root (html) font size */
  font-size: 1.5rem; /* 1.5x root font size */
  margin: 2rem;

  /* Percentage: Relative to parent */
  width: 50%; /* 50% of parent width */

  /* Viewport units */
  width: 100vw;  /* 100% of viewport width */
  height: 100vh; /* 100% of viewport height */
  font-size: 5vmin; /* 5% of smaller viewport dimension */
  font-size: 5vmax; /* 5% of larger viewport dimension */

  /* Character-based */
  width: 20ch; /* Width of 20 "0" characters */
}
```

## Specificity

**Specificity** determines which CSS rule applies when multiple rules target the same element.

### Specificity Hierarchy

```
!important > Inline styles > ID > Class/Attribute/Pseudo-class > Element/Pseudo-element
```

### Specificity Calculation

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

/* Specificity: Overrides everything */
p { color: yellow !important; }
```

**Specificity format:** (inline, IDs, classes, elements)

```css
/* Example calculations */
h1 { }                  /* 0,0,0,1 */
.nav { }                /* 0,0,1,0 */
#header { }             /* 0,1,0,0 */
div.nav { }             /* 0,0,1,1 */
ul li a.active { }      /* 0,0,1,3 */
#header nav ul li { }   /* 0,1,0,3 */
```

## The Cascade

**Cascade** determines which styles apply when multiple rules have equal specificity.

### Order of Importance

1. **User agent styles** (browser defaults)
2. **User styles** (user browser settings)
3. **Author styles** (your CSS)
   - External stylesheets
   - Internal `<style>` tags
   - Inline `style` attributes
4. **!important rules** (override everything)

```css
/* Later rules override earlier ones (same specificity) */
p { color: blue; }
p { color: red; } /* Wins */

/* More specific rules win */
p { color: blue; }
.text { color: red; } /* Wins (higher specificity) */

/* !important overrides specificity */
p { color: blue !important; }
#text { color: red; } /* Blue wins due to !important */
```

## Overflow

```css
.container {
  width: 200px;
  height: 100px;

  /* Clip content */
  overflow: hidden;

  /* Show scrollbars always */
  overflow: scroll;

  /* Show scrollbars only when needed */
  overflow: auto;

  /* Default: Content overflows */
  overflow: visible;

  /* Individual axes */
  overflow-x: hidden;
  overflow-y: scroll;

  /* Text overflow */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* "Text that overflows..." */
}
```

## Float and Clear

```css
/* Float elements (legacy layout method) */
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
  clear: both; /* Clear both left and right floats */
  clear: left; /* Clear left floats only */
  clear: right; /* Clear right floats only */
}

/* Clearfix hack (contain floats) */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

## Interview Questions

### Q1: What is the difference between `display: none` and `visibility: hidden`?

**Answer:**

| Property | Removes from Layout | Space Reserved | Accessibility |
|----------|---------------------|----------------|---------------|
| `display: none` | Yes | No | Hidden from screen readers |
| `visibility: hidden` | No | Yes | Hidden from screen readers |
| `opacity: 0` | No | Yes | Visible to screen readers |

```css
/* display: none - Completely removed */
.hidden1 {
  display: none;
  /* Element takes no space, cannot interact */
}

/* visibility: hidden - Invisible but space preserved */
.hidden2 {
  visibility: hidden;
  /* Element takes space, cannot interact */
}

/* opacity: 0 - Transparent but interactive */
.hidden3 {
  opacity: 0;
  /* Element takes space, CAN interact (clickable) */
}
```

### Q2: Explain the CSS Box Model.

**Answer:**

The **CSS Box Model** describes how every HTML element is represented as a rectangular box:

```
Total Width = width + padding-left + padding-right + border-left + border-right + margin-left + margin-right

Total Height = height + padding-top + padding-bottom + border-top + border-bottom + margin-top + margin-bottom
```

**Example:**
```css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}

/* With box-sizing: content-box (default) */
/* Total width = 200 + 40 + 10 + 20 = 270px */

/* With box-sizing: border-box */
/* Total width = 200px (padding and border included) */
```

**Best Practice:**
```css
* {
  box-sizing: border-box; /* Makes sizing more intuitive */
}
```

### Q3: What is CSS specificity and how is it calculated?

**Answer:**

**Specificity** determines which CSS rule applies when multiple rules target the same element.

**Calculation:** (inline, IDs, classes, elements)

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

/* !important: Overrides all */
p { color: yellow !important; }
```

**Rules:**
1. Higher specificity wins
2. Equal specificity: last rule wins
3. `!important` overrides specificity (avoid using)

### Q4: What is the difference between `em` and `rem` units?

**Answer:**

| Unit | Relative To | Use Case |
|------|-------------|----------|
| `em` | Parent element's font size | Component-level sizing |
| `rem` | Root element's (`<html>`) font size | Global, consistent sizing |

```css
html {
  font-size: 16px; /* 1rem = 16px */
}

.parent {
  font-size: 20px;
}

.child {
  font-size: 2em;  /* 2 × 20px = 40px (parent-relative) */
  padding: 2rem;   /* 2 × 16px = 32px (root-relative) */
}
```

**Compounding problem with `em`:**
```css
.parent {
  font-size: 1.2em; /* 19.2px if root is 16px */
}

.child {
  font-size: 1.2em; /* 1.2 × 19.2px = 23.04px (compounds!) */
}
```

**Best Practice:** Use `rem` for consistent sizing across the site.

### Q5: Explain CSS positioning (static, relative, absolute, fixed, sticky).

**Answer:**

| Position | Behavior | Use Case |
|----------|----------|----------|
| `static` | Default, normal flow | Most elements |
| `relative` | Offset from normal position | Small adjustments |
| `absolute` | Positioned relative to nearest positioned ancestor | Tooltips, dropdowns |
| `fixed` | Positioned relative to viewport | Fixed headers, modals |
| `sticky` | Relative + fixed hybrid | Sticky headers |

```css
/* Static: Default */
.static {
  position: static;
}

/* Relative: Offset from normal position */
.relative {
  position: relative;
  top: 10px; /* Moves down 10px */
}

/* Absolute: Removed from flow, positioned relative to parent */
.container {
  position: relative; /* Positioning context */
}
.absolute {
  position: absolute;
  top: 0;
  right: 0;
}

/* Fixed: Always visible in viewport */
.fixed-header {
  position: fixed;
  top: 0;
  width: 100%;
}

/* Sticky: Switches from relative to fixed */
.sticky-nav {
  position: sticky;
  top: 0; /* Sticks when scrolled to top */
}
```

### Q6: What is the difference between `inline`, `block`, and `inline-block`?

**Answer:**

| Display | Line Break | Width/Height | Padding/Margin |
|---------|------------|--------------|----------------|
| `block` | Yes | Full width by default | All sides |
| `inline` | No | Content width | Horizontal only |
| `inline-block` | No | Content width | All sides |

```css
/* Block: Takes full width, starts new line */
div {
  display: block;
  width: 200px; /* ✓ Works */
  height: 100px; /* ✓ Works */
  margin: 10px; /* ✓ Works all sides */
}

/* Inline: Flows with text, cannot set dimensions */
span {
  display: inline;
  width: 200px; /* ✗ Ignored */
  height: 100px; /* ✗ Ignored */
  margin: 10px 20px; /* ✓ Only left/right work */
}

/* Inline-block: Best of both */
.button {
  display: inline-block;
  width: 200px; /* ✓ Works */
  height: 50px; /* ✓ Works */
  margin: 10px; /* ✓ Works all sides */
  /* Doesn't force line break */
}
```

### Q7: How do you center a div horizontally and vertically?

**Answer:**

**Method 1: Flexbox (Modern, recommended)**
```css
.parent {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center;     /* Vertical */
  height: 100vh;
}
```

**Method 2: Grid (Modern, recommended)**
```css
.parent {
  display: grid;
  place-items: center; /* Both axes */
  height: 100vh;
}
```

**Method 3: Absolute + Transform (Legacy)**
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

**Method 4: Margin Auto (Horizontal only)**
```css
.child {
  width: 200px;
  margin: 0 auto; /* Centers horizontally */
}
```

### Q8: What is the CSS cascade and how does it work?

**Answer:**

The **cascade** is the algorithm that determines which CSS rules apply when multiple rules target the same element.

**Order of precedence:**
1. **Importance:** `!important` rules
2. **Specificity:** More specific selectors win
3. **Source order:** Later rules override earlier ones

**Example:**
```css
/* Example 1: Source order (same specificity) */
p { color: blue; }
p { color: red; }  /* ✓ Wins (later) */

/* Example 2: Specificity */
p { color: blue; }
.text { color: red; }  /* ✓ Wins (more specific) */

/* Example 3: !important */
p { color: blue !important; }
#text { color: red; }  /* Blue wins (! important) */
```

**Inheritance:**
- Some properties inherit from parent (color, font-family)
- Some don't inherit (margin, padding, border)

```css
.parent {
  color: red; /* Inherited by children */
  margin: 20px; /* NOT inherited */
}
```

### Q9: What is the difference between `class` and `id` in CSS?

**Answer:**

| Feature | `class` | `id` |
|---------|---------|------|
| **Uniqueness** | Can be reused | Must be unique |
| **Specificity** | Lower (0,0,1,0) | Higher (0,1,0,0) |
| **JavaScript** | `getElementsByClassName()` | `getElementById()` |
| **Syntax** | `.classname` | `#idname` |
| **Best Use** | Styling multiple elements | Unique elements, anchors |

```html
<!-- Class: Reusable -->
<div class="button">Button 1</div>
<div class="button">Button 2</div>

<!-- ID: Unique -->
<div id="header">Header</div>
```

```css
/* Class selector */
.button {
  padding: 10px 20px;
}

/* ID selector (higher specificity) */
#header {
  background: blue;
}
```

**Best Practice:**
- Use **classes** for styling (reusable, flexible)
- Use **IDs** sparingly (anchors, JavaScript targets, high-priority styles)

### Q10: What are pseudo-classes and pseudo-elements? What's the difference?

**Answer:**

**Pseudo-classes** select elements based on **state**:
```css
/* Element state */
a:hover { color: red; }
input:focus { border: 2px solid blue; }
input:disabled { opacity: 0.5; }

/* Position-based */
li:first-child { font-weight: bold; }
li:nth-child(odd) { background: #f0f0f0; }

/* Validation */
input:valid { border-color: green; }
input:invalid { border-color: red; }
```

**Pseudo-elements** style **part of an element**:
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

**Key Differences:**
- Pseudo-classes: **Single colon** `:hover`, targets **element state**
- Pseudo-elements: **Double colon** `::before`, targets **part of element**

## Best Practices

1. **Use `box-sizing: border-box`** - Makes sizing more intuitive
2. **Avoid `!important`** - Use specificity correctly instead
3. **Use classes over IDs** - More reusable and lower specificity
4. **Mobile-first approach** - Start with mobile styles, add desktop with media queries
5. **Use CSS variables** - For maintainable theming
6. **Use flexbox/grid** - Modern layout methods, not floats
7. **Use rem for font sizes** - Respects user preferences
8. **Minimize specificity** - Easier to override and maintain
9. **Group related properties** - Improves readability
10. **Use CSS preprocessors** - SASS/LESS for better organization

## Resources

- [MDN CSS Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/) - Browser compatibility
- [CSS Specificity Calculator](https://specificity.keegan.st/)
- [Flexbox Froggy](https://flexboxfroggy.com/) - Learn flexbox
- [Grid Garden](https://cssgridgarden.com/) - Learn grid
