<!--
* description: 收件岗位下拉框（多选，单选）,支持搜索
* author: luojx
* createdDate: 2019-07-27
* 增加文字溢出效果 liyam: 2019-08-5
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
        :filterable="false"
        v-model="modelCode"
        :placeholder="placeholder"
        @clear="clearCode"
        :clearable="false"
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
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: "receivePost",
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  // props: {
  //   // 获取组件中的名称，如：textField="carBrandCode"
  //   codeField: { type: String, default: "positionCode" },
  //   // 获取组件中的名称，如：textField="carBrandName"
  //   textField: { type: String, default: "positionName" },
  //   // 是否使用默认品牌
  //   isUseDefault: { type: Boolean, default: true }
  // },
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ['stationId', 'stationName'],
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "收件岗位" : this.labelName,
      // API配置对象
      apiConfig: orgApis.mdmOrgStationQueryFindAll,
      // 表格中台返回网格的字段
      apiQueryRow: ["stationId", "stationName", "stationCode"]
    };
  },
//   created() {
//     // 如果没有赋值，则品牌加入默认值
//     if (!this.code || this.code === "") {
//       if (this.isMul === true) {
//         this.modelCode = this.isUseDefault === true ? [this.$store.getters.orgInfo.BRAND_CODE] : [];
//       } else {
//         this.modelCode = this.isUseDefault === true ? this.$store.getters.orgInfo.BRAND_CODE : '';
//       }
//       this.sendCode();
//     }
//   },
};
</script>
