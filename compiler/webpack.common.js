'use strict'
const fs = require('fs')
const path = require('path')
const { addStyleLoaders } = require('./utils/addStyleLoaders.js')
const addVueLoader = require('./utils/addVueLoader.js')

function resolve () {
  return path.join(__dirname, '..', ...arguments)
}

module.exports = function webpackCommon(ENV) {
  const commonConfig = {
    context: path.resolve(__dirname, '../'),
    resolve: {
      extensions: ['.vue', '.js', '.json', '.hbs'],
      alias: {
        '>': resolve('src')
      }
    },
    externals: {},
    devtool: ENV.devtool,
    module: {
      rules: [
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          options: {
            partialDirs: resolve('src/snippets'),
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src')]
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: addVueLoader(ENV)
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join(ENV.assetsSubDirectory, 'images/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join(ENV.assetsSubDirectory, 'media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: path.posix.join(ENV.assetsSubDirectory, 'fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    }
  }

  switch (ENV.env) {
    case 'development':
      // In development env disabled url-loader, just copy files by file-loader
      commonConfig.module.rules.forEach((rule, i, rules) => {
        if (rule.loader === 'url-loader') {
          rules[i].loader = 'file-loader' 
          rules[i].options = {
            name: '[path][name].[ext]',
            publicPath: ENV.assetsPublic, 
          }
        }
      })
      break
    case 'preproduction':
    case 'production':
      break
    default:
      throw new Error('Envrionment is missing in config file.')
  }

  // Add styleloaders config
  const styleLoaders = addStyleLoaders({
    env: ENV.env,
    usePostCSS: ENV.usePostCSS,
    sourceMap: ENV.cssSourceMap,
    publicPath: ENV.assetsPublic
  })
  commonConfig.module.rules.unshift(...styleLoaders.rules)

  // External config for global import
  if (fs.existsSync(path.resolve(__dirname, './externalsConfig.js'))) {
    const externals = require('./externalsConfig.js') 
    Object.assign(commonConfig.externals, externals)
  }

  return commonConfig
}

