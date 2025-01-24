---
title: "テオヤンセン機構を描く"
description: "テオヤンセン機構をcanvasで描いてみました。その作り方をまとめます。"
eyecatch: 
    src: "/img/160/theo.jpg"
    alt: "テオヤンセン機構のひとつに点を指定したもの"
create_at: "2023-08-26T14:14:36"
update_at: "2023-08-27T14:24:02"
---

先週、夏休みで山陰旅行に行ってきました。

観光地をいくつか巡りましたが、中でも、[島根県立美術館](https://www.shimane-art-museum.jp/)で、2023年8月28日まで開催中の展覧会、「テオ・ヤンセン展」が面白かったです。

テオヤンセンさんは、物理学者で芸術家です。  
代表作は、「ストランドビースト」という作品です。

ストランドビーストを説明するのは難しいのですが、砂浜で、プラスチックチューブで作られた、風を食べて動く、大きな謎の生き物です。

言葉ではなんとも説明できないので、とりあえず[YouTube](https://www.youtube.com/channel/UCw4BFxLFguznor-MnYNwGTg)などを見ていただければと思います。

[wikipedia](https://ja.wikipedia.org/wiki/%E3%83%86%E3%82%AA%E3%83%BB%E3%83%A4%E3%83%B3%E3%82%BB%E3%83%B3_(%E5%BD%AB%E5%88%BB%E5%AE%B6))に、「ホーリーナンバー」という名称で、チューブの長さの比率があったので、これを参考に、JavaScriptとcanvasでアニメーションを作成してみました。  
それが、この記事の最初にのせたアニメーションです。

`Start/Stop` ボタンを押していただければ、アニメーションが開始されたり、止まったりするはずです。

---

1本足の場合も、[GitHub](https://thirdcake.github.io/tools_page/strandbeest.html) にアップロードしています。  
こちらは、アニメーションではなく、手動で動きます。

このような、チューブの長さが固定で、単純な回転運動から足が動くかのような動きになる機構のことを、「テオヤンセン機構」とか「ビースト機構」というそうです。

以下、このテオヤンセン機構について、JavaScriptでの作り方を解説します。  
興味のある方は、ぜひ最後まで読んでください。

## Canvasについて

HTML5以降、JavaScriptで絵を描く場合、たいていはsvgか、canvasになりました。  
今回は、canvasで作りました。

canvasの使い方は、[MDNの解説](https://developer.mozilla.org/ja/docs/Web/API/Canvas_API)が役に立ちます。

canvasは、基本的には、紙芝居を作るような感覚です。  
[clearRect](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/clearRect)で、前の描画を消し、[lineTo](https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/lineTo)で線を引いていきます。

凝った作りにしようと思ったら、楕円やベジェ曲線なども作れます。  
（今回は、そこまではチャレンジしていません）

## 固定点

テオヤンセン機構には、動かない点が2つあります。

<p><img src="/img/160/theo.jpg" alt="テオヤンセン機構の交点に名前をつけた図" decoding="async" width="16" height="9" style="display:block;width:300px;max-width:100%;height:auto;" /></p>

便宜上、テオヤンセン機構の交点に、A0からM1までの名前をつけています。  
上図でいうと、A0と、M0は固定されています。

今回作成したプログラムでは、`points` という連想配列を用意して、そこにA0, M0を用意しています。

## 三角形の交点を求める

テオヤンセン機構を計算するとき、三角形ABCにおいて、

- 3辺の長さが決まっている（辺AB, BC, CAが決まっている）
- 2点の座標が決まっている（たとえば、点AとBのx, y座標が決まっている）
- 回転の方向が決まっている（たとえば、点Cは、辺ABから反時計回りに最初の点）

という、3つの条件が決まった場合に、点Cが求まるという計算が多用されます。

この計算は、最初はchatGPTにお願いしたいのですが、思うような計算結果が出てこなかったので、高校時代の幾何の知識を調べながら作りました。  
（もし、うまくいくプロンプトをご存じの方は教えてください）

さしあたり、triangleという関数を以下のとおり定義しました。

```
function triangle (pointA, pointB, AC, BC) {
  const dx = pointB.x - pointA.x,
  dy = pointB.y - pointA.y,
  AB = Math.sqrt(dx ** 2 + dy ** 2);

  const cosA = (AB ** 2 + AC ** 2 - BC ** 2) / (2 * AC * AB),
  sinA = Math.sqrt(1 - cosA ** 2);

  const pointC = {
    x: (cosA * dx - sinA * dy) * AC / AB + pointA.x,
    y: (sinA * dx + cosA * dy) * AC / AB + pointA.y,
  }
  return pointC;
}
```

pointA.x, pointA.y に、点Aのx, y 座標があり、pointBについても同様です。  
また、AC, BCは、線分の長さです。

やっていることは単純です。

- まずピタゴラスの定理で、線分ABの長さを求めます。
- 次に、余弦定理で、コサインとサインを求めます。
- 最後に、座標の回転の計算で、点Cの座標を求めます。（[このサイト](https://mathwords.net/heimenkaiten)が参考になりました）

もしかすると、もっとうまいやり方があるかもしれませんが、とりあえずこれで正しく計算できます。  
計算量も大したことありません。

## 三角形の計算をつなげていく

上記の三角形の計算が分かれば、あとは単純に、それをつなげていくだけです。

固定点M0と、回転角から、点M1が求まります。  
次に、A0とM1から、三角形の計算で、点B1, C1が求まります。  
以下同様に、A0とB1からD1が、D1とC1からF1が、F1とC1からH1が求まります。

それぞれの求まった点を、線分で結んでいけば、機構を描けることになります。

ここまでが足が1本の説明です。

---

4本足にするには、それぞれ三角形の点Cの求める角度の方向を逆にしたり、回転運動の回転角をずらしたりして、できるだけ同じ関数が使えるように工夫しました。

4本足のscriptも、[GitHub](https://github.com/thirdcake/tools_page/blob/main/strandbeest2.html) に乗せていますので、気になる方は見てみてください。
