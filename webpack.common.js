let Path = require('path');
let Webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    hotmiddleware: 'webpack-hot-middleware/client',
    babelpolyfill: "babel-polyfill",
    main: './src/index.js',
    vendor: [
      'bluebird',
      'react',
      'react-dom',
      'react-cookie',
      'lodash',
      'redux',
      'axios',
      'moment',
      'react-bootstrap',
      'pubsub-js',
    ]
  },
  output: {
    path: Path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
      , sourceMap: true
    })
    ,
    new HtmlWebpackPlugin({
      template: Path.join(__dirname, 'src/index.ejs'),
      title: 'Soqqle',
      inject: 'body',
    }),
    new Webpack.HashedModuleIdsPlugin(),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
  ],
  module: {
    loaders:
      [
        { test: /\.js$/, loaders: ['react-hot-loader', 'babel-loader'], include: Path.join(__dirname, 'src') },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader' },
        //{ test: /\.(png|jpg)$/, loader: 'url-loader' },
        { test: /\.(jpg|png|svg)$/, loader: 'file-loader', options: { name: '[path][name].[hash].[ext]', }, },
      ]
  },
  resolve: {
    alias: {
      ['~']: Path.resolve(__dirname)
    }
  },
};