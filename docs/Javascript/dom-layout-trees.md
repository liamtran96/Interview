---
sidebar_position: 21
---

# DOM & Layout Trees

## The Document Object Model (DOM)

The DOM is a tree-like representation of HTML/XML documents that JavaScript can manipulate.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>World</p>
  </body>
</html>
```

**DOM Tree:**
```
Document
└── html
    ├── head
    │   └── title
    │       └── "My Page"
    └── body
        ├── h1
        │   └── "Hello"
        └── p
            └── "World"
```

## DOM Node Types

```javascript
// Element nodes
const div = document.getElementById('myDiv');
console.log(div.nodeType); // 1 (ELEMENT_NODE)

// Text nodes
const text = div.firstChild;
console.log(text.nodeType); // 3 (TEXT_NODE)

// Comment nodes
<!-- This is a comment -->
console.log(comment.nodeType); // 8 (COMMENT_NODE)

// Document node
console.log(document.nodeType); // 9 (DOCUMENT_NODE)
```

**Common Node Types:**
- `1` - ELEMENT_NODE (`<div>`, `<p>`, etc.)
- `3` - TEXT_NODE (text content)
- `8` - COMMENT_NODE (`<!-- -->`)
- `9` - DOCUMENT_NODE (`document`)

## Selecting DOM Elements

### getElementById

```javascript
const element = document.getElementById('myId');
```

### querySelector / querySelectorAll

```javascript
// First match
const first = document.querySelector('.myClass');

// All matches
const all = document.querySelectorAll('.myClass');
all.forEach(el => console.log(el));
```

### getElementsByClassName

```javascript
// Returns live HTMLCollection
const elements = document.getElementsByClassName('myClass');
console.log(elements.length); // 3

// Add new element with class
document.body.innerHTML += '<div class="myClass"></div>';
console.log(elements.length); // 4 (automatically updated!)
```

### getElementsByTagName

```javascript
const divs = document.getElementsByTagName('div');
```

## Modifying the DOM

### Creating Elements

```javascript
// Create element
const div = document.createElement('div');

// Set attributes
div.id = 'myDiv';
div.className = 'container';
div.setAttribute('data-value', '123');

// Set content
div.textContent = 'Hello World';
div.innerHTML = '<strong>Hello</strong> World';

// Append to DOM
document.body.appendChild(div);
```

### Removing Elements

```javascript
// Method 1: remove()
const element = document.getElementById('myDiv');
element.remove();

// Method 2: removeChild()
const parent = document.getElementById('parent');
const child = document.getElementById('child');
parent.removeChild(child);
```

### Replacing Elements

```javascript
const oldElement = document.getElementById('old');
const newElement = document.createElement('div');
newElement.textContent = 'New content';

oldElement.replaceWith(newElement);
```

### Cloning Elements

```javascript
const original = document.getElementById('myDiv');

// Shallow clone (no children)
const shallowClone = original.cloneNode(false);

// Deep clone (with children)
const deepClone = original.cloneNode(true);
```

## Traversing the DOM

### Parent/Child Relationships

```javascript
const element = document.getElementById('myDiv');

// Parent
const parent = element.parentNode;
const parentElement = element.parentElement;

// Children
const children = element.children;        // HTMLCollection (elements only)
const childNodes = element.childNodes;    // NodeList (all nodes)

const firstChild = element.firstChild;           // First node
const firstElementChild = element.firstElementChild; // First element

const lastChild = element.lastChild;             // Last node
const lastElementChild = element.lastElementChild;   // Last element
```

### Siblings

```javascript
const element = document.getElementById('myDiv');

// Next sibling
const nextSibling = element.nextSibling;             // Next node
const nextElementSibling = element.nextElementSibling; // Next element

// Previous sibling
const prevSibling = element.previousSibling;             // Previous node
const prevElementSibling = element.previousElementSibling; // Previous element
```

## The Render Pipeline

When browser loads a page, it follows this process:

```
HTML → DOM Tree
CSS  → CSSOM Tree
         ↓
   Render Tree (DOM + CSSOM)
         ↓
     Layout (calculate positions/sizes)
         ↓
      Paint (draw pixels)
         ↓
    Composite (layer stacking)
```

### 1. DOM Tree

Browser parses HTML into DOM tree.

```html
<body>
  <div class="container">
    <p>Hello</p>
  </div>
</body>
```

```
body
└── div.container
    └── p
        └── "Hello"
```

### 2. CSSOM Tree

Browser parses CSS into CSSOM (CSS Object Model).

```css
body { font-size: 16px; }
.container { padding: 20px; }
p { color: blue; }
```

```
body (font-size: 16px)
└── div.container (padding: 20px)
    └── p (color: blue)
```

### 3. Render Tree

Combines DOM + CSSOM, excludes invisible elements (`display: none`).

```
body
└── div.container
    └── p (color: blue, font-size: 16px)
```

### 4. Layout (Reflow)

Calculate position and size of each element.

**Triggers reflow:**
- Adding/removing elements
- Changing element dimensions
- Changing content
- Window resize

```javascript
// ❌ Bad - causes 3 reflows
element.style.width = '100px';  // Reflow
element.style.height = '100px'; // Reflow
element.style.margin = '10px';  // Reflow

// ✅ Good - causes 1 reflow
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// ✅ Better - batch updates
element.classList.add('new-styles');
```

### 5. Paint

Draw pixels to screen.

**Triggers repaint:**
- Color changes
- Background changes
- Visibility changes

```javascript
// Only repaint (no reflow)
element.style.color = 'red';
element.style.backgroundColor = 'blue';
```

### 6. Composite

Combine layers and draw to screen.

## Performance Optimization

### 1. Minimize Reflows

```javascript
// ❌ Bad - read and write alternately
const height1 = element1.offsetHeight; // Read (reflow)
element1.style.height = height1 + 10 + 'px'; // Write

const height2 = element2.offsetHeight; // Read (reflow)
element2.style.height = height2 + 10 + 'px'; // Write

// ✅ Good - batch reads, then writes
const height1 = element1.offsetHeight; // Read
const height2 = element2.offsetHeight; // Read

element1.style.height = height1 + 10 + 'px'; // Write
element2.style.height = height2 + 10 + 'px'; // Write
```

### 2. Use DocumentFragment

```javascript
// ❌ Bad - 1000 reflows
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div); // Reflow each time!
}

// ✅ Good - 1 reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // Single reflow
```

### 3. Use `display: none` for Multiple Changes

```javascript
// ❌ Bad - multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.padding = '10px';

// ✅ Good - hide, change, show
element.style.display = 'none'; // Remove from layout
element.style.width = '100px';
element.style.height = '100px';
element.style.padding = '10px';
element.style.display = 'block'; // Single reflow
```

### 4. Clone and Replace

```javascript
const element = document.getElementById('myDiv');
const clone = element.cloneNode(true);

// Make changes to clone (off DOM)
clone.style.width = '100px';
clone.style.height = '100px';

// Replace in one operation
element.replaceWith(clone);
```

### 5. Use CSS Classes

```javascript
// ❌ Bad - multiple style changes
element.style.width = '100px';
element.style.height = '100px';
element.style.backgroundColor = 'blue';

// ✅ Good - single class change
element.classList.add('styled');
```

```css
.styled {
  width: 100px;
  height: 100px;
  background-color: blue;
}
```

### 6. Debounce Expensive Operations

```javascript
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Debounce window resize
window.addEventListener('resize', debounce(() => {
  // Expensive layout calculations
  console.log('Resized!');
}, 200));
```

## Virtual DOM (React/Vue)

Virtual DOM minimizes real DOM manipulations.

```javascript
// Real DOM (slow)
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  document.body.appendChild(div); // 1000 DOM operations
}

// Virtual DOM (fast)
// 1. Create virtual representation
// 2. Diff old vs new virtual DOM
// 3. Apply minimal changes to real DOM
```

## Common Interview Questions

### Q1: What is the DOM?

**Answer:**

The DOM (Document Object Model) is a programming interface for HTML/XML documents. It represents the page as a tree of nodes that JavaScript can manipulate.

**Key points:**
- Tree structure of nodes
- JavaScript can read/modify it
- Changes to DOM trigger browser re-rendering
- Platform and language-independent API

### Q2: What's the difference between reflow and repaint?

**Answer:**

**Reflow (Layout):**
- Recalculates element positions and sizes
- Expensive operation
- Triggered by: size changes, adding/removing elements, content changes

**Repaint:**
- Redraws pixels to screen
- Less expensive than reflow
- Triggered by: color changes, visibility changes

**Examples:**
```javascript
// Triggers reflow + repaint
element.style.width = '100px';

// Triggers repaint only
element.style.color = 'red';

// Triggers neither (composite only)
element.style.transform = 'translateX(10px)';
```

### Q3: How do you optimize DOM manipulation?

**Answer:**

1. **Batch DOM changes**: Use DocumentFragment or `display: none`
2. **Minimize reflows**: Batch reads before writes
3. **Use CSS classes**: Instead of inline styles
4. **Clone and replace**: For many changes to one element
5. **Debounce events**: For scroll/resize handlers
6. **Use Virtual DOM**: React, Vue for complex UIs

**Example:**
```javascript
// ❌ Bad
for (let i = 0; i < 100; i++) {
  document.body.appendChild(div);
}

// ✅ Good
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  fragment.appendChild(div);
}
document.body.appendChild(fragment);
```

### Q4: What triggers a reflow?

**Answer:**

**Geometric changes:**
- Changing width, height, padding, margin, border
- Adding/removing elements
- Changing content (text)
- Window resize

**Reading layout properties:**
```javascript
element.offsetWidth
element.offsetHeight
element.clientWidth
element.getComputedStyle()
element.getBoundingClientRect()
```

**Best Practice:** Batch reads before writes.

### Q5: What's the difference between NodeList and HTMLCollection?

**Answer:**

| Feature | NodeList | HTMLCollection |
|---------|----------|----------------|
| **Type** | All nodes | Element nodes only |
| **Live** | Sometimes* | Always |
| **Methods** | forEach() | No forEach() |
| **Returned by** | querySelectorAll() | getElementsByClassName() |

*`querySelectorAll()` returns static NodeList, but `childNodes` returns live NodeList.

```javascript
// Static NodeList
const static = document.querySelectorAll('div');
document.body.innerHTML += '<div></div>';
console.log(static.length); // Unchanged

// Live HTMLCollection
const live = document.getElementsByTagName('div');
document.body.innerHTML += '<div></div>';
console.log(live.length); // Increased
```

## Key Takeaways

- **DOM** - Tree representation of HTML/XML
- **Node types** - Element, text, comment, document
- **Selection** - getElementById, querySelector, etc.
- **Render pipeline** - DOM → CSSOM → Render Tree → Layout → Paint → Composite
- **Reflow** - Expensive layout recalculation
- **Repaint** - Less expensive pixel redraw
- **Optimization** - Batch changes, minimize reflows, use DocumentFragment
- **Virtual DOM** - Minimizes real DOM operations

## Resources

- [MDN DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [How Browsers Work](https://web.dev/howbrowserswork/)
- [Rendering Performance](https://web.dev/rendering-performance/)
