<template lang="pug">
  .home 
    .home_bg
      img(src="../static/images/demomode_bg.png")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:codeArr='["6","7"]' @getCode="codeFn")
    .home_con.animate__animated.animate__ease-out.animate__backInUp
      //- .select_demo
        .select_li(v-for="(item,index) in selectArr" @click="selectFn(index)") 
          .select_box(v-if="item.value") {{item.value}}
          .select_box_active(v-else)
          | {{item.name}}
      //- .select_pic
        .select_pic_list(v-for="(item,index) in selectPic") {{item.name}}
      .home_con_tops
        //- .home_con_tops_left(v-if="switchShow")
          | 大屏动态显示
          el-switch(class="turn_switch" @change="switchFn" v-model="turns")
        .home_con_tops_right(v-if="lookShow")
          img(src="../static/images/fxdp_btn_multiscreen.png" @click="createOutFn")
      .home_con_bottom_con
        .home_bottom_search
          el-input(
            placeholder="输入大屏名称"
            v-model="board_title"
            clearable
          )
          //- el-select(v-model="projectId" filterable @change="searchFn" placeholder="大屏关联项目" clearable) 
          //-   el-option(
          //-     v-for="item in projectArr"
          //-     :key="item.id"
          //-     :label="item.project_name"
          //-     :value="item.id"
          //-   )
          //- el-select(v-model="areaId" filterable @change="searchFn" placeholder="大屏地区" clearable) 
          //-   el-option(
          //-     v-for="item in areaArr"
          //-     :key="item.id"
          //-     :label="item.full_area_name"
          //-     :value="item.id"
          //-   )
          el-button(type="primary" style="margin-left: 12px") 查询
          //- el-button 重置
        a.pic_li(:href="item.url" v-for="(item,index) in nowArr" target="_blank" :key="index")
          img(:src="'https://yj.ciwei.com/cover_images/'+item.cover_name+'.png' || previews")
          //- iframe(:src="item.url" style="pointer-events: none;" width="100%" height="100%" frameborder="0")
          //- .home_pic_list
            .home_pic_list_title {{item.borad_name}}
            //- .home_pic_list_risk(v-if="item.risk_score != 0")
              |风险指数
              span(:style="item.risk_score > 90?'color: #d61d0f':item.risk_score > 80?'color:#ff4a1a':item.risk_score > 70?'color:#ff800d':item.risk_score > 50?'color:#fdc210':'color:#2087ed'") {{item.risk_score}}
        el-pagination(
          style='margin-top: 20px;'
          :page-size="12"
          background
          layout="prev, pager, next"
          @current-change="pageFn"
          :total="26"
        )
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
import Nav from "../components/new_top_nav"
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
      board_title: '',
      selectPic: [
        
      ],
      selectArr: [
      ],
      turns: false,
      turnShow: sessionStorage.getItem('turn_switch'),
      previews: require("../static/images/previews2.jpg"),
      infoData: '',
      carouselArr: [
      ],
      switchShow: false,
      lookShow: false,
      nowArr: [],
      picArr: [
        {
          cover_name: "a001",
          borad_name: "湖南商务厅海外公共安全风险",
          url: "https://datav.aliyuncs.com/share/8f712d0e8dca0a721c69841dcbd7711f"
        },
        {
          cover_name: "a002",
          borad_name: "湖南商务厅海外实时风险监测",
          url: "https://datav.aliyuncs.com/share/966545eb312794db3fe301d1930dd270"
        },
        {
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
          cover_name: 198,
          borad_name: "湖南商务厅旁遮普省公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=11&iq=198"
        },
        {
          cover_name: 192,
          borad_name: "湖南商务厅俾路支省公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=11&iq=192"
        },
        {
          cover_name: 25,
          borad_name: "湖南商务厅尼日利亚公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=25"
        },
        {
          cover_name: 550,
          borad_name: "湖南商务厅卡诺州公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=25&iq=550"
        },
        {
          cover_name: 530,
          borad_name: "湖南商务厅拉各斯州公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=25&iq=530"
        },
        {
          cover_name: 1272,
          borad_name: "湖南商务厅印度公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=1272"
        },
        {
          cover_name: 1363,
          borad_name: "湖南商务厅德里公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=1272&iq=1363"
        },
        {
          cover_name: 1348,
          borad_name: "湖南商务厅西孟加邦公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=1272&iq=1348"
        },
        {
          cover_name: 20,
          borad_name: "湖南商务厅安哥拉实时风险预警",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=20"
        },
        {
          cover_name: 17,
          borad_name: "湖南商务厅肯尼亚公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=17"
        },
        {
          cover_name: 13,
          borad_name: "湖南商务厅泰国公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=13"
        },
        {
          cover_name: 251,
          borad_name: "湖南商务厅曼谷公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=13&iq=251"
        },
        {
          cover_name: 260,
          borad_name: "湖南商务厅春武里府公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=13&iq=260"
        },
        {
          cover_name: 36,
          borad_name: "湖南商务厅美国公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=36"
        },
        {
          cover_name: 1297,
          borad_name: "湖南商务厅加利福尼亚州公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=36&iq=1297"
        },
        {
          cover_name: 1325,
          borad_name: "湖南商务厅纽约州公共安全风险",
          url: "https://datav.aliyuncs.com/share/776ed033e846d46e7db0696aff365710?ip=36&iq=1325"
        },
        {
          cover_name: 33,
          borad_name: "湖南商务厅法国公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=33"
        },
        {
          cover_name: 1278,
          borad_name: "湖南商务厅吉尔吉斯斯坦公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=1278"
        },
        {
          cover_name: 1282,
          borad_name: "湖南商务厅柬埔寨公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=1282"
        },
        {
          cover_name: 1279,
          borad_name: "湖南商务厅菲律宾公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=1279"
        },
        {
          cover_name: 21,
          borad_name: "湖南商务厅埃及公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=21"
        },
        {
          cover_name: 2339,
          borad_name: "湖南商务厅墨西哥公共安全风险",
          url: "https://datav.aliyuncs.com/share/cea8dec1a72be2df96ab47538a69ab1c?ip=2339"
        }
      ]
    }
  },
  created() {
    this.listFn()
    this.boardList()
    this.pageFn()
  },
  methods: {
    pageFn(val) {
      if(val == undefined) {
        val = 1
      }
      this.nowArr = this.picArr.slice((val-1)*12,12*val > 26 ? 26:12*val)
    },
    async boardList() {
      let res = await api.boardList({
        pagesize: 99
      })
      this.carouselArr = res.list

      // 2020.9.3 1.5新增
      if(sessionStorage.getItem('turn_switch')) {
        this.turns = true
      }
    },
    createOutFn() {
      let routeData = this.$router.resolve({
        name: "select_risk_screen"
      });
      window.open(routeData.href, '_blank');
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
    },
    codeFn(val) {
      if(val.indexOf("6") != -1) {
        this.switchShow = true
      }
      if(val.indexOf("7") != -1) {
        this.lookShow = true
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
      margin: 2.5vh auto 0px;
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
      .home_con_tops {
        width: 100%;
        height: 80px;
        // background: red;
        .home_con_tops_left,.home_con_tops_right {
          float: left;
          width: 100%;
          color: white;
          font-size: 15px;
        }
        .turn_switch {
          margin-left: 10px;
        }
        .home_con_tops_right {
          text-align: right;
          img {
            width: 120px;
            cursor: pointer;
          }
        }
      }
      .carousel_con {
        position: relative;
        float: left;
        width: 100%;
        height: 50vh;
        margin-top: 8vh;
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
      .home_con_bottom_con {
            width: 95%;
            height: 92%;
            padding: 1% auto;
            margin-top: -3.5vw;
            .home_bottom_search {
              width: 100%;
              // top: -1.5vw;
              .el-input,.el-select {
                width: 150px;
                margin-left: 12px;
                &:nth-child(1) {
                  margin-left: 0px;
                }
              }
            }
            .pic_li {
              position: relative;
              display: block;
              float: left;
              width: 23%;
              height: 22.5%;
              margin-top: 3%;
              margin-left: calc(8%/3);
              color: white;
              font-size: .6vw;
              line-height: 1.8vw;
              cursor: pointer;
              overflow: hidden;
              &:nth-child(4n+2) {
                margin-left: 0%;
              }
              .home_pic_list {
                position: absolute;
                height: 20%;
                width: 100%;
                background:rgba(19,31,62,.8);
                bottom: 0;
                .home_pic_list_title {
                  float: left;
                  font-size: .7vw;
                  color: white;
                  text-indent: .6vw;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 60%;
                }
                .home_pic_list_risk {
                  float: right;
                  display: block;
                  text-align: right;
                  width: 35%;
                  color: white;
                  margin-right: 5%;
                  span {
                    font-size: .9vw;
                    color: #DB3823;
                    margin-left: .2vw;
                  }
                }
              }
              img {
                width: 100%;
                height: 100%;
              }
              &:hover img {
                transform: scale(1.2);
                transition: .5s;
              }
            }
            .el-pagination {
              float: left;
              width: 100%;
              // margin-top: 2%;
              text-align: right;
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
<style>
  .home_con .el-carousel__indicators--outside {
    display: none;
  }
</style>

