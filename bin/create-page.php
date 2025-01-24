<?php

// php ./bin/create-page.php ./md/archives/2024-11-25-325/entry.md 

require_once dirname(__DIR__).'/vendor/autoload.php';

use G222\Route;
use G222\PageType;
use Symfony\Component\Finder\Finder;
use Spatie\YamlFrontMatter\YamlFrontMatter;
use Twig\Loader\FilesystemLoader;
use Twig\Environment;

$filename = $argv[1];
$finder = new Finder();
$controller = Route::cliRouting(dirname(__DIR__), $filename, $finder);

$parsedown = new Parsedown();
$loader = new FilesystemLoader(dirname(__DIR__).'/template');
$twig = new Environment($loader, []);


$options = [
    'preview' => false,
    'page' => $controller->page, 
    'site' => $controller->site, 
    'content' => $parsedown->text($controller->content)
];
if($controller->pageType === PageType::ArchivesIndex && $controller->id === 'index') {
    $template = $twig->load($controller->pageType->twigTemplate());
    $postLists = array_chunk($controller->page['posts'], 10);

    $options['page']['posts'] = $postLists[0];
    $html = $template->render($options);
    $outDir = dirname(__DIR__).'/dist/archives/index.html';
    file_put_contents($outDir, $html);
    echo $outDir.PHP_EOL;
} elseif ($controller->pageType === PageType::ArchivesIndex) {
    var_dump($controller->id);
    $template = $twig->load('partials/post-frag.html.twig');
    $postLists = array_chunk($controller->page['posts'], 10);
    $page = 0;
    foreach($postLists as $postList) {
        $page += 1;
        $options['page']['posts'] = $postList;
        $html = $template->render($options);
        $outDir = dirname(__DIR__)."/dist/archives/index/{$page}.html";
        file_put_contents($outDir, $html);
        echo $outDir.PHP_EOL;
    }
} else {
    $template = $twig->load($controller->pageType->twigTemplate());
    $html = $template->render($options);
    $outDir = dirname(__DIR__).$controller->pageType->saveFileName((string) $controller->id);
    file_put_contents($outDir, $html);
    echo $outDir.PHP_EOL;
}
