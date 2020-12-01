<!--
* description: 用户风险分析按钮
* author: mwhao
* createdDate: 2020-1-8
-->
<template>
  <section
    class="linkButton"
    v-if="curIsShow"
    :key="fullComponentKey"
  >
    <!-- theme.scss 文件设置样式 -->
    <el-button
      :class="code==='危险' ? 'red-danger' : 'green-danger'"
      type="danger"
      @click="sendCode"
    >{{code && code.length > 0 ? code : curLabelName}}</el-button>
  </section>
</template>
<script>
import { linkButtonMixins } from "@/components/mixins/linkButtonMixins";
export default {
  mixins: [linkButtonMixins]
};
</script>
<style lang="scss" scoped >
// button.el-button.el-button--danger.el-button--small.red-danger {
//   color: rgb(255, 255, 255) !important;
//   background-color: rgb(245, 108, 108) !important;
//   border-color: rgb(245, 108, 108) !important;
// }
// button.el-button.el-button--danger.el-button--small.green-danger {
//   color: rgb(255, 255, 255) !important;
//   background-color: rgb(103, 194, 58) !important;
//   border-color: rgb(103, 194, 58) !important;
// }
</style>
