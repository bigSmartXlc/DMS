<!--
* description: 城市弹出（含弹窗）
* author: zhhx
* createdDate: 2019-08-08
-->
<template>
  <section class="orgDlr">
    <el-col :span="span">
      <lableName
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>
      <el-input
         :placeholder="placeholder"
        v-model="modelText"
        size="small"
        suffix-icon="el-icon-search"
        clearable
        @blur="sendCode"
        @focus="getFocusCode"
        @clear="clearCode"
      ></el-input>
      <validateFormate
        :curLabelName="curLabelName"
        :validrule="validrule"
      ></validateFormate>
    </el-col>
    <CityQuery
      :popupsVisible="curPopupsVisible"
      :codeField="codeField"
      :comType="comType"
      :popupsKey="popupsKey"
      :code="modelCode"
      :key="curPopupsKey"
      :text="modelText"
      :valueObject="curValueObject"
      @changeCode="getComponentCode"
      :isMul='isMul'
      ref="dialoCityquery"
    ></CityQuery>
  </section>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import { orgApis } from "@/api/apiList/org";
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  // 组件混入对象
  mixins: [searchInputMixins,valueObjectMixins],
  components: {
    CityQuery: () => import("@/components/org/CityQuery/cityQuery"),
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "城市名称" : this.labelName
    };
  },
   methods: {
    // 重写显示时执行事件
    onShow() {
      var that = this;
      if (!that.parentFields || that.parentFields === "") {
        var parent = that.$utils.getHasFormFieldParentComponent(that);
        if (
          parent.formField &&
          parent.formField.carBrandCode &&
          parent.formField.carBrandCode !== ""
        ) {
          // 赋值
          that.curValueObject.carBrandCode = parent.formField.carBrandCode;
          that.curPopupsKey = that.codeField + that.$utils.generateId();
        }
      }
      // 加载dialog中的数据
      this.$nextTick(() => {
        this.$refs.dialoCityquery.fetchData()
      })
    },
  }
};
</script>
