---
sidebar_position: 1
---

# CSS Flexbox

## What is Flexbox?

**Flexbox** (Flexible Box Layout) is a CSS layout model for arranging items in a **one-dimensional** space (either row or column). It makes it easy to align, distribute, and size elements.

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
  display: flex; /* Enable flexbox */
}
```

## Flex Container Properties

### display

```css
.container {
  display: flex;        /* Block-level flex container */
  display: inline-flex; /* Inline flex container */
}
```

### flex-direction

Controls the main axis direction:

```css
.container {
  flex-direction: row;            /* → (default) */
  flex-direction: row-reverse;    /* ← */
  flex-direction: column;         /* ↓ */
  flex-direction: column-reverse; /* ↑ */
}
```

### justify-content

Aligns items along the **main axis**:

```css
.container {
  justify-content: flex-start;    /* ←—— (default) */
  justify-content: flex-end;      /* ——→ */
  justify-content: center;        /* -—- */
  justify-content: space-between; /* |-  -| */
  justify-content: space-around;  /* -| |- */
  justify-content: space-evenly;  /* |- -|- -| */
}
```

### align-items

Aligns items along the **cross axis**:

```css
.container {
  align-items: stretch;     /* ||| (default) */
  align-items: flex-start;  /* Top */
  align-items: flex-end;    /* Bottom */
  align-items: center;      /* Middle */
  align-items: baseline;    /* Text baseline */
}
```

### flex-wrap

Controls wrapping:

```css
.container {
  flex-wrap: nowrap;       /* Single line (default) */
  flex-wrap: wrap;         /* Multi-line, top to bottom */
  flex-wrap: wrap-reverse; /* Multi-line, bottom to top */
}
```

### align-content

Aligns **multiple lines** (only works with `flex-wrap`):

```css
.container {
  flex-wrap: wrap;
  align-content: flex-start;
  align-content: flex-end;
  align-content: center;
  align-content: space-between;
  align-content: space-around;
  align-content: stretch; /* (default) */
}
```

### gap

Space between items:

```css
.container {
  gap: 20px;           /* Both row and column */
  row-gap: 10px;       /* Row gap only */
  column-gap: 20px;    /* Column gap only */
}
```

## Flex Item Properties

### flex-grow

How much item grows relative to others:

```css
.item {
  flex-grow: 0; /* Don't grow (default) */
  flex-grow: 1; /* Grow equally */
  flex-grow: 2; /* Grow twice as much */
}
```

### flex-shrink

How much item shrinks:

```css
.item {
  flex-shrink: 1; /* Shrink if needed (default) */
  flex-shrink: 0; /* Don't shrink */
}
```

### flex-basis

Initial size before growing/shrinking:

```css
.item {
  flex-basis: auto;  /* Use content size (default) */
  flex-basis: 200px; /* Fixed size */
  flex-basis: 50%;   /* Percentage */
}
```

### flex (Shorthand)

```css
.item {
  flex: 1;              /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  flex: 0 0 200px;      /* No grow, no shrink, 200px basis */
  flex: 1 1 auto;       /* Grow, shrink, auto basis */
}
```

### align-self

Override `align-items` for individual item:

```css
.item {
  align-self: auto;       /* Inherit from container (default) */
  align-self: flex-start;
  align-self: flex-end;
  align-self: center;
  align-self: baseline;
  align-self: stretch;
}
```

### order

Change visual order:

```css
.item1 { order: 2; }
.item2 { order: 1; } /* Appears first */
.item3 { order: 3; }
```

## Common Interview Questions

### Q1: What's the difference between justify-content and align-items?

**Answer:**

- **`justify-content`** - Aligns along **main axis** (horizontal in row, vertical in column)
- **`align-items`** - Aligns along **cross axis** (vertical in row, horizontal in column)

```css
.container {
  display: flex;
  flex-direction: row; /* Main axis: horizontal → */

  justify-content: center; /* Center horizontally */
  align-items: center;     /* Center vertically */
}
```

### Q2: How do you center a div with Flexbox?

**Answer:**

```css
.container {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center;     /* Vertical */
  height: 100vh;
}
```

### Q3: What does flex: 1 mean?

**Answer:**

`flex: 1` is shorthand for:
- `flex-grow: 1` - Item can grow
- `flex-shrink: 1` - Item can shrink
- `flex-basis: 0%` - Start from 0, then grow

It makes items **grow equally** to fill available space.

## Real-World Examples

### Example 1: Navigation Bar

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

### Example 2: Card Layout

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
  flex: 1 1 300px; /* Grow, shrink, min 300px */
  padding: 2rem;
  background: #f0f0f0;
}
```

### Example 3: Holy Grail Layout

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
  flex: 1; /* Takes remaining space */
}

aside {
  flex: 0 0 200px; /* Fixed width sidebar */
}

main {
  flex: 1; /* Fills remaining space */
}
```

## Flexbox vs Grid

| Flexbox | Grid |
|---------|------|
| **One-dimensional** (row OR column) | **Two-dimensional** (rows AND columns) |
| Content-based sizing | Grid-based sizing |
| Better for components | Better for page layouts |
| Flexible item sizes | Fixed grid tracks |

```css
/* Use Flexbox for: */
.navbar { display: flex; }
.buttons { display: flex; }

/* Use Grid for: */
.page-layout { display: grid; }
.photo-gallery { display: grid; }
```

## Common Patterns

### Equal Width Columns

```css
.item {
  flex: 1; /* All items equal width */
}
```

### Fixed Sidebar + Flexible Content

```css
.sidebar {
  flex: 0 0 250px; /* Fixed 250px */
}

.content {
  flex: 1; /* Takes remaining space */
}
```

### Center Everything

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
  flex: 1 1 200px; /* Min 200px, wraps if needed */
}
```

## Best Practices

1. **Use gap instead of margin** - Cleaner and more predictable
2. **Prefer flex shorthand** - `flex: 1` instead of individual properties
3. **Mobile-first** - Start with column, use media queries for row
4. **Don't use for page layout** - Use Grid for 2D layouts
5. **Test wrapping behavior** - Make sure content wraps properly

## Browser Support

Flexbox is supported in all modern browsers. For older browsers:

```css
.container {
  display: -webkit-box;   /* Old Safari */
  display: -ms-flexbox;   /* IE 10 */
  display: flex;          /* Modern */
}
```

## Key Takeaways

- Flexbox is for one-dimensional layouts
- Container has `display: flex`
- Main axis: `justify-content`
- Cross axis: `align-items`
- `flex: 1` makes items grow equally
- Use `gap` for spacing
- `flex-wrap: wrap` for responsive layouts
- Great for navigation, cards, buttons
