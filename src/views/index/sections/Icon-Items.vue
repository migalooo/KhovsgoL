<template>
  <div @click="increaseLimit" :class="[icon.count ? '' : 'disabled', 'icon-items']" :data-type="icon.type">
    <div>
      <span>{{ icon.text }}</span><span>{{ icon.count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: Object
  },
  methods: {
    increaseLimit(e) {
      if (document.querySelector('.throttle') || !this.icon.count ) return
      //this.$emit('toggleThrottle', true)
      window.bus.$emit('showPromprtModal')
    }
  }
}
</script>

<style lang="less" scoped>
.icon-items{
  position: relative;
  width: 30%;
  height: 200px;
  font-size: 22px;
  padding: 0 6px;
  div{
    position: absolute;
    text-align: center;
    width: 100%;
    bottom: 40px;
  }
  &.disabled{
    opacity: .3;
  }
}
[data-type="business2"]{
  background: url(/images/row1-qrcode-icon.svg) center no-repeat;
  color: #8e3700;;
}
[data-type="business3"]{
  background: url(/images/row2-charge-icon.svg) center no-repeat;
  color: #a20000;
}
[data-type="business4"]{
  background: url(/images/row3-transfer-icon.svg) center no-repeat;
  color: #004163;
}
</style>
