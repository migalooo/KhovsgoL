import vue from 'vue'
import axios from 'axios'
import App from './components/App.vue'

vue.prototype.$http = axios

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
