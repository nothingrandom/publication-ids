import { build, BuildConfig } from 'bun';

const config: BuildConfig = {
  entrypoints: ['src/index.ts'],
  outdir: 'dist',
  target: 'node',
  splitting: true,
}

const esm = build({
  ...config,
  entrypoints: [...config.entrypoints, 'src/cli.ts'],
  format: 'esm',
});

const cjs = build({
  ...config,
  format: 'cjs',
  naming: "[dir]/[name].cjs"
});

await [esm, cjs];
