<template lang="pug">
  .appear
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav
      .employee_search
        .employee_search_con
          .search_li
            label 上报信息：
            el-input.title_input(
              placeholder="请输入关键词"
              v-model="keyword"
              clearable
            )
          .search_li.margin_top15
            label 上报人：
            //- @change="searchFn"
            el-select(v-model="employeeVal" filterable placeholder="请选择" clearable) 
              el-option(
                v-for="item in employeeArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              )
            label(style='margin-left: 20px') 所在地区：
            el-select(v-model="value" placeholder="请选择" filterable clearable) 
              el-option(
                v-for="item in options"
                :key="item.id"
                :label="item.full_area_name"
                :value="item.id"
              )
            label(style='margin-left: 20px') 所在项目：
            el-select(v-model="projectVal" filterable placeholder="选择项目" clearable) 
              el-option(
                v-for="item in projectArr"
                :key="item.id"
                :label="item.project_name"
                :value="item.id"
              )

            label(style='margin-left: 20px') 所在营地：
            el-select(v-model="campVal" filterable placeholder="所属营地" clearable) 
              el-option(
                v-for="item in campArr"
                :key="item.id"
                :label="item.camp_name"
                :value="item.id"
              )
            el-button(type="primary" style="float: right" @click="searchFn(index)") 查询
          .search_li.margin_top15(v-if="searchShow")
            label 上报时间：
            el-date-picker(
              v-model="add_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="timestamp"
              )
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
          :header-cell-style="{background: '#EEEEEE'}"
        )
          el-table-column(prop="content" label="上报信息" min-width="200" show-overflow-tooltip)
            template(slot-scope="scope")
              span(v-if="scope.row.read") {{scope.row.content}}
              span(v-else style="font-weight: bold") {{scope.row.content}}
          el-table-column(prop="name" label="上报人" width="100" show-overflow-tooltip)
          el-table-column(prop="telephone" label="联系方式" min-width="140")
          el-table-column(prop="full_area_name" label="所属地区" min-width="120" show-overflow-tooltip)
          el-table-column(prop="camp_name" label="所属营地" min-width="120" show-overflow-tooltip)
          el-table-column(prop="project_name" label="所属项目" min-width="120" show-overflow-tooltip)
          el-table-column(prop="add_times" label="上报时间" min-width="120" show-overflow-tooltip)
          el-table-column(label="操作" width="120")
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
  name: 'appear',
  components: { 
    Nav,
    leftNav,
  },
  data () {
    return {
      searchShow: false,
      add_time: '',
      dates: '',
      name: '',
      keyword: '',
      employeeArr: '',
      employeeVal: '',
      campVal: '',
      campArr: [],
      projectVal: '',
      projectArr: [],
      value: '',
      currentpage: 1,
      pages: '',
      tableData: [],
      options: ''
    }
  },
  created() {
    this.listFn()
    this.areaListFn()
    this.selectListFn()
  },
 methods: {
    async areaListFn() {
      let res = await api.areaList({
        pagesize: 9999
      })
      this.options = res.list
    },
    // 上报人 - 下拉菜单
    async selectListFn() {
      this.employeeArr = await this.$select.reportFn()
      this.campArr = await this.$select.campFn()
      this.projectArr = await this.$select.projectFn()
    },
    async listFn() {
      let res = await api.appearList()
      this.tableData = res.list
      this.tableData.map((item)=> {
        this.$set(item,'add_times',formatTimeToStr(item.add_time * 1000))
      })
      this.pages = res.pagecount
    },
    pageFn(val) {
      this.currentpage = val
      this.listFn()
    },
    // info
    async appearInfoFn(id) {
      var datas = {
        id: id
      }
      let res = await api.appearInfo(datas)
      this.dialogObjs = res.info
    },
    // 查看详情
    goDetailFn(row) {
      let routeData = this.$router.resolve({path:'/appear_detail',query: {id: row.id}})
      window.open(routeData.href, '_blank')
    },
    // 查询
    async searchFn(index) {
      if(index == 1) {
        this.currentpage = 1
      }
      let add_time_end,add_time_start
      if(this.add_time) {
        add_time_start = this.add_time[0]/1000
        add_time_end = this.add_time[1]/1000
      }
      let datas = {
        q: this.keyword,
        area_id: this.value,
        camp_id: this.campVal,
        project_id: this.projectVal,
        employee_id: this.employeeVal,
        time_start_begin: add_time_start,
        time_start_end: add_time_end
      }
      if(this.value == "") {
        delete datas.area_id
      }
      if(this.projectVal == "") {
        delete datas.project_id
      }
      if(this.campVal == "") {
        delete datas.camp_id
      }
      if(this.employeeVal == "") {
        delete datas.employee_id
      }
      let res = await api.appearList(datas)
      this.tableData = res.list
      this.tableData.map((item)=> {
        this.$set(item,'add_times',formatTimeToStr(item.add_time * 1000))
      })
      this.pages = res.pagecount
    }
 }
}
</script>

<style lang="less" scoped>
.appear {
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
  .appear .el-date-editor .el-range__icon,.appear .el-date-editor .el-range__close-icon {
    line-height: 22px;
  }
  .appear .el-date-editor .el-range-separator {
    line-height: 23px;
  }
  .appear .el-input__inner {
    height: 30px;
  }
  .appear .el-input__icon {
    line-height: 30px;
  }
  .appear .el-button {
    padding: 7px 10px;
  }
  .el-tooltip__popper {
    max-width:30%
  }

</style>