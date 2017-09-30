const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const DEBUG = !process.argv.includes('--env.production');

const jsPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    include: /\.min\.js$/,
    minimize: true,
    compress: {screw_ie8: true, warnings: false}
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.BannerPlugin(
    'qiita-widget-js | MIT License | https://media-massage.net/qiita-widget-js/'
  )
];

module.exports = [

  // Library Build
  {
    entry: {
      'lib': "./lib/QiitaWidget.ts",
      'lib.min': "./lib/QiitaWidget.ts"
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'QiitaWidget',
      libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true
    },

    externals: {
      'localforage': 'localforage',
      'axios-cache-adapter': 'axiosCacheAdapter'
    },

    resolve: {
      extensions: ['.ts', '.json', '.js'],
      modules: ['node_modules', path.resolve(__dirname, 'src/js')]
    },

    plugins: jsPlugins,
    devtool: 'source-map',

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    }
  },

  // CSS Build
  {
    entry:['./lib/style/style.scss'],

    output: {
      filename: 'style.css',
      path: path.resolve(__dirname, 'dist')
    },

    plugins: [
      new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true
      })
    ],

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [{
                loader: "css-loader",
                options: {
                  minimize: !DEBUG,
                  sourceMap: DEBUG
                }
              }, {
                loader: 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    require('autoprefixer'),
                  ]
                }
              }, {
                loader: 'sass-loader'
              }]
            }
          )
        }
      ]
    }
  },

  // Iframe version build
  {
    entry: {
      'iframe': './lib/iframe/iframe.ts',
      'iframe.min': './lib/iframe/iframe.ts'
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'docs'),
    },

    externals: {
      'localforage': 'localforage',
      'axios-cache-adapter': 'axios-cache-adapter'
    },

    resolve: {
      extensions: ['.ts'],
      modules: ['node_modules', path.resolve(__dirname, 'src')]
    },

    plugins: jsPlugins,
    devtool: false,

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /lib.min.js$/,
          use: 'raw-loader',
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
              sourceMap: false
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer'),
              ]
            }
          }, {
            loader: 'sass-loader'
          }]
        }
      ]
    }
  }
];
