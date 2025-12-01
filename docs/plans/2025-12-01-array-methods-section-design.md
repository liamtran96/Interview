# Array Methods Section Design

**Date:** 2025-12-01
**Status:** Approved
**Purpose:** Add JavaScript Fundamentals section with array method implementations for interview prep

## Overview

Create a new "JavaScript Fundamentals" category within the Algorithms section, starting with an "Array Methods" subsection. This section will contain interview-focused problems where students implement common array methods (map, filter, reduce, forEach) without using built-in JavaScript methods.

## Design Decisions

### 1. Primary Goal
**Interview Preparation** - Focus on common interview questions where candidates must reimplement built-in array methods from scratch to demonstrate understanding of loops, callbacks, and array manipulation.

### 2. Scope
Four core array methods:
- `filter` - Filter elements based on condition
- `forEach` - Iterate with side effects
- `map` - Transform each element
- `reduce` - Accumulate values

### 3. Structure
**One problem per method** - Each method gets its own `.mdx` file following the existing `AlgorithmProblem` component pattern used throughout the site.

### 4. Implementation Approach
**Progressive complexity:**
- **Starter code:** Simplified skeleton for interview scenarios (core behavior only)
- **Solution code:** Production-grade implementation with edge cases, error handling, and proper parameter validation

## Folder Structure

```
docs/Algorithms/
├── javascript-fundamentals/          # NEW top-level category
│   ├── _category_.json              # Category metadata
│   ├── array-methods/               # NEW subsection
│   │   ├── _category_.json          # Subsection metadata
│   │   ├── filter.mdx              # Position 1
│   │   ├── forEach.mdx             # Position 2
│   │   ├── map.mdx                 # Position 3
│   │   └── reduce.mdx              # Position 4
│   └── (future expansion: closures/, promises/, etc.)
├── arrays-hashing/                   # Existing categories
├── two-pointers/
└── ...
```

### Rationale
- **New top-level category** allows future expansion to other JavaScript fundamentals topics
- **Alphabetical ordering** provides simple, predictable organization
- **Subsection structure** keeps related content grouped and navigable

## File Specifications

### Category Metadata Files

**`docs/Algorithms/javascript-fundamentals/_category_.json`:**
```json
{
  "label": "JavaScript Fundamentals",
  "position": 100,
  "collapsible": true,
  "collapsed": false
}
```

**`docs/Algorithms/javascript-fundamentals/array-methods/_category_.json`:**
```json
{
  "label": "Array Methods",
  "position": 1,
  "collapsible": true,
  "collapsed": false
}
```

### Problem File Template

Each `.mdx` file follows this structure:

```mdx
---
sidebar_position: [1-4 based on alphabetical order]
---

import AlgorithmProblem from '@site/src/components/AlgorithmProblem';

# Implement Array.[method]()

<AlgorithmProblem
  title="Implement Array.prototype.[method]()"
  difficulty="[Easy|Medium]"
  description={`
    <p>Implement your own version of the <code>Array.prototype.[method]()</code> method.</p>
    <p>[Method-specific description]</p>
    <h4>Method Signature:</h4>
    <code>my[Method](array, callback, ...)</code>
    <h4>Requirements:</h4>
    <ul>
      <li>Do not use the built-in <code>.[method]()</code> method</li>
      <li>[Method-specific requirements]</li>
    </ul>
  `}
  examples={[...]}
  starterCode={`[Simplified skeleton]`}
  solution={`[Production-grade implementation]`}
  testCases={[...]}
  functionName="my[Method]"
/>

## Solution Explanation

### Approach: [Method] Implementation

**Time:** O(n)
**Space:** O(n) or O(1)

[Step-by-step walkthrough]

## Common Mistakes

[Method-specific pitfalls]

## Interview Tips

[Method-specific interview guidance]
```

## Problem Details

### 1. filter.mdx

**Difficulty:** Easy
**Function:** `myFilter(array, callback)`
**Purpose:** Return new array with elements that pass the test

**Starter Code:**
```javascript
function myFilter(array, callback) {
  const result = [];
  // TODO: Add elements that pass the test
  return result;
}
```

**Solution Code:**
```javascript
function myFilter(array, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
}
```

**Test Cases:**
- Basic filtering (e.g., `x => x > 5`)
- Callback receives (element, index, array)
- Empty array returns empty array
- All elements pass filter
- No elements pass filter
- Single element array

---

### 2. forEach.mdx

**Difficulty:** Easy
**Function:** `myForEach(array, callback)`
**Purpose:** Execute callback for each element (side effects)

**Starter Code:**
```javascript
function myForEach(array, callback) {
  // TODO: Implement forEach
}
```

**Solution Code:**
```javascript
function myForEach(array, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
  // forEach returns undefined
}
```

**Test Cases:**
- Side effects work (push to external array)
- Callback receives (element, index, array)
- Returns undefined
- Empty array (no iterations)
- Single element array

---

### 3. map.mdx

**Difficulty:** Easy
**Function:** `myMap(array, callback)`
**Purpose:** Transform each element and return new array

**Starter Code:**
```javascript
function myMap(array, callback) {
  const result = [];
  // TODO: Loop through array and apply callback
  return result;
}
```

**Solution Code:**
```javascript
function myMap(array, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = callback(array[i], i, array);
  }
  return result;
}
```

**Test Cases:**
- Transformation works (e.g., `x => x * 2`)
- Callback receives (element, index, array)
- New array returned (original unchanged)
- Array length preserved
- Empty array returns empty array
- Single element array

---

### 4. reduce.mdx

**Difficulty:** Medium
**Function:** `myReduce(array, callback, initialValue)`
**Purpose:** Reduce array to single value using accumulator

**Starter Code:**
```javascript
function myReduce(array, callback, initialValue) {
  // TODO: Handle accumulator logic
}
```

**Solution Code:**
```javascript
function myReduce(array, callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  if (array.length === 0 && initialValue === undefined) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  let accumulator;
  let startIndex;

  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    accumulator = array[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  return accumulator;
}
```

**Test Cases:**
- Sum array (with initial value)
- Product array (with initial value)
- Sum without initial value
- Callback receives (accumulator, element, index, array)
- Single element with initial value
- Single element without initial value
- Empty array with initial value
- Empty array without initial value (error - solution only)

## Testing Strategy

### Common Tests (All Methods)
1. **Basic functionality** - Core transformation/iteration
2. **Callback parameters** - Verify (element, index, array) passed correctly
3. **Empty array** - Handle `[]` gracefully
4. **Single element** - Works with `[42]`

### Progressive Testing
- **Starter tests:** 3-4 basic tests covering core behavior
- **Solution tests:** Additional edge cases and error conditions

## Site Navigation

The new section will appear in the sidebar as:

```
📚 Algorithms
  └── ⚙️ JavaScript Fundamentals
      └── 🔧 Array Methods
          ├── filter
          ├── forEach
          ├── map
          └── reduce
```

Position: After existing algorithm categories (position: 100)

## Implementation Checklist

- [ ] Create `docs/Algorithms/javascript-fundamentals/` directory
- [ ] Create `docs/Algorithms/javascript-fundamentals/_category_.json`
- [ ] Create `docs/Algorithms/javascript-fundamentals/array-methods/` directory
- [ ] Create `docs/Algorithms/javascript-fundamentals/array-methods/_category_.json`
- [ ] Create `docs/Algorithms/javascript-fundamentals/array-methods/filter.mdx`
- [ ] Create `docs/Algorithms/javascript-fundamentals/array-methods/forEach.mdx`
- [ ] Create `docs/Algorithms/javascript-fundamentals/array-methods/map.mdx`
- [ ] Create `docs/Algorithms/javascript-fundamentals/array-methods/reduce.mdx`
- [ ] Test navigation appears correctly
- [ ] Test interactive code editor for each problem
- [ ] Verify test cases execute properly
- [ ] Verify solution toggle works

## Future Expansion

This structure allows for additional JavaScript Fundamentals topics:

```
docs/Algorithms/javascript-fundamentals/
├── array-methods/
├── closures/              # Future
├── promises-async/        # Future
├── prototypes/            # Future
└── event-loop/            # Future
```

## Success Criteria

1. All 4 array methods accessible in navigation
2. Interactive code editor works for each problem
3. Test cases pass for both starter and solution code
4. Clear, interview-focused problem descriptions
5. Progressive learning (simple starter → comprehensive solution)
6. Consistent with existing site patterns
