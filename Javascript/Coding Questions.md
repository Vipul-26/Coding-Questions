# JavaScript Interview Snippets

A collection of common JavaScript logic, string/array/object problems, higher-order utilities, and polyfills.

---

## Table of Contents

- [Quick Concepts](#quick-concepts)
- [Characters occurs most](#characters-occurs-most)
- [Words occurs most](#words-occurs-most)
- [First Non-Repeating Character](#first-non-repeating-character)
- [Remove Duplicate Words](#remove-duplicate-words)
- [Find Duplicate Words](#find-duplicate-words)
- [Intersection](#intersection)
- [Difference](#difference)
- [Group By Property](#group-by-property)
- [Highest Salary Employee](#highest-salary-employee)
- [Sum of Salary](#sum-of-salary)
- [Merge Objects](#merge-objects)
- [Flatten Array](#flatten-array)
- [Reverse Words](#reverse-words)
- [Reverse Vowels](#reverse-vowels)
- [Reverse words + strings without using reverse](#reverse-words--strings-without-using-reverse)
- [Longest word](#longest-word)
- [Sort By Age](#sort-by-age)
- [Deep Copy](#deep-copy)
- [Deep Freeze](#deep-freeze)
- [Deep Equal](#deep-equal)
- [Flatten Object](#flatten-object)
- [Implement get](#implement-get)
- [Implement set](#implement-set)
- [Two Sum](#two-sum)
- [Debouncing Input Field](#debouncing-input-field)
- [Throttling Window Scroll](#throttling-window-scroll)
- [Memoize](#memoize)
- [Polyfill for map](#polyfill-for-map)
- [Polyfill for filter](#polyfill-for-filter)
- [Polyfill for reduce](#polyfill-for-reduce)
- [Polyfill for call](#polyfill-for-call)
- [Polyfill for apply](#polyfill-for-apply)
- [Polyfill for bind](#polyfill-for-bind)

---

## Quick Concepts

- String to Array `.split(' ')` vs Array to String `.join(' ')`
- `for...in` is used for **Objects** traversal, while `for...of` is used for **String & Array** traversal.
- `Set` works on Arrays & Strings and has a built-in `.has()` method which returns `true` or `false`.
- `Map` is used to store dynamic key-value pairs of any type or stores key-value pairs and supports all types of keys, unlike an object that only stores strings as keys.

---

## Characters occurs most

Input: `'gh ghg dghd ghd ghg jhg djgh ygrytrh jrnret'`

```javascript
function customHook(str) {
  let myObj = {};
  let maxLengthChar = "";
  let num = 0;
  for (let i in str) {
    if (str[i] !== " ") {
      myObj[str[i]] = (myObj[str[i]] || 0) + 1;
      if (myObj[str[i]] > num) {
        num = myObj[str[i]];
        maxLengthChar = str[i];
      }
    }
  }
  return maxLengthChar;
}
```

**Output:** `"g"`

---

## Words occurs most

Input: `'vvv kdjd vvv jhudur vvv yiold kdjd'`

```javascript
function customHook(str) {
  const updatedStr = str.split(" ");
  let myObj = {};
  let maxLengthWord = "";
  let num = 0;
  for (let i in updatedStr) {
    myObj[updatedStr[i]] = (myObj[updatedStr[i]] || 0) + 1;
    if (myObj[updatedStr[i]] > num) {
      num = myObj[updatedStr[i]];
      maxLengthWord = updatedStr[i];
    }
  }
  return maxLengthWord;
}
```

**Output:** `"vvv"`

---

## First Non-Repeating Character

Input: `'aabbccde'`

```javascript
function customHook(str) {
  let myObj = {};
  for (let i in str) {
    myObj[str[i]] = (myObj[str[i]] || 0) + 1;
  }
  for (let i in str) {
    if (myObj[str[i]] === 1) {
      return str[i];
    }
  }
}
```

**Output:** `"d"`

---

## Remove Duplicate Words

Input: `'apple banana apple orange banana'`

```javascript
function customHook(str) {
  const array = str.split(" ");
  const updatedArray = [...new Set(array)];
  return updatedArray;
}

function customHook(inputArray) {
  let uniqueArray = [];
  let myObj = {};
  for (let i in inputArray) {
    myObj[inputArray[i]] = (myObj[inputArray[i]] || 0) + 1;
  }
  for (let i in myObj) {
    uniqueArray.push(i);
  }
  return uniqueArray;
}
```

**Output:** `["apple", "banana", "orange"]`

---

## Find Duplicate Words

Input: `'apple banana apple orange banana'`

```javascript
function customHook(str) {
  const array = str.split(" ");
  let duplicatesArray = [];
  let myObj = {};
  for (let i in array) {
    myObj[array[i]] = (myObj[array[i]] || 0) + 1;
    if (myObj[array[i]] > 1) {
      duplicatesArray.push(array[i]);
    }
  }
  return duplicatesArray;
}
```

**Output:** `["apple", "banana"]`

---

## Intersection

Input: `[1, 2, 3, 4, 5], [2, 4]`

```javascript
function customHook(inputArray1, inputArray2) {
  const set = new Set(inputArray2);
  let intersectArray = [];
  for (const item of inputArray1) {
    if (set.has(item)) {
      intersectArray.push(item);
    }
  }
  return intersectArray;
}
```

**Output:** `[2, 4]`

---

## Difference

Input: `[1, 2, 3, 4, 5], [2, 4]`

```javascript
function customHook(inputArray1, inputArray2) {
  const set = new Set(inputArray2);
  let differenceArray = [];
  for (const item of inputArray1) {
    if (!set.has(item)) {
      differenceArray.push(item);
    }
  }
  return differenceArray;
}
```

**Output:** `[1, 3, 5]`

---

## Group By Property

Input: `const users = [{ name: "A", dept: "IT" }, { name: "B", dept: "HR" }, { name: "C", dept: "IT" }];`

```javascript
function customHook(inputArray) {
  let myObj = {};
  for (const item of inputArray) {
    if (myObj[item.dept]) {
      myObj[item.dept] = [...myObj[item.dept], item.name];
    } else {
      myObj[item.dept] = [item.name];
    }
  }
  return myObj;
}
```

**Output:** `{ IT: ["A", "C"], HR: ["B"] }`

### Using Reduce

```javascript
function groupBy(users) {
  const groupedUsers = users.reduce((acc, item) => {
    acc[item.dept] = [...(acc[item.dept] || []), item.name];
    return acc;
  }, {});

  return groupedUsers;
}
```

**Output:** `{ IT: ["A", "C"], HR: ["B"] }`

---

## Highest Salary Employee

Input: `const emp = [{ name: "A", salary: 1000 },{ name: "B", salary: 5000 },{ name: "C", salary: 3000 }];`

```javascript
function customHook(inputArray) {
  let highestSalary = 0;
  let highestSalaryObject;
  for (const item of inputArray) {
    if (item.salary > highestSalary) {
      highestSalary = item.salary;
      highestSalaryObject = item;
    }
  }
  return highestSalaryObject;
}
```

**Output:** `{ name: "B", salary: 5000 }`

### Reduce Version

```javascript
function customHook(inputArray) {
  const maxSalaryObj = inputArray.reduce((max, item) => {
    return item.salary > max.salary ? item : max;
  }, inputArray[0]);

  return maxSalaryObj;
}
```

**Output:** `{ name: "B", salary: 5000 }`

---

## Sum of Salary

Input: `const emp = [{ salary: 1000 },{ salary: 5000 },{ salary: 3000 }];`

```javascript
function customHook(inputArray) {
  return inputArray.reduce((acc, item) => {
    return item.salary + acc;
  }, 0);
}
```

**Output:** `9000`

---

## Merge Objects

Input: `obj1={name:"Vipul"}, obj2={city:"Pune"}`

```javascript
function customHook(obj1, obj2) {
  const mergedObj = {
    ...obj1,
    ...obj2,
  };
  return mergedObj;
}
```

**Output:** `{ name: "Vipul", city: "Pune" }`

---

## Flatten Array

Input: `[1,[2,[3,[4]]]]`

```javascript
function flattenArray(inputArray) {
  let flattenedArray = [];
  for (let i of inputArray) {
    if (Array.isArray(i)) {
      flattenedArray.push(...flattenArray(i));
    } else {
      flattenedArray.push(i);
    }
  }
  return flattenedArray;
}
```

**Output:** `[1, 2, 3, 4]`

---

## Reverse Words

Input: `'I love react'`

```javascript
function customHook(str) {
  return str.split(" ").reverse().join(" ");
}
```

**Output:** `"react love I"`

---

## Reverse Vowels

Input: `Hello World!` → Output: `Hollo Werld!`

```javascript
const myInput = 'Hello World';

const reverseVowels = (str) => {
  const vowels = ['a','e','i','o','u'];
  let vArr = [];
  
  for(let i in str) {
      if(vowels.includes(str[i].toLowerCase())) {
          vArr.push(str[i])
      }
  }
  
  vArr.reverse();
  
  let newString = '';
  let index = 0;
  
  for(let i in str) {
    if(vowels.includes(str[i].toLowerCase())) {
          newString = newString + vArr[index++];
      } else {
          newString = newString + str[i]
      }
  }
  
  return newString;
};

console.log(reverseVowels(myInput));
```

**Output:** `Hollo Werld`

---

## Reverse words + strings without using reverse

Input: `Hello World` → `olleH dlroW`

```javascript
const myStr = 'Hello World'; // olleH dlroW

const myFunction = (myString) => {
    let newWord = '';
    let newString = '';

    for (let i = 0; i <= myString.length; i++) {
        if (myString[i] === ' ' || i === myString.length) {
            newString = newString + newWord;
            if(myString[i] === ' ') {
                newString = newWord + ' '
            }
            newWord = ''
        } else {
            newWord = myStr[i] + newWord
        }
    }
    return newString;
};

console.log(myFunction(myStr));
```

**Output:** `olleH dlroW`

---

## Longest word

Input: `"I love JavaScript very much"`

```javascript
function customHook(str) {
  let newStrArray = str.split(" ");
  let maxLength = newStrArray[0].length;
  let maxLengthWord = "";
  for (let i of newStrArray) {
    if (i.length > maxLength) {
      maxLength = i.length;
      maxLengthWord = i;
    }
  }
  return maxLengthWord;
}
```

**Output:** `"JavaScript"`

---

## Sort By Age

```javascript
users.sort((a, b) => a.age - b.age);
```

**Output:** array sorted ascending by `age` (e.g. `[{age: 22}, {age: 25}, {age: 30}]`)

---

## Deep Copy

Input: `const obj = {name: "Vipul", address: {city: "Pune"}};`

```javascript
function deepCopy(obj) {
  let newObj = {};
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      newObj[key] = deepCopy(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
```

**Output:** `{ name: "Vipul", address: { city: "Pune" } }` (a new independent copy — nested objects are cloned, not shared)

---

## Deep Freeze

Input: `const obj = {name: "Vipul", address: {city: "Pune"}};`

```javascript
function deepFreeze(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      deepFreeze(obj[key]);
    }
  }
  Object.freeze(obj);
  return obj;
}
```

**Output:** the same object, deeply frozen — any mutation (including nested `obj.address.city = "X"`) is silently ignored (throws in strict mode)

---

## Deep Equal

Input: `const obj1 = {name: "Vipul", address: {city: "Pune"}}; const obj2 = {name: "Vipul", address: {city: "Pune"}};`

```javascript
function deepEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key in obj1) {
    if (typeof obj1[key] === "object" && obj1[key] !== null) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    } else {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}
```

**Output:** `true`

---

## Flatten Object

Input: `const obj = {name: "Vipul", address: {city: "Pune"}};`

```javascript
function flattenObject(obj, parentKey = "", res = {}) {
  for (let key in obj) {
    let propName = parentKey ? `${parentKey}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}
```

**Output:** `{ name: "Vipul", "address.city": "Pune" }`

---

## Implement get

Usage: `get(obj,'a.b.c')`

```javascript
function implementGet(obj, path) {
  const splittedPath = path.split(".");
  let currentValue;
  for (let i of splittedPath) {
    currentValue = currentValue ? currentValue[i] : obj[i];
  }
  return currentValue;
}
```

**Output:** for `get({ a: { b: { c: 42 } } }, 'a.b.c')` → `42`

---

## Implement set

Usage: `set(obj,'a.b.c',100)`

```javascript
function implementSet(obj, path, value) {
  const splittedPath = path.split(".");
  let currentValue = obj;
  for (let i = 0; i < splittedPath.length; i++) {
    if (i === splittedPath.length - 1) {
      currentValue[splittedPath[i]] = value;
    } else {
      currentValue[splittedPath[i]] = currentValue[splittedPath[i]] || {};
      currentValue = currentValue[splittedPath[i]];
    }
  }
  return obj;
}
```

**Output:** for `set({}, 'a.b.c', 100)` → `{ a: { b: { c: 100 } } }`

---

## Two Sum

Input: `[2, 6, 7, 8], 9`

```javascript
var twoSum = function (nums, target) {
  let index = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        index.push(i, j);
      }
    }
  }
  return index;
};
```

**Output:** `[0, 2]` (nums[0] + nums[2] = 2 + 7 = 9)

### Using Map

```javascript
var twoSum = function (nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    let value = target - nums[i];
    if (map.has(value)) {
      return [map.get(value), i];
    }
    map.set(nums[i], i);
  }
};
```

**Output:** `[0, 2]`

---

## Debouncing Input Field

```html
<body>
  <input id="search" type="text" placeholder="Search here" />
  <script>
    function debounce(fn, delay) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn(...args);
        }, delay);
      }
    }
    const search = (value) => {
      console.log(value);
    };

    const debouncedSearch = debounce(search, 500);

    document.getElementById('search').addEventListener('input', (e) => {
      debouncedSearch(e.target.value);
    });
  </script>
</body>
```

**Output:** logs the input value only once the user stops typing for 500ms (e.g. typing "iphone" quickly logs `iphone` a single time)

---

## Throttling Window Scroll

```html
<body style="height: 30000px;">
  <script>
    function throttle(fn, delay) {
      let flag = true;
      return function(...args) {
        if (flag) {
          fn(...args);
          flag = false;
          setTimeout(() => {
            flag = true;
          }, delay);
        }
      }
    }

    const handleScroll = () => {
      console.log(window.scrollY);
    };

    const throttledScroll = throttle(handleScroll, 3000);

    window.addEventListener('scroll', throttledScroll);
  </script>
</body>
```

**Output:** logs `window.scrollY` at most once every 3000ms while scrolling (e.g. `0`, `1450`, `3200`, ... one value per 3s)

---

## Memoize

Usage: `memoize(fn)`

```javascript
function memoize(fn) {
  const cache = {};
  return function (x) {
    if (cache[x]) {
      return cache[x];
    }
    cache[x] = fn(x);
    return cache[x];
  };
}

function square(x) {
  return x * x;
}

const memoizedValue = memoize(square);
console.log(memoizedValue(5));
console.log(memoizedValue(5));
```

**Output:**

```text
25
25   // second call returns the cached result without recomputing
```

---

## Polyfill for map

```javascript
Array.prototype.map = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};
```

**Output:** for `[1, 2, 3].map(x => x * 2)` → `[2, 4, 6]`

---

## Polyfill for filter

```javascript
Array.prototype.filter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

**Output:** for `[1, 2, 3, 4].filter(x => x % 2 === 0)` → `[2, 4]`

---

## Polyfill for reduce

```javascript
Array.prototype.reduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }
  return accumulator;
};
```

**Output:** for `[1, 2, 3, 4].reduce((acc, x) => acc + x, 0)` → `10`

---

## Polyfill for call

```javascript
Function.prototype.call = function (context, ...args) {
    context = context || globalThis;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};
```

**Output:** for `function greet(city){ return this.name + " from " + city; }` → `greet.call({name:"Vipul"}, "Pune")` → `"Vipul from Pune"`

---

## Polyfill for apply

```javascript
Function.prototype.apply = function (context, args = []) {
    context = context || globalThis;
    const fn = Symbol();
    context[fn] = this;
    const result = context[fn](...args);
    delete context[fn];
    return result;
};
```

**Output:** for `greet.apply({name:"Vipul"}, ["Pune"])` → `"Vipul from Pune"`

---

## Polyfill for bind

```javascript
Function.prototype.bind = function (context, ...args1) {
    const fn = this;
    return function (...args2) {
        return fn.apply(context, [...args1, ...args2]);
    };
};
```

**Output:** for `const bound = greet.bind({name:"Vipul"}); bound("Pune")` → `"Vipul from Pune"`
