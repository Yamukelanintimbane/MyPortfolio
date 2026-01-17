import fs from 'fs';
import path from 'path';

/**
 * Generate sitemap.xml for SEO optimization
 */
class SitemapGenerator {
  constructor(baseUrl = 'https://yamukelanintimbane.com') {
    this.baseUrl = baseUrl;
    this.urls = [];
  }

  addUrl(loc, options = {}) {
    const url = {
      loc: `${this.baseUrl}${loc}`,
      lastmod: options.lastmod || new Date().toISOString().split('T')[0],
      changefreq: options.changefreq || 'weekly',
      priority: options.priority || '0.8'
    };
    this.urls.push(url);
  }

  generateSitemap() {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n';
    const sitemapIndex = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';
    
    let sitemapContent = xmlHeader + sitemapIndex;

    this.urls.forEach(url => {
      sitemapContent += `  <url>\n`;
      sitemapContent += `    <loc>${url.loc}</loc>\n`;
      sitemapContent += `    <lastmod>${url.lastmod}</lastmod>\n`;
      sitemapContent += `    <changefreq>${url.changefreq}</changefreq>\n`;
      sitemapContent += `    <priority>${url.priority}</priority>\n`;
      sitemapContent += `  </url>\n`;
    });

    sitemapContent += '</urlset>';

    return sitemapContent;
  }

  generateRobotsTxt() {
    return `# robots.txt for Yamukelani Ntimbane Portfolio
User-agent: *
Allow: /

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# Disallow admin paths
Disallow: /admin/
Disallow: /api/

# Allow search engines to crawl all content
Allow: /

# Crawl delay to be respectful
Crawl-delay: 1

# Google Search Console verification
google-site-verification: your-google-verification-code-here

# Bing Webmaster Tools verification
msvalidate.01: your-bing-verification-code-here`;
  }

  saveFiles(outputDir = './public') {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Generate sitemap
    const sitemapContent = this.generateSitemap();
    fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemapContent);

    // Generate robots.txt
    const robotsContent = this.generateRobotsTxt();
    fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsContent);

    console.log('✅ Sitemap and robots.txt generated successfully');
  }
}

// Generate sitemap for the portfolio
const sitemap = new SitemapGenerator();

// Add main pages
sitemap.addUrl('/', { priority: '1.0', changefreq: 'daily' });
sitemap.addUrl('/about', { priority: '0.9', changefreq: 'weekly' });
sitemap.addUrl('/skills', { priority: '0.8', changefreq: 'monthly' });
sitemap.addUrl('/projects', { priority: '0.9', changefreq: 'weekly' });
sitemap.addUrl('/experience', { priority: '0.8', changefreq: 'monthly' });
sitemap.addUrl('/testimonials', { priority: '0.7', changefreq: 'monthly' });
sitemap.addUrl('/contact', { priority: '0.8', changefreq: 'weekly' });
sitemap.addUrl('/hire-me', { priority: '0.9', changefreq: 'weekly' });

// Add admin pages (with lower priority)
sitemap.addUrl('/admin/login', { priority: '0.1', changefreq: 'yearly' });
sitemap.addUrl('/admin/dashboard', { priority: '0.1', changefreq: 'yearly' });

// Add API endpoints (for documentation)
sitemap.addUrl('/api/health', { priority: '0.1', changefreq: 'daily' });

export { SitemapGenerator, sitemap };