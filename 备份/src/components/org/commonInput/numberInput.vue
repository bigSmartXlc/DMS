<!--
* description: 数字输入框通用组件
* author: luojx
* createdDate: 2019-08-29
-->
<template>
  <el-col :span="span">
    <lableName :validrule="validrule" :cur-label-name="curLabelName" :is-show-label="isShowLabel" :is-require="isRequire" />
    <el-input
      v-model="modelCode"
      :placeholder="$t('sys.tips.esTip13')"
      :disabled="disabled"
      :min="dataToObject==null ?null:dataToObject.min"
      :is-type="dataToObject==null ?false :dataToObject.isType"
      :max="dataToObject==null ? null :dataToObject.max"
      @input="dataToObject&&dataToObject.maxlength&&(modelCode+'').length>dataToObject.maxlength?modelCode=modelCode.slice(0,dataToObject.maxlength):input"
      :readonly="readonly"
      size="small"
      :suffix-icon="suffixIcon"
      :clearable="clearable"
      :type="inputType"
      :step="curStep"
      @clear="clearCode"
      @change="sendCode"
    />
    <validateFormate :cur-label-name="curLabelName" :validrule="validrule" />
  </el-col>
</template>
<script>
import { numberInputMixins } from '@/components/mixins/numberInputMixins'
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    validateFormate: () => import('@/components/validateFormate') // 校验提示样式组件
  },
  mixins: [numberInputMixins]
}
</script>
