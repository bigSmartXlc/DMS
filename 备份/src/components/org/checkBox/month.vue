<template>
  <el-col :span="span" v-show="curIsShow" :key="fullComponentKey">
    <lableName  :validrule="validrule"  
      :curLabelName="curLabelName"
      :isShowLabel="isShowLabel"
      :isRequire="isRequire"
      :curisFunc="curisFunc"
    ></lableName>
    <el-col :span="19" style="text-align:left">
      <el-checkbox-group @change="sendCode" v-model="modelCode"> 
        <el-checkbox
          v-for="item in monthArrs"
          :label="item"
          :key="item"
          style="width:16%;text-align:left"
        >{{item+'月'}}</el-checkbox>
      </el-checkbox-group>
   </el-col>
    <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
  </el-col>
</template>
<script>
import { checkboxMixins } from "@/components/mixins/checkboxMixins";
const monthArr=["01","02","03","04","05","06","07","08","09","10","11","12"]
export default {
  mixins: [checkboxMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      monthArrs:monthArr
    };
  }
};
</script>
<style scoped>
#searchFormGroup .el-row .el-col .el-col label {
  margin: 0 !important;
}
/deep/.el-checkbox-group>.el-checkbox>.el-checkbox__label{
  padding-left: 5px !important;
}
</style>