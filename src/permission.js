import router from './router'
import { asyncRouterListByAdmin } from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // console.log('存在token，去非login页面')
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          setTimeout(() => {
            next()
          }, 2000)
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
  // 解决页面刷新，动态路由丢失，所以重新add
  if (!to.name && store.state.roles === 0) {
    console.log('to.name', to.name)
    asyncRouterListByAdmin.forEach((item) => {
      router.addRoute(item)
    })
    console.log('路由前置守卫添加异步动态路由', this.$router.options.routes)
    next({ ...to, replace: true })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
