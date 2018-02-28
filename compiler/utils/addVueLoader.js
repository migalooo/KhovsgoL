'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function cssLoaders(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
      root: path.resolve(__dirname, '../../src/assets')
    }
  }

  var postcssLoader = {
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

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

module.exports = function(ENV) {
  return {
    loaders: cssLoaders({
      sourceMap: ENV.cssSourceMap,
      extract: !ENV.cssSourceMap,
      usePostCSS: ENV.usePostCSS
    }),
    cssSourceMap: ENV.cssSourceMap,
    cacheBusting: true, 
    transformToRequire: {
      video: 'src',
      source: 'src',
      img: 'src',
      image: 'xlink:href'
    }
  }
}
