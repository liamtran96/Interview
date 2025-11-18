---
sidebar_position: 2
---

# MongoDB Aggregation Framework

## What is Aggregation?

The **Aggregation Framework** is MongoDB's powerful tool for data processing and transformation. It works as a **pipeline** where documents pass through multiple stages.

## Basic Syntax

```javascript
db.collection.aggregate([
  { $stage1: {...} },
  { $stage2: {...} },
  { $stage3: {...} }
])
```

## Common Aggregation Stages

### $match - Filter Documents

Like `find()`, but used in aggregation pipeline:

```javascript
db.orders.aggregate([
  { $match: { status: "completed", total: { $gt: 100 } } }
])
```

### $group - Group Documents

Group by field and perform calculations:

```javascript
// Count users by country
db.users.aggregate([
  {
    $group: {
      _id: "$country",
      count: { $sum: 1 }
    }
  }
])

// Average order total by customer
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      avgTotal: { $avg: "$total" },
      orderCount: { $sum: 1 }
    }
  }
])
```

### $project - Reshape Documents

Select, rename, or compute fields:

```javascript
db.users.aggregate([
  {
    $project: {
      name: 1,
      email: 1,
      fullName: { $concat: ["$firstName", " ", "$lastName"] },
      _id: 0
    }
  }
])
```

### $sort - Sort Documents

```javascript
db.products.aggregate([
  { $sort: { price: -1 } } // -1 for descending, 1 for ascending
])
```

### $limit - Limit Results

```javascript
db.products.aggregate([
  { $sort: { sales: -1 } },
  { $limit: 10 } // Top 10 products
])
```

### $skip - Skip Documents

```javascript
db.products.aggregate([
  { $skip: 20 },  // Skip first 20
  { $limit: 10 }  // Then take 10 (pagination)
])
```

### $lookup - Join Collections

Like SQL JOIN:

```javascript
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",       // Collection to join
      localField: "customerId", // Field in orders
      foreignField: "_id",      // Field in customers
      as: "customerInfo"        // Output array name
    }
  }
])
```

### $unwind - Deconstruct Arrays

Convert array field into separate documents:

```javascript
// Before: { _id: 1, tags: ["a", "b", "c"] }
db.posts.aggregate([
  { $unwind: "$tags" }
])
// After:
// { _id: 1, tags: "a" }
// { _id: 1, tags: "b" }
// { _id: 1, tags: "c" }
```

## Common Interview Questions

### Q1: How is aggregation different from find()?

**Answer:**

| find() | aggregate() |
|--------|-------------|
| Simple queries | Complex data transformations |
| Returns documents as-is | Can reshape documents |
| Limited operations | Multiple pipeline stages |
| Cannot join collections | Can join with $lookup |

```javascript
// find() - Simple query
db.orders.find({ total: { $gt: 100 } })

// aggregate() - Complex analysis
db.orders.aggregate([
  { $match: { total: { $gt: 100 } } },
  { $group: { _id: "$customerId", total: { $sum: "$total" } } },
  { $sort: { total: -1 } },
  { $limit: 10 }
])
```

### Q2: What are the most common aggregation operators?

**Answer:**

**Accumulator Operators (in $group):**
- `$sum` - Sum values
- `$avg` - Average
- `$min` / `$max` - Min/max values
- `$first` / `$last` - First/last value
- `$push` - Add to array
- `$addToSet` - Add unique to array

```javascript
db.sales.aggregate([
  {
    $group: {
      _id: "$product",
      totalSales: { $sum: "$amount" },
      avgPrice: { $avg: "$price" },
      maxPrice: { $max: "$price" },
      minPrice: { $min: "$price" },
      count: { $sum: 1 }
    }
  }
])
```

## Real-World Examples

### Example 1: Sales Report

```javascript
db.orders.aggregate([
  // 1. Filter: Only completed orders
  { $match: { status: "completed" } },

  // 2. Group: By product, calculate totals
  {
    $group: {
      _id: "$productId",
      totalRevenue: { $sum: "$total" },
      orderCount: { $sum: 1 },
      avgOrderValue: { $avg: "$total" }
    }
  },

  // 3. Join: Get product details
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product"
    }
  },

  // 4. Unwind product array
  { $unwind: "$product" },

  // 5. Project: Reshape output
  {
    $project: {
      productName: "$product.name",
      totalRevenue: 1,
      orderCount: 1,
      avgOrderValue: { $round: ["$avgOrderValue", 2] }
    }
  },

  // 6. Sort: By revenue descending
  { $sort: { totalRevenue: -1 } },

  // 7. Limit: Top 10 products
  { $limit: 10 }
])
```

### Example 2: User Activity Analysis

```javascript
db.users.aggregate([
  // Join with posts
  {
    $lookup: {
      from: "posts",
      localField: "_id",
      foreignField: "userId",
      as: "posts"
    }
  },

  // Add computed fields
  {
    $addFields: {
      postCount: { $size: "$posts" },
      lastPost: { $max: "$posts.createdAt" }
    }
  },

  // Filter active users
  {
    $match: {
      postCount: { $gt: 0 },
      lastPost: { $gte: new Date("2024-01-01") }
    }
  },

  // Project final shape
  {
    $project: {
      name: 1,
      email: 1,
      postCount: 1,
      lastPost: 1
    }
  }
])
```

### Example 3: Pagination with Total Count

```javascript
db.products.aggregate([
  { $match: { category: "electronics" } },

  {
    $facet: {
      // Get paginated results
      items: [
        { $skip: 20 },
        { $limit: 10 }
      ],
      // Get total count
      totalCount: [
        { $count: "count" }
      ]
    }
  }
])
```

## Performance Tips

1. **$match early** - Filter as early as possible
2. **$project to reduce** - Remove unnecessary fields early
3. **Use indexes** - $match and $sort benefit from indexes
4. **Limit pipeline stages** - Fewer stages = better performance
5. **$lookup last** - JOIN operations are expensive

```javascript
// ✅ GOOD - $match first (uses index)
db.orders.aggregate([
  { $match: { status: "completed" } },  // Uses index
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } }
])

// ❌ BAD - $match after $group (can't use index)
db.orders.aggregate([
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } },
  { $match: { total: { $gt: 1000 } } }
])
```

## Key Takeaways

- Aggregation is a pipeline of stages
- Each stage transforms documents
- Common stages: $match, $group, $project, $sort, $limit
- $lookup for joining collections
- $unwind for arrays
- Order matters for performance
- Use $match early to filter data
