---
sidebar_position: 24
---

# Common Algorithms in JavaScript

## Sorting Algorithms

### Bubble Sort - O(n²)

```javascript
function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}

console.log(bubbleSort([5, 2, 8, 1, 9])); // [1, 2, 5, 8, 9]
```

### Quick Sort - O(n log n) average

```javascript
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([5, 2, 8, 1, 9])); // [1, 2, 5, 8, 9]
```

### Merge Sort - O(n log n)

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}

console.log(mergeSort([5, 2, 8, 1, 9])); // [1, 2, 5, 8, 9]
```

## Searching Algorithms

### Binary Search - O(log n)

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  
  return -1;
}

const sorted = [1, 2, 5, 8, 9];
console.log(binarySearch(sorted, 8)); // 3
```

### Linear Search - O(n)

```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

console.log(linearSearch([5, 2, 8, 1, 9], 8)); // 2
```

## String Algorithms

### Reverse String

```javascript
// Method 1: Built-in
const reverse1 = str => str.split('').reverse().join('');

// Method 2: Loop
function reverse2(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(reverse1('hello')); // 'olleh'
```

### Palindrome Check

```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

console.log(isPalindrome('racecar')); // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
```

### Anagram Check

```javascript
function areAnagrams(str1, str2) {
  const normalize = str => str.toLowerCase().split('').sort().join('');
  return normalize(str1) === normalize(str2);
}

console.log(areAnagrams('listen', 'silent')); // true
```

## Array Algorithms

### Two Sum - O(n)

```javascript
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

### Find Maximum

```javascript
function findMax(arr) {
  return Math.max(...arr);
  // Or: arr.reduce((max, num) => Math.max(max, num));
}

console.log(findMax([1, 5, 3, 9, 2])); // 9
```

### Remove Duplicates

```javascript
// Using Set
const removeDuplicates1 = arr => [...new Set(arr)];

// Using filter
const removeDuplicates2 = arr => 
  arr.filter((item, index) => arr.indexOf(item) === index);

console.log(removeDuplicates1([1, 2, 2, 3, 4, 4])); // [1, 2, 3, 4]
```

## Recursion Algorithms

### Factorial

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### Fibonacci

```javascript
// Recursive
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

// With Memoization - O(n)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

console.log(fibMemo(10)); // 55
```

## Matrix Algorithms

### Rotate Matrix 90°

```javascript
function rotateMatrix(matrix) {
  const n = matrix.length;
  
  // Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  
  // Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
  
  return matrix;
}
```

## Key Takeaways

- **Sorting**: Bubble O(n²), Quick/Merge O(n log n)
- **Searching**: Linear O(n), Binary O(log n)
- **Use built-in methods** when possible
- **Optimize with hash maps** for O(1) lookup
- **Memoization** improves recursive algorithms
- **Consider space/time tradeoffs**

## Resources

- [LeetCode](https://leetcode.com/)
- [HackerRank](https://www.hackerrank.com/)
- [JavaScript Algorithms GitHub](https://github.com/trekhleb/javascript-algorithms)
