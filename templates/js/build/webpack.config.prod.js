const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = require('./webpack.config.base');
const ANALYZE = process.env.ANALYZE;

const commonPlugins = [
  new MiniCssExtractPlugin({
    filename: 'assets/styles/[name].[contenthash:8].css',
    chunkFilename: 'assets/styles/[id].[contenthash:8].css',
  }),
];

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'normal',
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s?css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: ANALYZE
    ? [
        ...commonPlugins,
        new BundleAnalyzerPlugin({
          analyzerHost: '0.0.0.0',
          analyzerPort: '4002',
          logLevel: 'warn',
        }),
      ]
    : [...commonPlugins],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: true,
        terserOptions: {},
      }),
    ],
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `vendor.${packageName.replace('@', '')}`;
          },
        },
      },
    },
  },
});
