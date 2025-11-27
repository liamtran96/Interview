---
sidebar_position: 20
---

# Event Propagation

## Event Flow

When an event occurs, it flows through the DOM in three phases:

```
1. Capturing Phase  → Root to target
2. Target Phase     → At the target element
3. Bubbling Phase   → Target to root
```

**Example:**

```html
<div id="outer">
  <div id="inner">
    <button id="button">Click Me</button>
  </div>
</div>
```

**Event flow when clicking button:**

```
Capturing:  document → html → body → outer → inner → button
Target:     button (target phase)
Bubbling:   button → inner → outer → body → html → document
```

## Event Bubbling

Events propagate **up** from target to root.

```javascript
document.getElementById('outer').addEventListener('click', () => {
  console.log('Outer clicked');
});

document.getElementById('inner').addEventListener('click', () => {
  console.log('Inner clicked');
});

document.getElementById('button').addEventListener('click', () => {
  console.log('Button clicked');
});

// Click button:
// "Button clicked"
// "Inner clicked"
// "Outer clicked"
```

### Stop Bubbling

```javascript
document.getElementById('button').addEventListener('click', (event) => {
  console.log('Button clicked');
  event.stopPropagation(); // Stop bubbling
});

// Click button:
// "Button clicked"
// (Inner and Outer handlers NOT called)
```

## Event Capturing

Events propagate **down** from root to target.

```javascript
// Third parameter 'true' = capturing phase
document.getElementById('outer').addEventListener('click', () => {
  console.log('Outer clicked');
}, true);

document.getElementById('inner').addEventListener('click', () => {
  console.log('Inner clicked');
}, true);

document.getElementById('button').addEventListener('click', () => {
  console.log('Button clicked');
}, true);

// Click button:
// "Outer clicked"
// "Inner clicked"
// "Button clicked"
```

### Using Options Object

```javascript
element.addEventListener('click', handler, {
  capture: true,     // Use capturing phase
  once: true,        // Remove listener after first invocation
  passive: true      // Never call preventDefault()
});
```

## Event Delegation

Attach single listener to parent instead of many listeners to children.

### Without Delegation (❌ Bad)

```javascript
// Add listener to each button
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', (e) => {
    console.log('Clicked:', e.target.textContent);
  });
});

// Problem: Must re-attach when adding new buttons
const newButton = document.createElement('button');
newButton.textContent = 'New';
document.body.appendChild(newButton);
// New button has NO listener!
```

### With Delegation (✅ Good)

```javascript
// Single listener on parent
document.body.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    console.log('Clicked:', e.target.textContent);
  }
});

// Works for dynamically added buttons
const newButton = document.createElement('button');
newButton.textContent = 'New';
document.body.appendChild(newButton);
// New button automatically works!
```

### Practical Example: Todo List

```html
<ul id="todoList">
  <li><button class="delete">Delete</button> Task 1</li>
  <li><button class="delete">Delete</button> Task 2</li>
  <li><button class="delete">Delete</button> Task 3</li>
</ul>
```

```javascript
// ❌ Bad - listener on each button
document.querySelectorAll('.delete').forEach(button => {
  button.addEventListener('click', function() {
    this.parentElement.remove();
  });
});

// ✅ Good - single listener on parent
document.getElementById('todoList').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});
```

**Benefits:**
- Fewer event listeners (better performance)
- Works for dynamically added elements
- Less memory usage

## preventDefault()

Prevent default browser behavior.

```javascript
// Prevent form submission
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Form not submitted');
});

// Prevent link navigation
document.querySelector('a').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('Link not followed');
});

// Prevent context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  console.log('Right-click disabled');
});
```

### Check if Preventable

```javascript
element.addEventListener('click', (e) => {
  if (e.cancelable) {
    e.preventDefault(); // Safe to call
  }
});
```

## stopPropagation() vs stopImmediatePropagation()

### stopPropagation()

Stops event from bubbling/capturing but allows other handlers on same element.

```javascript
button.addEventListener('click', (e) => {
  console.log('Handler 1');
  e.stopPropagation(); // Stop bubbling
});

button.addEventListener('click', (e) => {
  console.log('Handler 2'); // Still runs!
});

// Click button:
// "Handler 1"
// "Handler 2"
// (Parent handlers NOT called)
```

### stopImmediatePropagation()

Stops event completely, including other handlers on same element.

```javascript
button.addEventListener('click', (e) => {
  console.log('Handler 1');
  e.stopImmediatePropagation(); // Stop everything
});

button.addEventListener('click', (e) => {
  console.log('Handler 2'); // Does NOT run!
});

// Click button:
// "Handler 1"
// (Handler 2 and parent handlers NOT called)
```

## Event Object Properties

```javascript
element.addEventListener('click', (event) => {
  // Target vs CurrentTarget
  console.log(event.target);        // Element that triggered event
  console.log(event.currentTarget); // Element with listener attached

  // Event phase
  console.log(event.eventPhase);
  // 1 = CAPTURING_PHASE
  // 2 = AT_TARGET
  // 3 = BUBBLING_PHASE

  // Coordinates
  console.log(event.clientX, event.clientY); // Relative to viewport
  console.log(event.pageX, event.pageY);     // Relative to page
  console.log(event.offsetX, event.offsetY); // Relative to element

  // Modifiers
  console.log(event.shiftKey);  // Shift key pressed?
  console.log(event.ctrlKey);   // Ctrl key pressed?
  console.log(event.altKey);    // Alt key pressed?
  console.log(event.metaKey);   // Meta key pressed?

  // Type
  console.log(event.type); // 'click', 'keydown', etc.

  // Timestamp
  console.log(event.timeStamp); // Time since page load
});
```

### target vs currentTarget

```html
<div id="outer">
  <button id="button">Click</button>
</div>
```

```javascript
document.getElementById('outer').addEventListener('click', (e) => {
  console.log('target:', e.target.id);           // "button"
  console.log('currentTarget:', e.currentTarget.id); // "outer"
});

// Click button:
// target: button (element that was clicked)
// currentTarget: outer (element with listener)
```

## Custom Events

Create and dispatch custom events.

```javascript
// Create custom event
const myEvent = new CustomEvent('myevent', {
  detail: { message: 'Hello!' },
  bubbles: true,
  cancelable: true
});

// Listen for custom event
element.addEventListener('myevent', (e) => {
  console.log(e.detail.message); // "Hello!"
});

// Dispatch event
element.dispatchEvent(myEvent);
```

### Practical Example: Component Communication

```javascript
// Child component dispatches event
class TodoItem extends HTMLElement {
  connectedCallback() {
    this.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('todo-delete', {
        detail: { id: this.dataset.id },
        bubbles: true
      }));
    });
  }
}

// Parent component listens
document.addEventListener('todo-delete', (e) => {
  console.log('Delete todo:', e.detail.id);
  // Handle deletion...
});
```

## Common Event Types

### Mouse Events

```javascript
element.addEventListener('click', handler);      // Click
element.addEventListener('dblclick', handler);   // Double-click
element.addEventListener('mousedown', handler);  // Mouse button pressed
element.addEventListener('mouseup', handler);    // Mouse button released
element.addEventListener('mousemove', handler);  // Mouse moves
element.addEventListener('mouseenter', handler); // Mouse enters (no bubble)
element.addEventListener('mouseleave', handler); // Mouse leaves (no bubble)
element.addEventListener('mouseover', handler);  // Mouse over (bubbles)
element.addEventListener('mouseout', handler);   // Mouse out (bubbles)
```

### Keyboard Events

```javascript
element.addEventListener('keydown', handler);  // Key pressed
element.addEventListener('keyup', handler);    // Key released
element.addEventListener('keypress', handler); // Key pressed (deprecated)
```

### Form Events

```javascript
form.addEventListener('submit', handler);     // Form submitted
input.addEventListener('input', handler);     // Input value changed
input.addEventListener('change', handler);    // Input loses focus after change
input.addEventListener('focus', handler);     // Element focused
input.addEventListener('blur', handler);      // Element loses focus
```

### Window Events

```javascript
window.addEventListener('load', handler);     // Page fully loaded
window.addEventListener('DOMContentLoaded', handler); // DOM ready
window.addEventListener('resize', handler);   // Window resized
window.addEventListener('scroll', handler);   // Page scrolled
window.addEventListener('beforeunload', handler); // Before page unload
```

## Performance Best Practices

### 1. Use Event Delegation

```javascript
// ❌ Bad - 1000 listeners
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', handler);
});

// ✅ Good - 1 listener
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handler(e);
  }
});
```

### 2. Remove Event Listeners

```javascript
function handler() {
  console.log('Clicked');
}

// Add listener
button.addEventListener('click', handler);

// Remove when done
button.removeEventListener('click', handler);
```

### 3. Use Passive Listeners

```javascript
// Improves scroll performance
document.addEventListener('scroll', handler, {
  passive: true // Won't call preventDefault()
});
```

### 4. Debounce/Throttle

```javascript
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Debounce scroll handler
window.addEventListener('scroll', debounce(() => {
  console.log('Scrolled!');
}, 200));
```

## Common Interview Questions

### Q1: Explain event bubbling and capturing.

**Answer:**

**Event Bubbling:** Event propagates from target element up to root.
```
button → div → body → html → document
```

**Event Capturing:** Event propagates from root down to target.
```
document → html → body → div → button
```

**By default**, event listeners use **bubbling phase** (third parameter `false` or omitted).

Use `addEventListener(event, handler, true)` for capturing phase.

### Q2: What is event delegation and why use it?

**Answer:**

Event delegation attaches one event listener to a parent element instead of many listeners to child elements.

**Benefits:**
- Fewer event listeners (better performance)
- Works for dynamically added elements
- Less memory usage
- Simpler code

**Example:**
```javascript
// Delegate clicks on buttons to parent
document.body.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    console.log('Button clicked:', e.target.textContent);
  }
});
```

### Q3: Difference between target and currentTarget?

**Answer:**

- **`event.target`**: Element that **triggered** the event
- **`event.currentTarget`**: Element that **has the listener** attached

```javascript
<div id="parent">
  <button id="child">Click</button>
</div>

parent.addEventListener('click', (e) => {
  console.log(e.target);        // button (clicked element)
  console.log(e.currentTarget); // div (listener element)
});
```

### Q4: When would you use stopPropagation()?

**Answer:**

Use `stopPropagation()` to prevent event from bubbling/capturing to parent elements.

**Use cases:**
- Nested clickable elements (prevent parent from handling)
- Modal/dropdown (prevent document click from closing)
- Performance (avoid unnecessary handler calls)

```javascript
// Modal close button
closeButton.addEventListener('click', (e) => {
  e.stopPropagation(); // Don't trigger modal click
  modal.close();
});

modal.addEventListener('click', () => {
  modal.close(); // Close when clicking modal background
});
```

### Q5: Difference between preventDefault() and stopPropagation()?

**Answer:**

- **`preventDefault()`**: Prevents default browser behavior (form submit, link navigation, etc.)
- **`stopPropagation()`**: Stops event from bubbling/capturing

They're independent:
```javascript
link.addEventListener('click', (e) => {
  e.preventDefault();      // Don't navigate
  e.stopPropagation();     // Don't bubble
});
```

## Key Takeaways

- **Event flow** - Capturing → Target → Bubbling
- **Bubbling** - Event propagates up from target
- **Capturing** - Event propagates down to target
- **Event delegation** - Attach listener to parent
- **preventDefault()** - Stop default behavior
- **stopPropagation()** - Stop bubbling/capturing
- **target vs currentTarget** - Triggered vs listener element
- **Custom events** - Create and dispatch custom events

## Resources

- [MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [Event Bubbling and Capturing](https://javascript.info/bubbling-and-capturing)
- [Event Delegation](https://davidwalsh.name/event-delegate)
