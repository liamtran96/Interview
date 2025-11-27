---
sidebar_position: 26
---

# Clean Code Principles

## Naming

### Use Meaningful Names

```javascript
// ❌ Bad
const d = new Date();
const x = getData();
function calc(a, b) { return a + b; }

// ✅ Good
const currentDate = new Date();
const userData = getUserData();
function calculateSum(num1, num2) { return num1 + num2; }
```

### Use Pronounceable Names

```javascript
// ❌ Bad
const yyyymmdstr = new Date().toISOString().split('T')[0];

// ✅ Good
const currentDate = new Date().toISOString().split('T')[0];
```

### Use Consistent Vocabulary

```javascript
// ❌ Bad
getUser();
retrieveClient();
fetchCustomer();

// ✅ Good
getUser();
getClient();
getCustomer();
```

## Functions

### Functions Should Do One Thing

```javascript
// ❌ Bad
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}

// ✅ Good
function emailActiveClients(clients) {
  clients
    .filter(isActiveClient)
    .forEach(email);
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

### Function Arguments (2 or fewer)

```javascript
// ❌ Bad
function createUser(name, email, age, address, phone) {
  // ...
}

// ✅ Good
function createUser(userData) {
  const { name, email, age, address, phone } = userData;
  // ...
}

createUser({
  name: 'John',
  email: 'john@example.com',
  age: 30,
  address: '123 Main St',
  phone: '555-1234'
});
```

### Use Descriptive Function Names

```javascript
// ❌ Bad
function process(data) { }
function handle(event) { }

// ✅ Good
function validateUserInput(data) { }
function handleButtonClick(event) { }
```

## Comments

### Don't Comment Bad Code - Rewrite It

```javascript
// ❌ Bad
// Check if user is admin
if (user.role === 'admin' && user.permissions.includes('write')) {
  // ...
}

// ✅ Good
function isUserAdmin(user) {
  return user.role === 'admin' && user.permissions.includes('write');
}

if (isUserAdmin(user)) {
  // ...
}
```

### Explain "Why", Not "What"

```javascript
// ❌ Bad
// Loop through array
for (let i = 0; i < arr.length; i++) {
  // Add 1 to element
  arr[i] = arr[i] + 1;
}

// ✅ Good
// Normalize values to 1-based indexing for legacy API compatibility
for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i] + 1;
}
```

## DRY (Don't Repeat Yourself)

```javascript
// ❌ Bad
function showDeveloperList(developers) {
  developers.forEach(developer => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    
    render({ expectedSalary, experience, githubLink });
  });
}

function showManagerList(managers) {
  managers.forEach(manager => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    
    render({ expectedSalary, experience, portfolio });
  });
}

// ✅ Good
function showEmployeeList(employees) {
  employees.forEach(employee => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();
    const portfolio = employee.getPortfolio();
    
    render({ expectedSalary, experience, portfolio });
  });
}
```

## Error Handling

### Use try/catch

```javascript
// ❌ Bad
function getUserData(userId) {
  const data = database.get(userId);
  return data;
}

// ✅ Good
function getUserData(userId) {
  try {
    return database.get(userId);
  } catch (error) {
    console.error('Failed to get user data:', error);
    throw new Error(`Could not retrieve user ${userId}`);
  }
}
```

### Don't Ignore Errors

```javascript
// ❌ Bad
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}

// ✅ Good
try {
  functionThatMightThrow();
} catch (error) {
  console.error(error);
  notifyUserOfError(error);
  reportErrorToService(error);
}
```

## Object and Data Structures

### Use Getters and Setters

```javascript
// ❌ Bad
class BankAccount {
  constructor() {
    this.balance = 0;
  }
}

const account = new BankAccount();
account.balance = 1000; // Direct access

// ✅ Good
class BankAccount {
  constructor() {
    this._balance = 0;
  }

  get balance() {
    return this._balance;
  }

  set balance(amount) {
    if (amount < 0) {
      throw new Error('Balance cannot be negative');
    }
    this._balance = amount;
  }
}

const account = new BankAccount();
account.balance = 1000; // Validated
```

## Classes

### Single Responsibility Principle

```javascript
// ❌ Bad
class UserSettings {
  constructor(user) {
    this.user = user;
  }

  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}

// ✅ Good
class UserAuth {
  constructor(user) {
    this.user = user;
  }

  verifyCredentials() {
    // ...
  }
}

class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }

  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

## SOLID Principles

### S - Single Responsibility

Each class/function should have one reason to change.

### O - Open/Closed

Open for extension, closed for modification.

### L - Liskov Substitution

Subtypes must be substitutable for their base types.

### I - Interface Segregation

Don't force classes to implement unused methods.

### D - Dependency Inversion

Depend on abstractions, not concretions.

## Key Takeaways

- **Meaningful names** - Clear, pronounceable, searchable
- **Small functions** - Do one thing well
- **DRY** - Don't repeat yourself
- **Comments** - Explain "why", not "what"
- **Error handling** - Don't ignore errors
- **SOLID principles** - Guide for better design

## Resources

- [Clean Code by Robert C. Martin](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
