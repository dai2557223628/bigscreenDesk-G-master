<template lang="pug">
  .bulletin_detail
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false" :homeTurn="false")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(title="安全信息")
      //- .warning_bread 安全信息/安全快讯/详情
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
          Title.title_bule(title="事件详情" v-if="dataInfo.content")
          .warning_content_html(v-if="dataInfo.content" v-html="dataInfo.content")

          Title.title_bule(title="事件分析与发展趋势" v-if="dataInfo.trend_prediction")
          .warning_content_html(v-if="dataInfo.trend_prediction" v-html="dataInfo.trend_prediction")

          Title.title_bule(title="提醒与建议" v-if="dataInfo.security_reminder")
          .warning_content_html(v-if="dataInfo.security_reminder" v-html="dataInfo.security_reminder")
          .warning_pic_content
            .warning_pic_box_block
              img.warning_pic_box(v-if="dataInfo.logo_url" :src="'https://img1.ciwei.com/'+dataInfo.logo_url")
              p(v-if="dataInfo.logo_url_source") (图片来源：{{dataInfo.logo_url_source}})
            .warning_pic_txt 
              .warning_pic_txt_li
                .warning_pic_txt_li_name
                  | 事发时间：
                  span {{dataInfo.occur_time}}
                .warning_pic_txt_li_name.warning_pic_txt_li_name2
                  | 事发地点：
                  span {{location_list_name}}

              .warning_pic_txt_li
                .warning_pic_txt_li_name
                  | 事发类型：
                  span {{cw_special_class}}
              
              .warning_pic_txt_li
                .warning_pic_txt_li_name(v-if="event_target_list")
                  | 针对目标：
                  span {{event_target_list}}
                .warning_pic_txt_li_name.warning_pic_txt_li_name2(v-if="event_subject_list")
                  | 事件主体：
                  span {{event_subject_list}}
              
              .warning_pic_txt_li.warning_pic_txt_li2(v-if="dataInfo.extend_info.death_count && dataInfo.extend_info.injured_count && dataInfo.extend_info.affected_count && dataInfo.extend_info.infection_count && dataInfo.extend_info.miss_count")
                .warning_pic_txt_li_name
                  | 伤亡统计：
                  span(v-if="dataInfo.extend_info.death_count != 0") {{dataInfo.extend_info.death_count}}人死亡，
                  span(v-if="dataInfo.extend_info.injured_count != 0") {{dataInfo.extend_info.injured_count}}人受伤，
                  span(v-if="dataInfo.extend_info.affected_count != 0") {{dataInfo.extend_info.affected_count}}人受灾,
                  span(v-if="dataInfo.extend_info.infection_count != 0") {{dataInfo.extend_info.infection_count}}人感染，
                  span(v-if="dataInfo.extend_info.miss_count != 0") {{dataInfo.extend_info.miss_count}}人失踪

              .warning_pic_txt_li.warning_pic_txt_li2(v-if="dataInfo.extend_info.cn_death_count && dataInfo.extend_info.cn_injured_count && dataInfo.extend_info.cn_affected_count && dataInfo.extend_info.cn_infection_count && dataInfo.extend_info.cn_miss_count")
                .warning_pic_txt_li_name
                  | 华人伤亡：
                  span(v-if="dataInfo.extend_info.cn_death_count != 0") {{dataInfo.extend_info.cn_death_count}}人死亡，
                  span(v-if="dataInfo.extend_info.cn_injured_count != 0") {{dataInfo.extend_info.cn_injured_count}}人受伤，
                  span(v-if="dataInfo.extend_info.cn_affected_count != 0") {{dataInfo.extend_info.cn_affected_count}}人受灾,
                  span(v-if="dataInfo.extend_info.cn_infection_count != 0") {{dataInfo.extend_info.cn_infection_count}}人感染，
                  span(v-if="dataInfo.extend_info.cn_miss_count != 0") {{dataInfo.extend_info.cn_miss_count}}人失踪
              
              .warning_pic_txt_li
                .warning_txt_li_box_name 风险等级：
                .warning_txt_li_box
                  .warning_txt_li_box_line.box_line1(v-if="dataInfo.extend_info.news_risk_level == 1") 低
                  .warning_txt_li_box_line.box_line2(v-if="dataInfo.extend_info.news_risk_level == 2") 较低
                  .warning_txt_li_box_line.box_line3(v-if="dataInfo.extend_info.news_risk_level == 3") 中等
                  .warning_txt_li_box_line.box_line4(v-if="dataInfo.extend_info.news_risk_level == 4") 高
                  .warning_txt_li_box_line.box_line5(v-if="dataInfo.extend_info.news_risk_level == 5") 极高

              .warning_pic_txt_li
                .warning_txt_li_box_name 事件影响：
                .warning_txt_li_box
                  .warning_txt_li_box_line.box_line1(v-if="dataInfo.extend_info.news_impact_rating == 1") 低
                  .warning_txt_li_box_line.box_line2(v-if="dataInfo.extend_info.news_impact_rating == 2") 较低
                  .warning_txt_li_box_line.box_line3(v-if="dataInfo.extend_info.news_impact_rating == 3") 中等
                  .warning_txt_li_box_line.box_line4(v-if="dataInfo.extend_info.news_impact_rating == 4") 高
                  .warning_txt_li_box_line.box_line5(v-if="dataInfo.extend_info.news_impact_rating == 5") 极高

              .warning_pic_txt_li
                .warning_txt_li_box_name 对中企影响：
                .warning_txt_li_box
                  .warning_txt_li_box_line.box_line1(v-if="dataInfo.extend_info.china_companies_num == 1") 低
                  .warning_txt_li_box_line.box_line2(v-if="dataInfo.extend_info.china_companies_num == 2") 较低
                  .warning_txt_li_box_line.box_line3(v-if="dataInfo.extend_info.china_companies_num == 3") 中等
                  .warning_txt_li_box_line.box_line4(v-if="dataInfo.extend_info.china_companies_num == 4") 高
                  .warning_txt_li_box_line.box_line5(v-if="dataInfo.extend_info.china_companies_num == 5") 极高
              
              .warning_pic_txt_li
                .warning_txt_li_box_name 对华人影响：
                .warning_txt_li_box
                  .warning_txt_li_box_line.box_line1(v-if="dataInfo.extend_info.china_influence_num == 1") 低
                  .warning_txt_li_box_line.box_line2(v-if="dataInfo.extend_info.china_influence_num == 2") 较低
                  .warning_txt_li_box_line.box_line3(v-if="dataInfo.extend_info.china_influence_num == 3") 中等
                  .warning_txt_li_box_line.box_line4(v-if="dataInfo.extend_info.china_influence_num == 4") 高
                  .warning_txt_li_box_line.box_line5(v-if="dataInfo.extend_info.china_influence_num == 5") 极高
          .title_viewpoint(v-if="dataInfo.cw_news_viewpoint")
            span.iconfont.iconzhuanjiajiedu
            | 专家解读    
          .warning_content_html(v-if="dataInfo.cw_news_viewpoint" v-html="dataInfo.cw_news_viewpoint")    

  
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import api from "../api/commonApi"
import Title from "../components/titles"
import Breadcrumb from "../components/breadcrumb"
export default {
  name: 'bulletin_detail',
  components: { 
    Nav,
    leftNav,
    Title,
    Breadcrumb
  },
  data () {
    return {
      title: '', //标题查询
      dataInfo: '',
      location_list_name: '',
      cw_special_class: '',
      event_subject_list: '',
      event_target_list: '',
      breadcrumbArr: [
        { name: '安全信息', path: 'warning' },
        { name: '安全快讯', path: 'bulletin' },
        { name: '详情', path: '' }
      ],
    }
  },
  created() {
    this.bulletinInfoFn()
  },
 methods: {
   async bulletinInfoFn(id) {
      var datas = {
        id: this.$route.query.id
      }
      let res = await api.bulletinInfo(datas)
      this.dataInfo = res.info
      console.log(this.dataInfo.extend_info)
      // 事发地点拼接
      this.dataInfo.location_list.map(item=> {
        this.location_list_name = item.country_name + '、'
      })
      this.location_list_name = this.location_list_name.substr(0, this.location_list_name.length - 1)

      // 事发类型拼接
      this.dataInfo.cw_special_class.map(item=> {
        this.cw_special_class = item.classname + '、'
      })
      this.cw_special_class = this.cw_special_class.substr(0, this.cw_special_class.length - 1)

      // 事件主体拼接
      this.dataInfo.event_subject_list.map(item=> {
        this.event_subject_list = item.classname + '、'
      })
      this.event_subject_list = this.event_subject_list.substr(0, this.event_subject_list.length - 1)
    
      // 针对目标拼接
      this.dataInfo.event_target_list.map(item=> {
        this.event_target_list = item.classname + '、'
      })
      this.event_target_list = this.event_target_list.substr(0, this.event_target_list.length - 1)
    },
 }
}
</script>

<style lang="less" scoped>
.bulletin_detail {
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
        font-size: 14px;
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
        .warning_pic_content {
          display: flex;
          width: 90%;
          height: 280px;
          margin: auto;
          margin-top: -20px;
          // background: red;
          .warning_pic_box_block {
            .warning_pic_box {
              width: 400px;
              height: 260px;
            }
            p {
              color: #666;
              font-size: 10px;
              text-align: center;
            }
          }
          
          .warning_pic_txt {
            margin-left: 50px;
            .warning_pic_txt_li {
              line-height: 30px;
              .warning_pic_txt_li_name {
                width: 300px;
              }
              .warning_txt_li_box {
                position: relative;
                width: 206px;
                height: 13px;
                top: 7px;
                background: linear-gradient(270deg, #808080 0%, #E5E5E5 100%);
                .warning_txt_li_box_line {
                  position: absolute;
                  width: 39px;
                  height: 16px;
                  font-size: 12px;
                  top: -1px;
                  text-align: center;
                  color: white;
                  line-height: 16px;
                }
                .box_line1 {
                  left: 0;
                  background: #1AC040;
                }
                .box_line2 {
                  left: 40px;
                  background: #234BEA;
                }
                .box_line3 {
                  left: 80px;
                    background: #F9E40F;
                }
                .box_line4 {
                  left: 120px;
                  background: #E96F1C;
                }
                .box_line5 {
                  left: 160px;
                  background: #D61D0F;
                }
              }
            }
            .warning_pic_txt_li2 {
              .warning_pic_txt_li_name {
                width: 100%;
              }
            }
            .warning_pic_txt_li {
              display: flex;
              color: #666;
              span {
                color: #333;
              }
              .warning_pic_txt_li_name2 {
                margin-left: 50px;
              }
            }
          }
          // padding-bottom: 50px;
        }
        .title_viewpoint {
          width: 90%;
          height: 20px;
          line-height: 20px;
          color: #F17807;
          font-weight: bold;
          font-size: 16px;
          margin-left: 5%;
          margin-top: 40px;
          span {
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>