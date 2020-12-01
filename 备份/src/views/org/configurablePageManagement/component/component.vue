<!--
* description: 组件路径弹窗
* author: linwm
* createdDate: 2019-11-23
-->
<template>
  <section class="orgDlr">
    <el-dialog v-dialogDrag
      id="orgDlr"
      :close-on-click-modal="false"
      :title='$t("org.label.componentEditor")'
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      width="1000px"
  >
      <dialogHeader
        slot="title"
        :title='$t("org.label.componentEditor")'
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
     <one-table-template
        ref="multipleTable"
        :dynamicButtons="tableButtons"
        :dynamicComponents="tableComponents"
        :dynamicApiConfig="apiConfig"
        :dynamicTableCols="tableCols"
        :dynamicFormFields="formField"
        :dynamicIsShowSelect="false"
        :dynamicTableOtherHeight="100"
        :dynamicIsInitTable="true"
        :callbackObj="callbackObj"
        :key="popupsTableKey"
      />
    </el-dialog>
    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      :isSetDefaultBrand="false"
      @close="close"
    />
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/popupsOneTable";
import { orgApis } from "@/api/apiList/org";
export default {
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    edit: () => import("./edit"),  dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props:{
    needConfirm:{type:Boolean,default:true}
  },
  created(){
    if (!this.needConfirm) {
      this.tableButtons.splice(2,1)
    }
  },
  data() {
    return {
      isPopups: true,
      apiConfig: orgApis.proComponentTypeQueryByPage,
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(),//查询
          name:'search',
          position:'right',
          text: this.$t("sys.button.query")
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
          text: this.$t("sys.button.add"),
          name:'add',
          position:'right'
        } /*新增*/,
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          clickEvent: () => this.sendCode1(),
          text: this.$t("sys.button.confirm"),
          name:'confirm',
          position:'left'
        } /*确认*/,
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          clickEvent: () => this.sendCode(),
          text: this.$t("sys.button.cancel"),
          name:'cancel',
          position:'right'
        } /*取消*/
      ],
      // 动态组件-查询条件
      tableComponents: [],
      // 静态组件-查询条件
      staticTableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t('org.label.BelongtoCode'),//"所属模块"
          codeField: "moduleCode",
          lookuptype:"DB0001",
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        //组件类型
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.controlType"),
          codeField: "controlType",
          component: () => import("@/components/org/LookupValue"),
          lookuptype: "PRO0002",
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.componentName"),//组件名称
          codeField: "labelName",
          component: () => import("@/components/org/commonInput"),
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.isAble"),//是否启用
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true,
          isMul: false
        }
      ],
      // 动态生成网格列
      tableCols: [],
      // 静态生成网格列
      staticTableCols: [
         // 操作
        { prop: 'controlBtn', label: this.$t('sys.content.operate'), codeField: 'controlBtn', width: 60, align: 'center', fixed: true , isComponent: true,
          //  编辑
          comps: [
            {compKey: 'propKey0', labelName: this.$t('sys.button.edit'), codeField: 'editControlBtn', clickEvent: this.edit, component: () => import('@/components/org/linkButton')},
          ]
        },
        {
          prop: "moduleName",
          label: this.$t('org.label.subordinateToTheModule'),//所属模块
          width: 120,
          align: "center"
        },
        {
          prop: "labelName",
          label: this.$t('org.label.componentName'),//组件名称
          width: 150,
          align: "center"
        },
        {
          prop: "controlTypeCn",
          label: this.$t('org.label.controlType'),//组件类型
          width: 120,
          align: "center"
        },
        //所属模块编码
        {prop: "moduleCode",label: this.$t('org.label.moduleCode'),hidden: true,align: "center"},
        //组件路径
        {prop: "component",label: this.$t('org.label.component'),width: null,align: "center"},
        //组件类型
        {prop: "controlType",label: this.$t('org.label.controlType'),hidden: true,align: "center"},
        //是否显示标签
        {prop: "isShowLabel",label: this.$t('org.label.isShowLabel'),hidden: true,align: "center"},
        //是否多选
        {prop: "isMul",label: this.$t('org.label.isMul'),hidden:true,align: "center"},
        //主键id
        {prop: "compId",label: "compId",hidden:true,align: "center"},
        //是否可清除
        {prop: "clearable",label: this.$t('org.label.clearable'),hidden:true,align: "center"},
        //是否启用
        {prop: "isEnable",label: this.$t('org.label.isEnable'),hidden:true,align: "center"},
        //是否可过滤
        {prop: "filterable",label: this.$t('org.label.filterable'),hidden:true,align: "center"},
        //日期类型
        {prop: "dateType",label: this.$t('org.label.dateType'),hidden:true,align: "center"},
        //日期选项类型
        {prop: "dateOptionsType",label: this.$t('org.label.dateOptionsType'),hidden:true,align: "center"},
        //日期格式
        {prop: "format",label: this.$t('org.label.format'),hidden:true,align: "center"},
        //并发字段
        {prop: "updateControlId",label: this.$t('org.label.updateControlId'),hidden:true,align: "center"},
      ],
      placeholder: this.$t("sys.tips.esTip0"),
      formField:{                 
        moduleCode: "",
        controlType: "",
        labelName:"",
        isEnable:"1"
      },
      component: "",              
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      callbackObj:{
        onRowDbClick:() => this.sendCode1()
      }
    };
  },
  methods: {
    sendCode1(){
      const that = this.$refs[this.tableRef]
      if (that.currentRow === null) {
        this.$message({
          message: "请选中一行！",
          type: "warning",
          duration: 2000
        })
        return
      }
      this.$emit('changeCompCode',that.currentRow)
    }
  }
};
</script>
