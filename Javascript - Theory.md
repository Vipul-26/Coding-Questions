# Interview Questions

A comprehensive collection of JavaScript, React, HTML, CSS, and related web development interview topics with code examples.

---

## Table of Contents

- [JavaScript Fundamentals](#javascript-fundamentals)
  - [Array Methods](#array-methods)
  - [Scope and Closures](#scope-and-closures)
  - [IIFE](#iife)
  - [Promises](#promises)
  - [Promise.all vs Promise.allSettled vs Promise.race vs Promise.any](#promiseall-vs-promiseallsettled-vs-promiserace-vs-promiseany)
  - [Callback vs Promises](#callback-vs-promises)
  - [call, apply, bind](#call-apply-bind)
  - [Currying](#currying)
  - [Object and Array Destructuring](#object-and-array-destructuring)
  - [Arrow Functions](#arrow-functions)
  - [Function Statement vs Expression](#function-statement-vs-expression)
  - [Callback Hell](#callback-hell)
  - [Map and Set](#map-and-set)
  - [WeakMap and WeakSet](#weakmap-and-weakset)
  - [Prototype](#prototype)
  - [Miscellaneous JS Gotchas](#miscellaneous-js-gotchas)
- [React](#react)
  - [Mapping Data](#mapping-data)
  - [Outside Click Handler](#outside-click-handler)
  - [Controlled vs Uncontrolled Components](#controlled-vs-uncontrolled-components)
  - [Props Drilling and Context API](#props-drilling-and-context-api)
  - [Lazy Loading](#lazy-loading)
  - [Memoization and useCallback](#memoization-and-usecallback)
  - [Passing Data from Child to Parent](#passing-data-from-child-to-parent)
  - [API Calls: fetch vs axios](#api-calls-fetch-vs-axios)
  - [Refs and Forwarding Refs](#refs-and-forwarding-refs)
  - [Component vs PureComponent](#component-vs-purecomponent)
  - [setInterval and setTimeout](#setinterval-and-settimeout)
  - [React Strict Mode](#react-strict-mode)
  - [Hook Order Rule](#hook-order-rule)
  - [Common React Facts](#common-react-facts)
- [DOM Manipulation](#dom-manipulation)
- [HTML](#html)
- [CSS and Sass](#css-and-sass)

---

## JavaScript Fundamentals

### Array Methods

#### map()

```javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((item) => item * 2);
console.log(doubled); // [2, 4, 6, 8]
```

#### filter()

```javascript
const numbers = [1, 2, 3, 4];
const evens = numbers.filter((item) => item % 2 === 0);
console.log(evens); // [2, 4]
```

#### reduce()

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce(function (result, item) {
  return result + item;
}, 0);
console.log(sum); // 10
```

#### forEach()

```javascript
companies.forEach(function (company) {
  console.log(company.name);
});
```

#### sort()

```javascript
const sortAges = ages.sort((a, b) => a - b);
console.log(sortAges);
```

#### Chaining: reduce to count occurrences

```javascript
const fruitBasket = [
  "banana", "cherry", "orange", "apple", "cherry",
  "orange", "apple", "banana", "cherry", "orange", "fig",
];

const output = fruitBasket.reduce((dist, item) => {
  if (dist[item]) {
    dist[item] = ++dist[item];
  } else {
    dist[item] = 1;
  }
  return dist;
}, {});

console.log(output);
```

#### Chaining: filter + sort

```javascript
var food = [
  { type: "fruit", name: "Banana", price: 10 },
  { type: "vegetable", name: "Lettuce", price: 8 },
  { type: "fruit", name: "Strawberry", price: 106 },
  { type: "nut", name: "Brazil", price: 140 },
  { type: "fruit", name: "Orange", price: 3 },
  { type: "vegetable", name: "Onion", price: 9000 },
  { type: "nut", name: "Peanut", price: 400 },
];

// Filter fruits, then sort by price
const output = food.filter((item) => item.type === "fruit");
const sortedPrice = output.sort((a, b) => a.price - b.price);
console.log(sortedPrice);

// Sort by name alphabetically
const sortedName = output.sort((a, b) => {
  let fName = a.name.toLowerCase();
  let lName = b.name.toLowerCase();
  return fName < lName ? -1 : fName > lName ? 1 : 0;
});
console.log(sortedName);
```

---

### Scope and Closures

#### var vs let in loops

```javascript
function x() {
  // var: prints 3, 3, 3
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
  }

  // let: prints 0, 1, 2
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 1000);
  }
}

x();
```

Because of the event queue in JavaScript, the `setTimeout` callback function is called after the loop has been executed. Since `var` is function-scoped, `i` is `3` by the time the callbacks run. With `let`, each iteration gets its own block-scoped `i`.

#### Closure

```javascript
function x() {
  var a = 7;
  function y() {
    console.log(a);
  }
  return y;
}

var z = x();
console.log(z()); // 7
```

A closure is the combination of a function bundled together with references to its surrounding state (lexical environment). Even after `x()` has returned, `y` still has access to `a`.

---

### IIFE

Immediately Invoked Function Expression (uses the grouping operator):

```javascript
(function (data) {
  console.log("Vipul", data);
})(data);
```

---

### Promises

#### Promise Producer

```javascript
var promise = new Promise(function (resolve, reject) {
  const x = "geeksforgeeks";
  const y = "geeksforgeeks";
  if (x === y) {
    resolve();
  } else {
    reject();
  }
});
```

#### Promise Consumer

```javascript
promise
  .then(function () {
    console.log("Success, You are a GEEK");
  })
  .catch(function () {
    console.log("Some error has occurred");
  });
```

#### Promise.all()

```javascript
let first_promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Resolved First after 1 second"), 1000);
});

let second_promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Resolved Second after 2 seconds"), 2000);
});

let third_promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Resolved Third after 3 seconds"), 3000);
});

try {
  let result = Promise.all([first_promise, second_promise, third_promise]);
  result.then((data) => console.log(data));
} catch (error) {
  console.log(error);
}
```

---

### Promise.all vs Promise.allSettled vs Promise.race vs Promise.any

| Feature | `Promise.all` | `Promise.allSettled` | `Promise.race` | `Promise.any` |
|---|---|---|---|---|
| **Returns** | Single promise | Single promise | Single promise | Single promise |
| **Resolves when** | **All** promises resolve | **All** promises settle (resolve or reject) | **First** promise settles (resolve or reject) | **First** promise resolves |
| **Rejects when** | **Any one** promise rejects | **Never** rejects (always resolves) | **First** promise settles with rejection | **All** promises reject |
| **Result value** | Array of resolved values | Array of `{status, value/reason}` objects | Value/reason of the first settled promise | Value of the first resolved promise |
| **Error type** | Rejects with the first rejection reason | N/A | Rejects with the first rejection reason | `AggregateError` (contains all rejection reasons) |
| **Short-circuits?** | Yes, on first rejection | No, waits for all | Yes, on first settlement | Yes, on first fulfillment |
| **Use case** | All results needed, fail fast | Need outcome of every promise regardless of failure | Timeout races, fastest response | First successful result from multiple sources |

#### Promise.all()

Resolves when **all** promises resolve. Rejects immediately if **any one** rejects.

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then((values) => console.log(values))   // [1, 2, 3]
  .catch((err) => console.log(err));

// If any one rejects:
const p4 = Promise.reject("Error!");
Promise.all([p1, p2, p4])
  .then((values) => console.log(values))
  .catch((err) => console.log(err));        // "Error!"
```

#### Promise.allSettled()

Waits for **all** promises to settle (resolve or reject). Never short-circuits. Always resolves with an array of result objects.

```javascript
const p1 = Promise.resolve("Success");
const p2 = Promise.reject("Failed");
const p3 = Promise.resolve("Done");

Promise.allSettled([p1, p2, p3]).then((results) => {
  console.log(results);
  // [
  //   { status: "fulfilled", value: "Success" },
  //   { status: "rejected",  reason: "Failed" },
  //   { status: "fulfilled", value: "Done" }
  // ]
});
```

#### Promise.race()

Settles as soon as the **first** promise settles (whether it resolves or rejects).

```javascript
const slow = new Promise((resolve) =>
  setTimeout(() => resolve("Slow"), 3000)
);
const fast = new Promise((resolve) =>
  setTimeout(() => resolve("Fast"), 1000)
);

Promise.race([slow, fast])
  .then((value) => console.log(value))     // "Fast"
  .catch((err) => console.log(err));

// If the fastest promise rejects:
const failing = new Promise((_, reject) =>
  setTimeout(() => reject("Timeout!"), 500)
);

Promise.race([slow, fast, failing])
  .then((value) => console.log(value))
  .catch((err) => console.log(err));       // "Timeout!"
```

#### Promise.any()

Resolves as soon as the **first** promise resolves. Ignores rejections unless **all** reject (throws `AggregateError`).

```javascript
const p1 = Promise.reject("Error 1");
const p2 = new Promise((resolve) =>
  setTimeout(() => resolve("Second"), 2000)
);
const p3 = new Promise((resolve) =>
  setTimeout(() => resolve("Third"), 1000)
);

Promise.any([p1, p2, p3])
  .then((value) => console.log(value))     // "Third" (first to resolve)
  .catch((err) => console.log(err));

// If all reject:
const f1 = Promise.reject("Err 1");
const f2 = Promise.reject("Err 2");
const f3 = Promise.reject("Err 3");

Promise.any([f1, f2, f3])
  .then((value) => console.log(value))
  .catch((err) => {
    console.log(err);                      // AggregateError: All promises were rejected
    console.log(err.errors);               // ["Err 1", "Err 2", "Err 3"]
  });
```

#### Visual Summary

```
Promise.all       ──▶ ALL resolve ✅  or  ANY reject ❌  (fail-fast)
Promise.allSettled──▶ ALL settle ✅❌      (never rejects)
Promise.race      ──▶ FIRST to settle     (resolve ✅ or reject ❌)
Promise.any       ──▶ FIRST to resolve ✅ or ALL reject ❌ (AggregateError)
```

---

### Callback vs Promises

#### Using Promises

```javascript
const students = [
  { name: "vipul", subject: "JavaScript" },
  { name: "kumar", subject: "React" },
];

function enrollStudent(student) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      students.push(student);
      console.log("Student has been enrolled");
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}

function getStudents() {
  setTimeout(function () {
    let str = "";
    students.forEach(function (student) {
      str += `<li> ${student.name}</li>`;
    });
    document.getElementById("students").innerHTML = str;
    console.log("Students have been fetched");
  }, 5000);
}

let newStudent = { name: "singh", subject: "Python" };
enrollStudent(newStudent)
  .then(getStudents)
  .catch(function () {
    console.log("Some error occured");
  });
```

#### Using Callbacks

```javascript
function enrollStudent(student, callback) {
  setTimeout(function () {
    students.push(student);
    console.log("Student has been enrolled");
    callback();
  }, 1000);
}

function getStudents() {
  setTimeout(function () {
    let str = "";
    students.forEach(function (student) {
      str += `<li> ${student.name}</li>`;
    });
    document.getElementById("students").innerHTML = str;
    console.log("Students have been fetched");
  }, 5000);
}

let newStudent = { name: "Sunny", subject: "Python" };
enrollStudent(newStudent, getStudents);
```

---

### call, apply, bind

```javascript
var pokemon = {
  firstname: "Pika",
  lastname: "Chu ",
  getPokeName: function () {
    var fullname = this.firstname + " " + this.lastname;
    return fullname;
  },
};

var pokemonName = function (snack, hobby) {
  console.log(this.getPokeName() + " loves " + snack + " and " + hobby);
};

// call: arguments passed individually
pokemonName.call(pokemon, "sushi", "algorithms");

// apply: arguments passed as an array
pokemonName.apply(pokemon, ["sushi", "algorithms"]);

// bind: returns a new function with bound context
var logPokemon = pokemonName.bind(pokemon);
logPokemon("sushi", "algorithms");
```

---

### Currying

#### Using nested arrow functions

```javascript
const addCurry = (a) => {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
};

addCurry(2)(3)(4); // 9
```

#### Using bind

```javascript
const addCurry = (a, b) => {
  return a + b;
};

const addCurryTwo = addCurry.bind(this, 2);
addCurryTwo(3); // 5

const addCurryThree = addCurry.bind(this, 10);
addCurryThree(20); // 30
```

#### Practical use case: avoiding repeated arguments

```javascript
function volume(h) {
  return (w) => {
    return (l) => {
      return l * w * h;
    };
  };
}

const hCylinderHeight = volume(100);
hCylinderHeight(200)(30); // 600,000
hCylinderHeight(2322)(232); // 53,870,400
```

---

### Object and Array Destructuring

#### Basic destructuring

```javascript
const user = {
  name: "Alex",
  address: "15th Park Avenue",
  age: 43,
};

const { name } = user;
```

#### Default values

```javascript
const { name, age, salary = 123455 } = user;
```

#### Aliasing

```javascript
const { address: permanentAddress } = user;
// `address` gives error; `permanentAddress` works
```

#### Nested destructuring

```javascript
const user = {
  department: {
    address: {
      city: "Bangalore",
    },
  },
};

const {
  department: {
    address: { city },
  },
} = user;
```

#### Array destructuring with rest

```javascript
const [firstTool, ...rest] = ["hammer", "screwdriver", "wrench"];
console.log(firstTool); // "hammer"
console.log(rest); // ["screwdriver", "wrench"]
```

#### Spread with nested update

```javascript
const updated = {
  ...user,
  department: {
    ...user.department,
    number: 7,
  },
};
```

#### Omitting a property

```javascript
const { age, ...rest } = user;
console.log(age, rest);
```

---

### Arrow Functions

```javascript
// Traditional
let add = function (x, y) {
  return x + y;
};

// Arrow
let add = (x, y) => x + y;

console.log(add(10, 20)); // 30
```

---

### Function Statement vs Expression

#### Function Statement (Declaration) -- can be hoisted

```javascript
a(); // No Error -- hoisted
function a() {
  console.log("a called");
}
```

#### Function Expression -- cannot be hoisted

```javascript
b(); // Gives Error
var b = function () {
  console.log("b called");
};
```

> The main difference is **hoisting**.

#### Named Function Expression

```javascript
var b = function c() {
  console.log("b called");
};

b(); // No Error
c(); // ReferenceError
```

#### First-Class Functions

The ability of a function to be used as a value, passed as an argument, and returned from another function.

---

### Callback Hell

```javascript
setTimeout(() => {
  console.log("1 - work is done");
  setTimeout(() => {
    console.log("2 - work is done");
    setTimeout(() => {
      console.log("3 - work is done");
      setTimeout(() => {
        console.log("4 - work is done");
        setTimeout(() => {
          console.log("5 - work is done");
          setTimeout(() => {
            console.log("6 - work is done");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
```

---

### Map and Set

#### Map

```javascript
let map = new Map();

map.set("1", "str1");
map.set(1, "num1");
map.set(true, "bool1");

alert(map.get(1)); // "num1"
alert(map.get("1")); // "str1"
alert(map.size); // 3
```

#### Set

```javascript
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

alert(set.size); // 3

for (let user of set) {
  alert(user.name); // John, Pete, Mary
}
```

---

### WeakMap and WeakSet

#### WeakMap

With `Map`, the key object remains in memory even after setting it to `null`. With `WeakMap`, when the key object becomes unreachable, it gets garbage collected along with the value.

```javascript
let visitsCountMap = new WeakMap();

function countUser(user) {
  let count = visitsCountMap.get(user) || 0;
  visitsCountMap.set(user, count + 1);
}

let john = { name: "John" };
countUser(john);
john = null; // john is garbage collected, along with its WeakMap entry
```

#### WeakSet

```javascript
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john);
visitedSet.add(pete);
visitedSet.add(john);

alert(visitedSet.has(john)); // true
alert(visitedSet.has(mary)); // false

john = null; // visitedSet will be cleaned automatically
```

---

### Prototype

```javascript
function Person() {
  this.name = "John";
}

Person.prototype.age = 20;

const person1 = new Person();
console.log(person1.age); // 20

Person.prototype = { age: 50 };

const person3 = new Person();
console.log(person3.age); // 50
console.log(person1.age); // 20 (still references old prototype)
```

---

### Miscellaneous JS Gotchas

#### Block-scoped variables cannot be redeclared

```javascript
let myVar = 10;
// let myVar = () => console.log(myVar); // SyntaxError
```

#### Array length with sparse elements

```javascript
const arr = [4, 5, 6, 7];
arr[100] = 121;
console.log(arr.length); // 101
arr.length = 0;
console.log(arr); // []
console.log(arr[20]); // undefined
```

#### Semicolon after for loop

```javascript
// With semicolon after for -- loop body is empty
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++); {
  numbers.push(i + 1);
}
console.log(numbers); // [5]

// Without semicolon -- normal loop
const length2 = 4;
const numbers2 = [];
for (var j = 0; j < length2; j++) {
  numbers2.push(j + 1);
}
console.log(numbers2); // [1, 2, 3, 4]
```

#### delete operator on objects

```javascript
(function test(x) {
  delete x.prop1;
  return x;
})({ prop1: 10, prop2: 20 });
// Result: { prop2: 20 }
```

---

## React

### Mapping Data

```jsx
const data = ["Vipul", "Kumar", "Singh"];

const abc = (data) => {
  return data.map((value, index) => console.log(value));
};

abc(data);
```

#### Mapping in JSX

```jsx
return (
  <div>
    {prodData.map((data, index) => {
      return <h2>{data}</h2>;
    })}
  </div>
);
```

---

### Outside Click Handler

```jsx
const [abc, setAbc] = useState(false);
const node = useRef();

const handleClick = (e) => {
  if (node.current.contains(e.target)) {
    setAbc(true);
  } else {
    setAbc(false);
  }
};

useEffect(() => {
  document.addEventListener("click", handleClick);
  return () => {
    document.removeEventListener("click", handleClick);
  };
}, []);

// JSX
<div ref={node}>
  <h2>Vipul</h2>
</div>;
```

---

### Controlled vs Uncontrolled Components

#### Uncontrolled (using ref)

```jsx
const node = useRef();

const handleSubmit = (e) => {
  console.log(node.current.value);
};

return (
  <form onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" ref={node} />
    </label>
    <button type="submit" value="Submit" />
  </form>
);
```

#### Controlled (state holds the input value)

```jsx
function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function onSubmit() {
    console.log("Name value: " + name);
    console.log("Email value: " + email);
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input type="submit" value="Submit" />
    </form>
  );
}
```

---

### Props Drilling and Context API

```jsx
let ApplicationContext = React.createContext(null);

function App() {
  const [fName, setfName] = useState("firstName");
  const [lName, setlName] = useState("LastName");
  return (
    <ApplicationContext.Provider value={{ fName, lName }}>
      <ChildA />
    </ApplicationContext.Provider>
  );
}

function ChildA() {
  return (
    <>
      This is ChildA Component.
      <ChildB />
    </>
  );
}

function ChildB() {
  return (
    <>
      This is ChildB Component.
      <ChildC />
    </>
  );
}

function ChildC() {
  const { fName, lName } = useContext(ApplicationContext);
  return (
    <>
      This is ChildC component.
      <h3>Data from Parent component is as follows:</h3>
      <h4>{fName}</h4>
      <h4>{lName}</h4>
    </>
  );
}
```

---

### Lazy Loading

```jsx
import React, { lazy, Suspense } from "react";

const MyComp = lazy(() => import("./components/myComp"));

return (
  <div>
    <header>
      <div>Component</div>
      <Suspense fallback={<div>Loading.....</div>}>
        <MyComp />
      </Suspense>
    </header>
  </div>
);
```

---

### Memoization and useCallback

```jsx
import { useCallback, useState } from "react";

export default function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  const handler = useCallback(() => {
    return any_function;
  }, [any_parameter]);

  return (
    <div>
      <button onClick={handleClick}>Increment</button>
      <h2>{count}</h2>
      <Child name={"joe"} childFunc={handler} />
    </div>
  );
}
```

> `Child` component only re-renders when `name` or `childFunc` props change.

---

### Passing Data from Child to Parent

```jsx
const Parent = () => {
  const [data, setData] = useState();

  const handleCallback = (item) => {
    setData(item);
  };

  return (
    <div>
      <h1>Parent Component</h1>
      <Child handleCallback={handleCallback} />
    </div>
  );
};

const Child = ({ handleCallback }) => {
  return (
    <h1 onClick={() => handleCallback("Vipul")}>Child Component</h1>
  );
};
```

---

### API Calls: fetch vs axios

> `fetch` is part of the JS Window Object while `axios` is a JS library for making HTTP requests.
>
> - `fetch()` uses the `body` property for POST; `axios` uses the `data` property.
> - Request data in `fetch()` must be stringified with `JSON.stringify()`; `axios` does it automatically.
> - In `fetch()`, you must call `response.json()` to parse; `axios` gives you the parsed data directly.

#### Axios GET

```javascript
useEffect(() => {
  axios
    .get("http://dummy.restapiexample.com/api/v1/employees")
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
```

#### Axios POST

```javascript
useEffect(() => {
  axios({
    method: "post",
    url: "http://dummy.restapiexample.com/api/v1/employees",
    timeout: 4000,
    data: {
      firstName: "abc",
      lastName: "def",
    },
  })
    .then((response) => {
      setData(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
```

#### Fetch GET

```javascript
useEffect(() => {
  fetch("http://dummy.restapiexample.com/api/v1/employees")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
```

#### Fetch POST

```javascript
useEffect(() => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: "abc",
      lastName: "def",
    }),
  };

  fetch("http://dummy.restapiexample.com/api/v1/employees", options)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);
```

---

### Refs and Forwarding Refs

#### useRef for focus

```jsx
const inputRef = useRef(null);

useEffect(() => {
  inputRef.current.focus();
}, []);
```

#### useRef for outside click detection

```jsx
const modalRef = useRef(null);

useEffect(() => {
  document.body.addEventListener("click", onClickOutside);
  return () => document.removeEventListener("click", onClickOutside);
}, []);

const onClickOutside = (e) => {
  const element = e.target;
  if (modalRef.current && !modalRef.current.contains(element)) {
    e.preventDefault();
    e.stopPropagation();
  }
};
```

#### Forwarding Refs

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

---

### Component vs PureComponent

```jsx
class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = { first: 1, second: 2 };
  }

  componentDidMount() {
    const id = setInterval(
      () => this.setState({ first: Math.random() }),
      2000
    );
    setTimeout(() => clearInterval(id), 6000);
  }

  render() {
    return (
      <div>
        <Child1 first={this.state.first} />
        <Child2 second={this.state.second} />
      </div>
    );
  }
}

class Child1 extends Component {
  render() {
    return this.props.first;
  }
}

// Child2 only re-renders when its props actually change
class Child2 extends Component {
  shouldComponentUpdate(newProps) {
    if (newProps.second !== this.props.second) {
      return true;
    }
    return false;
  }
  render() {
    return this.props.second;
  }
}
```

---

### setInterval and setTimeout

```jsx
const list = ["a", "b", "c", "d", "e"];

const [finalData, setFinal] = useState([]);
const [count, setCount] = useState(0);
let timer = useRef();

useEffect(() => {
  timer.current = setInterval(
    () => setCount((prev) => prev + 1),
    2000
  );
}, []);

useEffect(() => {
  list.forEach((item, index) => {
    index === count - 1 &&
      setFinal([...finalData, <li key={index}>{item}</li>]);
  });
  if (count > list.length) {
    clearInterval(timer.current);
  }
}, [count]);
```

#### setInterval vs setTimeout

```html
<div class="container">
  Time now is <span id="time"></span>
</div>

<script>
  function displayTime() {
    time = new Date();
    document.getElementById("time").innerHTML = time;
  }
  const intervalId = setInterval(displayTime, 1000);

  function greet() {
    console.log("Hello Good Morning");
  }
  const timeoutId = setTimeout(greet, 5000);

  clearInterval(intervalId);
  clearTimeout(timeoutId);
</script>
```

---

### React Strict Mode

In development mode, if your app is wrapped in `<React.StrictMode>`, React will:

1. Mount component
2. Run `useEffect`
3. Immediately unmount component
4. Mount again
5. Run `useEffect` again

This is to detect bugs like side effects not being cleaned up, memory leaks, and unsafe operations. **In production, it runs only once.**

---

### Hook Order Rule

> **"Rendered more hooks than during the previous render"**

React relies on hook **order**, not names. If hooks are called conditionally, the order can change between renders.

**Problem:**

```jsx
// Early returns before hooks cause order changes
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;

const completedTodos = useMemo(() => {
  return todos.filter((data) => data.completed);
}, [todos]);
```

**Fix: Always call all hooks before any return statement.**

```jsx
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  // All hooks called first
  const completedTodos = useMemo(() => {
    return todos.filter((data) => data.completed);
  }, [todos]);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const todosJson = await response.json();
        setTodos(todosJson);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // Conditional returns after hooks
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!todos.length) return <p>No data found</p>;

  return (
    <>
      <h2>Completed: {completedTodos.length}</h2>
      <h2>In Progress: {todos.length - completedTodos.length}</h2>
    </>
  );
}
```

#### Common Bug: `event.target.value` always returns a string

```jsx
// BUG: "false" is truthy
<select value={completed}>
  <option value="true">Done</option>
  <option value="false">Not Done</option>
</select>

// FIX: Convert to boolean
onChange={(e) =>
  setNewTodoData((prev) => ({
    ...prev,
    completed: e.target.value === "true",
  }))
}
```

---

### Common React Facts

- **Babel** is a Compiler + Transpiler.
- React components return a **single element**.
- **Props** are passed into other components.
- `webpack-dev-server` runs on port **8080** by default.
- Lifecycle hook to stop updating: `shouldComponentUpdate()`.
- Calling `setState()` inside `render()` creates an infinite loop.
- All React components must act like **pure functions** with respect to their props.
- `ref` is used to directly access the DOM node.
- `Array.map()` receives a callback function called once for each element.
- Component names must be **capitalized**.
- Keys in a list must be **unique among siblings** only.
- The smallest building block of ReactJS is **components**.
- `setState` is **asynchronous** in nature.
- Arbitrary inputs of components are **props**.
- `ReactDOM.render()` renders React content into an HTML page.

---

## DOM Manipulation

### Selecting Elements

```javascript
// Root nodes
console.log(document.documentElement);
console.log(document.body);
console.log(document.head);

// Children
console.log(document.body.childNodes);
console.log(document.body.children);
console.log(document.body.firstElementChild);
console.log(document.body.lastElementChild);
const childrensOfBody = Array.from(document.body.children);

// Siblings
const secondLi = ulTag.children[1];
console.log(secondLi.previousElementSibling.textContent);

// Search by ID, Class, Tag
const element = document.getElementById("element");
const listItems = document.getElementsByClassName("list-item");
console.log(document.getElementsByTagName("table"));
const items = document.querySelectorAll("ul > li:nth-child(2)");
```

### Table DOM Manipulation

```javascript
const tableTag = document.body.children[1];
tableTag.tBodies[0].rows[0].cells[1].style =
  "background-color:blue;";
```

### Table HTML

```html
<table>
  <thead>
    <tr>
      <th>Month</th>
      <th>Sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$10,000</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$12,000</td>
    </tr>
  </tbody>
</table>
```

### Attributes

```javascript
console.log(element.getAttribute("data"));
element.setAttribute("order-placed", "pending");
element.removeAttribute("order-placed");
element.hasAttribute("order-placed");
console.log(element.attributes);
```

### Creating and Removing Elements

```javascript
const newDiv = document.createElement("div");
newDiv.innerHTML = `<ul id="element">
  <li class="list-item">First element</li>
  <li class="list-item">Second element</li>
</ul>`;
const newText = document.createTextNode("Namaste World");
newDiv.appendChild(newText);
body.append(newDiv);
body.prepend(newDiv);
body.before(newDiv);
body.after(newDiv);
firstDiv.replaceWith(newDiv);
firstDiv.remove();

document.getElementById("abc").innerHTML += "<div>Hii</div>";
```

### Manipulating Classes

```javascript
body.className = "second page";
body.classList.add("new");
body.classList.remove("new");
body.classList.toggle("new");
console.log(body.classList);
```

### Manipulating Styles

```javascript
body.style.color = "red";
body.style["background-color"] = "orange";
body.style.margin = "200px";
```

### Events

```javascript
function callMe(event) {
  console.log(event.type);
  console.log(event.currentTarget);
  console.log(event.clientY);
  console.log(event.clientX);
}

clickBtn.onclick = callMe;

clickBtn.addEventListener("click", callMe, (useCapture = false));
clickBtn.removeEventListener("click", callMe);
```

---

## HTML

### Document Structure

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Page Title</title>
    <link rel="shortcut icon" href="/favicon.png" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0"
    />
    <meta name="description" content="" />
    <meta name="author" content="Author Name" />
    <meta name="robots" content="index, follow" />
    <!-- Open Graph -->
    <meta property="og:title" content="Title" />
    <meta property="og:description" content="Description" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://example.com/" />
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Title" />
  </head>
  <body>
    <p>Content</p>
  </body>
</html>
```

### Comments

```html
<!-- Write your comments here -->
```

### Media Elements

#### Video

```html
<video width="320" height="240" autoplay controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  Your browser does not support the video tag.
</video>
```

#### Audio

```html
<audio controls autoplay muted>
  <source src="horse.ogg" type="audio/ogg" />
  <source src="horse.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
```

#### YouTube Embed

```html
<iframe
  width="420"
  height="315"
  src="https://www.youtube.com/embed/tgbNymZ7vqY?controls=0&loop=0&autoplay=0&mute=0"
>
</iframe>
```

### Tables

```html
<table style="width:100%">
  <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
</table>

<!-- colspan and rowspan -->
<th colspan="2">Name</th>
<th rowspan="2">Phone</th>
```

### Lists

```html
<!-- Ordered -->
<ol type="1|a|A|i|I" reversed></ol>

<!-- Unordered -->
<ul type="disc|circle|square|none"></ul>

<!-- Definition -->
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>
```

### Semantic Elements

`<article>`, `<aside>`, `<details>`, `<figcaption>`, `<figure>`, `<footer>`, `<header>`, `<main>`, `<mark>`, `<nav>`, `<section>`, `<summary>`, `<time>`

### Block-Level Elements

`<address>`, `<article>`, `<aside>`, `<blockquote>`, `<canvas>`, `<dd>`, `<div>`, `<dl>`, `<dt>`, `<fieldset>`, `<figcaption>`, `<figure>`, `<footer>`, `<form>`, `<h1>`-`<h6>`, `<header>`, `<hr>`, `<li>`, `<main>`, `<nav>`, `<noscript>`, `<ol>`, `<p>`, `<pre>`, `<section>`, `<table>`, `<tfoot>`, `<ul>`, `<video>`

### Inline Elements

`<a>`, `<abbr>`, `<b>`, `<br>`, `<button>`, `<cite>`, `<code>`, `<em>`, `<i>`, `<img>`, `<input>`, `<kbd>`, `<label>`, `<map>`, `<object>`, `<output>`, `<q>`, `<script>`, `<select>`, `<small>`, `<span>`, `<strong>`, `<sub>`, `<sup>`, `<textarea>`, `<time>`, `<var>`

### Forms

```html
<form
  action="/action_page.php"
  novalidate
  autocomplete="on"
  target="_blank"
  method="get"
>
  <label for="fname">First name:</label><br />
  <input
    type="text"
    id="fname"
    name=""
    value=""
    required
    autofocus
    readonly
    disabled
    min=""
    max=""
    placeholder=""
  /><br />

  <input type="radio" id="html" name="fav_language" value="HTML" />
  <label for="html">HTML</label><br />

  <label for="cars">Choose a car:</label>
  <select id="cars" name="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </select>

  <textarea name="message" style="width:200px; height:600px;">
    The cat was playing in the garden.
  </textarea>

  <button type="button" onclick="alert('Hello World!')">
    Click Me!
  </button>

  <input type="submit" value="Submit" />
</form>
```

#### Input Types

`button`, `checkbox`, `color`, `date`, `email`, `file`, `hidden`, `image`, `month`, `number`, `password`, `radio`, `range`, `reset`, `search`, `submit`, `tel`, `text`, `time`, `url`

### Non-breaking Space

```html
&nbsp;
```

---

## CSS and Sass

### Center a Div

```css
body {
  display: flex;
  align-items: center;
  justify-content: center;
}

div {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid red;
  width: 100px;
  height: 100px;
  text-align: center;
}
```

### Flexbox

```css
.flex-container {
  display: flex;
  flex-direction: row;
}

@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
```

Reference: [Flex Cheatsheet](https://yoksel.github.io/flex-cheatsheet/#section-flex-wrap)

### CSS Specificity

From highest to lowest:

1. **Inline styles** -- `<h1 style="color: pink;">`
2. **Internal styles** -- `<style></style>`
3. **External styles**
   1. **IDs** -- `#navbar`
   2. **Classes, pseudo-classes, attribute selectors** -- `.test`, `:hover`, `[href]`
   3. **Elements and pseudo-elements** -- `h1`, `::before`

### CSS Animation

```css
@keyframes example {
  0% {
    background-color: red;
    left: 0px;
    top: 0px;
  }
  25% {
    background-color: yellow;
    left: 200px;
    top: 0px;
  }
  50% {
    background-color: blue;
    left: 200px;
    top: 200px;
  }
  75% {
    background-color: green;
    left: 0px;
    top: 200px;
  }
  100% {
    background-color: red;
    left: 0px;
    top: 0px;
  }
}

div {
  width: 100px;
  height: 100px;
  position: relative;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
}
```

### Sass Features

#### 1. Variables

```scss
$myFont: Helvetica, sans-serif;
$myColor: red;
$myFontSize: 18px;
$myWidth: 680px;

body {
  font-family: $myFont;
  font-size: $myFontSize;
  color: $myColor;
}

#container {
  width: $myWidth;
  margin-#{$position}: 10px;
}
```

#### 2. Nesting

```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    display: inline-block;
  }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

#### 3. @import and @use

```scss
@import "variables";
@import "colors";
@use "../../public/colors" as *; // File Name with _colors.scss
```

#### 4. @mixin

```scss
@mixin bordered($color: blue, $width: 1px) {
  border: $width solid $color;
}

.myArticle {
  @include bordered(blue, 1px);
}
```

#### 5. @extend

```scss
.button-basic {
  border: none;
  padding: 15px 30px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
}

.button-report {
  @extend .button-basic;
  background-color: red;
}
```

#### 6. Selectors

```scss
a {
  font-size: 20px;
  &:hover {
    background-color: yellow;
  }
}

p:after {
  content: "I have #{8 + 2} books on SASS!";
}

input {
  padding: 0;
  &::placeholder {
    color: red;
  }
}
```

#### 7. Conditions

```scss
$type: audi;
p {
  @if $type == benz {
    color: red;
  } @else if $type == mahindra {
    color: blue;
  } @else if $type == audi {
    color: green;
  } @else {
    color: black;
  }
}
```

### Bootstrap to Tailwind

```html
<!-- Bootstrap -->
<div class="d-flex flex-row">
  <div class="p-2">Flex item 1</div>
</div>

<!-- Tailwind -->
<div class="flex flex-row">
  <div class="p-2">Flex item 1</div>
</div>
```

### Material UI Theming

```javascript
import { createTheme, ThemeProvider } from "@mui/material/styles";

const baseTheme = createTheme({
  breakpoints: {
    values: { xs: 0, sm: 300, md: 960, lg: 1280, xl: 1920 },
  },
  palette: {
    mode: "light",
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  spacing: (num) => `${8 * num}px`,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
});
```

Usage:

```jsx
<ThemeProvider theme={baseTheme}>
  <Button>Primary</Button>
  <Button color="secondary">Secondary</Button>
  <Typography variant="h3">Responsive h3</Typography>
</ThemeProvider>
```

#### Using useTheme

```jsx
import { useTheme } from "@mui/material";

const Navigation = () => {
  const theme = useTheme();

  const drawerSx = {
    "& .MuiDrawer-paper": {
      background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    },
  };

  return <Drawer sx={drawerSx} variant="permanent" />;
};
```

#### Component Style Overrides

```typescript
import {
  ComponentsProps,
  ComponentsOverrides,
  ComponentsVariants,
} from "@mui/material";

export const ThemeButton: {
  defaultProps?: ComponentsProps["MuiButton"];
  styleOverrides?: ComponentsOverrides["MuiButton"];
  variants?: ComponentsVariants["MuiButton"];
} = {
  styleOverrides: {
    root: {
      background: "#DDB61A",
    },
  },
  defaultProps: {
    variant: "contained",
    color: "secondary",
  },
};
```
