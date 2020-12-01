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
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from 'vue'
export default {
  name: 'Orgorder',
  components: {
    OneTableTemplate
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
          clickEvent: () => this.shipment(),
          text: '发运', // 新增
          name: 'add',
          position: 'left'
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          clickEvent: () => this.cancel(),
          text: '取消发运指令', // 新增
          name: 'cancel',
          position: 'left'
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          clickEvent: () => this.cancel(),
          text: '自动发运开关', // 新增
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
              labelName: '订单编号/调拨单号：', // this.$t("org.label.carBrandCnCode"), //供应商编码
              codeField: 'orderCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '订单标签：', // 供应商名称
              codeField: 'orgcode',
              lookuptype: 'BASE0003',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '批次编号：', // 供应商名称
              codeField: 'pName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: 'VIN码', // '启用状态',I
              codeField: 'isInvoice',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '订单发运状态：', // '启用状态',
              codeField: 'isVAT',
              lookuptype: 'BASE0003',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey6',
              labelName: '交付城市：', // 供应商名称
              codeField: 'vin',
              lookuptype: 'DB0081',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey7',
              labelName: '交付中心：', // '启用状态',
              codeField: 'iscenter',
              lookuptype: 'BASE0003',
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
              label: '验收仓库', // 操作
              codeField: 'controlBtn',
              width: 205,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  align: 'center',
                  codeField: 'editControlBtn',
                  lookuptype: 'BBBBB1',
                  isColComp: true,
                  isAsync: true,
                  component: () => import('@/components/org/commonSelect'),
                  type: 'dropdownList'
                }
              ]
            },
            {
              prop: 'orderCode',
              label: '订单标签', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '订单标号/调拨单号', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '批次编号', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '订单发运状态', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '上牌城市', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '订单时间', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '交付城市',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '交付中心', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'password',
              label: 'VIN码', // 管理员密码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleId',
              label: '车系', // 角色ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '车型配置', // this.$t("org.label.isFrozen"), //状态
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'column1',
              label: '销售人员',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isInvoice',
              label: '销售人员电话',
              width: 0,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'userId',
              label: '预计交付日期',
              width: 0,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '发运申请人',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '发运申请时间',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '发运人',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '发运时间',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '备注',
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
    this.$nextTick(
      () => {
        this.queryTable(1)
      }
    )
  },
  methods: {
    shipment() {
      this.$confirm('确认发运吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发运成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    cancel() {
      this.$confirm('确认取消吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '再考虑一下',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '已取消!'
        })
      })
    }
  }
}
</script>
