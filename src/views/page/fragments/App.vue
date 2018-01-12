<template>
  <div>
    <span class="info">{{ message }}</span>
    <div class="block">
      hello
    </div>
    <div class="hair hairline">
      border
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'hello!'
    }
  },
  created () {
    setTimeout(()=>{
      this.$toast({
        message: 'hello'
      })
      console.log('log')
    }, 3000)
    this.message = 'bye!'
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
