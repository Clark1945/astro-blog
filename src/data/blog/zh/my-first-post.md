---
author: Clark Liu
title: 買一個domain給自己有甚麼好處？
description: 買就對了，不要懷疑
pubDatetime: 2026-04-30T09:30:00Z
tags:
  - "Domain Name"
  - "Web"
  - "Cloudflare"
featured: false
draft: false
---

## 近期思考

最近，我在日常開發時，碰到了一個窘境，那就是我的開發總是沒有一個固定的環境可以上線，在AI時代我可以開發出很多有趣的app，但是絕大多數都只能留存在本地，而只能在本地的應用程式，難免會發生經典了的"It works on my machine!"問題，所以，我開始想要把自己開發的應用程式打包，部署在本機以外的位置。

## 部署選擇

那麼，說是要部署，那我要把我的程式碼放在哪裡呢。這是個好問題，也值得弄個一整篇文章來去做比較分析，像是到底本地好、抑或是哪個雲端供應商提供的服務有更好的穩定性與擴充性之類的。我不想在這邊一一討論，在此我只
說我所看到的情況。

市場現在有許多雲端供應商可以選擇，不論你要最大牌的Google Cloud、AWS、Azure，或是你想要找比較小型的Render、Fly.io等等都可以，當中不少都有提供**免費**方案可以提供你進行專案測試。但在這過程中你會遇到：

- 並不是永久免費 (如AWS 1 Year Free Tier)
- 永久免費的資源不足 (例如單核心、記憶體 1GB、請求限制等等)
- Serverless？(很抱歉 serverless 也有 cold start，並不是萬用)

所以，想要找一個地方部署自己的後端專案，其實並不容易。我個人不確定現在前端的生態，因此暫且不表。

你問我？我最後部署在本機，剛好家裡有舊筆電就將就用，也不是甚麼深思熟慮的結果。

而我之前往往會用aws serverless去勉強放入static page來讓自己的網站可以運作，但就是帶來高延遲、Domain name不固定等等問題。你可以想像你把自己的side project分別記錄在不同地方，結果你推了新版本之後aws api gateway就幫你把原先的url換掉了，省錢但反而增加了很多困擾。

所以，我開始考慮要買自己的domain name了。

## 購買Domain

有很多供應商都可以購買，這裡省略不一一列舉，主要是最後我以價格考量購買了Cloudflare registrar的domain name。以下是圖片：

![Cloudflare](/assets/cloudflare-domain.png)

可以看到，你輸入的名字會出現許多選項，如果上面沒有你的，通常可能是因為這個domain已經被人買走，所以建議從現有的選項上去選擇就好了。
你可以發現，domain的尾端是不一樣的。這個尾端叫做 頂級域名，你可以把它先想像成為一種domain的最大的分類，常見的有。

- .gov 這市政府專用，你無法買
- .com 這是最常見的，通常就是代表一個機構，或組織
- .org 代表組織，有時代表一些財團法人等等協會也會使用
- .dev 專為開發者設計，由 Google 管理，天生 HTTPS-only
- .io 科技公司、side project 超愛用

除此之外還有很多，你可以在這邊根據自己的喜好與可以接受的價格範圍之間挑出你最滿意的domain name。

需要注意的是，首年度的價格可能會與次年度的價格不同，我之所以選擇Cloudflare Registrar就是因為它的特色是「at cost」定價，沒有加價。比方說GoDaddy這個網站上很多網站首年度都相當便宜，然而只要一到次年度就...懂得都懂。

在挑選好之後，下單結帳後你就會獲得一個自己的domain了，恭喜你。

## 使用 Cloudflare 的好處

Cloudflare 購買之後，建議可以看看它的頁面，當中有不少重要有趣的細節可以討論。比方說Cloudflare購買的Domain name，Cloudflare會幫你處理好 ssl 簽章 的申請，同時也會協助自動更新。現代的幾乎所有網站都是使用HTTPS作為連線方式的，如果你是使用HTTP，在瀏覽器導向時就會跳出警告，因為SSL替我們處理好了傳輸中的連線加密這一塊，若是你的網站沒有SSL，就等同所有傳遞的資料不安全。

此外Cloudflare也提供了 Dashboard 去讓你可以瀏覽所有重要的功能，例如：管理多個domain，分析可疑用戶與封鎖AI機器人等。當中我最喜歡的功能是Account Analytics 功能，我可以透過這個頁面去了解我的網站的用戶的國籍與國家別的訪問次數等等

![Cloudflare](/assets/cloudflare-web-analytics.png)

另外Cloudflare也有提供Page，Page簡單來說，就是一個可以讓你上傳你的靜態網站的地方，若你有在寫blog，不妨也可以在購買cloudflare domain之後，順帶將blog的github也連接上你的cloudflare，如此一來cloudflare page就可以辨識你的靜態網站並協助快速部署，就像是我的網站就是透過cloudflare page部署的。

## 結論

我買了Cloudflare之後，覺得使用起來方便也很舒服，我建議工程師們──甚至不是工程師的人也可以購買自己的domain。買了domain之後：

- 你可以擁有自己永久的一個小空間，之後永遠不用去記自己的專案放在哪個網址下面，不管你是要放置side project、個人品牌行銷網站、tech blog都很推薦。
- 對於工程師，你可以了解網站的運作，好比DNS、Cache、TLD，以及現在各種成熟的AI Protection服務。而且價格也不貴，比方說我的domain在一年500台幣以內就可以解決了。
- 對於想要經營自我品牌的人，你可以讓SEO可以優化你的網站，擁有這個固定的路徑也能更好的提升個人品牌能見度。

以上，就是我近期購買domain的一些分享，感謝你看到這邊，那麼掰掰。
