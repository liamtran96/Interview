---
sidebar_position: 2
---

# Tailwind CSS v4 New Features

## What's New in Tailwind CSS v4?

Tailwind CSS v4.0 is a complete rewrite optimized for **performance and flexibility**, with a reimagined configuration experience and leveraging the latest web platform features.

:::info Latest Version
Tailwind CSS v4.0 was released in 2025 with breaking changes and major improvements.
:::

## Major New Features

### 1. Lightning Fast Performance

**⚡ Up to 5x faster full builds**
**⚡ Over 100x faster incremental builds (measured in microseconds!)**

```bash
# Build times comparison
v3: 2.5s full build, 150ms incremental
v4: 0.5s full build, 1.5ms incremental
```

**New High-Performance Engine:**
- Built from scratch in modern JavaScript
- Optimized for modern build tools
- Minimal overhead
- Better memory management

### 2. CSS-Based Configuration

**No more JavaScript config!** Configure everything in CSS:

```css
/* app.css */
@import "tailwindcss";

/* Define custom colors */
@theme {
  --color-primary: oklch(0.5 0.2 250);
  --color-secondary: oklch(0.7 0.15 180);

  /* Custom spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;

  /* Custom breakpoints */
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
}
```

**No tailwind.config.js needed!**

### 3. Simplified Setup

**One line of CSS:**

```css
/* Before v4: Multiple directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* v4: Single import */
@import "tailwindcss";
```

**Zero configuration:**
- No need to configure template paths
- Automatic content detection
- Works out of the box

### 4. OKLCH Color System

New color palette based on **OKLCH** (perceptually uniform):

```html
<!-- More vibrant, consistent colors -->
<div class="bg-blue-500">V4 uses OKLCH</div>
<div class="text-red-600">Better color accuracy</div>
```

**Benefits:**
- Better color consistency across hues
- More vibrant colors
- Perceptually uniform lightness
- Better for accessibility

**Custom colors in OKLCH:**

```css
@theme {
  --color-brand: oklch(0.6 0.25 270);
  --color-accent: oklch(0.8 0.15 45);
}
```

```html
<div class="bg-brand text-accent">Modern colors!</div>
```

### 5. Container Queries in Core

Container queries are now **built-in** (no plugin needed):

```html
<div class="@container">
  <div class="@sm:text-lg @md:text-xl @lg:text-2xl">
    Responsive to container size!
  </div>
</div>

<!-- Range queries -->
<div class="@min-[400px]:grid-cols-2 @max-[600px]:gap-4">
  Flexible container-based styling
</div>
```

**New variants:**
- `@sm:` - Container min-width 640px
- `@md:` - Container min-width 768px
- `@lg:` - Container min-width 1024px
- `@xl:` - Container min-width 1280px
- `@min-[size]:` - Custom minimum
- `@max-[size]:` - Custom maximum

### 6. Modern CSS Features

**Cascade Layers:**
```css
@layer utilities {
  .custom-utility {
    /* Your custom utility */
  }
}
```

**Registered Custom Properties:**
```css
@property --spacing-custom {
  syntax: '<length>';
  inherits: true;
  initial-value: 1rem;
}
```

**Color-mix():**
```html
<div class="bg-[color-mix(in_oklch,_theme(colors.blue.500),_white_20%)]">
  Mixed colors
</div>
```

### 7. Improved Arbitrary Values

**New syntax for CSS variables:**

```html
<!-- v3: Square brackets (ambiguous) -->
<div class="w-[--my-width]">Old</div>

<!-- v4: Parentheses (clear) -->
<div class="w-(--my-width)">New & clear!</div>
```

**Underscores for spaces:**

```html
<!-- v4 requires underscores -->
<div class="font-[family-name_fallback]">
  Font with spaces
</div>
```

## Breaking Changes

### 1. Browser Requirements

**Minimum browser versions:**
- Safari 16.4+
- Chrome 111+
- Firefox 128+

Older browsers are no longer supported.

### 2. Configuration Migration

**❌ Old: JavaScript config**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6'
      }
    }
  }
}
```

**✅ New: CSS config**
```css
@theme {
  --color-primary: #3b82f6;
}
```

### 3. Syntax Changes

**CSS Variable Arbitrary Values:**
```html
<!-- v3 -->
<div class="w-[--my-var]">

<!-- v4 -->
<div class="w-(--my-var)">
```

**Spaces in Arbitrary Values:**
```html
<!-- v3: Worked with spaces sometimes -->
<div class="font-[Open Sans]">

<!-- v4: Must use underscores -->
<div class="font-[Open_Sans]">
```

### 4. Removed Features

- Deprecated utilities from v3
- Some compatibility layers
- Legacy configuration options

### 5. Preflight Changes

**Border color opacity:**
```css
/* v3: 25% opacity */
border-color: rgba(0, 0, 0, 0.25);

/* v4: 50% opacity (using currentColor) */
border-color: color-mix(in oklch, currentColor 50%, transparent);
```

**Button cursor:**
```css
/* v3 */
button { cursor: pointer; }

/* v4 (matches browser default) */
button { cursor: default; }
```

## Migration Guide

### Automated Upgrade Tool

```bash
# Requires Node.js 20+
npx @tailwindcss/upgrade@next

# The tool will:
# 1. Update dependencies
# 2. Migrate config to CSS
# 3. Update template syntax
# 4. Fix breaking changes
```

### Manual Migration Steps

**Step 1: Update Dependencies**

```bash
npm install tailwindcss@latest
```

**Step 2: Simplify CSS**

```css
/* Before */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After */
@import "tailwindcss";
```

**Step 3: Migrate Config to CSS**

```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.5 0.2 250);
  --font-display: "Montserrat", sans-serif;
  --spacing-section: 4rem;
}
```

**Step 4: Update Arbitrary Values**

```html
<!-- Find: class="w-[--width]" -->
<!-- Replace: class="w-(--width)" -->

<!-- Find: class="font-[Font Name]" -->
<!-- Replace: class="font-[Font_Name]" -->
```

**Step 5: Test & Update**

```bash
npm run dev
# Check for any styling issues
# Update colors to OKLCH if needed
```

## Interview Questions

### Q1: What's the main difference between Tailwind v3 and v4?

**Answer:**

| Feature | v3 | v4 |
|---------|----|----|
| **Configuration** | JavaScript (JS file) | CSS (@theme) |
| **Setup** | Multiple @tailwind directives | Single @import |
| **Build Speed** | Baseline | 5x faster (full), 100x (incremental) |
| **Colors** | RGB | OKLCH |
| **Container Queries** | Plugin required | Built-in |
| **CSS Variables** | `[--var]` | `(--var)` |

### Q2: Why did Tailwind switch to OKLCH colors?

**Answer:**

**OKLCH benefits:**
1. **Perceptually uniform** - Same lightness value looks equally bright across all hues
2. **More vibrant** - Wider color gamut than RGB
3. **Better for accessibility** - More predictable contrast ratios
4. **Modern standard** - Part of CSS Color Module Level 4

```css
/* OKLCH syntax: oklch(lightness chroma hue) */
--color: oklch(0.6 0.2 250);
/*              ↑    ↑   ↑
          lightness  |  hue (degrees)
                 chroma (saturation)
*/
```

### Q3: How do container queries work in v4?

**Answer:**

Container queries allow responsive design based on **container size** instead of viewport:

```html
<!-- Make element a container -->
<div class="@container">
  <!-- Children respond to container size -->
  <div class="@sm:text-lg @md:grid-cols-2">
    Responsive to parent, not viewport!
  </div>
</div>
```

**Use cases:**
- Reusable components that work in any container size
- Sidebar components that adapt to their space
- Cards that reflow based on available width

## Real-World Example

Complete v4 setup:

```css
/* app.css */
@import "tailwindcss";

@theme {
  /* Brand colors in OKLCH */
  --color-brand-primary: oklch(0.55 0.22 250);
  --color-brand-secondary: oklch(0.75 0.15 180);
  --color-brand-accent: oklch(0.65 0.25 30);

  /* Custom spacing scale */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --spacing-xl: 4rem;

  /* Typography */
  --font-heading: "Inter", system-ui, sans-serif;
  --font-body: "Open Sans", system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;

  /* Custom breakpoints */
  --breakpoint-tablet: 768px;
  --breakpoint-laptop: 1024px;
  --breakpoint-desktop: 1440px;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

```html
<!-- Using custom theme -->
<div class="@container bg-brand-primary">
  <h1 class="font-heading text-3xl @lg:text-5xl">
    Heading adapts to container
  </h1>
  <div class="@sm:grid-cols-2 @lg:grid-cols-3 gap-md">
    <!-- Cards -->
  </div>
</div>
```

## Best Practices for v4

1. **Use CSS configuration** - Leverage native CSS features
2. **Embrace OKLCH** - Better color consistency
3. **Use container queries** - More flexible components
4. **Simplify setup** - Just @import "tailwindcss"
5. **Update syntax** - Use () for CSS variables, _ for spaces
6. **Test in modern browsers** - Ensure compatibility
7. **Use upgrade tool** - Automate migration

## Performance Benefits

```
Build Performance:

Full Build:
v3: 2.5s
v4: 0.5s (5x faster)

Incremental Build:
v3: 150ms
v4: 1.5ms (100x faster!)

Memory Usage:
v3: 200MB
v4: 120MB (40% reduction)
```

## Key Takeaways

- Tailwind v4 is 5x faster with 100x faster incremental builds
- CSS-based configuration replaces JavaScript config
- OKLCH color system for better colors
- Container queries built-in (no plugin)
- Single @import instead of multiple @tailwind directives
- Modern CSS features (cascade layers, @property)
- Breaking changes require migration but upgrade tool helps
- Minimum browser: Safari 16.4+, Chrome 111+, Firefox 128+

## Resources

- [Tailwind CSS v4.0 Release](https://tailwindcss.com/blog/tailwindcss-v4)
- [Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)
- [OKLCH Color Picker](https://oklch.com/)
- [Container Queries Guide](https://tailwindcss.com/docs/container-queries)
