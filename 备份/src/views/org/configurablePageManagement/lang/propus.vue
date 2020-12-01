<!--
* description: 多语言弹出框（含输入框）
* author: linzewen
* createdDate: 2019-09-21
-->
<template>
  <section class="carTypeConfig">
    <el-col :span="span">
      <lableName    :validrule="validrule"    :curLabelName="curLabelName" :isShowLabel="isShowLabel" :isRequire="isRequire"></lableName>
      <el-input
        :placeholder="placeholder"
        v-model="modelText"
        :disabled="disabled"
        size="small"
        suffix-icon="el-icon-search"
        @clear="clearCode"
        @blur="sendCode"
        @focus="getFocusCode"
      ></el-input>
      <validateFormate
      :curLabelName="curLabelName"
      :validrule="validrule"
    ></validateFormate>
    </el-col>
    <propusText
      :popupsVisible="curPopupsVisible"
      :popupsKey="popupsKey"
      :code="modelCode"
      :key="curPopupsKey"
      @changeCode="getComponentCode"
      @close="close"
    ></propusText>
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
    propusText: () => import("@/views/org/configurablePageManagement/lang/propusText"),
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? this.$t('org.label.labelName')/*标签名称*/ : this.labelName
    };
  },
  methods: {
    // 获取组件回传值
    getComponentCode(val, codeField) {
      var sendFormField = { langType: "ZH", langLabel: val.chineseName };
      var tempArray = [];
      tempArray.push(sendFormField);
      if(val.englishName !== ""){
        sendFormField = { langType: "EN", langLabel: val.englishName };
        tempArray.push(sendFormField);
      }
      if(val.frenchName !== ""){
        sendFormField = { langType: "FR", langLabel: val.frenchName };
        tempArray.push(sendFormField);
      }
      this.modelCode = JSON.stringify(tempArray);
      this.modelText = val.chineseName;
      this.curPopupsVisible = false;
      this.curPopupsKey += "1";
      this.sendCode(codeField);
    },
    close(){
      this.curPopupsVisible = false;
      this.curPopupsKey += "1";
    },
    sendCode(codeField) {
      var code = this.modelCode;
      var text = this.modelText;
      this.$emit(
        "changeCode",
        code,
        text,
        this.codeField,
        this.comType,
        this.popupsKey,
        codeField
      );
    }
  }
};
</script>
