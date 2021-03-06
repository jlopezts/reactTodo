'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var config = require('./config');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: path.join(__dirname, 'app/index.js')
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js?[hash]',
    publicPath: '/'
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      // util: path.resolve(__dirname, './app/common/util'),
    },
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    jquery: 'jQuery',
    materialize: 'Materialize',
    react: 'React'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/indexTemplate.ejs'),
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'APP_CONFIG': JSON.stringify(config.get('app')),
        'TEMPLATE_CONFIG': JSON.stringify(config.get('template'))
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'html?limit=20000?modules&localIdentName=[name]---[local]---[hash:base64:5]',
      exclude: /node_modules/
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass?modules&localIdentName=[name]---[local]---[hash:base64:5]',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=20000?modules&localIdentName=[name]---[local]---[hash:base64:5]',
      exclude: /node_modules/
    }, {
      test: /\.json?$/,
      loader: 'json',
      exclude: /node_modules/
    }, {
      test: /\.svg?$/,
      loader: 'file?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }]
  },
  postcss: [
    require('autoprefixer')
  ]
};
