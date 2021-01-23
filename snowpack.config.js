module.exports = {
  plugins: ['@snowpack/plugin-dotenv', '@snowpack/plugin-svelte', '@snowpack/plugin-typescript'],
  mount: {
    public: '/',
    src: '/_dist_',
  },
  devOptions: {
    open: 'none',
  },
  buildOptions: {
    baseUrl: '/cc-5.5-multiplication-game',
    clean: true,
    // seems to be broken as of now
    sourcemaps: false,
  },
  packageOptions: {
    sourcemap: false,
  },
  optimize: {
    treeshake: true,
    bundle: true,
    minify: true,
    target: 'es2018',
  },
};
