/*
* description: 获取页面配置化信息
* author: luojx
* createdDate: 2019-09-03
*/
// import request from '@/utils/request'
// import qs from 'qs'
import store from '@/store'
import { orgApis } from '@/api/apiList/org'
import { requestGraphQL } from '@/api/commonRequest'
import { getParams } from '@/utils/getParamter'
import { CacheConfig } from '@/cache/configCache/index'
import storage from '@/utils/storage'

// 获取页面配置化数据
export function getPageConfigs(data, token) {
  // var tmpToken = 'HRYrhvsHb12oFEYuDoEIGJQL1gmkKuXYHiIEDI9wI9c%3d' // token || store.getters.token
  // return request({
  //   url: 'http://localhost:8008/yzc/eccommon/ilogs/testdypages.do?token=' + tmpToken + '&' + qs.stringify(data),
  //   method: 'get',
  //   noHeader: true
  // })

  const queryObj = {
    // api配置
    apiConfig: orgApis.proConfigInfoQueryByPage,
    // 需要调用的API服务配置
    apiServices: [{
      // 表格中台返回网格的字段
      apiQueryRow: [
        'pageCode',
        // 网格
        'cols.align',
        'cols.colsId',
        'cols.hidden',
        'cols.isComponent',
        'cols.isEnable',
        'cols.isSys',
        // 'cols.proConfigLangExtend.langLabel',
        'cols.label',
        'cols.pageId',
        'cols.prop',
        'cols.sort',
        'cols.sortable',
        // 'cols.userId',
        'cols.width',
        'cols.isFlag',
        'cols.updateControlId',
        // 组件
        'comps.clearable',
        'comps.clickEvent',
        'comps.codeField',
        'comps.colsId',
        'comps.mustFields',
        'comps.otherFields',
        'comps.otherFields',
        // 'comps.compId',
        'comps.compKey',
        'comps.rowFields',
        'comps.compType',
        'comps.compareField',
        'comps.compareValue',
        'comps.labelName',
        'comps.component',
        'comps.contWay',
        'comps.controlType',
        'comps.dateOptionsType',
        'comps.dateType',
        'comps.filterable',
        'comps.format',
        'comps.inputType',
        'comps.isMul',
        'comps.isAsync',
        'comps.isMust',
        'comps.isRequire',
        'comps.isEnable',
        'comps.isShow',
        'comps.isShowLabel',
        // 'comps.proConfigLangExtend.langLabel',
        'comps.lookupType',
        'comps.parentFields',
        'comps.textField',
        'comps.pageArea',
        'comps.span',
        'comps.dataToObject',
        'comps.returnCodeFields',
        'comps.returnTextFields',
        'btns.text',
        'btns.buttonKey',
        'btns.type',
        // 'btns.proConfigLangExtend.langLabel',
        'btns.clickEvent',
        'btns.pageArea',
        'btns.size',
        'btns.position',
        'btns.name',
        'btns.isShow',
        'btns.parentFields',
        'btns.fuzzySearch',
        'btns.isEnable',
        'btns.disabled',
        'msg'
      ]
    }],
    // 条件/实体参数（变量），根据typeParam中的定义配置
    variables: {
      pageSize: 500,
      pageIndex: 1,
      // 当前中台使用的名称有dataInfo、info，具体查看API文档
      dataInfo: data
    }
  }
  // 转换了中台请求格式数据
  var paramD = getParams(queryObj)
  return requestGraphQL(paramD)
}

// 保存网格列顺序拖动后的网格列
export function saveColsInfo(key, storageCols, cacheCols) {
  var cols = []
  // 与原来的比较找出更改的网格列
  for (var k in storageCols) {
    if (storageCols[k].colsId !== cacheCols[k].colsId) {
      var updateControlId = cacheCols.filter(o => o.colsId === storageCols[k].colsId)[0]['updateControlId']
      var col = {
        width: (storageCols[k].width === undefined || storageCols[k].width === null) ? '0' : storageCols[k].width,
        pageId: storageCols[k].pageId,
        sort: storageCols[k].sort,
        colsId: storageCols[k].colsId,
        userId: store.getters.orgInfo.userId,
        updateControlId: updateControlId
      }
      cols.push(col)
    }
  }
  if (cols.length === 0) return
  const queryObj = {
    // 保存mutation
    type: 'mutation',
    typeParam: '($dataInfo:[InputProConfigColumn])',
    // api配置
    apiConfig: orgApis.proConfigInfoMutationSave,
    apiServices: [
      {
        apiServiceParam: '(dataInfo:$dataInfo)'
      }
    ],
    variables: {
      // 当前中台使用的名称有dataInfo、info，具体查看API文档
      dataInfo: cols
    }
  }
  // 转换了中台请求格式数据
  var paramD = getParams(queryObj)
  // 调用中台API方法（可复用）
  requestGraphQL(paramD).then(response => {
    if (response.data[queryObj.apiConfig.ServiceCode].result === '1') {
      CacheConfig.cacheData[key] = undefined
      storage.remove(key)
      CacheConfig.initData(key)
    }
  })
}

//保存网格列宽度拖动后的网格列
export function saveColsWidthInfo(key, colsWidthInfo, cb) {
  var cols = []
  for(var k in colsWidthInfo){
    var col = {
      width: colsWidthInfo[k].width,
      pageId:colsWidthInfo[k].pageId,
      sort:colsWidthInfo[k].sort,
      colsId:colsWidthInfo[k].colsId,
      userId:colsWidthInfo[k].userId,
      updateControlId:colsWidthInfo[k].updateControlId
    }
    cols.push(col)
  }
  if (colsWidthInfo.length === 0) return
  const queryObj = {
    // 保存mutation
    type: 'mutation',
    typeParam: '($dataInfo:[InputProConfigColumn])',
    // api配置
    apiConfig: orgApis.proConfigInfoMutationSave,
    apiServices: [
      {
        apiServiceParam: '(dataInfo:$dataInfo)'
      }
    ],
    variables: {
      // 当前中台使用的名称有dataInfo、info，具体查看API文档
      dataInfo: cols
    }
  }
  // 转换了中台请求格式数据
  var paramD = getParams(queryObj)
  // 调用中台API方法（可复用）
  requestGraphQL(paramD).then(response => {
    if (response.data[queryObj.apiConfig.ServiceCode].result === '1') {
      CacheConfig.cacheData[key] = undefined
      storage.remove(key)
      CacheConfig.initData(key)
      if (typeof cb === 'function') {
          cb.call(this, response)
      }
    }
  })
}

// 自动保存页面信息、网格列、组件信息
export function saveCacheInfo(dataInfo) {
  const queryObj = {
    // 保存mutation
    type: 'mutation',
    // api配置
    apiConfig: orgApis.proConfigInfoAllMutationSave,
    variables: {
      // 当前中台使用的名称有dataInfo、info，具体查看API文档
      dataInfo: dataInfo
    }
  }
  // 转换了中台请求格式数据
  var paramD = getParams(queryObj)
  // 调用中台API方法（可复用）
  requestGraphQL(paramD).then(response => {
    if (response.data[queryObj.apiConfig.ServiceCode].result === '1') {
      console.log('success')
    }
  })
}
