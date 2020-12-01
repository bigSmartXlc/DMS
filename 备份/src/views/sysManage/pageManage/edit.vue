<!--
* description: 页面管理新增修改弹窗
* author: yxyan
* createdDate: 2019-10-29
* logs:
* 2019-11-18 增加添加/编辑功能 mwhao
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
          labelName: "页面名称",
          codeField: "pageDesc",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          // disabled: null,
          isMust: true
        }, //页面名称
        {
          compKey: "compKey2",
          labelName: "配置文件路径",
          codeField: "target",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //配置文件路径
        {
          compKey: "compKey3",
          labelName: "平台类型",
          codeField: "Platform_type",
          isRequire: true,
          component: () => import("@/views/sysManage/pageManage/isEnable"),
          type: "dropdownList",
          parentFileds: "disabled:roleCode-enabled-false",
          // disabled: null,
          isMust: true
        }, //平台类型
        {
          compKey: "compKey4",
          labelName: "页面路径",
          codeField: "target",
          inputType: "textarea",
          isRequire: false,
          disabled: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        } //页面路径
      ],
      // 标题
      textMap: {
        edit: "修改页面", //修改弹框名字
        add: "新增页面" //新增弹框名字
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        pageDesc: "",
        target: "",
        Platform_type: "1",
        formID: ""
      },
      // 返回参数
      returnMsg: {
        l0200400025: "页面名称已存在",
        l0200400022: "页面正在使用无法删除",
        l0200400013: "获取页面列表失败",
        l0200400016: "获取页面列表成功",
        l0200400034: "无法打开页面，表单不存在",
        l1502500007: "服务路径不是合法的路径,合法路径,如:/mp/org/**"
      }
    };
  },
  methods: {
    //新增/编辑保存按钮
    save() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");
      var addformField = {};
      if (this.valid) {
        if (that.popupsState === "edit") {
          addformField = {
            pagedesc: this.formField.pageDesc,
            formid: this.formField.formID,
            target: this.formField.target
          };
          this.$store
            .dispatch("sysManage/updateWebForm", addformField)
            .then(response => {
              if (response.result == "1") {
                that.$message({
                  message: this.$t("sys.tips.esTip5") /*保存成功*/,
                  type: "success",
                  duration: 2000
                });
                that.curPopupsVisible = false;
              } else {
                let str = that.returnMsg[response.msg];
                this.$message({
                  message: str || "保存失败",
                  type: "warning"
                });
              }
              this.$parent.query();
            });
          // .catch(error => {
          //   reject(error);
          // });
        } else {
          addformField = {
            pagedesc: this.formField.pageDesc,
            target: this.formField.target,
            Platform_type: this.formField.Platform_type
          };
          this.$store
            .dispatch("sysManage/addWebForm", addformField)
            .then(response => {
              if (response.result == "1") {
                that.$message({
                  message: this.$t("sys.tips.esTip5") /*保存成功*/,
                  type: "success",
                  duration: 2000
                });
                that.curPopupsVisible = false;
              } else {
                let str = that.returnMsg[response.msg];
                this.$message({
                  message: str || "保存失败",
                  type: "warning"
                });
              }
              this.$parent.query();
            });
          // .catch(error => {
          //   reject(error);
          // });
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