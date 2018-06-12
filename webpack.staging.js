const merge = require('webpack-merge');
const common = require('./webpack.common');
const build = require('./webpack.build');
const Webpack = require('webpack');

module.exports = merge(common, build, {
  plugins: [
    new Webpack.EnvironmentPlugin({
      NODE_ENV: 'staging',
    }),
  ],
});
