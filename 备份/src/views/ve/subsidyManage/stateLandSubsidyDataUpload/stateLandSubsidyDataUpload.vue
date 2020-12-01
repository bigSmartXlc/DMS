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
  name: 'stateLandSubsidyDataUpload',
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
              labelName: '订单编号：',
              codeField: 'orderNum',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: 'VIN码：',
              codeField: 'VINCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '订单标签：',
              codeField: 'orderLabel',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '审核状态：',
              codeField: 'auditStutas',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '购买方式：',
              codeField: 'buyMode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey6',
              labelName: '联系人姓名：',
              codeField: 'contactName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey7',
              labelName: '联系人电话：',
              codeField: 'contactPhone',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey8',
              labelName: '是否代上牌：',
              codeField: 'isInsteadOnLicense',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey9',
              labelName: '车牌号码：',
              codeField: 'licenseNumber',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey10',
              labelName: '订单上牌省份：',
              codeField: 'oderOnLicensePro',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey11',
              labelName: '订单上牌城市：',
              codeField: 'oderOnLicenseCity',
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
              prop: 'controlBtn',
              label: '操作',
              minWidth: 180,
              fixed: true,
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '编辑',
                  component: () => import('@/components/org/linkButton'),
                  // clickEvent: (index) => this.edit(index)
                },
              ]
            },
            //  attachment
            {
              prop: 'downloadAttachment',
              label: '下载附件',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey3',
                  isShowLabel: false,
                  codeField: 'downloadAttachment',
                  isRequire: true,
                  clickEvent: () => null,
                  labelName: '下载附件',
                }
              ]
            },
            {
              prop: 'isInsteadOnLicense',
              label: '是否代上牌'
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
              prop: 'oderOnLicensePro',
              label: '订单上牌省份'
            },
            {
              prop: 'oderOnLicenseCity',
              label: '订单上牌城市'
            },
            {
              prop: 'subsidyOnLicensePro',
              label: '补贴上牌省份'
            },
            {
              prop: 'subsidyOnLicenseCity',
              label: '补贴上牌城市'
            },
            {
              prop: 'certificateNum',
              label: '合格证编号'
            },
            {
              prop: 'invoiceDate',
              label: '开票日期'
            },
            {
              prop: 'invoiceLicenseNum',
              label: '车牌发票号'
            },
            {
              prop: 'factoryPlateModel',
              label: '厂牌型号'
            },
            {
              prop: 'vehicleManufactureDate',
              label: '车辆制造日期'
            },
            {
              prop: 'VINCode',
              label: 'VIN码'
            },
            {
              prop: 'invoicePrice',
              label: '发票价格'
            },
            {
              prop: 'saleUnitName',
              label: '销货单位名称'
            },
            {
              prop: 'licensePlateNum',
              label: '车牌号码'
            },
            {
              prop: 'useNature',
              label: '使用性质'
            },
            {
              prop: 'driveLicenseRegDate',
              label: '行驶证注册日期'
            },
            {
              prop: 'drawerType',
              label: '开票人类型'
            },
            {
              prop: 'drawerPhone',
              label: '开票人电话/企业电话'
            },
            {
              prop: 'issueIDNumber',
              label: '开票身份证号/社会信用代号'
            },
            {
              prop: 'drawerName',
              label: '开票人姓名/企业名称'
            },
            {
              prop: 'brandModels',
              label: '品牌型号'
            },
            {
              prop: 'drawerAddress',
              label: '开票人地址/企业地址'
            },
            {
              prop: 'corporateName',
              label: '法人名称'
            },
            {
              prop: 'corporateIDNumber',
              label: '法人身份证号'
            },
            {
              prop: 'corporatePhone',
              label: '法人联系电话'
            },
            {
              prop: 'corporateAddress',
              label: '法人地址'
            },
            {
              prop: 'riveLicenseOwner',
              label: '行驶证所有人'
            },
            {
              prop: ' entryClerk ',
              label: '录入人'
            },
            {
              prop: 'entryDate',
              label: '录入日期'
            },
            {
              prop: 'lastModifier',
              label: '最后修改人'
            },
            {
              prop: 'lastModifyTime',
              label: '最后修改时间'
            }
          ],
      formField: this.$utils.getFormField(this, {
        orderNum:'',
        VINCode:'', 
        orderLabel:'', 
        auditStutas:'', 
        buyMode:'', 
        contactName:'', 
        contactPhone:'', 
        isInsteadOnLicense:'', 
        licenseNumber:'',
        oderOnLicensePro:'',
        oderOnLicenseCity:''
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
