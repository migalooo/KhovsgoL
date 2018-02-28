<template>
  <li class="list-items" :data-status="list.status">
    <span class="icon-cricle"></span>
    <span>{{ list.date }}</span>
    <span v-if="list.status === 0">已失效</span>
    <span v-else-if="list.status === 1"><input @click="receiveQuota" type="button" value="领取"></span>
    <span v-else>{{ list.text }}元</span>
  </li>
</template>

<script>
export default {
  props: {
    list: Object
  },
  methods: {
    receiveQuota(e) {
      if (document.querySelector('.throttle')) return
//      this.$emit('toggleThrottle', true)
      window.bus.$emit('showPromprtModal')
    }
  }
}
</script>

<style lang="less" scoped>
.list-items{
  vertical-align: middle;
  text-align: center;
  font-size: 0;
  color: #999;
  &::after{
    content: '';
    clear: both;
    display: block;
  }
  >span{
    display: inline-block;
    line-height: 80px;
    height: 80px;
    float: left;
  }
  span:first-child{
    font-size: 32px;
    margin-left: 5%;
    width: 15%;
    position: relative;
  }
  span:nth-child(2){
    font-size: 32px;
    width: 30%;
    margin-right: 20%;
  }
  span:last-child{
    font-size: 32px;
    width: 30%;
  }
  input{
    width: 60%;
    height: 80%;
    font-size: .32rem;
    color: #fff;
    background: #39f;
    border: 0;
    border-radius: 5px;
    &:focus{
      background: #08f;
    }
  }
}
.list-items:first-child{
  >span:first-child::before{
    height: 50%;
    bottom: 0;
  }
}
.list-items:last-child{
  >span:first-child::before{
    height: 50%;
    top: 0;
  }
}
.list-items:nth-last-child(1):first-child{
  >span:first-child::before{
    display: none;
  }
}
.icon-cricle{
  &::before{
    content: '';
    display: block;
    width: 4px;
    height: 100%;
    background: #8cf;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  &::after{
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 100%;
    transform: translate(-50%,-50%);
  }
}
[data-status="0"]{
  &>.icon-cricle::after{
    width: 21%;
    padding-bottom: 21%;
    border: .05rem solid #aad6ff;
    background: #fff;
  }
  span:last-child{
    color: #ccc;
  }
}
[data-status="1"]{
  &>.icon-cricle::after{
    width: 25%;
    padding-bottom: 25%;
    border: .08rem solid #aad6ff;
    background: #39f;
  }
  span:nth-child(2){
    color: #39f;
  }
}
[data-status="2"]{
  &>.icon-cricle::after{
    width: 21%;
    padding-bottom: 21%;
    border: .05rem solid #aad6ff;
    background: #39f;
  }
  span:last-child{
    color: #F5A623;
  }
}
</style>
