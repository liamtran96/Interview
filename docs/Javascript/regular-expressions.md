---
sidebar_position: 16
---

# Regular Expressions

## What are Regular Expressions?

**Regular Expressions (RegEx)** are patterns used to match character combinations in strings. They're powerful tools for searching, replacing, and validating text.

## Creating RegEx

```javascript
// Literal notation
const regex1 = /pattern/flags;

// Constructor
const regex2 = new RegExp('pattern', 'flags');

// Example
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
```

## Common Flags

```javascript
const text = 'Hello World';

// g - Global (find all matches)
text.match(/o/g); // ['o', 'o']

// i - Case insensitive
text.match(/hello/i); // ['Hello']

// m - Multiline
const multiline = 'line1\nline2';
multiline.match(/^line/gm); // ['line', 'line']

// s - Dot matches newline
'a\nb'.match(/a.b/s); // ['a\nb']

// u - Unicode
'😀'.match(/./u); // ['😀']

// y - Sticky (match from lastIndex)
const regex = /a/y;
regex.lastIndex = 1;
'bab'.match(regex); // ['a']
```

## Character Classes

```javascript
// \d - Digit [0-9]
'abc123'.match(/\d+/g); // ['123']

// \w - Word character [a-zA-Z0-9_]
'hello_world123'.match(/\w+/g); // ['hello_world123']

// \s - Whitespace
'hello world'.match(/\s/); // [' ']

// \D - NOT digit
'abc123'.match(/\D+/); // ['abc']

// \W - NOT word character
'hello!world'.match(/\W/); // ['!']

// \S - NOT whitespace
'hello world'.match(/\S+/g); // ['hello', 'world']

// . - Any character (except newline)
'abc'.match(/a.c/); // ['abc']
```

## Quantifiers

```javascript
// * - 0 or more
'aaa'.match(/a*/); // ['aaa']
''.match(/a*/);    // ['']

// + - 1 or more
'aaa'.match(/a+/); // ['aaa']
''.match(/a+/);    // null

// ? - 0 or 1
'color'.match(/colou?r/); // ['color']
'colour'.match(/colou?r/); // ['colour']

// {n} - Exactly n
'aaa'.match(/a{3}/); // ['aaa']

// {n,} - n or more
'aaaa'.match(/a{2,}/); // ['aaaa']

// {n,m} - Between n and m
'aaaa'.match(/a{2,3}/); // ['aaa']
```

## Anchors

```javascript
// ^ - Start of string
'hello world'.match(/^hello/); // ['hello']
'hello world'.match(/^world/); // null

// $ - End of string
'hello world'.match(/world$/); // ['world']
'hello world'.match(/hello$/); // null

// \b - Word boundary
'hello world'.match(/\bhello\b/); // ['hello']
'helloworld'.match(/\bhello\b/); // null

// \B - NOT word boundary
'helloworld'.match(/hello\B/); // ['hello']
```

## Groups and Capturing

```javascript
// () - Capture group
const match = '2024-01-15'.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(match[0]); // '2024-01-15'
console.log(match[1]); // '2024'
console.log(match[2]); // '01'
console.log(match[3]); // '15'

// (?:) - Non-capturing group
'hello'.match(/(?:hel)lo/); // ['hello'] - no group capture

// Named groups
const { year, month, day } = '2024-01-15'.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/).groups;
console.log(year, month, day); // '2024' '01' '15'
```

## Alternation

```javascript
// | - OR
'cat'.match(/cat|dog/); // ['cat']
'dog'.match(/cat|dog/); // ['dog']

// Multiple options
'apple'.match(/apple|banana|orange/); // ['apple']
```

## Lookahead and Lookbehind

```javascript
// (?=) - Positive lookahead
'hello world'.match(/hello(?= world)/); // ['hello'] (followed by ' world')

// (?!) - Negative lookahead
'hello there'.match(/hello(?! world)/); // ['hello'] (NOT followed by ' world')

// (?<=) - Positive lookbehind
'$100'.match(/(?<=\$)\d+/); // ['100'] (preceded by $)

// (?<!) - Negative lookbehind
'€100'.match(/(?<!\$)\d+/); // ['100'] (NOT preceded by $)
```

## Common Methods

### test()

```javascript
const regex = /hello/;
console.log(regex.test('hello world')); // true
console.log(regex.test('goodbye'));     // false
```

### match()

```javascript
const text = 'cat bat rat';

// Without g flag
text.match(/\w+/); // ['cat', index: 0, input: 'cat bat rat']

// With g flag
text.match(/\w+/g); // ['cat', 'bat', 'rat']
```

### matchAll()

```javascript
const text = 'test1 test2 test3';
const regex = /test(\d)/g;

const matches = [...text.matchAll(regex)];
console.log(matches[0]); // ['test1', '1', index: 0, ...]
console.log(matches[1]); // ['test2', '2', index: 6, ...]
```

### replace()

```javascript
// String replacement
'hello world'.replace(/world/, 'there'); // 'hello there'

// Function replacement
'hello world'.replace(/\w+/g, (match) => match.toUpperCase());
// 'HELLO WORLD'

// Using capture groups
'John Doe'.replace(/(\w+) (\w+)/, '$2, $1'); // 'Doe, John'
```

### split()

```javascript
'apple,banana,orange'.split(/,/); // ['apple', 'banana', 'orange']

'one1two2three'.split(/\d/); // ['one', 'two', 'three']
```

## Common Patterns

### Email Validation

```javascript
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

emailRegex.test('user@example.com'); // true
emailRegex.test('invalid.email');    // false
```

### Phone Number

```javascript
const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

phoneRegex.test('(123) 456-7890'); // true
phoneRegex.test('123-456-7890');   // false
```

### URL

```javascript
const urlRegex = /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;

urlRegex.test('https://example.com'); // true
urlRegex.test('http://example.com/path'); // true
```

### Password Strength

```javascript
// At least 8 chars, 1 uppercase, 1 lowercase, 1 number
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

passwordRegex.test('Password123'); // true
passwordRegex.test('weak');        // false
```

### Extract Numbers

```javascript
'Price: $100, Tax: $15'.match(/\d+/g); // ['100', '15']
```

### Remove HTML Tags

```javascript
'<p>Hello</p>'.replace(/<[^>]*>/g, ''); // 'Hello'
```

## Common Interview Questions

### Q1: How do you validate an email address?

**Answer:**

```javascript
function isValidEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

console.log(isValidEmail('test@example.com')); // true
console.log(isValidEmail('invalid'));          // false
```

### Q2: How do you replace all occurrences of a string?

**Answer:**

```javascript
// Using g flag
const text = 'cat cat cat';
text.replace(/cat/g, 'dog'); // 'dog dog dog'

// Using replaceAll (ES2021)
text.replaceAll('cat', 'dog'); // 'dog dog dog'
```

### Q3: How do you extract numbers from a string?

**Answer:**

```javascript
const text = 'I have 2 apples and 5 oranges';

// Method 1: match with g flag
const numbers = text.match(/\d+/g);
console.log(numbers); // ['2', '5']

// Method 2: matchAll
const matches = [...text.matchAll(/\d+/g)];
console.log(matches.map(m => m[0])); // ['2', '5']
```

## Key Takeaways

- RegEx patterns match character combinations
- Flags: g (global), i (case-insensitive), m (multiline)
- Character classes: `\d` digit, `\w` word, `\s` whitespace
- Quantifiers: `*` (0+), `+` (1+), `?` (0-1), `{n}` (exactly n)
- Anchors: `^` start, `$` end, `\b` word boundary
- Groups: `()` capture, `(?:)` non-capture
- Methods: test(), match(), replace(), split()

## Resources

- [MDN Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [RegExr](https://regexr.com/) - Interactive regex tester
- [Regex101](https://regex101.com/) - Regex debugger
