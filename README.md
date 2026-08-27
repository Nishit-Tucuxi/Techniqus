# Techniqus Infosec — Website

## Quick start (local)
Unzip and open `index.html` directly, or serve locally:
```bash
cd techniqus-website
python3 -m http.server 8000
```
Visit http://localhost:8000

## Deploy to GitHub Pages (free)
```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-org>/techniqus-website.git
git push -u origin main
```
Then in the repo: **Settings → Pages → Deploy from branch → main → / (root)**.
Your site goes live at `https://<your-org>.github.io/techniqus-website/`.

## Mapping your custom domain (techniqus.com) — do this later
1. In the repo, add a file named `CNAME` (no extension) containing just: `techniqus.com`
2. In your domain's DNS settings, add a CNAME record pointing `www` (or an A record
   for the root) to GitHub Pages — GitHub's docs walk through the exact records:
   https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
3. Wait for DNS to propagate, then check "Enforce HTTPS" in repo Settings → Pages.

## Contact form (already configured)
The form is live and wired to **Formspree** at
`https://formspree.io/f/xljrqabp` — no further setup needed. It works on
GitHub Pages (no backend required) and is completely independent of your
domain/DNS mapping — it'll keep working the same before and after
techniqus.com is pointed at GitHub Pages.

**How it works day to day:**
- A visitor submits the form → Formspree emails it to whoever manages
  that Formspree account
- Free tier = 50 submissions/month, no card required
- To add teammates who should also see submissions, or to change the
  destination email, go to formspree.io → your form → Settings
- Optional hardening: in the same Settings page, enable reCAPTCHA (free)
  to cut down spam once the site is public

## The map on the Contact page
It currently uses Google's free "address query" embed (no API key), pointed
at your Chennai office address — it works out of the box. If you'd like it
pinned more precisely, send either:
- your Google Business Profile link, or
- the exact latitude/longitude of the office

and the iframe `src` in `contact.html` can be swapped for that.

## Images
There are no external image URLs anywhere on this site — every visual is
either your own logo (`assets/logo/`) or a custom-built, self-contained SVG
illustration (`assets/illustrations/`). See
`assets/illustrations/README.txt` for details on swapping these for real
product photography later.
