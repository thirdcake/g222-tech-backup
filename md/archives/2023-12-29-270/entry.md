---
title: "WSL2に、フラットファイルCMSを入れてみる"
description: "windowsのlocal環境で、Gravや、Bluditなどのデータベース不要のCMSを入れてみました。"
eyecatch: 
    src: "/img/270/eyecatch.jpg"
    alt: "大分県中津市の風の丘葬祭場"
create_at: "2023-12-29T11:48:12"
---

## やりたいこと

Windows11のWSL2（ubuntu 22.04 LTS）に、PHPや、apache2などのウェブサーバーをインストールして、ローカル環境を作り、BluditやGravなどのフラットファイルCMSを入れたいです。

## きっかけ

当サイトは、WordPressを利用して作成しています。  
しかし、正直、個人事業主でWordPressは、ややオーバースペックのような気がしています。  
そこで、ゆくゆくは何か別のCMSを使っていきたいのですが、いきなりインターネット環境で試すのは怖いので、とりあえずローカル環境で作ってみたいと思いました。

windowsでローカル環境を構築するとき、以前ならば、xamppを使っていたのですが、今回はデータベースが不要なことと、windows11では、WSL2が使えるため、ubuntu上でやってみようと考えました。  
（Dockerはいつか使ってみたいですが、今回はインストールしていません）

※ ChatGPTに教えてもらえるようになって、環境構築は、かなり楽になりました。  

## 手順1 ubuntuにいろいろとインストール

やり方はいろいろあると思いますが、とりあえず一番スタンダードなコマンド入力でやります。

```
sudo apt update
sudo apt install apache2
sudo apt install php libapache2-mod-php
sudo apt install php-gd
```

なお、phpのライブラリ（GDなど）は、このあとインストールするCMSごとに、必要なライブラリが違うので、エラーが出たらその都度インストールしてください。

基本的には、sudo apt install に続けて、必要なライブラリ名を書くだけです。  
ライブラリ名は、ChatGPTが教えてくれました。

## 手順2 apache2の設定

apache2の設定は、`/etc/apache2/apache2.conf` に書くようです。  
`<Directory></Directory>` で挟まれているところを探して、`/var/www/` になっているところを探します。  
そこで、AllowOverride All になるようにしてください。

これをやっておかないと、`.htaccess`が効かないです。  
（わたしはこの部分で1日詰まりました）

また、apache2を起動させるコマンドは、`sudo service apache2 start` です。  
終了するコマンドは、`sudo service apache2 stop` です。  
再起動するコマンドは、`sudo service apache2 restart` です。

この時点で、ブラウザからlocalhostに接続してみて、apache2の標準ページが表示されることを確認しておくとよいと思います。

## 手順3 Grav（もしくはBludit）をダウンロード、展開

[Grav](https://getgrav.org/)でも、[Bludit](https://www.bludit.com/)でも、（もしくは、その他のフラットファイルCMSでも）zipファイルをダウンロードします。  
フラットファイルCMSは、データベースを必要としないので、zipファイルを展開するだけで済むのがメリットです。

ダウンロードは、windowsからすると思うので、これをubuntuのhomeディレクトリの、自分のユーザーディレクトリにzipのまま移動させます。

その後、unzipコマンドで展開しつつ移動させます。  
たとえば、以下のようなコマンドになると思います。

```
sudo unzip 【zipファイル名】 -d /var/www/html/
```

このとき、chownで、グループとユーザーをapache2のものに変更しておかないといけないようです。  
たとえば、sudo chown -R www-data:www-data 【展開したディレクトリ】 のようにすればよいはずです。  
（わたしは、この部分でも1日詰まりました）

なお、www-dataというのは、環境によって違うのかもしれませんが、apache2が使うグループとユーザー名とのことです。

その他、サブディレクトリにする場合は、それぞれの設定ファイルを変更する必要があるようです。  
たとえば、Bluditであれば、[インストールガイド -> サブディレクトリへのインストール](https://docs.bludit.info/getting-started/installation-guide)を参照してください。

## 手順4 Grav（もしくはBludit）のインストール

あとは、Grav、Bludit、その他のcmsのインストール画面に従って、管理者アカウントなどを作成するだけです。

もしかしたら、追加でphpのライブラリをインストールすることになるかもしれません。  
その際は、ChatGPTに教えてもらいながら、`sudo apt install ???` でインストールしていきます。
まとめ

とりあえず、GravとBluditを入れられたので、これから少しずつ触っていきたいと思います。  
もし使いやすければ、レンタルサーバーも安いプランに変えていけたら、固定費も抑えられて良いのではないかと思っています。

