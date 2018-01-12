<template>
  <div id="app">
    <span class="info">{{ message }}</span>
    <div class="toast">
      hello
    </div>
    <item></item>
    <div class="hair hairline">
      border
    </div>
    <button @click='b'>点击2</button>
  </div>
</template>

<script>
import Item from "./Item.vue"
import Toast from ">/components/toast/alert.js"
export default {
  components: {
    Item
  },
  data () {
    return {
      message: 'hello!'
    }
  },
  created () {
/**
setTimeout(()=>{
  this.$toast.show({
    text: 'info',
    position: 'bottom'
  })
  console.log('log')
}, 3000)
*/
  },
  methods: {
    b(){
      Toast({
        message : "有位置的设定和时间设定",
        position: 'bottom',
        duration : 1000 })
      console.log('toast')
    }
  }
}
</script>

<style scoped>
  .info{
    width: 100%;
    height: 750px;
    display: block;
    background: #000;
  }  
  .block{
    margin-top: 20px;
    border-radius: 6px !important;
    margin: 20px;
  }
  .hair{
    margin: 20px;
  }
</style>
