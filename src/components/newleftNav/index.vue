<template lang="pug">
  .newleftNav
    .new_left_title {{title}}
    router-link(:to="{path:item.path, query:{id: item.id}}" :class="item.id == '' ? item.path == nowPath ?'actived':'': nowID ? (item.path == nowPath) && (Number(item.id) == Number(nowID)) ?'actived':'': (item.path == nowPath) ?'actived':''" v-for="(item,index) in leftArr" :key="index")
      | {{item.name}}
</template>

<script>
import api from '../../api/commonApi'
export default {
  name: 'newleftNav',
  props: {
    title: {
      default: "安全咨询"
    },
    leftArr: {
      type: Array,
      default: ()=> [
        {name: "预警提醒", path: 'warning'},
        // {name: "安全公告", path: 'notice'},
        {name: "安全快讯", path: 'bulletin'},
        // {name: "员工上报", path: 'appear'}
      ]
    }
  },
  watch: {
	  leftArr (to, from) { //监听路由是否变化
      this.nowID = this.$route.query.id
	  }
  },
  data () {
    return {
      nowPath: this.$route.name,
      nowID: this.$route.query.id
    }
  },
  created() {
    // this.infoInit()
    // console.log(this.leftTurn)
  },
  methods: {
    async infoInit() {
      let res = await api.myInfo()
      const { rightcode_arr } = res.info
      // 预警提醒 - 权限判断
      if(rightcode_arr.indexOf("11") == -1) {
        this.leftArr = [
          {name: "单位公告", path: 'notice'},
          {name: "安全快讯", path: 'bulletin'},
          {name: "员工上报", path: 'appear'}
        ]
      }
      // 单位公告 - 权限判断
      if(rightcode_arr.indexOf("12") == -1) {
        this.leftArr = [
          {name: "预警提醒", path: 'warning'},
          {name: "安全快讯", path: 'bulletin'},
          {name: "员工上报", path: 'appear'}
        ]
      }
      // 安全快讯 - 权限判断
      if(rightcode_arr.indexOf("13") == -1) {
        this.leftArr = [
          {name: "预警提醒", path: 'warning'},
          {name: "单位公告", path: 'notice'},
          {name: "员工上报", path: 'appear'}
        ]
      }
      // 员工上报 - 权限判断
      if(rightcode_arr.indexOf("14") == -1) {
        this.leftArr = [
          {name: "预警提醒", path: 'warning'},
          {name: "单位公告", path: 'notice'},
          {name: "安全快讯", path: 'bulletin'}
        ]
      }

      // 生成简报 - 权限判断
      if(rightcode_arr.indexOf("15") == -1) {
        this.leftArr = [
          {name: "简报列表", path: 'report'},
        ]
      }

      // 简报列表 - 权限判断
      if(rightcode_arr.indexOf("17") == -1) {
        this.leftArr = [
          {name: "生成简报", path: 'create_report'}
        ]
      }
      
    },
  }
}
</script>

<style lang="less" scoped>
  .newleftNav {
    float: left;
    width: 210px;
    height: calc(90vh);
    background: white;
    text-align: center;
    .new_left_title {
      font-size: 22px;
      color: #303133;
      line-height: 50px;
      font-weight: bold;
      border-bottom: 1px solid #eee;
    }
    a {
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      // text-indent: 15px;
      font-size: 16px;
      color: #333;
      &:hover {
        color: white;
        background: #2B74EA;
      }
      span {
        // margin-right: 5px;
      }
    }
    .actived {
      color: white;
      background: #2B74EA;
    }
  }
</style>
