import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

/**
 * 系统预设路由
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/iamLogin',
  component: () => import('@/views/login/iamLogin'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  menuId: 'home',
  redirect: '/dashboard',
  hidden: false,
  IdType: 0,
  children: [{
    path: 'dashboard',
    name: '首页',
    menuId: 'home',
    hidden: false,
    IdType: 0,
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'icon-home-fill'
    }
  }]
},
{
  path: '/sys',
  component: Layout,
  hidden: true,
  children: [{
    path: 'publicAnnouncements',
    name: 'publicAnnouncements',
    component: () =>
      import('@/views/org/sysManagement/announcementList/index.vue'),
    meta: {
      title: '公告列表'
    }
  }, {
    path: 'publicAnnouncementDetail',
    name: 'publicAnnouncementDetail',
    component: () =>
      import('@/views/org/sysManagement/announcementManagement/announcementDetails.vue'),
    meta: {
      title: '公告详情'
    }

  }]
}
/*
,{
  path: '/component',
  hidden: false,
  IdType: 0,
  component: () => import('@/views/table/componentList'),
  meta: {
    title: '组件清单',
    icon: 'icon-home-fill'
  },
  menuId: 'componentList'
}
*/

]

const createRouter = () =>
  new Router({
    // mode: 'history',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

export const resetRouter = function() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
