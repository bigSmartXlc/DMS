<!--
* description: 车辆管理-验收入库
* author: liguanyu
* createdDate: 2020-11-16
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="dynamicApiConfig"
      :dynamicFormFields="formField"
      :dynamicTableCols="tableCols"
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
        APIUrl: "/getacceptanceList.do",
      },

      //动态生成网格列
      tableCols: [
        {
          prop: "",
          label: "操作",
          codeField: "",
          width: 100,
          align: "center",
          fixed: false,
          isComponent: false,
        },
        {
          prop: "orderLabel",
          label: "订单标号/调拨单号",
          width: 150,
          align: "center",
        },
        {
          prop: "batchNumber",
          label: "批次编号",
          width: 100,
          align: "center",
        },
        {
          prop: "orderDate",
          label: "订单日期",
          width: 100,
          align: "center",
        },
        {
          prop: "vinCode",
          label: "VIN码",
          width: 100,
          align: "center",
        },
        {
          prop: "cars",
          label: "车系",
          width: 100,
          align: "center",
        },
        {
          prop: "vehicleConfigurationCode",
          label: "车型配置编码",
          width: 100,
          align: "center",
        },
        {
          prop: "vehicleConfigurationName",
          label: "车型配置名称",
          width: 100,
          align: "center",
        },
        {
          prop: "carColor",
          label: "车身颜色",
          width: 100,
          align: "center",
        },
        {
          prop: "interiorColor",
          label: "内饰颜色",
          width: 100,
          align: "center",
        },
        {
          prop: "batteryNumber",
          label: "电池编号",
          width: 100,
          align: "center",
        },
        {
          prop: "machineCode",
          label: "电机编码",
          width: 100,
          align: "center",
        },
        {
          prop: "qualifiedNumber",
          label: "合作证号",
          width: 100,
          align: "center",
        },
      ],
      tableComponents: [
        //订单编号/调拨单号
        {
          compKey: "compKey1",
          labelName: "订单编号/调拨单号:",
          codeField: "orderLabel",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //批次编号
        {
          compKey: "compKey2",
          labelName: "批次编号：",
          codeField: "batchNumber",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //VIN码
        {
          compKey: "compKey3",
          labelName: "VIN码：",
          codeField: "vinCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //车型配置
        {
          compKey: "compKey4",
          labelName: "车型配置：",
          codeField: "cars",
          component: () => import("@/components/org/carTypeConfig"),
          type: "inputText",
          isMust: true,
        },
        //下单时间
        {
          compKey: "compKey5",
          labelName: "下单时间：",
          codeField: "orderDate",
          component: () => import("@/components/org/datePicker/datePicker.vue"),
          type: "inputText",
          isMust: true,
        },
      ],
      tableButtons: [
        {
          conmpKey: "btenKey0",
          type: "",
          size: "small",
          text: "验收入库",
          position: "left",
        },
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
          clickEvent: () => this.queryTable(1),
          text: "查询",
          position: "right",
        },
        {
          conmpKey: "btenKey3",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: "重置",
          position: "right",
        },
      ],
      // 表单查询数据
      formField: this.$utils.getFormField(this, {
        orderLabel: "",
        batchNumber: "",
        orderDate: "",
        vinCode: "",
        cars: "",
      }),
    };
  },
};
</script>

<style>
</style>