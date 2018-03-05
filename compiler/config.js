'use strict'
const path = require('path')

module.exports = {
  /**
   * Development Envrionment
   */
  dev: {
    // envrionment
    env: 'development',
    // path
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    staticSubDirectory: 'static', // copy dirname in assetsRoot for libraries in "/static/" folder
    // proxy
    proxyTable: {
      '/api': {
        target: 'http://47.100.113.105:7311',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/17093676'
        }
      }
    },
    // dev server settings 
    host: 'localhost', // overwritten process.env.HOST
    port: 8080, // overwritten process.env.PORT
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true, // system alert tips
    showFullErrors: false, // show errors detail
    poll: false, // long poll watching file change
    // Js source map
    devtool: 'eval-source-map',
    // style source map
    cssSourceMap: true, 
    // use postCss
    usePostCSS: true,
    // compiler muti page entries array
    compilerViews: {
      all : true, // compile all folders under /src/views/ to pages
      views: ['page'] // set all:false, compile selected folders in views array to pages
    } 
  },

  /**
   * Preproduction Envrionment
   */
  prebuild: {
    // envrionment
    env: 'preproduction',
    // path
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublic: '/',
    staticSubDirectory: 'static',
    // Js source map
    devtool: '#source-map',
    // style source map
    cssSourceMap: true, 
    // use postCss
    usePostCSS: true,
    // compiler page array
    compilerViews: {
      all : true,
      views: []
    }, 
    // commons chunk switcher
    chunks: false,
    // enable Gzip
    gzip: false,
    gzipExtensions: ['js', 'css'],
    // report bundle analyze
    bundleAnalyze: false 
  }, 

  /**
   * Production Envrionment
   */
  build: {
    // envrionment
    env: 'production',
    // path
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublic: '/',
    staticSubDirectory: 'static',
    // Js source map
    devtool: false,
    // style source map
    cssSourceMap: false, 
    // use postCss
    usePostCSS: true,
    // compiler page array
    compilerViews: {
      all : true,
      views: []
    }, 
    // commons chunk switcher
    chunks: false,
    // enable Gzip
    gzip: false,
    gzipExtensions: ['js', 'css'],
    // report bundle analyze
    bundleAnalyze: true
  } 
}
