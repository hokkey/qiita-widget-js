const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const DEBUG = !process.argv.includes('--env.production');
const banner = {
  lib: 'qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License',
  bundled: `qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License'
This software includes localforage that is distributed in the Apache License 2.0

Acknowledgements:
axios | https://www.npmjs.com/package/axios | MIT License
localforage | https://www.npmjs.com/package/localforage | Apache License 2.0
axios-cache-adapter | https://www.npmjs.com/package/axios-cache-adapter | MIT License`
};

const jsPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {screw_ie8: true, warnings: false}
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin()
];

module.exports = [

  // Library Build
  {
    entry: {
      'lib': "./lib/QiitaWidget.ts",
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'QiitaWidget',
      libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true
    },

    externals: [
      "localforage",
      {
        "axios-cache-adapter": {
          root: "axiosCacheAdapter",
          amd: "axios-cache-adapter",
          commonjs: "axios-cache-adapter",
          commonjs2: "axios-cache-adapter"
        }
      }
    ],

    resolve: {
      extensions: ['.ts', '.json', '.js'],
      modules: ['node_modules', path.resolve(__dirname, '')]
    },

    plugins: jsPlugins.concat([
      new webpack.BannerPlugin(banner.lib)
    ]),
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

  // Library Build (bundled)
  {
    entry: {
      'lib.bundled': "./lib/QiitaWidget.ts",
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      library: 'QiitaWidget',
      libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true
    },

    resolve: {
      extensions: ['.ts', '.json', '.js'],
      modules: ['node_modules', path.resolve(__dirname, '')]
    },

    plugins: jsPlugins.concat([
      new webpack.BannerPlugin(banner.bundled)
    ]),
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
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'docs'),
    },

    resolve: {
      extensions: ['.ts'],
      modules: ['node_modules', path.resolve(__dirname, '')]
    },

    plugins: jsPlugins.concat([
      new webpack.BannerPlugin(banner.bundled)
    ]),
    devtool: false,

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /lib.bundled.js$/,
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
