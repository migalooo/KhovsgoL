'use strict'
const path = require('path')
/**
 * Let HBS support FriendlyErrorsPlugin
 */
module.exports.createNotifierCallback = function () {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') {
      return
    }
    formattedHtmlHbsErrors(errors)
    
    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()
    notifier.notify({
      title: 'KhovsgoL',
      message: severity + ': ' + error.name,
      subtitle: error.file || '',
      icon: path.join(__dirname, 'terminal-icon.png')
    })
  }
  function formattedHtmlHbsErrors(errs) {
    if (errs instanceof Array) {
      const formateErrs = errs.map((err) => {
        const text = err.webpackError
        if (typeof text !== 'string' || text.indexOf('handlebars') === -1) return err
        const errorLines = text.replace(/(\s*\n)/g,'\n').split(/\n/).slice(1,4).join('\n')
        return {
          message: errorLines, 
          name: 'HtmlBuildError',
        }
      })
      return Object.assign(errs, formateErrs)
    }
  }
}

