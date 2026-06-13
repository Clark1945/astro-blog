---
author: Clark Liu
title: "Getting Started with React (1): Setup, JSX, and Your First Component"
description: Install Node.js, scaffold a project with Vite, understand JSX and components, then build a Greeting and a UserCard component from scratch.
pubDatetime: 2026-06-10T00:00:00Z
tags:
  - "React"
  - "Frontend"
  - "JavaScript"
featured: false
draft: false
---

# Introduction

This is my first note while learning React. React is one of the most popular frontend libraries today, and its core idea is simple: **build your whole UI by composing Components**. Starting from zero, this article will walk you through:

1. Installing Node.js and scaffolding a project with Vite
2. Understanding JSX syntax and the Component concept
3. Writing your first `Greeting` component
4. Building a `UserCard` component that receives data

# Installing Node.js + Creating a Vite Project

## Install Node.js

React's tooling runs on Node.js, so that's the first thing to install. Head to [nodejs.org](https://nodejs.org/) and download the **LTS (Long-Term Support)** version.

Once installed, open a terminal and confirm it worked:

```bash
node -v
npm -v
```

If both commands print a version number (e.g. `v20.x.x`), you're good to go. `node` is the runtime, and `npm` is the package manager we'll use to pull in React's dependencies.

## Scaffold with Vite

People used to reach for `create-react-app`, but it's now deprecated. The modern default is **Vite** — fast to start, minimal config, and great for beginners.

Run this in your terminal:

```bash
npm create vite@latest my-react-app -- --template react
```

- `my-react-app` is the project folder name; feel free to change it.
- `--template react` tells Vite to use the React template.

Then enter the folder, install dependencies, and start the dev server:

```bash
cd my-react-app
npm install
npm run dev
```

When it succeeds, the terminal prints a URL (usually `http://localhost:5173/`). Open it in your browser and you'll see Vite's default React page.

## A Quick Tour of the Project Structure

A few files worth knowing at this stage:

```text
my-react-app/
├── index.html          # The single HTML entry point
├── package.json        # Project info and dependency list
└── src/
    ├── main.jsx        # The JS entry point; mounts App onto the page
    ├── App.jsx         # The top-level component
    └── components/     # Where we'll put our own components shortly
```

`src/main.jsx` looks roughly like this — its job is to "render" the `App` component into the container with id `root` inside `index.html`:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

# Understanding JSX + the Component Concept

## What Is a Component?

**A component is just a JavaScript function that returns some UI.** React's core idea is to split the UI into independent, reusable pieces (components), then assemble them like building blocks.

The simplest possible component:

```jsx
function Hello() {
  return <h1>Hello, React!</h1>;
}

export default Hello;
```

Two conventions to note:

- **Component names must start with a capital letter** (`Hello`, not `hello`). React uses this rule to distinguish your custom components from plain HTML tags.
- A component **returns UI**, written in a syntax that looks like HTML but is actually JSX.

## What Is JSX?

JSX is syntactic sugar that lets you write "HTML-looking markup" directly inside JavaScript. Browsers don't understand JSX, so Vite compiles it into plain JavaScript behind the scenes.

A few ways JSX differs from HTML — the classic beginner gotchas:

```jsx
function Demo() {
  const name = "Clark";

  return (
    <div className="card">
      {/* 1. Use curly braces {} to embed JavaScript in JSX */}
      <p>Hello, {name}</p>

      {/* 2. Write className instead of class (class is a reserved word in JS) */}
      {/* 3. Multiple elements must be wrapped in ONE outer tag */}
    </div>
  );
}
```

Key rules:

| Rule         | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| `{ }`        | Embed JavaScript variables or expressions inside JSX                |
| `className`  | Replaces HTML's `class`                                             |
| Single root  | `return` can only return one outermost tag (use `<>...</>` to wrap) |
| Self-closing | Remember the `/` in `<img />`, `<br />`                             |

## JSX vs. TSX

You'll sometimes see the `.jsx` extension and sometimes `.tsx`. The difference is just which language you write in:

- **`.jsx`** = JavaScript + JSX.
- **`.tsx`** = TypeScript + JSX. Same JSX syntax, plus TypeScript's type system, which lets you annotate variables and props with types and warns you the moment you pass the wrong data.

To keep this series focused on React concepts, we'll start with `.jsx`; switch to `.tsx` later — once you're comfortable and have learned some TypeScript — to enjoy the benefits of type checking.

# Hands-On: The Greeting Component

Enough theory — let's write our first real component. Create `Greeting.jsx` under `src/components/`.

## The Most Basic Version

```jsx
function Greeting() {
  return <h2>Welcome to the world of React!</h2>;
}

export default Greeting;
```

Then use it inside `App.jsx`:

```jsx
import Greeting from "./components/Greeting";

function App() {
  return (
    <div>
      <Greeting />
    </div>
  );
}

export default App;
```

Save the file and the browser auto-refreshes — you'll see the welcome message.

## Adding Props: Letting a Component Receive Data

Hard-coded text isn't very useful. A component's real power is its ability to receive data from outside, a mechanism called **props**.

```jsx
function Greeting({ name }) {
  return <h2>Hi, {name}! Welcome to the world of React 🎉</h2>;
}

export default Greeting;
```

Here `{ name }` destructures the `name` property straight out of the incoming props object. You pass values like HTML attributes:

```jsx
function App() {
  return (
    <div>
      <Greeting name="Clark" />
      <Greeting name="Alice" />
      <Greeting name="Bob" />
    </div>
  );
}
```

The same `Greeting` component, given different `name` values, renders three different greetings — that's reusability in action.

# Hands-On: The UserCard Component

Finally, let's push the idea further and build a `UserCard` that displays user info. It takes several props and demonstrates handling data plus conditional rendering.

Create `src/components/UserCard.jsx`:

```jsx
function UserCard({ name, role, avatar, isOnline }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} width={64} height={64} />
      <h3>{name}</h3>
      <p>{role}</p>

      {/* Conditional rendering: show different status based on isOnline */}
      <span>{isOnline ? "🟢 Online" : "⚪ Offline"}</span>
    </div>
  );
}

export default UserCard;
```

A few new concepts:

- A component can receive **multiple props** at once (`name`, `role`, `avatar`, `isOnline`).
- `src={avatar}`: an attribute's value can also be a variable via `{}`.
- `{isOnline ? "🟢 Online" : "⚪ Offline"}`: conditional rendering with a **ternary operator** — the most common pattern in JSX.

Use it in `App.jsx`:

```jsx
import UserCard from "./components/UserCard";

function App() {
  return (
    <div>
      <UserCard
        name="Clark Liu"
        role="Backend Engineer"
        avatar="https://i.pravatar.cc/64?img=12"
        isOnline={true}
      />
      <UserCard
        name="Alice Wang"
        role="Designer"
        avatar="https://i.pravatar.cc/64?img=5"
        isOnline={false}
      />
    </div>
  );
}

export default App;
```

Note `isOnline={true}`: when a prop's value is anything other than a string (boolean, number, object, variable), you must wrap it in curly braces `{}` rather than quotes.

## Going Further: Rendering Multiple Cards from an Array

In practice, data usually comes from an array. Combined with JavaScript's `map()`, you can render many cards at once:

```jsx
import UserCard from "./components/UserCard";

const users = [
  {
    id: 1,
    name: "Clark Liu",
    role: "Backend Engineer",
    avatar: "https://i.pravatar.cc/64?img=12",
    isOnline: true,
  },
  {
    id: 2,
    name: "Alice Wang",
    role: "Designer",
    avatar: "https://i.pravatar.cc/64?img=5",
    isOnline: false,
  },
  {
    id: 3,
    name: "Bob Chen",
    role: "PM",
    avatar: "https://i.pravatar.cc/64?img=8",
    isOnline: true,
  },
];

function App() {
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          name={user.name}
          role={user.role}
          avatar={user.avatar}
          isOnline={user.isOnline}
        />
      ))}
    </div>
  );
}

export default App;
```

The `key={user.id}` here matters: when you render a list with `map`, React needs a unique `key` to identify each element so it can update efficiently. The data's `id` is the usual choice.

# Wrap-Up

In this post we:

- ✅ Installed Node.js and scaffolded a React project with **Vite**
- ✅ Understood **Components** (functions that return UI) and **JSX** (writing UI inside JS)
- ✅ Wrote a `Greeting` component and passed data through **props**
- ✅ Built a `UserCard` component, learning multiple props, conditional rendering, and list rendering with `map`

In the next post I'll cover **state and event handling** (`useState`, `onClick`), so components can do more than display data — they can become interactive.
