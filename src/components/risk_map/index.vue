<template lang="pug">
  .risk_map
    .risk_map_con
      span.iconfont.iconquanping1(@click="iconFn")
      Title(title="风险地图")
      .risk_map_con_m
        .risk_map_lenged
          img(src="../../static/images/img_map_legend.png")
        myHighchart(v-if="risk_data.length > 0" ids="my_hightchart_risk" :urls="province_list" :maps="risk_data")
</template>
<script>
import Title from '../titles'
import myHighchart from "../my_hightchart"
// import api from '../../api/commonApi'
export default {
  name: 'risk_map',
  components: { 
    Title,
    myHighchart
  },
  props: {
    title: {
      default: "全球疫情详情"
    },
    risk_data: {
      type: Array,
      default() {
        return []
      }
    },
    province_list: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data () {
    return {
      
    }
  },
  created() {
  },
  methods: {
    iconFn() {
      this.$emit("iconMapOpen",true,false,'risk_maps')
    }
  }
}
</script>

<style lang="less" scoped>
.risk_map {
  width: 32.5%;
  height: 350px;
  background: white;
  border-radius: 15px;
  .risk_map_con {
    position: relative;
    width: 100%;
    height: 90%;
    margin-top: 3%;
    .iconfont {
      position: absolute;
      top: 0px;
      right: 20px;
      font-size: 20px;
      color: #888;
      cursor: pointer;
    }
    .risk_map_con_m {
      position: relative;
      width: 92%;
      height: 90%;
      // background: red;
      margin: auto;
      margin-top: 3%;
      .risk_map_lenged {
        z-index: 99;
        position: absolute;
        right: -80px;
        bottom: 0;
        img {
          width: 60%;
        }
      }
    }
  }
}
</style>
