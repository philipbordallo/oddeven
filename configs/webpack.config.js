const webpack = require('webpack');
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const {
  RULE,
  DEV_SERVER,
  DEFINE_ENV,
  STATS,
} = require('./webpack.helpers');

const {
  APP_PATH,
  DIST_PATH,
} = require('./paths');


const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: path.resolve(APP_PATH, 'entry.js'),
  },
  output: {
    path: DIST_PATH,
    filename: isProduction ? '[name].[contenthash].bundle.js' : '[name].bundle.js',
    publicPath: '/',
  },
  devServer: isDevelopment ? DEV_SERVER : {},
  module: {
    rules: [
      RULE.js,
      RULE.css,
      RULE.html,
    ],
  },
  resolve: {
    extensions: ['.js', '.css'],
    modules: [APP_PATH, 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin(DEFINE_ENV),
    new webpack.SourceMapDevToolPlugin({
      test: /\.(js)$/,
      filename: '[file].map',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(APP_PATH, 'entry.html.js'),
      inject: false,
      minify: false,
    }),
    isProduction ? new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css',
    }) : null,
    isDevelopment ? new webpack.NamedModulesPlugin() : null,
    isDevelopment ? new webpack.HotModuleReplacementPlugin() : null,
  ].filter(Boolean),
  stats: STATS,
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/].+(?<!css)$/,
          chunks: 'all',
        },
      },
    },
  },
};
