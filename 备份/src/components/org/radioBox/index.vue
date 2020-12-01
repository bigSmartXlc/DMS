<!--
* description: 网格中的选中（radio）组件
*   2019-08-05 加入文字溢出效果 liyanm
*  2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
-->
<template>
  <section>
    <el-col :span="span">
      <lableName
        class="lableN"
        :validrule="validrule"
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
        :maxWordCount="maxWordCount"
      ></lableName>
      <el-radio-group class="brands" @change="sendCode" v-model="modelCode">
        <el-radio
          v-for="(item,index) in radio"
          :key="index"
          @change="sendCode"
          :disabled="disabled"
          :label="item.value"
        >{{item.label}}</el-radio>
      </el-radio-group>
      <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    </el-col>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { inputMixins } from "@/components/mixins/inputMixins";
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: "isRadio",
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [inputMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },
  props: {
    // 接受设置的自定义参数
    options: { type: Array, default: () => [] }
  },
  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "" : this.labelName,
      modelCode: this.code ? this.code : "",
      maxWordCount: 10,
      radio: this.options
    };
  },
  methods: {
    // 把变更值传出
    sendCode() {
      var text = "";
      let code = this.modelCode;
      this.$emit("changeCode", code, text, this.codeField, this.comType);
    }
  }
};
</script>

<style lang="scss" scoped>
// .el-col-12 {
//   width: 100%;
// }
/deep/ .el-radio-group.brands {
  float: left;
}
/deep/.el-checkbox {
  margin-right: 0;
  text-align: left;
  width: 90px !important;
}
/deep/ .el-checkbox__input {
  float: right;
  top: 50%;
  margin-top: -7px;
}
/deep/ .curName {
  white-space: normal;
  // float: left !important;
  // margin-left: 5px !important;
}
// .lableN {
//   width: 130px !important;
// }
</style>
