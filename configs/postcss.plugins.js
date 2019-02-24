const path = require('path');

const cssnano = require('cssnano');
const presetENV = require('postcss-preset-env');

const { CLIENT_PATH } = require('./paths');

module.exports = () => [
  presetENV({
    autoprefixer: {
      grid: true,
      cascade: false,
    },
    stage: 3,
    features: {
      'nesting-rules': true,
      'custom-properties': {
        importFrom: path.resolve(CLIENT_PATH, 'css', 'custom-properties.css'),
      },
      'any-link-pseudo-class': true,
      'system-ui-font-family': true,
    },
  }),

  cssnano({ // also handled by optimize-css-assets-webpack-plugin
    preset: ['default', {
      normalizeWhitespace: false,
    }],
  }),
];
