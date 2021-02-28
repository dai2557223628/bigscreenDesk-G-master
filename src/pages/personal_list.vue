<template lang="pug">
  .warning
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(title="个人管理" :leftArr="leftList")
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
            label 地区：
            //- @change="searchFn"
            el-select(v-model="optionsId" filterable placeholder="请选择" clearable) 
              el-option(
                v-for="item in options"
                :key="item.id"
                :label="item.full_area_name"
                :value="item.id"
              )
            label(style='margin-left: 20px') 预警级别：
            el-checkbox-group(v-model="checkList")
              el-checkbox(label="极高")
              el-checkbox(label="高")
              el-checkbox(label="中等")
            label(style='margin-left: 20px') 类型：
            el-checkbox-group(v-model="checkListType")
              el-checkbox(label="17") 官方预警
              el-checkbox(label="18") 官方提醒
            el-button(type="primary" style="float: right" @click="searchFn(1)") 查询
          .search_li.margin_top15(v-if="searchShow")
            label 发布时间：
            el-date-picker(
              v-model="add_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
              )
            label(style='margin-left: 20px') 有效期：
            el-date-picker(
              v-model="expire_time"
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
        //- color: '#333',fontWight: bold
        el-table(
          :data="tableData"
          v-loading="tableLoading"
          :header-cell-style="{background: '#EEEEEE'}"
        )
          //- el-table-column(label="编号" min-width="90" type="index" :index="indexMethod")
          el-table-column(prop="title" label="标题" min-width="200" show-overflow-tooltip)
            template(slot-scope="scope")
              span(v-if="scope.row.read") {{scope.row.title}}
              span(v-else style="font-weight: bold") {{scope.row.title}}
          el-table-column(prop="country_name" label="地区" width="120")
          el-table-column(prop="level" label="预警级别" width="80")
            template(slot-scope="scope")
              span(v-if="scope.row.level" style="color: #FF1B1B") {{scope.row.level}}
              span(v-else) -
          el-table-column(prop="classname" label="类型" width="90")
          el-table-column(prop="display_time" label="发布时间" min-width="120" show-overflow-tooltip)
          el-table-column(prop="expire_at" label="有效期" min-width="120" show-overflow-tooltip)
          el-table-column(prop="active" label="生效状态" width="100")
            template(slot-scope="scope")
              span(v-if="scope.row.active" style="color: #FF1B1B") 生效中
          el-table-column(label="操作" width="100")
            template(slot-scope="scope")
              .look_details(@click="goDetailFn(scope.row)") 查看详情
        el-pagination(
          background
          :current-page="currentpage"
          layout="prev, pager, next"
          @current-change="pageFn"
          :total="pages*10"
        )
        coverDialog(v-if="followArrs" :followArr="followArrs" :followList="followList" :dialogShow="dialogTurn" @dialogExit="dialogTurn = $event" @submitSuccess="warningSubmitSuccess")
        //- lafiteDialog(:dialogObj="dialogObjs" :warnShow="true" :dialogShow="dialogTurn" @dialogExit="dialogTurn = $event")
          
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import lafiteDialog from "../components/lafite_dialog"
import coverDialog from "../components/cover_dialog"
import api from "../api/commonApi"
export default {
  name: 'warning',
  components: { 
    Nav,
    leftNav,
    coverDialog,
    lafiteDialog
  },
  props: {
    
  },
  data () {
    return {
      tableLoading: true,
      title: '', //标题查询
      dates: '',
      name: '',
      options: [],
      checkList: [],
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
      dialogObjs: {},
      leftList: [
        {name: "个人列表", path: 'personal_list'},
        {name: "新增个人", path: 'create_personal'},
        {name: "分组列表", path: 'group_list'},
        {name: "新增分组", path: 'create_group'}
      ]
    }
  },
  created() {
    this.followCountry()
    this.selectListFn()
    this.listFn()
  },
 methods: {
    async selectListFn() {
      let res = await api.areaList({
        pagesize: 9999
      })
      this.options = res.list
    },
    async listFn() {
      var datas = {
        page: this.currentpage,
        type: 2
      }
      let res = await api.warningList(datas)
      this.tableLoading = false
      this.tableData = res.list
      this.pages = res.pagecount
    },
    // 子组件触发父组件
    warningSubmitSuccess() {
      this.dialogTurn = false
      this.followCountry()
    },
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
    pageFn(val) {
      this.currentpage = val
      this.searchFn()
    },
    // info
    async warningInfoFn(id) {
      var datas = {
        id: id
      }
      let res = await api.warningInfo(datas)
      this.dialogObjs = res.info
    },
    // 查看详情
    goDetailFn(row) {
      let routeData = this.$router.resolve({path:'/warning_detail',query: {id: row.news_id}})
      window.open(routeData.href, '_blank')
    },
    // 查询
    async searchFn(index) {
      this.tableLoading = true
      if(index == 1) {
        this.currentpage = 1
      }
      let levelList = this.checkList.join(",")
      let cidList = this.checkListType.join(",")
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
        level: levelList,
        cid: cidList,
        type: 2,
        add_time_start_begin: add_time_start,
        add_time_start_end: add_time_end,
        expire_time_start_begin: expire_time_start,
        expire_time_start_end: expire_time_end,
        limit_in_follow_country: this.follow ? 1:''
      }
      let res = await api.warningList(datas)
      this.tableLoading = false
      this.tableData = res.list
      this.pages = res.pagecount
    }
 }
}
</script>

<style lang="less" scoped>
.warning {
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
  .employee_search .el-date-editor .el-range__icon,.employee_search .el-date-editor .el-range__close-icon {
    line-height: 22px;
  }
  .employee_search .el-date-editor .el-range-separator {
    line-height: 23px;
  }
  .el-button {
    padding: 7px 10px;
  }
</style>