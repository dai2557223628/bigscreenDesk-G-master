<template lang="pug">
  .login
    .login_bg
      img.login_bg_img(src="../static/images/login_bg.png")
      .login_con.animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInDown
        img(src="../static/images/login_box_bg.png")
        .login_title 境外公共安全智能预警系统
        .login_form
          el-input(v-model="username" placeholder="账号")
          el-input(v-model="password" type="password" placeholder="密码")
          el-button(type="primary" @click="loginFn" @keyup.enter="enterFn") 登录
      img.login_logo.animate__animated.animate__ease-out.animate__delay-2s.animate__flipInY(src="../static/images/img_logo.png")
</template>
<script>
import api from "../api/commonApi"
import tokenService from "@/utils/services/token_service";
export default {
  components: { },
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created() {
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.enterFn();
      }
    }
  },
  methods: {
    async loginFn() {
      if(this.username == '') {
        this.$notify.error({
          title: '错误',
          message: '用户名不能为空！'
        });
      }else if (this.password == '') {
        this.$notify.error({
          title: '错误',
          message: '密码不能为空！'
        });
      }else {
        var datas = {
          username: this.username,
          password: this.password
        }
        let res = await api.dashboardLogin(datas)
        if(res.error_code == 0) {
          tokenService.setToken(res.sid)
          this.$router.push({path:'/'})
        }else {
          this.$notify.error({
            title: '错误',
            message: res.error_message
          });
        }
        
      }
    },
    enterFn() {
      this.loginFn()
    }
  }
}
</script>
<style lang="less" scoped>
  .login {
    position: relative;
    height: 100%;
    width: 100%;
    .login_bg {
      width: 100%;
      height: 100%;
      .login_bg_img {
        width: 100%;
        height: 100%;
      }
      .login_con {
        position: absolute;
        width: 50%;
        height: 43%;
        left: 0;
        right: 0;
        top: 20%;
        margin: auto;
        img {
          width: 100%;
        }
        .login_title {
          position: absolute;
          top: 3%;
          width: 100%;
          text-align: center;
          font-size: 1.6vw;
          color: white;
          font-weight: bold;
        }
        .login_form {
          position: absolute;
          width: 38%;
          height: 60%;
          top: 30%;
          right: 6%;
          // background: red;
          .el-input {
            height: 22%;
            margin-top: 7%;
            &:nth-child(1) {
              margin-top: 0;
            }
          }
          .el-button {
            width: 100%;
            margin-top: 11%;
            height: 22%;
            background:linear-gradient(183deg,rgba(56,168,254,1),rgba(20,75,198,1));
            border-radius: 0;
            border: none;
            font-weight: bold;
            font-size: 1.1vw;
          }
        }
      }
      .login_logo {
        position: absolute;
        width: 10%;
        left: 0;
        right: 0;
        bottom: 11%;
        margin: auto;
      }
    }
  }
</style>
<style>
 .login_form .el-input__inner {
    background-color: transparent;
    border: 2px solid #38C3FE;
    height: 100%;
    box-shadow: 0px 0px 4px #38C3FE;
    color: #A1DBF3;
  }
  .login_form input::-webkit-input-placeholder{
    color: #A1DBF3;
  }
  .login_form input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #A1DBF3;
  }
  .login_form input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #A1DBF3;
  }
  .login_form input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
    color: #A1DBF3;
  }
</style>


