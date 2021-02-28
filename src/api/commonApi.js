import httpService from "./http_service";

export default {
  /**
   * @author: lafitewu
   * date: 2020-05-17
   * 大屏用户前台
   */

  // 登陆
  async dashboardLogin(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_member_login`
    return await httpService.post(url, data)
  },

  // 登出
  async dashboardLogout(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_member_logout`
    return await httpService.post(url, data)
  },

  // 修改密码
  async editPwd(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_member_changepassword`
    return await httpService.post(url, data)
  },

  // 用户信息info
  async myInfo(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_member_myinfo`
    return await httpService.post(url, data)
  },

  // 前台 - 员工上报信息列表
  async appearList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_alarm_list`
    return await httpService.post(url, data)
  },

   // 前台 - 员工上报信息info
   async appearInfo(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_alarm_info`
    return await httpService.post(url, data)
  },

  // 后台 - 员工上报信息列表（单独）
  async companyEmployeeList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_employee_list`
    return await httpService.post(url, data)
  },

  // 后台 - 员工上报信息info
  async boardAlarmInfo(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_employee_alarm_info`
    return await httpService.post(url, data)
  },

  // 安全快讯列表
  async bulletinList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_securityinfo_list`
    return await httpService.post(url, data)
  },

  // 安全快讯info
  async bulletinInfo(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_securityinfo_info`
    return await httpService.post(url, data)
  },

  // 实时预警列表
  async warningList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_rtnotice_list`
    return await httpService.post(url, data)
  },

  // 实时预警info
  async warningInfo(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_rtnotice_info`
    return await httpService.post(url, data)
  },

  // 公告列表
  async noticeList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_notice_list`
    return await httpService.post(url, data)
  },

  // 公告info
  async noticeInfo(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_notice_info`
    return await httpService.post(url, data)
  },

  // select - 大屏列表
  async boardList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_list`
    return await httpService.post(url, data)
  },

   // 首页info
   async boardInfo(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_info`
    return await httpService.post(url, data)
  },
  // 新首页info 2020.9.24
  async newBoardInfo(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_info`
    return await httpService.post(url, data)
  },

  // 项目列表下拉菜单
  async projectList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_project_list`
    return await httpService.post(url, data)
  },

  // 营地列表下拉菜单
  async campList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_camp_list`
    return await httpService.post(url, data)
  },

  // 预警分类下拉菜单
  async waringSelectList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_board_rtnotice_class_list`
    return await httpService.post(url, data)
  },

  // 上报人下拉菜单-前台单独页面列表接口
  async employeeList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_employee_list`
    return await httpService.post(url, data)
  },

   // 默认模式切换
   async modelSwitch(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_member_myinfo_edit`
    return await httpService.post(url, data)
  },

  // 发布人下拉菜单
  async authorList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_front_member_list`
    return await httpService.post(url, data)
  },

  // 地区下拉菜单
  async areaList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_area_list`
    return await httpService.post(url, data)
  },

  async exportEventList(query) {
    let res = await httpService.post('https://yjapi.ciwei.com/api.php?do=gov_front_employee_list',
    query);
    console.log(res)
    if (res && res.excel_file_name) {
      console.log('dsdsds')
      let a = document.createElement("a");
      a.href = res.excel_file_name;
      a.download = '员工列表_' + new Date().getTime();
      a.click();
    }
  },

  // 2020.07.16 简报模块
  async reportList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_report_list`
    return await httpService.post(url, data)
  },
  async reportCountryList(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_report_country_list`
    return await httpService.post(url, data)
  },
  async reportDelete(data) {
    const url = `https://yjapi.ciwei.com/api.php?do=gov_report_delete`
    return await httpService.post(url, data)
  },

  // 2020.07.31 dataV授权
  async boardsGo(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_front_board_go`,datas)
  },

  // 2020.9.16 1.5
  // 国别信息列表
  async countryList(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_country_list`,datas)
  },
  async countryInfo(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_country_info`,datas)
  },

  // 预警提醒弹窗新增 - 企业关注国家设定
  async followCountrySet(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_admin_follow_country_set`,datas)
  },

  // 风险大屏 - 共显风格列表
  async boardStyleList(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_board_style_list`,datas)
  },

  // 风险大屏 - 历史共显方案
  async frontStyleList(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_front_board_style_list`,datas)
  },

  // 风险大屏 - 创建大屏
  async frontStyleCreate(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_front_board_style_create`,datas)
  },

  // 风险大屏 - 删除大屏
  async frontStyleDelete(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_front_board_style_delete`,datas)
  },

  // 首页 - 快捷入口设置
  async quickLunchSet(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_admin_quick_lunch_set`,datas)
  },

  // 风险监测 - 列表
  async countryWatchList(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_front_risk_country_watch_list`,datas)
  },
  // 风险监测 - 国家设定
  async countryWatchSet(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_admin_risk_country_watch_set`,datas)
  },
  // 风险监测 - 国家详情
  async riskCountryInfo(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_front_risk_country_info`,datas)
  },
  // 风险监测 - 主页布局设定
  async infolayoutSet(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_admin_risk_country_info_layout_set`,datas)
  },
  // 安全服务列表
  async secretServiceList(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_secret_service_list`,datas)
  },
  // 安全服务详情
  async secretServiceInfo(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_secret_service_info`,datas)
  },

  // 项目风险监测- 项目数量弹窗接口
  async projectListDiag(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_project_list`,datas)
  },

  // 项目风险监测- 营地数量弹窗接口
   async campListDiag(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_camp_list`,datas)
  },

  // 项目风险监测- 员工数量弹窗接口
  async employeeListDiag(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_employee_list`,datas)
  },

  // 项目风险监测- 弹窗下拉菜单 - 项目经理
  async managerListSelect(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_project_manager_list`,datas)
  },

  // 项目风险监测- 弹窗下拉菜单 - 安全经理
  async securityListSelect(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_security_manager_list`,datas)
  },

  // 国家风险详情(商务厅版) - 12.22新增
  async countryInfoSwt(datas) {
    return httpService.post(`https://yjapi.ciwei.com/api.php?do=gov_front_risk_country_info_swt`,datas)
  },
}

