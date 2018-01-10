import vue from 'vue'
import axios from 'axios'
import App from './fragments/App.vue'

axios.defaults.timeout = 2500 
axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    return Promise.reject(error)
  })

vue.prototype.$http = axios

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
