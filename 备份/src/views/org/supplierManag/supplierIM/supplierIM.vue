<!--
* description: 供应商信息管理
* author: liuzf
* createdDate: 2019-11-4
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
      :dynamic-is-show-select="false"
      :dynamic-is-show-more-btn="false"
    />
    <edit
      :key="editPopupsKey"
      :dynamic-edit-row-data="editRowData"
      :popups-visible="editPopupsVisible"
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
import Vue from 'vue'
export default {
  name: 'OrgSupplierIM',
  components: {
    OneTableTemplate,
    Edit: () => import('./edit')
  },
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path, 'supplierMessage-edit'], function() {
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
      apiConfig: orgApis.mdmOrgInfoQuerySupplierByPage,
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
        },
        {
          compKey: 'btnKey5',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: this.$t('sys.button.add'), // 新增
          name: 'add',
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
              labelName: this.$t('org.label.vendorCodes'), // this.$t("org.label.carBrandCnCode"), //供应商编码
              codeField: 'orgCode',
              isMul: false,
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: this.$t('org.label.vendorNames'), //供应商名称
              codeField: 'orgName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMul: false,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: this.$t('org.label.EnableSituation'), // '启用状态',
              codeField: 'isEnable',
              component: () => import('@/components/org/isEnable/isEnableOne'),
              type: 'dropdownList',
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
              label: this.$t('org.label.operation'), // 操作
              codeField: 'controlBtn',
              width: 100,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: this.$t('org.label.edit'), // 编辑
                  align: 'center',
                  codeField: 'editControlBtn',
                  clickEvent: this.edit,
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
            {
              prop: 'orgCode',
              label: this.$t('org.label.vendorCodes'), // 供应商编码
              width: null,
              align: 'center'
            },
            {
              prop: 'orgId',
              label: '供应商ID', //供应商ID
              width: null,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'orgName',
              label: this.$t('org.label.vendorNames'), // 供应商名称
              width: null,
              align: 'center'
            },
            {
              prop: 'userName',
              label: this.$t('org.label.administratorAccount'), // 管理员帐号
              width: null,
              align: 'center',
              isComponent: true
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: this.$t('org.label.EnableSituation'),
              width: 100,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey3',
                  isShowLabel: false,
                  codeField: 'isEnable',
                  isRequire: true,
                  clickEvent: () => null,
                  component: () => import('@/components/org/isEnable/isEnableText')
                }
              ]
            },
            {
              prop: 'roleName',
              label: this.$t('org.label.administratorRole'), // 管理员角色
              width: null,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'password',
              label: this.$t("org.label.adminPassword"), //管理员密码
              width: null,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'roleId',
              label: '角色ID', // 角色ID
              width: null,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '状态', // this.$t("org.label.isFrozen"), //状态
              width: null,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'column1',
              label: '备注', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'userId',
              label: '并发控制',
              width: 0,
              align: 'center',
              hidden: true
            },
            {
              prop: 'updateControlId',
              label: '并发控制ID', // this.$t("org.label.isEnable") /*备注*/,
              width: null,
              hidden: true,
              align: 'center'
            }
          ],
      formField: {
        orgCode: '', // 供应商编码
        orgName: '', // 供应商名称
        isEnable: '1' // 是否可用
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      isShowChooes: false,
      userNameShow: false
    }
  },
  methods: {

    add() {
      this.isShowChooes = true
      this.userNameShow = false
      this.showEdit('add')
    },
    edit(index) {
      var curIndex = index
      const that = this.$refs.multipleTable
      if (curIndex === undefined || curIndex === null) {
        var currentRow
        if (that.isMul === true) {
          // 多选
          var selectData = that.selection
          if (selectData.length > 0) {
            currentRow = selectData[0]
          }
        } else {
          // 单选
          currentRow = that.currentRow
        }
        if (currentRow) {
          curIndex = currentRow.index
        }
      }

      if (curIndex === undefined || curIndex === null) {
        this.$alert(this.$t('org.message.seleditData'), this.$t('org.label.warnning'))
        return
      }
      this.editRowData = that.list[curIndex]
      if (this.editRowData.isEnable === '0') {
        this.isShowChooes = true
      } else if (this.editRowData.isEnable === '1') {
        this.isShowChooes = false
      }
      if (
        this.editRowData.userName != null ||
        this.editRowData.userName != ''
      ) {
        this.userNameShow = true
      } else {
        this.userNameShow = false
      }
      this.showEdit('edit')
    }

  }
}
</script>
