<template lang="pug">
  .report
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__bounceInLeft
    Nav(:codeArr='["18","19"]' @getCode="codeFn")
    //- .animate__animated.animate__ease-out.animate__delay-1s.animate__zoomIn
    .employee_bg
      leftNav(title="安全简报" :leftArr="leftList")
      .employee_search
        el-select(v-model="reportVal" filterable @change="searchFn" placeholder="请选择简报类型" clearable) 
          el-option(
            v-for="item in reportArr"
            :key="item.id"
            :label="item.label"
            :value="item.label"
          )
        el-select(v-model="value_area_id" filterable @change="searchFn" placeholder="请选择简报分析国家" clearable) 
          el-option(
            v-for="item in options"
            :key="item.id"
            :label="item.area_name"
            :value="item.id"
          )
        
        el-button(type="primary" style="margin-left: 12px" @click="searchFn") 查询
        //- el-button 重置

      .employee_form
        //- color: '#333',fontWight: bold
        el-table(
          v-loading="tableLoading"
          :data="tableData"
          :header-cell-style="{background: '#EEEEEE'}"
        )
          el-table-column(label="编号" min-width="100" type="index" :index="indexMethod")
          el-table-column(prop="type" label="简报类型" min-width="120")
          el-table-column(prop="area_name" label="简报分析国家" width="120")
          el-table-column(prop="classname" label="简报内容时间段" min-width="180")
            template(slot-scope="scope")
              span {{scope.row.from_time}}至{{scope.row.to_time}}
          el-table-column(prop="build_time" label="简报生成时间" min-width="120" show-overflow-tooltip)
          el-table-column(label="操作" width="300")
            template(slot-scope="scope")
              .look_details(@click="goDetailFn(scope.row)") 查看报告
              .look_details.copy_btn(v-if="shareShow" :data-clipboard-text="hrefs" @click="copy(scope.row)") 分享报告
              //- .look_details(@click="goDetailFn(scope.row,true)") 导出报告
              .look_details(v-if="delShow" @click="deleteFn(scope.row)") 删除报告
        el-pagination(
          background
          layout="prev, pager, next"
          @current-change="pageFn"
          :total="pages*10"
        )
        lafiteDialog(:dialogObj="dialogObjs" :warnShow="true" :dialogShow="dialogTurn" @dialogExit="dialogTurn = $event")  
</template>

<script>
import Nav from "../components/new_top_nav"
import leftNav from "../components/newleftNav"
import lafiteDialog from "../components/lafite_dialog"
import api from "../api/commonApi"
import Clipboard from "clipboard"

export default {
  name: 'report',
  components: { 
    Nav,
    leftNav,
    lafiteDialog
  },
  data () {
    return {
      tableLoading: true,
      title: '', //标题查询
      dates: '',
      name: '',
      options: [],
      reportArr: [
        {label: '全球公共安全风险简报', id: 28},
        {label: '国家公共安全风险简报', id: 17},
      ],
      currentpage: 1,
      value_area_id: '',
      pages: '',
      reportVal: '',
      tableData:[],
      dialogTurn: false,
      dialogObjs: {},
      hrefs: '',
      leftList: [
        {name: "生成简报", path: 'create_report'},
        {name: "简报列表", path: 'report'},
        // {name: "商务厅周报", path: 'bulletin'}
      ],
      shareShow: false,
      delShow: false
    }
  },
  created() {
    this.selectListFn()
  },
 methods: {
    codeFn(val) {
      if(val.indexOf("18") != -1) {
        this.shareShow = true
      }
      if(val.indexOf("19") != -1) {
        this.delShow = true
      }
    },

    //2020.7.6 新增编号前端自增
    indexMethod (index) {
      let curpage = this.currentpage  //单前页码，具体看组件取值
      let limitpage = 10  //每页条数，具体是组件取值
      return (index+1) + (curpage-1)*limitpage
    },
    async selectListFn() {
      let res = await api.reportCountryList()
      this.options = res.list
      this.listFn()
    },
    async listFn() {
      this.tableLoading = true
      var datas = {
        page: this.currentpage
      }
      let res = await api.reportList(datas)
      this.tableLoading = false
      this.tableData = res.list
      this.pages = res.pagecount
    },
    pageFn(val) {
      this.currentpage = val
      this.listFn()
    },
    // 查看详情
    goDetailFn(row,turn) {
      if(row.type == "国家公共安全风险简报") {
        window.open('http://report.ciwei.com/#/?share_hash='+row.share_hash, '_blank');
      }else {
        window.open('http://report.ciwei.com/#/g_home?share_hash='+row.share_hash, '_blank');
      }
    },
    // 复制功能
    copy(rows) {
      var _this = this;
      if(rows.type == "全球公共安全风险简报") {
        _this.hrefs = 'http://report.ciwei.com/#/g_home?share_hash='+rows.share_hash
      }else {
        _this.hrefs = 'http://report.ciwei.com/#/?share_hash='+rows.share_hash
      }
      var clipboard = new Clipboard(".copy_btn"); //单页面引用
      clipboard.on("success", e => {
        this.$notify.success({
          title: '成功',
          message: '报告链接已复制，可直接粘贴到微信对话框等窗口发送给好友。'
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$notify.error({
          title: '错误',
          message: '不支持复制功能'
        });
        // 释放内存
        clipboard.destroy();
      });
    }, 　　
    // 查询
    async searchFn() {
      // this.currentpage = 1
      var datas = {
        area_id: this.value_area_id,
        type: this.reportVal,
        page: this.currentpage
      }
      if(this.value_area_id == "") {
        delete datas.area_id
      }
      if(this.reportVal == "") {
        delete datas.type
      }
      let res = await api.reportList(datas)
      this.tableData = res.list
      this.pages = res.pagecount
    },
    // 删除
    deleteFn(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        let res = await api.reportDelete({
          id: row.id
        })
        this.listFn()
        this.$notify.success({
          title: '成功',
          message: '删除成功！'
        });
      }).catch(() => {
      });
      
    }
 }
}
</script>

<style lang="less" scoped>
.report {
  .employee_bg {
    float: left;
    width: 100%;
    height: auto;
    padding-bottom: 80px;
    background: #EEEEEE;
    .employee_search {
      float: left;
      width: calc(100% - 330px);
      height: 48px;
      background: white;
      margin-left: 60px;
      margin-top: 20px;
      padding-top: 15px;
      margin-left: 60px;
      border-radius: 5px;
      .search_title {
        font-size: 18px;
        color: #333333;
        font-weight: bold;
        text-indent: 40px;
        padding-top: 15px;
        padding-bottom: 10px;
      }
      .el-input,.el-select {
        width: 200px;
        margin-left: 12px;
        &:nth-child(1) {
          margin-left: 40px;
        }
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
          float: left;
          cursor: pointer;
          color: #2B74EA;
          margin-left: 20px;
          &:first-of-type {
            margin-left: 0px;
          }
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
  .report .el-input__inner {
    height: 30px;
  }
  .report .el-input__icon {
    line-height: 30px;
  }
  .report .el-button {
    padding: 7px 10px;
  }
</style>