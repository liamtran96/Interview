---
sidebar_position: 5
---

# Responsive Design

## What is Responsive Design?

**Responsive Web Design (RWD)** is an approach to web design that makes web pages render well on all devices and screen sizes by automatically adapting to the screen.

:::info Key Concept
**"Mobile-first"** approach: Design for mobile first, then enhance for larger screens.
:::

## Viewport Meta Tag

**Essential** for responsive design:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Without viewport tag:** Mobile browsers render at desktop width (~980px)
**With viewport tag:** Content fits mobile screen properly

## Media Queries

**Media queries** apply different styles based on device characteristics.

### Basic Syntax

```css
/* Mobile-first approach (recommended) */
/* Base styles for mobile */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}

/* Desktop and up */
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

### Common Breakpoints

```css
/* Mobile (default) */
/* 0px - 767px */

/* Tablet */
@media (min-width: 768px) {
  /* Styles for tablet */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Styles for desktop */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* Styles for large screens */
}
```

### Media Query Features

```css
/* Width-based */
@media (min-width: 600px) { }
@media (max-width: 999px) { }
@media (min-width: 600px) and (max-width: 999px) { }

/* Height-based */
@media (min-height: 600px) { }

/* Orientation */
@media (orientation: portrait) { }
@media (orientation: landscape) { }

/* Resolution */
@media (min-resolution: 2dppx) { /* Retina displays */ }

/* Hover capability */
@media (hover: hover) {
  /* Device supports hover (mouse) */
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
/* Fixed width (not responsive) */
.container {
  width: 960px; /* ✗ Doesn't adapt */
}

/* Fluid width (responsive) */
.container {
  width: 90%; /* ✓ Adapts to screen */
  max-width: 1200px;
  margin: 0 auto;
}
```

### Fluid Typography

```css
/* Fixed typography */
h1 {
  font-size: 32px; /* ✗ Same on all devices */
}

/* Responsive typography */
h1 {
  font-size: 6vw; /* ✓ Scales with viewport */
  font-size: clamp(24px, 5vw, 48px); /* Better: Min, preferred, max */
}

/* Using calc() */
h1 {
  font-size: calc(20px + 2vw);
}
```

### Fluid Images

```css
/* Make images responsive */
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

/* Picture element for art direction */
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
  width: 100vw;  /* 100% of viewport width */
  height: 100vh; /* 100% of viewport height */

  /* Min/max of viewport dimensions */
  font-size: 5vmin; /* 5% of smaller dimension */
  font-size: 5vmax; /* 5% of larger dimension */
}
```

### Percentage

```css
.column {
  width: 50%; /* 50% of parent */
  padding: 2%; /* 2% of parent width */
}
```

### rem vs em

```css
/* rem: Relative to root font size */
html {
  font-size: 16px; /* 1rem = 16px */
}

.button {
  padding: 1rem; /* 16px */
  font-size: 1.25rem; /* 20px */
}

/* em: Relative to parent font size */
.parent {
  font-size: 20px;
}

.child {
  font-size: 0.8em; /* 16px (0.8 × 20px) */
}
```

## Modern CSS Functions

### clamp()

**Best function for responsive design:**

```css
/* clamp(minimum, preferred, maximum) */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* Never smaller than 1.5rem */
  /* Scales with viewport at 5vw */
  /* Never larger than 3rem */
}

.container {
  width: clamp(300px, 90%, 1200px);
  padding: clamp(1rem, 3vw, 3rem);
}
```

### min() and max()

```css
/* max(): Use larger value */
.box {
  width: max(50%, 300px);
  /* At least 300px, or 50% if larger */
}

/* min(): Use smaller value */
.box {
  width: min(90%, 1200px);
  /* At most 1200px, or 90% if smaller */
}
```

## Container Queries (Modern)

**Style elements based on their container's size** (not viewport):

```css
/* Define container */
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
/* Mobile: Stack columns */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Modern: Auto-responsive (no media queries!) */
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
/* Hide on mobile, show on desktop */
.desktop-only {
  display: none;
}

@media (min-width: 768px) {
  .desktop-only {
    display: block;
  }
}

/* Show on mobile, hide on desktop */
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
/* Larger tap targets for mobile */
.button {
  min-height: 44px; /* Apple recommendation */
  min-width: 44px;
  padding: 12px 24px;
}

/* Remove hover effects on touch devices */
@media (hover: hover) {
  .button:hover {
    background: blue;
  }
}

/* Touch-specific interactions */
.card {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation; /* Disable double-tap zoom */
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

<!-- Async load CSS for performance -->
<link rel="stylesheet" href="non-critical.css" media="print" onload="this.media='all'">
```

## Interview Questions

### Q1: What is mobile-first design and why use it?

**Answer:**

**Mobile-first** means designing for mobile devices first, then progressively enhancing for larger screens.

```css
/* Mobile-first (recommended) */
.container {
  width: 100%; /* Base: Mobile */
}

@media (min-width: 768px) {
  .container {
    width: 750px; /* Enhancement: Tablet */
  }
}

/* Desktop-first (not recommended) */
.container {
  width: 1200px; /* Base: Desktop */
}

@media (max-width: 767px) {
  .container {
    width: 100%; /* Override: Mobile */
  }
}
```

**Benefits:**
1. **Performance** - Mobile loads fewer styles
2. **Progressive enhancement** - Start simple, add complexity
3. **Mobile usage** - Mobile traffic exceeds desktop
4. **Easier maintenance** - Add features instead of removing

### Q2: Explain the difference between `em`, `rem`, `%`, and viewport units.

**Answer:**

| Unit | Relative To | Use Case |
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
  width: 50%;       /* 250px (50% of parent 500px) */
  height: 50vh;     /* 50% of viewport height */
}
```

### Q3: What are CSS media queries and how do they work?

**Answer:**

**Media queries** apply CSS rules based on device characteristics:

```css
/* Basic syntax */
@media (condition) {
  /* Styles applied when condition is true */
}

/* Common examples */
@media (min-width: 768px) {
  /* Styles for screens 768px and wider */
}

@media (max-width: 767px) {
  /* Styles for screens 767px and narrower */
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles for tablets only */
}

@media (orientation: landscape) {
  /* Styles for landscape orientation */
}

@media (prefers-color-scheme: dark) {
  /* Styles for dark mode */
}

@media print {
  /* Styles for printing */
}
```

**Best Practice:** Use `min-width` for mobile-first approach.

### Q4: What is the viewport meta tag and why is it important?

**Answer:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Purpose:**
- **`width=device-width`** - Use device's actual width
- **`initial-scale=1.0`** - Initial zoom level (100%)

**Without viewport tag:**
```
Mobile browser assumes desktop width (~980px)
→ Renders desktop version
→ User must zoom and pan
→ Poor mobile experience
```

**With viewport tag:**
```
Mobile browser uses actual device width
→ Renders mobile-optimized version
→ Content fits screen
→ Good mobile experience
```

**Additional options:**
```html
<!-- Prevent zooming (avoid unless necessary) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- Allow limited zooming -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
```

### Q5: How do you make images responsive?

**Answer:**

**Method 1: Basic responsive image**
```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

**Method 2: srcset for resolution switching**
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

**Method 3: Picture element for art direction**
```html
<picture>
  <source media="(min-width: 1024px)" srcset="desktop.jpg">
  <source media="(min-width: 768px)" srcset="tablet.jpg">
  <img src="mobile.jpg" alt="Different images for different screens">
</picture>
```

**Method 4: Background images**
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

### Q6: What is the difference between adaptive and responsive design?

**Answer:**

| Feature | Responsive Design | Adaptive Design |
|---------|-------------------|-----------------|
| **Layout** | Fluid, continuous | Fixed breakpoints |
| **Flexibility** | Adapts to any size | Specific sizes only |
| **Implementation** | CSS media queries | Multiple fixed layouts |
| **Maintenance** | Easier (one codebase) | Harder (multiple layouts) |

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
  width: 320px; /* Fixed for mobile */
}

@media (min-width: 768px) {
  .container {
    width: 768px; /* Fixed for tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    width: 1024px; /* Fixed for desktop */
  }
}
```

**Modern Approach:** Use responsive design (fluid layouts).

### Q7: How do you optimize responsive websites for performance?

**Answer:**

**1. Lazy load images:**
```html
<img src="image.jpg" loading="lazy" alt="Lazy loaded">
```

**2. Responsive images (avoid loading large images on mobile):**
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
/* Use mobile-first to load less CSS on mobile */
.container { width: 100%; }

@media (min-width: 768px) {
  .container { width: 750px; }
}
```

**5. Optimize media queries:**
```css
/* Bad: Too many breakpoints */
@media (min-width: 320px) { }
@media (min-width: 375px) { }
@media (min-width: 425px) { }

/* Good: Strategic breakpoints */
@media (min-width: 768px) { }
@media (min-width: 1024px) { }
```

### Q8: What is the `clamp()` function and how is it useful for responsive design?

**Answer:**

**`clamp(minimum, preferred, maximum)`** - Sets a value that grows/shrinks within limits.

```css
/* Responsive font size */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* Min: 1.5rem (24px) */
  /* Preferred: 5vw (scales with viewport) */
  /* Max: 3rem (48px) */
}

/* Responsive spacing */
.section {
  padding: clamp(1rem, 5vw, 5rem);
}

/* Responsive width */
.container {
  width: clamp(300px, 90%, 1200px);
  /* Never smaller than 300px */
  /* Never larger than 1200px */
  /* Fluid between those values */
}
```

**Benefits:**
- **Single line** instead of multiple media queries
- **Smooth scaling** between min and max
- **Prevents extreme values** on very small/large screens

**Before `clamp()`:**
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

**After `clamp()`:**
```css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

### Q9: How do you handle touch events vs hover events?

**Answer:**

**Problem:** Touch devices don't have hover state.

**Solution:** Use `@media (hover)` to detect hover capability:

```css
/* Base styles (all devices) */
.button {
  padding: 12px 24px;
  background: blue;
  transition: background 0.3s;
}

/* Hover-capable devices (mouse) */
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

/* Alternative: Combine */
.button:hover,
.button:focus,
.button:active {
  background: darkblue;
}
```

**Touch-specific considerations:**
```css
.button {
  /* Larger tap targets */
  min-height: 44px;
  min-width: 44px;

  /* Remove tap highlight */
  -webkit-tap-highlight-color: transparent;

  /* Disable double-tap zoom */
  touch-action: manipulation;
}
```

### Q10: What are container queries and how are they different from media queries?

**Answer:**

**Media Queries:** Style based on **viewport size**
**Container Queries:** Style based on **parent container size**

```css
/* Container queries (modern) */
.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  padding: 1rem;
}

/* Style based on container width, not viewport */
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

**Benefits:**
- **Component-level responsiveness** - Components adapt to their container
- **Reusability** - Same component works in different contexts
- **No viewport knowledge needed** - Component doesn't care about page layout

**Example use case:**
```html
<!-- Same card component, different containers -->
<div class="sidebar"> <!-- Narrow -->
  <div class="card">...</div> <!-- Adapts to narrow space -->
</div>

<div class="main-content"> <!-- Wide -->
  <div class="card">...</div> <!-- Adapts to wide space -->
</div>
```

## Best Practices

1. **Mobile-first approach** - Design for mobile, enhance for desktop
2. **Use relative units** - `rem`, `em`, `%`, `vw/vh` over `px`
3. **Strategic breakpoints** - Based on content, not devices
4. **Test on real devices** - Emulators don't catch everything
5. **Touch-friendly targets** - Minimum 44×44px tap targets
6. **Optimize images** - Use `srcset`, lazy loading, WebP format
7. **Use `clamp()`** - For fluid, bounded responsive values
8. **Minimize breakpoints** - Fewer is better, use fluid layouts
9. **Accessible** - Test with keyboard, screen readers
10. **Performance** - Lazy load, critical CSS, optimize media queries

## Resources

- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Web.dev Responsive Design](https://web.dev/responsive-web-design-basics/)
- [Can I Use](https://caniuse.com/) - Browser support
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [BrowserStack](https://www.browserstack.com/) - Device testing
