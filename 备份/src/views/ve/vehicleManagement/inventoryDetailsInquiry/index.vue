<!--
* description: 车辆管理-库存明细查询
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
          label: "入库时间",
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
          label: "销售状态",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车牌号",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "交付城市",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车系名称",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车型配置编码",
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
          label: "入库仓库",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "车身颜色名称",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "内饰颜色名称",
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
          label: "总装下线日期",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "合格证打印日期",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "入库人名称",
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
          label: "配车时间",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "库存备注",
          width: 100,
          align: "center",
        },
      ],
      tableComponents: [
        //车辆配置
        {
          compKey: "compKey1",
          labelName: "车辆配置:",
          codeField: "inventoryState",
          component: () => import("@/components/org/carTypeConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车身颜色
        {
          compKey: "compKey2",
          labelName: "车身颜色:",
          codeField: "carsState",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //内饰颜色
        {
          compKey: "compKey3",
          labelName: "内饰颜色:",
          codeField: "storageWarehouse",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //库存状态
        {
          compKey: "compKey4",
          labelName: "库存状态:",
          codeField: "auditState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车辆状态
        {
          compKey: "compKey5",
          labelName: "车辆状态:",
          codeField: "vinCode",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //入库仓库
        {
          compKey: "compKey6",
          labelName: "入库仓库：",
          codeField: "storageTime",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //配车状态
        {
          compKey: "compKey7",
          labelName: "配车状态:",
          codeField: "qualityState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //OAS入库时间
        {
          compKey: "compKey8",
          labelName: "入库时间:",
          codeField: "carsType",
          component: () => import("@/components/org/datePicker/datePicker"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //VIN码
        {
          compKey: "compKey9",
          labelName: "VIN码:",
          codeField: "carsType",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车辆类型
        {
          compKey: "compKey7",
          labelName: "车辆类型:",
          codeField: "qualityState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //交付城市
        {
          compKey: "compKey7",
          labelName: "交付城市:",
          codeField: "qualityState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //销售状态
        {
          compKey: "compKey7",
          labelName: "销售状态:",
          codeField: "qualityState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车牌号
        {
          compKey: "compKey9",
          labelName: "车牌号:",
          codeField: "carsType",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车系名称
        {
          compKey: "compKey7",
          labelName: "车系名称:",
          codeField: "qualityState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
      ],
      tableButtons: [
        {
          conmpKey:"btenKey1",
          type:"",
          size:"small",
          text:"导出",
          position:"left"
        },
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