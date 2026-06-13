---
author: Clark Liu
title: "React 入門(1)：環境構築、JSX、そして最初のコンポーネント"
description: Node.js のインストールから Vite でのプロジェクト作成、JSX とコンポーネントの理解、そして Greeting と UserCard コンポーネントを実際に作ってみる。
pubDatetime: 2026-06-10T00:00:00Z
tags:
  - "React"
  - "Frontend"
  - "JavaScript"
featured: false
draft: false
---

# はじめに

これは私が React を学び始めて最初のノートです。React は現在もっとも人気のあるフロントエンドライブラリの一つで、その核となる考え方は「**コンポーネントを組み合わせて画面全体を作る**」というものです。この記事ではゼロから、次の流れで進めていきます。

1. Node.js のインストールと Vite でのプロジェクト作成
2. JSX 構文とコンポーネントの概念を理解する
3. 最初の `Greeting` コンポーネントを書く
4. データを受け取る `UserCard` コンポーネントを作る

# Node.js のインストール + Vite プロジェクトの作成

## Node.js をインストールする

React の開発ツールは Node.js 上で動くため、まずはこれをインストールします。[nodejs.org](https://nodejs.org/) にアクセスして **LTS（長期サポート）** 版をダウンロードしましょう。

インストールが終わったら、ターミナルを開いて確認します。

```bash
node -v
npm -v
```

両方のコマンドがバージョン番号（例：`v20.x.x`）を表示すれば完了です。`node` は実行環境、`npm` はパッケージ管理ツールで、これから React 関連の依存パッケージを取得するのに使います。

## Vite でプロジェクトを作成する

以前は `create-react-app` がよく使われていましたが、現在は非推奨になりました。今の主流は **Vite** です。起動が速く、設定も少ないため初心者に最適です。

ターミナルで次のコマンドを実行します。

```bash
npm create vite@latest my-react-app -- --template react
```

- `my-react-app` はプロジェクトのフォルダ名です。自由に変更できます。
- `--template react` は Vite に React テンプレートを使うよう指示します。

続いてフォルダに入り、依存パッケージをインストールして開発サーバーを起動します。

```bash
cd my-react-app
npm install
npm run dev
```

成功するとターミナルに URL（通常は `http://localhost:5173/`）が表示されます。ブラウザで開くと Vite のデフォルトの React 画面が見えます。

## プロジェクト構成をざっと把握する

現時点で知っておくべきファイルはいくつかです。

```text
my-react-app/
├── index.html          # 唯一の HTML エントリーポイント
├── package.json        # プロジェクト情報と依存パッケージ一覧
└── src/
    ├── main.jsx        # JS のエントリーポイント。App をページに描画する
    ├── App.jsx         # 最上位のコンポーネント
    └── components/     # この後、自作コンポーネントを置く場所
```

`src/main.jsx` はだいたい次のような形で、`App` コンポーネントを `index.html` 内の id が `root` のコンテナに「描画（render）」するのが役割です。

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

# JSX 構文 + コンポーネントの概念を理解する

## コンポーネントとは？

**コンポーネントとは、画面（UI）を返す JavaScript の関数です。** React の核心は、UI を独立した再利用可能な部品（コンポーネント）に分割し、それらをブロックのように組み合わせることです。

もっとも単純なコンポーネント：

```jsx
function Hello() {
  return <h1>Hello, React!</h1>;
}

export default Hello;
```

注意すべき 2 つの慣習：

- **コンポーネント名は必ず大文字で始める**（`hello` ではなく `Hello`）。React はこのルールで「自作コンポーネント」と「HTML タグ」を区別します。
- コンポーネントは **UI を返します**。書き方は HTML に見えますが、実際は JSX です。

## JSX とは？

JSX は「JavaScript の中に HTML のような記述」を書けるようにする糖衣構文（シンタックスシュガー）です。ブラウザは JSX を理解できないため、Vite が裏側で普通の JavaScript にコンパイルします。

JSX が HTML と異なる、初心者がよく引っかかるポイント：

```jsx
function Demo() {
  const name = "Clark";

  return (
    <div className="card">
      {/* 1. 波括弧 {} で JSX 内に JavaScript を埋め込む */}
      <p>Hello, {name}</p>

      {/* 2. class ではなく className と書く（class は JS の予約語のため）*/}
      {/* 3. 複数の要素は「1 つ」の最外要素で囲む必要がある */}
    </div>
  );
}
```

重要なルール：

| ルール           | 説明                                                        |
| ---------------- | ----------------------------------------------------------- |
| `{ }`            | JSX 内に JavaScript の変数や式を埋め込む                    |
| `className`      | HTML の `class` の代わり                                    |
| 単一のルート要素 | `return` は最外要素を 1 つだけ返せる（`<>...</>` で囲める） |
| 自己終了タグ     | `<img />`、`<br />` には `/` を忘れずに                     |

## JSX と TSX の違い

拡張子が `.jsx` のときもあれば `.tsx` のときもありますが、違いは「どちらの言語で書くか」だけです。

- **`.jsx`** = JavaScript + JSX。
- **`.tsx`** = TypeScript + JSX。同じ JSX 構文に TypeScript の型システムが加わったもので、変数や props に型を付けられ、間違ったデータを渡すとすぐに警告してくれます。

本シリーズでは React の概念に集中するため、まずは `.jsx` を使います。慣れてきて TypeScript を学んだら `.tsx` に切り替えて型チェックの恩恵を受けましょう。

# 実践：Greeting コンポーネント

理論はここまで。最初の本物のコンポーネントを書きましょう。`src/components/` の下に `Greeting.jsx` を作成します。

## もっとも基本的なバージョン

```jsx
function Greeting() {
  return <h2>React の世界へようこそ！</h2>;
}

export default Greeting;
```

そして `App.jsx` で使います。

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

保存するとブラウザが自動で更新され、歓迎メッセージが表示されます。

## Props を加える：コンポーネントにデータを渡す

ベタ書きのテキストはあまり役に立ちません。コンポーネントの本当の力は「外部から渡されたデータを受け取れる」ことにあり、この仕組みを **props** と呼びます。

```jsx
function Greeting({ name }) {
  return <h2>こんにちは、{name} さん！React の世界へようこそ 🎉</h2>;
}

export default Greeting;
```

ここで `{ name }` は、渡された props オブジェクトから `name` プロパティを直接分割代入（デストラクチャリング）しています。使うときは HTML 属性のように値を渡します。

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

同じ `Greeting` コンポーネントに異なる `name` を渡すと、3 つの異なる挨拶が描画されます。これが「再利用性」の具体例です。

# 実践：UserCard コンポーネント

最後に、もう一歩進めてユーザー情報を表示する `UserCard` を作ります。複数の props を受け取り、データの扱いと条件付きレンダリングを示します。

`src/components/UserCard.jsx` を作成します。

```jsx
function UserCard({ name, role, avatar, isOnline }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} width={64} height={64} />
      <h3>{name}</h3>
      <p>{role}</p>

      {/* 条件付きレンダリング：isOnline に応じて状態を切り替える */}
      <span>{isOnline ? "🟢 オンライン" : "⚪ オフライン"}</span>
    </div>
  );
}

export default UserCard;
```

いくつかの新しい概念：

- コンポーネントは **複数の props** を同時に受け取れる（`name`、`role`、`avatar`、`isOnline`）。
- `src={avatar}`：属性の値も `{}` で変数を渡せる。
- `{isOnline ? "🟢 オンライン" : "⚪ オフライン"}`：JSX 内で **三項演算子** を使った条件付きレンダリング。もっとも一般的な書き方です。

`App.jsx` で使います。

```jsx
import UserCard from "./components/UserCard";

function App() {
  return (
    <div>
      <UserCard
        name="Clark Liu"
        role="バックエンドエンジニア"
        avatar="https://i.pravatar.cc/64?img=12"
        isOnline={true}
      />
      <UserCard
        name="Alice Wang"
        role="デザイナー"
        avatar="https://i.pravatar.cc/64?img=5"
        isOnline={false}
      />
    </div>
  );
}

export default App;
```

`isOnline={true}` に注目してください。props の値が文字列以外（真偽値、数値、オブジェクト、変数）の場合は、引用符ではなく波括弧 `{}` で囲む必要があります。

## さらに一歩：配列から複数のカードを描画する

実務ではデータは通常、配列から来ます。JavaScript の `map()` と組み合わせれば、複数のカードを一度に描画できます。

```jsx
import UserCard from "./components/UserCard";

const users = [
  {
    id: 1,
    name: "Clark Liu",
    role: "バックエンドエンジニア",
    avatar: "https://i.pravatar.cc/64?img=12",
    isOnline: true,
  },
  {
    id: 2,
    name: "Alice Wang",
    role: "デザイナー",
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

ここでの `key={user.id}` は重要です。`map` でリストを描画するとき、React は各要素を識別して効率的に更新するために一意の `key` を必要とします。通常はデータの `id` を key に使います。

# まとめ

この記事では次のことを行いました。

- ✅ Node.js をインストールし、**Vite** で React プロジェクトを作成
- ✅ **コンポーネント**（UI を返す関数）と **JSX**（JS の中に UI を書く）の概念を理解
- ✅ `Greeting` コンポーネントを書き、**props** でデータを渡す
- ✅ `UserCard` コンポーネントを作り、複数の props・条件付きレンダリング・`map` によるリスト描画を学ぶ

次回は **state とイベント処理**（`useState`、`onClick`）を扱い、コンポーネントがデータを表示するだけでなく「インタラクティブ」になるところまで進めます。
