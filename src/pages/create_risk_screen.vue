<template lang="pug">
  .home 
    .home_bg
      img(src="../static/images/new_bg.png")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav
    //- .animate__animated.animate__ease-out.animate__delay-2s.animate__backInUp
    .home_con
      .select_checkbox
        .select_checkbox_name 共显风格：
        el-radio(v-model="radio" label="1")
          img(src="../static/images/fxdp_img_style.png")
        //- el-radio(v-model="radio" label="2")
          img(src="../static/images/fxdp_img_style.png")
      .select_demo
        .select_checkbox_name 选择大屏：
        .select_demo_con
          .select_li(v-for="(item,index) in selectArr" @click="selectFn(index)") 
            img(:src="'https://yj.ciwei.com/cover_images/'+item.cover_name+'.png'")
            .select_box(v-if="item.value") {{item.value}}
            .select_box_active(v-else)
            | {{item.name}}
      el-button.select_btn(type="primary" @click="goFourInOneFn") 确认
      //- .select_pic
        .select_pic_list(v-for="(item,index) in selectPic") {{item.name}}
            
</template>
<script>
import Nav from "../components/new_top_nav"
import api from "../api/commonApi"
export default {
  components: { 
    Nav,
  },
  data () {
    return {
      selectPic: [
        
      ],
      radio: '1',
      selectArr: [
        {
          id: 1,
          cover_name: "a001",
          borad_name: "湖南商务厅海外公共安全风险",
          url: "https://datav.aliyuncs.com/share/8f712d0e8dca0a721c69841dcbd7711f"
        },
        {
          id: 2,
          cover_name: "a002",
          borad_name: "湖南商务厅海外实时风险监测",
          url: "https://datav.aliyuncs.com/share/966545eb312794db3fe301d1930dd270"
        },
        {
          id: 3,
          cover_name: "a003",
          borad_name: "湖南商务厅海外实时风险预警",
          url: "https://datav.aliyuncs.com/share/a534ed9cac3f35a01e6ad945559515cf"
        },
        {
          cover_name: 11,
          borad_name: "湖南商务厅巴基斯坦公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=11"
        },
        {
          id: 198,
          cover_name: 198,
          borad_name: "湖南商务厅旁遮普省公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=11&iq=198"
        },
        {
          id: 192,
          cover_name: 192,
          borad_name: "湖南商务厅俾路支省公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=11&iq=192"
        },
        {
          id: 25,
          cover_name: 25,
          borad_name: "湖南商务厅尼日利亚公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=25"
        },
        {
          id: 550,
          cover_name: 550,
          borad_name: "湖南商务厅卡诺州公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=25&iq=550"
        },
        {
          id: 530,
          cover_name: 530,
          borad_name: "湖南商务厅拉各斯州公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=25&iq=530"
        },
        {
          id: 1272,
          cover_name: 1272,
          borad_name: "湖南商务厅印度公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=1272"
        },
        {
          id: 1363,
          cover_name: 1363,
          borad_name: "湖南商务厅德里公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=1272&iq=1363"
        },
        {
          id: 1348,
          cover_name: 1348,
          borad_name: "湖南商务厅西孟加邦公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=1272&iq=1348"
        },
        {
          id: 20,
          cover_name: 20,
          borad_name: "湖南商务厅安哥拉实时风险预警",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=20"
        },
        {
          id: 17,
          cover_name: 17,
          borad_name: "湖南商务厅肯尼亚公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=17"
        },
        {
          id: 13,
          cover_name: 13,
          borad_name: "湖南商务厅泰国公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=13"
        },
        {
          id: 251,
          cover_name: 251,
          borad_name: "湖南商务厅曼谷公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=13&iq=251"
        },
        {
          id: 260,
          cover_name: 260,
          borad_name: "湖南商务厅春武里府公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=13&iq=260"
        },
        {
          id: 36,
          cover_name: 36,
          borad_name: "湖南商务厅美国公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=36"
        },
        {
          id: 1297,
          cover_name: 1297,
          borad_name: "湖南商务厅加利福尼亚州公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=36&iq=1297"
        },
        {
          id: 1325,
          cover_name: 1325,
          borad_name: "湖南商务厅纽约州公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=36&iq=1325"
        },
        {
          id: 33,
          cover_name: 33,
          borad_name: "湖南商务厅法国公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=33"
        },
        {
          id: 1278,
          cover_name: 1278,
          borad_name: "湖南商务厅吉尔吉斯斯坦公共安全风险",
          url: "http://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=1278"
        },
        {
          id: 1282,
          cover_name: 1282,
          borad_name: "湖南商务厅柬埔寨公共安全风险",
          url: "http://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=1282"
        },
        {
          id: 1279,
          cover_name: 1279,
          borad_name: "湖南商务厅菲律宾公共安全风险",
          url: "http://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=1279"
        },
        {
          id: 21,
          cover_name: 21,
          borad_name: "湖南商务厅埃及公共安全风险",
          url: "http://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=21"
        },
        {
          id: 2339,
          cover_name: 2339,
          borad_name: "湖南商务厅墨西哥公共安全风险",
          url: "http://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=2339"
        }
      ],
      turns: false,
      previews: require("../static/images/previews2.jpg"),
      infoData: '',
    }
  },
  created() {
    // this.boardList()
    this.boardStyleFn()
  },
  methods: {
    async boardList() {
      let res = await api.boardList({
        pagesize: 99
      })
      this.selectArr = res.list
    },

    async boardStyleFn() {
      let res = await api.boardStyleList()
      console.log(res)
    },
    // selectFn
    selectFn(index) {
      if(this.selectArr[index].value == undefined) {
        if(this.selectPic.length >= 4) {
          this.$notify.error({
            title: '错误',
            message: '请选择正确数量的大屏!'
          });
        }else {
          this.selectPic.push(this.selectArr[index])
          this.$set(this.selectArr[index],"value",this.selectPic.length)
        }
      }else {
        var i;
        this.selectPic.map((item,indexs) => {
          if(item == this.selectArr[index]) {
            i = indexs
          }
        })
        this.selectArr.map((item) => {
          if((i+1) < item.value) {
            item.value = item.value - 1
          }
        })
        this.$set(this.selectArr[index],"value",undefined)
        this.selectPic.splice(i,1)
      } 
    },
    async goFourInOneFn() {
      if(this.selectPic.length < 4) {
        this.$notify.error({
          title: '错误',
          message: '请选择正确数量的大屏!'
        });
      }else {
        let urls = []
        let urlObj = []
        this.selectPic.map((item,index) => {
          urls.push(item.url)
          urlObj.push(item.id)
        })
        let res = await api.frontStyleCreate({
          front_board_style_id: 1,
          front_board_style_config_value: urlObj.join(",")
        })
        if(res.error_code == 0) {
          this.$notify.success({
            title: '成功',
            message: '创建成功'
          });
          this.$router.push({
            path:'/four_in_one',//跳转路径
            // 参数
            query: { 
              urls: urls
            }
          })
          this.fullFn()
        }
      }
      
    },
      //  全屏操作
    fullFn() {
      let element = document.documentElement;
      if (element.requestFullscreen) {
              element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
          }
      }
    }
}
</script>
<style lang="less" scoped>
  .home {
    position: relative;
    height: 100%;
    width: 100%;
    .home_bg {
      position: absolute;
      width: 100%;
      height: 100%;
      img {
        display:block;
        width: 100%;
        height: 100%;
      }
    }
    .home_con {
      width: calc(100% - 120px);
      height: calc(100% - 110px);
      margin: 4.5vh auto 0px;
      .select_checkbox {
        height: 120px;
        width: 100%;
        font-size: 16px;
        color: white;
        .select_checkbox_name {
          float: left;
          width: 100px;
        }
        img {
          width: 60%;
        }
      }
    }

    // select_demo
    .select_demo {
      width: 100%;
      height: 400px;
      margin-top: 20px;
      
      .select_checkbox_name {
        float: left;
        width: 100px;
        height: 100%;
        font-size: 16px;
        color: white;
      }
      .select_demo_con {
        float: left;
        width: calc(100% - 100px);
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        .select_li {
          position: relative;
          float: left;
          width: 24%;
          height: 180px;
          margin-left: calc(4%/3);
          background: chartreuse;
          margin-top: 15px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
          &:nth-child(1) {
            margin-top: 0%;
          }
          &:nth-child(2) {
            margin-top: 0%;
          }
          &:nth-child(3) {
            margin-top: 0%;
          }
          &:nth-child(4) {
            margin-top: 0%;
          }
          &:nth-child(4n+1) {
            margin-left: 0%;
          }
          .select_box,.select_box_active {
            position: absolute;
            width: 18px;
            height: 18px;
            right: 20px;
            top: 20px;
            line-height: 18px;
            text-align: center;
            font-size: 10px;
          }
          .select_box {  
            background: #FF1C1B;
            color: white;
          }
        }
      }
    }
    .select_btn {
      position: relative;
      margin-left: 100px;
      margin-top: 50px;
      width: 100px;
      background: #409EFF;
    }
  }
</style>
<style>
  .home_con .select_checkbox .el-radio__input {
    position: relative;
    top: -88px;
  }
  .home_con .select_checkbox .el-radio__input.is-checked .el-radio__inner {
    border-color: #19ECFA;
    background: #19ECFA;
  }
  .home_con .el-carousel__indicators--outside {
    display: none;
  }
</style>

