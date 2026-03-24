import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import path from 'path';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass({
      sassLoaderOptions: {
        sassOptions: {
          loadPaths: [path.resolve(__dirname, 'src/styles')],
        },
      },
    }),
  ],
  html: {
    title: 'Meet The Jeons',
  },
});
