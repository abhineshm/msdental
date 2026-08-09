# HMS Family Dental Clinic

Dental clinic website built with Vite + React + TypeScript. Appointment bookings are saved to Supabase.

## Deploy to GitHub Pages

This project is preconfigured for GitHub Pages. A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on every push to `main`.

### One-time setup

1. **Create a repository** on GitHub and push this project to it.

2. **Add repository secrets** (Settings → Secrets and variables → Actions → New repository secret):
   - `VITE_SUPABASE_URL` — your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` — your Supabase anon (public) key

3. **Enable GitHub Pages** (Settings → Pages):
   - Under **Build and deployment → Source**, select **GitHub Actions**.

4. **Push to `main`** — the workflow builds the site and deploys it automatically.

Your site will be available at `https://<username>.github.io/<repo-name>/`.

### Custom domain (optional)

If you want to use your own domain instead of the `github.io` URL:

1. Go to Settings → Pages → **Custom domain**.
2. Enter your domain and click **Save**.
3. At your domain registrar, add a DNS record:
   - **Apex domain** (e.g. `example.com`): A record pointing to GitHub Pages IPs, or an ALIAS/ANAME to `<username>.github.io`.
   - **Subdomain** (e.g. `www.example.com`): CNAME record pointing to `<username>.github.io`.
4. Check **Enforce HTTPS** once the certificate is issued (may take a few minutes).

When using a custom domain (or a `<username>.github.io` repo), the base path should be `/` instead of `/<repo-name>/`. The workflow handles this automatically when `VITE_BASE` is set — add a repository secret `VITE_BASE=/` to override.

### Local development

```bash
npm install
npm run dev
```

Create a `.env` file with:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```
