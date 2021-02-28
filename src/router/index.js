import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['../pages/login.vue'], resolve)
    },

    {
      path: '/',
      name: 'home',
      component: resolve => require(['../pages/home.vue'], resolve)
    },
    // 演示模式首页
    {
      path: '/home_demo',
      name: 'home_demo',
      component: resolve => require(['../pages/home_demo.vue'], resolve)
    },
    // 员工列表
    {
      path: '/employee_list',
      name: 'employee_list',
      // meta:{
      //   keepalive: true
      // },
      component: resolve => require(['../pages/employee_list.vue'], resolve)
    },
    // 查看公告
    {
      path: '/notice',
      name: 'notice',
      component: resolve => require(['../pages/notice.vue'], resolve)
    },
    // 实时预警
    {
      path: '/warning',
      name: 'warning',
      component: resolve => require(['../pages/warning.vue'], resolve)
    },
    // 安全快讯
    {
      path: '/bulletin',
      name: 'bulletin',
      component: resolve => require(['../pages/bulletin.vue'], resolve)
    },
    // 员工上班信息
    {
      path: '/appear',
      name: 'appear',
      component: resolve => require(['../pages/appear.vue'], resolve)
    },
     // 详情（查看内容页面）
    {
      path: '/details',
      name: 'details',
      component: resolve => require(['../pages/details.vue'], resolve)
    },
     // 修改密码
    {
      path: '/change_pwd',
      name: 'change_pwd',
      component: resolve => require(['../pages/change_pwd.vue'], resolve)
    },

    // 2020.07.16 新增简报模块
    {
      path: '/report',
      name: 'report',
      component: resolve => require(['../pages/report.vue'], resolve)
    },
    {
      path: '/create_report',
      name: 'create_report',
      component: resolve => require(['../pages/create_report.vue'], resolve)
    },

    // 1.5大改动
    {
      path: '/risk_screen',
      name: 'risk_screen',
      component: resolve => require(['../pages/risk_screen.vue'], resolve)
    },
    {
      path: '/create_risk_screen',
      name: 'create_risk_screen',
      component: resolve => require(['../pages/create_risk_screen.vue'], resolve)
    },
    {
      path: '/select_risk_screen',
      name: 'select_risk_screen',
      component: resolve => require(['../pages/select_risk_screen.vue'], resolve)
    },
    {
      path: '/four_in_one',
      name: 'four_in_one',
      component: resolve => require(['../pages/four_in_one.vue'], resolve)
    },
    // 风险监测
    {
      path: '/risk_monitor_home',
      name: 'risk_monitor_home',
      component: resolve => require(['../pages/risk_monitor_home.vue'], resolve)
    },
    {
      path: '/risk_monitor',
      name: 'risk_monitor',
      component: resolve => require(['../pages/risk_monitor.vue'], resolve)
    },

    // 国别指南
    {
      path: '/country_guide',
      name: 'country_guide',
      component: resolve => require(['../pages/country_guide.vue'], resolve)
    },
    {
      path: '/country_guide_detail',
      name: 'country_guide_detail',
      component: resolve => require(['../pages/country_guide_detail.vue'], resolve)
    },
    // 国别指南pdf
    {
      path: '/guide_detail_pdf',
      name: 'guide_detail_pdf',
      component: resolve => require(['../pages/guide_detail_pdf.vue'], resolve)
    },


    // 安全服务
    {
      path: '/security_services',
      name: 'security_services',
      component: resolve => require(['../pages/security_services.vue'], resolve)
    },  
    // 风险评估
    {
      path: '/risk_assessment',
      name: 'risk_assessment',
      component: resolve => require(['../pages/risk_assessment.vue'], resolve)
    }, 
    // 预警提醒 - 详情页
    {
      path: '/warning_detail',
      name: 'warning_detail',
      component: resolve => require(['../pages/warning_detail.vue'], resolve)
    }, 
    // 员工上报 - 详情页
    {
      path: '/appear_detail',
      name: 'appear_detail',
      component: resolve => require(['../pages/appear_detail.vue'], resolve)
    }, 
    // 安全快讯 - 详情页
    {
      path: '/bulletin_detail',
      name: 'bulletin_detail',
      component: resolve => require(['../pages/bulletin_detail.vue'], resolve)
    }, 
    // 单位公告 - 详情页
    {
      path: '/notice_detail',
      name: 'notice_detail',
      component: resolve => require(['../pages/notice_detail.vue'], resolve)
    }, 

    // 风险监测 - 布局页面
    {
      path: '/risk_monitor_layout',
      name: 'risk_monitor_layout',
      component: resolve => require(['../pages/risk_monitor_layout.vue'], resolve)
    }, 
 
    // 企业管理 - 列表页
    {
      path: '/business_list',
      name: 'business_list',
      component: resolve => require(['../pages/business_list.vue'], resolve)
    }, 
    {
      path: '/create_business',
      name: 'create_business',
      component: resolve => require(['../pages/create_business.vue'], resolve)
    }, 

    // 个人管理
    {
      path: '/group_list',
      name: 'group_list',
      component: resolve => require(['../pages/group_list.vue'], resolve)
    }, 
    {
      path: '/create_group',
      name: 'create_group',
      component: resolve => require(['../pages/create_group.vue'], resolve)
    }, 
    {
      path: '/personal_list',
      name: 'personal_list',
      component: resolve => require(['../pages/personal_list.vue'], resolve)
    }, 
    {
      path: '/create_personal',
      name: 'create_personal',
      component: resolve => require(['../pages/create_personal.vue'], resolve)
    }, 
 
    // {
    //   path: '/form_help',
    //   name: 'form_help',
    //   component: resolve => require(['../pages/form_help.vue'], resolve)
    // },
    // {
    //   path: '/about_us',
    //   name: 'about_us',
    //   component: resolve => require(['../pages/about_us.vue'], resolve)
    // },
    // {
    //   path: '/policy_details',
    //   name: 'policy_details',
    //   component: resolve => require(['../pages/policy_details.vue'], resolve)
    // }
  ]
})
