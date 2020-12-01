<!--
* description: 省份弹出（含弹窗）
* author: meijq
* createdDate: 2019-08-08
-->
<template>
  <section class="orgDlr">
    <el-col :span="span">
      <lableName
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>
      <el-input
         :placeholder="placeholder"
        v-model="modelText"
        size="small"
        suffix-icon="el-icon-search"
        clearable
        @blur="sendCode"
        @focus="getFocusCode"
        @clear="clearCode"
      ></el-input>
      <validateFormate
        :curLabelName="curLabelName"
        :validrule="validrule"
      ></validateFormate>
    </el-col>
    <ProvinceSelect
      :popupsVisible="curPopupsVisible"
      :codeField="codeField"
      :comType="comType"
      :popupsKey="popupsKey"
      :code="modelCode"
      :key="curPopupsKey"
      @changeCode="getComponentCode"
      :isMul='isMul'
    ></ProvinceSelect>
  </section>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins";
import { orgApis } from "@/api/apiList/org";
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  // 组件混入对象
  mixins: [searchInputMixins],
  components: {
    ProvinceSelect: () => import("@/components/org/ProvinceSelect/provinceSelect"),
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "省份" : this.labelName
    };
  }
};
</script>
