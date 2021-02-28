<template lang="pug">
  .nav
    .nav_con
      .nav_con_left
        .nav_left_admin(v-if="homeShow")
          span(v-if="modelTurn")
            img(src="../../static/images/nav_icon_my.png")
            | {{adminName}}
            span(v-if="roles") [{{roles}}]
          span(v-else) {{companyName}}
        .nav_left_model(v-if="homeShow" @click="modeFn")
          img(:src="mode_icon" v-if="!turnShow")
          span(v-if="!turnShow") {{home_title}}
        span(v-if="turnShow" class="turns") 大屏动态显示
        el-switch(v-if="turnShow" class="turn_switch" @change="$emit('change',turns)" v-model="turns")
      .nav_con_middle {{title}}
      .nav_con_right(v-if="homeShow")
        .nav_right_time 
          |{{dates}}
          span {{times}}
          .nav_right_line
        .nav_right_img
          //- @click="setShow == false ? setShow = true: setShow = false"
          img.setting(src="../../static/images/nav_icon_setup.png" @mouseover="hoverFn")  
          .setToast.animate__animated.ease-out.delay-.3s.animate__fadeInDown(v-if="setShow")
            a(href='http://yj.ciwei.com/admin/zsh4in1.html' target="_blank") 多屏展示
            router-link(to="create_report" target="_blank") 安全简报
            a(v-if="allow_management" :href='"http://yj.ciwei.com/admin/#/data-input/newspapers?token="+token' target="_blank") 后台管理
            router-link(to="warning") 查看预警内容
            router-link(to="change_pwd") 修改密码
            a(@click="modelFn") 默认{{home_title2}}
          img.exit(src="../../static/images/nav_icon_Logout.png" @click="logoutFn")
      router-link.nav_con_home(v-if="!homeShow" to="/")
        img(src="../../static/images/nav_icocn_backhome.png" v-if="homeTurn")
        span(v-if="homeTurn") 返回首页
</template>

<script>
import api from "../../api/commonApi"
export default {
  name: 'navs',
  props: {
    homeTurn: {
      type: Boolean,
      default: true
    },
    modelTurn: {
      type: Boolean,
      default: true
    },
    turnShow: {
      type: Boolean,
      default: false
    },
    homeShow: {
      type: Boolean,
      default: true
    },
    title: {
      default: '境外公共安全智能预警系统'
    },
    times: {
      default: ''
    }
  },
  data () {
    return {
      turns: false,
      allow_management: '',
      dates: '',
      adminName: '',
      companyName: '',
      roles: '',
      setShow: false,
      home_title: '',
      home_title2: '',
      home_turn: '',
      mode_icon: require('../../static/images/nav_icon_mode.png'),
      token: this.$cookies.get('am_token'),
      pathName: this.$route.name
    }
  },
  created() {
    this.myInfoFn()
    // this.routerFn()
  },
  methods: {
    hoverFn() {
      this.setShow = true
      setTimeout(() => {
        this.setShow = false
      },5000)
    },
    // 日期格式化
    timeFn() {
      var data = new Date();
      var month =data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
      var date = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
      this.dates = data.getFullYear() + "年" + month + "月" + date + "日";
    },
    async myInfoFn() {
      let res = await api.myInfo()
      const {username,theme_id,realname,id,allow_management} = res.info
      this.$cookies.set('username',username)
      this.adminName = username
      this.companyName = res.info.company_info.company_name
      this.roles = realname
      this.home_turn = theme_id
      this.allow_management = allow_management
      this.timeFn()
      this.routerFn()
    },
    setFn() {
      this.setShow = true
    },
    async logoutFn() {
      let res = await api.dashboardLogout()
      this.$router.push({path:'/login'})
    },
    // 路由判断
    routerFn() {
      // 首次加载判断
      if(this.pathName == "home" || this.pathName =="/") {
        if(this.$cookies.get("turn") == null) {
          if(this.home_turn == 1) {
            console.log("11111111")
            this.$router.push({path:'/home_demo'})
          }else {
            console.log("2222222222")
            this.$router.push({path:'/'})
          }
        }
      }
      if(this.pathName == 'home') {
        this.home_title = "演示模式"
        this.home_title2 = "管理模式"
        this.mode_icon = require('../../static/images/nav_icon_mode.png')
      }else {
        this.home_title = "管理模式"
        this.home_title2 = "演示模式"
        this.mode_icon = require('../../static/images/nav_icon.png')
      }

      // 2020.7.2 新增
      if(sessionStorage.getItem('turn_switch')) {
        this.turns = true
      }
    },
    modeFn() {
      if(this.pathName == 'home') {
        this.$cookies.set("turn",1)
        this.$router.push({path:'/home_demo'})
      }else {
        this.$cookies.set("turn",2)
        this.$router.push({path:'/'})
      }
    },
    // 设置默认模式
    async modelFn() {
      let datas = {
        theme_id: this.$cookies.get("turn") || this.home_turn
      }
      let res = await api.modelSwitch(datas)
      if(res.error_code == 0) {
        this.$cookies.remove("turn")
        this.$message.success("默认模式设置成功！")
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  z-index: 200;
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #131F3E;
  .nav_con {
    width: calc(100% - 120px);
    height: 100%;
    margin: auto;
    .nav_con_left,.nav_con_middle,.nav_con_right,.nav_con_home {
      float: left;
      width: 25%;
      height: 100%;
    }
    .nav_con_left {
      width: 35%;
      font-size: 14px;
      color: white;
      .turns {
        margin-left: 2vw;
      }
      .turn_switch {
        margin-left: 10px;
      }
      img {
        position: relative;
        width: 19px;
        top: 3px;
        right: 5px;
      }
      .nav_left_admin {
        display: inline-block;
      }
      
      .nav_left_model {
        display: inline-block;
        margin-left: 2vw;
        cursor: pointer;
      }
    }
    .nav_con_middle {
      width: 30%;
      text-align: center;
      font-weight: bold;
      font-size: 22px;
      color: white;
    }
    .nav_con_right {
      font-size: 14px;
      color: white;
      @media screen and (max-width: 1200px) {
        width: 35%;
      }
      .nav_right_time {
        position: relative;
        float: left;
        // margin-left: 30%;
        width: 75%;
        text-align: right;
        padding-right: 5%;
        span {
          margin-left: 5px;
        }
        .nav_right_line {
          position: absolute;
          right: 0px;
          top: 10px;
          width: 1px;
          height: 28px;
          background: #EEEEEE;
        }
      }
      .nav_right_img {
        position: relative;
        float: right;
        width: 15%;
        .exit {
          position: relative;
          float: right;
          width: 19px;
          top: 15px;
          cursor: pointer;
        }
        .setting {
          position: relative;
          float: left;
          width: 19px;
          top: 15px;
          cursor: pointer;
        }
         .setToast {
            z-index: 99;
            position: absolute;
            width:128px;
            // height:160px;
            background:rgba(255,255,255,1);
            box-shadow:0px 0px 6px 0px rgba(0, 0, 0, 0.3);
            top: 42px;
            left: -50px;
            border-radius: 5px;
            a {
              display: block;
              height: 40px;
              width: 100%;
              text-align: center;
              line-height: 40px;
              font-size: 14px;
              color: #333;
              text-decoration: none;
              cursor: pointer;
              &:hover {
                background: #2B74EA;
                color: white;
              }
            }
          }
      }
    }
    .nav_con_home {
      color: white;
      font-size: 14px;
      text-align: right;
      img {
        position: relative;
        top: 4px;
        margin-right: 5px;
      }
    }
  }
}
</style>
