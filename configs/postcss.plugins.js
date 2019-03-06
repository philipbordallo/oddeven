const cssnano = require('cssnano');
const presetENV = require('postcss-preset-env');
const colorEmoji = require('postcss-color-emoji');
const simpleVars = require('postcss-simple-vars');
const fontSmoothing = require('postcss-font-smoothing');


module.exports = (loader) => {
  const tokens = require.resolve('./postcss.tokens');

  loader.addDependency(tokens);
  delete require.cache[tokens];

  return [
    presetENV({
      autoprefixer: {
        grid: true,
        cascade: false,
      },
      stage: 3,
      insertBefore: {
        'media-query-ranges': simpleVars({
          variables() {
            return require(tokens); // eslint-disable-line global-require
          },
        }),
      },
      features: {
        'nesting-rules': true,
        'any-link-pseudo-class': true,
        'system-ui-font-family': true,
      },
    }),

    fontSmoothing,
    colorEmoji,
    cssnano({ // also handled by optimize-css-assets-webpack-plugin
      preset: ['default', {
        normalizeWhitespace: false,
      }],
    }),
  ];
};
