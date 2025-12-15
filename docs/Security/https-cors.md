---
sidebar_position: 5
---

# HTTPS, TLS & CORS

## Q1: What are the differences between HTTPS, HTTP, and TLS?

### Answer:
HTTP (HyperText Transfer Protocol) is an application-layer protocol for transmitting data over the internet, but it sends data in plain text without encryption. This makes it vulnerable to eavesdropping, man-in-the-middle attacks, and data tampering. HTTPS (HTTP Secure) is HTTP with an additional layer of security provided by TLS/SSL encryption.

TLS (Transport Layer Security), previously known as SSL (Secure Sockets Layer), is a cryptographic protocol that operates at the transport layer. It encrypts data in transit, authenticates the server identity, and ensures data integrity through digital certificates. When you access a website with HTTPS, TLS establishes a secure connection before any data exchange occurs.

### How HTTPS/TLS Works:

```
┌─────────────┐         TLS Handshake         ┌─────────────┐
│   Client    │ ────────────────────────────► │   Server    │
│  (Browser)  │                               │   (Website) │
│             │ ◄────────────────────────────  │             │
└─────────────┘                               └─────────────┘
       ▼
  1. Client Hello
  2. Server sends Certificate
  3. Key Exchange
  4. Session Keys Generated
  5. Encrypted communication
```

### Security Comparison:

| Feature | HTTP | HTTPS/TLS |
|---------|------|-----------|
| Encryption | ❌ None | ✅ AES-256 or similar |
| Authentication | ❌ No server verification | ✅ Digital certificate |
| Data Integrity | ❌ Vulnerable to tampering | ✅ HMAC verification |
| Man-in-the-Middle Safe | ❌ Vulnerable | ✅ Protected |
| Certificate Required | N/A | ✅ Yes (issued by CA) |
| Port | 80 | 443 |

### Code Example:

```javascript
// HTTPS Request (Secure)
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer token123'
  }
})
.then(response => response.json())
.then(data => console.log('Secure data received:', data));

// HTTP Request (Insecure - NEVER use for sensitive data)
// ❌ AVOID THIS!
fetch('http://api.example.com/data')
  .then(response => response.json());
```

### TLS Certificate Chain:

```
Root CA Certificate (Self-signed)
    ↓
Intermediate CA Certificate
    ↓
Domain Certificate (*.example.com)
    ↓
Client Browser verifies chain
```

### Key Points:
- HTTPS encrypts data in transit using TLS/SSL
- TLS provides authentication via digital certificates issued by trusted Certificate Authorities
- TLS also ensures data integrity through message authentication codes
- Every website should use HTTPS, even for public content
- Mix-content errors occur when HTTPS pages load HTTP resources
- HSTS (HTTP Strict-Transport-Security) header forces HTTPS

### Common Pitfalls:
- Trusting self-signed certificates in production
- Not validating certificates on the client side
- Loading mixed content (HTTPS page loading HTTP resources)
- Using outdated TLS versions (< 1.2)
- Not implementing certificate pinning for sensitive apps

### Interview Tips:
- Explain TLS handshake process clearly
- Discuss the role of Certificate Authorities (CAs)
- Mention common cipher suites and their strength
- Be aware of certificate validation errors
- Explain why HSTS is important

### Further Reading:
- [MDN: HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/https)
- [RFC 5246 - TLS 1.2 Specification](https://tools.ietf.org/html/rfc5246)

---

## Q2: What is the Same-Origin Policy and CORS?

### Answer:
The Same-Origin Policy is a fundamental security feature of web browsers that restricts how documents and scripts from one origin can interact with resources from another origin. An origin is defined by the combination of protocol (HTTP/HTTPS), domain (example.com), and port (80, 443, etc.).

CORS (Cross-Origin Resource Sharing) is a mechanism that allows controlled access to resources from different origins through HTTP headers. Without CORS, browser security restrictions would prevent legitimate cross-origin requests, making it impossible to build modern web applications with multiple services.

### Same-Origin Policy - When Requests are Blocked:

```
Request from:     https://app.example.com
To:              https://api.example.com

Origin 1:        https://app.example.com
                     ▲
                     │ BLOCKED (different subdomain)
                     │ Unless CORS headers allow it
                     ▼
Origin 2:        https://api.example.com
```

### Same-Origin vs Cross-Origin Examples:

| From | To | Same Origin? | Reason |
|------|----|----|---------|
| `https://example.com` | `https://example.com/api` | ✅ Yes | Same protocol, domain, port |
| `https://example.com` | `https://api.example.com` | ❌ No | Different subdomain |
| `https://example.com` | `http://example.com` | ❌ No | Different protocol |
| `https://example.com:443` | `https://example.com:8443` | ❌ No | Different port |
| `https://example.com` | `https://example.org` | ❌ No | Different domain |

### CORS Headers Flow:

```
Browser              Server
  │                   │
  ├─ REQUEST ────────>│
  │ Origin: https://app.example.com
  │                   │
  │<─ RESPONSE ───────┤
  │ Access-Control-Allow-Origin: https://app.example.com
  │                   │
  ├─ Checks headers ──┤
  │ ✅ Origin allowed │
  │ ✅ Methods allowed
  │ ✅ Headers allowed
```

### Code Example:

```javascript
// Frontend making cross-origin request
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Include cookies if needed
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('CORS error:', error);
  }
};

// Backend (Node.js/Express) - Enable CORS
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'https://app.example.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/data', (req, res) => {
  res.json({ message: 'Data from different origin' });
});
```

### Key Points:
- Same-Origin Policy restricts requests to same protocol, domain, and port
- CORS headers allow servers to explicitly permit cross-origin requests
- Simple requests bypass CORS preflight; complex requests trigger it
- The `Origin` header is sent automatically by browsers, not manually
- CORS is enforced by browsers, not servers
- Credentials (cookies) can be included with `credentials: 'include'`

### Common Pitfalls:
- Setting `Access-Control-Allow-Origin: *` with credentials (invalid)
- Assuming CORS is a server-only concern
- Not understanding that preflight requests are automatic
- Confusing CORS with authentication
- Testing CORS with curl (curl ignores browser CORS policy)

### Interview Tips:
- Explain why Same-Origin Policy exists (security defense)
- Distinguish between simple and complex requests
- Discuss the difference between client-side and server-side CORS control
- Mention that CORS is a browser security feature, not a protocol protection
- Be ready to explain real-world CORS setup scenarios

### Further Reading:
- [MDN: Same-Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

## Q3: What are CORS preflight requests and when do they occur?

### Answer:
A CORS preflight request is an automatic OPTIONS request sent by the browser before the actual request to check if the server allows the cross-origin request. The browser only sends a preflight request for "complex" or "non-simple" requests. For simple requests, the browser sends the request directly, and the server responds with CORS headers.

The preflight mechanism protects resources by allowing servers to explicitly approve certain request methods and headers before the browser sends sensitive data. Without preflight, a malicious website could make damaging requests to a user's bank or email service if they were logged in.

### When Preflight Occurs:

Preflight is triggered when:
- **Method**: Not GET, HEAD, or POST
- **Headers**: Custom headers beyond Content-Type (e.g., Authorization, X-Custom-Header)
- **Content-Type**: POST with content-type other than form-urlencoded, multipart/form-data, or text/plain
- **Credentials**: Request includes credentials with Access-Control-Allow-Credentials: true

### Preflight Request/Response Flow:

```
Browser                         Server
   │                              │
   ├─ OPTIONS Request ───────────>│
   │ Origin: https://app.example.com
   │ Access-Control-Request-Method: POST
   │ Access-Control-Request-Headers: Authorization
   │                              │
   │<─ OPTIONS Response ──────────┤
   │ Access-Control-Allow-Origin: https://app.example.com
   │ Access-Control-Allow-Methods: GET,POST,PUT
   │ Access-Control-Allow-Headers: Authorization,Content-Type
   │ Access-Control-Max-Age: 86400
   │                              │
   ├─ Browser Checks ─────────────┤
   │ ✅ Method allowed?          │
   │ ✅ Headers allowed?         │
   │                              │
   ├─ Actual POST Request ───────>│
   │ Authorization: Bearer token  │
   │                              │
   │<─ Response ───────────────────┤
```

### Code Example:

```javascript
// This triggers a preflight request
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'  // Custom header triggers preflight
  },
  body: JSON.stringify({ name: 'John' })
});

// Step 1: Browser sends OPTIONS request automatically
// OPTIONS /data HTTP/1.1
// Origin: https://app.example.com
// Access-Control-Request-Method: POST
// Access-Control-Request-Headers: authorization,content-type

// Backend (Node.js/Express) - Handle preflight
app.options('/data', cors({
  origin: 'https://app.example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400  // Cache preflight for 24 hours
}));

app.post('/data', (req, res) => {
  // Step 2: Actual POST request happens here
  console.log('Received:', req.body);
  res.json({ success: true });
});

// This does NOT trigger a preflight request (simple request)
fetch('https://api.example.com/data', {
  method: 'GET'
  // No custom headers, so no preflight needed
});
```

### Simple vs Complex Requests:

| Type | Method | Headers | Content-Type | Preflight? |
|------|--------|---------|--------------|-----------|
| Simple | GET, HEAD, POST | Only standard | application/x-www-form-urlencoded, multipart/form-data, text/plain | ❌ No |
| Complex | PUT, DELETE, PATCH, etc. | Custom headers | application/json, etc. | ✅ Yes |
| Complex | POST | Custom headers (e.g., Authorization) | application/json | ✅ Yes |

### Preflight Response Headers:

```
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Custom-Header
Access-Control-Max-Age: 86400
Access-Control-Allow-Credentials: true
```

### Key Points:
- Preflight requests are automatic, sent by the browser before complex requests
- Preflight requests use the OPTIONS HTTP method
- The `Access-Control-Max-Age` header caches preflight results
- Simple requests don't trigger preflight but still need CORS headers
- Preflight failure blocks the actual request from being sent
- The browser combines multiple request headers into one preflight check

### Common Pitfalls:
- Not implementing OPTIONS endpoint on the server
- Forgetting to include all headers in `Access-Control-Allow-Headers`
- Not setting appropriate `Access-Control-Max-Age` value
- Confusing preflight with the actual request
- Testing with curl (which doesn't send preflight like browsers do)

### Interview Tips:
- Explain why preflight is necessary (security protection)
- Distinguish between simple and complex requests clearly
- Discuss performance implications of preflight caching
- Show understanding of the OPTIONS HTTP method
- Be ready to debug CORS preflight failures

### Further Reading:
- [MDN: CORS Preflight Request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)
- [MDN: Simple Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests)

---

## Q4: How do you configure CORS headers for different scenarios?

### Answer:
CORS configuration depends on your application's security requirements. Different scenarios require different header combinations. A restrictive approach is recommended—only allow specific origins, methods, and headers needed for your application. Configuration should balance security with functionality, never allowing all origins with credentials, and regularly reviewing which origins actually need access.

### CORS Header Configuration:

| Header | Purpose | Example |
|--------|---------|---------|
| `Access-Control-Allow-Origin` | Which origins can access the resource | `https://app.example.com` or `*` |
| `Access-Control-Allow-Methods` | Which HTTP methods are allowed | `GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | Which custom headers are allowed | `Content-Type, Authorization` |
| `Access-Control-Allow-Credentials` | Whether credentials can be sent | `true` |
| `Access-Control-Max-Age` | How long preflight can be cached (seconds) | `86400` |
| `Access-Control-Expose-Headers` | Which response headers JS can access | `X-Total-Count, X-Page` |

### Scenario 1: Public API (Any Origin):

```javascript
// Backend: Allow requests from any origin
app.use(cors({
  origin: '*',  // Allow any origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false  // ⚠️ MUST be false with origin: '*'
}));

// Response headers:
// Access-Control-Allow-Origin: *
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Headers: Content-Type
```

### Scenario 2: Single Trusted Domain:

```javascript
// Backend: Allow requests from specific domain only
app.use(cors({
  origin: 'https://app.example.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // ✅ OK with specific origin
  maxAge: 3600
}));

// Response headers:
// Access-Control-Allow-Origin: https://app.example.com
// Access-Control-Allow-Methods: GET, POST, PUT, DELETE
// Access-Control-Allow-Headers: Content-Type, Authorization
// Access-Control-Allow-Credentials: true
// Access-Control-Max-Age: 3600
```

### Scenario 3: Multiple Trusted Domains:

```javascript
const allowedOrigins = [
  'https://app.example.com',
  'https://admin.example.com',
  'https://partner.example.org'
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (!origin) {
      // Allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
  credentials: true,
  maxAge: 86400
}));

// Response headers:
// Access-Control-Allow-Origin: https://app.example.com (if matched)
// Access-Control-Allow-Credentials: true
```

### Scenario 4: Development vs Production:

```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://app.example.com', 'https://www.example.com']
    : ['http://localhost:3000', 'http://localhost:8000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Number'],
  maxAge: 3600
};

app.use(cors(corsOptions));
```

### Scenario 5: Exposing Custom Response Headers:

```javascript
// Allow JavaScript to access custom response headers
app.use(cors({
  origin: 'https://app.example.com',
  exposedHeaders: ['X-Total-Count', 'X-Current-Page', 'X-Error-Message'],
  credentials: true
}));

// Frontend can now read these headers
fetch('https://api.example.com/items')
  .then(response => {
    const totalCount = response.headers.get('X-Total-Count');
    const currentPage = response.headers.get('X-Current-Page');
    console.log(`Total: ${totalCount}, Page: ${currentPage}`);
    return response.json();
  });
```

### Scenario 6: Restricting to Specific Methods and Headers:

```javascript
// Minimal CORS configuration for security
app.use(cors({
  origin: 'https://app.example.com',
  methods: ['GET', 'POST'],  // Only GET and POST
  allowedHeaders: ['Content-Type'],  // No Authorization header
  credentials: false,  // No cookies
  maxAge: 600  // Short cache duration
}));

// Use for public, read-only APIs where authentication is not needed
```

### Complete Backend Example (Express):

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware for CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Number'],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200 // For legacy browsers
};

// Apply CORS globally
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Handle specific routes with different CORS
app.get('/public', (req, res) => {
  res.json({ message: 'Public data' });
});

app.post('/api/data', (req, res) => {
  res.json({ message: 'Created' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Frontend Usage:

```javascript
// GET request (simple)
const fetchPublic = async () => {
  const response = await fetch('https://api.example.com/public');
  return response.json();
};

// POST request (complex - triggers preflight)
const createData = async (data) => {
  const response = await fetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    credentials: 'include', // Send cookies
    body: JSON.stringify(data)
  });
  return response.json();
};

// Handle CORS errors
try {
  await createData({ name: 'Test' });
} catch (error) {
  if (error.message.includes('CORS')) {
    console.error('CORS configuration issue on server');
  }
}
```

### Key Points:
- Never use `origin: '*'` with `credentials: true` (invalid and insecure)
- Be specific about allowed origins, methods, and headers
- Use environment variables to manage different origins for dev/prod
- Set appropriate `maxAge` to balance performance and security
- Expose only necessary response headers with `exposedHeaders`
- Regularly audit which origins actually need access
- Log CORS rejections for security monitoring

### Common Pitfalls:
- Allowing all origins (`*`) when specific origins should be restricted
- Forgetting to handle OPTIONS requests
- Not including necessary headers in `allowedHeaders`
- Setting too long `maxAge` values
- Using `origin: '*'` with authentication tokens
- Not testing CORS configuration across different client types

### Interview Tips:
- Explain the principle of least privilege for CORS
- Discuss the security implications of different configurations
- Show understanding of dynamic origin validation
- Be ready to troubleshoot real CORS issues
- Mention environment-specific configurations
- Discuss logging and monitoring CORS failures

### Further Reading:
- [MDN: CORS Configuration](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [npm: cors middleware](https://www.npmjs.com/package/cors)
- [OWASP: CORS](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Origin_Resource_Sharing_Cheat_Sheet.html)
