<!--
* description: 展车设置
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
  name: 'belowConfig',
  components: {
    OneTableTemplate,
    Edit: () => import("./setBelow"),
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
        APIUrl:'ve/belowInfoMock',
      },
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.queryTable(1),
          text: this.$t('sys.button.query'), // 查询
          name: 'search', // 按钮图标样式
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset'),
          name: 'reset',
          position: 'right' // 重置
        },
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
              labelName: '销售店：',
              codeField: 'saleStore',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              disabled: true,
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '交付店：',
              codeField: 'deliveryShop',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '车系：',
              codeField: 'carSeries',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '车型：',
              codeField: 'carType',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '车型配置名称',
              codeField: 'carConfigName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey6',
              labelName: '车身颜色：', 
              codeField: 'carBodyColor',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              disabled: true,
              isMust: true
            },
            {
              compKey: 'compKey7',
              labelName: '内饰颜色：',
              codeField: 'interiorColor',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              disabled: true,
              isMust: true
            },
            {
              compKey: 'compKey8',
              labelName: '库存状态：',
              codeField: 'inventoryStatus',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              disabled: true,
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey9',
              labelName: '配车状态：',
              codeField: 'supplyCarStatus',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              disabled: true,
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey10',
              labelName: 'VIN码：',
              codeField: 'VINCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey11',
              labelName: '入库日期：',
              codeField: 'inboundDate',
              component: () => import('@/components/org/datePicker/datePicker'),
              type: 'inputText',
              isMust: true
            },
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
              prop: 'controlBtn1',
              label: '操作',
              minWidth: 180,
              fixed: true,
              isComponent: true,
              comps: [
                {
                compKey: 'propKey1',
                labelName: '设置展车',
                component: () => import('@/components/org/linkButton'),
                clickEvent: (index) => this.setBelow(index)
                },
              ]
            },
            {
              prop: 'cheGuanPlatformBtn',
              label: '车管平台',
              minWidth: 180,
              fixed: true,
              isComponent: true,
              comps: [
                {
                compKey: 'propKey1',
                labelName: '激活',
                component: () => import('@/components/org/linkButton'),
                // clickEvent: () => this.manualSCar()
                },
              ]
            },
            {
              prop: 'userCenter',
              label: '用户中心',
              minWidth: 180,
              fixed: true,
              isComponent: true,
              comps: [
                {
                compKey: 'propKey1',
                labelName: '激活',
                component: () => import('@/components/org/linkButton'),
                // clickEvent: () => this.manualSCar()
                },
              ]
            },
            {
              prop: 'trafficPlatformBtn',
              label: '流量平台',
              minWidth: 180,
              fixed: true,
              isComponent: true,
              comps: [
                {
                compKey: 'propKey1',
                labelName: '激活',
                component: () => import('@/components/org/linkButton'),
                // clickEvent: () => this.manualSCar()
                },
              ]
            },
            {
              prop: 'saleStore',
              label: '销售店'
            },
            {
              prop: 'deliveryShop',
              label: '交付店'
            },
            {
              prop: 'isBelow',
              label: '是否展车'
            },
            {
              prop: 'belowOwner',
              label: '展车车主'
            },
            {
              prop: 'ownerPhone',
              label: '车主电话'
            },
            {
              prop: 'ownerEmail',
              label: '车主邮箱'
            },
            {
              prop: 'VINCode',
              label: 'VIN码'
            },
            {
              prop: 'inventoryStatus',
              label: '库存状态'
            },
            {
              prop: 'supplyCarStatus',
              label: '配车状态'
            },
            {
              prop: 'carSeries',
              label: '车系'
            },
            {
              prop: 'carType',
              label: '车型'
            },
            {
              prop: 'carConfigName',
              label: '车型配置名称'
            },
            {
              prop: 'carBodyColor',
              label: '车身颜色'
            },
            {
              prop: 'interiorColor',
              label: '内饰颜色'
            },
            {
              prop: 'inboundDate',
              label: '入库日期'
            },
            {
              prop: 'inboundWarehouse',
              label: '入库仓库'
            }
          ],
      formField: this.$utils.getFormField(this, {
        batchNum:'', 
        carOrder:'', 
        carStatus:'', 
        carConfig:'', 
        VINCode:'', 
        storeGenera:'',
        deliveryCity:'', 
        deliveryStore:'', 
        belowStore:'', 
        principalName:'', 
        principalPhone:'', 
        creator:'', 
        createTime:'', 
        remark:''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode])
    }
  },
  mounted() {
    // 列表查询
    this.queryTable(1)
  },
  methods: {
    add() {
      this.isShowChooes = true
      this.showEdit('add')
    },
  }
}
</script>
