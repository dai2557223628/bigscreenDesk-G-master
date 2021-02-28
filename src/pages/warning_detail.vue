<template lang="pug">
  .warning_detail
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false" :homeTurn="false")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(title="安全信息" :leftArr="leftList")
      //- .warning_bread 安全信息/预警提醒/详情
      Breadcrumb.warning_bread(:breadcrumbArr="breadcrumbArr")
      .employee_form
        .warning_form_title {{dataInfo.title}}
        .warning_time_box
          .warning_times(v-if="dataInfo.display_time")
            | 发布时间：
            span {{dataInfo.display_time}}
          .warning_source(v-if="dataInfo.source_name") 
            | 来源：
            span {{dataInfo.source_name}}
        .warning_content_con
          Title.title_red(title="刺猬预警" v-if="dataInfo.trend_prediction")
          .warning_content_html(v-if="dataInfo.trend_prediction" v-html="dataInfo.trend_prediction")

          Title.title_orange(title="专家观点" v-if="dataInfo.security_reminder")
          .warning_content_html(v-if="dataInfo.security_reminder" v-html="dataInfo.security_reminder")

          Title.title_bule(title="实用信息" v-if="dataInfo.content")
          .warning_content_html(v-if="dataInfo.content" v-html="dataInfo.content")

        
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import api from "../api/commonApi"
import Title from "../components/titles"
import Breadcrumb from "../components/breadcrumb"
export default {
  name: 'warning_detail',
  components: { 
    Nav,
    leftNav,
    Title,
    Breadcrumb
  },
  data () {
    return {
      title: '', //标题查询
      leftList: [
        {name: "预警提醒", path: 'warning'},
        {name: "单位公告", path: 'notice'},
        {name: "安全快讯", path: 'bulletin'},
        {name: "员工上报", path: 'appear'}
      ],
      breadcrumbArr: [
        { name: '安全信息', path: 'warning' },
        { name: '预警提醒', path: 'warning' },
        { name: '详情', path: '' }
      ],
      dataInfo: ''
    }
  },
  created() {
    this.warningInfoFn()
  },
 methods: {
   async warningInfoFn(id) {
      var datas = {
        id: this.$route.query.id
      }
      let res = await api.warningInfo(datas)
      this.dataInfo = res.info
    },
 }
}
</script>

<style lang="less" scoped>
.warning_detail {
  .employee_bg {
    float: left;
    width: 100%;
    height: auto;
    padding-bottom: 80px;
    background: #EEEEEE;
    .warning_bread {
      float: left;
      font-size: 14px;
      color: #888;
      // text-indent: 60px;
      margin-top: 15px;
      margin-left: 60px;
    }
    .employee_form {
      float: left;
      width: calc(100% - 330px);
      min-height: 650px;
      background: white;
      margin-top: 15px;
      margin-left: 60px;
      border-radius: 10px;
      .warning_form_title {
        text-align: center;
        font-size: 24px;
        color: #333;
        font-weight: bold;
        width: 90%;
        margin: auto;
        margin-top: 40px;
      }
      .warning_time_box {
        display: flex;
        font-size: 14px;
        color: #888;
        margin-top: 20px;
        .warning_times {
          width: 45%;
          text-align: right;
        }
        .warning_source {
          width: 45%;
          margin-left: 10%;
        }
      }
      .warning_content_con {
        width: 100%;
        margin-top: 40px;
        .title_red {
          color: #FF1B1B;
          border-color: #FF1B1B;
        }
        .title_orange {
          color: #F17807;
          border-color: #F17807;
        }
        .title_bule {
          color: #002766;
          border-color: #002766;
        }
        .warning_content_html {
          width: 90%;
          margin: auto;
          color: 14px;
          color: #333;
          margin-top: 10px;
          line-height: 30px;
          padding-bottom: 50px;
        }
      }
    }
  }
}
</style>