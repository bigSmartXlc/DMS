<!--
* description: excel文件导入（单文件）
* author: luojx
* createdDate: 2019-11-27
-->
<template>
  <section>
    <el-col :span="span">
      <lableName
        :validrule="validrule"
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>

      <el-upload
        action=""
        :http-request="handleChange"
        :show-file-list="false"
      >
        <el-button
          size="small"
          type="primary"
        >{{$t('sys.button.clickUpload')/*点击上传*/}}</el-button>
      </el-upload>

      <validateFormate
        :curLabelName="curLabelName"
        :validrule="validrule"
      ></validateFormate>
    </el-col>
  </section>
</template>
<script>
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: "mdmImportExcel",
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate"), //校验提示样式组件
  },
  props: {
    validrule: { type: Object, default: () => {} },
    isRequire: { type: Boolean, default: false },
    isShowLabel: { type: Boolean, default: true },
    span: { type: Number, default: 6 },
    labelName: { type: String, default: "" },
    // 数据传输对象
    // importUrl: 导入url
    dataToObject: { type: Object, default: () => {} }
  },
  data() {
    return {
      fileList: null,
      curLabelName:
        this.labelName === ""
          ? this.$t("sys.button.selFile") /*选择文件*/
          : this.labelName
    };
  },
  methods: {
    // 处理上传事件
    handleChange(param) {
      const that = this;
      // 中台API导入(如：'/ly/mp/busicen/scc/excel/netToStoreMutationImport.do')
      const url = this.dataToObject.importUrl;
      that.$requestImport(url, param, response => {
        if (response.result === "1") {
          if (response.data && response.data.result === "1") {
            that.$alert("导入成功", "提示", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          } else {
            that.$alert(response.data.msg, "导入失败", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        } else {
          that.$alert(response.msg, "导入错误", {
            confirmButtonText: "确定",
            callback: action => {}
          });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .el-upload {
  display: block;
  text-align: left !important;
}
</style>
