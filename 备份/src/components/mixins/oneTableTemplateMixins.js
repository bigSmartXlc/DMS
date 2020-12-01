// 单网格视图/弹窗模板混入对象
// 使用场景：单网格模板使用（只适用于模板）
export const oneTableTemplateMixins = {
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
    // 动态API配置
    dynamicApiConfig: { type: Object, default: function() { return {} } },
    // 是否显示网格选择列
    dynamicIsShowSelect: { type: Boolean, default: true },
    // 是否点击一行时补充点击行多选标记
    dynamicIsClickShowSelect: { type: Boolean, default: true },
    // 是否显示更多按钮
    dynamicIsShowMoreBtn: { type: Boolean, default: true },
    // 是否默认展开查询条件
    dynamicToggleParam: { type: Boolean, default: false },
    // 默认显示组件数量
    dynamicDefalutCount: { type: Number, default: 0 },
    // 是否初始化网格
    dynamicIsInitTable: { type: Boolean, default: false },
    // 行拖动/列拖动：只能二选一，列拖动优先
    // 是否行拖动
    dynamicIsRowDrop: { type: Boolean, default: false },
    // 是否列拖动
    dynamicIsColumnDrop: { type: Boolean, default: false },
    // 选择列是否Fixed
    dynamicIsFixChoose: { type: Boolean, default: true },
    // 序号列是否Fixed
    dynamicIsFixIndex: { type: Boolean, default: true },
    // 导出Excel文件名称
    dynamicExcelName: { type: String, default: '' },
    // 导出Excel文件Sheet名称
    dynamicExcelSheetName: { type: String, default: '' },
    // 其它高度
    dynamicTableOtherHeight: { type: Number, default: 0 },
    // 自定义网格高度
    dynamicTableDefultHeight: { type: Number, default: 0 },
    // 是否进行列排序
    dynamicSortable: { type: Boolean, default: false },
    // 是否显示分页
    isShowPagination: { type: Boolean, default: true },
    // 更多条件是否使用浮层
    isAbsolute: { type: Boolean, default: false },
    // 是否设置默认品牌
    isSetDefaultBrand: { type: Boolean, default: true },
    // 网格刷新标识
    refreshTableKey: { type: String, default: '' },
    // 网格显示条数
    dynamicPageSize: { type: Number, default: function() { return this.$config.defaultPageSize } },
    // 是否显示按钮
    dynamicIsShowbounce: { type: Boolean, default: true },
    // 搜索框数值
    dynamicSvFields: { type: String, default: '' },
    // 字段格式化转换（用于导出excel）
    dynamicExportConverts: { type: Object, default: function() { return {} } },
    // 网格ref名称用于计算自适应高度
    dynamicTableRef: { type: String, default: 'multipleTable' },
    // 父组件网格ref名称用于多网格情况下的区分
    dynamicParentTableRef: { type: String, default: 'multipleTable' },
    // 分页控件显示个数
    dynamicPagerCount: { type: Number, default: 7 },
    // 是否弹窗
    dynamicIsPopups: { type: Boolean, default: false },
    // 是否重置marginTop
    dynamicIsResetMargin: { type: Boolean, default: true },
    // 不需要中台返回网格的字段
    dynamicUnApiQueryRow: { type: Array, default: function() { return [] } },
    // 回传方法对象（用于传递方法）
    // 当前已用方法：
    /* callbackObj: {
        onCompCodeChange 查询条件组件值变化时触发事件
        onRowCompCodeChange 网格中组件值变化时触发事件
        onRowClick 网格单击事件 (row, column, event)
        onCheckSelect 当用户手动勾选数据行的Checkbox时触发的事件 (selection, row)
        onCheckSelectAll 当用户手动勾选全选 Checkbox 时触发的事件 (selection)
        onCheckSelectChange 当选择项发生变化时会触发该事件 (selection)
        onRowDbClick 网格双击事件
        onBeforeQuery 查询方法调用前
        onQueryReturn 查询方法返回成功后
        onSelectable 网格选择列是否可勾选回调事件
        onTableReSize 网格高度重设事件
        onBeforeReset 重置事件前
        onAfterReset 重置事件后
       }
    */
    callbackObj: { type: Object, default: function() { return {} } },
    // 刷新按钮的key
    buttonkey: { type: String, default: 'buttonkey' },
    // 动态按钮span显示比例
    positionSpan: { type: Array, default: () => [12, 12] },
    // 自定义按钮个数
    showbtnLength: { type: Number, default: 5 },
    // 是否使用传参控制
    isUsePathQuery: { type: Boolean, default: true },
    // 显示文本信息
    textMessages: { type: Object, default: function() { return {} } },
    // 是否显示左右移动图标
    isShowMoveIcon: { type: Boolean, default: true },
    // 是否需要计算自适应高度
    dynamicIsNoTableHeight: { type: Boolean, default: false },
    // 是否合并
    arraySpanMethod: { type: Function, default: () => { } },
    // 是否显示表尾合计行
    dynamicIsShowSummary: { type: Boolean, default: false },
    // 表尾合计行计算方法
    dynamicSummaryMethod: { type: Function, default: () => { } },
    // 更改网格列某一行样式 (参考:经销商库龄车辆统计报表)
    dynamicCellStyle: { type: Function, default: () => { } },
    // 分页数组
    pageSizeArray: { type: Array, default: function() { return this.$config.pageSizeArray } },
    // API风格
    dynamicApiStyle: { type: String, default: function() { return this.$config.apiStyle } }
  },
  data() {
    return {
      // 是否table下的组件
      isShowComponent: true,
      // 数据列表
      list: [],
      // 加载中
      listLoading: false,
      // 刷新按钮的key
      curButtonKey: this.buttonKey,
      // 设置分页器是否禁用
      pageDisabled: false,
      // 设置网格总共的条数，查询完更改
      pageTotal: 0,
      // 查询条件
      listQuery: {
        pageIndex: 1,
        pageSize: this.dynamicPageSize
      },
      // 网格中当前页与每页显示
      listIndex: {
        pageIndex: 1,
        pageSize: this.dynamicPageSize
      },
      // API配置对象
      apiConfig: this.dynamicApiConfig,
      // 组件控件
      tableComponents: this.dynamicComponents,
      // 按钮控件
      tableButtons: this.dynamicButtons,
      // 按钮span显示比例
      tableSpan: this.positionSpan,
      // 按钮显示个数
      tableLength: this.showbtnLength,
      // 网格动态生成列
      tableCols: this.dynamicTableCols,
      // 网格拖动列
      dropTableCols: this.copyTableCols(this.dynamicTableCols),
      // 表单查询数据
      formField: this.dynamicFormFields,
      // 表单排除查询数据
      unFormField: this.dynamicUnFormFields,
      // 是否显示网格选择列
      isShowSelect: this.dynamicIsShowSelect,
      // 是否点击一行时补充点击行多选标记
      isClickShowSelect: this.dynamicIsClickShowSelect,
      // 是否显示更多按钮
      isShowMoreBtn: this.dynamicIsShowMoreBtn,
      // 默认显示组件数量
      defalutCount: this.dynamicDefalutCount,
      // 是否初始化网格数据
      isInitTable: this.dynamicIsInitTable,
      // 是否网格行拖动，列拖动优先
      isRowDrop: this.dynamicIsRowDrop && !this.dynamicIsColumnDrop,
      // 是否网格列拖动
      isColumnDrop: this.dynamicIsColumnDrop,
      // 选择列是否Fixed
      isFixChoose: this.dynamicIsFixChoose,
      // 序号列是否Fixed
      isFixIndex: this.dynamicIsFixIndex,
      // 导出Excel文件名称
      excelName: this.dynamicExcelName !== '' ? this.dynamicExcelName : (this.dynamicApiConfig.ServiceCode || 'export_data'),
      excelSheetName: this.dynamicExcelSheetName !== '' ? this.dynamicExcelSheetName : (this.dynamicApiConfig.ServiceCode || 'export_data'),
      // 表单查询数据备份对象（用于重置
      backFormField: {},
      // 需要中台返回网格的字段
      apiQueryRow: [],
      // 不需要中台返回网格的字段
      unApiQueryRow: this.dynamicUnApiQueryRow,
      // 网格当前选中行
      currentRow: null,
      // 网格高度
      tableHeight: 310,
      // 是否已设置网格高度
      isSetTableHeight: false,
      // 高度margin-top/bottom值
      tableMarginHeight: 0,
      // 其它高度
      tableOtherHeight: this.dynamicTableOtherHeight,
      // 更多按钮图标
      moreBtnIcon: 'el-icon-plus',
      // 是否显示更多查询条件
      toggleParam: false,
      // 是否进行列排序
      sortable: this.dynamicSortable,
      // 是否已经执行过updated（用于标识设置网格高度）
      isUpdated: false,
      // 是否已经执行过updated（用于标识设置常量值）
      isSetValUpdated: false,
      // 网格Key
      oneTableKey: 'oneTableKey',
      // 是否弹窗
      isPopups: this.dynamicIsPopups,
      // 是否显示按钮
      bounce: this.dynamicIsShowbounce,
      // 搜索框数值
      svFields: this.dynamicSvFields,
      // 字段格式化转换（用于导出excel）
      // 结构如：
      /* 下面是对isEnable字段做转换的例子，关键词“kvs”：表示键值转换
      exportConverts= {
        "converts": {
          "isEnable": {
            "convert": "kvs",
            "kvs": {
              "1": "是",
              "0": "否"
            }
          },
          ... //可以多个
        }
      }
      */
      exportConverts: this.dynamicExportConverts,
      // 网格ref名称用于计算自适应高度
      tableRef: this.dynamicTableRef,
      // 父组件网格ref名称用于多网格情况下的区分
      parentTableRef: this.dynamicParentTableRef,
      // 是否用oneTable模板
      isOneTable: '0',
      // 是否需要隐藏查询组件
      isUseHideComp: true,
      // 数据传输对象（用于保存查询时传入的对象，使分页事件时能带出）
      dataTranObj: null,
      // 页面区域
      pageAreas: [],
      compInColsKey: '',
      // 左右滚动配置信息 start
      isOver: false,
      // 是否打开列排序功能
      isOrder: true,
      isDefaultLeft: true,
      isDefaultRight: false,
      isIE: this.$utils.isIE() || this.$utils.isEdge() ? 'ie' : '',
      scrollLeft: '',
      iindex: 0, // 当前滚动的角标
      // 左右滚动配置信息 end
      // 是否需要计算自适应高度
      isNoTableHeight: this.dynamicIsNoTableHeight,
      // 是否合并
      dataArraySpanMethod: this.arraySpanMethod,
      // 是否显示表尾合计项
      isShowSummary: this.dynamicIsShowSummary,
      summaryMethod: this.dynamicSummaryMethod,
      // 通过网格某属性判断是否变色
      isTableColor: '',
      // 更改网格列某一行样式
      cellStyle: this.dynamicCellStyle,
      // 是否默认展开更多
      curToggleParam: this.dynamicToggleParam
    }
  },
  created() {
    // 设置品牌默认值
    if (this.formField.carBrandCode === '' && this.isSetDefaultBrand === true) {
      this.formField.carBrandCode = this.$store.getters.orgInfo.BRAND_CODE
    }
    this.backFormField = JSON.parse(JSON.stringify(this.formField))
    // 根据动态列获取字段
    if (this.tableCols.length > 0) {
      this.apiQueryRow = this.$utils.getArrayFromJsonArray(this.tableCols.filter(o => o.prop !== 'controlBtn'), 'prop')
    }
    // 从参数赋值
    if (this.isUsePathQuery && this.$route.query) {
      for (var q in this.$route.query) {
        if (q && this.formField.hasOwnProperty(q)) {
          this.formField[q] = this.$route.query[q]
          if (this.isInitTable === false) {
            this.isInitTable = true
          }
        }
      }
    }
    // 初始化数据
    if (this.isInitTable === true) {
      this.queryTable(1)
    }
    // 初始化判断网格中是否存在通过数值判断
    this.getTableDge()
    // 设置按钮
    if (this.tableButtons.filter(o => o.position === 'component').length > 0) {
      const that = this
      that.tableButtons.filter(o => o.position === 'component').map(function(item) {
        that.iconfontMoth.iconfont(item)
      })
    }
  },
  watch: {
    // 监听网格刷新KEY标识
    refreshTableKey(newVal, oldVal) {
      if (newVal !== '' && newVal !== null && newVal !== oldVal) {
        var that = this
        if (that.tableCols.length > 0) {
          that.dropTableCols = that.copyTableCols(that.dynamicTableCols)
          that.oneTableKey = 'oneTableKey' + this.$utils.generateId()
        }
      }
    }
  },
  activated() {
    if (!this.isPopups) {
      if (!this.isNoTableHeight) {
        this.setTableHeight(true, true)
      }
    }
  },
  mounted() {
    // 网格拖动-行拖动，列拖动优先
    if (this.isRowDrop === true) {
      this.rowDrop()
    }
    // 网格拖动-列拖动
    if (this.isColumnDrop === true) {
      this.columnDrop()
    }

    // 设置网格高度自适应
    window.addEventListener('resize', () => {
      if (!this.isPopups) {
        if (!this.isNoTableHeight) {
          this.setTableHeight(true, true)
        }
      }
    })
    // 隐藏更多按钮
    this.hideMoreBtn()
  },
  // 更新后操作
  updated() {
    const that = this
    if (that.isUpdated === false) {
      that.$nextTick(() => {
        if (that.isUpdated === false) {
          that.setTableHeight()
        }
        if (!that.$refs.conHeight || that.$refs.conHeight.offsetHeight > 20) {
          that.isUpdated = true
        }
      })
    }
    if (that.isSetValUpdated === false) {
      // 设置常量
      that.setConstValue()
    }
  },
  methods: {
    // 查询方法（apiConfig:api配置对象，apiQueryRow:表格中台返回网格的字段）
    // dataType：查询类型（null/空：默认为返回json格式，excel：导出excel）（注：由于mock没有模拟文件流返回，所以mock请求方式下导出excel文件内容还是json）
    // size：导出excel时设置size
    // filterObj：过滤对象
    // cb：回调函数
    // dto:传输对象，默认为：null，用于数据的传输，如：dto.formField...
    queryTable(page, dataType, size, filterObj, cb, dto) {
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
        for (const key in this.unFormField) {
          if (curFormField[key] !== undefined) {
            delete curFormField[key]
          }
        }
      }

      const curApiQueryRow = []
      this.$utils.deepClone(curApiQueryRow, this.apiQueryRow)

      const queryObj = this.$utils.getInputParam(curFormField, this.apiConfig, size, page, this.listQuery, curApiQueryRow, this.dynamicApiStyle)
      if (this.listQuery._orders && this.listQuery._orders.length > 0) {
        queryObj.variables._orders = this.listQuery._orders
      }

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
          if (response.msg) {
            this.$message({
              message: response.msg,
              type: 'warn',
              uration: 2000
            })
          }
          return
        }

        if (dataType === 'excel') {
          // 下载Excel
          this.downloadExcel(response)
        } else {
          // 查询后回调钩子
          this.execCallBack('onQueryReturn', response)

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
    // 同步（syncFields：同步字段（多个以“,”隔开））
    synchrony(syncFields) {
      if (this.$refs[this.tableRef] && this.$refs[this.tableRef].selection) {
        // 获取选择行的值 this.$refs[this.tableRef]获取网格  需要在网格添加ref=this.tableRef的值
        const selectData = this.$refs[this.tableRef].selection
        if (selectData.length > 0) {
          var selectIndexSort = []
          for (var k in selectData) {
            selectIndexSort.push(selectData[k].index)
          }
          // 选择行重新排序
          selectIndexSort.sort(function (a, b) {
            return a > b ? 1 : -1
          })
          for (var i = 1; i < selectIndexSort.length; i++) {
            // 将选择第一行的某个字段数据赋给其他选择行, 可以多个，以“,”隔开
            if (syncFields.indexOf(',') > -1) {
              var arrSyncFields = syncFields.split(',')
              for (var j = 0; j < arrSyncFields.length; j++) {
                this.list[selectIndexSort[i]][arrSyncFields[j]] = this.list[selectIndexSort[0]][arrSyncFields[j]]
              }
            } else {
              this.list[selectIndexSort[i]][syncFields] = this.list[selectIndexSort[0]][syncFields]
            }
          }
        }
      }
    },
    // 清空弹窗数据
    clearData() {
      this.reset()
      this.clearList()
      this.listQuery = {
        pageIndex: 1,
        pageSize: this.dynamicPageSize
      }
      this.listIndex = {
        pageIndex: 1,
        pageSize: this.dynamicPageSize
      }
    },
    // 清空网格数据
    clearList() {
      this.list = []
    },
    // 重置
    reset() {
      this.execCallBack('onBeforeReset', this.formField, this.backFormField)
      this.$utils.deepClone(this.formField, this.backFormField)
      this.execCallBack('onAfterReset', this.formField, this.backFormField)
      this.$utils.resetMulComp(this)
    },
    // 导出网格
    // pageSize=-1：全部符合条件的记录
    exportExcel(excelName, excelSheetName, pageSize) {
      if (excelName) {
        this.excelName = excelName
      } else {
        if (this.$route.matched.length > 0 && this.$route.matched[this.$route.matched.length - 1].meta) {
          const now = this.$utils.parseTime(new Date(), '{y}{m}{d}{h}{i}{s}')
          this.excelName = this.$route.matched[this.$route.matched.length - 1].meta.title.replace('/', '') + now
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
    // 构建导出Excel中台参数
    buildExportParam(queryObj, paramsObj) {
      var tmpCols = this.tableCols.filter(o => o.hidden !== true)
      tmpCols = JSON.parse(JSON.stringify(tmpCols))
      // 网格列对象转为excel列对象
      var excelCols = {}
      for (var i = 0; i < tmpCols.length; i++) {
        if (tmpCols[i].prop !== 'controlBtn') {
          if (this.unApiQueryRow && this.unApiQueryRow.length > 0) {
            if (this.unApiQueryRow.indexOf(tmpCols[i].prop) > -1) {
              continue
            }
          }
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
    // 下载Excel
    downloadExcel(data) {
      this.$utils.downloadFile(data, this.excelName)
    },
    // 选中网格行
    handleTableRowChange(val) {
      if (this.isShowSelect === true) {
        // 补充点击行多选标记
        if (this.isClickShowSelect === true) {
          this.$refs[this.tableRef].toggleRowSelection(val)
        }
      }
      this.currentRow = val
      // 判断父组件是否需要接收选中行数据
      if (this.$parent.clickRowsData !== undefined) {
        this.$parent.clickRowsData = this.currentRow
      }
      // 判断父组件是否需要处理选中事件
      if (!this.execCallBack('onRowClick', this.currentRow)) {
        if (typeof this.$parent.selectRowsData === 'function') {
          this.$parent.selectRowsData(this.currentRow)
        } else if (this.$parent.$parent && typeof this.$parent.$parent.selectRowsData === 'function') {
          this.$parent.$parent.selectRowsData(this.currentRow)
        }
      }
    },
    // 处理双击事件
    handleTableRowDbClick(row, column, event) {
      if (this.isShowSelect === true) {
        // 多选
        if (this.isClickShowSelect === true) {
          this.$refs[this.tableRef].toggleRowSelection(row, true)
        }
      }
      const rowIndex = this.list.indexOf(row)
      // 回传事件
      if (!this.execCallBack('onRowDbClick', row, column, event, rowIndex)) {
        // 没有定义回调事件时执行（回调事件优先）
        if (this.$parent) {
          if (this.$parent.handleTableRowDbClick) {
            this.$parent.handleTableRowDbClick(row, column, event, rowIndex)
          } else if (this.$parent.$parent.handleTableRowDbClick) {
            this.$parent.$parent.handleTableRowDbClick(row, column, event, rowIndex)
          }
        }
      }
    },
    // 获取网格中需要判断的属性
    getTableDge() {
      if (this.dropTableCols.length) {
        this.dropTableCols.forEach(element => {
          if (element.taleColor) {
            return this.isTableColor === element.prop
          }
        })
      }
    },
    // 获取网格中需要判断的属性 - 逻辑处理
    getIsTableDge(data) {
      if (parseFloat(data[this.isTableColor]) < 0) {
        return 'color:red !important;'
      } else {
        return ''
      }
    },
    // 获取数据判断是否置灰
    getIsShowNone(row, compareNone, compareNoneVal) {
      if (!compareNone || !compareNoneVal) {
        return false
      }
      const newCompareNone = compareNone.split(',')
      const newcompareNoneVal = compareNoneVal.split(',')
      if (newCompareNone.length === 1 && newcompareNoneVal.length === 1) {
        return row[newCompareNone[0]] === newcompareNoneVal[0]
      } else {
        let bool = false
        newCompareNone.forEach(element => {
          newcompareNoneVal.forEach(element1 => {
            if (row[element] === element1) {
              bool = true
            }
          })
        })
        return bool
      }
    },
    // 当用户手动勾选数据行的 Checkbox 时触发的事件
    checkSelect(selection, row) {
      this.execCallBack('onCheckSelect', selection, row)
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    checkSelectAll(selection) {
      this.execCallBack('onCheckSelectAll', selection)
    },
    // 当选择项发生变化时会触发该事件
    checkSelectChange(selection) {
      this.execCallBack('onCheckSelectChange', selection)
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
    changeToggleParam(isClick) {
      this.toggleParam = !this.toggleParam
      if (this.toggleParam) {
        this.moreBtnIcon = 'el-icon-minus'
      } else {
        this.moreBtnIcon = 'el-icon-plus'
      }
      this.setTableHeight(undefined, isClick)
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
    // val:值, codeField:绑定formField的字段名称, comType:组件类型（预留），textField：只有非propus有效
    getComponentCode(val, txt, codeField, comType, popupsKey, textField, otherField, selectData) {
      // 根据popupsKey找到对应的弹窗key的弹窗组件
      var dynamicPopup = this.dynamicComponents.filter(o => o.compKey === popupsKey)
      if (dynamicPopup.length > 0) {
        // 弹窗赋值
        if (comType === 'propus' && !this.$utils.isEmpty(popupsKey)) {
          if (dynamicPopup[0].popups && dynamicPopup[0].popups.state) {
            // 弹窗状态不是为已打开才进行计算
            dynamicPopup[0].popups.state = false
            dynamicPopup[0].popups.key = codeField + this.$utils.generateId()
          }
        }
        // 执行自定义事件-赋值前
        if (typeof dynamicPopup[0].change === 'function') {
          dynamicPopup[0].change.call(this, val)
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

      if (dynamicPopup.length > 0) {
        // 执行自定义事件-赋值后
        if (typeof dynamicPopup[0].changed === 'function') {
          dynamicPopup[0].changed.call(this, val)
        }
      }

      // 回调对象：当表单中组件回传值时触发
      this.execCallBack('onCompCodeChange', popupsKey, textField, otherField, selectData, val, txt, codeField, comType)
      // if (this.callbackObj && this.callbackObj.onCompCodeChange) {
      //   this.callbackObj.onCompCodeChange.call(popupsKey, comType, otherField, selectData)
      // }
    },
    // 其它选中对象（查询条件）返回值
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
    // 获取（网格中）组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:网格行索引（row.index），textField：只有非propus有效
    getRowComponentCode(val, txt, codeField, comType, popupsKey, textField, otherField, selectData) {
      switch (codeField) {
        default:
          // 普通赋值
          if (this.list[comType].hasOwnProperty(codeField)) {
            this.list[comType][codeField] = val

            // 执行自定义事件
            const col = this.tableCols.filter(o => o.isComponent === true && o.comps && o.comps.length > 0 &&
              o.comps.filter(fo => fo.compKey === popupsKey && fo.codeField === codeField).length > 0)
            if (col && col.length > 0) {
              const colComp = col[0].comps.filter(fo => fo.compKey === popupsKey && fo.codeField === codeField)
              if (colComp && colComp.length > 0 && typeof colComp[0].change === 'function') {
                // 返回call(val, index, row)
                colComp[0].change.call(this, val, comType, this.list[comType])
              }
            }
          }
          if (textField && this.list[comType].hasOwnProperty(textField)) {
            this.list[comType][textField] = txt
          }
          // 其它选中对象返回值
          this.setRowOtherField(comType, otherField, selectData)

          // 回调对象：当网格中组件回传值时触发
          this.execCallBack('onRowCompCodeChange', popupsKey, comType, otherField, selectData, val, txt, codeField)
          // if (this.callbackObj && this.callbackObj.onRowCompCodeChange) {
          //   this.callbackObj.onRowCompCodeChange.call(popupsKey, comType, otherField, selectData, val)
          // }
          break
      }
    },
    // 其它选中对象（网格中）返回值
    setRowOtherField(comType, otherField, selectData) {
      if (otherField && otherField !== '' && selectData && selectData.constructor === Array) {
        var arrOtherField = otherField.split(',')
        for (var i = 0; i < arrOtherField.length; i++) {
          var arrOtherFieldVal = arrOtherField[i].split('-')
          if (arrOtherFieldVal.length === 1) arrOtherFieldVal.push(arrOtherFieldVal[0])
          if (this.list[comType].hasOwnProperty(arrOtherFieldVal[1])) {
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
            this.list[comType][arrOtherFieldVal[1]] = strOtherCode
          }
        }
      }
    },
    // 执行网格中组件事件
    getRowClickEvent(rowIndex, val, codeField, colIndex, compIndex) {
      const tmpTableCols = this.tableCols.filter(o => o.hidden !== true)
      if (tmpTableCols[colIndex].comps && tmpTableCols[colIndex].comps[compIndex] && tmpTableCols[colIndex].comps[compIndex].clickEvent) {
        tmpTableCols[colIndex].comps[compIndex].clickEvent.call(this, rowIndex, val, codeField, colIndex, compIndex)
      }
    },
    // 设置网格高度
    setTableHeight(isResize, isClick) {
      const that = this
      if (!that.dynamicTableDefultHeight) {
        that.$nextTick(() => {
          that.tableHeight = that.$utils.setTableHeight(that, isResize, that.tableHeight, null, null, that.dynamicIsResetMargin, isClick)
          // 网格高度重设事件
          that.execCallBack('onTableReSize', that.tableHeight)
        })
      } else {
        that.$nextTick(() => {
          that.tableHeight = that.dynamicTableDefultHeight
        })
      }
    },
    // 隐藏more btn
    hideMoreBtn() {
      var maxControlCount = this.defalutCount > 0 ? this.defalutCount : 4
      if (this.isShowMoreBtn === true && this.tableComponents.length <= maxControlCount) {
        this.isShowMoreBtn = false
      }
    },
    // 行拖动
    rowDrop() {
      // const tbody = document.querySelector('.el-table__body-wrapper tbody')
      // const _this = this
      // this.$Sortable.create(tbody, {
      //   onEnd({ newIndex, oldIndex }) {
      //     const currRow = _this.list.splice(oldIndex, 1)[0]
      //     _this.list.splice(newIndex, 0, currRow)
      //   }
      // })
    },
    // 列拖动
    columnDrop() {
      // const that = this
      // const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      // that.$Sortable.create(wrapperTr, {
      //   animation: 180,
      //   delay: 0,
      //   onEnd: evt => {
      //     // 减去“序号列”
      //     var oldIndex = evt.oldIndex - 1
      //     var newIndex = evt.newIndex - 1
      //     if (that.isShowSelect === true) {
      //       // 减去“选择”列
      //       oldIndex--
      //       newIndex--
      //     }
      //     const oldItem = that.dropTableCols[oldIndex]
      //     that.dropTableCols.splice(oldIndex, 1)
      //     that.dropTableCols.splice(newIndex, 0, oldItem)
      //     that.$ConfigCache.CacheConfig.setColsInfo(that.$parent.$route.path, that.dropTableCols)
      //   }
      // })
    },
    // 复制网格字段
    copyTableCols(tableCols) {
      var colsObj = tableCols.filter(o => o.hidden !== true)
      // var cols = JSON.parse(JSON.stringify(colsObj))
      return colsObj
    },
    // 设置常量值
    setConstValue() {
      const that = this
      that.$utils.setConstValue(that, 'tableComponents', function (succ) {
        that.isSetValUpdated = succ
      })
    },
    // 选择列checkbox是否生效
    getSelectable(row, index) {
      // 回调对象：判断网购中checkbox是否生效
      const returnObj = this.execReturnBack('onSelectable', row, index, this.parentTableRef)
      if (returnObj.hasExec === true) {
        return returnObj.returnValue
      }
      // 判断父组件是否可以进行选择列checkbox生效设置
      // console.log(this.$parent)
      if (typeof this.$parent.getSelectable === 'function') {
        return this.$parent.getSelectable(row, index, this.parentTableRef)
      } else if (this.$parent.$parent && typeof this.$parent.$parent.getSelectable === 'function') {
        return this.$parent.$parent.getSelectable(row, index, this.parentTableRef)
      }
      return true
    },
    // 执行返回事件
    execReturnBack() {
      const returnObj = {}
      // 是否有只想回调方法
      returnObj.hasExec = false
      if (arguments && arguments.length > 0) {
        const funcName = arguments[0]
        if (typeof this.callbackObj[funcName] === 'function') {
          const args = []
          if (arguments.length > 1) {
            for (let i = 1; i < arguments.length; i++) {
              args.push(arguments[i])
            }
          }
          returnObj.returnValue = this.callbackObj[funcName](...args)
          returnObj.hasExec = true
        }
      }
      return returnObj
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
    // tableComponents 循环pageArea 分组
    getPageArea() {
      if (this.pageAreas.length === 0) {
        this.pageAreas = this.$utils.getPageArea(this, 'tableComponents')
      }
      return this.pageAreas
    },
    // 左右按钮点击滑动距离判断
    leftScroll(num) {
      const that = this
      if (that.$refs[that.tableRef] === undefined) {
        return
      }
      // 获取移动个数列的宽度
      // 1.获取非固定列的数组
      if (that.iindex > 0) {
        const allColumnArr = document.querySelector('.crmonepage-hello .el-table__header').getElementsByTagName('th')
        const columnWidthArr = []
        for (var i = 0; i < allColumnArr.length; i++) {
          if (allColumnArr[i].classList[2] !== 'is-hidden') {
            // 剔除固定列
            columnWidthArr.push(allColumnArr[i].offsetWidth)
          }
        }
        // 左滑动完成，终止
        if (that.iindex <= 0) {
          that.isDefaultLeft = true
          that.isDefaultRight = false
          return
        }
        // scrollLeft距离
        var moveDistance = 0
        that.iindex = that.iindex - num
        if (that.iindex > 0) {
          for (let i = 0; i < columnWidthArr.length; i++) {
            moveDistance = moveDistance + parseFloat(columnWidthArr[i])
            //  遍历到滚动的节点，终止
            if (i === that.iindex - 1) {
              break
            }
          }
        }
      }
      that.$refs[that.tableRef].$refs.bodyWrapper.style.scrollBehavior = 'smooth'
      that.$refs[that.tableRef].$refs.bodyWrapper.scrollLeft = moveDistance
      if (moveDistance && moveDistance > 0) {
        that.isDefaultLeft = false
        that.isDefaultRight = false
      } else {
        that.isDefaultLeft = true
        that.isDefaultRight = false
      }
      return
    },
    rightScroll(num) {
      const that = this
      if (that.$refs[that.tableRef] === undefined) {
        return
      }
      // 获取移动个数列的宽度
      // 1.获取非固定列的数组
      const allColumnArr = document.querySelector('.crmonepage-hello .el-table__header').getElementsByTagName('th')
      const columnWidthArr = []
      for (var i = 0; i < allColumnArr.length; i++) {
        if (allColumnArr[i].classList[2] !== 'is-hidden') {
          // 剔除固定列
          columnWidthArr.push(allColumnArr[i].offsetWidth)
        }
      }
      // 右滑动完成，终止
      if (that.iindex >= columnWidthArr.length) {
        that.isDefaultLeft = false
        that.isDefaultRight = true
        return
      }
      if (that.isDefaultRight === true) {
        return
      }

      var moveDistance = 0
      that.iindex = that.iindex + num
      for (let i = 0; i < columnWidthArr.length; i++) {
        moveDistance = moveDistance + parseFloat(columnWidthArr[i])
        //  遍历到滚动的节点，终止
        if (i === that.iindex - 1) {
          break
        }
      }
      that.$refs[that.tableRef].$refs.bodyWrapper.style.scrollBehavior = 'smooth'
      that.$refs[that.tableRef].$refs.bodyWrapper.scrollLeft = moveDistance
      //  scrollLeft距离
      // 固定列宽度
      // let fixedWidth = document.querySelector('.crmonepage-hello .el-table__fixed').getBoundingClientRect().width
      //  框架宽度
      const frameworkWidth = document.querySelector('.filter-params-e3s').getBoundingClientRect().width
      //  所有列宽度
      const allColumWidth = document.querySelector('.crmonepage-hello .el-table__header').getBoundingClientRect().width
      const scrollLeftWidth = allColumWidth - frameworkWidth
      if (moveDistance >= parseFloat(scrollLeftWidth)) {
        that.isDefaultLeft = false
        that.isDefaultRight = true
      } else {
        that.isDefaultLeft = false
        that.isDefaultRight = false
      }
      return
    },
    // 是否出现滑动按钮
    isOverWidth() {
      // 是否使用滑动按钮
      if(this.$config.isShowTableSlide === false) {
        return
      }
      if (this.isShowMoveIcon === false || this.tableCols.length === 0) {
        return
      }
      // 所有网格元素宽度
      const that = this
      const allColumnWidth = document.querySelector('.crmonepage-hello .el-table__header').getBoundingClientRect().width + 1
      // 框架右侧宽度
      const frameWidth = document.querySelector('.filter-params-e3s').getBoundingClientRect().width
      if (allColumnWidth > frameWidth) {
        // 出现左右滑动按钮
        that.isOver = true
      } else {
        that.isOver = false
      }
    },
    // 获取滚动条左右移图标
    getBtnClass(type) {
      let className = ''
      if ((type === 'left' && this.isDefaultLeft) || (type === 'right' && this.isDefaultRight)) {
        className = 'page-' + type + 'ScrollButton-default'
      } else {
        className = 'page-' + type + 'ScrollButton-click'
      }
      // 是否包含分页组件
      if (this.isShowPagination === false || this.tableCols.length === 0) {
        // 是否包含底部按钮
        if (this.isshowSearchTableButton && this.isPopups && this.tableButtons.filter(o => o.position === 'left').length !== 0) {
          if (this.isIE) {
            className += ' page-scrollButton-noPage-hasBtn-ie'
          } else {
            className += ' page-scrollButton-noPage-hasBtn'
          }
        } else {
          if (this.isIE) {
            className += ' page-scrollButton-noPage-ie'
          } else {
            className += ' page-scrollButton-noPage'
          }
        }
      } else {
        // 是否包含底部按钮
        if (this.isshowSearchTableButton && this.isPopups && this.tableButtons.filter(o => o.position === 'left').length !== 0) {
          if (this.isIE) {
            className += ' page-scrollButton-hasBtn-ie'
          } else {
            className += ' page-scrollButton-hasBtn'
          }
        } else {
          if (this.isIE) {
            className += ' page-scrollButton-ie'
          }
        }
      }
      return className
    },
    // 排序改变时触发事件
    onSortChange(evtObj) {
      if (evtObj && evtObj.order && evtObj.order !== null) {
        this.listQuery._orders = evtObj.prop + ':' + (evtObj.order === 'ascending' ? 'asc' : 'desc')
      } else {
        this.listQuery._orders = ''
      }
      this.queryTable()
    },
    receiveEvent(clickEvent) {
      if (clickEvent === null || clickEvent === undefined) {
        console.info('empty event')
      } else {
        clickEvent.call()
      }
    },
    // 按钮方法
    doChildEvent(clickEvent, args, name) {
      args = args || {}
      if (typeof clickEvent === 'function') {
        clickEvent({ ...args })
      } else {
        if (clickEvent) {
          let t = this.$parent
          while (!t[clickEvent]) {
            t = t.$parent
          }
          t[clickEvent]({ ...args })
        }
      }
    },
    columnWidthChange(newWidth, oldWidth, column) {
      // var index = this.tableCols.findIndex(o => o.prop === 'car')
      this.$ConfigCache.CacheConfig.setColsWidthInfo(newWidth, oldWidth, column, this.$parent.$route.path)
    }
  }
}
