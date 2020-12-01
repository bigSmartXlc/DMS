<!--
* description: 功能服务管理-编辑/修改弹窗
* author: mwhao
* createdDate:  2020-3-10
-->

<template>
  <section class="editWholeRoleManage">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      width="500px"
    >
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-container filter-params">
        <el-row :gutter="26" ref="vailComponentList">
          <component
            v-for="comp in tableComponents.filter(o => o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :validrule="comp.validrule"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :code="formField[comp.codeField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :isMul="comp.isMul"
            :span="comp.span || 24"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :dateOptionsType="comp.dateOptionsType"
          ></component>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
export default {
  // 组件混入对象
  mixins: [formMixins],
  components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      // 保存API配置对象
      apiConfig: orgApis.sysRoleMutationGlobalSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.save")
        }, // '保存'
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } //重置
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.functionNumber"),
          codeField: "funcId",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          // disabled: null,
          isMust: true
        }, //功能编号
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.functionName"),
          codeField: "funcName",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //功能名称
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.serviceInterface"),
          codeField: "serviceUrl",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          // disabled: null,
          isMust: true
        }, //服务接口
        {
          compKey: "compKey4",
          labelName: "功能描述",
          codeField: "desc",
          inputType: "textarea",
          isRequire: false,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        } //功能描述
      ],
      // 标题
      textMap: {
        edit: "修改功能与服务关系", //修改弹框名字
        add: "新增功能与服务关系" //新增弹框名字
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        funcId: "",
        id: "",
        funcName: "",
        serviceUrl: "",
        desc: ""
      }
    };
  },
  methods: {
    // 新增保存api
    addApi() {
      let that = this;
      this.$store
        .dispatch("sysManage/functionalserviceAdd", this.formField)
        .then(response => {
          if (response.result == "1") {
            this.$message({
              message: this.$t("sys.tips.esTip5") /*保存成功*/,
              type: "success",
              duration: 2000
            });
            this.curPopupsVisible = false;
            this.$parent.query();
          } else {
            let errInfo = "保存失败,请重试";
            if (this.infos[response.msg]) {
              errInfo = this.infos[response.msg];
            }
            this.$message({
              message: errInfo,
              type: "warning",
              duration: 2000
            });
          }
        })
        .catch(error => {
          reject(error);
        });
    },
    // 编辑保存api
    editApi() {
      this.$store
        .dispatch("sysManage/functionalserviceEdit", this.formField)
        .then(response => {
          if (response.result == "1") {
            this.$message({
              message: this.$t("sys.tips.esTip5") /*保存成功*/,
              type: "success",
              duration: 2000
            });
            this.curPopupsVisible = false;
            this.$parent.query();
          } else {
            let errInfo = "保存失败,请重试";
            if (this.infos[response.msg]) {
              errInfo = this.infos[response.msg];
            }
            this.$message({
              message: errInfo,
              type: "warning",
              duration: 2000
            });
          }
        })
        .catch(error => {
          reject(error);
        });
    },
    //新增/编辑保存按钮
    save() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        if (that.popupsState === "edit") {
          that.formField.apiId = that.$parent.deleteObj.apiIds;
          that.editApi();
        } else {
          that.addApi();
        }
      }
    }
  }
};
</script>
<style scoped>
.filter-container /deep/.el-select {
  width: 75%;
}
.el-col /deep/.el-input {
  width: 75%;
}
.filter-container /deep/ label {
  width: 20%;
}
</style>
