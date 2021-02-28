<template lang="pug">
  .new_top_nav
    .new_top_nav_logo
      img(src='../../static/images/new_img_logo.png')
    router-link(:to="{path:item.path, query: {id: item.query}}" :class="item.path == nowPath ?'actived':''" v-for="(item,index) in leftArr" :key="index")
      span(:class="item.iconClass")
      |{{item.name}}
    //- a(:href='"http://yj.ciwei.com/admin/#/data-input/newspapers?token="+token' target="_blank")
      span(class="iconfont iconxitongshezhi")
      | 系统管理
    .right_top
      .right_select 
        | {{name}}
        .right_hover.animate__animated.ease-out.delay-.1s.animate__fadeInDown
          p(@click="goSetting") 系统管理
          p(@click="changePwd") 修改密码
          p(@click="logoutFn") 退出
      .right_line |
      .right_name 
        img(v-if="logo && screenWidth > 1200" :src="logo")
        | {{company_name}}
</template>

<script>
import api from '../../api/commonApi'
// import Index from '../../../../taro/appDemo/src/pages/index';
export default {
  name: 'new_top_nav',
  props: {
    leftArr: {
      type: Array,
      default:()=> [
        {name: "风险监测中心", iconClass:'iconfont iconshouye1', path: '/'},
        {name: "风险大屏", iconClass:'iconfont iconfengxiandaping', path: 'risk_screen'},
        {name: "安全报告", iconClass:'iconfont iconanquanjianbao', path: 'create_report'},
        {name: "安全信息", iconClass:'iconfont iconanquanzixun', path: 'warning'},
        {name: "国别指南", iconClass:'iconfont iconguobiezhinan1', path: 'country_guide'},
        {name: "企业管理", iconClass:'iconfont iconqiyeguanli', path: 'business_list'},
        {name: "个人管理", iconClass:'iconfont iconyuangong1', path: 'personal_list'},
        {name: "安全服务", iconClass:'iconfont iconanquanfuwu', path: 'risk_assessment', query: 2},
        // {name: "系统管理", iconClass:'iconfont iconxitongshezhi', path: 'bulletin'}
      ]
    },
    codeArr: {
      type: Array,
      default:()=> []
    }
  },
  data () {
    return {
      screenWidth: document.body.clientWidth, //获取屏幕宽度
      name: '',
      company_name: '',
      logo: '',
      nowPath: this.$route.name,
      token: this.$cookies.get('am_token'),
    }
  },
  created() {
    this.infoInit()
    // console.log(this.screenWidth)
  },
  methods: {
    goSetting() {
      window.open("http://yj.ciwei.com/admin/#/data-input/newspapers?token="+this.token,"_blank")
    },
    async logoutFn() {
      let res = await api.dashboardLogout()
      this.$router.push({path:'/login'})
    },
    getArrEqual(arr1, arr2) {
      let newArr = [];
      for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
          if(arr1[j] === arr2[i]){
            newArr.push(arr1[j]);
          }
        }
      }
      return newArr;
    },
    async infoInit() {
      let res = await api.myInfo()
      const { realname,rightcode_arr } = res.info
      const { company_name,logo } = res.info.company_info
      this.name = realname
      this.company_name = company_name
      this.logo = logo
      // this.$emit('getCode', this.getArrEqual(rightcode_arr,this.codeArr))
      // // let rightcode_arr = ["1","4","9","30"]
      // function delItem(name, list) {
      //   let indexs
      //   // 表示先获取这个元素的下标，然后从这个下标开始计算，删除长度为1的元素
      //   list.find((item,index) => {
      //     if(item.name == name) {
      //       indexs = index
      //     }
      //   })
      //   list.splice(indexs, 1)
      // }
      
      // // 风险大屏 - 权限判断
      // if(rightcode_arr.indexOf("5") == -1) {
      //   delItem("风险大屏",this.leftArr)
      // }
      // // 风险监测 - 权限判断
      // if(rightcode_arr.indexOf("10") == -1) {
      //   delItem("风险监测",this.leftArr)
      // }

      // // 安全信息 - 权限判断
      // if((rightcode_arr.indexOf("11") == -1) || (rightcode_arr.indexOf("12") == -1) || (rightcode_arr.indexOf("13") == -1) || (rightcode_arr.indexOf("14") == -1)) {
      //   delItem("安全信息",this.leftArr)
      // }

      // // 安全简报 - 权限判断
      // if((rightcode_arr.indexOf("15") == -1) || (rightcode_arr.indexOf("17") == -1)) {
      //   delItem("安全简报",this.leftArr)
      // }

      // // 安全服务 - 权限判断
      // if((rightcode_arr.indexOf("22") == -1) || (rightcode_arr.indexOf("23") == -1) || (rightcode_arr.indexOf("24") == -1) || (rightcode_arr.indexOf("25") == -1)) {
      //   delItem("安全服务",this.leftArr)
      // }

      // // 国别指南 - 权限判断
      // if(rightcode_arr.indexOf("20") == -1) {
      //   delItem("国别指南",this.leftArr)
      // }
      
    },
    changePwd() {
      this.$router.push({path:'/change_pwd'})
    }
  }
}
</script>

<style lang="less" scoped>
  .new_top_nav {
    z-index: 98;
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #002766;
    .new_top_nav_logo {
      float: left;
      position: relative;
      width: 180px;
      margin-left: 1vw;
      height: 80%;
      // background: red;
      top: 15%;
      img {
        width: 85%;
      }
    }
    a {
      float: left;
      padding: 0 10px;
      // width: 100px;
      height: 100%;
      color: white;
      font-size: 14px;
      text-align: center;
      span {
        margin-right: 3px;
      }
      &:hover {
        background: #003F8D;
      }
    }
    .actived {
      background: #003F8D;
    }
    .right_top {
      float: right;
      // width: 360px;
      height: 100%;
      margin-right: 40px;
      // background: white;
      color: white;
      .right_name {
        float: right;
        position: relative;
        padding-right: 20px; 
        font-weight: bold;
        img {
          position: absolute;
          width: 80px;
          height: 28px;
          // margin-right: 8px;
          left: -88px;
          top: 0;
          bottom: 0;
          margin: auto;
        }
      }
      .right_line {
        float: right;
      }
      .right_select {
        position: relative;
        float: right;
        padding-left: 20px;
        cursor: pointer;
        font-size: 14px;
        .right_hover {
          z-index: 99;
          position: absolute;
          width: 100px;
          // height: 80px;
          left: -10px;
          top: 40px;
          background: white;
          box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          display: none;
          color: black;
          p {
            height: 35px;
            line-height: 35px;
            text-indent: 20px;
            color: black;
            cursor: pointer;
            &:hover {
              background: #002766;
              color: white;
            }
          }
          
        }
        &:hover .right_hover{
          display: block;
        }
      }
    }
  }
</style>
