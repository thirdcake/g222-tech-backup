<?php

// php ./bin/create-page.php ./md/archives/2024-11-25-325/

require_once dirname(__DIR__).'/vendor/autoload.php';

use G222\Route;

$filename = $argv[1];
$controller = Route::cliRouting(dirname(__DIR__), $filename);

$isPreview = false;
foreach($controller->getResponses($isPreview) as $response) {
    file_put_contents($response->outDir, $response->viewString);
    echo $response->outDir.PHP_EOL;
}
