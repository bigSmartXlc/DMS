<!--
* description: 车辆管理-库存汇总查询
* author: liguanyu
* createdDate: 2020-11-19
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
      :dynamicIsShowSelect="false"
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
          label: "车系",
          width: 200,
          align: "center",
        },
        {
          prop: "",
          label: "车型",
          width: 250,
          align: "center",
        },
        {
          prop: "",
          label: "车型配置",
          width: 200,
          align: "center",
        },
        {
          prop: "",
          label: "车身颜色",
          width: 200,
          align: "center",
        },
        {
          prop: "",
          label: "内饰颜色",
          width: 200,
          align: "center",
        },
        {
          prop: "",
          label: "数量",
          width: 200,
          align: "center",
        },
        {
          prop: "",
          label: "仓库",
          width: 200,
          align: "center",
        },
      ],
      tableComponents: [
        //车系
        {
          compKey: "compKey1",
          labelName: "车系:",
          codeField: "inventoryState",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车型配置
        {
          compKey: "compKey2",
          labelName: "车型配置:",
          codeField: "carsState",
          component: () => import("@/components/org/carTypeConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车身颜色
        {
          compKey: "compKey3",
          labelName: "车身颜色:",
          codeField: "storageWarehouse",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //内饰颜色
        {
          compKey: "compKey4",
          labelName: "内饰颜色:",
          codeField: "auditState",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //入库仓库
        {
          compKey: "compKey5",
          labelName: "入库仓库:",
          codeField: "vinCode",
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