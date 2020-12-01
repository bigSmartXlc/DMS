 <!--
* description: 门店选择
* author: 
* createdDate: 
-->
<template>
  <section class="belowStoreSelect">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      :title="'门店选择'"
      :visible.sync="popupsVisible"
      width="1050px"
      center
      :append-to-body="true"
      @close="close"
    >
      <dialogHeader
        slot="title"
        :title="'门店选择'"
        :style-type="$store.state.app.dialogType"
      />
      <one-table-template
        ref="multipleTable"
        :dynamic-api-config="dynamicApiConfig"
        :dynamic-buttons="dynamicButtons"
        :dynamic-components="tableComponents"
        :dynamic-table-cols="dynamicTableCols"
        :dynamic-form-fields="formField"
        :dynamicTableDefultHeight="300"
        :dynamic-is-show-more-btn="true"
        :dynamic-is-show-select="false"
        :dynamic-api-style="apiStyle"
        :dynamicPageSize="15"
        :refresh-table-key="refreshTableKey"
        @hiddenColData="hiddenColData"
      />
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
           :icon="comp.icon"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from "vue";
export default {
  name: 'belowStore',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    dialogHeader: () => import('@/components/dialogHeader'), // 弹窗标题,
    OneTableTemplate
  },
  mixins: [oneTableWithViewTemplateMixins],
  props: {
    
  },
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path, ''],
      function() {
        next()
      })
  },
  data() {

    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      table:null,
      curSelected:null,
      selectData:{},
      clickRowsData:{},
      dynamicApiConfig:{
        APIUrl:'',
      },
      apiStyle: 'restful',
      
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          icon: "",
          clickEvent: () => this.confirm(),
          text: this.$t("sys.button.confirm")
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "",
          clickEvent: () => this.sendCode(),
          text: this.$t("sys.button.cancel")
        }
      ],
      // 动态组件-按钮
      dynamicButtons: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons :
        [
          {
            compKey: "btnKey1",
            type: "primary",
            size: "small",
            clickEvent: () => this.queryTable(1),
            text: this.$t('sys.button.query'), // 查询
            position: 'right',
            fuzzySearch: true
          },
          {
            compKey: 'btnKey2',
            type: '',
            size: 'small',
            clickEvent: () => this.reset(),
            text: this.$t('sys.button.reset'),
            position: 'right' // 重置
          },
        ],

      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents :
          [
            {
              compKey: 'compKey1',
              labelName: '门店编码：',
              codeField: 'storeCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 8
            },
            {
              compKey: 'compKey2',
              labelName: '门店名称：',
              codeField: 'storeName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 8
            },
            {
              compKey: 'compKey3',
              labelName: '门店大类：',
              codeField: 'storeGenera',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              span: 8
            }
          ],
      dynamicTableCols: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols :
        [
          {
            prop: 'releaseId',
            label: '主键ID',
            hidden: true,
            alwaysHidden: true
          },
          {
            prop: 'updateControlId',
            label: '并发控制ID',
            hidden: true,
            alwaysHidden: true
          },
          {
            prop: 'storeCode',
            label: '门店编码'
          },
          {
            prop: 'storeName',
            label: '门店名称'
          },
          {
            prop: 'storeTypeName',
            label: '门店类型名称',
          },
          {
            prop: 'storeGeneraName',
            label: '门店大类名称'
          },
          {
            prop: 'operatingStatus',
            label: '营业状态',
          }
        ],
      refreshTableKey: '0',
      ruleSettingShow: false,
      curPopupsVisible: this.popupsVisible,

      formField: this.$utils.getFormField(this, {
        storeCode:'',
        storeName:'',
        storeGenera:''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),

    }
  },
  methods: {
    hiddenColData(data) {
      if (data && data.length > 0) {
        this.refreshTableKey += 1
        this.dynamicTableCols = data
      }
    },
  }
}
</script>
