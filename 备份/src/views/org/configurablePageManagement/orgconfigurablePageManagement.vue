<!--
* description: 可配置化页面管理
* author: linzewen
* createdDate: 2019-09-11
-->
<template>
  <div class="app-container app-container-table">
    <div >
      <one-table-template
        ref="multipleTable"
        :dynamicButtons="tableButtons"
        :dynamicComponents="tableComponents"
        :dynamicApiConfig="apiConfig"
        :dynamicTableCols="tableCols"
        :dynamicFormFields="formField"
        :dynamicIsShowSelect="false"
        :dynamicIsShowMoreBtn="true"
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
    <compMaintain
      :popupsVisible="compMaintainVisible"
      :key="compMaintainKey"
      @changeCode="closeCompMaintain"
      :needConfirm="false"
    ></compMaintain>
    <password
      :popupsVisible="passwordVisible"
      :key="passwordKey"
      @cancel="closePassword"
      @confirm="confirm"
    ></password>
    <codeGenerate
      :popupsVisible="codeGenerateVisible"
      @close="closeCodeGenerate"
    ></codeGenerate>
  </div>
</template>

<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins';
import { orgApis } from "@/api/apiList/org";
import {
  getSecondaryVerification,
  setSecondaryVerification
} from '@/utils/auth'
import { tagsViewMixin } from '@/layout/components/TagsView/tagsViewMixin'

export default {
  name: "orgconfigurablePageManagement",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins,tagsViewMixin],
  components: {
    OneTableTemplate: () => import("@/components/templates/oneTable"),
    Edit: () => import("./edit"),
    compMaintain: () => import("./component/component"),
    password: () => import("./password"),
    codeGenerate: () => import("./codeGenerate/codeGenerate")
  },
  created(){
    const secondaryVerification = getSecondaryVerification()
    if(!secondaryVerification){
      this.passwordVisible = true
      this.passwordKey += 1
    }
  },
  data() {
    return {
      showPageOne: false,
      showPageTwo: false,
      passwordVisible:false,
      codeGenerateVisible:false,
      passwordKey:'passwordKey',
      // 网格查询API配置对象
      apiConfig: orgApis.proConfigPageviewQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          name:'search',
          position:'right',
          clickEvent: () => this.queryTable(1),
          text: this.$t('org.label.query')//查询
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          name:'add',
          position:'left',
          clickEvent: () => this.add(),
          text: this.$t('sys.button.add')//新增
        },
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          name:'reset',
          position:'right',
          clickEvent: () => this.reset(),
          text: this.$t('org.label.Reset')//重置
        },
        {
          compKey: "btnKey5",
          type: "",
          size: "small",
          position:'left',
          clickEvent: () => this.openPageComp(),
          text: this.$t('org.label.pageComponentManagement')//页面组件管理
        },
        {
          compKey: "btnKey6",
          type: "",
          size: "small",
          position:'left',
          clickEvent: () => this.openPageCols(),
          text: this.$t('org.label.pageGridColumnManagement')//页面网格列管理
        },
        {
          compKey: "btnKey6",
          type: "",
          size: "small",
          position:'left',
          clickEvent: () => this.openPageBtns(),
          text: this.$t('org.label.pageButtonManagement')//页面按钮管理
        },
        {
          compKey: "btnKey7",
          type: "",
          size: "small",
          clickEvent: () => this.openCompMaintain(),
          text: this.$t('org.label.componentMaintenance'),//组件维护
          position:'left'
        },
        {
          compKey: "btnKey8",
          type: "",
          size: "small",
          clickEvent: () => this.codeGenerate(),
          text: '快捷代码生成',//快捷代码生成
          position:'left'
        }
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t('org.label.subordinateToTheModule'),//所属模块
          codeField: "moduleCode",
          lookuptype: "DB0001",
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey2",
          labelName: this.$t('org.label.pageName'),//页面名称
          codeField: "pageName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: this.$t('org.label.pageCode'),//页面编码
          codeField: "pageCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: this.$t('org.label.situation'),//状态
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: false
        },
        {
          compKey: "compKey5",
          labelName: this.$t('org.label.pageType'),//页面类型
          codeField: "pageType",
          lookuptype: "PRO0001",
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMust: true,
          isMul: false
        }
      ],
      // 动态生成网格列
      tableCols: [
        {
          prop: "controlBtn",
          label: "操作",
          codeField: "controlBtn",
          width: 80,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              labelName: this.$t('org.label.modify'),//修改
              codeField: "editControlBtn",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton")
            }
          ]
        },
        // {
        //   prop: "moduleName",
        //   label: "所属模块名称",
        //   width: 130,
        //   align: "center"
        // },
        {
          prop: "moduleCode",
          label: this.$t("org.label.moduleCode"),/*所属模块编码*/
          align: "center",
          width: 120
          // hidden: true
        },
        { prop: "pageName", label: this.$t('org.label.pageName'),/*页面名称*/ width: 230, align: "center" },
        { prop: "pageId", label: "页面Id",/*页面Id*/ width: null, align: "center" ,hidden: true},
        { prop: "pageCode", label: this.$t('org.label.pageCode'),/*页面标识*/ width: 300 , align: "center" },
        { prop: "pageType", label: this.$t('org.label.pageType'),/*页面类型*/ width: null, align: "center" },
        { prop: "pageArea", label: this.$t('org.label.subordinateFunction'),/*所属功能*/ width: 150, align: "center" },
        { prop: "parentPageName", label: this.$t('org.label.parentPageName'),/*上级页面名称*/ width: 150, align: "center" },
        { prop: "isEnable", label: this.$t('org.label.isAble'),/*是否启用*/ width: null, align: "center" },
        { prop: "busiCenter", label: this.$t('org.label.chinaCenter'),/*中台中心*/ width: 150, align: "center" },
        { prop: "serviceCode", label: this.$t('org.label.middleStationServiceCode'),/*中台服务编码*/ width: 150, align: "center" },
        { prop: "createdName", label: this.$t('org.label.creator'),/*创建人*/ width: null, align: "center" },
        { prop: "createdDate", label: this.$t('org.label.createdDate'),/*创建时间*/ width: 150, align: "center" },
        {
          prop: "modifyName",
          label: this.$t('org.label.lastModifier'),/*最后修改人*/
          width: null,
          align: "center"
        },
        {
          prop: "lastUpdatedDate",
          label: this.$t('org.label.lastModifiedTime'),/*最后修改时间*/
          width: 150,
          align: "center"
        },
        {
          prop: "updateControlId",
          label: "并发ID",
          width: null,
          align: "center",
          hidden: true
        }
      ],
      //表单查询数据
      formField: {
        moduleCode: "",
        pageName: "",
        isEnable: "",
        pageType: "",
        pageCode: ""
      },
      compMaintainVisible: false,
      compMaintainKey:"compMaintainKey",
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false
    };
  },
  methods: {
    openPageComp() {
      var currentRow = this.$refs.multipleTable.currentRow;
      if(null === currentRow || undefined === currentRow){
        this.$message({
          message: this.$t('org.label.pleaseSelectOneRowOfData')/*请选中一行数据！*/,
          type: "warning",
          duration: 2000
        });
        return
      }
      //orgconfigurablePageComponentsManage
      this.$router.push({
      name: `orgconfigurablePageComponentsManage`,
      query:{pageName: currentRow.pageName,pageId:currentRow.pageId,pageCode:currentRow.pageCode,busiCenter:currentRow.busiCenter,serviceCode:currentRow.serviceCode},
      })
    },
    openPageCols() {
      var currentRow = this.$refs.multipleTable.currentRow;
      if(null === currentRow || undefined === currentRow){
        this.$message({
          message: this.$t('org.label.pleaseSelectOneRowOfData')/*请选中一行数据！*/,
          type: "warning",
          duration: 2000
        });
        return
      }
      this.$router.push({ name: `orgconfigurablePageTableManagement`,query:{pageName: currentRow.pageName,pageId:currentRow.pageId,pageCode:currentRow.pageCode,}})
    },
    openPageBtns() {
      var currentRow = this.$refs.multipleTable.currentRow;
      if(null === currentRow || undefined === currentRow){
        this.$message({
          message: this.$t('org.label.pleaseSelectOneRowOfData')/*请选中一行数据！*/,
          type: "warning",
          duration: 2000
        });
        return
      }
      this.$router.push({ name: `orgconfigurablePageButtonManagement`,query:{pageName: currentRow.pageName,pageId:currentRow.pageId,pageCode:currentRow.pageCode,}})
    },
    openCompMaintain(){
      this.compMaintainVisible = true
      this.compMaintainKey = this.compMaintainKey + 1
    },
    closeCompMaintain(){
      this.compMaintainVisible = false
      this.compMaintainKey = this.compMaintainKey + 1
    },
    closePassword(){
      console.log('----')
      //关闭当前页面并返回上一层页面
      this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
      this.$router.push(this.$store.state.tagsView.visitedViews[this.$store.state.tagsView.visitedViews.length-1].path)
    },
    confirm(){
      setSecondaryVerification(true)
      this.passwordVisible = false
      this.passwordKey += 1
    },
    closeCodeGenerate(){
      this.codeGenerateVisible = false
    },
    codeGenerate(){
      this.codeGenerateVisible = true
    }
  }
};
</script>
