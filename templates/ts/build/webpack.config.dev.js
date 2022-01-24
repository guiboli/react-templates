const { merge } = require('webpack-merge');
const { SourceMapDevToolPlugin } = require('webpack');
const portFinderSync = require('portfinder-sync');

const base = require('./webpack.config.base');
const { resolveFromRoot } = require('./utils');

const port = process.env.PORT || 3000;

module.exports = merge(base, {
  mode: 'development',
  devtool: false,
  stats: 'minimal',
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
    managedPaths: [resolveFromRoot('node_modules')],
  },
  watchOptions: {
    ignored: [resolveFromRoot('node_modules')],
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
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
    port: portFinderSync.getPort(port),
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
