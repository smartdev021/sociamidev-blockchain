const merge = require('webpack-merge');
const common = require('./webpack.common')
const Webpack = require('webpack');

module.exports = merge(common, {
  plugins: [
    new Webpack.EnvironmentPlugin({
      NODE_ENV: 'prod'
    })
  ],
});
