const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
require('dotenv').config();

const mode = process.env.NODE_ENV || 'development';
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log('mode: ', mode);

const babelOptions = (preset) => {
  const options = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: ['@babel/plugin-proposal-class-properties']
  };

  if (preset)
    options.presets.push(preset);

  return options;
};

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];

  if (isDev)
    loaders.push('eslint-loader')

  return loaders;
};

const getPlugins = () => {
  const base = [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'VUE_APP']),
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.svg'),
        to: path.resolve(__dirname, 'dist')
      }]
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCSSAssetsWebpackPlugin(),
    new webpack.DefinePlugin({
      VUE_APP_NODE_ENV: JSON.stringify(process.env.VUE_APP_NODE_ENV),
      VUE_APP_GRAPHQL_API_URL: JSON.stringify(process.env.VUE_APP_GRAPHQL_API_URL)
    })
  ];

  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  mode,
  entry: {
    main: ['@babel/polyfill', './src/main.js']
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.NODE_ENV === 'production'
      ? '/graphql_auth/'
      : '/'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devServer: {
    port: 5200,
    hot: isDev,
    historyApiFallback: true
  },
  devtool: isDev ? 'source-map' : '',
  plugins: getPlugins(),
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node-modules/,
        use: [
          {
            loader: 'vue-loader',
            options: babelOptions()
          },
          'eslint-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        use: jsLoaders()
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: isDev ? 'vue-style-loader' : MiniCSSExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: isDev ? 'style-loader' : MiniCSSExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)/,
        use: ['file-loader']
      }
    ]
  }
};
