<template lang="pug">
  .bulletin
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
            label 事发地点：
            //- @change="searchFn"
            el-select(v-model="optionsId" filterable placeholder="请选择" clearable) 
              el-option(
                v-for="item in options"
                :key="item.id"
                :label="item.full_area_name"
                :value="item.id"
              )
            el-button(type="primary" style="float: right" @click="searchFn(1)") 查询
          .search_li.margin_top15(v-if="searchShow")
            label 事件类型：
            el-checkbox-group(v-model="checkListType")
              el-checkbox(style="margin-top: 10px;" v-for="(item,index) in typeList" :label="item.id" :key="index") {{item.name}}
          .search_li.margin_top15(v-if="searchShow")
            label 事发时间：
            el-date-picker(
              v-model="expire_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
              )
            label(style='margin-left: 10px') 发布时间：
            el-date-picker(
              v-model="add_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              )
          .search_li.margin_top15(v-if='searchShow')
            el-checkbox(v-model="follow") 只查看我关注的国家（选择后将一只保持直到主动取消）【{{followName}}等{{followArrs.length}}个国家】
            span.follow_city(@click="dialogTurn = true")
              i(class="el-icon-plus")
              | 增减关注国家
          .search_li.margin_top15(style='text-align: center;font-size: 14px;color: #888888;cursor: pointer;')
            span(v-if="searchShow" @click="searchShow = !searchShow")
              | 收起筛选
              span(class='iconfont iconshouqi' style='font-size: 12px;margin-left: 5px;') 
            span(v-else @click="searchShow = !searchShow")
              | 展开刷选
              span(class='iconfont iconzhankai' style='font-size: 12px;margin-left: 5px;')
      .employee_form
        el-table(
          :data="tableData"
          :header-cell-style="{background: '#EEEEEE'}"
        )
          el-table-column(prop="title" label="标题" min-width="200" show-overflow-tooltip)
            template(slot-scope="scope")
              span(v-if="scope.row.read") {{scope.row.title}}
              span(v-else style="font-weight: bold") {{scope.row.title}}
          el-table-column(prop="country_name" label="事发地点" min-width="120")
          el-table-column(prop="occur_time" label="事发时间" min-width="120")
          el-table-column(prop="display_time" label="发布时间" min-width="120")
          el-table-column(label="操作" width="140")
            template(slot-scope="scope")
              .look_details(@click="goDetailFn(scope.row)") 查看详情
        el-pagination(
          background
          layout="prev, pager, next"
          :current-page="currentpage"
          @current-change="pageFn"
          :total="pages*10"
        )
        coverDialog(v-if="followArrs" :followArr="followArrs" :followList="followList" :dialogShow="dialogTurn" @dialogExit="dialogTurn = $event" @submitSuccess="warningSubmitSuccess")
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import coverDialog from "../components/cover_dialog"
import api from "../api/commonApi"
export default {
  name: 'bulletin',
  components: { 
    Nav,
    leftNav,
    coverDialog
  },
  data () {
    return {
      dates: '',
      title: '',
      options: [],
      checkListType: [],
      follow: false,
      searchShow: false,
      dialogTurn: false,
      add_time: '', //发布时间段
      expire_time: '', //有效期
      value: '',
      currentpage: 1,
      pages: '',
      optionsId: '',
      followList: '',
      followName: '',
      followArrs: '',
      tableData:[],
      typeList: [
        {id: 1, name: '政治事件'},
        {id: 2, name: '武装冲突'},
        {id: 3, name: '宗教或教派冲突'},
        {id: 4, name: '民族矛盾或部落冲突'},
        {id: 5, name: '战争'},
        {id: 6, name: '恐怖主义'},
        {id: 7, name: '社会治安'},
        {id: 8, name: '群体性事件'},
        {id: 9, name: '自然灾害'},
        {id: 10, name: '事故和灾难'},
        {id: 11, name: '疾病疫情'},
        {id: 12, name: '其它'},
        {id: 80, name: '经济事件'},
        {id: 84, name: '涉华舆论舆情'},
        {id: 83, name: '难民潮'}
      ]
    }
  },
  created() {
    this.listFn()
    this.areaListFn()
    this.followCountry()
  },
 methods: {
    async followCountry() {
      let res = await api.myInfo()
      let followArr = [];
      if(res.info.follow_area_ids == null) {
        res.info.follow_area_ids = []
        this.followList = []
        this.followArrs = res.info.follow_area_list
      }else {
        this.followList = res.info.follow_area_ids.split(",")
        this.followArrs = res.info.follow_area_list
        res.info.follow_area_list.map((item) => {
          followArr.push(item.area_name)
        })
        this.followName = followArr.join("、")
      }
    },
    async listFn() {
      var datas = {
        page: this.currentpage
      }
      let res = await api.bulletinList(datas)
      this.tableData = res.list
      this.pages = res.pagecount
    },
    async areaListFn() {
      let res = await api.areaList({
        pagesize: 9999
      })
      this.options = res.list
    },
    // 子组件触发父组件
    warningSubmitSuccess() {
      this.dialogTurn = false
      this.followCountry()
    },
    pageFn(val) {
      this.currentpage = val
      this.searchFn()
    },
    // 查看详情
    goDetailFn(row) {
      let routeData = this.$router.resolve({path:'/bulletin_detail',query: {id: row.news_id}})
      window.open(routeData.href, '_blank')
    },
    // 查询
    async searchFn(index) {
      if(index == 1) {
        this.currentpage = 1
      }
      let tagList = this.checkListType.join(",")
      let add_time_start,add_time_end,expire_time_end,expire_time_start
      if(this.add_time) {
        add_time_start = this.add_time[0]/1000
        add_time_end = this.add_time[1]/1000
      }
      if(this.expire_time) {
        expire_time_start = this.expire_time[0]/1000
        expire_time_end = this.expire_time[1]/1000
      }
      var datas = {
        title: this.title,
        area_id: this.optionsId,
        page: this.currentpage,
        add_time_start_begin: add_time_start,
        add_time_start_end: add_time_end,
        occur_time_start_begin: expire_time_start,
        occur_time_start_end: expire_time_end,
        special_class_cid: tagList,
        limit_in_follow_country: this.follow ? 1:''
      }
      if(tagList == "") {
        delete datas.special_class_cid
      }
      let res = await api.bulletinList(datas)
      this.tableData = res.list
      this.pages = res.pagecount
    }
 }
}
</script>

<style lang="less" scoped>
.bulletin {
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
  .bulletin .el-date-editor .el-range__icon,.bulletin .el-date-editor .el-range__close-icon {
    line-height: 22px;
  }
  .bulletin .el-date-editor .el-range-separator {
    line-height: 23px;
  }
  .el-button {
    padding: 7px 10px;
  }
</style>