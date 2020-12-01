<!--
* description: 经销商通用部门管理
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
export default {
  // 组件混入对象
  mixins: [formMixins],
     components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },

  data() {
    const popupsPageCode = "veDlrGeneralInfo-Edit"
    return {
      // 保存API配置对象
      apiConfig: orgApis.mdmOrgDeptMutationSaveById,
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
          : [
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.carBrand"),
          codeField: "carBrandCode",
          isRequire: true,
          isMul: false,
          disabled:null, 
          // parentFileds: "disabled:deptCode-carBrandCode-true",
          component: () => import("@/components/org/carBrand/carBrand"),
          type: "dropdownList",
          isMust: true
        },
        { 
          compKey: "compKey2",
          labelName: this.$t("org.label.DeptCode"),
          codeField: "deptCode",
          disabled:null, 
          // parentFileds: "disabled:deptCode-deptCode-true",
          isRequire: true,
          isMust: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText"
        },
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.DeptName2"),
          isRequire: true,
          disabled: null,
          codeField: "deptName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.isEnable"),
          codeField: "isEnable",
          isRequire: true,
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey5",
          labelName: this.$t("org.label.DeptDec"),
          codeField: "deptDesc",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }
      ],
      // 标题
      textMap: {
        edit: this.$t("org.label.textMapDlrGen.edit"),
        add: this.$t("org.label.textMapDlrGen.add")
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(this, {
        carBrandCode: "",
        deptCode: "",
        deptName: "",
        isEnable: "",
        deptDesc: "",
        deptId: "" //部门id有则表示保存 为空则新增
      }, this.$ConfigCache.CacheConfig.cacheData[popupsPageCode], null, 'formComponents')
    };
  },
  // created(){
  //   if(this.tableComponents.deptId !== ""){
  //     debugger
  //     this.tableComponents.disabled = true
  //   }
  // },
    watch: {
    "formField.deptId"(val){
    if (this.formField.deptId !== "") {
      this.staticTableComponents[0].disabled = true
      this.staticTableComponents[1].disabled = true
       }
       else{
      this.staticTableComponents[0].disabled = false
      this.staticTableComponents[1].disabled = false
       }
  }},
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
