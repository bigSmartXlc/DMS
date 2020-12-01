<!--
* description: 可配置页面组件管理-新增、修改弹窗
* author: linzewen
* createdDate: 2019-09-11
-->
<template>
  <section class="editComponents">
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
        <el-row :gutter="26" :key="componentKey">
          <div class="filter-container filter-title">{{this.$t("org.label.publicAttribute")/*公共属性*/}}</div>
          <component
            v-for="comp in tableComponents"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :isShow="comp.isShow"
            :disabled="comp.disabled"
            :code="formField[comp.codeField]"
            :text="formField[comp.textField]"
            @changeCode="getComponentCode"
            :oFields="comp.oFields"
            :parentFileds="comp.parentFileds"
            :options="comp.options"
            @focusCode="getFocusCode"
            :isRequire="comp.isRequire"
            :span="comp.span || 8"
            :isAsync="comp.isAsync"
            :filterable="comp.filterable"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :isMul="comp.isMul"
            @changeCompCode="getCompCode"
            @changeParentFields="getParentFields"
          ></component>
        </el-row>
      </div>
      <div class="filter-container filter-params">
        <el-row :gutter="26" :key="otherKey">
          <div class="filter-container filter-title">{{this.$t("org.label.otherAttributes")/*其他属性*/}}</div>
          <component
            :is="comp.component"
            v-for="comp in tableComponentsOther"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :popupsKey="comp.compKey"
            :code="otherFormField[comp.codeField]"
            @clickEvent="comp.clickEvent"
            @changeCode="getComponentCodeOther"
            :disabled="comp.disabled"
            :isFunc="comp.isFunc"
            :isRequire="comp.isRequire"
            :span="comp.span || 8"
            :filterable="comp.filterable"
            :labelName="comp.labelName"
          />
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
    </el-dialog>
    <otherField
      :popupsVisible="otherFieldVisible"
      :key="otherFieldKey"
      @changeCode="addOtherField"
      @close="close"
    />
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
    otherField: () => import("./dataToObject/otherFieldPoups"), dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props:{
    // 对应数据字段的下拉数据
    options:{type: Array, default: function() { return [] } },
    // 对应数据字段的下拉数据（网格列）
    colsOptionDatas:{type: Array, default: function() { return [] } }
  },
  watch: {
    popupsVisible(val) {
      if (val) {
        this.apiIsNull = this.$route.query.busiCenter === null || this.$route.query.busiCenter === "" ||this.$route.query.serviceCode === null ||this.$route.query.serviceCode === ""
        if (this.formField.pageId !== "" &&this.$route.query.pageId !== undefined &&this.$route.query.pageId !== this.formField.pageId) {
        this.formField.pageId = this.$route.query.pageId;
        this.formField.pageName = this.$route.query.pageName;
      }

        this.formField.langLabelName = this.formField.labelName
        this.backFormField = JSON.parse(JSON.stringify(this.formField))
        // 其他字段处理
        this.dataToObject()
        // 对应数据字段控制是下拉框还是输入框
        this.codeFields()
        // 条件字段
        this.getParentFields(this.formField)
        this.codeFieldForSave = this.formField.codeField
        this.tableComponents[6].options = this.options
        this.tableComponents[8].options = this.colsOptionDatas
        this.tableComponents[9].options = this.options
        this.tableComponents[11].options = this.colsOptionDatas
        this.tableComponents[12].options = this.options
        this.tableComponents[14].options = this.colsOptionDatas
        this.tableComponents[25].options = this.colsOptionDatas
        if (this.apiIsNull) {
          this.changeCodeField([7])
        }else{
          this.changeCodeField([6])
        }
      }
    },
    "formField.compType"(newVal,oldVal){
      if (newVal === 'TABLE') {
        if(this.formField.controlType === 'TWODATEPICKER'){
          // 换成cols
          this.changeCodeField([11,14])
        }else{
          // 换成单cols下拉框
          this.changeCodeField([8])
        }
      }else if (oldVal === 'TABLE') {
         if(this.apiIsNull) {
          if(this.formField.controlType === 'TWODATEPICKER'){
            // 换成双输入框
            this.changeCodeField([10,13])
          }else{
            // 换成单输入框
            this.changeCodeField([7])
          }
        }else{
           // 换成双codeFIelds下拉框
          if(this.formField.controlType === 'TWODATEPICKER'){
            this.changeCodeField([9,12])
          }else{
            // 换成单codeFIelds下拉框
            this.changeCodeField([6])
          }
        }
      }else if (this.apiIsNull) {
        this.changeCodeField([7])
      }
    },
    "formField.controlType"(newVal,oldVal){
      if(newVal === 'TWODATEPICKER'){
        if (this.formField.compType === 'TABLE') {
          // 换成双cols下拉框
          this.changeCodeField([11,14])
        }else {
          if (this.apiIsNull) {
            // 换成双输入框
            this.changeCodeField([10,13])
          }else{
            // 换成双codeField下拉框
            this.changeCodeField([9,12])
          }
        }
      }else if (oldVal === 'TWODATEPICKER') {
        if (this.formField.compType === 'TABLE') {
          // 换成单cols下拉框
          this.changeCodeField([8])
        }else {
          if (this.apiIsNull) {
            // 换成单输入框
            this.changeCodeField([7])
          }else{
            // 换成单codeField下拉框
            this.changeCodeField([6])
          }
        }
      }else if (this.formField.compType === 'TABLE') {
        // 换成单cols下拉框
        this.changeCodeField([8])
      }else if (this.apiIsNull && this.formField.compType !== 'TABLE'){
        this.changeCodeField([7])
      }
    },
    "formField.codeField"(val){
      // this.formField.codeField = this.codeFieldForSave
      if(this.formField.controlType === 'TWODATEPICKER'){
        this.formField.beginDate = this.formField.codeField.split(",")[0]
        this.formField.endDate = this.formField.codeField.split(",")[1]
        this.backFormField = JSON.parse(JSON.stringify(this.formField))
      }
    }
  },
  data() {
    return {
      apiIsNull:false,
      // 保存API配置对象
      apiConfig: orgApis.proConfigComponentMutationSave,
      codeFieldForSave:"",
      otherFieldVisible: false,
      otherFieldKey: "otherFieldKey",
      tableComponentsOther: [
        {
          compKey: "propKey1",
          labelName: this.$t('org.label.addOtherFields')/*添加其他字段*/,
          codeField: "addOtherField",
          clickEvent: () => this.openOtherField(),
          component: () => import("@/views/org/configurablePageManagement/dataToObject/otherFieldLabel")
        }
      ],
      otherKey: "otherKey",
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
      componentKey: "componentKey",
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey0",
          labelName: this.$t('org.label.pageName'), //"所属页面"
          isRequire: true,
          codeField: "pageName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          disabled: true
        },
        {
          compKey: "compKey1",
          labelName: this.$t('org.label.labelName'), //"标签名称",
          isRequire: true,
          codeField: "langLabelName",
          textField: "labelName",
          component: () =>
            import("@/views/org/configurablePageManagement/lang/propus"),
          type: "PROPUS",
        },
        //所属类型
        {
          compKey: "compKey2",
          labelName: this.$t('org.label.compType'),
          isRequire: true,
          codeField: "compType",
          component: () => import("@/components/org/LookupValue"),
          lookuptype: "PRO0003",
          type: "dropdownList",
          isMul: false
        },
         //组件路径
        {
          compKey: "compKey3",
          labelName: this.$t('org.label.component'),
          isRequire: true,
          codeField: "component",
          textField: "component",
          component: () =>import("@/views/org/configurablePageManagement/component/index"),
          type: "inputText",
        },
        //组件类型
        {
          compKey: "compKey4",
          labelName: this.$t('org.label.controlType'),
          isRequire: true,
          codeField: "controlType",
          component: () => import("@/components/org/LookupValue"),
          lookuptype: "PRO0002",
          type: "dropdownList",
          isMul: false
        },
         //排序
        {
          compKey: "compKey5",
          labelName: this.$t('org.label.sort'),
          isRequire: true,
          codeField: "sort",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        {
          compKey: "compKey6",
          labelName: this.$t('org.label.codeField'), //"对应数据字段",
          isRequire: true,
          isShow:true,
          filterable:true,
          codeField: "codeField",
          options:this.options,
          component: () =>
            import("@/views/org/configurablePageManagement/comp/codeFields"),
          type: "inputText",
        },
        {
          compKey: "compKey7",
          labelName: this.$t('org.label.codeField'), //"对应数据字段",
          isRequire: true,
          isShow:false,
          codeField: "codeField",
          component: () =>import("@/components/org/commonInput"),
          type: "inputText",
        },
        {
          compKey: "compKey8",
          labelName: this.$t('org.label.codeField'),//"对应数据字段",
          isRequire: true,
          parentFileds: "value:pageId-pageId",
          isShow: false,
          codeField: "codeField",
          options:this.colsOptionDatas,
          oFields:"prop,label",
          component: () => import("@/views/org/configurablePageManagement/comp/cols"),
          type: "inputText"
        },
        //"开始日期",
        {
          compKey: "compKey9",
          labelName: this.$t('org.label.startDate')/*开始日期*/,
          isRequire: true,
          isAsync: true,
          // parentFileds: "show:controlType-TWODATEPICKER",
          codeField: "beginDate",
          options:this.options,
          filterable:true,
          isShow:false,
          component: () => import("@/views/org/configurablePageManagement/comp/codeFields"),
          type: "inputText",
        },
        {
          compKey: "compKey10",
          labelName: this.$t('org.label.startDate')/*开始日期*/,
          isRequire: true,
          isShow:false,
          // parentFileds: "show:controlType-TWODATEPICKER",
          codeField: "beginDate",
          component: () =>import("@/components/org/commonInput"),
          type: "inputText",
        },
        {
          compKey: "compKey11",
          labelName: this.$t('org.label.startDate')/*开始日期*/,
          isRequire: true,
          parentFileds: "value:pageId-pageId",
          isShow: false,
          codeField: "beginDate",
          oFields:"prop,label",
          options:this.colsOptionDatas,
          component: () => import("@/views/org/configurablePageManagement/comp/cols"),
          type: "inputText"
        },
        //"结束日期",
        {
          compKey: "compKey12",
          labelName: this.$t('org.label.endDate')/*结束日期*/,
          isRequire: true,
          isAsync: true,
          // parentFileds: "show:controlType-TWODATEPICKER",
          codeField: "endDate",
          options:this.options,
          filterable:true,
          isShow:false,
          component: () =>
            import("@/views/org/configurablePageManagement/comp/codeFields"),
          type: "inputText",
        },
        {
          compKey: "compKey13",
          labelName: this.$t('org.label.endDate')/*结束日期*/,
          isRequire: true,
          isShow:false,
          // parentFileds: "show:controlType-TWODATEPICKER",
          codeField: "endDate",
          component: () =>import("@/components/org/commonInput"),
          type: "inputText",
        },
        {
          compKey: "compKey14",
          labelName: this.$t('org.label.endDate')/*结束日期*/,
          isRequire: true,
          parentFileds: "value:pageId-pageId",
          isShow: false,
          codeField: "endDate",
          oFields:"prop,label",
          options:this.colsOptionDatas,
          component: () => import("@/views/org/configurablePageManagement/comp/cols"),
          type: "inputText"
        },
        //对应文本字段
        {
          compKey: "compKey15",
          labelName: this.$t('org.label.textField'),
          codeField: "textField",
          component: () => import("@/components/org/commonInput/index"),
          type: "inputText",
        },
        //是否可用
        {
          compKey: "compKey16",
          labelName: this.$t('org.label.isEnable'),
          isRequire: true,
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //"页面区域"
        {
          compKey: "compKey17",
          labelName: this.$t('org.label.pageArea'),
          codeField: "pageArea",
          component: () => import("@/components/org/commonInput/index"),
          type: "inputText",
        },
        //是否系统组件
        {
          compKey: "compKey18",
          labelName: this.$t('org.label.isSys'),
          isRequire: true,
          codeField: "isSys",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //是否显示组件
        {
          compKey: "compKey19",
          labelName: this.$t('org.label.isShow1'),
          codeField: "isShow",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //是否默认展示
        {
          compKey: "compKey20",
          labelName: this.$t('org.label.isMust'),
          codeField: "isMust",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //是否必填
        {
          compKey: "compKey21",
          labelName: this.$t('org.label.isRequire'),
          codeField: "isRequire",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //是否显示标签
        {
          compKey: "compKey22",
          labelName: this.$t('org.label.isShowLabel'),
          codeField: "isShowLabel",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //行宽比例
        {
          compKey: "compKey23",
          labelName: this.$t('org.label.span'),
          codeField: "span",
          component: () => import("@/views/org/configurablePageManagement/comp/span"),
          type: "inputText",
        },
        //是否网格中组件
        {
          compKey: "compKey24",
          labelName: this.$t('org.label.isColComp'),
          codeField: "isColComp",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //所属网格ID
        {
          compKey: "compKey25",
          labelName: this.$t('org.label.colsId'),
          isRequire: true,
          parentFileds: "value:pageId-pageId,show:isColComp-1",
          isShow: false,
          codeField: "colsId",
          oFields:"colsId,label",
          options:this.colsOptionDatas,
          component: () => import("@/views/org/configurablePageManagement/comp/cols"),
          type: "inputText",
        },
        //联动设置
        {
          compKey: "compKey26",
          labelName: this.$t('org.label.linkageConfig'),
          codeField: "parentFields",
          textField: "parentFields",
          parentFileds: "show:compType--TABLE",
          component: () =>import("@/views/org/configurablePageManagement/linkageConfig/index"),
          type: "PROPUS",
        },
        //网格组件联动
        {
          compKey: "compKey27",
          labelName: this.$t('org.label.gridComponentLinkage'),//网格组件联动
          codeField: "rowFields",
          textField: "rowFields",
          isShow:false,
          parentFileds: "show:compType-TABLE",
          component: () =>import("@/views/org/configurablePageManagement/rowLinkage/index"),
          type: "PROPUS",
        },
        //条件字段
        {
          compKey: "compKey28",
          labelName: this.$t('org.label.parentFields'),
          codeField: "parentFieldsInDP",
          textField: "parentFieldsInDP",
          isShow:false,
          parentFileds: "show:controlType-DROPDOWNLIST|PROPUS",
          component: () =>import("@/views/org/configurablePageManagement/parentFields/index"),
          type: "PROPUS",
        },
        //点击事件
        {
          compKey: "compKey29",
          labelName: this.$t('org.label.clickEvent'),
          codeField: "clickEvent",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //是否可清除
        {
          compKey: "compKey30",
          labelName: this.$t('org.label.clearable'),
          isShow: false,
          parentFileds: "show:controlType-DROPDOWNLIST",
          codeField: "clearable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //是否可过滤
        {
          compKey: "compKey31",
          labelName: this.$t('org.label.filterable'),
          isShow: false,
          parentFileds: "show:controlType-DROPDOWNLIST",
          codeField: "filterable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //是否多选
        {
          compKey: "compKey32",
          labelName: this.$t('org.label.isMul'),
          isShow: false,
          parentFileds: "show:controlType-DROPDOWNLIST",
          codeField: "isMul",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //是否使用默认值
        {
          compKey: "compKey33",
          labelName: this.$t('org.label.isUseDeafult'),
          isShow: false,
          parentFileds: "show:controlType-DROPDOWNLIST",
          codeField: "isUseDeafult",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //是否异步加载数据
        {
          compKey: "compKey34",
          labelName: this.$t('org.label.isAsync'),
          isShow: false,
          parentFileds: "show:controlType-DROPDOWNLIST",
          codeField: "isAsync",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
        },
        //值列表类型
        {
          compKey: "compKey35",
          labelName: this.$t('org.label.lookupType'),
          isShow: false,
          codeField: "lookupType",
          parentFileds: "show:controlType-DROPDOWNLIST",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },

        //返回code字段
        {
          compKey: "compKey36",
          labelName: this.$t('org.label.returnCodeFields'),
          isShow: false,
          codeField: "returnCodeFields",
          parentFileds: "show:controlType-PROPUS",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //返回text字段
        {
          compKey: "compKey37",
          labelName: this.$t('org.label.returnTextFields'),
          isShow: false,
          codeField: "returnTextFields",
          parentFileds: "show:controlType-PROPUS",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //组件间传值对象
        {
          compKey: "compKey38",
          labelName: this.$t('org.label.valueObject'),
          codeField: "valueObject",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isShow: false
        },
        //日期类型
        {
          compKey: "compKey39",
          labelName: this.$t('org.label.dateType'),
          codeField: "dateType",
          parentFileds: "show:controlType-DATEPICKER|TWODATEPICKER",
          isShow: false,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //日期选项类型
        {
          compKey: "compKey40",
          labelName: this.$t('org.label.dateOptionsType'),
          codeField: "dateOptionsType",
          parentFileds: "show:controlType-DATEPICKER|TWODATEPICKER",
          isShow: false,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //日期格式
        {
          compKey: "compKey41",
          labelName: this.$t('org.label.format'),
          codeField: "format",
          parentFileds: "show:controlType-DATEPICKER|TWODATEPICKER",
          isShow: false,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //输入类型
        {
          compKey: "compKey42",
          labelName: this.$t('org.label.inputType'),
          isShow: false,
          codeField: "inputType",
          parentFileds: "show:controlType-INPUTTEXT",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //比较字段
        {
          compKey: "compKey43",
          labelName: this.$t('org.label.compareField'),
          codeField: "compareField",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //比较值
        {
          compKey: "compKey44",
          labelName: this.$t('org.label.compareValue'),
          codeField: "compareValue",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //计算表达式
        {
          compKey: "compKey45",
          labelName: this.$t('org.label.contWay'),
          codeField: "contWay",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        }
      ],
      // 标题
      textMap: {
        edit: this.$t("org.label.configurableComponentsManagement"),
        add: this.$t("org.label.configurableComponentsManagement")
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        compId: "",
        pageName: this.$route.query.pageName,
        pageId: this.$route.query.pageId,
        langLabelName: "",
        labelName: "",
        codeField: "",
        compKey: "",
        pageArea: "",
        sort: "",
        textField: "",
        colsId: "",
        component: "",
        parentFields: "",
        parentFieldsInDP:"",
        sort: "",
        isMust: "",
        isRequire: "",
        span: "",
        isEnable: "",
        compType: "",
        controlType: "",
        clearable: "",
        filterable: "",
        isMul: "",
        isShowLabel: "",
        dateType: "",
        dateOptionsType: "",
        format: "",
        inputType: "",
        lookupType: "",
        clickEvent: "",
        compareField: "",
        compareValue: "",
        contWay: "",
        isSys: "",
        isShow: "",
        valueObject: "",
        mustFields: "",
        showFields: "",
        returnCodeFields: "",
        returnTextFields: "",
        otherFields: "",
        isUseDeafult: "",
        isColComp: "",
        isAsync: "",
        rowFields: "",
        oFields: "",
        dataToObject: "",
        updateControlId: "",
        beginDate:"",
        endDate:""
      },
      otherFormField: {}
    };
  },
  methods: {
    openOtherField() {
      this.otherFieldVisible = true;
      this.otherFieldKey = this.otherFieldKey + 1;
    },
    //处理数据传输对象
    dataToObject(){
      this.tableComponentsOther = [{
        compKey: "propKey1",
        labelName: this.$t('org.label.addOtherFields')/*添加其他字段*/,
        codeField: "addOtherField",
        clickEvent: () => this.openOtherField(),
        component: () =>import("@/views/org/configurablePageManagement/dataToObject/otherFieldLabel")
      }];
      // 根据数据传输对象生成其他字段组件
      if (this.formField.dataToObject !== "") {
        var dataToObjects = JSON.parse(this.formField.dataToObject);
        this.otherFormField={}
        for (var key in dataToObjects) {
          var dataToObject = {
            fieldName: key,
            fieldValue:dataToObjects[key]
          }
          this.addOtherField(dataToObject)
        }
      }
    },
    // 生成其他字段组件
    addOtherField(dataToObject) {
      var otherTableComponent1 = {
        compKey: "compKey" + this.tableComponentsOther.length + 1,
        labelName: dataToObject.fieldName,
        codeField: dataToObject.fieldName,
        clickEvent: this.delete,
        component: () =>import("@/views/org/configurablePageManagement/dataToObject/otherField.vue")
      };
      this.tableComponentsOther.splice(this.tableComponentsOther.length - 1, 0 ,otherTableComponent1);
      this.otherFormField[dataToObject.fieldName] = dataToObject.fieldValue;
      this.otherFieldVisible = false;
      this.otherKey = this.otherKey + 1;
    },
    delete(codeField) {
      this.$confirm(this.$t("org.message.confirmDeletion")+"?"/*确认删除*/, this.$t("org.label.warnning")/*提示*/, {
      cancelButtonText: this.$t("org.label.cancel")/*取消*/,
      confirmButtonText: this.$t("org.label.confirm")/*确认*/,
        type: "warning"
      }).then(() => {
        for (var k in this.tableComponentsOther) {
          if (this.tableComponentsOther[k].codeField === codeField) {
            this.tableComponentsOther.splice(k, 1);
            delete this.otherFormField[codeField];
            break;
          }
        }
        this.otherKey = this.otherKey + 1;
      }).catch(() => {
      return
      }) ;
    },
    //保存
    save() {
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        if (isNaN(this.formField.sort)) {
          this.$message({
            message: this.$t("org.label.pleaseEnterNumbersForSorting")/*排序请输入数字！*/,
            type: "warning",
            duration: 2000
          });
          return;
        }
        var dataToObject;
        if (this.tableComponentsOther.length > 0) {
          dataToObject = {};
        }
        for (var k = 0; k < this.tableComponentsOther.length - 1; k++) {
          var key = this.tableComponentsOther[k]["codeField"];
          var value = this.otherFormField[key];
          dataToObject[key] = value;
        }
        var saveObj = JSON.parse(JSON.stringify(this.formField));
        if (saveObj.controlType === 'TWODATEPICKER') {
          saveObj.codeField = saveObj.beginDate + "," + saveObj.endDate
        }
        // 新增时自动生成key
        if(saveObj.compKey === ""){
          saveObj.compKey = saveObj.compType === 'TABLE' ? 'propKey' + (this.$utils.generateId()) : 'compKey' + (this.$utils.generateId())
        }

        if(!(saveObj.langLabelName.indexOf('langType') > -1)){
          saveObj.langLabelName = undefined
        }
        delete saveObj['pageName']
        delete saveObj['beginDate']
        delete saveObj['endDate']
        delete saveObj['parentFieldsInDP']
        saveObj.dataToObject = JSON.stringify(dataToObject);
        //保存表单
        this.saveForm(saveObj);
        storage.remove(this.$route.query.pageCode)
      }
    },
    getComponentCodeOther(val, txt, codeField) {
      // 赋值
      if (codeField in this.otherFormField) {
        this.otherFormField[codeField] = val;
      }
    },
    close() {
      this.otherFieldVisible = false;
      this.otherKey = this.otherKey + 1;
    },
    //获取组件的是否默认多选、默认清除等信息
    getCompCode(val) {
      for(var key in val){
        if (key === 'compId') continue
        if (key === 'labelName') continue
        if (key === 'updateControlId') continue
        if(this.formField.hasOwnProperty(key)){
          this.formField[key] = val[key]
        }
      }
    },
    //控制显示哪几个组件
    changeCodeField(val){
      for(var i = 6 ; i < 15; i++ ){
        this.tableComponents[i].isShow = false
      }
      for(var k in val){
        this.tableComponents[val[k]].isShow = true
      }
    },
    codeFields(){
      if(this.formField.controlType === 'TWODATEPICKER'){
        this.formField.beginDate = this.formField.codeField.split(",")[0]
        this.formField.endDate = this.formField.codeField.split(",")[1]
        this.backFormField = JSON.parse(JSON.stringify(this.formField))
      }
    },
    getParentFields(val){
      var parentFieldsInDP = ''
      if (val.mustFields !== "") {
        parentFieldsInDP = parentFieldsInDP + "mustFields:" + val.mustFields;
      }
      if (val.otherFields !== "0" && val.otherFields !== "") {
        parentFieldsInDP = (parentFieldsInDP === "" ? "": parentFieldsInDP + ",") + "otherFields:" + val.otherFields;
      }
      if (val.rowFields !== "") {
        parentFieldsInDP = (parentFieldsInDP === "" ? "" : parentFieldsInDP + ",") + "rowFields:" + val.rowFields;
      }
      if (val.oFields !== "") {
        parentFieldsInDP = (parentFieldsInDP === "" ? "": parentFieldsInDP + ",") + "oFields:" + val.oFields;
      }
      if (val.showFields !== "") {
        parentFieldsInDP = (parentFieldsInDP == "" ? "": parentFieldsInDP + ",") + "showFields:" + val.showFields;
      }
      this.formField.parentFieldsInDP = parentFieldsInDP
      for(var key in val){
        if(this.formField.hasOwnProperty(key)){
          this.formField[key] = val[key]
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-dialog__body {
  max-height: calc(100vh - 120px);
}
</style>
