require('es6-promise').polyfill();
const { join, resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const webpack = require('webpack');

const vendor = require('./vendor-config');
const APP = join(__dirname, '..', 'spa');

let NODE_ENV = process.env.NODE_ENV || 'development';
let APP_NAME = process.env.APP_NAME || 'LeResume';

let env = {
  production: NODE_ENV === 'production',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development',
  current: NODE_ENV,
  app_name: APP_NAME,
};

let config = {
  target: 'web',
  context: APP,
  entry: {
    app: ['babel-polyfill', resolve(__dirname, '../index.jsx')],
    vendor,
  },
  output: {
    path: resolve(__dirname, '../../public/', APP_NAME),
    pathinfo: true,
    // publicPath: '/assets/',
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['*', '-config.js', '.json.js', '.jsx', '.js', 'scss', 'css'],
    alias: {
      styles: join(__dirname, '..', 'styles'),
      components: join(__dirname, '..', 'components'),
      views: join(__dirname, '..', 'views'),
      actions: join(__dirname, '..', 'actions'),
      reducers: join(__dirname, '..', 'reducers'),
      stores: join(__dirname, '..', 'stores'),
      hoc: join(__dirname, '..', 'hoc'),
      fonts: join(__dirname, '..', 'fonts'),
      styles: join(__dirname, '..', 'styles'),
      img: join(__dirname, '..', 'img'),
    },
    modules: [
      resolve(__dirname, '../../spa'), // absolute imports from any dir e.g. 'some/file'
      resolve(__dirname, '../../node_modules'),
    ],
  },
  resolveLoader: {
    modules: ['spa', 'node_modules'],
  },
  module: {
    rules: [
      // {
      //   test: /\.(css|sass|scss)$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: ['css-loader', 'style-loader', 'sass-loader'],
      //     publicPath: '/assets/',
      //     use: {
      //       loader: 'sass-loader',
      //       options: {
      //         exclude: /node_modules/,
      //         sourceMap: true,
      //       },
      //     },
      //   }),
      // },
      {
        test: /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        }),
      },
      {
        test: /\.(jsx?$)/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              removeComments: false,
              collapseWhitespace: false,
            },
          },
        ],
      },
      {
        test: /\.json/,
        loader: 'json',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader!file-loader?limit=65000&mimetype=image/svg+xml',
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'svg-sprite-loader!file-loader?limit=65000&mimetype=application/font-woff',
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader!file-loader?limit=65000&mimetype=application/font-woff2',
      },
      {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream',
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader!file-loader?limit=65000&mimetype=application/vnd.ms-fontobject',
      },
      // {
      //   test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file-loader?limit=10000&mimetype=image/gif&name=img/[name].[ext]',
      // },
      // {
      //   test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file-loader?limit=10000&mimetype=image/jpg',
      // },
      // {
      //   test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
      //   loader: 'file-loader?limit=10000&mimetype=image/png',
      // },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              hash: 'sha512',
              digest: 'hex',
              name: 'webpack/[hash].[ext]',
            },
          },
          {
            loader: `image-webpack-loader`,
            options: {
              bypassOnDebug: true,
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]',
      disable: false,
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: join(__dirname, '..', 'templates', '_index.template.html'),
      filename: join(__dirname, '../../', 'index.html'),
    }),
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __PRODUCTION__: env.production,
      __TEST__: env.test,
      __CURRENT_ENV__: "'" + NODE_ENV + "'",
      __APP_NAME__: APP_NAME,
      __DATABASE__: join(__dirname, '..', 'data', 'db.json'),
      WEBPACK_PORT: JSON.stringify(process.env.WEBPACK_PORT || '8000'),
      API_PORT: JSON.stringify(process.env.API_PORT || '3004'),
      HTTP_PORT: JSON.stringify(process.env.HTTP_PORT || '3000'),
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      APP_NAME: 'LeResume',
      DEV_TOOL: 'cheap-eval-source-map',
    }),
    new WebappWebpackPlugin({
      inject: true,
      logo: join(__dirname, '..', 'img', 'icons', 'icons8-zubat-48.png'),
    }),
  ],
};

module.exports = config;
