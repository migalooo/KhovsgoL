<template>
  <div id="app">
    <div class="title">
      <h1>剩余额度</h1>
      <div>
        <span>{{ animationAccount | commaFormat }}</span><span>元</span>
      </div>
      <div>转账到卡的转账金额小于额度，不收取手续费</div>
    </div>
    <div class="card">
      <header>
        <h2>任务提额锦囊</h2>
      </header>
      <span @click="showIntroduceModal " class="icon-introduce"></span>
      <div :class="{ 'throttle': isThrottle }" id="icons_warp" class="card-body">
        <Icon-Items
           @toggleThrottle="toggleClass"
           v-for="icon in icons"
           :icon="icon"
           :key="icon.id">
        </Icon-Items>
      </div>
    </div>
    <div class="card">
      <header>
        <h2>每日提额锦囊</h2>
      </header>
      <div class="card-body">
        <ul :class="{ 'throttle': isThrottle }">
          <List-Items
           @toggleThrottle="toggleClass"
           v-for="list in lists"
           :list="list"
           :key="list.id">
          </List-Items>
        </ul>
      </div>
    </div>
    <button @click='show'>Toast</button>
  </div>
</template>

<script>
import IconItems from "./Icon-Items.vue"
import ListItems from "./List-Items.vue"
export default {
  components: {
    IconItems,
    ListItems
  },
  data () {
    return {
      icons: [
        {id: 0, type: 'business2', count: 3, text: '扫码锦囊×'},
        {id: 1, type: 'business3', count: 2, text: '充话费锦囊×'},
        {id: 2, type: 'business4', count: 0, text: '定期转账锦囊×'}
      ],
      lists: [
        {id: 0, status: 0, text: '', date: '今天'},
        {id: 1, status: 1, text: '', date: '11月13日'},
        {id: 2, status: 2, text: '10', date: '10月18日'},
        {id: 1, status: 1, text: '', date: '11月13日'},
        {id: 0, status: 0, text: '', date: '今天'},
        {id: 2, status: 2, text: '10', date: '10月18日'},
        {id: 0, status: 0, text: '', date: '今天'},
      ],
      account: 0,
      animationAccount: 0,
      isThrottle: false,
    }
  },
  watch: {
    account: function(newVal, oldVal) {
      if (newVal === oldVal) return
      const vm = this
      let t = 0, b = oldVal, c = newVal, d = 50
      function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t*t + b
        return c / 2*((t -= 2) * t * t + 2) + b
      }
      function animate() {
        vm.animationAccount = easeInOut(t, b, c, d).toFixed(0)
        t++
        if (t <= d) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }
  },
  filters: {
    commaFormat: function (number) {
      return  number.toString().replace(/\d(?=(\d{3})+$)/g, '$&,')
    }
  },
  methods: {
    toggleClass(msg) {
      this.isThrottle = msg
    },
    showIntroduceModal(msg) {
      window.bus.$emit('showIntroduceModal')
    },
    show(){
      this.account = 10001500
      this.$toast('Message Toast')
      window.bus.$emit('showPromprtModal')
    }
  },
  beforeMount: function() {
    this.animationAccount = 5000
  }
}
</script>

<style lang="less" scoped>
#app{
  font-family: Arial;
  background: url(/images/body-bg.svg) 0 -120px no-repeat #0450ca;
  min-height: 100vh;
}
.title{
  text-align: center;
  color: #fff;
  h1:first-child{
    font-size: 32px;
    padding: 100px 0 20px;
  }
  div:nth-child(2){
    font-family: DIN-webfont;
    font-size: 100px;
    span:last-child{
      font-size: 40px;
    }
  }
  div:last-child{
    font-size: 28px;
    opacity: .7;
    padding: 40px 0 20px;
  }
}

.card{
  position: relative;
  margin: 70px 30px 0;
  box-shadow: 0 35px 30px rgba(0, 0, 0, .2);
  header{
    position: absolute;
    top: -22px;
    background: url(/images/card-header.svg) center no-repeat;
    width: 100%;
    height: 100px;
    text-align: center;
    h2{
      width: 100%;
      font-size: 32px;
      color: #fff;
      padding-top: 28px;
    }
  }
  .icon-introduce{
    position: absolute;
    width: 80px;
    height: 70px;
    right: 0;
    top: 0;
    background: url(/images/exclamation-icon.svg) center no-repeat;
  }
  .card-body{
    background: #fff;
    padding: 80px 0 40px;
    border-radius: 8px;
    box-shadow: 0 18px #1D68DD;
    display: flex;
    justify-content: center;
    ul{
      width: 100%;
    }
  }
}
</style>
