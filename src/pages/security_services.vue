<template lang="pug">
  .security_services
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(:leftArr="leftList")
      .security_bread 咨询详情
      .employee_form
        img(v-if="nowId == 1" src="../static/images/img_expert_bjsd.png")
        img(v-else-if="nowId == 2" src="../static/images/img_nrly.png")
        img(v-else src="../static/images/img_bjst.png")
    //- Copyright.c_footer
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import api from "../api/commonApi"
import Copyright from "../components/copyright"
export default {
  name: 'security_services',
  components: { 
    Nav,
    leftNav,
    Copyright
  },
  props: {
   
  },
  data () {
    return {
      serviesList: '',
      leftList: [
        {name: '专家咨询',path: 'risk_assessment',id: 2},
        {name: '安全专家库',path: 'risk_assessment',id: 3},
        {name: '其他服务',path: 'risk_assessment',id: 4}
      ],
      nowId: this.$route.query.id
    }
  },
  created() {
    // this.listInfo()
  },
  methods: {
    async listInfo() {
      let res = await api.secretServiceList()
      this.serviesList = res.list
      this.serviesList.map((item)=> {
        this.leftList.push({name: item.service_name,path: 'risk_assessment',id: item.id})
      })
    },
    goDetail(ids) {
      this.$router.push({path:'/risk_assessment',query: {id: ids}})
    }
  }
}
</script>

<style lang="less" scoped>
.security_services {
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
    .security_bread {
      float: left;
      font-size: 14px;
      color: #888;
      margin-left: 60px;
      margin-top: 20px;
      width: calc(100% - 330px);
    }
    .employee_form {
      float: left;
      width: calc(100% - 330px);
      min-height: 680px;
      background: white;
      margin-top: 20px;
      margin-left: 60px;
      border-radius: 10px;
      img {
        width: 100%;
      }
      }
    }
  }
</style>
<style>
  .el-input__inner {
    height: 30px;
  }
  .el-input__icon {
    line-height: 30px;
  }
  .el-button {
    padding: 7px 10px;
  }
</style>