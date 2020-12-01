<!--
* description: 条件字段弹窗
* author: linwm
* createdDate: 2019-12-06
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title="$t('org.label.parentFields')/*条件字段*/"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="close"
      width="1000px"
    >
      <dialogHeader
        slot="title"
        :title="$t('org.label.parentFields')/*条件字段*/"
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
      <p class="cc">查询条件字段: 下拉框中必须的查询条件字段，设置后只有listQuery中对应该字段有值才会进行查询。格式：mustField："字段1|字段2"</p>
      <p class="cc">其它返回字段:其它返回字段（以“,”隔开，以“-”分别区分组件中字段名与网格字段，多个请使用“|”进行分隔）</p>
      <p class="cc">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;格式:“otherField:carBrandCode-jzCarBrandCode|carBrandCn-jzCarBrandCn”</p>
      <p class="cc">行内传值对象: 本组件-row对象对应字段集合。格式：“rowFileds:本组件字段1-row对象字段1|本组件字段2-row对象字段2”</p>
      <p class="cc">传入绑定值/文本字段: 传入绑定值/文本字段名称，格式：值字段名称,文本字段名称，如：oFields:carBrandCode,carBrandCn</p>
      <p class="cc">显示组件字段</p>
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
      var formField = this.$parent.$parent.$parent.$parent.$parent.formField
      this.formField.mustFields = formField.mustFields
      this.formField.otherFields = formField.otherFields === "0" ? "" : formField.otherFields 
      this.formField.rowFields = formField.rowFields
      this.formField.oFields = formField.oFields
      this.formField.showFields = formField.showFields
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
        //查询条件字段（下拉框）
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.mustFields"),
          codeField: "mustFields",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //其它返回字段
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.otherFields"),
          codeField: "otherFields",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //行内传值对象
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.rowFields"),
          codeField: "rowFields",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //传入绑定值/文本字段
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.oFields"),
          codeField: "oFields",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        },
        //显示组件字段
        {
          compKey: "compKey5",
          labelName: this.$t("org.label.showFields"),
          codeField: "showFields",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
        }
      ],
      formField: {
        mustFields: "",
        otherFields: "",
        rowFields: "",
        oFields: "",
        showFields: ""
      }
    };
  },
  methods: {
    sendCode1() {
      this.$emit("changeCode", this.formField);
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
