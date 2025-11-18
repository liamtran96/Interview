---
sidebar_position: 0
---

# Getting Started with Algorithms

## What You'll Learn

This section covers essential algorithms and data structures for technical interviews, from beginner to advanced level.

### Topics Covered

**Data Structures:**
- Arrays & Strings
- Linked Lists
- Stacks & Queues
- Hash Tables
- Trees & Graphs
- Heaps

**Algorithms:**
- Time & Space Complexity (Big O)
- Sorting & Searching
- Two Pointers
- Sliding Window
- Dynamic Programming
- Recursion & Backtracking
- Graph Algorithms (BFS, DFS)

## How to Use This Section

1. **Study the concept** - Read the explanation and examples
2. **Try the problem** - Use the interactive code editor
3. **Write your solution** - Code it yourself before looking at answers
4. **Test your code** - Run test cases to verify
5. **Review solutions** - Learn different approaches

## Complexity Analysis

Understanding time and space complexity is crucial for interviews.

### Big O Notation

**Common Time Complexities (Best to Worst):**

| Notation | Name | Example |
|----------|------|---------|
| O(1) | Constant | Array access, hash table lookup |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Array traversal |
| O(n log n) | Linearithmic | Merge sort, quick sort |
| O(n²) | Quadratic | Nested loops, bubble sort |
| O(2ⁿ) | Exponential | Recursive fibonacci |
| O(n!) | Factorial | Permutations |

### Examples

```javascript
// O(1) - Constant Time
function getFirst(arr) {
  return arr[0]; // Always one operation
}

// O(n) - Linear Time
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(log n) - Logarithmic Time
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

// O(n²) - Quadratic Time
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

## Problem-Solving Framework

Use this approach for every problem:

### 1. Understand the Problem
- Read carefully
- Ask clarifying questions
- Identify inputs and outputs
- Consider edge cases

### 2. Plan Your Approach
- Think of brute force solution first
- Optimize with better data structures
- Consider time/space tradeoffs

### 3. Write the Code
- Start with simple cases
- Use clear variable names
- Add comments for complex logic

### 4. Test Thoroughly
- Test normal cases
- Test edge cases (empty, single element)
- Test boundary conditions

### 5. Optimize
- Analyze time complexity
- Analyze space complexity
- Refactor if needed

## Common Patterns

### Pattern 1: Two Pointers

**When to use:** Sorted arrays, linked lists, strings

```javascript
// Example: Two Sum in Sorted Array
function twoSum(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}
```

### Pattern 2: Sliding Window

**When to use:** Subarrays/substrings with contiguous elements

```javascript
// Example: Max Sum of K consecutive elements
function maxSumSubarray(arr, k) {
  let maxSum = 0, windowSum = 0;

  // Initial window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;

  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### Pattern 3: Hash Table

**When to use:** Fast lookups, counting, frequency

```javascript
// Example: First Non-Repeating Character
function firstUnique(str) {
  const freq = {};

  // Count frequencies
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // Find first with count 1
  for (const char of str) {
    if (freq[char] === 1) return char;
  }

  return null;
}
```

### Pattern 4: Fast & Slow Pointers

**When to use:** Linked lists, cycle detection

```javascript
// Example: Detect Cycle in Linked List
function hasCycle(head) {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}
```

## Tips for Success

1. **Practice regularly** - Solve 1-2 problems daily
2. **Understand, don't memorize** - Learn the patterns
3. **Start simple** - Master easy problems first
4. **Time yourself** - Practice under pressure
5. **Explain your thinking** - Practice talking through solutions
6. **Review solutions** - Learn multiple approaches
7. **Track your progress** - Keep a problem journal

## Common Mistakes to Avoid

- ❌ Jumping straight to code without planning
- ❌ Not considering edge cases
- ❌ Ignoring time/space complexity
- ❌ Using confusing variable names
- ❌ Not testing your solution
- ❌ Giving up too quickly

## Resources

- Practice on: LeetCode, HackerRank, CodeSignal
- Books: "Cracking the Coding Interview", "Elements of Programming Interviews"
- Visualize: VisuAlgo.net for algorithm visualization

Ready to start? Begin with the Array & String problems!
