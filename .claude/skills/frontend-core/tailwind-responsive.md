---
name: tailwind-responsive
category: frontend-core
description: Build mobile-first responsive designs with Tailwind breakpoints
related_skills:
  - tailwind-setup
  - tailwind-darkmode
---

# Tailwind Responsive Design

## When to Use

Use this skill when building layouts that need to adapt to different screen sizes (mobile, tablet, desktop).

## Quick Start

```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on tablet, third on desktop */}
</div>
```

## Core Concepts

- **Mobile-First**: Unprefixed utilities apply to all screens, breakpoints apply minimum widths
- **Breakpoint Prefixes**: `sm:`, `md:`, `lg:`, `xl:`, `2xl:` for different screen sizes
- **Stacking**: Classes stack - smaller breakpoints apply unless overridden

## Default Breakpoints

| Prefix | Min Width | Typical Device |
|--------|-----------|----------------|
| (none) | 0px       | Mobile (default) |
| `sm:`  | 640px     | Large mobile |
| `md:`  | 768px     | Tablet |
| `lg:`  | 1024px    | Desktop |
| `xl:`  | 1280px    | Large desktop |
| `2xl:` | 1536px    | Extra large |

## Step-by-Step Guide

### 1. Mobile-First Approach

Start with mobile styles (no prefix), add larger screens:

```tsx
<div className="
  text-sm           // Mobile: small text
  md:text-base      // Tablet+: normal text
  lg:text-lg        // Desktop+: large text
">
  Responsive text
</div>
```

### 2. Responsive Layout

```tsx
<div className="
  grid
  grid-cols-1       // Mobile: 1 column
  md:grid-cols-2    // Tablet: 2 columns
  lg:grid-cols-3    // Desktop: 3 columns
  gap-4
">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### 3. Show/Hide Elements

```tsx
<nav>
  {/* Mobile menu button - hide on desktop */}
  <button className="md:hidden">
    Menu
  </button>

  {/* Desktop nav - hide on mobile */}
  <ul className="hidden md:flex gap-4">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</nav>
```

### 4. Responsive Spacing

```tsx
<div className="
  p-4               // Mobile: 1rem padding
  md:p-6            // Tablet: 1.5rem
  lg:p-8            // Desktop: 2rem
">
  Content with responsive padding
</div>
```

## Common Patterns

### Pattern 1: Card Grid

```tsx
<div className="
  grid
  grid-cols-1       // Mobile: stack
  sm:grid-cols-2    // Small: 2 columns
  lg:grid-cols-3    // Large: 3 columns
  xl:grid-cols-4    // XL: 4 columns
  gap-4 md:gap-6 lg:gap-8
">
  {cards.map(card => (
    <Card key={card.id} {...card} />
  ))}
</div>
```

### Pattern 2: Hero Section

```tsx
<section className="
  min-h-screen
  px-4 md:px-8 lg:px-16
  py-8 md:py-12 lg:py-20
">
  <h1 className="
    text-3xl md:text-5xl lg:text-6xl
    font-bold
    mb-4 md:mb-6
  ">
    Hero Title
  </h1>
  <p className="
    text-base md:text-lg
    max-w-xl
  ">
    Description text
  </p>
</section>
```

### Pattern 3: Sidebar Layout

```tsx
<div className="
  flex
  flex-col md:flex-row
  gap-4
">
  {/* Sidebar - full width mobile, 1/4 desktop */}
  <aside className="
    w-full md:w-1/4
    bg-gray-100
    p-4
  ">
    Sidebar
  </aside>

  {/* Main content */}
  <main className="
    flex-1
    p-4
  ">
    Content
  </main>
</div>
```

### Pattern 4: Responsive Container

```tsx
<div className="
  container
  mx-auto
  px-4 sm:px-6 lg:px-8
  max-w-screen-xl
">
  {/* Centered container with responsive padding */}
</div>
```

## Gotchas & Tips

**Common Mistakes:**
- ❌ Using max-width approach instead of mobile-first
  ```tsx
  // Bad: Desktop-first
  <div className="w-1/3 md:w-full">

  // Good: Mobile-first
  <div className="w-full md:w-1/3">
  ```
- ❌ Forgetting breakpoints stack (later ones override)
- ❌ Not testing on real devices (browser responsive mode differs)

**Best Practices:**
- ✅ Design mobile layout first, then add larger screens
- ✅ Use consistent breakpoint progression: `sm:` → `md:` → `lg:`
- ✅ Test at each breakpoint (especially edge cases: 767px, 1023px)
- ✅ Use responsive utilities for images: `object-cover`, `aspect-*`

**Custom Breakpoints:**
```js
// tailwind.config.js
export default {
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Custom
      'tablet': '900px',
      '3xl': '1920px',
    },
  },
}
```

## Testing Checklist

Test your responsive design at these widths:
- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 12/13)
- [ ] 768px (iPad portrait)
- [ ] 1024px (iPad landscape)
- [ ] 1280px (laptop)
- [ ] 1920px (desktop)

## Related Skills

- Start with `tailwind-setup` if Tailwind not configured
- Combine with `tailwind-darkmode` for responsive dark themes
- Use `tailwind-components` for responsive component patterns

💡 **Tip**: Use browser DevTools responsive mode (Ctrl+Shift+M) to test breakpoints quickly
