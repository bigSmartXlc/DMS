<!--
* description: 对应菜单输入框(含弹窗)
* author: mwhao
* createdDate: 2019-12-23
-->

<template>
  <section class="orgDlr" v-show="curIsShow" :key="fullComponentKey">
    <el-col :span="span">
      <lableName    :validrule="validrule"      :isShowLabel="isShowLabel" :isRequire="isRequire"  :curLabelName="curLabelName">{{curLabelName}}</lableName>
      <el-input  :placeholder="placeholder" v-model="modelText" size="small" suffix-icon="el-icon-search" clearable 
        @clear="clearCode" :disabled="disabled" @closeWareHouse="close"  @focus="getFocusCode"></el-input>
        <!-- @blur="sendCode" -->
        <validateFormate
      :curLabelName="curLabelName"
      :validrule="validrule"
    ></validateFormate>
    </el-col>


    <correspondingSelect
      :popupsVisible="curPopupsVisible"  :codeField="codeField" :comType="comType" :textField="textField"
      :popupsKey="popupsKey"  :code="modelCode" :key="curPopupsKey" @changeCode="getComponentCode" :isMul="isMul"
      @close="close"
    ></correspondingSelect>
  </section>
</template>
<script>
import { searchInputMixins } from "@/components/mixins/searchInputMixins"
import { orgApis } from '@/api/apiList/org'
// import validateFormate from "@/components/validateFormate";
// import lableName from "@/components/lableName";
export default {
  // 组件混入对象
  mixins: [searchInputMixins],
  components: {
    correspondingSelect: () => import("@/components/org/correspondingMenu/correspondingSelect"),
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  
  data() {
    return {
     placeholder: this.$t('sys.tips.esTip0'),
     name:"",
     id:""
    };
  },
  methods:{
    getComponentCode(name,id){
      this.name = name||this.modelText
      this.id = id||this.modelCode
      this.modelText=name||this.modelText;
      this.curPopupsVisible=false;
      this.$emit('changeCode',this.id,this.name,this.codeField,null,null,this.textField)
    }
  }
};
</script>
