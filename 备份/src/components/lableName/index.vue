<!--
* description: lableName模块
* author: liyanm
* createdDate: 2019-08-09
*  2019-11-29 修改必填才显示星号，非必填校验不显示星号效果  liyanm
-->
<template>
  <label
    ref="companyStyle"
    @mouseenter="ellipsvisible"
    @mouseleave="ellipsinvisible"
    v-if="isShowLabel"
    @click="sendLabelCode"
    :style="{'text-decoration': curisFunc ? 'underline' : '','color': curisFunc ? 'blue' : '','cursor':curisFunc?'pointer':'', 'width': labelWidth !== 80 ? labelWidth + 'px' : ''}"
  >
    <i
      v-if="isShowStar"
      class="iconRequired"
    ></i>

    <span class="curName">{{curLabelName | ellipsis(maxWordCount)}}</span>
    <span
      class="ellipsisshowName"
      v-show="ellipsisshow"
    >{{ curLabelName }}<i></i></span>
  </label>
</template>
<script>
export default {
  name: "lableName",
  props: {
    // 是否显示标签
    isShowLabel: { type: Boolean, default: true },
    // 控件label名称
    curLabelName: { type: String, default: "" },
    // 是否需要校验
    isRequire: { type: Boolean, default: false },
    // 是否必填
    validrule: { type: Object, default: () => {} },
    curisFunc: { type: Boolean, default: false },
    // 组件类型标识（用于标识不同组件，每个视图中唯一）(预留)
    comType: { type: String, default: "" },
    // 组件传值字段名称（与code对象绑定的字段名称，即视图中：formField对应的字段名称）
    // 如：视图中配置：code="formField.carBrandCode"，则codeField="carBrandCode"
    codeField: { type: String, default: "" },
    // 网格列索引
    colIndex: { type: String, default: "" },
    // 网格列中组件索引
    compIndex: { type: String, default: "" },
    // 最大显示文字数
    maxWordCount: { type: Number, default: 6 },
    labelWidth: { type: Number, default: 80}
  },
  data() {
    return {
      // 是否显示字数溢出提示
      ellipsisshow: false,
      //是否显示红点
      isShowStar: true,
      //lable宽度
      lableWidth: 80
    };
  },
  filters: {
    ellipsis(value, maxWordCount) {
      const cNumber = maxWordCount; // 设置限定字数
      if (!value) return "";
      if (value.length > cNumber) {
        return value.slice(0, cNumber) + "...";
      }
      return value;
    }
  },

  created() {
    if (this.validrule !== undefined) {  
      if (this.isRequire) {
        // noRequire=true：不显示红星，noRequire=false：显示红星
        if (this.validrule.noRequire !== undefined) {
          if (this.validrule.noRequire) {
            this.isShowStar = false;
          } else {
            this.isShowStar = true;
          }
        } else {
          this.isShowStar = true;
        }
      } else {
        this.isShowStar = false;
      }
    } else {
      if (this.isRequire) {
        this.isShowStar = true;
      } else {
        this.isShowStar = false;
      }
    }
  },
  methods: {
    // 是否溢出显示
    ellipsvisible() {
      if (this.isShowLabel) {
        this.lableWidth = this.$refs.companyStyle.clientWidth;
      }
      let zjl = this.curLabelName.length; //字节长度
      let zdz = this.maxWordCount; //最大值
      let lw = this.lableWidth; //lable宽度
      let x = this.isShowStar; //是否有星号
      if (zjl > zdz || zjl * 13 > lw || (x && zjl * 13 + 3 > lw)) {
        //兼容两种模式
        this.ellipsisshow = true;
      } else {
        this.ellipsisshow = false;
      }
      //判断超过N个字或宽度的显示溢出效果
    },
    ellipsinvisible() {
      this.ellipsisshow = false;
    },
    sendLabelCode() {
      // comType: 数据行索引，colIndex：列索引，compIndex：列中的组件（如果有）索引
      this.$emit(
        "clickEvent",
        this.comType,
        "",
        this.codeField,
        this.colIndex,
        this.compIndex
      );
    }
  }
};
</script>
