---
sidebar_position: 6
---

# Common Frontend Vulnerabilities

## Q1: What are the OWASP Top 10 vulnerabilities relevant to frontend development?

### Answer:
The OWASP Top 10 provides a standard awareness document for web application security risks. For frontend developers, several vulnerabilities are particularly relevant: Injection attacks (A03:2021), Broken Authentication (A07:2021), Security Misconfiguration (A05:2021), Vulnerable and Outdated Components (A06:2021), and Cross-Site Scripting which is part of Injection.

Frontend developers must understand that while some OWASP Top 10 vulnerabilities are primarily backend concerns, frontend code plays a critical role in defense-in-depth strategies. Frontend validation, secure authentication flows, proper configuration, and dependency management are essential security layers.

### OWASP Top 10 (2021) - Frontend Relevance:

| Rank | Vulnerability | Frontend Relevance | Impact |
|------|--------------|-------------------|---------|
| A01 | Broken Access Control | Medium | Frontend should enforce UI-level access controls |
| A02 | Cryptographic Failures | High | Frontend handles sensitive data transmission |
| A03 | Injection (inc. XSS) | Very High | Frontend is primary attack surface for XSS |
| A04 | Insecure Design | Medium | Frontend architecture impacts overall security |
| A05 | Security Misconfiguration | Very High | CSP, CORS, headers configured incorrectly |
| A06 | Vulnerable Components | Very High | npm packages, outdated libraries |
| A07 | Authentication Failures | Very High | Frontend implements auth flows |
| A08 | Software/Data Integrity | High | Frontend build pipelines, CDN integrity |
| A09 | Logging/Monitoring Failures | Low | Limited frontend logging capability |
| A10 | Server-Side Request Forgery | Low | Primarily backend concern |

### Code Example - Audit Your Dependencies:

```json
// package.json - Regular security audits
{
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "audit:force": "npm audit fix --force",
    "check-updates": "npx npm-check-updates"
  }
}
```

```bash
# Run security audit
npm audit

# Check for known vulnerabilities
npm audit --audit-level=moderate

# Automated dependency updates
npm install -g npm-check-updates
ncu -u  # Update package.json
npm install  # Install updates
```

### Key Points:
- A03 (Injection/XSS) is the #1 frontend security concern
- A06 (Vulnerable Components) affects every project using npm
- A07 (Authentication) requires secure frontend implementation
- A05 (Misconfiguration) includes CSP, CORS, security headers
- Defense-in-depth: frontend + backend validation both required

### Common Pitfalls:
- Relying solely on frontend validation (always validate backend too)
- Ignoring npm audit warnings
- Using outdated or unmaintained dependencies
- Assuming authentication logic on frontend is secure
- Not implementing CSP or security headers

### Interview Tips:
- Mention specific OWASP categories (A03, A05, A06, A07)
- Discuss defense-in-depth strategy
- Explain why frontend-only validation is insufficient
- Show awareness of npm audit and dependency management
- Give examples of misconfiguration you've seen or fixed

### Further Reading:
- [OWASP Top 10 - 2021](https://owasp.org/Top10/)
- [OWASP Frontend Security Project](https://owasp.org/www-project-frontend-security/)
- [npm audit documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)

---

## Q2: How do you protect against injection attacks in frontend applications?

### Answer:
Injection attacks occur when untrusted data is sent to an interpreter as part of a command or query. In frontend contexts, this primarily manifests as DOM-based XSS, SQL injection through API calls, and command injection through server-side rendering. Protection requires input validation, output encoding, parameterized queries, and Content Security Policy.

The key principle is: **Never trust user input**. All data from users, URLs, cookies, or external sources must be validated and sanitized before use. Use framework-provided sanitization, avoid dangerous APIs like eval() and innerHTML, and implement CSP to mitigate injection impact.

### Injection Attack Types:

```mermaid
graph TD
    A[Injection Attacks] --> B[DOM-based XSS]
    A --> C[SQL Injection via API]
    A --> D[Command Injection via SSR]
    A --> E[Template Injection]

    B --> B1[innerHTML with user data]
    B --> B2[eval with user data]
    B --> B3[document.write user data]

    C --> C1[Unvalidated search parameters]
    C --> C2[Dynamic SQL in API calls]

    D --> D1[Server-side template injection]
    D --> D2[OS command injection]

    E --> E1[Unsafe template rendering]
    E --> E2[Expression injection]
```

### Code Example - Protection Strategies:

```javascript
// BAD - Vulnerable to injection
function displayUserData(username) {
  document.getElementById('profile').innerHTML = `
    <h1>Welcome ${username}!</h1>
  `;
  // If username = '<img src=x onerror=alert(1)>', XSS occurs
}

// GOOD - Safe rendering
function displayUserDataSafe(username) {
  const h1 = document.createElement('h1');
  h1.textContent = `Welcome ${username}!`;  // textContent auto-escapes
  document.getElementById('profile').appendChild(h1);
}

// GOOD - Using React (auto-escapes)
function UserProfile({ username }) {
  return (
    <div>
      <h1>Welcome {username}!</h1>  {/* React escapes by default */}
    </div>
  );
}

// BAD - SQL injection via API
async function searchUsers(query) {
  const response = await fetch(`/api/search?q=${query}`);
  // If query = "'; DROP TABLE users; --", SQL injection possible
  return response.json();
}

// GOOD - Parameterized API requests
async function searchUsersSafe(query) {
  // Backend should use parameterized queries
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })  // Sent as data, not SQL
  });
  return response.json();
}

// BAD - Dangerous eval usage
function executeUserCode(code) {
  eval(code);  // NEVER do this!
}

// BAD - Dynamic Function construction
function processFormula(formula) {
  const fn = new Function('x', `return ${formula}`);
  return fn(10);
}

// GOOD - Safe expression evaluation
function processFormulaSafe(formula) {
  // Whitelist allowed operations
  const allowedOperations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
  };

  // Parse and validate formula
  const match = formula.match(/^(\d+)\s*([+\-*/])\s*(\d+)$/);
  if (!match) throw new Error('Invalid formula');

  const [, a, op, b] = match;
  if (!allowedOperations[op]) throw new Error('Invalid operation');

  return allowedOperations[op](Number(a), Number(b));
}

// Template injection protection
function renderTemplate(template, data) {
  // BAD - Direct string replacement
  // return template.replace(/\{\{(\w+)\}\}/g, (_, key) => data[key]);

  // GOOD - Use safe template library
  import Handlebars from 'handlebars';
  const compiled = Handlebars.compile(template);
  return compiled(data);  // Handlebars escapes by default
}
```

### Validation & Sanitization:

```javascript
// Input validation library
import validator from 'validator';
import DOMPurify from 'dompurify';

class InputValidator {
  static sanitizeHTML(input) {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
      ALLOWED_ATTR: ['href']
    });
  }

  static validateSQLInput(input) {
    // WARNING: This is a CLIENT-SIDE sanity check only!
    // Real SQL injection protection MUST use server-side parameterized queries.
    // Never rely on client-side validation alone for security.
    const sqlKeywords = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi;
    const dangerousChars = /[';\\]/g;

    if (sqlKeywords.test(input) || dangerousChars.test(input)) {
      throw new Error('Invalid input: potential SQL injection detected');
    }

    return input;
  }

  static validateCommandInput(input) {
    // Prevent command injection
    const dangerousPatterns = /[;&|`$(){}[\]<>\\]/g;
    if (dangerousPatterns.test(input)) {
      throw new Error('Invalid input: potential command injection detected');
    }
    return input;
  }

  static sanitizeURL(url) {
    // Only allow http/https protocols
    if (!validator.isURL(url, { protocols: ['http', 'https'], require_protocol: true })) {
      throw new Error('Invalid URL');
    }
    return url;
  }
}

// Usage
try {
  const sanitizedHTML = InputValidator.sanitizeHTML(userInput);
  const safeQuery = InputValidator.validateSQLInput(searchQuery);
  const safeURL = InputValidator.sanitizeURL(userProvidedURL);
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

### Key Points:
- Never use eval(), Function(), or innerHTML with user data
- Always use parameterized queries for database operations
- Use framework-provided escaping (React, Vue auto-escape)
- Implement input validation on both frontend and backend
- Use DOMPurify for sanitizing HTML content
- Implement strict CSP to mitigate injection impact

### Common Pitfalls:
- Trusting frontend validation alone (always validate on server-side)
- Using innerHTML or eval() with any user data
- Not sanitizing data from URLs or cookies
- Unsafe use of parsed data (e.g., passing JSON.parse results to eval or templates without sanitization)
- Using unsafe template engines without escaping

### Interview Tips:
- Explain the difference between validation and sanitization
- Discuss why eval() is dangerous
- Mention CSP as defense-in-depth
- Give examples of safe vs unsafe DOM manipulation
- Show awareness of framework-specific protections (React escaping)

### Further Reading:
- [OWASP Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Injection_Prevention_Cheat_Sheet.html)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
- [Content Security Policy Reference](https://content-security-policy.com/)

---

## Q3: What are common authentication vulnerabilities in frontend applications?

### Answer:
Frontend authentication vulnerabilities include insecure token storage, insufficient session management, weak password policies, missing rate limiting, credential exposure in URLs or logs, and improper OAuth implementation. These vulnerabilities can lead to account takeover, session hijacking, and unauthorized access.

Authentication must be implemented with defense-in-depth: secure token storage (httpOnly cookies), proper session timeouts, strong password requirements, rate limiting on auth endpoints, multi-factor authentication support, and secure OAuth flows with PKCE for SPAs.

### Common Authentication Vulnerabilities:

| Vulnerability | Description | Impact | Mitigation |
|--------------|-------------|---------|------------|
| **Token in localStorage** | Access tokens stored in localStorage vulnerable to XSS | Account takeover | Use httpOnly cookies or memory storage |
| **No token expiration** | Tokens never expire or expire after too long | Extended unauthorized access | Short-lived access tokens (15 min) + refresh tokens |
| **Weak password policy** | Passwords too short or simple | Easy brute force | Enforce length, complexity, check against breach DB |
| **Credentials in URL** | Passwords/tokens in query parameters | Logged in history/analytics | Use POST with body, never GET with credentials |
| **No rate limiting** | Unlimited login attempts | Brute force attacks | Implement exponential backoff, CAPTCHA |
| **Insecure OAuth** | Missing PKCE, state parameter | Authorization code interception | Use PKCE, validate state, check redirect URI |
| **Session fixation** | Session ID not regenerated on login | Session hijacking | Regenerate session ID after authentication |
| **Missing MFA** | Single factor authentication only | Easy account compromise | Implement TOTP, SMS, or WebAuthn |

### Code Example - Secure Authentication Implementation:

```javascript
// Secure authentication service
class SecureAuthService {
  #accessToken = null;
  #refreshing = false;
  #refreshSubscribers = [];

  constructor() {
    // Load access token from memory only (not localStorage!)
    this.#accessToken = null;
  }

  async login(email, password) {
    // Validate input first
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email format');
    }

    if (!this.validatePassword(password)) {
      throw new Error('Password does not meet requirements');
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Send/receive httpOnly cookies
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many login attempts. Please try again later.');
        }
        throw new Error('Invalid credentials');
      }

      const { accessToken, user } = await response.json();

      // Store access token in memory (NOT localStorage)
      this.#accessToken = accessToken;

      // Refresh token is in httpOnly cookie (set by server)

      return { success: true, user };
    } catch (error) {
      // Don't expose detailed error messages
      throw new Error('Login failed. Please check your credentials.');
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password) {
    // Enforce password policy
    return (
      password.length >= 12 &&  // Minimum 12 characters
      /[A-Z]/.test(password) &&  // At least one uppercase
      /[a-z]/.test(password) &&  // At least one lowercase
      /[0-9]/.test(password) &&  // At least one number
      /[!@#$%^&*]/.test(password)  // At least one special char
    );
  }

  async checkPasswordBreach(password) {
    // Check against Have I Been Pwned API
    const sha1 = await this.sha1Hash(password);
    const prefix = sha1.substring(0, 5);
    const suffix = sha1.substring(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    const hashes = await response.text();

    return hashes.includes(suffix.toUpperCase());
  }

  async sha1Hash(str) {
    const buffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-1', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  getAccessToken() {
    return this.#accessToken;
  }

  async logout() {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } finally {
      this.#accessToken = null;
      // Refresh token cookie cleared by server
    }
  }
}

// Secure login component with rate limiting
import { useState } from 'react';

function SecureLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(null);

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side rate limiting
    if (isLocked) {
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
      setError(`Account locked. Try again in ${remaining} minutes.`);
      return;
    }

    try {
      const authService = new SecureAuthService();

      // Check password against breach database
      const isBreached = await authService.checkPasswordBreach(password);
      if (isBreached) {
        setError('This password has been found in a data breach. Please use a different password.');
        return;
      }

      await authService.login(email, password);

      // Reset attempt count on successful login
      setAttemptCount(0);
      setError('');

      // Redirect to dashboard
      window.location.href = '/dashboard';

    } catch (err) {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);

      if (newAttemptCount >= MAX_ATTEMPTS) {
        setIsLocked(true);
        setLockoutTime(Date.now() + LOCKOUT_DURATION);
        setError(`Too many failed attempts. Account locked for 15 minutes.`);
      } else {
        setError(`Login failed. ${MAX_ATTEMPTS - newAttemptCount} attempts remaining.`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        autoComplete="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        autoComplete="current-password"
        minLength={12}
      />
      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={isLocked}>
        {isLocked ? 'Account Locked' : 'Login'}
      </button>
    </form>
  );
}
```

### Secure OAuth Implementation (PKCE):

```javascript
// OAuth with PKCE for SPAs
class SecureOAuthService {
  async initiateOAuth(provider) {
    // Generate PKCE code verifier and challenge
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    // Generate state for CSRF protection
    const state = this.generateRandomString(32);

    // Store in sessionStorage (temporary, will be cleared)
    sessionStorage.setItem('oauth_code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);

    // Build authorization URL
    const authUrl = new URL(`https://oauth.${provider}.com/authorize`);
    authUrl.searchParams.set('client_id', process.env.REACT_APP_OAUTH_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', `${window.location.origin}/auth/callback`);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid profile email');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    // Redirect to OAuth provider
    window.location.href = authUrl.toString();
  }

  async handleOAuthCallback(code, state) {
    // Validate state to prevent CSRF
    const storedState = sessionStorage.getItem('oauth_state');
    if (state !== storedState) {
      throw new Error('Invalid state parameter - possible CSRF attack');
    }

    // Retrieve code verifier
    const codeVerifier = sessionStorage.getItem('oauth_code_verifier');

    // Clean up
    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('oauth_code_verifier');

    // Exchange code for tokens
    const response = await fetch('/api/auth/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        codeVerifier,
        redirectUri: `${window.location.origin}/auth/callback`
      }),
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('OAuth token exchange failed');
    }

    const { accessToken } = await response.json();
    return accessToken;
  }

  generateCodeVerifier() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return this.base64URLEncode(array);
  }

  async generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return this.base64URLEncode(new Uint8Array(hash));
  }

  base64URLEncode(buffer) {
    return btoa(String.fromCharCode(...buffer))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  generateRandomString(length) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}
```

### Key Points:
- Store tokens in httpOnly cookies or memory, never localStorage
- Implement short-lived access tokens with refresh token rotation
- Enforce strong password policies (12+ chars, complexity)
- Implement rate limiting and account lockout
- Use PKCE for OAuth in SPAs
- Check passwords against breach databases (Have I Been Pwned)
- Never expose credentials in URLs or console logs
- Implement multi-factor authentication

### Common Pitfalls:
- Storing tokens in localStorage (XSS vulnerability)
- Not implementing token expiration or refresh
- Weak password requirements
- Missing rate limiting on auth endpoints
- OAuth without PKCE or state validation
- Exposing detailed error messages (aids attackers)
- Not checking passwords against known breaches

### Interview Tips:
- Discuss token storage options and trade-offs
- Explain PKCE and why it's needed for SPAs
- Mention rate limiting and account lockout strategies
- Show awareness of Have I Been Pwned API
- Discuss MFA implementation (TOTP, WebAuthn)
- Explain session fixation and regeneration

### Further Reading:
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OAuth 2.0 for Browser-Based Apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps)
- [Have I Been Pwned API](https://haveibeenpwned.com/API/v3)

---

## Q4: How do you handle security misconfigurations in frontend applications?

### Answer:
Security misconfigurations occur when security settings are not properly configured, allowing attackers to exploit default settings, incomplete configurations, or overly permissive settings. In frontend applications, common misconfigurations include missing security headers, overly permissive CORS policies, exposed environment variables, disabled security features, and insecure cookies.

The principle is security by default with minimal privileges. All security features should be enabled by default, permissions should be as restrictive as possible, and configurations should be regularly audited and tested.

### Common Frontend Security Misconfigurations:

```mermaid
graph TD
    A[Security Misconfigurations] --> B[Missing Security Headers]
    A --> C[CORS Misconfiguration]
    A --> D[Exposed Secrets]
    A --> E[Insecure Cookies]
    A --> F[Debug Mode in Production]

    B --> B1[No CSP]
    B --> B2[No X-Frame-Options]
    B --> B3[No HSTS]

    C --> C1[Access-Control-Allow-Origin: *]
    C --> C2[Credentials with wildcard]

    D --> D1[API keys in code]
    D --> D2[.env in version control]

    E --> E1[Missing httpOnly]
    E --> E2[Missing Secure flag]
    E --> E3[Missing SameSite]

    F --> F1[Console logs with sensitive data]
    F --> F2[Source maps in production]
```

### Code Example - Secure Configuration:

```javascript
// Next.js security headers configuration
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted-cdn.com",
              "style-src 'self' 'unsafe-inline' https://trusted-cdn.com",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://api.example.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Feature policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  // Don't include source maps in production
  productionBrowserSourceMaps: false,

  // Environment variables - only NEXT_PUBLIC_* are exposed to browser
  env: {
    // Don't do this! API keys exposed to browser
    // API_KEY: process.env.API_KEY,  // WRONG

    // Use server-side only
    // API_KEY accessed only in getServerSideProps/API routes
  }
};

// Express.js security headers with Helmet
const express = require('express');
const helmet = require('helmet');

const app = express();

// Use Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Secure cookie configuration
app.use(session({
  secret: process.env.SESSION_SECRET,  // From environment, not hardcoded!
  name: 'sessionId',  // Don't use default name
  cookie: {
    httpOnly: true,    // Prevent JavaScript access
    secure: true,      // HTTPS only
    sameSite: 'strict', // CSRF protection
    maxAge: 3600000,   // 1 hour
    domain: '.example.com' // Specific domain, not wildcard
  },
  resave: false,
  saveUninitialized: false
}));

// CORS configuration - be specific!
const cors = require('cors');

// BAD - Too permissive
app.use(cors({
  origin: '*',  // Allows any origin!
  credentials: true  // NEVER use credentials with wildcard origin
}));

// GOOD - Specific origins
const allowedOrigins = [
  'https://app.example.com',
  'https://staging.example.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Environment variable management
// .env file (NEVER commit to git!)
// API_KEY=your_secret_key_here
// DATABASE_URL=postgres://user:pass@host:5432/db

// .gitignore
// .env
// .env.local
// .env.*.local

// Loading environment variables
require('dotenv').config();

// Validate required environment variables on startup
const requiredEnv = ['API_KEY', 'DATABASE_URL', 'SESSION_SECRET'];
requiredEnv.forEach(key => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// Secure error handling - don't expose stack traces
if (process.env.NODE_ENV === 'production') {
  app.use((err, req, res, next) => {
    // Log error for debugging
    console.error(err.stack);

    // Send generic error to client
    res.status(500).json({
      error: 'Internal server error'
      // Don't include: err.message, err.stack
    });
  });
} else {
  // Development - show detailed errors
  app.use((err, req, res, next) => {
    res.status(500).json({
      error: err.message,
      stack: err.stack
    });
  });
}
```

### Security Checklist for Production:

```javascript
// Security audit checklist
const securityChecklist = {
  headers: {
    csp: '✓ Content-Security-Policy configured',
    xFrame: '✓ X-Frame-Options set to DENY/SAMEORIGIN',
    hsts: '✓ Strict-Transport-Security with max-age > 31536000',
    noSniff: '✓ X-Content-Type-Options set to nosniff',
    referrer: '✓ Referrer-Policy configured'
  },

  cors: {
    origin: '✓ Specific origins, not wildcard',
    credentials: '✓ credentials: true only with specific origins',
    methods: '✓ Only allowed HTTP methods'
  },

  cookies: {
    httpOnly: '✓ httpOnly flag set',
    secure: '✓ Secure flag set (HTTPS only)',
    sameSite: '✓ SameSite attribute configured'
  },

  environment: {
    secrets: '✓ No secrets in version control',
    envFile: '✓ .env in .gitignore',
    validation: '✓ Required env vars validated on startup',
    browser: '✓ No backend secrets exposed to browser'
  },

  production: {
    sourceMaps: '✓ Source maps disabled',
    debugMode: '✓ Debug mode disabled',
    errorHandling: '✓ Generic error messages (no stack traces)',
    logging: '✓ No sensitive data in logs'
  },

  dependencies: {
    audit: '✓ npm audit passing',
    updates: '✓ Dependencies up to date',
    licenses: '✓ License compliance checked'
  }
};

// Automated security audit script
// package.json
{
  "scripts": {
    "security:audit": "npm audit && npm outdated",
    "security:headers": "node scripts/check-headers.js",
    "security:env": "node scripts/validate-env.js",
    "security:all": "npm run security:audit && npm run security:headers && npm run security:env"
  }
}
```

### Key Points:
- Configure all security headers (CSP, X-Frame-Options, HSTS, etc.)
- Use specific CORS origins, never wildcards with credentials
- Never commit secrets to version control (.env in .gitignore)
- Set httpOnly, Secure, and SameSite on cookies
- Disable source maps and debug mode in production
- Implement generic error messages in production
- Regular security audits with npm audit

### Common Pitfalls:
- Using `Access-Control-Allow-Origin: *` with credentials
- Committing .env files to git
- Exposing backend API keys to frontend
- Missing httpOnly or Secure flags on cookies
- Enabling debug mode in production
- Not implementing CSP or using unsafe-inline everywhere
- Exposing detailed error messages with stack traces

### Interview Tips:
- Discuss specific security headers and their purpose
- Explain CORS preflight and origin validation
- Mention environment variable best practices
- Show awareness of Helmet.js for Express
- Discuss CSP nonce/hash for inline scripts
- Explain the risks of source maps in production

### Further Reading:
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [Helmet.js Documentation](https://helmetjs.github.io/)
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)

---

## Q5: How do you manage vulnerable and outdated components?

### Answer:
Vulnerable and outdated components are one of the most common security risks in modern web applications. With the average frontend project having hundreds of npm dependencies, each with their own dependencies (transitive dependencies), the attack surface is enormous. A single vulnerable package can compromise the entire application.

Effective management requires automated scanning (npm audit, Snyk, Dependabot), regular updates, dependency pinning with lock files, minimal dependencies, and a clear update policy. The goal is to balance security (keeping dependencies updated) with stability (not breaking existing functionality).

### Dependency Risk Assessment:

```mermaid
graph TD
    A[Dependency Security] --> B[Direct Dependencies]
    A --> C[Transitive Dependencies]
    A --> D[Dev Dependencies]

    B --> B1[Manually added to package.json]
    B --> B2[Easier to update]
    B --> B3[Your responsibility]

    C --> C1[Dependencies of dependencies]
    C --> C2[Often 10x more than direct]
    C --> C3[Hardest to manage]

    D --> D1[Build-time only]
    D --> D2[Lower risk than production deps]
    D --> D3[Still can affect build pipeline]

    B1 --> E[Vulnerability Detected]
    C1 --> E
    D1 --> E

    E --> F{Severity}
    F -->|Critical| G[Update immediately]
    F -->|High| H[Update within days]
    F -->|Medium| I[Update within weeks]
    F -->|Low| J[Update in next release]
```

### Code Example - Dependency Management:

```json
// package.json - Lock versions for stability
{
  "name": "secure-app",
  "version": "1.0.0",
  "dependencies": {
    // Exact version (no auto-updates)
    "react": "18.2.0",

    // Tilde - patch updates only (18.2.x)
    "react-dom": "~18.2.0",

    // Caret - minor updates (18.x.x)
    "axios": "^1.6.0",

    // AVOID: Wildcard versions
    // "lodash": "*",  // DON'T DO THIS!
    // "express": ">=4.0.0"  // DON'T DO THIS!
  },

  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0"
  },

  "scripts": {
    // Security auditing
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "audit:force": "npm audit fix --force",  // Use cautiously!

    // Check for outdated packages
    "outdated": "npm outdated",

    // Update packages interactively
    "update:interactive": "npx npm-check -u",

    // Check for unused dependencies
    "depcheck": "npx depcheck",

    // License compliance
    "license:check": "npx license-checker --summary",

    // Full security check
    "security:check": "npm audit && npm outdated && npx depcheck"
  },

  // Specify Node.js version (for consistency)
  "engines": {
    "node": ">=18.0.0 <21.0.0",
    "npm": ">=9.0.0"
  },

  // Override vulnerable transitive dependencies
  "overrides": {
    // Force specific version of vulnerable transitive dependency
    "minimist": "^1.2.6",
    "glob-parent": "^6.0.2"
  }
}
```

```bash
# Daily security workflow

# 1. Check for vulnerabilities
npm audit

# Output:
# found 3 vulnerabilities (1 low, 2 high)
# run `npm audit fix` to fix them, or `npm audit` for details

# 2. Review vulnerability details
npm audit --json > audit-report.json

# 3. Fix automatically fixable vulnerabilities
npm audit fix

# 4. For breaking changes, review manually
npm audit fix --force  # Use with caution!

# 5. Check for outdated packages
npm outdated

# 6. Update specific package
npm update package-name

# 7. Update all minor/patch versions
npm update

# 8. Check dependency tree
npm ls

# 9. Check for unused dependencies
npx depcheck

# 10. Remove unused dependencies
npm uninstall unused-package
```

### Automated Security Scanning:

```javascript
// GitHub Actions workflow for security
// .github/workflows/security.yml
name: Security Audit

on:
  schedule:
    # Run daily at 2 AM UTC
    - cron: '0 2 * * *'
  pull_request:
  push:
    branches: [main]

jobs:
  audit:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level=moderate

      - name: Check for outdated packages
        run: npm outdated || true

      - name: Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

      - name: Check licenses
        run: npx license-checker --failOn 'GPL;AGPL'

      - name: Create issue if vulnerabilities found
        if: failure()
        uses: actions/create-issue@v2
        with:
          title: 'Security vulnerabilities detected'
          body: 'Automated security scan found vulnerabilities. Check workflow logs.'
          labels: 'security,dependencies'

// Dependabot configuration
// .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    # Group minor and patch updates
    groups:
      development-dependencies:
        dependency-type: "development"
      production-dependencies:
        dependency-type: "production"
    # Auto-approve minor/patch updates
    labels:
      - "dependencies"
    # Security updates get priority
    commit-message:
      prefix: "security"
      include: "scope"
```

### Dependency Selection Criteria:

```javascript
// Before adding a dependency, check:

class DependencyEvaluator {
  async evaluatePackage(packageName) {
    const criteria = {
      // 1. Is it actively maintained?
      lastPublish: await this.getLastPublishDate(packageName),
      openIssues: await this.getOpenIssuesCount(packageName),

      // 2. How many downloads/week?
      downloads: await this.getWeeklyDownloads(packageName),

      // 3. Security history
      vulnerabilities: await this.getVulnerabilityCount(packageName),

      // 4. Bundle size impact
      bundleSize: await this.getBundleSize(packageName),

      // 5. License compatibility
      license: await this.getLicense(packageName),

      // 6. Dependency count
      dependencyCount: await this.getDependencyCount(packageName),

      // 7. Community trust
      stars: await this.getGitHubStars(packageName),
      trustScore: await this.getSnykScore(packageName)
    };

    return this.scorePackage(criteria);
  }

  scorePackage(criteria) {
    // Red flags:
    const redFlags = [];

    if (criteria.lastPublish > 365) {
      redFlags.push('Not maintained (>1 year since update)');
    }

    if (criteria.vulnerabilities > 0) {
      redFlags.push(`${criteria.vulnerabilities} known vulnerabilities`);
    }

    if (criteria.downloads < 10000) {
      redFlags.push('Low adoption (< 10k downloads/week)');
    }

    if (criteria.bundleSize > 100000) {
      redFlags.push('Large bundle size (> 100KB)');
    }

    if (['GPL', 'AGPL'].includes(criteria.license)) {
      redFlags.push('Incompatible license');
    }

    return {
      score: this.calculateScore(criteria),
      redFlags,
      recommendation: redFlags.length === 0 ? 'APPROVE' : 'REVIEW'
    };
  }
}

// Alternative: Can you implement it yourself?
// "You don't need a library for that!"
function debounce(fn, delay) {
  // Simple debounce - 5 lines vs. adding lodash (70KB)
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

// Or use smaller, focused alternatives
// Instead of: moment.js (67KB)
// Use: date-fns (modular, tree-shakeable)
import { format, parseISO } from 'date-fns';

// Instead of: lodash (full build 71KB)
// Use: lodash-es (import only what you need)
import debounce from 'lodash-es/debounce';
```

### Key Points:
- Run npm audit regularly (daily in CI/CD)
- Keep dependencies updated (Dependabot, Renovate)
- Use exact versions or lock files (package-lock.json)
- Minimize dependencies (can you implement it yourself?)
- Evaluate packages before adding (maintenance, security, size)
- Monitor transitive dependencies (often 10x more than direct)
- Use npm overrides for vulnerable transitive deps
- Automate security scanning in CI/CD

### Common Pitfalls:
- Using wildcard version ranges (`*`, `>=`)
- Not running npm audit regularly
- Ignoring audit warnings
- Adding dependencies without evaluation
- Not checking dependency size impact
- Ignoring transitive dependencies
- Using npm audit fix --force without review

### Interview Tips:
- Discuss npm audit and Snyk/Dependabot
- Explain semantic versioning (^, ~, exact)
- Mention transitive dependency risks
- Show awareness of bundle size impact
- Discuss dependency evaluation criteria
- Explain automated scanning in CI/CD
- Mention alternative approaches (implement vs. library)

### Further Reading:
- [npm audit documentation](https://docs.npmjs.com/cli/v9/commands/npm-audit)
- [Snyk Vulnerability Database](https://snyk.io/vuln/)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Can I Use... for browser compatibility](https://caniuse.com/)
