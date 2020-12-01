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
          ref="multipleTable"
          :dynamic-buttons="tableButtons"
          :dynamic-components="tableComponents"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="true"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="300"
          :callback-obj="callbackObj"
        />
      </div>
    </el-dialog>
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
    }
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      titleName: '订单详情',
      // 网格查询API配置对象
      apiConfig: orgApis.orderInvoice,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.confirm(),
          text: '确认', // 查询
          name: 'search', // 按钮图标样式
          position: 'left',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          clickEvent: () => this.closeEdit(),
          text: '取消',
          name: 'reset',
          position: 'left' // 重置
        },
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
              labelName: '交付专员', // this.$t("org.label.carBrandCnCode"), //供应商编码
              codeField: 'orderCode',
              isMul: false,
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
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
              label: '收款项目', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '付款人', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '应收金额', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '实收金额', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '收款方式', // 管理员帐号
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
