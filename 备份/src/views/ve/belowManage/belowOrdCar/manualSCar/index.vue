<!--
* description: 手动配车
* author:
* createdDate:
-->
<template>
  <section class="manualSCarBtn">
    <el-col>
      <lableName
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
      />
      <el-button
        type="type"
        slot="append"
        icon=""
        @focus="getFocusCode"
        >配车</el-button>
    </el-col>
    <manualSCar
      :code="code"
      :codeField="codeField"
      :comType="comType"
      :parentFileds="parentFileds"
      :isShow="true"
      :isColComp="true"
      :labelName="labelName"
      :isShowLabel="isShowLabel"
    ></manualSCar>
  </section>
</template>
<script>
import { linkButtonMixins } from "@/components/mixins/linkButtonMixins";

import manualSCar from "./manualSCar";
export default {
  name:'manualSCarButton',
  // 组件混入对象
  mixins: [linkButtonMixins],
  components: {
    manualSCar,
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  data() {
    return {
      curLabelName: this.labelName,
      // 是否显示标签
      curIsShowLabel: this.isShowLabel,
      // 是否显示组件
      curIsShow: this.isShow,
    };
  },
  watch:{
   
  },
  methods: {
     getFocusCode(){
       this.$nextTick(()=>{
         // 加载dialog中的数据
        //  this.$refs['carType'].queryTable(1)
       })
     },

  }
};
</script>