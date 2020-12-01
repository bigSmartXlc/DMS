<!--
* description: 组件编辑弹窗
* author: limwm
* createdDate: 2019-11-26
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title='$t("org.label.componentEditor")'
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      :key="popupsTableKey"
      width="1000px"
    >
      <dialogHeader
        slot="title"
        :title='$t("org.label.componentEditor")'
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-container filter-params">
        <el-row
          :gutter="26"
          ref="vailComponentList"
        >
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
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :isShow="comp.isShow"
            :isMul="comp.isMul"
            :span="comp.span || 8"
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
export default {
  // 组件混入对象
  mixins: [formMixins],
     components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      // 保存API配置对象
      apiConfig: orgApis.proComponentTypeMutationSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          clickEvent: () => this.save(),
          text: this.$t("org.label.confirm")//确认
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("org.label.Reset")//重置
        },
        {
          compKey: "btnKey1",
          type: "",
          size: "small",
          clickEvent: () => this.sendCode(),
          text: this.$t("org.label.cancel")//取消
        }
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
          isRequire: true,
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
          isRequire: true,
          isMul: false
        },
        // 组件名称
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.componentName"),//组件名称
          codeField: "labelName",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        // 组件路径
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.component"),//组件路径
          codeField: "component",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        // 是否启用
        {
          compKey: "compKey5",
          labelName: this.$t("org.label.isAble"),
          codeField: "isEnable",
          isRequire: true,
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        //是否可清除
        {
          compKey: "compKey6",
          labelName: this.$t("org.label.isClearedByDefault"),//是否默认可清除
          isShow: false,
          parentFileds: "show:controlType-DROPDOWNLIST",
          codeField: "clearable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        //是否可过滤
        {
          compKey: "compKey7",
          labelName: this.$t("org.label.isFiltered"),//是否默认可过滤
          isShow: false,
          parentFileds: "show:controlType-DROPDOWNLIST",
          codeField: "filterable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        //是否多选
        {
          compKey: "compKey8",
          labelName: this.$t("org.label.isMostChoices"),//是否默认多选
          isShow: false,
          parentFileds: "show:controlType-DROPDOWNLIST",
          codeField: "isMul",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        //日期类型
        {
          compKey: "compKey9",
          labelName: this.$t("org.label.dateType"),
          codeField: "dateType",
          parentFileds: "show:controlType-DATEPICKER|TWODATEPICKER",
          isShow: false,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        //日期选项类型
        {
          compKey: "compKey10",
          labelName: this.$t("org.label.dateOptionsType"),
          codeField: "dateOptionsType",
          parentFileds: "show:controlType-DATEPICKER|TWODATEPICKER",
          isShow: false,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        //日期格式
        {
          compKey: "compKey11",
          labelName: this.$t("org.label.format"),
          codeField: "format",
          parentFileds: "show:controlType-DATEPICKER|TWODATEPICKER",
          isShow: false,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }
      ],
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        moduleCode:"",
        compId:"",
        controlType: "",
        labelName: "",
        component: "",
        isEnable: "",
        isMul:"",
        clearable:"",
        filterable:"",
        dateType:"",
        dateOptionsType:"",
        format:"",
        updateControlId: ""
      }
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
    }
  }
};
</script>
