<template lang="pug">
  .risk_assessment
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(:leftArr="leftList")
      //- .security_bread 安全服务 / {{service_name}}
      Breadcrumb.security_bread(:breadcrumbArr="breadcrumbArr")
      .employee_form4(v-if="nowId == 4")
        .security_services_li(v-for="(item,index) in serviesList" @click="goDetail(item.id)")
          img(:src="item.cover")
          p {{item.service_name}}
      .employee_form3(v-else-if="nowId == 3")
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_ymh.png")
          .li3_font
            span 杨明辉
            .li3_info 境外公共安全专家，高级安全顾问。北京奥运会，广州亚运会，武汉军运会等安保专家组成员。曾担任中国路桥集团等多个海外项目总顾问
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_zxxh.png")
          .li3_font
            span 朱学海
            .li3_info 境外公共安全专家，高级安全顾问。中国石化外事局处长（副局级）中石化境外公共安全专家组成员
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_zxh.png")
          .li3_font
            span 郑小黑
            .li3_info 境外公共安全专家，高级安全顾问。原北京雪豹突击队副参谋长。曾担任中国石化、保利集团等多个央企境外公共安全顾问
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_gjz.png")
          .li3_font
            span 郭建忠
            .li3_info 境外公共安全专家，高级安全顾问。原公安部国保总队民族反恐处处长。商务部，外交部，中国石化境外公共安全专家组成员。长期从事反恐，情报分析与研判工作
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_xjg.png")
          .li3_font
            span 谢敬高
            .li3_info 境外公共安全专家，高级安全顾问。原中国石化外事局副局长。中国石化安全专家组成员
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_jdg.png")
          .li3_font
            span 姜德根
            .li3_info 境外公共安全专家，反恐专家，原武警北京总队第三师，曾参与奥运会安保、“APEC”会议等安保工作
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_yhw.png")
          .li3_font
            span 杨宏伟
            .li3_info 境外公共安全专家，反恐专家。原总参某局副局长，战场监视情报处理中心主任。长期从事特种作战，舆情监测分析工作
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_szy.png")
          .li3_font
            span 史争毅
            .li3_info 境外公共安全专家，反恐专家，原武警新疆总侦察处副处长，曾担任东南亚多家中资企业公共安全专家顾问
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_hzw.png")
          .li3_font
            span 胡忠威
            .li3_info 境外公共安全信息专家，反恐专家，高级安全顾问，现任新疆军区联合参谋部情报处副处长，曾执行中亚等国反恐维稳任务。长期从事境外安全信息工作
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_fj.png")
          .li3_font
            span 方捷
            .li3_info 境外公共安全专家，高级安全顾问 ，中国石化国际合作部高级工程师，参与多起海外突发事件的处置和救援
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_zy.png")
          .li3_font
            span 张爻
            .li3_info 境外公共安全信息专家，舆情监控专家，长期为中石化、路桥、保利等提供定制化安全信息服务及安全培训
        .employee_form3_li
          .li3_pic
            img(src="../static/images/img_expert_cj.png")
          .li3_font
            span 崔健
            .li3_info 舆情监控专家,原北京市公安局派驻香港联络处成员,调入香港德威安保公司，负责在港中资企业安全服务
      .employee_form2(v-else-if="nowId == 2")
        .employee_form2_left
          el-table(
            :data="tableData"
            style="width: 100%;"
            :header-cell-style="{background:'#F0F2F5'}"
            )
            el-table-column(
              prop="title"
              label="咨询主体"
              min-width="180"
              :show-overflow-tooltip="true")
            el-table-column(
              prop="area"
              label="地区"
              width="180")
            el-table-column(
              prop="type"
              label="事件类型")
            el-table-column(
              label="操作")
              template(slot-scope="scope")
                router-link(style="color: #2888FF" :to="{path: 'security_services', query: {id: scope.row.id}}") 查看详情

        .employee_form2_right
          .right_title 专家咨询
          .concat_box
            p 安全专家7*24小时在线，实时回复您的疑问！
            router-link.box_btn(:to="{path:'risk_assessment',query: {id: 3} }") 查看专家库
          .box2_info 针对从事海外项目的企业或者个人在安全防范中（可能）存在的问题，公共安全专家从项目安全风险、安防规划、安防设置、安全管理等方面，参考国内外海外安保的实践和理论，根据国家标准规范及用户的安防需求，提出的解决方案，帮助用户建立全方位的安全保障体系提供支持。
          .box2_gray 刺猬安全在安全专家顾问团队的参与和指导下，形成了一支有实力（雄厚）、专门从事海外项目风险评估、信息服务、各类安保方案的公共安全咨询队伍。曾为国家留学服务机构、多个省市安全和公安部门、湖南省和长沙市政府相关部门、我驻外机构长期提供安全咨询服务，并成为例行服务项目，受到广泛好评。
          .box2_block
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import Breadcrumb from "../components/breadcrumb"
import api from "../api/commonApi"
export default {
  name: 'risk_assessment',
  components: { 
    Nav,
    leftNav,
    Breadcrumb
  },
  props: {
   
  },
  watch: {
	  '$route' (to, from) { //监听路由是否变化
		  if(to.query.id != from.query.id){
        this.listDetail()
        this.listInfo()
        this.nowId = this.$route.query.id
		  }
	  }
  },
  data () {
    return {
      leftList: [
        {name: '专家咨询',path: 'risk_assessment',id: 2},
        {name: '安全专家库',path: 'risk_assessment',id: 3},
        {name: '其他服务',path: 'risk_assessment',id: 4}
      ],
      serviesList: [],
      service_name: '',
      serviceInfo: '',
      breadcrumbArr: [
        // { name: '安全服务', path: 'security_services' },
        { name: '预警提醒', path: '' },
      ],
      nowId: this.$route.query.id,
      tableData: [{
        id: 1,
        title: '吉尔吉斯斯坦政治动荡是否会进一步恶化？',
        area: '亚洲/吉尔吉斯斯坦',
        type: '政治风险'
      }, {
        id: 2,
        title: '尼日利亚反SARS抗议示威是否会引发全国性社会动荡？',
        area: '非洲/尼日利亚',
        type: '政治风险'
      }, {
        id: 3,
        title: '中国人在巴基斯坦卡拉奇为什么会被视为袭击目标？',
        area: '亚洲/巴基斯坦',
        type: '恐怖袭击'
      }]
    }
  },
  created() {
    this.listInfo()
    this.listDetail()
  },
  methods: {
    async listInfo() {
      let res = await api.secretServiceList()
      this.serviesList = res.list
    },
    listDetail() {
      switch (this.$route.query.id) {
        case 2:
          this.$set(this.breadcrumbArr[0],"name","专家咨询")
          break;
        case 3:
          this.$set(this.breadcrumbArr[0],"name","安全专家库")
          break;
        case 4:
          this.$set(this.breadcrumbArr[0],"name","其他服务")
          break;
        default:
          break;
      }
      this.leftList = [
        {name: '专家咨询',path: 'risk_assessment',id: 2},
        {name: '安全专家库',path: 'risk_assessment',id: 3},
        {name: '其他服务',path: 'risk_assessment',id: 4}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.risk_assessment {
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
    .employee_form4 {
      float: left;
      width: calc(100% - 330px);
      min-height: 650px;
      background: white;
      margin-top: 20px;
      margin-left: 60px;
      border-radius: 10px;
      .security_services_li {
        float: left;
        width: calc(100%/9);
        height: 23vh;
        margin-left: 3%;
        // background: red;
        margin-top: 5vh;
        cursor: pointer;
        img {
          width: 100%;
          height: 90%;
        }
        p {
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #303133;
        }
      }
    }
    .employee_form3 {
      display: flex;
      float: left;
      width: calc(100% - 330px);
      // min-height: 580px;
      background: #EEEEEE;
      margin-left: 60px;
      justify-content: space-between;
      flex-wrap: wrap;
      // border-radius: 10px;
      .employee_form3_li {
        display: flex;
        width: 31.5%;
        height: 17vw;
        margin-top: 20px;
        background: white;
        border-radius: 14px;
        .li3_pic {
          width: 10.5vw;
          height: 14.5vw;
          margin-left: 1.5vw;
          margin-top: 1.25vw;
          border-radius: .5vw;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .li3_font {
          width: 10.5vw;
          height: 100%;
          margin-left: 1vw;
          margin-top: 1.5vw;
          span {
            font-weight: bold;
            font-size: 1.6vw;
          }
          .li3_info {
            font-size: 1vw;
            line-height: 1.7vw;
          }
        }
      }
    }
    .employee_form2 {
      display: flex;
      float: left;
      width: calc(100% - 330px);
      min-height: 650px;
      background: transparent;
      margin-top: 20px;
      margin-left: 60px;
      border-radius: 10px;
      justify-content: space-between;
      .employee_form2_left {
        width: 62%;
        height: 100%;
        background: white;
        padding: 1.7vw;
        border-radius: .5vw;
        padding-bottom: 30vw;
      }
      .employee_form2_right {
        width: 32%;
        height: 100%;
        background: white;
        .right_title {
          text-align: center;
          font-size: 1.6vw;
          color: #303133;
          font-weight: bold;
          padding-top: 2vw;
          padding-bottom: 1vw;
        }
        .concat_box {
          width: 88%;
          height: 6.5vw;
          background: #DBE9FF;
          margin: auto;
          p {
            font-size: 1vw;
            color: #002766;
            text-align: center;
            padding: 1vw 0;
          }
          .box_btn {
            width: 7vw;
            padding: .4vw .3vw;
            text-align: center;
            color: white;
            background: #002766;
            border-radius: .2vw;
            margin-left: calc((100% - 7vw)/2);
            cursor: pointer;
          }
        }
        .box2_info {
          width: 76%;
          background: #3D8BE0;
          margin: auto;
          color: white;
          font-size: 1.1vw;
          line-height: 1.6vw;
          padding: 1.5vw 6%;
          margin-top: 1.5vw;
        }
        .box2_gray {
          width: 76%;     
          background: #F0F0F0;
          margin: auto;
          color: white;
          font-size: 1.1vw;
          line-height: 1.6vw;
          padding: 1.5vw 6%;
          color: #898989;
          font-size: 1vw;
        }
        .box2_block {
          width: 100%;
          height: 10vw;
        }
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