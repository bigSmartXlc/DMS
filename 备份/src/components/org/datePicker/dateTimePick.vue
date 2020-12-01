<!--
* description: 单日期选择器
* author: yxyan
* createdDate: 2019-07-27
* 增加文字溢出效果 liyam: 2019-08-5
*  2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
-->
<template>
  <el-col
    v-show="curIsShow"
    id="datePicker"
    :span="span"
  >
    <lableName
      :validrule="validrule"
      :cur-label-name="curLabelName"
      :is-show-label="isShowLabel"
      :is-require="isRequire"
      :max-word-count="maxWordCount"
    />
    <el-date-picker
      v-model="modelCode"
      :type="dateType"
      :picker-options="pickerOptions"
      :value-format="format"
      :clearable="clearable"
      :disabled="disabled"
      :placeholder="placeholder"
      @change="sendCode"
      @clear="clearCode"
    />
    <validateFormate
      :cur-label-name="curLabelName"
      :validrule="validrule"
    />
  </el-col>
</template>

<script>
import { inputMixins } from '@/components/mixins/inputMixins'
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: 'DatePicker',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  mixins: [inputMixins],
  props: {
    dateType: { type: String, default: 'date' },
    format: { type: String, default: 'yyyy-MM-dd HH:mm:ss' },
    // 日期控件选项类型
    dateOptionsType: { type: String, default: '' }
  },
  data() {
    return {
      placeholder: this.dataToObject && this.dataToObject.placeholder ? this.dataToObject.placeholder : this.$t('sys.tips.esTip16'),
      pickerOptions: {}
    }
  },
  created() {
    const that = this
    that.pickerOptions.disabledDate = function(time) {
      if (that.dateOptionsType) {
        switch (that.dateOptionsType) {
          // 禁用当前日期之后的日期（不包括当前日期）
          case '1':
            return time.getTime() > Date.now()
          // 禁用当前日期之前的日期（包括当前日期）
          case '2':
            return time.getTime() < Date.now()
            // 禁用当前日期之前的日期（不包括当前日期）
          case '3':
            return time.getTime() < Date.now() - 8.64e7
        }
      }
      return false
    }
  }
}
</script>
