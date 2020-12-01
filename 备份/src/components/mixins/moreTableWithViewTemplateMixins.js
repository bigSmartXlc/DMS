// 多网格视图/弹窗（含嵌套视图模板）混入对象
// 使用场景：使用单网格模板，适用于普通单网格页面（按钮、查询条件、网格）和类似风格的弹窗，需要跟模板进行传值
export const moreTableWithViewTemplateMixins = {
  props: {
    // 弹出是否显示
    popupsVisible: { type: Boolean, default: false },
    // 从网格传入的编辑行数据(json)（如果为弹窗时使用）
    dynamicEditRowData: { type: Object, default: function () { return {} } },
  },
  data() {
    return {
      // 弹出是否显示
      curPopupsVisible: this.popupsVisible,
      // 弹窗网格KEY
      popupsTableKey: 'popupsTableKey',
      // 判断全部必填是否已完成
      valid: true,
      // 必填项查询组件
      validateValue: [],
      // 监听对象（如：{formFieldName:'formField', tableComponentsName:'tableComponents', tableRef:'multipleTable'）
      watchObj: [],
      // 是否已经执行watch
      hasWatched: false,
      // 首个focus组件
      comFocus: {}
    }
  },
  created() {
    this.execCreated()
  },
  methods: {
    // 创建事件
    execCreated() {
      var that = this
      // 联动组件获取父组件传值
      that.$nextTick(() => {
        // 监听
        that.watchComp()
      })
    },
    // 支持多网格ref查询
    // valid：true 不需验证查询条件，false 需要验证查询条件 size:查询条件
    query(tableRef, valid,size) {
      this.queryTable(1, null, size, null, null, null, tableRef, valid)
    },
    // 下网格
    queryButton(cb,tableRef, valid,size) {
      this.queryTable(1, null, size, null, cb, null, tableRef, valid)
    },
    // 调用嵌套视图模板方法
    // dto:传输对象，默认为：null，用于数据的传输，如：dto.formField...
    // valid：true 不需验证查询条件，false 需要验证查询条件
    queryTable(page, dataType, size, filterObj, cb, dto, tableRef, valid) {
      if (valid !== false) {
        // validpopups 组件弹窗  validpage 表单查询
        this.$utils.validataMoth(this, 'validpage', null, tableRef)
      }
      if (valid === false || this.valid) {
        this.$refs[tableRef].queryTable(page, dataType, size, filterObj, cb, dto)
      }
    },
    // 重置
    reset(tableRef) {
      this.$refs[tableRef].reset()
    },
    // 导出
    exportExcel(excelName, excelSheetName, pageSize, tableRef) {
      this.$refs[tableRef].exportExcel(excelName, excelSheetName, pageSize)
    },
    // 同步（syncFields：排序字段（多个以“,”隔开），isSort：是否重新排序）
    synchrony(syncFields, tableRef) {
      if (this.$refs[tableRef].synchrony) {
        this.$refs[tableRef].synchrony(syncFields)
      }
    },
    // 获取（网格中）组件回传值
    // val:值, codeField:绑定formField的字段名称, comType:网格行索引（row.index），textField：只有非propus有效
    getRowComponentCode(val, txt, codeField, comType, popupsKey, textField, otherField, selectData, tableRef) {
      this.$refs[tableRef].getRowComponentCode(val, txt, codeField, comType, popupsKey, textField, otherField, selectData)
    },
    // 联动组件获取父组件传值
    // 监听parentFileds字段格式（type=show|value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(父组件)1-对应子组件字段1|监听字段(父组件)2-对应子组件字段2
    // 监听组件显示：show:监听字段(父组件)-显示组件值-隐藏组件值
    watchComp() {
      var that = this
      if (that.watchObj.length > 0 && that.hasWatched !== true) {
        that.hasWatched = true
        that.watchObj.forEach((item, index) => {
          // value/show/copy/set
          that.$utils.watchComp(that, false, item.formFieldName, false, item.tableComponentsName, item.tableRef)
          // disabled
          that.$utils.setDisable(that, item.tableComponentsName, true, item.formFieldName, null)
        })
      }
    },
    // 设置组件不可编辑的其它设置（譬如：循环设置等）
    // 此方法为空方法，有需要的可以在页面/表单上自行覆盖重写
    otherSetDisable(that, compObjName) { },
    // 选择列checkbox是否生效（默认为true，需要在页面中覆盖此方法）
    getSelectable(row, index, tableRef) {
      return true
    },
    // 关闭新增、编辑弹窗（type=1，保存成功）
    // objName：当前对象名称，如：leftTable
    // tableRef：网格对应ref
    close(type, objName, tableRef) {
      this[objName].editPopupsVisible = false
      if (this[objName].resetDialogKey === true) {
        this[objName].editPopupsKey = this.$utils.generateId()
      }
      if (type === '1') {
        this.queryTable(1, null, null, null, null, null, tableRef, true)
      }
    },
    // 新增按钮事件
    // objName：当前对象名称，如：leftTable
    // tableRef：网格对应ref
    add(objName, tableRef) {
      this[objName].editRowData = {}
      this.showEdit('add', objName, tableRef)
    },
    // 编辑按钮事件
    // objName：当前对象名称，如：leftTable
    // tableRef：网格对应ref
    edit(index, objName, tableRef) {
      var curIndex = index
      const that = this.$refs[tableRef]
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
      this[objName].editRowData = that.list[curIndex]
      this.showEdit('edit', objName, tableRef)
    },
    // 显示新增、修改弹窗
    // objName：当前对象名称，如：leftTable
    // tableRef：网格对应ref
    showEdit(type, objName, tableRef) {
      if (this[objName].hasOwnProperty('editPopupsState')) {
        this[objName].editPopupsState = type
      }
      if (this[objName].hasOwnProperty('editPopupsVisible')) {
        this[objName].editPopupsVisible = true
      }
      if (this.resetDialogKey === true) {
        if (this[objName].hasOwnProperty('editPopupsKey')) {
          this[objName].editPopupsKey = this.$utils.generateId()
        }
      }
    },
    // 设置el-tabs的网格自适应高度
    setTabsTableHeight(tab, event) {
      if (tab && tab.$children && tab.$children.length > 0 && tab.$children[0].setTableHeight) {
        tab.$children[0].setTableHeight()
      }
    },
    // 关闭（弹窗时使用）
    close(type) {
      this.sendCode(type)
    },
    // 关闭弹窗（type=1，保存成功）
    sendCode(type) {
      this.$emit('close', type)
    },
    // 关闭弹窗（弹窗时）
    // 不回传数据
    closeCode() {
      this.$emit('changeCode', null, null, null, null, null, null, null, null, false)
    }
  },
  watch: {
    // 监听弹窗显示
    popupsVisible(val) {
      this.curPopupsVisible = val
      if (val === true) {
        this.execCreated()
      }
    }
  }
}
