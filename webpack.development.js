const merge = require('webpack-merge');
const common = require('./webpack.common');
const Webpack = require('webpack');

module.exports = merge(common, {
  entry: ['webpack-hot-middleware/client'],
  plugins: [new Webpack.HotModuleReplacementPlugin()],
});
