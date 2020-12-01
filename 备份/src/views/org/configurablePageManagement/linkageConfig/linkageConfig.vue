<!--
* description: 联动设置弹窗
* author: linwm
* createdDate: 2019-11-15
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title="$t('org.label.componentLinkageSetting')/*组件联动设置*/"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="close"
      width="1000px"
    >
      <dialogHeader
        slot="title"
        :title="$t('org.label.componentLinkageSetting')/*组件联动设置*/"
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
      <p class="cc">value: 监听组件值传递："value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2"。</p>
      <p class="cc">show: 监听组件显示："show:监听字段(父组件formField的对应字段)-显示组件值1|显示组件值2|...-隐藏组件值。"</p>
      <p class="cc">set: 设置对象值："set:监听字段-常量值"</p>
      <p
        class="cc"
      >disabled: 设置组件不可编辑："disabled:监听字段（监听空值）-需要对tableComponents中进行设置disabled的codeField-值-类型（监听字段为空时赋值给disabled值类型（true/false），默认空表示true）"。</p>
      <p
        class="cc"
      >注意：必须设置disabled。如：<br>
      disabled=null, parentFileds="disabled:carConfigCode-carBrandCode-true，这样配置后，当carConfigCode不为空时carBrandCode对应组件则置为不可编辑"。<br>
      disabled=null, parentFileds="disabled:carConfigCode-carBrandCode-1-true，这样配置后，当carConfigCode不为1时carBrandCode对应组件则置为不可编辑"。<br>
      其中“值”可以有多个，用“|"隔开，如：1|2|3。不需要组件联动，一直保持禁用直接填 true <br>
      </p>
      <p class="cc">copy: 复制(同步)组件值："copy:复制字段"</p>
      <p class="cc">calculate:计算表达式（一般为父组件中formField对象中的字段进行四则运算，如: price:price1+price2*rate1</p>
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
      var parentFields = this.code.split(',')
      var hasFlag = true
      for(var k in parentFields){
          if (parentFields[k].indexOf("value:")> -1) {
              this.formField.value = parentFields[k].split("value:")[1]
              hasFlag = false
          }
          if (parentFields[k].indexOf("show:")> -1) {
              this.formField.show = parentFields[k].split("show:")[1]
              hasFlag = false
          }
          if (parentFields[k].indexOf("set:")> -1) {
              this.formField.set = parentFields[k].split("set:")[1]
              hasFlag = false
          }
          if (parentFields[k].indexOf("disabled:")> -1) {
              this.formField.disabled = parentFields[k].split("disabled:")[1]
              hasFlag = false
          }
          if (parentFields[k].indexOf("copy:")> -1) {
              this.formField.copy = parentFields[k].split("copy:")[1]
              hasFlag = false
          }
          if (parentFields[k].indexOf("calculate:")> -1) {
              this.formField.calculate = parentFields[k].split("calculate:")[1]
              hasFlag = false
          }
      }
      if (hasFlag && parentFields !== '') {
          this.formField.value = this.code
      }
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
          compKey: "compKey1",
          labelName: "value",
          codeField: "value",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey2",
          labelName: "show",
          codeField: "show",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: "set",
          codeField: "set",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: "disabled",
          codeField: "disabled",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey5",
          labelName: "copy",
          codeField: "copy",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey6",
          labelName: "calculate",
          codeField: "calculate",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }
      ],
      formField: {
        value: "",
        show: "",
        set: "",
        disabled: "",
        copy: "",
        calculate:""
      }
    };
  },
  methods: {
    sendCode1() {
      var parentFields = "";
      if (this.formField.value !== "") {
        parentFields = parentFields + "value:" + this.formField.value;
      }
      if (this.formField.show !== "") {
        parentFields = (parentFields === "" ? "": parentFields + ",") + "show:" + this.formField.show;
      }
      if (this.formField.set !== "") {
        parentFields = (parentFields === "" ? "" : parentFields + ",") + "set:" + this.formField.set;
      }
      if (this.formField.disabled !== "") {
        parentFields = (parentFields === "" ? "": parentFields + ",") + "disabled:" + this.formField.disabled;
      }
      if (this.formField.copy !== "") {
        parentFields = (parentFields == "" ? "": parentFields + ",") + "copy:" + this.formField.copy;
      }
      if (this.formField.calculate !== "") {
        parentFields = (parentFields == "" ? "": parentFields + ",") + "calculate:" + this.formField.calculate;
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
