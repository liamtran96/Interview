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

## Complete 100 LeetCode Problems Collection

This resource includes a carefully curated collection of **100 LeetCode problems** organized by topic and difficulty level. Each problem includes:

- **Problem statement** with clear explanation
- **Interactive code editor** (LeetCode-style, built with Monaco Editor)
- **Multiple test cases** to verify your solution
- **Solution explanations** with multiple approaches
- **Complexity analysis** (Time and Space)
- **Related problems** for further practice

### Problem Categories & Distribution

| Category | Count | Difficulty |
|----------|-------|------------|
| **Arrays & Hashing** | 15 | Easy-Medium |
| **Two Pointers** | 8 | Easy-Medium |
| **Sliding Window** | 8 | Easy-Medium |
| **Stack** | 8 | Easy-Hard |
| **Binary Search** | 8 | Easy-Medium |
| **Linked Lists** | 10 | Easy-Hard |
| **Trees** | 12 | Easy-Hard |
| **Graphs** | 10 | Medium-Hard |
| **Dynamic Programming** | 12 | Medium-Hard |
| **Backtracking & Greedy** | 9 | Medium-Hard |
| **Other** | 1 | Medium |
| **TOTAL** | **100** | **All Levels** |

### Browse by Category

#### Fundamental Data Structures
1. **Arrays & Hashing** - Master array manipulation and hash table operations (15 problems)
2. **Linked Lists** - Work with linked list structures and operations (10 problems)
3. **Trees** - Understand binary trees, BSTs, and tree traversals (12 problems)
4. **Graphs** - Explore graph algorithms, DFS, BFS, and topological sorting (10 problems)

#### Common Techniques & Patterns
5. **Two Pointers** - Efficient multi-pointer approaches (8 problems)
6. **Sliding Window** - Optimize substring/subarray problems (8 problems)
7. **Stack** - Stack-based solutions and monotonic stacks (8 problems)
8. **Binary Search** - Search and divide-and-conquer problems (8 problems)

#### Advanced Topics
9. **Dynamic Programming** - Optimal substructure and memoization (12 problems)
10. **Backtracking & Greedy** - Exhaustive search and greedy algorithms (9 problems)

### Interactive Code Editor

Each problem includes an interactive code editor featuring:
- **Real-time syntax highlighting** with Monaco Editor (VS Code)
- **Run code against test cases** without leaving the page
- **Console output** to see your program's output
- **Error feedback** for immediate debugging
- **Multiple language support** preparation

### Getting Started

1. **Choose a category** above that matches your current skill level
2. **Start with Easy problems** to build confidence
3. **Use the interactive editor** to write and test your solution
4. **Review the solution** to learn different approaches
5. **Progress to Medium and Hard** as you master each category

### Difficulty Progression

- **Easy (35 problems)**: Start here if you're new to DSA
- **Medium (50 problems)**: Intermediate skills and optimization
- **Hard (15 problems)**: Advanced concepts and complex problems

### Study Tips

- **Time boxing**: Spend 25-30 minutes per problem
- **Pattern recognition**: Notice similarities between problems
- **Optimization**: Try to improve time/space complexity
- **Discussion**: Explain your approach to a peer
- **Tracking**: Mark problems as solved and revisit hard ones

Ready to start? Begin by exploring the categories above and choose topics that match your current skill level!
