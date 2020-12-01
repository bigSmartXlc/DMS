<!--
* description: 启用/停用 显示组件
*   2020-02-12 新增 luojx
-->
<template>
  <section>
    <el-col :span="span">
     <span>{{code === '1'?'启用':'停用'}}</span>
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
      optionDatas: [{ code: "1", text: "启用" }, { code: "0", text: "停用" }],
      curLabelName: this.labelName === "" ? "启用状态" : this.labelName
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
