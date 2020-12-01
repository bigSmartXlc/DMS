<!--
* description: 门店选择
* author:
* createdDate:
-->
<template>
  <section class="belowStoreInp">
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
    <belowStore
      :popupsVisible.sync="curPopupsVisible"
      :codeField="codeField"
      :comType="comType"
      :popupsKey="popupsKey"
      :code="modelCode"
      :key="curPopupsKey"
      :text="modelText"
      :readonly="readonly"
      :valueObject="curValueObject"
      @changeCode="getComponentCode"
      :isMul='isMul'
    ></belowStore>
  </section>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";

import belowStore from "./belowStore";
export default {
  name:'belowStoreInput',
  // 组件混入对象
  mixins: [searchInputMixins,valueObjectMixins],
  components: {
    belowStore,
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      editEl:null,
      curPopupsVisible:false,
      placeholder: '门店选择'
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

       })
     },

  }
};
</script>