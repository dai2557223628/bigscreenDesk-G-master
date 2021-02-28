<template lang="pug">
  .title(:class='lineTurn ? "line": ""') {{title}}
</template>

<script>
export default {
  name: 'title',
  props: {
    title: {
      default: '风险概况'
    },
    lineTurn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      
    }
  },
  created() {
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  .title {
    width: 90%;
    height: 20px;
    line-height: 20px;
    color: #323E90;
    font-weight: bold;
    font-size: 16px;
    margin-left: 5%;
  }
  .line {
    border-left: 5px solid #323E90;
    text-indent: 10px;
  }
</style>