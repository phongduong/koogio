import typescript from 'rollup-plugin-typescript';

export default [
  {
    input: 'public/scripts/screenshots.ts',
    output: {
      file: 'public/scripts/screenshots.js',
      format: 'iife',
    },
    plugins: [typescript()],
  },
];
