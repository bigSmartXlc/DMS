

<template>
  <!-- 导入模板 -->
  <section>
    <el-col :span="span">
      <lableName :curLabelName="curLabelName" :isShowLabel="isShowLabel" :isRequire="isRequire"></lableName>
      <el-input v-model="modelCode" placeholder="文件只能是 xls、xlsx格式" readonly />
    </el-col>
    <el-col :span="span" style="text-align:left;">
      <el-upload
        class="upload-demo"
        ref="upload"
        action
        :http-request="handleChange"
        accept=".xls, .xlsx"
        :show-file-list="false"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
          class="iconfont icon-importAppointment"
        >选择文件</el-button>
        <el-button
          style="margin-left: 10px;"
          size="small"
          @click="submitUpload"
          :disabled="disableds"
          class="iconfont icon-exportMasterTable"
        >导入</el-button>
        <a
          v-if="dataToObject.downloadUrl===undefined?false:true"
          class="linkFont"
          :href="dataToObject.downloadUrl===undefined ?'#':dataToObject.downloadUrl "
          :download="dataToObject.downloadName===undefined? '':dataToObject.downloadName+'.xlsx'"
        >模板下载</a>
        <a href="#" v-else @click="this.export">模板下载</a>
      </el-upload>
    </el-col>

    <validateFormate :curLabelName="curLabelName" :validrule="validrule"></validateFormate>
    <editMsg :key="keys" :handleVisible="handleVisible" :msg="msg" @close="close"/>
  </section>
</template>
<script>
import { inputMixins } from "@/components/mixins/inputMixins";
export default {
  name: "Export",
  mixins: [inputMixins],
  components: {
    editMsg: () => import("./editMsg"), //消息提示弹窗
    lableName: () => import("@/components/lableName"), //标题溢出样式组件
    validateFormate: () => import("@/components/validateFormate") //校验提示样式组件
  },
  props: {
    validrule: { type: Object, default: () => {} },
    isRequire: { type: Boolean, default: false },
    isShowLabel: { type: Boolean, default: true },
    span: { type: Number, default: 6 },
    labelName: { type: String, default: "" },
    dataToObject: { type: Object, default: () => {} }
  },
  data() {
    return {
      fileList: [],
      handleVisible: false,
      keys: "msgKey",
      msg: "",
      file: {
        name: ""
      },
      disableds: false,
      fileParam: "",
      curLabelName:
        this.labelName === ""
          ? this.$t("sys.button.selFile") /*选择文件*/
          : this.labelName
    };
  },
  created() {
    this.fileList = [];
  },
  methods: {
    export() {
      //导出模板
      this.dataToObject.that.exportExcel();
    },
    submitUpload() {
      console.log(this.file);
      if (!this.file.name) {
        this.$message({
          message: "请先选取文件!",
          type: "warning"
        });
        return;
      }
      var testmsg = this.file.name.substring(
        this.file.name.lastIndexOf(".") + 1
      );
      const extension = testmsg === "xls";
      const extension2 = testmsg === "xlsx";
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 xls、xlsx格式!",
          type: "warning"
        });
        return;
      }
      this.uploadSectionFile();
    },
    //覆盖默认的上传，自定义上传方式
    uploadSectionFile() {
      let that = this;
      var url = this.dataToObject.importUrl; // API根据不同功能url不同，请配置到对应模块配置; // API根据不同功能url不同，请配置到对应模块配置
      if (this.modelCode === "") {
        this.$message({
          message: "请先选取文件!",
          type: "warning"
        });
        return;
      }

      if (this.dataToObject.isParam) {
        let keys = this.dataToObject.param.split(",");
        let arr = Object.entries(this.dataToObject.that.formField);
        var params = [];
        for (const i in keys) {
          for (const j in arr) {
            if (keys[i] === arr[j][0] && arr[j][1] != "") {
              params[i] = arr[j][1];
            }
          }
        }
        if (keys.length == 1) {
          url += "?" + keys[0] + "=" + params[0];
        } else if (keys.length > 1) {
          url += "?" + keys[0] + "=" + params[0];
          for (const i in keys) {
            if (i == 0) {
              continue;
            } else {
              url += "&" + keys[i] + "=" + params[i];
            }
          }
        }
      }
      this.$requestImport(url, this.fileParam, function(response) {
        that.disableds = true;
        if (response.data.result == "1") {
          //判断有没有传刷新网格的this，
          if (that.dataToObject.that) {
            // 判断是否是VIN上传导入查询
            if(that.dataToObject.toleadType=="vin"){
              let list=response.data.rows
              let VIN=""
              list.map(item=>{VIN==""?VIN+=item.vin: VIN+=","+item.vin})
              let dataTable=that.dataToObject.that.$refs.multipleTable
              dataTable.formField.vin=VIN  // 用于导出 formField赋值
              dataTable.list=list
              dataTable.pageTotal=list.length
              dataTable.listIndex.pageIndex = 1
              dataTable.listIndex.pageSize = 10
              dataTable.pageDisabled=true  // 分页器禁用  oneTable 添加分页器禁用属性
              dataTable.oneTableKey+="1"
            }else{
              that.dataToObject.that.queryTable(1);
            }
          }
          if (that.dataToObject.msgType &&that.dataToObject.msgType === "msg") {
            that.edit(response.data.msg);
          } else {
            that.$alert(response.data.msg, "提示", {
              confirmButtonText: "确定",
              callback: action => {
                that.disableds = false;
              }
            });
          }
        } else {
          if (that.dataToObject.that) {
            that.dataToObject.that.queryTable(1);
          }
          if (that.dataToObject.that) {
            that.dataToObject.that.queryTable(1);
          }
          if (that.dataToObject.msgType &&that.dataToObject.msgType === "msg") {
            that.edit(response.data.msg);
          } else {
            that.$alert(response.data.msg, "提示", {
              confirmButtonText: "确定",
              callback: action => {
                that.disableds = false;
              }
            });
          }
          return;
        }
      });
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleChange(param) {
      this.fileParam = param;
      this.file.name = param.file.name;
      this.modelCode = param.file.name;
      this.sendCode();
    },
    edit(msg) {
      this.msg = msg
      this.handleVisible = true;
      this.keys = this.keys + 1;
      this.disableds = false;
    },
    close(val){
      this.handleVisible = false;
    }
  }
};
</script>
<style scoped>
</style>
