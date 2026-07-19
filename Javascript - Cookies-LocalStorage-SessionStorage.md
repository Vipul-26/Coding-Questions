# Local Storage vs Session Storage vs Cookies

## Table of Contents

- [What is Local Storage?](#what-is-local-storage)
- [What is Session Storage?](#what-is-session-storage)
- [What are Cookies?](#what-are-cookies)
- [Comparison Table](#comparison-table)
- [When to Use What?](#when-to-use-what)
- [Code Examples](#code-examples)
- [Advantages & Limitations](#advantages--limitations)
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
