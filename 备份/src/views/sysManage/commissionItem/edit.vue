<!--
* description: 待办事项设置-新增、修改弹窗
* author: mwhao
* createdDate: 2019-12-23
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
            :text="formField[comp.textField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :isMul="comp.isMul"
            :parentFileds="comp.parentFileds"
            :isShow="comp.isShow"
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
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
      <div class="rule">
        <div class="fontClass">(备注：对应服务地址/参数 需传递JSON格式字符串)</div>
        <div class="fontvarClass">
          开始时间:#startDate#,结束时间: #endDate#,开始时间(1个月):#startMonth#,结束时间(1个月):#endMonth#,
          <br />当天: #oneDate#, 所属品牌: #BRAND_CODE#
          经销商ID: #DLR_ID#, 员工ID: #EMP_ID, 用户ID: #userId#,
          <br />
        </div>
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
    const viewPageCode = "commissionIeemEdit";
    return {
      // 弹窗页面标识
      popupsPageCode: viewPageCode,
      // 保存API配置对象
      apiConfig: orgApis.mdmSysRemindMMutaionSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          clickEvent: () => this.save(),
          text: "确认"
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: "重置"
        },
        {
          compKey: "btnKey1",
          type: "",
          size: "small",
          clickEvent: () => this.sendCode(),
          text: "取消"
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].formComponents
          : [
              //待办事项名称
              {
                compKey: "compKey1",
                labelName: "待办事项名称",
                codeField: "remindName",
                isRequire: true,
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                disabled: null,
                isMust: true
              },
              // 对应服务地址
              {
                compKey: "compKey2",
                labelName: "对应服务地址",
                codeField: "remindUrl",
                isRequire: true,
                // validrule: { isword: true }, 中文验证
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              // 对应菜单 (弹框)
              {
                compKey: "compKey3",
                labelName: "对应菜单",
                codeField: "menuId",
                textField: "menuName",
                isRequire: true,
                component: () => import("@/components/org/correspondingMenu"),
                type: "propus",
                isMust: true
              },
              // 接收对象类型(下拉框)
              {
                compKey: "compKey4",
                labelName: "接收对象类型",
                codeField: "receiveObjType",
                textField: "receiveObjTypeName",
                component: () =>
                  import(
                    "@/views/sysManage/commissionItem/receptionOption.vue"
                  ),
                type: "dropdownList",
                isRequire: true,
                isMust: true,
                isMul: false
              },
              // 用户选择弹窗(弹窗)
              {
                compKey: "compKey11",
                labelName: "用户选择",
                codeField: "receiveObjId1",
                textField: "receiveObjName1",
                component: () =>
                  import("@/views/sysManage/commissionItem/user.vue"),
                type: "propus",
                isRequire: true,
                isMust: true,
                parentFileds: "show:receiveObjType-1",
                isMul: false,
                isShow: false
              },
              // 业务岗位选择(弹窗)
              {
                compKey: "compKey10",
                labelName: "业务岗位选择",
                codeField: "receiveObjId2",
                textField: "receiveObjName2",
                component: () => import("@/components/org/position"),
                type: "propus",
                isRequire: true,
                parentFileds: "show:receiveObjType-2",
                isMust: true,
                isMul: false,
                isShow: false
              },
              // 系统岗位选择(弹窗)
              {
                compKey: "compKey5",
                labelName: "系统岗位选择",
                parentFileds: "show:receiveObjType-3",
                codeField: "receiveObjId3",
                textField: "receiveObjName3",
                component: () => import("@/components/org/systemSeleapiConfig"),
                type: "propus",
                isRequire: true,
                isMust: true,
                isMul: false,
                isShow: false
              },

              // 参数
              {
                compKey: "compKey6",
                labelName: "参数",
                codeField: "remindParam",
                isRequire: true,
                // validrule: { isword: true }, 中文验证
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              // 待办事项描述
              {
                compKey: "compKey7",
                labelName: "待办事项描述",
                codeField: "remindDesc",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              // 是否启用
              {
                compKey: "compKey8",
                labelName: this.$t("org.label.isAble"),
                codeField: "isEnable",
                // isRequire: true,
                component: () => import("@/components/org/isEnable/isEnable"),
                type: "dropdownList",
                isMust: true
              },
              // 待办事项id
              {
                compKey: "compKey9",
                labelName: "待办事项id",
                codeField: "remindId",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isShowLabel: false
              }
            ],
      // 静态组件-查询条件
      staticTableComponents: [],
      // 标题
      textMap: {
        edit: "待办事项编辑",
        add: "待办事项新增"
      },
      // 场景编码
      senceCode: {
        edit: "PRC_REMIND_004",
        add: "PRC_REMIND_003"
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: this.$utils.getFormField(
        this,
        {
          senceCode: "", //03 新增  , 04 编辑
          remindId: "", // 新增不需要,修改必填
          remindName: "",
          remindDesc: "",
          menuId: "",
          menuName: "",
          isEnable: "",
          remindUrl: "",
          remindParam: "",
          receiveObjType: "",
          receiveObjTypeName: "",
          receiveObjId: "",
          receiveObjId1: "",
          receiveObjId2: "",
          receiveObjId3: "",
          receiveObjName: "",
          receiveObjName1: "",
          receiveObjName2: "",
          receiveObjName3: ""
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode],
        null,
        "formComponents"
      )
    };
  },
  watch: {
    //  判断对应系统岗位类型 赋值     receiveObjType 1:代表用户 2:代表业务岗位  3:系统岗位
    curPopupsVisible(val) {
      var form = this.formField;
      if (form.receiveObjType === "1") {
        form.receiveObjId1 = form.receiveObjId;
        form.receiveObjName1 = form.receiveObjName;
      } else if (form.receiveObjType === "2") {
        form.receiveObjId2 = form.receiveObjId;
        form.receiveObjName2 = form.receiveObjName;
      } else if (form.receiveObjType === "3") {
        form.receiveObjId3 = form.receiveObjId;
        form.receiveObjName3 = form.receiveObjName;
      }
    }
  },
  methods: {
    //保存
    save() {
      const that = this;
      var formField1 = {
        senceCode: this.senceCode[this.$props.popupsState],
        remindId: this.formField.remindId, // 新增不需要,修改必填
        remindName: this.formField.remindName,
        remindDesc: this.formField.remindDesc,
        menuId: this.formField.menuId,
        isEnable: this.formField.isEnable,
        remindUrl: this.formField.remindUrl,
        remindParam: this.formField.remindParam
      };
      var rows = [
        {
          receiveObjId: this.formField.receiveObjId,
          receiveObjType: this.formField.receiveObjType
        }
      ];
      // 用户/岗位/系统 参数赋值
      if (rows[0].receiveObjType === "1") {
        rows[0].receiveObjId = this.formField.receiveObjId1;
      } else if (rows[0].receiveObjType === "2") {
        rows[0].receiveObjId = this.formField.receiveObjId2;
      } else if (rows[0].receiveObjType === "3") {
        rows[0].receiveObjId = this.formField.receiveObjId3;
      }

      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        var json = that.isJSON(formField1.remindParam);
        var json1 = that.isJSON(formField1.remindUrl);
        // 判断是否为json
        if (json && json1) {
          //保存表单
          this.saveForm(formField1, rows);
        } else {
          this.$message({
            message: "对应服务地址/参数 请输入正确格式",
            type: "warning"
          });
        }
      }
    },
    // 保存api
    saveForm(formField1, rows) {
      var that = this;
      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: this.apiConfig,
        // 需要调用的API服务配置
        apiServices: [
          {
            // API服务编码&参数
            apiServiceCode: this.apiConfig.ServiceCode,
            apiServiceParam: "(dataInfo: $dataInfo, rows:$rows)",
            // 表格中台返回网格的字段
            apiQueryRow: []
          }
        ],
        typeParam:
          "($dataInfo:" +
          this.apiConfig.InputType +
          "," +
          "$rows:" +
          this.apiConfig.InputType1 +
          ")",

        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: formField1 || this.formField,
          rows: rows
        }
      };
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          this.$message({
            message: "操作成功",
            type: "success"
          });
          this.$emit("close", "1");
        }
      });
    },
    // 判断是否为josn字符串
    isJSON(str) {
      if (typeof str == "string") {
        try {
          var obj = JSON.parse(str);
          if (typeof obj == "object" && obj) {
            return true;
          } else {
            return false;
          }
        } catch (e) {
          return false;
        }
      }
    },
    // 重置
    reset() {
      this.backFormField = JSON.parse(JSON.stringify(this.dynamicEditRowData));
      if (this.backFormField.receiveObjType === "1") {
        this.backFormField.receiveObjId1 = this.backFormField.receiveObjId;
        this.backFormField.receiveObjName1 = this.backFormField.receiveObjName;
      } else if (this.backFormField.receiveObjType === "2") {
        this.backFormField.receiveObjId2 = this.backFormField.receiveObjId;
        this.backFormField.receiveObjName2 = this.backFormField.receiveObjName;
      } else if (this.backFormField.receiveObjType === "3") {
        this.backFormField.receiveObjId3 = this.backFormField.receiveObjId;
        this.backFormField.receiveObjName3 = this.backFormField.receiveObjName;
      }
      this.$utils.deepClone(this.formField, this.backFormField);
      this.$utils.resetMulComp(this);
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .fontClass {
  // position: absolute;
  // left: 15px;
  // bottom: 50px;
  color: #f00;
}
/deep/ .fontvarClass {
  position: absolute;
  left: 15px;
  bottom: 0px;
  color: #f00;
}
/deep/ .rule{
  padding-left: 15px;
}
</style>
