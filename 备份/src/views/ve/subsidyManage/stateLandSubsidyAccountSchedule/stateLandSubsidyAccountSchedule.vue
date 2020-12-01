<!--
* description: 国地补资料上传
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
  name: 'stateLandSubsidyAccountSchedule',
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
        },
        {
          compKey: 'btnKey3',
          type: '',
          size: 'small',
        //   clickEvent: () => this.reset(),
          text: '导出',
          position: 'left'
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
              labelName: '销售店：',
              codeField: 'salesShop',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '支付店：',
              codeField: 'deliveryStore',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '是否代上牌：',
              codeField: 'isInsteadOnLicense',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey6',
              labelName: '上牌城市：',
              codeField: 'onLicenseCity',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey7',
              labelName: 'VIN码：',
              codeField: 'VINCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey8',
              labelName: '订单标签：',
              codeField: 'orderLabel',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey9',
              labelName: '审核状态：',
              codeField: 'auditStutas',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: false
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
              prop: 'deliveryStore',
              label: '交付店'
            },
            {
              prop: 'orderLabel',
              label: '订单标签'
            },
            {
              prop: 'isInsteadOnLicense',
              label: '是否代上牌'
            },
            {
              prop: 'salesUnitName',
              label: '销售单位名称（发票）'
            },
            {
              prop: 'salesArea',
              label: '销售地区（发票）'
            },
            {
              prop: 'onLicenseCity',
              label: '上牌城市'
            },
            {
              prop: 'purchaserName',
              label: '购买方名称'
            },
            {
              prop: 'vehicleApplications',
              label: '车辆用途'
            },
            {
              prop: 'vehicleTpyeNum',
              label: '车辆型号'
            },
            {
              prop: 'VINCode',
              label: '车辆识别代码（VIN）'
            },
            {
              prop: 'vehiclePlate',
              label: '车辆牌照'
            },
            {
              prop: 'vehicleInvoiceNum',
              label: '车辆发票号'
            },
             {
              prop: 'invoicePrice',
              label: '开票价格'
            },
            {
              prop: 'certificationDate',
              label: '合格证发证日期'
            },
            {
              prop: 'driveLicenseRegDate',
              label: '行驶证注册日期'
            },
            {
                prop: 'invoiceDate',
                label: '开票日期'
            },
            {
              prop: 'dataAuditStatus',
              label: '资料审核状态'
            },
            {
              prop: 'remarkProblemVehicle',
              label: '备注问题车辆'
            },
            {
              prop: 'certificateNum',
              label: '合格证编号'
            },
            {
              prop: 'engineNum',
              label: '发动机编号'
            },
            {
              prop: 'batteryPackNum',
              label: '电池组编号'
            },
            {
              prop: 'invoiceCity',
              label: '开票城市'
            },
            {
              prop: 'IDNumber',
              label: '证件号码'
            },
            {
              prop: 'ownerPhone',
              label: '车主电话'
            },
            {
              prop: 'dismissReason',
              label: '驳回原因'
            },
          ],
      formField: this.$utils.getFormField(this, {
        storeAttributes:'',
        bigRegions:'',
        salesShop:'',
        deliveryStore:'',
        isInsteadOnLicense:'',
        onLicenseCity:'',
        VINCode:'',
        orderLabel:'', 
        auditStutas:'',
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
