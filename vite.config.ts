import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import electron from 'vite-plugin-electron';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...electron([
      {
        entry: 'electron/main.ts',
        onstart: async ({ startup }) => {
          await startup();
        },
      },
      {
        vite: {
          build: {
            rolldownOptions: {
              input: 'electron/preload.ts',
              output: {
                assetFileNames: '[name].[ext]',
                chunkFileNames: '[name].mjs',
                codeSplitting: false,
                entryFileNames: '[name].mjs',
                format: 'es',
              },
            },
          },
        },
        onstart: async ({ reload }) => {
          reload();
        },
      },
    ]),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});