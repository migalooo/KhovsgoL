'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.addStyleLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      root: path.resolve(__dirname, '../../src/assets')
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    return options.env === 'development'
    ? ['style-loader'].concat(loaders)
    : ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader',
      })
  }

  return {
    rules: [
      {
        test: /\.css$/,
        use: generateLoaders()
      },
      {
        test: /\.less$/,
        use: generateLoaders('less')
      }
    ]
  }
}

