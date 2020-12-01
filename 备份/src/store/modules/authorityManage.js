/**
 * description: 权限管理
 * author: mwhao
 * createdDate: 2019-12-5
 */
import {
  getAnalyse, getApiManage, purviewSource, getPurview, showPurview,
  purviewButton, tissueList, tissueClick, gettissueClick, userallpurview,
  getMenuPuerviewInfo, allPurview, apiPurviewSource, rolegetPurview, savePurview,
  roleshowPurview
} from '@/api/authorityManage'
import {
  getToken,
  getOrgInfoCookie
} from '@/utils/auth'

const state = {
  token: getToken(),
  avatar: '',
  menu: [],
  orgInfo: getOrgInfoCookie() !== '' ? JSON.parse(getOrgInfoCookie()) : {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_ORG_INFO: (state, orgInfo) => {
    state.orgInfo = orgInfo || {}
  }
}

const actions = {
  // 用户权限--- API管理查询
  getApiManage({ commit, state }, loadInfo) {
    const { apiName, serviceName, apiUrl, pagesize, pageindex } = loadInfo
    return new Promise((resolve, reject) => {
      getApiManage({
        token: state.token,
        pagesize: pagesize,
        pageindex: pageindex,
        apiName: apiName,
        serviceName: serviceName,
        apiUrl: apiUrl
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
  // 用户权限---用户权限分析弹窗 树状图查询
  getAnalyse({ commit, state }, addInfo) {
    const { userid } = addInfo
    return new Promise((resolve, reject) => {
      getAnalyse({
        token: state.token,
        userid: userid
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户权限---用户权限分析弹窗 树状图点击回调查询
  purviewSource({ commit, state }, addInfo) {
    const { puerid, userid, _search, nd, rows, page, sidx, sord, pagesize, pageindex, rw } = addInfo
    return new Promise((resolve, reject) => {
      purviewSource({
        token: state.token,
        puerid: puerid,
        userid: userid,
        _search: _search,
        nd: nd,
        rows: rows,
        page: page,
        sidx: sidx,
        sord: sord,
        pagesize: pagesize,
        pageindex: pageindex,
        rw: rw
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户权限---Api授权弹窗 树状图查询
  getPurview({ commit, state }, addInfo) {
    const { userId } = addInfo
    return new Promise((resolve, reject) => {
      getPurview({
        token: state.token,
        userId: userId
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户权限---API授权弹窗  确定授权
  purviewButton({ commit, state }, addInfo) {
    const { userId, apiIds } = addInfo
    return new Promise((resolve, reject) => {
      purviewButton({
        token: state.token,
        userId: userId,
        apiIds: apiIds
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 用户权限---API权限查看弹窗  树状图查询
  showPurview({ commit, state }, addInfo) {
    const { userId } = addInfo
    return new Promise((resolve, reject) => {
      showPurview({
        token: state.token,
        userId: userId
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 组织权限---树状图查询
  tissueList({ commit, state }, addInfo) {
    // const { } = addInfo
    return new Promise((resolve, reject) => {
      tissueList({
        token: state.token
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 组织权限---树状图点击回调查询
  tissueClick({ commit, state }, addInfo) {
    const { orgid, orgcode, orgname, pageindex, pagesize } = addInfo
    return new Promise((resolve, reject) => {
      tissueClick({
        token: state.token,
        orgid: orgid,
        orgcode: orgcode,
        orgname: orgname,
        pagesize: pagesize,
        pageindex: pageindex
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 组织权限---树状图点击回调查询
  gettissueClick({ commit, state }, addInfo) {
    const { orgid, orgcode, orgname, pageindex, pagesize } = addInfo
    return new Promise((resolve, reject) => {
      gettissueClick({
        token: state.token,
        orgid: orgid,
        orgcode: orgcode,
        orgname: orgname,
        pagesize: pagesize,
        pageindex: pageindex
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 菜单权限分析---树状图查询
  userallpurview({ commit, state }, addInfo) {
    // const {  } = addInfo
    return new Promise((resolve, reject) => {
      userallpurview({
        token: state.token
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 菜单权限分析---组织网格查询
  getMenuPuerviewInfo({ commit, state }, addInfo) {
    const { name, code, tabname, menuid, rows, page } = addInfo
    return new Promise((resolve, reject) => {
      getMenuPuerviewInfo({
        token: state.token,
        name: name,
        code: code,
        tabname: tabname,
        menuid: menuid,
        rows: rows,
        page: page
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // API权限分析---树状图查询
  allPurview({ commit, state }, addInfo) {
    // const { } = addInfo
    return new Promise((resolve, reject) => {
      allPurview({
        token: state.token
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // API权限分析---网格查询
  apiPurviewSource({ commit, state }, addInfo) {
    const { sourceId, pageSize, pageIndex, viewType, searchName, searchCode } = addInfo
    return new Promise((resolve, reject) => {
      apiPurviewSource({
        token: state.token,
        sourceId: sourceId,
        pageSize: pageSize,
        pageIndex: pageIndex,
        viewType: viewType,
        searchName: searchName,
        searchCode: searchCode
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 角色管理---Api授权弹窗 树状图查询
  rolegetPurview({ commit, state }, addInfo) {
    const { roleId } = addInfo
    return new Promise((resolve, reject) => {
      rolegetPurview({
        token: state.token,
        roleId: roleId
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 角色管理---API授权弹窗  确定授权
  savePurview({ commit, state }, addInfo) {
    const { roleId, apiIds } = addInfo
    return new Promise((resolve, reject) => {
      savePurview({
        token: state.token,
        roleId: roleId,
        apiIds: apiIds
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 角色管理---API权限查看弹窗
  roleshowPurview({ commit, state }, addInfo) {
    const { roleId } = addInfo
    return new Promise((resolve, reject) => {
      roleshowPurview({
        token: state.token,
        roleId: roleId
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
