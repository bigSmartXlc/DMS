<!--
* description: 车辆管理-车籍异动查询
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
      :dynamicIsShowSelect="true"
      :dynamicIsInitTable="true"
      :dynamicIsFixChoose="false"
      :dynamicIsFixIndex="false"
      :dynamicApiStyle="'restful'"
    >
    </one-table-template>
    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      :isSetDefaultBrand="false"
      :dynamicApiStyle="'restful'"
      @close="close"
    ></edit>
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
    Edit: () => import("./edit"),
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
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              labelName: "查看",
              codeField: "",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton"),
            },
          ],
        },
        {
          prop: "",
          label: "VIN码",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "配置编码",
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
          label: "质量状态",
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
          label: "车牌号",
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
          label: "入库日期",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "客户名称",
          width: 100,
          align: "center",
        },
      ],
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: "",
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
          component: () => import("@/components/org/commonInput"),
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
          position: "component",
        },
        {
          conmpKey: "btenKey2",
          type: "",
          size: "small",
          text: "重置",
          clickEvent: () => this.reset(),
          position: "component",
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