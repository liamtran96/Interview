# Array Methods Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add JavaScript Fundamentals section with 4 array method implementation problems (filter, forEach, map, reduce) for interview preparation.

**Architecture:** Create new top-level "JavaScript Fundamentals" category under Algorithms with "Array Methods" subsection. Each method is a standalone AlgorithmProblem component following existing site patterns. Progressive difficulty: simple starter code, production-grade solutions.

**Tech Stack:** Docusaurus, MDX, React (AlgorithmProblem component), Sandpack (code editor)

---

## Task 1: Create Directory Structure

**Files:**
- Create: `docs/Algorithms/javascript-fundamentals/`
- Create: `docs/Algorithms/javascript-fundamentals/_category_.json`
- Create: `docs/Algorithms/javascript-fundamentals/array-methods/`
- Create: `docs/Algorithms/javascript-fundamentals/array-methods/_category_.json`

**Step 1: Create javascript-fundamentals directory**

```bash
mkdir -p docs/Algorithms/javascript-fundamentals
```

**Step 2: Create parent category metadata**

File: `docs/Algorithms/javascript-fundamentals/_category_.json`

```json
{
  "label": "JavaScript Fundamentals",
  "position": 100,
  "collapsible": true,
  "collapsed": false
}
```

**Step 3: Create array-methods subdirectory**

```bash
mkdir -p docs/Algorithms/javascript-fundamentals/array-methods
```

**Step 4: Create subsection category metadata**

File: `docs/Algorithms/javascript-fundamentals/array-methods/_category_.json`

```json
{
  "label": "Array Methods",
  "position": 1,
  "collapsible": true,
  "collapsed": false
}
```

**Step 5: Verify structure**

```bash
ls -la docs/Algorithms/javascript-fundamentals/
ls -la docs/Algorithms/javascript-fundamentals/array-methods/
```

Expected: Both directories exist with _category_.json files

**Step 6: Commit structure**

```bash
git add docs/Algorithms/javascript-fundamentals/
git commit -m "feat: add JavaScript Fundamentals directory structure

Create directory structure for array methods section:
- javascript-fundamentals/ top-level category
- array-methods/ subsection

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: Create filter.mdx

**Files:**
- Create: `docs/Algorithms/javascript-fundamentals/array-methods/filter.mdx`

**Step 1: Create filter.mdx file**

File: `docs/Algorithms/javascript-fundamentals/array-methods/filter.mdx`

```mdx
---
sidebar_position: 1
---

import AlgorithmProblem from '@site/src/components/AlgorithmProblem';

# Implement Array.filter()

<AlgorithmProblem
  title="Implement Array.prototype.filter()"
  difficulty="Easy"
  description={`
<p>Implement your own version of the <code>Array.prototype.filter()</code> method without using the built-in <code>.filter()</code> method.</p>

<p>Your function should accept an array and a callback function, and return a new array containing only the elements for which the callback returns a truthy value.</p>

<h4>Method Signature:</h4>
<code>myFilter(array, callback)</code>

<h4>Requirements:</h4>
<ul>
  <li>Do not use the built-in <code>.filter()</code> method</li>
  <li>Return a new array (don't mutate the original)</li>
  <li>Callback receives three parameters: <code>(element, index, array)</code></li>
  <li>Only include elements where callback returns truthy value</li>
</ul>
`}
  examples={[
    {
      input: '[[1, 2, 3, 4, 5], x => x > 3]',
      output: '[4, 5]',
      explanation: 'Only elements greater than 3 pass the test'
    },
    {
      input: '[[1, 2, 3, 4, 5], x => x % 2 === 0]',
      output: '[2, 4]',
      explanation: 'Only even numbers pass the test'
    },
    {
      input: '[[], x => true]',
      output: '[]',
      explanation: 'Empty array returns empty array'
    }
  ]}
  starterCode={`function myFilter(array, callback) {
  const result = [];
  // TODO: Add elements that pass the test
  return result;
}`}
  solution={`function myFilter(array, callback) {
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
}`}
  testCases={[
    {
      input: [[1, 2, 3, 4, 5], (x) => x > 3],
      expected: [4, 5],
      description: 'Basic filtering: elements greater than 3'
    },
    {
      input: [[1, 2, 3, 4, 5], (x) => x % 2 === 0],
      expected: [2, 4],
      description: 'Filter even numbers'
    },
    {
      input: [[], (x) => true],
      expected: [],
      description: 'Empty array returns empty array'
    },
    {
      input: [[1, 2, 3], (x) => false],
      expected: [],
      description: 'No elements pass filter'
    },
    {
      input: [[1, 2, 3], (x, i) => i === 1],
      expected: [2],
      description: 'Callback receives index parameter'
    },
    {
      input: [[42], (x) => x > 0],
      expected: [42],
      description: 'Single element array'
    }
  ]}
  functionName="myFilter"
/>

## Solution Explanation

### Approach: Filter Implementation

**Time:** O(n) - iterate through array once
**Space:** O(n) - worst case, all elements pass the filter

**How it works:**

1. **Validate callback** - Ensure callback is a function
2. **Initialize result array** - Create empty array for filtered elements
3. **Iterate through input** - Loop through each element with index
4. **Test each element** - Call callback with (element, index, array)
5. **Conditionally add** - If callback returns truthy, add to result
6. **Return new array** - Original array unchanged

```javascript
function myFilter(array, callback) {
  // Step 1: Validate callback is a function
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 2: Initialize result array
  const result = [];

  // Step 3-5: Iterate and test each element
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }

  // Step 6: Return filtered array
  return result;
}
```

**Key points:**
- Original array is never modified
- Callback receives element, index, and full array
- Empty arrays are handled naturally (loop doesn't execute)
- Result can be shorter than input (or even empty)

## Common Mistakes

❌ **Mutating the original array**
```javascript
// Wrong: modifies input
array.splice(i, 1);
```

✅ **Creating a new array**
```javascript
// Correct: build new array
result.push(array[i]);
```

❌ **Not passing all callback parameters**
```javascript
// Wrong: only passes element
callback(array[i])
```

✅ **Pass element, index, and array**
```javascript
// Correct: matches native behavior
callback(array[i], i, array)
```

## Interview Tips

- **Start simple** - Get basic filtering working first, add validation later
- **Mention immutability** - Emphasize you're not modifying the original array
- **Discuss complexity** - O(n) time is optimal, can't avoid checking each element
- **Edge cases** - Empty arrays, all pass, none pass, single element
- **Native behavior** - Your implementation should match `Array.prototype.filter()`
```

**Step 2: Verify file builds**

```bash
npm run build
```

Expected: Build succeeds, no errors for filter.mdx

**Step 3: Commit filter implementation**

```bash
git add docs/Algorithms/javascript-fundamentals/array-methods/filter.mdx
git commit -m "feat: add Array.filter() implementation problem

Add interactive problem for implementing Array.prototype.filter():
- Progressive starter code and solution
- 6 test cases covering edge cases
- Solution explanation and interview tips

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: Create forEach.mdx

**Files:**
- Create: `docs/Algorithms/javascript-fundamentals/array-methods/forEach.mdx`

**Step 1: Create forEach.mdx file**

File: `docs/Algorithms/javascript-fundamentals/array-methods/forEach.mdx`

```mdx
---
sidebar_position: 2
---

import AlgorithmProblem from '@site/src/components/AlgorithmProblem';

# Implement Array.forEach()

<AlgorithmProblem
  title="Implement Array.prototype.forEach()"
  difficulty="Easy"
  description={`
<p>Implement your own version of the <code>Array.prototype.forEach()</code> method without using the built-in <code>.forEach()</code> method.</p>

<p>Your function should execute a provided callback function once for each array element. Unlike <code>map()</code> or <code>filter()</code>, <code>forEach()</code> is used for side effects and returns <code>undefined</code>.</p>

<h4>Method Signature:</h4>
<code>myForEach(array, callback)</code>

<h4>Requirements:</h4>
<ul>
  <li>Do not use the built-in <code>.forEach()</code> method</li>
  <li>Execute callback for each element</li>
  <li>Callback receives three parameters: <code>(element, index, array)</code></li>
  <li>Return <code>undefined</code> (not a new array)</li>
</ul>
`}
  examples={[
    {
      input: '[[1, 2, 3], console.log]',
      output: 'undefined (prints: 1, 2, 3)',
      explanation: 'Executes callback for each element, returns undefined'
    },
    {
      input: 'let sum = 0; [[1, 2, 3], x => sum += x]',
      output: 'undefined (sum becomes 6)',
      explanation: 'Used for side effects like updating external variables'
    }
  ]}
  starterCode={`function myForEach(array, callback) {
  // TODO: Implement forEach
}`}
  solution={`function myForEach(array, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
  // forEach returns undefined
}`}
  testCases={[
    {
      input: [[1, 2, 3], function() { this.count = (this.count || 0) + 1; }],
      expected: undefined,
      description: 'Returns undefined'
    },
    {
      input: [[], (x) => { throw new Error('Should not execute'); }],
      expected: undefined,
      description: 'Empty array: callback never executes'
    },
    {
      input: [[42], (x) => x],
      expected: undefined,
      description: 'Single element: returns undefined'
    }
  ]}
  functionName="myForEach"
/>

## Solution Explanation

### Approach: forEach Implementation

**Time:** O(n) - iterate through array once
**Space:** O(1) - no additional space (side effects only)

**How it works:**

1. **Validate callback** - Ensure callback is a function
2. **Iterate through array** - Loop through each element with index
3. **Execute callback** - Call callback with (element, index, array)
4. **Return undefined** - forEach doesn't return a value

```javascript
function myForEach(array, callback) {
  // Step 1: Validate callback
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 2-3: Iterate and execute callback
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }

  // Step 4: Return undefined (implicit)
}
```

**Key points:**
- Used for side effects (logging, updating external state)
- Always returns `undefined`
- Callback receives element, index, and full array
- Cannot break/stop execution (unlike regular for loop)

## Common Mistakes

❌ **Returning an array**
```javascript
// Wrong: forEach doesn't return anything
const result = [];
for (let i = 0; i < array.length; i++) {
  result.push(callback(array[i], i, array));
}
return result; // Wrong!
```

✅ **Just execute callback**
```javascript
// Correct: execute callback, return undefined
for (let i = 0; i < array.length; i++) {
  callback(array[i], i, array);
}
```

❌ **Confusing with map**
```javascript
// forEach is for side effects, not transformation
array.forEach(x => x * 2); // Result is lost!
```

✅ **Use for side effects**
```javascript
// Correct usage
array.forEach(x => console.log(x));
array.forEach(x => sum += x);
```

## Interview Tips

- **Emphasize side effects** - forEach is for actions, not transformations
- **Return undefined** - Explicitly mention this difference from map/filter
- **When to use** - Logging, updating counters, DOM manipulation
- **When NOT to use** - If you need the result, use map/filter/reduce instead
- **Callback params** - Still needs (element, index, array) like other methods
```

**Step 2: Verify file builds**

```bash
npm run build
```

Expected: Build succeeds, no errors for forEach.mdx

**Step 3: Commit forEach implementation**

```bash
git add docs/Algorithms/javascript-fundamentals/array-methods/forEach.mdx
git commit -m "feat: add Array.forEach() implementation problem

Add interactive problem for implementing Array.prototype.forEach():
- Emphasizes side effects vs transformations
- Test cases verify undefined return value
- Solution explanation and interview tips

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: Create map.mdx

**Files:**
- Create: `docs/Algorithms/javascript-fundamentals/array-methods/map.mdx`

**Step 1: Create map.mdx file**

File: `docs/Algorithms/javascript-fundamentals/array-methods/map.mdx`

```mdx
---
sidebar_position: 3
---

import AlgorithmProblem from '@site/src/components/AlgorithmProblem';

# Implement Array.map()

<AlgorithmProblem
  title="Implement Array.prototype.map()"
  difficulty="Easy"
  description={`
<p>Implement your own version of the <code>Array.prototype.map()</code> method without using the built-in <code>.map()</code> method.</p>

<p>Your function should accept an array and a callback function, and return a new array where each element is the result of calling the callback on the corresponding element from the input array.</p>

<h4>Method Signature:</h4>
<code>myMap(array, callback)</code>

<h4>Requirements:</h4>
<ul>
  <li>Do not use the built-in <code>.map()</code> method</li>
  <li>Return a new array (don't mutate the original)</li>
  <li>Callback receives three parameters: <code>(element, index, array)</code></li>
  <li>New array has same length as input array</li>
</ul>
`}
  examples={[
    {
      input: '[[1, 2, 3], x => x * 2]',
      output: '[2, 4, 6]',
      explanation: 'Each element is doubled'
    },
    {
      input: '[[1, 2, 3], (x, i) => x + i]',
      output: '[1, 3, 5]',
      explanation: 'Each element is added to its index'
    },
    {
      input: '[[], x => x * 2]',
      output: '[]',
      explanation: 'Empty array returns empty array'
    }
  ]}
  starterCode={`function myMap(array, callback) {
  const result = [];
  // TODO: Loop through array and apply callback
  return result;
}`}
  solution={`function myMap(array, callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = callback(array[i], i, array);
  }
  return result;
}`}
  testCases={[
    {
      input: [[1, 2, 3], (x) => x * 2],
      expected: [2, 4, 6],
      description: 'Basic transformation: double each number'
    },
    {
      input: [[1, 2, 3], (x, i) => x + i],
      expected: [1, 3, 5],
      description: 'Callback receives index parameter'
    },
    {
      input: [[], (x) => x * 2],
      expected: [],
      description: 'Empty array returns empty array'
    },
    {
      input: [[1, 2, 3], (x) => String(x)],
      expected: ['1', '2', '3'],
      description: 'Type transformation: numbers to strings'
    },
    {
      input: [[1, 2, 3], (x, i, arr) => arr.length],
      expected: [3, 3, 3],
      description: 'Callback receives array parameter'
    },
    {
      input: [[42], (x) => x * 2],
      expected: [84],
      description: 'Single element array'
    }
  ]}
  functionName="myMap"
/>

## Solution Explanation

### Approach: Map Implementation

**Time:** O(n) - iterate through array once
**Space:** O(n) - new array with same length as input

**How it works:**

1. **Validate callback** - Ensure callback is a function
2. **Initialize result array** - Create empty array for transformed elements
3. **Iterate through input** - Loop through each element with index
4. **Transform each element** - Call callback with (element, index, array)
5. **Store in result** - Assign transformed value to result[i]
6. **Return new array** - Original array unchanged

```javascript
function myMap(array, callback) {
  // Step 1: Validate callback
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 2: Initialize result array
  const result = [];

  // Step 3-5: Iterate and transform each element
  for (let i = 0; i < array.length; i++) {
    result[i] = callback(array[i], i, array);
  }

  // Step 6: Return transformed array
  return result;
}
```

**Key points:**
- Result array has same length as input
- Each element is transformed independently
- Original array is never modified
- Callback receives element, index, and full array

## Common Mistakes

❌ **Modifying original array**
```javascript
// Wrong: mutates input
for (let i = 0; i < array.length; i++) {
  array[i] = callback(array[i], i, array);
}
return array;
```

✅ **Creating new array**
```javascript
// Correct: build new array
const result = [];
for (let i = 0; i < array.length; i++) {
  result[i] = callback(array[i], i, array);
}
return result;
```

❌ **Using push (creates wrong behavior with undefined)**
```javascript
// Problematic: changes behavior with sparse arrays
result.push(callback(array[i], i, array));
```

✅ **Direct index assignment**
```javascript
// Correct: preserves sparse array behavior
result[i] = callback(array[i], i, array);
```

## Interview Tips

- **Most common method** - map is frequently asked in interviews
- **Transformation** - Emphasize map transforms each element
- **Immutability** - Original array is never modified
- **Length preservation** - Result has same length as input
- **Use cases** - Data transformation, type conversion, extraction
- **Comparison** - Mention difference from filter (length) and forEach (returns array)
```

**Step 2: Verify file builds**

```bash
npm run build
```

Expected: Build succeeds, no errors for map.mdx

**Step 3: Commit map implementation**

```bash
git add docs/Algorithms/javascript-fundamentals/array-methods/map.mdx
git commit -m "feat: add Array.map() implementation problem

Add interactive problem for implementing Array.prototype.map():
- Most commonly asked array method in interviews
- 6 test cases including type transformations
- Solution explanation and interview tips

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: Create reduce.mdx

**Files:**
- Create: `docs/Algorithms/javascript-fundamentals/array-methods/reduce.mdx`

**Step 1: Create reduce.mdx file**

File: `docs/Algorithms/javascript-fundamentals/array-methods/reduce.mdx`

```mdx
---
sidebar_position: 4
---

import AlgorithmProblem from '@site/src/components/AlgorithmProblem';

# Implement Array.reduce()

<AlgorithmProblem
  title="Implement Array.prototype.reduce()"
  difficulty="Medium"
  description={`
<p>Implement your own version of the <code>Array.prototype.reduce()</code> method without using the built-in <code>.reduce()</code> method.</p>

<p>Your function should execute a reducer callback function on each element of the array, passing in the return value from the calculation on the preceding element. The final result is a single value.</p>

<h4>Method Signature:</h4>
<code>myReduce(array, callback, initialValue)</code>

<h4>Requirements:</h4>
<ul>
  <li>Do not use the built-in <code>.reduce()</code> method</li>
  <li>Callback receives four parameters: <code>(accumulator, element, index, array)</code></li>
  <li>Support optional <code>initialValue</code> parameter</li>
  <li>If no <code>initialValue</code> and array is empty, throw TypeError</li>
  <li>If no <code>initialValue</code>, use first element as initial accumulator</li>
</ul>
`}
  examples={[
    {
      input: '[[1, 2, 3, 4], (acc, x) => acc + x, 0]',
      output: '10',
      explanation: 'Sum all numbers: 0 + 1 + 2 + 3 + 4 = 10'
    },
    {
      input: '[[1, 2, 3, 4], (acc, x) => acc * x, 1]',
      output: '24',
      explanation: 'Product of all numbers: 1 * 1 * 2 * 3 * 4 = 24'
    },
    {
      input: '[[1, 2, 3, 4], (acc, x) => acc + x]',
      output: '10',
      explanation: 'Sum without initial value: starts with first element (1)'
    }
  ]}
  starterCode={`function myReduce(array, callback, initialValue) {
  // TODO: Handle accumulator logic
}`}
  solution={`function myReduce(array, callback, initialValue) {
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
}`}
  testCases={[
    {
      input: [[1, 2, 3, 4], (acc, x) => acc + x, 0],
      expected: 10,
      description: 'Sum with initial value'
    },
    {
      input: [[1, 2, 3, 4], (acc, x) => acc * x, 1],
      expected: 24,
      description: 'Product with initial value'
    },
    {
      input: [[1, 2, 3, 4], (acc, x) => acc + x],
      expected: 10,
      description: 'Sum without initial value'
    },
    {
      input: [[5], (acc, x) => acc + x, 10],
      expected: 15,
      description: 'Single element with initial value'
    },
    {
      input: [[42], (acc, x) => acc + x],
      expected: 42,
      description: 'Single element without initial value'
    },
    {
      input: [[], (acc, x) => acc + x, 0],
      expected: 0,
      description: 'Empty array with initial value'
    }
  ]}
  functionName="myReduce"
/>

## Solution Explanation

### Approach: Reduce Implementation

**Time:** O(n) - iterate through array once
**Space:** O(1) - only accumulator variable

**How it works:**

1. **Validate callback** - Ensure callback is a function
2. **Check edge case** - Empty array without initial value throws error
3. **Initialize accumulator** - Use initialValue if provided, else first element
4. **Set start index** - 0 if initialValue provided, else 1
5. **Iterate and accumulate** - Call callback with (accumulator, element, index, array)
6. **Return final value** - Accumulated result

```javascript
function myReduce(array, callback, initialValue) {
  // Step 1: Validate callback
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  // Step 2: Check edge case
  if (array.length === 0 && initialValue === undefined) {
    throw new TypeError('Reduce of empty array with no initial value');
  }

  // Step 3-4: Initialize accumulator and start index
  let accumulator;
  let startIndex;

  if (initialValue !== undefined) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    accumulator = array[0];
    startIndex = 1;
  }

  // Step 5: Iterate and accumulate
  for (let i = startIndex; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  // Step 6: Return accumulated value
  return accumulator;
}
```

**Key points:**
- Most powerful array method (can implement map/filter with reduce)
- Callback receives accumulator as first parameter
- Initial value is optional but recommended
- Empty array without initial value throws TypeError
- Returns single value (can be any type: number, object, array, etc.)

## Common Mistakes

❌ **Not handling missing initial value**
```javascript
// Wrong: always starts at index 0
let accumulator = initialValue;
for (let i = 0; i < array.length; i++) {
  accumulator = callback(accumulator, array[i], i, array);
}
```

✅ **Conditional start based on initial value**
```javascript
// Correct: adjust start index if no initial value
let startIndex = initialValue !== undefined ? 0 : 1;
let accumulator = initialValue !== undefined ? initialValue : array[0];
```

❌ **Not throwing error for empty array**
```javascript
// Wrong: returns undefined silently
if (array.length === 0) {
  return undefined;
}
```

✅ **Throw TypeError like native reduce**
```javascript
// Correct: matches native behavior
if (array.length === 0 && initialValue === undefined) {
  throw new TypeError('Reduce of empty array with no initial value');
}
```

## Interview Tips

- **Most complex method** - reduce is the hardest to implement correctly
- **Initial value matters** - Explain the two different behaviors
- **Edge cases critical** - Empty array handling is key differentiator
- **Versatile** - Can implement map, filter, flatten with reduce
- **Common uses** - Sum, product, max/min, grouping, flattening
- **Callback params** - Note accumulator comes first (different from map/filter)
- **Return value** - Returns the final accumulated value, not an array
```

**Step 2: Verify file builds**

```bash
npm run build
```

Expected: Build succeeds, no errors for reduce.mdx

**Step 3: Commit reduce implementation**

```bash
git add docs/Algorithms/javascript-fundamentals/array-methods/reduce.mdx
git commit -m "feat: add Array.reduce() implementation problem

Add interactive problem for implementing Array.prototype.reduce():
- Medium difficulty: most complex array method
- Handles optional initialValue parameter
- 6 test cases including edge cases
- Solution explanation and interview tips

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: Verification and Testing

**Files:**
- Verify: All files build successfully
- Test: Navigation appears correctly
- Test: Interactive editors work

**Step 1: Run full build**

```bash
npm run build
```

Expected: Build succeeds with no errors

**Step 2: Start dev server**

```bash
npm run start
```

Expected: Server starts on http://localhost:3000

**Step 3: Navigate to section**

1. Open http://localhost:3000
2. Click "Algorithms" in sidebar
3. Scroll to "JavaScript Fundamentals"
4. Click to expand
5. Click "Array Methods"
6. Verify 4 problems appear: filter, forEach, map, reduce

Expected: All 4 problems visible in correct alphabetical order

**Step 4: Test filter problem**

1. Click "filter"
2. Verify problem description loads
3. Verify code editor appears
4. Run starter code
5. Verify test results show
6. Click "Show Solution"
7. Run solution code
8. Verify all tests pass

Expected: Interactive editor works, tests execute

**Step 5: Test remaining problems**

Repeat Step 4 for forEach, map, and reduce

Expected: All problems work correctly

**Step 6: Final commit**

```bash
git add -A
git commit -m "test: verify array methods section complete

Verified:
- All 4 array method problems build successfully
- Navigation shows JavaScript Fundamentals section
- Interactive code editors work
- Test cases execute properly

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Summary

**Implementation complete when:**
- ✅ Directory structure created
- ✅ 4 MDX files created (filter, forEach, map, reduce)
- ✅ All files build without errors
- ✅ Navigation shows new section correctly
- ✅ Interactive code editors work
- ✅ Test cases execute and pass
- ✅ All changes committed to feature branch

**Total tasks:** 6
**Total files created:** 6 (2 _category_.json + 4 .mdx)
**Estimated time:** 60-90 minutes
