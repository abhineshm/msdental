import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// GitHub Pages serves the site from a subpath (https://<user>.github.io/<repo>/).
// The base path is derived from the repository name so assets resolve correctly.
// When deploying to a custom domain or a <user>.github.io repo, set VITE_BASE=/.
const base = process.env.VITE_BASE ?? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''}/`;

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
