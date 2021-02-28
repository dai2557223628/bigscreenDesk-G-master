<template lang="pug">
  .country_guide
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false")
    .country_guide_t 国别指南
    .country_guide_con
      .risk_guide_list(v-for='(item,index) in countryList')
        .risk_guide_list_title(v-if="item.country_list.length > 0") {{item.area_name}}
        .risk_m_h_li(v-for='(items,index) in item.country_list' @click="goDetail(items.id)")
          .risk_m_h_li_t 
            span {{items.area_name}}
    Copyright.c_footer
</template>

<script>
import Nav from "../components/new_top_nav"
import api from "../api/commonApi"
import Copyright from "../components/copyright"
export default {
  name: 'country_guide',
  components: { 
    Nav,
    Copyright
  },

  data () {
    return {
      countryList: []
    }
  },
  created() {
    this.countryListFn()
  },
 methods: {
  async countryListFn() {
    var datas = {
     
    }
    let res = await api.countryList(datas)
    console.log(res)
    this.countryList = res.list
  },
  goDetail(id) {
    this.$router.push({path:'/country_guide_detail',query: {id: id}})
  }
 }
}
</script>

<style lang="less" scoped>
.country_guide {
  width: 100%;
  min-height: 100%;
  background: #F4F4F4;
  padding-bottom: 50px;
  .c_footer {
    position: absolute;
    padding-bottom: 0;
    bottom: 0;
  }
  .country_guide_t {
    font-size: 14px;
    color: #888888;
    width: 95%;
    margin-left: 2.5%;
    margin-top: 15px;
  }
  .country_guide_con {
    width: 95%;
    min-height: 80vh;
    background: white;
    margin-left: 2.5%;
    margin-top: 20px;
    border-radius: 15px;
    .risk_guide_list {
      width: 95%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      // justify-content: space-around;
      // align-items: baseline;
      align-content: flex-start;
      .risk_guide_list_title {
        width: 100%;
        margin-top: 3vh;
        text-indent: 2.5%;
      }
    }
    .risk_m_h_li {
      width: calc(100%/18);
      height: 4vh;
      background: #EEEEEE;
      border-radius: 10px;
      margin-top: 2vh;
      line-height: 4vh;
      margin-left: 2.5%;
      align-self: flex-start;
      cursor: pointer;
      .risk_m_h_li_t {
        font-size: 14px;
        color: #333;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
