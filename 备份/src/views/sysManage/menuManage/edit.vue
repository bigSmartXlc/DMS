<!--
* description: 页面管理弹窗
* author: mwhao
* createdDate: 2019-11-19
-->

<template>
  <section class="orgDlr">
    <el-dialog v-dialogDrag
      id="orgDlr"
      title="页面管理"
      :visible.sync="curPopupsVisible"
      width="1063px"
      center
      @close="sendCo"
      :append-to-body="true"
      :close-on-click-modal="false"
      :lock-scroll="true"
    >
      <dialogHeader
        slot="title"
        :title="'页面管理'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <page ref="multipleTable" :tableOtherHeight="82"></page>
      <div class="menuButton">
        <el-button type="primary" plain @click="menuSend">确认</el-button>
        <el-button plain @click="sendCo">取消</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import page from "@/views/sysManage/pageManage/pageManage";
export default {
  props: {
    popupsVisible: { type: Boolean, default: false }
  },
  components: {
    page,
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      curPopupsVisible: this.popupsVisible,

      selectData:{
        formID:"",
        target:"",
        pageDesc:"",
        platform_Type:""
      }
    };
  },
  methods: {
    // 关闭弹窗
    sendCo() {
      this.$emit("close", false);
    },
    // 确认按钮
    menuSend() {
      this.$parent.editQuery.formID= this.selectData.formID
      this.$parent.editQuery.target = this.selectData.target;
      this.$parent.editQuery.formDesc=this.selectData.formDesc;
      this.$parent.editQuery.platformtype=this.selectData.platform_Type;
      this.sendCo();
    },
  }
};
</script>
<style scoped lang="scss">
/deep/ .menuButton {
  float: right;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
