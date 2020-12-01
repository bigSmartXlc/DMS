<!--
* description: 总部移库指令
* author: duanhy
* createdDate: 2020-11-11
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
      :dynamic-is-show-more-btn="false"
      :callback-obj="callbackObj"
    />
    <Add
      :key="editPopupsKey"
      :dynamic-edit-row-data="editRowData"
      :popups-visible="editPopupsVisible"
      :popups-state="editPopupsState"
      :user-name-show="userNameShow"
      :is-show-chooes="isShowChooes"
      @close="close"
      @save="save"
    />
    <Batch-Add
      :dynamic-edit-row-data="editRowData"
      :is-dialog-visible="editBatchVisible"
      :popups-state="editPopupsState"
      :user-name-show="userNameShow"
      :is-show-chooes="isShowChooes"
      @close="close"
    />
    <Car-Color
      :dynamic-edit-row-data="editRowData"
      :is-dialog-visible="carBatchVisible"
      :popups-state="editPopupsState"
      :user-name-show="userNameShow"
      :is-show-chooes="isShowChooes"
      @close="close"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Add from './add'
import BatchAdd from './batchAdd'
import CarColor from './carColor'
import Vue from 'vue'
export default {
  name: 'StoreRelocation',
  components: {
    OneTableTemplate,
    Add,
    BatchAdd,
    CarColor
  },
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path, 'storeRelocation'], function() {
      next()
    })
  },

  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      editBatchVisible: false,
      carBatchVisible: false,
      selectionIndex: '',
      selectionVal: [],
      // 网格查询API配置对象
      apiConfig: orgApis.stoTransferInstructionQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '新增',
          name: '',
          position: 'left',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          clickEvent: () => this.batchAdd(),
          text: '批量新增',
          name: '',
          position: 'left',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey3',
          type: '',
          size: 'small',
          clickEvent: () => this.car(),
          text: '批量作废',
          name: '',
          position: 'left',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey4',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.queryTable(1),
          text: '查询',
          name: 'search',
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey4',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: '重置',
          name: 'reset',
          position: 'right'
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
            .tableComponents
          : [
            // 显示组件
            {
              compKey: 'compKey1',
              labelName: '移库单',
              codeField: 'VINCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: 'VIN码',
              codeField: 'updateControlTime',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '审核状态',
              codeField: 'isEnable',
              component: () => import('@/components/org/lookupType'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '源仓库',
              codeField: 'wareHouse',
              component: () => import('@/components/org/lookupType'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '目的库',
              codeField: 'houseAddress',
              component: () => import('@/components/org/lookupType'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey6',
              labelName: '车系',
              codeField: 'carSeries',
              component: () => import('@/components/org/commonInput'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey7',
              labelName: '车型配置',
              codeField: 'carConfig',
              component: () => import('@/components/org/commonInput'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey8',
              labelName: '内饰颜色',
              codeField: 'withinColor',
              component: () => import('@/components/org/commonInput'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey9',
              labelName: '车身颜色',
              codeField: 'carColor',
              component: () => import('@/components/org/commonInput'),
              type: 'dropdownList',
              isMust: false
            }
          ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'controlBtn',
              label: '操作',
              codeField: 'controlBtn',
              width: 100,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '编辑',
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: this.edit,
                  component: () => import('@/components/org/linkButton')
                },
                {
                  compKey: 'propKey2',
                  labelName: '作废',
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: this.editDelete,
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
            {
              prop: 'orgName',
              label: '移库单',
              width: 80
            },
            {
              prop: 'wareHouse',
              label: '源仓库',
              width: 80
            },
            {
              prop: 'objective',
              label: '目的库',
              width: 80,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '审核状态',
              width: 80,
              align: 'center',
              isComponent: true
            },
            {
              prop: 'isEnable',
              label: '审核意见',
              width: 80,
              align: 'center',
              isComponent: true
            },
            {
              prop: 'VINCode',
              label: 'VIN',
              width: 80,
              align: 'center'
            },
            {
              prop: 'carSeries',
              label: '车系',
              width: 80,
              align: 'center'
            },
            {
              prop: 'carConfig',
              label: '车型配置名称',
              width: 80,
              align: 'center'
            },
            {
              prop: 'carColor',
              label: '车身颜色',
              width: 80,
              align: 'center'
            },
            {
              prop: 'withinColor',
              label: '内饰颜色',
              width: 80,
              align: 'center'
            },
            {
              prop: 'userId',
              label: '申请人',
              width: 0,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '申请时间',
              width: 80,
              align: 'center'
            },
            {
              prop: 'updateControl',
              label: '审核人',
              width: 80,
              align: 'center'
            },
            {
              prop: 'updateControlTime',
              label: '审核时间',
              width: 80,
              align: 'center'
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

      },
      callbackObj: {
        onCheckSelect: selection => {
          this.onCheckSelect(selection)
        }
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      isShowChooes: false,
      userNameShow: false
    }
  },
  watch: {
    'formField.carSeries'() {
      this.carBatchVisible = true
    }
  },
  created() {
    const that = this
    setTimeout(function() {
      that.queryTable(1)
    }, 1000)
  },
  methods: {
    onCheckSelect(selection) {
      selection.forEach(e => {
        this.selectionIndex = e.index
      })
      this.selectionVal.push(this.selectionIndex)
    },
    close(type) {
      this.editBatchVisible = false
      this.carBatchVisible = false
    },
    // 批量删除
    batchDelete() {
      this.selectionVal.forEach(e => {
        const arr = this.$refs['multipleTable'].list
        for (let i = arr.length - 1; i >= 0; i--) {
          if (arr.length > 0 && arr[i].index === e) {
            arr.splice(i, 1)
          }
        }
      })
    },
    car() {
      console.log(this.$refs['multipleTable'])
    },
    batchAdd() {
      this.editBatchVisible = true
    },
    add() {
      this.isShowChooes = true
      this.userNameShow = false
      this.showEdit('add')
    },
    editDelete(index) {
      this.$refs['multipleTable'].list.splice(index, 1)
    },

    // edit(index) {
    // this.showEdit('edit')
    //   this.oneList = this.$refs['multipleTable'].list[index]
    // },
    // 保存传值过来
    save(formField) {
      if (formField.index !== '') {
        this.$refs['multipleTable'].list[formField.index] = formField
      } else {
        this.$refs['multipleTable'].list.push(formField)
      }
      // console.log(formField)
      // this.close()
    }
  }
}
</script>
