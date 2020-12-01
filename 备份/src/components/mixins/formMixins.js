// 表单混入对象
// 使用场景：普通表单页面（只包含输入条件组件的页面（例如不包含网格））
export const formMixins = {
  props: {
    // 弹出是否显示
    popupsVisible: { type: Boolean, default: false },
    // 动态按钮
    dynamicButtons: { type: Array, default: function () { return [] } },
    // 动态组件
    dynamicComponents: { type: Array, default: function () { return [] } },
    // 动态查询条件对象
    dynamicFormFields: { type: Object, default: function () { return {} } },
    // 动态API配置
    dynamicApiConfig: { type: Object, default: function () { return {} } },
    // 控件label名称
    labelName: { type: String, default: '' },
    // 弹窗状态（add/edit/view）
    popupsState: '',
    // 标题（根据弹窗状态显示文本）
    dynamicTextMap: { type: Object, default: function () { return {} } },
    // 从网格传入的编辑行数据(json)
    dynamicEditRowData: { type: Object, default: function () { return {} } },
    // 是否设置默认品牌
    isSetDefaultBrand: { type: Boolean, default: true },
    // API风格
    dynamicApiStyle: { type: String, default: function() { return this.$config.apiStyle } }
  },
  data() {
    return {
      // 弹出是否显示
      curPopupsVisible: this.popupsVisible,
      // 控件label名称
      curLabelName: this.labelName,
      // API配置对象
      apiConfig: this.dynamicApiConfig,
      // 组件控件
      tableComponents: this.dynamicComponents,
      // 按钮控件
      tableButtons: this.dynamicButtons,
      // 表单查询数据
      formField: this.dynamicFormFields,
      // 表单查询数据备份对象（用于重置
      backFormField: {},
      // 标题（根据弹窗状态显示文本）
      textMap: this.dynamicTextMap,
      // 是否使用网格数据赋值formField
      isUseRowData: true,
      // 从网格传入的编辑行数据(json) 直接使用 dynamicEditRowData
      // editRowData: this.dynamicEditRowData,
      // 判断全部必填是否已完成
      valid: true,
      // 必填项查询组件
      validateValue: [],
      // 弹窗网格KEY
      popupsTableKey: 'popupsTableKey',
      // 弹窗页面标识（由引用页面赋值）
      popupsPageCode: '',
      // 初始化formField
      initFormField: null,
      // 是否不可编辑
      isNoEdit: false,
      // 是否已经进行watch设置
      hasSetWatch: false,
      // 是否已经执行过updated（用于标识设置常量值）
      isSetValUpdated: false,
      // 暂无数据提示
      emptyText: this.$t('sys.content.emptyData'),
      // 首个focus组件
      comFocus: {},
      // 是否初始化赋值
      isInitBind: true
    }
  },
  watch: {
    // 监听弹窗显示
    popupsVisible(val) {
      this.curPopupsVisible = val
      if (val === true) {
        this.execCreated()
        // 可编辑状态设置
        if (this.popupsState === 'edit') {
          this.isNoEdit = true
        } else {
          this.isNoEdit = false
        }
        this.setDisable()
        this.execAfterVisable()
      }
      if (!val) {
        this.emptyFormField()
        this.$utils.resetMulComp(this)
        // this.watchComp(true)
      }
    }
  },
  created() {
    this.execCreated()
    this.setDisable()
  },
  // 更新后操作
  updated() {
    if (this.isSetValUpdated === false) {
      // 设置常量
      this.setConstValue()
    }
  },
  methods: {
    // 创建事件
    execCreated() {
      if (this.initFormField === null) {
        this.initFormField = JSON.parse(JSON.stringify(this.formField))
      }
      this.isInitBind = true
      var that = this
      if (that.tableComponents && that.tableComponents.length === 0) {
        if (that.popupsPageCode && that.popupsPageCode.length > 0) {
          // 读取弹窗配置信息
          that.$ConfigCache.CacheConfig.initData(that.popupsPageCode, function () {
            if (that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode] && that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].formComponents.length > 0) {
              that.tableComponents = that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].formComponents
              // 赋值formField
              that.$utils.getFormField(that, that.formField, that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode], null, 'formComponents', false)
            } else {
              that.tableComponents = that.staticTableComponents
            }
            that.popupsTableKey = that.$utils.generateId()
            that.toWatch()
          }, null, that)
        } else {
          that.tableComponents = that.staticTableComponents
          that.toWatch()
        }
      } else {
        that.toWatch()
      }
      this.isInitBind = false
    },
    // 将formField赋值和watchComp抽出来
    toWatch() {
      // 赋值formField
      if (this.popupsState === 'edit') {
        if (this.isUseRowData) {
          for (var key in this.formField) {
            if (this.dynamicEditRowData[key] !== undefined && this.dynamicEditRowData[key] !== null) {
              this.formField[key] = this.dynamicEditRowData[key]
            } else if (key.indexOf(',') > -1) {
              // 双日期处理
              var keyArr = key.split(',')
              this.formField[key] = this.dynamicEditRowData[keyArr[0]] + ',' + this.dynamicEditRowData[keyArr[1]]
            } else {
              if (this.initFormField[key]) {
                this.formField[key] = this.initFormField[key]
              } else {
                if (typeof this.formField[key] === 'number') {
                  this.formField[key] = 0
                } else if (typeof this.formField[key] === 'string') {
                  this.formField[key] = ''
                }
              }

              // 两层处理
              for (var rKey in this.dynamicEditRowData) {
                if (rKey.indexOf('.') > -1) {
                  var tmpKey = rKey.split('.')[1]
                  if (tmpKey === key) {
                    this.formField[tmpKey] = this.dynamicEditRowData[rKey]
                    break
                  }
                }
              }
            }
          }
        }
        this.onEdit()
      } else {
        this.emptyFormField()
      }

      this.onCreated()

      // 备份fromField（用于重置）
      // 初始化品牌
      if (this.formField.carBrandCode === '' && this.isSetDefaultBrand === true) {
        this.formField.carBrandCode = this.$store.getters.orgInfo.BRAND_CODE
      }
      this.backFormField = JSON.parse(JSON.stringify(this.formField))

      // 联动组件获取父组件传值
      const that = this
      if (this.hasSetWatch === false) {
        this.hasSetWatch = true
        that.$nextTick(() => {
          // 监听
          that.watchComp(true)
          that.$utils.setIsShow(that)
        })
      }
    },
    // 其它初始化
    onCreated() { },
    // 编辑是执行
    onEdit() { },
    // 初始化formField
    emptyFormField() {
      this.$utils.deepClone(this.formField, this.initFormField)
    },
    // 重置
    reset() {
      // this.formField = JSON.parse(JSON.stringify(this.backFormField))
      this.$utils.deepClone(this.formField, this.backFormField)
    },
    // 关闭
    close(type) {
      this.sendCode(type)
    },
    // 是否新增
    isAdd() {
      return this.popupsState === '' || this.popupsState === 'add'
    },
    // 保存空方法（请在页面上替换此方法）
    save(saveObj, cb) {
      // validpopup  弹窗  validpage 页面
      this.$utils.validataMoth(this, 'validpopup')
      if (this.valid) {
        this.saveForm(saveObj, cb)
      } else {
        if (typeof cb === 'function') {
          cb.call(0)
        }
      }
    },
    // tableComponents 循环pageArea 分组
    getPageArea() {
      // 分组操作
      const arrPageArea = []
      if (this.tableComponents.filter(o => o.pageArea && o.pageArea !== '').length > 0) {
        for (let i = 0; i < this.tableComponents.length; i++) {
          if (this.tableComponents[i].pageArea) {
            // 有pageArea的情况
            if (arrPageArea.filter(o => o.pageArea === this.tableComponents[i].pageArea).length <= 0) {
              arrPageArea.push({ pageArea: this.tableComponents[i].pageArea })
            }
          } else {
            // 没有pageArea的情况
            this.tableComponents[i].pageArea = '其它信息'
            arrPageArea.push({ pageArea: this.tableComponents[i].pageArea })
          }
        }
        for (let j = 0; j < arrPageArea.length; j++) {
          if (arrPageArea[j].pageArea === '其它信息') {
            arrPageArea.splice(j, 1)
            const a = {}
            a.pageArea = '其它信息'
            arrPageArea.push(a)
          }
        }
      } else {
        arrPageArea.push({ pageArea: '' })
      }
      return arrPageArea
    },
    // 保存表单
    saveForm(saveObj, cb) {
      const queryObj = {
        // 保存mutation
        type: 'mutation',
        // api配置
        apiConfig: this.apiConfig,
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: this.dynamicApiStyle !== 'restful' ? {
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: saveObj || this.formField
        } : (saveObj || this.formField)
      }
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj, null, this.dynamicApiStyle)
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD, this.dynamicApiStyle).then(response => {
        // 返回json
        let resObj
        if (this.dynamicApiStyle !== 'restful') {
          resObj = response.data[queryObj.apiConfig.ServiceCode]
        } else {
          resObj = response
        }
        if (resObj.result === '1') {
          // 保存成功
          this.sendCode('1')
          this.$message({
            message: '保存成功',
            type: 'success',
            uration: 2000
          })
        } else {
          // 保存失败
          this.$message({
            message: resObj.msg,
            type: 'warn',
            uration: 2000
          })
        }
        if (typeof cb === 'function') {
          cb.call(1)
        }
      }).catch((err) => {
        console.info(err)
        if (typeof cb === 'function') {
          cb.call(0)
        }
      })
    },
    // 关闭弹窗（type=1，保存成功）
    sendCode(type) {
      // this.editRowData = {}
      // this.emptyFormField()
      this.$emit('close', type)
    },
    // 关闭弹窗（弹窗时）
    // 不回传数据
    closeCode() {
      this.$emit('changeCode', null, null, null, null, null, null, null, null, false)
    },
    // 获取组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:组件类型（预留）
    getComponentCode(val, txt, codeField, comType, popupsKey, textField, otherField, selectData) {
      if (comType === 'propus' && !this.$utils.isEmpty(popupsKey)) {
        // 弹窗赋值
        // 根据popupsKey找到对应的弹窗key的弹窗组件
        var dynamicPopup = this.dynamicComponents.filter(o => o.compKey === popupsKey)
        if (dynamicPopup.length > 0) {
          if (dynamicPopup[0].popups && dynamicPopup[0].popups.state) {
            // 弹窗状态不是为已打开才进行计算
            dynamicPopup[0].popups.state = false
            dynamicPopup[0].popups.key = codeField + this.$utils.generateId()
          }
        }
      }

      // 赋值
      if (codeField.indexOf(',') > -1 && (val === '' || (val.indexOf(',') > -1 && codeField.split(',').length === val.split(',').length))) {
        // 双日期处理
        const arrCoodField = codeField.split(',')
        const arrVal = val.split(',')
        for (let i = 0; i < arrCoodField.length; i++) {
          // 双日期不许判断是否存在
          this.formField[arrCoodField[i]] = val === '' ? '' : arrVal[i]
        }
      } else {
        if (codeField in this.formField) {
          this.formField[codeField] = val
        }
      }
      if (textField in this.formField) {
        this.formField[textField] = txt
      }
      // 赋值其它
      this.setOtherField(comType, otherField, selectData)
    },
    // 其它选中对象（表单中）返回值
    setOtherField(comType, otherField, selectData) {
      if (otherField && otherField !== '' && selectData && selectData.constructor === Array) {
        var arrOtherField = otherField.split(',')
        for (var i = 0; i < arrOtherField.length; i++) {
          var arrOtherFieldVal = arrOtherField[i].split('-')
          if (arrOtherFieldVal.length === 1) arrOtherFieldVal.push(arrOtherFieldVal[0])
          if (this.formField.hasOwnProperty(arrOtherFieldVal[1])) {
            var strOtherCode = ''
            for (var j = 0; j < selectData.length; j++) {
              if (selectData[j] && selectData[j].hasOwnProperty(arrOtherFieldVal[0])) {
                // 读取组件中字段值
                strOtherCode += selectData[j][arrOtherFieldVal[0]] + ','
              }
            }
            if (strOtherCode !== '') {
              strOtherCode = strOtherCode.substring(0, strOtherCode.length - 1)
            }
            // 赋值网格字段
            this.formField[arrOtherFieldVal[1]] = strOtherCode
          }
        }
      }
    },
    // 获取focus事件传回值
    // val:值, codeField:绑定popupsState的字段名称, comType:组件类型（预留）
    getFocusCode(val, txt, codeField, comType, popupsKey) {
      // 只有popupsField和popupsKey都有传值才进行计算弹窗是否显示
      if (!this.$utils.isEmpty(codeField) && !this.$utils.isEmpty(popupsKey)) {
        // 根据popupsKey找到对应的弹窗key的弹窗组件
        var dynamicPopup = this.dynamicComponents.filter(o => o.compKey === popupsKey)
        if (dynamicPopup.length > 0) {
          if (dynamicPopup[0].popups && !dynamicPopup[0].popups.state) {
            // 弹窗状态不是为已打开才进行计算
            dynamicPopup[0].popups.state = true
            dynamicPopup[0].popups.key = codeField + this.$utils.generateId()
          }
        }
      }
    },
    // 联动组件获取父组件传值
    // isDialog:是否对话框内容（预留）
    // 监听parentFileds字段格式（type=show|value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(父组件)1-对应子组件字段1|监听字段(父组件)2-对应子组件字段2
    // 监听组件显示：show:监听字段(父组件)-显示组件值-隐藏组件值
    watchComp(isDialog) {
      var that = this
      that.$utils.watchComp(that, isDialog, null, true)
    },
    // 设置组件不可编辑
    // 读取parentFileds属性配置中的disabled
    // 监听parentFileds字段格式（disabled：设置组件不可编辑）：
    // 如：
    // 设置组件不可编辑：disabled:监听字段（监听空值）-需要对tableComponents中进行设置disabled的codeField-类型（监听字段为空时赋值给disabled值类型（true/false），默认空表示false）
    // 注意：必须设置disabled，如：disabled=null, parentFileds="disabled:carBrandCode-carBrandCode-false"
    setDisable(compObjName, isExecOther) {
      var that = this
      that.$utils.setDisable(that, compObjName, isExecOther)
    },
    // 弹窗显示后执行
    execAfterVisable() {},
    // 设置组件不可编辑的其它设置（譬如：循环设置等）
    // 此方法为空方法，有需要的可以在页面/表单上自行覆盖重写
    otherSetDisable(that, compObjName) { },
    // 设置常量值
    setConstValue() {
      const that = this
      that.$utils.setConstValue(that, 'tableComponents', function (succ) {
        that.isSetValUpdated = succ
      })
    },
    receiveEvent(clickEvent) {
      if (clickEvent === null || clickEvent === undefined) {
        console.info('empty event')
      } else {
        clickEvent.call()
      }
    },
    // 设置el-tabs的网格自适应高度
    setTabsTableHeight(tab, event) {
      if (tab && tab.$children && tab.$children.length > 0 && tab.$children[0].setTableHeight) {
        tab.$children[0].setTableHeight()
      }
    }
  }
}
