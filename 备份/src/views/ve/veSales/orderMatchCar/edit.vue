<!--
* description: 整车销售---订单管理
* author:xlc
* createdDate: 2020-11-17
-->
<template>
  <div class="app-container app-container-table">
    <el-dialog
      v-dialogDrag
      style="margin:15px"
      :visible="popupsVisible"
      :title="titleName"
      center
      width="90%"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="closeEdit"
    >
      <dialogHeader slot="title" :title="titleName" :style-type="$store.state.app.dialogType" />
      <div class="filter-container filter-params">
        <!-- 表单组件 -->
        <one-table-template
          v-if="isshow==='batch'"
          ref="multipleTable"
          :dynamic-buttons="tableButtons"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="true"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="300"
          :callback-obj="callbackObj"
        />
        <one-table-template
          v-else-if="isshow==='import'"
          ref="multipleTable"
          :dynamic-buttons="tableButtonsImport"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableColsImport"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="true"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="300"
          :callback-obj="callbackObj"
        />
        <one-table-template
          v-else
          ref="multipleTable"
          :dynamic-components="tableComponentsCar"
          :dynamic-buttons="tableButtonsCar"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableColsCar"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="true"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="300"
          :callback-obj="callbackObj"
        />
      </div></el-dialog>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import dialogHeader from '@/components/dialogHeader'
import Vue from 'vue'
export default {
  components: {
    OneTableTemplate,
    dialogHeader
  },
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path, 'supplierMessage-edit'], () => {
      next()
    })
  },
  props: {
    popupsVisible: {
      type: Boolean,
      default: false
    },
    dataForForm: {
      type: Object,
      default: () => {}
    },
    isshow: {
      type: String,
      default: ''
    },
    titleName: {
      type: String,
      default: '配车'
    }
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
          clickEvent: () => this.confirm(),
          text: '批量手工配车', // 查询
          name: 'search', // 按钮图标样式
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: '导出',
          name: 'reset',
          position: 'right' // 重置
        }
      ],
      tableButtonsImport: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.confirm(),
          text: '导入配车',
          name: 'import', // 按钮图标样式
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: '下载模板',
          name: 'reset',
          position: 'right' // 重置
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: '导出说明',
          name: 'export',
          position: 'right' // 重置
        }
      ],
      tableButtonsCar: [
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
        }
      ],
      // 动态组件-查询条件
      tableComponentsCar:
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
              labelName: 'VIN码',
              codeField: 'orderCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '仓库',
              codeField: 'isVAT',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '车身颜色',
              codeField: 'orderCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '车型配置',
              codeField: 'orderCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '内饰颜色',
              codeField: 'orderCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: false
            },
            {
              compKey: 'compKey6',
              labelName: '合格证',
              codeField: 'orderCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
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
              prop: 'orderCode',
              label: '订单编号', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '批量配车说明', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '订单状态', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '客户名称', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '客户联系电话', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: 'VIN码', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '车型配置',
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
              prop: 'roleName',
              label: '内饰颜色', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '电池厂型号', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '仓库名称', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      tableColsImport:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orgcode',
              label: '导入配车说明', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode',
              label: '销售订单号', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '订单状态', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '客户名称', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '客户联系电话', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: 'VIN码', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '车型配置',
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
              prop: 'roleName',
              label: '内饰颜色', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '电池包', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '仓库名称', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      tableColsCar:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode',
              label: 'DMS订单编号', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '订单状态', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '下单时间', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '客户姓名', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '客户电话', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '性别', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '销售人员',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '订单标签', // 管理员角色
              width: 100,
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

      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.queryTable(1)
    })
  },
  methods: {
    // 关闭弹窗
    closeEdit(type) {
      this.$emit('close', type)
    },
    // 保存
    save(res) {
    }
  }
}
</script>
