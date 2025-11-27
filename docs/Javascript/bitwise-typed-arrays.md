---
sidebar_position: 22
---

# Bitwise Operators & Typed Arrays

## Bitwise Operators

Bitwise operators work on 32-bit binary representations of numbers.

### Bitwise AND (`&`)

Returns 1 if both bits are 1.

```javascript
const a = 5;  // 0101
const b = 3;  // 0011
const c = a & b;  // 0001 = 1

console.log(c); // 1
```

**Use Case: Check if number is even/odd**

```javascript
function isEven(n) {
  return (n & 1) === 0;
}

console.log(isEven(4)); // true
console.log(isEven(5)); // false
```

### Bitwise OR (`|`)

Returns 1 if at least one bit is 1.

```javascript
const a = 5;  // 0101
const b = 3;  // 0011
const c = a | b;  // 0111 = 7

console.log(c); // 7
```

**Use Case: Round down to integer**

```javascript
const num = 5.7;
const rounded = num | 0;  // 5

console.log(rounded); // 5
```

### Bitwise XOR (`^`)

Returns 1 if bits are different.

```javascript
const a = 5;  // 0101
const b = 3;  // 0011
const c = a ^ b;  // 0110 = 6

console.log(c); // 6
```

**Use Case: Swap variables without temp**

```javascript
let a = 5;
let b = 3;

a = a ^ b;  // a = 6
b = a ^ b;  // b = 5
a = a ^ b;  // a = 3

console.log(a, b); // 3, 5
```

**Use Case: Find unique number**

```javascript
function findUnique(arr) {
  // [2, 3, 2, 4, 3] → 4
  return arr.reduce((acc, num) => acc ^ num, 0);
}

console.log(findUnique([2, 3, 2, 4, 3])); // 4
```

### Bitwise NOT (`~`)

Inverts all bits.

```javascript
const a = 5;   // 00000000000000000000000000000101
const b = ~a;  // 11111111111111111111111111111010 = -6

console.log(b); // -6
```

**Formula:** `~n = -(n + 1)`

**Use Case: Check if indexOf returns -1**

```javascript
const arr = [1, 2, 3];

// Traditional
if (arr.indexOf(2) !== -1) { }

// With bitwise NOT (shorter)
if (~arr.indexOf(2)) { }  // ~(-1) = 0 (falsy)
```

### Left Shift (`<<`)

Shifts bits left, fills with 0s.

```javascript
const a = 5;   // 0101
const b = a << 1;  // 1010 = 10

console.log(b); // 10
```

**Formula:** `n << x = n * 2^x`

```javascript
5 << 1;  // 5 * 2 = 10
5 << 2;  // 5 * 4 = 20
5 << 3;  // 5 * 8 = 40
```

### Right Shift (`>>`)

Shifts bits right, preserves sign.

```javascript
const a = 20;  // 10100
const b = a >> 1;  // 01010 = 10

console.log(b); // 10
```

**Formula:** `n >> x = Math.floor(n / 2^x)`

```javascript
20 >> 1;  // 20 / 2 = 10
20 >> 2;  // 20 / 4 = 5
20 >> 3;  // 20 / 8 = 2
```

### Zero-fill Right Shift (`>>>`)

Shifts bits right, fills with 0s (unsigned).

```javascript
const a = -5;
const b = a >> 1;   // -3 (preserves sign)
const c = a >>> 1;  // 2147483645 (fills with 0s)

console.log(b); // -3
console.log(c); // 2147483645
```

## Bitwise Tricks

### Check Power of 2

```javascript
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

console.log(isPowerOfTwo(8));  // true  (1000 & 0111 = 0)
console.log(isPowerOfTwo(6));  // false (0110 & 0101 = 0100)
```

### Count Set Bits

```javascript
function countSetBits(n) {
  let count = 0;
  while (n) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

console.log(countSetBits(7));  // 3 (0111 has 3 ones)
```

### Toggle Bit

```javascript
function toggleBit(n, position) {
  return n ^ (1 << position);
}

console.log(toggleBit(5, 1));  // 7  (0101 → 0111)
console.log(toggleBit(7, 1));  // 5  (0111 → 0101)
```

### Get Bit

```javascript
function getBit(n, position) {
  return (n >> position) & 1;
}

console.log(getBit(5, 0));  // 1 (0101 → bit 0 is 1)
console.log(getBit(5, 1));  // 0 (0101 → bit 1 is 0)
```

### Set Bit

```javascript
function setBit(n, position) {
  return n | (1 << position);
}

console.log(setBit(5, 1));  // 7 (0101 → 0111)
```

### Clear Bit

```javascript
function clearBit(n, position) {
  return n & ~(1 << position);
}

console.log(clearBit(7, 1));  // 5 (0111 → 0101)
```

## Typed Arrays

Typed arrays provide arrays of raw binary data.

### TypedArray Types

```javascript
// 8-bit
Int8Array     // -128 to 127
Uint8Array    // 0 to 255
Uint8ClampedArray  // 0 to 255 (clamped)

// 16-bit
Int16Array    // -32,768 to 32,767
Uint16Array   // 0 to 65,535

// 32-bit
Int32Array    // -2,147,483,648 to 2,147,483,647
Uint32Array   // 0 to 4,294,967,295
Float32Array  // 1.2×10^-38 to 3.4×10^38

// 64-bit
Float64Array  // 5.0×10^-324 to 1.8×10^308
BigInt64Array
BigUint64Array
```

### Creating Typed Arrays

```javascript
// From length
const arr1 = new Uint8Array(3);
console.log(arr1); // Uint8Array(3) [0, 0, 0]

// From array
const arr2 = new Uint8Array([1, 2, 3]);
console.log(arr2); // Uint8Array(3) [1, 2, 3]

// From another typed array
const arr3 = new Int16Array(arr2);
console.log(arr3); // Int16Array(3) [1, 2, 3]

// From ArrayBuffer
const buffer = new ArrayBuffer(6);
const arr4 = new Uint16Array(buffer);
console.log(arr4); // Uint16Array(3) [0, 0, 0]
```

### Bounds Checking

```javascript
const arr = new Uint8Array([0, 255]);

arr[0] = 300;  // Wraps: 300 % 256 = 44
arr[1] = -1;   // Wraps: 255

console.log(arr); // Uint8Array(2) [44, 255]
```

**Clamped Array** - values clamped to range

```javascript
const arr = new Uint8ClampedArray([0, 255]);

arr[0] = 300;  // Clamped to 255
arr[1] = -1;   // Clamped to 0

console.log(arr); // Uint8ClampedArray(2) [255, 0]
```

### Performance

```javascript
// Regular array (slower)
const regular = [];
for (let i = 0; i < 1000000; i++) {
  regular.push(i);
}

// Typed array (faster)
const typed = new Int32Array(1000000);
for (let i = 0; i < 1000000; i++) {
  typed[i] = i;
}
```

## ArrayBuffer

**ArrayBuffer** is a raw binary data buffer.

```javascript
// Create 8-byte buffer
const buffer = new ArrayBuffer(8);

console.log(buffer.byteLength); // 8

// Cannot directly access ArrayBuffer
// Must use view (TypedArray or DataView)
```

### Using Multiple Views

```javascript
const buffer = new ArrayBuffer(8);

// View as 8-bit integers
const view1 = new Uint8Array(buffer);
view1[0] = 255;
view1[1] = 128;

// View same buffer as 16-bit integers
const view2 = new Uint16Array(buffer);
console.log(view2[0]); // 32895 (255 + 128*256)
```

## DataView

**DataView** provides flexible, multi-type access to ArrayBuffer.

```javascript
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);

// Write different types at different offsets
view.setInt8(0, 127);     // byte 0: 127
view.setInt16(1, 1000);   // bytes 1-2: 1000
view.setFloat32(3, 3.14); // bytes 3-6: 3.14

// Read values
console.log(view.getInt8(0));     // 127
console.log(view.getInt16(1));    // 1000
console.log(view.getFloat32(3));  // 3.14
```

### Endianness

```javascript
const buffer = new ArrayBuffer(2);
const view = new DataView(buffer);

// Little-endian (default on most systems)
view.setUint16(0, 0x1234, true);
console.log(view.getUint8(0)); // 0x34
console.log(view.getUint8(1)); // 0x12

// Big-endian
view.setUint16(0, 0x1234, false);
console.log(view.getUint8(0)); // 0x12
console.log(view.getUint8(1)); // 0x34
```

## Practical Use Cases

### 1. Image Manipulation

```javascript
// Get image data from canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// imageData.data is Uint8ClampedArray [R, G, B, A, R, G, B, A, ...]
const pixels = imageData.data;

// Convert to grayscale
for (let i = 0; i < pixels.length; i += 4) {
  const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
  pixels[i] = avg;     // Red
  pixels[i + 1] = avg; // Green
  pixels[i + 2] = avg; // Blue
  // pixels[i + 3] is Alpha (unchanged)
}

ctx.putImageData(imageData, 0, 0);
```

### 2. Binary File Parsing

```javascript
async function parseBinaryFile(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const view = new DataView(buffer);

  // Parse header (first 4 bytes)
  const magic = view.getUint32(0);
  const version = view.getUint16(4);

  console.log({ magic, version });
}
```

### 3. WebGL Buffers

```javascript
// Vertex positions
const positions = new Float32Array([
  -1, -1, 0,
   1, -1, 0,
   0,  1, 0
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
```

## Common Interview Questions

### Q1: What are bitwise operators used for?

**Answer:**

Bitwise operators manipulate individual bits in numbers.

**Common uses:**
- **Flags/Permissions**: Store multiple boolean values in one number
- **Performance**: Faster than arithmetic for certain operations
- **Algorithms**: Bit manipulation puzzles, cryptography
- **Low-level operations**: Network protocols, file formats

**Example: Permissions**
```javascript
const READ = 1;    // 001
const WRITE = 2;   // 010
const EXECUTE = 4; // 100

let permissions = READ | WRITE; // 011 (can read and write)

// Check permission
if (permissions & WRITE) {
  console.log('Can write');
}

// Add permission
permissions |= EXECUTE; // 111 (can read, write, execute)

// Remove permission
permissions &= ~WRITE; // 101 (can read and execute)
```

### Q2: What's the difference between TypedArray and regular Array?

**Answer:**

| Feature | TypedArray | Regular Array |
|---------|-----------|---------------|
| **Type** | Fixed type | Any type |
| **Size** | Fixed length | Dynamic |
| **Memory** | Continuous binary | Object references |
| **Performance** | Faster | Slower |
| **Methods** | Limited | Full set |

**TypedArray:**
- Fixed element type (e.g., Int32Array)
- Fixed length
- Backed by ArrayBuffer
- Faster access and less memory

**Regular Array:**
- Can hold any types
- Dynamic length
- More methods (push, pop, etc.)
- Slower, more memory overhead

### Q3: When would you use ArrayBuffer?

**Answer:**

Use ArrayBuffer for:

1. **Binary data handling**: Files, network data, WebSockets
2. **Performance**: Faster than regular arrays
3. **WebGL**: Vertex/texture data
4. **Canvas**: Image manipulation
5. **Web Workers**: Efficient data transfer
6. **File APIs**: Reading/writing binary files

**Example: Transfer data to Web Worker**
```javascript
// Main thread
const buffer = new ArrayBuffer(1000);
worker.postMessage(buffer, [buffer]); // Transfer ownership
```

## Key Takeaways

- **Bitwise operators** - Manipulate bits directly
- **Common tricks** - Even/odd check, power of 2, swap variables
- **TypedArrays** - Fixed-type, high-performance arrays
- **ArrayBuffer** - Raw binary data buffer
- **DataView** - Flexible multi-type buffer access
- **Use cases** - Binary files, WebGL, Canvas, performance-critical code

## Resources

- [MDN Bitwise Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators)
- [MDN Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)
- [MDN ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)
