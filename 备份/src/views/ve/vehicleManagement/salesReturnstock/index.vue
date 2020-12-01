<!--
* description: 车辆管理-销退入库
* author: liguanyu
* createdDate: 2020-11-20
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
          label: "撤销申请单号",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "订单号",
          width: 150,
          align: "center",
        },
        {
          prop: "batchNumber",
          label: "订单日期",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "VIN",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "车系编码",
          width: 150,
          align: "center",
        },
        {
          prop: "pdiState",
          label: "车系名称",
          width: 150,
          align: "center",
        },
        {
          prop: "pdiTime",
          label: "车型配置编码",
          width: 150,
          align: "center",
        },
        {
          prop: "estimatedTime",
          label: "车型配置名称",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "电池编号",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "合格证号",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "客户名称",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "客户电话",
          width: 150,
          align: "center",
        },
      ],
      tableComponents: [
        //订单号
        {
          compKey: "compKey1",
          labelName: "订单号:",
          codeField: "carBrandCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //销退单号
        {
          compKey: "compKey2",
          labelName: "订单标签：",
          codeField: "orderTheTag",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //VIN码
        {
          compKey: "compKey3",
          labelName: "VIN码：",
          codeField: "batchNumber",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //车型配置
        {
          compKey: "compKey4",
          labelName: "车型配置：",
          codeField: "customerName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
      
      ],
      tableButtons: [
        {
          conmpKey: "btenKey1",
          type: "",
          size: "small",
          text: "批量入库",
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