import config from '@/utils/config'
import request from '@/utils/request'
import qs from 'qs'

// 页面管理查询
export function getWebFormListPaged(data) {
  return request({
    url: '/mp/framework/getWebFormListPaged.do?token=' + data.token + '&sortfield=lastUpdatedTime&sort=desc&_search=false&nd=1572400574029&rows=10&page=1&sidx=lastUpdatedTime&sord=desc&pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&pagedesc=' + encodeURI(data.pagedesc) + '&target=' + data.target + '&_=1572400558326',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 页面管理新增
export function addWebForm(data) {
  return request({
    url: '/mp/framework/addWebForm.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 页面管理编辑
export function updateWebForm(data) {
  return request({
    url: '/mp/framework/updateWebForm.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 页面管理删除
export function deleteWebForm(data) {
  return request({
    url: '/mp/framework/deleteWebForm.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 页面管理-功能定义树状图查询
export function getdefinitionQuery(data) {
  return request({
    url: '/mp/framework/webform/controls/getCtrlInfo.do?ctrlId=' + data.ctrlId + '&ver=1.1&r=0.8967204036254943&menuId=1b6952a29b61422aa53ffe66157cfd67&menuName=%E9%A1%B5%E9%9D%A2%E7%AE%A1%E7%90%86',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 页面管理-功能定义API选择
export function getdefinitionApiQuery(data) {
  return request({
    url: '/mp/org/api/analysis/allPurview.do?token=' + data.token + '&r=1589179944274&menuId=1b6952a29b61422aa53ffe66157cfd67&menuName=%E9%A1%B5%E9%9D%A2%E7%AE%A1%E7%90%86',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 页面管理-功能定义API选择保存
export function getdefinitionApiSave(data) {
  return request({
    url: '/mp/framework/webform/controls/saveFormApi.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}


// 菜单管理页面数状图查询
export function getMyMenuTree(data) {
  return request({
    url: '/mp/framework/getMyMenuTree.do?token=' + data.token,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 菜单管理页面数状图查询 2
export function getMenuTree(data) {
  return request({
    url: '/mp/framework/getMenuTree.do?token=' + data.token + '&plattype=0&r=0.630715064910867&_=1574404437538',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 菜单管理页面数状图查询 -- 面包屑
export function getWebListPaged(data) {
  return request({
    url: '/mp/framework/getMyMenuTree.do?token=' + data.token,
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 点击树状图后的回调
export function getMenuInfo(data) {
  return request({
    url: '/mp/framework/getMenuInfo.do?token=' + data.token + '&menuid=' + data.menuid + '&ver=1.1&r=0.366586522397196&_=1574148107106',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 菜单管理保存页面
export function saveMenu(data) {
  return request({
    url: '/mp/framework/saveMenu.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 菜单管理删除功能
export function deleteMenu(data) {
  return request({
    url: '/mp/framework/deleteMenu.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 公告查询
export function announcementList(data) {
  return request({
    url: '/mp/notice/list.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&category='+data.category+'',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 首页 -公告查询
export function announcementHome(data) {
  return request({
    url: '/mp/notice/list.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&sort=asc&sortfield=&category=listnotice&stime=&etime=&isread=false&_=1578362366327',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
//  /查询详情
export function announcementSearchD(data) {
  return request({
    url: '/mp/notice/detail.do/' + data.ids + '/1' + '?token=' + data.token + '&_=1572400558326',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
//  公告信息
export function announcementInformation(data) {
  return request({
    url: '/mp/notice/unreadnum.do?skipBlock=true',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 公告删除
export function announcementDel(data) {
  return request({
    url: '/mp/notice/del.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 公告新增
export function announcementAdd(data) {
  return request({
    url: '/mp/notice/add.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 公告修改保存
export function announcementUpdate(data) {
  return request({
    url: '/mp/notice/modify.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 公告详情页
export function announcementDetails(data) {
  return request({
    url: '/mp/notice/detail.do/' + data.noticeid + '/0?_=1576893327517',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 公告管理-发布对象树状图查询

export function issuetreeQuery(data) {  
  return request({
    url: '/mp/org/relation/list.do?orgRealationId=&isall=0&method='+data.method+'',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
export function issuetreetoQuery(data) {  
  return request({
    url: '/ly/mp/busicen/eap/relation/list.do?orgRealationId=&isall=0&method='+data.method+'',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 公告管理-发布对象树状图用户点击查询

export function issueuserclickQuery(data) {
  return request({
    url: '/mp/org/user/select.do?orgid=' + data.orgid + '&name=&ischild=0&isvalid=1',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 用户风险分析-查询
export function useriskanalyzaQuery(data) {
  return request({
    url: '/mp/org/user/online/list.do?userName=' + encodeURI(data.userName) + '&pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 用户风险分析-删除
export function useriskanalyzaDelete(data) {
  return request({
    url: '/mp/org/user/online/offline.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 用户活跃度报表-活跃度报表-查询
export function userStatementQuery(data) {
  return request({
    url: '/mp/log/invoking/analyse.do?num=' + encodeURI(data.num) + '&startTime=' + data.startTime + '&endTime=' + data.endTime + '&platType=' + data.platType + '&sort=' + data.sort + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 用户活跃度报表-访问列表-查询
export function userListQuery(data) {
  return request({
    url: '/mp/log/invoking/analyseReport.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&sort=' + data.sort + '&sortField=TOTAL&search=' + data.search + '&startTime=' + data.startTime + '&endTime=' + data.endTime + '&platType=' + data.platType + '&type=USER',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 日志报表-日志图表-查询
export function logchartQuery(data) {
  return request({
    url: '/mp/log/run/stat.do?funcNum=' + encodeURI(data.funcNum) + '&type=' + data.type + '&startTime=' + data.startTime + '&endTime=' + data.endTime + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 日志报表-功能访问日志-查询
export function accesslogQuery(data) {
  return request({
    url: '/mp/log/run/list.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&sort=desc&sortField=run_time&funcName=' + encodeURI(data.funcName) + '&type=' + data.type + '&startTime=' + data.startTime + '&endTime=' + data.endTime + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 日志报表-菜单授权日志-查询
export function menuauthorizationQuery(data) {
  return request({
    url: '/mp/log/bssdata/menuright.do?sortfield=BSS_TIME&sort=desc&pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&tabname=' + data.tabname + '&username=' + encodeURI(data.username) + '&starttime=' + data.starttime + '&endtime=' + data.endtime + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 日志报表-用户表操作日志-查询
export function usertableQuery(data) {
  return request({
    url: '/mp/log/bssdata/list.do?sortfield=BSS_TIME&sort=desc&pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&tabname=T_EAP_SYS_USER&username=' + encodeURI(data.username) + '&starttime=' + data.starttime + '&endtime=' + data.endtime + '&optiontype=' + data.optiontype + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 日志报表-用户表操作日志-详情查询
export function usertabledetailQuery(data) {
  return request({
    url: '/mp/log/bssdata/info.do?id=' + data.id + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 日志报表-数据操作日志-查询
export function operationQuery(data) {
  return request({
    url: '/mp/log/bssdata/list.do?sortfield=BSS_TIME&sort=desc&pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&tabname=' + encodeURI(data.tabname) + '&username=' + encodeURI(data.username) + '&starttime=' + data.starttime + '&endtime=' + data.endtime + '&optiontype=' + data.optiontype + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 日志报表-用户活跃度报表-用户访问列表查询
export function uservisitQuery(data) {
  return request({
    url: '/mp/log/invoking/analyseReport.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&sort=' + data.sort + '&sortField=TOTAL&search=' + encodeURI(data.search) + '&startTime=' + data.startTime + '&endTime=' + data.endTime + '&platType=' + data.platType + '&type=USER',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 日志报表-功能服务管理-查询
export function functionalserviceQuery(data) {
  return request({
    url: '/mp/log/serviceUrl/list.do?pagesize=' + data.pagesize + '&pageindex=' + data.pageindex + '&sort=asc&sortField=funcId&funcName=' +encodeURI(data.funcName) + '',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 日志报表-功能服务管理-新增
export function functionalserviceAdd(data) {
  return request({
    url: '/mp/log/serviceUrl/add.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 日志报表-功能服务管理-编辑
export function functionalserviceEdit(data) {
  return request({
    url: '/mp/log/serviceUrl/update.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 日志报表-功能服务管理-删除
export function functionalserviceDele(data) {
  return request({
    url: '/mp/log/serviceUrl/del.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}
// 日志报表-功能服务管理-导出
export function functionalserviceExport(data) {
  return request({
    url: '/mp/log/serviceUrl/export.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

// 日志报表-功能服务管理-导入
export function functionalserviceImport(data) {
  return request({
    url: '/mp/log/serviceUrl/import.do',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : qs.stringify(data)
  })
}

