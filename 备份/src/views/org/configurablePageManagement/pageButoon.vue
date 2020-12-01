<!--
* description: 可配置页面按钮管理
* author: linwm
* createdDate: 2020-01-08
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
    Edit: () => import("./editButton")
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
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.proConfigButtonQueryByPage,
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
          labelName: this.$t('org.label.pageArea'),//页面区域
          codeField: "pageArea",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true        
          },
        {
          compKey: "compKey3",
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
          compKey: "compKey4",
          labelName: this.$t('org.label.isEnable'),//"是否可用",
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
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
        {prop: "text",label: this.$t('org.label.labelName'),align: "center",hidden: true},
        //页面名称
        {prop: "proConfigPageviewExtend.pageName",label: this.$t('org.label.pageName'),width: 150,align: "center"},
        //标签名称
        { prop: "proConfigLangExtend.langLabel", label: this.$t('org.label.labelName'), width: 130, align: "center" },
        //标签名称（多语言）
        {prop: "proConfigLangExtend.langType",label: this.$t('org.label.langType'),width: 150,align: "center"},
        //点击事件
        {prop: "clickEvent",label: '点击事件',align: "center",width: 120},
        //按钮排序
        {prop: "sort",label: this.$t('org.label.sort'),width: 70,align: "center"},
        //页面区域
        {prop: "pageArea",label: this.$t('org.label.pageArea'),width: 200,align: "center"},
        //按钮类型
        {prop: "size",label: this.$t("org.label.buttonSize"),/*按钮尺寸*/width: null,align: "center"},
        //按钮类型
        {prop: "type",label: this.$t("org.label.buttonType"),/*按钮类型*/width: null,align: "center"},
        //按钮位置
        {prop: "position",label: this.$t("org.label.buttonPosition"),/*按钮位置*/width: null,align: "center"},
        //按钮样式
        {prop: "name",label: this.$t("org.label.buttonStyle"),/*按钮样式*/width: null,align: "center"},
        //按钮key
        {prop: "buttonKey",label: this.$t('org.label.buttonKey'),hidden: true,align: "center"},
        //是否禁用
        {prop: "disabled",label: this.$t("org.label.isDisable"),/*是否禁用*/width: null,isFlag:true,align: "center"},
        //是否显示
        {prop: "isShow",label: this.$t('org.label.isShow'),width: null,isFlag:true,align: "center"},
        //是否模糊搜索
        {prop: "fuzzySearch",label:this.$t("org.label.fuzzySearch"),/*是否模糊搜索*/isFlag:true,hidden: true,align: "center"},
        //联动设置
        {prop: "parentFields",label: this.$t('org.label.parentFields'),width: 150,align: "center"},
        //按钮ID
        {prop: "buttonId",label: this.$t('org.label.colsId'),hidden: true,align: "center"},
        //是否可用
        {prop: "isEnable",label: this.$t('org.label.isEnable'),width: null,isFlag:true,align: "center"},
        {prop: "updateControlId",label: "并发控制Id",hidden: true,align: "center"}
      ],
      //表单查询数据
      formField: {
        pageName: this.$route.query.pageName,
        pageId: this.$route.query.pageId,
        lang: "ZH",
        isEnable:""
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
