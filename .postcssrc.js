/**
 * Browser config in package.json file
 */
module.exports = {
  "plugins": {
    "postcss-import": {},
    "autoprefixer": {},
    "postcss-pxtorem": {
      rootValue: 100,
      unitPrecision: 5,
      propList: ['*', '!border*'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    }
  }
}
