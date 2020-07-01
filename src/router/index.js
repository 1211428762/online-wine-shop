import Vue from 'vue'
import Router from 'vue-router'

import home from "../components/home"
import first from "../components/first"
import stock from "../components/stock"
import stockTab from "../components/stockTab"
import settle from "../components/settle"
import order from "../components/order"
import person from "../components/person"
import detail from "../components/detail"
import purchase from "../components/purchase"
import payCode from "../components/payCode"
import paySuccess from "../components/paySuccess"
import searchDetail from "../components/searchDetail"
import personOrder from "../components/personOrder"
import profit from "../components/profit"
import login from "../components/login"
Vue.use(Router);
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
export default new Router({
  routes: [
    {
      // 默认显示的页面
      path: '/',
      name: 'home',
      component: home,
      children: [
        {

          path: '/first',
          name: 'first',
          component: first,
          children: [
            {
              path: "/first/detail",
              name: 'detail',
              component: detail,
            }
          ]
        },
        {
          path: '/stock',
          name: 'stock',
          component: stock
        },
        {

          path: '/order',
          name: 'order',
          component: order
        },
        {
          path: '/person',
          name: 'person',
          component: person,

        },
        { path: '*', redirect: '/first' }
      ]
    },
    {
      path: '/stockTab',
      name: 'stockTab',
      component: stockTab
    },
    {
      path: '/settle',
      name: 'settle',
      component: settle
    }, {
      path: '/purchase',
      name: 'purchase',
      component: purchase
    }, {
      path: '/payCode',
      name: 'payCode',
      component: payCode
    },
    {
      path: '/paySuccess',
      name: 'paySuccess',
      component: paySuccess
    },
    {
      path: '/searchDetail',
      name: 'searchDetail',
      component: searchDetail
    },

    {
      path: "/personOrder",
      name: 'personOrder',
      component: personOrder,
    },
    {
      path: "/profit",
      name: 'profit',
      component: profit,
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // { path: '*', redirect: '/first' }


  ]
})

