<template lang="pug">
  .details
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false" v-if="turnShow")
    topNav(@click="fullFn" v-if="turnShow").animate__animated.animate__ease-out.animate__delay-2s.animate__bounceInRight(:leftArr="leftArrs")
    //- .animate__animated.animate__ease-out.animate__delay-3s.animate__backInDown
    .details_iframe(:class="!turnShow?'fullIframe':''")
      iframe(:src ="iframeUrl" frameborder="0")
    //- .animate__animated.animate__ease-out.animate__delay-4s.animate__bounceInDown
    rightPic(v-if="turnShow" @click="iframeFn")
</template>

<script>
import Nav from "../components/nav"
import topNav from "../components/top_nav"
import rightPic from "../components/right_pic"
import api from "../api/commonApi"
export default {
  name: 'iframe_details',
  components: { 
    Nav,
    topNav,
    rightPic
  },
  data () {
    return {
      turnShow: true,
      iframeUrl: this.$route.query.url,
      ids: this.$route.query.id,
      leftArrs:[
        {name: "查看公告", iconClass:'iconfont icongonggao', path: 'notice?id='+this.$route.query.id},
        {name: "实时预警", iconClass:'iconfont iconyujing', path: 'warning?id='+this.$route.query.id},
        {name: "安全快讯", iconClass:'iconfont iconkuaixun', path: 'bulletin?id='+this.$route.query.id},
      ]
    }
  },
  created() {
  },
  
mounted() { 
  var that = this
  var index = 0
  window.onresize = function temp() {
    index++
    if(index == 2) {
      that.turnShow = true
      index = 0
    }
  }
},
 methods: {
  iframeFn(path) {
    this.iframeUrl = path
  },
  //  全屏操作
  fullFn() {
    this.turnShow = false
    let element = document.documentElement;
    if (this.turnShow) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
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
    // this.turnShow = !this.turnShow;
  }
 }
}
</script>

<style lang="less" scoped>
.details {
  width: 100%;
  height: 100%;
  background: #eee;
  .details_iframe {
    float: left;
    width: calc(100% - 450px);
    height: calc(100% - 140px);
    margin-left: 120px;
    margin-top: 20px;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  .fullIframe {
    position: fixed;
    width: 100%;
    height: 100%;
    margin: 0;
  }
}
</style>