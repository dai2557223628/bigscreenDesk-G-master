webpackJsonp([20],{"/Txh":function(e,t){},pLYy:function(e,t){},rwtC:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("6FMM"),o=a("F523"),i=a("weGg"),r=a("udzu"),s={name:"appear",components:{Nav:l.a,leftNav:o.a},data:()=>({searchShow:!1,add_time:"",dates:"",name:"",keyword:"",employeeArr:"",employeeVal:"",campVal:"",campArr:[],projectVal:"",projectArr:[],value:"",currentpage:1,pages:"",tableData:[],options:""}),created(){this.listFn(),this.areaListFn(),this.selectListFn()},methods:{async areaListFn(){let e=await i.a.areaList({pagesize:9999});this.options=e.list},async selectListFn(){this.employeeArr=await this.$select.reportFn(),this.campArr=await this.$select.campFn(),this.projectArr=await this.$select.projectFn()},async listFn(){let e=await i.a.appearList();this.tableData=e.list,this.tableData.map(e=>{this.$set(e,"add_times",Object(r.a)(1e3*e.add_time))}),this.pages=e.pagecount},pageFn(e){this.currentpage=e,this.listFn()},async appearInfoFn(e){var t={id:e};let a=await i.a.appearInfo(t);this.dialogObjs=a.info},goDetailFn(e){let t=this.$router.resolve({path:"/appear_detail",query:{id:e.id}});window.open(t.href,"_blank")},async searchFn(e){let t,a;1==e&&(this.currentpage=1),this.add_time&&(a=this.add_time[0]/1e3,t=this.add_time[1]/1e3);let l={q:this.keyword,area_id:this.value,camp_id:this.campVal,project_id:this.projectVal,employee_id:this.employeeVal,time_start_begin:a,time_start_end:t};""==this.value&&delete l.area_id,""==this.projectVal&&delete l.project_id,""==this.campVal&&delete l.camp_id,""==this.employeeVal&&delete l.employee_id;let o=await i.a.appearList(l);this.tableData=o.list,this.tableData.map(e=>{this.$set(e,"add_times",Object(r.a)(1e3*e.add_time))}),this.pages=o.pagecount}}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"appear"},[a("Nav",{attrs:{homeShow:!1}}),a("div",{staticClass:"employee_bg"},[a("leftNav"),a("div",{staticClass:"employee_search"},[a("div",{staticClass:"employee_search_con"},[a("div",{staticClass:"search_li"},[a("label",[e._v("上报信息：")]),a("el-input",{staticClass:"title_input",attrs:{placeholder:"请输入关键词",clearable:"clearable"},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}})],1),a("div",{staticClass:"search_li margin_top15"},[a("label",[e._v("上报人：")]),a("el-select",{attrs:{filterable:"filterable",placeholder:"请选择",clearable:"clearable"},model:{value:e.employeeVal,callback:function(t){e.employeeVal=t},expression:"employeeVal"}},e._l(e.employeeArr,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1),a("label",{staticStyle:{"margin-left":"20px"}},[e._v("所在地区：")]),a("el-select",{attrs:{placeholder:"请选择",filterable:"filterable",clearable:"clearable"},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,function(e){return a("el-option",{key:e.id,attrs:{label:e.full_area_name,value:e.id}})}),1),a("label",{staticStyle:{"margin-left":"20px"}},[e._v("所在项目：")]),a("el-select",{attrs:{filterable:"filterable",placeholder:"选择项目",clearable:"clearable"},model:{value:e.projectVal,callback:function(t){e.projectVal=t},expression:"projectVal"}},e._l(e.projectArr,function(e){return a("el-option",{key:e.id,attrs:{label:e.project_name,value:e.id}})}),1),a("label",{staticStyle:{"margin-left":"20px"}},[e._v("所在营地：")]),a("el-select",{attrs:{filterable:"filterable",placeholder:"所属营地",clearable:"clearable"},model:{value:e.campVal,callback:function(t){e.campVal=t},expression:"campVal"}},e._l(e.campArr,function(e){return a("el-option",{key:e.id,attrs:{label:e.camp_name,value:e.id}})}),1),a("el-button",{staticStyle:{float:"right"},attrs:{type:"primary"},on:{click:function(t){return e.searchFn(e.index)}}},[e._v("查询")])],1),e.searchShow?a("div",{staticClass:"search_li margin_top15"},[a("label",[e._v("上报时间：")]),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"timestamp"},model:{value:e.add_time,callback:function(t){e.add_time=t},expression:"add_time"}})],1):e._e(),a("div",{staticClass:"search_li margin_top15",staticStyle:{"text-align":"center","font-size":"14px",color:"#888888",cursor:"pointer"}},[e.searchShow?a("span",{on:{click:function(t){e.searchShow=!e.searchShow}}},[e._v("收起筛选"),a("span",{staticClass:"iconfont iconshouqi",staticStyle:{"font-size":"12px","margin-left":"5px"}})]):a("span",{on:{click:function(t){e.searchShow=!e.searchShow}}},[e._v("展开刷选"),a("span",{staticClass:"iconfont iconzhankai",staticStyle:{"font-size":"12px","margin-left":"5px"}})])])])]),a("div",{staticClass:"employee_form"},[a("el-table",{attrs:{data:e.tableData,"header-cell-style":{background:"#EEEEEE"}}},[a("el-table-column",{attrs:{prop:"content",label:"上报信息","min-width":"200","show-overflow-tooltip":"show-overflow-tooltip"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.read?a("span",[e._v(e._s(t.row.content))]):a("span",{staticStyle:{"font-weight":"bold"}},[e._v(e._s(t.row.content))])]}}])}),a("el-table-column",{attrs:{prop:"name",label:"上报人",width:"100","show-overflow-tooltip":"show-overflow-tooltip"}}),a("el-table-column",{attrs:{prop:"telephone",label:"联系方式","min-width":"140"}}),a("el-table-column",{attrs:{prop:"full_area_name",label:"所属地区","min-width":"120","show-overflow-tooltip":"show-overflow-tooltip"}}),a("el-table-column",{attrs:{prop:"camp_name",label:"所属营地","min-width":"120","show-overflow-tooltip":"show-overflow-tooltip"}}),a("el-table-column",{attrs:{prop:"project_name",label:"所属项目","min-width":"120","show-overflow-tooltip":"show-overflow-tooltip"}}),a("el-table-column",{attrs:{prop:"add_times",label:"上报时间","min-width":"120","show-overflow-tooltip":"show-overflow-tooltip"}}),a("el-table-column",{attrs:{label:"操作",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"look_details",on:{click:function(a){return e.goDetailFn(t.row)}}},[t.row.read?a("span",{staticStyle:{color:"gray"}},[e._v("已读，查看详情")]):a("span",[e._v("查看详情")])])]}}])})],1),a("el-pagination",{attrs:{background:"background",layout:"prev, pager, next","current-page":e.currentpage,total:10*e.pages},on:{"current-change":e.pageFn}})],1)],1)],1)},staticRenderFns:[]};var c=a("VU/8")(s,n,!1,function(e){a("pLYy"),a("/Txh")},"data-v-2c1e8928",null);t.default=c.exports}});