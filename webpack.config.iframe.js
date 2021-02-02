const path = require('path')
const webpack = require('webpack')

const banner = {
  lib: 'qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License',
  bundled: `qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License'
This software includes lscache that is distributed in the Apache License 2.0

Acknowledgements:
lscache | https://www.npmjs.com/package/lscache | Apache License 2.0`,
}

const jsPlugins = [new webpack.optimize.AggressiveMergingPlugin(), new webpack.ProgressPlugin()]

module.exports = [
  // Iframe version build
  {
    name: 'iframe',
    mode: 'production',

    entry: {
      iframe: './lib/iframe/iframe.ts',
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'docs'),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'lib'),
      },
      extensions: ['.ts'],
      modules: ['node_modules', path.resolve(__dirname, '')],
    },

    plugins: jsPlugins.concat([new webpack.BannerPlugin(banner.bundled)]),

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /lib.bundled.js$/,
          type: 'asset/source',
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            attributes: false,
            esModule: false,
            minimize: true,
          },
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                esModule: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer'],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  },
]
