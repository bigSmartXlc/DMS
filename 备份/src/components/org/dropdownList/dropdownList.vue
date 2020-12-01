<!--
* description: 自定义下拉选项下拉框组件
* author: liyk
* createDate：2020/01/03
-->
<template>
  <section>
    <el-col :span="span" v-if="curIsShow">
      <lableName
        :validrule="validrule"
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>
      <el-select
        :multiple="isMul"
        collapse-tags
        :filterable="filterable"
        v-model="modelCode"
        :placeholder="placeholder"
        @clear="clearCode"
        :clearable="clearable"
        @change="sendCode"
        :disabled="disabled"
        size="small"
      >
        <el-option
          v-for="item in optionDatas"
          :key="item.compKey"
          :label="item.label"
          :value="item.value"
        >{{item.label}}</el-option>
      </el-select>
      <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    </el-col>
  </section>
</template>
<script>
import { dropdownMixins } from "@/components/mixins/dropdownMixins";
export default {
  name: "dropdownList",
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },
  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0"),
      optionDatas: this.options,
      curLabelName: this.labelName === "" ? "我是下拉框" : this.labelName
    };
  },
  methods: {}
};
</script>

<style scoped>
.el-col-12 {
  width: 100%;
}
</style>
