// 通用复选框
// 使用场景：通用复选框、复选框组
export const checkboxMixins = {
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
    code: { type: String, default: '' },
    // 默认选中
    text: { type: String, default: '' },
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
    // 单选多选
    isMul: { type: Boolean, default: true },
    // 字段格式（type=show或value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2
    // 监听组件显示：show:监听字段(父组件formField的对应字段)-显示组件值-隐藏组件值
    parentFileds: { type: String, default: '' },
    // 表单校验规则
    validrule: { type: Object, default: () => { } },
    // 网格列索引
    colIndex: { type: String, default: '' },
    // 网格列中组件索引
    compIndex: { type: String, default: '' }
  },
  data() {
    return {
      curLabelName: this.labelName,
      curisFunc: this.isFunc,
      // 绑定传入值并同步界面数据
      modelCode: [],
      // 组件是否显示
      curIsShow: this.isShow,
      curClickMoth: this.clickMoth,
      // 组件Key
      fullComponentKey: '',
      truelable:""
    }
  },
  // 监听传入参数变化
  watch: {
    code(curVal) {  
      const tmpVal = curVal || ''
      this.modelCode = this.isMul === true ? (tmpVal !== '' ? tmpVal.split(',') : []) : tmpVal || ''
    },
    // 传入需校验数据
    modelCode(curVal, oldVal) {
    
      if (this.isRequire) {
        this.$utils.validataMoth(this, 'checkboxMixins')
      }
      true
    }
  },
  methods: {
    // 把变更值传出
    sendCode(val) {
      if (this.modelCode === null||this.modelCode==="") {
        this.modelCode = this.isMul === true ? [] : ''
      }
      var code = this.isMul === true ? this.modelCode.join(',') : this.modelCode
      this.modelCode=this.code.split(",")
      this.$emit('changeCode', code, '', this.codeField, this.comType, this.popupsKey)
    },
    // 清除
    clearCode() {
      this.modelCode = ''
      this.sendCode()
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
    }
  }
}
