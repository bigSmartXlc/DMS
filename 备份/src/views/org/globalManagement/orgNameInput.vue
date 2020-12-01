<!--
* description: 仓库输入框（含弹窗）
* author: linsy
* createdDate: 2019-08-08
-->
<template>
  <section class="orgDlr" v-show="curIsShow" :key="fullComponentKey">
    <el-col :span="span">
      <lableName
        :validrule="validrule"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
        :curLabelName="curLabelName"
      >{{curLabelName}}</lableName>
      <el-input
        :placeholder="placeholder"
        v-model="modelText"
        size="small"
        suffix-icon="el-icon-search"
        clearable
        @blur="sendCode"
        @clear="clearCode"
        :disabled="disabled"
        @closeWareHouse="close"
        @focus="getFocusCode"
      ></el-input>
      <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    </el-col>

    <orgNameHouse
      :popupsVisible="curPopupsVisible"
      :codeField="codeField"
      :comType="comType"
      :textField="textField"
      :popupsKey="popupsKey"
      :code="modelCode"
      :key="curPopupsKey"
      @changeCode="getComponentCode"
      :isMul="isMul"
      @close="close"
      :otherField="otherField"
    ></orgNameHouse>
  </section>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins";
import { orgApis } from "@/api/apiList/org";
// import validateFormate from "@/components/validateFormate";
// import lableName from "@/components/lableName";
export default {
  // 组件混入对象
  mixins: [searchInputMixins],
  components: {
    orgNameHouse: () => import("./orgNameHouse"),
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },

  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0")
    };
  },
  methods: {}
};
</script>
