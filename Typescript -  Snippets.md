# TypeScript - Table of Contents

1. Basic Types
2. Type vs Interface
3. Union & Intersection
4. Functions
5. Generics
6. Utility Types
7. keyof & typeof
8. Classes
9. Type Guards
10. React + TypeScript
11. API Typing
12. Common Interview Questions

---

# 1. Basic Types

```ts
let name: string = "Vipul";
let age: number = 27;
let active: boolean = true;
let skills: string[] = ["React", "TypeScript"];

let tuple: [string, number] = ["React", 5];

let anything: any = "Hello";
let unknownValue: unknown = "Hello";

function error(): never {
    throw new Error("Error");
}
```

### Interview Questions

- Difference between `any`, `unknown`, `never`, and `void`
- Tuple vs Array

---

# 2. Type vs Interface

## Type

```ts
type User = {
    id: number;
    name: string;
}
```

## Interface

```ts
interface User {
    id: number;
    name: string;
}
```

### Differences

| Type | Interface |
|------|-----------|
| Supports unions | ❌ |
| Supports intersections | ❌ |
| Declaration merging | ❌ | ✅ |
| Extendable | ✅ | ✅ |

### When to use?

✅ Interface

- Objects
- API Models
- Props

✅ Type

- Union
- Intersection
- Utility Types

---

# 3. Union

```ts
let id: number | string;
```

---

# 4. Intersection

```ts
type User = {
    name: string;
}

type Employee = {
    salary: number;
}

type Person = User & Employee;
```

---

# 5. Functions

```ts
function add(a:number,b:number):number{
    return a+b;
}

const subtract=(a:number,b:number)=>a-b;
```

Optional Parameter

```ts
function greet(name?:string){}
```

Default Parameter

```ts
function sum(value:number=0){}
```

Rest Parameter

```ts
function total(...nums:number[]){}
```

---

# 6. Generics ⭐⭐⭐⭐⭐

```ts
function identity<T>(value:T):T{
    return value;
}
```

Generic Constraint

```ts
interface Length{
    length:number;
}

function log<T extends Length>(arg:T){
    return arg.length;
}
```

## Interview Question

### Q1. Why use Generics instead of `any`?

Answer

`any` disables TypeScript's type checking, allowing any value to be passed and returned without validation.

Generics preserve the type information while still making the function reusable.

Example

```ts
function identity<T>(value: T): T {
    return value;
}
```

### Q2. What are Generic Constraints?

Sometimes we don't want every type.

Example

```ts
interface HasLength {
    length: number;
}

function logLength<T extends HasLength>(value: T) {
    return value.length;
}
```

Now only values having a `length` property are allowed.

Valid

```ts
logLength("React");
logLength([1,2,3]);
```

Invalid

```ts
logLength(100);
```

because numbers don't have a `length` property.

---

## Common Mistakes

❌ Using `any` instead of Generics

❌ Forgetting Generic Constraints

❌ Overusing Generics where normal types are sufficient

---

## Senior Interview Follow-up

**Interviewer:** Where have you used Generics in React?

Answer:

- Generic API responses
- Generic custom hooks
- Reusable table components
- Form components
- Dropdown components
- Utility functions

Example

```ts
interface ApiResponse<T> {
    data: T;
    message: string;
}
```

---

---

# 7. keyof

```ts
type User={
    id:number;
    name:string;
}

type Keys=keyof User;
```

Result

```ts
"id" | "name"
```

---

# 8. typeof

```ts
const user={
    name:"Vipul"
}

type UserType=typeof user;
```

---

# 9. Utility Types ⭐⭐⭐⭐⭐

## Partial

```ts
Partial<User>
```

Makes all properties optional.

---

## Required

```ts
Required<User>
```

Makes all properties required.

---

## Readonly

```ts
Readonly<User>
```

Cannot modify.

---

## Pick

```ts
Pick<User,"name">
```

Select specific properties.

---

## Omit

```ts
Omit<User,"id">
```

Remove properties.

---

## Record

```ts
Record<string,User>
```

Dictionary/Object Map.

---

## Exclude

```ts
Exclude<"a"|"b"|"c","a">
```

Result

```ts
"b" | "c"
```

---

## Extract

```ts
Extract<"a"|"b","a"|"c">
```

Result

```ts
"a"
```

---

## NonNullable

```ts
NonNullable<string|null>
```

Removes `null` and `undefined`.

---

# 10. Classes

```ts
class Animal{

    constructor(public name:string){}

    speak(){}
}

class Dog extends Animal{

    bark(){}
}
```

Know

- public
- private
- protected
- readonly
- abstract

---

# 11. Type Guards

```ts
function print(id:number|string){

    if(typeof id==="string"){

    }

    if(typeof id==="number"){

    }

}
```

---

# 12. Optional Chaining

```ts
user?.address?.city
```

---

# 13. Nullish Coalescing

```ts
const value=data ?? "Default";
```

---

# 14. React Props

```tsx
type Props={
    title:string;
}

function Button({title}:Props){
    return <button>{title}</button>;
}
```

---

# 15. useState

```tsx
const [count,setCount]=useState<number>(0);
```

---

# 16. useRef

```tsx
const inputRef=useRef<HTMLInputElement>(null);
```

---

# 17. Event Types

Input

```tsx
React.ChangeEvent<HTMLInputElement>
```

Button

```tsx
React.MouseEvent<HTMLButtonElement>
```

Form

```tsx
React.FormEvent<HTMLFormElement>
```

Keyboard

```tsx
React.KeyboardEvent<HTMLInputElement>
```

---

# 18. Generic API Response

```ts
interface ApiResponse<T>{
    data:T;
    message:string;
}

const response:ApiResponse<User>={
    data:{
        id:1,
        name:"Vipul"
    },
    message:"Success"
}
```

---
