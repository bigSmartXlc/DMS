<!--
* description: 国地补汇总表
* author: 
* createdDate: 
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamic-buttons="tableButtons"
      :dynamic-components="tableComponents"
      :dynamic-table-cols="tableCols"
      :dynamic-api-config="apiConfig"
      :dynamic-form-fields="formField"
      :dynamic-is-show-select="true"
      :dynamic-is-show-more-btn="false"
      :dynamicApiStyle="'restful'"
    />
    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      :isSetDefaultBrand="false"
      :dynamicApiStyle="'restful'"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from 'vue'
export default {
  name: 'stateLandSubsidySummaryTable',
  components: {
    OneTableTemplate,
    // Edit: () => import("./edit")
  },

  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path, ''], function() {
      next()
    })
  },

  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      
      // 网格查询API配置对象
      apiConfig:{
        // APIUrl:'ve/belowInfoMock',
      },
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.queryTable(1),
          text: this.$t('sys.button.query'), // 查询
          name: '', // 按钮图标样式
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset'),
          name: '',
          position: 'right' // 重置
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
            // 显示组件
            {
              compKey: 'compKey1',
              labelName: '门店属性：',
              codeField: 'storeAttributes',
              isMul: false,
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '大区：',
              codeField: 'bigRegions',
              isMul: false,
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '开票时间：',
              codeField: 'invoiceTime',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '配车时间：',
              codeField: 'supplyCarTime',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            }
          ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'storeAttributes',
              label: '门店属性'
            },
            {
              prop: 'bigRegions',
              label: '大区'
            },
            {
              prop: 'salesShop',
              label: '销售店'
            },
            {
              prop: 'isCar',
              label: '已配车'
            },
            {
              prop: 'motorVeSaleInvoiced',
              label: '已开机动车销售发票'
            },
            {
              prop: 'registered',
              label: '已上牌'
            },
            {
              prop: 'areaSupervisorApproved',
              label: '区域督导审核通过'
            },
            {
              prop: 'areaSupervisorNotApproved',
              label: '区域督导审核未通过'
            },
            {
              prop: 'stateLandSubsidyApproved',
              label: '国地补审核通过'
            },
            {
              prop: 'stateLandSubsidyNotApproved',
              label: '国地补审未核通过'
            }
          ],
      formField: this.$utils.getFormField(this, {
        storeAttributes:'',
        bigRegions:'',
        invoiceTime:'',
        supplyCarTime:''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode])
    }
  },
  mounted() {
    // 列表查询
    // this.queryTable(1)
  },
  methods: {
    
  }
}
</script>
