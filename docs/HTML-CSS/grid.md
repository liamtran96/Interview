---
sidebar_position: 2
---

# CSS Grid

## What is CSS Grid?

**CSS Grid** is a powerful **two-dimensional** layout system for creating complex layouts with rows and columns simultaneously.

## Basic Setup

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
  grid-template-columns: 200px 200px 200px; /* 3 columns */
  grid-template-rows: 100px 100px;          /* 2 rows */
  gap: 10px;
}
```

## Grid Container Properties

### grid-template-columns / grid-template-rows

Define column and row sizes:

```css
.grid {
  /* Fixed sizes */
  grid-template-columns: 200px 300px 200px;

  /* Fractions (fr) - flexible units */
  grid-template-columns: 1fr 2fr 1fr;

  /* Mix units */
  grid-template-columns: 200px 1fr 200px;

  /* repeat() function */
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive */
}
```

### gap

Space between grid items:

```css
.grid {
  gap: 20px;             /* Both row and column */
  row-gap: 10px;         /* Row gap only */
  column-gap: 20px;      /* Column gap only */
}
```

### grid-template-areas

Named grid areas:

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

Align items inside their grid cells:

```css
.grid {
  justify-items: start | end | center | stretch;  /* Horizontal */
  align-items: start | end | center | stretch;    /* Vertical */
}
```

### justify-content / align-content

Align entire grid inside container:

```css
.grid {
  justify-content: start | end | center | space-between | space-around;
  align-content: start | end | center | space-between | space-around;
}
```

## Grid Item Properties

### grid-column / grid-row

Position items using line numbers:

```css
.item {
  grid-column: 1 / 3;  /* Start at line 1, end at line 3 */
  grid-row: 1 / 2;
}

/* Shorthand */
.item {
  grid-column: 1 / span 2;  /* Start at 1, span 2 columns */
  grid-row: 1 / span 2;     /* Start at 1, span 2 rows */
}
```

### grid-area

Shorthand for grid-row-start / grid-column-start / grid-row-end / grid-column-end:

```css
.item {
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}

/* Or use named area */
.item {
  grid-area: header;
}
```

## Common Interview Questions

### Q1: What's the difference between Grid and Flexbox?

**Answer:**

| Grid | Flexbox |
|------|---------|
| **2D** (rows AND columns) | **1D** (row OR column) |
| Layout-first | Content-first |
| Better for page layouts | Better for components |
| Can overlap items | Items don't overlap |

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

### Q2: What does fr unit mean?

**Answer:**

`fr` (fraction) represents a **fraction of available space**.

```css
.grid {
  grid-template-columns: 1fr 2fr 1fr;
  /* First column: 1/4 of space */
  /* Second column: 2/4 of space */
  /* Third column: 1/4 of space */
}
```

### Q3: How do you create a responsive grid?

**Answer:**

Use `repeat()` with `auto-fit` or `auto-fill` and `minmax()`:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
/* Automatically adjusts columns based on container width */
```

## Real-World Examples

### Example 1: Basic Page Layout

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

### Example 2: Responsive Card Grid

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

### Example 3: Photo Gallery

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

/* Featured image spans 2 columns and 2 rows */
.featured {
  grid-column: span 2;
  grid-row: span 2;
}
```

### Example 4: Dashboard Layout

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

## Advanced Techniques

### Auto-Fit vs Auto-Fill

```css
/* auto-fit: Collapses empty tracks */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* auto-fill: Keeps empty tracks */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

### Implicit Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  /* Auto-create rows as needed */
  grid-auto-rows: 200px;

  /* Or auto-create columns */
  grid-auto-columns: 200px;
  grid-auto-flow: column;
}
```

### Overlapping Items

```css
.item1 {
  grid-column: 1 / 3;
  grid-row: 1 / 3;
}

.item2 {
  grid-column: 2 / 4;
  grid-row: 2 / 4;
  /* Items can overlap! */
}
```

## Common Patterns

### Centered Layout with Max Width

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

### 12-Column System

```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
}

.col-6 { grid-column: span 6; }  /* Half width */
.col-4 { grid-column: span 4; }  /* Third width */
.col-3 { grid-column: span 3; }  /* Quarter width */
```

## Best Practices

1. **Use Grid for layouts, Flexbox for components**
2. **Use fr units** for flexible sizing
3. **Use minmax()** for responsive grids
4. **Named areas** for complex layouts
5. **Mobile-first** - Simple grid on mobile, complex on desktop

```css
/* Mobile-first approach */
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

## Key Takeaways

- Grid is for two-dimensional layouts
- `fr` unit for flexible sizing
- `repeat(auto-fit, minmax())` for responsive grids
- `grid-template-areas` for named layouts
- Can overlap items (unlike Flexbox)
- Use for page layouts, dashboards, galleries
- Better browser support than you think (all modern browsers)
