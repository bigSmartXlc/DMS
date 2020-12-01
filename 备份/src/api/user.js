import config from '@/utils/config'
import { orgApis } from './apiList/org'
import { requestMPApi } from './commonRequest'

// MP登陆
export function login(data) {
  return requestMPApi({
    url: '/mp/login/validlogin.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// IAM登陆
export function iamLogin(data) {
  return requestMPApi({
    url: config.loginConfig.iamVerificationUrl,
    method: 'get',
    data: data
  })
}

// IAM退出登陆
export function iamLoginOut(data) {
  return requestMPApi({
    url: config.loginConfig.iamLoginOutUrl,
    method: 'get',
    data: data
  })
}

// 组织架构信息
export function getOrgInfo(data, token) {
  return requestMPApi({
    url: orgApis.getUserLoginInfo.APIUrl + (token && token.length > 0 ? '?token=' + token : ''),
    method: 'post',
    data: data
  }, false)
}

// import axios from 'axios'
export function getMenu(token) {
  // return axios.get('http://mp221-nginx2-pvoadev.openshift.szlanyou.local/mp/framework/getMyMenuTree.do?token=' + token, {})
  return requestMPApi({
    url: '/mp/framework/getMyMenuTree.do',
    method: 'get',
    data: { 'token': token }
  })
}

export function logout(data) {
  return requestMPApi({
    url: '/mp/login/logout.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// 密码修改
export function modifyPassword(data) {
  return requestMPApi({
    url: '/mp/framework/modifyPassword.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// 系统设置查询
export function systemSetLoad(data) {
  return requestMPApi({
    url: '/mp/framework/sysetload.do',

    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// 系统设置保存
export function systemSetSave(data) {
  return requestMPApi({
    url: '/mp/framework/sysetsave.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// 记录导航日志
export function navigationLogAdd(data) {
  return requestMPApi({
    url: '/mp/log/NavigationLogAdd.do',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// 获取滑块图片编码
export function sliderCode(data) {
  return requestMPApi({
    url: '/mp/login/slidercode.do',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// 检查用户名称
export function checkUser(data) {
  return requestMPApi({
    url: '/mp/login/checkuser.do',
    method: config.loginConfig.mpVersion === '2.34' ? 'post' : 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// 读取系统配置
export function sysConfig(data) {
  return requestMPApi({
    url: '/mp/login/sysconfig.do',
    method: 'get',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    // 解决本地mock错误问题
    data: data
  })
}

// 读取桌面配置
export function proConfigDesktopQueryByPage(data) {
  return requestMPApi({
    url: orgApis.proConfigDesktopQueryByPage.APIUrl + config.cH + 'v=' + orgApis.proConfigDesktopQueryByPage.ServiceCode,
    method: 'post',
    data: data
  }, false)
}

// 获取IAM验证信息（code：IAM返回的编码，state：自定义字符）
export function getIAMLoginInfo(code, state) {
  return requestMPApi({
    url: '/mp/framework/getMyMenuTree.do',
    method: 'get',
    data: { 'token': token }
  })
}
