const fs = require('fs');
const path = require('path');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const { CONFIGS_PATH, DIST_PATH } = require('./paths');
const plugins = require('./postcss.plugins');


const isDevelopment = process.env.NODE_ENV === 'development';

const DEFINE_ENV = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
};

const LOADER = {
  babel: {
    loader: 'babel-loader',
  },
  css: {
    loader: 'css-loader',
    options: {
      modules: false,
      importLoaders: 1,
    },
  },
  eslint: {
    loader: 'eslint-loader',
    options: {
      configFile: path.resolve(CONFIGS_PATH, 'eslint.config.js'),
    },
  },
  handlebars: {
    loader: 'handlebars-loader',
  },
  postcss: {
    loader: 'postcss-loader',
    options: {
      plugins,
    },
  },
  style: {
    loader: 'style-loader',
  },
};

const RULE = {
  js: {
    test: /\.(js)$/,
    exclude: /node_modules/,
    use: [
      LOADER.babel,
      LOADER.eslint,
    ],
  },
  css: {
    test: /\.css$/,
    use: [
      isDevelopment ? LOADER.style : MiniCSSExtractPlugin.loader,
      LOADER.css,
      LOADER.postcss,
    ],
  },
  html: {
    test: /\.html$/,
    use: [
      LOADER.handlebars,
    ],
  },
};

const STATS = {
  assets: true,
  children: false,
  chunks: false,
  modules: false,
  timings: true,
};

const DEV_SERVER = isDevelopment && {
  before(app, server) {
    console.log(server.allowedHosts.map(host => `~ https://${host}:${process.env.PORT}`).join('\n'), '\n');
  },
  allowedHosts: process.env.ALLOWED_HOSTS.split(','),
  compress: true,
  contentBase: DIST_PATH,
  historyApiFallback: true,
  host: '0.0.0.0',
  hot: true,
  https: {
    key: fs.readFileSync(process.env.SSL_KEY),
    cert: fs.readFileSync(process.env.SSL_CERT),
    ca: fs.readFileSync(process.env.SSL_CA),
  },
  inline: true,
  port: process.env.PORT,
  stats: STATS,
};

module.exports = {
  DEV_SERVER,
  DEFINE_ENV,
  LOADER,
  RULE,
  STATS,
};
