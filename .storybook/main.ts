import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
  viteFinal: async (cfg) => {
    cfg.resolve = cfg.resolve ?? {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias as Record<string, string>),
      'react-liquis-glass/icons': path.resolve(__dirname, '../src/icons/index.ts'),
      'react-liquis-glass/styles.css': path.resolve(__dirname, '../src/styles/index.css'),
      'react-liquis-glass': path.resolve(__dirname, '../src/index.ts'),
    };
    return cfg;
  },
};
export default config;
