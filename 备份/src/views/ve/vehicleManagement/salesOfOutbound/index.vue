<!--
* description: 车辆管理-销售出库
* author: liguanyu
* createdDate: 2020-11-17
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
          width: 100,
          align: "center",
          fixed: false,
          isComponent: false,
        },
        {
          prop: "carBrandCode",
          label: "订单编号",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "订单标签",
          width: 100,
          align: "center",
        },
        {
          prop: "batchNumber",
          label: "批次编号",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "VIN",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "VIN码",
          width: 100,
          align: "center",
        },
        {
          prop: "pdiState",
          label: "PDI状态",
          width: 100,
          align: "center",
        },
        {
          prop: "pdiTime",
          label: "发起PDI时间",
          width: 100,
          align: "center",
        },
        {
          prop: "estimatedTime",
          label: "预计完成时间",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "建议维修项目",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "客户名称",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "电话",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "联系人",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "联系电话",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "地址",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "交付门店",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "交付专员",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "PDI次数",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "最近PDI质检时间",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "PDI单号",
          width: 100,
          align: "center",
        },
      ],
      tableComponents: [
        //订单编号
        {
          compKey: "compKey1",
          labelName: "订单编号:",
          codeField: "carBrandCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //订单标签
        {
          compKey: "compKey2",
          labelName: "订单标签：",
          codeField: "orderTheTag",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
        },
        //批次编号
        {
          compKey: "compKey3",
          labelName: "批次编号：",
          codeField: "batchNumber",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //客户名称
        {
          compKey: "compKey4",
          labelName: "客户名称：",
          codeField: "customerName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //交付中心
        {
          compKey: "compKey5",
          labelName: "交付中心：",
          codeField: "deliveryCenter",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
        },
        //VIN
        {
          compKey: "compKey6",
          labelName: "VIN：",
          codeField: "vinCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //PDI
        {
          compKey: "compKey7",
          labelName: "PDI：",
          codeField: "pdi",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
        },
      ],
      tableButtons: [
        {
          conmpKey: "btenKey1",
          type: "primary",
          size: "small",
          text: "查询",
          clickEvent: () => this.queryTable(1),
          position: "right",
        },
        {
          conmpKey: "btenKey2",
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