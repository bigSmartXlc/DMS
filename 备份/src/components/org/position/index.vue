<!--
* description: 业务岗位输入框(含弹窗)
*   2019-08-05 加入文字溢出效果 liyanm
*  2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
-->
<template>
  <section class="carTypeConfig" v-show="curIsShow" :key="fullComponentKey">
    <el-col :span="span">
      <lableName    :validrule="validrule"    :curLabelName="curLabelName" :isShowLabel="isShowLabel" :isRequire="isRequire"></lableName>
      <el-input
        :placeholder="placeholder"
        v-model="modelText"
        :disabled="disabled"
        size="small"
        suffix-icon="el-icon-search"
        @clear="clearCode"
        clearable
        @blur="sendCode"
        @focus="getFocusCode"
      ></el-input>
      <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    </el-col>
    <position
      :popupsVisible="curPopupsVisible"
      :codeField="codeField"
      :textField="textField"
      :comType="comType"
      :valueObject="curValueObject"
      :parentFileds="parentFileds"
      :deptId="deptId"
      :popupsKey="popupsKey"
      :code="modelCode"
      :text="modelText"
      :key="curPopupsKey"
      :isMul="isMul"
      @changeCode="getComponentCode"
    ></position>
  </section>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import { orgApis } from "@/api/apiList/org";
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  // 组件混入对象
mixins: [searchInputMixins, valueObjectMixins],
  components: {
    position: () => import("@/components/org/position/position.vue"),
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  props:{
    deptId: { type: String, default: '' },
  },
  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "业务岗位" : this.labelName
    };
  },
  methods: {}
};
</script>
