<template lang="pug">
  //- 弹窗
  //- el-dialog(
  //-   v-if="routers == 'home'"
  //-   :visible="dialogShow"
  //-   :modal-append-to-body="false"
  //-   :before-close="handleClose"
  //-   width="40%"
  //- )
  //-   .home_dialog_con
  //-     .home_dia_title 已选择
  //-     .home_dia_selected
  //-       .home_dia_selected_li(v-for="(item,index) in selectList" :key="index")
  //-         span {{item}}
  //-         i(class='select_icon el-icon-close' @click="selectClose(index)")
  //-     .home_dia_title.selected_title 可选择
  //-     .home_dia_selected
  //-       .home_dia_selected_li.home_dia_select_li(v-for="(item,index) in home_selected" :key="index" @click="selectAdd(index)")
  //-         i(class='el-icon-plus')
  //-         span {{item}}

  el-dialog(
    v-if="routers == 'risk_monitor_home' || dialogShows_safe == 'settings'"
    :visible="dialogShow"
    :show-close="false"
    :before-close="handleClose"
    width="28vw"
  )
    .risk_monitor_dialog_con
      label.risk_m_dia_title 监测对象（国家）：
      el-select(v-model="value" placeholder="请选择国家" clearable filterable)
        el-option(v-for="item in options" :key="item.id" :label="item.area_name" :value="item.id")
      .risk_monitor_dialog_btn
        el-button.dialog_sure(@click="riskSubmit") 确定
        el-button.dialog_cannel(@click="riskClose") 取消

  //- 预警提醒
  el-dialog(
    v-else-if="(routers == 'warning') || (routers == 'bulletin')"
    :visible="dialogShow"
    :modal-append-to-body="false"
    :before-close="handleClose"
    width="45%"
  )
    .warning_dia_con.home_dialog_con
      .warning_tops
        label 选择国家：
        el-select(v-model="warning_country" placeholder="请选择国家" @change="warningChange" clearable filterable)
          el-option(v-for="item in warningList" :key="item.id" :label="item.area_name" :value="item.id")
      .warning_list_con
        .warning_list_li(v-for="(item,index) in followArr" :key="index") 
          span(class='el-icon-close' @click="warningCloseFn(index)")
          | {{item.area_name}}
      .warning_bottom()
        el-button.dialog_sure(@click="warningSubmit") 提交
  //- 风险监测 - 风险地图弹窗
  el-dialog(
    v-else-if="dialogShows_safe == 'risk_maps'"
    :visible="dialogShow"
    :modal-append-to-body="false"
    :before-close="handleClose"
    width="40%"
  )
    .home_maps_con
      .home_maps_con_maps
        myHighchart(v-if="risk_data.length > 0" ids="my_hightchart_risk2" :urls="province_list" :maps="risk_data")
      .home_maps_lenged
        img(src="../../static/images/img_map_legend.png")
  //- 风险监测 - 预警提醒
  el-dialog(
    v-else-if="routers == 'risk_monitor' || routers == 'home'"
    :visible="dialogShow"
    :modal-append-to-body="false"
    :before-close="handleClose"
    :width="dialogShows_safe == 'employee_num' ? '60%':'40%'"
  )
    .risk_twos_con(v-if="dialogShows_safe == 'bulletin_detail'")
      .select_box_dialog
        el-select(v-model="optionsId" @change="bulletinInit(2)" filterable placeholder="发生地区" clearable) 
          el-option(
            v-for="item in optionArea"
            :key="item.id"
            :label="item.full_area_name"
            :value="item.id"
          )
        el-select(v-model="msgTypeVal" @change="bulletinInit(2)" filterable placeholder="事件类型" clearable) 
          el-option(
            v-for="item in msgTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          )
      .select_box_list
        articleLi(v-for="(item,index) in bulletList" :datas="item" routers="bulletin_detail" :key="index+10")
      el-pagination(
          background
          layout="prev, pager, next"
          @current-change="bulletPageFn"
          :total="pages*10"
        )
    .risk_twos_con(v-else-if="dialogShows_safe == 'warning_detail'")
      .select_box_dialog
        el-select(v-model="optionsId" @change="monitorInit(2)" filterable placeholder="发生地区" clearable) 
          el-option(
            v-for="item in optionArea"
            :key="item.id"
            :label="item.full_area_name"
            :value="item.id"
          )
        el-select(v-model="typesVal" @change="monitorInit(2)" filterable placeholder="预警类型" clearable) 
          el-option(
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          )
        el-select(v-model="levelVal" @change="monitorInit(2)" filterable placeholder="预警级别" clearable) 
          el-option(
            v-for="item in levelList"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          )
        el-select(v-model="activeVal" @change="monitorInit(2)" filterable placeholder="生效中" clearable) 
          el-option(
            v-for="item in activeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          )
      .select_box_list
        articleLi(v-for="(item,index) in noticeList" :datas="item" routers="warning_detail" :key="index+10")
      el-pagination(
          background
          layout="prev, pager, next"
          @current-change="pageFn"
          :total="pages*10"
        )

    .risk_twos_con(v-else-if="dialogShows_safe == 'project_num'")
      .select_box_dialog
        el-select(v-model="project_name_val" @change="projectNumInit(2)" filterable placeholder="项目名称" clearable) 
          el-option(
            v-for="item in project_name_list"
            :key="item.id"
            :label="item.project_name"
            :value="item.project_name"
          )
        el-select(v-model="project_area_name_val" @change="projectNumInit(2)" filterable placeholder="所在地区" clearable) 
          el-option(
            v-for="item in area_name_list"
            :key="item.id"
            :label="item.area_name"
            :value="item.id"
          )
        el-select(v-model="project_manager_val" @change="projectNumInit(2)" filterable placeholder="项目经理" clearable) 
          el-option(
            v-for="item in project_manager_list"
            :key="item.id"
            :label="item.project_manager"
            :value="item.project_manager"
          )
      .select_box_list
        el-table(
          :data="projectList"
          :header-cell-style="{background: '#EEEEEE'}"
        )
          el-table-column(prop="project_name" label="项目名称" min-width="100" show-overflow-tooltip)
          el-table-column(prop="country_name" label="所在地区" width="100" show-overflow-tooltip)
          el-table-column(prop="risk_level" label="风险等级" min-width="80")
            template(slot-scope="scope")
              span(:style="scope.row.read") {{scope.row.risk_level}}
          el-table-column(prop="project_manager" label="项目经理" min-width="100" show-overflow-tooltip)
          el-table-column(prop="project_manager_contact" label="联系方式" min-width="100" show-overflow-tooltip)
            
      el-pagination(
          background
          layout="prev, pager, next"
          @current-change="pageProFn"
          :total="pages*10"
        )

    .risk_twos_con(v-else-if="dialogShows_safe == 'camp_num'")
      .select_box_dialog
        el-select(v-model="camp_name_val" @change="campNumInit(2)" filterable placeholder="营地名称" clearable) 
          el-option(
            v-for="item in camp_name_list"
            :key="item.id"
            :label="item.camp_name"
            :value="item.camp_name"
          )
        el-select(v-model="camp_area_name_val" @change="campNumInit(2)" filterable placeholder="所在地区" clearable) 
          el-option(
            v-for="item in area_name_list"
            :key="item.id"
            :label="item.area_name"
            :value="item.id"
          )
        el-select(v-model="security_manager_val" @change="campNumInit(2)" filterable placeholder="安全经理" clearable) 
          el-option(
            v-for="item in security_manager_list"
            :key="item.id"
            :label="item.security_manager"
            :value="item.security_manager"
          )
      .select_box_list
        el-table(
          :data="campList"
          :header-cell-style="{background: '#EEEEEE'}"
        )
          el-table-column(prop="camp_name" label="营地名称" min-width="100" show-overflow-tooltip)
          el-table-column(prop="country_name" label="所在地区" width="100" show-overflow-tooltip)
          el-table-column(prop="risk_level" label="风险等级" min-width="80")
            template(slot-scope="scope")
              span(:style="scope.row.read") {{scope.row.risk_level}}
          el-table-column(prop="security_manager" label="安全经理" min-width="100" show-overflow-tooltip)
          el-table-column(prop="security_manager_contact" label="联系方式" min-width="100" show-overflow-tooltip)
      el-pagination(
          background
          layout="prev, pager, next"
          @current-change="pageCampFn"
          :total="pages*10"
        )

    .risk_twos_con(v-else-if="dialogShows_safe == 'employee_num'")
      .select_box_dialog
        el-select(v-model="employee_name_val" @change="employeeNumInit(2)" filterable placeholder="姓名" clearable) 
          el-option(
            v-for="item in employee_name_list"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          )
        el-select(v-model="typesVal" @change="employeeNumInit(2)" filterable placeholder="岗位" clearable) 
          el-option(
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          )
        el-select(v-model="employee_type_val" @change="employeeNumInit(2)" filterable placeholder="员工类型" clearable) 
          el-option(
            v-for="item in employee_type_list"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          )
        el-select(v-model="employee_project_val" @change="employeeNumInit(2)" filterable placeholder="所属项目" clearable) 
          el-option(
            v-for="item in employee_project_list"
            :key="item.id"
            :label="item.project_name"
            :value="item.id"
          )
        el-select(v-model="employee_camp_val" @change="employeeNumInit(2)" filterable placeholder="所属营地" clearable) 
          el-option(
            v-for="item in employee_camp_list"
            :key="item.id"
            :label="item.camp_name"
            :value="item.id"
          )
        el-select(v-model="employee_area_name_val" @change="employeeNumInit(2)" filterable placeholder="所在地区" clearable) 
          el-option(
            v-for="item in area_name_list"
            :key="item.id"
            :label="item.area_name"
            :value="item.id"
          )
      .select_box_list
        el-table(
          :data="employeeList"
          :header-cell-style="{background: '#EEEEEE'}"
        )
          el-table-column(prop="name" label="姓名" min-width="80" show-overflow-tooltip)
          el-table-column(prop="department" label="岗位" width="80" show-overflow-tooltip)
          el-table-column(prop="employee_type" label="员工类型" min-width="80")
          el-table-column(prop="telephone" label="联系方式" min-width="100" show-overflow-tooltip)
          el-table-column(prop="project_name" label="所属项目" min-width="100" show-overflow-tooltip)
          el-table-column(prop="camp_name" label="所属营地" min-width="100" show-overflow-tooltip)
          el-table-column(prop="full_area_name" label="所属地区" min-width="100" show-overflow-tooltip)
      el-pagination(
          background
          layout="prev, pager, next"
          @current-change="pageEmployeeFn"
          :total="pages*10"
        )
</template>

<script>
import api from "../../api/commonApi"
import {formatTimeToStr} from "../../api/fomat_time"
import articleLi from "../article_li"
import myHighchart from "../my_hightchart"
export default {
  name: 'cover_dialog',
  components: { 
    articleLi,
    myHighchart
  },
  props: {
    dialogShow: {
      type: Boolean,
      default: false
    },
    dialogShows_safe: {
      type: String,
      default: ''
    },
    apiParam: {
      type: String,
      default: ''
    },
    followArr: {
      type: Array,
      default: ()=> {}
    },
    followList: {
      type: Array,
      default: ()=> {}
    },
    selectList: {
      type: Array,
      default: ()=> {}
    },
    risk_data: {
      type: Array,
      default: ()=> []
    },
    province_list: {
      type: Object,
      default: ()=> {}
    },
  },
  watch:{
    dialogShows_safe(newVal,oldVal){
      if(newVal){
        if(newVal == "warning_detail") {
          if(this.apiParam == 'activeVal') {
            this.activeVal = 1
          }else if(this.apiParam == '极高') {
            this.levelVal = this.apiParam
          }else if(this.apiParam == '高') {
            this.levelVal = this.apiParam
          }else if(this.apiParam == '中等') {
            this.levelVal = this.apiParam
          }
          this.monitorInit()
        }else if (newVal == "bulletin_detail") {
          // console.log(this.apiParam)
          this.bulletinInit()
        }else if (newVal == "settings") {
          this.dialogShows_safe = newVal
          this.riskMonitorFn()
        }else if (newVal == "risk_maps") {
          this.dialogShows_safe = "risk_maps"
        }else if (newVal == "project_num") {
          this.dialogShows_safe = "project_num"
          this.projectNumInit()
          this.managerSelectFn()
          this.areaListFn()
        }else if (newVal == "camp_num") {
          this.dialogShows_safe = "camp_num"
          this.campNumInit()
          this.securitySelectFn()
          this.areaListFn()
        }else if (newVal == "employee_num") {
          this.dialogShows_safe = "employee_num"
          this.employeeNumInit()
          this.projectListFn()
          this.campListFn()
          this.areaListFn()
        }
      }
    },
    apiParam(newVal) {
      if(this.dialogShows_safe == "warning_detail") {
        if(this.apiParam == 'activeVal') {
          this.activeVal = 1
        }else if(this.apiParam == '极高') {
          this.levelVal = this.apiParam
        }else if(this.apiParam == '高') {
          this.levelVal = this.apiParam
        }else if(this.apiParam == '中等') {
          this.levelVal = this.apiParam
        }else {
          this.activeVal = ''
          this.levelVal = ''
        }
        this.monitorInit()
      }else if (this.dialogShows_safe == "bulletin_detail") {
        this.bulletinInit()
      }else if (this.dialogShows_safe == "project_num") {
        this.projectNumInit()
        this.managerSelectFn()
        this.areaListFn()
      }else if (this.dialogShows_safe == "camp_num") {
        this.campNumInit()
        this.securitySelectFn()
        this.areaListFn()
      }else if (this.dialogShows_safe == "employee_num") {
        this.employeeNumInit()
        this.projectListFn()
        this.campListFn()
        this.areaListFn()
      }
    }
  },
  data () {
    return {
      optionsId: '',
      optionArea: [],
      typesVal: '',
      typeList: [
        {name: '官方预警', id: 17},
        {name: '官方提醒', id: 18}
      ],
      levelVal: '',
      levelList: [
        {name: '极高', id: 17},
        {name: '高', id: 18},
        {name: '中等', id: 37},
      ],
      activeVal: '',
      activeList: [
        {name: '是', id: 1},
        {name: '否', id: 0}
      ],
      noticeList: '',
      pages: '',
      currentpage: 1,
      msgTypeVal: '',
      msgTypeList: [
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
      ],
      bulletList: '',
      bullet_currentpage: 1,
      project_currentpage: 1,
      employee_currentpage: 1,
      camp_currentpage: 1,
      routers: this.$route.name,
      warning_country: '',
      warningList: '',
      home_selected: [
      ],
      home_select: ["预警提醒","单位公告","员工上报","安全快讯","生成简报","简报列表"],
      options: [],
      value: '',
      projectList: '',
      campList: '',
      employeeList: '',
      security_manager_list: '', //安全经理 - 下拉菜单
      security_manager_val: '', //安全经理 - 取值
      camp_name_list: '', //营地名称 - 下拉菜单
      camp_name_val: '', //营地名称 - 取值
      area_name_list: '', //（省）地区 - 下拉菜单
      camp_area_name_val: '', //（省）地区 - 营地数量弹窗取值
      project_name_list: '', //项目名称 - 下拉菜单
      project_name_val: '', //项目名称 - 取值
      project_area_name_val: '', //（省）地区 - 项目数量弹窗取值
      project_manager_val: '', //项目经理 - 取值
      project_manager_list: '', //项目经理 - 下拉菜单
      employee_name_val: '', //员工姓名 - 取值
      employee_name_list: '', //员工姓名 - 下拉菜单
      employee_type_list: [  //员工类型 - 下拉菜单
        { name: '中国员工' },
        { name: '当地员工' },
        { name: '安保员工' },
      ],
      employee_type_val: '', //员工类型 - 取值
      employee_project_val: '', //员工所属项目 - 取值
      employee_project_list: '', //员工所属项目 - 下拉菜单
      employee_camp_list: '', //员工所属营地 - 下拉菜单
      employee_camp_val: '', //员工所属营地 - 取值
      employee_area_name_val: '', //（省）地区 - 员工数量弹窗取值
    }
  },
  created() {
    // console.log(this.dialogShows_safe)
    if(this.routers == 'risk_monitor_home') {
      this.riskMonitorFn()
    }
    if((this.routers == 'warning') || (this.routers == 'bulletin')) {
      this.selectListFn()
    }
    if(this.routers == 'home') {
      this.homeSelectInit()
    }
    if(this.routers == 'risk_monitor') {
      if(this.dialogShows_safe == "bulletin_detail") {
        this.bulletinInit()
      }else if(this.dialogShows_safe == "warning_detail") {
        if(this.apiParam == 'activeVal') {
          this.activeVal = 1
        }else if(this.apiParam == '极高') {
          this.levelVal = this.apiParam
        }else if(this.apiParam == '高') {
          this.levelVal = this.apiParam
        }else if(this.apiParam == '中等') {
          this.levelVal = this.apiParam
        }else {
          this.activeVal = ''
          this.levelVal = ''
        }
        this.monitorInit()
      }else if(this.dialogShows_safe == "project_num") {
        this.projectNumInit()
      }else if(this.dialogShows_safe == "employee_num") {
        this.employeeNumInit()
      }
      
    }
    
  },
  methods: {
    async monitorInit(index) {
      let res = await api.warningList({
        cid: this.typesVal,
        level: this.levelVal,
        active: this.activeVal,
        area_id: this.$route.query.id,
        pagesize: 5,
        page: index == 2 ? 1:this.currentpage
      })
      this.noticeList = res.list
      this.pages = res.pagecount
    },

    async projectNumInit(index) {
      let res = await api.projectListDiag({
        project_name: this.project_name_val,
        project_manager: this.project_manager_val,
        risk_level: this.apiParam,
        area_id: this.project_area_name_val || this.$route.query.id,
        pagesize: 5,
        page: index == 2 ? 1:this.project_currentpage
      })
      this.projectList = res.list
      this.project_name_list = res.list
      this.pages = res.pagecount
    },

    async campNumInit(index) {
      let res = await api.campListDiag({
        area_id: this.camp_area_name_val || this.$route.query.id,
        camp_name: this.camp_name_val,
        security_manager: this.security_manager_val,
        risk_level: this.apiParam,
        pagesize: 5,
        page: index == 2 ? 1:this.project_currentpage
      })
      this.campList = res.list
      this.camp_name_list = res.list
      this.pages = res.pagecount
    },

    async employeeNumInit(index) {
      let datas = {
        q: this.employee_name_val,
        employee_type: this.employee_type_val || this.apiParam,
        project_id: this.employee_project_val,
        camp_id: this.employee_camp_val,
        area_id: this.employee_area_name_val || this.$route.query.id,
        pagesize: 5,
        page: index == 2 ? 1:this.employee_currentpage
      }
      if(this.employee_project_val == '') {
        delete datas.project_id
      }
      if(this.employee_camp_val == '') {
        delete datas.camp_id
      }
      let res = await api.employeeListDiag(datas)
      this.employeeList = res.list
      this.employee_name_list = res.list
      this.pages = res.pagecount
    },

    async bulletinInit(index) {
      let dateTime = new Date()
      let data = {
        special_class_cid: this.msgTypeVal,
        area_id: this.$route.query.id,
        pagesize: 5,
        page: index == 2 ? 1:this.bullet_currentpage
      }
      if(this.apiParam == 'week') {
        this.$set(data,'occur_time_start_begin',(dateTime.getTime() - 3600 * 1000 * 24 * 7)/1000)
        this.$set(data,'occur_time_start_end',dateTime.getTime()/1000)
      }else if (this.apiParam == 'month') {
        this.$set(data,'occur_time_start_begin',(dateTime.getTime() - 3600 * 1000 * 24 * 30)/1000)
        this.$set(data,'occur_time_start_end',dateTime.getTime()/1000)
      }
      if(this.msgTypeVal == "") {
        delete data.special_class_cid
      }
      let res = await api.bulletinList(data)
      this.bulletList = res.list
      this.pages = res.pagecount
    },
    pageFn(val) {
      this.currentpage = val
      this.monitorInit()
    },
    pageProFn(val) {
      this.project_currentpage = val
      this.projectNumInit()
    },
    pageCampFn(val) {
      this.camp_currentpage = val
      this.campNumInit()
    },
    pageEmployeeFn(val) {
      this.employee_currentpage = val
      this.employeeNumInit()
    },
    bulletPageFn(val) {
      this.bullet_currentpage = val
      this.bulletinInit()
    },
    // 风险监测国家选项
    async riskMonitorFn() {
      let res = await api.myInfo()
      this.options = res.info.risk_monitor_area_list
    },
    homeSelectInit() {
      const difference = (a, b) => {
        const s = new Set(b);
        return a.filter(x => !s.has(x));
      };
      this.home_selected = difference(this.home_select,this.selectList)
      // this.home_select.map((items,index) => {
      //   this.selectList.map((item)=> {
      //     if(item == items) {
      //       this.home_select.splice(index,1)
      //     }
      //   })
      // })
    },
    async selectListFn() {
      let res = await api.areaList({
        pagesize: 9999
      })
      this.warningList = res.list
    },
    // 时间格式化
    timeFn() {
      if(this.dialogObj.add_time) {
        this.$set(this.dialogObj,'times',formatTimeToStr(this.dialogObj.add_time * 1000))
        this.$set(this.dialogObj,'add_time',formatTimeToStr(this.dialogObj.add_time * 1000))
      }
    },
    handleClose() {
      this.$emit('dialogExit',false);
    },

    // home-弹窗已选择
    async selectClose(indexs) {
      this.selectList.map((item,index) => {
        if(indexs == index) {
          this.selectList.splice(index,1)
          this.home_selected.push(item)
        }
      })
      let res = await api.quickLunchSet({
        ico: this.selectList.join(",")
      })
    },
    // home-弹窗可选择
    async selectAdd(indexs) {
      this.home_selected.map((item,index) => {
        if(indexs == index) {
          this.home_selected.splice(index,1)
          this.selectList.push(item)
        }
      })
      let res = await api.quickLunchSet({
        ico: this.selectList.join(",")
      })
    },

    // warning
    warningChange() {
      this.warningList.map((item) => {
        if(this.warning_country == item.id) {
          this.followArr.push({area_name: item.area_name,id: item.id})
          this.followList.push(item.id)
        }
      })
    },
    warningCloseFn(index) {
      this.followArr.splice(index,1)
      this.followList.splice(index,1)
    },
    async warningSubmit() {
      let res = await api.followCountrySet({
        area_id: this.followList.join(",")
      })
      // console.log(res)
      this.$message.success("国家设定成功！")
      this.$emit('submitSuccess',"")
    },
    // 风险监测
    riskSubmit() {
      this.$emit('riskSure',this.value);
    },
    riskClose() {
      this.$emit('dialogExit',false);
    },

    // 项目经理下拉菜单
    async managerSelectFn() {
      let res = await api.managerListSelect()
      this.project_manager_list = res.list
    },

    // 安全经理下拉菜单
    async securitySelectFn() {
      let res = await api.securityListSelect()
      this.security_manager_list = res.list
    },

    // 地区（省）下拉菜单
    async areaListFn() {
      let res = await api.areaList({
        parent_area_id: this.$route.query.id,
        pagesize: 9999
      })
      this.area_name_list = res.list
    },

    // 所属项目下拉菜单
    async projectListFn() {
      let res = await api.projectListDiag({
        pagesize: 9999
      })
      this.employee_project_list = res.list
    },

     // 所属营地下拉菜单
    async campListFn() {
      let res = await api.campListDiag({
        pagesize: 9999
      })
      this.employee_camp_list = res.list
    },
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

  // 首页弹窗样式
  .home_dialog_con {
    width: 98%;
    margin: auto;
    .home_dia_title {
      font-size: 18px;
      color: #333;
      font-weight: bold;
      margin-left: 20px;
    }
    .home_dia_selected {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      .home_dia_selected_li {
        position: relative;
        padding: 5px 25px;
        min-width: 40px;
        margin-left: 20px;
        background: #EEEEEE;
        border-radius: 4px;
        margin-top: 15px;
        color: #333;
        .select_icon {
          position: absolute;
          top: 3px;
          right: 3px;
          color: #888;
          cursor: pointer;
        }
      }
      .home_dia_select_li {
        background: #D8E5FF;
        color: #3172FF;
        padding: 5px 20px;
        cursor: pointer;
        i {
          padding-right: 1px;
        }
      }
    }
    .selected_title {
      margin-top: 40px;
    }
  }

  // 风险监测弹窗样式
  .risk_monitor_dialog_con {
    width: 92%;
    margin: auto;
    text-align: center;
  }
  .risk_monitor_dialog_btn {
    width: 100%;
    height: 6vh;
    margin-top: 4vh;
    // background: red;
    .dialog_sure {
      background: #409EFF;
      color: white;
      border: none;
    }
    .dialog_cannel {
      background: #BDBDBD;
      border: none;
      color: white;
      margin-left: 6vh;
    }
  }

  // 预警提醒
  .warning_dia_con {
    width: 100%;
    // min-height: 30vh;
    margin: 0;
    .warning_tops {
      width: 100%;
      text-indent: 15px;
      margin-bottom: 20px;
    }
    .warning_list_con {
      display: inline-block;
      width: 100%;
      .warning_list_li {
        position: relative;
        float: left;
        padding: 5px 24px;
        background: #EEEEEE;
        border-radius: 4px;
        margin-left: 15px;
        margin-top: 20px;
        span {
          position: absolute;
          right: 3px;
          top: 3px;
          cursor: pointer;
        }
      }
    }
   
    .warning_bottom {
      text-align: center;
      padding-top: 30px;
      .dialog_sure {
        background: #409EFF;
        color: white;
        width: 80px;
      }

    }
  }

  // 风险监测两个弹窗
  .risk_twos_con {
    width: 90%;
    height: 90%;
    margin: auto;
    .select_box_dialog {
      display: flex;
      .el-select {
        width: 22%;
        // height: 40px;
        margin-left: 10px;
        &:nth-child(1) {
          margin-left: 0px;
        }
      }
    }
    .select_box_list {
      width: 100%;
      margin-top: 15px;
      padding-bottom: 20px;
    }
    .el-pagination {
      text-align: right;
    }
  }

  // 风险监测 - 地图弹窗
  .home_maps_con {
    position: relative;
    width: 100%;
    height: 50vh;
    .home_maps_lenged {
      position: absolute;
      width: 22%;
      right: 20px;
      bottom: 10px;
      img {
        width: 100%;
      }
    }
  }
</style>
