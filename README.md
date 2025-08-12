# CSVBox Blog

A modern blog built with Astro.js using the Flow Blog theme for CSVBox company.

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16.0 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:4321`

## 📁 Project Structure

```
/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── content/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`     |
| `npm run build`           | Build your production site to `./dist/`         |
| `npm run preview`         | Preview your build locally, before deploying    |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
| `npm run format`          | Format code with Prettier                        |

## 🎨 Theme Features

This blog uses the [Astro Flow Blog Theme](https://github.com/DawidRyczko/astro-flow-blog-theme) which includes:

- ✅ Flowbite / Tailwind styling - easy to customize
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support
- ✅ Google Analytics support
- ✅ Dark / light mode
- ✅ Responsive design
- ✅ Pagination
- ✅ Social media integration
- ✅ Fast performance with Astro

## ⚙️ Configuration

1. **Site Configuration**: Open `astro.config.mjs` and update the `site` property
2. **Content Configuration**: Visit `/src/const.ts` to setup your blog configuration
3. **Assets**: Replace the following files with your own:
   - `/public/favicon.png`
   - `/public/logo.png`
   - `/public/og-image.png`
4. **Styling**: Override Tailwind styles in `/styles/global.css`

## 📝 Writing Posts

Blog posts are written in MDX format and stored in the `src/content/blog/` directory. Each post should include frontmatter with metadata like title, description, date, and tags.

## 🚀 Deployment

This project can be deployed to various platforms:

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

For GitHub Pages deployment:
1. Go to Settings → Pages
2. Setup "Source" as GitHub Actions
3. Run the "Deploy Astro site to Pages" workflow

## 🎨 Flowbite and Tailwind

The theme uses Flowbite components built with Tailwind CSS. Visit [flowbite.com](https://flowbite.com/) to explore available components and customize them for your needs.

### Typography

Content uses Tailwind CSS Typography with Flowbite styling:

```html
<div class="mb-9 format dark:format-invert">
  <content />
</div>
```

Learn more about typography customization: [Flowbite Typography Docs](https://flowbite.com/docs/components/typography/)

## 📄 License

This project is licensed under the MIT License.

## Credits

Theme based on [Astro Flow Blog Theme](https://github.com/DawidRyczko/astro-flow-blog-theme) by Dawid Ryczko.
