const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const banner = {
  lib: 'qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License',
  bundled: `qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License'
This software includes lscache that is distributed in the Apache License 2.0

Acknowledgements:
lscache | https://www.npmjs.com/package/lscache | Apache License 2.0`
};

const jsPlugins = [
  new webpack.optimize.AggressiveMergingPlugin()
];

module.exports = [

  // Library Build
  {
    name: 'lib',
    mode: 'production',

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
      "lscache"
    ],

    resolve: {
      extensions: ['.ts', '.json', '.js'],
      modules: ['node_modules', path.resolve(__dirname, '')]
    },

    plugins: jsPlugins.concat([
      new webpack.BannerPlugin(banner.lib)
    ]),

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
    name: 'lib-bundled',
    mode: 'production',

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
    name: 'css',
    mode: 'production',

    entry:['./lib/style/style.scss'],

    plugins: [
      new FixStyleOnlyEntriesPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      })
    ],

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer']
                }
              }
            },
            'sass-loader',
          ],
        }
      ]
    }
  },

  // Iframe version build
  {
    name: 'iframe',
    mode: 'production',

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

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /lib.bundled.js$/,
          use: [
            {
              loader: 'raw-loader',
              options: {
                esModule: false
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'raw-loader',
              options: {
                esModule: false
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
                esModule: false,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer']
                }
              }
            },
            'sass-loader'
          ]
        }
      ]
    }
  }
];
