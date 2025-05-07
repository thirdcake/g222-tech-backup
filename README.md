# g222-tech-backup

事務所サイトのバックアップ

// index 作成
php ./bin/create-page.php ./md/archives/index/

// 1ページ作成
php ./bin/create-page.php ./md/home/
php ./bin/create-page.php ./md/archives/2025-...

// 全ページ作成
php ./bin/create-page.php ./md/archives/

// sitemap 作成
php ./bin/create-page.php sitemap

// サーバーと同期
rsync -ahv dist/ ssh先:public/...
