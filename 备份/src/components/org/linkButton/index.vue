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
  >
    <a
      @click="sendCode"
      :style="curIsShowNone?styleNone:''"
      v-if="curIsShowLabel"
    >{{code && code.length > 0 ? code : curLabelName}}</a>
  </section>
</template>
<script>
import { linkButtonMixins } from "@/components/mixins/linkButtonMixins";
export default {
  mixins: [linkButtonMixins],
  data() {
    return {
      //置灰样式
      styleNone:'color: gray !important;cursor: default;pointer-events: none;'
    }
  }
};
</script>
<style scoped>
/* section {
  float:left;
  margin-right: 5px;
} */
</style>
