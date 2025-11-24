---
sidebar_position: 23
---

# Portals

## What are Portals?

**Portals** provide a way to render children into a DOM node that exists **outside** the parent component's DOM hierarchy.

```jsx
ReactDOM.createPortal(child, domNode)
```

## Why Use Portals?

**Problem:** Parent has `overflow: hidden` or `z-index` that clips child:

```jsx
// ❌ Modal gets clipped by parent styles
<div style={{ overflow: 'hidden', position: 'relative' }}>
  <Modal /> {/* Gets cut off! */}
</div>
```

**Solution:** Render modal outside parent:

```jsx
// ✅ Modal renders at document.body level
<div style={{ overflow: 'hidden' }}>
  {createPortal(<Modal />, document.body)}
</div>
```

## Basic Usage

```jsx
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  // Render into document.body instead of parent
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      <Modal isOpen={showModal}>
        <h2>Modal Title</h2>
        <button onClick={() => setShowModal(false)}>Close</button>
      </Modal>
    </div>
  );
}
```

## Modal Example

```jsx
import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRoot = useRef(null);

  useEffect(() => {
    // Create modal root if doesn't exist
    if (!document.getElementById('modal-root')) {
      const div = document.createElement('div');
      div.id = 'modal-root';
      document.body.appendChild(div);
    }
    modalRoot.current = document.getElementById('modal-root');
  }, []);

  if (!isOpen || !modalRoot.current) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    modalRoot.current
  );
}

// CSS
/*
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}
*/
```

## Tooltip Example

```jsx
function Tooltip({ targetRef, content, isVisible }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (targetRef.current && isVisible) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX
      });
    }
  }, [targetRef, isVisible]);

  if (!isVisible) return null;

  return createPortal(
    <div
      className="tooltip"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left
      }}
    >
      {content}
    </div>,
    document.body
  );
}

// Usage
function App() {
  const buttonRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <button
        ref={buttonRef}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        Hover me
      </button>

      <Tooltip
        targetRef={buttonRef}
        content="This is a tooltip"
        isVisible={showTooltip}
      />
    </div>
  );
}
```

## Event Bubbling Through Portals

**Important:** Events bubble through React tree, not DOM tree!

```jsx
function Parent() {
  const handleClick = () => {
    console.log('Parent clicked'); // This runs!
  };

  return (
    <div onClick={handleClick}>
      <Child />
    </div>
  );
}

function Child() {
  // Rendered outside Parent in DOM, but events still bubble to Parent
  return createPortal(
    <button>Click me</button>,
    document.body
  );
}
```

## Common Use Cases

### 1. Modals/Dialogs

```jsx
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">{children}</div>
    </div>,
    document.body
  );
};
```

### 2. Tooltips

```jsx
const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </span>
      {show && createPortal(
        <div className="tooltip">{content}</div>,
        document.body
      )}
    </>
  );
};
```

### 3. Dropdown Menus

```jsx
const Dropdown = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && createPortal(
        <div className="dropdown-menu">
          {items.map(item => (
            <div key={item.id} onClick={item.onClick}>
              {item.label}
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};
```

### 4. Notifications/Toasts

```jsx
const Toast = ({ message, type }) => {
  return createPortal(
    <div className={`toast toast-${type}`}>
      {message}
    </div>,
    document.getElementById('toast-root')
  );
};
```

## Common Interview Questions

### Q1: What are Portals and when would you use them?

**Answer:**

**Portals** render children into a DOM node outside parent component.

**Use cases:**
- **Modals** - Need to overlay entire page
- **Tooltips** - Must escape overflow:hidden
- **Dropdowns** - Avoid z-index stacking issues
- **Notifications** - Fixed position overlays

```jsx
// Without portal - clipped by parent
<div style={{ overflow: 'hidden' }}>
  <Modal /> {/* Gets cut off */}
</div>

// With portal - renders at body level
createPortal(<Modal />, document.body)
```

### Q2: How do events work with Portals?

**Answer:**

Events **bubble through React component tree**, not DOM tree:

```jsx
function Parent() {
  // This handler runs even though child is in document.body!
  const handleClick = () => console.log('Clicked');

  return (
    <div onClick={handleClick}>
      {createPortal(<button>Click</button>, document.body)}
    </div>
  );
}
```

React maintains the component tree structure for events.

### Q3: What's the syntax for creating a Portal?

**Answer:**

```jsx
import { createPortal } from 'react-dom';

createPortal(
  <Component />,        // What to render
  document.getElementById('portal-root') // Where to render
)
```

**Common targets:**
- `document.body`
- `document.getElementById('modal-root')`
- Custom DOM node

## Best Practices

1. **Create portal root** - Add `<div id="modal-root"></div>` to index.html
2. **Clean up** - Remove portal root on unmount if created dynamically
3. **Accessibility** - Use proper ARIA attributes
4. **Focus management** - Trap focus inside modal
5. **Escape key** - Close on ESC
6. **Body scroll** - Disable when modal open
7. **Event handling** - Remember events bubble through React tree

## Accessibility Example

```jsx
function AccessibleModal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus trap
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      firstElement?.focus();

      const handleTab = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      const handleEscape = (e) => {
        if (e.key === 'Escape') onClose();
      };

      document.addEventListener('keydown', handleTab);
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleTab);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
```

## Key Takeaways

- Portals render children outside parent DOM hierarchy
- Use for modals, tooltips, dropdowns, notifications
- Events bubble through React tree, not DOM tree
- Maintains parent-child relationship in React
- Solves z-index and overflow issues
- Add portal root to index.html
- Remember accessibility (focus, ARIA, ESC key)

## Resources

- [Portals Official Docs](https://react.dev/reference/react-dom/createPortal)
- [Modal Accessibility](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
