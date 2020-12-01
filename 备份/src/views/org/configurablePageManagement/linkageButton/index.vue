<!--
* description: 联动设置输入框（含弹窗）
* author: linwm
* createdDate: 2019-12-10
-->
<template>
  <el-col class="other" :span="span" v-show="curIsShow">
    <lableName    :validrule="validrule"    :curLabelName="curLabelName" :isShowLabel="isShowLabel" :isRequire="isRequire"></lableName>
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
    <linkageConfig
      :popupsVisible="curPopupsVisible"
      :codeField="codeField"
      :popupsKey="popupsKey"
      :code="modelCode"
      :text="modelText"
      :key="curPopupsKey"
      @changeCode="getComponentCode"
      @close="close"
    ></linkageConfig>
    <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
  </el-col>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins";
export default {
  mixins: [searchInputMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
    linkageConfig: () => import("@/views/org/configurablePageManagement/linkageButton/linkageConfig")
  },
  methods: {
    close() {
      this.curPopupsVisible = false
      this.curPopupsKey = this.codeField + this.$utils.generateId()
    }
  }
};
</script>
