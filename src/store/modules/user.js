import { login, logout, getInfo } from '@/api/login'
import { constantRouterMap, asyncRouterListByAdmin, asyncRouterListByClient, asyncRouterListByUser } from '@/router/index'
import router from '@/router/index'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: '',
    routes: localStorage.getItem('routes') ? JSON.parse(localStorage.getItem('routes')) : constantRouterMap
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    // 动态路由,根据这个路由生成菜单
    saveRoutes(state) {
      switch (state.roles) {
        case 'admin':
          router.addRoutes(asyncRouterListByAdmin)
          state.routes = constantRouterMap.concat(asyncRouterListByAdmin)
          break
        case 'client':
          router.addRoutes(asyncRouterListByClient)
          state.routes = constantRouterMap.concat(asyncRouterListByClient)
          break
        case 'user':
          router.addRoutes(asyncRouterListByUser)
          state.routes = constantRouterMap.concat(asyncRouterListByUser)
          break
        default:
          state.routes = constantRouterMap
          break
      }
      // if (state.roles !== 'user') {
      //   /* asyncRouterList.forEach((item) => {
      //     router.addRoute(item)
      //   }) */
      //   router.addRoutes(asyncRouterList)
      //   state.routes = constantRouterMap.concat(asyncRouterList)
      // } else {
      //   router.addRoutes(asyncRouterListByUser)
      //   state.routes = constantRouterMap.concat(asyncRouterListByUser)
      // }
      localStorage.setItem('routes', JSON.stringify(state.routes))
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (response.result) {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            resolve()
          } else {
            Message({
              message: response.data.message,
              type: 'error',
              duration: 5 * 1000
            })
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          if (response.result) {
            const data = response.data
            if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', data.roles)
            } else {
              console.log(data)
              reject('getInfo: roles must be a non-null array !')
            }
            commit('saveRoutes')
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            resolve(response)
          } else {
            Message({
              message: response.data.message,
              type: 'error',
              duration: 5 * 1000
            })
            reject(response.data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
