import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const asyncRouterListByAdmin = [
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    // name: 'Version Management',
    meta: { title: 'Version Management', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Version Management',
        component: () => import('@/views/teacher/index'),
        meta: { title: 'Version Management', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Upload Version',
        component: () => import('@/views/teacher/form'),
        meta: { title: 'Upload Version', icon: 'tree' }
      },
      {
        path: 'edit/:teacherId',
        name: '修改讲师',
        component: () => import('@/views/teacher/form'),
        meta: { title: '修改讲师', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Camera OTA',
    meta: { title: 'Camera OTA', icon: 'example' },
    // meta: { title: 'Camera OTA', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'course List',
        component: () => import('@/views/course/list'),
        meta: { title: 'Camera List', icon: 'table' }
      },
      {
        path: 'cameraListDetail/:cameraSn/:deviceId',
        name: 'cameraListDetail',
        component: () => import('@/views/course/cameraListDetail'),
        meta: { title: 'Camera Datail', icon: 'table' },
        hidden: true
      },
    ]
  },
  {
    path: '/log/',
    component: Layout,
    redirect: '/log/panellist',
    name: 'Log Management',
    meta: { title: 'Log Management', icon: 'example' },
    children: [
      {
        path: 'panellist',
        name: 'Panel List',
        component: () => import('@/views/log/panellist'),
        meta: { title: 'Panel List', icon: 'table' }
      },
      {
        path: 'cameraList',
        name: 'Camera List',
        component: () => import('@/views/log/cameralist'),
        meta: { title: 'Camera List', icon: 'table' }
      },
      {
        path: 'cameraLogList/:cameraSn',
        name: 'Camera Log List',
        component: () => import('@/views/log/cameraLogList'),
        meta: { title: 'Camera Log List', icon: 'table' },
        hidden: true
      },
      {
        path: 'panelLogList/:imei',
        name: 'Panel Log List',
        component: () => import('@/views/log/panelLogList'),
        meta: { title: 'Panel Log List', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/whiteList/',
    component: Layout,
    redirect: '/whiteList/panellist',
    name: 'White List Management',
    meta: { title: 'White List Management', icon: 'example' },
    children: [
      {
        path: 'panellist',
        name: 'Panel White List',
        component: () => import('@/views/whiteList/panellist'),
        meta: { title: 'Panel White List', icon: 'table' }
      }/* ,
      {
        path: 'cameraList',
        name: 'Camera White List',
        component: () => import('@/views/whiteList/cameralist'),
        meta: { title: 'Camera White List', icon: 'table' }
      } */
    ]
  },
  {
    path: '/camera',
    component: Layout,
    redirect: '/camera/management',
    name: 'Camera Management z',
    // meta: { title: 'Camera OTA', icon: 'example' },
    // meta: { title: 'Camera OTA', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Camera Management',
        component: () => import('@/views/course/camera'),
        meta: { title: 'Camera Management', icon: 'table' }
      }
    ]
  },
  {
    path: '/panel',
    component: Layout,
    redirect: '/panel/environment',
    name: 'Panel Environment',
    // meta: { title: 'Camera OTA', icon: 'example' },
    // meta: { title: 'Camera OTA', icon: 'example' },
    children: [
      {
        path: 'environment',
        name: 'Panel Environment',
        component: () => import('@/views/panelenv/panelenv'),
        meta: { title: 'Panel Environment', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterListByClient = [
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    // name: 'Version Management',
    meta: { title: 'Version Management', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Version Management',
        component: () => import('@/views/teacher/index'),
        meta: { title: 'Version Management', icon: 'table' }
      },
      {
        path: 'save',
        name: 'Upload Version',
        component: () => import('@/views/teacher/form'),
        meta: { title: 'Upload Version', icon: 'tree' }
      },
      {
        path: 'edit/:teacherId',
        name: '修改讲师',
        component: () => import('@/views/teacher/form'),
        meta: { title: '修改讲师', icon: 'tree' },
        hidden: true
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Camera OTA',
    meta: { title: 'Camera OTA', icon: 'example' },
    // meta: { title: 'Camera OTA', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'course List',
        component: () => import('@/views/course/list'),
        meta: { title: 'Camera List', icon: 'table' }
      },
      {
        path: 'cameraListDetail/:cameraSn/:deviceId',
        name: 'cameraListDetail',
        component: () => import('@/views/course/cameraListDetail'),
        meta: { title: 'Camera Datail', icon: 'table' },
        hidden: true
      },
    ]
  },
  {
    path: '/log/',
    component: Layout,
    redirect: '/log/panellist',
    name: 'Log Management',
    meta: { title: 'Log Management', icon: 'example' },
    children: [
      {
        path: 'panellist',
        name: 'Panel List',
        component: () => import('@/views/log/panellist'),
        meta: { title: 'Panel List', icon: 'table' }
      },
      {
        path: 'cameraList',
        name: 'Camera List',
        component: () => import('@/views/log/cameralist'),
        meta: { title: 'Camera List', icon: 'table' }
      },
      {
        path: 'cameraLogList/:cameraSn',
        name: 'Camera Log List',
        component: () => import('@/views/log/cameraLogList'),
        meta: { title: 'Camera Log List', icon: 'table' },
        hidden: true
      },
      {
        path: 'panelLogList/:imei',
        name: 'Panel Log List',
        component: () => import('@/views/log/panelLogList'),
        meta: { title: 'Panel Log List', icon: 'table' },
        hidden: true
      }
    ]
  },

  {
    path: '/whiteList/',
    component: Layout,
    redirect: '/whiteList/panellist',
    name: 'White List Management',
    meta: { title: 'White List Management', icon: 'example' },
    children: [
      {
        path: 'panellist',
        name: 'Panel White List',
        component: () => import('@/views/whiteList/panellist'),
        meta: { title: 'Panel White List', icon: 'table' }
      }/* ,
      {
        path: 'cameraList',
        name: 'Camera White List',
        component: () => import('@/views/whiteList/cameralist'),
        meta: { title: 'Camera White List', icon: 'table' }
      } */
    ]
  },
  {
    path: '/panel',
    component: Layout,
    redirect: '/panel/environment',
    name: 'Panel Environment',
    // meta: { title: 'Camera OTA', icon: 'example' },
    // meta: { title: 'Camera OTA', icon: 'example' },
    children: [
      {
        path: 'environment',
        name: 'Panel Environment',
        component: () => import('@/views/panelenv/panelenv'),
        meta: { title: 'Panel Environment', icon: 'table' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRouterListByUser = [
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: 'Camera OTA',
    // meta: { title: 'Camera OTA', icon: 'example' },
    // meta: { title: 'Camera OTA', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'Camera Management',
        component: () => import('@/views/course/list'),
        meta: { title: 'Camera Management', icon: 'table' }
      }
    ]
  },
  {
    path: '/panel',
    component: Layout,
    redirect: '/panel/environment',
    name: 'Panel Environment',
    // meta: { title: 'Camera OTA', icon: 'example' },
    // meta: { title: 'Camera OTA', icon: 'example' },
    children: [
      {
        path: 'environment',
        name: 'Panel Environment',
        component: () => import('@/views/panelenv/panelenv'),
        meta: { title: 'Panel Environment', icon: 'table' }
      }
    ]
  }
]

export const constantRouterMap = [
  // { path: '/login', component: () => import('@/views/log/panellist'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

