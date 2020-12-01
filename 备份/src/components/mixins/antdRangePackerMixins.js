// 通用输入框（包含弹窗图标）
// 使用场景：文本输入框
// import moment from 'moment'
export const antdRangePackerMixins = {
  props: {
    // 文本框图标
    suffixIcon: { type: String, default: '' },
    // 行内占比
    span: { type: Number, default: 6 },
    // 是否显示标签
    isShowLabel: { type: Boolean, default: true },
    // 组件是否显示
    isShow: { type: Boolean, default: true },
    // 是否可清除
    clearable: { type: Boolean, default: true },
    // 默认选中
    code: { default: '' },
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
    // 是否只读
    readonly: { type: Boolean, default: false },
    isFunc: { type: Boolean, default: false },
    // 是否不填/选
    isRequire: { type: Boolean, default: false },
    // input事件是否触发回调
    isInput: { type: Boolean, default: false },
    // 是输入框还是文本框
    inputType: { type: String, default: 'text' },
    // 字段格式（type=show或value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2
    // 监听组件显示：show:监听字段(父组件formField的对应字段)-显示组件值-隐藏组件值
    parentFileds: { type: String, default: '' },
    // 是否显示控件
    isShowComp: { type: Boolean, default: true },
    // 是否点击文本时显示控件
    isShowCompByClick: { type: Boolean, default: false },
    // 表单校验规则
    validrule: { type: Object, default: () => { } },
    // 网格列索引
    colIndex: { type: String, default: '' },
    // 网格列中组件索引
    compIndex: { type: String, default: '' },
    // 网格中使用组件联动，传入网格row数据对象
    curTableRow: { type: Object, default: null },
    // 本组件-row对象对应字段集合：本组件字段1-row对象字段1|本组件字段2-row对象字段2
    rowFileds: { type: String, default: '' },
    // 是否网格中组件
    isColComp: { type: Boolean, default: false },
    // 组件标签宽度
    labelWidth: { type: Number, default: 80 },
    // 数据传输对象
    // 当前已使用：
    // importUrl: 导入url
    // pageSize: 每页显示
    // placeholder：空选择项文本（默认为：请选择）
    // maxWordCount：最大显示文字数
    dataToObject: { type: Object, default: () => {} }
  },
  data() {
    return {
      curLabelName: this.labelName,
      curisFunc: this.isFunc,
      // 绑定传入值并同步界面数据
      // modelCode: this.code !== '' && this.code ? [moment(this.code.split(',')[0], 'YYYY-MM-DD'), moment(this.code.split(',')[1], 'YYYY-MM-DD')] : [],
      modelCode: this.code !== '' && this.code ? this.code.split(',') : [],
      // 组件是否显示
      curIsShow: this.isShow,
      // 是否显示控件
      curIsShowComp: this.isShowComp,
      // 是否点击文本时显示控件
      curIsShowCompByClick: this.isShowCompByClick,
      curClickMoth: this.clickMoth,
      curDisabled: this.disabled,
      // 组件Key
      fullComponentKey: '',
      // 日期控件点击位置
      outSelectionEnd: 0,
      // 日期弹层日期控件点击位置（开始日期）
      selectionLeft: 0,
      // 日期弹层日期控件点击位置（结束日期）
      selectionRight: 0,
      // 最大显示文字数
      maxWordCount: this.dataToObject && this.dataToObject.maxWordCount ? this.dataToObject.maxWordCount : 6
    }
  },
  created() {
    // 网格中组件
    if (this.isColComp === true) {
      // 设置网格中组件查询字段（如果当前组件存在于网格中）
      this.$utils.setRowQueryFields(this, 'modelCode')
    }
  },
  // 监听传入参数变化
  watch: {
    code(val) {
      // this.modelCode = val !== '' && val ? [moment(this.code.split(',')[0], 'YYYY-MM-DD'), moment(this.code.split(',')[1], 'YYYY-MM-DD')] : []
      this.modelCode = val !== '' && val ? this.code.split(',') : []
    },
    // 传入需校验数据
    modelCode(curVal, oldVal) {
      if (this.isRequire) {
        this.$utils.validataMoth(this, 'inputMixins')
      }
      true
    },
    isShow(val) {
      this.curIsShow = val
    },
    isShowComp(newVal, oldVal) {
      this.curIsShowComp = this.isShowComp
    },
    curTableRow: {
      handler(newValue, oldValue) {
        // 网格中组件刷新
        if (this.isColComp === true) {
          // 设置网格中组件查询字段（如果当前组件存在于网格中）
          this.$utils.setRowQueryFields(this, 'modelCode')
        }
      },
      deep: true
    },
    disabled(val) {
      this.curDisabled = val
    }
  },
  methods: {
    // 在 Input 值改变时触发
    inputCode() {
      if (this.isInput) {
        this.send('changeCode')
      }
    },
    // 把变更值传出
    sendCode() {
      this.send('changeCode')
    },
    // 文本框focus事件
    sendFocusCode() {
      this.send('focusCode')
    },
    // 发送clickEvent事件
    sendLabelCode() {
      if (this.modelCode === null) {
        this.modelCode = []
      }
      // var code = this.modelCode[0].format('YYYY-MM-DD') + ',' + this.modelCode[1].format('YYYY-MM-DD')
      var code = this.modelCode[0] + ',' + this.modelCode[1]
      // comType: 数据行索引，colIndex：列索引，compIndex：列中的组件（如果有）索引
      this.$emit('clickEvent', this.comType, code, this.codeField, this.colIndex, this.compIndex)
    },
    // 清除
    clearCode() {
      this.modelCode = []
      this.sendCode()
    },
    send(type) {
      if (this.modelCode === null) {
        this.modelCode = []
      }
      // var code = this.modelCode.length === 0 ? ',' : this.modelCode[0].format('YYYY-MM-DD') + ',' + this.modelCode[1].format('YYYY-MM-DD')
      var code = this.modelCode.length === 0 ? ',' : this.modelCode[0] + ',' + this.modelCode[1]
      var text = ''
      this.$emit(type, code, text, this.codeField, this.comType, this.popupsKey)
    },
    // 设置组件是否显示
    setIsShow(isShow) {
      this.curIsShow = isShow
      this.fullComponentKey = 'input' + this.$utils.generateId()
      this.bindOutClick()
    },
    // 设置组件的赋值字段
    setCopy(copyCode) {
      if (copyCode && this.$utils.replaceAll(copyCode, ',', '') === '') {
        this.modelCode = []
      } else {
        // this.modelCode = (copyCode !== '' && copyCode ? [moment(copyCode.split(',')[0], 'YYYY-MM-DD'), moment(copyCode.split(',')[1], 'YYYY-MM-DD')] : [])
        this.modelCode = (copyCode !== '' && copyCode ? copyCode.split(',') : [])
      }
      this.fullComponentKey = 'input' + this.$utils.generateId()
      this.bindOutClick()
    },
    // 显示组件
    showComp(isShow) {
      this.curIsShowComp = isShow
    },
    // 点击文本显示组件
    showCompByClick() {
      if (this.isColComp === true && this.curIsShowCompByClick && !this.curIsShowComp) {
        this.curIsShowComp = true
      }
    },
    // blur事件
    inputBlur() {
      if (this.isColComp === true && this.curIsShowCompByClick && this.curIsShowComp) {
        this.curIsShowComp = false
      }
    },
    // 绑定点击事件
    bindOutClick() {
      const that = this
      that.$nextTick(() => {
        const inputs = that.$el.querySelectorAll('.ant-calendar-range-picker-input')
        if (inputs && inputs.length === 2) {
          inputs[0].addEventListener('click', function(e) {
            that.clickInput = 'left'
            that.outSelectionEnd = inputs[0].selectionEnd
          })
          // 右边日期输入框逻辑：限制不能点击小于开始日期
          inputs[1].addEventListener('click', function(e) {
            that.clickInput = 'right'
            that.outSelectionEnd = inputs[1].selectionEnd
          })
        }
      })
    },
    // 选中字符
    selectInputText(input, selectionStart, selectionEnd) {
      if (input.setSelectionRange) {
        input.focus()
        setTimeout(function() {
          input.setSelectionRange(selectionStart, selectionEnd)
        })
      } else if (input.createTextRange) {
        var range = input.createTextRange()
        range.collapse(true)
        range.moveEnd('character', selectionEnd)
        range.moveStart('character', selectionStart)
        range.select()
      }
    },
    // 往后选择
    selectTab(input) {
      if (input.selectionEnd < 10) {
        if (input.selectionEnd === input.value.length) {
          if (input.value.length === 4 || input.value.length === 7) {
            input.value = input.value + '-'
          }
        } else {
          // (input.value.length > 0 && input.selectionEnd === 0)：解决IE返回0的问题
          if ((input.value.length > 0 && input.selectionEnd === 0) || input.selectionEnd === 4) {
            this.selectInputText(input, 5, 7)
          } else if ((input.value.length === 10 && input.selectionEnd === 0) || input.selectionEnd === 7) {
            this.selectInputText(input, 8, 10)
          }
        }
      }
    },
    // 点击选中
    setClickSelect(input) {
      if (input.selectionEnd < 5) {
        this.selectInputText(input, 0, 4)
      } else if (input.selectionEnd >= 5 && input.selectionEnd <= 7) {
        this.selectInputText(input, 5, 7)
      } else {
        this.selectInputText(input, 8, 10)
      }
    }
    // 鼠标滚动事件
    // setMouseWheel(input, inInputs, e) {
    //   const that = this
    //   if (input.value.length > 0) {
    //     let start = 0
    //     let end = 0
    //     const arrVal = input.value.split('-')
    //     if (arrVal.length > 0 && input.selectionEnd <= 4) {
    //       arrVal[0] = parseInt(arrVal[0]) + (e.deltaY > 0 ? 1 : -1)
    //       start = 0
    //       end = 4
    //     } else if (arrVal.length > 1 && input.selectionEnd >= 5 && input.selectionEnd <= 7) {
    //       const month = parseInt(arrVal[1]) + (e.deltaY > 0 ? 1 : -1)
    //       arrVal[1] = month < 10 ? '0' + month : month
    //       start = 5
    //       end = 7
    //     } else if (arrVal.length > 2) {
    //       const day = parseInt(arrVal[2]) + (e.deltaY > 0 ? 1 : -1)
    //       arrVal[2] = day < 10 ? '0' + day : day
    //       start = 8
    //       end = 10
    //     }
    //     input.value = arrVal.join('-')
    //     that.selectInputText(input, start, end)
    //   } else {
    //     const date = new Date()
    //     input.value = that.$utils.parseTime(date, '{y}-{m}-{d}')
    //     that.selectInputText(input, 0, 4)
    //   }
    //   that.$refs.antdRangePacker.$refs.picker.setState({
    //     // sHoverValue: [moment(inInputs[0].value, 'YYYY-MM-DD'), moment(inInputs[1].value, 'YYYY-MM-DD')]
    //     sHoverValue: [inInputs[0].value, inInputs[1].value]
    //   })
    // }
  }
}
