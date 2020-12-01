<!--
* description: 车型配置（含弹窗）
* author: 
* createdDate:
-->

<template>
  <section class="cartypeInp">
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
        suffix-icon=""
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
    <carTypeConfig
      :popupsVisible.sync="curPopupsVisible"
      :codeField="codeField"
      :comType="comType"
      :popupsKey="popupsKey"
      :code="modelCode"
      :key="curPopupsKey"
      :text="modelText"
      :valueObject="curValueObject"
      @changeCode="getComponentCode"
      :isMul='isMul'
      :readonly="readonly"
      ref="carType"
    ></carTypeConfig>
  </section>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";

import carTypeConfig from "./carTypeConfig";
export default {
  name:'carTypeInput',
  // 组件混入对象
  mixins: [searchInputMixins,valueObjectMixins],
  components: {
    carTypeConfig,
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      editEl:null,
      curPopupsVisible:false,
      placeholder: '车型配置',
      curLabelName: this.labelName === "" ? "车型配置" : this.labelName
    };
  },
  watch:{
    modelCode(val){
      this.$emit('changeCode', val, this.text, this.codeField, this.comType, this.popupsKey, this.textField, null, null)
    }
  },
  methods: {
     getFocusCode(){
       this.curPopupsVisible = true
       this.$nextTick(()=>{
         // 加载dialog中的数据
         this.$refs['carType'].queryTable(1)
       })
     },

  }
};
</script>
