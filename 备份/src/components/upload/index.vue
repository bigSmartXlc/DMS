<!--
* description: 文件上传（单文件）
* author: luojx
* createdDate: 2019-11-26
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

      <el-input :placeholder="$t('sys.button.selFile')/*选择文件*/" v-model="modeCode" readonly>
        <el-upload slot="append" action :http-request="handleChange" :show-file-list="false">
          <el-button size="small" type="primary">{{$t('sys.button.clickUpload')/*点击上传*/}}</el-button>
        </el-upload>
      </el-input>

      <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    </el-col>
  </section>
</template>
<script>
// import lableName from "@/components/lableName";
// import validateFormate from "@/components/validateFormate";
export default {
  name: "mdmUpload",
  components: {
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },
  props: {
    validrule: { type: Object, default: () => {} },
    isRequire: { type: Boolean, default: false },
    isShowLabel: { type: Boolean, default: true },
    span: { type: Number, default: 6 },
    labelName: { type: String, default: "" },
    // 组件传值字段名称（与code对象绑定的字段名称，即视图中：formField对应的字段名称）
    // 如：视图中配置：code="formField.carBrandCode"，则codeField="carBrandCode"
    codeField: { type: String, default: "" },
    // 上次文件目录
    category: { type: String, default: "commonUpload" },
    // mp功能url路径 属性:fileUrl
    dataToObject: { type: Object, default: {} }
  },
  data() {
    return {
      fileList: null,
      modeCode: "",
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
      // MP上传url
      const url =
        that.dataToObject.fileUrl || "/mp/file/" + that.category + "/upload.do";
      that
        .$requestUpload(url, param)
        .then(response => {
          if (response.result === "1") {
            that.modeCode = "";
            let code = "";
            let text = "";
            // 因api管理-导入事件 添加判断逻辑
            if (typeof response.path !== "undefined") {
              if (
                response.result === "1" &&
                response.path.length > 0 &&
                response.path[0].length > 0 &&
                response.path[0][0].indexOf("|") > -1
              ) {
                // 返回格式：[["xxxx.png|/upload/{category}/{yyyyMMdd}/{guid}/xxxx.jpg","xxx.xx KB"]]
                // 截取出/upload/{category}/{yyyyMMdd}/{guid}/xxxx.jpg返回
                that.modeCode = response.path[0][0].split("|")[1];
                code = that.modeCode;
              }
            }
            this.$message({
              message: "导入成功",
              type: "success"
            });
            that.$emit("changeCode", code, text, that.codeField, that.comType);
          } else {
            this.$message({
              message: "导入失败",
              type: "warning"
            });
          }
        })
        .catch(err => {
          that.modeCode = "";
          console.info(err);
        });
    }
  }
};
</script>
