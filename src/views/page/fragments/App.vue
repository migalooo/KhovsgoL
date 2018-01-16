<template>
  <div id="app">
    <span class="info">{{ message }}</span>
    <item></item>
    <div class="hair hairline">
      border
    </div>
    <button @click='show'>点击2</button>
  </div>
</template>

<script>
import Item from "./Item.vue"
export default {
  components: {
    Item
  },
  data () {
    return {
      message: 'hello!'
    }
  },
  methods: {
    show(){
      this.$toast('了一个请求错误')
    }
  }
}
</script>

<style scoped>
  .info{
    width: 100%;
    height: 750px;
    display: block;
    background: #f9f9f9;
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
