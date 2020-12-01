/**
 * description: 组件混入对象
 * author: luojx
 * createdDate: 2019-07-27
 */
// 下拉框
// 使用场景：所有下拉框组件
export const dropdownMixins = {
  props: {
    // 行内占比
    span: { type: Number, default: 6 },
    // 是否显示标签
    isShowLabel: { type: Boolean, default: true },
    // 组件是否显示
    isShow: { type: Boolean, default: true },
    // 传入值
    code: { type: String, default: '' },
    // 传入文本
    text: { type: String, default: '' },
    // 单选多选
    isMul: { type: Boolean, default: false },
    // 控件label名称
    labelName: { type: String, default: '' },
    // 组件类型标识（用于标识不同组件，每个视图中唯一）(预留)
    comType: { type: String, default: '' },
    // 组件传值字段名称（与code对象绑定的字段名称，即视图中：formField对应的字段名称）
    // 如：视图中配置：code="formField.carBrandCode"，则codeField="carBrandCode"
    codeField: { type: String, default: '' },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: { type: String, default: '' },
    // 对应弹窗的key
    popupsKey: { type: String, default: '' },
    // 是否不可用
    disabled: { type: Boolean, default: false },
    // 是否不可用
    readonly: { type: Boolean, default: false },
    // 是否不填/选
    isRequire: { type: Boolean, default: false },
    // 是否可清除选项
    clearable: { type: Boolean, default: true },
    // 是否可过滤选项
    filterable: { type: Boolean, default: false },
    // 下拉选项
    options: { type: Array, default: function() { return [] } },
    // 传入绑定值/文本字段名称，格式：值字段名称,文本字段名称，如：carBrandCode,carBrandCn
    oFields: { type: String, default: '' },
    // 其它返回字段（以“,”隔开，以“-”分别区分组件中字段名与网格字段，多个请使用“|”进行分隔）
    // 格式如：carBrandCode-jzCarBrandCode|carBrandCn-jzCarBrandCn
    otherField: { type: String, default: '' },
    // 字段格式（type=show或value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2
    // 监听组件显示：show:监听字段(父组件formField的对应字段)-显示组件值-隐藏组件值
    parentFileds: { type: String, default: '' },
    // 下拉框中必须的查询条件字段，设置后只有listQuery中对应该字段有值才会进行查询，如：mustField="carBrandCode"
    // 如：
    // 格式如：字段1|字段2
    mustFields: { type: String, default: '' },
    // 网格中使用组件联动，传入网格row数据对象
    curTableRow: { type: Object, default: null },
    // 本组件-row对象对应字段集合：本组件字段1-row对象字段1|本组件字段2-row对象字段2
    rowFileds: { type: String, default: '' },
    // 是否网格中组件
    isColComp: { type: Boolean, default: false },
    // 表单校验规则
    validrule: { type: Object, default: () => { } },
    // 是否异步加载数据（只用于网格中组件，即：isColComp=true时）
    isAsync: { type: Boolean, default: false },
    // 是否使用默认值（如果有，如品牌弹窗）
    isUseDefault: { type: Boolean, default: false },
    // 是否主机厂级别
    isHost: { type: Boolean, default: false },
    // 查询时去掉不用的查询条件
    unListQuryFields: { type: String, default: '' },
    // 数据传输对象
    // 当前已使用：
    // importUrl: 导入url
    // pageSize: 每页显示
    // placeholder：空选择项文本（默认为：请选择）
    // allOption：全选对象
    dataToObject: { type: Object, default: () => { } },
    // API风格
    dynamicApiStyle: { type: String, default: function() { return this.$config.apiStyle } }
  },
  data() {
    return {
      curLabelName: this.labelName,
      // 绑定传入值并同步界面数据
      modelCode: this.isMul === true ? (this.code !== '' && this.code ? this.code.split(',') : []) : this.code || '',
      // 绑定传入文本并同步界面数据
      modelText: this.isMul === true ? (this.text !== '' && this.text ? this.text.split(',') : []) : this.text || '',
      // 下拉选项数据
      optionDatas: this.options || [],
      // 下拉查询条件
      listQuery: {
        isEnable: '1'
      },
      // 下拉查询条件备份
      backListQuery: null,
      // API配置对象
      apiConfig: null,
      // 表格中台返回网格的字段
      apiQueryRow: [],
      // 组件Key
      fullComponentKey: '',
      // 组件是否显示
      curIsShow: this.isShow,
      // 绑定数据对象字段（两个值：[val,txt]）
      optionFields: (this.oFields && this.oFields.indexOf(',') > -1) ? this.oFields.split(',') : [],
      // 是否加载数据完成
      isLoadedData: false,
      // 当前请求版本（防止并发）
      requestVer: 0,
      // 是否使用强制缓存
      useCache: false,
      curDisabled: this.disabled
    }
  },
  // 监听传入参数变化
  watch: {
    code(curVal, oldVal) {
      // 判断是否先判断code是否存在
      // if (curVal != oldVal) { this.checkOptionValue(this) }
      this.setModelCode(curVal)
    },
    curTableRow: {
      handler(newValue, oldValue) {
        // 网格中组件刷新
        if (this.isColComp === true) {
          var tmpNew = {}
          var tmpOld = {}
          for (var key in this.listQuery) {
            if (newValue.hasOwnProperty(key)) {
              tmpNew[key] = newValue[key]
            }
            if (oldValue.hasOwnProperty(key)) {
              tmpOld[key] = oldValue[key]
            }
          }
          // 设置网格中组件查询字段（如果当前组件存在于网格中）
          this.$utils.setRowQueryFields(this, 'listQuery')

          if (this.isAsync !== true) {
            // 非异步加载数据（同步）
            if (this.apiConfig !== null &&
              JSON.stringify(tmpNew) !== JSON.stringify(tmpOld)) {
              this.queryTable(this.apiConfig, this.apiQueryRow)
            }
          } else {
            // 防止回传参数触发赋值事件
            if (JSON.stringify(this.listQuery) !== JSON.stringify(this.backListQuery)) {
              this.optionDatas = this.options || []
              if (this.optionDatas.length === 0) {
                this.setDefaultOpiton()
              }
            }
          }
        }
      },
      deep: true
    },
    // 传入需校验数据
    modelCode(curVal, oldVal) {
      if (this.isRequire) {
        this.$utils.validataMoth(this, 'dropdownMixins')
      }
      true
    },
    options(curVal) {
      this.optionDatas = curVal
    },
    isShow(val) {
      this.curIsShow = val
    },
    disabled(val) {
      this.curDisabled = val
    }
  },
  created() {
    // 初始化数据
    if (this.apiConfig !== null && this.apiQueryRow.length > 0 && this.optionDatas.length === 0 && this.lookuptype !== '_is_null_code_') {
      // 设置网格中组件查询字段（如果当前组件存在于网格中）
      this.$utils.setRowQueryFields(this, 'listQuery')

      if (this.setQueryFields() !== true) {
        // 设置组件间联动值后执行
        if (this.isAsync !== true) {
          // 非异步加载数据（同步）
          this.queryTable(this.apiConfig, this.apiQueryRow)
        } else {
          // 异步加载数据
          this.setDefaultOpiton()
        }
      }
    }
  },
  methods: {
    // 定义空方法，用于获取下拉框数据（这里需要每个组件实现这个方法）
    // 查询方法（apiConfig:api配置对象，apiQueryRow:表格中台返回网格的字段）
    queryTable(apiConfig, apiQueryRow, cb) {
      // 设置查询条件备份
      this.backListQuery = JSON.parse(JSON.stringify(this.listQuery))
      // 判断必须查询条件字段
      if (this.mustFields && this.mustFields !== null) {
        this.clearCode(true)
        const arrFields = this.mustFields.split('|')
        for (var i in arrFields) {
          if (!this.listQuery[arrFields[i]] || this.listQuery[arrFields[i]] === '') {
            this.optionDatas = []
            if (typeof cb === 'function') {
              cb.call(this, false)
            }
            return
          }
        }
      }

      const curListQuery = JSON.parse(JSON.stringify(this.listQuery))
      var unListQuryFieldList = this.unListQuryFields.split(',')
      for (var k in unListQuryFieldList) {
        if (curListQuery[unListQuryFieldList[k]]) {
          delete curListQuery[unListQuryFieldList[k]]
        }
      }

      const queryObj = this.$utils.getInputParam(curListQuery, apiConfig, 500, 1, this.listQuery, apiQueryRow, this.dynamicApiStyle)
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj, null, this.dynamicApiStyle)
      let tmpOptions = []
      // 检查查询结果已经存在且未过期
      if (this.useCache === true || (this.isColComp === true && this.$OrgCacheData.CacheObject.useCache)) {
        tmpOptions = this.$OrgCacheData.CacheObject.getData(queryObj, queryObj.apiConfig.ServiceCode) || []
      }
      if (tmpOptions.length === 0) {
        // 设置请求版本
        this.requestVer++
        const curVer = this.requestVer
        // 不存在则请求中台API数据
        // 调用中台API方法（可复用）
        this.$requestAPI(paramD, this.dynamicApiStyle).then(response => {
          if (curVer === this.requestVer) {
            this.isLoadedData = true

            // 返回json
            if (this.dynamicApiStyle === 'restful') {
              this.handleResponseRestful(response, queryObj)
            } else {
              this.handleResponseGraphql(response, queryObj)
            }

            // 判断code是否存在查询结果中
            this.checkOptionValue(this)
          }
          if (typeof cb === 'function') {
            cb.call(this, true)
          }
        }).catch(err => {
          console.info(err)
          if (typeof cb === 'function') {
            cb.call(this, false)
          }
        })
      } else {
        this.optionDatas = this.$utils.changeToOneDeepArray(tmpOptions)
        this.isLoadedData = true

        // 判断code是否存在查询结果中
        this.checkOptionValue(this)
        if (typeof cb === 'function') {
          cb.call(this, false)
        }
      }
    },
    // 处理返回请求（Restful风格）
    handleResponseRestful(response, queryObj) {
      if (response.result === '1' && response.rows) {
        this.optionDatas = this.$utils.changeToOneDeepArray(response.rows)
        if (response.rows.length > 0 && this.dataToObject && this.dataToObject.allOption) {
          this.optionDatas.unshift(this.dataToObject.allOption)
        }
        // 赋值缓存
        if (this.useCache === true || (this.isColComp === true && this.$OrgCacheData.CacheObject.useCache)) {
          this.$OrgCacheData.CacheObject.setData(queryObj, queryObj.apiConfig.ServiceCode, response.rows)
        }
      }
    },
    // 处理返回请求（Graphql风格）
    handleResponseGraphql(response, queryObj) {
      if (response.data[queryObj.apiConfig.ServiceCode].result === '1' && response.data[queryObj.apiConfig.ServiceCode].rows) {
        this.optionDatas = this.$utils.changeToOneDeepArray(response.data[queryObj.apiConfig.ServiceCode].rows)
        if (response.data[queryObj.apiConfig.ServiceCode].rows.length > 0 && this.dataToObject && this.dataToObject.allOption) {
          this.optionDatas.unshift(this.dataToObject.allOption)
        }
        // 赋值缓存
        if (this.useCache === true || (this.isColComp === true && this.$OrgCacheData.CacheObject.useCache)) {
          this.$OrgCacheData.CacheObject.setData(queryObj, queryObj.apiConfig.ServiceCode, response.data[queryObj.apiConfig.ServiceCode].rows)
        }
      }
    },
    // 赋值下拉框（modelCode）
    setModelCode(curVal) {
      const tmpVal = curVal || ''
      const tmpTxt = this.text || ''
      this.modelCode = this.isMul === true ? (tmpVal !== '' ? tmpVal.split(',') : []) : tmpVal || ''
      this.modelText = this.isMul === true ? (tmpTxt !== '' ? tmpTxt.split(',') : []) : tmpTxt || ''
    },
    // 判断code是否存在于查询结果中
    checkOptionValue(self) {
      // 如果传入的的code不存在于查询结果中则清空
      if (self.code && self.code !== '' && self.optionDatas.length > 0) {
        let codeField = self.codeField
        if (self.optionFields && self.optionFields.length > 0) {
          codeField = self.optionFields[0]
        } else if (self.defOptionFields && self.defOptionFields.length > 0) {
          codeField = self.defOptionFields[0]
        }
        let tmpDatas = []
        if (self.isMul === true) {
          tmpDatas = self.optionDatas.filter(o => o[codeField] !== undefined && self.modelCode.indexOf(o[codeField]) > -1)
        } else {
          tmpDatas = self.optionDatas.filter(o => o[codeField] !== undefined && o[codeField] === self.code)
        }
        if (tmpDatas.length === 0) {
          self.clearCode(true)
        } else {
          self.setModelCode(self.code)
        }
      }
    },
    // 把变更值传出
    sendCode() {
      if (this.modelCode === null) {
        this.modelCode = this.isMul === false ? '' : []
      }
      var code = this.isMul === false ? this.modelCode : this.modelCode.join(',')
      var text = ''
      if (code === null || code === undefined) {
        code = ''
      }
      let selectData = []
      let valField = ''
      let txtField = ''
      // 返回值、文本 优先读取optionFields/defOptionFields，再读取codeField/textField
      if (this.optionFields.length > 1) {
        valField = this.optionFields[0]
        txtField = this.optionFields[1]
      } else if (this.defOptionFields && this.defOptionFields.length > 1) {
        valField = this.defOptionFields[0]
        txtField = this.defOptionFields[1]
      }
      if (valField === '') {
        valField = this.codeField
        txtField = this.textField
      }
      // 返回otherField
      if (valField !== '' && txtField !== '') {
        var arr = this.isMul === false ? code.split(',') : code
        selectData = this.optionDatas.filter(o => arr.indexOf(o[valField]) > -1)
        if (selectData && selectData.length > 0) {
          for (var i = 0; i < selectData.length; i++) {
            text += selectData[i][txtField]
            if (i < selectData.length - 1) {
              text += ','
            }
          }
        }
      }
      this.$emit('changeCode', code, text, this.codeField, this.comType, this.popupsKey, this.textField, this.otherField, selectData)
    },
    // 清除
    // isSend：是否回传值（默认true回传）
    clearCode(isSend) {
      this.modelCode = this.isMul === false ? '' : []
      this.modelText = this.isMul === false ? '' : []
      if (isSend !== false) {
        this.sendCode()
      }
    },
    // 组件接收从父页面传的值
    // 返回：是否已执行重新查询
    // 父组件字段对应的对象（如：formField）
    setQueryFields(obj, formObjName) {
      const that = this
      return that.$utils.setQueryFields(that, obj, 'listQuery', function() {
        // 查询条件不变不需要清除选择数据
        if (that.backListQuery !== null && JSON.stringify(that.backListQuery) !== JSON.stringify(that.listQuery)) {
          that.clearCode(false)
        }
        that.queryTable(that.apiConfig, that.apiQueryRow)
      }, formObjName)
    },
    // 设置组件常量值
    setConstValue(field, value) {
      const that = this
      if (that.listQuery && that.listQuery.hasOwnProperty(field) && that.listQuery[field] !== value) {
        that.listQuery[field] = value
        if (this.isAsync !== true) {
          that.queryTable(that.apiConfig, that.apiQueryRow)
        }
      }
    },
    // 设置组件是否显示
    setIsShow(isShow) {
      this.curIsShow = isShow
      this.fullComponentKey = 'input' + this.$utils.generateId()
    },
    // 设置组件的赋值字段
    setCopy(copyCode) {
      this.modelCode = copyCode
      this.fullComponentKey = 'input' + this.$utils.generateId()
    },
    // 下拉层展示控制（v=true：显示）
    visibleChange(v) {
      // 网格中组件在异步加载数据时执行下拉层事件加载数据
      if (v === true && this.isAsync === true && this.optionDatas.length <= 1) {
        const backPlaceholder = this.placeholder
        if (this.placeholder) {
          this.placeholder = '加载中...'
        }
        this.queryTable(this.apiConfig, this.apiQueryRow, function(succ) {
          if (this.placeholder) {
            this.placeholder = backPlaceholder
          }
        })
      }
    },
    // 设置默认选项（一般用于网格中，默认不加载请求，把ID、Name作为option显示）
    // 参考：components/ve/wareHouseMulti/wareHouseMulti
    setDefaultOpiton() {
      // 需要text有值
      if (this.text && this.text !== '') {
        const arrOption = []
        // 只有oFields有传入值，或有设置defOptionFields才能设定默认选项
        if (this.optionFields.length > 1 || (this.defOptionFields && this.defOptionFields.length > 1)) {
          const valField = this.optionFields.length > 1 ? this.optionFields[0] : this.defOptionFields[0]
          const txtField = this.optionFields.length > 1 ? this.optionFields[1] : this.defOptionFields[1]
          if (this.isMul === false) {
            const option = {}
            option[valField] = this.modelCode
            option[txtField] = this.modelText
            arrOption.push(option)
          } else {
            for (let oi = 0; oi < this.modelCode.length; oi++) {
              const option = {}
              option[valField] = this.modelCode[oi]
              option[txtField] = this.modelText[oi]
              arrOption.push(option)
            }
          }
        }
        this.optionDatas = arrOption
      }
    }
  }
}
