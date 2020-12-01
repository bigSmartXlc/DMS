<!--
* description: 选择对应网格列（多选，单选）,支持搜索
* author: linwm
* createdDate: 2019-11-15
-->
<template>
  <section class="wareHouseMulti">
    <el-col :span="span" v-show="curIsShow">
      <lableName    :validrule="validrule"   
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>
      <el-select
        v-model="modelCode"
        :multiple="isMul"
        collapse-tags
        :filterable="filterable"
        :placeholder="placeholder"
        @clear="clearCode"
        :clearable="clearable"
        @change="sendCode"
        :disabled="disabled"
        @visible-change="visibleChange"
        size="small"
      >
        <el-option
          v-for="item in optionDatas"
          :key="item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
          :label="item[optionFields.length > 1 ? optionFields[1] : defOptionFields[1]]"
          :value="item[optionFields.length > 1 ? optionFields[0] : defOptionFields[0]]"
        >{{item[optionFields.length > 1 ? optionFields[1] : defOptionFields[1]]}}</el-option>
      </el-select>
      <validateFormate
      :curLabelName="curLabelName"
      :validrule="validrule"
    ></validateFormate>
    </el-col>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { dropdownMixins } from "@/components/mixins/dropdownMixins";
export default {
  name: "orgCols",
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      placeholder: this.$t('sys.tips.esTip0'),
      curLabelName: this.labelName === "" ? this.$t('org.label.gridColumn')/*网格列*/ : this.labelName
    }
  }
};
</script>

