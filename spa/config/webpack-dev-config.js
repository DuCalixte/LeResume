const { join, resolve } = require('path');
const webpack = require('webpack');

let config = require('./webpack-base-config.js');
let APP_NAME = process.env.APP_NAME || 'LeResume';

config.devtool = process.env.DEV_TOOL;

config.entry.app.splice(1, 0, 'react-hot-loader/patch');

const port = process.env.WEBPACK_PORT || 8000;
const api_port = process.env.API_PORT || 3004;

config.devServer = {
  port: port,
  inline: true,
  hot: true,
  publicPath: `http://localhost:${port}/assets/`,
  overlay: true,
  stats: 'minimal',
  historyApiFallback: true,
  proxy: [
    {
      context: ['/profile', '/details'],
      target: `http://localhost:${api_port}`,
      secure: true,
    },
  ],
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};
config.output.publicPath = `http://localhost:${port}/assets/`;

config.plugins.push(new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin());
// new webpack.NoErrorsPlugin());

module.exports = config;
