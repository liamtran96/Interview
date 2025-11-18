---
sidebar_position: 1
---

# Tailwind CSS Fundamentals

## What is Tailwind CSS?

Tailwind CSS is a **utility-first CSS framework** that provides low-level utility classes to build custom designs directly in your HTML.

## Utility-First Approach

Instead of writing custom CSS, you compose designs using utility classes:

```html
<!-- Traditional CSS -->
<style>
  .button {
    background-color: blue;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
</style>
<button class="button">Click me</button>

<!-- Tailwind CSS -->
<button class="bg-blue-500 text-white px-4 py-2 rounded">
  Click me
</button>
```

## Common Interview Questions

### Q1: What is Tailwind CSS and why use it?

**Answer:**

Tailwind is a utility-first CSS framework that provides pre-built classes for styling.

**Advantages:**
- **Faster development** - No need to write custom CSS
- **Consistent design** - Pre-defined spacing, colors, etc.
- **Smaller CSS bundle** - Only includes used classes (with PurgeCSS)
- **No naming issues** - No need to think of class names
- **Responsive by default** - Built-in breakpoint modifiers

**Disadvantages:**
- **HTML looks cluttered** - Many classes per element
- **Learning curve** - Need to memorize class names
- **Not semantic** - Classes describe style, not content

### Q2: What's the difference between Tailwind and Bootstrap?

**Answer:**

| Tailwind CSS | Bootstrap |
|--------------|-----------|
| **Utility-first** | **Component-first** |
| No pre-designed components | Pre-designed components |
| Highly customizable | Opinionated design |
| Smaller file size (with purging) | Larger file size |
| More control | Faster to start |

### Q3: How does Tailwind handle responsive design?

**Answer:**

Tailwind uses **mobile-first** breakpoint prefixes:

```html
<!-- Width changes at different breakpoints -->
<div class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
  Responsive width
</div>
```

**Breakpoints:**
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up

## Core Concepts

### Spacing Scale

Tailwind uses a consistent spacing scale (4px base):

```html
<!-- Padding -->
<div class="p-4">padding: 1rem (16px)</div>
<div class="px-4">padding-left & right: 1rem</div>
<div class="py-2">padding-top & bottom: 0.5rem</div>

<!-- Margin -->
<div class="m-4">margin: 1rem</div>
<div class="mt-8">margin-top: 2rem (32px)</div>
<div class="-mt-4">margin-top: -1rem (negative)</div>
```

### Colors

```html
<!-- Background -->
<div class="bg-blue-500">Blue background</div>
<div class="bg-red-700">Darker red</div>

<!-- Text -->
<p class="text-gray-800">Gray text</p>

<!-- Border -->
<div class="border-2 border-blue-500">Blue border</div>
```

Color scale: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900

### Typography

```html
<!-- Font size -->
<p class="text-sm">Small text</p>
<p class="text-base">Base text (16px)</p>
<p class="text-xl">Extra large</p>
<p class="text-3xl">3XL (30px)</p>

<!-- Font weight -->
<p class="font-light">Light</p>
<p class="font-normal">Normal</p>
<p class="font-bold">Bold</p>

<!-- Text color -->
<p class="text-blue-600">Blue text</p>

<!-- Text alignment -->
<p class="text-left">Left</p>
<p class="text-center">Center</p>
<p class="text-right">Right</p>
```

### Flexbox

```html
<div class="flex justify-center items-center gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Flex direction -->
<div class="flex flex-col">Column</div>
<div class="flex flex-row">Row</div>

<!-- Justify content -->
<div class="flex justify-start">flex-start</div>
<div class="flex justify-center">center</div>
<div class="flex justify-between">space-between</div>

<!-- Align items -->
<div class="flex items-start">flex-start</div>
<div class="flex items-center">center</div>
<div class="flex items-stretch">stretch</div>

<!-- Gap -->
<div class="flex gap-4">Gap 1rem</div>
```

### Grid

```html
<!-- Basic grid -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
</div>

<!-- Span columns -->
<div class="col-span-2">Spans 2 columns</div>
```

## Responsive Design

```html
<!-- Mobile-first approach -->
<div class="
  text-sm          <!-- Default (mobile) -->
  sm:text-base     <!-- Small screens and up -->
  md:text-lg       <!-- Medium screens and up -->
  lg:text-xl       <!-- Large screens and up -->
">
  Responsive text
</div>

<!-- Hide/show at breakpoints -->
<div class="block md:hidden">Mobile only</div>
<div class="hidden md:block">Desktop only</div>
```

## State Variants

### Hover

```html
<button class="bg-blue-500 hover:bg-blue-700">
  Hover me
</button>
```

### Focus

```html
<input class="border focus:border-blue-500 focus:ring-2" />
```

### Active

```html
<button class="active:scale-95">
  Click me
</button>
```

### Disabled

```html
<button class="disabled:opacity-50 disabled:cursor-not-allowed">
  Disabled
</button>
```

### Dark Mode

```html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  Supports dark mode
</div>
```

## Common Patterns

### Button

```html
<button class="
  bg-blue-500 hover:bg-blue-700
  text-white font-bold
  py-2 px-4 rounded
  transition duration-200
">
  Click me
</button>
```

### Card

```html
<div class="
  bg-white rounded-lg shadow-lg
  p-6 max-w-sm
  hover:shadow-xl transition
">
  <h2 class="text-xl font-bold mb-2">Card Title</h2>
  <p class="text-gray-700">Card content</p>
</div>
```

### Navigation

```html
<nav class="bg-gray-800 text-white">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center h-16">
      <div class="text-xl font-bold">Logo</div>
      <ul class="flex gap-6">
        <li><a href="#" class="hover:text-blue-400">Home</a></li>
        <li><a href="#" class="hover:text-blue-400">About</a></li>
      </ul>
    </div>
  </div>
</nav>
```

## Best Practices

1. **Use @apply sparingly** - Only for repeated patterns
2. **Customize config** - Extend theme for brand colors
3. **Use components** - Extract repeated HTML into components
4. **Enable PurgeCSS** - Remove unused styles in production
5. **Use JIT mode** - Faster builds, all variants available

## Key Takeaways

- Tailwind is utility-first CSS framework
- Mobile-first responsive design (sm:, md:, lg:, xl:, 2xl:)
- State variants (hover:, focus:, active:, dark:)
- Consistent spacing scale (4px base)
- Customizable via config file
- Smaller bundle with PurgeCSS
- Great for rapid prototyping
