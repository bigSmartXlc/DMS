/**
 * description: 系统管理
 * 目前包括:页面管理 菜单管理 首页-公告 用户风险分析 用户活跃度报表
 * 日志报表
 * author: yxyan
 * createdDate: 2019-07-23
 */
import {
  getWebFormListPaged, addWebForm, deleteWebForm, updateWebForm, getMyMenuTree, announcementInformation, getMenuInfo, saveMenu, deleteMenu, getMenuTree, announcementList, announcementSearchD, announcementUpdate, announcementDel, announcementAdd, getWebListPaged, announcementHome, announcementDetails, useriskanalyzaQuery, useriskanalyzaDelete, userStatementQuery, userListQuery, issuetreeQuery,issuetreetoQuery, issueuserclickQuery, logchartQuery, accesslogQuery, menuauthorizationQuery, usertableQuery, operationQuery, uservisitQuery, usertabledetailQuery, functionalserviceQuery, functionalserviceAdd, functionalserviceEdit, functionalserviceDele, functionalserviceExport, functionalserviceImport, getdefinitionQuery,getdefinitionApiQuery,getdefinitionApiSave
} from '@/api/sysManage'

const state = {
}

const mutations = {
}

const actions = {
  // 页面管理查询
  getWebFormListPaged({ commit, state }, loadInfo) {
    const { pagedesc, target, pagesize, pageindex } = loadInfo
    return new Promise((resolve, reject) => {
      getWebFormListPaged({
        token: state.token,
        pagedesc: pagedesc,
        target: target,
        pagesize: pagesize,
        pageindex: pageindex
      }).then(response => {
        // commit('SET_TOKEN', '')
        // commit('SET_ORG_INFO', {})
        // removeAllCookie()
        // resetRouter()
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 页面管理新增
  addWebForm({ commit, state }, addInfo) {
    const { pagedesc, target, Platform_type } = addInfo
    return new Promise((resolve, reject) => {
      addWebForm({
        token: state.token,
        pagedesc: pagedesc,
        target: target,
        Platform_type: Platform_type

      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 页面管理编辑
  updateWebForm({ commit, state }, editInfo) {
    const { formid, pagedesc, target } = editInfo
    return new Promise((resolve, reject) => {
      updateWebForm({
        token: state.token,
        formid: formid,
        pagedesc: pagedesc,
        target: target
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 页面管理删除
  deleteWebForm({ commit, state }, deletInfo) {
    const { formid, force } = deletInfo
    return new Promise((resolve, reject) => {
      deleteWebForm({
        token: state.token,
        formid: formid,
        force: force
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 页面管理-功能定义树状图查询
  getdefinitionQuery({ commit, state }, loadInfo) {
    const { ctrlId, menuId, menuName } = loadInfo
    return new Promise((resolve, reject) => {
      getdefinitionQuery({
        token: state.token,
        ctrlId: ctrlId,
        menuId: menuId,
        menuName: menuName,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 页面管理-功能定义API树状图查询
  getdefinitionApiQuery({ commit, state }, loadInfo) {
    return new Promise((resolve, reject) => {
      getdefinitionApiQuery({
        token: state.token
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 页面管理-功能定义API树状图保存
  getdefinitionApiSave({ commit, state }, saveInfo) {
    const { text, controlType, readApiText, readApi, writeApiText, writeApi, controlId, selector, selectorIndex, formId, menuId, menuName} = saveInfo
    return new Promise((resolve, reject) => {
      getdefinitionApiSave({
        token: state.token,
        text:text,
        controlType:controlType,
        readApiText:readApiText,
        readApi:readApi,
        writeApiText:writeApiText,
        writeApi:writeApi,
        controlId:controlId,
        selector:selector,
        selectorIndex:selectorIndex,
        formId:formId,
        menuId:menuId,
        menuName:menuName
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 菜单管理树状图查询
  getMyMenuTree({ commit, state }, loadInfo) {
    return new Promise((resolve, reject) => {
      getMyMenuTree({
        token: state.token
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 菜单管理树状图查询
  getMenuTree({ commit, state }, loadInfo) {
    return new Promise((resolve, reject) => {
      getMenuTree({
        token: state.token
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 菜单管理查询 - 面包屑
  getWebListPaged({ commit, state }, loadInfo) {
    // const { } = loadInfo
    return new Promise((resolve, reject) => {
      getWebListPaged({
        token: state.token
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 点击树状后的回调
  getMenuInfo({ commit, state }, getInfo) {
    const { menuid } = getInfo
    return new Promise((resolve, reject) => {
      getMenuInfo({
        token: state.token,
        menuid: menuid
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 管理菜单删除
  deleteMenu({ commit, state }, dleInfo) {
    const { menuid } = dleInfo
    return new Promise((resolve, reject) => {
      deleteMenu({
        token: state.token,
        menuid: menuid
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 管理菜单保存
  saveMenu({ commit, state }, saveInfo) {
    const { method, menuID, menuCode, menuName, parentid, formID, isEnabled, menuType, menuOrder, menuIcon, menuDesc, plattype, openstyle, isauto_refresh, formDesc } = saveInfo
    return new Promise((resolve, reject) => {
      saveMenu({
        token: state.token,
        method: method,
        menuid: menuID,
        menucode: menuCode,
        menutype: menuType,
        menuname: menuName,
        parentid: parentid,
        formid: formID,
        isenabled: isEnabled,
        menuorder: menuOrder,
        menuicon: menuIcon,
        menudesc: menuDesc,
        plattype: plattype,
        openstyle: openstyle,
        isauto_refresh: isauto_refresh,
        formdesc: formDesc
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 公告信息查询
  announcementList({ commit, state }, loadInfo) {
    const { pagesize, pageindex,category } = loadInfo
    return new Promise((resolve, reject) => {
      announcementList({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        category:category
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 未读公告信息查询
  announcementInformation({ commit, state }, loadInfo) {
    // const { } = loadInfo
    return new Promise((resolve, reject) => {
      announcementInformation({
        token: state.token
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 首页-公告信息查询
  announcementHome({ commit, state }, loadInfo) {
    const { pagesize, pageindex } = loadInfo
    return new Promise((resolve, reject) => {
      announcementHome({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 公告详情查询
  announcementSearchD({ commit, state }, loadInfo) {
    const { ids } = loadInfo
    return new Promise((resolve, reject) => {
      announcementSearchD({
        token: state.token,
        ids: ids
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 公告删除
  announcementDel({ commit, state }, dleInfo) {
    const { ids } = dleInfo
    return new Promise((resolve, reject) => {
      announcementDel({
        token: state.token,
        ids: ids
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 公告修改
  announcementUpdate({ commit, state }, dleInfo) {
    const { noticeid, title, content, src, target, files, summary } = dleInfo
    return new Promise((resolve, reject) => {
      announcementUpdate({
        token: state.token,
        noticeid: noticeid,
        title: title,
        content: content,
        src: src,
        target: target,
        files: files,
        summary: summary
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 公告新增
  announcementAdd({ commit, state }, saveInfo) {
    const { title, content, src, target, files, summary ,notReqValid} = saveInfo
    return new Promise((resolve, reject) => {
      announcementAdd({
        token: state.token,
        title: title,
        content: content,
        src: src,
        target: target,
        files: files,
        summary: summary,
        notReqValid:notReqValid
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 公告详情页
  announcementDetails({ commit, state }, saveInfo) {
    const { noticeid } = saveInfo
    return new Promise((resolve, reject) => {
      announcementDetails({
        token: state.token,
        noticeid: noticeid
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 公告管理-发布对象树状图查询
  issuetreeQuery({ commit, state }, saveInfo) {
    const { method } = saveInfo
    return new Promise((resolve, reject) => {
      issuetreeQuery({
        token: state.token,
        method: method
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 公告管理-发布对象树状图查询
  issuetreetoQuery({ commit, state }, saveInfo) {
    const { method } = saveInfo
    return new Promise((resolve, reject) => {
      issuetreetoQuery({
        token: state.token,
        method: method
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 公告管理-发布对象树状图用户查询
  issueuserclickQuery({ commit, state }, saveInfo) {
    const { orgid } = saveInfo
    return new Promise((resolve, reject) => {
      issueuserclickQuery({
        token: state.token,
        orgid: orgid
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户风险分析-查询
  useriskanalyzaQuery({ commit, state }, saveInfo) {
    const { userName, pageindex, pagesize } = saveInfo
    return new Promise((resolve, reject) => {
      useriskanalyzaQuery({
        token: state.token,
        userName: userName,
        pagesize: pagesize,
        pageindex: pageindex
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户风险分析-删除
  useriskanalyzaDelete({ commit, state }, saveInfo) {
    const { uToken } = saveInfo
    return new Promise((resolve, reject) => {
      useriskanalyzaDelete({
        token: state.token,
        uToken: uToken
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户活跃度报表-报表-查询
  userStatementQuery({ commit, state }, saveInfo) {
    const { num, startTime, endTime, platType, sort } = saveInfo
    return new Promise((resolve, reject) => {
      userStatementQuery({
        token: state.token,
        num: num,
        startTime: startTime,
        endTime: endTime,
        platType: platType,
        sort: sort
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户活跃度报表-报表-查询
  userListQuery({ commit, state }, saveInfo) {
    const { pagesize, pageindex, sort, search, startTime, endTime, platType } = saveInfo
    return new Promise((resolve, reject) => {
      userListQuery({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        sort: sort,
        search: search,
        startTime: startTime,
        endTime: endTime,
        platType: platType,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-日志报表-查询
  logchartQuery({ commit, state }, saveInfo) {
    const { funcNum, type, startTime, endTime } = saveInfo
    return new Promise((resolve, reject) => {
      logchartQuery({
        token: state.token,
        funcNum: funcNum,
        type: type,
        startTime: startTime,
        endTime: endTime,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-功能访问日志-查询
  accesslogQuery({ commit, state }, saveInfo) {
    const { pagesize, pageindex, funcName, type, startTime, endTime } = saveInfo
    return new Promise((resolve, reject) => {
      accesslogQuery({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        funcName: funcName,
        type: type,
        startTime: startTime,
        endTime: endTime,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-菜单授权日志-查询
  menuauthorizationQuery({ commit, state }, saveInfo) {
    const { pagesize, pageindex, tabname, username, starttime, endtime } = saveInfo
    return new Promise((resolve, reject) => {
      menuauthorizationQuery({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        tabname: tabname,
        username: username,
        starttime: starttime,
        endtime: endtime,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-用户表操作日志-查询
  usertableQuery({ commit, state }, saveInfo) {
    const { pagesize, pageindex, optiontype, username, starttime, endtime } = saveInfo
    return new Promise((resolve, reject) => {
      usertableQuery({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        optiontype: optiontype,
        username: username,
        starttime: starttime,
        endtime: endtime,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-用户表操作日志-详情查询
  usertabledetailQuery({ commit, state }, saveInfo) {
    const { id } = saveInfo
    return new Promise((resolve, reject) => {
      usertabledetailQuery({
        token: state.token,
        id: id,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-数据操作日志-查询
  operationQuery({ commit, state }, saveInfo) {
    const { pagesize, pageindex, tabname, username, starttime, endtime, optiontype } = saveInfo
    return new Promise((resolve, reject) => {
      operationQuery({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        tabname: tabname,
        username: username,
        starttime: starttime,
        endtime: endtime,
        optiontype: optiontype
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-用户活跃度报表-用户访问列表查询
  uservisitQuery({ commit, state }, saveInfo) {
    const { pagesize, pageindex, sort, search, platType, startTime, endTime } = saveInfo
    return new Promise((resolve, reject) => {
      uservisitQuery({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        sort: sort,
        search: search,
        platType: platType,
        startTime: startTime,
        endTime: endTime

      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-功能服务管理-查询
  functionalserviceQuery({ commit, state }, saveInfo) {
    const { pagesize, pageindex, funcName } = saveInfo
    return new Promise((resolve, reject) => {
      functionalserviceQuery({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        funcName: funcName

      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-功能服务管理-新增
  functionalserviceAdd({ commit, state }, saveInfo) {
    const { funcId, funcName, serviceUrl, desc } = saveInfo
    return new Promise((resolve, reject) => {
      functionalserviceAdd({
        token: state.token,
        funcId: funcId,
        funcName: funcName,
        serviceUrl: serviceUrl,
        desc: desc
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-功能服务管理-编辑
  functionalserviceEdit({ commit, state }, saveInfo) {
    const { funcId, funcName, serviceUrl, desc, id } = saveInfo
    return new Promise((resolve, reject) => {
      functionalserviceEdit({
        token: state.token,
        funcId: funcId,
        funcName: funcName,
        serviceUrl: serviceUrl,
        desc: desc,
        id: id
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-功能服务管理-删除
  functionalserviceDele({ commit, state }, saveInfo) {
    const { id } = saveInfo
    return new Promise((resolve, reject) => {
      functionalserviceDele({
        token: state.token,
        id: id
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-功能服务管理-导出
  functionalserviceExport({ commit, state }, saveInfo) {
    const { id } = saveInfo
    return new Promise((resolve, reject) => {
      functionalserviceExport({
        token: state.token,
        id: id
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 日志报表-功能服务管理-导入
  functionalserviceImport({ commit, state }, saveInfo) {
    const { uploadfile } = saveInfo
    return new Promise((resolve, reject) => {
      functionalserviceImport({
        token: state.token,
        uploadfile: uploadfile
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
