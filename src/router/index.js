import Vue from 'vue'
import store from '../store'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Forgetpwd from '@/components/login/forget_password.vue'
import setPwd from '@/components/login/set_Password.vue'
import index from '@/components/base/index.vue'
import basicData from '@/components/base/basic_data.vue'
import withdrawals from '@/components/base/withdrawals.vue'
import Recharge from '@/components/base/Recharge.vue'
import withdrawalsResult from '@/components/base/withdrawals_result.vue'
import accountFlow from '@/components/base/account_flow.vue'
import accountFlowDetail from '@/components/base/account_flow_detail.vue'
import messageNotification from '@/components/base/message_notification.vue'
import carList from '@/components/car/car_list.vue'
import consumptionDetails from '@/components/bill/consumption_details.vue'
import consumptionDetailSecond from '@/components/bill/consumption_detail_second.vue'
import accountingDetails from '@/components/bill/accounting_details.vue'
import monthlyYesAccountingDetail from '@/components/bill/monthly_yes_accounting_detail.vue'
import monthlyNoAccountingDetail from '@/components/bill/monthly_no_accounting_detail.vue'
import dayAccountDetail from '@/components/bill/day_account_detail.vue'
import bill from '@/components/bill/bill.vue'
import vehicleBill from '@/components/bill/vehicle_bill.vue'
import monthlyAccountingDetail from '@/components/bill/monthly_accounting_detail.vue'
import detail from '@/components/bill/detail.vue'
import repaymentInstruction from '@/components/bill/repayment_instruction.vue'
import factoringAccount from '@/components/bill/factoring_account.vue'
import historyBill from '@/components/bill/history_bill.vue'
import allBills from '@/components/bill/all_bills.vue'
import overdueBill from '@/components/bill/overdue_bill.vue'
import customerService from '@/components/base/customer_service.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path:'/Forgetpwd',
      name:"Forgetpwd",
      component:Forgetpwd,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/setpwd',
      name:"setpwd",
      component:setPwd,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/index',
      name:"index",
      component:index,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/basicData',
      name:"basicData",
      component:basicData,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/withdrawals',
      name:"withdrawals",
      component:withdrawals,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/Recharge',
      name:"Recharge",
      component:Recharge,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/withdrawalsResult',
      name:"withdrawalsResult",
      component:withdrawalsResult,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/accountFlow',
      name:"accountFlow",
      component:accountFlow,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/accountFlowDetail',
      name:'accountFlowDetail',
      component:accountFlowDetail,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/messageNotification',
      name:'messageNotification',
      component:messageNotification,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },
    {
      path:'/carList',
      name:'carList',
      component:carList,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/consumptionDetails',
      name:'consumptionDetails',
      component:consumptionDetails,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },
    {
      path:'/consumptionDetailSecond',
      name:'consumptionDetailSecond',
      component:consumptionDetailSecond,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/accountingDetails',
      name:'accountingDetails',
      component:accountingDetails,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/monthlyYesAccountingDetail',
      name:'monthlyYesAccountingDetail',
      component:monthlyYesAccountingDetail,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/monthlyNoAccountingDetail',
      name:'monthlyNoAccountingDetail',
      component:monthlyNoAccountingDetail,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/dayAccountDetail',
      name:'dayAccountDetail',
      component:dayAccountDetail,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/bill',
      name:'bill',
      component:bill,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/vehicleBill',
      name:'vehicleBill',
      component:vehicleBill,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/monthlyAccountingDetail',
      name:'monthlyAccountingDetail',
      component:monthlyAccountingDetail,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },  {
      path:'/repaymentInstruction',
      name:'repaymentInstruction',
      component:repaymentInstruction,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/detail',
      name:'detail',
      component:detail,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/factoringAccount',
      name:'factoringAccount',
      component:factoringAccount,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/historyBill',
      name:'historyBill',
      component:historyBill,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    }, {
      path:'/allBills',
      name:'allBills',
      component:allBills,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/overdueBill',
      name:'overdueBill',
      component:overdueBill,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },{
      path:'/customerService',
      name:'customerService',
      component:customerService,
      meta:{
        auth: true // 这里设置，当前路由需要校验
      }
    },
    {
      path:'*',redirect:'/login'
    },
  ]
})



