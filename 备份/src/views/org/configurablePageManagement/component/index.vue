<!--
* description: 组件路径输入框（含弹窗）
* author: linwm
* createdDate: 2019-11-23
-->
<template>
 <section class="carTypeConfig" v-show="curIsShow" :key="fullComponentKey">
  <el-col class="other" :span="span" v-show="curIsShow">
    <lableName :curLabelName="curLabelName" :isShowLabel="isShowLabel" :isRequire="isRequire"></lableName>
    <el-input
      :placeholder="$t('sys.tips.esTip13')"
      v-model="modelText"
      :disabled="disabled"
      size="small"
      suffix-icon="el-icon-search"
      @clear="clearCode"
      @blur="sendCode"
      @focus="getFocusCode"
    ></el-input>
    <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
  </el-col>
    <components
      :popupsVisible="curPopupsVisible"
      :codeField="codeField"
      :popupsKey="popupsKey"
      :code="modelCode"
      :text="modelText"
      :key="curPopupsKey"
      @changeCompCode="getCompCode"
      @changeCode="close"
    ></components>
  </section>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins";
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
import components from "./component";
export default {
  mixins: [searchInputMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
    components
  },
  methods: {
    // 关闭
    close() {
      this.curPopupsVisible = false
      this.curPopupsKey = this.codeField + this.$utils.generateId()
    },
    getCompCode(val){
      this.curPopupsVisible = false
      this.curPopupsKey = this.codeField + this.$utils.generateId()
      this.$emit('changeCompCode',val)
    }
  }
};
</script>