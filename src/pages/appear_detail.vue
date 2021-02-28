<template lang="pug">
  .appear_detail
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false" :homeTurn="false")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(title="安全信息" :leftArr="leftList")
      //- .warning_bread 安全信息/员工上报/详情
      Breadcrumb.warning_bread(:breadcrumbArr="breadcrumbArr")
      .employee_form
        .appear_content {{dataInfo.content}}
        .appear_time 上报时间：{{dataInfo.add_time}}
        .appear_bottom
          .appear_bottom_con
            .appear_b_list(v-if="dataInfo.name") 
              | 上报人：
              span {{dataInfo.name}}
            .appear_b_list(v-if="dataInfo.telephone") 
              | 联系方式：
              span {{dataInfo.telephone}}
            .appear_b_list(v-if="dataInfo.contact") 
              | 备用联系方式：
              span {{dataInfo.contact}}
            .appear_b_list(v-if="dataInfo.full_area_name") 
              | 所在地区：
              span {{dataInfo.full_area_name}}
            .appear_b_list(v-if="dataInfo.project_name") 
              | 所在项目：
              span {{dataInfo.project_name}}
            .appear_b_list(v-if="dataInfo.camp_name") 
              | 所在营地：
              span {{dataInfo.camp_name}}
        
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import api from "../api/commonApi"
import Title from "../components/titles"
import Breadcrumb from "../components/breadcrumb"
import {formatTimeToStr} from "../api/fomat_time"
export default {
  name: 'appear_detail',
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
      dataInfo: '',
      breadcrumbArr: [
        { name: '安全信息', path: 'warning' },
        { name: '员工上报', path: 'appear' },
        { name: '详情', path: '' }
      ],
    }
  },
  created() {
    this.appearInfoFn()
  },
 methods: {
   async appearInfoFn(id) {
      var datas = {
        id: this.$route.query.id
      }
      let res = await api.appearInfo(datas)
      this.dataInfo = res.info
      this.$set(this.dataInfo,"add_time",formatTimeToStr(this.dataInfo.add_time * 1000))
    },
 }
}
</script>

<style lang="less" scoped>
.appear_detail {
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
      .appear_content {
        width: 90%;
        margin: auto;
        padding-top: 50px;
        padding-bottom: 20px;
        color: #333;
        font-size: 14px;
      }
      .appear_time {
        width: 90%;
        margin: auto;
        font-size: 14px;
        color: #888;
      }
      .appear_bottom {
        width: 100%;
        margin-top: 50px;
        border-top: 1px solid #D9D9D9;
        .appear_bottom_con {
          width: 90%;
          margin: auto;
          padding-top: 20px;
          .appear_b_list {
            font-size: 14px;
            color: #666;
            margin-top: 15px;
            span {
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>