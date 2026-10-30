import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/index.ts', icons: 'src/icons/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    sourcemap: true,
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    banner: { js: '"use client";' },
  },
  {
    entry: { styles: 'src/styles/index.css' },
    minify: true,
  },
]);
