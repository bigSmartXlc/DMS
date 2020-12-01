<!--
* description: 展示订单制作
* author: WJ
* createdDate:2020-11-12 
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamic-buttons="tableButtons"
      :dynamic-components="tableComponents"
      :dynamic-table-cols="tableCols"
      :dynamic-api-config="apiConfig"
      :dynamic-form-fields="formField"
      :dynamic-is-show-select="true"
      :dynamic-is-show-more-btn="false"
      :dynamicApiStyle="'restful'"
    />
    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      :isSetDefaultBrand="false"
      :dynamicApiStyle="'restful'"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from 'vue'
export default {
  name: 'belowOrdCreate',
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },

  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path, 'belowOrdCreateEdit'], function() {
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
      apiConfig:{
        APIUrl:'ve/belowInfoMock',
      },
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.queryTable(1),
          text: this.$t('sys.button.query'), // 查询
          name: '', // 按钮图标样式
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset'),
          name: '',
          position: 'right' // 重置
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          name: '',
          clickEvent: this.add,
          text: this.$t('sys.button.add'),
          position: 'left'
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          name: 'issue',
          clickEvent: this.showCol,
          text: '发布',
          position: 'left'
        },
        {
          compKey: 'btnKey6',
          type: '',
          size: 'small',
          name: 'invalid',
          clickEvent: this.showCol,
          text: '作废',
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
              labelName: '批次编号：',
              codeField: 'batchNum',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '负责人姓名：',
              codeField: 'principalName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '负责联系人电话：',
              codeField: 'principalPhone',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '下单时间：',
              codeField: 'orderTime',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '创建时间：',
              codeField: 'createTimeB createTimeE',
              component: () => import('@/components/org/datePicker/andtDatePicker'),
              type: 'twoDatePicker',
              format: "yyyy-MM-dd",
              dateOptionsType: "0",
              isMul: false,
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
              label: '操作',
              minWidth: 180,
              fixed: true,
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '编辑',
                  component: () => import('@/components/org/linkButton'),
                  clickEvent: (index) => this.edit(index)
                },
              ]
            },
            {
              prop: 'isBelowOrdStatus',
              label: '展车订单状态',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey3',
                  isShowLabel: false,
                  codeField: '',
                  isRequire: true,
                  clickEvent: () => null,
                }
              ]
            },
            {
              prop: 'batchNum',
              label: '批次编号'
            },
            {
              prop: 'principalName',
              label: '负责人姓名'
            },
            {
              prop: 'principalPhone',
              label: '负责人联系电话'
            },
            {
              prop: 'creator',
              label: '创建人'
            },
            {
              prop: 'createTime',
              label: '创建时间'
            },
            {
              prop: 'planSCarQuantity',
              label: '计划配车数量'
            },
            {
              prop: 'actualSCarQuantity',
              label: '实际配车数量'
            },
            {
              prop: 'total',
              label: '总计'
            },
            {
              prop: 'remark',
              label: '备注'
            }
          ],
      formField: this.$utils.getFormField(this, {
        batchNum:'', 
        principalName:'', 
        principalPhone:'', 
        orderTime:'', 
        createTime:''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode])
    }
  },
  mounted() {
    // 列表查询
    this.queryTable(1)
  },
  methods: {
    
  }
}
</script>
