import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  fixedExtension: false,
  sourcemap: true,
  minify: true,
  target: 'node22',
  outDir: 'dist',
});
