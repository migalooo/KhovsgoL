/** 
 * A test selector library
 */

window.selector = function(el) {
  const matchClass = /^\.(\w+)/
  const matchId = /^\#(\w+)/
  if (matchClass.test(el)) return document.querySelectorAll(el)
  if (matchId.test(el)) return document.querySelector(el)
}
