/**
 * Browser config in package.json file
 */
const path = require('path')
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-pxtorem": {
      rootValue: 100,
      unitPrecision: 5,
      propList: ['*', '!border*'],
      selectorBlackList: ['hairline'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0
    },
    "postcss-bem": {},
    "postcss-nested": {},
    "autoprefixer": {}
  }
}
