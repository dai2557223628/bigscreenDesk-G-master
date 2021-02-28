<template lang="pug">
  .risk_threaten
    .risk_threaten_con
      Title(title="主要威胁势力-恐怖主义")
      .risk_threaten_con_main
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
  name: 'risk_map',
  components: { 
    Title
  },
  props: {
    terroristList: {
      type: Array,
      default:()=> []
    },
  },
  data () {
    return {
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
.risk_threaten {
  width: 32.5%;
  height: 350px;
  background: white;
  border-radius: 15px;
  .risk_threaten_con {
    width: 100%;
    height: 90%;
    margin-top: 3%;
    .risk_threaten_con_main {
      width: 90%;
      height: 85%;
      margin: auto;
      margin-top: 3%;
    }
  }
}
</style>
<style>
  .risk_threaten .el-carousel__indicators--outside {
    position: absolute;
    bottom: 0;
    left: 42%;
  }
  .risk_threaten .el-carousel__button {
    border-radius: 90px;
    width: 5px;
    height: 5px;
  }
</style>
