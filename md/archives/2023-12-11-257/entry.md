---
title: "pushStateでブラウザの状態を管理する"
description: "ジンドゥーの記事をQiitaに書く際に、pushState()について調べたのでまとめます。"
eyecatch: 
    src: "/img/257/eyecatch.jpg"
    alt: "石川県金沢市にあるレアンドロのスイミングプール"
create_at: "2023-12-11T19:45:50"
---

## きっかけ

先日、Qiitaに記事を書きました。

[ジンドゥーで鍵付きブログができないから、microCMSで近いものを作ってみたい](https://qiita.com/g222/items/1cef4743c591019a4304)

ざっくりいうと、SPA（シングルページアプリケーション）を作りたいという話です。  
SPAを作る場合、通常は、react.jsやvue.js（もしくは、それらを使ったNext.jsやNuxt.jsなど）を利用すると思うのですが、ジンドゥーの中に入れ込むという性質上、あまり大きなjsファイルは読み込めません。  
※特に、ジンドゥーはそれほど表示速度が速くないので。。。

そこで、簡易的なSPA（のようなもの）を作りました。  
[GitHub](https://github.com/thirdcake/microcms-into-jimdo/)に置いてあります。

その際、historyAPIのpushStateについて調べることになったので、その調べた内容をここに整理しておきたいと思います。  
（なお、普通に作るなら、react-routerなどを使うはずなので、以下の知識はなくても困らないはずです）

仕様などについては、MDNにある[History.pushState](https://developer.mozilla.org/ja/docs/Web/API/History/pushState)の記事を参照してください。

## 検討すべきイベント

JavaScriptは、イベント駆動なので、イベントごとに考えると整理しやすかったです。

以下の、3つのイベントを考えます。

1. 最初に読み込まれたとき
2. リンクがクリックされたとき
3. 戻る・進むボタンが押されたとき

順番にまとめます。

## 最初に読み込まれたとき

最初に読み込まれたときというのは、いわゆる、 DOMContentLoaded や、load イベントのことです。

最初の画面を表示する関数が必要になります。

いろいろ試行錯誤した結果、URLSearchParamsに、テンプレートのタイプ（archive画面か、post画面かなど）や、ページIDなどを入れ込んでしまうのが良さそうです。

特にこだわりがなければ、画面表示は、window.locationのsearch部分さえあればできるように作成することをおすすめします。

```
// 例
function display(){
    const state = new URLSearchParams(window.location.search)
    // stateのパラメータで分岐させて、表示処理を書く
}
document.addEventListener('DOMContentLoaded', display, false);
```

このように、最初の画面表示だけなら、pushState()は使わなくて良いです。

## リンクが押されたとき

リンクが押されたときは、 click イベントが発火します。

以下のような、clickHandler関数を用意しておくと良いと思います。

```
// 例
function clickHandler(ev){
    const url = new URL();
    // url.searchに、クリックされた次のページの情報を入力する
    history.pushState({}, '', url.toString());
    display();  // pushState後、クリック先の画面を表示する
}
spaDOM.addEventListener('click', clickHandler, false);
```

クリックしたとき、そのクリック先の情報をURLに入れて、urlをpushStateで変更します。  
その変更後に、その変更されたURLを読み取って、画面表示しなおせば良い、ということです。

ただし、そのクリックされた内容が、SPA内部のリンクなのか、それとも外部のリンクなのかで、分岐させる必要があります。（内部リンクであれば、 preventDefault が必要になるからです。なお、その分岐部分は、上記のスクリプトでは書いていません）

わたしなりの書き方は、Githubに書いたとおりなのですが、まだ不十分な部分があるようなので、もう少し改善していきたいと思っています。

## 戻る・進むボタンが押されたとき

多くのブラウザには、戻る・進むボタンがあります。 popstate イベントを利用すれば、これも発火させることができます。

```
// 例
window.addEventListener('popstate', display, false);
```

この場合は、戻るボタンが押された時点で、 location.href も変更されているため、そのイベントのときだけ作業するということはありません。

ただ単純に、画面表示の関数を呼び出せば良いです。

## まとめ

以上のように、URLの管理だけなら、clickイベント時のpushState()を利用するだけでも、十分に機能します。

もちろん、react-routerなどが使えるなら、それにこしたことはないのですが、表示速度が厳しい場合などは、上記のようなやり方を検討してみても良いかもしれません。

