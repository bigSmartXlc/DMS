/**
 * description: 请求方法（封装axios）
 * author: luojx
 * createdDate: 2019-07-27
 * logs:
 *   2019-08-16 加入blob下载方式 luojx
 */
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import Vue from 'vue'

// 重复请求问题处理
// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const pending = []
const CancelToken = axios.CancelToken
const removePending = (ever, type) => {
  const existsList = pending.filter(o => o.u === ever.url)
  if (existsList.length === 0) return
  for (const p in existsList) {
    if (existsList[p].u === ever.url) {
      let resData
      let reqData
      if (Object.prototype.toString.call(ever.data) === '[object Object]') {
        resData = JSON.stringify(ever.data)
      } else {
        resData = String(ever.data)
      }
      if (Object.prototype.toString.call(existsList[p].d) === '[object Object]') {
        reqData = JSON.stringify(existsList[p].d)
      } else {
        reqData = String(existsList[p].d)
      }
      if (reqData === resData) {
        // 执行取消操作
        existsList[p].f()
        // 把这条记录从数组中移除
        const index = pending.indexOf(existsList[p])
        pending.splice(index, 1)
      }
    }
  }
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 300000 // request timeout
})

// request 拦截器
service.interceptors.request.use(
  config => {
    if (!config.noHeader || config.noHeader === false) {
      if (store.getters.token) {
        config.headers['Authorization'] = store.getters.token
      }
      // 根据dataType判断是否excel导出
      if (config.data && config.data.dataType) {
        config.headers['dataType'] = config.data.dataType
        if (config.data.dataType === 'excel') {
          // excel导出：设置responseType
          config.responseType = 'blob'
        } else if (config.data.dataType === 'stream') {
          // 导入文件流：设置Content-Type
          config.headers['Content-Type'] = 'application/octet-stream'
        }
        delete config.data.dataType
      }
    }

    // 在一个ajax发送前执行一下取消操作
    removePending(config, 'request')
    config.cancelToken = new CancelToken((c) => {
      // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
      pending.push({ u: config.url, d: config.data, f: c })
    })
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    removePending(response.config, 'response')

    if (response.data.result) {
      if (response.data.result === '0') {
        if (response.data.msg === 'l9900000001' || response.data.msg === '9900000002') {
          if (!store.state.user.hasNoticeLogout) {
            store.dispatch('user/setHasNoticeLogout', true)
            // 退出登录
            store.dispatch('user/logout')
            setTimeout(() => {
              store.dispatch('user/setHasNoticeLogout', false)
            }, 3000)
            let loginPath = '/login'
            if (Vue.prototype.$config.loginConfig.loginType === '1') {
              loginPath = '/iamLogin'
            }
            MessageBox.alert('用户过期，请重新登录.', '温馨提示', {
              confirmButtonText: '确定',
              type: 'warning',
              callback: function() {
                if (location.href.indexOf(loginPath + '?redirect') < 0) {
                  const param = location.href.indexOf('#') > -1 ? location.href.split('#')[1] : ''
                  location.href = '/#' + loginPath + '?redirect=' + param
                  if (Vue.prototype.$utils.isIE() || Vue.prototype.$utils.isEdge()) {
                    location.reload()
                  }
                }
              }
            })
          }
          return response.data// Promise.reject('用户过期，请重新登录')
        } else if (response.data.errors && response.data.msg === 'fail') {
          Message({
            message: '查询失败,请重试',
            type: 'error',
            duration: 5 * 1000
          })
          if (store.state.app.loading.close) {
            setTimeout(() => {
              store.state.app.loading.close()
            }, 200)
          }
          return Promise.reject(response.data.errors)
        }
      } else if (response.data.result === 'x000000002') {
        Message({
          message: '该账号没有导出的权限，如需导出请总部下发权限',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(response.data.errors)
      }
    }
    if (!store.state.app.lock && store.state.app.loading.close) {
      setTimeout(() => {
        store.state.app.loading.close()
      }, 200)
    } else if (store.state.app.lock === '' && store.state.app.loading.close) {
      setTimeout(() => {
        store.state.app.loading.close()
      }, 2000)
    }
    // if(response.config.headers.dataType === 'excel'){
    //   return new Blob(response.data)
    // }
    return response.data
  },
  error => {
    console.log('err:' + error)
    if (store.state.app.loading.close) {
      setTimeout(() => {
        store.state.app.loading.close()
      }, 200)
    }
    return Promise.reject(error)
  }
)

export default service
