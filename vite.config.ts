import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __AI_ENABLED__: JSON.stringify(process.env.AI_ENABLED === 'true'),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Trellis',
        short_name: 'Trellis',
        description: 'A holistic life operating system built around permaculture metaphors.',
        theme_color: '#2c2c2a',
        background_color: '#fdfbf7',
        display: 'standalone',
        icons: [
          {
            src: '/trellis-logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/trellis-logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'supabase-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 hour
              },
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
