/**
 * description: 整车-配置缓存
 * author: luojx
 * createdDate: 2019-08-31
*/
import { getPageConfigs } from '@/api/config'
import config from '@/utils/config'
import store from '@/store'
import storage from '@/utils/storage'
import { saveColsInfo } from '@/api/config'
import { saveCacheInfo } from '@/api/config'
import { saveColsWidthInfo } from '@/api/config'

// 缓存配置对象
export const CacheConfig = {
  // 是否启用配置化
  useConfig: false,
  // 是否启用配置缓存（服务端缓存）
  useCache: true,
  // 缓存时长（秒）
  cacheSeconds: 600,
  // 最大缓存记录（页面）数
  maxCacheCount: 100,
  colsWidthInfo:[],
  // 获取缓存数据（path：路由路径/页面标识，cb：callback函数，useConfig：是否读取配置(优先级比this.useConfig高)）
  // self：页面this对象（主要用于事件绑定）
  initData: function(path, cb, useConfig, self) {
    if (process.env.NODE_ENV === 'development' && config.cH !== '?') {
      if (typeof cb === 'function') {
        cb.call()
      }
      // mock环境不能使用配置
      return
    }

    var that = this

    if (useConfig === false || (!useConfig && that.useConfig !== true)) {
      if (typeof cb === 'function') {
        cb.call()
      }
      return
    }
    // 需要查询的pageCode值
    var paths = []
    if (typeof path === 'string') {
      paths.push(path)
    } else if (path instanceof Array) {
      paths = path
    }

    var tempPaths = []
    for (var k in paths) {
      // 是否读取配置（从API读数）
      if (useConfig === undefined || useConfig === null) {
        if (that.useConfig !== true) {
          if (that.cacheData[paths[k]]) {
            delete that.cacheData[paths[k]]
          }
          if (typeof cb === 'function') {
            cb.call()
          }
          return
        }
      }

      // 读取缓存数据
      var cacheData = storage.get(paths[k])
      if (!cacheData || cacheData === null) {
        cacheData = { lang: '', cacheTime: null, tableCols: [], tableComponents: [], formComponents: [], tableComponentsAll: [], tableColsAll: [] }
      }
      that.cacheData[paths[k]] = cacheData

      // 检查是否过期
      var now = new Date()
      now.setSeconds(now.getSeconds() - that.cacheSeconds)
      if (cacheData.cacheTime === null || now > new Date(cacheData.cacheTime)) {
        console.info('isExp')
        tempPaths.push(paths[k])
      } else {
        that.setQueue(paths[k])
        that.setComponents(cacheData, self)
      }
    }
    paths = tempPaths
    var data = {
      pageCode: paths.toString(),
      lang: store.getters.language.toUpperCase(),
      userId: store.getters.userId,
      useCache: that.useCache ? '1' : '0'
    }
    if (paths.length > 0) {
      try {
        // 未过期则读取API数据
        getPageConfigs(data).then(response => {
          if (response.data.proConfigInfoQueryByPage && response.data.proConfigInfoQueryByPage.rows && response.data.proConfigInfoQueryByPage.rows.length > 0) {
            for (var pIndex in paths) {
              var rows = response.data.proConfigInfoQueryByPage.rows.filter(o => o.pageCode === paths[pIndex])[0]
              var cacheData = that.cacheData[paths[pIndex]]
              // 初始化
              cacheData.tableCols = []
              cacheData.tableComponents = []
              cacheData.formComponents = []
              cacheData.tableButtons = []
              cacheData.tableColsAll = rows.cols === null ? [] : rows.cols
              cacheData.tableComponentsAll = rows.comps === null ? [] : rows.comps
              // 语言
              cacheData.lang = data.lang
              // 时间
              cacheData.cacheTime = new Date()
              // 网格
              var tempTableCols = rows.cols === null ? [] : rows.cols.filter(o => o.isEnable === '1')
              for (var index in tempTableCols) {
                tempTableCols[index]['align'] = tempTableCols[index]['align'].toLowerCase()
                tempTableCols[index]['label'] === ''
                if (tempTableCols[index].proConfigLangExtend && tempTableCols[index].proConfigLangExtend !== null) {
                  tempTableCols[index]['label'] = tempTableCols[index].proConfigLangExtend.langLabel
                  delete tempTableCols[index]['proConfigLangExtend']
                }
                if (!tempTableCols[index].hasOwnProperty('expLabel') && (tempTableCols[index]['isComponent'] === '1' || tempTableCols[index]['isComponent'] === true)) {
                  tempTableCols[index]['expLabel'] = tempTableCols[index]['label'].replace('+', '')
                }
              }
              cacheData.tableCols = tempTableCols
              for (var j = 0; j < cacheData.tableCols.length; j++) {
                // 设置值转换
                this.setDefaultValue(cacheData.tableCols[j])
                // 网格中存在组件判断
                if (cacheData.tableCols[j]['isComponent'] && (cacheData.tableCols[j]['isComponent'] === true || cacheData.tableCols[j]['isComponent'] === '1')) {
                  cacheData.tableCols[j]['comps'] = []
                  // 网格中组件
                  var tableComps = rows.comps.filter(o => o.compType === 'TABLE' && o.colsId === cacheData.tableCols[j]['colsId'] && o.isEnable === '1')
                  for (var k = 0; k < tableComps.length; k++) {
                    var compObj = tableComps[k]
                    // clickEvent
                    compObj['eventName'] = compObj['clickEvent']
                    if (compObj['clickEvent'] && compObj['clickEvent'].length > 0) {
                      if (self && self[compObj['clickEvent']]) {
                        compObj['clickEvent'] = self[compObj['clickEvent']]
                      } else {
                        compObj['clickEvent'] = () => null
                      }
                    } else {
                      compObj['clickEvent'] = () => null
                    }
                    // 设置值转换
                    this.setDefaultValue(compObj)
                    // change事件绑定
                    if (compObj['changeEvn'] && compObj['changeEvn'].length > 0) {
                      if (self && self[compObj['changeEvn']]) {
                        compObj['change'] = self[compObj['changeEvn']]
                      }
                    }
                    if (compObj.proConfigLangExtend && compObj.proConfigLangExtend !== null) {
                      compObj['labelName'] = compObj.proConfigLangExtend.langLabel
                      delete compObj['proConfigLangExtend']
                    }
                    cacheData.tableCols[j]['comps'].push(compObj)
                  }
                  cacheData.tableCols[j]['isComponent'] = true
                }
              }
              // 非网格组件
              var formComps = rows.comps === null ? [] : rows.comps.filter(o => o.compType !== 'TABLE' && o.isEnable === '1')
              for (let i = 0; i < formComps.length; i++) {
                var formObj = formComps[i]
                // clickEvent
                formObj['eventName'] = formObj['clickEvent']
                if (formObj['clickEvent'] && formObj['clickEvent'].length > 0) {
                  if (self && self[formObj['clickEvent']]) {
                    formObj['clickEvent'] = self[formObj['clickEvent']]
                  } else {
                    formObj['clickEvent'] = () => null
                  }
                  formObj['isFunc'] = true
                } else {
                  formObj['clickEvent'] = () => null
                }
                // 设置值转换
                this.setDefaultValue(formObj)
                // change事件绑定
                if (formObj['changeEvn'] && formObj['changeEvn'].length > 0) {
                  if (self && self[formObj['changeEvn']]) {
                    formObj['change'] = self[formObj['changeEvn']]
                  }
                }
                if (formObj.proConfigLangExtend && formObj.proConfigLangExtend !== null) {
                  formObj['labelName'] = formObj.proConfigLangExtend.langLabel
                  delete formObj['proConfigLangExtend']
                }
                if (formObj.parentFileds && formObj.parentFileds !== null && !formObj.disabled) {
                  formObj.disabled = null
                }
                if (formComps[i].compType === 'QUERY') {
                  // 查询条件组件
                  cacheData.tableComponents.push(formObj)
                } else if (formComps[i].compType === 'FORM') {
                  // 表单组件
                  cacheData.formComponents.push(formObj)
                }
              }
              // 按钮
              if (rows.btns) {
                cacheData.tableButtons = rows.btns.filter(o => o.isEnable === '1')
                for(var i in cacheData.tableButtons){
                  var text = cacheData.tableButtons[i].proConfigLangExtend
                  if(text !== null && text !== undefined) {
                    cacheData.tableButtons[i].text = text.langLabel
                  }
                }
                for (let k = 0; k < cacheData.tableButtons.length; k++) {
                // clickEvent
                cacheData.tableButtons[k]['eventName'] = cacheData.tableButtons[k]['clickEvent']
                cacheData.tableButtons[k]['clickEvent'] = () => null
                cacheData.tableButtons[k]['icon'] = cacheData.tableButtons[k]['name']
                this.setDefaultValue(cacheData.tableButtons[k])
                }
              }
                // 压入队列
                that.setQueue(paths[pIndex])
                storage.set(paths[pIndex], cacheData)
                that.setComponents(cacheData, self)
            }
          }
          if (typeof cb === 'function') {
            cb.call(response)
          }
        }).catch(function(reason) {
          console.log(reason)
          if (typeof cb === 'function') {
            cb.call()
          }
        })
      } catch (e) {
        console.log(e)
        if (typeof cb === 'function') {
          cb.call()
        }
      }
    } else {
      // 未过期
      // 回调
      // 压入队列
      if (typeof cb === 'function') {
        cb.call()
      }
    }
  },
  // 设置默认值（值转换）
  setDefaultValue: function(formObj) {
    for(var key in formObj){
      if(formObj[key] === '' || formObj[key] === null){
        delete formObj[key]
      }
    }
    if (formObj['span'] && !isNaN(formObj['span'])) {
      formObj['span'] = parseInt(formObj['span'])
    }
    if (formObj['controlType'] && !formObj['type']) {
      formObj['type'] = formObj['controlType']
      delete formObj['controlType']
    }
    if (formObj['width']) {
      if (formObj['width'] === '0') {
        formObj['width'] = null
      } else if (/^\d+$/.test(formObj['width'])) {
        formObj['width'] = parseInt(formObj['width'])
      }
    }
    if (formObj['parentFields']) {
      formObj['parentFileds'] = formObj['parentFields']
      delete formObj['parentFields']
    }
    if (formObj['lookupType']) {
      formObj['lookuptype'] = formObj['lookupType']
      delete formObj['lookupType']
    }
    if (formObj['rowFields']) {
      formObj['rowFileds'] = formObj['rowFields']
      delete formObj['rowFields']
    }
    if (formObj['otherFields']) {
      formObj['otherField'] = formObj['otherFields']
      delete formObj['otherFields']
    }
    if (formObj['returnCodeFields']) {
      formObj['returnCodeField'] = formObj['returnCodeFields']
      delete formObj['returnCodeFields']
    }
    if (formObj['returnTextFields']) {
      formObj['returnTextField'] = formObj['returnTextFields']
      delete formObj['returnTextFields']
    }
    // 需要把1/0值转换为true/false的字段集
    const arrFields = [
      'clearable',
      'isMul',
      'isMust',
      'isShowLabel',
      'filterable',
      'isRequire',
      'sortable',
      'hidden',
      'isSys',
      'isComponent',
      'isColComp',
      'isFlag',
      'isAsync',
      'isShow',
      'disabled',
      'fuzzySearch'
    ]
    arrFields.forEach(field => {
      if (formObj.hasOwnProperty(field)) {
        if (formObj[field] === '1') {
          formObj[field] = true
        } else if (formObj[field] === '2') {
          // sortable（1:true, 0:false, 2:'custom'）
          formObj[field] = 'custom'
        } else {
          formObj[field] = false
        }
      }
    })
    if (formObj.hasOwnProperty('dataToObject')) {
      if (formObj['dataToObject'] !== null && formObj['dataToObject'] !== '' && formObj['dataToObject'] !== '{}') {
        try {
          const dataObj = JSON.parse(formObj['dataToObject'])
          // validrule：校验规则
          if (dataObj && dataObj.hasOwnProperty('validrule')) {
            formObj['validrule'] = JSON.parse(dataObj['validrule'])
            delete dataObj['validrule']
          }
          // isFormat：正则判断
          if (dataObj && dataObj.hasOwnProperty('isformat')) {
              if(formObj['validrule'] === undefined){
                formObj['validrule'] = {}
              }
              formObj['validrule']['isformat'] = dataObj['isformat']
              delete dataObj['isformat']
          }
          // isSlot：是否使用slot（占位符）
          if (dataObj && dataObj.hasOwnProperty('isSlot')) {
            if (dataObj['isSlot'] === '1') {
              formObj['isSlot'] = true
            } else {
              formObj['isSlot'] = false
            }
            delete dataObj['isSlot']
          }
          // isFlag：“是”、“否”标志
          if (dataObj && dataObj.hasOwnProperty('isFlag')) {
            if (dataObj['isFlag'] === '1') {
              formObj['isFlag'] = true
            } else {
              formObj['isFlag'] = false
            }
            delete dataObj['isFlag']
          }
          // 模糊查询字段
          if (dataObj && dataObj.hasOwnProperty('fuzzySearch')) {
            if (dataObj['fuzzySearch'] === '1') {
              formObj['fuzzySearch'] = true
            } else {
              formObj['fuzzySearch'] = false
            }
            delete dataObj['fuzzySearch']
          }
          // category：上传目录
          if (dataObj && dataObj.hasOwnProperty('category')) {
            formObj['category'] = dataObj['category']
            delete dataObj['category']
          }
          // expLabel：导出列名称
          if (dataObj && dataObj.hasOwnProperty('expLabel')) {
            formObj['expLabel'] = dataObj['expLabel']
            delete dataObj['expLabel']
          }
          // min：输入框最少数值
          if (dataObj && dataObj.hasOwnProperty('min') && /^(\-|\+)?\d+(\.\d+)?$/.test(dataObj['min'])) {
            if (dataObj['min'].indexOf('.') > -1) {
              dataObj['min'] = parseFloat(dataObj['min'])
            } else {
              dataObj['min'] = parseInt(dataObj['min'])
            }
          }
          // max：输入框最大数值
          if (dataObj && dataObj.hasOwnProperty('max') && /^(\-|\+)?\d+(\.\d+)?$/.test(dataObj['max'])) {
            if (dataObj['max'].indexOf('.') > -1) {
              dataObj['max'] = parseFloat(dataObj['max'])
            } else {
              dataObj['max'] = parseInt(dataObj['max'])
            }
          }
          // maxlength：输入框最大长度
          console.log(dataObj)
          if (dataObj && dataObj.hasOwnProperty('maxLength') && /^(\-|\+)?\d+(\.\d+)?$/.test(dataObj['maxLength'])) {
            if (dataObj['maxLength'].indexOf('.') > -1) {
              dataObj['maxLength'] = parseFloat(dataObj['maxLength'])
            } else {
              dataObj['maxLength'] = parseInt(dataObj['maxLength'])
            }
          }
          // isType：是否需要检验最小、最大数据值
          if (dataObj && dataObj.hasOwnProperty('isType')) {
            if (dataObj['isType'] === '1' || dataObj['isType'] === 'true') {
              dataObj['isType'] = true
            } else {
              dataObj['isType'] = false
            }
          }
          // decPoint：小数点保留位数（默认两位）
          if (dataObj && dataObj.hasOwnProperty('decPoint')) {
            formObj['decPoint'] = dataObj['decPoint']
            delete dataObj['decPoint']
          }
          // step 步长
          if (dataObj && dataObj.hasOwnProperty('step')) {
            if (dataObj['step'].indexOf('.') > -1) {
              formObj['step'] = parseFloat(dataObj['step'])
            } else {
              formObj['step'] = parseInt(dataObj['step'])
            }
            delete dataObj['step']
          }
          // unListQuryFields：下拉框查询时去掉不用的查询条件
          if (dataObj && dataObj.hasOwnProperty('unListQuryFields')) {
            formObj['unListQuryFields'] = dataObj['unListQuryFields']
            delete dataObj['unListQuryFields']
          }
          // options:下拉选项
          if (dataObj && dataObj.hasOwnProperty('options')) {
            formObj['options'] = JSON.parse(dataObj['options'])
            delete dataObj['options']
          }
          // change:改变事件
          if (dataObj && dataObj.hasOwnProperty('change')) {
            formObj['changeEvn'] = dataObj['change']
            delete dataObj['change']
          }
          // readonly:是否只读
          if (dataObj && dataObj.hasOwnProperty('readonly')) {
            if (dataObj['readonly'] === '1' || dataObj['readonly'] === 'true') {
              formObj['readonly'] = true
            } else {
              formObj['readonly'] = false
            }
          }
          // isShowComp 是否显示组件中的控件（如：网格中，文本输入框有时只需要显示文字，不需要显示输入框，通过事件触发切换显示文本和输入框）
          if (dataObj && dataObj.hasOwnProperty('isShowComp')) {
            formObj['isShowComp'] = dataObj['isShowComp']
            delete dataObj['isShowComp']
          }
          // isInput modelCode改变时是否马上sendCode（回传参数），默认：false
          if (dataObj && dataObj.hasOwnProperty('isInput')) {
            formObj['isInput'] = dataObj['isInput']
            delete dataObj['isInput']
          }
          // labelWidth：标签宽度
          if (dataObj && dataObj.hasOwnProperty('labelWidth')) {
            formObj['labelWidth'] = dataObj['labelWidth']
            delete dataObj['labelWidth']
          }
          formObj['dataToObject'] = dataObj
        } catch (e) {
          console.log('error', e)
        }
      } else if (formObj['dataToObject'] === '{}') {
        formObj['dataToObject'] = {}
      }
    }
    for (const key in formObj) {
      if (formObj[key] === '' || formObj[key] === null) {
        delete formObj[key]
      }
    }
  },
  // 绑定事件
  bindEvent(self, path, useConfig) {
    if (useConfig === false) {
      return
    }

    // 是否读取配置（从API读数）
    if (useConfig === undefined || useConfig === null) {
      if (this.useConfig !== true) {
        return
      }
    }

    var paths = []
    if (typeof path === 'string') {
      paths.push(path)
    } else if (path instanceof Array) {
      paths = path
    }

    if (self && paths.length > 0) {
      paths.forEach(item => {
        if (this.cacheData[item]) {
          const tableCols = this.cacheData[item].tableCols
          const tableComponents = this.cacheData[item].tableComponents
          const formComponents = this.cacheData[item].formComponents
          const tableButtons = this.cacheData[item].tableButtons
          // 网格列中事件
          if (tableCols && tableCols.length > 0) {
            tableCols.forEach((item, i) => {
              if (item.isComponent === true) {
                if (item.comps && item.comps.length > 0) {
                  // 网格列中事件
                  this.bindObjEvent(self, item.comps)
                }
              }
            })
          }
          // 查询条件中事件
          this.bindObjEvent(self, tableComponents)
          // 表单组件中事件
          this.bindObjEvent(self, formComponents)
          // 按钮中事件
          this.bindObjEvent(self, tableButtons)
        }
      })
    }
  },
  // 绑定对象事件（子方法）
  bindObjEvent(self, obj) {
    if (obj && obj.length > 0) {
      obj.forEach((item, i) => {
        if (item['eventName'] && item['eventName'].indexOf('(') > -1) {
          // 包含参数的方法，如：synchrony('param1'|'param2')，使用“|”隔开多个参数，字符串参数使用“'”单引号
          const events = item['eventName'].split('(')
          if (self[events[0]]) {
            let args = []
            if (events[1] && events[1].length > 0) {
              events[1] = events[1].replace(')', '').replace(new RegExp(' ', 'gm'), '')
              if (events[1].length > 0) {
                // 分割参数
                args = events[1].split('|')
              }
            }
            for (let i = 0; i < args.length; i++) {
              if (args[i].indexOf('\'') > -1 || args[i].indexOf('"') > -1) {
                args[i] = args[i].replace(new RegExp('\'', 'gm'), '').replace(new RegExp('"', 'gm'), '')
              } else {
                args[i] = parseFloat(args[i])
              }
            }
            // 有参数或空参数（只要有括号）
            if (events[1].length > 0 || events.length > 1) {
              item['clickEvent'] = () => self[events[0]](...args)
            } else {
              item['clickEvent'] = self[events[0]]
            }
          } else {
            item['clickEvent'] = () => null
          }
        } else {
          if (item['eventName'] && self[item['eventName']]) {
            item['clickEvent'] = self[item['eventName']]
          } else {
            item['clickEvent'] = () => null
          }
        }
        // change事件
        if (self && item['changeEvn'] && self[item['changeEvn']]) {
          item['change'] = self[item['changeEvn']]
        }
      })
    }
  },
  setTabelParams(target, data) {
    data.forEach((item, i) => {
      // target.forEach((obj, j) => {
      //   if (item.prop === obj.codeField) {
      //     item = Object.assign({}, item, obj)
      //   }
      // })
      // codeField
      item.codeField = item.prop
      delete item.prop
      // 转化参数1,0->true,false
      for (const j in item) {
        this.setDefaultValue(item[j])
      }
    })
    return data
  },
  // 生成组件和绑定事件
  setComponents(cacheData, that) {
    cacheData.formComponents.forEach(formObj => {
      this.createComponents(formObj)
    })
    cacheData.tableComponents.forEach(compObj => {
      this.createComponents(compObj)
    })
    cacheData.tableCols.forEach(cols => {
      if (cols.comps && cols.comps.length > 0) {
        if (that) {
          this.bindObjEvent(that, cols.comps)
        }
        cols.comps.forEach(colsCompObj => {
          this.createComponents(colsCompObj)
        })
      }
    })
  },
  createComponents(compObj) {
    const component = compObj.component
    if (component.indexOf('views/') > -1) {
      const componentInViews = component.split('views/')[1]
      compObj['component'] = () => import(`@/views/${componentInViews}`)
    } else {
      if (component.indexOf('components/') > -1) {
        const componentInComps = component.split('components/')[1]
        compObj['component'] = () => import(`@/components/${componentInComps}`)
      } else {
        compObj['component'] = () => import(`@/components/${component}`)
      }
    }
  },
  setFormParams(target, data) {
    data.forEach((item, i) => {
      target.forEach((obj, j) => {
        if (item.codeField === obj.codeField) {
          item = Object.assign(item, obj)
        }
      })
      // labelName转label
      item.label = item.labelName
      delete item.labelName
      // 转化参数1,0->true,false
      for (const j in item) {
        this.setDefaultValue(item[j])
      }
    })
    return data
  },
  // 缓存页面列表
  // 如：采购单驳回：'/vemodule/vePurchase/vePurchaseReject': { lang: '', cacheTime: null, tableCols: [], tableComponents: [] }
  cacheData: {},
  // 热点数据队列
  cacheQueue: [],
  // 压入队列
  setQueue: function(path) {
    var index = this.cacheQueue.findIndex(o => o === path)
    if (index >= 0) {
      this.cacheQueue.splice(index, 1)
    }
    // 插入到队列最后
    this.cacheQueue.push(path)

    // 在localStorage中保存队列
    var storageQueue = storage.get('storageQueue')
    storageQueue = storageQueue === null ? [] : storageQueue
    var indexStorage = storageQueue.findIndex(o => o === path)
    if (indexStorage >= 0) {
      storageQueue.splice(indexStorage, 1)
    }
    storageQueue.push(path)
    storage.set('storageQueue', storageQueue)
    this.delQueue(path, storageQueue)
  },
  // LRU清除队列
  delQueue: function(path, storageQueue) {
    if (this.cacheQueue.length > this.maxCacheCount) {
      // 不删除当前访问缓存
      if (path !== this.cacheQueue[0]) {
        // 删除第一条记录对应的缓存数据
        if (this.cacheData[this.cacheQueue[0]]) {
          delete this.cacheData[this.cacheQueue[0]]
        }
        // 删除第一条记录
        if (this.cacheQueue.length > 0) {
          this.cacheQueue.splice(0, 1)
        }
      }
    }
    // 在localStorage中清除队列
    if (storageQueue.length > this.maxCacheCount) {
      storage.remove(storageQueue[0])
      storageQueue.splice(0, 1)
      storage.set('storageQueue', storageQueue)
    }
  },
  timeOutObj: null,
  // 获取拖动网格列后的顺序
  setColsInfo(key, dropTableCols) {
    var cacheInfo = storage.get(key)
    if (cacheInfo && cacheInfo.tableCols && cacheInfo.tableCols.length !== 0) {
      // 按照顺序进行id的比对
      var dropIndex = 0
      for (var k in cacheInfo.tableCols) {
        if (cacheInfo.tableCols[k].hidden) continue
        // 如果该位置的id不相等，进行顺序的交换
        if (cacheInfo.tableCols[k].colsId !== dropTableCols[dropIndex].colsId) {
          dropTableCols[dropIndex]['sort'] = cacheInfo.tableCols[k]['sort']
          cacheInfo.tableCols[k] = dropTableCols[dropIndex]
        }
        dropIndex++
      }
      storage.set(key, cacheInfo)
      clearTimeout(this.timeOutObj)
      const that = this
      this.timeOutObj = setTimeout(function() {
        saveColsInfo(key, cacheInfo.tableCols, that.cacheData[key].tableCols)
      }, 60000)
    }
  },
  // 保存网格列宽度改变后的信息
  setColsWidthInfo(newWidth, oldWidth, columnn, key){
    var cacheInfo = storage.get(key)

    if (!(cacheInfo && cacheInfo.tableCols && cacheInfo.tableCols.length > 0)) {
      return
    }
    var changeCols = cacheInfo.tableCols.filter(o => o.prop === columnn.property)
    var index = this.colsWidthInfo.findIndex(o => o.prop === columnn.property)
    if(index > -1){
      this.colsWidthInfo.splice(index,1)
    }


    if(changeCols[0].width !== newWidth){
      changeCols[0].width = newWidth+""
      this.colsWidthInfo.push(changeCols[0])
    }
    const that = this
    clearTimeout(this.timeOutObj)
    this.timeOutObj = setTimeout(function() {
      saveColsWidthInfo(key, that.colsWidthInfo,function(){
        that.colsWidthInfo = []
      })
    }, 60000)
  },
  commitData(that) {
    var moduleCode = that.$route.path.split('/')[1].split('Module')[0].toUpperCase()
    var pageView = {
      moduleCode: moduleCode === 'ORG' ? 'DB' : moduleCode,
      pageCode: !that.popupsPageCode || that.popupsPageCode === '' ? that.$route.path : that.popupsPageCode,
      pageName: !that.popupsPageCode || that.popupsPageCode === '' ? that.$route.meta.title : that.popupsPageCode,
      pageType: !that.popupsPageCode || that.popupsPageCode === '' ? 'PAGE' : 'POPUPS',
      pageArea: !that.popupsPageCode || that.popupsPageCode === '' ? that.$route.meta.title : that.popupsPageCode,
      isEnable: '1'
    }
    var comps = []
    for (var k in that.tableComponents) {
      var tableComp = that.tableComponents[k]
      var comp = {
        labelName: tableComp.labelName,
        langLabelName: '[{"langType":"ZH","langLabel":' + tableComp.labelName + '}]',
        codeField: tableComp.codeField,
        compKey: tableComp.compKey,
        sort: comps.length + 1 + '',
        component: tableComp.type === 'inputText' ? 'components/org/commonInput' : ' ',
        controlType: tableComp.type ? tableComp.type.toUpperCase() : " ",
        compType: !that.popupsPageCode || that.popupsPageCode === '' ? 'QUERY' : 'FORM',
        isEnable: '0',
        isSys: '1',
        isMust: tableComp.isMust ? '1' : '0'
      }
      comps.push(comp)
    }
    var cols = []
    for (var i in that.tableCols) {
      var tableCol = that.tableCols[i]
      var col = {
        label: tableCol.label,
        langLabelName: '[{"langType":"ZH","langLabel":' + tableCol.label + '}]',
        prop: tableCol.prop,
        width: (tableCol.width === null || tableCol.width === undefined) ? '0' : tableCol.width,
        sort: cols.length + 1 + '',
        hidden: (tableCol.hidden === undefined || !tableCol.hidden) ? '0' : '1',
        align: 'CENTER',
        isEnable: '0',
        sortable: '0',
        isComponent: (tableCol.isComponent === undefined || !tableCol.isComponent) ? '0' : '1'
      }
      cols.push(col)
      if (tableCol.isComponent && tableCol.comps) {
        for (var j in tableCol.comps) {
          var compInCol = {
            labelName: tableCol.comps[j].labelName === undefined ? col.label : tableCol.comps[j].labelName,
            langLabelName: '[{"langType":"ZH","langLabel":' + tableCol.comps[j].labelName + '}]',
            codeField: tableCol.comps[j].codeField,
            compKey: tableCol.comps[j].compKey,
            sort: comps.length + 1 + '',
            isColComp: '1',
            component: tableCol.comps[j].type === 'inputText' ? 'components/org/commonInput' : 'null',
            controlType: tableCol.comps[j].type === undefined ? 'TEXTBUTTON' : tableCol.comps[j].type.toUpperCase(),
            compType: 'TABLE',
            isEnable: '0',
            isSys: '1'
          }
          comps.push(compInCol)
        }
      }
    }
    var dataInfo = {
      pageview: JSON.stringify(pageView),
      tableComponents: JSON.stringify(comps),
      tableCols: JSON.stringify(cols)
    }
    debugger
    saveCacheInfo(dataInfo)
    storage.remove(that.$route.path)
  }
}

export default {
  // 缓存配置对象
  CacheConfig
}
