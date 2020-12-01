<!--
* description: 车辆管理-库存查询
* author: liguanyu
* createdDate: 2020-11-18
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="dynamicApiConfigs"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicIsShowSelect="true"
      :dynamicIsInitTable="true"
      :dynamicIsFixChoose="false"
      :dynamicIsFixIndex="false"
      :dynamicApiStyle="'restful'"
    >
    </one-table-template>
  </div>
</template>

<script>
import { formMixins } from "@/components/mixins/formMixins";
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
export default {
  mixins: [oneTableWithViewTemplateMixins, formMixins],
  components: {
    OneTableTemplate,
  },
  data() {
    return {
      dynamicApiConfigs: {
        APIUrl: "/vehicleScrapSetting",
      },
      //动态生成网格列
      tableCols: [
        {
          prop: "",
          label: "VIN",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "库存状态",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车辆状态",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车辆类型",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "配车状态",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "配车订单类型",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "质量状态",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "配车时间",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "入库时间",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "储区",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "库位",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "仓库",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车系",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车型",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车型配置",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车型配置名称",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车身颜色",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "内饰颜色",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "厂牌型号",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "产地",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "合格证",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "驱动类型",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "电机型号",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "电机序列号",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "电池型号",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "电池包序列号",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "下线日期",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "生产日期",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "城市库库龄",
          width: 100,
          align: "center",
        },
      ],
      tableComponents: [
        //库存状态
        {
          compKey: "compKey1",
          labelName: "库存状态:",
          codeField: "inventoryState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车辆状态
        {
          compKey: "compKey2",
          labelName: "车辆状态:",
          codeField: "carsState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //入库仓库
        {
          compKey: "compKey3",
          labelName: "入库仓库:",
          codeField: "storageWarehouse",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //审核状态
        {
          compKey: "compKey4",
          labelName: "审核状态:",
          codeField: "auditState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //VIN码
        {
          compKey: "compKey5",
          labelName: "VIN码:",
          codeField: "vinCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //入库时间
        {
          compKey: "compKey6",
          labelName: "入库时间：",
          codeField: "storageTime",
          component: () => import("@/components/org/datePicker/datePicker"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //质量状态
        {
          compKey: "compKey7",
          labelName: "质量状态:",
          codeField: "qualityState",
          component: () => import("@/components/org/CountrySelect"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车辆类型
        {
          compKey: "compKey8",
          labelName: "车辆类型:",
          codeField: "carsType",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
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
        inventoryStatus: "",
        carsState: "",
        storageWarehouse: "",
        auditState: "",
        vinCode: "",
        storageTime: "",
        qualityState: "",
        carsType: "",
      }),
    };
  },
  methods: {},
};
</script>

<style>
</style>