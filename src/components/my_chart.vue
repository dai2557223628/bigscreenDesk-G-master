<template lang="pug">
  .my_chart(:id="ids" ref="my_charts")
</template>

<script>
export default {
  name: 'myChart',
  props: {
    ids: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch:{
    options(newVal,oldVal){
      if(newVal){
        this.init()
      }
    }
  },
  data () {
    return {
      
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // console.log(this.options)
      let refName = this.$refs.my_charts
      // this.chart = this.$echarts.init(refName)
      this.chart = this.$echarts.init(document.getElementById(this.ids))
      this.chart.setOption(this.options)
    }
  }
}
</script>

<style lang="less">

</style>
