import toast from './source.vue'

const Toast = {}

Toast.install = function (Vue) {
  const ToastConstructor = Vue.extend(toast)

  const removeDom = function(event) {
    const warp = event.target.parentNode
    if (warp) warp.removeChild(event.target)
  }

  ToastConstructor.prototype.close = function() {
    this.visible = false
    this.$el.addEventListener('transitionend', removeDom)
  }

  Vue.prototype.$toast = function (options) {
    if (typeof options === 'string') options = {message: options}
    const duration = options.duration || 2000

    const instance = new ToastConstructor({
      el: document.createElement('div')
    })
    instance.message = typeof options === 'string' ? options : options.message
    instance.position = options.position || 'bottom'
    instance.className = options.className || ''
    instance.iconClass = options.iconClass || ''
    document.body.appendChild(instance.$el)

    Vue.nextTick(function() {
      instance.visible = true
      setTimeout(function() {
        instance.close()
      }, duration)
    })
    return instance
  }
}

export default Toast
