const path = require('path')
const projectRoot = path.resolve(__dirname)

const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const RemoveEmptyScripts = require('webpack-remove-empty-scripts')

const banner = {
  lib: 'qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License',
  bundled: `qiita-widget-js | https://media-massage.net/qiita-widget-js | MIT License'
This software includes lscache that is distributed in the Apache License 2.0

Acknowledgements:
lscache | https://www.npmjs.com/package/lscache | Apache License 2.0`,
}

const distOutput = {
  path: path.resolve(projectRoot, 'dist'),
  library: 'QiitaWidget',
  libraryTarget: 'umd',
  libraryExport: 'default',
  umdNamedDefine: true,
  filename: '[name].js',
}

const resolve = {
  alias: {
    '~lib': path.resolve(projectRoot, 'src', 'lib'),
    '~docs': path.resolve(projectRoot, 'src', 'docs'),
    '~iframe': path.resolve(projectRoot, 'src', 'iframe'),
    '~style': path.resolve(projectRoot, 'src', 'style'),
    '~dist': path.resolve(projectRoot, 'dist'),
  },
  extensions: ['.ts', '.json', '.js'],
  modules: ['node_modules', path.resolve(projectRoot, '')],
}

const tsLoaderRule = {
  test: /\.tsx?$/,
  use: {
    loader: 'ts-loader',
    options: {
      configFile: "webpack.tsconfig.json",
    },
  },
}

const sassLoaderRule = {
  test: /\.scss$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    'css-loader',
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
}

const commonPlugins = (banner) => {
  return [
    new webpack.ProgressPlugin(),
    new webpack.BannerPlugin({
      banner,
      include: /((lib(\.bundled)?)|(iframe)\.js)/,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ]
}

const cssPlugins = () => {
  return [
    new RemoveEmptyScripts(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ]
}

const libraryBuildConfigs = [
  // Library Build (bundled)
  {
    name: 'lib-bundled',
    mode: 'production',
    entry: {
      'lib.bundled': path.resolve(projectRoot, 'src', 'lib', 'QiitaWidget.ts'),
      css: path.resolve(projectRoot, 'src', 'style', 'style.scss'),
    },
    output: distOutput,
    resolve,
    plugins: [...commonPlugins(banner.bundled), ...cssPlugins()],
    module: {
      rules: [tsLoaderRule, sassLoaderRule],
    },
  },
]

const docsBuildConfig = {
  mode: 'production',

  // entry: {},
  // output: {},

  resolve,

  plugins: commonPlugins(banner.bundled),

  module: {
    rules: [
      tsLoaderRule,
      {
        test: /lib.bundled.js$/,
        type: 'asset/source',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          sources: false,
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
}

module.exports = function (env, argv) {
  if (env.step1) {
    return libraryBuildConfigs
  }

  if (env.step2) {
    return [
      {
        ...docsBuildConfig,
        entry: {
          iframe: path.resolve(projectRoot, 'src', 'iframe', 'iframe.ts'),
        },
      },
      {
        ...docsBuildConfig,
        entry: {
          app: path.resolve(projectRoot, 'src', 'docs', 'app.ts'),
        },
        output: {
          filename: '[name].js',
          path: path.resolve(projectRoot, 'docs'),
        },
      },
    ]
  }

  throw new Error('please specify the step like: webpack --env=step1 or webpack --env=step2')
}
