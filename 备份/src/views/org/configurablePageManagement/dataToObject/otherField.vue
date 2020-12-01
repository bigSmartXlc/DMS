<!--
* description: 其他字段输入框
* author: linwm
* createdDate: 2019-11-08
-->
<template>
  <el-col class="other" :span="span" v-show="curIsShow" :key="fullComponentKey">
    <lableName    :validrule="validrule"   
      :curLabelName="curLabelName"
      :isShowLabel="isShowLabel"
      :isRequire="isRequire"
      :curisFunc="curisFunc"
    ></lableName>
    <el-input
      :placeholder="$t('sys.tips.esTip13')"
      v-model="modelCode"
      :disabled="disabled"
      :readonly="readonly"
      size="small"
      :suffix-icon="suffixIcon"
      @clear="clearCode"
      clearable
      @blur="sendCode"
      :type="inputType"
    ></el-input>
    <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    <div class="cc" @click ="sendLabelCode">{{this.$t('sys.button.delete')/*删除*/}}</div>
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
  methods: {
    sendLabelCode() {
      this.$emit("clickEvent",this.codeField);
    }
  }
};
</script>
<style lang="scss" scoped>
.other .el-input.el-input--small.el-input--suffix {
  max-width: 159px;
}
.cc {
  color: blue;
  cursor: pointer;
  width: 42px;
  float: left;
  height: 29px;
  line-height: 29px;
}
</style>
