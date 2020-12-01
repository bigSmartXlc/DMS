<!--
* description: 管理配置
* author: mwh
* createdDate: 2020-11-02
-->
<template>
 <section>
    <el-dialog
      v-dialogDrag
      title="管理配置"
      :visible.sync="dialogType"
      width="900px"
      lock-scroll
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <dialogHeader
        slot="title"
        title="管理配置"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
        <div class="app-container app-container-table">
            <one-table-template
            ref="multipleTable"
            :key="oneTableKey"
            :dynamicButtons="tableButtons"
            :dynamicComponents="tableComponents"
            :dynamicApiConfig="apiConfig"
            :dynamicTableCols="tableCols"
            :dynamicFormFields="formField"
            :dynamicIsInitTable="true"
            :dynamicIsColumnDrop="false"
            :dynamicIsShowSelect="true"
            :dynamicIsFixIndex="false"
            :dynamicTableOtherHeight="80"
            :callbackObj="callbackObj"
            />
        </div>
        <div class="menuButton">
            <el-button type="primary" plain @click="save">确认</el-button>
            <!-- <el-button plain @click="sendCo">取消</el-button> -->
        </div>
       </el-dialog>
    </section> 
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";

export default {
  name: "definitionManageEdit",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    dialogHeader: () => import("@/components/dialogHeader"), //弹窗标题
  },
  props: {
    // 弹窗显示
    handleVisible: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
  },
  data() {
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.proConfigPageviewQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(),
          text: this.$t("sys.button.query"),
          name: "search",
          position: "right"
        }, // 查询
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset"),
          name: "reset",
          position: "right"
        }, // 重置
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
          span:8,
          isMul: false
        },
        {
          compKey: "compKey2",
          labelName: this.$t('org.label.pageName'),//页面名称
          codeField: "pageName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          span:8,
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: this.$t('org.label.pageCode'),//页面编码
          codeField: "pageCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          span:8,
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: this.$t('org.label.situation'),//状态
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          span:8,
          isMust: false
        },
        {
          compKey: "compKey5",
          labelName: this.$t('org.label.pageType'),//页面类型
          codeField: "pageType",
          lookuptype: "PRO0001",
          span:8,
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMust: false,
          isMul: false
        }
      ],
      // 动态生成网格列
      tableCols: [
        {
          prop: "moduleCode",
          label: this.$t("org.label.moduleCode"),/*所属模块编码*/
          align: "center",
          width: 80,
          hidden: true
        },
        { prop: "pageName", label: this.$t('org.label.pageName'),/*页面名称*/ width: 180, align: "center" },
        { prop: "pageId", label: "页面Id",/*页面Id*/ width: null, align: "center" ,hidden: true},
        { prop: "pageCode", label: this.$t('org.label.pageCode'),/*页面标识*/ width: 260 , align: "center" },
        { prop: "pageType", label: this.$t('org.label.pageType'),/*页面类型*/ width: null, align: "center" },
        { prop: "pageArea", label: this.$t('org.label.subordinateFunction'),/*所属功能*/ width: 140, align: "center" },
      ],
      // 表单查询数据
      formField: {
        moduleCode: "",
        pageName: "",
        isEnable: "",
        pageType: "",
        pageCode: ""
      },
      saveField:{
          pageId:"",
          pageName:""
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      // 弹窗显示
      dialogType: this.handleVisible,
      callbackObj:{
          onCheckSelectChange:(selection)=>{
            let that=this
            that.saveField={
                pageId:"",
                pageName:""
            };
            if(selection.length>0){
                  selection.map(x=>{
                      that.saveField.pageId=that.saveField.pageId==""?x.pageId:that.saveField.pageId+","+x.pageId;
                      that.saveField.pageName=that.saveField.pageName==""?x.pageName:that.saveField.pageName+","+x.pageName;
                  })
              }
          }
      }
    };
  },
  methods:{
      save(){
            this.$emit("manageConfirm",this.saveField)
      },
  }

};
</script>
<style scoped lang="scss">
/deep/ .menuButton {
  float: right;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>