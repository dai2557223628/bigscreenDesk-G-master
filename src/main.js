import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import htmlToPdf from '@/utils/services/htmlToPdf'
import VueCookies from 'vue-cookies'
import animated from 'animate.css'
import select from '@/utils/select' // 公用下拉菜单
import echarts from 'echarts'
Vue.use(animated)
Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.use(VueAxios,axios);
Vue.use(Highcharts,HighchartsMore);
Vue.use(htmlToPdf)
Vue.use(router);

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
});
Vue.config.productionTip = false;


// 定义全局域名
Vue.prototype.hostName = "http://129.204.180.14:3000"; //http://129.204.180.14:3000 //http://localhost:3000
Vue.prototype.$select = select
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
