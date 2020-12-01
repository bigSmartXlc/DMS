<!--
* description: 展车新增订单
* author: WJ
* createdDate:2020-11-13 
-->
<template>
  <section class="app-container app-container-table">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      width="1000px"
    >
      <div class="title">
        <span class="line"></span>
        <h3 class="text">展车单信息</h3>
      </div>
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-container filter-params">
        <el-row :gutter="26">
          <component
            v-for="comp in tableComponents1.filter(o => o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :validrule="comp.validrule"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :code="formField[comp.codeField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :isMul="comp.isMul"
            :span="comp.span || 8"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :parentFileds="comp.parentFileds"
            :dateOptionsType="comp.dateOptionsType"
          ></component>
        </el-row>
      </div>
      <div class="title">
        <span class="line"></span>
        <h3 class="text">订单添加明细</h3>
      </div>
      <div class="filter-container filter-params">
        <el-row :gutter="26">
          <component
            v-for="comp in tableComponents2.filter(o => o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire + comp.compKey : comp.compKey"
            :validrule="comp.validrule"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :code="formField[comp.codeField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :isMul="comp.isMul"
            :span="comp.span || 8"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :parentFileds="comp.parentFileds"
            :dateOptionsType="comp.dateOptionsType"
          ></component>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
           :icon="comp.icon"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
      <one-table-template
        ref="multipleTable"
        :dynamicButtons="tableObj.tableButtons"
        :dynamicComponents="tableObj.tableComponents"
        :dynamicApiConfig="tableObj.apiConfig"
        :dynamicTableCols="tableObj.tableCols"
        :dynamicFormFields="tableObj.formField"
        :dynamicIsShowMoreBtn="false"
        :dynamicIsInitTable="true"
      />
      <edit
        ref="multipleTable1"
        :dynamicEditRowData="editRowData"
        :popupsVisible="editPopupsVisible"
        :key="editPopupsKey"
        :receiveObj="receiveObj"
        :popupsState="editPopupsState"
        @closeNew="closeNew"
      ></edit>
    </el-dialog>
  </section>
</template>
<script>
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/popupsOneTable";

export default {
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins, formMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./Inedit"),
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    sceneCode: { type: String, default: '-0.1' },
  },
  data() {
    const viewPageCode = "belowOrderEdit"
    return {
      receiveObj: this.sceneCode,
      // 保存API配置对象
      // 网格查询API配置对象
      apiConfig:{
        APIUrl:'ve/belowInfo',
      },
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          icon: "",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.save")
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "",
          clickEvent: () => this.sendCode(),
          text: this.$t("sys.button.cancel")
        }
      ],
      // 动态组件-查询条件
      tableComponents1: 
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          : [
            {
              compKey: 'compKey1',
              labelName: '批次编号：',
              codeField: 'batchNum',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              parentFileds: "disabled:uid-batchNum",
              type: 'inputText',
              disabled: null,
              isMust: true,
              dataToObject: {
                maxLength: 50
              }
            },
            {
              compKey: 'compKey2',
              labelName: '负责人姓名：',
              codeField: 'principalName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isRequire: true,
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '负责联系人电话：',
              codeField: 'principalPhone',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isRequire: true,
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '备注：',
              codeField: 'remark',
              component: () => import('@/components/org/commonInput/textareaInput'),
              type: 'textArea',
              isMust: true
            },
        ],
      tableComponents2: 
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          : [
            {
              compKey: 'compKey5',
              labelName: '车型配置：',
              codeField: 'carConfig',
              component: () => import('./carConfig'),
              type: 'propus',
              isRequire: true,
              isMust: true
            },
            {
              compKey: 'compKey6',
              labelName: '交付城市：',
              codeField: 'deliveryCity',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isRequire: true,
              isMust: true
            },
            {
              compKey: 'compKey7',
              labelName: '交付门店：',
              codeField: 'deliveryStore',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isRequire: true,
              isMust: true
            },
            {
              compKey: 'compKey8',
              labelName: '数量：',
              codeField: 'quantity',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isRequire: true,
              isMust: true
            },
            {
              compKey: 'compKey9',
              labelName: '展车门店：',
              codeField: 'belowStore',
              component: () => import('./belowStore'),
              type: 'propus',
              isMust: true
            },
            {
              compKey: 'compKey10',
              labelName: '备注：',
              codeField: 'remarkOne',
              component: () => import('@/components/org/commonInput/textareaInput'),
              type: 'textArea',
              isMust: true
            }
        ],
      tableObj: {
         tableCols: [
          {
            prop: "controlBtn",
            label: this.$t("sys.content.operate"), //操作
            codeField: "controlBtn",
            width: 50,
            align: "center",
            isComponent: true,
            comps: [
              {
                compKey: "propKey1",
                labelName: "编辑", //编辑
                clickEvent: this.edit,
                component: () => import("@/components/org/linkButton")
              },
              {
                compKey: "propKey2",
                labelName: "删除", //编辑
                // clickEvent: this.edit,
                component: () => import("@/components/org/linkButton")
              }
            ]
          },
          {
            prop: "carTypeName",
            label: "车型名称"
          },
          {
            prop: "carConfigCode",
            label: "车型配置编码"
          },
          {
            prop: "carConfigName",
            label: "车型配置名称"
          },
          {
            prop: "deliveryCity",
            label: "交付城市"
          },
          {
            prop: "deliveryStore",
            label: "交付门店"
          },
          {
            prop: "belowStore",
            label: "展车门店"
          },
          {
            prop: "quantity",
            label: "数量"
          }
        ],
      },
      formField: this.$utils.getFormField(this, {

      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),
      // 标题
      textMap: {
        edit: '修改订单',
        add:'新增订单'
      },
    };
  },
  watch: {
  "formField.deptId"(val){
    if (this.formField.deptId !== "") {
      this.staticTableComponents[0].disabled = true
      this.staticTableComponents[1].disabled = true
    }
    else{
      this.staticTableComponents[0].disabled = false
      this.staticTableComponents[1].disabled = false
    }
  }},
  
  created() {
    this.tableComponents = [...this.tableComponents1, ...this.tableComponents2]
  },
  mounted() {
    // this.queryTable(1)
  },
  methods: {
    closeNew(type) {
      this.editPopupsVisible = false;
      if (this.resetDialogKey === true) {
        this.editPopupsKey = this.$utils.generateId();
      }
      if (type === "1") {
        this.queryTable(1);
      }
    },
    //保存
    save() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        //保存表单
        this.saveForm();
      }
    }
  }
};
</script>
<style scoped>
  .title{
    width: 600px;
    height: 40px;
    margin-left:30px;
  }
  .line{
    float: left;
    width: 4px;
    height: 22px;
    background: #0075FF;
    
  }
  .text{
    margin-left: 10px;
    float: left;
    font-weight: bolder;

  }
</style>