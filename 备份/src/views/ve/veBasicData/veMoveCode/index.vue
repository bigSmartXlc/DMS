<!--
* description: 搬入地编码设定
* author: duanhy
* createdDate: 2020-11-18
-->
<template>
  <div class="app-container app-container-table">
    <!-- 单表格模版页面 -->
    <one-table-template
      ref="multipleTable"
      :dynamic-api-config="dynamicApiConfig"
      :dynamic-buttons="dynamicButtons"
      :dynamic-components="tableComponents"
      :dynamic-table-cols="dynamicTableCols"
      :dynamic-form-fields="formField"
      :dynamic-is-show-more-btn="false"
      :dynamic-is-show-select="true"
      :dynamic-export-converts="dynamicExportConverts"
      :refresh-table-key="refreshTableKey"
      :callbackObj="callbackObj"
      @hiddenColData="hiddenColData"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
// import { testApis } from '@/api/graphQLApiList/test'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";

export default {
  name: "VeTotalInfor",
  components: {
    OneTableTemplate
  },
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path, ""],
      function () {
        next();
      }
    );
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path;
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode]);
    return {
      refreshTableKey: "0",
      // table表格查询API配置对象
        dynamicApiConfig: orgApis.stoTransferInstructionQueryByPage,
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents: 
            [
              {
                compKey: "compKey1",
                labelName: "仓库名称",
                codeField: "apiCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                span: 6,
              },
              {
                compKey: "compKey3",
                labelName: "交付中心",
                codeField: "apiCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                span: 6,
              },
              {
                compKey: "compKey2",
                labelName: "启用状态",
                codeField: "apiName",
                component: () => import('@/components/org/isEnable/isEnableOne'),
                type: 'dropdownList',
                type: "inputText",
                isMust: true,
                span: 6,
              },
              {
                compKey: "compKey2",
                labelName: "包含停用店",
                codeField: "apiName",
                component: () => import('@/components/org/checkBox'),
                type: 'dropdownList',
                type: "inputText",
                isMust: true,
                span: 6,
              }
            ],
      // form 的表单对象
      formField: this.$utils.getFormField(
        this,
        {
        VINCode: '', // 供应商编码
        updateControlTime: '', // 供应商名称
        isEnable: '', // 是否可用
        wareHouse: '',
        houseAddress: '',
        carSeries: '',
        carConfig: '',
        withinColor: '',
        carColor: ''
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      // 动态组件-按钮
      dynamicButtons:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          : [
              {
                compKey: "btnKey1",
                type: "primary",
                size: "small",
                name: "search",
                clickEvent: () => this.queryTable(1),
                text: "查询",
              },
              {
                compKey: "btnKey2",
                type: "",
                size: "small",
                name: "reset",
                clickEvent: () => this.reset(),
                text: "重置",
              },
              {
                compKey: "btnKey3",
                type: "",
                size: "small",
                name: "",
                position: "left",
                clickEvent: () => this.add('add'),
                text: "保存",
              },
              {
                compKey: "btnKey3",
                type: "",
                size: "small",
                name: "",
                position: "left",
                clickEvent: () => this.add('add'),
                text: "导出",
              },
            ],
      // 动态组件-表格网格列
      dynamicTableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
              {
                label: "地区",
                // fixed: true,
                // isComponent: true,
                // comps: [
                //   {
                //     compKey: "propKey1",
                //     labelName: "编辑",
                //     component: () => import("@/components/org/linkButton"),
                //     clickEvent: (index) => this.add('edit'),
                //   },
                // ],
              },
              {
                prop: "id",
                label: "主键ID",
                hidden: true,
                alwaysHidden: true,
              },
              {
                prop: "apiCode",
                label: "大区",
              },
              {
                prop: "apiName",
                label: "省份",
                align: "center",
              },
              {
                prop: "isEnable",
                label: "小区",
              },
              {
                prop: "createdName",
                label: "城市",
              },
              {
                prop: "createdDate",
                label: "搬入地",
                // sortable: true,
              },
              {
                prop: "modifyName",
                label: "交付中心",
              },
              {
                prop: "lastUpdatedDate",
                label: "交付中心编码",
              },
              {
                prop: "lastUpdatedDate",
                label: "仓库名称",
              },
              {
                prop: "lastUpdatedDate",
                label: "仓库地址"
              },
              {
                prop: "lastUpdatedDate",
                label: "仓库容量"
              },
              {
                prop: "lastUpdatedDate",
                label: "仓库编码"
              },
              {
                prop: "lastUpdatedDate",
                label: "直营/加盟",
              },
              {
                prop: "lastUpdatedDate",
                label: "是否有效搬入地+",
              },
              {
                prop: "lastUpdatedDate",
                label: "是否默认搬入地+",
              },
              {
                prop: "lastUpdatedDate",
                label: "状态",
              },
            ],
      // 字段格式化转换（用于导出excel）（kvs表示键值转换）
      dynamicExportConverts: {
        isEnable: {
          convert: "kvs",
          kvs: {
            "1": "是",
            "0": "否",
          },
        },
      },
      // 单表格模版页面组件回调事件
      callbackObj: {
        // 当选择项发生变化时会触发该事件（多选时）
        onCheckSelectChange: (selection) => {
          this.handleSelectionChange(selection);
        },
      },
    };
  },
  mounted() {
    // 列表查询
    const that = this
    setTimeout(function(){
      that.queryTable(1)
    },1000)
  },
  methods: {
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(selection) {
      const btns = this.dynamicButtons.filter((o) => o.disabled !== undefined);
      if (btns.length > 0) {
        const isCheck = selection && selection.length > 0;
        btns.forEach((item) => {
          item.disabled = !isCheck;
        });
      }
    },

    hiddenColData(data) {
      if (data && data.length > 0) {
        this.refreshTableKey += 1;
        this.dynamicTableCols = data;
      }
    },

    // 新增--编辑
    add(type) {
   
    },

  }
};
</script>
