const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');

const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.[contenthash].js',
    path: path.resolve(__dirname, 'build')
  },
  mode,
  watchOptions: {
    ignored: 'node_modules/**'
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Koro',
      template: 'public/index.html',
      publicPath: '/'
    }),
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: 'public/'
        }
      ]
    }),
    new InjectManifest({
      swSrc: 'service-worker/index.js',
      swDest: 'sw.js',
      mode
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    preferRelative: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin({
        sourceMap: true
      })
    ]
  }
};
