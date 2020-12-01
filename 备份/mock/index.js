import Mock from 'mockjs'
import { param2Obj } from '../src/utils'
import user from './user'
import businessPsrManager from './org/businessPsrManager'
import dlrGeneralInfo from './org/dlrGeneralInfo'
import employeeInfo from './org/employeeInfo'
import mdmOrgInfoQuery from './org/mdmOrgInfoQuery'
import mdmOrgInfoQuerySupplierByPage from './org/mdmOrgInfoQuerySupplierByPage'
import organizationalChart from './org/organizationalChart'
import orgcomponentsMock from './org/orgcomponentsMock'
import orgInfoMock from './org/orgInfoMock'
import orgProvinceQueryFindAll from './org/orgProvinceQueryFindAll'
import sysManagement from './org/sysManagement'
import sysMsgModule from './org/sysMsgModule'
import sysSceneSetting from './org/sysSceneSetting'
import belowInfoMock from './ve/belowInfoMock'

// 试驾车mock 数据
import testDriver from "./testDriver/testDriver";

var mocks = [
  ...testDriver,
  ...user,
  ...businessPsrManager,
  ...dlrGeneralInfo,
  ...employeeInfo,
  ...mdmOrgInfoQuery,
  ...mdmOrgInfoQuerySupplierByPage,
  ...organizationalChart,
  ...orgcomponentsMock,
  ...orgInfoMock,
  ...orgProvinceQueryFindAll,
  ...sysManagement,
  ...sysMsgModule,
  ...sysSceneSetting,
  ...belowInfoMock
]

// const mockFiles = require.context('./org', true, //.js$/)
// mockFiles.keys().reduce((allMocks, modulePath) => {
//   const moduleName = modulePath.replace(/^/.//(.*)/./w+$/, '$1')
//   if (moduleName !== 'menuListMock') {
//     // const value = mockFiles(modulePath)
//     // mocks.push(...value.default)
//   }
// }, {})

// 前端mock
export function mockXHR() {
  // mock patch
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || 'get',
      XHR2ExpressReqWrap(i.response)
    )
  }
}
// 服务器mock
const responseFake = (url, type, respond) => {
  const regUrl = `/mock${url}`
  return {
    url: new RegExp(regUrl),
    type: type || 'get',
    response(req, res) {
      res.json(
        Mock.mock(respond instanceof Function ? respond(req, res) : respond)
      )
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
