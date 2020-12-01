// 通用文本链接按钮
// 使用场景：网格中的链接（如：编辑、删除）
export const linkButtonMixins = {
  props: {
    // 传入值
    code: { type: String, default: '' },
    // 代码字段，这里传按钮控件的唯一编（如controlBtn）
    codeField: { type: String, default: '' },
    // 控件传入label名称
    labelName: { type: String, default: '' },
    // 组件类型标识（用于标识不同组件，每个视图中唯一）(预留)
    comType: { type: String, default: '' },
    // 是否显示标签
    isShowLabel: { type: Boolean, default: true },
    // 是否显示组件
    isShow: { type: Boolean, default: true },
    // 字段格式（type=show或value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2
    // 监听组件显示：show:监听字段(父组件formField的对应字段)-显示组件值-隐藏组件值
    parentFileds: { type: String, default: '' },
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
    // 是否置灰
    isShowNone: { type: Boolean, default: false }
  },
  data() {
    return {
      // 控件label名称
      curLabelName: this.labelName,
      // 是否显示标签
      curIsShowLabel: this.isShowLabel,
      // 是否显示组件
      curIsShow: this.isShow,
      // 组件Key
      fullComponentKey: '',
      // 是否置灰
      curIsShowNone:this.isShowNone
    }
  },
  created() {
    // 网格中组件刷新
    if (this.isColComp === true) {
      // 设置网格中组件查询字段（如果当前组件存在于网格中）
      this.$utils.setRowQueryFields(this, 'rowFileds')
    }
  },
  watch: {
    isShow(val) {
      this.curIsShow = val
    },
    curTableRow: {
      handler(newValue, oldValue) {
        // 网格中组件刷新
        if (this.isColComp === true) {
          // 设置网格中组件查询字段（如果当前组件存在于网格中）
          this.$utils.setRowQueryFields(this, 'rowFileds')
        }
      },
      deep: true
    }
  },
  methods: {
    // 把变更值传出
    sendCode() {
      this.$emit('clickEvent', this.comType, '', this.codeField, this.colIndex, this.compIndex)
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
