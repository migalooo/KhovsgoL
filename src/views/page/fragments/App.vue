<template>
  <div id="app">
    <span class="info">{{ message }}</span>
    <item></item>
    <div class="hair hairline">
      border
    </div>
    <button @click='b'>点击2</button>
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
    b(){
    this.$toast('com')
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
