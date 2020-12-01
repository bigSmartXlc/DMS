<!--
* description: 品牌管理-新增、修改弹窗
* author: luojx
* createdDate: 2019-08-04
-->
<template>
  <section class="editCarBrand">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      :key="popupsTableKey"
      width="1000px"
    >
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-container filter-params">
        <el-row :gutter="26" ref="vailComponentList">
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
            :dateOptionsType="comp.dateOptionsType"
            :dataToObject="comp.dataToObject"
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
export default {
  // 组件混入对象
  mixins: [formMixins],
  components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    // 弹窗页面标识（由引用页面赋值）
    const viewPageCode = "orgBrandManageEdit";
    return {
      // 保存API配置对象
      apiConfig: orgApis.mdmCarBrandMutationSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          icon: "iconfont  icon-confirm",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.confirm") //确认
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "iconfont  icon-reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset") //重置
        },
        {
          compKey: "btnKey1",
          type: "",
          size: "small",
          icon: "iconfont  icon-cancel",
          clickEvent: () => this.sendCode(),
          text: this.$t("sys.button.cancel") //取消
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          : [],
      // 静态组件-查询条件
      staticTableComponents: [
        //品牌编码
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.carBrandCode"),
          codeField: "carBrandCode",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          parentFileds: "disabled:uid-carBrandCode",
          disabled: null,
          isMust: true,
          dataToObject: {
            maxLength: 50
          }
        },
        // 品牌名称
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.carBrand"),
          codeField: "carBrandCn",
          isRequire: true,
          // validrule: { isword: true }, 中文验证
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          dataToObject: {
            maxLength: 25
          }
        },
        // 品牌英文名称
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.carBrandEn"),
          codeField: "carBrandEn",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          dataToObject: {
            maxLength: 25
          }
        },
        // 是否启用
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.isAble"),
          codeField: "isEnable",
          isRequire: true,
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        }
      ],
      // 标题
      textMap: {
        edit: this.$t("org.label.carBrandEditTextMap.edit"),
        add: this.$t("org.label.carBrandEditTextMap.add")
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(
        this,
        {
          carBrandCode: "",
          carBrandCn: "",
          carBrandEn: "",
          isEnable: "",
          updateControlId: "",
          uid: ""
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode],
        null,
        "formComponents"
      )
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
