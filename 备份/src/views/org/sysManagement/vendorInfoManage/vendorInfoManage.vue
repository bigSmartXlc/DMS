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
      :dynamicIsInitTable="true"
      :dynamicIsColumnDrop="true"
    />

    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :userNameShow="userNameShow"
      :popupsState="editPopupsState"
      :isShowChooes="isShowChooes"
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
  name: "vendorInfoManage",
  // 组件混入对象
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
      userNameShow: false,
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgInfoQueryFactoryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          name: "search",
          position: "right",
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query") /*查询*/
        },
        // {
        //   compKey: "btnKey2",
        //   type: "",
        //   size: "small",
        //   name: "add",
        //   position: "left",
        //   hidden:true,
        //   clickEvent: () => this.add(),
        //   text: this.$t("sys.button.add") /*新增*/
        // },
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          name: "reset",
          position: "right",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset") /*重置*/
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
          .tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
              .tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.manufacturerCode") /*厂商编码*/,
                codeField: "orgCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.manufacturerName") /*厂商名称*/,
                codeField: "orgName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey4",
                labelName: this.$t("org.label.isEnable"),
                codeField: "isEnable",
                component: () => import("@/components/org/isEnable/isEnableOne"),
                type: "dropdownList",
                isMust: true
              } //是否启用
            ],
      // 动态生成网格列
      tableCols: this.getCols(),

      //表单查询数据
      formField: {
        orgCode: "",
        orgName: "",
        isEnable: ""
      },
      isShowChooes: false
    };
  },
  methods: {
    del() {},
    add() {
      this.editRowData = {};
      this.isShowChooes = true;
      this.userNameShow = false;
      this.showEdit("add");
    },
    edit(index) {
      var curIndex = index;
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
          curIndex = currentRow.index;
        }
      }

      if (curIndex === undefined || curIndex === null) {
        this.$alert("请选择需要修改的数据", "提示");
        return;
      }
      this.editRowData = that.list[curIndex];
      // this.isShowChooes = this.editRowData.isEnable === '0'

      if (this.editRowData.isEnable === "0") {
        this.isShowChooes = true;
      } else if (this.editRowData.isEnable === "1") {
        this.isShowChooes = false;
      }
      if (
        this.editRowData.userName != null ||
        this.editRowData.userName != ""
      ) {
        this.userNameShow = true;
      } else {
        this.userNameShow = false;
      }
      this.showEdit("edit");
    },
    getCols() {
      var cols = [
        // {
        //   prop: "controlBtn",
        //   label: this.$t("sys.content.operate") /*操作*/,
        //   codeField: "controlBtn",
        //   width: 60,
        //   align: "center",
        //   fixed: true,
        //   isComponent: true,
        //   comps: [
        //     {
        //       compKey: "propKey0",
        //       align: "center",
        //       labelName: this.$t("sys.button.edit") /*编辑*/,
        //       codeField: "editControlBtn",
        //       clickEvent: this.edit,
        //       component: () => import("@/components/org/linkButton")
        //     }
        //   ]
        // }
      ];
      if (
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
      ) {
        cols = cols.concat(
          this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
        );
      } else {
        cols = cols.concat([
          {
            prop: "orgCode",
            label: this.$t("org.label.manufacturerCode") /*厂商编码*/,
            width: null,
            align: "center"
          },
          {
            prop: "orgName",
            label: this.$t("org.label.manufacturerName") /*厂商名称*/,
            width: null,
            align: "center"
          },
          {
            prop: "isEnable",
            label: this.$t("org.label.isEnable") /*是否启用*/,
            width: null,
            align: "center",
             isComponent: true,
            comps: [
              {
                compKey: 'propKey0',
                codeField: 'isEnable',
                clickEvent: null,
                component: () =>
                  import('@/components/org/isEnable/isEnableText')
              }
            ]
          },
          {
            prop: "updateControlId",
            label: "并发控制",
            width: 0,
            align: "center",
            hidden: true
          },
          {
            prop: "roleId",
            label: "并发控制",
            width: 0,
            align: "center",
            hidden: true
          },
          {
            prop: "password",
            label: "并发控制",
            width: 0,
            align: "center",
            hidden: true
          },
          {
            prop: "userName",
            label: "并发控制",
            width: 0,
            align: "center",
            hidden: true
          },
          {
            prop: "orgId",
            label: "并发控制",
            width: 0,
            align: "center",
            hidden: true
          },
          {
            prop: "userId",
            label: "并发控制",
            width: 0,
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
