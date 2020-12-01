<template>
  <section class="editModule">
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
import { isEmpty, getArrayFromArray } from "@/utils/index";
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
export default {
  // 组件混入对象
  mixins: [formMixins],
   components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      apiConfig: orgApis.mdsSysMsgModuleMutationSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.save(),
          icon: "iconfont  icon-preservation",
          text: this.$t("sys.button.save")
        }, // '保存'
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          icon: "iconfont  icon-reset",
          text: this.$t("sys.button.reset")
        }, //重置
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          icon: "iconfont  icon-cancel",
          clickEvent: () => this.sendCode("0"),
          text: this.$t("sys.button.cancel") //取消
        }
      ],
      // 动态组件-查询条件
      tableComponents: [],
      // 静态组件-查询条件
      staticTableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.ModuleCode") /*模板编码 */,
          codeField: "moduleCode",
          isRequire:true,
          disabled: !this.isAdd(),
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.ModuleName") /* 模板名称 */,
          codeField: "moduleName",
          isRequire:true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.BelongtoCode") /* 业务模块 */,
          lookuptype: "DB0001",
          codeField: "belongtoCode",
          isRequire:true,
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.isEnable") /* 是否启用 */,
          codeField: "isEnable",
          isRequire:true,
          component: () => import("@/components/org/isEnable/isEnableOne"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey5",
          labelName: this.$t("org.label.ModuleTitle") /* 模板标题信息 */,
          codeField: "titleModule",
          isRequire:true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey6",
          labelName: this.$t("org.label.ModuleContent") /* 模板内容信息 */,
          codeField: "contentModule",
          isRequire:true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }
      ],
      textMap: {
        edit: "通知信息修改",
        add: "通知信息增加"
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        moduleCode: "",
        moduleName: "",
        moduleId:"",
        belongtoCode: "",
        isEnable: "",
        titleModule: "",
        contentModule: ""
      }
    };
  },
  methods: {
    getParams(queryObj) {
      // API请求类型与参数
      var queryStr = queryObj.type || "query";
      if (queryObj.typeParam) {
        queryStr += queryObj.typeParam;
      } else if (queryObj.variables.info && queryObj.apiConfig) {
        if (queryObj.type === "mutation") {
          // mutationAPI不需要pageIndex/pageSize
          if (!isEmpty(queryObj.apiConfig.InputType)) {
            queryStr += "($info: " + queryObj.apiConfig.InputType + ")";
          }
        } else {
          queryStr += "($pageIndex: Int, $pageSize: Int";
          if (!isEmpty(queryObj.apiConfig.InputType)) {
            queryStr += ", $info: " + queryObj.apiConfig.InputType;
          }
          queryStr += ")";
        }
      }

      queryStr += "{";

      if (!queryObj.apiServices) {
        queryObj.apiServices = [{}];
      }

      // API请求URL
      if (!queryObj.apiUrl && queryObj.apiConfig) {
        if (
          typeof queryObj.apiConfig === "object" &&
          queryObj.apiConfig instanceof Array
        ) {
          queryObj.apiUrl = queryObj.apiConfig[0].APIUrl;
        } else {
          queryObj.apiUrl = queryObj.apiConfig.APIUrl;
          queryObj.specailCode = queryObj.apiConfig.SpecailCode || "";
        }
      }
      // 模拟请求url标识
      if (queryObj.apiServices.length > 1) {
        var tmpSCode = "";
        for (var j = 0; j < queryObj.apiServices.length; j++) {
          tmpSCode += queryObj.apiServices[j].apiServiceCode + ",";
        }
        queryObj.serviceCode = tmpSCode;
      } else {
        queryObj.serviceCode =
          queryObj.apiServices[0].apiServiceCode ||
          queryObj.apiConfig.ServiceCode;
      }

      // 合并多个请求
      // 注：如果是合并请求，必须为每个apiServices.apiServiceParam设置值，否则判断apiConfig.InputType不为空后统一使用dataInfo
      for (var x = 0; x < queryObj.apiServices.length; x++) {
        // API服务编码与参数
        queryStr +=
          (queryObj.apiServices.length > 1
            ? String.fromCharCode(65 + x) + ":"
            : "") +
          (queryObj.apiServices[x].apiServiceCode ||
            queryObj.apiConfig.ServiceCode);
        if (queryObj.apiServices[x].apiServiceParam) {
          queryStr += queryObj.apiServices[x].apiServiceParam;
        } else {
          if (queryObj.type === "mutation") {
            if (!isEmpty(queryObj.apiConfig.InputType)) {
              queryStr += "(info: $info)";
            }
          } else {
            queryStr += "(";
            if (!isEmpty(queryObj.apiConfig.InputType)) {
              queryStr += "info: $info, ";
            }
            queryStr += "pageIndex: $pageIndex, pageSize: $pageSize";
            queryStr += ")";
          }
        }
        queryStr += "{";

        // 排除rows外的其它字段（当为null时默认根据query/mutation返回对应字段）
        if (
          queryObj.apiServices[x].serviceFields === undefined ||
          queryObj.apiServices[x].serviceFields === null
        ) {
          if (queryObj.type === "mutation") {
            queryObj.apiServices[x].serviceFields = "msg result";
          } else {
            queryObj.apiServices[x].serviceFields =
              "msg pageindex pages records result";
          }
        }
        queryStr += queryObj.apiServices[x].serviceFields;

        // rows
        if (
          queryObj.apiServices[x].apiQueryRow &&
          queryObj.apiServices[x].apiQueryRow.length > 0
        ) {
          var needConvert = false;
          for (var i = 0; i < queryObj.apiServices[x].apiQueryRow.length; i++) {
            if (queryObj.apiServices[x].apiQueryRow[i].indexOf(".") > 0) {
              needConvert = true;
              break;
            }
          }
          // 自动转换参数结构
          if (needConvert)
            queryObj.apiServices[x].apiQueryRow = getArrayFromArray(
              queryObj.apiServices[x].apiQueryRow
            );
          if (queryObj.apiServices[x].apiQueryRow.length !== 0) {
            queryStr += " rows{";
            for (
              var i = 0;
              i < queryObj.apiServices[x].apiQueryRow.length;
              i++
            ) {
              queryStr += queryObj.apiServices[x].apiQueryRow[i] + " ";
            }
            queryStr = queryStr.substr(0, queryStr.length - 1);
            queryStr = queryStr + "}";
          }
        }

        // 当前请求结束
        queryStr = queryStr + "}";
      }
      queryStr = queryStr + "}";

      // 设置分页参数默认值
      if (queryObj.variables) {
        if (
          !queryObj.variables.pageIndex &&
          queryStr.indexOf("$pageIndex") > -1
        ) {
          queryObj.variables.pageIndex = 1;
          queryObj.variables.pageSize = 1000;
        }

        if (
          !queryObj.variables.info &&
          queryStr.indexOf("$dataInfo") > -1
        ) {
          queryObj.variables.info = {};
        }
      }
      var finalParam = {
        query: queryStr,
        variables: queryObj.variables,
        apiUrl: queryObj.apiUrl,
        serviceCode: queryObj.serviceCode,
        specailCode: queryObj.specailCode || ""
      };
      return finalParam;
    },
    save() {
      const that = this;
      //通知场景保存
      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.mdsSysMsgModuleMutationSave,
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: this.formField
          //当前中台使用的名称有dataInfo、info，具体查看API文档
      };
      //转换了中台请求格式数据
      var paramD = this.getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          that.listLoading = false;
          that.$message({
            message: "保存成功",
            type: "success",
            duration: 2000
          });
          this.sendCode("1");
        }
        else {
           let msg = response.msg;
            this.$message({
              message: msg,
              type: 'warning',
              duration: 2000
            });
          }
      });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .filter-params .el-col-11 label {
  margin-left: 10px;
}
/deep/ .filter-params .el-col {
  margin-bottom: 20px;
}
/deep/ .filter-params .el-col-18 label {
  width: 128px;
  margin-right: 10px;
}
</style>
