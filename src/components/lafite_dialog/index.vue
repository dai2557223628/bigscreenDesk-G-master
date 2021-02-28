<template lang="pug">
  //- 弹窗
  el-dialog(
    title="查看详情"
    :visible="dialogShow"
    :modal-append-to-body="false"
    :before-close="handleClose"
    width="60%"
  ) 
    .dialog_con(v-if="routers != 'appear'")
      .dialog_title {{dialogObj.title}}
      .dialog_time 
        | 发布时间: {{dialogObj.display_time || dialogObj.add_time || dialogObj.occur_time}}
      .dialog_time 
        //- | 生效时间: {{dialogObj.occur_time}}
      .dialog_time(v-if="dialogObj.classname") 
        | 预警类型: {{dialogObj.classname}}
      .dialog_time(v-if="dialogObj.author") 
        | 发布人: {{dialogObj.author}}
      .dialog_mains(v-if="warnShow")
        .dialog_trend  事件分析与发展趋势:
        .dialog_trend_text {{dialogObj.trend_prediction}}
        .dialog_trend  提醒建议:
        .dialog_trend_text {{dialogObj.security_reminder}}
      .dialog_content(v-else v-html="dialogObj.content")
    .dialog_con2(v-else)
      .dialog_title 上报信息：{{dialogObj.content}}
      .dialog_title 上报人：{{dialogObj.name}}
      .dialog_title 上报时间：{{dialogObj.times}}
      .dialog_title 所在地区：{{dialogObj.full_area_name}}
      .dialog_title 所属项目：{{dialogObj.project_name}}
      .dialog_title 所在营地：{{dialogObj.camp_name}}
</template>

<script>
import {formatTimeToStr} from "../../api/fomat_time"
export default {
  name: 'lafite_dialog',
  props: {
    dialogObj: {
      type: Object,
      default() {
        return {}
      }
    },
    warnShow: {
      type: Boolean,
      default: false
    },
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      routers: this.$route.name
    }
  },
  created() {
    this.timeFn()
  },
  methods: {
    // 时间格式化
    timeFn() {
      if(this.dialogObj.add_time) {
        this.$set(this.dialogObj,'times',formatTimeToStr(this.dialogObj.add_time * 1000))
        this.$set(this.dialogObj,'add_time',formatTimeToStr(this.dialogObj.add_time * 1000))
      }
    },
    handleClose() {
      this.$emit('dialogExit',false);
    }
  }
}
</script>

<style lang="less" scoped>
  .dialog_title {
    font-size: 18px;
    text-align: center;
  }
  .dialog_trend {
    margin-top: 50px;
  }
  .dialog_trend_text {
    margin-top: 10px;
  }
  .dialog_content {
    width: 100%;
    margin-top: 50px;
    font-size: 16px;
  }
  .dialog_time {
    float: left;
    width: calc(100%/3);
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
  }
  .dialog_con2 {
    .dialog_title {
      text-align: left;
      font-size: 17px;
      margin-top: 10px;
      &:nth-child(1) {
        margin-top: 0px;
      }
    }

  }
</style>
