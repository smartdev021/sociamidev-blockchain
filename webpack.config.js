let Path = require('path');
let Webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: Path.join(__dirname, 'dist'),
    filename: 'bundle.js',
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
      title: 'Sociami App',
      inject: 'body',
    })
  ],
  module: {
    loaders: 
    [
      { test: /\.js$/, loaders: ['react-hot-loader', 'babel-loader'], include: Path.join(__dirname, 'src')},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader'},
      //{ test: /\.(png|jpg)$/, loader: 'url-loader' },
      { test: /\.(jpg|png|svg)$/, loader: 'file-loader', options: {name: '[path][name].[hash].[ext]', }, },
    ]
  }
};
