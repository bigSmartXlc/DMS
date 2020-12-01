/**
* description: 公共GraphQL请求方法
* author: luojx
* createdDate: 2019-07-20
* logs：
*  20190720 修改：引入config配置 luojx
*/
import qs from 'qs'
import request from '@/utils/request'
import config from '@/utils/config'
import store from '@/store'
import crypt from '@/utils/crypt'
import { Loading } from 'element-ui'

// 请求API
export function requestAPI(data, apiStyle) {
  if (apiStyle === 'restful' || config.apiStyle === 'restful') {
    return requestRestful(data)
  } else {
    return requestGraphQL(data)
  }
}

// 请求Restful API
export function requestRestful(data) {
  let requestData = data.type !== 'mutation' ? data.variables : data.variables
  let contentType = data.contentType
  const method = data.method || 'POST'
  if (!contentType) {
    // 'application/x-www-form-urlencoded; charset=UTF-8' or 'application/json; charset=UTF-8'
    contentType = 'application/json; charset=UTF-8'
  }
  // 如果非JSON请求，则使用拼接参数方式请求
  if (contentType.indexOf('application/json') < 0 || data.urlType === 'GET') {
    requestData = qs.stringify(requestData)
  }
  // 锁屏：(指定锁屏 || 更新类型api)
  if (data.lock) {
    data.lock !== 'unlock' ? store.dispatch('app/loading', (data.lock ? data.lock : '')) : ''
    if (data.lock) delete data.lock
  }
  return request({
    url: data.apiUrl,
    method: method,
    headers: {
      'Content-Type': contentType
    },
    // 解决本地mock错误问题
    data: (process.env.NODE_ENV === 'production' && config.cH === '/') ? {} : requestData
  }).then(res => {
    if (res.result === 'x000000001') {
      let time = 60
      const options = {
        lock: true,
        text: '系统正忙，请稍后重试！ ' + time + 's',
        spinner: 'iconfont icon',
        background: 'rgba(255, 255, 255)',
        target: document.getElementsByClassName('app-container-table')[1],
        customClass: 'defaultLoading'
      }
      const loading = Loading.service(options)
      goLoading()
      function goLoading() {
        let timeout = setTimeout(() => {
          time--
          loading.setText('系统正忙，请稍后重试！ ' + + time + 's')
          if(time <= 0){
            clearTimeout(timeout)
            loading.close()
          }
          goLoading()
        }, 1000)
      }
    } else {
      return new Promise((resolve,reject) => {
        resolve(res)
      })
    }
  })
}

// 请求GraphQL API
export function requestGraphQL(data) {
  // 截取url
  var url = data.apiUrl
  var serviceCode = data.serviceCode
  var specailCode = data.specailCode || ''
  delete data.apiUrl
  delete data.serviceCode
  delete data.specailCode
  // 锁屏：(指定锁屏 || 更新类型api)
  if (data.lock || data.query.indexOf('mutation') >= 0) {
    data.lock !== 'unlock' ? store.dispatch('app/loading', (data.lock ? data.lock: '')) : ''
    if (data.lock) delete data.lock
  }
  return request({
    url: url + config.cH + 'v=' + serviceCode + specailCode,
    method: 'post',
    data
  }).then(res => {
    if (res.result === 'x000000001') {
      let time = 60
      const options = {
        lock: true,
        text: '系统正忙，请稍后重试！ ' + time + 's',
        spinner: 'iconfont icon',
        background: 'rgba(255, 255, 255)',
        target: document.getElementsByClassName('app-container-table')[1],
        customClass: 'defaultLoading'
      }
      const loading = Loading.service(options)
      goLoading()
      function goLoading() {
        let timeout = setTimeout(() => {
          time--
          loading.setText('系统正忙，请稍后重试！ ' + + time + 's')
          if(time <= 0){
            clearTimeout(timeout)
            loading.close()
          }
          goLoading()
        }, 1000)
      }
    } else {
      return new Promise((resolve,reject) => {
        resolve(res)
      })
    }
  })
}

// 请求导入 API
// url如：/ly/mp/busicen/scc/excel/netToStoreMutationImport.do
// param: 参数对象（包含文件）：param.file(el-upload)/param.target.files[0](input[file])
// cb：回调函数（callback）
// queryString：url查询条件
export function requestImport(url, param, cb, queryStr) {

  var file
  // 加上param.raw，有的组件取回的Excel对象，属性值放在raw而非file里（暂不清楚原因）
  if (param.file || param.raw) {
    file = param.file || param.raw
  } else {
    file = param.target.files[0]
  }

  var fullUrl = url
  if (fullUrl.indexOf('http://') !== 0 && fullUrl.indexOf('https://') !== 0) {
    fullUrl = process.env.VUE_APP_BASE_API + fullUrl
  }

  var xhr = new XMLHttpRequest()
  xhr.open('POST', fullUrl + (queryStr || ''))
  xhr.setRequestHeader('Authorization', store.getters.token)
  xhr.overrideMimeType('application/octet-stream')
  var chunks = file.slice(0, file.size)
  this.$utils.getFileBinary(chunks, function(binary) {
    if (xhr.sendAsBinary) {
      xhr.sendAsBinary(binary)
    } else {
      xhr.send(binary)
    }
  })

  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var resp = JSON.parse(xhr.responseText)
        if (typeof cb === 'function') {
          cb.call(this, resp)
        }
      }
    }
  }
}

// 上传文件（调用MP API 专用）
// url如：/mp/file/{category}/upload.do
// param: 参数对象（包含文件）：param.file(el-upload)/param.target.files[0](input[file])
// cb：回调函数（callback）
// queryString：url查询条件
// MP API返回参数格式：
/*
  {
    "msg":"",
    "path":[
      ["xxxx.png|/upload/{category}/{yyyyMMdd}/{guid}/xxxx.jpg","xxx.xx KB"]
    ],
    "result":"1"
  }
*/
export function requestUpload(url, param) {
  var file
  if (param.file) {
    file = param.file
  } else {
    if (param.raw) {
      file = param.raw
    } else {
      file = param.target.files[0]
    }
  }

  var formData = new FormData()
  formData.append('uploadfile', file)

  return request({
    url: url,
    method: 'post',
    headers: {
      'Content-Type': 'application/form-data'
    },
    data: formData
  })
}

// MP接口请求
export function requestMPApi(requestObj, check, useQs) {
  if (check !== false) {
    // 防重放参数设置
    if (requestObj.data && config.loginConfig.requestValidate && config.loginConfig.requestValidate.length > 0) {
      for (var k = 0; k < config.loginConfig.requestValidate.length; k++) {
        if (requestObj.url.indexOf(config.loginConfig.requestValidate[k]) > -1) {
          // 取出防重放功能
          // if (store.state.user.serverTime && !isNaN(store.state.user.serverTime)) {
          //   requestObj.data.ly_mp_timestamp = store.state.user.serverTime.toString()
          //   requestObj.data.ly_mp_nonce = crypt.newGuid()
          // }
          if (typeof requestObj.data !== 'string') {
            requestObj.data = qs.stringify({ reuestParas: crypt.aesEncrypt(JSON.stringify(requestObj.data), config.loginConfig.aesKey) })
          }
          break
        }
      }
    }

    if (useQs !== false) {
      if (typeof requestObj.data !== 'string') {
        requestObj.data = qs.stringify(requestObj.data)
      }
    }
    if (requestObj.method === 'get') {
      if (requestObj.url.indexOf('?') > -1) {
        requestObj.url = requestObj.url + '&' + requestObj.data
      } else {
        requestObj.url = requestObj.url + '?' + requestObj.data
      }
    }
  }
  return request(requestObj)
}
