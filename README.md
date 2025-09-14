# React Chatbox (Vite + Tailwind) — Single-file project structure

This repository is a minimal, lightweight React chatbox UI built with Vite and Tailwind CSS. It's optimized for a clean modern look and easy deployment to GitHub Pages.

---

## Quick start & deploy to GitHub Pages

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
# open http://localhost:5173
```

3. Build for production:

```bash
npm run build
```

4. Deploy to GitHub Pages (one-time):

- Create a repo on GitHub and push this project.
- Ensure package.json `homepage` is set if you want a specific URL (optional).
- Install `gh-pages` (already in devDependencies here). Then run:

```bash
npm run deploy
```

This runs `predeploy` to build and `gh-pages -d dist` to publish the generated `dist` folder to the `gh-pages` branch. In your repository settings -> Pages, the `gh-pages` branch will be the source and your site will be live.

**Note on Vite base**: If your site will be served from `https://<username>.github.io/<repo>/`, set `base: '/<repo>/'` in `vite.config.js` before building. For user/organization pages (repo name = `<username>.github.io`) `base: './'` works fine.

### Using a custom domain

- Add a file named `CNAME` in the project root containing your domain (e.g. `example.com`). When you deploy, gh-pages will push the CNAME to the `gh-pages` branch.
- Configure your DNS (`A` or `CNAME`) on your domain registrar as GitHub Pages recommends.

---

## Design notes

- Lightweight: no UI lib, only Tailwind and React.
- Accessibility: keyboard send with Enter (shift+enter for newline).
- Static demo: messages are local only — suitable for static hosting like GitHub Pages.

---

If you'd like, I can:
- Add a small avatar/bubble animation.
- Convert this to a single-file CodeSandbox / CodePen.
- Provide a GitHub Actions workflow that builds and deploys automatically.

Enjoy! 🎉
