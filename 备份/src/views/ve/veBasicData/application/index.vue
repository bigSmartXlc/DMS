<!--
* description: 开票审核
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
      :callback-obj="callbackObj"
      @hiddenColData="hiddenColData"
    />
    <Invoice
      v-if="dialogShow"
      :is-dialog-visible="dialogShow"
      :data-for-form="editRowData"
      @close="close"
    />
    <Sales-Invoice
      v-if="salesInvoiceDialog"
      :is-dialog-visible="salesInvoiceDialog"
      :data-for-form="editRowData"
      @close="close"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
// import { testApis } from '@/api/graphQLApiList/test'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Invoice from './invoice'
import SalesInvoice from './salesInvoice'
import Vue from 'vue'

export default {
  name: 'Application',
  components: {
    OneTableTemplate,
    Invoice,
    SalesInvoice
  },
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path, ''],
      function() {
        next()
      }
    )
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      dialogShow: false,
      salesInvoiceDialog: false,
      refreshTableKey: '0',
      // table表格查询API配置对象
      dynamicApiConfig: orgApis.stoTransferInstructionQueryByPage,
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          : [
            {
              compKey: 'compKey1',
              labelName: '订单编号',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey2',
              labelName: '预期编号',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey3',
              labelName: '联系人姓名',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey4',
              labelName: '票状态',
              codeField: 'apiCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey5',
              labelName: '提升申请状态',
              codeField: 'apiCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey6',
              labelName: 'VIN',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey7',
              labelName: '交付中心',
              codeField: 'apiCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey8',
              labelName: '交付专员',
              codeField: 'apiCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey9',
              labelName: '合同签订人',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: false,
              span: 6
            },
            {
              compKey: 'compKey10',
              labelName: '合同签订人电话',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: false,
              span: 6
            },
            {
              compKey: 'compKey11',
              labelName: '开票时间',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: false,
              span: 6
            },
            {
              compKey: 'compKey12',
              labelName: '记账状态',
              codeField: 'apiCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false,
              span: 6
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
              compKey: 'btnKey1',
              type: 'primary',
              size: 'small',
              name: 'search',
              clickEvent: () => this.queryTable(1),
              text: '查询'
            },
            {
              compKey: 'btnKey2',
              type: '',
              size: 'small',
              name: 'reset',
              clickEvent: () => this.reset(),
              text: '重置'
            },
            {
              compKey: 'btnKey3',
              type: '',
              size: 'small',
              name: '',
              position: 'left',
              clickEvent: () => this.add('add'),
              text: '审核通过'
            }
          ],
      // 动态组件-表格网格列
      dynamicTableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
            {
              label: '开票操作',
              isComponent: true,
              width: 200,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '发票登记',
                  component: () => import('@/components/org/linkButton'),
                  clickEvent: (index) => this.invoice(index, 'invoice')
                },
                {
                  compKey: 'propKey2',
                  labelName: '突破开票',
                  component: () => import('@/components/org/linkButton'),
                  clickEvent: (index) => this.invoice(index, 'salesInvoice')
                },
                {
                  compKey: 'propKey3',
                  labelName: '预期详情',
                  component: () => import('@/components/org/linkButton'),
                  clickEvent: (index) => this.add('edit')
                }
              ],
              span: 16
            },
            {
              prop: 'id',
              label: '合同证件照',
              isComponent: true,
              width: 200,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '证件预览1',
                  component: () => import('@/components/org/linkButton'),
                  clickEvent: (index) => this.add('edit')
                },
                {
                  compKey: 'propKey2',
                  labelName: '证件预览2',
                  component: () => import('@/components/org/linkButton'),
                  clickEvent: (index) => this.add('edit')
                },
                {
                  compKey: 'propKey3',
                  labelName: '证件预览3',
                  component: () => import('@/components/org/linkButton'),
                  clickEvent: (index) => this.add('edit')
                }
              ]
            },
            {
              prop: 'apiCode',
              label: '订单编号'
            },
            {
              prop: 'apiName',
              label: '预期编号',
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '提升申请状态'
            },
            {
              prop: 'createdName',
              label: 'ERP记账状态'
            },
            {
              prop: 'createdDate',
              label: 'ERP冲账状态'
            },
            {
              prop: 'modifyName',
              label: '是否冲账'
            },
            {
              prop: 'lastUpdatedDate',
              label: '交付中心'
            },
            {
              prop: 'lastUpdatedDate',
              label: '交付专员'
            },
            {
              prop: 'lastUpdatedDate',
              label: '合同签订人'
            },
            {
              prop: 'lastUpdatedDate',
              label: '证件号'
            },
            {
              prop: 'lastUpdatedDate',
              label: '合同签署人电话'
            },
            {
              prop: 'lastUpdatedDate',
              label: '开票状态'
            },
            {
              prop: 'lastUpdatedDate',
              label: '门票类型'
            },
            {
              prop: 'lastUpdatedDate',
              label: '联系人姓名'
            },
            {
              prop: 'lastUpdatedDate',
              label: 'VIN码'
            },
            {
              prop: 'lastUpdatedDate',
              label: '飞机配置'
            },
            {
              prop: 'lastUpdatedDate',
              label: '车型名称'
            },
            {
              prop: 'lastUpdatedDate',
              label: '票号'
            },
            {
              prop: 'lastUpdatedDate',
              label: '票额'
            },
            {
              prop: 'lastUpdatedDate',
              label: '开票日期'
            },
            {
              prop: 'lastUpdatedDate',
              label: '开票人'
            },
            {
              prop: 'lastUpdatedDate',
              label: '票务信息备注'
            }
          ],
      // 字段格式化转换（用于导出excel）（kvs表示键值转换）
      dynamicExportConverts: {
        isEnable: {
          convert: 'kvs',
          kvs: {
            '1': '是',
            '0': '否'
          }
        }
      },
      // 单表格模版页面组件回调事件
      callbackObj: {
        // 当选择项发生变化时会触发该事件（多选时）
        onCheckSelectChange: (selection) => {
          this.handleSelectionChange(selection)
        }
      }
    }
  },
  mounted() {
    // 列表查询
    const that = this
    setTimeout(function() {
      that.queryTable(1)
    }, 1000)
  },
  methods: {
    // 发票登记
    invoice(index, type) {
      if (type === 'invoice') {
        this.dialogShow = true
      } else if (type === 'salesInvoice') {
        this.salesInvoiceDialog = true
      }
    },
    formulate() {
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
      this.salesInvoiceDialog = false
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange(selection) {
      const btns = this.dynamicButtons.filter((o) => o.disabled !== undefined)
      if (btns.length > 0) {
        const isCheck = selection && selection.length > 0
        btns.forEach((item) => {
          item.disabled = !isCheck
        })
      }
    },

    hiddenColData(data) {
      if (data && data.length > 0) {
        this.refreshTableKey += 1
        this.dynamicTableCols = data
      }
    },

    // 新增--编辑
    add(type) {

    }

  }
}
</script>
