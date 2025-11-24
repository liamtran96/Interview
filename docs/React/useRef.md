---
sidebar_position: 8
---

# useRef Hook

## What is useRef?

`useRef` is a React Hook that lets you **reference a value that persists across renders** without causing re-renders when it changes. It's commonly used for:

1. **Accessing DOM elements** directly
2. **Storing mutable values** that don't trigger re-renders
3. **Keeping track of previous values**

## Basic Syntax

```javascript
const ref = useRef(initialValue);
```

- **`ref.current`** - The mutable value (can be read and written)
- **Changes don't trigger re-renders**
- **Persists across re-renders**

## Use Case 1: Accessing DOM Elements

### Focus an Input

```jsx
import { useRef } from 'react';

function SearchBox() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```

### Scroll to Element

```jsx
function ScrollExample() {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <button onClick={scrollToSection}>Scroll to Section</button>
      <div style={{ height: '100vh' }}>Scroll down...</div>
      <div ref={sectionRef}>
        <h2>Target Section</h2>
      </div>
    </div>
  );
}
```

### Measure Element Size

```jsx
function MeasureElement() {
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ padding: '20px', background: 'lightblue' }}>
        Measure me!
      </div>
      <p>Width: {dimensions.width}px, Height: {dimensions.height}px</p>
    </div>
  );
}
```

## Use Case 2: Storing Mutable Values

### Timer ID

```jsx
function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  return (
    <div>
      <p>Time: {seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Previous Value Tracking

```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Storing Latest Callback

```jsx
function useLatestCallback(callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return callbackRef;
}

function Component({ onChange }) {
  const latestOnChange = useLatestCallback(onChange);

  useEffect(() => {
    const interval = setInterval(() => {
      // Always uses latest callback without re-creating interval
      latestOnChange.current();
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty deps - interval never recreated
}
```

## Common Interview Questions

### Q1: What's the difference between useRef and useState?

**Answer:**

| useRef | useState |
|--------|----------|
| **Doesn't trigger re-render** when changed | **Triggers re-render** when changed |
| Mutable `.current` property | Immutable state |
| Synchronous updates | Asynchronous updates |
| For values not needed in render | For values used in render |

```jsx
function Example() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  const handleStateClick = () => {
    setStateCount(stateCount + 1); // Triggers re-render
  };

  const handleRefClick = () => {
    refCount.current = refCount.current + 1; // No re-render
    console.log('Ref count:', refCount.current);
  };

  console.log('Component rendered');

  return (
    <div>
      <p>State: {stateCount}</p>
      <p>Ref: {refCount.current}</p> {/* Won't update on screen */}
      <button onClick={handleStateClick}>Update State</button>
      <button onClick={handleRefClick}>Update Ref</button>
    </div>
  );
}
```

### Q2: When should you use useRef instead of useState?

**Answer:**

Use **useRef** when:
- Accessing DOM elements
- Storing timer IDs (setTimeout, setInterval)
- Keeping track of previous values
- Storing values that shouldn't trigger re-renders
- Storing mutable values (like WebSocket connections)

Use **useState** when:
- Value is displayed in the UI
- Changes should trigger component re-render
- Value is part of component state

### Q3: Can you modify ref.current directly?

**Answer:** Yes! Unlike state, **you can directly modify `ref.current`**:

```jsx
function Example() {
  const countRef = useRef(0);

  // ✅ Direct modification is fine
  countRef.current = countRef.current + 1;

  // ❌ DON'T do this with state
  // state.count = state.count + 1; // Wrong!
  // setState({ count: state.count + 1 }); // Correct
}
```

### Q4: Why shouldn't you read/write refs during rendering?

**Answer:**

**Reading or writing refs during render** makes components unpredictable:

```jsx
// ❌ BAD - Reading ref during render
function Component() {
  const ref = useRef(0);
  ref.current = ref.current + 1; // Runs every render!

  return <div>{ref.current}</div>;
}

// ✅ GOOD - Read/write in event handlers or effects
function Component() {
  const ref = useRef(0);

  const handleClick = () => {
    ref.current = ref.current + 1; // Only on click
    console.log(ref.current);
  };

  return <button onClick={handleClick}>Click</button>;
}
```

**Why?** React may call your component multiple times during rendering (for optimizations), so refs should only be modified in event handlers or effects.

## Advanced Patterns

### Forwarding Refs to Child Components

```jsx
import { forwardRef, useRef } from 'react';

// Child component that forwards ref
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Parent component
function Form() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Enter text" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}
```

### useImperativeHandle - Custom Ref API

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // Expose custom methods to parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    scrollIntoView: () => {
      inputRef.current.scrollIntoView();
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// Usage
function App() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
    console.log(inputRef.current.getValue());
  };

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleClick}>Focus & Log Value</button>
    </div>
  );
}
```

### Callback Refs

Alternative to useRef - function that receives the element:

```jsx
function Component() {
  const [height, setHeight] = useState(0);

  // Callback ref - called when element is created
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <div>
      <div ref={measuredRef}>Measure me!</div>
      <p>Height: {height}px</p>
    </div>
  );
}
```

### Multiple Refs on One Element

```jsx
function Component() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const setRefs = useCallback((node) => {
    ref1.current = node;
    ref2.current = node;
  }, []);

  return <div ref={setRefs}>Element with multiple refs</div>;
}
```

## Real-World Examples

### Video Player Controls

```jsx
function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (seconds) => {
    videoRef.current.currentTime += seconds;
  };

  return (
    <div>
      <video ref={videoRef} src={src} />
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={() => skip(-10)}>-10s</button>
      <button onClick={() => skip(10)}>+10s</button>
    </div>
  );
}
```

### Debounce with useRef

```jsx
function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  return (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function SearchBox() {
  const [results, setResults] = useState([]);

  const debouncedSearch = useDebounce((query) => {
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(setResults);
  }, 500);

  return (
    <div>
      <input onChange={(e) => debouncedSearch(e.target.value)} />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Click Outside to Close

```jsx
function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
}

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && (
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
        </ul>
      )}
    </div>
  );
}
```

## Common Pitfalls

### 1. Reading Ref During Render

```jsx
// ❌ BAD
function Component() {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;

  return <div>Renders: {renderCount.current}</div>;
}

// ✅ GOOD - Use in effect
function Component() {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  });

  return <div>Component</div>;
}
```

### 2. Expecting Ref Changes to Trigger Renders

```jsx
// ❌ BAD - Ref change won't update UI
function Component() {
  const countRef = useRef(0);

  return (
    <div>
      <p>Count: {countRef.current}</p> {/* Won't update */}
      <button onClick={() => countRef.current++}>Increment</button>
    </div>
  );
}

// ✅ GOOD - Use useState for UI values
function Component() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 3. Accessing Ref Before Element Mounts

```jsx
// ❌ BAD - ref.current is null initially
function Component() {
  const divRef = useRef(null);
  console.log(divRef.current.offsetWidth); // Error!

  return <div ref={divRef}>Content</div>;
}

// ✅ GOOD - Check for null or use in effect
function Component() {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      console.log(divRef.current.offsetWidth);
    }
  }, []);

  return <div ref={divRef}>Content</div>;
}
```

## Best Practices

1. **Use for DOM access** - Primary use case is accessing DOM elements
2. **Store values that don't affect render** - Timer IDs, previous values, etc.
3. **Don't read/write during render** - Only in effects or event handlers
4. **Check for null** - Refs are null until element mounts
5. **Use forwardRef** - When child components need to expose refs
6. **Combine with useCallback** - For callback refs that measure elements
7. **Don't overuse** - Prefer declarative React patterns when possible

## Key Takeaways

- `useRef` creates a mutable reference that persists across renders
- Changes to `ref.current` don't trigger re-renders
- Primary uses: DOM access and storing mutable values
- Different from `useState` - no re-renders on change
- Access `ref.current` in effects or event handlers, not during render
- Use `forwardRef` to pass refs to child components
- Use `useImperativeHandle` to customize exposed ref methods

## Resources

- [useRef Official Docs](https://react.dev/reference/react/useRef)
- [Manipulating the DOM with Refs](https://react.dev/learn/manipulating-the-dom-with-refs)
- [forwardRef](https://react.dev/reference/react/forwardRef)
- [useImperativeHandle](https://react.dev/reference/react/useImperativeHandle)
