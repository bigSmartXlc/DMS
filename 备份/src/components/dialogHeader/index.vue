<!--
* description: 弹窗标题模块
* author: liyanm
* createdDate: 2020-01-06
-->
<template>
  <div
    class="header-title"
    :class="styleType ? '' : 'themeStyleDialog'"
  >
    <div class="title-top" :class="isIE ? 'title-top-ie' : ''">
      <div class="title-bg">
        <div class="title-left"></div>
        <div class="title-name">
          <div id="chevron"></div>
          <div class="dialog-title">{{title}}</div>
        </div>
      </div>
    </div>
    <div id="triangle-down"></div>
  </div>
</template>
<script>
export default {
  name: "dialogHeader",
  props: {
    // 标题样式类型 true 默认灰色样式  false 主题色标签样式,通过APP.JS的dialogType控制
    styleType: { type: Boolean, default: true },
    // 标题名称
    title: { type: String, default: "" }
  },
  data() {
    return {
      isIE: this.$utils.isIE() || this.$utils.isEdge() ? true : false
    };
  },
  created() {},
  methods: {}
};
</script>
