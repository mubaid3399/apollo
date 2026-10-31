<?php
/**
 * Apollo Group TV - Dynamic Guides & Articles Master Template
 * Automatically renders any HTML file dropped into /guides/ with official styling,
 * Table of Contents, responsive Navbar, SEO Schema, and Footer.
 */

$guidesDir = __DIR__;
$baseUrl = 'https://apollogroup.click';

// Determine requested slug/file
$requestedFile = '';
if (isset($_GET['file']) && !empty($_GET['file'])) {
    $requestedFile = trim($_GET['file']);
} elseif (isset($_GET['slug']) && !empty($_GET['slug'])) {
    $requestedFile = trim($_GET['slug']);
} else {
    // Check request URI: /guides/some-slug
    $uri = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    if (preg_match('#^/guides/([^/]+?)(?:\.html)?/?$#', $uri, $m)) {
        if ($m[1] !== 'index' && $m[1] !== 'index.php') {
            $requestedFile = $m[1];
        }
    }
}

// Strip .html extension if present
$slug = preg_replace('/\.html$/i', '', $requestedFile);
$slug = preg_replace('/[^a-zA-Z0-9_-]/', '', $slug);

// Helper to parse metadata from HTML comment
function parseGuideMetadata($filePath) {
    if (!file_exists($filePath)) return null;
    $content = file_get_contents($filePath);
    $meta = [
        'title' => 'Apollo Group TV Streaming Guide',
        'metaTitle' => '',
        'description' => 'Official streaming guide, channels lineup, and tutorials for Apollo Group TV.',
        'image' => 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80',
        'category' => 'Guides',
        'date' => date('F j, Y', filemtime($filePath)),
        'readTime' => '6 min read',
        'author' => 'Apollo Group TV Editorial',
        'authorRole' => 'Streaming Specialist',
        'rawContent' => $content,
        'bodyHtml' => '',
    ];

    if (preg_match('/<!--([\s\S]*?)-->/', $content, $matches)) {
        $lines = explode("\n", trim($matches[1]));
        foreach ($lines as $line) {
            if (strpos($line, ':') !== false) {
                list($key, $val) = explode(':', $line, 2);
                $k = strtolower(trim($key));
                $v = trim($val);
                if ($k === 'title') $meta['title'] = $v;
                if ($k === 'metatitle') $meta['metaTitle'] = $v;
                if ($k === 'description' || $k === 'excerpt') $meta['description'] = $v;
                if ($k === 'image') $meta['image'] = $v;
                if ($k === 'category') $meta['category'] = $v;
                if ($k === 'date') $meta['date'] = $v;
                if ($k === 'readtime') $meta['readTime'] = $v;
                if ($k === 'author') $meta['author'] = $v;
                if ($k === 'authorrole') $meta['authorRole'] = $v;
            }
        }
    }

    if (empty($meta['metaTitle'])) {
        $meta['metaTitle'] = $meta['title'];
    }

    // Strip metadata comment to leave clean body HTML
    $body = preg_replace('/<!--[\s\S]*?-->/', '', $content);
    $meta['bodyHtml'] = trim($body);

    return $meta;
}

// --------------------------------------------------------------------------
// 1. SINGLE ARTICLE VIEW
// --------------------------------------------------------------------------
$targetHtmlFile = $guidesDir . '/' . $slug . '.html';

if (!empty($slug) && file_exists($targetHtmlFile)) {
    $article = parseGuideMetadata($targetHtmlFile);

    // Auto-generate Table of Contents from <h2> tags and add anchor IDs
    $toc = [];
    $article['bodyHtml'] = preg_replace_callback('/<h2([^>]*)>(.*?)<\/h2>/i', function ($matches) use (&$toc) {
        $rawTitle = strip_tags($matches[2]);
        $id = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $rawTitle), '-'));
        $toc[] = ['id' => $id, 'title' => $rawTitle];
        return '<h2 id="' . $id . '"' . $matches[1] . '>' . $matches[2] . '</h2>';
    }, $article['bodyHtml']);

    // Canonical URL
    $canonicalUrl = $baseUrl . '/guides/' . $slug;

    // Schema.org Article JSON-LD
    $schemaJson = json_encode([
        '@context' => 'https://schema.org',
        '@type' => 'BlogPosting',
        'headline' => $article['title'],
        'description' => $article['description'],
        'image' => [$article['image']],
        'datePublished' => date('c', filemtime($targetHtmlFile)),
        'dateModified' => date('c', filemtime($targetHtmlFile)),
        'author' => [
            '@type' => 'Person',
            'name' => $article['author'],
            'jobTitle' => $article['authorRole'],
        ],
        'publisher' => [
            '@type' => 'Organization',
            'name' => 'Apollo Group TV',
            'url' => $baseUrl,
            'logo' => [
                '@type' => 'ImageObject',
                'url' => $baseUrl . '/favicon.png',
            ],
        ],
        'mainEntityOfPage' => [
            '@type' => 'WebPage',
            '@id' => $canonicalUrl,
        ],
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= htmlspecialchars($article['metaTitle']) ?> | Apollo Group TV</title>
  <meta name="description" content="<?= htmlspecialchars($article['description']) ?>">
  <link rel="canonical" href="<?= htmlspecialchars($canonicalUrl) ?>">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="<?= htmlspecialchars($canonicalUrl) ?>">
  <meta property="og:title" content="<?= htmlspecialchars($article['metaTitle']) ?>">
  <meta property="og:description" content="<?= htmlspecialchars($article['description']) ?>">
  <meta property="og:image" content="<?= htmlspecialchars($article['image']) ?>">
  <meta property="og:site_name" content="Apollo Group TV">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="<?= htmlspecialchars($article['metaTitle']) ?>">
  <meta name="twitter:description" content="<?= htmlspecialchars($article['description']) ?>">
  <meta name="twitter:image" content="<?= htmlspecialchars($article['image']) ?>">

  <!-- Favicon & Fonts -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Phosphor Icons -->
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css">
  <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/fill/style.css">

  <script type="application/ld+json">
  <?= $schemaJson ?>
  </script>

  <style>
    :root {
      --bg: #000304;
      --card-bg: #0c1015;
      --card-border: rgba(255, 255, 255, 0.1);
      --accent: #0099ff;
      --accent-hover: #0088ee;
      --text-main: #ffffff;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.65;
      -webkit-font-smoothing: antialiased;
    }
    a { color: var(--accent); text-decoration: none; transition: all 0.2s; }
    a:hover { color: #ffffff; }

    /* Sticky Header */
    .site-header {
      position: sticky;
      top: 1rem;
      z-index: 50;
      width: 95%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0.75rem 1.5rem;
      background: rgba(0, 3, 4, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.35rem;
      font-weight: 800;
      color: #fff;
    }
    .brand-logo span { color: var(--accent); }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 1.75rem;
      list-style: none;
    }
    .nav-links a {
      color: #cbd5e1;
      font-size: 0.95rem;
      font-weight: 500;
    }
    .nav-links a:hover { color: var(--accent); }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .btn-login {
      padding: 0.6rem 1.4rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--accent);
      background: #ffffff;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .btn-login:hover { background: #f1f5f9; color: var(--accent); }
    .btn-trial {
      padding: 0.65rem 1.6rem;
      font-size: 0.9rem;
      font-weight: 700;
      color: #ffffff;
      background: var(--accent);
      border-radius: 4px;
      box-shadow: 0 4px 15px rgba(0, 153, 255, 0.3);
      transition: all 0.2s;
    }
    .btn-trial:hover { background: var(--accent-hover); transform: translateY(-1px); }

    /* Hero Banner */
    .hero-banner {
      position: relative;
      width: 100%;
      min-height: 520px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      overflow: hidden;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      margin-top: -4rem;
      padding-top: 5rem;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      transform: scale(1.05);
      z-index: 1;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, #000304 0%, rgba(0, 3, 4, 0.85) 55%, rgba(0, 0, 0, 0.4) 100%);
      z-index: 2;
    }
    .hero-content {
      position: relative;
      z-index: 10;
      width: 88%;
      max-width: 1200px;
      margin: 0 auto;
      padding-bottom: 3.5rem;
    }
    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
    }
    .breadcrumbs a { color: var(--text-muted); }
    .breadcrumbs a:hover { color: var(--accent); }
    .category-badge {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(0, 153, 255, 0.15);
      color: var(--accent);
      border: 1px solid rgba(0, 153, 255, 0.35);
      margin-bottom: 1rem;
    }
    .hero-title {
      font-size: 2.25rem;
      font-weight: 800;
      line-height: 1.2;
      letter-spacing: -0.02em;
      margin-bottom: 1rem;
      max-width: 900px;
    }
    @media (min-width: 768px) {
      .hero-title { font-size: 2.75rem; }
    }
    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1.5rem;
      font-size: 0.875rem;
      color: var(--text-muted);
    }
    .hero-meta span strong { color: #fff; }

    /* Article Layout Container */
    .article-container {
      width: 88%;
      max-width: 1200px;
      margin: 3.5rem auto 6rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    @media (min-width: 1024px) {
      .article-container {
        grid-template-columns: 280px 1fr;
      }
    }

    /* Sticky Sidebar Table of Contents */
    .sidebar-toc {
      position: sticky;
      top: 6.5rem;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1rem;
      padding: 1.5rem;
      height: fit-content;
      max-height: calc(100vh - 8rem);
      overflow-y: auto;
    }
    .toc-title {
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #fff;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .toc-title i { color: var(--accent); }
    .toc-list { list-style: none; space-y: 0.5rem; }
    .toc-list li { margin-bottom: 0.6rem; }
    .toc-list a {
      color: #94a3b8;
      font-size: 0.85rem;
      display: block;
      line-height: 1.4;
    }
    .toc-list a:hover { color: var(--accent); padding-left: 4px; }

    /* Main Article Body */
    .article-body {
      color: #cbd5e1;
      font-size: 1.05rem;
      line-height: 1.8;
    }
    .article-body h2 {
      color: #ffffff;
      font-size: 1.65rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin: 2.5rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .article-body h3 {
      color: #ffffff;
      font-size: 1.3rem;
      font-weight: 700;
      margin: 1.75rem 0 0.75rem;
    }
    .article-body p { margin-bottom: 1.25rem; }
    .article-body ul, .article-body ol {
      margin: 1rem 0 1.5rem 1.5rem;
    }
    .article-body li { margin-bottom: 0.5rem; }
    .article-body strong { color: #ffffff; }

    /* Tables */
    .table-responsive {
      overflow-x: auto;
      margin: 1.75rem 0 2rem;
      border-radius: 0.75rem;
      border: 1px solid var(--card-border);
    }
    .guide-table {
      width: 100%;
      border-collapse: collapse;
      background: var(--card-bg);
      text-align: left;
      font-size: 0.9rem;
    }
    .guide-table th {
      background: rgba(0, 153, 255, 0.12);
      color: var(--accent);
      padding: 1rem 1.25rem;
      font-weight: 700;
      border-bottom: 1px solid var(--card-border);
    }
    .guide-table td {
      padding: 0.9rem 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      color: #e2e8f0;
    }
    .guide-table tr:hover td { background: rgba(255, 255, 255, 0.02); }

    /* Highlight Box */
    .guide-highlight-box {
      background: rgba(0, 153, 255, 0.06);
      border: 1px solid rgba(0, 153, 255, 0.25);
      border-left: 4px solid var(--accent);
      padding: 1.5rem 1.75rem;
      border-radius: 0.75rem;
      margin: 2rem 0;
    }
    .guide-highlight-box h2 {
      margin: 0 0 0.5rem 0 !important;
      border: none !important;
      font-size: 1.25rem !important;
      color: #ffffff;
    }

    /* Cards */
    .guide-detail-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1rem;
      padding: 1.75rem;
      margin-bottom: 1.75rem;
      transition: border-color 0.2s;
    }
    .guide-detail-card:hover { border-color: rgba(0, 153, 255, 0.4); }
    .detail-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
      font-size: 0.85rem;
      color: var(--text-muted);
      margin: 0.5rem 0 1rem;
    }
    .detail-meta span strong { color: var(--accent); }
    .enjoy-pill {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      border-left: 3px solid var(--accent);
      margin-top: 1rem;
    }

    /* FAQs */
    .faq-item {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 0.75rem;
      margin-bottom: 0.75rem;
      overflow: hidden;
      transition: all 0.2s;
    }
    .faq-question {
      padding: 1.1rem 1.25rem;
      font-weight: 700;
      font-size: 1rem;
      color: #fff;
      cursor: pointer;
      user-select: none;
      outline: none;
      list-style: none;
    }
    .faq-question::-webkit-details-marker { display: none; }
    .faq-item[open] { border-color: rgba(0, 153, 255, 0.4); }
    .faq-item[open] .faq-question { color: var(--accent); }
    .faq-answer {
      padding: 0 1.25rem 1.25rem;
      font-size: 0.95rem;
      color: #cbd5e1;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      margin-top: 0.5rem;
      padding-top: 0.75rem;
    }

    /* CTA Card */
    .guide-cta-card {
      background: linear-gradient(135deg, #0c1015 0%, #061524 100%);
      border: 1px solid rgba(0, 153, 255, 0.35);
      box-shadow: 0 20px 50px rgba(0, 153, 255, 0.1);
      border-radius: 1.25rem;
      padding: 2.5rem 2rem;
      text-align: center;
      margin: 3rem 0 1rem;
    }
    .guide-cta-card h3 {
      font-size: 1.75rem;
      color: #fff;
      margin-bottom: 0.5rem;
    }
    .cta-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      margin-top: 1.5rem;
    }
    .btn-primary {
      padding: 0.85rem 2rem;
      border-radius: 0.75rem;
      background: var(--accent);
      color: #fff;
      font-weight: 700;
      box-shadow: 0 5px 20px rgba(0, 153, 255, 0.35);
    }
    .btn-primary:hover { background: var(--accent-hover); color: #fff; transform: translateY(-2px); }
    .btn-secondary {
      padding: 0.85rem 1.75rem;
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
      font-weight: 600;
    }
    .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); color: #fff; }

    /* Footer */
    .site-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      background: #000304;
      padding: 4rem 0 2rem;
      font-size: 0.875rem;
      color: #94a3b8;
    }
    .footer-container {
      width: 88%;
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2.5rem;
      margin-bottom: 3rem;
    }
    .footer-brand p { margin-top: 0.75rem; font-size: 0.85rem; line-height: 1.6; }
    .footer-col h4 { color: #fff; font-size: 0.95rem; font-weight: 700; margin-bottom: 1rem; }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 0.5rem; }
    .footer-col a { color: #94a3b8; }
    .footer-col a:hover { color: var(--accent); }
    .footer-bottom {
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 2rem;
      text-align: center;
      font-size: 0.8rem;
    }
  </style>
</head>
<body>

  <!-- Sticky Header Navbar -->
  <header class="site-header">
    <a href="/" class="brand-logo">
      <img src="/favicon.png" alt="Apollo Logo" style="height: 36px; width: auto;" onerror="this.style.display='none'">
      <div>Apollo<span>Group</span>TV</div>
    </a>

    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/services">Services</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/guides" style="color: var(--accent); font-weight: 700;">Guides</a></li>
    </ul>

    <div class="header-actions">
      <a href="https://portal.apollogroup.click/login" class="btn-login">Log In</a>
      <a href="/get-trail" class="btn-trial">Free Trial &rarr;</a>
    </div>
  </header>

  <!-- Hero Banner -->
  <section class="hero-banner">
    <img src="<?= htmlspecialchars($article['image']) ?>" alt="<?= htmlspecialchars($article['title']) ?>" class="hero-bg">
    <div class="hero-overlay"></div>

    <div class="hero-content">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> &rsaquo;
        <a href="/guides">Guides</a> &rsaquo;
        <span><?= htmlspecialchars($article['category']) ?></span>
      </nav>

      <span class="category-badge"><?= htmlspecialchars($article['category']) ?></span>
      <h1 class="hero-title"><?= htmlspecialchars($article['title']) ?></h1>

      <div class="hero-meta">
        <span>By <strong><?= htmlspecialchars($article['author']) ?></strong></span>
        <span>&bull;</span>
        <span><?= htmlspecialchars($article['date']) ?></span>
        <span>&bull;</span>
        <span><?= htmlspecialchars($article['readTime']) ?></span>
      </div>
    </div>
  </section>

  <!-- Main Article Body -->
  <main class="article-container">
    <!-- Sidebar Table of Contents -->
    <aside>
      <div class="sidebar-toc">
        <div class="toc-title">
          <i class="ph-list-bullets-bold"></i>
          <span>Table of Contents</span>
        </div>
        <?php if (!empty($toc)): ?>
        <ul class="toc-list">
          <?php foreach ($toc as $item): ?>
          <li><a href="#<?= htmlspecialchars($item['id']) ?>"><?= htmlspecialchars($item['title']) ?></a></li>
          <?php endforeach; ?>
        </ul>
        <?php else: ?>
        <p style="font-size: 0.85rem; color: #64748b;">Full article navigation</p>
        <?php endif; ?>

        <!-- Quick 24/7 Support Box -->
        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.8rem; color: #94a3b8;">
          <div style="font-weight: 700; color: #fff; margin-bottom: 0.25rem;">Need Setup Help?</div>
          <p>Our technical team is live 24/7 on WhatsApp.</p>
          <a href="/get-trail" style="display: inline-block; margin-top: 0.5rem; color: var(--accent); font-weight: 700;">Claim 10-Day Trial &rarr;</a>
        </div>
      </div>
    </aside>

    <!-- Main Content Area -->
    <article class="article-body">
      <?= $article['bodyHtml'] ?>
    </article>
  </main>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="footer-container">
      <div class="footer-brand">
        <div class="brand-logo">Apollo<span>Group</span>TV</div>
        <p>Premier IPTV streaming network delivering 20,000+ live HD/4K channels, PPV events, and 100,000+ on-demand movies worldwide.</p>
      </div>

      <div class="footer-col">
        <h4>Navigation</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Channel List</a></li>
          <li><a href="/pricing">Pricing Plans</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/guides">All Guides</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Streaming Apps</h4>
        <ul>
          <li><a href="/guides">Amazon Firestick</a></li>
          <li><a href="/guides">Android TV & Box</a></li>
          <li><a href="/guides">Apple TV & iOS</a></li>
          <li><a href="/guides">Smart TV Setup</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Customer Portal</h4>
        <ul>
          <li><a href="https://portal.apollogroup.click/login">Log In to Portal</a></li>
          <li><a href="https://dashboard.apollogroup.click/dashboard">Customer Dashboard</a></li>
          <li><a href="/get-trail">10-Day Free Trial</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/terms-conditions">Terms & Conditions</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      &copy; <?= date('Y') ?> Apollo Group TV. All rights reserved. Not affiliated with cable monopolies.
    </div>
  </footer>

</body>
</html>
<?php
    exit;
}

// --------------------------------------------------------------------------
// 2. GUIDES DIRECTORY INDEX (LIST ALL GUIDES)
// --------------------------------------------------------------------------
$articlesList = [];
$files = scandir($guidesDir);
foreach ($files as $file) {
    if ($file === '.' || $file === '..' || substr($file, -5) !== '.html') continue;
    $art = parseGuideMetadata($guidesDir . '/' . $file);
    if ($art) {
        $art['slug'] = substr($file, 0, -5);
        $articlesList[] = $art;
    }
}
usort($articlesList, function($a, $b) {
    return strtotime($b['date']) - strtotime($a['date']);
});
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Streaming Guides & Tutorials | Apollo Group TV</title>
  <meta name="description" content="Explore step-by-step setup guides, sports broadcasting tips, and movie streaming insights for Apollo Group TV on Firestick, Smart TVs, and Android.">
  <link rel="canonical" href="<?= htmlspecialchars($baseUrl . '/guides') ?>">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #000304;
      --card-bg: #0c1015;
      --card-border: rgba(255, 255, 255, 0.1);
      --accent: #0099ff;
      --accent-hover: #0088ee;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: #fff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.6;
    }
    a { color: var(--accent); text-decoration: none; }
    .site-header {
      position: sticky;
      top: 1rem;
      z-index: 50;
      width: 95%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0.75rem 1.5rem;
      background: rgba(0, 3, 4, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-logo { font-size: 1.35rem; font-weight: 800; color: #fff; }
    .brand-logo span { color: var(--accent); }
    .nav-links { display: flex; gap: 1.75rem; list-style: none; }
    .nav-links a { color: #cbd5e1; font-weight: 500; font-size: 0.95rem; }
    .nav-links a:hover { color: var(--accent); }
    .container { width: 88%; max-width: 1200px; margin: 4rem auto 6rem; text-align: center; }
    .page-badge {
      display: inline-block;
      padding: 0.35rem 0.85rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: rgba(0, 153, 255, 0.15);
      color: var(--accent);
      border: 1px solid rgba(0, 153, 255, 0.35);
      margin-bottom: 1rem;
    }
    .page-title { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.75rem; letter-spacing: -0.02em; }
    .page-desc { font-size: 1.05rem; color: #94a3b8; max-width: 650px; margin: 0 auto 3.5rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; text-align: left; }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 1.25rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.3s;
    }
    .card:hover { transform: translateY(-4px); border-color: rgba(0, 153, 255, 0.5); }
    .card-img-wrap { position: relative; height: 210px; overflow: hidden; background: #000; }
    .card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
    .card:hover .card-img { transform: scale(1.05); }
    .card-body { padding: 1.5rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
    .card-category { font-size: 0.75rem; font-weight: 700; color: var(--accent); text-transform: uppercase; margin-bottom: 0.5rem; }
    .card-title { font-size: 1.2rem; font-weight: 700; color: #fff; line-height: 1.35; margin-bottom: 0.75rem; }
    .card-desc { font-size: 0.85rem; color: #94a3b8; line-height: 1.6; margin-bottom: 1.25rem; }
    .card-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.8rem;
      color: #64748b;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
    }
    .read-btn {
      color: var(--accent);
      font-weight: 700;
      font-size: 0.85rem;
    }
    .read-btn:hover { text-decoration: underline; }
  </style>
</head>
<body>

  <header class="site-header">
    <a href="/" class="brand-logo">Apollo<span>Group</span>TV</a>
    <ul class="nav-links">
      <li><a href="/">Home</a></li>
      <li><a href="/services">Services</a></li>
      <li><a href="/pricing">Pricing</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/guides" style="color: var(--accent); font-weight: 700;">Guides</a></li>
    </ul>
    <div>
      <a href="/get-trail" style="padding: 0.6rem 1.4rem; background: var(--accent); color: #fff; border-radius: 4px; font-weight: 700;">Free Trial &rarr;</a>
    </div>
  </header>

  <main class="container">
    <span class="page-badge">OFFICIAL KNOWLEDGE BASE</span>
    <h1 class="page-title">Streaming Guides & Insights</h1>
    <p class="page-desc">Explore step-by-step sideloading tutorials, sports broadcast maps, and cinema streaming tips for Apollo Group TV.</p>

    <div class="grid">
      <?php foreach ($articlesList as $item): ?>
      <article class="card">
        <a href="/guides/<?= htmlspecialchars($item['slug']) ?>" class="card-img-wrap">
          <img src="<?= htmlspecialchars($item['image']) ?>" alt="<?= htmlspecialchars($item['title']) ?>" class="card-img" loading="lazy">
        </a>
        <div class="card-body">
          <div>
            <div class="card-category"><?= htmlspecialchars($item['category']) ?> &bull; <?= htmlspecialchars($item['readTime']) ?></div>
            <a href="/guides/<?= htmlspecialchars($item['slug']) ?>">
              <h2 class="card-title"><?= htmlspecialchars($item['title']) ?></h2>
            </a>
            <p class="card-desc"><?= htmlspecialchars(substr($item['description'], 0, 140)) ?>...</p>
          </div>
          <div class="card-footer">
            <span><?= htmlspecialchars($item['date']) ?></span>
            <a href="/guides/<?= htmlspecialchars($item['slug']) ?>" class="read-btn">Read Guide &rarr;</a>
          </div>
        </div>
      </article>
      <?php endforeach; ?>
    </div>
  </main>

</body>
</html>

