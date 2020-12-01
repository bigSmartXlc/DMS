/**
 * description: 用户登陆信息
 * author: luojx
 * createdDate: 2019-07-23
 * logs:
 *   2019-08-16 加入用户组织架构信息 luojx
 *              API具体信息：
 *              所属品牌	BRAND_CODE
 *              经销商编码	DLR_CODE
 *              经销商ID	DLR_ID
 *              经销商名称	DLR_NAME
 *              经销商全称	DLR_FULL_NAME
 *              经销商类型	DLR_ORG_TYPE
 *              经销商状态	DLR_STATUS
 *              员工ID EMP_ID
 *              集团编码	GROUP_CODE
 *              集团ID		GROUP_ID
 *              厂商编码	OEM_CODE
 *              厂商ID		OEM_ID
 *              组织编码	ORG_CODE
 *              组织ID		ORG_ID （所属节点ID/部门ID）
 *              组织名称	ORG_NAME
 *              组织类型	ORG_TYPE（0厂商，1门店，2集团 3供应商）
 *              一网经销商编码	PARENT_DLR_CODE
 *              一网经销商ID	PARENT_DLR_ID
 *              一网经销商名称	PARENT_DLR_NAME
 *              系统岗位编码	POS_CODE
 *              系统岗位ID	POS_ID
 *              对应工作台解决方案ID	SOLUTION_ID
 *              所属组织的公司ID	COMPANY_ID （树跟节点ID，当与ORG_ID相等时表示经销商为根节点）
 *              员工姓名	empName
 *              用户ID	userId
 *              用户账户	userName
 */
import {
  login,
  iamLogin,
  logout,
  iamLoginOut,
  getMenu,
  getOrgInfo,
  modifyPassword,
  navigationLogAdd,
  sliderCode,
  checkUser,
  sysConfig
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  removeLang,
  setLang,
  removeCurToken,
  setCurToken,
  removeCurUser,
  setCurUser,
  getOrgInfoCookie,
  setOrgInfoCookie,
  removeOrgInfoCookie,
  removeSecondaryVerification,
  getPwdIsRule,
  setPwdIsRule,
  removePwdIsRule
} from '@/utils/auth'
import { resetRouter, constantRoutes } from '@/router'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'
import config from '@/utils/config'
import utils from '@/utils/index'
import store from '@/store'
import md5 from 'js-md5'
import { sideBarHeightMenu } from '@/styles/variables.scss'
const state = {
  token: getToken(),
  avatar: '',
  menu: [],
  orgInfo: getOrgInfoCookie() !== '' ? JSON.parse(getOrgInfoCookie()) : {},
  serverTime: NaN,
  pwdIsRule: getPwdIsRule(), // 密码强度是否符合（0：不符合，1：符合）
  hasNoticeLogout: false // 是否已经提示过退出登录
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
  },
  SET_PWD_IS_RULE: (state, isRule) => {
    state.pwdIsRule = isRule
  },
  SET_SERVER_TIME: (state, serverTime) => {
    state.serverTime = serverTime || NaN
  },
  SET_NOTICE_LOGOUT: (state, hasNoticeLogout) => {
    state.hasNoticeLogout = hasNoticeLogout || false
  }
}

const actions = {
  // 用户登陆
  login({ commit }, userInfo) {
    const { username, password, clientid, vcode, slidercode } = userInfo
    var randomCode = Math.random().toString().substring(2)
    var lang = 'zh-CN'
    var curUser = ''
    return new Promise((resolve, reject) => {
      login({
        token: '',
        user: username.trim(),
        pwd: md5Encript(password, username.trim(), randomCode),
        lang: lang,
        clientid: clientid,
        vcode: vcode,
        slidercode: typeof slidercode === 'number' ? slidercode.toString() : slidercode,
        mode: '9',
        randomCode: randomCode
      }).then(response => {
        if (response.result === '1') {
          // 写Cookie
          commit('SET_TOKEN', response.token)
          const empName = response.empname
          const userId = response.userid
          const userName = response.username
          const usertype = response.usertype
          response['errorCode'] = 'Success'
          response['message'] = 'Success'
          response['loginPage'] = { 'type': 'None' }
          var curUserObj = {
            'username': response.username,
            'remember': false,
            'vcode': vcode, // 加入验证码 20190816
            'randomCode': randomCode,
            'token': response.token,
            'usertype': response.usertype,
            '$data': response
          }
          window.localStorage.setItem("userId", userId);
          curUser = JSON.stringify(curUserObj)
          setAllCookie(response.token, lang, response.token, curUser)

          // 读取用户组织架构信息
          var fields = 'BRAND_CODE DLR_CODE DLR_ID DLR_NAME DLR_ORG_TYPE DLR_STATUS GROUP_CODE GROUP_ID OEM_CODE OEM_ID ORG_CODE EMP_ID ORG_ID '
          fields += 'ORG_NAME ORG_TYPE PARENT_DLR_CODE PARENT_DLR_ID PARENT_DLR_NAME POS_CODE POS_ID SOLUTION_ID COMPANY_ID UPDATEPWDTIME'
          var queryObj = {}
          if (config.apiStyle !== 'restful') {
            fields = utils.replaceAll(fields, ',', ' ')
            queryObj = { query: 'query{getUserLoginInfo{' + fields + '}}' }
          }
          getOrgInfo(queryObj, response.token).then(response => {
            if (response.result === '1' || response.userId !== undefined) {
              // 保存用户组织架构信息
              var orgInfo = {}
              if (config.apiStyle !== 'restful') {
                orgInfo = response.data.getUserLoginInfo
              } else {
                orgInfo = {
                  UPDATETIME: response.updatetime,
                  // USER_ID: response.userId,
                  EMP_ID: response.empId,
                  ORG_TYPE: response.orgType,
                  ORG_CODE: response.orgCode,
                  ORG_ID: response.orgId,
                  ORG_NAME: response.orgName,
                  DLR_NAME: response.dlrName,
                  DLR_CODE: response.dlrCode,
                  DLR_ID: response.dlrId,
                  DLR_ORG_TYPE: response.dlrOrgType,
                  DLR_STATUS: response.dlrStatus,
                  PARENT_DLR_NAME: response.parentDlrName,
                  PARENT_DLR_CODE: response.parentDlrCode,
                  PARENT_DLR_ID: response.parentDlrId,
                  BRAND_CODE: response.brandCode,
                  OEM_ID: response.oemId,
                  OEM_CODE: response.oemCode,
                  GROUP_ID: response.groupId,
                  GROUP_CODE: response.groupCode,
                  POS_ID: response.posId,
                  BELONG_FACTORY_ID: response.belongFactoryId,
                  BELONG_FACTORY_CODE: response.belongFactoryCode,
                  SOLUTION_ID: response.solutionId,
                  COMPANY_ID: response.companyId,
                  EMP_NAME: response.empName,
                  USER_NAME: response.userName
                }
              }
              orgInfo['empName'] = empName
              orgInfo['userId'] = userId
              orgInfo['userName'] = userName
              orgInfo['usertype'] = usertype
              setOrgInfoCookie(JSON.stringify(orgInfo))
              commit('SET_ORG_INFO', orgInfo)

              resolve()
            } else {
              commit('SET_TOKEN', '')
              removeAllCookie()
              reject('登陆成功，但获取用户组织架构信息失败')
              resolve()
            }
          }).catch(error => {
            commit('SET_TOKEN', '')
            removeAllCookie()
            reject('登陆成功，但获取用户组织架构信息失败')
            resolve()
          })
        } else {
          reject(response)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // IAM用户登陆
  iamLogin({ commit }, userInfo) {
    const { code, state } = userInfo
    var randomCode = Math.random().toString().substring(2)
    var lang = 'zh-CN'
    var curUser = ''
    return new Promise((resolve, reject) => {
      iamLogin({
        code: code,
        state: state
      }).then(response => {
        if (response.result === '1') {
          // 写Cookie
          commit('SET_TOKEN', response.token)
          const empName = response.empname
          const userId = response.userid
          const userName = response.username
          const usertype = response.usertype
          response['errorCode'] = 'Success'
          response['message'] = 'Success'
          response['loginPage'] = { 'type': 'None' }
          var curUserObj = {
            'username': response.username,
            'remember': false,
            'vcode': '', // 加入验证码 20190816
            'randomCode': randomCode,
            'token': response.token,
            'usertype': response.usertype,
            '$data': response
          }
          window.localStorage.setItem("userId", userId);
          curUser = JSON.stringify(curUserObj)
          setAllCookie(response.token, lang, response.token, curUser)
          // 读取用户组织架构信息
          var fields = 'BRAND_CODE,DLR_CODE,DLR_ID,DLR_NAME,DLR_ORG_TYPE,DLR_STATUS,GROUP_CODE,GROUP_ID,OEM_CODE,OEM_ID,ORG_CODE,EMP_ID,ORG_ID,'
          fields += 'ORG_NAME,ORG_TYPE,PARENT_DLR_CODE,PARENT_DLR_ID,PARENT_DLR_NAME,POS_CODE,POS_ID,SOLUTION_ID,COMPANY_ID,UPDATEPWDTIME'
          var queryObj = {}
          if (config.apiStyle !== 'restful') {
            fields = utils.replaceAll(fields, ',', ' ')
            queryObj = { query: 'query{getUserLoginInfo{' + fields + '}}' }
          }
          getOrgInfo(queryObj, response.token).then(response => {
            if (response.result === '1' && response.data && response.data.getUserLoginInfo) {
              // 保存用户组织架构信息
              var orgInfo = response.data.getUserLoginInfo
              orgInfo['empName'] = empName
              orgInfo['userId'] = userId
              orgInfo['userName'] = userName
              orgInfo['usertype'] = usertype
              setOrgInfoCookie(JSON.stringify(orgInfo))
              commit('SET_ORG_INFO', orgInfo)

              resolve()
            } else {
              commit('SET_TOKEN', '')
              removeAllCookie()
              reject('登陆成功，但获取用户组织架构信息失败')
              resolve()
            }
          }).catch(error => {
            commit('SET_TOKEN', '')
            removeAllCookie()
            reject('登陆成功，但获取用户组织架构信息失败')
            resolve()
          })
        } else {
          reject(response)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取当前用户菜单
  getMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      getMenu(state.token).then(response => {
        var menus = []
        if (response.result !== '1') {
          reject('验证失败，请重登陆.')
        } else {
          const { rows } = response
          var tmpRows = []
          var tmpBlackMenus = config.blackMenuCodes || []
          if (rows && rows.length > 0) {
            // 排除MP菜单
            for (var i = 0; i < rows.length; i++) {
              if (tmpBlackMenus.length > 0 && tmpBlackMenus.indexOf(rows[i].code) < 0) {
                tmpRows.push(rows[i])
              }
            }

            menus = mpJsonToRoute(null, tmpRows)
            for (var j = 0; j < menus.length; j++) {
              constantRoutes.push(menus[j])
            }
          }

          // 加入404（这段路由必须放到最后）
          constantRoutes.push({ path: '*', name: '404', redirect: '/404', hidden: true })
          if (tmpRows && tmpRows.length === 0) {
            tmpRows.push({ path: '*', name: '404', redirect: '/404', hidden: true })
          }
          commit('SET_MENU', tmpRows)
          resetRouter()
        }
        resolve(menus)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出登陆
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({ token: state.token }).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_MENU', [])
        commit('SET_ORG_INFO', {})
        if (constantRoutes.length > 0) {
          var arr = []
          for (var i = 0; i < constantRoutes.length; i++) {
            if (constantRoutes[i].path !== '/redirect' && constantRoutes[i].path !== '/login' && constantRoutes[i].path !== '/iamLogin' && constantRoutes[i].path !== '/'
              && constantRoutes[i].path !== '/ve' && constantRoutes[i].path !== '/se' && constantRoutes[i].path !== '/pa' && constantRoutes[i].path !== '/crm' && constantRoutes[i].path !== '/sys') {
              arr.push(constantRoutes[i])
            }
          }
          if (arr.length > 0) {
            for (var j = 0; j < arr.length; j++) {
              const index = constantRoutes.indexOf(arr[j])
              constantRoutes.splice(index, 1)
            }
          }
        }
        removeAllCookie()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // IAM退出登陆
  iamLoginOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      iamLoginOut({ token: state.token }).then(() => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 设置是否提示已退出登录
  setHasNoticeLogout({ commit }, isNotice) {
    commit('SET_NOTICE_LOGOUT', isNotice)
  },

  // 修改密码
  modifyPassword({ commit }, passwordInfo) {
    const { oldpassword, newpassword } = passwordInfo

    var randomCode = Math.random().toString().substring(2)
    var tmpOldpassword = ''
    var tmpNewpassword = ''
    // 密码加密
    encriptPwdFn(state.orgInfo.userName.trim(), newpassword, 0, function (encriptOldPwd) {
      tmpNewpassword = encriptOldPwd
      encriptPwdFn(state.orgInfo.userName.trim(), oldpassword, 0, function (encriptOldPwd) {
        tmpOldpassword = encriptOldPwd
      })
    })

    // var tmpOldpassword = md5Encript(oldpassword, state.orgInfo.userName.trim(), randomCode)
    return new Promise((resolve, reject) => {
      modifyPassword({
        token: state.token,
        oldpassword: tmpOldpassword,
        newpassword: tmpNewpassword,
        r: randomCode
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 移除token（从cookie中）
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_MENU', [])
      commit('SET_ORG_INFO', {})
      removeAllCookie()
      resolve()
    })
  },

  // 记录导航日志
  navigationLogAdd({ commit, state }, saveInfo) {
    const { objid, objname, objurl, objtype } = saveInfo
    return new Promise((resolve, reject) => {
      navigationLogAdd({
        objid: objid,
        objname: objname,
        objurl: objurl,
        objtype: objtype
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取滑块图片编码
  sliderCode({ commit, state }, saveInfo) {
    return new Promise((resolve, reject) => {
      sliderCode(saveInfo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 检查用户名称
  checkUser({ commit, state }, saveInfo) {
    const { username } = saveInfo
    return new Promise((resolve, reject) => {
      checkUser({
        user: username.trim(),
        mode: '9'
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 设置系统时间
  setSererTime({ commit, state }, time) {
    commit('SET_SERVER_TIME', time)
  },

  // 设置登陆密码是否符合强密码规则
  setPwdIsRuleFromLogin({ commit, state }, isRule) {
    setPwdIsRule(isRule)
    commit('SET_PWD_IS_RULE', isRule)
  },

  // 读取系统配置
  sysConfig({ commit, state }, saveInfo) {
    return new Promise((resolve, reject) => {
      sysConfig(saveInfo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

// 解析MP菜单JSON成路由格式
function mpJsonToRoute(parent, arrChildren) {
  var routeList = []
  for (var i = 0; i < arrChildren.length; i++) {
    var route = {}
    let dir = arrChildren[i].target
    route['name'] = arrChildren[i].code
    if (arrChildren[i].type !== 'P') {
      // 父节点
      if (parent === null) {
        route['path'] = '/' + arrChildren[i].code
        route['component'] = () => import('@/layout')
        arrChildren[i].IdType = 0
      } else {
        route['path'] = arrChildren[i].code
        route['component'] = () => import('@/layout/empty')
        arrChildren[i].IdType = parent.IdType + 1
      }
      if (arrChildren[i].children && arrChildren[i].children.length > 1) {
        if (route.path === '/' || route.path === '') {
          route['redirect'] = arrChildren[i].target
        }
      }
      route['IdType'] = arrChildren[i].IdType
      route['menuId'] = arrChildren[i].id
      route['meta'] = { title: arrChildren[i].name, icon: arrChildren[i].icon, menuId: arrChildren[i].id }
      route['hidden'] = arrChildren[i].isauto_refresh === 1
    } else {
      // 子节点
      // 处理Iframe
      var path = getIFramePath(dir)
      if (path && path !== '') {
        route['path'] = arrChildren[i].code
        // route['path'] = path
        route['component'] = () => import(`@/layout/iframe`)
        // 设置Iframe Path 和 Url
        var url = getIFrameUrl(dir, config.mp2HostUrl)
        // 使用code作为path，在permission.js中handleIFrameUrl方法对应的也要改为to.name(code)
        var iFrameUrl = { 'path': arrChildren[i].code, 'url': url, 'isCurrent': false }
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        if (dir.indexOf('/') > -1) {
          dir = dir.substring(1)
        }
        // 参数控制
        // 页面配置模式如：/plugs/fineReport.vue?formlet=xxxx.frm
        let query = ''
        if (dir.indexOf('?') > -1) {
          const sDir = dir.split('?')
          query = '?' + sDir[1]
          dir = sDir[0]
        }
        route['path'] = arrChildren[i].code
        if (query.length > 0) {
          route['query'] = utils.getQueryObject(query, true)
        }
        route['component'] = () => import(`@/views/${dir}`)
      }
      arrChildren[i].IdType = parent ? parent.IdType + 1 : 0
      route['menuId'] = arrChildren[i].id
      route['IdType'] = arrChildren[i].IdType
      route['meta'] = { title: arrChildren[i].name, icon: arrChildren[i].icon, menuId: arrChildren[i].id, isChild: '1' }
      route['hidden'] = arrChildren[i].isauto_refresh === 1
    }

    if (arrChildren[i].children && arrChildren[i].children.length > 0) {
      route['children'] = mpJsonToRoute(arrChildren[i], arrChildren[i].children)
    }
    routeList.push(route)
  }

  return routeList
}

// 密码加密
function md5Encript(password, username, randomCode) {
  var pwd = md5(md5(md5(md5(md5(username + md5(md5(md5(password))))))) + randomCode)
  return pwd
}

// 修改密码加密
function encript(str, callback) {
  if (callback) {
    return callback(md5(str))
  }
}
function encriptPwdFn(un, pwd, encriptNum, callback) {
  if (encriptNum > 5) {
    return
  }
  encript(pwd, function (encriptPwd) {
    encriptNum += 1
    var encriptPwdToLow = encriptPwd.toLowerCase()
    if (encriptNum === 3) {
      encriptPwdToLow = un + encriptPwdToLow
      encriptPwdFn(un, encriptPwdToLow, encriptNum, callback)
    } else if (encriptNum === 5) {
      if (callback) {
        callback(encriptPwdToLow)
        return
      }
    } else {
      encriptPwdFn(un, encriptPwdToLow, encriptNum, callback)
    }
  })
}

// 清除Cookie
function removeAllCookie() {
  removeToken()
  if (config.isMpFront) {
    removeLang()
    removeCurToken()
    removeCurUser()
  }
  removeOrgInfoCookie()
  removeSecondaryVerification()
  removePwdIsRule()
}

// 设置Cookie
function setAllCookie(token, lang, curToken, curUser) {
  setToken(token)
  if (config.isMpFront) {
    setLang(lang)
    setCurToken(curToken)
    setCurUser(curUser)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
