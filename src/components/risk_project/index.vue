<template lang="pug">
  .risk_project
    .risk_project_con
      .risk_pro_left
        Title(title="项目风险监测")
        .risk_pro_l_main
          .risk_p_l_m_top
            .risk_p_l_li
              .risk_p_l_li_num {{projectInfo.project_count}}
              .risk_p_l_li_info 项目数量
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.project_risk_level_count[0].count != 0 ? iconFn('极高风险'): ''") {{projectInfo.project_risk_level_count[0].count}}
              .risk_p_l_li_info 极高风险
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.project_risk_level_count[1].count != 0 ? iconFn('高风险'): ''") {{projectInfo.project_risk_level_count[1].count}}
              .risk_p_l_li_info 高风险
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.project_risk_level_count[2].count != 0 ? iconFn('较高风险'): ''") {{projectInfo.project_risk_level_count[2].count}}
              .risk_p_l_li_info 较高风险
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.project_risk_level_count[3].count != 0 ? iconFn('中等风险'): ''") {{projectInfo.project_risk_level_count[3].count}}
              .risk_p_l_li_info 中等风险
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.project_risk_level_count[4].count != 0 ? iconFn('低风险'): ''") {{projectInfo.project_risk_level_count[4].count}}
              .risk_p_l_li_info 低风险
          .risk_p_l_m_top
            .risk_p_l_li
              .risk_p_l_li_num {{projectInfo.camp_count}}
              .risk_p_l_li_info 营地数量
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.camp_risk_level_count[0].count != 0 ? iconCampFn('极高风险'): ''") {{projectInfo.camp_risk_level_count[0].count}}
              .risk_p_l_li_info 极高风险
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.camp_risk_level_count[1].count != 0 ? iconCampFn('高风险'): ''") {{projectInfo.camp_risk_level_count[1].count}}
              .risk_p_l_li_info 高风险
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.camp_risk_level_count[2].count != 0 ? iconCampFn('较高风险'): ''") {{projectInfo.camp_risk_level_count[2].count}}
              .risk_p_l_li_info 较高风险
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.camp_risk_level_count[3].count != 0 ? iconCampFn('中等风险'): ''") {{projectInfo.camp_risk_level_count[3].count}}
              .risk_p_l_li_info 中等风险
            .risk_p_l_li
              .risk_p_l_li_num(@click="projectInfo.camp_risk_level_count[4].count != 0 ? iconCampFn('低风险'): ''") {{projectInfo.camp_risk_level_count[4].count}}
              .risk_p_l_li_info 低风险
          .risk_p_l_m_bottom
            .risk_p_l_b_li
              .risk_p_l_b_li_num {{projectInfo.employee_count}}
              .risk_p_l_b_li_info 员工数量
            .risk_p_l_b_li
              .risk_p_l_b_li_num(@click="projectInfo.employee_cn_count != 0 ? iconEmployeeFn('中国员工'): ''") {{projectInfo.employee_cn_count}}
              .risk_p_l_b_li_info 中国员工
            .risk_p_l_b_li
              .risk_p_l_b_li_num(@click="projectInfo.employee_ab_count != 0 ? iconEmployeeFn('安保员工'): ''") {{projectInfo.employee_ab_count}}
              .risk_p_l_b_li_info 安保员工
            .risk_p_l_b_li
              .risk_p_l_b_li_num(@click="projectInfo.employee_local_count != 0 ? iconEmployeeFn('当地员工'): ''") {{projectInfo.employee_local_count}}
              .risk_p_l_b_li_info 当地员工
      .risk_pro_right  
        Title(title="主要威胁势力-恐怖主义")
        .risk_pro_r_main
          el-carousel(indicator-position="outside")
            el-carousel-item(v-for='(item,index) in terroristList' :key="index")
              el-table(:data="item" style="width: 100%" :header-cell-style="{background:'#F0F2F5',color:'#666666'}" :row-style="{height: '35px'}" :cell-style="{padding:'2px'}")
                el-table-column(prop="terrorist_name" label="组织" width="100" :show-overflow-tooltip="true")
                el-table-column(prop="chinese_risk_level" label="对华风险" min-width="100" :show-overflow-tooltip="true")
                el-table-column(prop="active_level" label="活跃程度" width="80")
                el-table-column(prop="active_trend" label="活跃趋势" width="80")
</template>
<script>
import Title from '../titles'
// import api from '../../api/commonApi'
export default {
  name: 'risk_project',
  components: { 
    Title
  },
  props: {
    projectInfo: {
      type: Object,
      default: ()=> {}
    },
    terroristList: {
      type: Array,
      default: ()=> []
    }
  },
  data () {
    return {
    }
  },
  created() {
    
  },
  methods: {
    iconFn(name) {
      this.$emit("iconProOpen",true,false,'project_num',name)
    },
    iconCampFn(name) {
      this.$emit("iconCampOpen",true,false,'camp_num',name)
    },
    iconEmployeeFn(name) {
      this.$emit("iconEmployeeOpen",true,false,'employee_num',name)
    }
  }
}
</script>

<style lang="less" scoped>
.risk_project {
  width: 66%;
  height: 350px;
  background: white;
  border-radius: 15px;
  .risk_project_con {
    width: 100%;
    height: 90%;
    margin-top: 1.5%;
    // background: red;
    .risk_pro_left {
      float: left;
      width: 40%;
      height: 100%;
      border-right: 1px solid #eee;
      .risk_pro_l_main {
        width: 90%;
        height: 85%;
        margin: auto;
        margin-top: 3%;
        .risk_p_l_m_top {
          display: flex;
          width: 100%;
          height: 80px;
          padding-top: 3%;
          text-align: center;
          .risk_p_l_li {
            width: calc(80%/5);
            cursor: pointer;
            .risk_p_l_li_num {
              text-decoration: underline;
            }
            .risk_p_l_li_info {
              font-size: 12px;
            }
            &:nth-child(1) {
              width: 20%;
              cursor: none;
              .risk_p_l_li_num {
                text-decoration: none;
                color: #333;
                font-size: 20px;
                font-weight: bold;
              }
              .risk_p_l_li_info {
                font-size: 14px;
                color: #666;
              }
            }
            &:nth-child(2) {
              color: #D61C0F;
              margin-top: .5vh;
              .risk_p_l_li_num {
                font-size: 18px;
                font-weight: bold;
              }
            }
            &:nth-child(3) {
              color: #FF4A1A;
              margin-top: .5vh;
              .risk_p_l_li_num {
                font-size: 18px;
                font-weight: bold;
              }
            }
            &:nth-child(4) {
              color: #FF800D;
              margin-top: .5vh;
              .risk_p_l_li_num {
                font-size: 18px;
                font-weight: bold;
              }
            }
            &:nth-child(5) {
              color: #FDC210;
              margin-top: .5vh;
              .risk_p_l_li_num {
                font-size: 18px;
                font-weight: bold;
              }
            }
            &:nth-child(6) {
              color: #2087ED;
              margin-top: .5vh;
              .risk_p_l_li_num {
                font-size: 18px;
                font-weight: bold;
              }
            }
          }
        }
        .risk_p_l_m_bottom {
          display: flex;
          width: 100%;
          height: 80px;
          padding-top: 3%;
          text-align: center;
          .risk_p_l_b_li {
            width: calc(70%/3);
            margin-top: 1.3vh;
            cursor: pointer;
            .risk_p_l_b_li_num {
              color: #333;
              font-size: 18px;
              font-weight: bold;
              text-decoration: underline;
            }
            .risk_p_l_b_li_info {
              color: #666666;
              font-size: 12px;
            }
            &:nth-child(1) {
              width: 26%;
              margin-top: 0;
              cursor: none;
              .risk_p_l_b_li_num {
                font-size: 24px;
                font-weight: bold;
                text-decoration: none;
              }
              .risk_p_l_b_li_info {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
    .risk_pro_right {
      float: left;
      width: calc(60% - 1px);
      height: 100%;
      .risk_pro_r_main {
        width: 90%;
        height: 85%;
        margin: auto;
        margin-top: 3%;
        // .el-carousel {
        //   width: 100%;
        //   height: 80%;
        // }
      }
    }
  }
}
</style>
<style>
  .risk_project .el-carousel__indicators--outside {
    position: absolute;
    bottom: 0;
    left: 47%;
  }
  .risk_project .el-carousel__button {
    border-radius: 90px;
    width: 5px;
    height: 5px;
  }
</style>

