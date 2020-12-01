/**
 * description: 权限管理VUE
 * author: mwhao
 * createdDate: 2019-12-5
 */

import request from '@/utils/request'
import qs from 'qs'
import config from '@/utils/config'

// 用户权限--- api列表查询
export function getApiManage(data) {
  return request({
    url: '/mp/org/api/manage/list.do?pageSize=' + data.pagesize + '&pageIndex=' + data.pageindex + '&sort=desc&sortField=lastupdatetime&apiName=' + data.apiName + '&apiUrl=' + data.apiUrl + '&serviceName=' + data.serviceName + '&_=1575362279039',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 用户权限---用户权限分析弹窗 树状图查询
export function getAnalyse(data) {
  return request({
    url: '/mp/org/userPurview/analyse.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 用户权限---用户权限分析弹窗 树状图点击回调查询
export function purviewSource(data) {
  return request({
    url: '/mp/org/userPurview/purviewSource.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 用户权限--- api授权弹窗树状图查询
export function getPurview(data) {
  return request({
    url: '/mp/org/api/user/getPurview.do?userId=' + data.userId + '&token=' + data.token + '&_=1575601531687',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 用户权限--- api权限查看API
export function showPurview(data) {
  return request({
    url: '/mp/org/api/user/showPurview.do?token=' + data.token + '&userId=' + data.userId + '&_=1575611354069',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 用户权限---api授权弹窗 授权确定按钮
export function purviewButton(data) {
  return request({
    url: '/mp/org/api/user/purview.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 组织权限--- 树状图查询
export function tissueList(data) {
  return request({
    url: '/mp/org/relation/list.do?method=getorgtreeasync&orgRealationId=&_=1575957170023',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 组织权限--- 点击树状图回调查询
export function tissueClick(data) {
  return request({
    url: '/mp/org/orgpurview/list.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&sort=desc&sortfield=last_updated_time&orgid=' + data.orgid + '&orgcode=' + data.orgcode + '&orgname=' + data.orgname + '&_=1575957170025',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 组织权限--- 网格查询
export function gettissueClick(data) {
  return request({
    url: '/mp/org/orgpurview/list.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&sort=desc&sortfield=last_updated_time&orgid=391d56db938347e28618761bf03c93aa&orgcode=' + data.orgcode + '&orgname=' + data.orgname + '&_=1575957170034',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 菜单权限分析--- 树状图查询查询
export function userallpurview(data) {
  return request({
    url: '/mp/org/analysis/userallpurview.do?usertype=1&_=1575963414121',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 菜单权限分析--- 网格查询
export function getMenuPuerviewInfo(data) {
  return request({
    url: '/mp/org/analysis/getMenuPuerviewInfo.do?tabname=' + data.tabname + '&menuid=' + data.menuid + '&name=' + data.name + '&code=' + data.code + '&sortfield=&sort=desc&rows=' + data.rows + '&page=' + data.page + '&rw=&_=1575963414153',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// API权限分析--- 树状图查询
export function allPurview(data) {
  return request({
    url: '/mp/org/api/analysis/allPurview.do?_=1576034453727',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// API权限分析--- 网格查询
export function apiPurviewSource(data) {
  return request({
    url: '/mp/org/api/analysis/purviewSource.do?sourceType=Service&sourceId=' + data.sourceId + '&searchName=' + data.searchName + '&searchCode=' + data.searchCode + '&viewType=' + data.viewType + '&sortField=&sort=desc&pageSize=' + data.pageSize + '&pageIndex=' + data.pageIndex + '&_=1576034453733',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 角色管理--- api授权弹窗树状图查询
export function rolegetPurview(data) {
  return request({
    url: '/mp/org/api/role/getPurview.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 角色管理--- api授权弹窗树状图保存
export function savePurview(data) {
  return request({
    url: '/mp/org/api/role/purview.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 角色管理--- api权限查看弹窗  树状图
export function roleshowPurview(data) {
  return request({
    url: '/mp/org/api/role/showPurview.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
