import { build, BuildConfig } from 'bun';

const config: BuildConfig = {
  entrypoints: ['src/index.ts'],
  outdir: 'dist',
  target: 'node',
  splitting: true,
  packages: 'external',
};

const esm = build({
  ...config,
  entrypoints: [...config.entrypoints, 'src/cli.ts'],
  format: 'esm',
  naming: '[dir]/[name].js',
});

const cjs = build({
  ...config,
  format: 'cjs',
  naming: '[dir]/[name].cjs',
});

await Promise.all([esm, cjs]);
