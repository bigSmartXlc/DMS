/**
* description: 系统通知场景 修改,增加弹窗
* author: dinggf
* createdDate: 2019-10-25
*/
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
        <div slot="footer" class="dialog-footer">
          <el-button
            v-for="comp in tableButtons"
            :key="comp.compKey"
            :type="comp.type"
          :icon="comp.icon"
            @click="comp.clickEvent"
          >{{comp.text}}</el-button>
        </div>
      </div>
      <one-table-template
        ref="multipleTable"
        :dynamicButtons="tableObj.tableButtons"
        :dynamicComponents="tableObj.tableComponents"
        :dynamicApiConfig="tableObj.apiConfig"
        :dynamicTableCols="tableObj.tableCols"
        :dynamicFormFields="tableObj.formField"
        :dynamicIsShowMoreBtn="false"
        :dynamicIsInitTable="true"
        :dynamicIsShowSelect="isShowSel"
      />
      <edit
        ref="multipleTable1"
        :dynamicEditRowData="editRowData"
        :popupsVisible="editPopupsVisible"
        :key="editPopupsKey"
        :receiveObj="receiveObj"
        :popupsState="editPopupsState"
        @closeNew="closeNew"
      ></edit>
    </el-dialog>
  </section>
</template>

<script>
import { isEmpty, getArrayFromArray } from "@/utils/index";
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/popupsOneTable";
export default {
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins, formMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./Inedit"),  dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
      sceneCode: { type: String, default: '-0.1' },
  },
  data() {
    return {
      // 场景编码
      receiveObj: this.sceneCode,
      isShowSel: false,
      //判断场景是否新增成功
      receiveObjState: 0,
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          name: "preservation",
          icon: "iconfont  icon-preservation",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.save") //保存
        },

        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          name: "reset",
          icon: "iconfont  icon-reset",
          clickEvent: () => this.reset1(),
          text: this.$t("sys.button.reset") //重置
        }
      ],
      // 动态组件-查询条件
      tableComponents: [],
      // 静态组件-查询条件
      staticTableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.sceneCoding"), //场景编码
          codeField: "sceneCode",
          disabled: !this.isAdd(),
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isRequire: true,
          isMust: true
        },
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.sceneName"), //场景名称
          codeField: "sceneDesc",
          disabled: !this.isAdd(),
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isRequire: true,
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.serviceModel"), //业务模块
          lookuptype: "DB0001",
          codeField: "belongto",
          isRequire: true,
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.sendingType"), //发送类型
          lookuptype: "LX063",
          codeField: "sendType",
          isRequire: true,
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMust: true
        },
        {
          compKey: "compKey5",
          labelName: this.$t("org.label.isEnable"), //是否启用
          codeField: "isEnable",
          isRequire: true,
          disabled: this.isAdd(),
          component: () => import("@/components/org/isEnable/isEnableOne"),
          type: "dropdownList",
          isMust: true
        }
      ],
      formField: {
        sceneId: "",
        sceneCode: "",
        sceneDesc: "",
        belongto: "",
        sendType: "2",
        updateControlId: "",
        isEnable: "1"
      },
      textMap: {
        edit: "通知信息修改",
        add: "通知信息增加"
      },
      texttitle: "通知提醒对象设置",
      //通知场景对象查询
      tableObj: {
        apiConfig: orgApis.mdsSysSceneSettingDQueryByPage,
        tableButtons: [
          {
            compKey: "btnKey3",
            type: "primary",
            size: "small",
            name: "search",
            clickEvent: () => this.queryTable(1),
            text: this.$t("sys.button.query") //搜索
          },
          {
            compKey: "btnKey4",
            type: "",
            size: "small",
            name: "add",
            clickEvent: () => this.Myadd(),
            text: this.$t("sys.button.add") //新增
          },
          {
            compKey: "btnKey5",
            type: "",
            size: "small",
            name: "reset",
            clickEvent: () => this.reset2(),
            text: this.$t("sys.button.reset") //重置
          }
        ],
        tableComponents: [
          {
            compKey: "compKey9",
            labelName: "通知场景对象设置", //对象类型
            codeField: "11",
            span: 18,
            component: () => import("@/components/org/label"),
            type: "textLabel",
            isMust: true
          },
          {
            compKey: "compKey6",
            labelName: "收件类型", //对象类型
            // lookuptype: "DB0001",
            codeField: "receiverType",
            component: () => import("./receiverType"),
            type: "dropdownList",
            isRequire: true,
            isMust: true
          },
          {
            compKey: "compKey7",
            labelName: "接收对象", //收件人
            codeField: "receiver",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          }
        ],
        tableCols: [
          {
            prop: "controlBtn",
            label: this.$t("sys.content.operate"), //操作
            codeField: "controlBtn",
            width: 50,
            align: "center",
            isComponent: true,
            comps: [
              {
                compKey: "propKey0",
                align: "center",
                labelName: "禁用", //编辑
                codeField: "editControlBtn",
                // clickEvent: this.edit,
                clickEvent: this.disable,
                component: () => import("@/components/org/linkButton")
              }
            ]
          },
          {
            prop: "receiver",
            label: "接收对象", //收件人
            width: null,
            align: "center"
          },

          {
            prop: "receiverCode",
            label: "接收对象编码", //收件人
            width: null,
            align: "center",
            hidden: true
          },
          {
            prop: "receiverType",
            label: "收件类型", //收件类型
            width: null,
            align: "center"
          },
          {
            prop: "receiverTypeCode",
            label: "收件类型编码", //收件类型
            width: null,
            align: "center",
            hidden: true
          },
          {
            prop: "isEnableName",
            label: "是否启用", //是否启用
            width: null,
            align: "center"
          },
          {
            prop: "isEnable",
            label: "是否启用", //是否启用
            width: null,
            hidden: true,
            align: "center"
          },
          {
            prop: "sceneDetailId",
            label: "是否启用", //是否启用
            width: null,
            hidden: true,
            align: "center"
          },
          {
            prop: "updateControlId",
            label: "是否启用", //是否启用
            width: null,
            hidden: true,
            align: "center"
          }
        ],
        formField: {
          receiverType: "1",
          receiver: "",
          receiveObj: this.sceneCode
          // receivePost: ""
        }
      }
    };
  },
  // created(){
  //   // this.queryTable()
  //   const that = this.$refs.multipleTable
  //   that.
  // },
  // created() {
  //   this.execCreated()
  // },
  methods: {
    Myadd(){

      if(this.receiveObjState != 1  && this.$parent.editPopupsState === "add"){
         {
            this.$message({
            message: "系统通知场景编码不存在，请先新增系统通知场景",
            type: "warning",
            duration: 2000
          });
           return
      }
      }

      this.add()
    },
    closeNew(type) {
      this.editPopupsVisible = false;
      if (this.resetDialogKey === true) {
        this.editPopupsKey = this.$utils.generateId();
      }
      if (type === "1") {
        this.queryTable(1);
      }
    },
    //禁用
    disable(index) {
      const that = this.$refs.multipleTable;
      const rowData = that.list[index]
      //let selectData = that.$refs.multipleTable.selection;
      // if (selectData && selectData.length < 1) {
      //   that.$message({
      //     message: "请选择要停用的通知场景对象",
      //     /*请选择需要停用的内饰色颜色*/ type: "warning",
      //     duration: 2000
      //   });
      //   return;
      // }
      // let length = selectData.length - 1;
      // for (let k = 0; k < selectData.length; k++) {
        let queryObj = {
          // 保存mutation
          type: "mutation",
          // api配置
          apiConfig: orgApis.mdsSysSceneSettingDMutationSave,
          variables: {
            //当前中台使用的名称有dataInfo、info，具体查看API文档
            dataInfo: {
              receiverType:  rowData.receiverTypeCode,
              receiver:  rowData.receiverCode,
              isEnable: "0",
              updateControlId:  rowData.updateControlId,
              sceneDetailId:  rowData.sceneDetailId,
              receiveObj: ""
            }
          }
        };
        //转换了中台请求格式数据
        var paramD = that.$getParams(queryObj);
        // 调用中台API方法（可复用）
        that.$requestAPI(paramD).then(response => {
          if (response.result === "1") {
             this.$message({
              message: this.$t("org.label.MSG.disableSuccess") /*成功*/,
              type: "success",
              duration: 2000
            });
          } else {
            msg = response.msg;
            that.$message({
              message: "停用失败",
              type: "warning",
              duration: 2000
            });
          }
            that.queryTable(1)
        });
      //}
    },
    // // 创建事件
    // execCreated() {
    //   if (this.initFormField === null) {
    //     this.initFormField = JSON.parse(JSON.stringify(this.formField))
    //   }
    //   var that = this
    //   if (that.tableComponents && that.tableComponents.length === 0) {
    //     if (that.popupsPageCode && that.popupsPageCode.length > 0) {
    //     // 读取弹窗配置信息
    //       Vue.prototype.$ConfigCache.CacheConfig.initData(that.popupsPageCode, function() {
    //         if (this.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode] && this.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].formComponents.length > 0) {
    //           that.tableComponents = this.$ConfigCache.CacheConfig.cacheData[that.popupsPageCode].formComponents
    //         } else {
    //           that.tableComponents = that.staticTableComponents
    //         }
    //         that.popupsTableKey = that.$utils.generateId()
    //         that.toWatch()
    //       }, null, that)
    //     } else {
    //       that.tableComponents = that.staticTableComponents
    //       that.toWatch()
    //     }
    //   } else {
    //     that.toWatch()
    //   }
    // },
    // toWatch() {
    //   // 赋值formField
    //   if (this.popupsState === 'edit') {
    //     if (this.isUseRowData) {
    //       for (var key in this.formField) {
    //         if (this.dynamicEditRowData[key]) {
    //           this.formField[key] = this.dynamicEditRowData[key]
    //         } else {
    //           if (this.initFormField[key]) {
    //             this.formField[key] = this.initFormField[key]
    //           } else {
    //             if (typeof this.formField[key] === 'number') {
    //               this.formField[key] = 0
    //             } else if (typeof this.formField[key] === 'string') {
    //               this.formField[key] = ''
    //             }
    //           }

    //           // 两层处理
    //           for (var rKey in this.dynamicEditRowData) {
    //             if (rKey.indexOf('.') > -1) {
    //               var tmpKey = rKey.split('.')[1]
    //               if (tmpKey === key) {
    //                 this.formField[tmpKey] = this.dynamicEditRowData[rKey]
    //                 break
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   } else {
    //     this.emptyFormField()
    //   }

    //   this.onCreated()

    //   // 备份fromField（用于重置）
    //   // 初始化品牌
    //   if (this.formField.carBrandCode === '' && this.isSetDefaultBrand === true) {
    //     this.formField.carBrandCode = this.$store.getters.orgInfo.BRAND_CODE
    //   }
    //   this.backFormField = JSON.parse(JSON.stringify(this.formField))

    //   // 联动组件获取父组件传值
    //   const that = this
    //   if (this.hasSetWatch === false) {
    //     this.hasSetWatch = true
    //     that.$nextTick(() => {
    //     // 监听
    //       that.watchComp(true)
    //     })
    //   }
    // },
    reset1() {
      if(this.popupsState !== 'edit'){
        for (var key in this.formField) {
        if(key !== "isEnable"){
        this.formField[key] = "";
        }
      }
      }else{

      for (var key in this.formField) {
        if(key == "sceneCode" || key == "sceneDesc"){
          continue
        }
        this.formField[key] = "";
      }
    }
    },

    getParams(queryObj) {
      // API请求类型与参数
      var queryStr = queryObj.type || "query";
      if (queryObj.typeParam) {
        queryStr += queryObj.typeParam;
      } else if (queryObj.variables.dataInfo && queryObj.apiConfig) {
        if (queryObj.type === "mutation") {
          // mutationAPI不需要pageIndex/pageSize
          if (!isEmpty(queryObj.apiConfig.InputType)) {
            queryStr += "($dataInfo: " + queryObj.apiConfig.InputType + ")";
          }
        } else {
          queryStr += "($pageIndex: Int, $pageSize: Int";
          if (!isEmpty(queryObj.apiConfig.InputType)) {
            queryStr += ", $dataInfo: " + queryObj.apiConfig.InputType;
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
              queryStr += "(dataInfo: $dataInfo)";
            }
          } else {
            queryStr += "(";
            if (!isEmpty(queryObj.apiConfig.InputType)) {
              queryStr += "dataInfo: $dataInfo, ";
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
          !queryObj.variables.dataInfo &&
          queryStr.indexOf("$dataInfo") > -1
        ) {
          queryObj.variables.dataInfo = {};
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
      this.receiveObjState = 0
      //通知场景保存
      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.mdsSysSceneSettingMutationSaveById,
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: this.formField
      };
      //转换了中台请求格式数据
      var paramD = this.getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          that.listLoading = false;
          that.$message({
            message: "保存成功",
            type: "success",
            duration: 2000
          });
          //保存成功
          this.receiveObjState = 1
          this.sendCode("1");
        } else {
          let msg = response.msg;
          this.$message({
            message: msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    save2() {
      // for (var key in this.tableObj.formField) {
      //   if (this.tableObj.formField[key] == "") {
      //     this.$message({
      //       message: "不能为空",
      //       type: "error",
      //       duration: 1000
      //     });
      //     return;
      //   }
      // }
      const that = this.$refs.multipleTable;
      that.listLoading = true;
      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.mdsSysSceneSettingDMutationSave,
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.dynamicFormFields
        }
      };
      //转换了中台请求格式数据
      var paramD = this.$refs.multipleTable.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          this.$refs.multipleTable.queryTable(
            1,
            null,
            1,
            this.tableObj.formField
          );
          that.listLoading = false;
          that.$message({
            message: "保存成功",
            type: "success",
            duration: 2000
          });
        } else {
          this.$message({
            message:
              "保存失败：" + response.msg,
            type: "warn",
            duration: 2000
          });
        }
      });
    },
    reset2() {
      for (var key in this.tableObj.formField) {
        this.tableObj.formField[key] = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// /deep/ .el-dialog__body section {
//   position: relative;
// }
// /deep/ .el-dialog__footer {
//   position: absolute;
//   right: 30px;
//   top: -4px;
// }
</style>
