<template>
  <el-dialog
    v-dialogDrag
    :visible="popupsVisible"
    center
    width="70%"
    :append-to-body="true"
    :close-on-click-modal="false"
    @close="closeEdit"
  >
    <dialogHeader slot="title" :title="titleName" :style-type="$store.state.app.dialogType" />
    <!-- <div>开票日期：2020-10-15票务代码：票务号码：</div> -->
    <!-- 显示按钮的onetabel -->
    <one-table-template
      ref="multipleTable"
      :dynamic-buttons="tableButtons"
      :dynamic-api-config="apiConfig"
      :dynamic-is-show-select="true"
      :dynamic-is-show-more-btn="false"
    />
    <div class="filter-container filter-params" />
    <table border="1">
      <tr align="right">
        <td align="right">机打代码</td>
        <td align="center">a</td>
        <td align="right" rowspan="3">税控码</td>
        <td align="center" rowspan="3">a</td>
      </tr>
      <tr>
        <td align="right">机打号码</td>
        <td align="center">a</td>
      </tr>
      <tr>
        <td align="right">机器编码</td>
        <td align="center">a</td>
      </tr>
      <tr>
        <td align="right">车主名称</td>
        <td align="center">a</td>
        <td align="right" rowspan="2">税收识别号</td>
        <td align="center" rowspan="2">a</td>
      </tr>
      <tr>
        <td align="right">身份证号码/税收机构代码</td>
        <td align="center">a</td>
      </tr>
      <tr>
        <td colspan="4">
          <one-table-template
            ref="multipleTable"
            :dynamic-components="tableComponents"
            :dynamic-api-config="apiConfig"
            :dynamic-form-fields="formField"
            :dynamic-is-show-select="false"
            :dynamic-is-init-table="false"
            :dynamic-is-column-drop="true"
          />
        </td>
      </tr>
      <tr>
        <td align="right">税价合计</td>
        <td align="center">a</td>
        <td align="right">小写</td>
        <td align="center">a</td>
      </tr>
      <tr>
        <td align="right">销货单位名称</td>
        <td align="center">a</td>
        <td align="right">电话</td>
        <td align="center">a</td>
      </tr>
      <tr>
        <td align="right">纳税人识别号</td>
        <td align="center">554433221100000</td>
        <td align="right">账号</td>
        <td align="center">a</td>
      </tr>
      <tr>
        <td align="right">地址</td>
        <td align="center">广州市</td>
        <td align="right">开户银行</td>
        <td align="center">a</td>
      </tr>
      <tr>
        <td colspan="4">
          <one-table-template
            ref="multipleTable"
            :dynamic-components="tableComponents1"
            :dynamic-api-config="apiConfig"
            :dynamic-form-fields="formField"
            :dynamic-is-show-select="false"
            :dynamic-is-init-table="false"
            :dynamic-is-column-drop="true"
          />
        </td>
      </tr>
    </table>
    <div style="height:100px">销货单位盖章：开票人：xtadmin</div>
  </el-dialog>
</template>

<script>
import dialogHeader from '@/components/dialogHeader'
import OneTableTemplate from '@/components/templates/oneTable'
import { orgApis } from '@/api/apiList/org'
export default {
  components: {
    dialogHeader,
    OneTableTemplate
  },
  props: {
    popupsVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      titleName: '机动车销售统一发票',
      listQuery: {
        car: '',
        engine: ''
      },
      // 网格查询API配置对象
      apiConfig: orgApis.sysMenuRoleQueryByPage,

      // 动态组件-按钮
      tableButtons:
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
              name: '',
              clickEvent: () => this.queryTable(1),
              text: '开票'
            },
            {
              compKey: 'btnKey2',
              type: '',
              size: 'small',
              icon: 'iconfont  icon-cancel',
              clickEvent: () => this.closeEdit(1),
              text: '取消'
            }
          ],
      // 动态组件-查询条件
      tableComponents: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents : [
          {
            compKey: 'compKey1',
            labelName: '类型车辆',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey2',
            labelName: '发动机号',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey3',
            labelName: '车辆识别代号/车架号码',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey4',
            labelName: '生产企业名称',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey5',
            labelName: '厂牌型号',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey6',
            labelName: '产地',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey7',
            labelName: '合格证号',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey8',
            labelName: '进口说明书',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey9',
            labelName: '商检单号',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          }
        ],

      tableComponents1: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents1 : [
          {
            compKey: 'compKey1',
            labelName: '预期税率',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey2',
            labelName: '预期税额',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey3',
            labelName: '不含税价',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey4',
            labelName: '完税凭证号',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey5',
            labelName: '吨位',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey6',
            labelName: '产地',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey7',
            labelName: '限乘人数',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey8',
            labelName: '进口说明书',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          },
          {
            compKey: 'compKey9',
            labelName: '商检单号',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 6
          }
        ],
      formField: {
        VINCode: '', // 供应商编码
        updateControlTime: '', // 供应商名称
        isEnable: '', // 是否可用
        wareHouse: '',
        houseAddress: '',
        carSeries: '',
        carConfig: '',
        withinColor: '',
        carColor: ''

      }
    }
  },
  mounted() {
  },
  methods: {
    // 关闭弹窗
    closeEdit(type) {
      this.$emit('closesalesInvoice', type)
    }

  }
}
</script>
