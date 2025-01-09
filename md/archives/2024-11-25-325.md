---
title: "PHPで、Union Findをつくる"
description: "競技プログラミング等でときどき出てくる、Union Findというデータ構造について、PHPでやった場合の事例を書いてみました。"
eyecatch: 
    - src: " "
    - alt: " "
create_at: "2024-08-12T14:29:57"
update_at: "2024-11-25T22:13:20"
---


Union Findというデータ構造をPHPでやる場合の備忘録を残しておきます。

[Pythonの記事](https://note.nkmk.me/python-union-find/)を参考に作成しました。（サイズやランクは実装していないので、やや低速です）

```
<?php
class UnionFind {
  public $parents;
  public function __construct ($n) {
    $this->parents = range(0, $n - 1);
  }
  public function find ($x) {
    if ($this->parents[$x] === $x) {
      return $x;
    } else {
      $this->parents[$x] = $this->find($this->parents[$x]);
      return $this->parents[$x];
    }
  }
  public function union ($x, $y) {
    $px = $this->find($x);
    $py = $this->find($y);
    if ($px === $py) {
      return;
    }
    $this->parents[$px] = $py;
  }
}

// 使い方
$li = [0, 1, 2, 3, 4];
$uf = new UnionFind(count($li));
var_dump($uf->parents);
$uf->union(0, 3);
var_dump($uf->parents);
$uf->union(0, 1);
var_dump($uf->parents);
$uf->union(1, 2);
var_dump($uf->parents);
$uf->find(3);
var_dump($uf->parents);
```

自分でこのようなデータ構造を思いつくことはできませんが、すでにあるものは、どんどん学習して利用していきたいと思います。

---

（追記）
ちなみに、基本的にUnionFindは元に戻せませんが、Rollback機能付きのものもあるそうです。

[参考URL](https://nyaannyaan.github.io/library/data-structure/rollback-union-find.hpp.html)

