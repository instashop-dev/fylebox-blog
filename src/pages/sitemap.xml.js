import { getCollection } from "astro:content";

export async function GET() {
  const posts = await getCollection("blog");
  const pages = [
    "",
    "posts",
    "about",
    "archive",
    "tags"
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  ${pages
    .map((page) => {
      return `
  <url>
    <loc>${new URL(page, import.meta.env.SITE).href}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`;
    })
    .join("")}

  ${posts
    .filter((post) => post.data.isPublished)
    .map((post) => {
      return `
  <url>
    <loc>${new URL(post.slug, import.meta.env.SITE).href}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <lastmod>${new Date(post.data.date).toISOString().split('T')[0]}</lastmod>
    <news:news>
      <news:publication>
        <news:name>CSVBox Blog</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(post.data.date).toISOString().split('T')[0]}</news:publication_date>
      <news:title>${post.data.title}</news:title>
    </news:news>
    <image:image>
      <image:loc>${new URL("og-image.png", import.meta.env.SITE).href}</image:loc>
      <image:title>${post.data.title}</image:title>
      <image:caption>${post.data.description}</image:caption>
    </image:image>
  </url>`;
    })
    .join("")}

  ${posts
    .reduce((tags, post) => {
      post.data.tags?.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      return tags;
    }, [])
    .map((tag) => {
      return `
  <url>
    <loc>${new URL(`tags/${tag}`, import.meta.env.SITE).href}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`;
    })
    .join("")}

</urlset>`.trim();

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600"
    }
  });
}
