const merge = require('webpack-merge');
const common = require('./webpack.common');
const build = require('./webpack.build');
const Webpack = require('webpack');

module.exports = merge(common, build, {
  plugins: [
    // don't mess with NODE_ENV=production. It is predefined value
    // used by webpack and react. Unless migrate to webpack 4
    // where mode option introduced
    new Webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      SOQQLE_ENV: 'staging',
    }),
    new Webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
  ],
});
