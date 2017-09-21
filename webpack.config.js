const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const DEBUG = !process.argv.includes('--env.production');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new ExtractTextPlugin({
    filename: 'style.css',
    allChunks: true
  })
];

if (!DEBUG) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({compress: {screw_ie8: true, warnings: false}}),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

module.exports = {
  entry: ['./src/css/style.scss', './src/js/QiitaWidget.ts'],

  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'QiitaWidget',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },

  externals: {
    'axios': 'axios'
  },

  resolve: {
    extensions: ['.ts', '.json', '.js'],
    modules: ['node_modules', path.resolve(__dirname, 'src/js')]
  },

  plugins: plugins,
  devtool: DEBUG ? 'sourcemap' : false,

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: "css-loader",
            options: {
              minimize: true,
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
      )}
    ]
  }

};
