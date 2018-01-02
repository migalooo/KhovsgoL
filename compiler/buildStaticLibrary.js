'use strict'
/**
 * Insert static libraries
 */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const glob = require('glob')
const {src, library} = require('../static/config.js')

const libPath = path.resolve(__dirname, '../static')

const existLibraries = glob.sync(`${libPath}/*.js`).map(p => path.basename(p))
const insertLibraries = library.filter(lib => {
  return existLibraries.some(name => lib[name])
})

const libName = insertLibraries
const aliasName = Object.values(insertLibraries)

function saveFile(filePath, data) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
  fs.open(filePath, 'w', (err, fd) => {
    if (err) throw err
    fs.writeFile(filePath, data, (err) => {
      if (err) throw err
      const filename = path.basename(filePath)
      console.log(`\n  File ${chalk.blue(filename)} build success. \n  ${chalk.grey.dim('Path: '+filePath)}`)
    })
  })
}

/**
 * Generate html snippet for library in /static folder,
 * result file will put in /src/snippets
 */
let contentHbs = '', pathHbs
pathHbs = path.resolve(__dirname, '../src/snippets') + '/script.static.hbs'
insertLibraries.forEach(lib => contentHbs += `<script src="${src+Object.keys(lib)[0]}"></script>\n`)
saveFile(pathHbs, contentHbs)


/**
 * Generate webpack alias config for import libraries in bundles 
 */
let aliasConfig = 'module.exports = {\n', pathAliasConfig 
pathAliasConfig = path.resolve(__dirname, '../compiler') + '/externalsConfig.js'
insertLibraries.forEach(lib => aliasConfig += `  ${Object.values(lib)[0].toLowerCase()}: 'window.${Object.values(lib)[0]}',\n`)
aliasConfig += '}'
saveFile(pathAliasConfig, aliasConfig)


