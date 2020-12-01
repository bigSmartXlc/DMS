<!--
* description: 行宽比例 下拉框
* author: linwm
* createdDate: 2019-11-15
-->
<template>
  <section class="wareHouseMulti">
    <el-col :span="span" v-if="curIsShow">
      <lableName    :validrule="validrule"   
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>
      <el-select
        v-model="modelCode"
        :multiple="false"
        collapse-tags
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
          :key="item.code"
          :label="item.data"
          :value="item.code "
        >{{item.data}}</el-option>
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
      curLabelName: this.labelName === "" ?this.$t('org.label.lineWidthRatio')/*行宽比例*/  : this.labelName,
      optionDatas:[
          {code:"24",data:"1/1"},
          {code:"18",data:"3/4"},
          {code:"16",data:"2/3"},
          {code:"12",data:"1/2"},
          {code:"8",data:"1/3"},
          {code:"6",data:"1/4"},
    ]
    }
  }
};
</script>

