import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import * as echarts from 'echarts';
import 'element-ui/lib/theme-chalk/index.css'
import request from '@/utils/request'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import permission from '@/utils/permission/index.js' // 角色的按钮权限控制
Vue.use(permission)

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.prototype.$http = request;
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   let hasLogin = Cookies.get('hasLogin'); //从cookies中获取是否已登陆过的信息
//   if(hasLogin){
//     next()
//   }else{
//     if(to.path == '/login'){
//       next()
//     }else{
//       next({
//         replace:true,
//         name:'login',
//       })
//     }
//   }
// })
 

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
