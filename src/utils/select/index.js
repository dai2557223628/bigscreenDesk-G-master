/* eslint-disable */
import api from "../../api/commonApi.js"
// 枚举合集
export default {
  allPageSize: 999999,
  // 地区类别
  AreaType: {
    // 枚举列表
    areaList: [
      { label: "洲", value: 1 },
      { label: "国", value: 2 },
      { label: "省", value: 3 },
      { label: "市", value: 4 },
    ],
    
  },
  // 上报人 - 下拉菜单
  async reportFn() {
    let res = await api.employeeList({
      pagesize: 9999
    })
    return res.list
  }, 
  // 营地 - 下拉菜单
  async campFn() {
    let res = await api.campList({
      pagesize: 9999
    })
    return res.list
  }, 
  // 项目 - 下拉菜单
  async projectFn() {
    let res = await api.projectList({
      pagesize: 9999
    })
    return res.list
  }, 
  ModelTargetType: {
    list: [
      { label: "通用", value: 1 },
      { label: "华人", value: 2 }
    ],
    // 根据枚举值获取名称
    getName(val) {
      let retVal = ''
      let findIndex = this.list.findIndex(item => item.value == val )
      if (findIndex > -1) {
        retVal = this.list[findIndex].label
      }

      return retVal
    }
  },
  EventRelatedLevel: {
    list: [
      { label: "低", value: 0 },
      { label: "一般", value: 1 },
      { label: "中等", value: 2 },
      { label: "较高", value: 3 },
      { label: "极高", value: 4 },
    ]
  },


  // 数据采集源资讯分类
  CollectSourceType: {
    list: [
      { label: "媒体网站", value: 1 },
      { label: "门户网站", value: 2 },
      { label: "社交网站", value: 3 },
      { label: "政府网站", value: 4 }
    ],
    // 根据枚举值获取名称
    getName(val) {
      let retVal = ''
      let findIndex = this.list.findIndex(item => item.value == val )
      if (findIndex > -1) {
        retVal = this.list[findIndex].label
      }

      return retVal
    }
  },

 
};
