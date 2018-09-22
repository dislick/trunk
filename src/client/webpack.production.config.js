const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const defaultConfig = require('./webpack.default.config.js');

// Directories
const CLIENT_DIR = __dirname;

module.exports = merge(defaultConfig, {
  mode: 'production',
  entry: path.join(CLIENT_DIR, 'app.tsx'),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanWebpackPlugin(['build-client'], {
      root: CLIENT_DIR,
      verbose: true,
      dry: false,
      exclude: []
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'trunk - modern bittorrent network',
      template: path.join(CLIENT_DIR, 'index.html')
    }),
    new WriteFilePlugin(),
  ],
});