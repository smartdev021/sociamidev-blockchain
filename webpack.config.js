var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
      , sourceMap: true
    })
  ],
  module: {
    loaders: 
    [
      { test: /\.js$/, loaders: ['react-hot-loader', 'babel-loader'], include: path.join(__dirname, 'src')},
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/, loader: 'url-loader'},
      //{ test: /\.(png|jpg)$/, loader: 'url-loader' },
      { test: /\.(jpg|png|svg)$/, loader: 'file-loader', options: {name: '[path][name].[hash].[ext]', }, },
    ]
  }
};
