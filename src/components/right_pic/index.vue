<template lang="pug">
  .right_pic
    .right_list(v-for="(item,index) in listArr" :key="index" @click="$emit('click',item.url)")
      .right_title {{item.board_name}}
      .list_pic
        //- iframe(:src="item.url" style="pointer-events: none;" width="100%" height="100%" frameborder="0")
        img(:src="item.cover || previews" style="width: 100%;height: 100%")
</template>
<script>
import api from '../../api/commonApi'
export default {
  name: 'right_pic',
  props: {
    title: {
      default: "全球疫情详情"
    },

  },
  data () {
    return {
      listArr: [],
      previews: require("../../static/images/previews.jpg"),
    }
  },
  created() {
    this.boardList()
  },
  methods: {
    async boardList() {
      let res = await api.boardList()
      res.list.map(async (item) => {
        if(!item.public_board) {
          // 7.31 dataV新增验证配置
          let res = await api.boardsGo({
            id: item.id
          })
          item.url = res.url
        }
      })
      this.listArr = res.list
    },
  }
}
</script>

<style lang="less" scoped>
.right_pic {
  float: right;
  position: relative;
  width: 210px;
  height: calc(100% - 100px);
  background: white;
  overflow-y: auto;
  .right_list {
    width: 90%;
    height: 130px;
    // background: red;
    margin: auto;
    cursor: pointer;
    margin-top: 15px;
    &:nth-child(1) {
      margin-top: 0;
    }
    &:hover .right_title{
      font-weight: bold;
    }
    &:hover img {
      transform: scale(1.2);
      transition: .5s;
    }
    .right_title {
      font-size: 12px;
      color: #333;
      line-height: 20px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .list_pic {
      overflow: hidden;
      height: 100px;
      margin-top: 3px;
      width: 100%;
      img {
        width: 100%;
      }
    }
    
  }
}
</style>
