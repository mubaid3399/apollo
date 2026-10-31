<?php
/**
 * Apollo Group TV - Dynamic Guides JSON API
 * Scans /guides/*.html files and returns metadata as JSON for frontend integration.
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$guidesDir = __DIR__ . '/../guides';
$articles = [];

if (is_dir($guidesDir)) {
    $files = scandir($guidesDir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..' || substr($file, -5) !== '.html') {
            continue;
        }

        $filePath = $guidesDir . '/' . $file;
        $content = file_get_contents($filePath);
        $slug = substr($file, 0, -5);

        // Parse comment metadata block
        $metadata = [
            'slug' => $slug,
            'title' => ucwords(str_replace('-', ' ', $slug)),
            'metaTitle' => '',
            'description' => '',
            'image' => 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
            'category' => 'Guides',
            'date' => date('F j, Y', filemtime($filePath)),
            'readTime' => '6 min read',
            'author' => 'Apollo Group TV Editorial',
            'authorRole' => 'Streaming Specialist',
            'file' => $file,
            'url' => '/guides/' . $slug,
            'lastmod' => date('Y-m-d', filemtime($filePath)),
        ];

        if (preg_match('/<!--([\s\S]*?)-->/', $content, $matches)) {
            $lines = explode("\n", trim($matches[1]));
            foreach ($lines as $line) {
                if (strpos($line, ':') !== false) {
                    list($key, $val) = explode(':', $line, 2);
                    $k = strtolower(trim($key));
                    $v = trim($val);
                    if ($k === 'title') $metadata['title'] = $v;
                    if ($k === 'metatitle') $metadata['metaTitle'] = $v;
                    if ($k === 'description' || $k === 'excerpt') $metadata['description'] = $v;
                    if ($k === 'image') $metadata['image'] = $v;
                    if ($k === 'category') $metadata['category'] = $v;
                    if ($k === 'date') $metadata['date'] = $v;
                    if ($k === 'readtime') $metadata['readTime'] = $v;
                    if ($k === 'author') $metadata['author'] = $v;
                    if ($k === 'authorrole') $metadata['authorRole'] = $v;
                    if ($k === 'slug') $metadata['slug'] = $v;
                }
            }
        }

        if (empty($metadata['metaTitle'])) {
            $metadata['metaTitle'] = $metadata['title'];
        }

        $articles[] = $metadata;
    }
}

// Sort newest first
usort($articles, function ($a, $b) {
    return strtotime($b['date']) - strtotime($a['date']);
});

// Single article requested
if (isset($_GET['slug'])) {
    $reqSlug = preg_replace('/[^a-zA-Z0-9_-]/', '', $_GET['slug']);
    foreach ($articles as $art) {
        if ($art['slug'] === $reqSlug) {
            $filePath = $guidesDir . '/' . $art['file'];
            $fullContent = file_get_contents($filePath);
            // Strip metadata comment for clean content
            $bodyHtml = preg_replace('/<!--[\s\S]*?-->/', '', $fullContent);
            $art['contentHtml'] = trim($bodyHtml);
            echo json_encode(['success' => true, 'article' => $art], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
            exit;
        }
    }
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Guide not found'], JSON_PRETTY_PRINT);
    exit;
}

echo json_encode(['success' => true, 'count' => count($articles), 'articles' => $articles], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

