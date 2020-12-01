<!--
* description: 按钮尺寸 下拉框
* author: linwm
* createdDate: 2020-01-08
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
      curLabelName: this.labelName === "" ? this.$t('org.label.buttonSize')/*按钮尺寸*/  : this.labelName,
      optionDatas:[
          {code:"medium",data:"medium"},
          {code:"small",data:"small"},
          {code:"mini",data:"mini"}
    ]
    }
  }
};
</script>

