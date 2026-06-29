// String to Array (.split(' ')) vs Array to String (.join(' '))

// in used for Objects traversal while of used for String & Array traversal

// Set works on Array & Strings and it has as .has() built-in method which return true or false

// Characters occurs most ('gh ghg dghd ghd ghg jhg djgh ygrytrh jrnret')

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

// Words occurs most ('vvv kdjd vvv jhudur vvv yiold kdjd')

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

// First Non-Repeating Character ('aabbccde')

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

// Remove Duplicate Words ('apple banana apple orange banana')

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

// Find Duplicate Words ('apple banana apple orange banana')

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

// Intersection ([1, 2, 3, 4, 5], [2, 4])

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

// Difference ([1, 2, 3, 4, 5], [2, 4])

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

// Group By Property (const users = [{ name: "A", dept: "IT" }, { name: "B", dept: "HR" }, { name: "C", dept: "IT" }];)

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

// Using Reduce

function groupBy(users) {
    const groupedUsers = users.reduce((acc, item) => {
        acc[item.dept] = [...(acc[item.dept] || []), item.name];
        return acc;
    }, {});

    return groupedUsers;
};

// Highest Salary Employee (const emp = [{ name: "A", salary: 1000 },{ name: "B", salary: 5000 },{ name: "C", salary: 3000 }];)

function customHook(inputArray) {
  let highestSalary = 0;
  let highestSalaryObject;
  for (const item of inputArray) {
    if(item.salary > highestSalary) {
      highestSalary = item.salary;
      highestSalaryObject = item;
    }
  }
  return highestSalaryObject;
}

// Reduce Version

function customHook(inputArray) {
  const maxSalaryObj = inputArray.reduce((max, item) =>{
    return item.salary > max ? item : max
  }, inputArray[0].salary);

  return maxSalaryObj;
}

// Sum of Salary (const emp = [{ salary: 1000 },{ salary: 5000 },{ salary: 3000 }];)

function customHook(inputArray) {
  return inputArray.reduce((acc, item) => {
    return item.salary + acc
  }, 0);
}

// Merge Objects (obj1={name:"Vipul"}, obj2={city:"Pune"})

function customHook(obj1, obj2) {
  const mergedObj = {
    ...obj1,
    ...obj2
  };
  return mergedObj;
}

// Flatten Array ([1,[2,[3,[4]]]])

function customHook(inputArray) {
  function flattenArray(inputArray) {
    let flattenedArray = [];
    for (let i of inputArray) {
      if(Array.isArray(i)) {
        flattenedArray.push(...flattenArray(i))
      } else {
        flattenedArray.push(i);
      }
    }
    return flattenedArray;
  }

  return flattenArray(inputArray);
}

// Chunk Array ([1, 2, 3, 4, 5, 6])

// Reverse Words ('I love react')

function customHook(str) {
  return str.spit(' ').reverse().join(' ');
}

// Longest word ("I love JavaScript very much")

function customHook(str) {
  let newStrArray = str.split(' ');
  let maxLength = newStrArray[0].length;
  let maxLengthWord = '';
  for(let i of newStrArray) {
    if(i.length > maxLength) {
      maxLength = i.length;
      maxLengthWord = i;
    }
  }
  return maxLengthWord;
}

// Sort By Age

users.sort((a,b)=>a.age-b.age);
