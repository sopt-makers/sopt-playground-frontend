import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'playground-common/export.ts',
  },
  dts: true,
  noExternal: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  sourcemap: true,
  clean: true,
  minify: true,
  outDir: 'playground-common/dist',
});
