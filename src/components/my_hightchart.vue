<template lang="pug">
  .my_hightchart(:id="ids")
</template>

<script>
import Highcharts from 'highcharts'
import Highmaps from 'highcharts/modules/map'
Highmaps(Highcharts)
export default {
  name: 'my_hightchart',
  props: {
    maps: {
      type: Array,
      default() {
        return []
      }
    },
    urls: {
      type: Object,
      default() {
        return {}
      }
    },
    ids: {
      type: String,
      default: 'my_hightchartID'
    },
    tooltipShow: {
      type: Boolean,
      default: true
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
      var that = this
      var maps = this.maps
      var map = new Highcharts.Map(this.ids,{
            title: {
                text: ""
            },
            chart: {
                backgroundColor: "#fff"
            },
            tooltip: { enabled: that.tooltipShow },
            // 版权去除
            credits: {
                enabled: false
            },
            colorAxis: {
                min: 1,
                max: 100,
                type: 'logarithmic',
                minColor: '#2087ed',
                maxColor: '#d61d0f',
                stops: [
                  [0, '#2087ed'],
                  [0.5, '#fdc210'],
                  
                  [1, '#d61d0f']
                ],
                // [0.7, '#ff800d'],
                // [0.8, '#ff4a1a'],
                // [0.9, '#d61d0f'],
                reversed: true
            },
            legend: {
                enabled: false,
                layout: 'vertical',
                floating: true,
                align: 'left',
                verticalAlign: 'top',
                width: '100px',
                x: 0,
                y: 140,
            },
            series : [{
                animation: {
                    duration: 1000
                },
                data : maps,
                color: "#143470",
                mapData: that.urls,
                joinBy: ['area_id', 'area_id'],
                dataLabels: {
                    enabled: true,
                    color: 'white',
                    format: '{point.area_name}',
                },
                name: '风险值',
                tooltip: {
                  enabled: false,
                  pointFormat: '{point.area_name}: {point.value}'
                }
            }]
        })
    }
  }
}
</script>

<style lang="less">
  .my_hightchart {
    width: 100%;
    height: 100%;
  }
</style>
