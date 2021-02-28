<template lang="pug">
  .list
    .list_con(v-if="show")
      Title(v-if="show" :title="title")
    a.list_banner(v-if="imgSrc" :href="bannerLink" target="blank")
      img(:src="imgSrc")
    van-swipe(:autoplay="3000" indicator-color="white" v-if="swiperShow")
      van-swipe-item
        a(href="https://mp.weixin.qq.com/s/WQ06RoPWalqPyUrqHaHxyA" target="blank")
          img(src="../../static/images/health_banner_advisory.png")
      van-swipe-item
        a(href="https://mp.weixin.qq.com/s/UcjiCzTX3JCif8woioQ7jA" target="blank")
          img(src="../../static/images/health_banner_epidemic.png")
    a.list_con_list(href="http://www.gov.cn/xinwen/2020-04/02/content_5498179.htm" target="blank" v-if="topShow")
      .list_con_list_title
        span.list_label 置顶
        |国务院新闻办就疫情期间中国海外留学人员安全问题举行发布会
      .list_con_list_time 2020-04-02 11:30
      .list_con_list_source 信息来源：国务院
    router-link.list_con_list(v-if="class_id != '60,58'" :to="{name: 'details',query: {id: item.news_id}}" :class="item.title.length < 30?'listOneLine':''" v-for="(item,index) in listArr" :key="index+10")
      .list_con_list_title(:class="item.title.length < 30?'oneLine':''") 
        span.news_tags(v-if="item.tags.length > 0 && class_id == 61") {{item.tags[0]}}
        span.list_tags(v-if="item.tags.length > 0 && class_id == 53") {{item.tags[0]}}
        span.health_tags(v-if="item.tags.length > 0 && class_id == 57") {{item.tags[0]}}
        span.top_tags(v-if="class_id == '60,58' && index == 0") 置顶
        span.safe_tags(v-if="item.tags.length > 0 && class_id == '60,58'") {{item.tags[0]}}
        | {{item.title}}
      .list_con_list_time {{item.display_time}}
      .list_con_list_source 信息来源： {{item.source_name}}
    a.list_con_list(v-else-if="item.cw_news_class_id == 60" :href="item.source_url" target="blank" :class="item.title.length < 30?'listOneLine':''")
      .list_con_list_title(:class="item.title.length < 30?'oneLine':''") 
        span.news_tags(v-if="item.tags.length > 0 && class_id == 61") {{item.tags[0]}}
        span.list_tags(v-if="item.tags.length > 0 && class_id == 53") {{item.tags[0]}}
        span.health_tags(v-if="item.tags.length > 0 && class_id == 57") {{item.tags[0]}}
        span.top_tags(v-if="class_id == '60,58' && index == 0") 置顶
        span.safe_tags(v-if="item.tags.length > 0 && class_id == '60,58'") {{item.tags[0]}}
        | {{item.title}}
      .list_con_list_time {{item.display_time}}
      .list_con_list_source 信息来源： {{item.source_name}}
    router-link.list_con_list(v-else :to="{name: 'details',query: {id: item.news_id}}" :class="item.title.length < 30?'listOneLine':''")
      .list_con_list_title(:class="item.title.length < 30?'oneLine':''") 
        span.news_tags(v-if="item.tags.length > 0 && class_id == 61") {{item.tags[0]}}
        span.list_tags(v-if="item.tags.length > 0 && class_id == 53") {{item.tags[0]}}
        span.health_tags(v-if="item.tags.length > 0 && class_id == 57") {{item.tags[0]}}
        span.top_tags(v-if="class_id == '60,58' && index == 0") 置顶
        span.safe_tags(v-if="item.tags.length > 0 && class_id == '60,58'") {{item.tags[0]}}
        | {{item.title}}
      .list_con_list_time {{item.display_time}}
      .list_con_list_source 信息来源： {{item.source_name}}
    .display_opactiy(v-if="show")
    lookMore(:links="{name:'list',query:{class_id: class_id}}")
</template>

<script>
import Title from "../Title"
import lookMore from "../look_more"
export default {
  name: 'list',
  components: { Title,lookMore },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    topShow: {
      type: Boolean,
      default: true
    },
    swiperShow: {
      type: Boolean,
      default: false
    },
    title: {
      default: "留学生说"
    },
    imgSrc: {
      default: ""
    },
    bannerLink: {
      default: "https://img1.ciwei.com/2020/04/15/%E6%B5%B7%E5%A4%96%E7%95%99%E5%AD%A6%E4%BA%BA%E5%91%98%E6%96%B0%E5%9E%8B%E5%86%A0%E7%8A%B6%E7%97%85%E6%AF%92%E8%82%BA%E7%82%8E%E9%98%B2%E6%8E%A7%E6%8C%87%E5%8D%97.pdf"
    },
    listArr: {
      type: Array,
      default() {
        return []
      }
    },
    class_id: {
      default: ''
    }
  },
  data () {
    return {
      oneLine: "oneLine",
      listOneLine: "listOneLine"
    }
  },
  created() {
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  .list {
    float: left;
    position: relative;
    width: 100%;
    .list_con {
      width: 96%;
      height: 5vw;
      margin-left: 2%;
      margin-top: 5%;
    }
    .list_banner {
      display: block;
      width: 96%;
      height: auto;
      margin-left: 2%;
      margin-top: 3vw;
      img {
        width: 100%;
        border-radius: 2vw;
      }
    }
    .van-swipe {
      height: 35vw;
      width: 96%;
      margin-top: 3vw;
      margin-left: 2%;
      img {
        width: 100%;
      }
    }
    .list_con_list {
      display: block;
      width: 100%;
      height: 19vw;
      color: #333333;
      border-bottom: 1px solid #EEEEEE;
      margin-top: 2vw;
      &:nth-of-type(1) {
        margin-top: 3vw;
      }
      &:nth-of-type(2) {
        margin-top: 2vw;
      }
      .list_con_list_title {
        width: 96%;
        margin-left: 2%;
        height: 11.5vw;
        background: white;
        font-size: 4.2vw;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        padding-right: 3vw;
        .list_tags,.health_tags,.safe_tags,.top_tags,.news_tags {
          position: relative;
          top: -0.5vw;
          background: #2A7FFF;
          font-size: 3vw;
          padding: 0.2vw 1vw;
          border-radius: 0.5vw;
          margin-right: 1vw;
          color: white;
          background: #6438f0;
        }
        .health_tags {
          background: #18BA8E;
        }
        .safe_tags {
          background: #0D98D9;
        }
        .top_tags {
          background: #F61D1D;
        }
        .news_tags {
          background: #1924FF;
        }
        .list_label {
          position: relative;
          top: -0.5vw;
          background: #2A7FFF;
          font-size: 3vw;
          padding: 0.2vw 1vw;
          border-radius: 0.5vw;
          margin-right: 1vw;
          color: white;
          background: #F61D1D;
        }
      }
      .oneLine {
        height: 6vw;
      }
      .list_con_list_time {
        float: left;
        font-size: 3.4vw;
        width: 45%;
        margin-left: 2%;
        color: #888888;
        margin-top: 1vw;
      }
      .list_con_list_source {
        float: right;
        font-size: 3.2vw;
        width: 45%;
        color: #888888;
        margin-top: 1vw;
        text-align: right;
        margin-right: 4%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .listOneLine {
      height: 13vw;
    }
    .display_opactiy {
      position: absolute;
      width: 100%;
      height: 20vw;
      bottom: 13vw;
      background: linear-gradient(180deg,rgba(255,255,255,0),#fff);
    }
  }
</style>
