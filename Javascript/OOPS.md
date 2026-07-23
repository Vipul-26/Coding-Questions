# Object-Oriented Programming (OOP) in JavaScript

# Table of Contents

- [What is OOP?](#what-is-oop)
- [Four Pillars](#four-pillars)
- [Object Literal](#object-literal)
- [Constructor Function (Old Way)](#constructor-function-old-way)
- [ES6 Class](#es6-class)
- [`this` Keyword](#this-keyword)
- [Encapsulation](#encapsulation)
- [Private Fields (Real Encapsulation)](#private-fields-real-encapsulation)
- [Abstraction](#abstraction)
- [Inheritance](#inheritance)
- [Using `super()`](#using-super)
- [Polymorphism](#polymorphism)
- [Method Overriding](#method-overriding)
- [Static Methods](#static-methods)
- [Getter & Setter](#getter--setter)
- [Prototype](#prototype)
- [Prototype Chain](#prototype-chain)
- [Class vs Object](#class-vs-object)
- [Class vs Constructor Function](#class-vs-constructor-function)
- [`Object.create()`](#objectcreate)
- [`instanceof`](#instanceof)
- [`hasOwnProperty()`](#hasownproperty)
- [`Object.keys()`](#objectkeys)
- [`Object.values()`](#objectvalues)
- [`Object.entries()`](#objectentries)
- [`Object.freeze()`](#objectfreeze)
- [`Object.seal()`](#objectseal)
- [Composition vs Inheritance](#composition-vs-inheritance)
- [Interview Questions](#interview-questions)
- [Common Interview One-Liners](#common-interview-one-liners)
- [30-Second Summary](#30-second-summary)

---

# What is OOP?

Object-Oriented Programming is a programming paradigm that organizes code into **objects** containing:

- Data (Properties)
- Behavior (Methods)

### Four Pillars

1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism

---

# Object Literal

```javascript
const user = {
  name: "Vipul",

  greet() {
    console.log(`Hello ${this.name}`);
  }
};

user.greet();
```

Used for small objects.

---

# Constructor Function (Old Way)

```javascript
function User(name) {
  this.name = name;
}

User.prototype.greet = function () {
  console.log(this.name);
};

const u1 = new User("Vipul");
```

Before ES6 classes.

---

# ES6 Class

```javascript
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(this.name);
  }
}

const user = new User("Vipul");
```

Remember:

Classes are **syntactic sugar** over prototypes.

---

# this Keyword

```javascript
class User {
  constructor(name){
    this.name = name;
  }

  greet(){
    console.log(this.name);
  }
}
```

`this` refers to the object calling the method.

Example:

```javascript
user.greet();
```

Inside greet()

```
this === user
```

---

# Encapsulation

Encapsulation means keeping related data and methods together inside a class and controlling access to the data.

```javascript
class BankAccount {

  balance = 0;

  deposit(amount){
      this.balance += amount;
  }

  getBalance(){
      return this.balance;
  }
}
```

---

# Private Fields (Real Encapsulation)

```javascript
class BankAccount {

   #balance = 0;

   deposit(amount){
      this.#balance += amount;
   }

   getBalance(){
      return this.#balance;
   }
}
```

Cannot access

```javascript
account.#balance
```

Interview Point

Private fields start with **#**

---

# Abstraction

Abstraction is the OOP principle of hiding unnecessary implementation details and exposing only the essential functionality to the user.

```javascript
class Payment {

   pay(){
      this.validate();
      this.process();
   }

   validate(){}

   process(){}
}
```

User only calls

```javascript
payment.pay();
```

No need to know internal logic.

---

# Inheritance

## Definition

> **Inheritance is the OOP principle that allows a class (child/subclass) to inherit the properties and methods of another class (parent/superclass), enabling code reuse and extension.**

---

## Simple Definition

> **Inheritance allows one class to reuse the properties and methods of another class.**

---

## Real-World Example

A **Dog** is an **Animal**.

Both have common behaviors like:

- Eat
- Sleep
- Breathe

A Dog also has its own behavior:

- Bark

Instead of rewriting the common methods, the Dog inherits them from Animal.

```
Animal
 ├── eat()
 ├── sleep()
 └── breathe()

      ▲
      │ extends

Dog
 └── bark()
```

---

## JavaScript Example

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} is barking`);
  }
}

const dog = new Dog("Bruno");

dog.eat();   // Inherited
dog.bark();  // Own method
```

**Output**

```
Bruno is eating
Bruno is barking
```

---

## Using super()

`super()` calls the parent class constructor.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
}

const dog = new Dog("Bruno", "Labrador");

console.log(dog.name);
console.log(dog.breed);
```

Without calling `super()`, JavaScript throws a **ReferenceError** because the parent constructor must initialize `this` before it can be used.

---

## Why do we use Inheritance?

- Reuse existing code.
- Avoid duplication.
- Easily extend functionality.
- Improve maintainability.
- Model real-world relationships.

---

## Inheritance Interview One-Liner

> **Inheritance allows a child class to acquire the properties and methods of a parent class, promoting code reuse and extensibility.**

---

## Inheritance — Common Interview Questions

### Q. Which keyword is used for inheritance?

```javascript
extends
```

Example:

```javascript
class Dog extends Animal {}
```

---

### Q. What is `super()`?

`super()` calls the parent class constructor or parent methods.

Constructor example:

```javascript
super(name);
```

Method example:

```javascript
class Animal {
  speak() {
    console.log("Animal speaks");
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
    console.log("Dog barks");
  }
}
```

---

### Q. Does JavaScript support multiple inheritance?

**No.**

A class can extend only one class.

```javascript
class A {}
class B {}

// ❌ Not allowed
class C extends A, B {}
```

Instead, JavaScript commonly uses:

- Composition
- Mixins

---

## Inheritance vs Composition

### Inheritance (IS-A relationship)

```
Dog IS-A Animal
```

```javascript
class Dog extends Animal {}
```

---

### Composition (HAS-A relationship)

```
Car HAS-A Engine
```

```javascript
class Engine {}

class Car {
  constructor() {
    this.engine = new Engine();
  }
}
```

Modern JavaScript applications generally prefer **Composition over Inheritance** because it creates more flexible and loosely coupled code.

---

## Easy Way to Remember

- **Inheritance = "IS-A" relationship**
- **Composition = "HAS-A" relationship**

Examples:

```
Dog IS-A Animal ✅

Car HAS-A Engine ✅

Employee IS-A Person ✅

Laptop HAS-A Keyboard ✅
```

---

## JavaScript Behind the Scenes

Although we use the `class` and `extends` syntax, JavaScript inheritance is actually implemented through the **prototype chain**.

```javascript
class Dog extends Animal {}
```

Internally, JavaScript links the prototypes so that if a property or method isn't found on `Dog`, it looks up the prototype chain to `Animal`.

---

## Inheritance — Quick Summary

- Inheritance enables one class to reuse another class's properties and methods.
- Implemented using the `extends` keyword.
- `super()` calls the parent constructor or methods.
- Promotes code reuse and extensibility.
- JavaScript inheritance works through the **prototype chain**.
- Supports **single inheritance** only.
- Prefer **Composition over Inheritance** for complex applications.

---

# Polymorphism

Same method behaves differently.

```javascript
class Animal{

   speak(){
      console.log("...");
   }
}

class Dog extends Animal{

   speak(){
      console.log("Bark");
   }
}

class Cat extends Animal{

   speak(){
      console.log("Meow");
   }
}
```

```
dog.speak();

cat.speak();
```

Different outputs.

---

# Method Overriding

```javascript
class Parent{

   greet(){
      console.log("Hello");
   }
}

class Child extends Parent{

   greet(){
      console.log("Hi");
   }
}
```

Child replaces parent implementation.

---

# Static Methods

Belong to class.

Not object.

```javascript
class MathUtil{

   static add(a,b){
      return a+b;
   }
}

MathUtil.add(2,3);
```

Cannot do

```javascript
const m = new MathUtil();

m.add();
```

---

# Getter & Setter

```javascript
class User{

   constructor(name){
      this._name = name;
   }

   get name(){
      return this._name;
   }

   set name(value){
      this._name = value;
   }
}
```

Usage

```javascript
user.name = "John";

console.log(user.name);
```

---

# Prototype

Every JS object has a prototype.

```
Object

↓

Prototype

↓

null
```

Example

```javascript
function User(){}

User.prototype.sayHi = function(){
    console.log("Hi");
};

const u = new User();

u.sayHi();
```

---

# Prototype Chain

```
Dog

↓

Animal

↓

Object

↓

null
```

JavaScript searches upward until it finds the property.

---

# Class vs Object

| Class | Object |
|--------|--------|
| A blueprint or template for creating objects. | An actual instance created from a class. |
| Defines properties and methods. | Holds real values and can use the methods. |
| Created using the `class` keyword. | Created using the `new` keyword (or object literals). |
| Does not occupy memory for instance data until objects are created. | Occupies memory when instantiated. |
| One class can create many objects. | Each object has its own state (property values). |

### Example

```javascript
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  start() {
    console.log(`${this.brand} ${this.model} started`);
  }
}

const car1 = new Car("Toyota", "Fortuner");
const car2 = new Car("Honda", "City");

car1.start(); // Toyota Fortuner started
car2.start(); // Honda City started
```

### Interview Explanation

- **Class** = Blueprint
- **Object** = Real thing created from that blueprint

Real-world analogy:

```
House Blueprint (Class)
          ↓
     Build House #1 (Object)

          ↓
     Build House #2 (Object)

          ↓
     Build House #3 (Object)
```

One blueprint can be used to build many houses, and each house can have different colors, owners, or furniture while sharing the same design.

### Interview One-Liner

> **A class is a blueprint that defines the structure and behavior of objects, whereas an object is a real instance of that class containing actual data.**

---

# Class vs Constructor Function

| Constructor Function | ES6 Class |
|----------------------|----------|
| Older syntax | Modern syntax |
| Uses prototype manually | Uses class keyword |
| More verbose | Cleaner |
| Same prototype mechanism | Same prototype mechanism |

---

# Object.create()

Creates object with custom prototype.

```javascript
const animal = {
   speak(){
      console.log("...");
   }
};

const dog = Object.create(animal);

dog.speak();
```

---

# instanceof

Checks inheritance.

```javascript
dog instanceof Dog

dog instanceof Animal

dog instanceof Object
```

Returns true if prototype exists in chain.

---

# hasOwnProperty()

Checks own property only.

```javascript
user.hasOwnProperty("name");
```

Doesn't check prototype.

---

# Object.keys()

Own enumerable keys.

```javascript
Object.keys(user);
```

---

# Object.values()

```javascript
Object.values(user);
```

---

# Object.entries()

```javascript
Object.entries(user);
```

---

# Object.freeze()

Cannot modify.

```javascript
const user = Object.freeze({
   name:"Vipul"
});
```

---

# Object.seal()

Can update existing.

Cannot add/remove.

---

# Composition vs Inheritance

Inheritance

```
Dog extends Animal
```

Composition

```
Car has Engine
```

Modern JavaScript prefers **Composition over Inheritance** because it is more flexible and avoids tight coupling.

---

# Interview Questions

## Why were ES6 classes introduced?

Cleaner syntax over prototypes.

---

## Are classes real classes?

No.

They are syntactic sugar over prototypes.

---

## Difference between class and prototype?

Class is syntax.

Prototype is the actual inheritance mechanism.

---

## Difference between Object.create() and new?

new

- Calls constructor
- Sets prototype
- Returns object

Object.create()

- Doesn't call constructor
- Only links prototype

---

## Why use private fields?

To prevent direct access and achieve encapsulation.

---

## Difference between static and instance methods?

Instance

```javascript
user.greet();
```

Static

```javascript
User.create();
```

---

## What is method overriding?

Child replaces parent implementation.

---

## Does JavaScript support multiple inheritance?

No.

Can use

- Mixins
- Composition

---

## Why is composition preferred?

- Loose coupling
- Easier testing
- Better scalability
- More reusable

---

# Common Interview One-Liners

✔ JavaScript is prototype-based, not class-based.

✔ ES6 classes are syntactic sugar over prototypes.

✔ Every object has an internal [[Prototype]].

✔ Inheritance works via prototype chain.

✔ `new` creates object + links prototype + executes constructor.

✔ `this` depends on how a function is called.

✔ Prefer Composition over Inheritance.

✔ Use private fields (#) for encapsulation.

✔ Static methods belong to class, not instances.

✔ Prototype methods are shared across all instances.

---

# 30-Second Summary

- Object → Collection of properties & methods
- Class → Blueprint
- Object → Instance of class
- Encapsulation → Hide data
- Abstraction → Hide implementation
- Inheritance → Reuse code
- Polymorphism → Same method, different behavior
- Prototype → Real inheritance mechanism
- ES6 Class → Cleaner syntax over prototype
- Composition > Inheritance (preferred)
