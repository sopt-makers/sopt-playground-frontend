import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'playground-common/export.ts',
  },
  dts: true,
  noExternal: [],
  sourcemap: true,
  clean: true,
  outDir: 'playground-common/dist',
  tsconfig: 'playground-common/tsconfig.playground-common.json',
});
