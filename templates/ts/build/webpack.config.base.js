const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const { resolveFromRoot } = require('./utils');

module.exports = {
  entry: { index: resolveFromRoot('src/index.tsx') },
  output: {
    filename: 'assets/js/[name].[contenthash:8].js',
    path: resolveFromRoot('dist'),
    /* Specify the base path for all the assets within the app.
     * If removed, nested routes(/a/b/c/d) will make the browser
     * look for assets in '/a' instead of '/' where they are actually stored.
     */
    publicPath: '/',
  },
  resolve: {
    alias: {
      // to distinguish node_modules packages, we use '~' alias in [.js, .jsx, .ts, .tsx]
      // but '~' not work in [.css, .scss, .less], we use '@' alias in [.css, .scss, .less]
      '~': resolveFromRoot('src'),
      '@': resolveFromRoot('src'),
    },
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [resolveFromRoot('node_modules')],
        include: [resolveFromRoot('src')],

        // Webpack will try the loaders backwards.
        use: [
          'cache-loader',
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
              configFile: resolveFromRoot('tsconfig.json'),
            },
          },
          'source-map-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|glb|gltf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    new StylelintPlugin({
      fix: true,
    }),
    new ProgressPlugin({}),
    new HtmlWebpackPlugin({
      hash: true,
      template: resolveFromRoot('src/index.html'),
      favicon: resolveFromRoot('src/assets/images/favicon.png'),
    }),
    new TsconfigPathsPlugin({ configFile: resolveFromRoot('tsconfig.json') }),
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    // uncomment to use `CopyPlugin`
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: resolveFromRoot('src/assets/glbs'),
    //       to: resolveFromRoot('dist/assets/glbs'),
    //     },
    //   ],
    // }),
  ],
};
