'use strict'
const fs = require("fs")
const glob = require('glob')
const path = require('path')
const chalk = require('chalk')
const viewPath = path.resolve(__dirname, '../../src/views')

/**
 * Get webpack mutipage enter floders
 */
function checkAccessableFolders() {
  const directions = glob.sync(viewPath+'/*/')
  // Check src/views/folders exists
  if (directions.length === 0) {
    const warns = []
    warns.push(chalk.red('\nError: Enter folder is not find in '))
    warns.push(chalk.cyan('src/views/'))
    console.log(warns.join(''))
    process.exit(1)
  }

  const folderNames = []
  // Check src/views/folders contains html.hbs and main.js
  directions.every((dir) => {
    const folderName = dir.match(/(?!\/)\w+(?=\/$)/)[0]
    const isHtmlExists = fs.existsSync(dir+'/html.hbs')
    const isMainExists = fs.existsSync(dir+'/main.js')
    if (isHtmlExists && isMainExists) {
      folderNames.push(folderName)
      return true
    } else {
      const warns = []
      warns.push(chalk.yellow(`\nWarning: ${folderName} folder is identified as a muti page entery, html.hbs and main.js is necessary.`))
      if (!isHtmlExists) warns.push(chalk.red('\nError:'), chalk.cyan(' html.hbs '), chalk.red('should be created in '), chalk.cyan('src/views/'+folderName), chalk.red(' folder'))
      if (!isMainExists) warns.push(chalk.red('\nError:'), chalk.cyan(' main.js  '), chalk.red('should be created in '), chalk.cyan('src/views/'+folderName), chalk.red(' folder'))
      console.log(warns.join(''))
      process.exit(1)
    }
  })
  // Check src/views/folders exists
  if (directions.length === 0) {
    const warns = []
    warns.push(chalk.red('\nError: Enter folder is not find in '))
    warns.push(chalk.cyan('src/views/'))
    console.log(warns.join(''))
    process.exit(1)
  }
  return folderNames
}

/**
 * Return serving entries and locked entries for webpack bundle entry
 */
module.exports = function addMutiPageEntries(ENV) {
  let  folderNames = checkAccessableFolders() 
  const entry = {}, activeNames = [], inactiveNames = []
  if (!ENV.compilerViews.all) {
    if (ENV.compilerViews.views.length === 0) {
      console.log(chalk.red('Error: complierViews array in compiler/config.js is empty.'))
      process.exit(1)
    }
    folderNames.forEach(v => {
      if (ENV.compilerViews.views.indexOf(v) !== -1) {
        activeNames.push(v)
      } else {
        inactiveNames.push(v)
      }
    })
    if (activeNames.length === 0) {
      console.log(chalk.red('Error: complierViews array in compiler/config.js may type a wrong folder name.'))
      process.exit(1)
    }
    folderNames = activeNames
  }
  folderNames.forEach((folderName, i) => {
    entry[folderName] = path.resolve(__dirname, `../../src/views/${folderName}/main.js`)
  })
  return {
    entry,
    folderNames,
    inactiveNames,
  }
}
