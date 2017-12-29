'use strict'
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const webpackCommon = require('./webpack.common.js')
const addMutiPageEntries = require('./utils/addMutiPageEntries.js')
const getEnvrionmentConfig = require('./utils/getEnvrionmentConfig.js')
const createNotifierCallback = require('./utils/createNotifierCallback.js')

const ENV = getEnvrionmentConfig()

const buildConfig = webpackMerge(webpackCommon(ENV), {
  entry: {},
  output: {
    path: ENV.assetsRoot,
    publicPath: ENV.assetsPublic, 
    filename: path.join(ENV.assetsSubDirectory, '[name].[chunkhash].js'),
    chunkFilename: path.join(ENV.assetsSubDirectory, '[id].[chunkhash].js')
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(ENV.env)
      // e.g. 'SERVICE_URL': JSON.stringify("http://production.example.com")
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: !!ENV.devtool,
      parallel: true
    }),
    // Extract css into its own file
    new ExtractTextPlugin({
      filename: path.posix.join(ENV.assetsSubDirectory, 'css/[name].[contenthash].css'),
      allChunks: false,
    }),
    // Compress extracted CSS
    new OptimizeCSSPlugin({
      cssProcessorOptions: ENV.cssSourceMap
      ? { safe: true, map: { inline: false } }
      : { safe: true }
    }),
    // Keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // Scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // Extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: ENV.staticSubDirectory,
        ignore: ['config.js']
      }
    ])
  ]
})


// Add muti page HtmlWebpackPlugin config
const {entry, folderNames, inactiveNames} = addMutiPageEntries(ENV)
Object.assign(buildConfig.entry, entry)
folderNames.forEach((folderName, i) => {
  buildConfig.plugins.push( new HtmlWebpackPlugin(
    {
      filename: `${folderName}.html`,
      template: path.resolve(__dirname, `../src/views/${folderName}/html.hbs`),
      inject: true,
      chunks: [folderName, 'manifest', 'vendor'],
      minify: {
        removeComments: true
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }
  ))
})

if (ENV.gzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  buildConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        ENV.gzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (ENV.bundleAnalyze) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  buildConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = buildConfig 
