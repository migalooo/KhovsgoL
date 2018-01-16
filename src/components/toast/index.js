import toast from './source.vue'

const Toast = {}

Toast.install = function (Vue, defaultOptions={}) {
  const ToastConstructor = Vue.extend(toast)

  const removeDom = function(event) {
    console.log('info')
    const warp = event.target.parentNode
    if (warp && warp.childNodes.length > 1) {
      warp.removeChild(event.target)
    } else {
      warp.parentNode.removeChild(event.target.parentNode)
    }
  }

  ToastConstructor.prototype.close = function() {
    this.visible = false
    console.log(this.$el)
    this.$el.addEventListener('transitionend', removeDom)
  }

  Vue.prototype.$toast = function (options, defaultOptions) {
    if (typeof options === 'string') options = {message: options}
    Object.assign(options, defaultOptions)
    const duration = options.duration || 4000

    const instance = new ToastConstructor({
      el: document.createElement('div')
    })
    instance.message = typeof options === 'string' ? options : options.message
    instance.position = options.position || 'middle'
    instance.className = options.className || ''
    instance.iconClass = options.iconClass || ''

    Vue.nextTick(function() {
      document.body.appendChild(instance.$el)
      instance.visible = true
      setTimeout(function() {
        instance.close()
      }, duration)
    })
    return instance
  }
}

export default Toast
