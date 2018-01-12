<template>
  <div>
    <ul>
      <li v-for="(item,index) in memberList" @click="memberDetail(index)">
        <span>{{item.custName}}</span>
        <span>{{item.age}}</span>
        <span>{{item.joinTime}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  created () {
    console.log('item')
    //就当看作是ajax在初始化进入的时候从后台获取的用户列表数据
    this.memberList = [
      {custName : "ziksang1",age:20,joinTime : "2014-01-02",custId:1},
      {custName : "ziksang2",age:21,joinTime : "2014-01-03",custId:2},
      {custName : "ziksang3",age:22,joinTime : "2014-01-04",custId:3},
      {custName : "ziksang4",age:23,joinTime : "2014-01-05",custId:4},
    ]
  },
  data () {
    return {
      memberList : []
    }
  },
  methods : {
    memberDetail (index) {
      console.log(index)
         }
     }
}
</script>
<style>
ul{
  font-size: 60px;
}
</style>
