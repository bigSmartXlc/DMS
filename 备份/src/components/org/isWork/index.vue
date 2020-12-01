<!--
* description: 是否在职组件
*   2019-08-05 加入文字溢出效果 liyanm
*  2019-08-09 修改文字溢出效果-封装/校验效果 liyanm
-->
<template>
  <section>
    <el-col :span="span">
     <span>{{code === '1'?'在职':'离职'}}</span>
    </el-col>
  </section>
</template>
<script>
export default {
  name: "isEnable",
  // 组件混入对象：{props[span,isShowLabel,code,isMul,labenName] data[modelCode,optionDatas,listQuery] methods[queryTable,sendCode]}
  components: {
  },
  props: {
      span: { type: Number, default: 6 },
    isMul: { type: Boolean, default: false },
    code: { type: String, default: '' },
  },
  data() {
    return {
      modelCode: this.isMul === true ? (this.code !== '' ? this.code.split(',') : []) : this.code || '',
      placeholder: this.$t("sys.tips.esTip0"),
      optionDatas: [{ code: "1", text: "在职" }, { code: "0", text: "离职" }],
      curLabelName: this.labelName === "" ? "是否可用" : this.labelName
    };
  },
  created(){
  },
  mothods: {}
};
</script>

<style scoped>
.el-col-12 {
  width: 100%;
}
</style>
