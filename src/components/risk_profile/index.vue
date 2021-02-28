<template lang="pug">
  .risk_profile
    .risk_profile_con
      .risk_profile_left
        Title
        .risk_p_l_main
          .risk_p_l_main_li
            .risk_p_l_main_li_t(:style="{'color': profileObj.score > 90 ? '#d61d0f':profileObj.score > 80 ? '#ff4a1a':profileObj.score > 70 ? '#ff800d':profileObj.score > 50 ? '#fdc210':'#2087ed'}") {{profileObj.score > 90 ? '极高': profileObj.score > 80 ? '高': profileObj.score > 70 ? '较高': profileObj.score > 50 ? '中等':'低'}}
            .risk_p_l_main_info 当前风险等级
          .risk_p_l_main_li
            .risk_p_l_main_li_t(v-if="profileObj.trend =='上升'" style="color: #ff4a1a") {{profileObj.trend}}
            .risk_p_l_main_li_t(v-else-if="profileObj.trend =='平'" style="color: #fdc210") {{profileObj.trend}}
            .risk_p_l_main_li_t(v-else="profileObj.trend =='平'" style="color: #2087ed") {{profileObj.trend}}
            .risk_p_l_main_info 当前风险趋势
          .risk_p_l_main_li
            .risk_p_l_main_li_t(:style="{'color': profileObj.score > 90 ? '#d61d0f':profileObj.score > 80 ? '#ff4a1a':profileObj.score > 70 ? '#ff800d':profileObj.score > 50 ? '#fdc210':'#2087ed'}") {{profileObj.score || '--'}}
            .risk_p_l_main_info 当前风险指数
          .risk_p_l_main_li
            .risk_p_l_main_li_t(:style="{'color': profileObj.chinese_score > 90 ? '#d61d0f':profileObj.chinese_score > 80 ? '#ff4a1a':profileObj.chinese_score > 70 ? '#ff800d':profileObj.chinese_score > 50 ? '#fdc210':'#2087ed'}") {{profileObj.chinese_score || '--'}}
            .risk_p_l_main_info 当前华人风险指数
      .risk_profile_middle
        .risk_profile_m_t 
          span 总风险指数趋势
          .risk_p_m_t_tab
            .risk_p_m_t_tab_li(:class="tabsIndex == 1?'risk_p_m_t_tab_li_active':''" @click="riskMtabs(1)") 近一周
            .risk_p_m_t_tab_li(:class="tabsIndex == 2?'risk_p_m_t_tab_li_active':''" @click="riskMtabs(2)") 近一个月
        .risk_profile_m_map(v-if="mainChartdata.length > 0")
          my-chart(:options="myOptions" ids="charts_high" style="width:100%;height:100%")
      .risk_profile_right
        .right_open_btn(@click="displayTurn")
          span 查看各风险类型趋势
          i.iconfont.iconzhankai(v-if='!moreShow')
          i.iconfont.iconshouqi(v-else)
        Title(title="实时风险指数分布" :lineTurn="false")
        .risk_profile_r_map
          my-chart(:options="myCircleOptions" ids="charts_circle" style="width:100%;height:100%")
    .risk_more(v-if='moreShow')
      .risk_more_con
        .risk_more_map(v-for='(item,index) in riskChart' :key="index")
          my-chart(:options="item.options" :ids="'charts_high'+index" style="width:100%;height:80%")
          p {{item.risk_name}}
</template>

<script>
import Title from "../titles"
import myChart from "../my_chart"
export default {
  name: 'risk_profile',
  components: { 
    Title,
    myChart
  },
  props: {
    profileObj: {
      type: Object,
      default: ()=> {}
    },
    mainChartWeek: {
      type: Array,
      default: ()=> []
    },
    mainChartMonth: {
      type: Array,
      default: ()=> []
    },
    riskChartRt: {
      type: Array,
      default: ()=> []
    },
    riskChart: {
      type: Array,
      default: ()=> []
    },
  },
  watch:{
    mainChartWeek(newVal,oldVal){
      if(newVal){
        this.echartInit()
      }
    }
  },
  data () {
    return { 
      tabsIndex: 1,
      myOptions: {},
      myCircleOptions: {},
      moreShow: false,
      mainChartdata: '',
      myListOptions: {}
    }
  },
  created() {
  },
  methods: {
    displayTurn() {
      this.moreShow = !this.moreShow
      if(this.moreShow) {
        this.listOptionsFn()
      }
    },
    echartInit() {
      this.mainChartdata = this.mainChartWeek
      this.mapInit()
    },
    mapInit() {
      let datasX = []
      let datasY = []
      this.mainChartdata.map((item)=> {
        datasX.push(item.date)
        datasY.push(item.score)
      })

      this.myOptions = {
         grid: {
            top: '5%',
            bottom: '15%',
            left: "10%",
            right: "5%"
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLine: {  //这是x轴文字颜色
                  show: false,
                  lineStyle: {
                      color: "#888888",
                      fontSize: "14px",
                  }
              },
              axisTick:{
                show:false//不显示坐标轴刻度线
              },
              data: datasX
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value}'
              },
              axisTick:{
                show:false//不显示坐标轴刻度线
              },
              axisLine: { 
                  show: false,
                  lineStyle: {
                      color: "#888888",
                      fontSize: "14px",
                  }
              },
              axisPointer: {
                  snap: true
              }
          },
          visualMap: {
              show: false,
              // dimension: 0,
              pieces: [{
                gt: 0,
                lte: 50,
                color: '#2087ed'
            }, {
                gt: 50,
                lte: 70,
                color: '#fdc210'
            }, {
                gt: 70,
                lte: 80,
                color: '#ff800d'
            }, {
                gt: 80,
                lte: 90,
                color: '#ff4a1a'
            }, {
                gt: 90,
                lte: 100,
                color: '#d61d0f'
            }],
            outOfRange: {
                color: '#999'
            }
          },
          series: [
              {
                  name: '风险趋势',
                  data: datasY,
                  type: 'line'
              }
          ]
      };
      let circleData = []
      let circleDataX = []
      this.riskChartRt.map((item)=> {
        circleData.push({name:item.risk_name,max: 100})
        circleDataX.push(Number(item.score))
      })
      this.myCircleOptions = {
        // color: ["rgba(0,183,238, 1)", "rgba(86,199,60, 1)"],
        tooltip: {
            show: true,
            trigger: "item",
            // extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
        },
        radar: {
            center: ["50%", "50%"],
            radius: "70%",
            startAngle: 90,
            splitNumber: 4,
            // shape: "circle",
            splitArea: {
                areaStyle: {
                    color: ["transparent"]
                }
            },
            axisLabel: {
                show: false,
                fontSize: 20,
                color: "#000",
                fontStyle: "normal",
                fontWeight: "normal"
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "#e6e6e6"
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: "#e6e6e6"
                }
            },
            name: {
                formatter: '{value}',
                textStyle: {
                  color: '#333'  
                },
            },
            indicator: circleData
        },

        series: [{
            name: "实时风险指数分布",
            type: "radar",
            symbol: "circle",
            symbolSize:9,
            areaStyle: {
                normal: {
                    color: '#F95B5B'
                }
            },
            itemStyle: {
                color: '#FF1818',
                borderColor: '#fff',
                borderWidth: 2,
            },
            lineStyle: {
                normal: {
                    color: "#FF1818",
                    width: 2
                }
            },
            data: [
              {
                value: circleDataX
              }
            ]
        }]
      }
    },

    listOptionsFn() {
      let datasX = []
      let datasY = []
      this.riskChart.map((item,index)=> {
        this.$set(item.data,'dataX',[])
        this.$set(item.data,'dataY',[])
        item.data.week.map((items)=> {
          item.data.dataX.push(items.date)
          item.data.dataY.push(items.score)
        })
        this.$set(this.riskChart[index],'options',{
         grid: {
            top: '5%',
            bottom: '15%',
            left: "10%",
            right: "5%"
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLine: {  //这是x轴文字颜色
                  show: false,
                  lineStyle: {
                      color: "#888888",
                      fontSize: "14px",
                  }
              },
              axisTick:{
                show:false//不显示坐标轴刻度线
              },
              data: item.data.dataX
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value}'
              },
              axisTick:{
                show:false//不显示坐标轴刻度线
              },
              axisLine: { 
                  show: false,
                  lineStyle: {
                      color: "#888888",
                      fontSize: "14px",
                  }
              },
              axisPointer: {
                snap: true
              },
              max: 100
          },
          visualMap: {
              show: false,
              // dimension: 0,
              pieces: [{
                gt: 0,
                lte: 50,
                color: '#2087ed'
            }, {
                gt: 50,
                lte: 70,
                color: '#fdc210'
            }, {
                gt: 70,
                lte: 80,
                color: '#ff800d'
            }, {
                gt: 80,
                lte: 90,
                color: '#ff4a1a'
            }, {
                gt: 90,
                lte: 100,
                color: '#d61d0f'
            }],
            outOfRange: {
                color: '#999'
            }
          },
          series: [
              {
                  name: item.risk_name,
                  data: item.data.dataY,
                  type: 'line'
              }
          ]
      })
      })
      console.log(this.riskChart)
      // this.myListOptions = {
      //    grid: {
      //       top: '5%',
      //       bottom: '15%',
      //       left: "10%",
      //       right: "5%"
      //     },
      //     tooltip: {
      //         trigger: 'axis',
      //         axisPointer: {
      //             type: 'cross'
      //         }
      //     },
      //     xAxis: {
      //         type: 'category',
      //         boundaryGap: false,
      //         axisLine: {  //这是x轴文字颜色
      //             show: false,
      //             lineStyle: {
      //                 color: "#888888",
      //                 fontSize: "14px",
      //             }
      //         },
      //         axisTick:{
      //           show:false//不显示坐标轴刻度线
      //         },
      //         data: datasX
      //     },
      //     yAxis: {
      //         type: 'value',
      //         axisLabel: {
      //             formatter: '{value}'
      //         },
      //         axisTick:{
      //           show:false//不显示坐标轴刻度线
      //         },
      //         axisLine: { 
      //             show: false,
      //             lineStyle: {
      //                 color: "#888888",
      //                 fontSize: "14px",
      //             }
      //         },
      //         axisPointer: {
      //             snap: true
      //         }
      //     },
      //     visualMap: {
      //         show: false,
      //         // dimension: 0,
      //         pieces: [{
      //           gt: 0,
      //           lte: 50,
      //           color: '#2087ed'
      //       }, {
      //           gt: 50,
      //           lte: 70,
      //           color: '#fdc210'
      //       }, {
      //           gt: 70,
      //           lte: 80,
      //           color: '#ff800d'
      //       }, {
      //           gt: 80,
      //           lte: 90,
      //           color: '#ff4a1a'
      //       }, {
      //           gt: 90,
      //           lte: 100,
      //           color: '#d61d0f'
      //       }],
      //       outOfRange: {
      //           color: '#999'
      //       }
      //     },
      //     series: [
      //         {
      //             name: '风险趋势',
      //             data: datasY,
      //             type: 'line'
      //         }
      //     ]
      // }
    },

    listOptionsFn2() {
      let datasX = []
      let datasY = []
      this.riskChart.map((item,index)=> {
        this.$set(item.data,'dataX',[])
        this.$set(item.data,'dataY',[])
        item.data.month.map((items)=> {
          item.data.dataX.push(items.date)
          item.data.dataY.push(items.score)
        })
        this.$set(this.riskChart[index],'options',{
         grid: {
            top: '5%',
            bottom: '15%',
            left: "10%",
            right: "5%"
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross'
              }
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLine: {  //这是x轴文字颜色
                  show: false,
                  lineStyle: {
                      color: "#888888",
                      fontSize: "14px",
                  }
              },
              axisTick:{
                show:false//不显示坐标轴刻度线
              },
              data: item.data.dataX
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value}'
              },
              axisTick:{
                show:false//不显示坐标轴刻度线
              },
              axisLine: { 
                  show: false,
                  lineStyle: {
                      color: "#888888",
                      fontSize: "14px",
                  }
              },
              axisPointer: {
                snap: true
              },
              max: 100
          },
          visualMap: {
              show: false,
              // dimension: 0,
              pieces: [{
                gt: 0,
                lte: 50,
                color: '#2087ed'
            }, {
                gt: 50,
                lte: 70,
                color: '#fdc210'
            }, {
                gt: 70,
                lte: 80,
                color: '#ff800d'
            }, {
                gt: 80,
                lte: 90,
                color: '#ff4a1a'
            }, {
                gt: 90,
                lte: 100,
                color: '#d61d0f'
            }],
            outOfRange: {
                color: '#999'
            }
          },
          series: [
              {
                  name: item.risk_name,
                  data: item.data.dataY,
                  type: 'line'
              }
          ]
      })
      })
    },

    riskMtabs(index) {
      this.tabsIndex = index
      if(index == 1) {
        this.mainChartdata = this.mainChartWeek
        this.mapInit()
        this.listOptionsFn()
      }else {
        this.mainChartdata = this.mainChartMonth
        this.mapInit()
        this.listOptionsFn2()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .risk_profile {
    width: 100%;
    min-height: 260px;
    background: white;
    border-radius: 15px;
    .risk_profile_con {
      width: 100%;
      height: 250px;
      margin-top: 1%;
      .risk_profile_left {
        float: left;
        position: relative;
        width: 33%;
        height: 100%;
        border-right: 1px solid #EEEEEE;
        .risk_p_l_main {
          width: 70%;
          height: 70%;
          margin-left: 12%;
          margin-top: 8%;
          .risk_p_l_main_li {
            float: left;
            width: 50%;
            height: 50%;
            text-align: center;
            .risk_p_l_main_li_t {
              color: #2087ED;
              font-size: 24px;
              font-weight: bold;
            }
            .risk_p_l_main_info {
              color: #666666;
              font-size: 12px;
            }
          }
        }
      }
      .risk_profile_middle {
        float: left;
        width: 32%;
        height: 100%;
        .risk_profile_m_t {
          width: 90%;
          margin-left: 5%;
          font-size: 16px;
          font-weight: bold;
          color: #323E90;
          .risk_p_m_t_tab {
            display: inline-block;
            width: 100px;
            height: 100%;
            margin-left: 15px;
            font-weight: normal;
            .risk_p_m_t_tab_li {
              float: left;
              width: 48%;
              font-size: 12px;
              color: #666;
              cursor: pointer;
              &:nth-child(1) {
                width: 45%;
                border-right: 1px solid #999;
              }
              &:nth-child(2) {
                width: 54%;
                text-align: right;
              }
            }
            .risk_p_m_t_tab_li_active {
              color: #0088FF;
              font-weight: bold;
            }
          }
        }
        .risk_profile_m_map {
          width: 95%;
          height: 84%;
          margin-left: 5%;
          margin-top: 3%;
        }
      }
      .risk_profile_right {
        position: relative;
        float: right;
        width: 33%;
        height: 100%;
        .right_open_btn {
          position: absolute;
          width: 20px;
          height: 200px;
          font-size: 12px;
          color: white;
          border-radius: 5px 0 0 5px;
          right: 0;
          top: 20px;
          background: #1E79DC;
          text-align: center;
          cursor: pointer;
          span {
            display: inline-block;
            padding-top: 7px;
          }
          i {
            font-size: 12px;
          }
        }
        .risk_profile_r_map {
          width: 80%;
          height: 84%;
          // background: pink;
          margin-left: 5%;
          margin-top: 3%;
        }
      }
    }
    .risk_more {
      // float: left;
      width: 100%;
      height: 400px;
      padding-bottom: 50px;
      border-top: 1px solid #EEEEEE;
      .risk_more_con {
        // display: flex;
        // flex-wrap: wrap;
        width: 98%;
        height: 95%;
        margin: auto;
        margin-top: 1%;
        .risk_more_map {
          float: left;
          width: 24%;
          height: 230px;
          margin-left: 1%;
        }
        p {
          font-size: 16px;
          color: #333;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
</style>
