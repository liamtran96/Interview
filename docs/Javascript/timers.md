---
sidebar_position: 21
---

# Timers: setTimeout, setInterval, requestAnimationFrame

## setTimeout

Executes code **once** after a specified delay.

```javascript
setTimeout(callback, delay, arg1, arg2, ...);
```

### Basic Usage

```javascript
// Execute after 1 second
setTimeout(() => {
  console.log("Hello after 1 second");
}, 1000);

// With arguments
setTimeout((name, age) => {
  console.log(`${name} is ${age}`);
}, 1000, "John", 30);
```

### Clearing Timeouts

```javascript
const timeoutId = setTimeout(() => {
  console.log("This won't run");
}, 1000);

clearTimeout(timeoutId); // Cancel the timeout
```

### Common Use Cases

```javascript
// Debounce
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Delayed API call
setTimeout(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => console.log(data));
}, 500);
```

## setInterval

Executes code **repeatedly** at specified intervals.

```javascript
setInterval(callback, interval, arg1, arg2, ...);
```

### Basic Usage

```javascript
// Execute every second
const intervalId = setInterval(() => {
  console.log("Tick");
}, 1000);

// Stop after 5 seconds
setTimeout(() => {
  clearInterval(intervalId);
}, 5000);
```

### Counter Example

```javascript
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);
  
  if (count === 5) {
    clearInterval(intervalId);
    console.log("Done!");
  }
}, 1000);
```

### Pitfall: Intervals Can Stack

```javascript
// ❌ Dangerous if callback takes longer than interval
setInterval(() => {
  // If this takes 2 seconds, intervals stack up!
  expensiveOperation();
}, 1000);

// ✅ Better: Use setTimeout recursively
function repeat() {
  expensiveOperation();
  setTimeout(repeat, 1000);
}
repeat();
```

## requestAnimationFrame

Optimized for animations, runs before next repaint (~60fps).

```javascript
requestAnimationFrame(callback);
```

### Basic Animation

```javascript
let position = 0;

function animate() {
  position += 2;
  element.style.left = position + 'px';
  
  if (position < 500) {
    requestAnimationFrame(animate);
  }
}

animate();
```

### Cancel Animation

```javascript
let animationId;

function animate() {
  position += 2;
  element.style.left = position + 'px';
  animationId = requestAnimationFrame(animate);
}

animationId = requestAnimationFrame(animate);

// Cancel
cancelAnimationFrame(animationId);
```

### Why Use requestAnimationFrame?

**Benefits:**
1. **Optimized for animations** - Runs at 60fps (16.67ms)
2. **Pauses when tab inactive** - Saves CPU/battery
3. **Synchronized with display refresh** - No tearing
4. **Better performance** than setTimeout for animations

```javascript
// ❌ Not optimal
setInterval(() => {
  element.style.left = position++ + 'px';
}, 16); // Try to hit 60fps

// ✅ Optimal
function animate() {
  element.style.left = position++ + 'px';
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

## Common Interview Questions

### Q1: What's the difference between setTimeout and setInterval?

**Answer:**

**setTimeout**: Runs **once** after delay
```javascript
setTimeout(() => console.log("Once"), 1000);
```

**setInterval**: Runs **repeatedly** at intervals
```javascript
const id = setInterval(() => console.log("Repeat"), 1000);
clearInterval(id); // Stop it
```

### Q2: Does setTimeout guarantee exact timing?

**Answer:** **No!**

setTimeout specifies **minimum delay**, not exact timing.

```javascript
setTimeout(() => console.log("After 1s"), 1000);
// Runs AFTER AT LEAST 1 second, could be longer

// Why?
// 1. Event loop may be busy
// 2. Browser enforces minimum delay (~4ms)
// 3. Tab in background may throttle timers
```

### Q3: When should you use requestAnimationFrame?

**Answer:**

Use **requestAnimationFrame** for:
- Visual animations
- Canvas/WebGL rendering
- DOM animations
- Anything that updates display at 60fps

Use **setTimeout/setInterval** for:
- Non-visual timing (API polling, etc.)
- Specific delays
- Background tasks

```javascript
// ✅ Animation
requestAnimationFrame(() => {
  element.style.transform = `translateX(${x}px)`;
});

// ✅ Non-visual task
setInterval(() => {
  checkForUpdates();
}, 5000);
```

## Key Takeaways

- **setTimeout** - Execute once after delay
- **setInterval** - Execute repeatedly at intervals
- **requestAnimationFrame** - Optimized for 60fps animations
- Timers specify minimum delay, not exact
- Use clearTimeout/clearInterval/cancelAnimationFrame to stop
- requestAnimationFrame pauses when tab inactive

## Resources

- [MDN setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
- [MDN setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
- [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
