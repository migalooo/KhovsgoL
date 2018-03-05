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
      <div id="icons_warp" class="card-body">
        <Icon-Items
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
        <div v-if="lists.length === 0" class="data-missing">
          <span>找不到您的记录，请查看网络后重试</span>
        </div>
        <ul v-else>
          <List-Items
           v-for="list in lists"
           :list="list"
           :key="list.id">
          </List-Items>
        </ul>
      </div>
    </div>
    <button @click='show'>提额</button>
  </div>
</template>

<script>
import interceptor from ">/tools/interceptor.js" 
import IconItems from "./Icon-Items.vue"
import ListItems from "./List-Items.vue"

export default {
  components: {
    IconItems,
    ListItems
  },
  data () {
    return {
      account: 0,
      animationAccount: 0,
      icons: [
        {id: 0, type: 'business2', count: 3, text: '扫码锦囊×'},
        {id: 1, type: 'business3', count: 2, text: '充话费锦囊×'},
        {id: 2, type: 'business4', count: 0, text: '定期转账锦囊×'}
      ],
      lists: [
        {id: 0, status: 0, text: '', date: '今天'},
        {id: 1, status: 1, text: '', date: '11月13日'},
        {id: 2, status: 2, text: '10', date: '10月18日'},
  //      {id: 1, status: 1, text: '', date: '11月13日'},
  //      {id: 0, status: 0, text: '', date: '今天'},
  //      {id: 2, status: 2, text: '10', date: '10月18日'},
  //      {id: 0, status: 0, text: '', date: '今天'},
      ],
    }
  },
  filters: {
    commaFormat: function(number) {
      return  number.toString().replace(/\d(?=(\d{3})+$)/g, '$&,')
    }
  },
  methods: {
    showIntroduceModal: function(msg) {
      window.bus.$emit('showIntroduceModal')
    },
    // Prompt Limit API
    show: function(){
      interceptor('api/hello/world', 3000)
        .then((url)=>{
          return this.$http.get(url)
        })
        .then((data)=>{
          console.log(data)
          window.bus.$emit('showSuccessModal', { increasedValue: 100, account: 5100 })
        })
        .catch((err)=>{
          console.log(err)
          this.$toast('网络请求失败')
        })
    }
  },
  watch: {
    account: function(newVal, oldVal) {
      if (oldVal === 0) return this.animationAccount = newVal // initial no animation 
      if (newVal === oldVal) return
      let t = 0, b = oldVal, c = newVal-oldVal, d = 50
      function easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t*t + b
        return c / 2*((t -= 2) * t * t + 2) + b
      }
      const animate = ()=> {
        this.animationAccount = easeInOut(t, b, c, d).toFixed(0)
        t++
        if (t <= d) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }
  },
  mounted: function() {
    // Initial user account value
    this.account = 5000
    // Trigger prompt animation when modal close
    window.bus.$on('startAnimation', (value) => {
      this.account = value
    })
  },
  beforeDestory: function() {
    window.bus.$off('startAnimation')
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
    top: -20px;
    background: url(/images/card-header.svg) center no-repeat;
    width: 100%;
    height: 100px;
    text-align: center;
    h2{
      width: 100%;
      font-size: 32px;
      color: #fff;
      padding-top: 20px;
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
  .data-missing{
    text-align: center;
    font-size: 0;
    margin: .4rem;
    &::before{
      content: '';
      display: block;
      height: 60px;
      background: url(/images/sad-emoji.svg) center no-repeat;
    }
    span:first-child{
      line-height: .8rem;
      font-size: 26px;
      color: #999;
    }
  }
}
</style>
