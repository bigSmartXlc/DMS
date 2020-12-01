<!--
* description: 可配置页面网格列管理
* author: linzewen
* createdDate: 2019-09-11
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicUnFormFields="unFormField"
      :dynamicIsShowSelect="false"
      :dynamicIsColumnDrop="true"
    />

    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins';
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";

export default {
  name: "orgconfigurablePageTableManagement",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./editTable")
  },
  watch:{
    $route(val){
      if(this.formField.pageId !== "" && this.$route.query.pageId !== undefined && this.$route.query.pageId !== this.formField.pageId){
        this.formField.pageId = this.$route.query.pageId;
        this.formField.pageName = this.$route.query.pageName;
        this.queryTable();
      }
    }
  },
   created() {
      if (this.$route.query != null) {
      // 判断传入query参数，初始化数据
      if (this.$route.query.pageId != null && this.$route.query.pageId !== "") {
        this.formField.pageId = this.$route.query.pageId;
        this.formField.pageName = this.$route.query.pageName;
      }
    }
  },
  mounted() {
    this.queryTable();
  },
  data() {
    const leftPageCode = 'veVehicleServiceAgencyMain-Left'
    const rightPageCode = 'veVehicleServiceAgencyMain-Right'
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.proConfigColumnQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(),
          name:'search',
          position:'right',
          text: this.$t('sys.button.query')//"查询"
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
          name:'add',
          position:'left',
          text: this.$t('sys.button.add')//"新增"
        },
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          name:'reset',
          position:'right',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset')//"重置"
        }
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t('org.label.pageName'),//页面名称
          codeField: "pageName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          isRequire: true,
          disabled: true
        },
        {
          compKey: "compKey2",
          labelName: this.$t('org.label.lang'),//语言类型
          codeField: "lang",
          lookuptype: "PRO0004",
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isRequire: true,
          isMust: true, 
          isMul: false
        },
        {
          compKey: "compKey3",
          labelName: this.$t('org.label.isEnable'),//"是否可用",
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        }
      ],
      // 动态生成网格列
      tableCols: [
        {
        prop: "controlBtn",
          label: this.$t('org.label.operation'),//"操作"
          codeField: "controlBtn",
          width: 60,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              labelName: this.$t('sys.button.edit'),
              codeField: "editControlBtn",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton")
            }
          ]
        },
        //页面ID
        {prop: "pageId",label: this.$t('org.label.pageId'),align: "center",hidden: true},
        //标签名称
        {prop: "label",label: this.$t('org.label.labelName'),align: "center",hidden: true},
        //对应数据字段
        {prop: "prop",label: this.$t('org.label.prop'),align: "center",width: 250},
        //页面名称
        {prop: "proConfigPageviewExtend.pageName",label: this.$t('org.label.pageName'),width: 150,align: "center"},
        //网格列排序
        {prop: "sort",label: this.$t('org.label.sort'),width: 100,align: "center"},
        //是否组件
        {prop: "isComponent",label: this.$t('org.label.isComponent'),width: null,isFlag:true,align: "center"},
        //标签名称
        { prop: "proConfigLangExtend.langLabel", label: this.$t('org.label.labelName'), width: 130, align: "center" },
        //标签名称（多语言）
        {prop: "proConfigLangExtend.langType",label: this.$t('org.label.langType'),width: 150,align: "center"},
        //是否隐藏
        {prop: "hidden",label: this.$t('org.label.hidden'),width: null,isFlag:true,align: "center"},
        //列宽
        {prop: "width",label: this.$t('org.label.width'),width: null,align: "center"},
        //对齐方式
        {prop: "align",label: this.$t('org.label.align'),width: null,pvalign: "center"},
        //列ID
        {prop: "colsId",label: this.$t('org.label.colsId'),width: 270,align: "center"},
        //是否可行排序
        {prop: "sortable",label: this.$t('org.label.sortable'),isFlag:true,hidden: true,align: "center"},
        //是否可用
        {prop: "isEnable",label: this.$t('org.label.isEnable'),width: null,isFlag:true,align: "center"},
        //是否系统列
        {prop: "isSys",label: this.$t('org.label.isSys'),width: 100,isFlag:true,align: "center"},
        //布尔值转是否
        {prop: "isFlag",label: this.$t('org.label.booleanValueTurnsWhether'),width: 100,isFlag:true,align: "center"},
        //是否插槽
        {prop: "isSlot",label: this.$t('org.label.whetherTheSlot')/*"是否插槽"*/,width: 100,isFlag:true,align: "center"},
        {prop: "userId",label: "用户Id",hidden: true,align: "center"},
        {prop: "updateControlId",label: "并发控制Id",hidden: true,align: "center"}
      ],
      //表单查询数据
      formField: {
        pageName: this.$route.query.pageName,
        pageId: this.$route.query.pageId,
        lang: "ZH",
        isEnable:"",
        // userId:this.$store.getters.orgInfo.userId,
      },
      unFormField:{
        pageName:""
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false
    };
  },
  methods: {
    tranPage() {
      this.$emit("tranPageTwo", 1);
    }
  }
};
</script>
