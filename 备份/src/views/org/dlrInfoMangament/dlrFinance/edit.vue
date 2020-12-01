<!--
* description: 经销商财务扩展信息
* author: zhhx
* createdDate: 2019-10-25
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
    </el-dialog>
  </section>
</template>
<script>
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
// import { throws } from "assert";
export default {
  // 组件混入对象
  mixins: [formMixins],
     components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    const popupsPageCode = 'veDlrFinanceEdit'
    return {
      // 保存API配置对象
      apiConfig: orgApis.mdmOrgDlrMutationFinanceSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          icon: "iconfont  icon-preservation",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.save")
        },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          icon: "iconfont  icon-reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset") //重置
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "iconfont  icon-cancel",
          clickEvent: () => this.sendCode(),
          text: this.$t("sys.button.cancel")
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[popupsPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[popupsPageCode].formComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[popupsPageCode].formComponents
          : [],
      // 静态组件-查询条件
      staticTableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.dlrShortName"),
          isRequire: true,
          disabled: true,
          codeField: "dlrShortName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //经销商名称
        // {
        //   compKey: "compKey1",
        //   labelName: this.$t("org.label.dlrName"),
        //   codeField: "dlrIDList",
        //   parentFileds: "carBrandCode",
        //   component: () => import("@/components/org/orgDlr"),
        //   type: "propus",
        //   isMust: true
        // }, //经销商
        {
          compKey: "compKey2",
          labelName: "增值税发票号",
          isRequire: true,
          disabled: null,
          codeField: "taxNo",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: "开户银行",
          isRequire: true,
          disabled: null,
          codeField: "invBank",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: "SAP编码",
          isRequire: true,
          codeField: "sapDlrId",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey5",
          labelName: "开户银行账户",
          isRequire: true,
          disabled: null,
          codeField: "invAccount",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey6",
          labelName: "开票名称",
          isRequire: true,
          disabled: null,
          codeField: "invName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey7",
          labelName: "开票地址",
          isRequire: true,
          disabled: null,
          codeField: "invAddr",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey8",
          labelName: "财务联系人",
          isRequire: true,
          disabled: null,
          codeField: "linkManName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey9",
          labelName: "联系人电话",
          isRequire: true,
          disabled: null,
          codeField: "linkManPhone",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey10",
          labelName: "联系人手机",
          disabled: null,
          codeField: "linkManMobil",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey12",
          labelName: "联系人E-mail",
          disabled: null,
          codeField: "email",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey13",
          labelName: "联系人地址",
          disabled: null,
          codeField: "linkManAddr",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey14",
          labelName: "开票备注",
          disabled: null,
          codeField: "remark",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey15",
          labelName: "操作标识", //操作标识
          codeField: "operateCode",
          component: () => import("./operateCode"),
          type: "dropdownList",
          isMust: true,
          disabled: true
        },
      ],
      // 标题
      textMap: {
        edit: "财务扩展信息编辑"
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(this, {
        dlrId: "", //经销商ID
        invBank: "", //开户银行
        dlrShortName:"",//经销商简称
        invAccount: "", //开户银行账号
        taxNo: "", //增值税发票号
        sapDlrId: "", //SAP编码
        invName: "", //开票名称
        invAddr: "", //开票地址
        linkManName: "", //财务联系人
        linkManPhone: "", //电话
        linkManMobil: "", //手机
        email: "", //邮箱
        zip: "", //邮编
        linkManAddr: "", //地址
        updateControlId: '',
        operateCode: "1", //操作标识
        remark: "" //开票备注
      },this.$ConfigCache.CacheConfig.cacheData[popupsPageCode], null, 'formComponents')
    };
  },
  methods: {
    //保存
    save() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        var formField2 = {
          dlrId: this.formField.dlrId, //经销商ID
          invBank: this.formField.invBank, //开户银行
          // dlrShortName:"",//经销商简称
          invAccount: this.formField.invAccount, //开户银行账号
          taxNo: this.formField.taxNo, //增值税发票号
          sapDlrId: this.formField.sapDlrId, //SAP编码
          invName: this.formField.invName, //开票名称
          invAddr: this.formField.invAddr, //开票地址
          linkManName: this.formField.linkManName, //财务联系人
          linkManPhone: this.formField.linkManPhone, //电话
          linkManMobil: this.formField.linkManMobil, //手机
          email: this.formField.email, //邮箱
          zip: this.formField.zip, //邮编
          linkManAddr: this.formField.linkManAddr, //地址
          updateControlId: this.formField.updateControlId,
          operateCode: this.formField.operateCode ,//操作标识
          invRemark: this.formField.remark //开票备注
        };
        //保存表单
        this.saveForm(formField2);
      }
    },
    // reset() {
    //   this.formField.invBank = ""; //开户银行
    //   // dlrShortName:"",//经销商简称
    //   this.formField.invAccount = ""; //开户银行账号
    //   this.formField.taxNo = ""; //增值税发票号
    //   this.formField.sapDlrId = ""; //SAP编码
    //   this.formField.invName = ""; //开票名称
    //   this.formField.invAddr = ""; //开票地址
    //   this.formField.linkManName = ""; //财务联系人
    //   this.formField.linkManPhone = ""; //电话
    //   this.formField.linkManMobil = ""; //手机
    //   this.formField.email = ""; //邮箱
    //   this.formField.zip = ""; //邮编
    //   this.formField.linkManAddr = ""; //地址
    //   // updateControlId: '',
    //   this.formField.remark = ""; //开票备注
    //   this.reset();
    // }
  }
};
</script>
