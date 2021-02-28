<template lang="pug">
  .risk_monitor_home
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false")
    .risk_monitor_home_t 风险监测
    .risk_monitor_home_con
      .risk_m_h_li(v-for='(item,index) in countryList' @click="goHomeFn(item.id)")
        span(class="risk_m_h_li_close el-icon-close" @click.stop="doClose(item.id)")
        .risk_m_h_li_t 
          span {{item.area_name}}
          span(class="risk_m_h_li_icon iconfont iconqianjin")
        .risk_m_h_li_main
          .risk_m_h_li_main_li
            .risk_m_h_li_num(:style="{'color': item.score > 90 ? '#d61d0f':item.score > 80 ? '#ff4a1a':item.score > 70 ? '#ff800d':item.score > 50 ? '#fdc210':'#2087ed'}") {{item.score || "--"}}
            .risk_m_h_li_info 风险指数
          .risk_m_h_li_main_li
            .risk_m_h_li_num(:style="{'color': item.score > 90 ? '#d61d0f':item.score > 80 ? '#ff4a1a':item.score > 70 ? '#ff800d':item.score > 50 ? '#fdc210':'#2087ed'}") {{item.score > 90 ? '极高': item.score > 80 ? '高': item.score > 70 ? '较高': item.score > 50 ? '中等':'低'}}
            .risk_m_h_li_info 风险等级
          .risk_m_h_li_main_li
            .risk_m_h_li_num.red_num {{item.rtnotice_count}}
            .risk_m_h_li_info 有效预警
      .risk_m_h_li.special_risk_m_h_li(@click="dialogTurn = true")
        img(src="../static/images/fxjc_icon_add.png")
    Copyright.c_footer
    coverDialog(:dialogShow="dialogTurn" @riskSure="riskSave($event)" @dialogExit="dialogTurn = $event")
</template>

<script>
import Nav from "../components/new_top_nav"
import api from "../api/commonApi"
import coverDialog from "../components/cover_dialog"
import Copyright from "../components/copyright"
export default {
  name: 'risk_monitor_home',
  components: { 
    Nav,
    coverDialog,
    Copyright
  },

  data () {
    return {
      dialogTurn: false,
      countryList: ''
    }
  },
  created() {
    this.listFn()
  },
 methods: {
  async listFn() {
    let res = await api.countryWatchList()
    this.countryList = res.country_list
  },
  async riskSave(value) {
    let res = await api.countryWatchSet({
      country_area_id: value,
      append: 1
    })
    this.$router.push({path:'/risk_monitor',query: {id: value}})
    // this.listFn()
  },
  goHomeFn(ids) {
    this.$router.push({path:'/risk_monitor',query: {id: ids}})
  },
  doClose(value) {
    this.$confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async() => {
      let res = await api.countryWatchSet({
        country_area_id: value,
        append: 2
      })
      this.listFn()
    }).catch(() => {
    });
  }
 }
}
</script>

<style lang="less" scoped>
.risk_monitor_home {
  width: 100%;
  min-height: 100%;
  background: #F4F4F4;
  padding-bottom: 50px;
  .c_footer {
    position: absolute;
    padding-bottom: 0;
    bottom: 0;
  }
  .risk_monitor_home_t {
    font-size: 14px;
    color: #888888;
    width: 95%;
    margin-left: 2.5%;
    margin-top: 15px;
  }
  .risk_monitor_home_con {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    // justify-content: space-around;
    // align-items: baseline;
    align-content: flex-start;
    width: 95%;
    min-height: 80vh;
    background: white;
    margin-left: 2.5%;
    margin-top: 20px;
    border-radius: 15px;
    
    .risk_m_h_li {
      z-index: 10;
      position: relative;
      width: 17%;
      height: 14vh;
      background: #EEEEEE;
      border-radius: 10px;
      margin-top: 4vh;
      margin-left: 2.5%;
      align-self: flex-start;
      cursor: pointer;
      .risk_m_h_li_close {
        z-index: 30;
        position: absolute;
        right: 5px;
        top: 5px;
        font-size: 18px;
        color: #333;
      }
      .risk_m_h_li_t {
        font-size: 18px;
        font-weight: bold;
        color: #333;
        width: 100%;
        margin-top: 2.5vh;
        text-indent: 20px;
        .risk_m_h_li_icon {
          color: #1E79DC;
          margin-left: 2px;
        }
      }
      .risk_m_h_li_main {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        width: 90%;
        height: 6vh;
        margin-top: 1vh;
        margin-left: 5%;
        text-align: center;
        .risk_m_h_li_main_li {
          width: calc(100%/3);
          .risk_m_h_li_num {
            font-size: 19px;
            font-weight: bold;
            color: #2C8DED;
          }
          .red_num {
            color: #FF1D1D;
          }
          .risk_m_h_li_info {
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
    .special_risk_m_h_li {
      text-align: center;
      cursor: pointer;
      img {
        width: 25%;
        margin-top: 10%;
      }
    }
  }
}
</style>
