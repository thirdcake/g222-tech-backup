# g222-tech-backup

事務所サイトのバックアップ


## ページ作成系

### index 作成

php ./bin/create-page.php ./md/archives/index/

### 1ページ作成

php ./bin/create-page.php ./md/home/
php ./bin/create-page.php ./md/archives/2025-...

### 全ページ作成

php ./bin/create-page.php ./md/archives/

### sitemap 作成

php ./bin/create-page.php sitemap


## デプロイ系

### サーバーと同期

rsync -ahv dist/ ssh先:public/...


## 開発系

### プレビュー

symfony server:start -d --document-root=preview

### css watch

npm run csswatch

### css build

npm run cssbuild

### js build

npm run jsbuild
