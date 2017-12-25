'use strict'
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const portfinder = require('portfinder')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const addMutiPageEntries = require('./utils/addMutiPageEntries.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const config = require('./config.js')
const webpackCommon = require('./webpack.common.js')
const { createNotifierCallback } = require('./utils/createNotifierCallback.js')

const devConfig = webpackMerge(webpackCommon(config.dev), {
  entry: {},
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: config.dev.assetsPublic // rewrite url direction e.g. CDN
  },
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: !config.dev.showFullErrors, // control errors output in termial, necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify('development')
      // e.g. 'SERVICE_URL': JSON.stringify("http://production.example.com")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.staticSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// Add muti page HtmlWebpackPlugin config
const {entry, folderNames, inactiveNames} = addMutiPageEntries(config.dev)
Object.assign(devConfig.entry, entry)
folderNames.forEach((folderName, i) => {
  devConfig.plugins.push( new HtmlWebpackPlugin(
    {
      filename: `${folderName}.html`,
      template: path.resolve(__dirname, `../src/views/${folderName}/html.hbs`),
      inject: true,
      chunks: [folderName]
    }
  ))
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port
      process.env.PORT = port
      // add port to devServer config
      devConfig.devServer.port = port
      // Add FriendlyErrorsPlugin
      devConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Application Running URLs: ${chalk.blue('http://'+config.dev.host+':'+port)}`
          +`\n    Serving : ${chalk.cyan(folderNames.join(' | '))}`
          +`\n    ${inactiveNames && inactiveNames.length ? chalk.gray('Locked  : '+inactiveNames.join(' | ')) : ''}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? createNotifierCallback()
        : undefined
      }))
      resolve(devConfig)
    }
  })
})
