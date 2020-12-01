<!--
* description: 车辆管理-车辆限制
* author: liguanyu
* createdDate: 2020-11-17
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
        APIUrl: "/ly/mp/busicen/restful/getorderList.do",
      },
      //动态生成网格列
      tableCols: [
        {
          prop: "",
          label: "是否已限制",
          width: 150,
          align: "center",
        },
        {
          prop: "",
          label: "限制类型",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "限制时间",
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
          label: "VIN码",
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
          label: "车型配置编码",
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
          label: "仓库",
          width: 100,
          align: "center",
        },
        {
          prop: "",
          label: "入库时间",
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
        },
        //车辆配置
        {
          compKey: "compKey2",
          labelName: "车辆配置：",
          codeField: "carsConfig",
          component: () => import("@/components/org/carTypeConfig/index.vue"),
          type: "inputText",
          isMust: true,
        },
        //车身颜色
        {
          compKey: "compKey3",
          labelName: "车身颜色:",
          codeField: "carColor",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //内饰颜色
        {
          compKey: "compKey4",
          labelName: "内饰颜色：",
          codeField: "interiorColor",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //车辆状态
        {
          compKey: "compKey5",
          labelName: "车辆状态：",
          codeField: "carsState",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
        },
        //车辆类型
        {
          compKey: "compKey6",
          labelName: "车辆类型：",
          codeField: "carsType",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
        },
        //仓库
        {
          compKey: "compKey7",
          labelName: "仓库：",
          codeField: "wareHouse",
          component: () => import("@/components/org/userSeleapiConfig"),
          type: "inputText",
          isMust: true,
        },
        //备注
        {
          compKey: "compKey8",
          labelName: "备注：",
          codeField: "note",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
        },
        //入库时间
        {
          compKey: "compKey9",
          labelName: "入库时间：",
          codeField: "storageTime",
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
          text: "车辆限制",
          position: "left",
        },
        {
          conmpKey: "btenKey2",
          type: "",
          size: "small",
          text: "解除限制",
          position: "left",
        },
        {
          conmpKey: "btenKey3",
          type: "",
          size: "small",
          text: "导出",
          position: "left",
        },
        {
          conmpKey: "btenKey4",
          type: "primary",
          size: "small",
          text: "查询",
          clickEvent: () => this.queryTable(1),
          position: "right",
        },
        {
          conmpKey: "btenKey5",
          type: "",
          size: "small",
          text: "重置",
          clickEvent: () => this.reset(),
          position: "right",
        },
      ],
      formField: this.$utils.getFormField(this, {
        vinCode: "",
        carsConfig:"",
        carColor:"",
        interiorColor:"",
        carsState:"",
        carsType:"",
        wareHouse:"",
        note:"",
        storageTime:"",
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