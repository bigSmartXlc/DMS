// 使用场景：左右网格混入模板（左右网格混入模板）
export const twoTableTemplateMixins = {
  props: {
    // 动态按钮
    dynamicButtons: { type: Array, default: function() { return [] } },
    // 动态组件
    dynamicComponents: { type: Array, default: function() { return [] } },
    // 动态网格列
    dynamicTableCols: { type: Array, default: function() { return [] } },
    // 动态查询条件对象
    dynamicFormFields: { type: Object, default: function() { return {} } },
    // 右侧网格对象
    rightTableObject: { type: Object, default: function() { return {} } },
    // 动态网格API配置
    dynamicApiConfig: { type: Object, default: function() { return {} } },
    // 其它高度
    dynamicTableOtherHeight: { type: Number, default: 0 },
    // 是否显示网格选择列
    dynamicIsShowSelect: { type: Boolean, default: false },
    // 是否显示更多按钮
    dynamicIsShowMoreBtn: { type: Boolean, default: true },
    // 是否行拖动
    dynamicIsRowDrop: { type: Boolean, default: false },
    // 选择列是否Fixed
    dynamicIsLeftFixChoose: { type: Boolean, default: true },
    // 序号列是否Fixed
    dynamicIsLeftFixIndex: { type: Boolean, default: true },
    // 选择列是否Fixed
    dynamicIsRightFixChoose: { type: Boolean, default: true },
    // 序号列是否Fixed
    dynamicIsRightFixIndex: { type: Boolean, default: true },
    // 设置菜单栏宽度
    dynamicWidth: { type: Number, default: 0 },
    // 是否初始化左边网格
    dynamicIsInitLeftTable: { type: Boolean, default: false },
    // 是否初始化网格
    dynamicIsInitRightTable: { type: Boolean, default: false },
    // 是否初始化网格
    dynamicIsInitAllTable: { type: Boolean, default: false },
    // 是否初始化网格
    dynamicRightTableNum: { type: Number, default: 10 },
    dynamicIsShowRightPagination: { type: Boolean, default: true },
    dynamicIsShowLeftPagination: { type: Boolean, default: true },
    // 是否显示按钮
    dynamicIsShowbounce: { type: Boolean, default: true },
    // 搜索框数值
    dynamicSvFields: { type: String, default: '' },
    // 右是否显示按钮
    rightdynamicIsShowbounce: { type: Boolean, default: true },
    // 右搜索框数值
    rihgtdynamicSvFields: { type: String, default: '' },
    // 右动态查询条件对象
    rihgtdynamicFormFields: { type: Object, default: function() { return {} } },
    // API风格
    dynamicApiStyle: { type: String, default: function() { return this.$config.apiStyle } }

  },
  data() {
    return {
      // 数据列表
      list: null,
      // 右侧列表
      rightList: [],
      // 加载中
      listLoading: false,
      // 右侧加载中
      rightListLoading: false,
      // 设置网格总共的条数，查询完更改
      pageTotal: 0,
      rightpageTotal: 0,
      // 下拉查询条件
      listQuery: {
        pageIndex: 1,
        pageSize: 10
      },
      // 网格中当前页与每页显示
      listIndex: {
        pageIndex: 1,
        pageSize: 10
      },
      isShowRightPagination: this.dynamicIsShowRightPagination,
      isShowLeftPagination: this.dynamicIsShowLeftPagination,
      rightListQuery: {
        pageIndex: 1,
        pageSize: this.dynamicRightTableNum
      },
      // 右网格中当前页与每页显示
      rightListIndex: {
        pageIndex: 1,
        pageSize: this.dynamicRightTableNum
      },
      isInitLeftTable: this.dynamicIsInitLeftTable,
      isInitRightTable: this.dynamicIsInitRightTable,
      isInitAllTable: this.dynamicIsInitAllTable,
      // 右侧网格api对象
      apiRightTable: this.rightTableObject.apiConfig,
      apiConfig: this.dynamicApiConfig,
      // 右侧组件控件
      righttableComponents: this.rightTableObject.tableComponents,
      // 右侧按钮控件
      righttableButtons: this.rightTableObject.tableButtons,
      // 是否显示更多按钮
      isShowRightMoreBtn: this.rightTableObject.isShowRightMoreBtn,
      // 网格动态生成列
      righttableCols: this.rightTableObject.tableCols,
      // 是否显示右边网格选择列
      isShowRightSelect: this.rightTableObject.isShowSelect,
      // 组件控件
      tableComponents: this.dynamicComponents,
      // 按钮控件
      tableButtons: this.dynamicButtons,
      // 其它高度
      tableOtherHeight: this.dynamicTableOtherHeight,
      // 网格动态生成列
      tableCols: this.dynamicTableCols,
      // 表单查询数据
      formField: this.dynamicFormFields,
      // 表单查询数据
      rightFormField: this.rightTableObject.formField,
      // 是否显示网格选择列
      isShowSelect: this.dynamicIsShowSelect,
      // 是否显示更多按钮
      isShowMoreBtn: this.dynamicIsShowMoreBtn,
      // 表单查询数据备份对象（用于重置
      backFormField: {},
      // 需要中台返回网格的字段
      apiQueryRow: [],
      apiRightQueryRow: [],
      // 网格当前选中行
      currentRow: null,
      multipleSelection: [],
      multipleLeftSelection: [],
      // 右侧网格当前选中行
      currentRightRow: null,
      // 网格高度
      tableHeight: 310,
      RightTableHeight: 310,
      // 高度margin-top/bottom值
      tableMarginHeight: 0,
      // 更多按钮图标
      moreBtnIcon: 'el-icon-plus',
      rightMoreBtnIcon: 'el-icon-plus',
      // 网格拖动列
      dropTableCols: this.copyTableCols(this.dynamicTableCols),
      // 右侧网格拖动列
      dropRightTableCols: this.copyTableCols(this.rightTableObject.tableCols),
      // 是否网格行拖动，列拖动优先
      isRowDrop: this.dynamicIsRowDrop && !this.dynamicIsColumnDrop,
      // 选择列是否Fixed
      isLeftFixChoose: this.dynamicIsLeftFixChoose,
      // 序号列是否Fixed
      isLeftFixIndex: this.dynamicIsLeftFixIndex,
      // 选择列是否Fixed
      isRightFixChoose: this.dynamicIsRightFixChoose,
      // 序号列是否Fixed
      isRightFixIndex: this.dynamicIsRightFixIndex,
      // 是否显示更多查询条件
      toggleParam: false,
      // 是否显示右侧更多查询条件
      toggleParamRight: false,
      // 是否已经执行过updated
      isUpdated: false,
      // 是否显示按钮
      bounce: this.dynamicIsShowbounce,
      // 搜索框数值
      svFields: this.dynamicSvFields,
      // 右是否显示按钮
      rightbounce: this.rightdynamicIsShowbounce,
      // 右搜索框数值
      rightsvFields: this.rihgtdynamicSvFields,
      // 右表单查询数据
      rightformField: this.rightdynamicFormFields,
      // 左网格ref
      tableRef: 'oneTable.setHeight',
      // 左网格ref
      rightTableRef: 'rightTable.setHeight',
      // 数据传输对象（用于保存查询时传入的对象，使分页事件时能带出）
      dataTranObj: null,
      righttableComponentsKey: 'righttableComponentsKey'
    }
  },
  created() {
    // 根据动态列获取字段
    if (this.tableCols.length > 0) {
      this.apiQueryRow = this.$utils.getArrayFromJsonArray(this.tableCols.filter(o => o.prop !== 'controlBtn'), 'prop')
    }
    // 根据动态列获取字段
    if (this.rightTableObject.tableCols.length > 0) {
      this.apiRightQueryRow = this.$utils.getArrayFromJsonArray(this.rightTableObject.tableCols.filter(o => o.prop !== 'controlBtn'), 'prop')
    }
    if (this.isInitLeftTable) {
      this.queryTable(1)
    }
    if (this.isInitRightTable) {
      this.queryRightTable(1)
    }
    // 初始化数据
    if (this.isInitAllTable) {
      this.queryTable(1)
      var queryObj = {}
      this.queryRightTable(1, queryObj)
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.setTableHeight(true)
      this.setRightTableHeight(true)
    })
    this.$nextTick(() => {
      this.setTableHeight()
      this.setRightTableHeight()
    })
  },
  // 更新后操作
  updated() {
    if (this.isUpdated === false) {
      this.$nextTick(() => {
        this.setTableHeight()
        this.setRightTableHeight()
      })
      if (!this.$refs.conHeight || this.$refs.conHeight.offsetHeight > 20) {
        this.isUpdated = true
      }
    }
  },
  methods: {

    // 定义空方法，用于获取下拉框数据（这里需要每个组件实现这个方法）
    // 查询左侧网格数据方法（apiConfig:api配置对象，apiQueryRow:表格中台返回网格的字段）
    queryTable(page, cb) {
      this.currentRow = null
      this.listLoading = true
      this.rightListLoading = false
      const queryObj = this.$utils.getInputParam(this.formField, this.apiConfig, this.listQuery.pageSize, page, this.listQuery, this.apiQueryRow, this.dynamicApiStyle)
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj, null, this.dynamicApiStyle)
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD, this.dynamicApiStyle).then(response => {
        if (response.result === '0') {
          this.listLoading = false
          return
        }

        // 返回json
        if (this.dynamicApiStyle === 'restful') {
          this.handleResponseRestful(response, page, queryObj, cb)
        } else {
          this.handleResponseGraphql(response, page, queryObj, cb)
        }
      })
    },
    // 处理返回请求（Restful风格）
    handleResponseRestful(response, page, queryObj, cb) {
      if (page) {
        // 查询完返回指定的page页数
        this.listQuery.pageIndex = page
      }
      this.listIndex.pageIndex = this.listQuery.pageIndex
      this.listIndex.pageSize = this.listQuery.pageSize
      this.pageTotal = response.records
      var tmpLst = this.$utils.changeToOneDeepArray(response.rows)
      for (var i = 0; i < tmpLst.length; i++) {
        if (!tmpLst[i].index) {
          tmpLst[i].index = i
        }
      }
      this.list = tmpLst
      this.listLoading = false
      if (typeof cb === 'function') {
        cb.call(this, this.list)
      }
    },
    // 处理返回请求（GraphQL风格）
    handleResponseGraphql(response, page, queryObj, cb) {
      if (response.data[queryObj.apiConfig.ServiceCode].result === '1' && response.data[queryObj.apiConfig.ServiceCode].rows) {
        if (page) {
          // 查询完返回指定的page页数
          this.listQuery.pageIndex = page
        }
        this.listIndex.pageIndex = this.listQuery.pageIndex
        this.listIndex.pageSize = this.listQuery.pageSize
        this.pageTotal = response.data[queryObj.apiConfig.ServiceCode].records
        var tmpLst = this.$utils.changeToOneDeepArray(response.data[queryObj.apiConfig.ServiceCode].rows)
        for (var i = 0; i < tmpLst.length; i++) {
          if (!tmpLst[i].index) {
            tmpLst[i].index = i
          }
        }
        this.list = tmpLst
        this.listLoading = false
        if (typeof cb === 'function') {
          cb.call(this, this.list)
        }
      }
    },
    // twoTable 选中右边的多行或单行数据
    changeFun(val) {
      this.multipleSelection = val
    },
    // twoTable 选中左边的多行或单行数据
    changeRowleftFun(val) {
      this.multipleLeftSelection = val
    },
    // 查询右侧网格数据的方法（apiConfig:api配置对象，apiQueryRow:表格中台返回网格的字段）
    queryRightTable(page, queryField, cb) {
      this.currentRightRow = null
      this.rightListLoading = true
      if (queryField) {
        this.dataTranObj = queryField
      }
      const queryObj =
      this.$utils.getInputParam(this.dataTranObj || this.rightFormField,
        this.apiRightTable,
        this.rightListQuery.pageSize,
        page,
        this.rightListQuery,
        this.apiRightQueryRow,
        this.dynamicApiStyle)
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj, null, this.dynamicApiStyle)
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD, this.dynamicApiStyle).then(response => {
        if (response.result === '0') {
          this.rightListLoading = false
          return
        }

        // 返回json
        if (this.dynamicApiStyle === 'restful') {
          this.handleRightResponseRestful(response, page, queryObj, cb)
        } else {
          this.handleRightResponseGraphql(response, page, queryObj, cb)
        }
      })
    },
    // 处理Right返回请求（Restful风格）
    handleRightResponseRestful(response, page, queryObj, cb) {
      if (page) {
        // 查询完返回指定的page页数
        this.rightListQuery.pageIndex = page
      }
      this.rightListIndex.pageIndex = this.rightListQuery.pageIndex
      this.rightListIndex.pageSize = this.rightListQuery.pageSize
      this.rightpageTotal = response.records
      var tmpLst = this.$utils.changeToOneDeepArray(response.rows)
      for (var i = 0; i < tmpLst.length; i++) {
        if (!tmpLst[i].index) {
          tmpLst[i].index = i
        }
      }
      this.rightList = tmpLst
      this.rightListLoading = false
      if (typeof cb === 'function') {
        this.$nextTick(() => {
          cb.call(this, this.rightList)
        })
      }
    },
    // 处理Right返回请求（GraphQL风格）
    handleRightResponseGraphql(response, page, queryObj, cb) {
      if (response.data[queryObj.apiConfig.ServiceCode].result === '1' && response.data[queryObj.apiConfig.ServiceCode].rows) {
        if (page) {
          // 查询完返回指定的page页数
          this.rightListQuery.pageIndex = page
        }
        this.rightListIndex.pageIndex = this.rightListQuery.pageIndex
        this.rightListIndex.pageSize = this.rightListQuery.pageSize
        this.rightpageTotal = response.data[queryObj.apiConfig.ServiceCode].records
        var tmpLst = this.$utils.changeToOneDeepArray(response.data[queryObj.apiConfig.ServiceCode].rows)
        for (var i = 0; i < tmpLst.length; i++) {
          if (!tmpLst[i].index) {
            tmpLst[i].index = i
          }
        }
        this.rightList = tmpLst
        this.rightListLoading = false
      }
      if (typeof cb === 'function') {
        this.$nextTick(() => {
          cb.call(this, this.rightList)
        })
      }
    },
    // 重置
    reset() {
      // this.rightFormField = JSON.parse(JSON.stringify(this.backFormField))
      this.$utils.deepClone(this.rightFormField, this.backFormField)
    },
    // 导出网格
    exportExcel() { },
    // 选中网格行
    handleTableRowChange(val) {
      this.currentRow = val
      // 判断父组件是否需要接收选中行数据
      if (this.$parent.clickRowsData !== undefined) {
        this.$parent.clickRowsData = this.currentRow
      }
      // edit调用twotable的clickRowsData
      if (this.$parent.$parent.clickRowsData !== undefined) {
        this.$parent.$parent.clickRowsData = this.currentRow
      }
      //
      if (val !== undefined) {
        this.backFormField = JSON.parse(JSON.stringify(val))
      }
      // this.backFormField.index = undefined
      // 给右网格保存条件赋值
      for (var key in val) {
        if (this.rightFormField[key] !== undefined && key !== 'index') {
          this.rightFormField[key] = val[key]
        } else {
          // 两层处理
          for (var rKey in this.rightFormField) {
            if (rKey.indexOf('.') > -1) {
              var tmpKey = rKey.split('.')[1]
              if (tmpKey === key) {
                this.rightFormField[tmpKey] = val[rKey]
                break
              }
            }
          }
        }
      }
    },
    // 右侧选中网格行
    handleTableRightRowChange(val) {
      this.currentRow = val
      this.currentRightRow = val
      // 判断父组件是否需要接收选中行数据
      if (this.$parent.clickRightRowsData !== undefined) {
        this.$parent.clickRightRowsData = this.currentRow
      }
      this.rightFormField.index = undefined
      for (var key in val) {
        if (this.rightFormField[key] !== undefined && key !== 'index') {
          this.rightFormField[key] = val[key]
        }
      }
    },
    // // 把每一行的索引放进row      为了解决鼠标经过不断刷新问题弃用这种方式   luojx 2019-9-9
    // tableRowClassName({ row, rowIndex }) {
    //   row.index = rowIndex
    // },
    // // 右侧把每一行的索引放进row      为了解决鼠标经过不断刷新问题弃用这种方式   luojx 2019-9-9
    // rightTableRowClassName({ row, rowIndex }) {
    //   row.index = rowIndex
    // },
    // 初始化list的索引
    initListIndex() {
      var that = this
      for (var li = 0; li < that.list.length; li++) {
        that.list[li].index = li
      }
    },
    // 初始化右边网格list的索引
    initRightListIndex() {
      var that = this
      for (var li = 0; li < that.rightList.length; li++) {
        that.rightList[li].index = li
      }
    },
    // 更多按钮点击事件
    changeToggleParam() {
      this.toggleParam = !this.toggleParam
      if (this.toggleParam) {
        this.moreBtnIcon = 'el-icon-minus'
      } else {
        this.moreBtnIcon = 'el-icon-plus'
      }
      this.setTableHeight()
    },
    // 右侧更多按钮点击事件
    changeToggleParamRight() {
      this.toggleParamRight = !this.toggleParamRight
      if (this.toggleParamRight) {
        this.rightMoreBtnIcon = 'el-icon-minus'
      } else {
        this.rightMoreBtnIcon = 'el-icon-plus'
      }
      this.setRightTableHeight()
    },
    // 处理每页显示改变事件
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.queryTable()
    },
    // 当前页记录
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val
      this.queryTable()
    },

    // 处理右侧网格每页显示改变事件
    rightHandleSizeChange(val) {
      this.rightListQuery.pageSize = val
      this.queryRightTable()
    },

    // 右侧网格当前页记录
    rightHandleCurrentChange(val) {
      this.rightListQuery.pageIndex = val
      this.queryRightTable()
    },

    // 获取组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:组件类型（预留）
    getComponentCode(val, txt, codeField, comType, popupsKey, textField) {
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
    },
    // 获取组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:组件类型（预留）
    getRightComponentCode(val, txt, codeField, comType, popupsKey) {
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
        this.rightFormField[codeField] = val
      } else {
        // 普通赋值
        this.rightFormField[codeField] = val
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
    // 获取右侧网格focus事件传回值
    // val:值, codeField:绑定popupsState的字段名称, comType:组件类型（预留）
    getRightFocusCode(val, txt, codeField, comType, popupsKey) {
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
    // 获取（网格中）组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:网格行索引（row.index）
    getRowComponentCode(val, txt, codeField, comType, popupsKey, textField) {
      switch (codeField) {
        default:
          // 普通赋值
          if (this.list[comType][codeField]) {
            this.list[comType][codeField] = val
          }
          if (textField && this.list[comType][textField]) {
            this.list[comType][textField] = txt
          }
          break
      }
    },
    // 获取（网格中）组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:网格行索引（row.index）
    getRightRowComponentCode(val, txt, codeField, comType, popupsKey, textField) {
      switch (codeField) {
        default:
          // 普通赋值
          if (this.rightList[comType][codeField]) {
            this.rightList[comType][codeField] = val
          }
          if (textField && this.rightList[comType][textField]) {
            this.rightList[comType][textField] = txt
          }
          break
      }
    },

    // 复制网格字段
    copyTableCols(tableCols) {
      var colsObj = tableCols.filter(o => o.hidden !== true)
      // var cols = JSON.parse(JSON.stringify(colsObj))
      return colsObj
    },

    // 设置网格高度
    setTableHeight(isResize) {
      this.$nextTick(() => {
        this.tableHeight = this.$utils.setTableHeight(this, isResize, this.tableHeight, this.tableRef)
      })
    },
    // 设置网格高度
    setRightTableHeight(isResize) {
      this.$nextTick(() => {
        this.RightTableHeight = this.$utils.setTableHeight(this, isResize, this.RightTableHeight, this.rightTableRef)
      })
    },
    refreshRightComponentsTable() {
      this.righttableComponentsKey = this.righttableComponentsKey + 1
    }
  }
}
