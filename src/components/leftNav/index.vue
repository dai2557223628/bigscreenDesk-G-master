<template lang="pug">
  .leftNav
    router-link(:to="item.path" :class="item.path == nowPath ?'actived':''" v-for="(item,index) in leftTurn ? leftArr:leftArr2" :key="index")
      span(:class="item.iconClass")
      |{{item.name}}
</template>

<script>

export default {
  name: 'leftNav',
  props: {
    leftTurn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      nowPath: this.$route.name,
      leftArr: [
        {name: "查看公告", iconClass:'iconfont icongonggao', path: 'notice'},
        {name: "实时预警", iconClass:'iconfont iconyujing', path: 'warning'},
        {name: "安全快讯", iconClass:'iconfont iconkuaixun', path: 'bulletin'},
        {name: "员工上报信息", iconClass:'iconfont iconyuangong', path: 'appear'}
      ],
      leftArr2: [
        {name: "生成简报", iconClass:'iconfont iconshengchengjianbao', path: 'create_report'},
        {name: "简报列表", iconClass:'iconfont iconjianbaoliebiao', path: 'report'},
      ]
    }
  },
  created() {
    // console.log(this.leftTurn)
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  .leftNav {
    float: left;
    width: 210px;
    height: calc(85vh);
    // min-height: 600px;
    // min-height: 830px;
    // height: 100%;
    background: white;
    a {
      display: block;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-indent: 15px;
      font-size: 16px;
      color: #333;
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
</style>
