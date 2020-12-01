<!--
* description: 文本按钮通用组件
* author: luojx
* createdDate: 2019-08-05
-->
<template>
  <section
    class="linkButton"
    v-if="curIsShow"
    :key="fullComponentKey"
    style=" line-height: 20px!important;"
  >
    <span
      @click="sendCode"
      v-if="curIsShowLabel"
    >{{code && code.length > 0 ? code : curLabelName}}</span>
  </section>
</template>
<script>
import { linkButtonMixins } from "@/components/mixins/linkButtonMixins";
// import './theme.scss';
export default {
  mixins: [linkButtonMixins]
};
</script>
<style scoped>
/* section {
  float:left;
  margin-right: 5px;
} */
span:hover{
  cursor:pointer
}
</style>
