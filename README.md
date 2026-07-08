# mark-atia portfolio — GitHub Pages

Static portfolio site. No framework, no build step, no dependencies.

## Structure

```
index.html                                        Homepage
case-studies/shopify-storefront-customisation.html  Case study
assets/css/style.css                              All styles
assets/js/main.js                                 Nav + reveal behaviour
404.html                                          Not-found page
.nojekyll                                         Skips Jekyll processing on Pages
```

## Preview locally

```sh
cd mark-portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

(Or just open `index.html` directly — everything is relative-pathed except 404.html.)

## Deploy to GitHub Pages

Use your **personal** GitHub account only — not the employer account.

1. On github.com (personal account), create a new **public** repo named exactly:
   `<your-username>.github.io`
2. Push this directory to it:

```sh
cd mark-portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin git@github.com:<your-username>/<your-username>.github.io.git
git push -u origin main
```

3. Done — Pages auto-deploys `main` for `username.github.io` repos.
   Live at `https://<your-username>.github.io` within a minute or two.
   (If it doesn't appear: repo Settings → Pages → confirm source is `main` / root.)

## Before sharing the link — checklist

- [x] Sanitised screenshots added (`assets/img/`) — cropped to brand-free admin regions, identifying values blurred
- [ ] Never commit the ORIGINAL screenshots — they contain the store URL, brand and product names
- [ ] Review the case study wording once more against your confidentiality obligations
- [ ] Add real outcome numbers to the case study `outcome` section when you have permission + data
- [ ] Optional: custom domain later (repo Settings → Pages → Custom domain + a CNAME DNS record)

## Notes

- Client is never named anywhere on the site — keep it that way in commits too
  (no client name in commit messages, branch names, or image filenames).
- Fonts load from Google Fonts (Archivo + Fira Code) with system fallbacks.
- The site is intentionally dependency-free so view-source reads clean.
