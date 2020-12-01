<!--/**
* description: 系统通知模板定义
* author: dinggf
* createdDate: 2019-10-24
*/-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicIsShowSelect="false"
      :dynamicIsShowMoreBtn="false"
      :dynamicIsInitTable="true"
      :key="tableKey"
    />
    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :sysMsgModuleObjProp="sysMsgModuleObjProp"
      :popupsState="editPopupsState"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { isEmpty, getArrayFromArray } from "@/utils/index";
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins';
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";

export default {
  name: "mdsSysMsgModule",
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(to.path, function() {
      next();
    });
  },
  data() {
    return {
      // isMulFlag: false,
      // dialogList: null,
      // 网格查询API配置对象
      apiConfig: orgApis.mdsSysMsgModuleQueryByPage,
      formField: {
        moduleName: "",
        moduleCode: "",
        belongtoCode: "",
        isEnable: ''
      },
      tableKey:"tableKey",
      sysMsgModuleObjProp: {
        moduleId: "",
        moduleCode: "",
        moduleName: "",
        belongtoCode: "",
        isEnable: "",
        titleModule: "",
        contentModule: ""
      },
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          name: 'search',
          position: 'right',
          fuzzySearch: true,
          clickEvent: () => this.queryTable(1),
          text:  this.$t("sys.button.query")  //查询
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          name: 'add',
          position: 'left',
          clickEvent: () => this.add(),
          text: this.$t("sys.button.add")  //新增
        },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          name: 'reset',
          position: 'right',
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset") //重置
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.ModuleCode"), /*模板编码 */
                codeField: "moduleCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                fuzzySearch: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.ModuleName"), /* 模板名称 */
                codeField: "moduleName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.BelongtoCode"), /* 业务模块 */
                lookuptype: "DB0001",
                codeField: "belongtoCode",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: true
              },
              {
                compKey: "compKey4",
                labelName: this.$t("org.label.isEnable"), /* 是否启用 */
                codeField: "isEnable",
                component: () => import("@/components/org/isEnable/isEnableOne"),
                type: "dropdownList",
                isMust: true
              },
            ],
      // 动态生成网格列
      tableCols: this.getCols(),
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
      handDialogVisibleFunc(val) {
      this.dialogVisible = val;
    },
    //禁用启用
    controlEnable(comType) {
      var curIndex = comType;
      const that = this.$refs.multipleTable;
      if (curIndex === undefined || curIndex === null) {
        var currentRow;
        if (that.isMul === true) {
          // 多选
          var selectData = that.selection;
          if (selectData.length > 0) {
            currentRow = selectData[0];
          }
        } else {
          // 单选
          currentRow = that.currentRow;
        }
        if (currentRow) {
          curIndex = currentRow.comType;
        }
      }
      var row = that.list[curIndex];
      if (curIndex === undefined || curIndex === null) {
        if (row.isEnable == "1") {
          this.$alert("请选择需要禁用的数据", "提示");
          return;
        } else if ((row.isEnable = "0")) {
          this.$alert("请选择需要启用的数据", "提示");
          return;
        }
      }
      if (row.isEnable == "1") {
        this.sysMsgModuleObjProp = {
          moduleId: row.moduleId,
          moduleCode: row.moduleCode,
          moduleName: row.moduleName,
          belongtoCode: row.belongtoCode,
          titleModule: row.titleModule,
          contentModule: row.contentModule,
          isEnable: "0"
        };
      } else if ((row.isEnable = "0")) {
        this.sysMsgModuleObjProp = {
          moduleId: row.moduleId,
          moduleCode: row.moduleCode,
          moduleName: row.moduleName,
          belongtoCode: row.belongtoCode,
          titleModule: row.titleModule,
          contentModule: row.contentModule,
          isEnable: "1"
        };
      }
      this.save1();

    },
    //保存
    save1() {
      const that = this;
      //通知场景保存
      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.mdsSysMsgModuleMutationSave,
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          info: that.sysMsgModuleObjProp
        }
      };
    //转换了中台请求格式数据
      var paramD = this.getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          that.listLoading = false;
          if (that.sysMsgModuleObjProp.isEnable == "1") {
            that.$message({
              message: "启用成功",
              type: "success",
              duration: 2000
            });
          } else if (that.sysMsgModuleObjProp.isEnable == "0") {
            that.$message({
              message: "禁用成功",
              type: "success",
              duration: 2000
            });
          }
          this.tableKey = this.tableKey + 1;

        }
      });
    },
    getCols() {
      var cols = [
        {
          prop: "controlBtn",
          label: this.$t("sys.content.operate"),//操作
          codeField: "controlBtn",
          width: 100,
          align: "center",
         isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              align: "center",
              labelName: this.$t("sys.button.edit"),//编辑
              codeField: "editControlBtn",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton")
            },
            // {
            //   compKey: "propKey2",
            //   align: "center",
            //   labelName: this.$t("org.label.prohibit"),//禁用
            //   compareField: "isEnable",
            //   compareValue: "1",
            //   codeField: "disEnableControlBtn",
            //   clickEvent: this.controlEnable,
            //   component: () => import("@/components/org/linkButton")
            // },
            // {
            //   compKey: "propKey3",
            //   labelName: this.$t("org.label.enable"),//启用
            //   compareField: "isEnable",
            //   compareValue: "0",
            //   codeField: "enableControlBtn",
            //   clickEvent: this.controlEnable,
            //   component: () => import("@/components/org/linkButton")
            // }
          ]
        }
      ];
      if (
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols.length > 0
      ) {
        cols = cols.concat(this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols);
      } else {
        cols = cols.concat([
          {
            prop: "moduleId",
            label: "模板ID",
            width: null,
            align: "center",
            hidden: true
          },
          {
            prop: "moduleCode",
            label: this.$t("org.label.ModuleCode"), /* 模板编码 */
            width: null,
            align: "center"
          },
          {
            prop: "moduleName",
            label: this.$t("org.label.ModuleName"), /* 模板名称 */
            width: null,
            align: "center"
          },
          {
            prop: "belongtoCode",
            label: this.$t("org.label.BelongtoCode"), /* 业务模块 */
            width: null,
            hidden:true,
            align: "center",
          },
          {
            prop: "belongtoCodeName",
            label: this.$t("org.label.BelongtoCode"), /* 业务模块 */
            width: null,
            align: "center",
          },
          {
            prop: "titleModule",
            label: this.$t("org.label.ModuleTitle"), /* 模板标题 */
            width: null,
            align: "center",
            hidden:false
          },
          {
            prop: "contentModule",
            label: this.$t("org.label.ModuleContent"), /* 内容模板 */
            width: null,
            align: "center",
            hidden:false
          },

          {
            prop: "moduleId",
            label: this.$t("org.label.BelongtoCode"), /* 业务模块Id */
            width: null,
            hidden:true,
            align: "center"
          },
          { prop: "isEnable",
          label:this.$t("org.label.isEnable"),
           width: null,
           align: "center" ,
           isComponent: true,
            comps: [
              {
                compKey: "propKey0",
                codeField: "isEnable",
                clickEvent: null,
                component: () =>
                  import("@/components/org/isEnable/isEnableText")
              }
            ]
           },/* 是否启用 */
          {
            prop: "updateControlId",
            label: this.$t("org.label.concurrencyControl"),//并发控制
            width: null,
            align: "center",
            hidden: true
          }
        ]);
      }
      return cols;
    }
  }
};
</script>
