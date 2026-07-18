# JavaScript Promises Cheat Sheet (Interview Revision)

> Senior Frontend Interview Quick Reference

---

# Table of Contents

- [What is a Promise?](#what-is-a-promise)
- [Promise States](#promise-states)
- [Why do we need Promises?](#why-do-we-need-promises)
- [Creating a Promise](#creating-a-promise)
- [Consuming a Promise](#consuming-a-promise)
- [Promise Chaining](#promise-chaining)
- [Error Handling](#error-handling)
- [finally()](#finally)
- [Promise.resolve()](#promiseresolve)
- [Promise.reject()](#promisereject)
- [Promise.all()](#promiseall)
- [Promise.allSettled()](#promiseallsettled)
- [Promise.race()](#promiserace)
- [Promise.any()](#promiseany)
- [Promise vs Callback](#promise-vs-callback)
- [Promise vs async/await](#promise-vs-asyncawait)
- [Interview Questions](#interview-questions)
- [Common Interview One-Liners](#common-interview-one-liners)
- [30-Second Summary](#30-second-summary)

---

# What is a Promise?

## Definition

> A Promise is an object that represents the eventual completion (success) or failure of an asynchronous operation.

## Simple Definition

> A Promise is a placeholder for a value that will be available in the future.

---

# Promise States

A Promise has **three states**:

```
Pending
   │
   ├────────► Fulfilled (Resolved)
   │
   └────────► Rejected
```

### Pending

Operation is still running.

### Fulfilled

Operation completed successfully.

### Rejected

Operation failed.

> A Promise can settle only once.

---

# Why do we need Promises?

Before Promises we used callbacks.

```
Login

↓

Fetch User

↓

Fetch Orders

↓

Fetch Payment
```

Result:

```
callback(
    callback(
        callback(
            callback()
        )
    )
)
```

This is called **Callback Hell**.

Promises solve this using chaining.

---

# Creating a Promise

```javascript
const promise = new Promise((resolve, reject) => {

    const success = true;

    if(success){
        resolve("Success");
    }else{
        reject("Failed");
    }

});
```

---

# Consuming a Promise

```javascript
promise
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });
```

---

# Promise Chaining

```javascript
fetchUser()
    .then(user => fetchOrders(user.id))
    .then(orders => fetchPayment(orders))
    .then(result => console.log(result))
    .catch(err => console.log(err));
```

Each `.then()` returns a new Promise.

---

# Error Handling

```javascript
fetchData()
    .then(data => process(data))
    .catch(error => {
        console.log(error);
    });
```

Errors automatically travel down to the nearest `.catch()`.

---

# finally()

Runs whether Promise succeeds or fails.

```javascript
fetchData()
    .then(data => console.log(data))
    .catch(err => console.log(err))
    .finally(() => {
        console.log("Cleanup");
    });
```

Use cases:

- Hide loader
- Close DB connection
- Stop spinner

---

# Promise.resolve()

Returns an already resolved Promise.

```javascript
Promise.resolve("Hello")
    .then(console.log);
```

Output

```
Hello
```

---

# Promise.reject()

Returns an already rejected Promise.

```javascript
Promise.reject("Something went wrong")
.catch(console.log);
```

---

# Promise.all()

Runs multiple Promises in parallel.

Returns when **all succeed**.

```javascript
Promise.all([
    fetchUser(),
    fetchOrders(),
    fetchPayment()
])
.then(console.log);
```

If **one fails**

Entire Promise fails.

---

# Promise.allSettled()

Waits for every Promise.

Never fails.

```javascript
Promise.allSettled([
    fetchUser(),
    fetchOrders(),
    fetchPayment()
]);
```

Returns

```javascript
[
   {status:"fulfilled"},
   {status:"rejected"},
   {status:"fulfilled"}
]
```

---

# Promise.race()

Returns the first settled Promise.

```javascript
Promise.race([
    fetchA(),
    fetchB()
]);
```

Winner can be

- Success
- Failure

Whichever finishes first.

---

# Promise.any()

Returns first successful Promise.

Ignores failures.

```javascript
Promise.any([
    fetchA(),
    fetchB(),
    fetchC()
]);
```

Fails only when **all fail**.

---

# Promise vs Callback

| Callback | Promise |
|-----------|----------|
| Nested code | Flat code |
| Callback Hell | Cleaner |
| Hard error handling | Better error handling |
| Difficult chaining | Easy chaining |

---

# Promise vs async/await

| Promise | async/await |
|----------|------------|
| Uses `.then()` | Uses `await` |
| Chain based | Looks synchronous |
| Better for multiple chains | Better readability |
| Same underlying Promise | Same underlying Promise |

Example

Promise

```javascript
fetchData()
.then(data=>console.log(data))
.catch(console.error);
```

async/await

```javascript
try{

   const data = await fetchData();

   console.log(data);

}catch(err){

   console.log(err);

}
```

---

# Common Promise APIs

| API | Description |
|------|-------------|
| Promise.resolve() | Immediately resolved Promise |
| Promise.reject() | Immediately rejected Promise |
| Promise.all() | Wait for all |
| Promise.allSettled() | Wait for all regardless of result |
| Promise.race() | First settled wins |
| Promise.any() | First success wins |

---

# Interview Questions

## What is a Promise?

An object representing future completion or failure of an async operation.

---

## Can a Promise change state?

No.

```
Pending

↓

Fulfilled
```

OR

```
Pending

↓

Rejected
```

Never both.

---

## What does then() return?

A new Promise.

---

## Difference between resolve() and reject()?

resolve()

```
Success
```

reject()

```
Failure
```

---

## Difference between Promise.all() and Promise.allSettled()?

Promise.all()

- Fails immediately if one Promise fails.

Promise.allSettled()

- Waits for every Promise.

---

## Difference between Promise.race() and Promise.any()?

Promise.race()

Returns first settled Promise.

Can fail.

Promise.any()

Returns first successful Promise.

Ignores failures.

---

## Is Promise synchronous or asynchronous?

**Creating a Promise (`new Promise(...)`) is synchronous.**

The callbacks registered with `.then()`, `.catch()`, and `.finally()` run asynchronously as **microtasks** after the current synchronous code finishes.

Example:

```javascript
console.log("Start");

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

Output

```
Start
End
Promise
```

---

## Does Promise execute immediately?

Yes.

```javascript
const p = new Promise(() => {
    console.log("Runs immediately");
});
```

The executor function runs as soon as the Promise is created.

---

# Common Interview One-Liners

✔ Promise represents future completion or failure.

✔ Promise has three states: Pending, Fulfilled, Rejected.

✔ A Promise settles only once.

✔ `.then()` always returns a new Promise.

✔ Errors propagate to the nearest `.catch()`.

✔ `.finally()` runs regardless of success or failure.

✔ `Promise.all()` fails fast.

✔ `Promise.allSettled()` never fails.

✔ `Promise.race()` returns the first settled Promise.

✔ `Promise.any()` returns the first fulfilled Promise.

✔ Promise callbacks (`then`, `catch`, `finally`) execute as microtasks.

---

# 30-Second Summary

- Promise = Future value
- States = Pending → Fulfilled / Rejected
- `.then()` handles success
- `.catch()` handles errors
- `.finally()` always executes
- `.then()` returns a new Promise
- `Promise.all()` → All must succeed
- `Promise.allSettled()` → Wait for all
- `Promise.race()` → First settled wins
- `Promise.any()` → First success wins
- Promise callbacks run in the **Microtask Queue**
