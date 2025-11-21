# 100 Popular LeetCode Interview Problems - Design Document

**Date:** 2025-11-21
**Status:** Approved
**Author:** Design Session with User

## Overview

Create 100 fully-populated, production-ready algorithm problems based on the most popular LeetCode interview questions. Problems will be organized by algorithm patterns, tagged by company and difficulty, and integrated into the existing Docusaurus-based interview prep site.

## Requirements Summary

- **Format:** Individual MDX files following existing AlgorithmProblem component pattern
- **Content:** Fully populated with complete descriptions, solutions, test cases, and explanations
- **Organization:** Categorized by algorithm/data structure patterns with company and difficulty tags
- **Source:** Real, popular LeetCode problems
- **Distribution:** 50 Easy, 35 Medium, 15 Hard (100 total)
- **Approach:** Topic-based batches with coverage tracking

## Topic Categories & Problem Distribution

### 10 Core Categories (100 problems total)

1. **Arrays & Hashing** - 15 problems (8 Easy, 5 Medium, 2 Hard)
   - Most fundamental category
   - Core patterns: hash maps, frequency counting, prefix sums

2. **Two Pointers** - 8 problems (4 Easy, 3 Medium, 1 Hard)
   - Linear time optimization techniques
   - Common in array/string problems

3. **Sliding Window** - 8 problems (4 Easy, 3 Medium, 1 Hard)
   - Substring/subarray optimization
   - Key for string processing

4. **Stack** - 8 problems (4 Easy, 3 Medium, 1 Hard)
   - LIFO data structure applications
   - Parsing, monotonic stacks

5. **Binary Search** - 8 problems (4 Easy, 3 Medium, 1 Hard)
   - Log(n) search optimization
   - Search space reduction

6. **Linked Lists** - 10 problems (5 Easy, 4 Medium, 1 Hard)
   - Pointer manipulation
   - Classic data structure problems

7. **Trees** - 12 problems (6 Easy, 4 Medium, 2 Hard)
   - Binary trees, BSTs, traversals
   - Recursion and tree properties

8. **Graphs** - 10 problems (4 Easy, 4 Medium, 2 Hard)
   - BFS, DFS, shortest paths
   - More complex data structures

9. **Dynamic Programming** - 12 problems (5 Easy, 4 Medium, 3 Hard)
   - Optimization problems
   - State management and memoization

10. **Backtracking & Greedy** - 9 problems (6 Easy, 2 Medium, 1 Hard)
    - Constraint satisfaction
    - Optimization heuristics

**Total:** 100 problems with 50-35-15 difficulty distribution

## File Structure & Organization

### Directory Structure

```
docs/Algorithms/
├── _category_.json (existing - update for new categories)
├── arrays-hashing/
│   ├── _category_.json
│   ├── two-sum.mdx
│   ├── contains-duplicate.mdx
│   ├── valid-anagram.mdx
│   ├── group-anagrams.mdx
│   └── ... (15 files total)
├── two-pointers/
│   ├── _category_.json
│   ├── valid-palindrome.mdx
│   ├── two-sum-ii.mdx
│   ├── three-sum.mdx
│   └── ... (8 files total)
├── sliding-window/
├── stack/
├── binary-search/
├── linked-lists/
├── trees/
├── graphs/
├── dynamic-programming/
└── backtracking-greedy/
```

### Naming Conventions

- **File names:** `kebab-case-problem-name.mdx` (matches LeetCode URL slugs)
- **Category folders:** lowercase with hyphens
- **Consistency:** Follow existing pattern from `two-sum.mdx`, `contains-duplicate.mdx`

### Metadata Structure

Each MDX file includes frontmatter:

```yaml
---
sidebar_position: <sequential number within category>
difficulty: Easy|Medium|Hard
tags: [arrays, hash-table, google, amazon]
leetcode_url: https://leetcode.com/problems/problem-name/
companies: [Google, Amazon, Meta, Microsoft, Apple]
pattern: "Arrays & Hashing"
---
```

### Category Configuration

Each category folder includes `_category_.json`:

```json
{
  "label": "Arrays & Hashing",
  "position": 1,
  "collapsed": false,
  "link": {
    "type": "generated-index",
    "description": "Problems focusing on array manipulation and hash table usage."
  }
}
```

## Problem Content Structure

Each MDX file follows this comprehensive template:

### 1. Frontmatter
Metadata for filtering, tagging, and organization (shown above)

### 2. AlgorithmProblem Component
```jsx
<AlgorithmProblem
  title="Problem Name"
  difficulty="Easy|Medium|Hard"
  description={`
    <p>Rich HTML description of the problem</p>
    <h4>Constraints:</h4>
    <ul><li>Constraint 1</li></ul>
  `}
  examples={[
    {
      input: 'nums = [1,2,3]',
      output: '6',
      explanation: 'Optional explanation'
    }
  ]}
  starterCode={`function problemName(params) {
    // Write your code here
  }`}
  solution={`function problemName(params) {
    // Optimal solution implementation
  }`}
  testCases={[
    {
      input: [[1,2,3]],
      expected: 6,
      description: 'Basic case'
    }
    // 5-7 test cases total
  ]}
  functionName="problemName"
/>
```

### 3. Solution Explanation Section
- **Multiple approaches:** Brute force → Optimized → Optimal
- **Complexity analysis:** Time and space for each approach
- **Step-by-step walkthrough:** How the optimal solution works
- **Example visualization:** Walk through test case execution
- **Code examples:** Clear, commented implementations

### 4. Common Mistakes Section
- Typical errors developers make
- Wrong approach vs correct approach
- Edge cases to watch for

### 5. Interview Tips Section
- How to discuss the problem with interviewer
- Follow-up questions that might be asked
- Related problems and variations
- Key insights to mention

## Generation Process & Workflow

### Three-Phase Approach

**Phase 1: Foundation (Batches 1-3, ~31 problems)**
- Batch 1: Arrays & Hashing (15 problems)
- Batch 2: Two Pointers + Sliding Window (16 problems)
- Focus: Core fundamentals, most common interview patterns

**Phase 2: Data Structures (Batches 4-6, ~30 problems)**
- Batch 4: Stack + Binary Search (16 problems)
- Batch 5: Linked Lists (10 problems)
- Batch 6: Trees (12 problems)
- Focus: Essential data structure manipulation

**Phase 3: Advanced (Batches 7-10, ~39 problems)**
- Batch 7: Graphs (10 problems)
- Batch 8: Dynamic Programming Part 1 (6 problems)
- Batch 9: Dynamic Programming Part 2 (6 problems)
- Batch 10: Backtracking & Greedy (9 problems)
- Focus: Complex algorithms, harder problems

### Per-Batch Workflow

For each batch:

1. **Problem Selection**
   - Identify most popular LeetCode problems for the category
   - Ensure difficulty distribution matches target (Easy-heavy)
   - Include mix of companies

2. **Content Generation**
   - Create all MDX files for the batch
   - Follow template structure exactly
   - Include complete, working solutions
   - Write comprehensive explanations

3. **Category Setup**
   - Create/update `_category_.json` for folder
   - Set sidebar position and description
   - Configure proper ordering

4. **Verification**
   - Run local Docusaurus dev server
   - Manually test 2-3 sample problems in the editor
   - Verify test cases pass with solution code
   - Check rendering and navigation

5. **Git Commit**
   - Commit batch to git before moving to next
   - Clear commit message: "Add [Category] problems (Batch N)"
   - Provides rollback point if needed

## Quality Assurance & Standards

### Code Validation

Every problem must have:

- **Valid JavaScript:** Solution code runs without syntax errors
- **Passing tests:** All test cases pass with provided solution
- **Proper signature:** Starter code matches function name and parameters
- **Consistent naming:** Function name matches between component prop and code

### Content Completeness Checklist

- [ ] Clear problem description with constraints
- [ ] At least 2 examples (preferably 3-4)
- [ ] Minimum 5 test cases covering:
  - Basic/happy path
  - Edge cases (empty, single element, etc.)
  - Negative numbers (if applicable)
  - Large inputs (performance test)
  - Boundary conditions
- [ ] Time and space complexity documented
- [ ] At least 2 approaches explained (brute force + optimal minimum)
- [ ] Common mistakes section included
- [ ] Interview tips section included

### Company & Pattern Tags

**Company Tags:**
- Based on real LeetCode frequency data
- Primary companies: Google, Amazon, Meta, Microsoft, Apple, Netflix, Bloomberg
- Include 2-4 companies per problem (most frequent)

**Pattern Tags:**
- Primary pattern: matches category (e.g., "arrays-hashing")
- Related concepts: specific techniques used (e.g., "two-pointers", "sliding-window")
- Algorithm tags: data structures/algorithms (e.g., "hash-table", "binary-search")

**Example:**
```yaml
tags: [arrays, hash-table, two-pointers, google, amazon]
companies: [Google, Amazon, Meta, Microsoft]
pattern: "Arrays & Hashing"
```

### Sidebar Positioning

Within each category:
- Easy problems first (positions 1-N)
- Medium problems next (positions N+1-M)
- Hard problems last (positions M+1-end)

This ensures logical progression for learners.

### Verification Process

After each batch:

1. **Local Testing**
   ```bash
   npm run start
   ```
   - Check Docusaurus renders correctly
   - Navigate to new category
   - Verify sidebar organization

2. **Spot Check (2-3 problems per batch)**
   - Open problem in browser
   - Write simple solution in editor
   - Click "Run" button
   - Verify test results display correctly
   - Check solution toggle works

3. **Content Review**
   - Skim descriptions for clarity
   - Check code formatting
   - Verify examples make sense

## Technical Considerations

### AlgorithmProblem Component

All problems use the existing component at:
```
src/components/AlgorithmProblem.tsx
```

No modifications needed to component. It supports:
- Monaco editor (VS Code editor)
- Test case execution with visual results
- Solution toggle
- Side-by-side layout (problem | code)

### Test Case Format

```javascript
testCases={[
  {
    input: [[param1], [param2]], // Array of parameter values
    expected: expectedOutput,     // Expected return value
    description: 'Human readable description'
  }
]}
```

**Important:**
- `input` is array of arrays: one array per function parameter
- Single parameter: `input: [[1, 2, 3]]`
- Multiple parameters: `input: [[1, 2, 3], 5]`
- Comparison uses `JSON.stringify()` for deep equality

### Docusaurus Integration

- MDX files in `docs/Algorithms/` auto-generate pages
- Sidebar configured via `_category_.json` files
- Tags create filterable tag pages
- Frontmatter controls SEO and metadata

## Success Criteria

At completion, the project will have:

- ✅ 100 fully-functional algorithm problems
- ✅ Problems organized into 10 logical categories
- ✅ 50 Easy, 35 Medium, 15 Hard difficulty split
- ✅ Every problem has working code editor with tests
- ✅ Comprehensive explanations and interview tips for each
- ✅ Company tags for targeted interview prep
- ✅ Proper navigation and sidebar organization
- ✅ All code tested and verified to run correctly

## Next Steps

1. **Set up isolated git worktree** (using superpowers:using-git-worktrees skill)
2. **Create detailed implementation plan** (using superpowers:writing-plans skill)
3. **Execute in batches** following the 10-batch structure outlined above
4. **Review and merge** once all 100 problems are complete

## References

- Existing problems: `docs/Algorithms/two-sum.mdx`, `contains-duplicate.mdx`
- Component: `src/components/AlgorithmProblem.tsx`
- Template: `docs/Algorithms/TEMPLATE.mdx`
- LeetCode: https://leetcode.com/problemset/all/
