<!--
* description: 可配置页面按钮管理-新增、修改弹窗
* author: linwm
* createdDate: 2020-01-08
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
        this.formField.langLabelName = this.formField.text
        this.backFormField = JSON.parse(JSON.stringify(this.formField))
      } 
    }
  },
  data() {
    return {
      // 保存API配置对象
      apiConfig: orgApis.proConfigButtonMutationSave,
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
          textField: "text",
          component: () =>
            import("@/views/org/configurablePageManagement/lang/propus"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: this.$t('org.label.clickEvent'),//"点击事件"
          isRequire: true,
          codeField: "clickEvent",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: this.$t('org.label.sort'),//"排序"
          isRequire: true,
          codeField: "sort",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey5",
          labelName: this.$t('org.label.isEnable'),//"是否可用",
          isRequire: true,
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey6",
          labelName: this.$t('org.label.pageArea'),//"页面区域"
          codeField: "pageArea",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey9",
          labelName: this.$t('org.label.buttonType'),//"按钮类型"
          codeField: "type",
          component: () => import("@/views/org/configurablePageManagement/comp/buttonType.vue"),
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey8",
          labelName: this.$t('org.label.buttonSize'),//"按钮尺寸"
          codeField: "size",
          component: () => import("@/views/org/configurablePageManagement/comp/buttonSize.vue"),
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey10",
          labelName: this.$t('org.label.buttonPosition'),//"按钮位置"
          codeField: "position",
          component: () => import("@/views/org/configurablePageManagement/comp/buttonPosition.vue"),
          lookuptype: "PRO0005",
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey14",
          labelName: this.$t('org.label.buttonStyle'),//"按钮样式"
          codeField: "name",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey7",
          labelName: this.$t('org.label.parentFields'),//"联动设置"
          codeField: "parentFields",
          component: () => import("@/views/org/configurablePageManagement/linkageButton"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey11",
          labelName: this.$t('org.label.isDisable'),//"是否禁用",
          codeField: "disabled",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey12",
          labelName: this.$t('org.label.isShow'),//"是否显示",
          codeField: "isShow",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey13",
          labelName: this.$t('org.label.fuzzySearch'),//"模糊搜索",
          codeField: "fuzzySearch",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        }
      ],
      // 标题
      textMap: {
        edit: this.$t('org.label.configurableButtonManagement'),
        add: this.$t('org.label.configurableButtonManagement')
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        buttonId:"",
        pageName: this.$parent.$route.query.pageName,
        pageId: this.$parent.$route.query.pageId,
        text: "",
        langLabelName:"",
        clickEvent: "",
        sort: "",
        pageArea: "",
        size: "small",
        type: "default",
        position: "",
        buttonKey: "",
        disabled:"",
        name:"",
        isShow:"",
        fuzzySearch:"",
        parentFields:"",
        isEnable:"",
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
      if(saveObj.buttonKey === ""){
        saveObj.buttonKey = "btnKey" + this.$utils.generateId()
      }
      if(saveObj.size === ""){
        saveObj.size = "small"
      }
      if(saveObj.size === ""){
        saveObj.type = "default"
      }
      if(saveObj.name === ""){
        saveObj.name = ' '
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
