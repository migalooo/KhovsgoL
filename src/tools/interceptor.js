/**
 * Avoid http request repeated 
 */
let requestUrls = []

export default function(url, holdTime = 3000) {
  return new Promise(function(resolve, reject) {
    const nowTime = new Date().getTime()
    const setTime = nowTime + holdTime
    // Clean up out date items
    requestUrls = requestUrls.filter(item => item.setTime > nowTime)
    // Check cached url 
    const hangUrl = requestUrls.filter(item => item.url === url)

    if (hangUrl.length === 0) { 
      const item = { url: url, setTime: setTime }
      requestUrls.push(item)
      resolve(url)
    } else {
      const errorInfo = {
        type: 'Request repeated',
        message: `Request ${url} canceled`
      }
      reject(errorInfo)
    }
  })
}
