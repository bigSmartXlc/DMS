<!--
* description: 月销售计划调整比例设置
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
    <Edit
      v-if="dialogShow"
      :is-dialog-visible="dialogShow"
      :data-for-form="editRowData"
      :title-name="titleName"
      @close="close"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
// import { testApis } from '@/api/graphQLApiList/test'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Edit from './edit'
import Vue from 'vue'

export default {
  name: 'VeTotalInfor',
  components: {
    OneTableTemplate,
    Edit
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
              labelName: '制定年月',
              codeField: 'apiCode',
              isRequire: true,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey2',
              labelName: '计划开始年月',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey3',
              labelName: '计划结束年月',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey4',
              labelName: '门店',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey5',
              labelName: '车型配置名称',
              codeField: 'apiCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
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
              text: '保存'
            },
            {
              compKey: 'btnKey3',
              type: '',
              size: 'small',
              name: '',
              position: 'left',
              clickEvent: () => this.add('add'),
              text: '同步'
            },
            {
              compKey: 'btnKey3',
              type: '',
              size: 'small',
              name: '',
              position: 'left',
              clickEvent: () => this.formulate(),
              text: '制定'
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
              label: '地区'
              // fixed: true,
              // isComponent: true,
              // comps: [
              //   {
              //     compKey: "propKey1",
              //     labelName: "编辑",
              //     component: () => import("@/components/org/linkButton"),
              //     clickEvent: (index) => this.add('edit'),
              //   },
              // ],
            },
            {
              prop: 'id',
              label: '主键ID',
              hidden: true,
              alwaysHidden: true
            },
            {
              prop: 'apiCode',
              label: '门店名称'
            },
            {
              prop: 'apiName',
              label: '车毂',
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '配置'
            },
            {
              prop: 'createdName',
              label: '电池包'
            },
            {
              prop: 'createdDate',
              label: '外观颜色'
              // sortable: true,
            },
            {
              prop: 'modifyName',
              label: '内饰颜色'
            },
            {
              prop: 'lastUpdatedDate',
              label: '制定年月'
            },
            {
              prop: 'lastUpdatedDate',
              label: '计划年月'
            },
            {
              prop: 'lastUpdatedDate',
              label: '基数'
            },
            {
              prop: 'lastUpdatedDate',
              label: '浮动上限(%)+'
            },
            {
              prop: 'lastUpdatedDate',
              label: '浮动下限(%)+'
            },
            {
              prop: 'lastUpdatedDate',
              label: '最高台数+'
            },
            {
              prop: 'lastUpdatedDate',
              label: '最低台数+'
            },
            {
              prop: 'lastUpdatedDate',
              label: '门店编码'
            },
            {
              prop: 'lastUpdatedDate',
              label: '车系编码'
            },
            {
              prop: 'lastUpdatedDate',
              label: '车型配置编码'
            },
            {
              prop: 'lastUpdatedDate',
              label: '车系配置名称'
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
    formulate() {
      this.dialogShow = true
      this.titleName = '制定销售计划调整比例'
    },
    close() {
      this.dialogShow = false
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
