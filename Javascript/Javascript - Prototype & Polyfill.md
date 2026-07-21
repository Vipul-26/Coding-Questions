# Table of Contents

- [Polyfill](#polyfill)
- [Prototype](#prototype)

---

# Polyfill

## Definition

> **A polyfill is JavaScript code that adds support for newer features in older browsers that do not natively support them.**

## Simple Definition

> **A polyfill is a fallback implementation of a modern JavaScript feature for older browsers.**

---

## Why do we need Polyfills?

Some older browsers do not support newer JavaScript features.

Instead of the application failing, we can implement the missing feature ourselves.

Example:

Older browsers may not support:

```javascript
Array.prototype.includes()
```

A polyfill provides the same functionality.

---

## Example

```javascript
if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement) {

        for (let i = 0; i < this.length; i++) {

            if (this[i] === searchElement) {
                return true;
            }

        }

        return false;
    };
}
```

Usage

```javascript
const numbers = [1, 2, 3];

console.log(numbers.includes(2)); // true
```

---

## How It Works

```
Browser

↓

Does includes() exist?

↓

YES ───► Use native implementation

↓

NO

↓

Use Polyfill
```

---

## Common Examples

- `Promise`
- `fetch`
- `Array.prototype.includes()`
- `Array.prototype.find()`
- `Object.assign()`
- `String.prototype.startsWith()`

---

# Prototype

## Definition

> **A prototype is an object from which other objects inherit properties and methods.**

OR

> **Prototype is JavaScript's built-in inheritance mechanism that allows objects to inherit properties and methods from other objects.**

---

## Example

```javascript
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function () {
    console.log(`Hello, I'm ${this.name}`);
};

const user = new Person("Vipul");

user.greet();
```

Output

```text
Hello, I'm Vipul
```

---

## Prototype Chain

```
user
   │
   ▼
Person.prototype
   │
   ▼
Object.prototype
   │
   ▼
null
```

If JavaScript cannot find a property or method on an object, it searches up the prototype chain until it finds it or reaches `null`.

---

## Why do we use Prototypes?

- Code reuse
- Memory efficiency
- Shared methods across all instances
- Enables inheritance

Instead of creating a new copy of a method for every object, all objects share a single method stored on the prototype.

---

# Polyfill vs Prototype

| Polyfill | Prototype |
|-----------|-----------|
| Adds missing browser features. | Enables object inheritance. |
| Used for browser compatibility. | Used for code reuse and inheritance. |
| Written when a browser lacks a feature. | Built into JavaScript. |
| Example: `Array.prototype.includes()` polyfill. | Example: `Person.prototype.greet()`. |

---

# Summary

### Polyfill

- Adds missing JavaScript features.
- Used for older browser compatibility.
- Provides a fallback implementation.

### Prototype

- JavaScript's inheritance mechanism.
- Objects inherit from prototypes.
- Methods on the prototype are shared across all instances.
- JavaScript is prototype-based.
