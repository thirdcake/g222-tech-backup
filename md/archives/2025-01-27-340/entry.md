---
title: "JavaScriptのES Moduleについて調べました"
description: "Qiitaに記事を書いたときに使ったES Moduleについてまとめています。"
eyecatch: 
    src: "/img/340/eyecatch.jpg"
    alt: "大分県の国東半島にある熊野摩崖仏"
create_at: "2025-01-27T11:31:13"
---

## Qiitaに記事を書きました

少し前ですが、[Qiitaに記事を書きました](https://qiita.com/g222/items/14ff49541c5cdc5cc001)。  
内容としては、AVL木という平衡二分木を可視化するというもので、JavaScriptで書きました。

そのためには、二分木そのもののプログラムも必要ですが、同時に、それを表示するプログラム、また、操作するプログラムも、一緒に考えなくてはいけません。

そうすると、プログラムがとても大きくなってしまい、あとから読んだり修正したりするのが、難しくなります。

読みやすさや修正しやすさのために、通常は、モジュールというものに小分けをすることが一般的です。

モジュール自体にも、いろいろ種類があるようなのですが、今回は[mdnに書いてある通常のモジュール](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Modules)（いわゆる、ES Module）を使って、小分けすることにしました。

## ES Module とは

JavaScriptのモジュールは、使い方がいくつかあるようなのですが、とりあえずexportとimportだけ使えれば十分です。

たとえば、`parent.js` というモジュールから、`child.js` というファイルに書いてある関数を使いたい場合、以下のようにします。

```JavaScript
// parent.js
import {someFunc} from './child.js';

// インポートしたsomeFuncを実行
someFunc();
```

```JavaScript
// child.js
function someFunc() {
    // 何かしらの実行
}
export {someFunc};
```

## esbuild とは

モジュール化すると、ファイルを分けられるので、プログラムを書く側としては楽になります。  
一方、読み込む側からすると、ファイルが増えるので、読み込みに時間がかかるようになってしまいます。

できれば、ファイルは１つにまとめたいところです。  
まとめるのが、バンドラと呼ばれるものです。

有名どころでは、webpackというものですが、調べてみると、最近は[esbuild](https://esbuild.github.io/)というものが早いということを知りました。

esbuildは、node.jsを用意して、ドキュメントの通りにインストールすれば、コマンドラインから使えるようになります。

バンドルするときに、minify（ファイルの無駄な部分を圧縮する方法）を選択することも可能でした。

## sassについて

なお、JavaScriptのモジュール化ができるなら、CSSもできます。

CSSについても、さまざまなプログラムがありますが、最近は、[Dart Sass](https://sass-lang.com/dart-sass/)が一般的なようです。

最近は、素のCSSでも、ネストできるようになるなど、進化しているのでそれほど面倒でもないのかもしれませんが、しかし書くときにものすごい分量のCSSファイルを読むよりは、ファイルが分かれていたほうが便利かなと思います。  
（Tailwindや、CSS in JSは、なんとなく敬遠しています。便利なのかもしれませんが、なんとなく手が出しづらいです。）
