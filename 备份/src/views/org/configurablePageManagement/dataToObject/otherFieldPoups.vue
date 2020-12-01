<!--
* description: 添加其他字段弹窗
* author: linwm
* createdDate: 2019-11-08
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title="$t('org.label.addOtherFields')/*添加其他字段*/"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="close"
      width="1000px"
    >
      <dialogHeader
        slot="title"
        :title="$t('org.label.addOtherFields')/*添加其他字段*/"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-container filter-params" >
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
       <p class="cc">validrule：校验规则。字段请用""包含，例如：{"noRequire": false,"isEmail": true, "min": 8}</p>
       <p class="cc">isSlot：是否使用slot（占位符）</p>
       <p class="cc">category：上传目录</p>
       <p class="cc">importUrl：上传url地址</p>
       <p class="cc">pageSize：分页条数</p>
       <p class="cc">fuzzySearch：模糊搜索，1代表是，0代表否</p>
       <p class="cc">min：输入框最小数值。max：输入框最大数值</p>
       <p class="cc">isType：是否需要检验最小、最大数据值</p>
       <p class="cc">decPoint：小数点保留位数（默认两位）</p>
       <p class="cc">step：数字输入框一次增加或减少的数值</p>
       <p class="cc">readonly:是否只读，1或true代表是</p>
       <p class="cc">change:组件值改变时触发的方法。例如：change:getCompValue</p>
       <p class="cc">unListQuryFields:下拉框加载值时去掉不需要的查询字段</p>
       <p class="cc">isformat：自定义正则表达式</p>
       <p class="cc">labelWidth：标签宽度</p>
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
  data() {
    return {
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.sendCode1(),
          text: this.$t('sys.button.confirm')
        } /*确认*/,
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.sendCode(),
          text: this.$t('sys.button.cancel')
        } /*取消*/
      ],
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t('org.label.theFieldNames'),//字段名称
          codeField: "fieldName",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey2",
          labelName: this.$t('org.label.theFieldValues'),//字段值
          codeField: "fieldValue",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }
      ],
      formField: {
        fieldName: "",
        fieldValue: ""
      }
    };
  },
  methods: {
    sendCode1() {
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
          this.$emit("changeCode",this.formField)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
p.cc {
  color: #cd0000;
  margin-left: 31px;
  font-size: 14px;
}
</style>