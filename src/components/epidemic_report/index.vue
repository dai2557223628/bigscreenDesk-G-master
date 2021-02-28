<template lang="pug">
  .epidemic_report
    .epidemic_report_con
      Title(title="疫情快讯")
      .epidemic_report_left
        .epidemic_time_li(v-for="(item,index) in dataArr" :key="index") 
          img(src="../../static/images/icon_circle.png")
          .time_tile {{item.time_name}}
          .time_span {{item.display_time}}
      .epidemic_report_right 
        router-link.epidemic_right_li(v-for="(item,index) in dataArr" :key="index" :to="{name: 'details',query:{id: item.news_id}}")
          .epidemic_right_title 
            span.title_city(v-if="item.country_name && cityShow") {{item.country_name}}
            span.title_type(v-if="item.classname") {{item.classname}}
            | {{item.title}}
          .epidemic_right_con(v-html="item.content")
          .epidemic_right_source 信息来源:{{item.source_name}}
    .display_opactiy
    lookMore(:links="{name:'list',query:{class_id: class_id,country_id: routerId,tagShow: true,cityShow: cityShow}}")
</template>

<script>
import Title from "../Title"
import lookMore from "../look_more"
export default {
  name: 'epidemic_report',
  components: { Title,lookMore },
  props: {
    routerId: {
      default: ''
    },
    cityShow: {
      type: Boolean,
      default: true
    },
    class_id: {
      default: ""
    },
    dataArr: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      
    }
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
  .epidemic_report {
    float: left;
    position: relative;
    width: 100%;
    height: 190vw;
    // padding-bottom: 5vw;
    // background: chartreuse;
    .epidemic_report_con {
      width: 96%;
      margin-left: 2%;
      margin-top: 5%;
      height: 90%;
      .epidemic_report_left {
        float: left;
        width: 22%;
        height: 98%;
        margin-top: 5%;
        // background: yellow;
        .epidemic_time_li {
          position: relative;
          height: 25%;
          width: 100%;
          color: #666666;
          text-align: right;
          border-right: 1px solid #F4F4F4;
          // background: pink;
          img {
            position: absolute;
            right: -1.5vw;
            // top: .5vw;
            width: 3vw;
          }
          
          .time_tile {
            font-size: 3.8vw;
            margin-right: 10%;
          }
          .time_span {
            font-size: 3.5vw;
            margin-right: 10%;
          }
        }
      }
      .epidemic_report_right {
        float: right;
        width: 73%;
        height: 100%;
        margin-top: 3%;
        // background: crimson;
        .epidemic_right_li {
          display: block;
          height: 22%;
          width: 100%;
          border-radius: 2vw;
          background: #F4F4F4;
          margin-top: 4%;
          &:nth-of-type(1) {
            margin-top: 0;
          }
          .epidemic_right_title {
            font-size: 4vw;
            color: #333333;
            font-weight: bold;
            width: 94%;
            margin-left: 3%;
            padding-top: 2vw;
            height: 11vw;
            // background: pink;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            span {
              position: relative;
              color: white;
              font-size: 2.6vw;
              padding: .2vw .8vw;
              border-radius: .3vw;
              margin-right: 1vw;
              top: -.5vw;
            }
            .title_city {
              background: #2A7FFF;
            }
            .title_type {
              background: #FF8E2A;
            }
          }
          .epidemic_right_con {
            width: 94%;
            height: 18vw;
            margin-left: 3%;
            margin-top: -1vw;
            color: #888;
            font-size: 3.5vw;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .epidemic_right_source {
            text-align: right;
            font-size: 3vw;
            color: #888888;
            width: 94%;
            margin-top: 1.5vw;
            margin-left: 3%;
          }
        }
      }
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
