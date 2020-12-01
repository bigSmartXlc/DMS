<!--
* description: 销退管理-销退申请
* author: liguanyu
* createdDate: 2020-11-23
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="dynamicApiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicIsShowSelect="true"
      :dynamicIsInitTable="true"
      :dynamicIsColumnDrop="true"
      :isSetDefaultBrand="false"
      :dynamicIsFixChoose="false"
      :dynamicIsFixIndex="false"
      :dynamicApiStyle="'restful'"
    >
    </one-table-template>
  </div>
</template>

<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
export default {
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
  },
  data() {
    return {
      dynamicApiConfig: {
        APIUrl: "/salesOfOutbound",
      },
      //动态生成网格列
      tableCols: [
        //操作
        {
          prop: "",
          label: "操作",
          width: 150,
          align: "center",
          fixed: false,
          isComponent: false,
        },
        {
          prop: "carBrandCode",
          label: "销退申请单号",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "退货类型",
          width: 150,
          align: "center",
        },
        {
          prop: "batchNumber",
          label: "状态",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "申请日期",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "退货总金额",
          width: 150,
          align: "center",
        },
        {
          prop: "pdiState",
          label: "退货申请原因",
          width: 150,
          align: "center",
        },
        {
          prop: "pdiTime",
          label: "是否上传附件",
          width: 150,
          align: "center",
        },
        {
          prop: "estimatedTime",
          label: "关联订单号",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "车型配置名称",
          width: 150,
          align: "center",
        }
      ],
      tableComponents: [
        //退货类型
        {
          compKey: "compKey1",
          labelName: "退货类型:",
          codeField: "carBrandCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span:8
        },
        //申请单号
        {
          compKey: "compKey2",
          labelName: "申请单号：",
          codeField: "orderTheTag",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span:8
        },
        //关联订单号
        {
          compKey: "compKey3",
          labelName: "关联订单号:",
          codeField: "batchNumber",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span:8
        },
        //申请日期
        {
          compKey: "compKey4",
          labelName: "申请日期：",
          codeField: "customerName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span:8
        },
        //车型配置
        {
          compKey: "compKey5",
          labelName: "车型配置：",
          codeField: "deliveryCenter",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span:8
        }
      ],
      tableButtons: [
        {
          conmpKey: "btenKey1",
          type: "",
          size: "small",
          text: "新增",
          position: "left",
        },
        {
          conmpKey: "btenKey2",
          type: "primary",
          size: "small",
          text: "查询",
          clickEvent: () => this.queryTable(1),
          position: "right",
        },
        {
          conmpKey: "btenKey3",
          type: "",
          size: "small",
          text: "重置",
          clickEvent: () => this.reset(),
          position: "right",
        },
      ],
      formField: this.$utils.getFormField(this, {
        carBrandCode: "",
        orderTheTag: "",
        batchNumber: "",
        customerName: "",
        deliveryCenter: "",
        vinCode: "",
        pdi: "",
      }),
    };
  },
};
</script>

<style>
</style>