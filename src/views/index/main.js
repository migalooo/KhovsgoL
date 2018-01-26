import vue from 'vue'
import axios from 'axios'
import toast from '>/components/toast'

import App from './sections/App.vue'
import ModalWarpper from './sections/Modal-Warpper.vue'
import './main.css'

/**
 * Global components
 */
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
 * App entry
 */
const app = new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

/**
 * Modal warpper 
 */
const modal = new Vue({
  el: '#modal-warpper',
  template: '<Modal-Warpper/>',
  components: {
    ModalWarpper
  }
})
