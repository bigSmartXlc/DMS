<!--
* description: 经销商信息维护
* author: yangsq
* createdDate: 2020-5-27
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
      apiConfig: orgApis.mdmOrgdlrQueryByPageFindAll,
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
        },
        // {
        //   compKey: "btnKey4",
        //   type: "",
        //   size: "small",
        //   name: "export",
        //   position: "left",
        //   clickEvent: () => this.exportExcel(),
        //   text: this.$t("sys.button.export")
        // },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          name: "reset",
          position: "right",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        },
        // ,{
        //   compKey: "btnKey2",
        //   type: "",
        //   size: "small",
        //   clickEvent: () => this.add(),
        //    name: "add",
        //   position: "left",
        //   text: this.$t('sys.button.newAdd') //新增
        // },
      ],
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents
          : [
              // 动态组件-查询条件
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.dlrName"), //经销商
                codeField: "dlrId",
                parentFileds: "value:bigAreaId|smallAreaId",
                component: () => import("@/components/org/orgDlr"),
                type: "propus",
                isMul: true,
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.region"), // 大区
                codeField: "bigAreaId",
                // textField: "smallAreaName",
                component: () => import("@/components/org/BigArea"),
                type: "propus",
                isMust: true,
              },
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.smallAreaName"), // 小区
                codeField: "smallAreaId",
                parentFileds: "value:bigAreaId-bigAreaId",
                component: () => import("@/components/org/SmallArea/index.vue"),
                type: "propus",
                isMust: true,
              },
              {
                compKey: 'compKey6',
                labelName: this.$t('org.label.isEnableCn'), // 状态
                codeField: 'isEnable',
                component: () =>
                    import('@/components/org/isEnable/isEnableOne'),
                type: 'dropdownList',
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
                    labelName: "查看",
                    codeField: "editControlBtn",
                    clickEvent: this.edit,
                    component: () => import("@/components/org/linkButton")
                  }
                ]
              },
              {
                prop: "carBrandCn",
                label: '品牌',
                width: null,
                align: "center"
              },
              {
                prop: "carBrandCode",
                label: '品牌',
                width: null,
                align: "center",
                hidden:true
              },
              {
                prop: "dlrCode",
                label: '经销商编码',
                width: null,
                align: "center"
              },
              {
                prop: "dlrShortName",
                label: '经销商',
                width: null,
                align: "center"
              },
              {
                prop: "dlrFullName",
                label: '经销商全称',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "bigAreaId",
                label: '所属大区',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "bigAreaName",
                label: '所属大区',
                width: null,
                align: "center"
              },
              {
                prop: "smallAreaId",
                label: '所属小区',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "smallAreaName",
                label: '所属小区',
                width: null,
                align: "center"
              },
              {
                prop: "provinceId",
                label: '所属省份',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "provinceName",
                label: '所属省份',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "cityId",
                label: '所属城市',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "cityName",
                label: '所属城市',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "zip",
                label: '邮政编码',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "linkAddr",
                label: '经销商地址',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "respName",
                label: '总经理',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "respPhone",
                label: '总经理电话',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "respmobile",
                label: '总经理手机',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "respEmail",
                label: '总经理Email',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "registerNo",
                label: '注册编号',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "orgTypeCode",
                label: '网点类型编码',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "orgTypeName",
                label: '网点类型名称',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "dlrBussDate",
                label: '开业时间',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "phone",
                label: '服务电话',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "taxNo",
                label: '增值税号',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "column3",
                label: '纳税人类型编码',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "faxerTypeName",
                label: '纳税人类型名称',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "invBank",
                label: '开户银行',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "invAccount",
                label: '银行账号',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "invName",
                label: '开票名称',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "invAddr",
                label: '财务地址',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "financemName",
                label: '财务联系人',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "financemPhone",
                label: '财务联系人电话',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "financemMobile",
                label: '财务联系人手机',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "financemEmail",
                label: '财务联系人email',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "financemZip",
                label: '财务联系人邮编',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "financemAddr",
                label: '财务联系人地址',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "dlrLevel",
                label: '销售等级编码',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "dlrLevelName",
                label: '销售等级',
                width: null,
                align: "center",
                hidden: false
              },
              {
                prop: "isEnable",
                label: '使用状态',
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "isEnableName",
                label: '状态',
                width: null,
                align: "center",
                hidden: false
              },
              {
                prop: "salemName",
                label: "销售经理",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "salemPhone",
                label: "销售经理电话",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "salemMobile",
                label: "销售经理手机",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "salemEmail",
                label: "销售经理email",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "assistantName",
                label: "业务助理",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "assistantPhone",
                label: "业务助理电话",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "assistantMobile",
                label: "业务助理手机",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "assistantEmail",
                label: "业务助理email",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "saleTel",
                label: "销售热线",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "fax",
                label: "传真",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "dlrAnswerCode",
                label: "ANSWER编码",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "saleEmail",
                label: "销售联络email",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "carTypeGroup",
                label: "车型组",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "sapDlrId",
                label: "SAP编码",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseContact",
                label: "整车收货联系人",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseContactPhone",
                label: "整车收货联系电话",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseContactmobile",
                label: "整车收货联系手机",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseContactEmail",
                label: "整车收货联系email",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseZip",
                label: "整车收货地址邮编",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseName",
                label: "整车收货地址名称",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseSerial",
                label: "序号",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseCode",
                label: "整车收货地址编码",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "warHouseAddr",
                label: "整车收货地址",
                width: null,
                align: "center",
                hidden: true
              },
            ],
      //表单查询数据
      formField: {
        dlrId: "",
        bigAreaId: "",
        smallAreaId: "",
        isEnable: "",
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false
    };
  }
};
</script>
