<!--
* description: 其他字段标签
* author: linwm
* createdDate: 2019-11-08
-->
<template>
    <el-col :span="8">
    <label
      @mouseenter="ellipsvisible"
      @mouseleave="ellipsinvisible"
      @click="sendLabelCode"
      :style="{color:'blue',cursor:'pointer'}"
    >
      <i v-if="isRequire" class="iconRequired"></i>
      <span class="ellipsisshowName" v-show="ellipsisshow"
        >{{ labelName }}<i></i
      ></span>
      <span class="curName">{{ labelName }}</span></label
    >
    </el-col>
</template>
<script>
export default {
  name: "lableName",
  props: {
    // 控件label名称
    labelName: { type: String, default: "" },
    // 是否不填/选
    isRequire: { type: Boolean, default: false }
  },
  data() {
    return {
      // 是否显示字数溢出提示
      ellipsisshow: false
    };
  },
  methods: {
    // 是否溢出显示
    ellipsvisible() {
      //判断超过4个字的显示溢出效果
      if (this.labelName.length > 4) {
        this.ellipsisshow = true;
      } else {
        this.ellipsisshow = false;
      }
    },
    ellipsinvisible() {
      this.ellipsisshow = false;
    },
    sendLabelCode() {
      this.$emit("clickEvent");
    }
  }
};
</script>
