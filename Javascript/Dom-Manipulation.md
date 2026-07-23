# DOM Manipulation

Quick reference for vanilla JavaScript DOM manipulation — selecting, creating, updating, and removing elements, plus attributes, classes, styles, and events. Useful for interview revision.

---

## Table of Contents

**Syntax reference**

- [Selecting Elements](#selecting-elements)
- [Table DOM Manipulation](#table-dom-manipulation)
- [Table HTML](#table-html)
- [Attributes](#attributes)
- [Creating and Removing Elements](#creating-and-removing-elements)
- [Manipulating Classes](#manipulating-classes)
- [Manipulating Styles](#manipulating-styles)
- [Events](#events)

**Concepts interviewers ask** (senior)

- [textContent vs innerText vs innerHTML](#textcontent-vs-innertext-vs-innerhtml)
- [NodeList vs HTMLCollection (live vs static)](#nodelist-vs-htmlcollection-live-vs-static)
- [Event Propagation: Bubbling & Capturing](#event-propagation-bubbling--capturing)
- [Event Delegation](#event-delegation)
- [Reflow vs Repaint & Batching Updates](#reflow-vs-repaint--batching-updates)
- [insertAdjacentHTML / insertAdjacentElement](#insertadjacenthtml--insertadjacentelement)
- [data-* Attributes & dataset](#data--attributes--dataset)
- [Quick Interview One-Liners](#quick-interview-one-liners)

---

## Selecting Elements

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

---

## Table DOM Manipulation

```javascript
const tableTag = document.body.children[1];
tableTag.tBodies[0].rows[0].cells[1].style =
  "background-color:blue;";
```

---

## Table HTML

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

---

## Attributes

```javascript
console.log(element.getAttribute("data"));
element.setAttribute("order-placed", "pending");
element.removeAttribute("order-placed");
element.hasAttribute("order-placed");
console.log(element.attributes);
```

---

## Creating and Removing Elements

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

---

## Manipulating Classes

```javascript
body.className = "second page";
body.classList.add("new");
body.classList.remove("new");
body.classList.toggle("new");
console.log(body.classList);
```

---

## Manipulating Styles

```javascript
body.style.color = "red";
body.style["background-color"] = "orange";
body.style.margin = "200px";
```

---

## Events

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

> **Senior note:** To `removeEventListener`, you must pass the **same function reference** used to add it — an inline arrow (`addEventListener("click", () => {})`) can never be removed. Also note `onclick` allows only **one** handler (it overwrites), while `addEventListener` supports **multiple**.

---

## textContent vs innerText vs innerHTML

| Property      | Returns / Sets                          | Triggers reflow? | XSS risk on set? |
| ------------- | --------------------------------------- | ---------------- | ---------------- |
| `textContent` | All text incl. hidden, no HTML parsing  | No               | No (safe)        |
| `innerText`   | Only **visible** text, aware of CSS     | Yes (forces reflow to compute visibility) | No (safe)        |
| `innerHTML`   | Parses string as **HTML**               | Yes              | **Yes** (unsafe) |

```javascript
el.textContent = "<b>hi</b>"; // literally shows: <b>hi</b>  (safe)
el.innerHTML = "<b>hi</b>";   // renders bold "hi"           (parses HTML)
```

**Why it matters:**
- Use `textContent` for plain text — it's the **fastest** and **XSS-safe**.
- `innerHTML` with untrusted input is an **XSS vulnerability**. Sanitize (e.g. DOMPurify) or avoid.
- `innerText` is deceptively expensive: reading it forces a **reflow** because it must know what's visually rendered.

---

## NodeList vs HTMLCollection (live vs static)

```javascript
const staticList = document.querySelectorAll(".item"); // NodeList — STATIC snapshot
const liveList = document.getElementsByClassName("item"); // HTMLCollection — LIVE
const liveKids = parent.children; // HTMLCollection — LIVE
```

| Feature          | NodeList (`querySelectorAll`)         | HTMLCollection (`getElementsBy*`, `.children`) |
| ---------------- | ------------------------------------- | ---------------------------------------------- |
| Live / static    | **Static** (frozen at query time)     | **Live** (auto-updates with the DOM)           |
| `.forEach()`     | ✅ Yes                                 | ❌ No (need `Array.from` / spread)              |
| Contains         | Nodes (can include text nodes\*)      | Elements only                                  |

\* `.childNodes` is a live NodeList that includes text/comment nodes; `querySelectorAll` returns a static NodeList of elements.

**Classic gotcha — infinite loop with a live collection:**

```javascript
const items = document.getElementsByClassName("item"); // live
// ❌ each removeChild shrinks the live list -> skips elements / misbehaves
for (let i = 0; i < items.length; i++) items[i].remove();

// ✅ convert to a static array first
[...document.getElementsByClassName("item")].forEach((el) => el.remove());
```

---

## Event Propagation: Bubbling & Capturing

An event travels in **3 phases**: **capture** (top → target), **target**, then **bubble** (target → top).

```javascript
// 3rd arg / { capture: true } -> fire during CAPTURING phase (top-down)
parent.addEventListener("click", handler, true);

// default -> fire during BUBBLING phase (bottom-up)
child.addEventListener("click", handler); // { capture: false }
```

- `e.target` — the element that **actually triggered** the event (deepest).
- `e.currentTarget` — the element whose **listener is running** (where you attached it).
- `e.stopPropagation()` — stops the event from continuing to other elements.
- `e.stopImmediatePropagation()` — also stops **other listeners on the same element**.
- `e.preventDefault()` — cancels default browser action (e.g. form submit, link nav). Does **not** stop propagation.

---

## Event Delegation

Instead of attaching a listener to every child, attach **one** to a common parent and use bubbling. Great for performance and for **dynamically added** elements.

```javascript
// ✅ one listener handles all current AND future <li> clicks
document.querySelector("#list").addEventListener("click", (e) => {
  const li = e.target.closest("li"); // handles clicks on inner elements too
  if (!li) return; // clicked outside an <li>
  console.log("Clicked:", li.dataset.id);
});
```

**Why seniors love this answer:**
- Fewer listeners → less memory, faster setup.
- Works for elements added **after** the listener was attached (no re-binding).
- `closest()` makes it robust when the click lands on a nested child.

---

## Reflow vs Repaint & Batching Updates

- **Reflow (layout):** geometry/position changes → browser recalculates layout. **Expensive.**
- **Repaint:** visual-only change (e.g. `color`, `background`) with no layout shift. Cheaper.

**Appending in a loop = many reflows. Batch with a `DocumentFragment`:**

```javascript
// ❌ 1000 reflows
for (let i = 0; i < 1000; i++) {
  list.appendChild(document.createElement("li"));
}

// ✅ build off-DOM, insert once -> 1 reflow
const frag = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  frag.appendChild(document.createElement("li"));
}
list.appendChild(frag);
```

**Other tips:**
- Reading layout props (`offsetHeight`, `getBoundingClientRect`, `scrollTop`) right after a write forces a **synchronous "layout thrash"** — batch reads and writes separately.
- Toggle a single class instead of setting many inline styles one-by-one.

---

## insertAdjacentHTML / insertAdjacentElement

More precise and often faster than `innerHTML +=` (which re-parses and **destroys existing nodes + their listeners**).

```javascript
// positions: "beforebegin" | "afterbegin" | "beforeend" | "afterend"
el.insertAdjacentHTML("beforeend", "<li>New item</li>");
el.insertAdjacentElement("afterend", newNode);
el.insertAdjacentText("afterbegin", "Hello");
```

```text
<!-- beforebegin -->
<div id="el">
  <!-- afterbegin -->
  ...content...
  <!-- beforeend -->
</div>
<!-- afterend -->
```

> Avoid `el.innerHTML += "..."` — it re-serializes and re-parses the whole element, wiping out attached event listeners on existing children.

---

## data-* Attributes & dataset

Store custom data on elements and read it via the `dataset` API (camelCased).

```html
<button data-order-id="42" data-status="pending">Pay</button>
```

```javascript
btn.dataset.orderId; // "42"   (data-order-id -> orderId)
btn.dataset.status; // "pending"
btn.dataset.status = "paid"; // updates the attribute
```

Cleaner and more idiomatic than `getAttribute("data-order-id")`.

---

## Quick Interview One-Liners

- **`querySelector` vs `getElementById`:** `getElementById` is marginally faster and returns a live-ish ref by id; `querySelector` is flexible (any CSS selector) but returns the **first** match, static.
- **`node.cloneNode(true)`** — deep clone including children; `false` clones only the node.
- **`element.closest(selector)`** — walks **up** the tree to the nearest matching ancestor (incl. itself).
- **`element.matches(selector)`** — boolean: does this element match the selector?
- **`append` vs `appendChild`:** `append` accepts multiple nodes **and strings** and returns `undefined`; `appendChild` takes one node and returns it.
- **Debounce scroll/resize handlers** to avoid firing on every pixel.
- **Remove listeners** on cleanup to prevent memory leaks (especially in SPAs).
