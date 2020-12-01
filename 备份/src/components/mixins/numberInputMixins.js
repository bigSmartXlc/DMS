/**
 * description: 数字类型输入框混入对象
 * author: luojx
 * createdDate: 2019-07-20
 * *  2019-12-23 加入小数位数控制  luojx
 */
// 通用数字输入框
// 使用场景：文本输入框
export const numberInputMixins = {
  props: {
    // 文本框图标
    suffixIcon: {
      type: String,
      default: ''
    },
    // 行内占比
    span: {
      type: Number,
      default: 6
    },
    // 是否显示标签
    isShowLabel: {
      type: Boolean,
      default: true
    },
    // 组件是否显示
    isShow: {
      type: Boolean,
      default: true
    },
    // 是否可清除
    clearable: { type: Boolean, default: true },
    // 默认选中
    code: {
      default: null
    },
    // 控件label名称
    labelName: {
      type: String,
      default: ''
    },
    // 网格中使用组件联动，传入网格row数据对象
    curTableRow: {
      type: Object,
      default: null
    },
    // 组件类型标识（用于标识不同组件，每个视图中唯一）(预留)
    comType: {
      type: String,
      default: ''
    },
    // 组件传值字段名称（与code对象绑定的字段名称，即视图中：formField对应的字段名称）
    // 如：视图中配置：code="formField.carBrandCode"，则codeField="carBrandCode"
    codeField: {
      type: String,
      default: ''
    },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: {
      type: String,
      default: ''
    },
    // 对应弹窗的key
    popupsKey: {
      type: String,
      default: ''
    },
    // 是否不可用
    disabled: {
      type: Boolean,
      default: false
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否不填/选
    isRequire: {
      type: Boolean,
      default: false
    },
    // 是输入框还是文本框
    inputType: {
      type: String,
      default: 'Number'
    },
    // 小数点保留位数（默认两位）
    decPoint: {
      type: Number,
      default: 2
    },
    // 数字间隔
    step: {
      type: Number,
      default: null
    },
    // 是否网格中组件
    isColComp: {
      type: Boolean,
      default: false
    },
    // 字段格式（type=show或value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2
    // 监听组件显示：show:监听字段(父组件formField的对应字段)-显示组件值-隐藏组件值
    parentFileds: {
      type: String,
      default: ''
    },
    // 表单校验规则
    validrule: {
      type: Object,
      default: () => {}
    },
    // 数据传输对象
    // 当前已使用：
    // min: 最小值
    // max: 最大的值
    // isType:
    // decPoint: 保留小数位数（替换上面decPoint的值）
    dataToObject: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      curLabelName: this.labelName,
      // 绑定传入值并同步界面数据
      modelCode: this.$utils.getNumber(this.code, this.decPoint),
      // 组件是否显示
      curIsShow: this.isShow,
      // 组件Key
      fullComponentKey: '',
      // 步长
      curStep: this.step !== null ? this.step : (this.decPoint > 0 ? 1 / Math.pow(10, this.decPoint) : null)
    }
  },
  // 监听传入参数变化
  watch: {
    code(val) {
      this.modelCode = this.$utils.getNumber(this.code, this.decPoint)
    },
    // 传入需校验数据
    modelCode(curVal, oldVal) {
      if (this.isRequire) {
        this.$utils.validataMoth(this, 'numberInputMixins')
      }
      true
    },
    curTableRow: {
      handler(newValue, oldValue) {
        // 网格中组件刷新
        if (this.isColComp === true) {
          // 刷新校验组件状态
          this.$utils.validataMoth(this, 'numberInputMixins')
        }
      },
      deep: true
    }
  },
  methods: {
    // 把变更值传出
    sendCode() {
      if (this.dataToObject && this.dataToObject.isType) {
        if (this.modelCode < 0) {
          this.$message({
            message: '最小输入目标量为0' /* 请选择需要保存的数据*/ ,
            type: 'warning',
            duration: 2000
          })
          this.modelCode = 0
        } else if (this.modelCode > 10000) {
          this.$message({
            message: '最大输入目标量为10000' /* 请选择需要保存的数据*/ ,
            type: 'warning',
            duration: 2000
          })
          this.modelCode = 10000
        }
      }
      if (this.isRequire) {
        this.$utils.validataMoth(this, 'numberInputMixins')
      }
      this.send('changeCode')
    },
    // 文本框focus事件
    sendFocusCode() {
      this.send('focusCode')
    },
    // 清除
    clearCode() {
      this.modelCode = null
      this.sendCode()
    },
    send(type) {
      var code = null
      if (this.modelCode == null || this.modelCode == '') {
        code = ''
      } else if (typeof this.modelCode === 'number') {
        code = this.modelCode
      } else if (typeof this.modelCode === 'string') {
        code = parseFloat(this.modelCode)
      }
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
      this.modelCode = copyCode
      this.fullComponentKey = 'input' + this.$utils.generateId()
    },
    // 设置计算表达式值
    // obj:父组件字段对应的对象（如：formField）
    // formObjName:对象名称（如：formField）
    setCalculateValue(obj, value) {
      if (obj != null && this.parentFileds && this.parentFileds.length > 0) {
        this.modelCode = this.$utils.getNumber(value, this.decPoint)
        this.sendCode()
      }
    }
  }
}
