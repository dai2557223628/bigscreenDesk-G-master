<template lang="pug">
  .home 
    .home_bg
      img(src="../static/images/demomode_bg.png")
    Nav.animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft(:turnShow="true" :modelTurn="false" @change="switchFn")
    .home_con.animate__animated.animate__ease-out.animate__delay-2s.animate__backInUp
      .select_demo
        .select_li(v-for="(item,index) in selectArr" @click="selectFn(index)") 
          .select_box(v-if="item.value") {{item.value}}
          .select_box_active(v-else)
          | {{item.name}}
      //- .select_pic
        .select_pic_list(v-for="(item,index) in selectPic") {{item.name}}

      //- .carousel_con 
        .carousel_left_icon(@click="prevFn")
          img(src="../static/images/img_previous.png")
        .carousel_right_icon(@click="nextFn")
          img(src="../static/images/img_next.png")
        el-carousel(
          ref="lunbo"
          :interval="6000" 
          type="card" 
          height="100%"
          arrow="never"
          @click.native="linkTo"
          )
          el-carousel-item(v-for="(item,index) in carouselArr" :key="index")
            iframe(v-if="turnShow" :src="item.url" style="pointer-events: none;" width="100%" height="100%" frameborder="0")
            img(v-else :src="item.cover || previews" style="width: 100%;height: 100%")
            .carousel_bottom_font {{item.board_name}}
            
</template>
<script>
import Nav from "../components/nav"
import api from "../api/commonApi"
import CountTo from 'vue-count-to'
export default {
  components: { 
    Nav,
    CountTo
  },
  name: 'home',
  data () {
    return {
      selectPic: [
        
      ],
      selectArr: [
        {id: 1,name: 'demo1111'},
        {id: 2,name: 'demo222'},
        {id: 3,name: 'demo333'},
        {id: 4,name: 'demo44'},
        {id: 5,name: 'demo555'},
        {id: 6,name: 'demo666'},
        {id: 7,name: 'demo777'},
        {id: 8,name: 'demo888'},
        {id: 9,name: 'demo9999'},
        {id: 10,name: 'demo1010'}
      ],
      turnShow: sessionStorage.getItem('turn_switch'),
      previews: require("../static/images/previews2.jpg"),
      infoData: '',
      carouselArr: [
      ],
      top3Arr: [
        {area_name: '伊拉克', score: 85},
        {area_name: '尼日利亚', score: 82},
        {area_name: '伊朗', score: 77}
      ],
      riskArr: [
        {count: 4, level: "极高风险"},
        {count: 12, level: "高风险"},
        {count: 14, level: "较高风险"},
        {count: 16, level: "中等风险"},
        {count: 8, level: "低风险"}
      ]
    }
  },
  created() {
    this.listFn()
    this.boardList()
  },
  methods: {
    async boardList() {
      let res = await api.boardList({
        pagesize: 99
      })
      this.carouselArr = res.list
    },
    async listFn() {
      let res = await api.boardInfo()
      this.infoData = res.info
      // this.riskArr = res.info.project_level_count
      // this.top3Arr = res.info.province_risk_score_top3_list
    },
    async linkTo() {
      let urls;
      let activeIndex = this.$refs.lunbo.activeIndex
      if(!this.carouselArr[activeIndex].public_board) {
        let res = await api.boardsGo({
          id: row.id
        })
        urls = res.url
      }else {
        urls = this.carouselArr[activeIndex].url
      }
      // this.$router.push({name: "details",query: {url: this.carouselArr[activeIndex].url}})
      // let routeData = this.$router.resolve({name: "details",query: {url: this.carouselArr[activeIndex].url,id: this.carouselArr[activeIndex].id}})
      // +"?id="+this.carouselArr[activeIndex].id
      window.open(urls, '_blank');
    },
    prevFn() {
      this.$refs.lunbo.prev();
    },
    nextFn() {
      this.$refs.lunbo.next();
    },
    // 2020.7.2 v1.4新增
    switchFn(val) {
      if(val) {
        this.turnShow = true
        sessionStorage.setItem('turn_switch',val)
      }else {
        this.turnShow = false
        sessionStorage.removeItem('turn_switch')
      }
    },

    // selectFn
    selectFn(index) {
      if(this.selectArr[index].value == undefined) {
        this.selectPic.push(this.selectArr[index])
        this.$set(this.selectArr[index],"value",this.selectPic.length)
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
      // console.log(this.selectArr)
      // console.log(this.selectPic)
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
      .home_con_list {
        float: left;
        @media screen and (max-width: 1200px) {
          width: 31.3%;
        }
        width: 31.5%;
        height: 15vh;
        border: 2px solid rgba(56,195,254,1);
        border-radius: .5vw;
        margin-left: 2.2%;
        color: #37C0FF;
        box-shadow: 0px 0px 10px #38C3FE;
        .home_con_list_font {
          float: left;
          width: calc(100%/3);
          height: 100%;
          text-align: center;
          .card_num {
            display: inline-block;
            font-size: 2.2vw;
            font-weight: bold;
            margin-top: 3vh;
          }
        }
        .home_list_right_title {
          width: 100%;
          font-size: 1vw;
          color: white;
          text-indent: 2vw;
          padding-top: 1vw;
        }
        .home_con_rihgt_con {
            z-index: 88;
            position: relative;
            width: 90%;
            height: 65%;
            top: 4%;
            margin: auto;
            .home_con_right_list {
              float: left;
              width: calc(100%/3);
              height: 100%;
              text-align: center;
              color: #D61D0F;
              .home_right_list_num {
                font-size: 1vw;
              }
              .home_right_list_name {
                font-size: 1.15vw;
                font-weight: bold;
                margin-top: 2%;
                line-height: 120%;
              }
            }
          }
        .home_list_area {
          float: left;
          height: 75%;
          width: 65%;
          border-left: 1px solid rgba(52,252,233,.6);
          margin-top: 1vw;
          text-align: center;
          .home_list_area_title {
            color: white;
            font-size: 1vw;
            width: 100%;
          }
          .home_list_area_list {
            float: left;
            width: 20%;
            height: 80%;
            margin-top: 1vw;
            font-size: 1.4vw;
            font-weight: bold;
            p {
              font-size: .8vw;
              font-weight: normal;
            }
            &:nth-child(2) {
              color: #D61D0F;
            }
            &:nth-child(3) {
              color: #FF4A1A;
            }
            &:nth-child(4) {
              color: #FF800D;
            }
            &:nth-child(5) {
              color: #FDC210;
            }
            &:nth-child(6) {
              color: #2087ED;
            }
          }
        }
        &:nth-child(1) {
          margin-left: 0;
        }
      }
      .carousel_con {
        position: relative;
        float: left;
        width: 100%;
        height: 50vh;
        margin-top: 10vh;
        .carousel_left_icon,.carousel_right_icon {
          z-index: 99;
          position: absolute;
          width: 7vh;
          top: 45%;
          img {
            width: 100%;
          }
          cursor: pointer;
        }
        .carousel_right_icon {
          right: 0;
        }
        .el-carousel--horizontal {
          width: 100%;
          height: 100%;
        }
        .el-carousel__item {
          // position: relative;
          border:2px solid rgba(15, 235, 255, 1);
          box-shadow: 0px 0px 10px #38C3FE;
          .carousel_bottom_font {
            position: absolute;
            width: 100%;
            height: 5vh;
            bottom: 0;
            color: white;
            line-height: 5vh;
            font-size: 1.4vw;
            text-indent: 2vh;
            text-align: center;
            font-weight: bold;
            background: rgba(3,19,53,.9);
          }
        }
        .el-carousel__item:nth-child(2n) {
          background-color: #99a9bf;
        }
      
        .el-carousel__item:nth-child(2n+1) {
          background-color: #d3dce6;
        }
      }
    }

    // select_demo
    .select_demo {
      width: 50%;
      height: 17vw;
      border: 1px solid red;
      overflow-y: auto;
      padding: 0 .5vw .5vw .5vw;

      .select_li {
        position: relative;
        float: left;
        width: 24%;
        height: 5vw;
        margin-left: calc(4%/3);
        background: chartreuse;
        margin-top: .5vw;
        cursor: pointer;
        &:nth-child(4n+1) {
          margin-left: 0%;
        }
        .select_box,.select_box_active {
          position: absolute;
          width: 10px;
          height: 10px;
          right: -5px;
          top: -5px;
          border-radius: 90px;
          font-size: 10px;
          border: 1px solid white;
        }
        .select_box {
          background: rgba(15, 235, 255, 1);
        }
      }
    }
  }
</style>

