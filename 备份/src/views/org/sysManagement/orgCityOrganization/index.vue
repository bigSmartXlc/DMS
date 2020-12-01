<!--
* description: 城市管理
* author: linzewen
* createdDate: 2019-08-07
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
      :dynamic-is-init-table="true"
      :dynamic-is-show-more-btn="false"
      :dynamic-is-column-drop="true"
    />
    <edit
      :key="editPopupsKey"
      :dynamic-edit-row-data="editRowData"
      :popups-visible="editPopupsVisible"
      :popups-state="editPopupsState"
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
  name: 'VecityOrganization',
  components: {
    OneTableTemplate,
    Edit: () => import('./edit')
  },
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      [to.path, 'orgCityManage-Edit'],
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
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgCityQueryFindAll,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          name: 'search',
          position: 'right',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.queryTable(1),
          text: this.$t('sys.button.query') /* 查询*/
        },
        // {
        //   compKey: 'btnKey2',
        //   name: 'add',
        //   position: 'left',
        //   type: '',
        //   size: 'small',
        //   clickEvent: () => this.add(),
        //   text: this.$t('sys.button.add') /* 添加*/
        // },
        {
          compKey: 'btnKey3',
          name: 'reset',
          position: 'right',
          type: '',
          size: 'small',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset') /* 重置*/
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
            {
              compKey: 'compKey1',
              labelName: this.$t('org.label.cityCode') /* 城市编码*/,
              codeField: 'cityCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: this.$t('org.label.cityName') /* 城市名称*/,
              codeField: 'cityName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: this.$t('org.label.provinceName') /* 所属省份*/,
              codeField: 'provinceId',
              component: () => import('@/components/org/ProvinceQuery'),
              type: 'dropdownList',
              isMust: true
            },
            {
              compKey: 'compKey4',
              labelName: this.$t('org.label.isEnableCn') /* 启用状态*/,
              codeField: 'isEnable',
              component: () => import('@/components/org/isEnable/isEnableOne'),
              type: 'dropdownList',
              isMust: true
            }
          ],
      // 动态生成网格列
      tableCols: this.getCols(),
      // 表单查询数据
      formField: this.$utils.getFormField(
        this,
        {
          cityCode: '',
          cityName: '',
          provinceId: '',
          isEnable: ''
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      resetDialogKey: false
    }
  },
  methods: {
    getCols() {
      var cols = []
      if (
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
      ) {
        cols = cols.concat(
          this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
        )
      } else {
        cols = cols.concat([
          {
            prop: 'controlBtn',
            label: this.$t('sys.content.operate') /* 操作*/,
            codeField: 'controlBtn',
            width: 60,
            align: 'center',
            isComponent: true,
            comps: [
              {
                compKey: 'propKey0',
                labelName: this.$t('sys.button.edit') /* 编辑*/,
                codeField: 'editControlBtn',
                clickEvent: this.edit,
                component: () => import('@/components/org/linkButton')
              }
            ]
          },
          {
            prop: 'cityCode',
            label: this.$t('org.label.cityCode') /* 城市编码*/,
            width: null,
            align: 'center'
          },
          {
            prop: 'cityName',
            label: this.$t('org.label.cityName') /* 城市名称*/,
            width: null,
            align: 'center'
          },
          {
            prop: 'provinceName',
            label: this.$t('org.label.provinceName') /* 所属省份*/,
            width: null,
            align: 'center'
          },
          {
            prop: 'provinceId',
            label: this.$t('org.label.provinceID') /* 省份id*/,
            width: 110,
            align: 'center',
            hidden: true
          },
          {
            prop: 'orderNo',
            label: this.$t('org.label.sort') /* 排序*/,
            width: null,
            align: 'center'
          },
          {
            prop: 'isEnable',
            label: this.$t('org.label.isEnableCn') /* 启用状态*/,
            width: null,
            align: 'center',
            hidden: true
          },
          {
            prop: 'column1',
            label: this.$t('org.label.isEnableCn') /* 启用状态名*/,
            width: null,
            align: 'center',
          },
          {
            prop: 'updateControlId',
            label: this.$t('org.label.updateControlId') /* 并发控制*/,
            width: null,
            hidden: true,
            align: 'center'
          },
          {
            prop: 'cityId',
            label: this.$t('org.label.primaryKeyID') /* 主键id*/,
            width: null,
            hidden: true,
            align: 'center'
          }
        ])
      }
      return cols
    }
  }
}
</script>
