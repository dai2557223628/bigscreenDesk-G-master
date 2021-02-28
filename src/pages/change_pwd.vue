<template lang="pug">
  .change_pwd
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav
    //- .animate__animated.animate__ease-out.animate__delay-2s.animate__bounceIn
    .change_con
      .change_con_main
        .change_title 修改密码
        el-form(label-width="120px" :model="form" ref="forms" :rules="rules")
          el-form-item(label="账号")
            el-input(v-model="form.username" disabled)
          //- el-form-item(label="绑定的手机号" prop="phone")
            el-input(v-model="form.phone")
          el-form-item(label="请输入新密码" prop="newPsd")
            el-input(type="password" v-model="form.newPsd")
          el-form-item(label="请再次输入" prop="againNewPsd")
            el-input(type="password" v-model="form.againNewPsd")
          el-button(type="primary" @click="submitFn") 确认修改
</template>
<script>
import api from "../api/commonApi"
import Nav from "../components/new_top_nav"
export default {
  components: { 
    Nav
  },
  name: 'change_pwd',
  data () {
    var logPwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPsd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: '',
        phone: '',
        newPsd: '',
        againNewPsd: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        newPsd: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        againNewPsd: [
          { required: true, validator: logPwd2, trigger: 'blur' }
        ],
        
      }
    }
  },
  created() {
    this.initFn()
  },
  methods: {
    // 初始化
    initFn() {
      this.form.username = this.$cookies.get('username')
    },
    // 表单提交
    submitFn() {
      this.$refs.forms.validate((valid) => {
        if (valid) {
          let res = api.editPwd({
            password: this.form.againNewPsd
          })
          this.$message.success("密码修改成功！")
          this.$router.go(-1)
        } else {
          return false;
        }
      });
    }
  }
}
</script>
<style lang="less" scoped>
  .change_pwd {
    // position: relative;
    width: 100%;
    height: 100%;
    background: #eee;
    .change_con {
      width: calc(100% - 120px);
      height: 350px;
      background: white;
      margin: 20px auto;
      border-radius: 10px;
      .change_con_main {
        float: left;
        width: 50%;
        height: 90%;
        margin-left: 50px;
        margin-top: 30px;
        // background: red;
        .change_title {
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
        .el-form {
          margin-top: 10px;
          .el-input {
            width: 260px;
          }
          .el-button {
            margin-left: 100px;
            margin-top: 10px;
          }
        }
      }
    }
  }
</style>


