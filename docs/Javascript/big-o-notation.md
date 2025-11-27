---
sidebar_position: 22
---

# Big O Notation & Time Complexity

## What is Big O?

**Big O notation** describes how runtime or space grows as input size increases. It measures algorithm efficiency.

## Common Time Complexities

### O(1) - Constant Time

Runtime doesn't depend on input size.

```javascript
// Always takes same time
function getFirst(array) {
  return array[0];  // O(1)
}

// Hash table lookup
const map = new Map();
map.get(key);  // O(1)
```

### O(log n) - Logarithmic Time

Divides problem in half each step (binary search).

```javascript
// Binary search
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// O(log n) - halves search space each iteration
```

### O(n) - Linear Time

Runtime grows proportionally with input.

```javascript
// Loop through all elements
function sum(arr) {
  let total = 0;
  for (let num of arr) {  // O(n)
    total += num;
  }
  return total;
}

// Find element
arr.indexOf(5);  // O(n)
arr.includes(5); // O(n)
```

### O(n log n) - Linearithmic Time

Efficient sorting algorithms.

```javascript
// Merge sort, Quick sort
arr.sort((a, b) => a - b);  // O(n log n)
```

### O(n²) - Quadratic Time

Nested loops over same data.

```javascript
// Nested loops
function printPairs(arr) {
  for (let i = 0; i < arr.length; i++) {      // n times
    for (let j = 0; j < arr.length; j++) {    // n times
      console.log(arr[i], arr[j]);
    }
  }
}
// O(n²)

// Bubble sort
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
// O(n²)
```

### O(2ⁿ) - Exponential Time

Each addition doubles runtime (avoid if possible).

```javascript
// Naive recursive Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);  // O(2ⁿ)
}
```

## Complexity Hierarchy

**Best to Worst:**
```
O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)
```

## Space Complexity

Memory used by algorithm.

```javascript
// O(1) space
function sum(arr) {
  let total = 0;  // Only one variable
  for (let num of arr) {
    total += num;
  }
  return total;
}

// O(n) space
function double(arr) {
  const result = [];  // New array same size as input
  for (let num of arr) {
    result.push(num * 2);
  }
  return result;
}
```

## Common Array Operations

| Operation | Time | Space |
|-----------|------|-------|
| `arr[i]` access | O(1) | O(1) |
| `arr.push()` | O(1) | O(1) |
| `arr.pop()` | O(1) | O(1) |
| `arr.shift()` | O(n) | O(1) |
| `arr.unshift()` | O(n) | O(1) |
| `arr.slice()` | O(n) | O(n) |
| `arr.map()` | O(n) | O(n) |
| `arr.filter()` | O(n) | O(n) |
| `arr.reduce()` | O(n) | O(1) |
| `arr.sort()` | O(n log n) | O(log n) |
| `arr.indexOf()` | O(n) | O(1) |

## Interview Tips

1. **Identify loops** - Each loop adds factor of n
2. **Drop constants** - O(2n) → O(n)
3. **Drop non-dominant terms** - O(n² + n) → O(n²)
4. **Different inputs = different variables** - O(a + b), not O(n)
5. **Best, Average, Worst case** - Usually discuss worst case

## Key Takeaways

- Big O measures algorithm scalability
- O(1) constant, O(n) linear, O(n²) quadratic
- Drop constants and non-dominant terms
- Consider both time and space complexity
- Optimization matters for large inputs

## Resources

- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [MDN Algorithm Complexity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
