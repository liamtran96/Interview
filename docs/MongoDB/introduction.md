---
sidebar_position: 1
---

# MongoDB Fundamentals

## What is MongoDB?

MongoDB is a **NoSQL document database** that stores data in flexible, JSON-like documents. It's designed for scalability, high performance, and developer productivity.

## Key Features

### 1. Document-Oriented

```javascript
// Instead of rows and columns, MongoDB uses documents
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "New York"
  },
  "hobbies": ["reading", "gaming"]
}
```

### 2. Flexible Schema

- No strict schema required
- Can add fields without modifying all documents
- Different documents in same collection can have different fields

### 3. Scalable

- Horizontal scaling through sharding
- Replication for high availability
- Handles large volumes of data

## Common Interview Questions

### Q1: What is MongoDB and why use it?

**Answer:**

MongoDB is a NoSQL document database that stores data in JSON-like documents (BSON).

**Advantages:**
- **Flexible schema** - Easy to modify structure
- **Scalable** - Horizontal scaling through sharding
- **Fast** - Document model matches application objects
- **Rich query language** - Powerful aggregation framework
- **No complex JOINs** - Embedded documents

**Use MongoDB when:**
- Schema changes frequently
- Need rapid development
- Handling unstructured data
- Need horizontal scalability
- Working with real-time data

**Avoid MongoDB when:**
- Need complex transactions across multiple documents (though transactions are now supported)
- Require strict ACID guarantees for all operations
- Heavy on complex joins

### Q2: What is the difference between SQL and MongoDB?

**Answer:**

| SQL (Relational) | MongoDB (Document) |
|------------------|-------------------|
| Tables | Collections |
| Rows | Documents |
| Columns | Fields |
| JOINs | Embedded documents or `$lookup` |
| Fixed schema | Flexible schema |
| Vertical scaling | Horizontal scaling (sharding) |

```sql
-- SQL
SELECT * FROM users WHERE age > 25;
```

```javascript
// MongoDB
db.users.find({ age: { $gt: 25 } })
```

### Q3: What is BSON?

**Answer:**

**BSON** (Binary JSON) is the binary format MongoDB uses to store documents.

**Advantages over JSON:**
- More data types (Date, ObjectId, Binary, etc.)
- Faster to parse
- Size-optimized

```javascript
// JSON has limited types
{
  "date": "2024-01-15" // String
}

// BSON has more types
{
  "_id": ObjectId("507f1f77bcf86cd799439011"), // ObjectId
  "date": ISODate("2024-01-15T10:30:00Z"),    // Actual date
  "data": BinData(0, "...")                    // Binary data
}
```

### Q4: What is a Collection?

**Answer:**

A **Collection** is a group of MongoDB documents, similar to a table in SQL.

- Collections don't enforce a schema
- Documents in a collection can have different fields
- Collections are created implicitly when first document is inserted

```javascript
// Create collection by inserting document
db.users.insertOne({
  name: "John",
  email: "john@example.com"
});
```

## Basic CRUD Operations

### Create (Insert)

```javascript
// Insert one document
db.users.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30
});

// Insert multiple documents
db.users.insertMany([
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 }
]);
```

### Read (Find)

```javascript
// Find all
db.users.find();

// Find with filter
db.users.find({ age: { $gte: 25 } });

// Find one
db.users.findOne({ email: "john@example.com" });

// Projection (select specific fields)
db.users.find(
  { age: { $gt: 25 } },
  { name: 1, email: 1, _id: 0 }
);
```

### Update

```javascript
// Update one document
db.users.updateOne(
  { email: "john@example.com" },
  { $set: { age: 31 } }
);

// Update multiple documents
db.users.updateMany(
  { age: { $lt: 18 } },
  { $set: { minor: true } }
);

// Replace entire document
db.users.replaceOne(
  { email: "john@example.com" },
  { name: "John Doe", email: "john@example.com", age: 32 }
);
```

### Delete

```javascript
// Delete one document
db.users.deleteOne({ email: "john@example.com" });

// Delete multiple documents
db.users.deleteMany({ age: { $lt: 18 } });
```

## Query Operators

### Comparison Operators

```javascript
// $eq - Equal
db.users.find({ age: { $eq: 30 } });

// $ne - Not equal
db.users.find({ age: { $ne: 30 } });

// $gt - Greater than
db.users.find({ age: { $gt: 25 } });

// $gte - Greater than or equal
db.users.find({ age: { $gte: 25 } });

// $lt - Less than
db.users.find({ age: { $lt: 30 } });

// $lte - Less than or equal
db.users.find({ age: { $lte: 30 } });

// $in - Match any value in array
db.users.find({ status: { $in: ["active", "pending"] } });

// $nin - Not in array
db.users.find({ status: { $nin: ["deleted", "banned"] } });
```

### Logical Operators

```javascript
// $and
db.users.find({
  $and: [
    { age: { $gte: 25 } },
    { status: "active" }
  ]
});

// $or
db.users.find({
  $or: [
    { age: { $lt: 18 } },
    { age: { $gt: 65 } }
  ]
});

// $not
db.users.find({ age: { $not: { $gt: 25 } } });

// $nor - None of the conditions are true
db.users.find({
  $nor: [
    { status: "deleted" },
    { age: { $lt: 18 } }
  ]
});
```

### Element Operators

```javascript
// $exists - Field exists
db.users.find({ phone: { $exists: true } });

// $type - Check field type
db.users.find({ age: { $type: "number" } });
```

### Array Operators

```javascript
// $all - Array contains all elements
db.users.find({ hobbies: { $all: ["reading", "gaming"] } });

// $elemMatch - Array element matches condition
db.users.find({
  scores: { $elemMatch: { $gte: 80, $lt: 90 } }
});

// $size - Array size
db.users.find({ hobbies: { $size: 3 } });
```

## Update Operators

```javascript
// $set - Set field value
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { age: 31 } }
);

// $inc - Increment value
db.users.updateOne(
  { _id: ObjectId("...") },
  { $inc: { age: 1 } }
);

// $push - Add to array
db.users.updateOne(
  { _id: ObjectId("...") },
  { $push: { hobbies: "swimming" } }
);

// $pull - Remove from array
db.users.updateOne(
  { _id: ObjectId("...") },
  { $pull: { hobbies: "gaming" } }
);

// $addToSet - Add to array (only if not exists)
db.users.updateOne(
  { _id: ObjectId("...") },
  { $addToSet: { hobbies: "reading" } }
);

// $unset - Remove field
db.users.updateOne(
  { _id: ObjectId("...") },
  { $unset: { phone: "" } }
);
```

## Data Types

```javascript
{
  "_id": ObjectId("507f1f77bcf86cd799439011"), // ObjectId
  "name": "John",                               // String
  "age": 30,                                    // Number (Int32/Int64)
  "price": 19.99,                               // Double
  "active": true,                               // Boolean
  "createdAt": ISODate("2024-01-15"),          // Date
  "data": BinData(0, "..."),                    // Binary
  "items": ["item1", "item2"],                  // Array
  "address": { city: "NYC" },                   // Embedded Document
  "value": null,                                // Null
  "regex": /pattern/i                           // Regular Expression
}
```

## Best Practices

1. **Use _id wisely** - MongoDB auto-generates, but you can provide your own
2. **Limit document size** - Max 16MB per document
3. **Index frequently queried fields** - Improves performance
4. **Embed related data** - Avoid JOINs when possible
5. **Use projections** - Only retrieve needed fields
6. **Handle connection pooling** - Reuse connections
7. **Validate data** - Use schema validation
8. **Monitor performance** - Use profiler and explain()

## Connection with Node.js

### Using MongoDB Driver

```javascript
const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017');

async function main() {
  try {
    await client.connect();
    const db = client.db('myapp');
    const users = db.collection('users');

    // Insert
    await users.insertOne({ name: 'John', age: 30 });

    // Find
    const user = await users.findOne({ name: 'John' });
    console.log(user);
  } finally {
    await client.close();
  }
}

main();
```

### Using Mongoose (ODM)

```javascript
const mongoose = require('mongoose');

// Connect
await mongoose.connect('mongodb://localhost:27017/myapp');

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// Create model
const User = mongoose.model('User', userSchema);

// Use model
const user = new User({ name: 'John', email: 'john@example.com', age: 30 });
await user.save();

const found = await User.findOne({ email: 'john@example.com' });
```

## Interview Coding Challenge

**Question:** Find all active users over 25 with at least one hobby, sorted by age.

**Solution:**

```javascript
db.users.find({
  status: "active",
  age: { $gt: 25 },
  hobbies: { $exists: true, $not: { $size: 0 } }
}).sort({ age: 1 });

// Alternative with $ne
db.users.find({
  status: "active",
  age: { $gt: 25 },
  hobbies: { $ne: [] }
}).sort({ age: 1 });
```

## Key Takeaways

- MongoDB is a NoSQL document database using BSON format
- Collections contain documents (similar to tables and rows)
- Flexible schema - documents can have different fields
- Rich query language with many operators
- CRUD operations: insertOne/Many, find/findOne, updateOne/Many, deleteOne/Many
- Use indexes for better query performance
- Can embed documents or reference them
- Supports transactions (since v4.0)
