<template>
  <transition name="snnu-toast-pop">
  <div class="snnu-toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px 15px' : '20px 15px' }">
    <i class="snnu-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
    <span class="snnu-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
  </div>
  </transition>
</template>

<script type="text/babel">
export default {
  props: {
    message: String,
    className: {
      type: String,
      default: ''
    },
    position: {
      type: String,
      default: 'middle'
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    customClass() {
      var classes = []
      switch (this.position) {
        case 'top':
          classes.push('snnu-toast-top')
          break
        case 'middle':
          classes.push('snnu-toast-middle')
          break
        default:
          classes.push('snnu-toast-bottom')
      }
      classes.push(this.className)
      return classes.join(' ')
    }
  }
}
</script>

<style>
.snnu-toast {
  position: fixed;
  max-width: 80%;
  border-radius: 5px;
  background: rgba(50, 50, 50, .7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  transition: opacity .3s linear;
}
.snnu-toast-icon {
  display: block;
  text-align: center;
  font-size: 40px;
}
.snnu-toast-text {
  font-family: Arial;
  font-size: 30px;
  display: block;
  text-align: center;
}
.snnu-toast-top {
  top: 150px;
  left: 50%;
  transform: translate(-50%, 0);
}
.snnu-toast-middle {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.snnu-toast-bottom {
  bottom: 150px;
  left: 50%;
  transform: translate(-50%, 0);
}
.snnu-toast-pop-enter, .snnu-toast-pop-leave-active{
  opacity: 0;
}
</style>
