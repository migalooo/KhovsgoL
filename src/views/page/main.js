import vue from 'vue'
import axios from 'axios'

import App from './fragments/App.vue'
import './main.css'
/**
 * Global components
 */
import toast from '>/components/toast'
vue.use(toast)

/**
 * Ajax bind to this.$http
 */
axios.defaults.timeout = 2500 
axios.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    return Promise.reject(error)
  })
vue.prototype.$http = axios

/**
 * Event bus for data transfer between components
 */
window.bus = new vue()

/**
 * Init vue main entry
 */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
