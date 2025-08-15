import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor libraries
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            if (id.includes('framer-motion')) {
              return 'motion';
            }
            if (id.includes('react-modal')) {
              return 'modal';
            }
            if (id.includes('js-yaml')) {
              return 'yaml';
            }
            // All other node_modules
            return 'vendor';
          }
          
          // Component chunks
          if (id.includes('src/components/')) {
            return 'components';
          }
          
          // Utils
          if (id.includes('src/utils/')) {
            return 'utils';
          }
          
          // Large page components get their own chunks
          if (id.includes('Projects.tsx')) {
            return 'projects-page';
          }
          if (id.includes('HonorsAwards.tsx')) {
            return 'honors-page';
          }
          if (id.includes('Roadmap.tsx')) {
            return 'roadmap-page';
          }
          if (id.includes('PortfolioLanding.tsx')) {
            return 'landing-page';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1MB
    target: 'esnext', // Use modern JS for smaller bundles
    minify: 'terser', // Better minification
    sourcemap: false, // Disable sourcemaps in production for smaller size
    cssCodeSplit: true, // Split CSS into separate files
  },
  // Enable modern CSS features
  css: {
    devSourcemap: true
  }
})
