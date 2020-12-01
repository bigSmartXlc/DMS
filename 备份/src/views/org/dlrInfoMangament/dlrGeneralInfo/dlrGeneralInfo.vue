<!--
* description: 经销商通用部门管理
* author: zhhx
* createdDate: 2019-10-25
-->
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
      :dynamicIsShowMoreBtn="true"
    />

    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
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
  name: "orgDlrGeneralInfo",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },

  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path,'veDlrGeneralInfo-Edit'], function() {
      next();
    });
  },

  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgDeptQueryFindAll,
      // 动态组件-按钮
      clickRowsData: {},
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(1),
          name: "search",
          position: "right",
          fuzzySearch: true,
          text: this.$t("sys.button.query") //查询
        },{
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
           name: "add",
          position: "left",
          text: this.$t('sys.button.newAdd') //新增
        },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          name: "reset",
          position: "right",
          text: this.$t("sys.button.reset") //重置
        }
      ],
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents
          : [
              // 动态组件-查询条件
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.carBrandCn"), //品牌名称
                codeField: "carBrandCode",
                component: () => import("@/components/org/carBrand/carBrand"),
                type: "dropdownList",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.DeptCode"), //部门编码
                codeField: "deptCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                // fuzzySearch: false,
                isMust: true
              },
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.DeptName2"), //部门名称
                codeField: "deptName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                // fuzzySearch: true,
                isMust: true
              },
              {
                compKey: "compKey4",
                labelName: this.$t("org.label.isEnable") /*是否启用*/,
                codeField: "isEnable",
                component: () => import("@/components/org/isEnable/isEnable"),
                type: "dropdownList",
                isMust: true
              }
            ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
              {
                prop: "controlBtn",
                label: this.$t("sys.content.operate"),
                codeField: "controlBtn",
                width: 60,
                align: "center",
                isComponent: true,
                comps: [
                  {
                    compKey: "propKey0",
                    labelName: this.$t("sys.button.edit"),
                    codeField: "editControlBtn",
                    clickEvent: this.edit,
                    component: () => import("@/components/org/linkButton")
                  }
                ]
              },
              {
                prop: "carBrandName",
                label: this.$t("org.label.carBrandCn"),
                width: null,
                align: "center"
              }, //品牌名称
              {
                prop: "carBrandCode",
                label: "品牌编码",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "deptCode",
                label: this.$t("org.label.DeptCode"),
                width: null,
                align: "center"
              },//部门名称
              {
                prop: "deptName",
                label: this.$t("org.label.DeptName2"),
                width: null,
                align: "center"
              },
              {
                prop: "deptId",
                label: "部门id",
                width: null,
                align: "center",
                hidden: true
              },
              // {
              //   prop: "isEnableCn",
              //   label: this.$t("org.label.isEnable"),
              //   width: null,
              //   align: "center"
              // },
              {
                prop: "isEnable",
                label: "是否启用",
                width: null,
                align: "center",
                hidden: false
              },//部门描述
              {
                prop: "deptDesc",
                label: this.$t("org.label.DeptDec"),
                width: null,
                align: "center",
                hidden: true
              }
            ],
      //表单查询数据
      formField: {
        carBrandCode: "",
        deptCode: "",
        deptName: "",
        isEnable: "",
        isDlrDept:"1"
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false
    };
  }
};
</script>
