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
    { 'vue-v2.5.13.min.js': 'Vue' },
    { 'axios-v0.17.1.min.js': 'axios' }
  ]
}
