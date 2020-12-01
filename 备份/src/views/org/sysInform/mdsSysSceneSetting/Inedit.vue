<!--
* 场景对象编辑弹窗
* yangsq
-->
<template>
  <section class="editCarBrand">
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
          labelName: "收件类型", //对象类型
          // lookuptype: "DB0001",
          codeField: "receiverTypeCode",
          isRequire: true,
          component: () => import("./receiverType"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey2",
          labelName: "收件岗位", //收件岗位
          codeField: "receiverCode",
          component: () => import("./receivePost"),
          type: "dropdownList",
          isMust: true,
          // isShow: false,
          // parentFileds:"show:receiverType-1-0",
          disabled: false
        },
        {
          compKey: "compKey3",
          labelName: "收件人",
          codeField: "receiverCode",
          component: () => import("@/components/org/userSelect"),
          type: "propus",
          isMust: true,
          disabled:true,
          // isShow: false,
          // parentFileds:"show:receiverType-0-1",
        },
        {
          compKey: "compKey4",
          labelName: "是否启用",
          isRequire: true,
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnableOne"),
          type: "dropdownList",
          isMust: true
        }
      ],
      // 标题
      textMap: {
        add: "通知场景对象-新增",
        edit: "通知场景对象-编辑"
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        receiverTypeCode: "1",
        receiverCode: "",
        isEnable: "",
        updateControlId: "",
        sceneDetailId: "",
        receiveObj: this.receiveObj
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

      obj["receiverType"] = this.formField.receiverTypeCode
      obj["receiver"] = this.formField.receiverCode
      obj["isEnable"] = this.formField.isEnable
      obj["updateControlId"] = this.formField.updateControlId
      obj["sceneDetailId"] = this.formField.sceneDetailId
      obj["receiveObj"] = this.formField.receiveObj


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
