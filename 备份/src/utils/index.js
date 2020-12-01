/**
 * description: 公共方法
 * author: luojx
 * createdDate: 2019-07-20
 * *  2019-11-29 修改必填校验独立属性  liyanm
 */
import Vue from 'vue'
import {
  isString,
  isObject
} from './types'

/**
 * 替换所有字符串
 * @param {string} str 需要操作的字符串
 * @param {string} s1 需要替换的字符
 * @returns {string} s2 替换后的字符
 */
export function replaceAll(str, s1, s2) {
  return str.replace(new RegExp(s1, 'gm'), s2)
}

/**
 * 截取小数
 * @param {number/string} num 需要截取的数据
 * @param {number} len 截取位数
 * @returns {number} 截取后的数字
 */
function getNumber(num, len) {
  if (num !== null && num !== undefined) {
    var cNum = typeof num === 'string' ? num : typeof num === 'number' && isNaN(num) ? '' : num.toString()
    if (cNum && cNum.length > 0) {
      if (cNum.indexOf('.') > -1) {
        const result = cNum
        if (len !== undefined && len !== null) {
          return parseFloat(parseFloat(result).toFixed(len))
          // result = result.substring(0, result.indexOf('.') + (len > 0 ? 1 + len : 0))
        } else {
          return parseFloat(result)
        }
      } else {
        return parseFloat(cNum)
      }
    }
  }
  return num
}

/*
 * 像素转数值
 */
function pxToNumber(px) {
  if (typeof px === 'number') {
    return px
  }
  const numPx = parseFloat(px.replace('px', ''))
  return numPx
}

/**
 * 转换时间为字符串（格式）
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 日期转字符串
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * url参数转json对象
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

function extend(to, _from) {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

// 数值转换为json对象
export function toObject(arr) {
  var res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}

export const getValueByPath = function(object, prop) {
  prop = prop || ''
  const paths = prop.split('.')
  let current = object
  let result = null
  for (let i = 0, j = paths.length; i < j; i++) {
    const path = paths[i]
    if (!current) break

    if (i === j - 1) {
      result = current[path]
      break
    }
    current = current[path]
  }
  return result
}

// 获取随机数
export const generateId = function() {
  return Math.floor(Math.random() * 10000)
}

// 判断两个值是否相同
export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true
  if (!(a instanceof Array)) return false
  if (!(b instanceof Array)) return false
  if (a.length !== b.length) return false
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const escapeRegexpString = (value = '') => String(value).replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

// 返回符合条件的数组索引
export const arrayFindIndex = function(arr, pred) {
  for (let i = 0; i !== arr.length; ++i) {
    if (pred(arr[i])) {
      return i
    }
  }
  return -1
}

// 返回符合条件的数组索引对应的项
export const arrayFind = function(arr, pred) {
  const idx = arrayFindIndex(arr, pred)
  return idx !== -1 ? arr[idx] : undefined
}

// 对象强制转数组
export const coerceTruthyValueToArray = function(val) {
  if (Array.isArray(val)) {
    return val
  } else if (val) {
    return [val]
  } else {
    return []
  }
}

// 是否IE浏览器
export const isIE = function() {
  return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode))
}

// 是否Edge浏览器
export const isEdge = function() {
  return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1
}

export const autoprefixer = function(style) {
  if (typeof style !== 'object') return style
  const rules = ['transform', 'transition', 'animation']
  const prefixes = ['ms-', 'webkit-']
  rules.forEach(rule => {
    const value = style[rule]
    if (rule && value) {
      prefixes.forEach(prefix => {
        style[prefix + rule] = value
      })
    }
  })
  return style
}

export const kebabCase = function(str) {
  const hyphenateRE = /([^-])([A-Z])/g
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
}

// 首字母大写
export const capitalize = function(str) {
  if (!isString(str)) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 对比两个string/json对象是否相同
export const looseEqual = function(a, b) {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

// 对比两个数组是否相同
export const arrayEquals = function(arrayA, arrayB) {
  arrayA = arrayA || []
  arrayB = arrayB || []

  if (arrayA.length !== arrayB.length) {
    return false
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false
    }
  }

  return true
}

// 对比两个对象是否相同（可以是数值类型也可以是数组）
export const isEqual = function(value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2)
  }
  return looseEqual(value1, value2)
}

// 判断字符串是否为空
export const isEmpty = function(val) {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

      // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

// 根据路由path获取组件深度
export const getPathDeep = function(path, py) {
  var pcl = py || 3
  var deepCount = path.split('/').length - pcl
  if (deepCount < 0) {
    deepCount = 0
  }
  return deepCount
}

// 根据当前组件获取AppMain视图
export const getParentView = function(path, curComponent, py) {
  // var curParent = parent
  // var deepCount = getPathDeep(path, py)
  // while (deepCount > 0 && curParent.$parent) {
  //   curParent = curParent.$parent
  //   deepCount--
  // }
  // return curParent
  var curParent = null
  if (!curComponent.$refs.refRouterView) {
    while (curComponent && curComponent.$parent) {
      curComponent = curComponent.$parent
      if (curComponent.$refs.refRouterView) {
        curParent = curComponent
        break
      }
    }
  }
  return curParent
}

// 根据当前组件获取AppMain视图高度
// isSubBreadcrumb：是否减去面包屑高度
// defBreadcrumbHeight：默认面包屑高度（-1：使用css样式中定义的高度）
export const getAppMainHeight = function(path, curComponent, py, isSubBreadcrumb, defBreadcrumbHeight) {
  var appMain = getParentView(path, curComponent, py)
  var appMainHeight = 0
  if (appMain != null && appMain !== undefined) {
    if (appMain.offsetHeight) {
      appMainHeight = appMain.offsetHeight
    } else {
      appMainHeight = appMain.$el.offsetHeight
    }
    if (isSubBreadcrumb === true && appMain.$refs) {
      if (appMain.$refs.breadcrumb) {
        if (appMain.$refs.breadcrumb.offsetHeight) {
          appMainHeight -= appMain.offsetHeight
        } else {
          appMainHeight -= appMain.$refs.breadcrumb.$el.offsetHeight
        }
      } else if (defBreadcrumbHeight) {
        if (defBreadcrumbHeight === -1) {
          appMainHeight -= pxToNumber(Vue.prototype.$variables.breadcrumbHeight)
        } else {
          appMainHeight -= defBreadcrumbHeight
        }
      }
    }
  }
  return appMainHeight
}

// 列表结构转为数结构JSON（抽取根节点）
export const parseTreeFromList = function(list, parentFieldId, fieldId) {
  if (!list || list.length === 0) {
    return []
  }
  var first
  var rootList = list.filter(o => o[parentFieldId] === '-1')
  if (rootList && rootList.length > 0) {
    first = rootList[0]
  } else {
    first = list[0]
  }
  var rootParentId = getTreeListRoot(first[parentFieldId], list, parentFieldId, fieldId)
  var roots = list.filter(o => o[fieldId] === rootParentId)
  if (!roots || roots.length < 1) {
    roots = list.filter(o => o[parentFieldId] === rootParentId)
  }

  // var root = roots[0]
  // rootParentId = root[fieldId]
  // root.children = parseTreeFromListFromRoot(rootParentId, list, parentFieldId, fieldId)
  // return root

  for (var i = 0; i < roots.length; i++) {
    rootParentId = roots[i][fieldId]
    roots[i].children = parseTreeFromListFromRoot(rootParentId, list, parentFieldId, fieldId)
  }
  return roots
}

const getTreeListRoot = function(parentId, list, parentFieldId, fieldId) {
  var rootId = parentId
  var parent = list.filter(i => i[fieldId] === rootId && i[fieldId] !== i[parentFieldId])
  if (parent && parent.length > 0) {
    rootId = getTreeListRoot(parent[0][parentFieldId], list, parentFieldId, fieldId)
  }
  return rootId
}

// 列表结构转为数结构JSON
export const parseTreeFromListFromRoot = function(parentId, list, parentFieldId, fieldId) {
  var treeRows = list.filter(o => o[parentFieldId] === parentId && o[fieldId] !== parentId)
  if (treeRows) {
    for (var i = 0; i < treeRows.length; i++) {
      treeRows[i].children = parseTreeFromListFromRoot(treeRows[i][fieldId], list, parentFieldId, fieldId)
    }
  }
  return treeRows
}

// 已作废
// export const getArrayFromJsonArray = function(arrJson, key) {
//   var arr = []
//   // 子Json对象Key前缀
//   var subKeyQx = ''
//   for (var i = 0; i < arrJson.length; i++) {
//     if (arrJson[i][key].indexOf('.') > -1) {
//       if (subKeyQx === arrJson[i][key].split('.')[0]) {
//         // 查看下一记录是否一样的前缀
//         if (i < arrJson.length - 1) {
//           if (subKeyQx !== arrJson[i + 1][key].split('.')[0]) {
//             arr.push(arrJson[i][key].split('.')[1] + '}')
//           } else {
//             arr.push(arrJson[i][key].split('.')[1])
//           }
//         } else {
//           arr.push(arrJson[i][key].split('.')[1] + '}')
//         }
//       } else {
//         subKeyQx = arrJson[i][key].split('.')[0]

//         // 查看下一记录是否一样的前缀
//         if (i < arrJson.length - 1) {
//           if (subKeyQx !== arrJson[i + 1][key].split('.')[0]) {
//             arr.push(arrJson[i][key].split('.')[0] + '{' + arrJson[i][key].split('.')[1] + '}')
//           } else {
//             arr.push(arrJson[i][key].split('.')[0] + '{' + arrJson[i][key].split('.')[1])
//           }
//         } else {
//           arr.push(arrJson[i][key].split('.')[0] + '{' + arrJson[i][key].split('.')[1] + '}')
//         }
//       }
//     } else {
//       subKeyQx = ''
//       arr.push(arrJson[i][key])
//     }
//   }
//   return arr
// }

// 从jsonArray对象中抽取某个键的值组合为数组返回（且把带“.”的key转换成GraphQL多层结构）
// arrJson:一层的json数组
// key:数组中的某个字段，非多层如：carConfigId，多层如：mdmCarColorExtend.carColorName
export const getArrayFromJsonArray = function(arrJson, key) {
  var arr = []
  for (var i = 0; i < arrJson.length; i++) {
    if (arrJson[i]) {
      if (key.indexOf('.') > -1) {
        var pointCount = key.split('.').length - 1
        var field = replaceAll(key, '\\.', '{')
        for (var j = 0; j < pointCount; j++) {
          field += '}'
        }
        if (arrJson[i][field]) {
          arr.push(arrJson[i][field])
        }
      } else if (arrJson[i][key]) {
        arr.push(arrJson[i][key])
      }
    }
  }
  return arr
}
export const getArrayFromArray = function(arrOriginal) {
  var arr = []
  for (var i = 0; i < arrOriginal.length; i++) {
    arr.push(getStringFromString(arrOriginal[i]))
    // if (arrOriginal[i].indexOf('.') > -1) {
    //   var pointCount = arrOriginal[i].split('.').length - 1
    //   var field = replaceAll(arrOriginal[i], '\\.', '{')
    //   for (var j = 0; j < pointCount; j++) {
    //     field += '}'
    //   }
    //   arr.push(field)
    // } else {
    //   arr.push(arrOriginal[i])
    // }
  }
  return arr
}
export const getStringFromString = function(strOriginal) {
  if (strOriginal.indexOf('.') > -1) {
    var pointCount = strOriginal.split('.').length - 1
    var field = replaceAll(strOriginal, '\\.', '{')
    for (var j = 0; j < pointCount; j++) {
      field += '}'
    }
    return field
  } else {
    return strOriginal
  }
}
// 导出API请求参数中cloumns转换（xxx.yyy.zzz形式转换为：[xxx][yyy][zzz]）
export const getExportStringFromString = function(strOriginal) {
  if (strOriginal.indexOf('.') > 0) {
    return '[' + replaceAll(strOriginal, '\\.', '][') + ']'
  } else {
    return strOriginal
  }
}

// const getFieldFromJsonArray = function(fullField) {
//   var str = ''
//   var arr = fullField.split('.')
//   var pointCount = arr.length - 1
//   var field = arr[pointCount]
//   var fieldQx = fullField.substring(0, fullField.lastIndexOf('.'))
//   for (var j = 0; j < pointCount; j++) {
//     field += '}'
//   }
//   return str
// }

// GraphQL返回多层结构数据转一层数据（以“.”相连）
export const changeToOneDeepArray = function(arrJson) {
  var arr = []
  for (var i = 0; i < arrJson.length; i++) {
    var obj = {}
    for (var key in arrJson[i]) {
      if (arrJson[i][key] !== null && typeof arrJson[i][key] === 'object') {
        getOneDeepObject(obj, key, arrJson[i][key])
      } else {
        obj[key] = arrJson[i][key]
      }
    }
    arr.push(obj)
  }
  return arr
}

const getOneDeepObject = function(obj, parentKey, jsonObj) {
  for (var subKey in jsonObj) {
    if (jsonObj[subKey] !== null && typeof jsonObj[subKey] === 'object') {
      getOneDeepObject(obj, parentKey + '.' + subKey, jsonObj[subKey])
    } else {
      obj[parentKey + '.' + subKey] = jsonObj[subKey]
    }
  }
}

// 返回上级组件（含有formField对象的组件）
export const getHasFormFieldParentComponent = function(curComp, fieldName) {
  var curFieldName = fieldName || 'formField'
  var parentComp = curComp.$parent
  while (parentComp.$parent && !getObject(parentComp, curFieldName)) {
    parentComp = parentComp.$parent
  }
  return parentComp
}

// 下载文件
export const downloadFile = function(data, fileName, type) {
  const that = this
  // 有可能下载失败，返回{code: '500'},但responseType: 'blob'会把data强制转为blob，导致下载undefined.excel
  // 解决：将已转为blob类型的data转回json格式，判断是否下载成功
  if (!window.FileReader) return
  if (type === 'vue') {
    var blob = new Blob([data], {
      type: type || 'application/vnd.ms-excel'
    })
    // 兼容ie11
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      var url = window.URL.createObjectURL(blob)
      var aLink = document.createElement('a')
      aLink.style.display = 'none'
      aLink.href = url
      aLink.setAttribute('download', fileName)
      document.body.appendChild(aLink)
      aLink.click()
      document.body.removeChild(aLink) // 下载完成移除元素
      window.URL.revokeObjectURL(url) // 释放对象
    }
  }
  const r = new FileReader()
  r.onload = function() {
    // 如果JSON.parse(this.result)不报错，说明this.result是json字符串，是下载报错情况的返回值，弹框提示
    // 如果JSON.parse(this.result)报错，说明下载成功，进入catch
    try {
      const resData = JSON.parse(this.result) // this.result为FileReader获取blob数据转换为json后的数据，即后台返回的原始数据
      if (resData && resData.result === 'x000000002') {
        window.app.$message({
          message: '该账号没有导出的权限，如需导出请管理员下发权限',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return false
    } catch (err) {
      var blob = new Blob([data], {
        type: type || 'application/vnd.ms-excel'
      })
      // 兼容ie11
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        var url = window.URL.createObjectURL(blob)
        var aLink = document.createElement('a')
        aLink.style.display = 'none'
        aLink.href = url
        aLink.setAttribute('download', fileName)
        document.body.appendChild(aLink)
        aLink.click()
        document.body.removeChild(aLink) // 下载完成移除元素
        window.URL.revokeObjectURL(url) // 释放对象
      }
    }
  }
  r.readAsText(data) // FileReader的API
  // var blob = new Blob([data], { type: type || 'application/vnd.ms-excel' })
  // if (window.navigator.msSaveOrOpenBlob) { // IE10
  //   navigator.msSaveBlob(blob, fileName)
  // } else {
  //   var url = window.URL.createObjectURL(blob)
  //   var aLink = document.createElement('a')
  //   aLink.style.display = 'none'
  //   aLink.href = url
  //   aLink.setAttribute('download', fileName)
  //   document.body.appendChild(aLink)
  //   aLink.click()
  //   document.body.removeChild(aLink) // 下载完成移除元素
  //   window.URL.revokeObjectURL(url) // 释放对象
  // }
}

// 获取查询url参数
export const getQueryVariable = function(variable) {
  var query = window.location.search.substring(1)
  if (query === '') {
    const href = window.location.href.split('?')
    if (href.length > 1) {
      query = href[1]
    }
  }
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return ''
}

// url参数转json
export const getQueryObject = function(url, isDecode) {
  try {
    if (url.indexOf('?') === -1) {
      return null
    }
    const cUrl = url.split('?')[1]
    var obj = {}
    var arr = cUrl.split('&')
    for (var i = 0; i < arr.length; i++) {
      var subArr = arr[i].split('=')
      var key = isDecode === true ? decodeURIComponent(subArr[0]) : subArr[0]
      var value = isDecode === true ? decodeURIComponent(subArr[1]) : subArr[1]
      obj[key] = value
    }
    return obj
  } catch (err) {
    return null
  }
}

// json转url参数
export const getUrlVars = function(json) {
  var params = Object.keys(json).map(function(key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
  }).join('&')
  return params
}

// 把文件流转换为二进制
export const getFileBinary = function(file, callBack) {
  var reader = new FileReader()
  reader.readAsArrayBuffer(file)
  reader.onload = function(e) {
    if (typeof callBack === 'function') {
      callBack.call(this, this.result)
    }
  }
}

// 计算在指定秒数后是否已经过期
export const globalCheckIsExp = function(cacheTime, cacheSeconds) {
  var isExp = false
  var now = new Date()
  now.setSeconds(now.getSeconds() - cacheSeconds)
  if (cacheTime !== null && now > cacheTime) {
    isExp = true
  }
  return isExp
}

// 从一个数组里面通过一个字段找某个值，返回对应的另外一个字段
// 例如：从值列表中通过value找到label
export const getOneValFromList = function(itemArray, valueToSearch, fieldToSearch, fieldToReturn) {
  if (itemArray == null || itemArray.length === 0) return ''
  var searchItems = itemArray.filter(item => item[fieldToSearch] === valueToSearch)
  if (searchItems.length > 0) return searchItems[0][fieldToReturn]
  return ''
}

// 设置网格自适应高度（旧方法）
// isPopups:是否弹窗
export const setTableHeightOld = function(that, isResize, defTableHeight) {
  // 查询条件单行高度（页面上查询条件中.el-col的高度）
  const compLineHeight = pxToNumber(Vue.prototype.$variables.queryLineHeight)
  // 面包屑高度（element-ui.scss中.app-breadcrumb.el-breadcrumb设置的高度）
  const breadCrumbHeight = pxToNumber(Vue.prototype.$variables.breadcrumbHeight)
  // margin-top + border
  const marginHeight = 12
  // 弹窗可增加高度
  const popupsHeight = 40

  var tableHeight = defTableHeight || 310
  var appMainHeight = getAppMainHeight(that.$route.path, that, null, true, breadCrumbHeight)
  if (appMainHeight > 0) {
    var curTableHeight = appMainHeight
    // 减去查询区域高度(查询条件和按钮)
    if (that.$refs.searcheHeight) {
      curTableHeight -= that.$refs.searcheHeight.offsetHeight
    }
    // 减去查询查询条件标题区域高度
    if (that.$refs.conTitleHeight) {
      curTableHeight -= that.$refs.conTitleHeight.offsetHeight
    }
    // 减去弹窗网格下部按钮区域高度
    if (that.$refs.conHeight) {
      curTableHeight -= that.$refs.conHeight.offsetHeight
    }
    // 减去查询结果标题区域高度
    if (that.$refs.resultTitleHeight) {
      curTableHeight -= that.$refs.resultTitleHeight.offsetHeight
    }
    // 减去分页区域高度
    if (that.$refs.paginationHeight) {
      if (that.$refs.paginationHeight.offsetHeight) {
        curTableHeight -= that.$refs.paginationHeight.offsetHeight
      } else if (that.$refs.paginationHeight.$el && that.$refs.paginationHeight.$el.offsetHeight) {
        curTableHeight -= that.$refs.paginationHeight.$el.offsetHeight
      }
    }
    // 减去margin-top/bottom值
    if (!that.$utils.isIE() || isResize) {
      tableHeight = curTableHeight - (that.tableMarginHeight || 0) - (that.tableOtherHeight || 0)
    } else {
      // IE浏览器需要减去额外高度
      tableHeight = curTableHeight - (that.tableMarginHeight || 0) - (that.tableOtherHeight || 0) // - 30
    }
    // 处理UE修改后页面自适应问题（如果存在查询组件则减去固定值）
    if (that.$refs.mustCompHeight) {
      const mustComps = that.tableComponents.filter(o => o.isMust === true)
      if (mustComps && mustComps.length > 0) {
        var mustCompHeight = 0
        if (that.$refs.mustCompHeight.offsetHeight) {
          mustCompHeight = that.$refs.mustCompHeight.offsetHeight
        } else if (that.$refs.mustCompHeight.$el && that.$refs.mustCompHeight.$el.offsetHeight) {
          mustCompHeight = that.$refs.mustCompHeight.$el.offsetHeight
        }
        // 没加载时减去固定值
        if (mustCompHeight === 0) {
          // 通过计算组件中的∑span/24得到组件的行数量
          let spans = 0
          mustComps.forEach(function(item) {
            if (that.isPopups === true) {
              spans += (item.span || 8)
            } else {
              spans += (item.span || 6)
            }
          })
          const lineCount = Math.ceil(spans / 24)
          /* 38为查询组件单行高度（如修改样式高度后需要同步修改这里的值） */
          tableHeight = tableHeight - lineCount * compLineHeight
        }
      }
    }
    if (that.isPopups !== true) {
      // 非弹窗减去面包屑 和 面包屑下的margin
      tableHeight = tableHeight - marginHeight
    } else {
      // 弹窗可增加部分高度
      tableHeight += popupsHeight
    }
  }
  return tableHeight
}

// 设置网格自适应高度（通用）
// that:页面对象this
// isResize:是否windows.resize触发
// tableRef:传入需要设置自适应的网格的ref（为空则读取that.tableRef）
// defHz:需要设置自适应网格ref的默认后缀（默认为：.setHeight）
// resetMargin:是否重设弹窗marginTop（弹窗时有效，默认true）
// isClick:是否点击事件触发
export const setTableHeight = function(that, isResize, defTableHeight, tableRef, defHz, resetMargin, isClick) {
  // 查询条件单行高度（页面上查询条件中.el-col的高度）
  const compLineHeight = pxToNumber(Vue.prototype.$variables.queryLineHeight)
  // 区域分隔高度
  const pageAreaHeight = pxToNumber(Vue.prototype.$variables.pageAreaHeight)
  // 面包屑高度（element-ui.scss中.app-breadcrumb.el-breadcrumb设置的高度）
  let breadCrumbHeight = pxToNumber(Vue.prototype.$variables.breadcrumbHeight)
  // margin-top + border
  let marginHeight = 12
  // 网格后缀
  const refHz = defHz || '.setHeight'

  // 网格ref
  let curTableRef = tableRef || that.tableRef
  // 兼容旧方法：使用oneTable模板时，把that.tableRef='multipleTable'也当做that.tableRef='oneTable.setHeight'
  if (that.isOneTable === '1' && that.tableRef === 'multipleTable') {
    curTableRef = 'oneTable' + refHz
  }

  // 兼容旧方法（旧的自适应计算tableRef都为multipleTable）
  // 新方法：tableRef格式：xxxx.setHeight
  if (!curTableRef || curTableRef.indexOf('.') < 0) {
    return setTableHeightOld(that, isResize, defTableHeight)
  }
  let tableHeight = defTableHeight || 0
  // 如果只显示内容页时marginHeight和breadCrumbHeight都不需要
  if (!that.$store.state.settings.showContent) {
    marginHeight = 0
    breadCrumbHeight = 0
  }
  // 组件参考高度
  let appMainHeight = 0
  if (that.isPopups !== true) {
    // 非弹窗：以AppMain作为参考
    appMainHeight = getAppMainHeight(that.$route.path, that, null, true, breadCrumbHeight)
  } else {
    // 弹窗：以body屏幕高度作为参考（弹窗总高度）
    appMainHeight = document.body.clientHeight - 40 // 40:上下边距20
    // 弹窗高度最大设置为600
    if (appMainHeight > 600) {
      appMainHeight = 600
    }
  }
  // 弹窗其余高度（弹窗高度-网格高度-tableOtherHeight）
  if (appMainHeight > 0) {
    let curTableHeight = appMainHeight
    // 异步组件行高
    let compTotalLineHeight = 0
    // 取出网格ref前缀
    const refQz = curTableRef.replace(refHz, '')
    for (const ref in that.$refs) {
      // 存在需要减的dom，格式：refQz的值.setHeight
      if (ref.indexOf(refQz + '.must.') > -1) {
        // 条件高度计算（由于查询条件为动态加载，在计算高度时还没进行渲染完，所以需要额外进行计算）
        // ref格式：refQz的值.must.tableComponents，tableComponents为对应查询条件配置的对象
        const componentObjName = ref.replace(refQz + '.must.', '')
        if (that[componentObjName] && that[componentObjName].length > 0) {
          let mustComps = []
          // 是否使用折叠查询条件判断
          if (that.isUseHideComp && that.isUseHideComp === true && (that.curToggleParam === false || isClick === true)) {
            mustComps = that[componentObjName].filter(o => o.isMust === true && o.isShow !== false)
          } else {
            if (isIE()) {
              mustComps = that[componentObjName].filter(o => o.isMust === true && o.isShow !== false)
            } else {
              mustComps = that[componentObjName]
            }
            that.curToggleParam = false
          }
          if (mustComps && mustComps.length > 0) {
            let mustCompHeight = 0
            let pageAreaCount = 0
            let mustRefs = that.$refs[ref]
            if (mustRefs) {
              if (mustRefs.constructor === Array) {
                // 对象数组
                if (that.$refs[ref].length > 0) {
                  mustRefs = that.$refs[ref][0]
                }
              }
              if (mustRefs.offsetHeight) {
                mustCompHeight = mustRefs.offsetHeight
              } else if (mustRefs.$el && mustRefs.$el.offsetHeight) {
                mustCompHeight = mustRefs.$el.offsetHeight
              }

              // 判断页面区域
              const pageAreas = getPageArea(that, componentObjName)
              if (pageAreas && pageAreas.length > 0 && pageAreas[0] !== '' && pageAreas[0].noShowArea !== true) {
                if (pageAreaHeight - mustCompHeight <= 5) {
                  pageAreaCount = pageAreas.length
                }
              }
            }
            // 0：没渲染完，则减去固定值
            if (mustCompHeight === 0 || pageAreaCount > 0) {
              // 通过计算组件中的∑span/24得到组件的行数量
              let spans = 0
              mustComps.forEach(function(item) {
                if (that.isPopups === true) {
                  // 弹窗默认span为8
                  spans += (item.span || 8)
                } else {
                  spans += (item.span || 6)
                }
              })
              const lineCount = Math.ceil(spans / 24)
              /* 38为查询组件单行高度（如修改样式高度后需要同步修改这里的值） */
              curTableHeight -= lineCount * compLineHeight - mustCompHeight * pageAreaCount
              compTotalLineHeight += lineCount * compLineHeight - mustCompHeight * pageAreaCount
            }
          }
        }
      } else {
        // 其它高度计算
        if (ref.indexOf(refQz + '.') > -1 && ref !== curTableRef) {
          if (that.$refs[ref] && that.$refs[ref].offsetHeight) {
            curTableHeight -= that.$refs[ref].offsetHeight
          } else if (that.$refs[ref] && that.$refs[ref].$el && that.$refs[ref].$el.offsetHeight) {
            curTableHeight -= that.$refs[ref].$el.offsetHeight
          }
        }
      }
    }

    // 减去预设数值
    curTableHeight = curTableHeight - (that.tableOtherHeight || 0)
    if (that.isPopups !== true) {
      // 非弹窗减去间隔高度
      curTableHeight = curTableHeight - (that.tableMarginHeight || 0) - marginHeight
    } else {
      // 弹窗头高度
      let dialogObj = that.$parent
      if (!dialogObj.$el.querySelector('.el-dialog') || !dialogObj.$el.querySelector('.el-dialog .el-dialog__header') || !dialogObj.$el.querySelector('.el-dialog .el-dialog__header').clientHeight) {
        while (!dialogObj.$el || !dialogObj.$el.querySelector('.el-dialog .el-dialog__header') || !dialogObj.$el.querySelector('.el-dialog .el-dialog__header').offsetHeight) {
          dialogObj = dialogObj.$parent
          if (!dialogObj) {
            break
          }
        }
        // 兼容tab切换
        // dialogObj = that.$parent.$parent.$parent
        if (dialogObj && dialogObj.$el && dialogObj.$el.querySelector('.el-dialog .el-tabs__header') && dialogObj.$el.querySelector('.el-dialog .el-tabs__header').offsetHeight) {
          curTableHeight -= dialogObj.$el.querySelector('.el-dialog .el-tabs__header').offsetHeight
        }
      }
      if (dialogObj && dialogObj.$el.querySelector('.el-dialog') && dialogObj.$el.querySelector('.el-dialog .el-dialog__header').clientHeight) {
        const dialogHeaderHeight = dialogObj.$el.querySelector('.el-dialog .el-dialog__header').clientHeight
        curTableHeight -= dialogHeaderHeight

        if (resetMargin !== false) {
          // 弹窗时重新定位弹窗位置（居中）
          Vue.nextTick(() => {
            var bodyHight = document.body.clientHeight
            // var menuHight = document.querySelector('#menu-navbar')
            // if (document.querySelector('.isHorShowItemList') !== null) {
            //   bodyHight = bodyHight - menuHight
            // }
            if (that.tableCols && that.tableCols.length > 0) {
              // 弹窗marginTop = (窗口高度 - 弹窗高度) / 2
              dialogObj.$el.querySelector('.el-dialog').style.marginTop = ((bodyHight - appMainHeight) / 2) + 'px'
              dialogObj.$el.querySelector('.el-dialog').dataset.totoHeight = appMainHeight
            } else {
              // 弹窗marginTop = (窗口高度 - 当前弹窗高度 - 动态组件总行高) / 2
              const curDialogHeight = dialogObj.$el.querySelector('.el-dialog').offsetHeight
              dialogObj.$el.querySelector('.el-dialog').style.marginTop = ((bodyHight - curDialogHeight - compTotalLineHeight) / 2) + 'px'
              dialogObj.$el.querySelector('.el-dialog').dataset.totoHeight = curDialogHeight + compTotalLineHeight
            }
          })
        }
      }
    }

    tableHeight = curTableHeight
  }
  return tableHeight
}

// 设置监听组件
// isDialog:是否对话框内容（预留）
// fieldName:表单对象名称（默认为：formField）
// isForm:是否表单（非网格）
// compObjName:组件列表对象名称（默认为：tableComponents）
// mixObjRefName:模板对象ref名称（默认为：multipleTable）
// 监听parentFileds字段格式（type=show或value，show：监听组件显示，value：监听组件值，空：同value，copy：复制(同步)组件值）
// 如：
// 监听组件值传递：value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2
// 监听组件显示：show:监听字段(父组件formField的对应字段)-显示组件值1|显示组件值2-隐藏组件值
// 复制(同步)组件值：copy:监听字段
// 组件赋值,如copy:userName
// 监听组件值传递：disabled:监听字段（监听空值）-需要对tableComponents中进行设置disabled的codeField-类型（监听字段为空时赋值给disabled值类型（true/false），默认空表示true）
// 注意：必须设置disabled，如：disabled=null, parentFileds="disabled:carConfigCode-carBrandCode-true，这样配置后，当carConfigCode不为空时carBrandCode对应组件则置为不可编辑"
// 表达式计算（四则运算）：calculate:计算表达式（一般为父组件中formField对象中的字段进行四则运算，如: price1+price2*rate1）
// 同时使用value、show、copy、disabled、calculate需要用“,”隔开
export const watchComp = function(that, isDialog, fieldName, isForm, compObjName, mixObjRefName) {
  const strFieldName = fieldName || 'formField'
  const curCompObjName = compObjName || 'tableComponents'
  const curMixObjRefName = mixObjRefName || 'multipleTable'
  const curFormFieldObj = getObject(that, strFieldName)
  const curCompObj = getObject(that, curCompObjName)
  if (curCompObj && ((isForm === true && that.$refs) || (isForm !== true && that.$refs[curMixObjRefName]))) {
    const chainCompList = curCompObj.filter(o => o.parentFileds != null && o.parentFileds !== '')
    if (chainCompList.length > 0) {
      chainCompList.forEach(comp => {
        // 分割show/value
        const arrFields = comp.parentFileds.split(',')
        for (let i = 0; i < arrFields.length; i++) {
          if (arrFields[i].indexOf(':') < 0) {
            arrFields[i] = 'value:' + arrFields[i]
          }
          const parentFields = arrFields[i].split(':')[1]
          if (arrFields[i].indexOf('value:') > -1) {
            // 监听组件值控制
            const pArr = parentFields.split('|')
            for (const pStr in pArr) {
              const pDic = pArr[pStr].split('-')
              if (pDic.length === 1) pDic.push(pDic[0])
              if (!curFormFieldObj.hasOwnProperty(pDic[1])) continue
              that.$watch(strFieldName + '.' + pDic[1], function() { // 监控组件依赖的值
                if (isForm === true) {
                  if (that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey]) {
                  // 表单只要获取当前页面即可
                    that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setQueryFields(curFormFieldObj, strFieldName, null, that)
                  }
                } else {
                  // 非表单需要读取（oneTable模板）的下层组件或(mix-form模板)的下层组件
                  that.$refs[curMixObjRefName].$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setQueryFields(curFormFieldObj, strFieldName, null, that, curMixObjRefName)
                }
              })
            }
          } else if (arrFields[i].indexOf('show:') > -1) {
            // 监听组件显示控制
            const pDic = parentFields.split('-')
            if (!curFormFieldObj.hasOwnProperty(pDic[0])) continue
            if (pDic.length !== 3) {
              const pArr = pDic[1].split('|')
              that.$watch(strFieldName + '.' + pDic[0], function() { // 监控组件依赖的值
                let isShow = false
                for (var k in pArr) {
                  if (curFormFieldObj[pDic[0]] === pArr[k]) {
                    isShow = true
                    break
                  }
                }

                if (isForm === true) {
                  // 表单只要获取当前页面即可
                  that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setIsShow(isShow)
                } else {
                  // 非表单需要读取（oneTable模板）的下层组件或(mix-form模板)的下层组件
                  that.$refs[curMixObjRefName].$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setIsShow(isShow)
                }
              })
            } else {
              that.$watch(strFieldName + '.' + pDic[0], function() { // 监控组件依赖的值
                let isShow = true
                if (curFormFieldObj[pDic[0]] === pDic[2]) {
                  isShow = false
                }
                if (isForm === true) {
                  // 表单只要获取当前页面即可
                  that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setIsShow(isShow)
                } else {
                  // 非表单需要读取（oneTable模板）的下层组件或(mix-form模板)的下层组件
                  that.$refs[curMixObjRefName].$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setIsShow(isShow)
                }
              })
            }
          } else if (arrFields[i].indexOf('copy:') > -1) {
            // 复制(同步)组件值
            if (!curFormFieldObj.hasOwnProperty(parentFields)) continue
            that.$watch(strFieldName + '.' + parentFields, function() {
              if (isForm === true) {
                // 表单只要获取当前页面即可
                that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setCopy(curFormFieldObj[parentFields])
              } else {
                // 非表单需要读取（oneTable模板）的下层组件或(mix-form模板)的下层组件
                that.$refs[curMixObjRefName].$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setCopy(curFormFieldObj[parentFields])
              }
            })
          } else if (arrFields[i].indexOf('disabled:') > -1) {
            // 设置不可编辑
            const pArr = parentFields.split('|')
            for (const pStr in pArr) {
              const pDic = pArr[pStr].split('-')
              that.$watch(strFieldName + '.' + pDic[0], function() { // 监控组件依赖的值
                setDisable(that, curCompObjName, null, strFieldName)
              })
            }
          } else if (arrFields[i].indexOf('calculate:') > -1) {
            // 表达式计算（四则运算）
            let expression = replaceAll(parentFields, '[\(\) ]', '')
            expression = replaceAll(expression, '[\+\*\-\/]', '|')
            const pArr = expression.split('|')
            for (const indexArr in pArr) {
              if (!curFormFieldObj.hasOwnProperty(pArr[indexArr])) continue
              that.$watch(strFieldName + '.' + pArr[indexArr], function() { // 监控组件依赖的值
                // 计算表达式
                let value = 0
                let replaceExpression = parentFields
                pArr.forEach(item => {
                  let tmpValue
                  if (/^-?[0-9\.]+$/.test(item)) {
                    tmpValue = item
                  } else if (curFormFieldObj[item] === '' || isNaN(curFormFieldObj[item])) {
                    tmpValue = '0'
                  } else {
                    if (typeof curFormFieldObj[item] === 'number') {
                      tmpValue = curFormFieldObj[item].toString()
                    } else {
                      tmpValue = curFormFieldObj[item]
                    }
                  }
                  replaceExpression = replaceAll(replaceExpression, item, tmpValue)
                })
                try {
                  value = eval('(' + replaceExpression + ')')
                } catch {
                  value = 0
                }
                if (isForm === true) {
                  // 表单只要获取当前页面即可
                  that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setCalculateValue(curFormFieldObj, value)
                } else {
                  // 非表单需要读取（oneTable模板）的下层组件或(mix-form模板)的下层组件
                  that.$refs[curMixObjRefName].$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setCalculateValue(curFormFieldObj, value)
                }
              })
            }
          }
        }
      })
    }
  }
}

// 设置常量值
// 设置对象值：set:监听字段-常量值
export const setConstValue = function(that, compObjName, cb) {
  const curCompObjName = compObjName || 'tableComponents'
  const curCompObj = getObject(that, curCompObjName)
  let succ = true
  if (curCompObj) {
    const chainCompList = curCompObj.filter(o => o.parentFileds != null && o.parentFileds !== '')
    if (chainCompList.length > 0) {
      chainCompList.forEach(comp => {
        // 分割show/value
        const arrFields = comp.parentFileds.split(',')
        for (let i = 0; i < arrFields.length; i++) {
          if (arrFields[i].indexOf('set:') > -1) {
            const parentFields = arrFields[i].split(':')[1]
            // 设置对象值（常量值）
            const pArr = parentFields.split('|')
            for (const pStr in pArr) {
              const pDic = pArr[pStr].split('-')
              if (pDic.length < 1) continue
              // pDic[0]:组件中的字段名
              if (that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey]) {
                that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setConstValue(pDic[0], pDic[1])
              } else {
                succ = false
              }
            }
          }
        }
      })
    }
  }
  if (typeof cb === 'function') {
    cb.call(that, succ)
  }
}

// 设置组件不可编辑
// compObjName:需要赋值的对象名称
// isExecOther:是否执行otherSetDisable方法
// formObjName:监听对象（监听字段所在对象）名称
// chainCompList:组件列表对象（优先）
// 读取parentFileds属性配置中的disabled
// 监听parentFileds字段格式（disabled：设置组件不可编辑）：
// 如：
// 设置组件不可编辑：disabled:监听字段（监听空值）-需要对tableComponents中进行设置disabled的codeField-值-类型（监听字段为空时赋值给disabled值类型（true/false），默认空表示true）
// 注意：必须设置disabled，
// 如：disabled=null, parentFileds="disabled:carConfigCode-carBrandCode--true，这样配置后，当carConfigCode不为空时carBrandCode对应组件则置为不可编辑"
//     disabled=null, parentFileds="disabled:carConfigCode-carBrandCode-1-true，这样配置后，当carConfigCode不为1时carBrandCode对应组件则置为不可编辑"
//     其中“值”可以有多个，用“/"隔开，如：1/2/3
//     不需要组件联动，一直保持就用直接填 disabled:true
export const setDisable = function(that, compObjName, isExecOther, formObjName, chainCompList) {
  var tmpCompObjName = compObjName || 'tableComponents'
  var tmpFormField = formObjName || 'formField'
  const compObj = getObject(that, tmpCompObjName)
  const formFieldObj = getObject(that, tmpFormField)
  if (!formFieldObj) return
  if (compObj && that.$refs) {
    let curChainCompList = chainCompList
    if (!curChainCompList) {
      curChainCompList = compObj.filter(o => o.parentFileds != null && o.parentFileds !== '' && o.disabled !== undefined)
    }
    if (curChainCompList.length > 0) {
      curChainCompList.forEach(comp => {
        const arrFields = comp.parentFileds.split(',')
        for (let i = 0; i < arrFields.length; i++) {
          if (arrFields[i].indexOf('disabled:') > -1) {
            const parentFields = arrFields[i].split(':')[1]
            if (parentFields === 'true') {
              comp.disabled = true
              continue
            }
            // 设置不可编辑
            if (parentFields.length > 0) {
              const pDic = parentFields.split('-')
              if (!formFieldObj.hasOwnProperty(pDic[0])) continue
              if (pDic.length < 2) {
                pDic.push(pDic[0])
                pDic.push('')
                pDic.push('true')
              }
              if (pDic.length < 3) {
                pDic.push('')
                pDic.push('true')
              }
              if (pDic.length < 4) {
                const pDic3 = pDic[2]
                pDic[2] = ''
                pDic.push(pDic3)
              }
              let disabled
              if (pDic[3] === 'false') {
                disabled = true
              } else {
                disabled = false
              }
              // “/”表示多个值隔开
              const arrVal = pDic[2].split('/')
              if (formFieldObj[pDic[0]] !== undefined && (arrVal.indexOf(formFieldObj[pDic[0]]) < 0)) {
                disabled = !disabled
              }
              pDic[1] = pDic[1].replace('，', ',')
              if (comp.codeField === pDic[1]) {
                comp.disabled = disabled
              }
            }
          }
        }
      })
    }
  }
  if (isExecOther !== false && that.otherSetDisable) {
    that.otherSetDisable(that, compObjName)
  }
}

// 设置是否隐藏
export const setIsShow = function(that, compObjName, isExecOther, formObjName, chainCompList) {
  var tmpCompObjName = compObjName || 'tableComponents'
  var tmpFormField = formObjName || 'formField'
  const compObj = getObject(that, tmpCompObjName)
  const formFieldObj = getObject(that, tmpFormField)
  if (!formFieldObj) return
  if (compObj && that.$refs) {
    let curChainCompList = chainCompList
    if (!curChainCompList) {
      curChainCompList = compObj.filter(o => o.parentFileds != null && o.parentFileds !== '' && o.isShow !== undefined)
    }
    if (curChainCompList.length > 0) {
      curChainCompList.forEach(comp => {
        const arrFields = comp.parentFileds.split(',')
        for (let i = 0; i < arrFields.length; i++) {
          if (arrFields[i].indexOf('show:') > -1) {
            const parentFields = arrFields[i].split(':')[1]
            if (parentFields.length > 0) {
              var pDic = parentFields.split('-')
              if (!formFieldObj.hasOwnProperty(pDic[0])) continue
              if (pDic.length === 2) {
                if (formFieldObj[pDic[0]] === pDic[1]) {
                  comp.isShow = true
                } else {
                  comp.isShow = false
                }
              }
              if (pDic.length === 3) {
                if (formFieldObj[pDic[0]] === pDic[2]) {
                  comp.isShow = false
                } else {
                  comp.isShow = true
                }
              }
            }
          }
        }
      })
    }
  }
}
// 设置组件不可编辑（用于设置弹窗中查询组件需要根据父组件传值控制不可编辑的场景）
// parentFileds:参考watchComp()方法
// chainCompList:需要置为不可编辑组件列表对象
// formObjName:当前视图中的formField对象名称
export const setDisableByComp = function(that, parentFileds, chainCompList, formObjName) {
  const curFormObjName = formObjName || 'formField'
  const formFieldObj = getObject(that, curFormObjName)
  var tmpParentFileds = parentFileds || that.parentFileds
  if (!tmpParentFileds) return
  const arrFields = tmpParentFileds.split(',')
  for (let i = 0; i < arrFields.length; i++) {
    if (arrFields[i].indexOf(':') < 0) {
      arrFields[i] = 'value:' + arrFields[i]
    }
    const arrParentFields = arrFields[i].split(':')
    // 只有赋值的联动生效
    if (arrParentFields[0] === '' || arrParentFields[0] === 'value') {
      const curParentFields = arrParentFields[1]
      // 设置不可编辑
      if (curParentFields.length > 0) {
        // 多个以“|”隔开
        const arrDic = curParentFields.split('|')
        for (let j = 0; j < arrDic.length; j++) {
          // 字段名称对照以“-”隔开，pDic[0]:本组件codeField字段名称, pDic[1]:父组件字段名称
          const pDic = arrDic[j].split('-')
          if (pDic.length < 2) {
            pDic.push(pDic[0])
          }
          // pDic[0]:本组件codeField字段名称
          let codeFieldValue = ''
          if (formFieldObj && formFieldObj[pDic[0]] && formFieldObj[pDic[0]] !== '') {
            codeFieldValue = formFieldObj[pDic[0]]
          }
          const comps = chainCompList.filter(o => o.codeField === pDic[0])
          if (comps.length > 0) {
            comps.forEach((item, i) => {
              if (codeFieldValue !== '') {
                item.disabled = true
              } else {
                item.disabled = false
              }
            })
          }
        }
      }
    }
  }
}

// 设置组件查询字段
export const setQueryFields = function(that, obj, dataObjName, cb, formObjName) {
  if (that.parentFileds == null || that.parentFileds === '') return false
  const formName = formObjName || 'formField'
  const compObj = getObject(that, dataObjName)
  var parent = that.$utils.getHasFormFieldParentComponent(that, formName)
  const parentFormFieldObj = getObject(parent, formName)
  if (!parent || !parentFormFieldObj) return false
  var isSet = false
  var arrFields = that.parentFileds.split(',')
  var tmpFields
  for (let i = 0; i < arrFields.length; i++) {
    if (arrFields[i].indexOf(':') < 0) {
      tmpFields = arrFields[i]
      break
    }
    if (arrFields[i].split(':')[0] === 'value') {
      tmpFields = arrFields[i].split(':')[1]
      break
    }
  }
  if (tmpFields) {
    var pArr = tmpFields.split('|')
    for (var pStr in pArr) {
      var pDic = pArr[pStr].split('-')
      if (pDic.length === 1) pDic.push(pDic[0])
      if (compObj.hasOwnProperty(pDic[0]) && parentFormFieldObj.hasOwnProperty(pDic[1])) {
        compObj[pDic[0]] = obj !== null && obj !== undefined ? obj[pDic[1]] : parentFormFieldObj[pDic[1]]
        isSet = true
      }
    }
  }
  if (isSet) {
    if (typeof cb === 'function') {
      cb.call()
    }
    return true
  }
  return false
}

// 设置网格中组件查询字段
// value:赋值联动
// show:显示联动，show：监听值-显示值1|显示值2 或 show：监听值--隐藏值1|隐藏值2
// disabled:监听字段-指定值-true,当监听字段为指定值时，禁用状态为true
export const setRowQueryFields = function(that, dataObjName) {
  const curDataObjName = dataObjName || 'listQuery'
  const listQueryObj = getObject(that, curDataObjName)
  if (that.rowFileds != null && that.rowFileds !== '' && that.curTableRow != null && that[curDataObjName] !== undefined && that[curDataObjName] !== null) {
    let isSet = false
    var arrFields = that.rowFileds.split(',')
    const arrayData = []
    for (const g of arrFields) {
      if (g.indexOf('|') > -1 && g.indexOf('disabled:') > -1) {
        const data = g.split('|')
        arrayData.push(...data)
      } else {
        arrayData.push(g)
      }
    }
    arrFields = arrayData
    var isdisabled = false
    for (let i = 0; i < arrFields.length; i++) {
      if (arrFields[i].indexOf(':') < 0) {
        arrFields[i] = 'value:' + arrFields[i]
      }
      const rowFields = arrFields[i].split(':')[1]
      if (arrFields[i].indexOf('value:') > -1) {
        // 赋值联动
        const pArr = rowFields.split('|')
        for (const pStr in pArr) {
          const pDic = pArr[pStr].split('-')
          if (pDic.length === 1) pDic.push(pDic[0])
          if (listQueryObj.hasOwnProperty(pDic[0]) && that.curTableRow.hasOwnProperty(pDic[1])) {
            listQueryObj[pDic[0]] = that.curTableRow[pDic[1]]
            isSet = true
          }
        }
      } else if (arrFields[i].indexOf('show:') > -1) {
        // 显示联动
        const pDic = rowFields.split('-')
        let isShow = false
        if (pDic.length > 1 && pDic[1] !== '') {
          const pArr = pDic[1].split('|')
          for (const k in pArr) {
            if (pArr[k] === 'null') pArr[k] = null
            if (that.curTableRow[pDic[0]] !== undefined && pArr[k] === that.curTableRow[pDic[0]]) {
              isShow = true
              break
            }
          }
        }
        if (pDic.length > 2 && pDic[2] !== '') {
          const pArr = pDic[2].split('|')
          isShow = true
          for (const k in pArr) {
            if (pArr[k] === 'null') pArr[k] = null
            if (that.curTableRow[pDic[0]] !== undefined && pArr[k] === that.curTableRow[pDic[0]]) {
              isShow = false
              break
            }
          }
        }
        // 当两个条件都符合，取第一个
        if (pDic.length > 2 && pDic[1] === '' && pDic[2] === '') {
          const pArr = pDic[1].split('|')
          for (const k in pArr) {
            if (pArr[k] === 'null') pArr[k] = null
            if (that.curTableRow[pDic[0]] !== undefined && pArr[k] === that.curTableRow[pDic[0]]) {
              isShow = true
              break
            }
          }
        }
        that.setIsShow(isShow)
      } else if (arrFields[i].indexOf('disabled:') > -1) {
        const pDic = rowFields.split('-')
        if (pDic[1] === 'notNull') {
          if (that.curTableRow[pDic[0]] != null) {
            pDic[1] = that.curTableRow[pDic[0]]
          }
        }
        if (pDic.length === 2) pDic.push('true')
        if (that.curTableRow[pDic[0]] === pDic[1]) {
          if (pDic[2] === 'true') {
            that.curDisabled = true
            isdisabled = true
          } else {
            that.curDisabled = false
            isdisabled = false
          }
        } else {
          if (isdisabled !== true) {
            that.curDisabled = false
            isdisabled = false
          }
        }
      } else if (arrFields[i].indexOf('showcomp:') > -1) {
        if (that.showComp) {
          var pDic = rowFields.split('-')
          if (pDic.length === 2) pDic.push('true')
          if (that.curTableRow[pDic[0]] === pDic[1]) {
            if (pDic[2] === 'true') {
              that.showComp(true)
            } else {
              that.showComp(false)
            }
          } else {
            if (pDic[2] === 'true') {
              that.showComp(false)
            } else {
              that.showComp(true)
            }
          }
        }
      }
    }
    if (isSet === true && that.curPopupsKey) {
      that.curPopupsKey = that.codeField + that.$utils.generateId()
    }
  }
}

// 获取对象（objName包含层级调用，即包含“.”的情况下，需要分步返回对象）
export const getObject = function(that, objName) {
  if (!that || !objName) return undefined
  if (objName && objName.indexOf('.') > -1) {
    const arr = objName.split('.')
    let obj = that
    for (let i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
        return null
      } else {
        obj = obj[arr[i]]
      }
    }
    return obj
  } else {
    return that[objName]
  }
}

// rule模式校验
export const validateForm = function(rule, value, callback) {
  var lableName = rule.label // 校验项名字
  var validName = rule.validrule // 校验规则类型
  // 判断是否必填
  if (rule.required) {
    if (!value) {
      return callback(new Error(lableName + '不可以为空'))
    }
  }
  // 自定义正则
  if (validName.isformat !== undefined) {
    const reg = validName.isformat
    if (typeof reg === 'string') {
      reg = eval(reg)
    }
    if (!reg.test(value)) {
      callback(new Error('请输入正确的' + lableName + '格式'))
    }
  }
  // 最小长度
  if (validName.minlength !== undefined) {
    if (value.length < rule.minlength && value !== '') {
      callback(new Error(lableName + '不能少于' + validName.minlength + '个字'))
    }
  }
  // 最大长度
  if (validName.maxlength !== undefined) {
    if (value.length > rule.maxlength && value !== '') {
      callback(new Error(lableName + '不能大于' + validName.maxlength + '个字'))
    }
  }
  // 最大值
  if (validName.max !== undefined) {
    if (Number(value) && Number(value) > validName.max && value !== '') {
      callback(new Error(lableName + '不能超过' + validName.max))
    }
  }
  // 最小值
  if (validName.min !== undefined) {
    if (Number(value) && Number(value) < validName.min && value !== '') {
      callback(new Error(lableName + '不能低于' + validName.min))
    }
  }
  // 最大时间
  if (validName.maxtime !== undefined && value !== '') {
    value = value.replace('-', '/') // 替换字符，变成标准格式
    value = new Date(Date.parse(value))
    if (validName.maxtime > value) {
      callback(new Error(lableName + '不能大于' + validName.maxtime))
    }
  }
  // 最小时间
  if (validName.mintime !== undefined && value !== '') {
    value = value.replace('-', '/') // 替换字符，变成标准格式
    value = new Date(Date.parse(value))
    if (validName.mintime < value) {
      callback(new Error(lableName + '不能少于' + validName.mintime))
    }
  }
  // 汉字
  if (validName.isword) {
    if (value.charCodeAt() <= 128 && value.charCodeAt() > 0 || value === '') {
      callback(new Error('请输入汉字'))
    }
  }
  // 正整数
  if (validName.isInteger) {
    if (!Number(value)) {
      callback(new Error('请输入正整数'))
    } else {
      const re = /c|(^[0-9]+$)/
      const rsCheck = re.test(value)
      if (!rsCheck) {
        callback(new Error('请输入正整数'))
      }
    }
  }
  // 手机号
  if (validName.isPhone) {
    // const pattern = /^1[34578]\d{9}$/
    const pattern = /^[1](([3][0-9])|([4][1,4-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}/
    if (!pattern.test(value)) {
      return callback(new Error('请输入正确的' + lableName))
    }
  }
  // 组织机构代码
  if (validName.isCredNo) {
    // const pattern = /^1[34578]\d{9}$/
    const pattern = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/
    if (!pattern.test(value)) {
      return callback(new Error('请输入正确的' + lableName))
    }
  }
  // 电话号码
  if (validName.isTel) {
    const pattern = /^([0-9]{3,4}-)?[0-9]{7,8}$/
    if (!pattern.test(value)) {
      return callback(new Error(`请输入正确的${lableName},如：027-1234567或1234567`))
    }
  }
  // 邮箱
  if (validName.isEmail) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!reg.test(value.trim())) {
      callback(new Error('请输入正确邮箱地址'))
    }
  }
  // 身份证
  if (validName.iscP) {
    var iscP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!iscP.test(value)) {
      return callback(new Error('请输入正确的' + lableName))
    }
  }
  // 车牌号
  if (validName.iscPattern) {
    var iscPattern = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    if (!iscPattern.test(value)) {
      return callback(new Error('请输入正确的' + lableName))
    }
  }
}
//  模板模式校验
export const validataMoth = function(pageItem, pageType, template, tableRef, index) {
  // pageItem当前组件 pageType场景 template模板名称（模板页面reft名称） index(网格组件保存)
  var vPage = {}
  var vaildVueComponent = []
  const curTableRef = tableRef || 'multipleTable'
  // validpopup弹窗校验  validpage当前页面校验  other混入单组件
  switch (pageType) {
    case 'validpopup':
      vPage = pageItem.$refs
      break // 混入弹窗组件数据保存
    case 'validpage':
      vPage = pageItem.$refs[curTableRef].$refs
      break // 混入网格查询数据保存
    case 'crmpage':
      vPage = pageItem.$refs[curTableRef].$refs ? pageItem.$refs[curTableRef].$refs : pageItem.$refs[curTableRef]
      break // crm表单
  }
  // 模板内是否显示提示图标
  var resuleTotle = []
  if (pageType === 'crmpage' && vPage.length) { // crm表单转换数据格式
    var crmobj = {}
    for (var i = 0; i < vPage.length; i++) {
      Object.assign(crmobj, vPage[i].$refs)
    }
    vPage = crmobj
  }
  if (pageType === 'validpopup' || pageType === 'validpage' || pageType === 'crmpage') {
    pageItem.validateValue = []
    for (var a in vPage) {
      // 多网格模板
      if (template) {
        if ((a.indexOf(template + 'true')) === 0) {
          if (vPage[a][0].curIsShow !== undefined) {
            if (vPage[a][0].curIsShow) {
              vaildVueComponent.push(vPage[a][0].$children[0].$children)
            }
          } else {
            vaildVueComponent.push(vPage[a][0].$children[0].$children)
          }
        }
      } else {
        // 零网格与单网格模板
        if (a.slice(0, 4) === 'true' && index === undefined) {
          if (vPage[a].length === 0) {
            continue
          }
          if (vPage[a][0] === undefined) {
            if (vPage[a][0].curIsShow !== undefined) {
              if (vPage[a][0].curIsShow) {
                vaildVueComponent.push(vPage[a].$children)
              }
            } else {
              vaildVueComponent.push(vPage[a].$children)
            }
          } else {
            if (vPage[a][0].curIsShow !== undefined) {
              if (vPage[a][0].curIsShow) {
                vaildVueComponent.push(vPage[a][0].$children[0].$children)
              }
            } else {
              vaildVueComponent.push(vPage[a][0].$children[0].$children)
            }
          }
        } else if (a.slice(0, 12) === 'tableComtrue' && index !== undefined) {
          if (vPage[a].length !== 0) {
            for (var o in vPage[a]) {
              if (vPage[a][o].curIsShow !== undefined) {
                if (vPage[a][o].curIsShow) {
                  vaildVueComponent.push(vPage[a][o].$children[0].$children)
                }
              } else {
                vaildVueComponent.push(vPage[a][o].$children[0].$children)
              }
            }
          }
        } else if (pageType === 'crmpage' && vPage[a][0] && vPage[a][0].isRequire && index === undefined) { // crm表单类型
          if (vPage[a][0] === undefined) {
            if (vPage[a][0].curIsShow !== undefined) {
              if (vPage[a][0].curIsShow) {
                vaildVueComponent.push(vPage[a].$children)
              }
            } else {
              vaildVueComponent.push(vPage[a].$children)
            }
          } else {
            if (vPage[a][0].curIsShow !== undefined) {
              if (vPage[a][0].curIsShow) {
                vaildVueComponent.push(vPage[a][0].$children[0].$children)
              }
            } else {
              vaildVueComponent.push(vPage[a][0].$children[0].$children)
            }
          }
        }
      }
    }

    // 判断是否有值
    var validIcon = []
    for (var p = 0; p < vaildVueComponent.length; p++) {
      for (var x in vaildVueComponent[p]) {
        // validateValue 输入/弹窗/下拉组件框集  ；validIcon 校验组件集
        if (vaildVueComponent[p][x].$refs.validateFormate) {
          // 读取控件（分两种情况：同步引入组件 与 异步引入组件）
          if (vaildVueComponent[p][x - 1].$el.nodeName === 'LABEL' || (index !== undefined && vaildVueComponent[p][x - 1].$el.nodeName === '#comment')) {
            // 同步引入组件
            pageItem.validateValue.push(vaildVueComponent[p][x - 2])
          } else {
            // 异步引入组件
            pageItem.validateValue.push(vaildVueComponent[p][x - 1])
          }
          validIcon.push(vaildVueComponent[p][x])
        }
      }
    }
    var notime = 0
    for (var n in pageItem.validateValue) {
      if (pageItem.validateValue[n].$el.classList[0] == 'doubleDate')pageItem.validateValue[n].value = pageItem.validateValue[n].$children[0].$children[0].$children[0].value// 兼容andt双日期校验
      this.validataRules(validIcon[n], pageItem.validateValue[n].value, pageItem.validateValue[n], pageItem)
      for (var k = 0; k < validIcon.length; k++) {
        if (validIcon[k].iconV === '1') {
          if (notime === 0) {
            if (pageItem.validateValue[k].focused !== undefined) {
              if (pageItem.validateValue[k].suffixIcon !== 'el-icon-search' && pageItem.validateValue[k].suffixIcon !== 'el-icon-menu') {
                if (pageItem.validateValue[k].focus) {
                  notime = notime + 1
                  pageItem.validateValue[k].focused = true
                  pageItem.validateValue[k].focus()
                }
              }
            } else {
              if (pageItem.validateValue[k].focus) {
                notime = notime + 1
                pageItem.validateValue[k].focus()
              }
            }
          }
        }
      }
      resuleTotle.push(validIcon[n].iconV)
    }
  } else {
    // 组件内是否显示提示图标
    if (pageItem.$children && pageItem.$children.length > 0 && pageItem.$children[0].$children.length > 2) {
      var vailFormate = pageItem.$children[0].$children[2]
      this.validataRules(vailFormate, pageItem.modelCode, pageItem, pageItem)
      resuleTotle.push(vailFormate.iconV)
    }
  }

  if (!resuleTotle.includes('1')) {
    pageItem.valid = true
  } else {
    pageItem.valid = false
  }
}
// 生成GUID
export const guid = function() {
  var s = []
  var hexDigits = '0123456789abcdef'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var guid = s.join('')
  return guid
}
// 自定义校验规则
export const validataRules = function(valRule, value, com, pageItem) {
  var t = valRule.curLabelName
  var v = valRule.validrule
  var i = valRule.iconV
  var m = valRule.validataMessage
  if (v !== undefined) {
    if (v.noRequire && v.noRequire !== undefined && ((!value && value !== 0) || (value instanceof Array && value.length === 0))) {
      i = ''
      if (v.resectMessage !== undefined && v.resectMessage.noRequire !== undefined) {
        m = v.resectMessage.noRequire
      } else {
        m = ''
      }
    } else {
      if (((!value && value !== 0) || (value instanceof Array && value.length === 0)) && !v.noRequire && v.noRequire !== undefined) {
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.noRequire !== undefined) {
          m = v.resectMessage.noRequire
        } else {
          m = t + '不可以为空'
        }
      } else if (v.max !== undefined && Number(value) > v.max) {
        // 最大值
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.max !== undefined) {
          m = v.resectMessage.max
        } else {
          m = t + '不能超过' + v.max
        }
      } else if (v.min !== undefined && Number(value) < v.min) {
        // 最小值
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.min !== undefined) {
          m = v.resectMessage.min
        } else {
          m = t + '不能低于' + v.min
        }
        // eslint-disable-next-line no-eval
      } else if (v.isformat !== undefined && typeof v.isformat === 'string' && !(eval(v.isformat)).test(value)) {
        // 自定义正则
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.isformat !== undefined) {
          m = v.resectMessage.isformat
        } else {
          m = '请输入正确的' + t + '格式'
        }
      } else if (v.isformat !== undefined && typeof v.isformat !== 'string' && !v.isformat.test(value)) {
        // 自定义正则
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.isformat !== undefined) {
          m = v.resectMessage.isformat
        } else {
          m = '请输入正确的' + t + '格式'
        }
      } else if (v.minlength !== undefined && value.length < v.minlength) {
        // 最小长度
        i = '1'

        if (v.resectMessage !== undefined && v.resectMessage.minlength !== undefined) {
          m = v.resectMessage.minlength
        } else {
          m = t + '不能少于' + v.minlength + '个字'
        }
      } else if (v.maxlength !== undefined && value.length > v.maxlength) {
        // 最大长度
        i = '1'

        if (v.resectMessage !== undefined && v.resectMessage.maxlength !== undefined) {
          m = v.resectMessage.maxlength
        } else {
          m = t + '不能超过' + v.maxlength + '个字'
        }
      } else if (v.maxtime !== undefined && v.maxtime > new Date(Date.parse(value.replace('-', '/')))) {
        // 最大时间
        i = '1'

        if (v.resectMessage !== undefined && v.resectMessage.maxtime !== undefined) {
          m = v.resectMessage.maxtime
        } else {
          m = t + '不能大于' + v.maxtime
        }
      } else if (v.mintime !== undefined && v.mintime < new Date(Date.parse(value.replace('-', '/')))) {
        // 最小时间
        i = '1'

        if (v.resectMessage !== undefined && v.resectMessage.mintime !== undefined) {
          m = v.resectMessage.mintime
        } else {
          m = t + '不能少于' + v.mintime
        }
      } else if (v.isword && value.charCodeAt() <= 128 && value.charCodeAt() > 0 || v.isword !== undefined) {
        // 汉字
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.isword !== undefined) {
          m = v.resectMessage.isword
        } else {
          m = '请输入汉字'
        }
      } else if (v.isInteger && !(/c|(^[0-9]+$)/).test(value)) {
        // 正整数
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.isInteger !== undefined) {
          m = v.resectMessage.isInteger
        } else {
          m = '请输入正整数'
        }
      } else if (v.isPhone && !(/^[1](([3][0-9])|([4][1,4-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}/).test(value)) {
        // 原正则  /^1[34578]\d{9}$/
        // 手机号
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.isPhone !== undefined) {
          m = v.resectMessage.isPhone
        } else {
          m = '请输入正确的' + t
        }
      } else if (v.isCredNo && !(/^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/).test(value)) {
        // 原正则  /^1[34578]\d{9}$/
        // 组织机构代码

        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.isCredNo !== undefined) {
          m = v.resectMessage.isCredNo
        } else {
          m = '请输入正确的' + t
        }
      } else if (v.isTel && !(/^([0-9]{3,4}-)?[0-9]{7,8}$/).test(value)) {
        // 手机号
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.isTel !== undefined) {
          m = v.resectMessage.isTel
        } else {
          m = '请输入正确的' + t + '如：027-1234567或1234567'
        }
      } else if (v.isEmail && !(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(value.trim())) {
        // 邮箱
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.isEmail !== undefined) {
          m = v.resectMessage.isEmail
        } else {
          m = '请输入正确邮箱地址'
        }
      } else if (v.iscP && !(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/).test(value)) {
        // 身份证
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.iscP !== undefined) {
          m = v.resectMessage.iscP
        } else {
          m = '请输入正确的身份证号'
        }
      } else if (v.iscPattern && !(/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/).test(value)) {
        // 车牌号
        i = '1'
        if (v.resectMessage !== undefined && v.resectMessage.iscPattern !== undefined) {
          m = v.resectMessage.iscPattern
        } else {
          m = '请输入正确的' + t
        }
      } else {
        i = '2'
      }
    }
  } else {
    if ((!value && value !== 0) || (value instanceof Array && value.length === 0)) {
      i = '1'
      m = t + '不可以为空'
    } else {
      i = '2'
    }
  }
  valRule.iconV = i
  valRule.validataMessage = m
}

// 深度复制对象到对象（不使用整体赋值）
// emptyType:如果fromObj中的字段不存在于toObj中，则：1(默认):创建、2:清空、3:不操作
export const deepClone = function(toObj, fromObj, emptyType) {
  // 判断复制的目标是数组还是对象
  for (const key in fromObj) {
    // 遍历目标
    if (fromObj.hasOwnProperty(key)) {
      if (fromObj[key] && typeof fromObj[key] === 'object') {
        // 如果值是对象，就递归一下
        deepClone(toObj[key], fromObj[key])
      } else {
        // 如果不是，就直接赋值
        if (toObj.hasOwnProperty(key)) {
          toObj[key] = fromObj[key]
        } else {
          if (emptyType === '2') {
            toObj[key] = ''
          } else if (emptyType === '3') {
            // 不处理
          } else {
            toObj[key] = fromObj[key]
          }
        }
      }
    }
  }
}
// 获取深度复制对象
export const getDeepClone = function(toObj, fromObj) {
  const target = fromObj.constructor === Array ? [] : {}
  // 判断复制的目标是数组还是对象
  for (const key in fromObj) {
    // 遍历目标
    if (fromObj.hasOwnProperty(key)) {
      if (fromObj[key] && typeof fromObj[key] === 'object') {
        // 如果值是对象，就递归一下
        target[key] = fromObj[key].constructor === Array ? [] : {}
        target[key] = getDeepClone(fromObj[key])
      } else {
        // 如果不是，就直接赋值
        target[key] = fromObj[key]
      }
    }
  }
  return target
}

// 获取从配置对象中读取formField对象
// defFormObj:页面上配置的默认对象
// configObj:缓存配置对象
// fieldName:tableComponents对象中绑定数据的字段名称
// compObjName:组件对象名称
// isReturn:是否回传（默认true:是）
export const getFormField = function(that, defFormObj, configObj, fieldName, compObjName, isReturn) {
  const curFieldName = fieldName || 'codeField'
  const curCompObjName = compObjName || 'tableComponents'
  const comps = configObj ? getObject(configObj, curCompObjName) : []
  if (comps && comps.length > 0) {
    comps.forEach((item, i) => {
      const curItemObj = getObject(item, curFieldName)
      const arrItemObj = curItemObj.split(',')
      for (let i = 0; i < arrItemObj.length; i++) {
        const itemObj = arrItemObj[i]
        if (!defFormObj.hasOwnProperty(itemObj) && itemObj !== 'controlBtn' && itemObj !== 'editControlBtn') {
          if (that) {
            that.$set(defFormObj, itemObj, '')
          } else {
            defFormObj[itemObj] = ''
          }
        }
      }
    })
  }
  if (isReturn !== false) {
    return defFormObj
  }
}

// tableComponents 循环pageArea 分组（用于分区域显示表单）
export const getPageArea = function(that, compObjName) {
  const curCompObjName = compObjName || 'tableComponents'
  // 分组操作
  const arrPageArea = []
  if (that[curCompObjName] && that[curCompObjName].filter(o => o.pageArea && o.pageArea !== '').length > 0) {
    // 是否已经加入其他信息
    var isPushOther = false
    for (let i = 0; i < that[curCompObjName].length; i++) {
      if (that[curCompObjName][i].pageArea && that[curCompObjName][i].pageArea !== '') {
        // 有pageArea的情况
        if (arrPageArea.filter(o => o.pageArea === that[curCompObjName][i].pageArea).length <= 0) {
          arrPageArea.push({
            pageArea: that[curCompObjName][i].pageArea
          })
        }
      } else if (!isPushOther) {
        // 没有pageArea的情况
        that[curCompObjName][i].pageArea = '其它信息'
        arrPageArea.push({
          pageArea: that[curCompObjName][i].pageArea
        })
        isPushOther = true
      }
    }
    // 把其它信息放到最后
    for (let j = 0; j < arrPageArea.length; j++) {
      if (arrPageArea[j].pageArea === '其它信息') {
        arrPageArea.splice(j, 1)
        const a = {}
        a.pageArea = '其它信息'
        arrPageArea.push(a)
      }
      // 不显示只有一种的情况
      if (arrPageArea.length === 1) {
        arrPageArea[j].noShowArea = true
      }
    }
  } else {
    arrPageArea.push({
      pageArea: ''
    })
  }
  return arrPageArea
}

// 多字段组件（如双日期组件）重置
export const resetMulComp = function(that, compObjName, fieldName, mixObjRefName) {
  const curCompObjName = compObjName || 'tableComponents'
  const strFieldName = fieldName || 'formField'
  const mulComps = that[curCompObjName].filter(o => o.codeField.indexOf(',') > -1)
  if (mulComps.length > 0) {
    mulComps.forEach(comp => {
      const arrCodeFields = comp.codeField.split(',')
      if (that[strFieldName][comp.codeField]) {
        that[strFieldName][comp.codeField] = ''
      }
      let contactValue = ''
      arrCodeFields.forEach(field => {
        if (field in that[strFieldName]) {
          contactValue += that[strFieldName][field] + ','
        }
      })
      if (contactValue !== '') {
        contactValue = contactValue.substring(0, contactValue.length - 1)
        if (mixObjRefName) {
          that.$refs[mixObjRefName].$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setCopy(contactValue)
        } else {
          that.$refs[comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey][0].setCopy(contactValue)
        }
      }
    })
  }
}

// 显示提示
export function showMessages(__this, type, message, isHTML) {
  switch (type) {
    case 'success':
      __this.$store.dispatch('app/lockScreen')
      __this.$message({
        title: '成功',
        dangerouslyUseHTMLString: !!isHTML,
        message: message,
        duration: 1000,
        type: type,
        onClose: function() {
          if (__this.$store.state.app.loading.close) {
            setTimeout(() => {
              __this.$store.state.app.loading.close()
            }, 200)
          }
        }
      })
      break
    case 'warning':
      __this.$store.dispatch('app/lockScreen')
      __this.$message({
        title: '警告',
        dangerouslyUseHTMLString: !!isHTML,
        message: message,
        duration: 1000,
        type: type,
        onClose: function() {
          if (__this.$store.state.app.loading.close) {
            setTimeout(() => {
              __this.$store.state.app.loading.close()
            }, 200)
          }
        }
      })
      break
    case 'error':
      __this.$store.dispatch('app/lockScreen')
      console.log(message.split('</div>'))
      __this.$message({
        title: '消息',
        dangerouslyUseHTMLString: !!isHTML,
        message: message,
        duration: message.indexOf('</div>') > -1 ? 1000 * (message.split('</div>').length - 1) : 1000,
        type: type,
        onClose: function() {
          if (__this.$store.state.app.loading.close) {
            setTimeout(() => {
              __this.$store.state.app.loading.close()
            }, 200)
          }
        }
      })
      break
  }
}

// 导入JS文件
export function importScript(path, success, error) {
  var oS = document.createElement('script')
  oS.src = path
  document.getElementsByTagName('head')[0].appendChild(oS)
  oS.onload = function() {
    success && success()
  }

  oS.onerror = function() {
    error && error()
  }
}

// 通过页面路径跳转
// pageObj: { params: params, query: query }
export const jumpRouteByVueFile = function(that, vuePage, pageObj) {
  if (pageObj.name === undefined || pageObj.name === null) {
    if (vuePage) {
      // 从菜单中通过页面路径找“name”
      const menu = getMenuByTarget(that.$store.getters.menu, vuePage)
      if (menu) {
        pageObj.name = menu.code
      } else {
        console.error('Can\'t find menu for"' + vuePage + '".')
      }
    }
  }
  that.$router.push(pageObj)
}

// 遍历菜单
export const getMenuByTarget = function(menus, target) {
  let res = null
  for (const menu of menus) {
    if (menu.target === target) {
      res = menu
      break
    }
    if (menu.children) {
      res = getMenuByTarget(
        menu.children,
        target
      )
      if (res) {
        break
      }
    }
  }
  return res
}

// 获取入参
export const getInputParam = function(formField, apiConfig, pageSize, pageIndex, listQuery, apiQueryRow, apiStyle) {
  const page = pageIndex === null || pageIndex === undefined ? listQuery.pageIndex : pageIndex
  const size = pageSize === null || pageSize === undefined ? listQuery.pageSize : pageSize
  if (apiStyle !== 'restful') {
    return {
      // api配置
      apiConfig: apiConfig,
      // 需要调用的API服务配置（只有使用GraphQL时生效）
      apiServices: [{
        // 表格中台返回网格的字段
        apiQueryRow: apiQueryRow
      }],
      // 条件/实体参数（变量），根据typeParam中的定义配置
      variables: {
        pageSize: size,
        pageIndex: page,
        // 当前中台使用的名称有dataInfo、info，具体查看API文档
        dataInfo: formField
      }
    }
  } else {
    const returnObj = {
      // api配置
      apiConfig: apiConfig,
      // 条件/实体参数（变量），根据typeParam中的定义配置
      variables: formField
    }
    returnObj.variables.pageIndex = page
    returnObj.variables.pageSize = size
    return returnObj
  }
}

export default {
  // 转换时间为字符串（格式）
  parseTime,
  // 日期转字符串
  formatTime,
  // url参数转json对象
  param2Obj,
  // 数值转换为json对象
  toObject,
  getValueByPath,
  // 获取随机数
  generateId,
  // 替换所有字符串
  replaceAll,
  // 截取小数
  getNumber,
  // 判断两个值是否相同
  valueEquals,
  // 返回符合条件的数组索引
  arrayFindIndex,
  // 返回符合条件的数组索引对应的项
  arrayFind,
  // 对象强制转数组
  coerceTruthyValueToArray,
  // 是否IE浏览器
  isIE,
  // 是否Edge浏览器
  isEdge,
  autoprefixer,
  kebabCase,
  // 首字母大写
  capitalize,
  // 对比两个对象是否相同
  isEqual,
  // 判断字符串是否为空
  isEmpty,
  // 根据路由Path获取视图深度
  getPathDeep,
  // 根据路由path获取上级视图
  getParentView,
  // 列表结构转为数结构JSON
  parseTreeFromList,
  // 从jsonArray对象中抽取某个键的值组合为数值返回
  getArrayFromJsonArray,
  // 从apiQueryRow转换为多层结构
  getArrayFromArray,
  // 从字符串字段（带“.”）转换为多层结构
  getStringFromString,
  // 导出API请求参数中cloumns转换（xxx.yyy.zzz形式转换为：[xxx][yyy][zzz]）
  getExportStringFromString,
  // GraphQL返回多层结构数据转一层���据（以“.”相连）
  changeToOneDeepArray,
  // 根据当前组件获取AppMain组件高度
  getAppMainHeight,
  // 返回上级组件（含有formField对象的组件）
  getHasFormFieldParentComponent,
  // 下载文件
  downloadFile,
  // 获取查询url参数
  getQueryVariable,
  // url参数转json
  getQueryObject,
  // json转url参数
  getUrlVars,
  // 文件流转二进制
  getFileBinary,
  // 计算在指定秒数后是否已经过期
  globalCheckIsExp,
  // 从一个数组里面通过一个字段找某个值，返回对应的另外一个字段
  getOneValFromList,
  // 设置网格自适应高度（通用）
  setTableHeight,
  // 设置监听组件
  watchComp,
  // 设置组件查询字段
  setQueryFields,
  // 设置网格中组件查询字段
  setRowQueryFields,
  // 设置常量值
  setConstValue,
  // 设置不可编辑
  setDisable,
  // 设置是否隐藏
  setIsShow,
  // 设置组件不可编辑（用于设置弹窗中查询组件需要根据父组件传值控制不可编辑的场景）
  setDisableByComp,
  // rule模式校验
  validateForm,
  // 模板模式校验
  validataMoth,
  // 自定义校验规则
  validataRules,
  // 生成GUID
  guid,
  // 深度复制对象
  deepClone,
  // 获取深度复制对象
  getDeepClone,
  // 获取从配置对象中读取formField对象
  getFormField,
  // tableComponents 循环pageArea 分组（用于分区域显示表单）
  getPageArea,
  // 多字段组件（如双日期组件）重置
  resetMulComp,
  // 显示提示
  showMessages,
  // 导入JS文件
  importScript,
  // 通过页面路径跳转
  jumpRouteByVueFile,
  // 像素转数值
  pxToNumber,
  // 获取入参
  getInputParam
}
