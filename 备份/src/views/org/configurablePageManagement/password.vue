<!--
* description: 密码输入框
* author: linwm
* createdDate: 2020-03-12
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      title="请输入二次验证密码"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="cancel"
      width="385px"
    >
      <dialogHeader
        slot="title"
        title="请输入二次验证密码"
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
            :span="24"
            :isMul="comp.isMul"
            :inputType="comp.inputType"
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
import md5 from 'js-md5'
export default {
  // 组件混入对象
  mixins: [formMixins],
     components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      // 保存API配置对象
      apiConfig: orgApis.proConfigDesktopMutationVerification,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.confirm(),
          text: this.$t('sys.button.confirm') //"确认"
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.cancel(),
          text: this.$t('sys.button.cancel') //"取消"
        }
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: '二次验证密码',//"二次验证密码"
          isRequire: true,
          codeField: "password",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          inputType:"password",
          isMust: true,
        }
      ],
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        password:""
      }
    };
  },
  methods: {
    //保存
    confirm() {
      this.$utils.validataMoth(this, 'validpopup')
      if (this.valid) {
        var password = md5(md5(md5(md5(md5(md5(md5(this.formField.password)))))+'passwordKey'))
        const that = this
        let queryObj = {
        // api配置
        type: "mutation",
        apiConfig: orgApis.proConfigDesktopMutationVerification,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: []
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            pwdExpress:password
          }
        }
      };
      //转换了中台请求格式数据
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        if (response.data[queryObj.apiConfig.ServiceCode].result === "1") {
          that.$utils.showMessages(that, "success", "验证成功！");
          that.$emit('confirm',"")
        } else {
          that.$utils.showMessages(
            that,
            "error",
            response.data[queryObj.apiConfig.ServiceCode].msg
          );
        }
      });
      }
    },
    cancel(){
      this.$emit('cancel','')
    }
  }
};
</script>
