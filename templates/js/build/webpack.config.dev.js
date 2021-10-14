const {merge} = require('webpack-merge');
const {SourceMapDevToolPlugin} = require('webpack');

const base = require('./webpack.config.base');
const {resolveFromRoot} = require('./utils');

const port = process.env.PORT || 3001;

module.exports = merge(base, {
  mode: 'development',
  devtool: false,
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          'cache-loader',
          'style-loader',
          'css-modules-typescript-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    allowedHosts: 'all',
    client: {
      logging: 'warn',
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
      webSocketTransport: 'ws',
    },
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    https: false,
    port: port,
    static: {
      directory: resolveFromRoot('dist/assets'),
      watch: true,
    },
  },
  plugins: [new SourceMapDevToolPlugin({})],
  optimization: {
    nodeEnv: 'development',
  },
});
