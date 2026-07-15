# Accessibility (a11y)

Interview-focused notes on web accessibility for a senior Frontend developer (React / Vue / Angular / Next.js). Covers WCAG, semantics, ARIA, keyboard interaction, focus management, and framework-specific patterns with code examples.

---

## Table of Contents

- [Q1. What is Accessibility (a11y)?](#q1-what-is-accessibility-a11y)
- [WCAG: The 4 Principles (POUR)](#wcag-the-4-principles-pour)
- [Semantic HTML First](#semantic-html-first)
- [ARIA: Rules and Roles](#aria-rules-and-roles)
- [Common ARIA Attributes](#common-aria-attributes)
- [Accessible Names and Descriptions](#accessible-names-and-descriptions)
- [Keyboard Accessibility](#keyboard-accessibility)
- [Focus Management](#focus-management)
- [Color and Contrast](#color-and-contrast)
- [Images and Media](#images-and-media)
- [Forms and Validation](#forms-and-validation)
- [Live Regions and Dynamic Content](#live-regions-and-dynamic-content)
- [Component Patterns](#component-patterns)
  - [Accessible Modal / Dialog](#accessible-modal--dialog)
  - [Accessible Dropdown / Menu](#accessible-dropdown--menu)
  - [Accessible Accordion](#accessible-accordion)
  - [Accessible Tabs](#accessible-tabs)
  - [Accessible Tooltip](#accessible-tooltip)
- [Framework-Specific Notes](#framework-specific-notes)
  - [React](#react)
  - [Vue](#vue)
  - [Angular](#angular)
  - [Next.js](#nextjs)
- [Testing Accessibility](#testing-accessibility)
- [Rapid-Fire Facts](#rapid-fire-facts)

---

## Q1. What is Accessibility (a11y)?

**Answer**

Accessibility means building applications that everyone can use, including people with:

- Vision impairments
- Hearing impairments
- Motor disabilities
- Cognitive disabilities

The goal is to ensure users can interact using:

- Keyboard
- Screen readers
- Voice control
- Magnifiers
- Other assistive technologies

Accessibility is guided by **WCAG (Web Content Accessibility Guidelines)**.

---

## WCAG: The 4 Principles (POUR)

WCAG (Web Content Accessibility Guidelines) is organized around 4 principles — mnemonic **POUR**:

| Principle | Meaning | Examples |
|---|---|---|
| **Perceivable** | Users must be able to perceive the content | Text alternatives, captions, sufficient contrast |
| **Operable** | UI must be operable by all input methods | Keyboard access, no time traps, no seizure-inducing flashes |
| **Understandable** | Content and operation must be understandable | Readable text, predictable navigation, input assistance |
| **Robust** | Content works across current & future AT | Valid HTML, correct ARIA, works with screen readers |

---

## Semantic HTML First

The **first rule of ARIA is: don't use ARIA if a native element already does the job.** Native elements come with roles, states, and keyboard behavior for free.

```html
<!-- BAD: div soup, no semantics, no keyboard support -->
<div class="btn" onclick="submit()">Submit</div>

<!-- GOOD: native button is focusable, Enter/Space activatable, announced as "button" -->
<button type="submit">Submit</button>
```

Use structural landmarks so screen-reader users can jump between regions:

```html
<header>...</header>
<nav aria-label="Primary">...</nav>
<main>
  <section aria-labelledby="news-heading">
    <h2 id="news-heading">Latest News</h2>
    ...
  </section>
</main>
<aside aria-label="Related links">...</aside>
<footer>...</footer>
```

Use **one `<h1>` per page** and don't skip heading levels (`h1 → h2 → h3`); screen-reader users navigate by headings.

| Instead of | Use |
|---|---|
| `<div onclick>` | `<button>` |
| `<div>` for links | `<a href>` |
| `<div>` list | `<ul>/<ol>/<li>` |
| `<b>`/styled div for headings | `<h1>`–`<h6>` |
| generic `<div>` regions | `<nav>`, `<main>`, `<header>`, `<footer>`, `<aside>`, `<section>` |

---

## ARIA: Rules and Roles

ARIA (Accessible Rich Internet Applications) adds **roles, states, and properties** to fill gaps native HTML can't cover (custom widgets).

**The 5 rules of ARIA (know these for interviews):**

1. Prefer native HTML over ARIA whenever possible.
2. Don't change native semantics unless you must (`<button role="heading">` is a smell).
3. All interactive ARIA controls must be **keyboard operable**.
4. Don't use `role="presentation"` or `aria-hidden="true"` on a **focusable** element (it hides it from AT but keeps it tabbable — a trap).
5. All interactive elements must have an **accessible name**.

```html
<!-- role = what it is; aria-* = state/property -->
<div
  role="checkbox"
  tabindex="0"
  aria-checked="false"
  aria-labelledby="terms-label"
></div>
<span id="terms-label">I accept the terms</span>
```

Categories:

- **Roles** — `role="button"`, `role="dialog"`, `role="tab"`, `role="alert"`, `role="navigation"`.
- **States** (change over time) — `aria-checked`, `aria-expanded`, `aria-selected`, `aria-disabled`, `aria-hidden`, `aria-pressed`.
- **Properties** (mostly static) — `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-controls`, `aria-haspopup`, `aria-live`.

> **Bad ARIA is worse than no ARIA.** Incorrect `aria-*` actively misleads screen readers.

---

## Common ARIA Attributes

Quick reference to the attributes you'll reach for most often.

| Attribute | Purpose |
|---|---|
| `aria-label` | Provides an accessible name when there's no visible text |
| `aria-hidden` | Hides decorative elements from assistive tech |
| `aria-expanded` | Communicates open/closed state (accordions, menus) |
| `aria-live` | Announces dynamic updates to screen readers |
| `aria-required` | Marks a form field as required |
| `role` | Defines what an element *is* when semantics are missing |

### `aria-label`

Provides a label when there's no visible text (e.g. icon-only buttons).

```html
<button aria-label="Delete">🗑</button>
```

### `aria-hidden`

Hides decorative elements from assistive tech (they stay visible on screen).

```html
<span aria-hidden="true">★</span>
```

### `aria-expanded`

Communicates the open/closed state of a control such as an accordion.

```html
<!-- Collapsed -->
<button aria-expanded="false">Section 1</button>

<!-- Changes to true when opened -->
<button aria-expanded="true">Section 1</button>
```

### `aria-live`

Announces dynamic content updates without moving focus.

```html
<div aria-live="polite">
  <!-- When the cart updates, the screen reader announces: -->
  Item added to cart
</div>
```

### `aria-required`

Indicates a form field must be filled in.

```html
<input aria-required="true" />
```

### `role`

Defines what an element is when native semantics are missing.

```html
<div role="button">Save</div>
```

> **Interview answer:** Prefer semantic HTML (`<button>`, `<nav>`, `<input>`) *before* reaching for ARIA roles. Use `role` only to fill gaps native elements can't cover.

---

## Accessible Names and Descriptions

Every interactive element needs an **accessible name**. Precedence (simplified) is: `aria-labelledby` > `aria-label` > visible text/`<label>` > `title`.

```html
<!-- 1. Visible text (best — visible to everyone) -->
<button>Delete</button>

<!-- 2. Icon-only button needs aria-label -->
<button aria-label="Delete item">
  <svg aria-hidden="true" focusable="false"><!-- trash icon --></svg>
</button>

<!-- 3. aria-labelledby references other element(s) by id -->
<h2 id="dialog-title">Confirm deletion</h2>
<div role="dialog" aria-labelledby="dialog-title">...</div>

<!-- 4. aria-describedby adds extra descriptive/help text -->
<input aria-label="Password" aria-describedby="pw-hint" type="password" />
<p id="pw-hint">Must be at least 8 characters.</p>
```

Decorative icons/images should be hidden from AT: `aria-hidden="true"` (and `focusable="false"` on inline SVGs).

---

## Keyboard Accessibility

Every interactive element must be reachable via **Tab** and operable via **Enter/Space** (and arrow keys for composite widgets).

```jsx
// If you MUST make a non-native element interactive, add all three:
<div
  role="button"
  tabIndex={0}                       // 1. focusable
  onClick={handleActivate}
  onKeyDown={(e) => {                // 2. keyboard operable
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleActivate();
    }
  }}
>
  Custom Button
</div>
```

`tabindex` values:

| Value | Effect |
|---|---|
| `tabindex="0"` | Adds element to natural tab order |
| `tabindex="-1"` | Focusable **programmatically** (`.focus()`) but not via Tab |
| `tabindex="1+"` | **Avoid** — hijacks tab order, hard to maintain |

Expected keyboard interactions (WAI-ARIA Authoring Practices):

- **Button**: Enter / Space
- **Link**: Enter
- **Checkbox / Toggle**: Space
- **Radio group / Tabs / Menu**: Arrow keys move between items
- **Dialog**: Esc closes; Tab is trapped inside
- **Combobox / Listbox**: Up/Down, Home/End, type-ahead

> Provide a **"Skip to main content"** link as the first focusable element so keyboard users can bypass repetitive nav.

```html
<a href="#main" class="skip-link">Skip to main content</a>
<main id="main" tabindex="-1">...</main>
```

---

## Focus Management

Managing focus is the #1 area SPAs get wrong. When content changes without a full page load, focus must move deliberately.

- **On route change (SPA):** move focus to the new page's `<h1>` or main region so screen readers announce the new context.
- **On opening a modal:** move focus into the dialog; **trap** it there.
- **On closing a modal:** **return** focus to the element that opened it.
- **Never remove focus outlines** without a visible replacement.

```css
/* BAD — invisible focus for keyboard users */
:focus { outline: none; }

/* GOOD — style focus, and use :focus-visible to avoid outlines on mouse click */
:focus-visible {
  outline: 3px solid #2563eb;
  outline-offset: 2px;
}
```

```jsx
// SPA route-change focus (React example)
useEffect(() => {
  headingRef.current?.focus();
}, [location.pathname]);

<h1 ref={headingRef} tabIndex={-1}>{pageTitle}</h1>
```

---

## Color and Contrast

Contrast ratios (WCAG 2.1 AA):

| Content | Minimum ratio |
|---|---|
| Normal text (< 18pt / < 14pt bold) | **4.5:1** |
| Large text (≥ 18pt / ≥ 14pt bold) | **3:1** |
| UI components & graphical objects (borders, icons, focus) | **3:1** |

**Color must never be the only way to convey information.** Pair it with text, icons, or patterns.

```html
<!-- BAD: only color distinguishes error -->
<p style="color:red">Payment failed</p>

<!-- GOOD: icon + text + color -->
<p class="error">
  <span aria-hidden="true">⚠️</span> Error: Payment failed
</p>
```

Also: don't disable zoom (`user-scalable=no` is an anti-pattern), and ensure content reflows at **200%–400% zoom** without horizontal scroll.

---

## Images and Media

```html
<!-- Meaningful image: describe its purpose/content -->
<img src="chart.png" alt="Q3 revenue rose 25% over Q2" />

<!-- Decorative image: empty alt so AT skips it -->
<img src="divider.svg" alt="" />
<!-- or -->
<div role="presentation" style="background-image:url(...)"></div>

<!-- Complex image: short alt + long description -->
<img src="diagram.png" alt="System architecture" aria-describedby="arch-desc" />
<p id="arch-desc">The client sends requests to the API gateway, which...</p>
```

- **Video/audio** need **captions** (for deaf/HoH) and ideally **transcripts** and **audio descriptions**.
- Don't autoplay audio; provide pause/stop controls.
- Avoid content that flashes more than **3 times per second** (seizure risk).

---

## Forms and Validation

Every input needs a programmatically associated label.

```html
<!-- Explicit label association (preferred) -->
<label for="email">Email address</label>
<input id="email" type="email" name="email" required />

<!-- Group related controls -->
<fieldset>
  <legend>Notification preference</legend>
  <label><input type="radio" name="notify" value="email" /> Email</label>
  <label><input type="radio" name="notify" value="sms" /> SMS</label>
</fieldset>
```

Accessible error handling:

```html
<label for="pwd">Password</label>
<input
  id="pwd"
  type="password"
  aria-invalid="true"
  aria-describedby="pwd-error"
/>
<!-- role="alert" so the error is announced immediately -->
<p id="pwd-error" role="alert">Password must be at least 8 characters.</p>
```

- Use `aria-invalid="true"` on invalid fields.
- Link the error text with `aria-describedby`.
- On submit failure, move focus to the **first** invalid field (or a summary).
- Never rely on `placeholder` as a label — it disappears on input and has poor contrast.

---

## Live Regions and Dynamic Content

Screen readers don't announce DOM changes unless the region is a **live region**.

```html
<!-- Polite: announced when the user is idle (toasts, status) -->
<div aria-live="polite" role="status">3 items added to cart</div>

<!-- Assertive: interrupts immediately (critical errors) -->
<div aria-live="assertive" role="alert">Session expired</div>
```

| Attribute / role | Behavior |
|---|---|
| `aria-live="polite"` / `role="status"` | Announce at next graceful opportunity |
| `aria-live="assertive"` / `role="alert"` | Interrupt and announce now |
| `aria-atomic="true"` | Announce the **whole** region, not just the changed node |
| `aria-busy="true"` | Suppress announcements while loading |

> The live region container must exist in the DOM **before** content is injected, otherwise the change may not be announced.

---

## Component Patterns

### Accessible Modal / Dialog

Requirements: `role="dialog"` + `aria-modal="true"`, labelled, focus moved in and **trapped**, Esc closes, focus **returned** on close, background inert.

```jsx
function Modal({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    previouslyFocused.current = document.activeElement;
    dialogRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      // (trap Tab within the dialog here)
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus(); // return focus on close
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className="overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose} aria-label="Close dialog">×</button>
      </div>
    </div>
  );
}
```

> Content behind the modal should be made inert (`inert` attribute or `aria-hidden="true"`) so AT/keyboard can't reach it.

### Accessible Dropdown / Menu

```html
<button
  aria-haspopup="true"
  aria-expanded="false"
  aria-controls="menu-list"
  id="menu-btn"
>
  Options
</button>
<ul role="menu" id="menu-list" aria-labelledby="menu-btn" hidden>
  <li role="menuitem" tabindex="-1">Edit</li>
  <li role="menuitem" tabindex="-1">Duplicate</li>
  <li role="menuitem" tabindex="-1">Delete</li>
</ul>
```

- Toggle `aria-expanded` true/false.
- Arrow keys move between `menuitem`s; Esc closes and returns focus to the trigger.

### Accessible Accordion

```html
<h3>
  <button aria-expanded="true" aria-controls="sect1" id="acc1">
    Section 1
  </button>
</h3>
<div id="sect1" role="region" aria-labelledby="acc1">
  Panel content...
</div>
```

- Header is a `<button>` inside a heading.
- `aria-expanded` reflects open/closed; `aria-controls` points to the panel.

### Accessible Tabs

```html
<div role="tablist" aria-label="Account settings">
  <button role="tab" aria-selected="true"  aria-controls="p1" id="t1" tabindex="0">Profile</button>
  <button role="tab" aria-selected="false" aria-controls="p2" id="t2" tabindex="-1">Billing</button>
</div>
<div role="tabpanel" id="p1" aria-labelledby="t1" tabindex="0">Profile panel</div>
<div role="tabpanel" id="p2" aria-labelledby="t2" tabindex="0" hidden>Billing panel</div>
```

- Only the active tab is in the tab order (`tabindex="0"`); Arrow keys switch tabs (roving tabindex).

### Accessible Tooltip

```html
<button aria-describedby="tip">Help</button>
<div role="tooltip" id="tip">Enter your 16-digit card number.</div>
```

- Show on both **hover and focus** (not hover only).
- Dismissible with Esc; must not obscure the trigger.

---

## Framework-Specific Notes

### React

- JSX uses camelCase for most props but **`aria-*` and `data-*` stay hyphenated**; `class` becomes `className`, `for` becomes `htmlFor`.
- Prefer refs + `useEffect` for focus management (route change, modal open).
- Use libraries built on WAI-ARIA APG: **React Aria (Adobe)**, **Radix UI**, **Headless UI**, **Reach UI**.
- Lint with **`eslint-plugin-jsx-a11y`**.

```jsx
<label htmlFor="name">Name</label>
<input id="name" aria-describedby="name-help" />
<button aria-label="Close" onClick={close}>×</button>
```

### Vue

- Bind ARIA dynamically with `:aria-expanded="isOpen"`, `:aria-hidden="!visible"`.
- Manage focus with template refs + `nextTick` (wait for DOM update before focusing).
- Use `vue-axe` in dev for runtime auditing; **Vuetify / PrimeVue** ship accessible components.

```vue
<template>
  <button
    :aria-expanded="isOpen"
    aria-controls="panel"
    @click="toggle"
  >
    Toggle
  </button>
  <div id="panel" v-show="isOpen" ref="panel" tabindex="-1">Content</div>
</template>

<script setup>
import { ref, nextTick } from "vue";
const isOpen = ref(false);
const panel = ref(null);
async function toggle() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    await nextTick();
    panel.value?.focus();
  }
}
</script>
```

### Angular

- The **CDK a11y module** (`@angular/cdk/a11y`) is the key tool:
  - `cdkTrapFocus` — focus trap directive for dialogs.
  - `FocusMonitor` — track focus origin (mouse vs keyboard).
  - `LiveAnnouncer` — programmatically push messages to a live region.
  - `A11yModule` for `cdkAriaLive`, `cdkFocusInitial`.
- **Angular Material** components are built on the CDK and are accessible by default.

```typescript
import { LiveAnnouncer } from "@angular/cdk/a11y";

constructor(private announcer: LiveAnnouncer) {}

save() {
  this.announcer.announce("Changes saved", "polite");
}
```

```html
<div cdkTrapFocus>
  <!-- focus is trapped within this dialog -->
</div>
```

### Next.js

- `next/link` renders a real `<a>` — keep it accessible; don't wrap it in another interactive element.
- **`next/image`** requires an `alt` prop (empty string for decorative). It warns in dev if omitted.
- Set the document language for SSR: `<html lang="en">` in `app/layout.tsx` (App Router) or `_document.tsx` (Pages Router). Screen readers use this for pronunciation.
- Manage per-page `<title>` (via Metadata API / `next/head`) — announced on navigation.
- Route changes are client-side, so **manually move focus** to the page heading after navigation.

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

---

## Testing Accessibility

A layered strategy — automated tools catch ~30–40%; the rest needs manual testing.

| Type | Tools |
|---|---|
| **Automated (CI/lint)** | `eslint-plugin-jsx-a11y`, axe-core, jest-axe, Pa11y, Lighthouse |
| **Browser extensions** | axe DevTools, WAVE, Lighthouse (Chrome DevTools) |
| **Manual keyboard** | Tab / Shift+Tab / Enter / Space / Arrows / Esc — unplug the mouse |
| **Screen readers** | VoiceOver (macOS/iOS), NVDA + JAWS (Windows), TalkBack (Android) |
| **Other manual** | 200%–400% zoom, high-contrast mode, contrast checkers |

```jsx
// Example: jest-axe unit test
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

test("Button has no a11y violations", async () => {
  const { container } = render(<Button>Save</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

> **Automated tools can't judge** whether alt text is meaningful, whether focus order is logical, or whether an interaction "makes sense" — always pair with manual keyboard + screen-reader testing.

---

## Rapid-Fire Facts

- **POUR** = Perceivable, Operable, Understandable, Robust.
- Target **WCAG 2.1 (or 2.2) Level AA**.
- **First rule of ARIA**: don't use ARIA if native HTML can do it.
- Normal text contrast **4.5:1**, large text & UI components **3:1**.
- Every interactive element needs an **accessible name** and **keyboard operability**.
- `tabindex="0"` = in tab order; `tabindex="-1"` = focusable only via script; avoid positive values.
- Icon-only buttons need `aria-label`; decorative icons get `aria-hidden="true"`.
- Decorative images use `alt=""`; meaningful images describe their purpose.
- Use `:focus-visible` — never `outline: none` without a visible replacement.
- `aria-live="polite"` waits; `aria-live="assertive"` / `role="alert"` interrupts.
- Modals: trap focus, Esc to close, **return focus** to the trigger, make background inert.
- SPA route change: move focus to the new page heading and update `<title>`.
- Color alone must never convey meaning — pair with text/icon/pattern.
- One `<h1>` per page; don't skip heading levels.
- Placeholders are **not** labels.
- `aria-hidden="true"` must **not** be on a focusable element.
- Angular: use CDK `a11y` (`cdkTrapFocus`, `LiveAnnouncer`, `FocusMonitor`).
- Next.js: set `<html lang>`, `alt` on `next/image`, manage focus on navigation.
- Automated testing catches ~30–40%; keyboard + screen-reader testing catches the rest.
