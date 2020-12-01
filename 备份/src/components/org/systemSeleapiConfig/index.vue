<!--
* description: 系统岗位输入框(含弹窗)
* author: mwhao
* createdDate: 2020-01-02
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
    <systemSeleapiConfig
      :popupsVisible="curPopupsVisible"
      :codeField="codeField"
      :textField="textField"
      :comType="comType"
      :valueObject="curValueObject"
      :popupsKey="popupsKey"
      :code="modelCode"
      :text="modelText"
      :key="curPopupsKey"
      :isMul="isMul"
      @changeCode="getComponentCode"
    ></systemSeleapiConfig>
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
    systemSeleapiConfig: () => import("@/components/org/systemSeleapiConfig/systemSeleapiConfig.vue"),
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "系统岗位" : this.labelName
    };
  },
  methods: {
    // // 重写显示时执行事件
    // onShow() {
    //   var parent = this.$utils.getHasFormFieldParentComponent(this);
    //   if (
    //     parent.formField &&
    //     parent.formField.carBrandCode &&
    //     parent.formField.carBrandCode !== ""
    //   ) {
    //     //赋值
    //     this.curValueObject.carBrandCode = parent.formField.carBrandCode;
    //     this.curPopupsKey = this.codeField + this.$utils.generateId();
    //   } 
    // }
  }
};
</script>

