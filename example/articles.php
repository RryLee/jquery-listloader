<?php

header('Content-Type: applicaton/json');

$pdo = new PDO('sqlite:db.sqlite');

$articles = [];

$offset = isset($_GET['offset']) ? (int) $_GET['offset'] - 1 : 0;
$count = isset($_GET['count']) ? (int) $_GET['count'] : 1;

$sql = "SELECT * FROM articles LIMIT {$offset}, {$count}";
$articles = $pdo->query($sql)->fetchAll(PDO::FETCH_OBJ);
$articleCount = $pdo->query("SELECT count(*) from articles")->fetch();

echo json_encode([
    'items' => $articles,
    'last' => ($offset + $count) >= $articleCount[0],
    "offset" => $offset,
    'count' => $count
]);
