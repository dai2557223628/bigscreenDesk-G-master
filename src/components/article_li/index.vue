<template lang="pug">
  .article_li(:class='nodashed ? "on_dashed":""' @click="goDetail(datas.news_id)")
    .ar_li_title
      .ar_li_city(v-if="cityShow ? datas.area_name:datas.country_name") {{cityShow ? datas.area_name:datas.country_name}}
      .ar_li_t {{datas.title}}
        span(v-if="datas.level") [级别 {{datas.level}}] 
        span(v-if="datas.expire_at") [有效期至{{datas.expire_at}}]
    .ar_li_info
      .ar_li_info_type(v-if="datas.classname") [{{datas.classname}}]
      .ar_li_i_time {{datas.display_time}}
      .ar_li_status(v-if="datas.active") {{datas.active ? '生效中':''}}
</template>

<script>
export default {
  name: 'article_li',
  props: {
    datas: {
      type: Object,
      default:()=> {}
    },
    nodashed: {
      type: Boolean,
      default: false
    },
    routers: {
      type: String,
      default: ''
    },
    cityShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      
    }
  },
  created() {
  },
  methods: {
    goDetail(ids) {
      if(this.routers != '') {
        let routeData = this.$router.resolve({
          name: this.routers,
          query: {id: ids},
        });
        window.open(routeData.href, '_blank');
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .article_li {
    width: 100%;
    height: 48px;
    border-bottom: 1px dashed #C4C4C4;
    cursor: pointer;
    .ar_li_title {
      display: flex;
      margin-top: 3px;
      .ar_li_city {
        color: white;
        font-size: 12px;
        padding: 2px 10px;
        background: #2570FA;
        border-radius: 2px;
        margin-top: 2px;
        margin-right: 10px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
      .ar_li_t {
        width: 80%;
        color: #333333;
        font-size: 14px;
        padding-top: 2px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        // line-height: 25px;
      }
    }
    .ar_li_info {
      display: flex;
      margin-top: 2px;
      font-size: 14px;
      color: #063AF4;
      .ar_li_i_time {
        color: #888888;
        margin-left: 8px;
        margin-top: 2px;
      }
      .ar_li_status {
        font-size: 12px;
        font-weight: bold;
        color: #FF1B1B;
        margin-top: 2px;
        margin-left: 8px;
      }
    }
  }
  .on_dashed {
    border: none;
  }
</style>