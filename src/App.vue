<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import "./assets/albb_font/iconfont.css"
// import Router from 'vue-router'
export default {
  name: 'App',
  components: { 
    
  },
  data() {
    return {
      paths: "",
      isPC: "",
    }
  },
  mounted(){
		// if(this.showBol()){
    //   console.log('h5')
    //   this.isPc = false
		// 	this.$router.replace('/');
		// }else{
    //   console.log('pc');
    //   this.isPc = true
		// 	this.$router.replace(sessionStorage.getItem('paths') || "/pc_home");
		// }
  },
  // watch: {
  //   '$route' (to, from){
  //     if(this.isPc) {
  //       sessionStorage.setItem('paths',to.fullPath)
  //     }
  //   }
  // },
  methods:{
		showBol(){
				var browser={
				versions:function(){ 
          var u = navigator.userAgent, app = navigator.appVersion; 
          return {//移动终端浏览器版本信息 
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad  
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
            };
          }(),
          language:(navigator.browserLanguage || navigator.language).toLowerCase()
				} 
        if(browser.versions.mobile || browser.versions.ios || browser.versions.android || 
          browser.versions.iPhone || browser.versions.iPad){  	//h5
            return true
        }else{
            return false
        }
		}
  }
}

</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,body {
  height: 100%;
}
a {
  text-decoration: none;
}
#app {
  height: 100%;
  font-family: 'MicrosoftYaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
