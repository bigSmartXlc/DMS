<!--
* description: 展车订单配车
* author: WJ
* createdDate: 
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
    <manualSCar
      v-if="manualSCarPopupsVisible"
      :popups-visible="editPopupsVisible"
      :key="editPopupsKey"
      :data-for-form="editRowData"
      :popupsState="editPopupsState"
      @close="close"
    ></manualSCar>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from 'vue'
import manualSCar from './manualSCar'
export default {
  name: 'belowOrdCar',
  components: {
    OneTableTemplate,
    manualSCar,
    Edit: () => import("./edit"),

  },
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path, ''], function() {
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
      editRowData: {},
      editPopupsState: '',
      editPopupsVisible: false,
      manualSCarPopupsVisible: false,
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
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset'),
          position: 'right' // 重置
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          name: 'batchSupplyCar',
          clickEvent: this.batchSupplyCar,
          text: '批量配车',
          position: 'left'
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          name: 'solutionWith',
          clickEvent: this.showCol,
          text: '解配',
          position: 'left'
        },
        {
          compKey: 'btnKey6',
          type: '',
          size: 'small',
          name: 'off',
          clickEvent: this.showCol,
          text: '关闭',
          position: 'left'
        },
        {
          compKey: 'nKey7',
          type: '',
          size: 'small',
          name: '',
          clickEvent: this.showCol,
          text: '导出',
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
              labelName: '车辆单号：',
              codeField: 'carOrder',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '交付城市：',
              codeField: 'deliveryCity',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '交付中心：',
              codeField: 'deliveryCenter',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '负责姓名：',
              codeField: 'principalName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey6',
              labelName: '负责联系人电话：',
              codeField: 'principalPhone',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey7',
              labelName: '创建时间：',
              codeField: 'createTimeB createTimeE',
              component: () => import('@/components/org/datePicker/andtDatePicker'),
              type: 'twoDatePicker',
              format: "yyyy-MM-dd",
              dateOptionsType: "0",
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey8',
              labelName: '车型配置：',
              codeField: 'carConfig',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey9',
              labelName: '车辆状态：',
              codeField: 'carStatus',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey10',
              labelName: '展车门店：',
              codeField: 'belowStore',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey11',
              labelName: '门店大类：',
              codeField: 'storeGenera',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMul: false,
              isMust: false
            },
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
                labelName: '配车',
                component: () => import('@/components/org/linkButton'),
                // clickEvent: () => this.manualSCar()
                },
                {
                  compKey: 'propKey2',
                  labelName: '编辑',
                  component: () => import('@/components/org/linkButton'),
                  // clickEvent: (index) => this.edit(index)
                }
              ]
            },
            {
              prop: 'batchNum',
              label: '批次编号'
            },
            {
              prop: 'carOrder',
              label: '车辆单号'
            },
            {
              prop: 'carStatus',
              label: '车辆状态'
            },
            {
              prop: 'carConfig',
              label: '车型配置'
            },
            {
              prop: 'VINCode',
              label: 'VIN码'
            },
            {
              prop: 'storeGenera',
              label: '门店大类'
            },
            {
              prop: 'deliveryCity',
              label: '交付城市'
            },
            {
              prop: 'deliveryStore',
              label: '交付门店'
            },
            {
              prop: 'belowStore',
              label: '展车门店'
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
              prop: 'remark',
              label: '备注'
            }
          ],
      formField: this.$utils.getFormField(this, {
        batchNum:'', 
        carOrder:'',  
        deliveryCity:'', 
        deliveryStore:'', 
        principalName:'', 
        principalPhone:'', 
        createTime:'', 
        carConfig:'',
        carStatus:'',
        belowStore:'',
        storeGenera:''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode])
    }
  },
  mounted() {
    // 列表查询
    this.queryTable(1)
  },
  methods: {
    // edit(index) {
    //   this.manualSCarPopupsVisible = true
    // },
    manualSCar(index) {
      this.manualSCarPopupsVisible = true
    },
    // 当选择项发生变化时会触发该事件
    // handleSelectionChange(selection) {
    //   const btns = this.dynamicButtons.filter(o => o.disabled !== undefined)
    //   if (btns.length > 0) {
    //     const isCheck = selection && selection.length > 0
    //     btns.forEach((item) => {
    //       item.disabled = !isCheck
    //     })
    //   }
    // },

    // hiddenColData(data) {
    //   if (data && data.length > 0) {
    //     this.refreshTableKey += 1
    //     this.dynamicTableCols = data
    //   }
    // },

    // 新增
    // add() {
    //   this.dialogShow = true
    //   this.editRowData = {}
    // },
    // add() {
    //   this.isShowChooes = true
    //   this.showEdit('add')
    // },

    // 编辑
    // edit(index) {
    //   this.dialogShow = true
    //   this.editRowData = this.$refs['multipleTable'].list[index]
    // },
  }
}
</script>
