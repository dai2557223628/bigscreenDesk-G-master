<template lang="pug">
  .notice
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(title="安全信息")
      .employee_search
        .employee_search_con
          .search_li
            label 标题：
            el-input.title_input(
              placeholder="请输入关键词"
              v-model="title"
              clearable
            )
          .search_li.margin_top15
            label 发布人：
            //- @change="searchFn"
            el-select(v-model="authorVal" filterable placeholder="请选择" clearable) 
              el-option(
                v-for="item in authorArr"
                :key="item.id"
                :label="item.username"
                :value="item.username"
              )
            label(style='margin-left: 20px') 发布时间：
            el-date-picker(
              v-model="add_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
              )
            el-button(type="primary" style="float: right" @click="searchFn(index)") 查询
          //- .search_li.margin_top15(style='text-align: center;font-size: 14px;color: #888888;cursor: pointer;')
            span(v-if="searchShow" @click="searchShow = !searchShow")
              | 收起筛选
              span(class='iconfont iconshouqi' style='font-size: 12px;margin-left: 5px;') 
            span(v-else @click="searchShow = !searchShow")
              | 展开刷选
              span(class='iconfont iconzhankai' style='font-size: 12px;margin-left: 5px;')
      .employee_form
        //- color: '#333',fontWight: bold
        el-table(
          :data="tableData"
          :header-cell-style="{background: '#EEEEEE'}"
        )
          el-table-column(prop="id" label="编号" min-width="90")
          el-table-column(prop="title" label="公告标题" min-width="200" show-overflow-tooltip)
            template(slot-scope="scope")
              span(v-if="scope.row.read") {{scope.row.title}}
              span(v-else style="font-weight: bold") {{scope.row.title}}
          el-table-column(prop="dates" label="有效时间" min-width="180" show-overflow-tooltip)
          el-table-column(prop="times" label="发布时间" min-width="140")
          //- el-table-column(prop="author" label="发布人" min-width="120")
          el-table-column(label="操作" width="140")
            template(slot-scope="scope")
              .look_details(@click="goDetailFn(scope.row)")
                span(v-if="scope.row.read" style="color: gray") 已读，查看详情
                span(v-else) 查看详情
        el-pagination(
          background
          layout="prev, pager, next"
          :current-page="currentpage"
          @current-change="pageFn"
          :total="pages*10"
        )
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import api from "../api/commonApi"
import {formatTimeToStr} from "../api/fomat_time"
export default {
  name: 'notice',
  components: { 
    Nav,
    leftNav
  },
  props: {
  },
  data () {
    return {
      title: '',
      options: [],
      riskArr: [],
      add_time: '',
      currentpage: 1,
      pages: '',
      authorArr: [],
      authorVal: '',
      tableData: [],
    }
  },
  created() {
    this.listFn()
    this.authorFn()
  },
 methods: {
    async listFn() {
      var datas = {
        page: this.currentpage
      }
      let res = await api.noticeList(datas)
      this.tableData = res.list
      for(let i = 0; i < res.list.length; i++) {
        this.$set(this.tableData[i],'times',formatTimeToStr(res.list[i].add_time * 1000))
        this.$set(this.tableData[i],'dates',formatTimeToStr(res.list[i].active_time_begin * 1000) + '至'+formatTimeToStr(res.list[i].active_time_end * 1000))
      }
      this.pages = res.pagecount
    },
    pageFn(val) {
      this.currentpage = val
      this.searchFn()
    },
    // 查看详情
    goDetailFn(row) {
      let routeData = this.$router.resolve({path:'/notice_detail',query: {id: row.id}})
      window.open(routeData.href, '_blank')
    },
    // 查询
    async searchFn(index) {
      if(index == 1) {
        this.currentpage = 1
      }
      let add_time_start,add_time_end
      if(this.add_time) {
        add_time_start = this.add_time[0]/1000
        add_time_end = this.add_time[1]/1000
      }
      var datas = {
        page: this.currentpage,
        q: this.title,
        author: this.authorVal,
        add_time_start_begin: add_time_start,
        add_time_start_end: add_time_end
      }
      let res = await api.noticeList(datas)
      this.tableData = res.list
      for(let i = 0; i < res.list.length; i++) {
        this.$set(this.tableData[i],'times',formatTimeToStr(res.list[i].add_time * 1000))
        this.$set(this.tableData[i],'dates',formatTimeToStr(res.list[i].active_time_begin * 1000) + '至'+formatTimeToStr(res.list[i].active_time_end * 1000))
      }
      this.pages = res.pagecount
    },
    // 发布人列表
    async authorFn() {
      let res = await api.authorList({
        hide_empty_notice: 1
      })
      this.authorArr = res.list
    }
 }
}
</script>

<style lang="less" scoped>
.notice {
  .employee_bg {
    float: left;
    width: 100%;
    height: auto;
    padding-bottom: 80px;
    background: #EEEEEE;
    .employee_search {
      float: left;
      width: calc(100% - 330px);
      min-height: 90px;
      background: white;
      margin-left: 60px;
      margin-top: 20px;
      padding-top: 15px;
      padding-bottom: 15px;
      margin-left: 60px;
      border-radius: 5px;
      .employee_search_con {
        width: 92%;
        margin: auto;
        .margin_top15 {
          margin-top: 15px;
          .el-select {
            width: 150px;
          }
          .el-checkbox-group {
            display: inline-block;
            .el-checkbox {
              color: #909399;
              font-size: 14px;
            }
          }
          .el-checkbox {
            color: #333;
            font-size: 14px;
          }
          .follow_city {
            font-size: 14px;
            color: #2888FF;
            cursor: pointer;
          }
        }
        label {
          font-size: 14px;
          color: #333333;
        }
        .title_input {
          width: 70%;
        }
      }
      .search_title {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        text-indent: 40px;
        padding-top: 15px;
        padding-bottom: 10px;
      }
      // .el-input,.el-select {
      //   width: 150px;
      //   margin-left: 12px;
      //   &:nth-child(1) {
      //     margin-left: 40px;
      //   }
      // }
    }
    .employee_form {
      float: left;
      width: calc(100% - 330px);
      min-height: 650px;
      background: white;
      margin-top: 30px;
      margin-left: 60px;
      border-radius: 10px;
      
      .el-table {
        width: calc(100% - 80px);
        margin-left: 40px;
        margin-top: 20px;
        .look_details {
          cursor: pointer;
          color: #2B74EA;
        }
      }
      .el-pagination {
        text-align: right;
        margin-top: 20px;
        padding-right: 35px;
      }
    }
  }
}
</style>
<style>
  .el-input__inner {
    height: 30px;
  }
  .el-input__icon {
    line-height: 30px;
  }
  .notice .el-date-editor .el-range__icon,.notice .el-date-editor .el-range__close-icon {
    line-height: 22px;
  }
  .notice .el-date-editor .el-range-separator {
    line-height: 23px;
  }
  .el-button {
    padding: 7px 10px;
  }
</style>