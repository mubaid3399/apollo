<?php
/**
 * Apollo Group TV - Dynamic XML Sitemap
 * Automatically discovers all static pages + every HTML guide dropped into /guides/
 */
header('Content-Type: application/xml; charset=utf-8');

$baseUrl = 'https://apollogroup.click';
$today = date('Y-m-d');

// Core static pages with priorities and frequencies
$staticPages = [
    ['loc' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
    ['loc' => '/services', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['loc' => '/pricing', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['loc' => '/about', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['loc' => '/get-trail', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['loc' => '/blog', 'priority' => '0.8', 'changefreq' => 'daily'],
    ['loc' => '/guides', 'priority' => '0.8', 'changefreq' => 'daily'],
    ['loc' => '/login', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['loc' => '/register', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['loc' => '/privacy-policy', 'priority' => '0.5', 'changefreq' => 'monthly'],
    ['loc' => '/terms-conditions', 'priority' => '0.5', 'changefreq' => 'monthly'],
    ['loc' => '/cookie-policy', 'priority' => '0.5', 'changefreq' => 'monthly'],
];

// Scan /guides/*.html files
$guidesDir = __DIR__ . '/guides';
$guideUrls = [];

if (is_dir($guidesDir)) {
    $files = scandir($guidesDir);
    foreach ($files as $file) {
        if ($file === '.' || $file === '..' || substr($file, -5) !== '.html') {
            continue;
        }
        $slug = substr($file, 0, -5);
        $filePath = $guidesDir . '/' . $file;
        $lastmod = date('Y-m-d', filemtime($filePath));

        $guideUrls[] = [
            'loc' => '/guides/' . $slug,
            'lastmod' => $lastmod,
            'changefreq' => 'weekly',
            'priority' => '0.8',
        ];

        // Also add /blog/slug alias so both route formats are indexed
        $guideUrls[] = [
            'loc' => '/blog/' . $slug,
            'lastmod' => $lastmod,
            'changefreq' => 'weekly',
            'priority' => '0.7',
        ];
    }
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($staticPages as $page): ?>
  <url>
    <loc><?= htmlspecialchars($baseUrl . $page['loc']) ?></loc>
    <lastmod><?= $today ?></lastmod>
    <changefreq><?= $page['changefreq'] ?></changefreq>
    <priority><?= $page['priority'] ?></priority>
  </url>
<?php endforeach; ?>

<?php foreach ($guideUrls as $guide): ?>
  <url>
    <loc><?= htmlspecialchars($baseUrl . $guide['loc']) ?></loc>
    <lastmod><?= $guide['lastmod'] ?></lastmod>
    <changefreq><?= $guide['changefreq'] ?></changefreq>
    <priority><?= $guide['priority'] ?></priority>
  </url>
<?php endforeach; ?>
</urlset>

