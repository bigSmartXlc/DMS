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
        :clearable="clearable"
        @change="sendCode"
        :disabled="disabled"
        size="small"
      >
        <el-option
          v-for="item in optionDatas"
          :key="item.value"
          :label="item.lable"
          :value="item.value"
        >{{item.lable}}</el-option>
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
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  mixins: [dropdownMixins],
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  props: {
    // 获取组件中的名称，如：textField="carBrandCode"
    codeField: { type: String, default: "carTypeStaCode" },
    // 获取组件中的名称，如：textField="carBrandName"
    textField: { type: String, default: "carTypeStaCn" },
  },
  data() {
    return {
      // 默认绑定数据对象字段
      defOptionFields: ['carTypeStaCode', 'carTypeStaCn'],
      placeholder: this.$t("sys.tips.esTip0"),
      curLabelName: this.labelName === "" ? "车辆维护状态" : this.labelName,
      optionDatas:[
          {
            lable:"已维护",
            value:"1"
          },{
            lable:"未维护",
            value:"0"
          }
      ]
    };
  },
  created() {
    // 如果没有赋值，则品牌加入默认值
    if (!this.code || this.code === "") {
        this.modelCode = '1';
      this.sendCode();
    }
  },
  updated() {
    this.removeTag();
  },
  methods: {
    // 移除tag时判断是否清除所有
    removeTag() {
      if (this.isMul === true && this.modelCode.length === 0) {
        this.modelCode = "1";
        this.sendCode();
      }
    }
  }
};
</script>
