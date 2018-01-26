<template>
  <div id="app">
    <span class="info">{{ message }}</span>
    <item></item>
    <button @click='show'>Toast</button>
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
      this.$toast('Message Toast')
      window.bus.$emit('showPromprtModal')
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
