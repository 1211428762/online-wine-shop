
import Vue from 'vue'
import App from './App'
import router from './router'
import animated from 'animate.css'
import ElementUI from 'element-ui'
import plugins from '@/components/global.js'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../theme/index.css'
import $ from 'jquery'
import myStock from '@/components/dataBase/myStock.vue'
Vue.config.productionTip = false

// 引入axios
import axios from "axios"
// 配置axios
axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error)
})
// 配置请求回来的信息
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
// 挂到VUe原型
Vue.prototype.$http = axios
Vue.use(animated)
Vue.use(ElementUI)
Vue.use(plugins)
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})

Vue.prototype.myStock = myStock








