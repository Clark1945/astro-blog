---
author: Clark Liu
title: React 入門(1)：環境建置、JSX 與第一個 Component
description: 從安裝 Node.js、用 Vite 建立專案開始，理解 JSX 與 Component 概念，並動手寫出 Greeting 與 UserCard 兩個元件。
pubDatetime: 2026-06-10T00:00:00Z
tags:
  - "React"
  - "Frontend"
  - "JavaScript"
featured: false
draft: false
---

# 前言

這是我學習 React 的第一篇筆記。React 是主流的前端函式庫之一，核心概念是「用 Component（元件）組合出整個畫面」。這篇文章會從零開始，帶你：

1. 安裝 Node.js 並用 Vite 建立專案
2. 理解 JSX 語法與 Component 概念
3. 親手寫出第一個 `Greeting` 元件
4. 進一步寫出會接收資料的 `UserCard` 元件

# 安裝 Node.js + 建立 Vite 專案

## 安裝 Node.js

React 的開發工具都跑在 Node.js 上，所以第一步是安裝它。前往 [nodejs.org](https://nodejs.org/) 下載 **LTS（長期支援）** 版本即可。

安裝完成後，打開終端機確認是否安裝成功：

```bash
node -v
npm -v
```

只要兩個指令都印出版本號（例如 `v20.x.x`），就代表安裝完成了。`node` 是執行環境，`npm` 則是套件管理工具，等一下會用它來下載 React 相關的依賴。

## 用 Vite 建立專案

過去大家習慣用 `create-react-app`，但它已逐漸被淘汰。現在主流的做法是使用 **Vite**，它啟動快、設定少，非常適合初學者。

在終端機輸入以下指令：

```bash
npm create vite@latest my-react-app -- --template react
```

- `my-react-app` 是專案資料夾名稱，可以自行更改。
- `--template react` 告訴 Vite 我們要使用 React 模板。

接著進入資料夾、安裝依賴並啟動開發伺服器：

```bash
cd my-react-app
npm install
npm run dev
```

成功後終端機會顯示一個網址（通常是 `http://localhost:5173/`），用瀏覽器打開就能看到 Vite 預設的 React 畫面了。

## 專案結構快速導覽

打開專案後，幾個現階段需要認識的檔案：

```text
my-react-app/
├── index.html          # 唯一的 HTML 進入點
├── package.json        # 專案資訊與依賴清單
└── src/
    ├── main.jsx        # 程式進入點，把 App 掛載到頁面上
    ├── App.jsx         # 最上層的元件
    └── components/     # 我們等一下會把自己的元件放這裡
```

`src/main.jsx` 大致長這樣，它的工作是把 `App` 元件「渲染」到 `index.html` 裡 id 為 `root` 的容器中：

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

# 理解 JSX 語法 + Component 概念

## 什麼是 Component？

**Component（元件）就是一個會回傳畫面的 JavaScript 函式。** React 的核心思想是把 UI 拆成一塊塊獨立、可重複使用的元件，再像積木一樣組合起來。

一個最簡單的元件：

```jsx
function Hello() {
  return <h1>Hello, React!</h1>;
}

export default Hello;
```

要注意兩個慣例：

- **元件名稱必須以大寫字母開頭**（`Hello`，而不是 `hello`）。React 用這個規則來區分「自訂元件」與「HTML 標籤」。
- 元件**回傳的是畫面**，寫法看起來像 HTML，但其實是 JSX。

## 什麼是 JSX？

JSX 是一種讓你「在 JavaScript 裡寫 HTML 樣子的標記」的語法糖。瀏覽器看不懂 JSX，所以 Vite 會在背後把它編譯成普通的 JavaScript。

JSX 有幾個和 HTML 不同、初學者最常踩雷的地方：

```jsx
function Demo() {
  const name = "Clark";

  return (
    <div className="card">
      {/* 1. 用大括號 {} 在 JSX 裡塞入 JavaScript */}
      <p>Hello, {name}</p>

      {/* 2. class 要寫成 className（因為 class 是 JS 保留字）*/}
      {/* 3. 多個元素必須包在「一個」最外層標籤裡 */}
    </div>
  );
}
```

重點整理：

| 規則        | 說明                                                      |
| ----------- | --------------------------------------------------------- |
| `{ }`       | 在 JSX 中嵌入 JavaScript 變數或運算式                     |
| `className` | 取代 HTML 的 `class`                                      |
| 單一根元素  | `return` 只能回傳一個最外層標籤（可用 `<>...</>` 包起來） |
| 自閉合標籤  | `<img />`、`<br />` 都要記得加 `/`                        |

## JSX 與 TSX 的差別

你可能會看到副檔名有時是 `.jsx`、有時是 `.tsx`，差別其實只在於「用哪種語言寫」：

- **`.jsx`** = JavaScript + JSX。
- **`.tsx`** = TypeScript + JSX。也就是同樣的 JSX 語法，但多了 TypeScript 的型別系統，可以幫變數與 props 標註型別、在傳錯資料時即時提醒。

本系列為了專注在 React 概念，會先用 `.jsx`；之後熟悉了、學過 TypeScript 再轉用 `.tsx` 享受型別檢查的好處。

# 動手做：Greeting Component

理論看完了，來寫第一個真正的元件。我們在 `src/components/` 底下新增一個 `Greeting.jsx`。

## 最基本的版本

```jsx
function Greeting() {
  return <h2>歡迎來到 React 的世界！</h2>;
}

export default Greeting;
```

然後在 `App.jsx` 裡使用它：

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

存檔後瀏覽器會自動更新，你就能看到那行歡迎訊息了。

## 加上 Props：讓元件接收資料

寫死的文字沒什麼用，元件真正的威力在於可以「接收外部傳進來的資料」，這個機制叫做 **props**。

```jsx
function Greeting({ name }) {
  return <h2>哈囉，{name}！歡迎來到 React 的世界 🎉</h2>;
}

export default Greeting;
```

這裡 `{ name }` 是把傳進來的 props 物件直接解構出 `name` 屬性。使用時像 HTML 屬性一樣傳值：

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

同一個 `Greeting` 元件，傳入不同的 `name`，就渲染出三段不同的問候語——這就是「可重複使用」的具體展現。

# 動手做：UserCard Component

最後我們把概念再往前推一步，做一張顯示使用者資訊的 `UserCard`。它會接收多個 props，並示範如何處理物件與條件渲染。

新增 `src/components/UserCard.jsx`：

```jsx
function UserCard({ name, role, avatar, isOnline }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} width={64} height={64} />
      <h3>{name}</h3>
      <p>{role}</p>

      {/* 條件渲染：依 isOnline 顯示不同狀態 */}
      <span>{isOnline ? "🟢 線上" : "⚪ 離線"}</span>
    </div>
  );
}

export default UserCard;
```

幾個新觀念：

- 元件可以同時接收**多個 props**（`name`、`role`、`avatar`、`isOnline`）。
- `src={avatar}`：屬性的值也能用 `{}` 帶入變數。
- `{isOnline ? "🟢 線上" : "⚪ 離線"}`：在 JSX 裡用**三元運算子**做條件渲染，是最常見的寫法。

在 `App.jsx` 中使用：

```jsx
import UserCard from "./components/UserCard";

function App() {
  return (
    <div>
      <UserCard
        name="Clark Liu"
        role="後端工程師"
        avatar="https://i.pravatar.cc/64?img=12"
        isOnline={true}
      />
      <UserCard
        name="Alice Wang"
        role="設計師"
        avatar="https://i.pravatar.cc/64?img=5"
        isOnline={false}
      />
    </div>
  );
}

export default App;
```

注意 `isOnline={true}`：當 props 的值是字串以外的型別（布林、數字、物件、變數）時，必須用大括號 `{}` 包起來，而不是用引號。

## 進階一步：用陣列渲染多張卡片

實務上資料通常來自一個陣列。搭配 JavaScript 的 `map()`，可以一次渲染多張卡片：

```jsx
import UserCard from "./components/UserCard";

const users = [
  {
    id: 1,
    name: "Clark Liu",
    role: "後端工程師",
    avatar: "https://i.pravatar.cc/64?img=12",
    isOnline: true,
  },
  {
    id: 2,
    name: "Alice Wang",
    role: "設計師",
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

這裡的 `key={user.id}` 很重要：當你用 `map` 渲染清單時，React 需要一個獨一無二的 `key` 來辨識每個元素，方便它做高效更新。通常用資料的 `id` 當 key。

# 小結

這篇我們完成了：

- ✅ 安裝 Node.js，並用 **Vite** 建立 React 專案
- ✅ 理解 **Component**（回傳畫面的函式）與 **JSX**（在 JS 裡寫畫面）的概念
- ✅ 寫出 `Greeting` 元件，並透過 **props** 傳入資料
- ✅ 寫出 `UserCard` 元件，學會多個 props、條件渲染、以及用 `map` 渲染清單

下一篇我會繼續記錄 **State 與事件處理**（`useState`、`onClick`），讓元件不只是顯示資料，還能「互動」。
