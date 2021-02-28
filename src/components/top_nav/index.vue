<template lang="pug">
  .top_nav
    .top_nav_main
      a(@click="$emit('click')")
        span(class="iconfont iconquanping1")
        |全屏
      router-link(:to="item.path" :class="item.path == nowPath ?'actived':''" v-for="(item,index) in leftArr" :key="index")
        span(:class="item.iconClass")
        |{{item.name}}
</template>

<script>

export default {
  name: 'top_nav',
  props: {
    leftArr: {
      type: Array,
      default: [
        {name: "查看公告", iconClass:'iconfont icongonggao', path: 'notice'},
        {name: "实时预警", iconClass:'iconfont iconyujing', path: 'warning'},
        {name: "安全快讯", iconClass:'iconfont iconkuaixun', path: 'bulletin'}
      ]
    }
  },
  data () {
    return {
      nowPath: this.$route.name,
      // leftArr: [
      //   {name: "查看公告", iconClass:'iconfont icongonggao', path: 'notice'},
      //   {name: "实时预警", iconClass:'iconfont iconyujing', path: 'warning'},
      //   {name: "安全快讯", iconClass:'iconfont iconkuaixun', path: 'bulletin'},
      //   // {name: "突发预警", iconClass:'iconfont icontufashijian', path: 'appear'}
      // ]
    }
  },
  created() {
    // console.log(this.$route)
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  .top_nav {
    float: left;
    width: 100%;
    height: 50px;
    background: white;
    .top_nav_main {
      position: relative;
      width: 840px;
      height: 100%;
      margin: auto;
      text-align: center;
      a {
        float: left;
        display: block;
        width: 210px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &:hover {
          color: white;
          background: #2B74EA;
        }
        span {
          margin-right: 5px;
        }
      }
      .actived {
        color: white;
        background: #2B74EA;
      }
    }
    
  }
</style>
