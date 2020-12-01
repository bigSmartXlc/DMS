<!--
* description: 双日期选择器
* author: liXB
* createdDate: 2019-11-14
* 修改modelCode绑定形式 linwm
-->
<template>
  <el-col v-if="curIsShow" id="twoDatePicker" :key="fullComponentKey" :span="span">
    <lableName
      :validrule="validrule"
      :cur-label-name="curLabelName"
      :is-show-label="isShowLabel"
      :is-require="isRequire"
    />
    <el-date-picker
      v-model="modelCode"
      :type="dateType"
      :value-format="format"
      range-separator="-"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      unlink-panels
      :clearable="clearable"
      :disabled="disabled"
      @change="sendCode"
      @clear="clearCode"
    />
    <validateFormate :cur-label-name="curLabelName" :validrule="validrule" />
  </el-col>
</template>

<script>
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
import { inputMixins } from '@/components/mixins/inputMixins'
export default {
  name: 'TwoDatePicker',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  mixins: [inputMixins],
  props: {
    dateType: { type: String, default: 'daterange' },
    format: { type: String, default: 'yyyy-MM-dd HH:mm:ss' }
  },
  data() {
    return {
      isMul: true,
      modelCode: this.code.indexOf(',') > -1 ? this.code.split(',') : []
    }
  },
  created() {
    this.dataToObject && this.dataToObject.timer ? this.resetTime() : undefined
  },
  methods: {
    resetTime() {
      // format 默认的时间格式
      // hhmmss  默认为false有时分秒 为true没有时分秒
      // 格式 {y}-{m}-{d} {h}:{i}:{s}
      var now = new Date()
      const defaultFormat = this.dataToObject.format ? this.dataToObject.format : '{y}-{m}-{d}'
      if (defaultFormat !== '{y}-{m}-{d}') {
        this.dataToObject.hhmmss = true
      }
      let endDate = this.$utils.parseTime(now, defaultFormat)
      endDate = this.dataToObject.hhmmss ? endDate : (endDate += ' 00:00:00')
      // 年月
      endDate = this.dataToObject.format === '{y}-{m}' ? endDate += '-01 00:00:00' : endDate
      // 默认为当前时间
      if (this.dataToObject.presentTime) {
        now.setDate(now.getDate() - 1)
      }
      // 默认一周范围
      if (this.dataToObject.hebdomadTime) {
        now.setDate(now.getDate() - 6)
      }
      // 默认范围30天
      if (this.dataToObject.thirtyTime) {
        now.setMonth(now.getMonth() - 1)
        now.setDate(now.getDate() + 2)
      }
      // 默认范围3个月
      if (this.dataToObject.threeMonth) {
        now.setMonth(now.getMonth() - 2)
      }
      // 默认一个月
      if (!(this.dataToObject.presentTime || this.dataToObject.hebdomadTime || this.dataToObject.thirtyTime)) {
        now.setMonth(now.getMonth() - 1)
      }

      let beginDate = this.$utils.parseTime(now, defaultFormat)
      beginDate = this.dataToObject.hhmmss ? beginDate : (beginDate += ' 00:00:00')
      // 年月
      beginDate = this.dataToObject.format === '{y}-{m}' ? beginDate += '-01 00:00:00' : beginDate
      this.modelCode = [beginDate, endDate]
      // 将参数传出
      this.sendCode()
    }
  }
}
</script>
