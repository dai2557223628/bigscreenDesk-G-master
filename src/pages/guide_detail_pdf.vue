<template lang="pug">
  .guide_detail_pdf(id="pdfDom")
    //- el-button(@click="getPdf()") demo
    .guide_pdf_logo
      img(src="../static/images/img_logo2.png")
    .guide_pdf_title
      //- img(:src="national_flag")
      span {{area_name}}国别指南
    .guide_pdf_time {{update_time}}
    .guide_pdf_con
      .guide_pdf_con_title 一、{{area_name}}概述
      .guide_pdf_risk_level
        .guide_pdf_risk_level_l 
          | 风险等级：
          span {{country_score_info.risk_level}}
        .guide_pdf_risk_level_r 
          | 风险趋势：
          span {{country_score_info.trend}}
      .guide_pdf_risk_level
        | 主要风险类型：
        span.risk_l_types {{risk_types}}
      .guide_pdf_html(v-html="guide_risk_descr")

      .guide_pdf_con_title.margin_tops_50 二、{{area_name}}风险地图
      .guide_pdf_maps(v-if="risk_data")
        myHighchart(ids="my_hightchartID2" :urls="province_list" :maps="risk_data")
        img(src="../static/images/img_map_legend.png")
      .guide_pdf_con_title.margin_tops_50 三、{{area_name}}国家公共安全风险
      .guide_pdf_html(v-html="guide_public_risk")

      .guide_pdf_con_title.margin_tops_50 四、华人风险及规避
      .guide_pdf_html(v-html="guide_chinese_risk")

      .guide_pdf_con_title.margin_tops_50 五、{{area_name}}重点地区公共安全风险
      .guide_pdf_html(v-html="guide_key_area_risk")

      .guide_pdf_con_title.margin_tops_50 六、出入境及海关规定
      .guide_pdf_html(v-html="guide_border_rule")

      .guide_pdf_con_title.margin_tops_50 七、实用信息
      .guide_pdf_html(v-html="guide_useful_information")

      .guide_pdf_con_title.margin_tops_50 八、紧急救助卡
      .guide_pdf_html(v-html="guide_emergency_information")
   
</template>

<script>
import api from "../api/commonApi"
import {formatTimeToStr} from "../api/fomat_time"
import myHighchart from "../components/my_hightchart"
export default {
  name: 'guide_detail_pdf',
  components: { 
    myHighchart
  },

  data () {
    return {
      htmlTitle: '国别指南',
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
      guide_risk_descr: ''
    }
  },
  // watch:{
  //   detailInfo() {
  //     console.log('gggg')
  //     this.$nextTick(()=>{
  //       console.log('dsdsdsdsd')
  //       this.getPdf()
  //     });
  //   }
  // },
  mounted() {
    this.detailInfo()
  },
 methods: {
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
    this.guide_chinese_risk = guide_chinese_risk
    this.guide_emergency_information = guide_emergency_information
    this.guide_public_risk = guide_public_risk
    this.guide_useful_information = guide_useful_information
    this.province_list = province_list
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
    this.risk_data = risk_data
    this.country_score_info = country_score_info
    country_score_info.risk_top3.map((item) => {
      this.risk_types += item.risk_name+"、"
    })
    this.risk_types = this.risk_types.substr(0,this.risk_types.length-1)
    this.guide_risk_descr = guide_risk_descr
    setTimeout(()=> {
      this.getPdf()
      this.$notify.success({
        title: '成功',
        message: '指南下载成功，3秒后将自动跳转回国别指南'
      });
      setTimeout(()=> {
        this.goBack()
      },5000)
    },800)
    
  },
  goBack() {
    this.$router.push({path:'/country_guide'})
  }
 }
}
</script>

<style lang="less" scoped>
.guide_detail_pdf {
  position: relative;
  width: 1100px;
  min-height: 1600px;
  background: white;
  margin: auto;
  padding-bottom: 80px;
  .guide_pdf_logo {
    text-align: center;
    padding-top: 70px;
    img {
      width: 160px;
    }
  }
  .guide_pdf_title {
    text-align: center;
    margin-top: 10px;
    span {
      font-size: 38px;
      font-weight: bold;
      color: #333;
      margin-left: 5px;
    }
  }
  .guide_pdf_time {
    text-align: center;
    margin-top: 5px;
    font-size: 20px;
    // font-weight: 600;
  }
  .guide_pdf_con {
    width: 900px;
    height: auto;
    margin: auto;
    margin-top: 50px;
    .guide_pdf_con_title {
      font-size: 20px;
      color: #333;
      font-weight: bold;
    }
    .margin_tops_50 {
      margin-top: 50px;
    }
    .guide_pdf_risk_level {
      display: flex;
      font-weight: bold;
      font-size: 14px;
      margin-top: 25px;
      .guide_pdf_risk_level_l {
        span {
          color: #FF4A1A;
        }
      }
      .guide_pdf_risk_level_r {
        margin-left: 130px;
        span {
          color: #F40606;
        }
      }
      .risk_l_types {
        color: #950303;
      }
    }
    .guide_pdf_html {
      margin-top: 20px;
    }
    .guide_pdf_maps {
      position: relative;
      margin-top: 20px;
      width: 100%;
      height: 500px;
      img {
        position: absolute;
        right: 0px;
        bottom: 40px;
      }
    }
  }
}
</style>

