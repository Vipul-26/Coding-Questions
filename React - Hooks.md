# React Hooks

## Table of Contents

- [What are Hooks?](#what-are-hooks)
- [Rules of Hooks](#rules-of-hooks)
- [useState](#usestate)
- [useEffect](#useeffect)
- [useContext](#usecontext)
- [useReducer](#usereducer)
- [useRef](#useref)
- [useMemo](#usememo)
- [useCallback](#usecallback)
- [useLayoutEffect](#uselayouteffect)
- [useImperativeHandle](#useimperativehandle)
- [useId](#useid)
- [useTransition](#usetransition)
- [useDeferredValue](#usedeferredvalue)
- [useSyncExternalStore](#usesyncexternalstore)
- [useDebugValue](#usedebugvalue)
- [Custom Hooks](#custom-hooks)
- [Hooks Comparison](#hooks-comparison)
- [Common Interview Questions](#common-interview-questions)
- [Interview One-Liners](#interview-one-liners)
- [Summary](#summary)

---

# What are Hooks?

## Definition

> **Hooks are special functions introduced in React 16.8 that allow functional components to use React features such as state, lifecycle methods, context, and refs without writing class components.**

## Simple Definition

> **Hooks let functional components use state and other React features.**

---

# Rules of Hooks

✅ Call Hooks only at the top level.

✅ Call Hooks only inside React components or custom Hooks.

❌ Don't call Hooks inside:

- Loops
- Conditions
- Nested functions

Example

```jsx
// ❌ Wrong
if (isLoggedIn) {
    useEffect(() => {});
}
```

```jsx
// ✅ Correct
useEffect(() => {
    if (isLoggedIn) {
        // logic
    }
}, [isLoggedIn]);
```

---

# useState

## Purpose

Adds local state to a functional component.

```jsx
const [count, setCount] = useState(0);
```

Example

```jsx
function Counter() {

    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            {count}
        </button>
    );
}
```

Use Cases

- Counter
- Form inputs
- Toggle
- Modal

---

# useEffect

## Purpose

Performs side effects after rendering.

```jsx
useEffect(() => {

}, []);
```

Example

```jsx
useEffect(() => {

    fetchUsers();

}, []);
```

Cleanup

```jsx
useEffect(() => {

    const id = setInterval(fetchData, 1000);

    return () => clearInterval(id);

}, []);
```

Use Cases

- API calls
- Timers
- Event listeners
- WebSockets

---

# useContext

## Purpose

Accesses shared data without prop drilling.

```jsx
const user = useContext(UserContext);
```

Use Cases

- Theme
- Authentication
- Language
- User

---

# useReducer

## Purpose

Manages complex state logic.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

Example

```jsx
dispatch({
    type: "increment"
});
```

Best for

- Multiple related states
- Complex updates
- Forms
- Shopping cart

---

# useRef

## Purpose

Stores mutable values without causing re-renders.

```jsx
const inputRef = useRef(null);
```

Example

```jsx
inputRef.current.focus();
```

Use Cases

- DOM access
- Timers
- Previous values
- Persist values

---

# useMemo

## Purpose

Memoizes expensive calculations.

```jsx
const filtered = useMemo(() => {

    return users.filter(user => user.active);

}, [users]);
```

Use When

- Expensive calculations
- Large lists
- Derived state

---

# useCallback

## Purpose

Memoizes functions.

```jsx
const handleClick = useCallback(() => {

    console.log("Clicked");

}, []);
```

Use When

- Passing callbacks to child components
- Preventing unnecessary re-renders
- Works with React.memo()

---

# useLayoutEffect

## Purpose

Runs synchronously after DOM updates but before the browser paints.

```jsx
useLayoutEffect(() => {

    measureElement();

}, []);
```

Use Cases

- Measuring DOM
- Preventing flicker
- Reading layout

---

# useImperativeHandle

## Purpose

Customizes the instance value exposed through `ref`.

```jsx
useImperativeHandle(ref, () => ({
    focus() {
        inputRef.current.focus();
    }
}));
```

Used with

```jsx
forwardRef()
```

---

# useId

## Purpose

Generates unique IDs.

```jsx
const id = useId();
```

Useful for

```jsx
<label htmlFor={id}>

<input id={id} />
```

---

# useTransition

## Purpose

Marks state updates as non-urgent.

```jsx
const [isPending, startTransition] = useTransition();
```

Example

```jsx
startTransition(() => {
    setSearch(query);
});
```

Use Cases

- Search
- Filtering
- Large rendering

---

# useDeferredValue

## Purpose

Defers updating a value until higher-priority updates finish.

```jsx
const deferredQuery = useDeferredValue(query);
```

Useful for

- Search
- Large lists
- Auto-complete

---

# useSyncExternalStore

## Purpose

Subscribes safely to external stores.

```jsx
const state = useSyncExternalStore(
    subscribe,
    getSnapshot
);
```

Use Cases

- Redux
- Zustand
- External state libraries

---

# useDebugValue

## Purpose

Displays custom labels in React DevTools.

```jsx
useDebugValue(isOnline ? "Online" : "Offline");
```

Mostly used inside custom Hooks.

---

# Custom Hooks

A custom Hook is a reusable function that uses one or more React Hooks.

Example

```jsx
function useCounter() {

    const [count, setCount] = useState(0);

    const increment = () => setCount(c => c + 1);

    return {
        count,
        increment
    };
}
```

Usage

```jsx
const { count, increment } = useCounter();
```

---

# Hooks Comparison

| Hook | Purpose |
|------|----------|
| useState | Local state |
| useEffect | Side effects |
| useContext | Share global data |
| useReducer | Complex state |
| useRef | Mutable values / DOM |
| useMemo | Memoize values |
| useCallback | Memoize functions |
| useLayoutEffect | DOM measurements |
| useImperativeHandle | Customize ref |
| useId | Unique IDs |
| useTransition | Non-urgent updates |
| useDeferredValue | Defer rendering |
| useSyncExternalStore | External store subscription |
| useDebugValue | DevTools debugging |

---

# Common Interview Questions

## Why were Hooks introduced?

To allow functional components to use state and lifecycle features without class components.

---

## Difference between useState and useReducer?

- `useState` → Simple state.
- `useReducer` → Complex state logic.

---

## Difference between useMemo and useCallback?

- `useMemo` memoizes a **value**.
- `useCallback` memoizes a **function**.

---

## Difference between useEffect and useLayoutEffect?

- `useEffect` runs **after** the browser paints.
- `useLayoutEffect` runs **before** the browser paints.

---

## Does useRef cause re-render?

No.

Updating `.current` does **not** trigger a re-render.

---

## When should you use Context instead of Redux?

Use Context for:

- Theme
- Authentication
- Language

Use Redux for:

- Large applications
- Complex state
- Frequent updates

---

## Can custom Hooks share state?

No.

Each call to a custom Hook gets its **own isolated state**.

---

# Interview One-Liners

- Hooks were introduced in React 16.8.
- Hooks work only in functional components and custom Hooks.
- `useState` manages local state.
- `useEffect` handles side effects.
- `useRef` doesn't trigger re-renders.
- `useMemo` memoizes values.
- `useCallback` memoizes functions.
- `useReducer` is ideal for complex state.
- `useLayoutEffect` runs before paint.
- `useTransition` improves UI responsiveness.
- `useDeferredValue` defers expensive rendering.
- Custom Hooks help reuse stateful logic.

---

# Summary

| Hook | Primary Purpose |
|------|------------------|
| useState | State management |
| useEffect | Side effects |
| useContext | Global data |
| useReducer | Complex state |
| useRef | DOM & mutable values |
| useMemo | Optimize expensive calculations |
| useCallback | Optimize function references |
| useLayoutEffect | DOM measurement |
| useImperativeHandle | Custom ref methods |
| useId | Unique IDs |
| useTransition | Non-blocking updates |
| useDeferredValue | Deferred rendering |
| useSyncExternalStore | External stores |
| useDebugValue | Debug custom Hooks |
