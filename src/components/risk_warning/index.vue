<template lang="pug">
  .risk_warning
    .risk_warning_con
      .risk_warning_left
        Title(title="风险预警")
        .risk_warning_l_main
          .risk_warning_l_m_top
            .risk_w_l_t_title
              .risk_w_l_t_t_info 生效中的预警
              .risk_w_l_t_t_num(@click="iconFn(1,'activeVal')") {{warnInfo.rtnotice_total_count}}
            .risk_w_l_t_right
              .risk_w_l_t_right_li
                .risk_w_l_t_r_li_num(@click="warnInfo.rtnotice_veryhign_count != 0 ?iconFn(1,'极高'):''") {{warnInfo.rtnotice_veryhign_count}}
                .risk_w_l_t_r_li_info 极高
              .risk_w_l_t_right_li
                .risk_w_l_t_r_li_num(@click="warnInfo.rtnotice_high_count != 0 ? iconFn(1,'高'):''") {{warnInfo.rtnotice_high_count}}
                .risk_w_l_t_r_li_info 高
              .risk_w_l_t_right_li
                .risk_w_l_t_r_li_num(@click="warnInfo.rtnotice_mid_count != 0 ?iconFn(1,'中等'):''") {{warnInfo.rtnotice_mid_count}}
                .risk_w_l_t_r_li_info 中等
          .risk_warning_l_m_bottom
            .risk_w_l_b_title
              span 新发生安全事件
              .risk_p_m_t_tab
                .risk_p_m_t_tab_li(:class="tabsIndex == 1?'risk_p_m_t_tab_li_active':''" @click="riskMtabs(1)") 近一周
                .risk_p_m_t_tab_li(:class="tabsIndex == 2?'risk_p_m_t_tab_li_active':''" @click="riskMtabs(2)") 近一个月
            .risk_w_l_b_left
              .risk_w_l_b_l_box(v-if="tabsIndex == 1")
                .risk_w_l_b_l_float {{warnInfo.securityinfo_week_couont_increase}}
                .risk_w_l_b_l_num(@click="iconFn(2,'week')") {{warnInfo.securityinfo_week_couont}}
              .risk_w_l_b_l_box(v-else-if="tabsIndex == 2")
                .risk_w_l_b_l_float {{warnInfo.securityinfo_month_count_increase}}
                .risk_w_l_b_l_num(@click="iconFn(2,'month')") {{warnInfo.securityinfo_month_count}}
            .risk_w_l_b_right
              my-chart(:options="myOptions" ids="charts_highggg" style="width:100%;height:75%")
      .risk_warning_middle
        span.iconfont.iconquanping1(v-if="screenShow" @click="iconFn(1,'noactive')")
        Title(title="实时预警" :lineTurn="false")
        .risk_w_m_main
          articleLi(v-for="(item,index) in rtnoticeList" :cityShow="cityShow" :datas="item" routers="warning_detail" :key="index+10" :nodashed="index == 4 ? true:false")
      .risk_warning_right
        span.iconfont.iconquanping1(v-if="screenShow" @click="iconFn(2,'noday')")
        Title(title="安全快讯" :lineTurn="false")
        .risk_w_r_main
          articleLi(v-for="(item,index) in securityinfoList" :cityShow="cityShow" :datas="item" routers="bulletin_detail" :key="index" :nodashed="index == 4 ? true:false")
</template>

<script>
import Title from "../titles"
import myChart from "../my_chart"
import articleLi from "../article_li"
export default {
  name: 'risk_warning',
  components: { 
    Title,
    myChart,
    articleLi
  },
  props: {
    warnInfo: {
      type: Object,
      default:()=> {}
    },
    rtnoticeList: {
      type: Array,
      default:()=> []
    },
    securityinfoList: {
      type: Array,
      default:()=> []
    },
    screenShow: {
      type: Boolean,
      default: true
    },
    cityShow: {
      type: Boolean,
      default: true
    },
  },
  watch:{
    warnInfo(newVal,oldVal){
      if(newVal){
        this.echartInit()
      }
    }
  },
  data () {
    return { 
      tabsIndex: 1,
      myOptions: {},
      mainChartdata: '',
    }
  },
  created() {
    this.mapInit()
    this.circleMapInit()
  },
  methods: {
    echartInit() {
      this.mainChartdata = this.warnInfo.securityinfo_week_chart
      this.mapInit()
    },
    mapInit() {
      let datasX = []
      let datasY = []
      this.mainChartdata.map((item)=> {
        datasX.push(item.date)
        datasY.push(item.count)
      })
      this.myOptions = {
         grid: {
            top: '5%',
            bottom: '25%',
            left: "10%",
            right: "15%"
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
          series: [
              {
                  name: '安全事件',
                  data: datasY,
                  type: 'line',
                  itemStyle : { 
                    normal : { 
                      color:'#5B8FF9'
                    }, //改变折线点的颜色
                    lineStyle:{ 
                      color:'#5B8FF9' //改变折线颜色
                    }
                  }
              }
          ]
      };
    },
    riskMtabs(index) {
      this.tabsIndex = index
      if(index == 1) {
        this.mainChartdata = this.warnInfo.securityinfo_week_chart
        this.mapInit()
      }else {
        this.mainChartdata = this.warnInfo.securityinfo_month_chart
        this.mapInit()
      }
    },
    // 实时预警 - 打开弹窗
    iconFn(index,name) {
      if(index == 1) {
        this.$emit("iconOpen",true,false,'warning_detail',name)
      }else {
        this.$emit("iconOpen",true,true,'bulletin_detail',name)
      }
      
    },

  }
}
</script>

<style lang="less" scoped>
  .risk_warning {
    width: 100%;
    height: 320px;
    background: white;
    border-radius: 15px;
    .risk_warning_con {
      width: 100%;
      height: 90%;
      margin-top: 1%;
      .risk_warning_left {
        float: left;
        position: relative;
        width: 33%;
        height: 100%;
        border-right: 1px solid #EEEEEE;
        .risk_warning_l_main {
          width: 90%;
          height: 88%;
          margin: auto;
          margin-top: 3%;
          .risk_warning_l_m_top {
            display: flex;
            width: 100%;
            height: 30%;
            .risk_w_l_t_title {
              width: 30%;
              height: 100%;
              color: #FF1B1B;
              text-align: center;
              font-weight: bold;
              .risk_w_l_t_t_info {
                font-size: 16px;
              }
              .risk_w_l_t_t_num {
                margin-top: 10px;
                font-size: 26px;
                cursor: pointer;
                text-decoration: underline;
              }
            }
            .risk_w_l_t_right {
              display: flex;
              width: 60%;
              height: 100%;
              margin-left: 10%;
              .risk_w_l_t_right_li {
                width: calc(100%/3);
                text-align: center;
                cursor: pointer;
                .risk_w_l_t_r_li_num {
                  font-size: 20px;
                  font-weight: bold;
                  text-decoration: underline;
                  margin-top: 25px;
                }
                .risk_w_l_t_r_li_info {
                  font-size: 12px;
                }
                &:nth-child(1) {
                  color: #D61C0F;
                }
                &:nth-child(2) {
                  color: #FF4A1A;
                }
                 &:nth-child(3) {
                  color: #FDC210;
                }
              }
            }
          }
          .risk_warning_l_m_bottom {
            width: 100%;
            height: 65%;
            margin-top: 5%;
            .risk_w_l_b_title {
              width: 90%;
              height: 20px;
              line-height: 20px;
              span {
                color: #323E90;
                font-weight: bold;
                font-size: 16px;
              }
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
            .risk_w_l_b_left {
              float: left;
              width: 25%;
              height: 80%;
              margin-top: 3%;
              .risk_w_l_b_l_box {
                position: relative;
                width: 70%;
                height: 60%;
                margin: auto;
                margin-top: 10%;
                text-align: center;
                .risk_w_l_b_l_num {
                  text-decoration: underline;
                  font-size: 26px;
                  color: #333;
                  padding-top: 20px;
                  cursor: pointer;
                }
                .risk_w_l_b_l_float {
                  position: absolute;
                  right: 0px;
                  top: 5px;
                  color: #FF1B1B;
                  font-size: 16px;
                }
              }
            }
            .risk_w_l_b_right {
              float: left;
              width: 70%;
              height: 70%;
              margin-left: 5%;
              margin-top: 5%;
            }
          }
        }
      }
      .risk_warning_middle {
        position: relative;
        float: left;
        width: 33%;
        height: 100%;
        // background: red;
        border-right: 1px dashed #eee;
        .iconfont {
          position: absolute;
          top: 0px;
          right: 20px;
          font-size: 20px;
          color: #888;
          cursor: pointer;
        }
        .risk_w_m_main {
          width: 90%;
          height: 90%;
          margin: auto;
          margin-top: 2%;
          // background: #323E90;
        }
      }
      .risk_warning_right {
        position: relative;
        float: left;
        width: 33%;
        height: 100%;
        .iconfont {
          position: absolute;
          top: 0px;
          right: 20px;
          font-size: 20px;
          color: #888;
          cursor: pointer;
        }
        .risk_w_r_main {
          width: 90%;
          height: 90%;
          margin: auto;
          margin-top: 2%;
        }
      }
    }
  }
</style>
