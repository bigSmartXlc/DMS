<!--
* description: 网格中组件联动设置弹窗
* author: linwm
* createdDate: 2019-12-10
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title="$t('org.label.gridComponentLinkageSetting')/*网格组件联动设置*/"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="close"
      width="1000px"
    >
      <dialogHeader
        slot="title"
        :title="$t('org.label.gridComponentLinkageSetting')/*网格组件联动设置*/"
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
            :popupsKey="comp.compKey"
            :is="comp.component"
            :code="formField[comp.codeField]"
            @changeCode="getComponentCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :span="comp.span || 8"
            :labelName="comp.labelName"
          ></component>
        </el-row>
      </div>
      <p class="cc">
          disabled: disabled状态依赖网格是否选中，ture表示当网格没选中就是disabled=true，如：disabled:table-true。
      </p>
      <div slot="footer" class="dialog-footer">
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
export default {
  // 组件混入对象
  mixins: [formMixins],
     components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props:{
    code:{ type: String, default: '' }
  },
  created(){
    this.formField.disabled = rowFields[k].split("disabled:")[1]
  },
  data() {
    return {
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.sendCode1(),
          text: this.$t("sys.button.confirm")
        } /*确认*/,
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.close(),
          text: this.$t("sys.button.cancel")
        } /*取消*/
      ],
      tableComponents: [
        {
          compKey: "compKey4",
          labelName: "disabled",
          codeField: "disabled",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }
      ],
      formField: {
        disabled: ""
      }
    };
  },
  methods: {
    sendCode1() {
      var parentFields = "";
      if (this.formField.disabled !== "") {
        parentFields = (parentFields === "" ? "": parentFields + ",") + "disabled:" + this.formField.disabled;
      }
      this.$emit("changeCode", parentFields,parentFields,"parentFields");
    }
  }
};
</script>
<style lang="scss" scoped>
p.cc {
  color: rgb(255, 0, 0);
  margin-left: 31px;
  font-size: 14px;
}
</style>
