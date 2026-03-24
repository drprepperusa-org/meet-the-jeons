import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  output: {
    // Consistent output for Vercel
    distPath: {
      root: 'dist',
    },
  },
  tools: {
    // SCSS modules support is built-in via sass package
  },
  html: {
    title: 'Meet the Jeons',
    meta: {
      description: 'The Jeon family — five people, one home, endless stories.',
    },
  },
});
