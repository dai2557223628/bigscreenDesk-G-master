<template lang="pug">
  .home 
    .home_bg
      img(src="../static/images/new_bg.png")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:codeArr='["8","9"]' @getCode="codeFn")
    //- .animate__animated.animate__ease-out.animate__delay-2s.animate__backInUp
    
    .home_con
      .select_checkbox(v-if="addShow")
        .select_checkbox_name 创建共显方案：
        img(src="../static/images/fxdp_img_create.png" @click="goCreateFn")
      .select_demo
        .select_checkbox_name 历史共显方案：
        .select_demo_con
          .select_li(v-for="(item,index) in selectArr") 
            img.select_li_pic(src="../static/images/fxdp_img_history_nor.png" @click="selectFn(index)" @mouseover="overSelectFn(index)" @mouseleave="overLeaveFn" @mousemove="updateXY")
            img.select_li_close(v-if="delShow" src="../static/images/history_sel_icon_delete.png" @click="closeFn(index)")
    .select_cover(v-show="coverTurns" @mouseover="coverHoverFn" @mouseleave="overLeaveFn" :style="positionStyle")
      .select_cover_li(v-for='(item,index) in coverList' :key="index") 
        img(:src="item.cover" style='width: 100%')
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
      coverTurns: false,
      selectArr: [
      ],
      coverList: '',
      x:0,
      y:0,
      positionStyle:{top:'20px',left:'20px'},
      addShow: false,
      delShow: false
    }
  },
  created() {
    this.frontStyleListFn()
  },
  methods: {
    codeFn(val) {
      if(val.indexOf("8") != -1) {
        this.addShow = true
      }
      if(val.indexOf("9") != -1) {
        this.delShow = true
      }
    },
    goCreateFn() {
      this.$router.push({
          path:'/create_risk_screen',//跳转路径
      })
    },
    updateXY:function(event){
      this.x = event.pageX;
      this.y = event.pageY;
      this.positionStyle={top: this.y+20+'px',left: this.x+20+'px'};
    },
    async frontStyleListFn() {
      let res = await api.frontStyleList()
      this.selectArr = res.list
    },
    selectFn(index) {
      let urls = []
      this.selectArr[index].config_data.map((item)=> {
        urls.push(item.url)
      })
      this.$router.push({
        path:'/four_in_one',//跳转路径
        // 参数
        query: { 
          urls: urls
        }
      })
      this.fullFn()
    },
    // 全屏操作
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
    },
    closeFn(index) {
      this.$confirm('方案删除后不可恢复，确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await api.frontStyleDelete({
          company_admin_front_board_style_id: this.selectArr[index].id
        })
        this.frontStyleListFn()
      }).catch(() => {
        
      });
    },
    overSelectFn(index) {
      this.coverTurns = true
      this.coverList = this.selectArr[index].config_data
    },
    coverHoverFn() {
      this.coverTurns = true
    },
    overLeaveFn() {
      this.coverTurns = false
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
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      img {
        display:block;
        width: 100%;
        height: 100%;
      }
    }
    .select_cover {
      z-index: 20;
      position: absolute;
      // top: 0;
      // bottom: 0;
      // left: 0;
      // right: 0;
      width: 400px;
      height: 225px;
      background: #3DAAFF; 
      margin: auto;
      .select_cover_li {
        float: left;
        width: 47%;
        height: 47%;
        margin-left: 2%;
        // background: red;
        margin-top: 1%;
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
          width: calc(120px + 2vh);
        }
        img {
          width: 17vh;
          cursor: pointer;
        }
      }
    }

    // select_demo
    .select_demo {
      width: 100%;
      height: 400px;
      margin-top: 10vh;
      
      .select_checkbox_name {
        float: left;
        width: 120px;
        height: 100%;
        font-size: 16px;
        color: white;
      }
      .select_demo_con {
        float: left;
        width: calc(100% - 120px - 4vh);
        height: 100%;
        padding-left: 2vh;
        padding-right: 2vh;
        padding-top: 2vh;
        overflow-y: auto;
        overflow-x: hidden;
        .select_li {
          position: relative;
          float: left;
          width: 11%;
          height: 20vh;
          margin-left: calc(23% / 6);
          margin-top: 30px;
          cursor: pointer;
          &:hover {
            transform: scale(1.2);
            transition: 1s;
          }
          .select_li_pic {
            width: 100%;
          }
          .select_li_close {
            position: absolute;
            width: 2vh;
            right: -2vh;
            top: 0;
            display: none;
          }
          &:hover .select_li_close{
            display: block;
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
          &:nth-child(5) {
            margin-top: 0%;
          }
          &:nth-child(6) {
            margin-top: 0%;
          }
          &:nth-child(7) {
            margin-top: 0%;
          }
          &:nth-child(7n+1) {
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

