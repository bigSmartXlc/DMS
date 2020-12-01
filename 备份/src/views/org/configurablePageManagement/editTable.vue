<!--
* description: 可配置页面网格列管理-新增、修改弹窗
* author: linzewen
* createdDate: 2019-09-11
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      width="1000px"
    >
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>

      <div class="filter-container filter-params">
        <el-row :gutter="26">
          <component
            v-for="comp in tableComponents.filter(o => o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :validrule="comp.validrule"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :span="comp.span || 8"
            :isMul="comp.isMul"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :dateOptionsType="comp.dateOptionsType"
          ></component>
        </el-row>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
import storage from '@/utils/storage'
export default {
  // 组件混入对象
  mixins: [formMixins],
     components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  watch: {
    popupsVisible(val) {
      if(val){
        if (this.formField.pageId !== "" &&this.$route.query.pageId !== undefined &&this.$route.query.pageId !== this.formField.pageId) {
          this.formField.pageId = this.$route.query.pageId;
          this.formField.pageName = this.$route.query.pageName;
        }
        this.formField.langLabelName = this.formField.label 
        this.backFormField = JSON.parse(JSON.stringify(this.formField))
      } 
    }
  },
  data() {
    return {
      // 保存API配置对象
      apiConfig: orgApis.proConfigColumnMutationSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.save(),
          text: this.$t('sys.button.save') //"保存"
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset') //"重置"
        }
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t('org.label.pageName'),//"所属页面"
          isRequire: true,
          codeField: "pageName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          disabled: true
        },
        {
          compKey: "compKey2",
          labelName: this.$t('org.label.labelName'),//"标签名称"
          isRequire: true,
          codeField: "langLabelName",
          textField: "label",
          component: () =>
            import("@/views/org/configurablePageManagement/lang/propus"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: this.$t('org.label.prop'),//"对应数据字段"
          isRequire: true,
          codeField: "prop",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: this.$t('org.label.width'),//"列宽"
          codeField: "width",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey5",
          labelName: this.$t('org.label.sort'),//"排序"
          isRequire: true,
          codeField: "sort",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey6",
          labelName: this.$t('org.label.hidden'),//"是否隐藏"
          codeField: "hidden",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey7",
          labelName: this.$t('org.label.align'),//"对齐方式"
          codeField: "align",
          component: () => import("@/components/org/LookupValue"),
          lookuptype: "PRO0005",
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey8",
          labelName: this.$t('org.label.isEnable'),//"是否可用",
          isRequire: true,
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey9",
          labelName: this.$t('org.label.sortable'),//"是否可排序",
          codeField: "sortable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey10",
          labelName: this.$t('org.label.isComponent'),//"是否组件"
          codeField: "isComponent",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey11",
          labelName: this.$t("org.label.booleanValueTurnsWhether")/*布尔值转是否*/,//"布尔值转是否"
          codeField: "isFlag",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey12",
          labelName: this.$t("org.label.whetherTheSlot")/*是否插槽*/,//"是否插槽"
          codeField: "isSlot",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        }
      ],
      // 标题
      textMap: {
        edit: this.$t('org.label.configurableTableManagement'),
        add: this.$t('org.label.configurableTableManagement')
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        colsId:"",
        pageName: this.$parent.$route.query.pageName,
        pageId: this.$parent.$route.query.pageId,
        label: "",
        langLabelName:"",
        prop: "",
        hidden:"",
        width: "",
        sort: "",
        align: "",
        isEnable: "",
        sortable: "",
        isComponent: "",
        isFlag:"",
        isSlot:"",
        updateControlId:""
      }
    };
  },
  methods: {
    //保存
    save() {
      this.$utils.validataMoth(this, 'validpopup')
      if (this.valid) {
        if (isNaN(this.formField.sort)) {
          this.$message({
            message: this.$t('org.label.pleaseEnterNumbersForSorting')/*排序请输入数字！*/,
            type: "warning",
            duration: 2000
          });
          return;
        }
      var saveObj = JSON.parse(JSON.stringify(this.formField));
      saveObj.pageName = undefined;
      if(saveObj.width === ''){
        saveObj.width = '0'
      }
      if(!(saveObj.langLabelName.indexOf('langType') > -1)){
        saveObj.langLabelName = undefined
      }
      //保存表单
      this.saveForm(saveObj);
      storage.remove(this.$route.query.pageCode)
      }
    }
  }
};
</script>
