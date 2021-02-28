<template lang="pug">
  .country_guide_detail
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:codeArr='["21"]' @getCode="codeFn")
    //- .country_guide_detail_t 国别指南 / 国别指南详情
    Breadcrumb.country_guide_detail_t(:breadcrumbArr="breadcrumbArr")
    .country_guide_detail_con
      .detail_title
        .detail_t_flag
          img(:src="national_flag")
        .detail_t_country {{area_name}}
        .detail_t_back(@click="goBack") [切换国家]
        .detail_t_time 最新更新：{{update_time}}
        el-button.detail_btn(@click="goPdfFn") 导出指南
      .detail_tabs
        //- @tab-click="handleClick"
        el-tabs(v-model="activeName")
          el-tab-pane(:label="area_name+'概述'" name="first")
            .tab_frist_main
              .tab_risk_level
                .tab_risk_level_left(v-if="country_score_info.risk_level != undefined")
                  | 风险等级：
                  span {{country_score_info.risk_level}}
                .tab_risk_level_right(v-if="country_score_info.trend != undefined")
                  | 风险趋势：
                  span {{country_score_info.trend}}
              .tab_risk_type
                .tab_risk_type_li(v-if="risk_types")
                  | 主要风险类型：
                  span {{risk_types}}
              .tab_risk_html(v-html="guide_risk_descr")
          el-tab-pane(v-if="risk_data.length > 0" :label="area_name+'风险地图'" name="second")
            .tab_map_main
              myHighchart(ids="my_hightchartID2" :urls="province_list" :maps="risk_data")
              img.tab_map_lengend(src="../static/images/img_map_legend.png")
          el-tab-pane(:label="area_name+'国家公共安全风险'" name="third")
            .tab_d_main(v-html="guide_public_risk")
          el-tab-pane(label="华人风险及规避" name="fourth")
            .tab_d_main(v-html="guide_chinese_risk")
          el-tab-pane(:label="area_name+'重点地区公共安全风险'" name="five")
            .tab_d_main(v-html="guide_key_area_risk")
          el-tab-pane(label="出入境海关规定" name="six")
            .tab_d_main(v-html="guide_border_rule")
          el-tab-pane(label="实用信息" name="seven")
            .tab_d_main(v-html="guide_useful_information")
          el-tab-pane(label="紧急救助卡" name="eight")
            .tab_d_main(v-html="guide_emergency_information")
</template>

<script>
import Nav from "../components/new_top_nav"
import api from "../api/commonApi"
import Breadcrumb from "../components/breadcrumb"
import {formatTimeToStr} from "../api/fomat_time"
import myHighchart from "../components/my_hightchart"
export default {
  name: 'country_guide_detail',
  components: { 
    Nav,
    myHighchart,
    Breadcrumb
  },

  data () {
    return {
      national_flag: '',
      area_name: '',
      update_time: '',
      activeName: 'first',
      guide_key_area_risk: '',
      guide_border_rule: '',
      guide_chinese_risk: '',
      guide_emergency_information: '',
      guide_public_risk: '',
      guide_useful_information: '',
      province_list: '',
      risk_data: '',
      country_score_info: '',
      risk_types: '',
      guide_risk_descr: '',
      breadcrumbArr: [
        { name: '国别指南', path: 'country_guide' },
        { name: '国别指南详情', path: '' }
      ],
      // exportShow: false,
    }
  },
  created() {
    this.detailInfo()
  },
 methods: {
  codeFn(val) {
    if(val.indexOf("21") != -1) {
      // this.exportShow = true
    }
  },
  async detailInfo() {
    var datas = {
      id: this.$route.query.id
    }
    let res = await api.countryInfo(datas)
    const {
      national_flag,
      area_name,
      update_time,
      guide_key_area_risk,
      guide_border_rule,
      guide_emergency_information,
      guide_public_risk,
      guide_useful_information,
      province_list,
      risk_data,
      country_score_info,
      guide_risk_descr,
      guide_chinese_risk
    } = res.info
    this.national_flag = national_flag
    this.area_name = area_name
    this.update_time = formatTimeToStr(update_time*1000)
    this.guide_key_area_risk = guide_key_area_risk
    this.guide_border_rule = guide_border_rule
    this.guide_emergency_information = guide_emergency_information
    this.guide_public_risk = guide_public_risk
    this.guide_chinese_risk = guide_chinese_risk
    this.guide_useful_information = guide_useful_information
    this.province_list = province_list
    if(province_list.features.length == 0) {
      this.risk_data = []
    }else {
      this.risk_data = risk_data
    }
    risk_data.map((item) => {
      item.value = item.score
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
    
    // 判断country_score_info为空的情况
    if(country_score_info != '') {
      this.country_score_info = country_score_info
      country_score_info.risk_top3.map((item) => {
        this.risk_types += item.risk_name+"、"
      })
      this.risk_types = this.risk_types.substr(0,this.risk_types.length-1)
    }
    
    this.guide_risk_descr = guide_risk_descr
  },
  goBack() {
    this.$router.push({path:'/country_guide'})
  },
  goPdfFn() {
    let pdfHref;
    switch(Number(this.$route.query.id)) {
      case 28:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E5%9F%83%E5%8F%8A.pdf"
        break;
      case 31:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E5%8D%B0%E5%BA%A6.pdf"
        break;
      case 30:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E6%B3%B0%E5%9B%BD.pdf"
        break;
      case 24:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E6%9F%AC%E5%9F%94%E5%AF%A8.pdf"
        break;
      case 1:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E5%B7%B4%E5%9F%BA%E6%96%AF%E5%9D%A6.pdf"
        break;
      case 34:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E5%B0%BC%E6%97%A5%E5%88%A9%E4%BA%9A.pdf"
        break;
      case 32:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E5%AE%89%E5%93%A5%E6%8B%89.pdf"
        break;
      case 13:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E6%B3%95%E5%9B%BD.pdf"
        break;
      case 11:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E7%BE%8E%E5%9B%BD.pdf"
        break;
      case 33:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E5%90%89%E5%B0%94%E5%90%89%E6%96%AF%E6%96%AF%E5%9D%A6.pdf"
        break;
      case 25:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E5%A2%A8%E8%A5%BF%E5%93%A5.pdf"
        break;
      case 35:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E5%88%9A%E6%9E%9C%EF%BC%88%E9%87%91%EF%BC%89.pdf"
        break;
      case 36:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E6%BE%B3%E5%A4%A7%E5%88%A9%E4%BA%9A.pdf"
        break;
      case 37:
        pdfHref = "https://yj.ciwei.com/pdf/%E5%9B%BD%E5%88%AB%E6%89%8B%E5%86%8C-%E8%8F%B2%E5%BE%8B%E5%AE%BE.pdf"
        break;
      default:
        break
    } 
    // console.log(pdfHref)
    // this.$router.push({path:'/guide_detail_pdf',query: })
    // let routeData = this.$router.resolve({
    //   path:'/guide_detail_pdf',
    //   query: {id: this.$route.query.id},
    // });
    window.open(pdfHref, '_blank');
  }
 }
}
</script>

<style lang="less" scoped>
.country_guide_detail {
  width: 100%;
  min-height: 100%;
  background: #F4F4F4;
  padding-bottom: 50px;
  .country_guide_detail_t {
    font-size: 14px;
    color: #888888;
    width: 95%;
    margin-left: 2.5%;
    margin-top: 15px;
  }
  .country_guide_detail_con {
    width: 95%;
    min-height: 80vh;
    background: white;
    margin-left: 2.5%;
    margin-top: 20px;
    border-radius: 15px;
    .detail_title {
      display: flex;
      width: 90%;
      height: 6vh;
      margin: auto;
      padding-top: 5vh;
      // background: red;
      .detail_t_flag {
        width: 50px;
        height: 40px;
        margin-top: -4px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .detail_t_country {
        color: #333;
        font-size: 24px;
        font-weight: bold;
        margin-left: 15px;
      }
      .detail_t_back {
        font-size: 16px;
        color: #2888FF;
        margin-left: 10px;
        margin-top: 1vh;
        cursor: pointer;
      }
      .detail_t_time {
        font-size: 14px;
        color: #888888;
        margin-top: 1.5vh;
        margin-left: 15px;
      }
      .detail_btn {
        background: #459BF3;
        border: none;
        color: white;
        height: 5vh;
        margin-left: 20px;
      }
    }
    .detail_tabs {
      width: 90%;
      min-height: 70vh;
      margin: auto;
      margin-top: 2vh;
      padding-bottom: 3vh;
      .tab_map_main {
        position: relative;
        margin-top: 40px;
        .tab_map_lengend {
          position: absolute;
          width: 180px;
          right: 50px;
          bottom: 20px;
        }
      }
      .tab_frist_main {
        width: 100%;
        margin: auto;
        margin-top: 50px;
        .tab_risk_level {
          display: flex;
          width: 100%;
          font-weight: bold;
          .tab_risk_level_left {
            span {
              color: #FF4A1A;
            }
          }
          .tab_risk_level_right {
            margin-left: 120px;
            span {
              color: #F40606;
            }
          }
        }
        .tab_risk_type {
          margin-top: 30px;
          font-weight: bold;
          span {
            color: #950303;
          }
        }
        .tab_risk_html {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
<style>
  .country_guide_detail .el-tabs__item.is-active {
    font-size: 16px;
  }
</style>

