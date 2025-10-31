import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env': {
        GEMINI_API_KEY: JSON.stringify(env.VITE_GEMINI_API_KEY),
        VITE_SANITY_PROJECT_ID: JSON.stringify(env.VITE_SANITY_PROJECT_ID),
        VITE_SANITY_DATASET: JSON.stringify(env.VITE_SANITY_DATASET || 'production'),
        VITE_SANITY_API_VERSION: JSON.stringify(env.VITE_SANITY_API_VERSION || '2024-07-01'),
        VITE_SANITY_TOKEN: JSON.stringify(env.VITE_SANITY_TOKEN || ''),
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
      }
    };
});
