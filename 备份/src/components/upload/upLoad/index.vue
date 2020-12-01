<!--
* description: 上传文件输入框
* author: ydche
* createdDate: 2019-09-19
-->
<template>
  <section>
    <el-col :span="span" id="resect-upLoad">
      <lableName
        :validrule="validrule"
        :curLabelName="curLabelName"
        :isShowLabel="isShowLabel"
        :isRequire="isRequire"
      ></lableName>

      <el-input :placeholder="$t('sys.button.selFile')/*选择文件*/" v-model="filePath" readonly>
        <i
          slot="suffix"
          :class="filePath !=='' ? 'el-input__icon el-icon-error' : ''"
          @click="delectFile()"
        ></i>
        <el-upload
          slot="append"
          action
          :multiple="isMul"
          :show-file-list="false"
          class="upload-demo"
          :auto-upload="false"
          :on-change="handleChange"
        >
          <el-button size="small" type="primary">{{$t('选择文件')/*点击上传*/}}</el-button>
        </el-upload>
      </el-input>

      <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    </el-col>
  </section>
</template>
<script>
export default {
  name: "PurcashType",
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
    isMul: { type: Boolean, default: true }
  },
  data() {
    return {
      fileList: null,
      filePath: "",
      file: {},
      curLabelName:
        this.labelName === ""
          ? this.$t("sys.button.selFile") /*选择文件*/
          : this.labelName
    };
  },
  methods: {
    handleChange(file) {
      let that = this;
      this.file = file;
      // 添加多个附件判断
      if (this.filePath == "") {
        this.filePath = file.name;
      } else {
        if(this.isMul){
          this.filePath += ",";
          this.filePath += file.name;
        }else{
          this.filePath = file.name;
        }
      }
      that.$emit("filed", file);
    },
    delectFile(file) {
      let that = this;
      this.file = {};
      this.filePath = "";
      that.$emit("delectfiled", file);
    }
  }
};
</script>
<style scoped>
/deep/.el-input-group__append,
.el-input-group__prepend {
  border: 0;
}
</style>
