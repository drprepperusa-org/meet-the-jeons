import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass(),
  ],
  html: {
    title: 'Meet The Jeons',
    meta: {
      description: 'A warm family blog — stories, moments, and memories from the Jeon family.',
    },
  },
});
