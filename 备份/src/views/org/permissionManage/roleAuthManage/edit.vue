<!--
* description: 成员管理-新增、修改弹窗
* author: mjq
* createdDate: 2019-08-14
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
            :parentFileds="comp.parentFileds"
            :isShow="comp.isShow"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :dataToObject="comp.dataToObject"
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
    const viewPageCode = "roleAuthority-Edit";
    return {
      popupsPageCode: "roleAuthority-Edit",
      // 保存API配置对象
      apiConfig: orgApis.sysRoleMutationCommonSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          icon: "iconfont  icon-preservation",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.save")
        } /*确认*/,
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "iconfont  icon-reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } /*重置*/,
        {
          compKey: "btnKey1",
          type: "",
          size: "small",
          icon: "iconfont  icon-cancel",
          clickEvent: () => this.sendCode(),
          text: this.$t("sys.button.cancel")
        } /*取消*/
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          : [
            {
                compKey: "compKey3",
                labelName: this.$t("org.label.roleCode"),
                /*角色编码*/ codeField: "roleCode",
                isRequire: true,
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isShow:false,
                parentFileds:"show:roleId--",
                disabled: true,
                isMust: true
              },
               {
                compKey: "compKey5",
                labelName: this.$t("org.label.roleCode"),
                /*角色编码*/ codeField: "roleCode",
                isRequire: true,
                component: () => import("@/components/org/commonInput/indexprepend"),
                type: "inputText",
                parentFileds:"show:roleId-",
                disabled: false,
                dataToObject:{
                  prepend:this.$store.getters.orgInfo.DLR_CODE
                },
                isMust: true
              },
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.roleName"),
                /*角色名称*/ codeField: "roleName",
                isRequire: true,
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
               // disabled: !this.isAdd(),
                isMust: true
              },
               {
                compKey: "compKey4",
                labelName: this.$t("org.label.roleDesc"),
                /*角色描述*/
                type: "textarea",
                codeField: "roleDesc",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.orgName"),
                /*所属部门*/ codeField: "orgName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                disabled: true
              },
              // {
              //   compKey: "compKey3",
              //   labelName: this.$t("org.label.roleCode"),
              //   /*角色编码*/ codeField: "roleCode",
              //   isRequire: true,
              //   component: () => import("@/components/org/commonInput"),
              //   type: "inputText",
              //   isShow:false,
              //   parentFileds:"show:roleName--",
              //   disabled: !this.isAdd(),
              //   isMust: true
              // },
              //  {
              //   compKey: "compKey5",
              //   labelName: this.$t("org.label.roleCode"),
              //   /*角色编码*/ codeField: "roleCode",
              //   isRequire: true,
              //   component: () => import("@/components/org/commonInput/indexprepend"),
              //   type: "inputText",
              //   parentFileds:"show:roleName-",
              //   disabled: !this.isAdd(),
              //   isMust: true
              // },
              {
                compKey: "compKey7",
                labelName: "是否启用",
                codeField: "enabled",
                isRequire: true,
                component: () => import("@/components/org/isEnable/isEnable"),
                type: "dropdownList",
                isMust: true
              },
             
              // {compKey: 'compKey5', labelName: '角色ID', codeField: 'roleId', component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: true, hidden: true},
            ],
      // 标题
      textMap: {
        edit: this.$t("org.label.modifyingRoleInformation") /*修改员工信息*/,
        add: this.$t("org.label.addingRoleInformation") /*新增员工信息*/
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(
        this,
        {
          roleName: "",
          orgName: "",
          orgId: "",
          roleCode: "",
          roleDesc: "",
          enabled: "",
          roleId: ""
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode],
        null,
        "formComponents"
      ),
      initData: {}
    };
  },
  watch: {
    popupsVisible(val){
      if(val){
    if (this.isUseRowData) {
      let enabled = "";
      if (!isNaN(this.dynamicEditRowData.enabled)) {
        enabled = this.dynamicEditRowData.enabled.toString();
      }
      for (var key in this.formField) {
        if (this.dynamicEditRowData[key]) {
          this.formField[key] = this.dynamicEditRowData[key];
        } else {
          this.formField[key] = "";
          // 两层处理
          for (var rKey in this.dynamicEditRowData) {
            if (rKey.indexOf(".") > -1) {
              var tmpKey = rKey.split(".")[1];
              if (tmpKey === key) {
                this.formField[tmpKey] = this.dynamicEditRowData[rKey];
                break;
              }
            }
          }
        }
      }
      this.formField.enabled = enabled;
      if (this.isAdd()) {
        this.backFormField = JSON.parse(JSON.stringify(this.formField));
      }
    }
    }
    }
  },
  methods: {
    // reset() {
    //   // this.formField = JSON.parse(JSON.stringify(this.backFormField))
    //   this.$utils.deepClone(this.formField, this.backFormField)
    //   this.formField.orgId = this.initData.orgId
    //   this.formField.orgName = this.initData.orgName

    // },
    queary(roleId, cd) {
      let queryObj = {
        // api配置
        apiConfig: orgApis.sysRoleUserQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: ["userId", "userName", "empName", "orgName"]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: -1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            roleId: roleId || ""
          }
        }
      };
      //转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (
          response.result === "1"
        ) {
          let roleName = response.rows;

          if (typeof cd === "function") {
            cd.call(roleName);
          }
        }
      });
    },
    //保存
    save() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        var saveObj = {};
        let enabled = Number(this.formField.enabled);
        let queryObj = {
          // api配置
          apiConfig: orgApis.sysRoleUserQueryByPage,
          // 需要调用的API服务配置
          apiServices: [
            {
              //表格中台返回网格的字段
              apiQueryRow: ["userId", "userName", "empName", "orgName"]
            }
          ],
          //条件/实体参数（变量），根据typeParam中的定义配置
          variables: {
            pageSize: -1,
            pageIndex: -1,
            //当前中台使用的名称有dataInfo、info，具体查看API文档
            dataInfo: {
              roleId: this.formField.roleId || ""
            }
          }
        };
        //转换了中台请求格式数据
        var paramD = this.$getParams(queryObj);
        // 调用中台API方法（可复用）
        this.$requestAPI(paramD).then(response => {
          if (
            response.result === "1"
          ) {
            let roleName = response.rows;

            if (roleName.length > 0 && enabled === 0) {
                that.$message({ message: "该角色有成员，不能禁用！", type: "warning" });
                 return false;
            } else {
              if (that.popupsState === "edit") {
                saveObj = {
                  roleName: that.formField.roleName,
                  orgId: that.formField.orgId,
                  roleCode: that.formField.roleCode,
                  roleDesc: that.formField.roleDesc,
                  roleId: that.formField.roleId,
                  enabled: enabled
                };
              } else {
                saveObj = {
                  roleName: that.formField.roleName,
                  orgId: that.formField.orgId,
                  // orgName:this.formField.orgName,
                  roleCode: this.$store.getters.orgInfo.DLR_CODE===null?that.formField.roleCode:this.$store.getters.orgInfo.DLR_CODE+that.formField.roleCode,
                  roleId: that.formField.roleId,
                  roleDesc: that.formField.roleDesc,
                  enabled: enabled
                };
              }
              //保存表单
              this.saveForm(saveObj);
            }
          }
        });
      }
    }
  }
};
</script>
 <style lang="scss" scoped>
/deep/ .el-col-16 .csslableName {
  width: 14.2%;
}

/deep/ .el-textarea {
  float: left;
  width: 90.6% !important;
}
</style>

