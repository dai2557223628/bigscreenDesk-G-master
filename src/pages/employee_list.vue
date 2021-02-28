<template lang="pug">
  .employee_list
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:homeShow="false")
    //- .animate__animated.animate__ease-out.animate__delay-2s.animate__bounceInRight
    .employee_bg
      .employee_search
        .search_title 员工列表
        el-input(
          placeholder="姓名"
          v-model="username"
          clearable
        )
        el-input(
          placeholder="岗位"
          v-model="department"
          clearable
        )
        el-input(
          placeholder="联系方式"
          v-model="telephone"
          clearable
        )
        el-select(v-model="areaVal" filterable @change="searchFn" placeholder="所在地区" clearable) 
          el-option(
            v-for="item in areaArr"
            :key="item.id"
            :label="item.full_area_name"
            :value="item.id"
          )
        el-select(v-model="projectVal" filterable @change="searchFn" placeholder="选择项目" clearable) 
          el-option(
            v-for="item in projectArr"
            :key="item.id"
            :label="item.project_name"
            :value="item.id"
          )
        el-select(v-model="campVal" filterable @change="searchFn" placeholder="所在营地" clearable) 
          el-option(
            v-for="item in campArr"
            :key="item.id"
            :label="item.camp_name"
            :value="item.id"
          )
        el-button(type="primary" style="margin-left: 12px" @click="searchFn") 查询
        el-button(@click="exportFn") 导出
      .employee_form
        //- color: '#333',fontWight: bold
        el-table(
          id="lafite_datas"
          :data="tableData"
          :header-cell-style="{background: '#EEEEEE'}"
        )
          el-table-column(prop="id" label="编号" min-width="90")
          el-table-column(prop="name" label="姓名" min-width="90")
          el-table-column(prop="department" label="岗位" min-width="100")
          el-table-column(prop="telephone" label="联系方式" min-width="120")
          el-table-column(prop="full_area_name" label="所在地区" min-width="150" show-overflow-tooltip)
          el-table-column(prop="project_name" label="项目" min-width="150" show-overflow-tooltip)
          el-table-column(prop="camp_name" label="所在营地" min-width="150" show-overflow-tooltip)
          //- el-table-column(prop="risk" label="当地风险指数" width="110")
          //- el-table-column(prop="during" label="驻扎时长（天）" width="120")
          el-table-column(prop="times" label="创建时间" width="180")
        el-pagination(
          background
          layout="prev, pager, next"
          @current-change="pageFn"
          :total="pages*10"
        )
</template>

<script>
import Nav from "../components/nav"
import api from "../api/commonApi"
import {formatTimeToStr} from "../api/fomat_time"
import Excel from "../api/excel"
export default {
  name: 'employee_list',
  components: { 
    Nav,
  },
  props: {
    // listArr: {
    //   type: Array,
    //   default() {
    //     return []
    //   }
    // },
  },
  data () {
    return {
      username: '',
      telephone: '',
      areaArr: '',
      areaVal: '',
      name: '',
      value: '',
      tableData: [],
      currentpage: 1,
      pages: '',
      projectArr: '',
      campArr: '',
      campVal: '',
      projectVal: '',
      department: ''
    }
  },
  created() {
    this.listFn()
    this.areaListFn()
  },
 methods: {
    async listFn() {
      let res = await api.employeeList()
      this.tableData = res.list
      for(let i = 0; i < res.list.length; i++) {
        this.$set(this.tableData[i],'times',formatTimeToStr(res.list[i].add_time * 1000))
      }
    },
    pageFn(val) {
      this.currentpage = val
      this.listFn()
    },
    // 地区下拉菜单
    async areaListFn() {
      this.campArr = await this.$select.campFn()
      this.projectArr = await this.$select.projectFn()
      let res = await api.areaList({
        pagesize: 9999
      })
      this.areaArr = res.list
    },
    // 项目下来菜单

    // 查询
    async searchFn() {
      let datas = {
        q: this.username,
        area_id: this.areaVal,
        telephone: this.telephone,
        project_id: this.projectVal,
        camp_id: this.campVal,
        department: this.department
      }
      if(this.areaVal == "") {
        delete datas.area_id
      }
      if(this.campVal == "") {
        delete datas.camp_id
      }
      if(this.projectVal == "") {
        delete datas.project_id
      }
      let res = await api.employeeList(datas)
      this.tableData = res.list
      for(let i = 0; i < res.list.length; i++) {
        this.$set(this.tableData[i],'times',formatTimeToStr(res.list[i].add_time * 1000))
      }
    },
    // 导出
    exportFn() {
      Excel.exportExcel("员工列表.xlsx")
    }
 }
}
</script>

<style lang="less" scoped>
.employee_list {
  .employee_bg {
    float: left;
    width: 100%;
    height: auto;
    padding-bottom: 80px;
    background: #EEEEEE;
    .employee_search {
      float: left;
      width: calc(100% - 120px);
      height: 100px;
      background: white;
      margin-left: 60px;
      margin-top: 20px;
      margin-left: 60px;
      border-radius: 10px;
      .search_title {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        text-indent: 40px;
        padding-top: 15px;
        padding-bottom: 10px;
      }
      .el-input,.el-select {
        width: 150px;
        margin-left: 12px;
        &:nth-child(2) {
          margin-left: 40px;
        }
      }
    }
    .employee_form {
      float: left;
      width: calc(100% - 120px);
      min-height: 650px;
      background: white;
      margin-top: 30px;
      margin-left: 60px;
      border-radius: 10px;
      
      .el-table {
        width: calc(100% - 80px);
        margin-left: 40px;
        margin-top: 20px;
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
  .el-button {
    padding: 7px 10px;
  }
</style>