<!--
* description: 整车销售---开票申请
* author:xlc
* createdDate: 2020-11-17
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamic-buttons="tableButtons"
      :dynamic-components="tableComponents"
      :dynamic-api-config="apiConfig"
      :dynamic-table-cols="tableCols"
      :dynamic-form-fields="formField"
      :dynamic-is-show-select="false"
      :dynamic-is-show-more-btn="true"
      :callback-obj="callbackObj"
    />
    <edit
      v-if="editPopupsVisible"
      :key="editPopupsKey"
      :popups-visible="editPopupsVisible"
      :data-for-form="editRowData"
      :popups-state="editPopupsState"
      @close="close"
    />
    <invoice
      v-if="invoicePopupsVisible"
      :key="editPopupsKey"
      :popups-visible="invoicePopupsVisible"
      :data-for-form="editRowData"
      :popups-state="editPopupsState"
      @closeinvoice="closeinvoice"
    />
    <sales-invoice
      v-if="salesInvoicePopupsVisible"
      :key="editPopupsKey"
      :popups-visible="salesInvoicePopupsVisible"
      :data-for-form="editRowData"
      :popups-state="editPopupsState"
      @closesalesInvoice="closesalesInvoice"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Edit from './edit'
import Invoice from './invoice'
import salesInvoice from './salesInvoice'
import Vue from 'vue'
export default {
  name: 'Orgorder',
  components: {
    OneTableTemplate,
    Edit,
    Invoice,
    salesInvoice
  },
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path, 'supplierMessage-edit'], () => {
      next()
    })
  },

  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      titleName: '',
      editRowData: {},
      editPopupsState: '',
      editPopupsVisible: false,
      invoicePopupsVisible: false,
      salesInvoicePopupsVisible: false,
      // 网格查询API配置对象
      apiConfig: orgApis.orderInvoice,
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
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset'),
          name: 'reset',
          position: 'right' // 重置
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          clickEvent: () => this.err(),
          text: '导出', // err
          name: 'export',
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
              labelName: '订单编号', // this.$t("org.label.carBrandCnCode"), //供应商编码
              codeField: 'orderCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '批次编号', // 供应商名称
              codeField: 'orgcode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '联系人姓名', // 供应商名称
              codeField: 'pName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '发票状态', // '启用状态',I
              codeField: 'isInvoice',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '增值税申请状态', // '启用状态',
              codeField: 'isVAT',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey6',
              labelName: 'VIN', // 供应商名称
              codeField: 'vin',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey7',
              labelName: '交付中心', // '启用状态',
              codeField: 'iscenter',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey8',
              labelName: '交付专员', // '启用状态',
              codeField: 'ispeople',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey9',
              labelName: '合同签署人', // 供应商名称
              codeField: 'orderp',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey10',
              labelName: '合同签署人电话', // 供应商名称
              codeField: 'orderphone',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey11',
              labelName: '开票时间', // 供应商名称
              codeField: 'ordertime',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey12',
              labelName: '记账状态', // '启用状态',
              codeField: 'isorder',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
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
            // {
            //   prop: 'controlBtn',
            //   label: '记账操作', // 操作
            //   codeField: 'controlBtn',
            //   width: 300,
            //   align: 'center',
            //   isComponent: true,
            //   comps: [
            //     {
            //       compKey: 'propKey1',
            //       labelName: '记账',
            //       align: 'center',
            //       codeField: 'editControlBtn',
            //       clickEvent: index => { this.tally(index) },
            //       component: () => import('@/components/org/linkButton')
            //     },
            //     {
            //       compKey: 'propKey2',
            //       labelName: '驳回开票申请',
            //       align: 'center',
            //       codeField: 'editControlBtn',
            //       clickEvent: index => { this.reject(index) },
            //       component: () => import('@/components/org/linkButton')
            //     }
            //   ]
            // },
            {
              prop: 'controlBtn',
              label: '操作', // 操作
              codeField: 'controlBtn',
              width: 300,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '发票登记',
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: index => { this.invoice(index) },
                  component: () => import('@/components/org/linkButton')
                },
                {
                  compKey: 'propKey2',
                  labelName: '机动车开票',
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: index => { this.salesInvoice(index) },
                  component: () => import('@/components/org/linkButton')
                },
                {
                  compKey: 'propKey3',
                  labelName: '增值税详情',
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: index => { this.showEdit(index) },
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
            {
              prop: 'controlBtn',
              label: '合同证件照', // 操作
              codeField: 'controlBtn',
              width: 300,
              align: 'center',
              isMul: false,
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey4',
                  labelName: '证件预览1',
                  align: 'center',
                  codeField: 'editControlBtn1',
                  clickEvent: (index) => this.edit1(index),
                  component: () => import('@/components/org/linkButton')
                },
                {
                  compKey: 'propKey5',
                  labelName: '证件预览2',
                  align: 'center',
                  codeField: 'editControlBtn2',
                  clickEvent: (index) => this.edit2(index),
                  component: () => import('@/components/org/linkButton')
                },
                {
                  compKey: 'propKey6',
                  labelName: '证件预览3',
                  align: 'center',
                  codeField: 'editControlBtn3',
                  clickEvent: (index) => this.edit3(index),
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
            {
              prop: 'orderCode',
              label: '订单编号', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '批次编号', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '联系人姓名', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '增值税申请状态', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: 'ERP记账状态', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: 'ERP冲账状态', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '是否冲账',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: this.$t('org.label.administratorRole'), // 管理员角色
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'password',
              label: this.$t('org.label.adminPassword'), // 管理员密码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleId',
              label: '角色ID', // 角色ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '状态', // this.$t("org.label.isFrozen"), //状态
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'column1',
              label: '备注', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isInvoice',
              label: '发票状态',
              width: 0,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'userId',
              label: '并发控制',
              width: 0,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '并发控制ID', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            }
          ],
      formField: {
        orderCode: '', // 供应商编码
        orgcode: '', // 供应商名称
        pName: '', // 是否可用
        editControlBtn1: '',
        editControlBtn2: '',
        editControlBtn3: '',
        isInvoice: '',
        isVAT: '',
        vin: '',
        iscenter: '',
        ispeople: '',
        orderp: '',
        orderphone: '',
        ordertime: '',
        isorder: ''
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      // 单表格模版页面组件回调事件
      callbackObj: {
        // // 手动勾选时
        // onCheckSelect: (selection, row) => {
        //   // 清除所有选中
        //   this.$refs.multipleTable.$refs.multipleTable.clearSelection()
        //   if (selection.length === 0) return
        //   // 将当前点击项选中
        //   this.$refs.multipleTable.$refs.multipleTable.toggleRowSelection(row, true)
        // },
        // // 当选择项发生变化时会触发该事件（多选时）
        // onCheckSelectChange: (selection) => {
        //   if (selection.length === 1) {
        //     this.editRowData = selection[0]
        //   }
        // }
      }
    }
  },
  mounted() {
    this.queryTable(1)
  },
  methods: {
    invoice(index) {
      console.log('++++++++++')
      this.invoicePopupsVisible = true
    },
    salesInvoice() {
      this.salesInvoicePopupsVisible = true
    },
    closeinvoice() {
      this.invoicePopupsVisible = false
    },
    closesalesInvoice() {
      this.salesInvoicePopupsVisible = false
    }
  }
}
</script>
