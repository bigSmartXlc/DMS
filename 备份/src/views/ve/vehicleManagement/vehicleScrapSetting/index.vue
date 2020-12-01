<!--
* description: 车辆管理-车辆报废设置
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
          label: "是否已设置",
          width: 150,
          align: "center",
        },
        {
          prop: "scarpType",
          label: "报废类型",
          width: 100,
          align: "center",
          isComponent: true,
          // isSlot:true,
          comps: [
            {
              component: () => import("@/components/org/userSeleapiConfig"),
              type: "inputText",
              isShowLabel:false,
            },
          ],
        },
        {
          prop: "",
          label: "报废原因",
          width: 100,
          align: "center",
          isComponent: true,
          comps: [
            {
              component: () => import("@/components/org/commonInput"),

            },
          ],
        },
        {
          prop: "",
          label: "报废时间",
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
          label: "车型车型编码",
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
          label: "出厂日期",
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
          prop: "carsState",
          label: "车辆状态",
          width: 100,
          align: "center",
        },
      ],
      tableComponents: [
        //VIN码
        {
          compKey: "compKey1",
          labelName: "VIN码:",
          codeField: "vinCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //车辆类型
        {
          compKey: "compKey2",
          labelName: "车辆类型：",
          codeField: "carsType",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //报废开始时间
        {
          compKey: "compKey3",
          labelName: "报废开始时间：",
          codeField: "storageTime",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
        //报废结束时间
        {
          compKey: "compKey4",
          labelName: "报废报废结束时间：",
          codeField: "storageTime",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          span: 6,
        },
      ],
      tableButtons: [
        {
          conmpKey: "btenKey1",
          type: "",
          size: "small",
          text: "车辆报废设置",
          position: "left",
        },
        {
          conmpKey: "btenKey2",
          type: "",
          size: "small",
          text: "导出",
          icon: "iconfont  icon-confirm",
          position: "left",
        },
        {
          conmpKey: "btenKey3",
          type: "primary",
          size: "small",
          text: "查询",
          clickEvent: () => this.queryTable(1),
          position: "right",
        },
        {
          conmpKey: "btenKey4",
          type: "",
          size: "small",
          text: "重置",
          clickEvent: () => this.reset(),
          position: "right",
        },
      ],
      formField: this.$utils.getFormField(this, {
        vinCode: "",
        carsConfig: "",
        carColor: "",
        interiorColor: "",
        carsState: "",
        carsType: "",
        wareHouse: "",
        note: "",
        storageTime: "",
      }),
    };
  },
  methods: {
    //保存
    save() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        //保存表单
        this.saveForm();
      }
    },
  },
};
</script>

<style>
</style>
