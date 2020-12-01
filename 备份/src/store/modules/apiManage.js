/**
 * description: API管理,服务调用报表
 * author: mwhao
 * createdDate: 2019-12-4
 */
import { addManage, getApiManage, getService, deleteManage, updateManage, exportManage,importManage,invokingQuery,servechartQuery } from '@/api/apiManage'
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
  // API管理查询
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
  // API新增/编辑弹窗服务名称下拉框查询查询
  getService({ commit, state }, loadInfo) {
    return new Promise((resolve, reject) => {
      getService({
        token: state.token
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
  // API新增弹窗保存
  addManage({ commit, state }, addInfo) {
    const { apiName, apiUrl, serviceName, serviceId, desc } = addInfo
    return new Promise((resolve, reject) => {
      addManage({
        token: state.token,
        apiName: apiName,
        apiUrl: apiUrl,
        serviceName: serviceName,
        serviceId: serviceId,
        desc: desc
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
  // API编辑弹窗保存
  updateManage({ commit, state }, addInfo) {
    const { apiName, apiUrl, serviceName, serviceId, desc, apiId } = addInfo
    return new Promise((resolve, reject) => {
      updateManage({
        token: state.token,
        apiId: apiId,
        apiName: apiName,
        apiUrl: apiUrl,
        serviceName: serviceName,
        serviceId: serviceId,
        desc: desc
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
  // API管理删除
  deleteManage({ commit, state }, addInfo) {
    const { apiIds } = addInfo
    return new Promise((resolve, reject) => {
      deleteManage({
        token: state.token,
        apiIds: apiIds
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
  // API管理导出
  exportManage({ commit, state }, addInfo) {
    const { apiIds } = addInfo
    return new Promise((resolve, reject) => {
      exportManage({
        token: state.token,
        apiIds: apiIds
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
  // API管理导入
  importManage({ commit, state }, addInfo) {
    const { uploadfile } = addInfo
    return new Promise((resolve, reject) => {
      importManage({
        token: state.token,
        uploadfile: uploadfile
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
  // 服务调用报表-服务调用明细-查询
  invokingQuery({ commit, state }, addInfo) {
    const { pagesize,pageindex,funcName,endTime,startTime } = addInfo
    return new Promise((resolve, reject) => {
      invokingQuery({
        token: state.token,
        pagesize: pagesize,
        pageindex:pageindex,
        funcName:funcName,
        startTime:startTime,
        endTime:endTime
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
  // 服务调用报表-服务调用图表-查询
  servechartQuery({ commit, state }, addInfo) {
    const { funcNum,endTime,startTime,sort } = addInfo
    return new Promise((resolve, reject) => {
      servechartQuery({
        token: state.token,
        funcNum: funcNum,
        startTime:startTime,
        endTime:endTime,
        sort:sort
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

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
