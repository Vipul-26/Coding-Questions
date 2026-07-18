# Context API

## Table of Contents

- [What is Context API?](#what-is-context-api)
- [Why do we need Context API?](#why-do-we-need-context-api)
- [Problem Without Context API](#problem-without-context-api)
- [How Context API Works](#how-context-api-works)
- [Creating Context](#creating-context)
- [Providing Context](#providing-context)
- [Consuming Context](#consuming-context)
- [useContext Hook](#usecontext-hook)
- [Updating Context](#updating-context)
- [Context API Flow](#context-api-flow)
- [Advantages](#advantages)
- [Limitations](#limitations)
- [Context API vs Redux](#context-api-vs-redux)
- [Best Practices](#best-practices)
- [Common Interview Questions](#common-interview-questions)
- [Interview One-Liners](#interview-one-liners)
- [Summary](#summary)

---

# What is Context API?

## Definition

> **Context API is a built-in React feature that allows data to be shared across multiple components without passing props manually through every level of the component tree.**

## Simple Definition

> **Context API provides a way to share global data across components without prop drilling.**

---

# Why do we need Context API?

Imagine the following component hierarchy:

```
App
│
├── Dashboard
│
├── Sidebar
│
├── Profile
│
└── UserInfo
```

Suppose **UserInfo** needs the logged-in user's data.

Without Context API:

```
App

↓

Dashboard

↓

Sidebar

↓

Profile

↓

UserInfo
```

Every component must pass the prop.

This is called **Prop Drilling**.

---

# Problem Without Context API

```jsx
<App user={user}>

↓

<Dashboard user={user}>

↓

<Sidebar user={user}>

↓

<Profile user={user}>

↓

<UserInfo user={user}/>
```

Intermediate components don't even use `user`.

They simply forward it.

---

# How Context API Works

```
Create Context

↓

Provide Value

↓

Consume Value
```

Only components that need the data consume it.

---

# Creating Context

```jsx
import { createContext } from "react";

const UserContext = createContext();
```

---

# Providing Context

```jsx
import { UserContext } from "./UserContext";

function App() {

  const user = {
    name: "Vipul",
    role: "Frontend Developer"
  };

  return (
    <UserContext.Provider value={user}>
      <Dashboard />
    </UserContext.Provider>
  );
}
```

The `Provider` makes the value available to all child components.

---

# Consuming Context

Using `useContext`

```jsx
import { useContext } from "react";
import { UserContext } from "./UserContext";

function UserInfo() {

  const user = useContext(UserContext);

  return <h2>{user.name}</h2>;
}
```

No prop drilling required.

---

# useContext Hook

```jsx
const value = useContext(MyContext);
```

Returns the nearest Provider's value.

If no Provider exists, it returns the default value passed to `createContext()`.

---

# Updating Context

Context can also store state.

```jsx
const UserContext = createContext();
```

```jsx
function App() {

    const [theme, setTheme] = useState("light");

    return (

        <UserContext.Provider
            value={{
                theme,
                setTheme
            }}
        >
            <Home />
        </UserContext.Provider>

    );
}
```

Consume it

```jsx
const { theme, setTheme } = useContext(UserContext);

setTheme("dark");
```

---

# Context API Flow

```
createContext()

        │

        ▼

Provider

        │

        ▼

Component Tree

        │

        ▼

useContext()
```

---

# Advantages

- Eliminates prop drilling.
- Built into React.
- Easy to use.
- Great for global data.
- Improves code readability.
- No external library required.

---

# Limitations

- Not a complete state management solution.
- Frequent updates can re-render many consumers.
- Can become difficult to maintain if overused.
- Not ideal for very large or complex applications.

---

# Common Use Cases

- Theme (Dark/Light)
- Logged-in User
- Authentication
- Language (i18n)
- Application Settings
- Feature Flags

---

# Context API vs Redux

| Context API | Redux |
|--------------|--------|
| Built into React | External library |
| Best for small to medium global state | Best for large and complex state |
| Simple setup | More setup required |
| No middleware | Supports middleware |
| No DevTools by default | Excellent DevTools |
| Can cause unnecessary re-renders | Better control over updates |

---

# Best Practices

✅ Create separate contexts for different concerns.

Example

```
ThemeContext

AuthContext

LanguageContext
```

instead of

```
GlobalContext
```

---

✅ Memoize context values when necessary.

```jsx
const value = useMemo(() => ({
    user,
    setUser
}), [user]);
```

---

✅ Keep frequently changing state out of Context when possible.

---

# Common Interview Questions

## What problem does Context API solve?

It eliminates **prop drilling** by allowing data to be shared directly across the component tree.

---

## Is Context API a state management library?

No.

It is a **data-sharing mechanism**.

State is usually managed with `useState` or `useReducer`, while Context distributes that state.

---

## Does Context replace Redux?

No.

Context is suitable for simple global state.

Redux is better for large applications with complex state management.

---

## Does updating Context re-render components?

Yes.

When the Provider's value changes, all consuming components using that context re-render.

---

## Can Context store functions?

Yes.

A common pattern is to store both state and updater functions.

```jsx
value={{
    user,
    setUser
}}
```

---

## Can we have multiple Providers?

Yes.

```jsx
<AuthProvider>

    <ThemeProvider>

        <LanguageProvider>

            <App />

        </LanguageProvider>

    </ThemeProvider>

</AuthProvider>
```

---

# Interview One-Liners

- Context API solves prop drilling.
- `createContext()` creates a Context object.
- `Provider` shares data with descendant components.
- `useContext()` consumes context values.
- Context is best for global application data.
- Updating a Context value re-renders its consumers.
- Context is not a replacement for Redux.
- Keep contexts small and focused.

---

# Summary

- Context API shares data without prop drilling.
- `createContext()` creates a Context.
- `Provider` supplies the value.
- `useContext()` reads the value.
- Ideal for authentication, themes, language, and settings.
- Best for small to medium global state.
- Use Redux or other state management libraries for large, complex applications when advanced state management features are needed.
