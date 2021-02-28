<template lang="pug">
  .home 
    //- (:homeShow="false")
    Nav(:codeArr='["4"]' @getCode="codeFn")
    //- .animate__animated.animate__ease-out.animate__delay-2s.animate__backInUp
    .home_con
      .home_logo
        span(class='iconfont iconshouye') 首页
      .home_con_top
        router-link.home_con_top_li(to="")
          img(src="../static/images/home_icon_company.png")
          count-to(:start-val="0" :end-val="1629" :duration="2800" class="card2_num")
          span.top_unit 家
          span 
            |服务企业数量
            //- i.iconfont.icongengduo
        router-link.home_con_top_li(to="")
          img(src="../static/images/home_icon_peoples.png")
          count-to(:start-val="0" :end-val="3185" :duration="2800" class="card2_num card2_num2")
          span.top_unit 人
          span 
            |服务海外华人数量
            //- i.iconfont.icongengduo
        router-link.home_con_top_li(to="")
          img(src="../static/images/home_icon_country2.png")
          count-to(:start-val="0" :end-val="99" :duration="2800" class="card2_num card2_num3")
          span.top_unit 个
          span 
            |服务覆盖国家
            //- i.iconfont.icongengduo
        router-link.home_con_top_li(to="")
          img(src="../static/images/home_icon_warning.png")
          count-to(:start-val="0" :end-val="461" :duration="2800" class="card2_num card2_num4")
          span.top_unit 条
          span 
            |发出预警数量
            //- i.iconfont.icongengduo
        .middle_box
          .risk_tops
            .middle_box_li
              Title.marginTop20(title="企业风险分布")
              .risk_info
                | 监测中企业
                span 1629
                | 家
              .risk_level
                .risk_level_li
                  .li_num 3
                  span 极高风险
                .risk_level_li
                  .li_num 17
                  span 高风险
                .risk_level_li
                  .li_num 389
                  span 较高风险
                .risk_level_li
                  .li_num 768
                  span 中等
                .risk_level_li
                  .li_num 452
                  span 低风险
            //- riskThreaten(:terroristList="terrorist_list")
            .middle_box_li
              Title.marginTop20(title="近期高风险地区企业")
              .box_table(v-if="risk_demo_arr")
                el-carousel(indicator-position="outside")
                  el-carousel-item(v-for='(item,index) in risk_demo_arr' :key="index")
                    el-table.tables_main(:data="item" style="width: 100%;height: 100%" :header-cell-style="{background:'#F0F2F5',color:'#666666'}" :row-style="{height: '1.8vw'}" :cell-style="{padding:'2px'}")
                      el-table-column(prop="name" label="企业名称" width="100" :show-overflow-tooltip="true")
                      el-table-column(prop="level" label="风险等级" width="80" :show-overflow-tooltip="true")
                      el-table-column(prop="main_risk" label="主要风险" width="80")
                      el-table-column(prop="pelope" label="中方员工" width="80")
                      el-table-column(prop="call_name" label="联系人" width="80")
                      el-table-column(prop="call" label="联系方式" min-width="100" :show-overflow-tooltip="true")
            .middle_box_li
              Title.marginTop20(title="风险地图")
              .middle_box_map
                img(src="../static/images/img_map2.png")
        .last_box
          riskWarning(:warnInfo="warn_info" :rtnoticeList="rtnotice_firstpage" :securityinfoList="securityinfo_firstpage"  @iconOpen="openFn(arguments)" :screenShow="true" :cityShow="false").risk_tops
        Copyright
    coverDialog(:dialogShow="dialogTurn" :dialogShows_safe="dialogTurns" :apiParam="param" @dialogExit="dialogTurn = $event")
</template>
<script>
import Nav from "../components/new_top_nav"
import api from "../api/commonApi"
import CountTo from 'vue-count-to'
import coverDialog from "../components/cover_dialog"
import Copyright from "../components/copyright"
import riskWarning from "../components/risk_warning"
import riskThreaten from "../components/risk_threaten"
import Title from "../components/titles"
export default {
  components: { 
    Nav,
    CountTo,
    coverDialog,
    Copyright,
    riskWarning,
    riskThreaten,
    Title
  },
  name: 'home',
  data () {
    return {
      dialogTurn: false,
      dialogTurns: '',
      param: '',
      // list: [1, 2, 34, 4, 54, 5],
      infoData: '',
      tableData: [
      ],
      code_edit: false,
      warn_info: {},
      rtnotice_firstpage: [],
      securityinfo_firstpage: [],
      risk_demo_arr: [
        [
          {name: '广平国际',level: '高', main_risk: "疾病疫情", pelope: "36", call_name: "冯寒达", call: "+86-18883721726"},
          {name: '三一重工安哥拉分公司',level: '中等', main_risk: "社会治安", pelope: "21", call_name: "廉林康", call: "+86-18229116890"},
          {name: '明珠科技',level: '中等', main_risk: "疾病疫情", pelope: "11", call_name: "朱华凯", call: "+86-17623245117"},
          {name: '中联重科巴基斯坦分公司',level: '中等', main_risk: "政治风险", pelope: "39", call_name: "彭晓坚", call: "+86-15730707234"},
          {name: '中建五局潇湘印度公司',level: '中等', main_risk: "疾病疫情", pelope: "48", call_name: "贺伟贤", call: "+86-15580292214"}
        ],
        [
          {name: '新华国际生物公司',level: '中等', main_risk: "疾病疫情", pelope: "15", call_name: "俞伟英", call: "+86-18390092567"},
          {name: '建工集团',level: '中等', main_risk: "社会治安", pelope: "16", call_name: "郑龙世", call: "+86-18890495273"},
        ]
        
      ]
    }
  },
  created() {
    // this.listFn()
    this.dataInitFn()
  },
  // 更新事件
  updated() {
    
  },
  methods: {
    async listFn() {
      let res = await api.newBoardInfo()
      this.infoData = res.info
      // 兼容quick_lunch为null
      if(this.infoData.quick_lunch == null) {
        this.infoData.quick_lunch = []
      }
    },
    openFn(e) {
      console.log(e)
      this.dialogTurn = e[0]
      this.dialogTurns = e[2]
      if(e[3]) {
        this.param = e[3]
      }
    },
    async dataInitFn() {
      let res = await api.countryInfoSwt()
      const {
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
      } = res.info.area_info
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
    },
    // listGoOut(name) {
    //   switch(name) {
    //     case "预警提醒":
    //       this.$router.push({path:'/warning'})
    //       break;
    //     case "单位公告":
    //       this.$router.push({path:'/notice'})
    //       break;
    //     case "员工上报":
    //       this.$router.push({path:'/appear'})
    //       break;
    //     case "安全快讯":
    //       this.$router.push({path:'/bulletin'})
    //       break;
    //     case "生成简报":
    //       this.$router.push({path:'/create_report'})
    //       break;
    //     case "简报列表":
    //       this.$router.push({path:'/report'})
    //       break;
    //     default:
          
    //   } 
    // },
    codeFn(val) {
      val.map(item=> {
        if(item == "4") {
          this.code_edit = true
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .home {
    // position: relative;
    display: inline-block;
    // min-height: 120%;
    width: 100%;
    background: #eee;
    padding-bottom: 30px;
    .home_con {
      z-index: 1;
      position: relative;
      width: calc(100% - 80px);
      height: calc(100% - 110px);
      margin: 10px auto;
      .home_logo {
        color: #888888;
        font-size: 14px;
        margin-bottom: 10px;
      }
      .home_con_top {
        height: 14vh;
        width: 100%;
        .home_con_top_li {
          position: relative;
          float: left;
          width: 24%;
          height: 100%;
          border-radius: .5vw;
          background: white;
          margin-left: calc(4% / 3);
          overflow: hidden;
          &:nth-child(1) {
            margin-left: 0;
          }
          img {
            z-index: 55;
            position: absolute;
            bottom: -20%;
            right: -5%;
            width: 40%;
          }
          .card2_num {
            z-index: 88;
            position: relative;
            display: inline-block;
            font-size: 2vw;
            color: #3172FF;
            font-weight: bold;
            margin-top: 8%;
            margin-left: 50px;
          }
          .card2_num2 {
            color: #3172FF;
          }
          .card2_num3 {
            color: #3172FF;
          }
          .card2_num4 {
            color: #E32727;
          }
          span {
            z-index: 88;
            position: relative;
            display: block;
            font-size: 1vw;
            color: #666666;
            margin-top: 2%;
            margin-left: 50px;
            i {
              font-size: .8vw;
              margin-left: .1vw;
            }
          }
          .top_unit {
            display: inline;
            margin-left: 10px;
          }
        }
        .home_con_top_num {
          z-index: 88;
          position: relative;
          float: left;
          width: 14.5%;
          height: 100%;
          background: white;
          border-radius: .5vw;
          margin-left: 1%;
          text-align: center;
          overflow: hidden;
          img {
            z-index: 55;
            position: absolute;
            bottom: -20%;
            right: -5%;
            width: 45%;
          }
          .card2_num {
            z-index: 88;
            position: relative;
            display: inline-block;
            font-size: 1.5vw;
            color: #FF7316;
            font-weight: bold;
            margin-top: 12%;
          }
          span {
            z-index: 88;
            position: relative;
            display: block;
            font-size: .8vw;
            color: #333;
            margin-top: 2%;
            i {
              font-size: .8vw;
              margin-left: .1vw;
            }
          }
        }
        .home_con_top_right {
          position: relative;
          float: right;
          width: 31%;
          height: 100%;
          background: white;
          border-radius: .5vw;
          overflow: hidden;
          img {
            z-index: 55;
            position: absolute;
            bottom: -22%;
            right: -3.5%;
            width: 23%;
          }
          .home_con_right_title {
            color: #333;
            font-size: .8vw;
            text-indent: 3%;
            padding-top: 2%;
          }
          .home_con_right_con {
            z-index: 88;
            position: relative;
            width: 94%;
            height: 65%;
            top: 4%;
            margin: auto;
            .home_con_right_list {
              float: left;
              width: calc(100%/3);
              height: 100%;
              text-align: center;
              color: #D61D0F;
              .home_right_list_num {
                font-size: 1vw;
              }
              .home_right_list_name {
                font-size: 1.15vw;
                font-weight: bold;
                margin-top: 2%;
                line-height: 120%;
              }
            }
          }
        }
      }
      .middle_box {
        display: flex;
        width: 100%;
        height: 19vw;
        .risk_tops {
          display: flex;
          width: 100%;
          height: 90%;
          margin-top: 25px;
          justify-content: space-between;
          .middle_box_li {
            width: 32.4%;
            height: 100%;
            background: white;
            border-radius: 15px;
            .middle_box_map {
              width: 90%;
              height: 75%;
              margin: 1vw auto;
              img {
                width: 100%;
              }
            }
            .box_table {
              width: 100%;
              height: 80%;
              overflow: hidden;
              .el-carousel{
                width: 90%;
                margin: auto;
                margin-top: 1vw;
                overflow: hidden;
                // background: red;
              }
            }
            .marginTop20 {
              margin-top: 15px;
            }
            .risk_info {
              width: 80%;
              color: #666666;
              margin: 2vw auto;
              span {
                color: #2087ED;
                font-size: 2vw;
                font-weight: bold;
                margin: 0 10px;
              }
            }
            .risk_level {
              display: flex;
              width: 80%;
              margin: auto;
              margin-top: 3vw;
              .risk_level_li {
                width: 20%;
                text-align: center;
                .li_num {
                  font-size: 1.6vw;
                  font-weight: bold;
                  // text-decoration: underline;
                }
                span {
                  font-size: .7vw;
                }
                &:nth-child(1) {
                  color: #D61C0F;
                }
                &:nth-child(2) {
                  color: #FF4A1A;
                }
                &:nth-child(3) {
                  color: #FF800D;
                }
                &:nth-child(4) {
                  color: #FDC210;
                }
                &:nth-child(5) {
                  color: #2087ED;
                }
              }
            }
          }
        }
      }
      .last_box {
        display: flex;
        width: 100%;
        height: 345px;
        margin-bottom: 50px;
        .risk_tops {
          margin-top: 25px;
        }
      }
      .home_con_waring {
        display: flex;
        float: left;
        width: 100%;
        height: 100px;
        background: white;
        border-radius: 10px;
        margin: 20px 0;
        line-height: 100px;
        .home_con_icon {
          width: 45px;
          height: 45px;
          margin-left: 30px;
          margin-top: 30px;
        }
        .home_con_waring_font {
          font-size: 18px;
          color: #333;
          font-weight: bold;
          margin-left: 30px;
        }
      }
      
      .home_con_bottom {
        display: flex;
        width: 100%;
        height: 640px;
        padding-bottom: 50px;
        .home_con_bo_left {
          width: 35%;
          height: 100%;
          border-radius: 10px;
          background: white;
          .home_con_bo_left_li {
            display: flex;
            height: 160px;
            width: 100%;
            border-bottom: 1px solid #EEEEEE;
            .home_con_l_font {
              width: 40%;
              height: 100%;
              margin-left: 15%;
              .home_con_l_font_num {
                font-size: 42px;
                font-weight: bold;
                color: #3172FF;
                margin-top: 35px;
              }
              .home_con_l_font_info {
                color: #666666;
                font-size: 18px;
              }
            }
            .home_con_l_pic {
              width: 30%;
              height: 100%;
              margin-left: 10%;
              text-align: center;
              img {
                width: 55%;
                padding-top: 40px;
              }
            }
          }
        }
        .home_con_bo_right {
          width: 63%;
          height: 100%;
          background: white;
          margin-left: 2%;
          border-radius: 10px;
          .home_con_bo_right_con {
            width: 90%;
            height: 90%;
            margin: auto;
            margin-top: 5%;
            .home_con_bo_right_title {
              width: 100%;
              height: 28px;
              font-size: 20px;
              color: #333;
              font-weight: bold;
              text-indent: 15px;
              border-left: 6px solid #333;
            }
            .home_con_list_box {
              display: flex;
              width: 90%;
              height: 120px;
              margin-top: 30px;
              .home_con_list_box_li {
                width: calc(100%/6);
                height: 100%;
                text-align: center;
                img {
                  width: 60%;
                }
                p {
                  font-size: 18px;
                  color: #333333;
                  font-weight: bold;
                  margin-top: 5px;
                }
              }
            }
            .home_con_list_con {
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;
              flex-direction: row;
              // justify-content: space-around;
              // align-items: baseline;
              align-content: flex-start;
              width: 100%;
              height: 60%;
              margin-top: 20px;
              .home_con_list_con_li {
                width: 13%;
                height: 63px;
                border-radius: 6px;
                margin-top: 25px;
                margin-left: 1.5%;
                background: #E8EFFF;
                font-size: 18px;
                color: #3172FF;
                font-weight: 400;
                line-height: 63px;
                text-align: center;
                cursor: pointer;
                &:nth-child(7n+1) {
                  margin-left: 0;
                }
              }
              .special_home_li {
                background: #E6E6E6;
                cursor: pointer;
                img {
                  width: 4vh;
                  margin-top: 1.5vh;
                }
              }
            }
          }
        }
      }
    }
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
  
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
  
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
</style>
<style>
  .home .el-carousel {
    width: 90%;
  }
  .home .el-table .caret-wrapper {
    width: 3px;
  }
  .home .el-table .sort-caret {
    border-width: 4px;
  }
  .home .el-table .sort-caret.descending {
    bottom: 9px;
  }
  .home .el-table .sort-caret.ascending {
    top: 7px;
  }
  .home .el-input__inner {
    height: 30px;
  }
  .home .el-input__icon {
    line-height: 30px;
  }
  .home .el-button {
    padding: 7px 10px;
  }
  .home .el-carousel__item {
    background-color: transparent !important;
  }
  /* .home .el-carousel__indicators--vertical {
    display: none;
  } */
  .home .el-carousel__indicators--outside {
    position: absolute;
    bottom: 15%;
    left: 48%;
  }
  .home .el-carousel__button {
    border-radius: 90px;
    width: 5px;
    height: 5px;
  }
  .box_table .el-carousel {
    width: 90%;
    margin: auto;
    margin-top: 1vw;
    overflow: hidden;
  } 
</style>

