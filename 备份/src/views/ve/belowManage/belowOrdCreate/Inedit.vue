<!--
* 新增订单中编辑
* 
-->
<template>
  <section class="editcarType">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="close"
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
            :span="comp.span || 8"
            :labelName="comp.labelName"
            :isShow="comp.isShow"
            :lookuptype="comp.lookuptype"
            :dateOptionsType="comp.dateOptionsType"
            :dateType="comp.dateType"
            :isMul="false"
            :parentFileds="comp.parentFileds || ''"
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
  props: {
      receiveObj: ''
  },
  data() {
    return {

      curPopupsState: this.popupsState,
      // 保存API配置对象
      apiConfig: orgApis.mdsSysSceneSettingDMutationSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          icon: "iconfont  icon-preservation",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.confirm") /**确认 */
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "iconfont  icon-reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset") /* 重置 */
        },
        {
          compKey: "btnKey1",
           type: "",
          size: "small",
          icon: "iconfont  icon-cancel",
          clickEvent: () => this.sendCode(1),
          text: this.$t("sys.button.cancel") /**取消 */
        }
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: "车型名称", 
          codeField: "carTypeName",
          component: () => import("@/components/org/commonInput"),
          type: "input",
          isMust: true,
          disabled: false
        },
        {
          compKey: "compKey2",
          labelName: "车型配置编码", 
          codeField: "carConfigCode",
          component: () => import("@/components/org/commonInput"),
          type: "input",
          isMust: true,
          disabled: false
        },
        {
          compKey: "compKey3",
          labelName: "车型配置名称", 
          codeField: "carConfigName",
          component: () => import("@/components/org/commonInput"),
          type: "input",
          isMust: true,
          disabled: false
        },
        {
          compKey: "compKey4",
          labelName: "交付城市", 
          codeField: "deliveryCity",
          component: () => import("@/components/org/commonInput"),
          type: "input",
          isMust: true,
          disabled: false
        },
         {
          compKey: "compKey5",
          labelName: "交付门店", 
          codeField: "deliveryStore",
          component: () => import("@/components/org/commonInput"),
          type: "input",
          isMust: true,
          disabled: false
        },
        {
          compKey: "compKey6",
          labelName: "展车门店", 
          codeField: "belowStore",
          component: () => import("@/components/org/commonInput"),
          type: "input",
          isMust: true,
        },
        {
          compKey: "compKey7",
          labelName: "数量", 
          codeField: "quantity",
          component: () => import("@/components/org/commonInput"),
          type: "input",
          isMust: true,
        },
      ],
      // 标题
      textMap: {
        edit: "编辑"
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        carTypeName: '',
        carConfigCode: '',
        carConfigName: '',
        deliveryCity: '',
        deliveryStore: '',
        belowStore: '',
        quantity: ''
      }
    };
  },
  // created()
  //   this.formField.receiverType = ""
  // },
  watch: {
    "formField.receiverTypeCode": {
      handler: function() {
        // deep:true;
        let comps = this.tableComponents.filter(
          o => o.codeField === "receiverCode"
        );
        if (this.formField.receiverTypeCode == "1" || this.formField.receiverTypeCode == "岗位") {
          comps[1].disabled = true;
          comps[0].disabled = false;
          comps[0].compKey = comps[0].compKey + "1";
          comps[1].compKey = comps[1].compKey + "1";
        } else {
          comps[0].disabled = true;
          comps[1].disabled = false;
          comps[0].compKey = comps[0].compKey + "1";
          comps[1].compKey = comps[1].compKey + "1";
        }
      }
    }
  },
  methods: {
    sendCode(type) {
      // this.editRowData = {}
      // this.emptyFormField()
      this.$emit('closeNew', type)
    },
    //保存
    save() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");

      let obj = {}

      obj["carTypeName"] = this.formField.carTypeName
      obj["carConfigCode"] = this.formField.carConfigCode
      obj["carConfigName"] = this.formField.carConfigName
      obj["deliveryCity"] = this.formField.deliveryCity
      obj["deliveryStore"] = this.formField.deliveryStore
      obj["belowStore"] = this.formField.belowStore
      obj["quantity"] = this.formField.quantity


      if(this.$parent.$parent.editPopupsState === "add" ){
          //设置为新增成功的值
          obj.receiveObj = this.$parent.$parent.formField.sceneCode;
           this.$parent.$parent.$refs.multipleTable.formField.receiveObj=obj.receiveObj

      }
      if (this.valid) {
        //保存表单
        this.saveForm(obj);
        setTimeout(func,"1000")
        function func(){
        that.$parent.$parent.$refs.multipleTable.queryTable(1)
        }
      }
    },



  }
};
</script>
