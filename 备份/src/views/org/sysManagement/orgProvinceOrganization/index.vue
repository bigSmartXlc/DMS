<!--
* description: 省份管理
* author: linzewen
* createdDate: 2019-08-07
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamic-buttons="tableButtons"
      :dynamic-components="tableComponents"
      :dynamic-api-config="apiConfig"
      :dynamic-table-cols="tableCols"
      :dynamic-form-fields="formField"
      :dynamic-is-show-select="false"
      :dynamic-is-show-more-btn="false"
      :dynamic-is-column-drop="true"
      :dynamic-is-init-table="true"
    />

    <edit
      :key="editPopupsKey"
      :dynamic-edit-row-data="editRowData"
      :popups-visible="editPopupsVisible"
      :popups-state="editPopupsState"
      @close="close"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";

export default {
  name: "OrgProvinceOrganization",
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(to.path, function() {
      next();
    });
  },
  data() {
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgProvinceQueryFindAll,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          name: "search",
          position: "right",
          size: "small",
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query") /* 查询*/
        },
        // {
        //   compKey: "btnKey2",
        //   type: "",
        //   name: "add",
        //   position: "left",
        //   size: "small",
        //   clickEvent: () => this.add(),
        //   text: this.$t("sys.button.add") /* 添加*/
        // },
        {
          compKey: "btnKey4",
          type: "",
          name: "reset",
          position: "right",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset") /* 重置*/
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
          .tableComponents &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
          .tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
              .tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.provinceId") /* 省份编码*/,
                codeField: "provinceCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.provinceName") /* 省份名称*/,
                codeField: "provinceName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.isEnableCn") /* 是否启用*/,
                codeField: "isEnable",
                component: () =>
                  import("@/components/org/isEnable/isEnableOne"),
                type: "dropdownList",
                isMust: true
              }
            ],
      // 动态生成网格列
      tableCols: this.getCols(),
      // 表单查询数据
      formField: {
        provinceName: "",
        provinceCode: "",
        isEnable: ""
      }
    };
  },
  methods: {
    getCols() {
      var cols = [
        {
          prop: "controlBtn",
          label: this.$t("sys.content.operate") /* 操作*/,
          codeField: "controlBtn",
          width: 60,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              labelName: this.$t("sys.button.edit") /* 编辑*/,
              codeField: "editControlBtn",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton")
            }
          ]
        }
      ];
      if (
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols.length > 0
      ) {
        cols = cols.concat(
          this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
        );
      } else {
        cols = cols.concat([
          {
            prop: "provinceCode",
            label: this.$t("org.label.provinceId") /* 省份编码*/,
            width: null,
            align: "center"
          },
          {
            prop: "provinceName",
            label: this.$t("org.label.provinceName") /* 省份名称*/,
            width: null,
            align: "center"
          },
          {
            prop: "orderNo",
            label: this.$t("org.label.sort") /* 排序*/,
            width: null,
            align: "center"
          },
          {
            prop: "isEnable",
            label: this.$t("org.label.isEnableCn") /* 启用状态*/,
            width: null,
            align: "center",
            hidden: true
          },
          {
            prop: 'isEnableName',
            label: this.$t('org.label.isEnableCn') /* 启用状态名*/,
            width: null,
            align: 'center',
          },
          {
            prop: "provinceId",
            label: this.$t("org.label.provinceID") /* 省份id*/,
            width: null,
            align: "center",
            hidden: true
          },
          {
            prop: "updateControlId",
            label: this.$t("org.label.updateControlId") /* 并发控制*/,
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
