<!--
* description: API弹窗下拉框
*   2019-08-05 加入文字溢出效果 liyanm
*  2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
-->
<template>
  <section>
    <el-col :span="span" v-if="curIsShow">
      <lableName    :validrule="validrule"   
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
  name: "isEnable",
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  props: {
    isMul: { type: Boolean, default: false },
  },
created(){
    this.getservice()
},
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ['serviceName', 'serviceName'],
      placeholder: this.$t("sys.tips.esTip0"),
      optionDatas: [{ code: "1", text: "B/S" }, { code: "0", text: "C/S" }],
      curLabelName: this.labelName === "" ? "是否可用" : this.labelName
    };
  },
  methods: {
      // 下拉框查询
      getservice(){
         this.$store.dispatch("apiManage/getService").then(response => {
            if( response.result==="1"){
                this.optionDatas=response.rows
            }
        })
      }
     
  }
};
</script>

<style scoped>
.el-col-12 {
  width: 100%;
}
</style>
