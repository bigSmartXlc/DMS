<!--
* description: 整车销售---订单管理
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
      :dynamic-is-show-select="true"
      :dynamic-is-show-more-btn="true"
      :callback-obj="callbackObj"
    />
    <Details
      v-if="detPopupsVisible"
      :key="editPopupsKey"
      :detpopups-visible="detPopupsVisible"
      :data-for-form="editRowData"
      :popups-state="editPopupsState"
      :title-name="titleName"
      @closedet="closedet"
    />
    <Edit
      v-if="editPopupsVisible"
      :key="editPopupsKey"
      :popups-visible="editPopupsVisible"
      :data-for-form="editRowData"
      :popups-state="editPopupsState"
      :title-name="titleName"
      @close="close"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Details from './details'
import Edit from './edit'
import Vue from 'vue'
export default {
  name: 'Orgorder',
  components: {
    OneTableTemplate,
    Details,
    Edit
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
      detPopupsVisible: false,
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
          clickEvent: () => this.showEdit(),
          text: '订单分配', // 新增
          name: 'add',
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
              labelName: '大客户单号', // 供应商名称
              codeField: 'orgcode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '客户名称', // 供应商名称
              codeField: 'pName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '联系人电话',
              codeField: 'isInvoice',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '是否已分配',
              codeField: 'isVAT',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey6',
              labelName: '下单时间', // 供应商名称
              codeField: 'vin',
              component: () => import('@/components/org/datePicker/datePicker.vue'),
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey7',
              labelName: '交付中心',
              codeField: 'isVAT',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey8',
              labelName: '订单标签',
              codeField: 'isVAT',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey9',
              labelName: '门店大类',
              codeField: 'isVAT',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey10',
              labelName: '车系',
              codeField: 'isVAT',
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
            {
              prop: 'controlBtn',
              label: '订单编号', // 操作
              codeField: 'orgName',
              width: 300,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  align: 'center',
                  codeField: 'orgName',
                  clickEvent: index => { this.details(index) },
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
            {
              prop: 'orderCode',
              label: '订单号', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '大客户单号', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '门店大类', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '交付门店', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '交付专员', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '订单标签', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '车系',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '车型配置', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'password',
              label: '车身颜色', // 管理员密码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleId',
              label: '内饰颜色', // 角色ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '订单状态', // this.$t("org.label.isFrozen"), //状态
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'column1',
              label: '已收金额', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isInvoice',
              label: '车主姓名',
              width: 0,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'userId',
              label: '车主联系方式',
              width: 0,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '证件类型', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '证件号码', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '联系人姓名', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '联系人电话', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '购买方式', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '购车用途', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '购买形态', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '销售人员', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '销售人员电话', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '下单日期', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '是否允许配车', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '配车模式', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '备注', // this.$t("org.label.isEnable") /*备注*/,
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
    closedet() {
      this.detPopupsVisible = false
    },
    details(index) {
      this.detPopupsVisible = true
      console.log(this.detPopupsVisible)
      this.editRowData = this.$refs.multipleTable.list[index]
    }

  }
}
</script>
