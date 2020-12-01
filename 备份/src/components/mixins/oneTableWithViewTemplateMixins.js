// 单网格视图/弹窗（含嵌套视图模板）混入对象
// 使用场景：使用单网格模板，适用于普通单网格页面（按钮、查询条件、网格）和类似风格的弹窗，需要跟模板进行传值
export const oneTableWithViewTemplateMixins = {
  props: {
    // 弹出是否显示
    popupsVisible: { type: Boolean, default: false },
    // 行内占比
    span: { type: Number, default: 6 },
    // 是否显示标签
    isShowLabel: { type: Boolean, default: true },
    isFunc: { type: Boolean, default: false },
    // 默认选中（值）
    code: { type: String, default: '' },
    // 默认选中（文本）
    text: { type: String, default: '' },
    // 控件label名称
    labelName: { type: String, default: '' },
    // 单选多选
    isMul: { type: Boolean, default: true },
    // 组件类型标识（用于标识不同组件，每个视图中唯一）(预留)
    comType: { type: String, default: '' },
    // 字段格式（type=show或value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2
    // 监听组件显示：show:监听字段(父组件formField的对应字段)-显示组件值-隐藏组件值
    parentFileds: { type: String, default: '' },
    // 本组件-row对象对应字段集合：本组件字段1-row对象字段1|本组件字段2-row对象字段2
    rowFileds: { type: String, default: '' },
    // 组件传值字段名称（与code对象绑定的字段名称，即视图中：formField对应的字段名称）
    // 如：视图中配置：code="formField.carBrandCode"，则codeField="carBrandCode"
    codeField: { type: String, default: '' },
    textField: { type: String, default: '' },
    // 弹窗状态（add/edit/view）
    popupsState: '',
    // 对应弹窗的key
    popupsKey: { type: String, default: '' },
    // 返回code字段（从弹窗返回的code字段），用于sendCode()中，优先级高于sendCode参数
    returnCodeField: { type: String, default: '' },
    // 返回text字段（从弹窗返回的text字段），用于sendCode()中，优先级高于sendCode参数
    returnTextField: { type: String, default: '' },
    // 其它返回字段（以“,”隔开，以“-”分别区分组件中字段名与网格字段）
    otherField: { type: String, default: '' },
    // 网格显示条数
    dynamicPageSize: { type: Number, default: function() { return this.$config.defaultPageSize } },
    // 分页数组
    pageSizeArray: { type: Array, default: () => [10, 15, 20, 30] },
    // 是否显示分页
    isShowPagination: { type: Boolean, default: true }
  },
  data() {
    return {
      // 弹出是否显示
      curPopupsVisible: this.popupsVisible,
      ss: this.span,
      // 控件label名称
      curLabelName: this.labelName,
      curisFunc: this.isFunc,
      // 绑定传入值并同步界面数据（值）
      modelCode: this.isMul === true ? (this.code !== '' ? this.code.split(',') : []) : this.code || '',
      // 绑定传入值并同步界面数据（文本）
      modelText: this.isMul === true ? (this.text !== '' ? this.text.split(',') : []) : this.code || '',
      // 新增、编辑弹窗状态
      editPopupsVisible: false,
      // 新增、编辑弹窗Key
      editPopupsKey: '',
      // 网格Key
      oneTableKey: 'oneTableKey',
      // 新增、编辑弹窗状态（add/edit/view）
      editPopupsState: '',
      // 新增、编辑行对象
      editRowData: {},
      // 判断全部必填是否已完成
      valid: true,
      // 必填项查询组件
      validateValue: [],
      // 定义弹窗组件
      modalData: {
      },
      // 弹窗网格KEY
      popupsTableKey: 'popupsTableKey',
      // 弹窗页面标识（由引用页面赋值）
      popupsPageCode: '',
      // 网格刷新标识
      refreshTableKey: '',
      // 双击列表选中参数
      handleTableRowData: {
        value: '',
        text: ''
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: true,
      // 字段格式化转换，用于导出excel（如需使用请在页面上覆盖）
      exportConverts: {},
      // 是否已经执行watch
      hasWatched: false,
      // 网格ref名称
      tableRef: 'multipleTable',
      // 初始表单查询数据
      initFormField: null,
      // 空字符时显示，默认“暂无数据”
      emptyText: this.$t('sys.content.emptyData'),
      // 首个focus组件
      comFocus: {},
      // 分页组件高度（用于统一定义不在模板中使用分页组件时计算高度）
      pageCompHeight: 30
    }
  },
  watch: {
    // 监听弹窗显示
    popupsVisible(val) {
      this.curPopupsVisible = val
      if (val === true) {
        this.execCreated()
      } else if (!val) {
        this.$utils.deepClone(this.formField, this.initFormField)
      }
    }
  },
  created() {
    this.execCreated()
  },
  methods: {
    // 创建事件
    execCreated() {
      var that = this
      if (that.initFormField === null && that.formField) {
        that.initFormField = JSON.parse(JSON.stringify(that.formField))
      }

      // 从静态配置信息中读取到配置信息
      if ((that.tableCols && that.tableCols.length === 0) && (that.tableComponents && that.tableComponents.length === 0)) {
        if (that.popupsPageCode && that.popupsPageCode.length > 0) {
          // 读取弹窗配置信息
          that.$ConfigCache.CacheConfig.initData(that.popupsPageCode, function () {
            if (that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode] && that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].tableComponents.length > 0) {
              that.tableComponents = that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].tableComponents
              // 赋值formField
              that.$utils.getFormField(that, that.formField, that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode], null, 'tableComponents', false)
            } else {
              that.tableComponents = that.staticTableComponents
            }
            if (that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode] && that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].tableCols.length > 0) {
              that.tableCols = that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].tableCols
            } else {
              that.tableCols = that.staticTableCols
            }
            if (that.staticTableCols || that.staticTableComponents) {
              const cacheInfo = that.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode]
              if (!cacheInfo || (cacheInfo.tableComponentsAll.length === 0 && cacheInfo.tableColsAll.length === 0)) {
                // debugger
                // that.$ConfigCache.CacheConfig.commitData(that)
              }
            }
            that.popupsTableKey = that.$utils.generateId()
          }, null, that)
        } else {
          that.tableComponents = that.staticTableComponents
          that.tableCols = that.staticTableCols
          that.popupsTableKey = that.$utils.generateId()
        }
      }
      // 赋值formField
      if (this.curValueObject && typeof this.curValueObject === 'object') {
        for (var key in this.formField) {
          if (this.curValueObject[key]) {
            this.formField[key] = this.curValueObject[key]
          } else {
            this.formField[key] = that.initFormField.hasOwnProperty(key) ? that.initFormField[key] : ''
          }
        }
      }
      // 联动组件获取父组件传值
      if (that.$refs[this.tableRef]) {
        that.watchComp()
      } else {
        // 弹窗类型不能直接获取到el-dialog下的[this.tableRef的值]，需要等待页面加载完成
        that.$nextTick(() => {
          // 监听
          that.watchComp(true)
        })
      }
      // 设置查询条件不可编辑
      if (this.parentFileds && this.parentFileds.length > 0) {
        that.$utils.setDisableByComp(that, this.parentFileds, that.tableComponents)
      } else if (this.rowFileds && this.rowFileds.length > 0) {
        that.$utils.setDisableByComp(that, this.rowFileds, that.tableComponents)
      }
    },
    // 调用嵌套视图模板方法
    // dto:传输对象，默认为：null，用于数据的传输，如：dto.formField...
    queryTable(page, dataType, size, filterObj, cb, dto) {
      // validpopups 组件弹窗  validpage 表单查询
      this.$utils.validataMoth(this, 'validpage')
      if (this.valid) {
        this.resetKey()
        this.$refs[this.tableRef].queryTable(page, dataType, size, filterObj, cb, dto)
      }
    },
    // 清空弹窗数据
    clearData() {
      this.$refs[this.tableRef].clearData()
    },
    // 重置
    reset() {
      this.$refs[this.tableRef].reset()
    },
    // 是否新增
    isAdd() {
      return this.popupsState === '' || this.popupsState === 'add'
    },
    // 导出
    exportExcel(excelName, excelSheetName, pageSize,obj) {
      this.$refs[this.tableRef].exportExcel(excelName, excelSheetName, pageSize,obj)
    },
    // 关闭新增、编辑弹窗（type=1，保存成功）
    close(type) {
      this.editPopupsVisible = false
      if (this.resetDialogKey === true) {
        this.editPopupsKey = this.$utils.generateId()
      }
      if (type === '1') {
        this.queryTable(1)
      }
    },
    // 新增按钮事件
    add() {
      this.editRowData = {}
      this.showEdit('add')
    },
    // 编辑按钮事件
    edit(index) {
      var curIndex = index
      const that = this.$refs[this.tableRef]
      if (curIndex === undefined || curIndex === null) {
        var currentRow
        if (that.isMul === true) {
          // 多选
          var selectData = that.selection
          if (selectData.length > 0) {
            currentRow = selectData[0]
          }
        } else {
          // 单选
          currentRow = that.currentRow
        }
        if (currentRow) {
          curIndex = currentRow.index
        }
      }

      if (curIndex === undefined || curIndex === null) {
        this.$alert('请选择需要修改的数据', '提示')
        return
      }
      this.editRowData = that.list[curIndex]
      this.showEdit('edit')
    },
    // 显示新增、修改弹窗
    showEdit(type) {
      this.editPopupsState = type
      this.editPopupsVisible = true
      if (this.resetDialogKey === true) {
        this.editPopupsKey = this.$utils.generateId()
      }
    },
    // 同步（syncFields：排序字段（多个以“,”隔开），isSort：是否重新排序）
    synchrony(syncFields) {
      if (this.$refs[this.tableRef].synchrony) {
        this.$refs[this.tableRef].synchrony(syncFields)
      }
    },
    // 发送回传值（弹窗时）
    // arrayCodeField：返回给上级组件的code（优先级低于this.returnCodeField）
    // arrayTextField：返回给上级组件的text（优先级低于this.returnTextField）
    // row：双击时调入行数据（只支持单选）
    sendCode(arrayCodeField, arrayTextField, row, type) {
      // 获取嵌套组件的选中的值
      const that = this.$refs[this.tableRef]
      let selectData = []
      if (this.isMul === true) {
        if(type){
          selectData.push(row)
        }else{
          selectData = that.$refs[that.tableRef].selection
        }

      } else {
        if (row) {
          selectData.push(row)
        } else {
          selectData.push(that.currentRow)
        }
      }
      if (selectData && selectData.length > 0) {
        let tmpCodeField = this.returnCodeField
        if (!tmpCodeField || tmpCodeField === '') {
          tmpCodeField = arrayCodeField
        }
        let tmpTextField = this.returnTextField
        if (!tmpTextField || tmpTextField === '') {
          tmpTextField = arrayTextField
        }
        if(!tmpCodeField && !tmpTextField){
          selectData=[]
        }
        this.modelCode = this.$utils.getArrayFromJsonArray(selectData, tmpCodeField)
        this.modelText = this.$utils.getArrayFromJsonArray(selectData, tmpTextField)
      } else {
        this.modelCode = []
        this.modelText = []
      }

      var code = typeof (this.modelCode) === 'string' ? this.modelCode : this.modelCode.join(',')
      var text = typeof (this.modelText) === 'string' ? this.modelText : this.modelText.join(',')
      this.$emit('changeCode', code, text, this.codeField, this.comType, this.popupsKey, this.textField, this.otherField, selectData)
    },
    // 关闭弹窗（弹窗时）
    // 不回传数据
    closeCode() {
      this.$emit('changeCode', null, null, null, null, null, null, null, null, false)
    },
    // 双击事件
    // arrayCodeField：返回给上级组件的code（优先级低于this.returnCodeField）
    // arrayTextField：返回给上级组件的text（优先级低于this.returnTextField）
    handleTableRowDbClick(row, column, event) {
      if (this.handleTableRowData.value && this.handleTableRowData.value !== '' && this.handleTableRowData.text && this.handleTableRowData.text !== '') {
        this.sendCode(this.handleTableRowData.value, this.handleTableRowData.text, row, 'dbClick')
      }
    },
    // 文本框focus事件
    sendFocusCode() {
      // 获取嵌套组件的选中的值
      const that = this.$refs[this.tableRef]
      let selectData = []
      if (this.isMul === true) {
        selectData = that.$refs[that.tableRef].selection
      } else {
        selectData.push(that.currentRow)
      }
      this.$emit('focusCode', this.modelCode, this.modelText, this.codeField, this.comType, this.popupsKey, this.textField, this.otherField, selectData)
    },
    // 获取（网格中）组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:网格行索引（row.index），textField：只有非propus有效
    getRowComponentCode(val, txt, codeField, comType, popupsKey, textField, otherField, selectData) {
      this.$refs[this.tableRef].getRowComponentCode(val, txt, codeField, comType, popupsKey, textField, otherField, selectData)
    },
    // 动态添加弹窗数据 params1:弹窗名称  params2使用方法位置 params3是否需要获取选择数据
    showModal(modelName, neetData) {
      const that = this.$refs[this.tableRef]
      const selectData = that.$refs[that.tableRef].selection
      if (neetData) {
        if (selectData.length !== 1) {
          that.$message({ 'message': '请选择一条数据', type: 'warning' })
          return false
        }
        this.$set(this.modalData, modelName + 'Data', that.list[selectData[0].index])
        this.$set(this.modalData, modelName + 'Title', 1)
      } else {
        this.$set(this.modalData, modelName + 'Title', 0)
      }
      this.$set(this.modalData, modelName + 'Show', true)
      this.$set(this.modalData, modelName + 'Key', modelName + this.$utils.generateId())
    },
    // 当网格中含有对比显示组件，则需要刷新key（临时方案）
    resetKey() {
      const that = this
      if (that.tableCols) {
        const controlCols = that.tableCols.filter(o => o.prop === 'controlBtn' && o.comps && o.comps.length > 0)
        if (controlCols.length > 0) {
          const compareCols = controlCols[0].comps.filter(o => o.compareField && o.compareField !== null)
          if (compareCols.length > 0) {
            that.oneTableKey = 'oneTableKey' + that.$utils.generateId()
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
      if (that.hasWatched !== true) {
        that.hasWatched = true
        that.$utils.watchComp(that, isDialog, null, null, null, that.tableRef)
        that.$utils.setDisable(that)
      }
    },
    // 选择列checkbox是否生效（默认为true，需要在页面中覆盖此方法）
    getSelectable(row, index) {
      return true
    },
    // 设置el-tabs的网格自适应高度
    setTabsTableHeight(tab, event) {
      if (tab && tab.$children && tab.$children.length > 0 && tab.$children[0].setTableHeight) {
        tab.$children[0].setTableHeight()
      } else {
        this.setTableHeight()
      }
    },
    // 设置网格高度
    setTableHeight() {
      if (this.$refs[this.tableRef] && this.$refs[this.tableRef].setTableHeight) {
        this.$refs[this.tableRef].setTableHeight()
      }
    }
  }
}
