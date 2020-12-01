<!--
* description: 整车销售---订单管理
* author:xlc
* createdDate: 2020-11-17
-->
<template>
  <div class="app-container app-container-table">
    <el-dialog
      v-dialogDrag
      style="margin:15px;height:80%"
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
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="true"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="300"
          :callback-obj="callbackObj"
        />
        <div>
          <h3 class="tabletitle">订单金额</h3>
          <table border="1 " width="100%" style="margin: auto;text-align:center">
            <tr>
              <td rowspan="4" style="width: 300px;">整车价格信息</td>
              <td style="width: 400px;">销售统一价格</td>
              <td colspan="3">0</td>
            </tr>
            <tr>
              <td>选装-轮毂</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td>选装-电池包</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td>整车费用合计</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td rowspan="9">抵扣信息</td>
              <td>优惠券</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td>翻倍</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td>推荐/内购</td>
              <td>1</td>
              <td>1</td>
              <td>%</td>
            </tr>
            <tr>
              <td>保险</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td>特殊折扣</td>
              <td>1</td>
              <td>1</td>
              <td>%</td>
            </tr>
            <tr>
              <td>手工折扣1</td>
              <td>0</td>
              <td>备注</td>
              <td>1</td>
            </tr>
            <tr>
              <td>手工折扣2</td>
              <td>0</td>
              <td>备注</td>
              <td>1</td>
            </tr>
            <tr>
              <td>手工折扣3</td>
              <td>1</td>
              <td>备注</td>
              <td>1</td>
            </tr>
            <tr>
              <td>抵扣合计</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td colspan="2">整车开票金额</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td colspan="2">定金</td>
              <td colspan="3">1.00</td>
            </tr>
            <tr>
              <td colspan="2">整车尾款</td>
              <td colspan="3">1.00</td>
            </tr>
            <tr>
              <td rowspan="3">附加费用</td>
              <td>金融服务费</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td>上牌代办</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td>附加费用合计</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td colspan="2">应收总金额（整车开票金额+附加费用合计）</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td colspan="2">已收总金额</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td colspan="2">贷款金额(同贷金额)</td>
              <td colspan="3">1</td>
            </tr>
            <tr>
              <td colspan="2">未收总金额</td>
              <td colspan="3">1</td>
            </tr>
          </table>
        </div>
        <h3 class="tabletitle">订单流水</h3>
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="true"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="300"
          :callback-obj="callbackObj"
          :isshow-search-table-button="false"
        />
        <!-- 按钮组件 -->
        <mix-button
          class="app-common-mar"
          :dynamic-buttons="dynamicButtons"
          :template-type="true"
        />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import mixButton from '@/components/basicComponent/mixButton'
import dialogHeader from '@/components/dialogHeader'
import Vue from 'vue'
export default {
  components: {
    OneTableTemplate,
    dialogHeader,
    mixButton
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
      titleName: '订单收款',
      // 网格查询API配置对象
      apiConfig: orgApis.orderInvoice,
      // 动态组件-按钮
      dynamicButtons: [
        {
          name: 'preservation',
          text: '确认',
          clickEvent: this.save,
          position: 'right',
          isMust: false,
          type: 'primary'
        },
        {
          name: 'reset',
          text: '取消',
          clickEvent: this.resetData,
          position: 'right'
        }
      ],
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.queryTable(1),
          text: '收款', // 查询
          name: 'search', // 按钮图标样式
          position: 'right',
          fuzzySearch: true
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
              codeField: 'rebatetype',
              labelName: '支付方式',
              component: () => import('@/components/org/radioBox/index.vue'),
              type: 'radio',
              isMust: true,
              isRequire: true,
              span: 24,
              options: [
                { value: 'Z002', label: 'POS支付' },
                { value: 'Z001', label: '转账支付' },
                { value: 'Z000', label: '支付宝' }
              ]
            },
            {
              compKey: 'compKey2',
              labelName: '收款项目',
              codeField: 'isInvoice',
              lookuptype: 'VE0000',
              isRequire: true,
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '收款金额',
              codeField: 'vin',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '备注',
              codeField: 'pName',
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
              prop: 'controlBtn',
              label: '操作', // 操作
              codeField: 'controlBtn',
              width: 300,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  // labelName: '收款', // 编辑
                  align: 'center',
                  codeField: 'editControlBtn',
                  // clickEvent: index => { this.showEdit(index) },
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
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
<style scoped>
  .tabletitle{
    text-align: left;
    border-left: 6px solid blue;
    padding-left:1rem;
    margin-top:1.5rem
    }
    .filter-container{
      padding:4rem
    }
</style>
