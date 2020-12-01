<!--
 description: 系统通知场景设置
 author: dinggf
createdDate: 2019-10-25
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicFormFields="formField"
      :dynamicIsShowMoreBtn="false"
      :dynamicIsShowSelect="false"
      :key="tableKey"
    />
    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :sceneCode="editRowData.sceneCode"
      :sysSceneSettingObjProp="sysSceneSettingObjProp"
      :popupsState="editPopupsState"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { isEmpty, getArrayFromArray } from "@/utils/index";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";
export default {
  name: "mdsSysSceneSetting",
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
      // isMoreBtn: true,
      svFields: "业务模块",
      bounce: true,
      // 网格查询API配置对象
      apiConfig: orgApis.mdsSysSceneSettingQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query"), //查询
          name: "search",
          position: "right",
          fuzzySearch: true,
          isMust: false
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
          text: this.$t("sys.button.add"), //新增
          name: "add",
          position: "left"
        },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset"), //重置
          name: "reset",
          position: "right",
          isMust: false
        }
        // {
        //   compKey: "btnKey4",
        //   text: this.$t("sys.button.delete"), //删除
        //   type: "",
        //   size: "small",
        //   name: 'deleteSheet',
        //   codeField: "editControlBtn",
        //   position: 'left',
        //   clickEvent: () => this.del(),
        //   component: () => import("@/components/org/linkButton")
        // }
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
              // 显示组件
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.sceneCoding"), //场景编码
                codeField: "sceneCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.sceneName"), //场景名称
                codeField: "sceneDesc",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.serviceModel"), //业务模块
                lookuptype: "DB0001",
                codeField: "belongto",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: true,
                fuzzySearch: true
              },
              {
                compKey: "compKey4",
                labelName: this.$t("org.label.sendingType"), //发送类型
                lookuptype: "LX063",
                codeField: "sendType",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: true
              },
              {
                compKey: "compKey5",
                labelName: this.$t("org.label.isEnable"), //是否启用
                codeField: "isEnable",
                component: () =>
                  import("@/components/org/isEnable/isEnableOne"),
                type: "dropdownList",
                isMust: false
              }
            ],
      // 动态生成网格列
      tableCols: this.getCols(),
      formField: {
        sceneCode: "",
        sceneDesc: "",
        belongto: "",
        sendType: "",
        isEnable: ""
      },
      tableKey: "tableKey",
      sysSceneSettingObjProp: {
        sceneCode: "",
        sceneId: "",
        sceneDesc: "",
        sendType: "",
        sendTypeCode: "",
        belongto: "",
        belongtoCode: "",
        isEnable: "",
        updateControlId: ""
      }
    };
  },

  methods: {
    getCols() {
      var cols = [
        {
          prop: "controlBtn",
          label: this.$t("sys.content.operate"), //操作
          codeField: "controlBtn",
          width: 100,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              align: "center",
              labelName: this.$t("sys.button.edit"), //编辑
              codeField: "editControlBtn",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton")
            }
          ]
        }
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
            prop: "sceneCode",
            label: this.$t("org.label.sceneCoding"),
            width: null,
            align: "center"
          }, //场景编码
          {
            prop: "sceneDesc",
            label: this.$t("org.label.sceneName"),
            width: null,
            align: "center"
          }, //场景名称
          {
            prop: "sceneId",
            label: "场景Id",
            width: null,
            hidden: true,
            align: "center"
          }, //场景Id
          {
            prop: "belongto",
            label: this.$t("org.label.serviceModel"),
            width: null,
            hidden: true,
            align: "center"
          }, //业务模块
          {
            prop: "belongtoName",
            label: this.$t("org.label.serviceModel"),
            width: null,
            align: "center",
            hidden: false
          }, //业务模块
          {
            prop: "sendType",
            label: this.$t("org.label.sendingType"),
            width: null,
            hidden: true,
            align: "center"
          }, //发送类型
          {
            prop: "sendTypeName",
            label: this.$t("org.label.sendingType"),
            width: null,
            align: "center",
            hidden: false
          }, //发送类型
          {
            prop: "isEnable",
            label: this.$t("org.label.isEnable"),
            width: null,
            align: "center",
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
          }, //是否启用
          {
            prop: "updateControlId",
            label: this.$t("org.label.concurrencyControl"),
            width: null,
            align: "center",
            hidden: true
          } //并发控制
        ]);
      }
      return cols;
    }
  }
};
</script>

