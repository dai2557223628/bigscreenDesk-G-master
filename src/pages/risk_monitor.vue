<template lang="pug">
  .risk_monitor
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav
    .risk_monitor_top
      .risk_monitor_top_font 
        | 风险监测
        span [{{area_name}}
        span(class="iconfont iconfanhui" @click="goback") ]
      .risk_monitor_loacl_time 北京时间：{{beijing_time}}
      .risk_monitor_now_time 当地时间：{{local_time}}
      .risk_btns
        el-button.seting_btn(@click="dialogSet") 设置
        el-button.layout_btn(@click="goLayout") 布局
    .risk_monitor_con
      component(:is="item.model" v-for="item in layout_select" :key="item.id" 
        :class="item.id == 1 ? 'risk_tops':item.id == 2?'risk_middle_left':item.id == 3?'risk_middle_right':item.id == 4?'risk_tops':item.id == 5?'risk_middle_left':''" 
        :profileObj="item.id == 1 ? profileObj:''" :riskChart="item.id == 1 ? risk_chart:''" :riskChartRt="item.id == 1 ?risk_chart_rt:''" :mainChartWeek="item.id == 1 ?main_chart.week:''" :mainChartMonth="item.id == 1 ?main_chart.month:''"
        :province_list="item.id == 2?province_map_list:''" :risk_data="item.id == 2?province_risk_data:''" @iconMapOpen="item.id == 2?openFn(arguments):''"
        :projectInfo="item.id == 3?projectObj:''" :terroristList="item.id == 3?terrorist_list:''" @iconProOpen="item.id == 3?openFn(arguments):''" @iconCampOpen="item.id == 3?openFn(arguments):''" @iconEmployeeOpen="item.id == 3?openFn(arguments):''"
        :warnInfo="item.id == 4?warn_info:''" :rtnoticeList="item.id == 4?rtnotice_firstpage:''" :securityinfoList="item.id == 4?securityinfo_firstpage:''" @iconOpen="item.id == 4?openFn(arguments):''"
        )
      //- :terroristList="item.id == 5?terrorist_list:''"
      //- riskProfile.risk_tops(:profileObj="profileObj" :riskChart="risk_chart" :riskChartRt="risk_chart_rt" :mainChartWeek="main_chart.week" :mainChartMonth="main_chart.month")
      //- riskMap(:province_list="province_map_list" :risk_data="province_risk_data").risk_middle_left
      //- riskProject(:projectInfo="projectObj" :campRiskList="camp_risk_list").risk_middle_right
      //- riskWarning(:warnInfo="warn_info" :rtnoticeList="rtnotice_firstpage" :securityinfoList="securityinfo_firstpage" @iconOpen="openFn(arguments)").risk_tops
      //- riskThreaten(:terroristList="terrorist_list").risk_middle_left
    coverDialog(:dialogShow="dialogTurn" @riskSure="riskSave($event)" :dialogShows_safe="dialogTurns" :apiParam="param" @dialogExit="dialogTurn = $event" :province_list="province_map_list" :risk_data="province_risk_data")
</template>

<script>
import Nav from "../components/new_top_nav"
import riskProfile from "../components/risk_profile"
import riskMap from "../components/risk_map"
import riskProject from "../components/risk_project"
import riskWarning from "../components/risk_warning"
import riskThreaten from "../components/risk_threaten"
import api from "../api/commonApi"
import vuedraggable from 'vuedraggable'
import coverDialog from "../components/cover_dialog"
export default {
  name: 'risk_monitor',
  components: { 
    Nav,
    coverDialog,
    vuedraggable,
    riskProfile,
    riskMap,
    riskProject,
    riskWarning,
    riskThreaten
  },
  // watch: {
	//   '$route' (to, from) { //监听路由是否变化
	// 	  if(to.query.id != from.query.id){
  //       this.infoFn()
	// 	  }
	//   }
  // },
  data () {
    return {
      layout_select: [],
      selectList: [
        { name: '风险概况', id: 1, model: 'riskProfile' },
        { name: '风险地图', id: 2, model: 'riskMap' },
        { name: '项目风险监测', id: 3, model: 'riskProject' },
        { name: '风险预警', id: 4, model: 'riskWarning' },
        // { name: '主要威胁势力(恐怖主义)', id: 5, model: 'riskThreaten' },
      ],
      dialogTurn: false,
      dialogTurns: '',
      area_name: '',
      profileObj: {},
      projectObj: {},
      main_chart: '',
      risk_chart_rt: '',
      risk_chart: '',
      province_map_list: '',
      province_risk_data: '',
      camp_risk_list: '',
      warn_info: {},
      rtnotice_firstpage: [],
      securityinfo_firstpage: [],
      terrorist_list: [],
      param: '',
      local_time: '',
      beijing_time: ''
    }
  },
  created() {
    this.infoFn()
    this.memberInfo()
  },
  methods: {
    goback() {
      this.$router.push({path:'/risk_monitor_home'})
    },
    riskSave(value) {
      this.dialogTurn = false
      this.$router.push({path:'/risk_monitor',query: {id: value}})
      location.reload()
    },
    dialogSet() {
      this.dialogTurn = true
      this.dialogTurns = 'settings'
    },
    goLayout() {
      this.$router.push({path:'/risk_monitor_layout',query: {id: this.$route.query.id}})
    },
    openFn(e) {
      this.dialogTurn = e[0]
      this.dialogTurns = e[2]
      if(e[3]) {
        this.param = e[3]
      }
    },
    async infoFn() {
      let res = await api.riskCountryInfo(
        {area_id: this.$route.query.id}
      )
      const {
        area_name,
        score,
        trend,
        chinese_score,
        main_chart,
        risk_chart_rt,
        risk_chart,
        province_map_list,
        province_risk_data,
        camp_count,
        employee_count,
        project_count,
        employee_local_count,
        employee_cn_count,
        employee_ab_count,
        project_risk_level_count,
        camp_risk_level_count,
        camp_risk_list,
        rtnotice_high_count,
        rtnotice_mid_count,
        rtnotice_total_count,
        rtnotice_veryhign_count,
        securityinfo_month_count,
        securityinfo_month_count_increase,
        securityinfo_week_couont,
        securityinfo_week_couont_increase,
        securityinfo_week_chart,
        securityinfo_month_chart,
        rtnotice_firstpage,
        securityinfo_firstpage,
        terrorist_list,
        beijing_time,
        local_time
      } = res.info.area_info
      this.area_name = area_name

      // 风险概况数据封装
      this.$set(this.profileObj,'score',score)
      this.$set(this.profileObj,'trend',trend)
      this.$set(this.profileObj,'chinese_score',chinese_score)

      this.main_chart = main_chart
      this.risk_chart_rt = risk_chart_rt
      this.risk_chart = risk_chart
      this.province_map_list = province_map_list
      province_risk_data.map((item) => {
        item.value = item.score || 0
        if(item.value > 90) {
          item.color = "#d61d0f"
        }else if(item.value > 80) {
          item.color = "#ff4a1a"
        }else if(item.value > 70) {
          item.color = "#ff800d"
        }else if(item.value > 50) {
          item.color = "#fdc210"
        }else if(item.value == 1){
          item.color = "#e6d7c1"
        }else {
          item.color = "#2087ed"
        }
      })
      this.province_risk_data = province_risk_data

      // 项目风险监测数据封装
      this.$set(this.projectObj,'camp_count',camp_count)
      this.$set(this.projectObj,'employee_count',employee_count)
      this.$set(this.projectObj,'project_count',project_count)
      this.$set(this.projectObj,'employee_local_count',employee_local_count)
      this.$set(this.projectObj,'employee_cn_count',employee_cn_count)
      this.$set(this.projectObj,'employee_ab_count',employee_ab_count)
      this.$set(this.projectObj,'project_risk_level_count',project_risk_level_count)
      this.$set(this.projectObj,'camp_risk_level_count',camp_risk_level_count)

      this.camp_risk_list = camp_risk_list

      // 风险预警数据
      this.$set(this.warn_info,'rtnotice_high_count',rtnotice_high_count)
      this.$set(this.warn_info,'rtnotice_mid_count',rtnotice_mid_count)
      this.$set(this.warn_info,'rtnotice_veryhign_count',rtnotice_veryhign_count)
      this.$set(this.warn_info,'rtnotice_total_count',rtnotice_total_count)
      this.$set(this.warn_info,'securityinfo_month_count',securityinfo_month_count)
      this.$set(this.warn_info,'securityinfo_month_count_increase',securityinfo_month_count_increase)
      this.$set(this.warn_info,'securityinfo_week_couont_increase',securityinfo_week_couont_increase)
      this.$set(this.warn_info,'securityinfo_week_couont',securityinfo_week_couont)
      this.$set(this.warn_info,'securityinfo_month_chart',securityinfo_month_chart)
      this.$set(this.warn_info,'securityinfo_week_chart',securityinfo_week_chart)


      this.rtnotice_firstpage = rtnotice_firstpage
      this.securityinfo_firstpage = securityinfo_firstpage

      this.terrorist_list = terrorist_list
      this.beijing_time = beijing_time
      this.local_time = local_time
      console.log(res)
    },
    async memberInfo() {
      let res = await api.myInfo()
      const difference = (a, b) => {
        const s = new Set(b);
        return a.filter(x => !s.has(x));
      };
      this.selectedIds = res.info.risk_country_info_layout.split(",")
      if(this.selectedIds.length > 1) {
        this.selectedIds.map((item)=> {
          this.layout_select.push(this.selectList[item-1])
        })
      }else {
        this.layout_select = this.selectList
      }
    },
  }
}
</script>

<style lang="less" scoped>
.risk_monitor {
  width: 100%;
  min-height: 100%;
  background: #F4F4F4;
  padding-bottom: 50px;
  .risk_monitor_top {
    display: flex;
    width: 95%;
    height: 90px;
    border-radius: 14px;
    background: white;
    margin: auto;
    line-height: 90px;
    margin-top: 50px;
    .risk_monitor_top_font {
      font-size: 22px;
      color: #333333;
      font-weight: bold;
      margin-left: 25px;
      span {
        color: #1E79DC;
        margin-left: 10px;
      }
      .iconfont {
        cursor: pointer;
      }
    }
    .risk_monitor_loacl_time,.risk_monitor_now_time {
      font-size: 12px;
      color: #888;
      margin-left: 5px;
    }
    .risk_monitor_now_time {
      margin-left: 10px;
    }
    .risk_btns {
      margin-left: auto;
      margin-right: 30px;
      .seting_btn,.layout_btn {
        width: 70px;
        height: 32px;
        line-height: 7px;
        color: white;
        background: #409EFF;
        margin-top: 30px;
        text-align: right;
      }
      .layout_btn {
        margin-left: 25px;
      }
    }
  }
  .risk_monitor_select {
    display: flex;
    width: 95%;
    height: 180px;
    border-radius: 14px;
    background: white;
    margin: auto;
    margin-top: 50px;
    
    .risk_monitor_s_left {
      width: 45%;
      height: 100%;
      border-right: 1px solid #EEEEEE;
    }
    .risk_monitor_s_right {
      width: 45%;
      height: 100%;
    }
    .risk_s_left_title {
      width: 92%;
      font-size: 18px;
      color: #333;
      font-weight: bold;
      margin: auto;
      padding-top: 20px;
    }
    .risk_s_pubilc_con {
      width: 92%;
      height: 60%;
      margin: auto;
      margin-top: 10px;
      .home_dia_selected {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        .home_dia_selected_li {
          position: relative;
          padding: 7px 30px;
          min-width: 40px;
          margin-left: 20px;
          background: #EEEEEE;
          border-radius: 4px;
          margin-top: 15px;
          font-size: 14px;
          color: #333;
          .select_icon {
            position: absolute;
            top: 3px;
            right: 3px;
            color: #888;
            cursor: pointer;
          }
        }
        .home_dia_select_li {
          background: #D8E5FF;
          color: #3172FF;
          padding: 5px 20px;
          cursor: pointer;
          i {
            padding-right: 1px;
          }
        }
      }
    }
    .risk_monitor_s_btn {
      width: 10%;
      height: 100%;
      .risk_monitor_s_btn_li {
        width: 100%;
        text-align: center;
        .risk_btn_sure,.risk_btn_back {
          width: 70px;
          height: 32px;
          line-height: 7px;
          color: white;
          background: #409EFF;
          margin-top: 30px;
        }
        .risk_btn_sure {
          margin-top: 50px;
        }
        .risk_btn_back {
          margin-top: 20px;
          background: #BDBDBD;
        }
      }
    }
  }
  .risk_monitor_con {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 95%;
    min-height: 80%;
    background: #F4F4F4;
    margin-left: 2.5%;
    margin-top: 15px;
    align-items: stretch;
    justify-content: space-between;
    .risk_tops {
      // width: 100%;
      // height: 260px;
      // background: pink;
      margin-top: 15px;
    }
    .risk_middle_left {
      // width: 33%;
      // height: 350px;
      // background: yellow;
      margin-top: 15px;
    }
    .risk_middle_right {
      // width: 65%;
      // height: 350px;
      margin-top: 15px;
      // margin-left: 3%;
    }
  }
}
</style>
