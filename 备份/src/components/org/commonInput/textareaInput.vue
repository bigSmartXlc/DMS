<!--
* description: 文本输入框通用组件
* author: luojx
* createdDate: 2019-07-30
*  2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
*  2019-08-15 增加输入框类型判断，默认text   yinxy
*  2019-10-09 增加密码框 ,默认 password lixb
-->
<template>
  <el-col :span="span" v-show="curIsShow" :key="fullComponentKey">
    <lableName    :validrule="validrule"
      :curLabelName="curLabelName"
      @clickEvent="sendLabelCode"
      :isShowLabel="isShowLabel"
      :isRequire="isRequire"
      :curisFunc="curisFunc"
      :maxWordCount="dataToObject==null ? 6 :dataToObject.maxWordCount"
      :labelWidth="labelWidth"
    ></lableName>
    <el-input
      v-show="curIsShowComp"
      :placeholder="placeholder"
      v-model="modelCode"
      :disabled="curDisabled"
      :readonly="readonly"
      size="small"
      :maxlength="dataToObject==null ? null :dataToObject.maxLength"
      :suffix-icon="suffixIcon"
      @clear="clearCode"
      @change="sendCode"
      @input="inputCode"
      @blur="inputBlur"
      :rows="2"
      :clearable="clearable"
      type="textarea"
      :style="{'width': (labelWidth !== 80 ? `calc(100% - ${labelWidth}px)`: '')}" 
    ></el-input>
    <span v-show="!curIsShowComp" @click="showCompByClick(true)">{{modelCode}}</span>
    <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
  </el-col>
</template>
<script>
import { inputMixins } from "@/components/mixins/inputMixins";
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  mixins: [inputMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  props: {
    showPlaceholder: { type: String, default: null }
  },
  data() {
    return {
      placeholder:
        this.showPlaceholder === null
          ? this.$t("sys.tips.esTip13")
          : this.showPlaceholder
    };
  }
};
</script>
