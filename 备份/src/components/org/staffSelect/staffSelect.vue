<!--
* description: 员工选择弹窗
* author: chenjinming
* createdDate: 2019-12-03
-->
<template>
  <section class="carTypeConfig">
    <el-dialog v-dialogDrag
      :title="title"
      :visible.sync="curPopupsVisible"
      width="1000px"
      center
      @close="sendCode"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <dialogHeader
        slot="title"
        :title="title"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <one-table-template
        ref="multipleTable"
        :dynamicButtons="tableButtons"
        :dynamicComponents="tableComponents"
        :dynamicApiConfig="apiConfig"
        :dynamicTableCols="tableCols"
        :dynamicFormFields="formField"
        :dynamicUnFormFields="unFormFields"
        :dynamicIsShowSelect="isMul"
      />
    </el-dialog>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/popupsOneTable";
export default {
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins, valueObjectMixins],
  components: {
    OneTableTemplate,   dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgEmployeeQueryFindAll,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          name: "search",
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query"),
          position: "right"
        } /*查询*/,
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
           name: "reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset"),
          position: "right"
        } /*重置*/,
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          name: "confirm",
          clickEvent: () => this.sendCode("empId", "empName"),
          text: this.$t("sys.button.confirm"),
          position: "left"
        } /*确定*/
      ],
      // 动态组件-查询条件
      tableComponents: [
        // 显示组件
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.department") /*部门*/,
          codeField: "deptId",
          textField: "deptName",
          component: () => import("@/components/org/orgName/orgNameInput"),
          type: "propus",
          isRequire: true,
          isMust: true,
        },
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.UserName") /*用户名称*/,
          codeField: "userName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.employeeName") /*员工姓名*/,
          codeField: "empName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }
        // {
        //   compKey: "compKey5",
        //   labelName: this.$t("org.label.PositionCode") /*系统岗位编码*/,
        //   codeField: "positionCode",
        //   component: () => import("@/components/org/commonInput"),
        //   type: "inputText",
        //   isMust: true,
        //   hidden: true
        // }
      ],
      // 动态生成网格列
      tableCols: [
        {
          prop: "dlrShortName",
          label: this.$t("org.label.dlrName") /*经销商*/,
          width: null,
          hidden:true,
          align: "center"
        },
        {
          prop: "orgName",
          label: this.$t("org.label.department") /*部门*/,
          width: null,
          align: "center"
        },
        {
          prop: "userName",
          label: this.$t("org.label.UserName") /*用户名称*/,
          width: null,
          align: "center"
        },
        {
          prop: "empName",
          label: this.$t("org.label.employeeName") /*员工姓名*/,
          width: null,
          align: "center"
        },
        {
          prop: "empId",
          label: this.$t("org.label.empId") /*员工ID*/,
          width: 80,
          align: "center",
          hidden: true
        }
      ],
      //表单查询数据（查询条件）
      formField: {
        deptId: "",
        deptName: "",
        userName: "",
        empName: "",
        isEnable: "1"
        //positionCode: ""
      },
      // 排除查询条件
      unFormFields: {
        deptName: ""
      },
      title: this.$t("org.label.userSelTitle") /*用户选择*/,
      handleTableRowData: {
        value: "empId",
        text: "empName"
      }
    };
  }
};
</script>
