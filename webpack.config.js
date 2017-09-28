const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const DEBUG = !process.argv.includes('--env.production');

const attachProductionPlugins = (plugins) => {
  if (!DEBUG) {
    return plugins.push(
      new webpack.optimize.UglifyJsPlugin({compress: {screw_ie8: true, warnings: false}}),
      new webpack.optimize.AggressiveMergingPlugin()
    );
  }
  return plugins;
};

module.exports = [

  // Library Build
  {
    entry: ['./src/lib/QiitaWidget.ts'],

    output: {
      filename: 'lib.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'QiitaWidget',
      libraryTarget: 'umd',
      libraryExport: 'default',
      umdNamedDefine: true
    },

    resolve: {
      extensions: ['.ts', '.json', '.js'],
      modules: ['node_modules', path.resolve(__dirname, 'src/js')]
    },

    plugins: attachProductionPlugins([
      new webpack.optimize.OccurrenceOrderPlugin()
    ]),
    devtool: DEBUG ? 'source-map' : false,

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
    entry:['./src/css/style.scss'],

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
    entry: ['./src/iframe/iframe.ts'],

    output: {
      filename: 'iframe.js',
      path: path.resolve(__dirname, 'docs'),
    },

    resolve: {
      extensions: ['.ts'],
      modules: ['node_modules', path.resolve(__dirname, 'src')]
    },

    plugins: attachProductionPlugins([
      new webpack.optimize.OccurrenceOrderPlugin()
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
          test: /\.js$/,
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
}];
