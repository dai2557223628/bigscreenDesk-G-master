<template lang="pug">
  .create_report
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:codeArr='["16"]' @getCode="codeFn")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(title="安全简报" :leftArr="leftList")
      .report_con
        .report_con_box
          .report_con_title 快速生成大屏简报
          el-form(label-width="180px" :model="form" ref="forms" :rules="rules")
            el-form-item(label="简报类型" prop="reportVal")
              el-select(v-model="form.reportVal" filterable @change="reportFn" placeholder="请选择简报类型" clearable) 
                el-option(
                  v-for="item in reportArr"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                )
            el-form-item(label="简报分析国家" prop="value_area_id" v-if="countryTurn")
              el-select(v-model="form.value_area_id" filterable placeholder="请选择简报分析国家" clearable) 
                el-option(
                  v-for="item in options"
                  :key="item.id"
                  :label="item.area_name"
                  :value="item.id"
                )
            el-form-item(label="选择简报内容涵盖时间段" prop="timeVal")
              el-date-picker(
                v-model="form.timeVal"
                type="date"
                placeholder="选择日期"
                value-format="timestamp"
                :picker-options="expireTimeOption"
                style="width: 194px"
              )
              span(style="margin-left: 10px;font-size: 14px;color: #333") 至
              span(style="margin-left: 10px;font-size: 14px;color: #333") {{getdate()}}
            el-button(v-if="addTurn" type="primary" @click="submitFn()" style="margin-left: 100px;margin-top: 10px") 生成大屏简报
            el-button(@click="goList") 查看历史简报
    Copyright.c_footer
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import api from "../api/commonApi"
import tokenService from "@/utils/services/token_service";
import Copyright from "../components/copyright"
export default {
  name: 'create_report',
  components: { 
    Nav,
    leftNav,
    Copyright
  },
  data () {
    return {
      expireTimeOption: {
        disabledDate(date) { //disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
          return date.getTime() > Date.now();
        }
      },
      form: {},
      rules: {
        reportVal: [
          { required: true, message: '请选择简报类型', trigger: 'change' }
        ],
        value_area_id: [
          { required: true, message: '请选择简报分析国家', trigger: 'change' }
        ],
        timeVal: [
          { required: true, message: '请选择简报时间段', trigger: 'change' }
        ],
      },
      options: [],
      reportArr: [
        {label: '全球公共安全风险简报', id: 1},
        {label: '国家公共安全风险简报', id: 2},
      ],
      countryTurn: false,
      leftList: [
        {name: "生成简报", path: 'create_report'},
        {name: "简报列表", path: 'report'},
        // {name: "商务厅周报", path: 'bulletin'}
      ],
      addTurn: false
    }
  },
  created() {
    this.selectListFn()
  },
 methods: {
    codeFn(val) {
      if(val.indexOf("16") != -1) {
        this.addTurn = true
      }
    },
    async selectListFn() {
      let res = await api.reportCountryList()
      this.options = res.list
    },
    // 获取当前时间
    getdate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();

      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = year + "-" + month + "-" + strDate;
      return currentdate;
    },
    reportFn(val) {
      if(val == 2) {
        this.countryTurn = true
      }else {
        this.countryTurn = false
      }
    },
    goList() {
      this.$router.push({path:'/report'})
    },
    submitFn() {
      this.$refs.forms.validate((valid) => {
        if (valid) {
          var urls;
          const {reportVal,timeVal,value_area_id} = this.form
          if(reportVal == 1) {
            urls = "http://report.ciwei.com/#/g_home?sid="+tokenService.getToken()+"&time_begin="+timeVal/1000
          }else {
            urls = "http://report.ciwei.com/#/?sid="+tokenService.getToken()+"&time_begin="+timeVal/1000+"&area_id="+value_area_id
          }
          window.open(urls,"_blank")
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
 }
}
</script>

<style lang="less" scoped>
.create_report {
  .c_footer {
    position: absolute;
    padding-bottom: 0;
    bottom: -20px;
  }
  .employee_bg {
    float: left;
    width: 100%;
    height: auto;
    padding-bottom: 80px;
    background: #EEEEEE;
    .report_con {
      float: left;
      width: calc(100% - 330px);
      height: 680px;
      margin-left: 50px;
      background: white;
      margin-top: 30px;
      border-radius: 10px;
      .report_con_box {
        width: 90%;
        margin: auto;
        margin-top: 40px;
        .report_con_title {
          font-size: 24px;
          color: #333333;
          width: 100%;
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>