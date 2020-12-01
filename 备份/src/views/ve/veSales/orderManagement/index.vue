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
    <Details
      v-if="editPopupsVisible"
      :key="editPopupsKey"
      :popups-visible="editPopupsVisible"
      :data-for-form="editRowData"
      :popups-state="editPopupsState"
      :title-name="titleName"
      @close="close"
      @save="save"
      @isedit="isedit"
    />
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Details from './details'
import Vue from 'vue'
export default {
  name: 'Orgorder',
  components: {
    OneTableTemplate,
    Details
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
              labelName: 'DMS订单编号', // this.$t("org.label.carBrandCnCode"), //供应商编码
              codeField: 'orderCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '客户名称', // 供应商名称
              codeField: 'orgcode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '电话号码', // 供应商名称
              codeField: 'pName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: '交付专员', // '启用状态',I
              codeField: 'isInvoice',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '交付门店', // '启用状态',
              codeField: 'isVAT',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            },
            {
              compKey: 'compKey6',
              labelName: '订单状态', // 供应商名称
              codeField: 'orgcode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: false
            },
            {
              compKey: 'compKey7',
              labelName: '下单时间', // 供应商名称
              codeField: 'vin',
              component: () => import('@/components/org/datePicker/datePicker.vue'),
              isMul: false,
              isMust: false
            },
            {
              compKey: 'compKey8',
              labelName: '至', // '启用状态',
              codeField: 'iscenter',
              lookuptype: 'VE0000',
              component: () => import('@/components/org/datePicker/datePicker.vue'),
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
              codeField: 'controlBtn',
              width: 250,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '新车PDI',
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: index => { this.change(index) },
                  component: () => import('@/components/org/linkButton')
                },
                {
                  compKey: 'propKey2',
                  labelName: '开票申请',
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: index => { this.details(index) },
                  component: () => import('@/components/org/linkButton')
                },
                {
                  compKey: 'propKey3',
                  labelName: '详情',
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: index => { this.details(index) },
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
              label: 'C端订单号', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '订单来源', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '订单标签', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '订单状态', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '已收金额', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '客户姓名',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: '客户电话', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'password',
              label: '性别', // 管理员密码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleId',
              label: '证件类型', // 角色ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '证件号码', // this.$t("org.label.isFrozen"), //状态
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'column1',
              label: '联系人姓名', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isInvoice',
              label: '联系人电话',
              width: 0,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'userId',
              label: '购买方式',
              width: 0,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '购买形态', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '预计交付日期', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '销售人员', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '销售人员电话', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '下单日期', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '交付门店', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '车型配置', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '车身颜色', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '内饰颜色', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '备注', // this.$t("org.label.isEnable") /*备注*/,
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
    // 删除
    details(index) {
      this.editPopupsVisible = true
      this.editRowData = this.$refs.multipleTable.list[index]
    },
    // 保存
    save(res) {
      if (res.index) {
        this.$refs.multipleTable.list[res.index] = res
        console.log(this.$refs.multipleTable.list[res])
        this.close()
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$refs.multipleTable.list.push(res)
        this.close()
        this.$message({
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
      }
    },
    isedit(val) {
      this.titleName = val
    },
    // 导出
    exportExcel(excelName, excelSheetName, pageSize, obj) {
      this.$refs[this.tableRef].exportExcel(excelName, excelSheetName, pageSize, obj)
    },
    addone() {
      this.add()
    },
    change(index) {
      this.editPopupsVisible = true
      this.editRowData = this.$refs.multipleTable.list[index]
    }
  }
}
</script>
