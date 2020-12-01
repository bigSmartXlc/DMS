// 使用场景：树和网格混入模板（树和网格混入模板）
export const treeTableTemplateMixins = {
  props: {
    // 动态按钮
    dynamicButtons: { type: Array, default: function() { return [] } },
    // 动态组件
    dynamicComponents: { type: Array, default: function() { return [] } },
    // 动态网格列
    dynamicTableCols: { type: Array, default: function() { return [] } },
    // 动态查询条件对象
    dynamicFormFields: { type: Object, default: function() { return {} } },
    // 动态排除查询条件对象
    dynamicUnFormFields: { type: Object, default: function() { return {} } },
    // 树对象
    treeObject: { type: Object, default: function() { return {} } },
    // 动态网格API配置
    dynamicApiConfig: { type: Object, default: function() { return {} } },
    // 是否显示分页
    isShowPagination: { type: Boolean, default: true },
    dynamicTableOtherHeight: { type: Number, default: 0 },
    // 是否显示网格选择列
    dynamicIsShowSelect: { type: Boolean, default: true },
    // 是否显示更多按钮
    dynamicIsShowMoreBtn: { type: Boolean, default: true },
    // 是否默认展开所有树
    dynamicExpandAll: { type: Boolean, default: true },
    // 是否行拖动
    dynamicIsRowDrop: { type: Boolean, default: false },
    // 设置菜单栏宽度
    dynamicWidth: { type: Number, default: 0 },
    // 网格显示条数
    dynamicPageSize: { type: Number, default: function() { return this.$config.defaultPageSize } },
    // 是否显示按钮
    dynamicIsShowbounce: { type: Boolean, default: true },
    // 搜索框数值
    dynamicSvFields: { type: String, default: '' },
    dynamicOrgList: { type: Array, function() { return [] } },
    // 回传方法对象（用于传递方法）
    // 当前已用方法：
    /* callbackObj: {
        onCompCodeChange 查询条件组件值变化时触发事件
        onRowCompCodeChange 网格中组件值变化时触发事件
        onRowClick 网格单击事件
        onRowDbClick 网格双击事件
        onBeforeQuery 查询方法调用前
        onQueryReturn 查询方法返回成功后
        onSelectable 网格选择列是否可勾选回调事件
       }
    */
    callbackObj: { type: Object, default: function() { return {} } },
    // 空字符时显示
    dynamicEmptyText: { type: String, default: '' },
    // 分页数组
    pageSizeArray: { type: Array, default: function() { return this.$config.pageSizeArray } },
    // API风格
    dynamicApiStyle: { type: String, default: function() { return this.$config.apiStyle } },
    // 查询对象名称（restful：queryCondition，graphql：dataInfo）
    queryObjName: { type: String, default: function() { return this.$config.apiStyle !== 'restful' ? 'dataInfo' : 'queryCondition' } }
  },
  data() {
    return {
      // 数据列表
      list: null,
      treeKey: 'a',
      // tree列表
      orgList: this.dynamicOrgList,
      // 加载中
      listLoading: false,
      // 设置网格总共的条数，查询完更改
      pageTotal: 0,
      // 下拉查询条件
      listQuery: {
        pageIndex: 1,
        pageSize: this.dynamicPageSize
      },
      // 网格中当前页与每页显示
      listIndex: {
        pageIndex: 1,
        pageSize: this.dynamicPageSize
      },
      siderWidth: this.dynamicWidth + 'px',
      // 表单排除查询数据
      unFormField: this.dynamicUnFormFields,
      // 树的Api对象
      apiTree: this.treeObject.treeApiConfig,
      // 树的字段
      apiTreeCols: this.treeObject.returnTreeCol,
      // 树的查询条件
      apiTreeQuery: this.treeObject.treeQuery,
      // 树的排序对象
      defaultProps: this.treeObject.defaultProps,
      // API配置对象
      apiConfig: this.dynamicApiConfig,
      tableOtherHeight: this.dynamicTableOtherHeight,
      // 组件控件
      tableComponents: this.dynamicComponents,
      // 按钮控件
      tableButtons: this.dynamicButtons,
      // 网格动态生成列
      tableCols: this.dynamicTableCols,
      // 表单查询数据
      formField: this.dynamicFormFields,
      // 是否显示网格选择列
      isShowSelect: this.dynamicIsShowSelect,
      // 是否显示更多按钮
      isShowMoreBtn: this.dynamicIsShowMoreBtn,
      // 表单查询数据备份对象（用于重置
      backFormField: {},
      // 需要中台返回网格的字段
      apiQueryRow: [],
      // 网格当前选中行
      currentRow: null,
      nodeClickData: null,
      // 网格高度
      tableHeight: 310,
      // 高度margin-top/bottom值
      tableMarginHeight: 0,
      // 更多按钮图标
      moreBtnIcon: 'el-icon-plus',
      // 网格拖动列
      dropTableCols: this.copyTableCols(this.dynamicTableCols),
      // 是否网格行拖动，列拖动优先
      isRowDrop: this.dynamicIsRowDrop && !this.dynamicIsColumnDrop,
      // 是否显示更多查询条件
      toggleParam: false,
      // 是否显示按钮
      bounce: this.dynamicIsShowbounce,
      // 搜索框数值
      svFields: this.dynamicSvFields,
      // 空字符时显示，默认“暂无数据”
      emptyText: this.dynamicEmptyText === '' ? this.$t('sys.content.emptyData') : this.dynamicEmptyText
    }
  },
  created() {
    this.backFormField = JSON.parse(JSON.stringify(this.formField))
    // 根据动态列获取字段
    if (this.tableCols.length > 0) {
      this.apiQueryRow = this.$utils.getArrayFromJsonArray(this.tableCols.filter(o => o.prop !== 'controlBtn'), 'prop')
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.setTableHeight(true)
    })
    this.$nextTick(() => {
      this.setTableHeight()
    })
  },
  // 更新后操作
  updated() {
    if (this.isUpdated === false) {
      this.$nextTick(() => {
        this.setTableHeight()
      })
      if (!this.$refs.conHeight || this.$refs.conHeight.offsetHeight > 20) {
        this.isUpdated = true
      }
    }
  },
  methods: {
    // 定义树的的查询方法apiTree
    queryOrganization(parentId, childrenId) {
      this.emptyText = this.$t('sys.content.loading')
      const that = this
      const queryObj = this.$utils.getInputParam(that.apiTreeQuery, that.apiTree, -1, 1, this.listQuery, that.apiTreeCols, this.dynamicApiStyle)
      // 转换了中台请求格式数据
      var paramD = that.$getParams(queryObj, null, this.dynamicApiStyle)
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD, this.dynamicApiStyle).then(response => {
        // 返回json
        if (this.dynamicApiStyle === 'restful') {
          if (response.result === '1' && response.rows) {
            var treeR = this.$utils.parseTreeFromList(response.rows, parentId, childrenId)
            this.orgList = treeR
            this.treeKey = this.treeKey + 1
          }
        } else {
          if (response.data[queryObj.apiConfig.ServiceCode].result === '1' && response.data[queryObj.apiConfig.ServiceCode].rows !== '') {
            var dataList = response.data[queryObj.apiConfig.ServiceCode].rows
            var tree = this.$utils.parseTreeFromList(dataList, parentId, childrenId)
            this.orgList = tree
            this.treeKey = this.treeKey + 1
          }
        }
        this.emptyText = this.dynamicEmptyText === '' ? this.$t('sys.content.emptyData') : this.dynamicEmptyText
      })
    },
    // 查询方法（apiConfig:api配置对象，apiQueryRow:表格中台返回网格的字段）
    // dataType：查询类型（null/空：默认为返回json格式，excel：导出excel）（注：由于mock没有模拟文件流返回，所以mock请求方式下导出excel文件内容还是json）
    // size：导出excel时设置size
    // filterObj：过滤对象
    // cb：回调函数
    // dto:传输对象，默认为：null，用于数据的传输，如：dto.formField...
    queryTable(page, dataType, size, filterObj, cb, dto) {
      this.emptyText = this.$t('sys.content.loading')
      this.currentRow = null
      this.listLoading = true
      var curFormField = null
      // 保存传输对象（用于分页方法）
      if (dto) {
        this.dataTranObj = dto
      }
      // 先读取参数中的传输对象
      if (this.dataTranObj && this.dataTranObj.formField) {
        curFormField = JSON.parse(JSON.stringify(this.dataTranObj.formField))
      } else {
        curFormField = JSON.parse(JSON.stringify(this.formField))
      }
      // 排除不需要作为查询条件的formField字段
      if (this.unFormField && this.unFormField !== null) {
        for (var key in this.unFormField) {
          if (curFormField[key] !== undefined) {
            delete curFormField[key]
          }
        }
      }

      const queryObj = this.$utils.getInputParam(curFormField, this.apiConfig, size, page, this.listQuery, this.apiQueryRow, this.dynamicApiStyle)

      // 查询前回调钩子
      this.execCallBack('onBeforeQuery', queryObj)

      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj, null, this.dynamicApiStyle)
      // 构建导出Excel参数
      if (dataType === 'excel') {
        this.buildExportParam(queryObj, paramD)
      }
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD, this.dynamicApiStyle).then(response => {
        if (response.result === '0') {
          this.listLoading = false
          return
        }

        // 查询后回调钩子
        this.execCallBack('onQueryReturn', response)

        if (dataType === 'excel') {
          // 下载Excel
          this.downloadExcel(response)
        } else {
          // 返回json
          if (this.dynamicApiStyle === 'restful') {
            this.handleResponseRestful(response, page, size, queryObj, filterObj)
          } else {
            this.handleResponseGraphql(response, page, size, queryObj, filterObj)
          }
        }
        if (typeof cb === 'function') {
          cb.call(this, response)
        }

        this.listLoading = false
      }).catch(err => {
        console.info(err)
        this.listLoading = false
      })
    },
    // 处理返回请求（Restful风格）
    handleResponseRestful(response, page, size, queryObj, filterObj) {
      if (response.result === '1' && response.rows) {
        if (page) {
          // 查询完返回指定的page页数
          this.listQuery.pageIndex = page
        }
        if (size) {
          // 查询完返回指定的page页数
          this.listQuery.pageSize = size
        }
        this.listIndex.pageIndex = this.listQuery.pageIndex
        this.listIndex.pageSize = this.listQuery.pageSize
        var tmpLst = this.$utils.changeToOneDeepArray(response.rows)
        if (filterObj && filterObj.key && filterObj.val) {
          tmpLst = tmpLst.filter(o => o[filterObj.key] === filterObj.val)
        }
        for (var i = 0; i < tmpLst.length; i++) {
          if (!tmpLst[i].index) {
            tmpLst[i].index = i
          }
        }
        this.list = tmpLst
        if (this.listQuery.pageSize === -1) {
          this.pageTotal = this.list.length
          this.listQuery.pageSize = this.pageTotal
          this.listIndex.pageSize = this.pageTotal
        } else {
          this.pageTotal = response.records
        }
      } else {
        this.$message({
          message: response.msg,
          type: 'warn',
          uration: 2000
        })
      }
    },
    // 处理返回请求（GraphQL风格）
    handleResponseGraphql(response, page, size, queryObj, filterObj) {
      if (response.data[queryObj.apiConfig.ServiceCode].result === '1' && response.data[queryObj.apiConfig.ServiceCode].rows) {
        if (page) {
          // 查询完返回指定的page页数
          this.listQuery.pageIndex = page
        }
        if (size) {
          // 查询完返回指定的page页数
          this.listQuery.pageSize = size
        }
        this.listIndex.pageIndex = this.listQuery.pageIndex
        this.listIndex.pageSize = this.listQuery.pageSize
        var tmpLst = this.$utils.changeToOneDeepArray(response.data[queryObj.apiConfig.ServiceCode].rows)
        if (filterObj && filterObj.key && filterObj.val) {
          tmpLst = tmpLst.filter(o => o[filterObj.key] === filterObj.val)
        }
        for (var i = 0; i < tmpLst.length; i++) {
          if (!tmpLst[i].index) {
            tmpLst[i].index = i
          }
        }
        this.list = tmpLst
        if (this.listQuery.pageSize === -1) {
          this.pageTotal = this.list.length
          this.listQuery.pageSize = this.pageTotal
          this.listIndex.pageSize = this.pageTotal
        } else {
          this.pageTotal = response.data[queryObj.apiConfig.ServiceCode].records
        }
      } else {
        this.$message({
          message: response.data[queryObj.apiConfig.ServiceCode].msg,
          type: 'warn',
          uration: 2000
        })
      }
    },
    // 下载Excel
    downloadExcel(data) {
      this.$utils.downloadFile(data, this.excelName)
    },
    // 构建导出Excel中台参数
    buildExportParam(queryObj, paramsObj) {
      var tmpCols = this.tableCols.filter(o => o.hidden !== true)
      tmpCols = JSON.parse(JSON.stringify(tmpCols))
      // 网格列对象转为excel列对象
      var excelCols = {}
      for (var i = 0; i < tmpCols.length; i++) {
        if (tmpCols[i].prop !== 'controlBtn') {
          tmpCols[i].prop = this.$utils.getExportStringFromString(tmpCols[i].prop)
          excelCols[tmpCols[i].prop] = tmpCols[i].expLabel || tmpCols[i].label
        }
      }
      // 数据类型
      paramsObj.dataType = 'excel'
      // excel文件名称
      paramsObj.excelName = this.excelName
      // 根据请求API描述excel数据对象
      paramsObj.excels = []
      var excels = {
        // excel sheet名称
        title: this.excelSheetName,
        // 对应API服务编码
        actionName: queryObj.apiConfig.ServiceCode,
        // excel列
        columns: excelCols
      }
      // 字段格式化
      if (typeof this.exportConverts === 'object' && JSON.stringify(this.exportConverts) !== '{}') {
        for (const cvKey in this.exportConverts) {
          if (this.tableCols.filter(o => o.prop === cvKey).length === 0) {
            delete this.exportConverts[cvKey]
          }
        }
        if (JSON.stringify(this.exportConverts) !== '{}') {
          excels.converts = this.exportConverts
        }
      }
      paramsObj.excels.push(excels)
    },
    // 重置
    reset() {
      // this.formField = JSON.parse(JSON.stringify(this.backFormField))
      this.$utils.deepClone(this.formField, this.backFormField)
      this.$utils.resetMulComp(this)
      if (this.$refs.tree && this.$refs.tree.setCurrentKey) {
        this.$refs.tree.setCurrentKey(null)
      }
    },
    // 导出网格
    // pageSize=-1：全部符合条件的记录
    exportExcel(excelName, excelSheetName, pageSize) {
      if (excelName) {
        this.excelName = excelName
      } else {
        if (this.$route.matched.length > 0 && this.$route.matched[this.$route.matched.length - 1].meta) {
          const now = this.$utils.parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          this.excelName = this.$route.matched[this.$route.matched.length - 1].meta.title + now
        }
      }
      if (excelSheetName) {
        this.excelSheetName = excelSheetName
      } else {
        this.excelSheetName = this.excelName
      }
      if (this.excelName.length > 0 && this.excelName.indexOf('.') < 0) {
        this.excelName += this.$config.excelExp
      }
      this.queryTable(1, 'excel', pageSize || -1)
    },
    // 执行回调事件
    execCallBack() {
      if (arguments && arguments.length > 0) {
        const funcName = arguments[0]
        if (typeof this.callbackObj[funcName] === 'function') {
          const args = []
          if (arguments.length > 1) {
            for (let i = 1; i < arguments.length; i++) {
              args.push(arguments[i])
            }
          }
          this.callbackObj[funcName](...args)
          return true
        }
      }
      return false
    },
    // 选中网格行
    handleTableRowChange(val) {
      this.currentRow = val
      // 判断父组件是否需要接收选中行数据
      if (this.$parent.clickRowsData !== undefined) {
        this.$parent.clickRowsData = this.currentRow
      }
    },
    // // 把每一行的索引放进row      为了解决鼠标经过不断刷新问题弃用这种方式   luojx 2019-9-9
    // tableRowClassName({ row, rowIndex }) {
    //   row.index = rowIndex
    // },
    // 初始化list的索引
    initListIndex() {
      var that = this
      for (var li = 0; li < that.list.length; li++) {
        that.list[li].index = li
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
    // 复制网格字段
    copyTableCols(tableCols) {
      var colsObj = tableCols.filter(o => o.hidden !== true)
      // var cols = JSON.parse(JSON.stringify(colsObj))
      return colsObj
    },

    // 设置网格高度
    setTableHeight(isResize) {
      this.$nextTick(() => {
        this.tableHeight = this.$utils.setTableHeight(this, isResize, this.tableHeight)
      })
    },
    handleNodeClicks(val) {
      this.nodeClickData = val
      // 判断父组件是否需要接收选中行数据
      if (this.$parent.handleNodeData !== undefined) {
        this.$parent.handleNodeData = this.nodeClickData
      }
      // 判断父组件是否需要处理选中事件
      if (typeof this.$parent.handleNodeClick === 'function') {
        this.$parent.handleNodeClick(this.nodeClickData)
      } else if (this.$parent.$parent && typeof this.$parent.$parent.handleNodeClick === 'function') {
        this.$parent.$parent.handleNodeClick(this.nodeClickData)
      }
    }
  }
}
