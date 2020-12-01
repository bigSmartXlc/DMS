// 通用输入框（包含弹窗图标）
// 使用场景：文本输入框
export const inputMixins = {
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
      // 单选多选（false:单日期,true:双日期）
      isMul: false,
      curLabelName: this.labelName,
      curisFunc: this.isFunc,
      // 绑定传入值并同步界面数据
      modelCode: this.isMul === true ? (this.code !== '' && this.code ? this.code.split(',') : []) : (this.code !== null && this.code !== undefined ? this.code : ''),
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
      this.modelCode = this.isMul === true ? (val !== '' && val ? val.split(',') : []) :( val  !== null &&  val  !== undefined ? val : '')
    },
    // 传入需校验数据
    modelCode(curVal, oldVal) {
      if (this.isRequire) {
        this.$utils.validataMoth(this, 'inputMixins')
      }
      true
    },
    isShow(val){
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
    disabled(val){
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
        this.modelCode = this.isMul === true ? [] : ''
      }
      var code = this.isMul === false ? this.modelCode : this.modelCode.join(',')
      // comType: 数据行索引，colIndex：列索引，compIndex：列中的组件（如果有）索引
      this.$emit('clickEvent', this.comType, code, this.codeField, this.colIndex, this.compIndex)
    },
    // 清除
    clearCode() {
      this.modelCode = this.isMul === true ? [] : ''
      this.sendCode()
    },
    send(type) {
      if (this.modelCode === null) {
        this.modelCode = this.isMul === true ? [] : ''
      }
      var code = this.isMul === false ? this.modelCode : this.modelCode.join(',')
      var text = ''
      this.$emit(type, code, text, this.codeField, this.comType, this.popupsKey)
    },
    // 设置组件是否显示
    setIsShow(isShow) {
      this.curIsShow = isShow
      this.fullComponentKey = 'input' + this.$utils.generateId()
    },
    // 设置组件的赋值字段
    setCopy(copyCode) {
      if (this.isMul === true) {
        if (copyCode && this.$utils.replaceAll(copyCode, ',', '') === '') {
          this.modelCode = []
        } else {
          this.modelCode = (copyCode !== '' && copyCode ? copyCode.split(',') : [])
        }
      } else {
        this.modelCode = copyCode || ''
      }
      this.fullComponentKey = 'input' + this.$utils.generateId()
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
    }
  }
}
