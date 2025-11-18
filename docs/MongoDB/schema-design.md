---
sidebar_position: 3
---

# MongoDB Schema Design and Best Practices

## Introduction to MongoDB Schema Design

Unlike relational databases with strict schemas, MongoDB offers **flexible, document-based schema design**. Proper schema design is crucial for performance and maintainability.

:::info Schema Design Philosophy
Design your schema based on **how your application queries and uses data**, not just how data is structured.
:::

## Document Structure

### Basic Document Example

```javascript
// User document
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "johndoe",
  email: "john@example.com",
  profile: {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA"
    }
  },
  interests: ["coding", "music", "travel"],
  createdAt: ISODate("2025-01-01T00:00:00Z"),
  updatedAt: ISODate("2025-01-15T10:30:00Z")
}
```

### Data Types

```javascript
{
  // String
  name: "John Doe",

  // Number
  age: 30,
  price: 99.99,

  // Boolean
  isActive: true,

  // Date
  createdAt: ISODate("2025-01-01T00:00:00Z"),

  // ObjectId
  _id: ObjectId("507f1f77bcf86cd799439011"),
  userId: ObjectId("507f1f77bcf86cd799439012"),

  // Array
  tags: ["mongodb", "database", "nosql"],

  // Embedded Document
  address: {
    street: "123 Main St",
    city: "New York"
  },

  // Array of Documents
  comments: [
    { user: "Alice", text: "Great post!", date: ISODate("2025-01-02") },
    { user: "Bob", text: "Thanks!", date: ISODate("2025-01-03") }
  ],

  // Null
  middleName: null,

  // Binary Data
  profilePicture: BinData(0, "base64encodeddata")
}
```

## Embedding vs Referencing

### Embedding (Denormalization)

**Embed when:**
- One-to-one relationships
- One-to-few relationships
- Data is accessed together frequently
- Performance is priority

```javascript
// Embedding example: Blog post with comments
{
  _id: ObjectId("..."),
  title: "MongoDB Schema Design",
  content: "Content goes here...",
  author: {
    _id: ObjectId("..."),
    name: "John Doe",
    email: "john@example.com"
  },
  comments: [
    {
      _id: ObjectId("..."),
      user: "Alice",
      text: "Great article!",
      date: ISODate("2025-01-01")
    },
    {
      _id: ObjectId("..."),
      user: "Bob",
      text: "Very helpful!",
      date: ISODate("2025-01-02")
    }
  ],
  tags: ["mongodb", "database", "nosql"],
  createdAt: ISODate("2025-01-01")
}
```

**Advantages:**
- ✅ Single query to retrieve all data
- ✅ Better performance for reads
- ✅ Atomic updates

**Disadvantages:**
- ❌ Document size limit (16MB)
- ❌ Data duplication
- ❌ Harder to update embedded data

### Referencing (Normalization)

**Reference when:**
- One-to-many relationships
- Many-to-many relationships
- Data is accessed independently
- Embedded data would cause duplication

```javascript
// Referencing example: User and Orders

// Users collection
{
  _id: ObjectId("user1"),
  name: "John Doe",
  email: "john@example.com"
}

// Orders collection
{
  _id: ObjectId("order1"),
  userId: ObjectId("user1"), // Reference to user
  items: [
    { productId: ObjectId("prod1"), quantity: 2, price: 99.99 },
    { productId: ObjectId("prod2"), quantity: 1, price: 49.99 }
  ],
  total: 249.97,
  status: "shipped",
  createdAt: ISODate("2025-01-01")
},
{
  _id: ObjectId("order2"),
  userId: ObjectId("user1"), // Reference to same user
  items: [
    { productId: ObjectId("prod3"), quantity: 1, price: 149.99 }
  ],
  total: 149.99,
  status: "pending",
  createdAt: ISODate("2025-01-05")
}
```

**Query with $lookup (join):**
```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" }
])
```

**Advantages:**
- ✅ No data duplication
- ✅ Smaller documents
- ✅ Easier updates
- ✅ No 16MB limit

**Disadvantages:**
- ❌ Multiple queries or $lookup (slower)
- ❌ No atomic updates across collections

## Schema Patterns

### 1. Attribute Pattern

**Problem:** Documents with many similar fields but rarely queried together.

```javascript
// ❌ Bad: Too many fields
{
  _id: ObjectId("..."),
  name: "iPhone 15",
  category: "Electronics",
  screenSize: "6.1 inches",
  storage: "256GB",
  color: "Blue",
  weight: "171g",
  // ... 50+ more attributes
}

// ✓ Good: Use attributes array
{
  _id: ObjectId("..."),
  name: "iPhone 15",
  category: "Electronics",
  attributes: [
    { key: "screenSize", value: "6.1 inches" },
    { key: "storage", value: "256GB" },
    { key: "color", value: "Blue" },
    { key: "weight", value: "171g" }
  ]
}
```

**Create index:**
```javascript
db.products.createIndex({ "attributes.key": 1, "attributes.value": 1 })
```

### 2. Bucket Pattern

**Problem:** Time-series data with many small documents.

```javascript
// ❌ Bad: One document per measurement
{ sensorId: "sensor1", temp: 20, timestamp: ISODate("2025-01-01T00:00:00Z") }
{ sensorId: "sensor1", temp: 21, timestamp: ISODate("2025-01-01T00:01:00Z") }
// ... thousands more

// ✓ Good: Bucket by time period
{
  _id: ObjectId("..."),
  sensorId: "sensor1",
  date: ISODate("2025-01-01T00:00:00Z"),
  measurements: [
    { temp: 20, timestamp: ISODate("2025-01-01T00:00:00Z") },
    { temp: 21, timestamp: ISODate("2025-01-01T00:01:00Z") },
    { temp: 22, timestamp: ISODate("2025-01-01T00:02:00Z") }
    // ... hourly measurements
  ],
  count: 60,
  avgTemp: 21.5,
  minTemp: 18,
  maxTemp: 24
}
```

**Benefits:**
- Fewer documents (better index performance)
- Pre-calculated aggregations
- Easier to query time ranges

### 3. Computed Pattern

**Problem:** Expensive calculations performed frequently.

```javascript
// ✓ Store pre-calculated values
{
  _id: ObjectId("..."),
  productId: ObjectId("..."),
  reviews: [
    { user: "Alice", rating: 5, text: "Excellent!" },
    { user: "Bob", rating: 4, text: "Good" },
    { user: "Charlie", rating: 5, text: "Perfect!" }
  ],
  // Pre-calculated values
  totalReviews: 3,
  averageRating: 4.67,
  ratingDistribution: {
    5: 2,
    4: 1,
    3: 0,
    2: 0,
    1: 0
  }
}
```

**Update with aggregation:**
```javascript
db.products.updateOne(
  { _id: productId },
  {
    $push: { reviews: newReview },
    $inc: {
      totalReviews: 1,
      [`ratingDistribution.${newReview.rating}`]: 1
    }
  }
)

// Recalculate average
const product = db.products.findOne({ _id: productId })
db.products.updateOne(
  { _id: productId },
  { $set: { averageRating: calculateAverage(product.reviews) } }
)
```

### 4. Subset Pattern

**Problem:** Large arrays that are rarely fully accessed.

```javascript
// ❌ Bad: Store all reviews in single document
{
  _id: ObjectId("..."),
  productId: ObjectId("..."),
  reviews: [
    // ... 10,000 reviews (approaching 16MB limit)
  ]
}

// ✓ Good: Store subset + recent reviews
{
  _id: ObjectId("..."),
  productId: ObjectId("..."),
  totalReviews: 10000,
  averageRating: 4.5,
  recentReviews: [
    // Most recent 10-20 reviews
    { user: "Alice", rating: 5, text: "Great!", date: ISODate("2025-01-15") },
    { user: "Bob", rating: 4, text: "Good", date: ISODate("2025-01-14") }
  ]
}

// Separate collection for all reviews
// reviews collection
{
  _id: ObjectId("..."),
  productId: ObjectId("..."),
  user: "Alice",
  rating: 5,
  text: "Great!",
  date: ISODate("2025-01-15")
}
```

### 5. Extended Reference Pattern

**Problem:** Frequent joins for commonly accessed fields.

```javascript
// ❌ Bad: Always need $lookup
// orders collection
{
  _id: ObjectId("..."),
  userId: ObjectId("user1") // Need to lookup user details every time
}

// ✓ Good: Store frequently accessed fields
{
  _id: ObjectId("..."),
  userId: ObjectId("user1"),
  // Embed frequently accessed user fields
  userInfo: {
    name: "John Doe",
    email: "john@example.com"
  },
  items: [...],
  total: 249.97
}
```

## Indexing

### Creating Indexes

```javascript
// Single field index
db.users.createIndex({ email: 1 }) // 1 = ascending, -1 = descending

// Compound index
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Unique index
db.users.createIndex({ email: 1 }, { unique: true })

// Sparse index (only index documents with the field)
db.users.createIndex({ phoneNumber: 1 }, { sparse: true })

// TTL index (auto-delete after expiration)
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 } // 1 hour
)

// Text index (full-text search)
db.articles.createIndex({ title: "text", content: "text" })

// Geospatial index
db.places.createIndex({ location: "2dsphere" })

// Partial index (index subset of documents)
db.orders.createIndex(
  { userId: 1, createdAt: -1 },
  { partialFilterExpression: { status: { $eq: "pending" } } }
)
```

### Index Types

**1. Single Field Index:**
```javascript
db.users.createIndex({ email: 1 })

// Query uses index
db.users.find({ email: "john@example.com" })
```

**2. Compound Index:**
```javascript
db.orders.createIndex({ userId: 1, status: 1, createdAt: -1 })

// These queries use the index
db.orders.find({ userId: ObjectId("...") })
db.orders.find({ userId: ObjectId("..."), status: "shipped" })
db.orders.find({ userId: ObjectId("..."), status: "shipped" }).sort({ createdAt: -1 })

// This query does NOT fully use the index (skips userId)
db.orders.find({ status: "shipped" })
```

**Index Prefix Rule:** Compound indexes can be used for queries on leading fields.

**3. Multikey Index (Arrays):**
```javascript
db.articles.createIndex({ tags: 1 })

// Query uses index
db.articles.find({ tags: "mongodb" })
db.articles.find({ tags: { $in: ["mongodb", "database"] } })
```

**4. Text Index:**
```javascript
db.articles.createIndex({ title: "text", content: "text" })

// Full-text search
db.articles.find({ $text: { $search: "mongodb schema design" } })

// With score
db.articles.find(
  { $text: { $search: "mongodb" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

### Index Performance

```javascript
// Check if query uses index
db.orders.find({ userId: ObjectId("...") }).explain("executionStats")

// View all indexes
db.users.getIndexes()

// Drop index
db.users.dropIndex("email_1")

// Check index size
db.users.stats()
```

**Index Best Practices:**
1. Create indexes for frequently queried fields
2. Use compound indexes for multiple fields
3. Limit number of indexes (slows writes)
4. Use covered queries (query only indexed fields)
5. Monitor index usage with explain()

## Transactions

MongoDB supports **multi-document ACID transactions** for data consistency.

### Using Transactions

```javascript
const session = db.getMongo().startSession()

session.startTransaction()

try {
  const ordersCollection = session.getDatabase('shop').orders
  const productsCollection = session.getDatabase('shop').products

  // Insert order
  ordersCollection.insertOne({
    userId: ObjectId("..."),
    items: [{ productId: ObjectId("prod1"), quantity: 2 }],
    total: 199.98,
    status: "pending"
  }, { session })

  // Update product stock
  productsCollection.updateOne(
    { _id: ObjectId("prod1") },
    { $inc: { stock: -2 } },
    { session }
  )

  // Commit transaction
  session.commitTransaction()
  console.log("Transaction committed successfully")
} catch (err) {
  // Rollback on error
  session.abortTransaction()
  console.error("Transaction aborted:", err)
} finally {
  session.endSession()
}
```

### Transaction Best Practices

1. **Keep transactions short** - Hold locks for minimal time
2. **Limit operations** - Fewer operations = better performance
3. **Use read concern/write concern** - Ensure data consistency
4. **Handle errors** - Always abort on failure
5. **Avoid long-running transactions** - Can impact performance

```javascript
// With options
session.startTransaction({
  readConcern: { level: "snapshot" },
  writeConcern: { w: "majority" },
  readPreference: "primary"
})
```

## Validation

### Schema Validation

```javascript
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "username", "age"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Must be a valid email"
        },
        username: {
          bsonType: "string",
          minLength: 3,
          maxLength: 30,
          description: "Must be between 3 and 30 characters"
        },
        age: {
          bsonType: "int",
          minimum: 18,
          maximum: 120,
          description: "Must be between 18 and 120"
        },
        status: {
          enum: ["active", "inactive", "suspended"],
          description: "Must be one of the enum values"
        }
      }
    }
  },
  validationLevel: "strict", // or "moderate"
  validationAction: "error"   // or "warn"
})
```

### Update Validation

```javascript
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      // Updated schema
    }
  }
})
```

## Performance Optimization

### Query Optimization

```javascript
// ❌ Bad: Fetch all then filter in application
const allUsers = db.users.find().toArray()
const activeUsers = allUsers.filter(u => u.status === "active")

// ✓ Good: Filter in database
const activeUsers = db.users.find({ status: "active" }).toArray()

// ❌ Bad: No projection (fetches all fields)
db.users.find({ status: "active" })

// ✓ Good: Project only needed fields
db.users.find(
  { status: "active" },
  { _id: 1, username: 1, email: 1 }
)

// ❌ Bad: Large skip (slow for large collections)
db.users.find().skip(100000).limit(20)

// ✓ Good: Use range query with index
db.users.find({ _id: { $gt: lastSeenId } }).limit(20)
```

### Covered Queries

```javascript
// Create index
db.users.createIndex({ email: 1, username: 1 })

// Covered query (only uses index, no document fetch)
db.users.find(
  { email: "john@example.com" },
  { _id: 0, email: 1, username: 1 }
)

// Check if covered
db.users.find(
  { email: "john@example.com" },
  { _id: 0, email: 1, username: 1 }
).explain("executionStats")
// Look for: totalDocsExamined: 0 (covered query)
```

### Aggregation Optimization

```javascript
// ❌ Bad: $match after expensive operations
db.orders.aggregate([
  { $lookup: { ... } },
  { $unwind: "$items" },
  { $match: { status: "shipped" } } // Filter late
])

// ✓ Good: $match early
db.orders.aggregate([
  { $match: { status: "shipped" } }, // Filter early
  { $lookup: { ... } },
  { $unwind: "$items" }
])
```

## Interview Questions

### Q1: What is the difference between embedding and referencing in MongoDB?

**Answer:**

**Embedding** (denormalization) stores related data in a single document:
```javascript
// Embedding
{
  _id: ObjectId("..."),
  username: "johndoe",
  posts: [
    { title: "Post 1", content: "..." },
    { title: "Post 2", content: "..." }
  ]
}
```

**Referencing** (normalization) stores references to documents in other collections:
```javascript
// Referencing - Users collection
{ _id: ObjectId("user1"), username: "johndoe" }

// Posts collection
{ _id: ObjectId("post1"), userId: ObjectId("user1"), title: "Post 1" }
{ _id: ObjectId("post2"), userId: ObjectId("user1"), title: "Post 2" }
```

**When to embed:**
- ✅ One-to-one or one-to-few relationships
- ✅ Data accessed together
- ✅ Performance priority (single query)

**When to reference:**
- ✅ One-to-many or many-to-many
- ✅ Data accessed independently
- ✅ Avoid data duplication

### Q2: What are indexes in MongoDB and why are they important?

**Answer:**

**Indexes** are special data structures that store a subset of data in an easy-to-search format.

**Why important:**
- ⚡ **Performance** - Orders of magnitude faster queries
- 📊 **Sorting** - Efficient sorting without loading all documents
- 🔍 **Uniqueness** - Enforce unique constraints

```javascript
// Without index: Collection scan (slow)
db.users.find({ email: "john@example.com" })
// Scans ALL documents

// With index: Index scan (fast)
db.users.createIndex({ email: 1 })
db.users.find({ email: "john@example.com" })
// Uses index, scans only matching documents
```

**Common index types:**
- **Single field**: `{ email: 1 }`
- **Compound**: `{ userId: 1, createdAt: -1 }`
- **Multikey**: Arrays (automatically created)
- **Text**: Full-text search
- **Geospatial**: Location queries

**Trade-offs:**
- ✅ Faster reads
- ❌ Slower writes (must update index)
- ❌ More storage

### Q3: What is the aggregation pipeline in MongoDB?

**Answer:**

The **aggregation pipeline** processes documents through stages to transform and compute data.

```javascript
db.orders.aggregate([
  // Stage 1: Filter documents
  { $match: { status: "shipped", createdAt: { $gte: ISODate("2025-01-01") } } },

  // Stage 2: Unwind array
  { $unwind: "$items" },

  // Stage 3: Group and calculate
  { $group: {
    _id: "$items.productId",
    totalQuantity: { $sum: "$items.quantity" },
    totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } }
  }},

  // Stage 4: Sort
  { $sort: { totalRevenue: -1 } },

  // Stage 5: Limit
  { $limit: 10 }
])
```

**Common stages:**
- `$match` - Filter documents
- `$group` - Group and aggregate
- `$project` - Select/transform fields
- `$sort` - Sort documents
- `$limit` - Limit results
- `$skip` - Skip documents
- `$lookup` - Join collections
- `$unwind` - Deconstruct arrays

### Q4: What are MongoDB transactions and when should you use them?

**Answer:**

**Transactions** ensure multiple operations complete atomically (all or nothing).

```javascript
const session = db.getMongo().startSession()

session.startTransaction()
try {
  // Multiple operations
  db.accounts.updateOne(
    { _id: "account1" },
    { $inc: { balance: -100 } },
    { session }
  )

  db.accounts.updateOne(
    { _id: "account2" },
    { $inc: { balance: 100 } },
    { session }
  )

  session.commitTransaction()
} catch (err) {
  session.abortTransaction()
} finally {
  session.endSession()
}
```

**When to use:**
- ✅ Financial transactions (transfers, payments)
- ✅ Multi-document updates requiring consistency
- ✅ Critical operations needing atomicity

**When NOT to use:**
- ❌ Single document updates (already atomic)
- ❌ High-performance requirements (adds overhead)
- ❌ Long-running operations (can cause blocking)

### Q5: Explain the difference between find() and aggregate().

**Answer:**

| Feature | `find()` | `aggregate()` |
|---------|----------|---------------|
| **Purpose** | Simple queries | Complex transformations |
| **Operations** | Filter, project, sort | Filter, transform, compute, join |
| **Performance** | Faster for simple queries | Better for complex operations |
| **Flexibility** | Limited | Very flexible |

```javascript
// find() - Simple query
db.orders.find(
  { status: "shipped" },
  { userId: 1, total: 1 }
).sort({ total: -1 }).limit(10)

// aggregate() - Complex query with grouping
db.orders.aggregate([
  { $match: { status: "shipped" } },
  { $group: {
    _id: "$userId",
    totalSpent: { $sum: "$total" },
    orderCount: { $sum: 1 }
  }},
  { $sort: { totalSpent: -1 } },
  { $limit: 10 }
])
```

**Use find() when:**
- Simple filtering and sorting
- Just need matching documents

**Use aggregate() when:**
- Grouping and calculations
- Joining collections ($lookup)
- Complex transformations

### Q6: What is the document size limit in MongoDB and how do you handle large documents?

**Answer:**

MongoDB has a **16MB document size limit**.

**Strategies for large documents:**

**1. Referencing:**
```javascript
// Instead of embedding large array
{
  _id: ObjectId("..."),
  productId: ObjectId("..."),
  reviews: [ /* 10,000 reviews approaching 16MB */ ]
}

// Use separate collection
// products collection
{ _id: ObjectId("..."), name: "Product", totalReviews: 10000 }

// reviews collection (referenced)
{ _id: ObjectId("..."), productId: ObjectId("..."), text: "Great!", rating: 5 }
```

**2. Subset Pattern:**
```javascript
{
  _id: ObjectId("..."),
  productId: ObjectId("..."),
  totalReviews: 10000,
  recentReviews: [
    // Store only recent 20 reviews
  ]
}
```

**3. GridFS (for files):**
```javascript
// Store files > 16MB (images, videos, etc.)
const bucket = new GridFSBucket(db)
const uploadStream = bucket.openUploadStream('video.mp4')
fs.createReadStream('./video.mp4').pipe(uploadStream)
```

### Q7: What is the difference between $lookup and embedding?

**Answer:**

**$lookup** (join) and **embedding** solve similar problems differently.

**$lookup (referencing):**
```javascript
// Orders collection
{ _id: ObjectId("order1"), userId: ObjectId("user1"), total: 100 }

// Query with $lookup
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  }
])
```

**Embedding:**
```javascript
// Orders collection (with embedded user data)
{
  _id: ObjectId("order1"),
  user: {
    _id: ObjectId("user1"),
    name: "John Doe",
    email: "john@example.com"
  },
  total: 100
}
```

| Feature | $lookup | Embedding |
|---------|---------|-----------|
| **Queries** | 2+ (join) | 1 |
| **Performance** | Slower | Faster |
| **Data duplication** | No | Yes |
| **Updates** | Easier | Harder |
| **Document size** | Smaller | Larger |

**Choose $lookup when:**
- Data changes frequently
- Avoid duplication
- Many-to-many relationships

**Choose embedding when:**
- Data accessed together
- Performance critical
- One-to-one/one-to-few

### Q8: How do you optimize MongoDB queries?

**Answer:**

**1. Use indexes:**
```javascript
// Create index on frequently queried fields
db.users.createIndex({ email: 1 })
db.orders.createIndex({ userId: 1, createdAt: -1 })
```

**2. Use projection:**
```javascript
// ❌ Fetch all fields
db.users.find({ status: "active" })

// ✓ Fetch only needed fields
db.users.find({ status: "active" }, { _id: 1, username: 1, email: 1 })
```

**3. Use covered queries:**
```javascript
// Query uses only index (fastest)
db.users.createIndex({ email: 1, username: 1 })
db.users.find(
  { email: "john@example.com" },
  { _id: 0, email: 1, username: 1 }
)
```

**4. Filter early in aggregation:**
```javascript
// ✓ $match early
db.orders.aggregate([
  { $match: { status: "shipped" } },
  { $lookup: { ... } },
  { $group: { ... } }
])
```

**5. Use explain():**
```javascript
db.users.find({ email: "john@example.com" }).explain("executionStats")
// Check: executionTimeMillis, totalDocsExamined, nReturned
```

**6. Avoid large skips:**
```javascript
// ❌ Slow for large skip
db.users.find().skip(100000).limit(20)

// ✓ Use range query
db.users.find({ _id: { $gt: lastSeenId } }).limit(20)
```

### Q9: What is sharding in MongoDB and when is it needed?

**Answer:**

**Sharding** is horizontal partitioning of data across multiple servers (shards).

**Architecture:**
```
Application
    ↓
Mongos (Router)
    ↓
Config Servers (Metadata)
    ↓
Shard 1 | Shard 2 | Shard 3
(Data)  | (Data)  | (Data)
```

**When to shard:**
- ✅ Data size exceeds single server capacity
- ✅ Write throughput exceeds single server
- ✅ Working set doesn't fit in RAM

**Shard key selection:**
```javascript
// Good shard key: High cardinality, even distribution
db.orders.createIndex({ userId: 1, createdAt: 1 })
sh.shardCollection("shop.orders", { userId: 1, createdAt: 1 })

// Bad shard key: Low cardinality (hot shard)
sh.shardCollection("shop.orders", { status: 1 }) // Only a few values
```

**Benefits:**
- ✅ Horizontal scalability
- ✅ Increased storage capacity
- ✅ Increased throughput

**Challenges:**
- ❌ Increased complexity
- ❌ Harder to maintain
- ❌ Scatter-gather queries can be slow

### Q10: What are TTL indexes and how do you use them?

**Answer:**

**TTL (Time To Live) indexes** automatically delete documents after a specified time.

```javascript
// Create TTL index (delete after 24 hours)
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 86400 } // 24 hours
)

// Insert document
db.sessions.insertOne({
  userId: ObjectId("..."),
  token: "abc123",
  createdAt: new Date() // Must be Date type
})

// MongoDB automatically deletes after 24 hours
```

**Use cases:**
- Session data
- Temporary logs
- Cache entries
- Event data

**Important notes:**
- Field must be Date type
- Background task runs every 60 seconds
- Can only have one TTL index per collection
- Cannot be compound index

```javascript
// Alternative: Expire at specific date
db.events.createIndex(
  { expireAt: 1 },
  { expireAfterSeconds: 0 }
)

db.events.insertOne({
  name: "Conference",
  expireAt: new Date("2025-12-31") // Expires on this date
})
```

## Best Practices

1. **Design for your queries** - Schema should match how you query data
2. **Use embedded documents** - For data accessed together
3. **Use references** - For large, independent data
4. **Create appropriate indexes** - On frequently queried fields
5. **Use aggregation pipeline** - For complex queries
6. **Monitor query performance** - Use explain() regularly
7. **Keep documents under 16MB** - Use referencing or GridFS
8. **Use schema validation** - Ensure data quality
9. **Plan for growth** - Consider sharding early if needed
10. **Use transactions sparingly** - Only when necessary

## Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB Schema Design Best Practices](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Performance Best Practices](https://www.mongodb.com/blog/post/performance-best-practices-mongodb-data-modeling-and-memory-sizing)
- [MongoDB Aggregation Pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/)
