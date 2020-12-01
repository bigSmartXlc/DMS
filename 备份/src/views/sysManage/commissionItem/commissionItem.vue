<!--
* description: 待办事项设置
* author: mwhao
* createdDate: 2019-12-23
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :key="oneTableKey"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicIsShowSelect="false"
      :dynamicIsInitTable="true"
      :dynamicIsColumnDrop="false"
      :isSetDefaultBrand="false"
    />

    <edit
      ref="edit"
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      :isSetDefaultBrand="false"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";

export default {
  name: "orgBrandManage",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path, "commissionIeemEdit"],
      function() {
        next();
      }
    );
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path;
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode]);
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.mdsSysRemindDBizQueryFindAll,
      // 动态组件-按钮
      tableButtons: [

        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query"),
          name: "search",
          position: "right",
          fuzzySearch: true,
          isMust: false
        },// 查询

        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
          text: this.$t("sys.button.newAdd"),
          name: "add",
          position: "left"
        }, // 新增

        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset"),
          name: "reset",
          position: "right"
        },// 重置

          {
          compKey: "btnKey4",
          type: "",
          size: "small",
          clickEvent: () => this.copyComp(),
          text: "复制组件",
          position:'left'
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
              .tableComponents
          : [
              //品牌名称
              {
                compKey: "compKey2",
                labelName: "待办事项名称",
                codeField: "remindName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              // 是否启用
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.isAble"),
                codeField: "isEnable",
                clearable: false,
                component: () => import("@/components/org/isEnable/isEnable"),
                type: "dropdownList",
                isMust: true
              }
            ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
              // 操作
              {
                prop: "controlBtn",
                label: this.$t("sys.content.operate"),
                codeField: "controlBtn",
                width: 80,
                align: "center",
                fixed: true,
                isComponent: true,
                //  编辑
                comps: [
                  {
                    compKey: "propKey0" /*, rowFileds: 'show:isEnable--0'*/,
                    labelName: this.$t("sys.button.edit"),
                    codeField: "editControlBtn",
                    clickEvent: this.edit,
                    component: () => import("@/components/org/linkButton")
                  }
                ]
              },
              //待办事项名称
              {
                prop: "remindName",
                label: "待办事项名称",
                width: null,
                align: "center"
              },
              //待办事项描述
              {
                prop: "remindDesc",
                label: "待办事项描述",
                width: null,
                align: "center"
              },
              //对应服务
              {
                prop: "remindUrl",
                label: "对应服务",
                width: null,
                align: "center"
              },
              //页面对应菜单
              {
                prop: "menuName",
                label: "页面对应菜单",
                width: null,
                align: "center"
              },
              //对应系统岗位/接受对象类型名称
              {
                prop: "receiveObjTypeName",
                label: "对应系统岗位",
                width: null,
                align: "center"
              },
              //对应系统岗位/接受对象类型名称ID
              {
                prop: "receiveObjType",
                label: "接受对象类型名称ID",
                width: null,
                align: "center",
                hidden: true
              },
              // 对应菜单id
              {
                prop: "menuId",
                label: "对应菜单id",
                width: null,
                align: "center",
                hidden: true
              },
              // 接受对象ID/系统岗位选择id
              {
                prop: "receiveObjId",
                label: "接受对象ID",
                width: null,
                align: "center",
                hidden: true
              },
              // 接受对象名称/系统岗位选择名称
              {
                prop: "receiveObjName",
                label: "接受对象名称",
                width: null,
                align: "center"
              },
              // 待办事项id
              {
                prop: "remindId",
                label: "待办事项id",
                width: null,
                align: "center",
                hidden: true
              },
              // 对应岗位id
              {
                prop: "receiveObjId",
                label: "对应岗位id",
                width: null,
                align: "center",
                hidden: true
              },
              // 参数
              {
                prop: "remindParam",
                label: "参数",
                width: null,
                align: "center",
                hidden: true
              },
              // 是否启用
              {
                prop: "isEnable",
                label: this.$t("org.label.isAble"),
                width: null,
                align: "center",
                hidden: false
              }
            ],
      // 表单查询数据
      formField: this.$utils.getFormField(
        this,
        {
          remindName: "",
          isEnable: ""
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      // 复制组件参数
      copyCompList:{
          senceCode: "PRC_REMIND_003", //03 新增  , 04 编辑
          remindName: "",
          remindDesc: "",
          menuId: "",
          isEnable: "",
          remindUrl: "",
          remindParam: "",
      },
      rows:[
        {
          receiveObjId: "",
          receiveObjType: ""
        }
      ],
      // 保存API配置对象
      apiConfigSave: orgApis.mdmSysRemindMMutaionSave,
    };
  },
  methods: {
    // 网格点击事件
    selectRowsData(val){
        this.copyCompList.remindName=val.remindName
        this.copyCompList.remindDesc=val.remindDesc
        this.copyCompList.remindUrl=val.remindUrl
        this.rows[0].receiveObjType=val.receiveObjType
        this.copyCompList.menuId=val.menuId
        this.rows[0].receiveObjId=val.receiveObjId
        this.copyCompList.remindParam=val.remindParam
        this.copyCompList.isEnable=val.isEnable
    },
    // 复制组件
    copyComp(){
        this.$confirm('此操作将复制网格行数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.saveForm(this.copyCompList,this.rows)
        })
    },
  // 保存的方法
  saveForm(formField1, rows) {
      var that = this;
      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: this.apiConfigSave,
        // 需要调用的API服务配置
        apiServices: [
          {
            // API服务编码&参数
            apiServiceCode: this.apiConfigSave.ServiceCode,
            apiServiceParam: "(dataInfo: $dataInfo, rows:$rows)",
            // 表格中台返回网格的字段
            apiQueryRow: []
          }
        ],
        typeParam:
          "($dataInfo:" +
          this.apiConfigSave.InputType +
          "," +
          "$rows:" +
          this.apiConfigSave.InputType1 +
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
            message: "复制成功",
            type: "success"
          });
          this.$nextTick(()=>{
             this.queryTable(1)
          })
        }
      });
    },
    close(type) {
      this.editPopupsVisible = false;
      if (this.resetDialogKey === true) {
        this.editPopupsKey = this.$utils.generateId();
      }
      if (type === "1") {
        this.queryTable(1);
      }
    }
  }
};
</script>
