---
sidebar_position: 23
---

# Data Structures in JavaScript

## Array

Built-in ordered collection.

```javascript
const arr = [1, 2, 3, 4, 5];

// Operations
arr.push(6);      // O(1) - Add to end
arr.pop();        // O(1) - Remove from end
arr.unshift(0);   // O(n) - Add to start
arr.shift();      // O(n) - Remove from start
arr[2];           // O(1) - Access by index
```

## Stack (LIFO - Last In First Out)

```javascript
class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.pop();      // 2
stack.peek();     // 1
```

## Queue (FIFO - First In First Out)

```javascript
class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(element) {
    this.items.push(element);
  }

  dequeue() {
    return this.items.shift();
  }

  front() {
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.dequeue();  // 1
queue.front();    // 2
```

## Linked List

```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Add to end - O(n)
  append(data) {
    const newNode = new Node(data);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  // Add to start - O(1)
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }

  // Remove - O(n)
  remove(data) {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
        this.size--;
        return;
      }
      current = current.next;
    }
  }

  // Find - O(n)
  find(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) return current;
      current = current.next;
    }
    return null;
  }

  print() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    console.log(values.join(' -> '));
  }
}

const list = new LinkedList();
list.append(1);
list.append(2);
list.prepend(0);
list.print(); // 0 -> 1 -> 2
```

## Hash Table (Object/Map)

```javascript
class HashTable {
  constructor(size = 50) {
    this.table = new Array(size);
    this.size = size;
  }

  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.size;
    }
    return hash;
  }

  set(key, value) {
    const index = this._hash(key);
    if (!this.table[index]) {
      this.table[index] = [];
    }
    
    // Handle collision with chaining
    this.table[index].push([key, value]);
  }

  get(key) {
    const index = this._hash(key);
    if (!this.table[index]) return undefined;
    
    for (let [k, v] of this.table[index]) {
      if (k === key) return v;
    }
    return undefined;
  }

  remove(key) {
    const index = this._hash(key);
    if (!this.table[index]) return;
    
    this.table[index] = this.table[index].filter(([k]) => k !== key);
  }
}

const ht = new HashTable();
ht.set('name', 'John');
ht.set('age', 30);
console.log(ht.get('name')); // 'John'
```

## Binary Search Tree

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;
    
    while (current) {
      if (value === current.value) return true;
      if (value < current.value) current = current.left;
      else current = current.right;
    }
    
    return false;
  }

  // In-order traversal
  inOrder(node = this.root, result = []) {
    if (node) {
      this.inOrder(node.left, result);
      result.push(node.value);
      this.inOrder(node.right, result);
    }
    return result;
  }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
console.log(bst.search(5));  // true
console.log(bst.inOrder());  // [3, 5, 10, 15]
```

## Graph

```javascript
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1); // Undirected
  }

  // BFS
  bfs(start) {
    const queue = [start];
    const visited = new Set([start]);
    const result = [];

    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  // DFS
  dfs(start) {
    const visited = new Set();
    const result = [];

    const traverse = (vertex) => {
      visited.add(vertex);
      result.push(vertex);

      for (let neighbor of this.adjacencyList[vertex]) {
        if (!visited.has(neighbor)) {
          traverse(neighbor);
        }
      }
    };

    traverse(start);
    return result;
  }
}

const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');
console.log(graph.bfs('A')); // ['A', 'B', 'C']
```

## Key Takeaways

- **Array** - O(1) access, O(n) search
- **Stack** - LIFO, O(1) push/pop
- **Queue** - FIFO, O(1) enqueue, O(n) dequeue
- **Linked List** - O(1) prepend, O(n) search
- **Hash Table** - O(1) average get/set
- **BST** - O(log n) average, O(n) worst
- **Graph** - BFS/DFS traversal

## Resources

- [JavaScript Algorithms](https://github.com/trekhleb/javascript-algorithms)
- [Data Structures Visualizations](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
