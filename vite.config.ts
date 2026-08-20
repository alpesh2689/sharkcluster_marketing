import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const apiTarget = env.VITE_API_URL || 'http://localhost:8001';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      historyApiFallback: true,
      proxy: {
        // The backend's CORS allowlist (backend/db.js) covers sharkcluster.com
        // and localhost:3000/3001 only — a Vite dev server on 5173 is rejected,
        // and the cors middleware turns that into a 500 rather than a CORS
        // error, so /blog and /docs/api come back empty with no useful message.
        //
        // Proxying makes the call server-to-server, where CORS does not apply.
        // src/lib/api.ts routes through this prefix whenever running in dev.
        '/backend': {
          target: apiTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/backend/, ''),
        },
      },
    },
    preview: {
      historyApiFallback: true,
      proxy: {
        '/backend': {
          target: apiTarget,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/backend/, ''),
        },
      },
    },
  };
});
