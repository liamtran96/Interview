---
sidebar_position: 20
---

# Virtual DOM & Reconciliation

## What is the Virtual DOM?

The **Virtual DOM (VDOM)** is a lightweight JavaScript representation of the actual DOM. React uses it to optimize UI updates by minimizing direct DOM manipulations.

## Why Virtual DOM?

**Problem with Direct DOM Manipulation:**
- DOM operations are **slow** (browser reflows/repaints)
- Updating the entire DOM is **expensive**
- Hard to track what changed

**Virtual DOM Solution:**
1. Create virtual representation of UI in memory
2. Compare (diff) changes
3. Update **only what changed** in real DOM

## How it Works

```jsx
// 1. Create Virtual DOM
const vdom = {
  type: 'div',
  props: {
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Hello' } },
      { type: 'p', props: { children: 'World' } }
    ]
  }
};

// 2. React renders to real DOM

// 3. State changes, create new Virtual DOM

// 4. React diffs old vs new Virtual DOM

// 5. Update only changed parts in real DOM
```

## Virtual DOM Process

```
User Action
    ↓
State Update
    ↓
Create New Virtual DOM
    ↓
Diff (Reconciliation)
    ↓
Calculate Minimal Changes
    ↓
Update Real DOM
    ↓
Browser Renders
```

## Reconciliation Algorithm

**Reconciliation** is React's diffing algorithm that determines what changed between renders.

### Key Principles

1. **Different element types** → Replace entire subtree
2. **Same element type** → Update props
3. **Keys in lists** → Identify which items changed

### Example 1: Different Element Types

```jsx
// Before
<div>
  <Counter />
</div>

// After
<span>
  <Counter />
</span>

// Result: Destroys <div> and <Counter>, creates new <span> and <Counter>
// Counter state is LOST
```

### Example 2: Same Element Type

```jsx
// Before
<div className="before" title="old" />

// After
<div className="after" title="new" />

// Result: Only updates className and title attributes
// DOM node is reused
```

### Example 3: Keys in Lists

```jsx
// ❌ WITHOUT Keys - Inefficient
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

// Insert item at beginning
<ul>
  <li>Item 0</li>  // Re-renders
  <li>Item 1</li>  // Re-renders (was Item 1, now Item 0)
  <li>Item 2</li>  // Re-renders (was Item 2, now Item 1)
</ul>

// ✅ WITH Keys - Efficient
<ul>
  <li key="1">Item 1</li>
  <li key="2">Item 2</li>
</ul>

// Insert item at beginning
<ul>
  <li key="0">Item 0</li>  // New element
  <li key="1">Item 1</li>  // Reused!
  <li key="2">Item 2</li>  // Reused!
</ul>
```

## React Fiber (React 16+)

**React Fiber** is the reimplementation of React's reconciliation algorithm.

### What Fiber Adds

1. **Incremental rendering** - Split work into chunks
2. **Pause, abort, or reuse work**
3. **Prioritize updates** - Urgent vs non-urgent
4. **Concurrent rendering** - Work on multiple renders

### Fiber Phases

**Phase 1: Render (Interruptible)**
- Build new Virtual DOM tree
- Calculate what changed
- Can be paused/aborted

**Phase 2: Commit (Not Interruptible)**
- Apply changes to DOM
- Run lifecycle methods
- Must complete once started

```jsx
// Example: Render phase can be interrupted
function ExpensiveComponent() {
  // This might be paused mid-render
  return (
    <div>
      {hugeList.map(item => (
        <Item key={item.id} data={item} />
      ))}
    </div>
  );
}
```

## Common Interview Questions

### Q1: What is the Virtual DOM and why does React use it?

**Answer:**

**Virtual DOM** is a lightweight copy of the real DOM in JavaScript.

**Why React uses it:**
1. **Performance** - Batches DOM updates
2. **Efficiency** - Only updates what changed
3. **Cross-platform** - Can render to different targets (DOM, mobile, canvas)
4. **Declarative** - Describe what you want, React handles how

**Example:**
```jsx
// You write:
function Component({ count }) {
  return <div>{count}</div>;
}

// React:
// 1. Creates Virtual DOM: { type: 'div', props: { children: count } }
// 2. Diffs with previous Virtual DOM
// 3. Updates only the text node in real DOM
```

### Q2: How does React's reconciliation work?

**Answer:**

**Reconciliation** is the algorithm React uses to diff Virtual DOMs.

**Key steps:**
1. **Element type changed?** → Destroy and rebuild
2. **Element type same?** → Update props/attributes
3. **Children changed?** → Use keys to identify changes

**Example:**
```jsx
// Scenario 1: Type changed
<div /> → <span />  // Destroys div, creates span

// Scenario 2: Props changed
<div className="old" /> → <div className="new" />  // Updates className

// Scenario 3: Children with keys
<li key="1">A</li>
<li key="2">B</li>
↓
<li key="0">New</li>
<li key="1">A</li>  // Reused!
<li key="2">B</li>  // Reused!
```

### Q3: Why are keys important in lists?

**Answer:**

**Keys help React identify which items changed, were added, or removed.**

**Without keys:**
```jsx
// React doesn't know which items are which
<li>Item 1</li>
<li>Item 2</li>
```

**With keys:**
```jsx
// React knows exactly which item is which
<li key="1">Item 1</li>
<li key="2">Item 2</li>
```

**Impact:**
- **Performance** - Avoids unnecessary re-renders
- **State preservation** - Maintains correct component state
- **Animations** - Smooth transitions

**Bad keys:**
```jsx
// ❌ Using index as key
{items.map((item, index) => <Item key={index} />)}
// Problem: Keys change when items reorder

// ✅ Using stable unique ID
{items.map(item => <Item key={item.id} />)}
```

### Q4: What is React Fiber?

**Answer:**

**React Fiber** is React's new reconciliation engine (React 16+).

**Key features:**
1. **Incremental rendering** - Splits work into chunks
2. **Pause/resume** - Can interrupt rendering
3. **Prioritization** - Urgent updates first
4. **Concurrent features** - Multiple renders at once

**Benefits:**
- Smoother animations
- Better responsiveness
- Improved perceived performance
- Enables Suspense, Concurrent Mode

**Example:**
```jsx
// Fiber can pause rendering this expensive list
<div>
  {hugeArray.map(item => <ExpensiveComponent key={item.id} />)}
</div>

// To handle urgent update like:
<input value={query} onChange={handleChange} />
```

## Performance Implications

### 1. Avoid Inline Object/Array Creation

```jsx
// ❌ BAD - Creates new object every render
<Component style={{ color: 'red' }} />

// ✅ GOOD - Reuse same object
const style = { color: 'red' };
<Component style={style} />
```

### 2. Use Keys Properly

```jsx
// ❌ BAD - Index as key with reordering
{items.map((item, i) => <Item key={i} {...item} />)}

// ✅ GOOD - Stable unique key
{items.map(item => <Item key={item.id} {...item} />)}
```

### 3. Avoid Changing Element Types

```jsx
// ❌ BAD - Conditional element type
{isLink ? <a href="/">Home</a> : <button>Home</button>}

// ✅ GOOD - Same element type
<button onClick={isLink ? navigateHome : handleClick}>Home</button>
```

## Reconciliation Examples

### Example 1: Updating Props

```jsx
// Render 1
<div className="container" id="main">
  <h1>Hello</h1>
</div>

// Render 2
<div className="wrapper" id="main">
  <h1>Hello</h1>
</div>

// Reconciliation:
// 1. Same type (div) → Reuse DOM node
// 2. className changed → Update attribute
// 3. id same → No change
// 4. Children same → No change
```

### Example 2: Adding Children

```jsx
// Render 1
<ul>
  <li key="1">First</li>
  <li key="2">Second</li>
</ul>

// Render 2
<ul>
  <li key="1">First</li>
  <li key="2">Second</li>
  <li key="3">Third</li>
</ul>

// Reconciliation:
// 1. Reuse li[key="1"]
// 2. Reuse li[key="2"]
// 3. Create new li[key="3"]
```

### Example 3: Reordering

```jsx
// Render 1
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
  <li key="c">C</li>
</ul>

// Render 2 (reversed)
<ul>
  <li key="c">C</li>
  <li key="b">B</li>
  <li key="a">A</li>
</ul>

// Reconciliation:
// 1. Move li[key="c"] to position 0
// 2. Keep li[key="b"] at position 1
// 3. Move li[key="a"] to position 2
// All DOM nodes reused!
```

## Best Practices

1. **Use stable keys** - Unique IDs, not indexes
2. **Avoid changing element types** - Causes full remount
3. **Keep component tree shallow** - Faster diffing
4. **Use React.memo** - Skip reconciliation for unchanged components
5. **Profile performance** - React DevTools Profiler
6. **Don't worry too much** - React is already fast

## Key Takeaways

- **Virtual DOM** is in-memory representation of real DOM
- **Reconciliation** is React's diffing algorithm
- **Fiber** enables concurrent, interruptible rendering
- **Keys** help React identify list changes efficiently
- React minimizes DOM updates automatically
- Understanding helps you write performant React code

## Resources

- [Reconciliation Docs](https://react.dev/learn/preserving-and-resetting-state)
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
- [Virtual DOM and Internals](https://legacy.reactjs.org/docs/faq-internals.html)
