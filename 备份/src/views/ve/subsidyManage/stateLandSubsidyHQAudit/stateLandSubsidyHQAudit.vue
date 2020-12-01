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
  name: 'stateLandSubsidyHQAudit',
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
        {
          compKey: 'btnKey3',
          type: '',
          size: 'small',
        //   clickEvent: () => this.reset(),
          text: '批量审核',
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
              labelName: '大区：',
              codeField: 'bigRegions',
              isMul: false,
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '小区：',
              codeField: 'littleRegions',
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
              labelName: '订单编号：',
              codeField: 'orderNum',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: 'VIN码：',
              codeField: 'VINCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey6',
              labelName: '订单标签：',
              codeField: 'orderLabel',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey7',
              labelName: '门店大类：',
              codeField: 'storeGenera',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey8',
              labelName: '开票城市：',
              codeField: 'invoiceCity',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey9',
              labelName: '开票时间：',
              codeField: 'invoiceTime',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey10',
              labelName: '是否代上牌：',
              codeField: 'isInsteadOnLicense',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey11',
              labelName: '车牌号码：',
              codeField: 'licensePlateNum',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey13',
              labelName: '上牌省份：',
              codeField: 'onLicensePro',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey14',
              labelName: '上牌城市：',
              codeField: 'onLicenseCity',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey12',
              labelName: '审核状态：',
              codeField: 'auditStutas',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey15',
              labelName: '申请时间：',
              codeField: 'auditTime',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
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
              prop: 'controlBtn',
              label: '操作',
              minWidth: 180,
              fixed: true,
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '查看',
                  component: () => import('@/components/org/linkButton'),
                },
                {
                  compKey: 'propKey2',
                  labelName: '附件下载',
                  component: () => import('@/components/org/linkButton'),
                },
              ]
            },
            {
              prop: 'bigRegions',
              label: '大区'
            },
            {
              prop: 'litterRegions',
              label: '小区'
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
              prop: 'salesCity',
              label: '销售城市'
            },
            {
              prop: 'salesArea',
              label: '销售地区'
            },
            {
              prop: 'storeGenera',
              label: '门店大类'
            },
            {
              prop: 'orderNum',
              label: '订单编号'
            },
            {
              prop: 'orderLabel',
              label: '订单标签'
            },
            {
              prop: 'auditStutas',
              label: '审核状态'
            },
            {
              prop: 'buyMode',
              label: '购买方式'
            },
            {
              prop: 'contactName',
              label: '联系人姓名'
            },
            {
              prop: 'contactPhone',
              label: '联系人电话'
            },
            {
              prop: 'isInsteadOnLicense',
              label: '是否代上牌'
            },
            {
              prop: 'onLicensePro',
              label: '上牌省份'
            },
            {
              prop: 'onLicenseCity',
              label: '上牌城市'
            },
            {
              prop: 'VINCode',
              label: 'VIN码'
            },
            {
              prop: 'vehicleTypeNum',
              label: '车辆型号'
            },
            {
              prop: 'salesUnitName',
              label: '销售单位名称'
            },
            {
              prop: 'purchaserName',
              label: '购买方名称'
            },
            {
              prop: 'invoiceNumber',
              label: '发票号码'
            },
            {
              prop: 'invoicePrice',
              label: '开票价格'
            },
            {
              prop: 'invoiceDate',
              label: '开票日期'
            },
            {
              prop: 'invoiceCity',
              label: '开票城市'
            },
            
            {
              prop: 'vehicleApplications',
              label: '车辆用途'
            },
            {
              prop: 'vehiclePlate',
              label: '车辆牌照'
            },
            {
              prop: 'driveLicenseRegDate',
              label: '行驶证注册日期'
            },
            {
              prop: 'certificationDate',
              label: '合格证发证日期'
            },
            {
              prop: 'IDNumber',
              label: '身份证号码'
            },
            {
              prop: 'ownerPhone',
              label: '车主电话'
            },
            {
              prop: 'organizationCode',
              label: '组织机构代码'
            },
            {
              prop: 'businessAddress',
              label: '企业地址'
            },
            {
              prop: 'landlineNumber',
              label: '座机号码'
            },
            {
              prop: 'phoneNumber',
              label: '手机号码'
            },
            {
              prop: 'contractVePrice',
              label: '合同整车价格'
            },
            {
              prop: 'contractSigName',
              label: '合同签署人名称'
            },
            {
              prop: 'auditTime',
              label: '申请时间'
            },
            {
              prop: 'proposer',
              label: '申请人'
            }
          ],
      formField: this.$utils.getFormField(this, {
        salesShop:'',
        orderNum:'',
        VINCode:'',
        orderLabel:'', 
        storeGenera:'', 
        invoiceCity:'', 
        invoiceDate:'', 
        isInsteadOnLicense:'', 
        licensePlateNum:'', 
        auditStutas:'', 
        onLicensePro:'',
        onLicenseCity:'',
        auditTime:''
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
