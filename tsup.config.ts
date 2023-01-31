import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'playground-common/export.ts',
  },
  dts: true,
  noExternal: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
  sourcemap: true,
  clean: true,
  outDir: 'playground-common/dist',
  tsconfig: 'tsconfig.playground-common.json',
});
