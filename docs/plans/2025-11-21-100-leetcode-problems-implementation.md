# 100 LeetCode Interview Problems Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create 100 fully-populated algorithm problems organized by topic with interactive code editor, test cases, and comprehensive explanations.

**Architecture:** Individual MDX files per problem using existing AlgorithmProblem component. Problems organized into 10 category folders with sidebar navigation. Each problem includes description, examples, starter code, solution, test cases, and detailed explanations.

**Tech Stack:** Docusaurus 3.8.1, React 19, Monaco Editor, MDX, TypeScript

---

## Setup Tasks

### Task 1: Create Category Folder Structure

**Files:**
- Create: `docs/Algorithms/arrays-hashing/_category_.json`
- Create: `docs/Algorithms/two-pointers/_category_.json`
- Create: `docs/Algorithms/sliding-window/_category_.json`
- Create: `docs/Algorithms/stack/_category_.json`
- Create: `docs/Algorithms/binary-search/_category_.json`
- Create: `docs/Algorithms/linked-lists/_category_.json`
- Create: `docs/Algorithms/trees/_category_.json`
- Create: `docs/Algorithms/graphs/_category_.json`
- Create: `docs/Algorithms/dynamic-programming/_category_.json`
- Create: `docs/Algorithms/backtracking-greedy/_category_.json`

**Step 1: Create arrays-hashing category**

```bash
mkdir -p docs/Algorithms/arrays-hashing
```

**Step 2: Write category config**

Create `docs/Algorithms/arrays-hashing/_category_.json`:

```json
{
  "label": "Arrays & Hashing",
  "position": 1,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Master array manipulation and hash table patterns - the foundation of algorithm problem-solving."
  }
}
```

**Step 3: Create remaining category folders**

```bash
mkdir -p docs/Algorithms/two-pointers
mkdir -p docs/Algorithms/sliding-window
mkdir -p docs/Algorithms/stack
mkdir -p docs/Algorithms/binary-search
mkdir -p docs/Algorithms/linked-lists
mkdir -p docs/Algorithms/trees
mkdir -p docs/Algorithms/graphs
mkdir -p docs/Algorithms/dynamic-programming
mkdir -p docs/Algorithms/backtracking-greedy
```

**Step 4: Write remaining category configs**

Create `docs/Algorithms/two-pointers/_category_.json`:
```json
{
  "label": "Two Pointers",
  "position": 2,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Learn efficient array/string traversal using two-pointer technique."
  }
}
```

Create `docs/Algorithms/sliding-window/_category_.json`:
```json
{
  "label": "Sliding Window",
  "position": 3,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Optimize substring and subarray problems with sliding window patterns."
  }
}
```

Create `docs/Algorithms/stack/_category_.json`:
```json
{
  "label": "Stack",
  "position": 4,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Master LIFO data structure for parsing, monotonic stacks, and more."
  }
}
```

Create `docs/Algorithms/binary-search/_category_.json`:
```json
{
  "label": "Binary Search",
  "position": 5,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Achieve O(log n) search efficiency through binary search variations."
  }
}
```

Create `docs/Algorithms/linked-lists/_category_.json`:
```json
{
  "label": "Linked Lists",
  "position": 6,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Practice pointer manipulation with classic linked list problems."
  }
}
```

Create `docs/Algorithms/trees/_category_.json`:
```json
{
  "label": "Trees",
  "position": 7,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Explore binary trees, BSTs, and tree traversal algorithms."
  }
}
```

Create `docs/Algorithms/graphs/_category_.json`:
```json
{
  "label": "Graphs",
  "position": 8,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Solve complex problems with BFS, DFS, and shortest path algorithms."
  }
}
```

Create `docs/Algorithms/dynamic-programming/_category_.json`:
```json
{
  "label": "Dynamic Programming",
  "position": 9,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Master optimization problems through memoization and tabulation."
  }
}
```

Create `docs/Algorithms/backtracking-greedy/_category_.json`:
```json
{
  "label": "Backtracking & Greedy",
  "position": 10,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Learn constraint satisfaction and optimization heuristics."
  }
}
```

**Step 5: Verify structure**

```bash
ls -la docs/Algorithms/*/
```

Expected: 10 category folders, each with `_category_.json`

**Step 6: Commit**

```bash
git add docs/Algorithms/
git commit -m "feat: create category structure for 100 LeetCode problems

- Add 10 algorithm pattern categories
- Configure Docusaurus sidebar navigation
- Set up folder structure for organized problem collection"
```

---

## Batch 1: Arrays & Hashing (15 Problems)

### Task 2: Move Existing Problems to arrays-hashing/

**Files:**
- Move: `docs/Algorithms/two-sum.mdx` → `docs/Algorithms/arrays-hashing/two-sum.mdx`
- Move: `docs/Algorithms/contains-duplicate.mdx` → `docs/Algorithms/arrays-hashing/contains-duplicate.mdx`
- Move: `docs/Algorithms/valid-anagram.mdx` → `docs/Algorithms/arrays-hashing/valid-anagram.mdx`
- Modify: Frontmatter in each file

**Step 1: Move existing files**

```bash
git mv docs/Algorithms/two-sum.mdx docs/Algorithms/arrays-hashing/
git mv docs/Algorithms/contains-duplicate.mdx docs/Algorithms/arrays-hashing/
git mv docs/Algorithms/valid-anagram.mdx docs/Algorithms/arrays-hashing/
```

**Step 2: Update frontmatter in two-sum.mdx**

Update `docs/Algorithms/arrays-hashing/two-sum.mdx` frontmatter:

```yaml
---
sidebar_position: 1
difficulty: Easy
tags: [arrays, hash-table, google, amazon, facebook]
leetcode_url: https://leetcode.com/problems/two-sum/
companies: [Google, Amazon, Facebook, Microsoft, Apple]
pattern: "Arrays & Hashing"
---
```

**Step 3: Update frontmatter in contains-duplicate.mdx**

Update `docs/Algorithms/arrays-hashing/contains-duplicate.mdx` frontmatter:

```yaml
---
sidebar_position: 2
difficulty: Easy
tags: [arrays, hash-table, amazon, google]
leetcode_url: https://leetcode.com/problems/contains-duplicate/
companies: [Amazon, Google, Microsoft, Meta]
pattern: "Arrays & Hashing"
---
```

**Step 4: Update frontmatter in valid-anagram.mdx**

Update `docs/Algorithms/arrays-hashing/valid-anagram.mdx` frontmatter:

```yaml
---
sidebar_position: 3
difficulty: Easy
tags: [hash-table, string, sorting, amazon]
leetcode_url: https://leetcode.com/problems/valid-anagram/
companies: [Amazon, Bloomberg, Meta, Google]
pattern: "Arrays & Hashing"
---
```

**Step 5: Commit**

```bash
git add docs/Algorithms/arrays-hashing/
git commit -m "refactor: move existing problems to arrays-hashing category

- Reorganize two-sum, contains-duplicate, valid-anagram
- Add pattern tags and company metadata
- Update sidebar positioning"
```

### Task 3: Create Group Anagrams (Medium)

**Files:**
- Create: `docs/Algorithms/arrays-hashing/group-anagrams.mdx`

**Step 1: Create problem file**

Create `docs/Algorithms/arrays-hashing/group-anagrams.mdx`:

```mdx
---
sidebar_position: 4
difficulty: Easy
tags: [arrays, hash-table, string, sorting, amazon, google]
leetcode_url: https://leetcode.com/problems/group-anagrams/
companies: [Amazon, Google, Meta, Microsoft]
pattern: "Arrays & Hashing"
---

import AlgorithmProblem from '@site/src/components/AlgorithmProblem';

# Group Anagrams

<AlgorithmProblem
  title="Group Anagrams"
  difficulty="Easy"
  description={`
<p>Given an array of strings <code>strs</code>, group the anagrams together. You can return the answer in any order.</p>
<p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.</p>
<h4>Constraints:</h4>
<ul>
  <li>1 ≤ strs.length ≤ 10<sup>4</sup></li>
  <li>0 ≤ strs[i].length ≤ 100</li>
  <li>strs[i] consists of lowercase English letters.</li>
</ul>
`}
  examples={[
    {
      input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
      output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
      explanation: 'Group words that are anagrams of each other.'
    },
    {
      input: 'strs = [""]',
      output: '[[""]]'
    },
    {
      input: 'strs = ["a"]',
      output: '[["a"]]'
    }
  ]}
  starterCode={`function groupAnagrams(strs) {
  // Write your code here

}`}
  solution={`function groupAnagrams(strs) {
  // Hash map approach: Use sorted string as key
  const map = new Map();

  for (const str of strs) {
    // Sort the string to use as key
    const sorted = str.split('').sort().join('');

    if (!map.has(sorted)) {
      map.set(sorted, []);
    }

    map.get(sorted).push(str);
  }

  return Array.from(map.values());
}`}
  testCases={[
    {
      input: [["eat","tea","tan","ate","nat","bat"]],
      expected: [["eat","tea","ate"],["tan","nat"],["bat"]],
      description: 'Multiple anagram groups'
    },
    {
      input: [[""]],
      expected: [[""]],
      description: 'Empty string'
    },
    {
      input: [["a"]],
      expected: [["a"]],
      description: 'Single character'
    },
    {
      input: [["abc", "bca", "cab", "xyz", "zyx", "yxz"]],
      expected: [["abc", "bca", "cab"], ["xyz", "zyx", "yxz"]],
      description: 'Two distinct anagram groups'
    },
    {
      input: [["listen", "silent", "hello", "world"]],
      expected: [["listen", "silent"], ["hello"], ["world"]],
      description: 'Mixed anagrams and non-anagrams'
    }
  ]}
  functionName="groupAnagrams"
/>

## Solution Explanation

### Approach: Hash Map with Sorted Key

**Time Complexity:** O(n × k log k) where n = number of strings, k = max length of a string
**Space Complexity:** O(n × k)

Use sorted string as hash map key to group anagrams together.

```javascript
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const sorted = str.split('').sort().join('');

    if (!map.has(sorted)) {
      map.set(sorted, []);
    }

    map.get(sorted).push(str);
  }

  return Array.from(map.values());
}
```

**How it works:**

1. Create hash map to store groups
2. For each string:
   - Sort characters to create key
   - Add string to corresponding group
3. Return all groups as array

**Example walkthrough:**

```
strs = ["eat", "tea", "tan"]

"eat" → sorted: "aet" → map = {"aet": ["eat"]}
"tea" → sorted: "aet" → map = {"aet": ["eat", "tea"]}
"tan" → sorted: "ant" → map = {"aet": ["eat", "tea"], "ant": ["tan"]}

Result: [["eat", "tea"], ["tan"]]
```

### Alternative: Character Count Key

**Time:** O(n × k)
**Space:** O(n × k)

Instead of sorting, use character frequency as key:

```javascript
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    const count = new Array(26).fill(0);

    for (const char of str) {
      count[char.charCodeAt(0) - 97]++;
    }

    const key = count.join('#');

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(str);
  }

  return Array.from(map.values());
}
```

## Common Mistakes

❌ Comparing strings directly without sorting
```javascript
if (str1 === str2) // Won't detect anagrams
```

✅ Sort strings to compare
```javascript
const sorted1 = str1.split('').sort().join('');
const sorted2 = str2.split('').sort().join('');
if (sorted1 === sorted2) // Correctly detects anagrams
```

## Interview Tips

**When discussing:**
1. Start with hash map + sorting approach
2. Explain why sorting creates consistent keys
3. Mention O(n × k log k) complexity
4. Consider character count optimization for O(n × k)
5. Handle edge cases: empty strings, single characters

**Follow-up questions:**
- What if strings contain Unicode? → Use character count approach
- How to optimize for very long strings? → Character count is better
- Space constraints? → In-place grouping difficult, hash map needed
```

**Step 2: Test locally**

```bash
npm run start
```

Navigate to: http://localhost:3000/docs/Algorithms/arrays-hashing/group-anagrams

Expected: Problem renders, editor works, tests pass

**Step 3: Commit**

```bash
git add docs/Algorithms/arrays-hashing/group-anagrams.mdx
git commit -m "feat: add Group Anagrams problem (Easy)

- Hash map with sorted string key approach
- Character count alternative solution
- 5 comprehensive test cases"
```

### Task 4: Create Top K Frequent Elements (Medium)

**Files:**
- Create: `docs/Algorithms/arrays-hashing/top-k-frequent-elements.mdx`

**Step 1: Create problem file**

Create `docs/Algorithms/arrays-hashing/top-k-frequent-elements.mdx`:

```mdx
---
sidebar_position: 9
difficulty: Medium
tags: [arrays, hash-table, sorting, heap, amazon, meta]
leetcode_url: https://leetcode.com/problems/top-k-frequent-elements/
companies: [Amazon, Meta, Google, Microsoft, Apple]
pattern: "Arrays & Hashing"
---

import AlgorithmProblem from '@site/src/components/AlgorithmProblem';

# Top K Frequent Elements

<AlgorithmProblem
  title="Top K Frequent Elements"
  difficulty="Medium"
  description={`
<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return the <code>k</code> most frequent elements. You may return the answer in <strong>any order</strong>.</p>
<h4>Constraints:</h4>
<ul>
  <li>1 ≤ nums.length ≤ 10<sup>5</sup></li>
  <li>-10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup></li>
  <li>k is in the range [1, number of unique elements]</li>
  <li>It is <strong>guaranteed</strong> that the answer is <strong>unique</strong>.</li>
</ul>
<p><strong>Follow up:</strong> Your algorithm's time complexity must be better than O(n log n).</p>
`}
  examples={[
    {
      input: 'nums = [1,1,1,2,2,3], k = 2',
      output: '[1,2]',
      explanation: '1 appears 3 times, 2 appears 2 times, 3 appears 1 time. Top 2 are [1,2].'
    },
    {
      input: 'nums = [1], k = 1',
      output: '[1]'
    }
  ]}
  starterCode={`function topKFrequent(nums, k) {
  // Write your code here

}`}
  solution={`function topKFrequent(nums, k) {
  // Bucket sort approach: O(n) time
  const freqMap = new Map();

  // Count frequencies
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Create buckets: index = frequency
  const buckets = Array(nums.length + 1).fill(null).map(() => []);

  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // Collect top k from highest frequency
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}`}
  testCases={[
    {
      input: [[1,1,1,2,2,3], 2],
      expected: [1,2],
      description: 'Basic case with clear top k'
    },
    {
      input: [[1], 1],
      expected: [1],
      description: 'Single element'
    },
    {
      input: [[1,2], 2],
      expected: [1,2],
      description: 'All elements have same frequency'
    },
    {
      input: [[4,4,4,3,3,2,2,2,1], 2],
      expected: [4,2],
      description: 'Multiple frequencies, k=2'
    },
    {
      input: [[-1,-1,-1,0,0,3], 2],
      expected: [-1,0],
      description: 'Negative numbers'
    }
  ]}
  functionName="topKFrequent"
/>

## Solution Explanation

### Approach 1: Sorting (Not Optimal)

**Time:** O(n log n)
**Space:** O(n)

```javascript
function topKFrequent(nums, k) {
  const freqMap = new Map();

  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  return Array.from(freqMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(entry => entry[0]);
}
```

**Why not optimal?** Sorting is O(n log n), violates follow-up requirement.

### Approach 2: Bucket Sort (Optimal) ✅

**Time:** O(n)
**Space:** O(n)

```javascript
function topKFrequent(nums, k) {
  const freqMap = new Map();

  // Step 1: Count frequencies
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Step 2: Create frequency buckets
  const buckets = Array(nums.length + 1).fill(null).map(() => []);

  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // Step 3: Collect top k
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}
```

**How it works:**

1. **Count frequencies** using hash map
2. **Create buckets** where index = frequency
3. **Iterate from highest frequency** to collect top k

**Example walkthrough:**

```
nums = [1,1,1,2,2,3], k = 2

Step 1: freqMap = {1: 3, 2: 2, 3: 1}

Step 2: buckets
  Index 0: []
  Index 1: [3]      (3 appears 1 time)
  Index 2: [2]      (2 appears 2 times)
  Index 3: [1]      (1 appears 3 times)
  ...

Step 3: Iterate from i=3 downward
  i=3: add [1], result = [1]
  i=2: add [2], result = [1,2]
  k=2 reached, return [1,2]
```

## Common Mistakes

❌ Using sorting (violates O(n) requirement)
```javascript
freqMap.sort() // O(n log n)
```

✅ Use bucket sort for O(n)
```javascript
const buckets = Array(n + 1).fill(null).map(() => []);
```

❌ Forgetting edge case: k equals array length
```javascript
return result; // Might return more than k
```

✅ Slice to exactly k elements
```javascript
return result.slice(0, k);
```

## Interview Tips

**When discussing:**
1. Start by mentioning sorting approach (O(n log n))
2. Note follow-up requires better complexity
3. Suggest bucket sort for O(n) time
4. Explain bucket index represents frequency
5. Walk through example

**Follow-up questions:**
- What if k > unique elements? → Return all unique elements
- Can we use a heap? → Yes, but O(n log k), not optimal for small k
- What about negative numbers? → Hash map handles them fine
```

**Step 2: Commit**

```bash
git add docs/Algorithms/arrays-hashing/top-k-frequent-elements.mdx
git commit -m "feat: add Top K Frequent Elements (Medium)

- Bucket sort O(n) solution
- Sorting approach comparison
- Handles negative numbers and edge cases"
```

### Task 5-15: Create Remaining Arrays & Hashing Problems

**Note:** Following same pattern as Tasks 3-4, create these problems:

**Easy (5 more):**
5. Product of Array Except Self
6. Valid Sudoku
7. Encode and Decode Strings
8. Longest Consecutive Sequence

**Medium (5):**
9. Longest Substring Without Repeating Characters
10. Longest Repeating Character Replacement
11. Minimum Window Substring
12. String to Integer (atoi)
13. Integer to Roman

**Hard (2):**
14. Trapping Rain Water
15. Substring with Concatenation of All Words

**Each problem follows this structure:**
- Frontmatter with metadata
- AlgorithmProblem component with all required props
- Solution Explanation section (multiple approaches)
- Common Mistakes section
- Interview Tips section
- 5+ test cases

**Commit after each problem:**
```bash
git add docs/Algorithms/arrays-hashing/[problem-name].mdx
git commit -m "feat: add [Problem Name] ([Difficulty])"
```

---

## Batch 2: Two Pointers (8 Problems)

### Task 16: Move valid-palindrome.mdx to two-pointers/

**Files:**
- Move: `docs/Algorithms/valid-palindrome.mdx` → `docs/Algorithms/two-pointers/valid-palindrome.mdx`
- Modify: Frontmatter

**Step 1: Move file**

```bash
git mv docs/Algorithms/valid-palindrome.mdx docs/Algorithms/two-pointers/
```

**Step 2: Update frontmatter**

Update `docs/Algorithms/two-pointers/valid-palindrome.mdx`:

```yaml
---
sidebar_position: 1
difficulty: Easy
tags: [two-pointers, string, amazon, microsoft]
leetcode_url: https://leetcode.com/problems/valid-palindrome/
companies: [Amazon, Microsoft, Meta, Google]
pattern: "Two Pointers"
---
```

**Step 3: Commit**

```bash
git add docs/Algorithms/two-pointers/
git commit -m "refactor: move valid-palindrome to two-pointers category"
```

### Task 17-23: Create Remaining Two Pointers Problems

**Easy (3 more):**
17. Two Sum II - Input Array Is Sorted
18. Remove Duplicates from Sorted Array
19. Move Zeroes

**Medium (3):**
20. Three Sum
21. Container With Most Water
22. Sort Colors

**Hard (1):**
23. Trapping Rain Water (Two Pointer approach)

---

## Batch 3: Sliding Window (8 Problems)

### Task 24-31: Create Sliding Window Problems

**Easy (4):**
24. Maximum Average Subarray I
25. Contains Duplicate II
26. Minimum Size Subarray Sum
27. Maximum Number of Vowels in Substring

**Medium (3):**
28. Longest Substring Without Repeating Characters (if not in Batch 1)
29. Permutation in String
30. Find All Anagrams in String

**Hard (1):**
31. Minimum Window Substring

---

## Batch 4: Stack (8 Problems)

### Task 32-39: Create Stack Problems

**Easy (4):**
32. Valid Parentheses
33. Min Stack
34. Implement Queue using Stacks
35. Backspace String Compare

**Medium (3):**
36. Daily Temperatures
37. Evaluate Reverse Polish Notation
38. Decode String

**Hard (1):**
39. Largest Rectangle in Histogram

---

## Batch 5: Binary Search (8 Problems)

### Task 40-47: Create Binary Search Problems

**Easy (4):**
40. Binary Search
41. Search Insert Position
42. First Bad Version
43. Valid Perfect Square

**Medium (3):**
44. Find First and Last Position of Element in Sorted Array
45. Search in Rotated Sorted Array
46. Find Minimum in Rotated Sorted Array

**Hard (1):**
47. Median of Two Sorted Arrays

---

## Batch 6: Linked Lists (10 Problems)

### Task 48-57: Create Linked List Problems

**Easy (5):**
48. Reverse Linked List
49. Merge Two Sorted Lists
50. Linked List Cycle
51. Remove Duplicates from Sorted List
52. Intersection of Two Linked Lists

**Medium (4):**
53. Add Two Numbers
54. Remove Nth Node From End of List
55. Reorder List
56. Copy List with Random Pointer

**Hard (1):**
57. Merge k Sorted Lists

---

## Batch 7: Trees (12 Problems)

### Task 58-69: Create Tree Problems

**Easy (6):**
58. Invert Binary Tree
59. Maximum Depth of Binary Tree
60. Same Tree
61. Symmetric Tree
62. Balanced Binary Tree
63. Diameter of Binary Tree

**Medium (4):**
64. Validate Binary Search Tree
65. Lowest Common Ancestor of BST
66. Binary Tree Level Order Traversal
67. Construct Binary Tree from Preorder and Inorder

**Hard (2):**
68. Binary Tree Maximum Path Sum
69. Serialize and Deserialize Binary Tree

---

## Batch 8: Graphs (10 Problems)

### Task 70-79: Create Graph Problems

**Easy (4):**
70. Number of Islands
71. Clone Graph
72. Pacific Atlantic Water Flow
73. Course Schedule

**Medium (4):**
74. Number of Connected Components
75. Graph Valid Tree
76. Word Ladder
77. Rotting Oranges

**Hard (2):**
78. Alien Dictionary
79. Longest Consecutive Sequence

---

## Batch 9: Dynamic Programming (12 Problems)

### Task 80-91: Create Dynamic Programming Problems

**Easy (5):**
80. Climbing Stairs
81. House Robber
82. Maximum Subarray
83. Min Cost Climbing Stairs
84. Best Time to Buy and Sell Stock

**Medium (4):**
85. Coin Change
86. Longest Increasing Subsequence
87. Longest Common Subsequence
88. Word Break

**Hard (3):**
89. Edit Distance
90. Regular Expression Matching
91. Burst Balloons

---

## Batch 10: Backtracking & Greedy (9 Problems)

### Task 92-100: Create Backtracking & Greedy Problems

**Easy (6):**
92. Letter Combinations of Phone Number
93. Subsets
94. Permutations
95. Combinations
96. Generate Parentheses
97. Palindrome Partitioning

**Medium (2):**
98. Word Search
99. N-Queens

**Hard (1):**
100. N-Queens II

---

## Final Tasks

### Task 101: Update Main Algorithms Index

**Files:**
- Modify: `docs/Algorithms/introduction.md`

**Step 1: Update introduction**

Add overview of all 100 problems organized by category with links to each section.

**Step 2: Commit**

```bash
git add docs/Algorithms/introduction.md
git commit -m "docs: update Algorithms introduction with 100 problems overview"
```

### Task 102: Build and Verify All Problems

**Step 1: Build project**

```bash
npm run build
```

Expected: Build succeeds with no errors

**Step 2: Start dev server**

```bash
npm run start
```

**Step 3: Spot check 10-15 problems**

Navigate to random problems, verify:
- Problem renders correctly
- Code editor loads
- Run button executes tests
- Solution button works
- All content displays properly

**Step 4: Run typecheck**

```bash
npm run typecheck
```

Expected: No TypeScript errors

### Task 103: Final Commit and Push

**Step 1: Add any remaining changes**

```bash
git add .
git status
```

**Step 2: Final commit**

```bash
git commit -m "feat: complete 100 LeetCode problems implementation

- 50 Easy, 35 Medium, 15 Hard problems
- Organized into 10 algorithm pattern categories
- Full interactive code editor with test cases
- Comprehensive explanations and interview tips
- Company tags and difficulty indicators"
```

**Step 3: Push to remote**

```bash
git push origin feature/100-leetcode-problems
```

---

## Problem Template Reference

For tasks 5-100, use this template structure:

```mdx
---
sidebar_position: <number>
difficulty: Easy|Medium|Hard
tags: [relevant, tags, company1, company2]
leetcode_url: https://leetcode.com/problems/problem-slug/
companies: [Company1, Company2, Company3]
pattern: "Category Name"
---

import AlgorithmProblem from '@site/src/components/AlgorithmProblem';

# Problem Title

<AlgorithmProblem
  title="Problem Title"
  difficulty="Easy|Medium|Hard"
  description={`
<p>Problem description with HTML formatting</p>
<h4>Constraints:</h4>
<ul><li>Constraint 1</li></ul>
`}
  examples={[
    {
      input: 'example input',
      output: 'example output',
      explanation: 'optional explanation'
    }
  ]}
  starterCode={`function problemName(params) {
  // Write your code here

}`}
  solution={`function problemName(params) {
  // Optimal solution
}`}
  testCases={[
    {
      input: [[param1], [param2]],
      expected: expectedValue,
      description: 'test description'
    }
    // 5-7 total test cases
  ]}
  functionName="problemName"
/>

## Solution Explanation

### Approach 1: Brute Force
[explanation]

### Approach 2: Optimal ✅
[explanation with code, complexity analysis, walkthrough]

## Common Mistakes
[mistakes and corrections]

## Interview Tips
[tips and follow-ups]
```

---

## Execution Notes

- **Total time estimate:** 20-30 hours for all 100 problems
- **Batch size:** Complete 1-2 categories per day
- **Review checkpoints:** After each batch (10-15 problems), test locally
- **Commit frequency:** After each problem (100+ commits total)
- **Testing:** Spot check 2-3 problems per batch in browser

## Skills to Reference

- @superpowers:verification-before-completion before marking batches complete
- @superpowers:systematic-debugging if problems don't render correctly
- @superpowers:test-driven-development when writing test cases
