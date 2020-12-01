<!--
* description: 经销商财务扩展信息
* author: dinggf
* createdDate: 2019-10-21
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicFormFields="formField"
      :dynamicTableCols="tableCols"
      :dynamicApiConfig="apiConfig"
      :dynamicIsShowMoreBtn="isMoreBtn"
      :dynamicWidth="siderWidth"
      :dynamicIsShowSelect="false"
      :dynamicIsInitTable="false"
      :dynamicIsColumnDrop="true"
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
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import Vue from 'vue'
export default {
  name: "dlrFinance",
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path,'veDlrFinanceEdit'],
      function(){
        next()
      })
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      //设置菜单栏宽度
      siderWidth: 250,
      //设置是否显示更多按钮
      isMoreBtn: true,
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgDlrQueryFinanceList,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          name: "search",
          position: "right",
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query")
        }, //查询
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          name: "export",
          position: "left",
          clickEvent: () => this.exportExcel(),
          text: this.$t("sys.button.export")
        }, //导出
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          name: "reset",
          position: "right",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } //重置
      ],
      // 动态组件-查询条件
      tableComponents: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] && this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents : [
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.carBrandCn"),
          codeField: "carBrandCode",
          isMul: false,
          component: () => import("@/components/org/carBrand/carBrand"),
          type: "dropdownList",
          isMust: true
        }, //品牌
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.dlrName"),
          codeField: "dlrIDList",
          parentFileds: "carBrandCode",
          component: () => import("@/components/org/orgDlr"),
          type: "propus",
          isMust: true
        }, //经销商
        {
          compKey: "compKey4",
          labelName: this.$t("org.label.dlrCode"),
          codeField: "dlrCode",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //经销商编码
        {
          compKey: "compKey5",
          labelName: this.$t("org.label.dlrShortName"),
          codeField: "dlrShortName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          fuzzySearch: true,
          isMust: true
        }, //经销商名称
        {
          compKey: "compKey6",
          labelName: this.$t("org.label.invNames"),
          codeField: "invName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: false
        }, //开票名称
        {
          compKey: "compKey7",
          labelName: this.$t("org.label.sapDlrId"),
          codeField: "sapDlrId",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: false
        }, //SAP编码
        {
          compKey: "compKey8",
          labelName: this.$t("org.label.distributordis"),
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isRequire: false,
          isMust: false
        } //含已停用经销商
      ],
      // 动态生成网格列
      tableCols: this.$ConfigCache.CacheConfig.cacheData[viewPageCode]&& this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols: [
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
        },
        {
          prop: "dlrId",
          label: "经销商ID",
          width: null,
          align: "center",
          hidden: true
        },
        {
          prop: "dlrShortName",
          label: "经销商名称",
          width: 200,
          align: "center"
        },
        { prop: "dlrCode", label: "经销商编码", width: 100, align: "center" },
        {
          prop: "carBrandCode",
          label: "品牌",
          width: null,
          align: "center",
          hidden: true
        },
        { prop: "carBrandCn", label: "品牌名", width: 120, align: "center" },
        { prop: "invBank", label: "开户银行", width: 200, align: "center" },
        {
          prop: "invAccount",
          label: "开户银行账号",
          width: 180,
          align: "center"
        },
        { prop: "taxNo", label: "增值税发票号", width: 180, align: "center" },
        { prop: "invName", label: "开票名称", width: 120, align: "center" },
        { prop: "invAddr", label: "开票地址", width: 150, align: "center" },
        {
          prop: "remark",
          label: "开票备注",
          width: null,
          align: "center",
          hidden: true
        },
        { prop: "sapDlrId", label: "SAP编码", width: 100, align: "center" },
        // { prop: "DealerCorrelation", label: "经销商关联关系", width: 120, align: "center" },
        { prop: "dlrAnswerCode", label: "ANSWER编码", width: 120, align: "center" },
        {
          prop: "areaId",
          label: "地区ID",
          width: null,
          align: "center",
          hidden: true
        },
        { prop: "areaName", label: "地区", width: null, align: "center" },
        {
          prop: "bigAreaId",
          label: "大区ID",
          width: null,
          align: "center",
          hidden: true
        },
        { prop: "bigAreaName", label: "大区", width: null, align: "center" },
        {
          prop: "smallAreaId",
          label: "小区ID",
          width: null,
          align: "center",
          hidden: true
        },
        { prop: "smallAreaName", label: "小区", width: null, align: "center" },
        {
          prop: "provinceId",
          label: "省份ID",
          width: null,
          align: "center",
          hidden: true
        },
        { prop: "provinceName", label: "省份", width: null, align: "center" },
        {
          prop: "cityId",
          label: "城市ID",
          width: null,
          align: "center",
          hidden: true
        },
        { prop: "cityName", label: "城市", width: null, align: "center" },
        {
          prop: "linkManName",
          label: "财务联系人",
          width: 100,
          align: "center"
        },
        {
          prop: "linkManPhone",
          label: "财务联系人电话",
          width: 140,
          align: "center"
        },
        {
          prop: "linkManMobil",
          label: "财务联系人手机",
          width: 130,
          align: "center"
        },
        {
          prop: "email",
          label: "财务联系人Email",
          width: 150,
          align: "center"
        },
        { prop: "zip", label: "财务联系人邮编", width: 130, align: "center" },
        {
          prop: "linkManAddr",
          label: "财务联系人地址",
          width: 200,
          align: "center"
        }
        // { prop: "updateControlId", label: "并发控制ID", width: null, align: "center", hidden: true }
      ],
      //查询条件
      formField: this.$utils.getFormField(this, {
        carBrandCode: "",
        dlrIDList: "",
        dlrType: "",
        dlrCode: "",
        dlrShortName: "",
        // dlrName: "",0
        invName: "",
        sapDlrId: "",
        // updateControlId: '',
        isEnable: ""
      },this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),
    };
  }
};
</script>

<style lang='scss' scoped>
/deep/ .filter-params .el-col label.el-checkbox {
  width: 20%;
  font-size: 12px;
}
</style>
