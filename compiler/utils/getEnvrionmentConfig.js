'use strict'
const configENV = require('../config')
const chalk = require('chalk')

module.exports = function getEnvrionmentConfig() {
  let config = {} 
  if (process.env.NODE_ENV === 'preproduction') {
    config = configENV.prebuild
  } else if (process.env.NODE_ENV = 'production') {
    config = configENV.build
  } else if (process.env.NODE_ENV = 'development'){
    config = configENV.dev
  } else {
    console.log(chalk.red('  NODE_ENV missing for build.'))
    process.exit(1)
  }
  return config
}

