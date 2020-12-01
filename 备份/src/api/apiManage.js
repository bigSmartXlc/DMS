/**
 * description: API管理VUE,服务调用报表
 * author: mwhao
 * createdDate: 2019-12-4
 */

import request from '@/utils/request'
import qs from 'qs'
import config from '@/utils/config'

// api列表查询
export function getApiManage(data) {
  return request({
    url: '/mp/org/api/manage/list.do?pageSize=' + data.pagesize + '&pageIndex=' + data.pageindex + '&sort=desc&sortField=lastupdatetime&apiName=' + encodeURI(data.apiName) + '&apiUrl=' + data.apiUrl + '&serviceName=' + encodeURI(data.serviceName) + '&_=1575362279039',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// api新增弹窗保存
export function addManage(data) {
  return request({
    url: '/mp/org/api/manage/add.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// api编辑弹窗保存
export function updateManage(data) {
  return request({
    url: '/mp/org/api/manage/update.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// api管理 删除
export function deleteManage(data) {
  return request({
    url: '/mp/org/api/manage/delete.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// API新增/编辑弹窗服务名称下拉框查询查询
export function getService(data) {
  return request({
    url: '/mp/org/api/manage/getService.do?_=1575440126357',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// api管理 导出
export function exportManage(data) {
  return request({
    url: '/mp/org/api/manage/export.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// api管理 导入
export function importManage(data) {
  return request({
    url: '/mp/org/api/manage/import.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 服务调用报表-服务调用明细-查询
export function invokingQuery(data) {
  return request({
    url: '/mp/log/invoking/list.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&sort=desc&sortField=accessTime&funcName=' + encodeURI(data.funcName) + '&startTime=' + data.startTime + '&endTime=' + data.endTime + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 服务调用报表-服务调用图表-查询
export function servechartQuery(data) {
  return request({
    url: '/mp/log/invoking/stat.do?funcNum=' + encodeURI(data.funcNum) + '&startTime=' + data.startTime + '&endTime=' + data.endTime + '&sort=' + data.sort + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
