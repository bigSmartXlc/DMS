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
    <edit
      v-if="editPopupsVisible"
      :key="editPopupsKey"
      :popups-visible="editPopupsVisible"
      :data-for-form="editRowData"
      :popups-state="editPopupsState"
      :title-name="titleName"
      :isshow="isshow"
      @close="close"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Edit from './edit'
import Vue from 'vue'
export default {
  name: 'Orgorder',
  components: {
    OneTableTemplate,
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
      // 弹窗类型
      isshow: '',
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
          clickEvent: () => this.showedit('batch'),
          text: '批量手工配车', // 新增
          name: 'batchSubmit',
          position: 'left'
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          clickEvent: () => this.showedit('import'),
          text: '导入配车', // 新增
          name: 'importTemplate',
          position: 'left'
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          clickEvent: () => this.allow(),
          text: '导出', // 新增
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
              labelName: '客户姓名', // this.$t("org.label.carBrandCnCode"), //供应商编码
              codeField: 'orderCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: 'VIN码', // 供应商名称
              codeField: 'orgcode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '订单编号', // 供应商名称
              codeField: 'pName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '合同编号', // '启用状态',I
              codeField: 'isInvoice',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '订单状态', // '启用状态',
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
              label: '操作', // 操作
              codeField: 'controlBtn',
              width: 100,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '配车', // 编辑
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: index => { this.showcar(index) },
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
            {
              prop: 'orderCode',
              label: '订单状态', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '客户名称', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '客户联系电话', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '销售订单号 ', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: 'VIN码', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '车型配置', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '车型名称',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '车身颜色', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'password',
              label: '内饰颜色', // 管理员密码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleId',
              label: '电池包', // 角色ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '仓库名称', // this.$t("org.label.isFrozen"), //状态
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
    showcar(index) {
      this.titleName = '手动配车'
      this.isshow = 'car'
      this.showEdit(index)
    },
    // 显示批量导入
    showedit(data) {
      this.editPopupsVisible = true
      this.isshow = data
      if (data === 'batch') {
        this.titleName = '批量手工配车'
      } else if (data === 'import') {
        this.titleName = '导入配车'
      }
    }
  }
}
</script>
