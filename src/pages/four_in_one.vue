<template lang="pug">
  .four_in_one(v-if="iframeArr.length > 0")
    iframe(v-for="item in iframeArr" :src="item" frameborder="0")
</template>
<script>
import api from "../api/commonApi"
import tokenService from "@/utils/services/token_service";
export default {
  components: { },
  name: 'four_in_one',
  data () {
    return {
      iframeArr: []
    }
  },
  created() {
    this.iframeArr = this.$route.query.urls
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
  .four_in_one {
    position: relative;
    width: 100%;
    height: 100%;
    background: black;
    iframe {
      float: left;
      width: 48%;
      height: 48%;
      margin-left: 1%;
      margin-top: 1%;
    }
  }
</style>


