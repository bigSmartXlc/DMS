<!--
* description: 可配置化页面管理-新增、修改弹窗
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
        :title="$t('org.label.pageMaintenance')/*页面维护*/"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>

      <div class="filter-container filter-params">
        <el-row :gutter="26">
          <component
            v-for="comp in tableComponents"
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
            :isMul="comp.isMul"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
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
import storage from "@/utils/storage";
export default {
  // 组件混入对象
  mixins: [formMixins],
  components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  watch: {
    "formField.pageType"(newVal, oldVal) {
      if (newVal === "HOMEPAGE") {
        this.tableComponents[2].component = () =>
          import("@/components/org/LookupValue");
        this.tableComponents[2].lookuptype = "VE0637";
      } else if (newVal !== "HOMEPAGE" && oldVal === "HOMEPAGE") {
        this.tableComponents[2].component = () =>
          import("@/components/org/commonInput");
        delete this.tableComponents[2]["lookuptype"];
      }
    }
  },
  data() {
    return {
      // 保存API配置对象
      apiConfig: orgApis.proConfigPageviewMutationSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          icon: "iconfont  icon-preservation",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.save") //"保存"
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "iconfont icon-reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset") //"重置"
        }
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.BelongtoCode"), //"所属模块"
          isRequire: true,
          codeField: "moduleCode",
          lookuptype: "DB0001",
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMul: false
        },
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.pageName"), //"页面名称"
          isRequire: true,
          codeField: "pageName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText"
        },
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.pageCode"), //"页面标识"
          isRequire: true,
          codeField: "pageCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText"
        },
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.pageType"), //"页面类型"
          isRequire: true,
          codeField: "pageType",
          lookuptype: "PRO0001",
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMul: false
        },
        {
          compKey: "compKey5",
          labelName: this.$t("org.label.isEnable"), //"状态"
          isRequire: true,
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMul: false
        },
        {
          compKey: "compKey6",
          labelName: this.$t("org.label.subordinateFunction"),//所属功能
          isRequire: true,
          codeField: "pageArea",
          component: () => import("@/components/org/commonInput/index"),
          type: "dropdownList",
          isMul: false
        },
        {
          compKey: "compKey7",
          labelName: this.$t("org.label.parentPageName"),//上级页面名称
          codeField: "parentPageName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText"
        },
        {
          compKey: "compKey8",
          labelName: this.$t("org.label.chinaCenter"),//中台中心
          codeField: "busiCenter",
          component: () =>
            import(
              "@/views/org/configurablePageManagement/comp/busiCenter.vue"
            ),
          type: "inputText"
        },
        {
          compKey: "compKey9",
          labelName: this.$t("org.label.middleStationServiceCode"),//中台服务编码
          codeField: "serviceCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText"
        }
      ],
      // 标题
      textMap: {
        edit: this.$t("org.label.configurablePageManagement.edit"),
        add: this.$t("org.label.configurablePageManagement.add")
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        pageId: "",
        moduleCode: "",
        pageName: "",
        pageCode: "",
        pageType: "",
        isEnable: "",
        pageArea: "",
        parentPageName: "",
        busiCenter: "",
        serviceCode: "",
        updateControlId: " "
      }
    };
  },
  methods: {
    save() {
      storage.remove(this.formField.pageCode);
      this.saveForm();
    }
  }
};
</script>
