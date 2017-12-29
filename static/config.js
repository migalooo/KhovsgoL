'use strict'
/**
 * Set externals name of library
 */
module.exports = {
  // src attribute of script tag 
  src: '/static/',
  library: [
    // library-file-name: global-variable
    // note: global-variable in import will be change to lowercase
    { 'library.js': 'selector' }
  ]
}
