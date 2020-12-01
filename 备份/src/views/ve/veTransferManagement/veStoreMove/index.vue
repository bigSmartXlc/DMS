<!--
* description: 总部仓库信息维护
* author: duanhy
* createdDate: 2020-11-16
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
      titleName: '新增总部仓库信息维护',
      refreshTableKey: '0',
      dialogShow: false,
      editPopupsState: 'add',
      //   editRowData: {},
      // table表格查询API配置对象
      dynamicApiConfig: orgApis.stoTransferInstructionQueryByPage,
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
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
              type: '',
              size: 'small',
              clickEvent: () => this.add(),
              text: '审核通过',
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
      // 动态组件-表格网格列
      dynamicTableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
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
      if (type === 'add') {
        this.titleName = '新增总部仓库信息维护'
      } else {
        this.titleName = '编辑总部仓库信息维护'
      }
      this.dialogShow = true
      //   this.editRowData = {}
    },

    // 关闭编辑页面
    close(type) {
      this.dialogShow = false
      // 新增或编辑成功后操作
      if (type === 1) {
        // 调查询接口
        // this.queryTable(1);
      }
    },

    // 删除按钮单条删除
    delOneData(row) {
      const data = [this.$refs['multipleTable'].list[row]]
      this.delData(data)
    },

    // 数据批量删除
    delSeleteData() {
      const data = this.$refs['multipleTable'].$refs['multipleTable'].selection
      this.delData(data)
    },

    // 删除
    delData(selectData) {
      //   const that = this
      //   this.$confirm('确定要删除吗', '提示', {
      //     confirmButtonText: '确认',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     const saveObjList = []
      //     selectData.forEach((item) => {
      //       saveObjList.push(item.id)
      //     })
      //     const saveObj = {
      //       id: saveObjList.join()
      //     }
      //     that.$utils.apiRrequest(that, 'mutation', testApis.dbSenceApiMutationBatchDelObject, saveObj, (data) => {
      //       if (data) {
      //         that.$message({
      //           message: '删除成功',
      //           type: 'success',
      //           duration: 2000
      //         })
      //         that.queryTable(1)
      //       }
      //     })
      //   }).catch(() => {})
    }
  }
}
</script>
