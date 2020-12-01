<!--
* description: 选择对应网格列（多选，单选）,支持搜索
* author: linwm
* createdDate: 2019-11-18
-->
<template>
  <section class="wareHouseMulti">
    <el-col :span="span" v-show="curIsShow">
      <lableName    :validrule="validrule"    :curLabelName="curLabelName" :isShowLabel="isShowLabel" :isRequire="isRequire"></lableName>
      <el-select
        v-model="modelCode"
        :multiple="isMul"
        collapse-tags
        :placeholder="placeholder"
        @clear="clearCode"
        :clearable="clearable"
        @change="sendCode"
        :disabled="disabled"
        :filterable="filterable"
        @visible-change="visibleChange"
        size="small"
      >
        <el-option
          v-for="item in optionDatas"
          :key="item.name"
          :label="item.description"
          :value="item.name"
        >{{item.description}}</el-option>
      </el-select>
      <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    </el-col>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { dropdownMixins } from "@/components/mixins/dropdownMixins";
export default {
  name: "codeFields",
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? this.$t('org.label.correspondingDataColumn')/*对应数据列*/  : this.labelName
    };
  },
  methods: {

  }
};
</script>

