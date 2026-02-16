## 1) What is the difference between `null` and `undefined`?

- **`null`** means a variable is empty on purpose.
- **`undefined`** means a variable is declared but has no value yet.

```javascript
let a = null; // empty on purpose
let b; // undefined because no value assigned
```

---

## 2) What is the use of the `map()` function in JavaScript? How is it different from `forEach()`?

- **`map()`** creates a **new array** by changing each item of an existing array.
- **`forEach()`** just **runs a function** on each item but **does not return a new array**.

```javascript
let numbers = [1, 2, 3];
let doubled = numbers.map((n) => n * 2); // [2, 4, 6]

numbers.forEach((n) => console.log(n)); // prints 1, 2, 3
```

---

## 3) What is the difference between `==` and `===`?

- **`==`** checks **value only**, it ignores type.
- **`===`** checks **value and type**, strict check.

```javascript
5 == "5"; // true
5 === "5"; // false
```

---

## 4) What is the significance of `async/await` in fetching API data?

- Makes **asynchronous code** look **like normal code**.
- Helps **wait for API data** before using it.

```javascript
async function getData() {
  let response = await fetch("https://api.example.com/data");
  let data = await response.json();
  console.log(data);
}
```

---

## 5) Explain the concept of Scope in JavaScript (Global, Function, Block)

- **Global scope:** Variable is accessible everywhere.
- **Function scope:** Variable is accessible **inside the function only**.
- **Block scope:** Variable is accessible **inside the `{ }` only** (use `let` or `const`).

```javascript
let globalVar = "global";

function test() {
  let functionVar = "inside function";
  if (true) {
    let blockVar = "inside block";
    console.log(blockVar); // works
  }
  // console.log(blockVar); // error
}
```
