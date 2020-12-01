<!--
* description: 经销商信息管理
* author: dinggf
* createdDate: 2019-10-22
-->
<template>
  <div class="app-container app-container-table">
    <TreeTable
      ref="multipleTable"
      :tree-object="treeObject"
      :dynamic-buttons="tableButtons"
      :dynamic-components="tableComponents"
      :dynamic-form-fields="formField"
      :dynamic-un-form-fields="unFormField"
      :dynamic-table-cols="tableCols"
      :dynamic-api-config="apiConfig"
      :dynamic-is-show-more-btn="isMoreBtn"
      :dynamic-is-show-select="false"
      :dynamic-expand-all="true"
      :dynamic-export-converts="exportConverts"
    />
    <edit
      :key="editPopupsKey"
      :dynamic-edit-row-data="editRowData"
      :popups-visible="editPopupsVisible"
      :popups-state="editPopupsState"
      @close="close"
      @queryTree="queryTree"
    />
  </div>
</template>

<script>
import { orgApis } from '@/api/apiList/org'
import TreeTable from '@/components/templates/treeTable'
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import Vue from 'vue'
export default {
  name: 'DlrInfoManages',
  components: {
    TreeTable,
    Edit: () => import('./edit')
  },
  mixins: [oneTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      [to.path, 'veDlrInfoManagesEdit'],
      function() {
        next()
      }
    )
  },
  data() {
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, viewPageCode)
    return {
      // 树对象
      treeObject: {
        // 配置树网格查询API配置对象
        treeApiConfig: orgApis.mdmOrgRelationRealQueryByPage,
        // treeApiConfig: orgApis.mdmOrgAreaDlrQueryByPage,
        // 树接口需要返回的字段
        returnTreeCol: [
          // "dlrId",
          // "dlrCode",
          // "dlrShortName",
          // "orgBelongType"
          'orgName',
          'orgCode',
          'orgBelongType',
          'orgTreeId',
          'linkId',
          'isEnable',
          'parentOrgTreeId',
          'treeType',
          'orgRealId'
        ],
        // 树的查询条件
        // orgTreeId:'-1',
        treeQuery: {
          companyid: this.$store.getters.orgInfo.COMPANY_ID,
          orgBelongType: '0,1,4,5,6,7',
          isEnable: '1'
        },
        // 排序的对象 label现在是名字 , children 子节点
        defaultProps: {
          children: 'children',
          label: 'orgName'
        }
      },
      // 设置是否显示更多按钮
      isMoreBtn: true,
      // 网格查询API配置对象
      // apiConfig: orgApis.mdmOrgNodeRelQueryFindAll,
      apiConfig: orgApis.mdmOrgdlrQueryByPage,
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
              clickEvent: () => this.queryTable(1),
              text: this.$t('sys.button.query'),
              name: 'search',
              position: 'right',
              fuzzySearch: true,
              isMust: false
            }, // 查询
            // {
            //   compKey: "btnKey2",
            //   type: "",
            //   size: "small",
            //   clickEvent: () => this.add(),
            //   text: this.$t("sys.button.add"),
            //   name: "add",
            //   position: "left"
            // }, // 新增
            {
              compKey: 'btnKey3',
              type: '',
              size: 'small',
              clickEvent: () => this.reset(),
              text: this.$t('sys.button.reset'),
              name: 'reset',
              position: 'right',
              isMust: false
            }, // 重置
            {
              compKey: 'btnKey4',
              type: '',
              size: 'small',
              clickEvent: () => this.exportExcel(),
              text: this.$t('sys.button.export'),
              name: 'export',
              position: 'left'
            } // 导出
          ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
            .tableComponents
          : [
            {
              compKey: 'compKey1',
              span: 8,
              labelName: this.$t('org.label.dlrCode'), // 经销商代码
              codeField: 'dlrCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            }, // 经销商代码
            {
              compKey: 'compKey2',
              span: 8,
              labelName: this.$t('org.label.distributorName'), // 经销商名称
              codeField: 'dlrShortName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            }, // 经销商名称
            {
              compKey: 'compKey3',
              span: 8,
              labelName: this.$t('org.label.distributorCategory'), // 经销商大类
              codeField: 'orgType',
              lookuptype: 'DB0062',
              parentFileds: 'lookupValueCode',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: true
            }, // 经销商大类
            {
              compKey: 'compKey4',
              span: 8,
              labelName: this.$t('org.label.isEnableCn'), // 启用状态
              codeField: 'isEnable',
              component: () =>
                import('@/components/org/isEnable/isEnableOne'),
              type: 'dropdownList',
              isMust: false
            }, // 启用状态
            {
              compKey: 'compKey5',
              span: 8,
              labelName: this.$t('org.label.onlineStatus'), // 上线状态
              lookuptype: 'VE0629',
              codeField: 'onlineFlag',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            }, // 上线状态
            {
              compKey: 'compKey6',
              span: 8,
              labelName: this.$t('org.label.distributorType'), // 经销商类型
              codeField: 'dlrType',
              lookuptype: 'DB0049',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              isMust: false
            } // 经销商类型
          ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
            {
              prop: 'controlBtn',
              label: this.$t('sys.content.operate'),
              codeField: 'controlBtn',
              width: 60,
              align: 'center',
              isComponent: true,
              fixed: true,
              comps: [
                {
                  compKey: 'propKey0',
                  labelName: '查看详情',
                  codeField: 'editControlBtn',
                  clickEvent: this.edit,
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
            {
              prop: 'bigAreaName',
              label: '大区',
              /* 经销商代码*/
              hidden: null,
              align: 'center'
            },
            {
              prop: 'smallAreaName',
              label: '小区',
              /* 经销商代码*/
              hidden: null,
              align: 'center'
            },
            {
              prop: 'provinceName',
              label: '省份',
              /* 经销商代码*/
              hidden: null,
              align: 'center'
            },
            {
              prop: 'cityName',
              label: '城市',
              /* 经销商代码*/
              hidden: null,
              align: 'center'
            },
            {
              prop: 'dlrLevelName',
              label: '级别',
              /* 经销商代码*/
              hidden: null,
              align: 'center'
            },
            {
              prop: 'dlrCode',
              label: this.$t('org.label.dlrCode'),
              /* 经销商代码*/ width: 150,
              hidden: null,
              align: 'center'
            },
            {
              prop: 'dlrShortName',
              label: this.$t('org.label.distributorName'),
              /* 经销商名称*/ width: 180,
              hidden: null,
              align: 'center'
            },
            {
              prop: 'dlrFullName',
              label: this.$t('org.label.distributorFullName'),
              /* 经销商全称*/ width: 240,
              hidden: null,
              align: 'center'
            },
            {
              prop: 'orgType',
              label: this.$t('org.label.distributorCategory'),
              /* 经销商大类*/ width: 120,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'orgTypeName',
              label: this.$t('org.label.distributorCategory'),
              /* 经销商大类*/ width: 100,
              hidden: false,
              align: 'center'
            },

            {
              prop: 'dlrType',
              label: this.$t('org.label.distributorType'),
              /* 经销商类型*/ width: 150,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'dlrTypeName',
              label: this.$t('org.label.distributorTypeName'),
              /* 经销商类型名称*/ width: 100,
              hidden: false,
              align: 'center'
            },

            {
              prop: 'onlineFlag',
              label: this.$t('org.label.onlineStatus'),
              /* 上线状态*/ width: 100,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'onLineName',
              label: this.$t('org.label.onlineStatus'),
              /* 上线状态*/ hidden: false,
              align: 'center'
            },
            {
              prop: 'onlineTime',
              label: this.$t('org.label.onlineTime'), /* 上线时间*/
              width: 160,
              hidden: null,
              align: 'center'
            },
            // 启用状态
            {
              prop: 'isEnable',
              label: this.$t('org.label.isEnableCn'),
              width: 100,
              hidden: true,
              align: 'center'
            },
            {
              prop: 'isEnableCn',
              label: this.$t('org.label.isEnableCn'),
              width: 100,
              align: 'center'
            },
            //   , isComponent: true,
            //   comps: [
            //     {
            //       compKey: "propKey0",
            //       codeField: "isEnable",
            //       isShowLabel: false,
            //       clickEvent: () => null,
            //       component: () => import("@/components/org/isEnable/isEnableText")
            //     }
            //   ]
            // },

            {
              prop: 'provinceId',
              label: this.$t('org.label.province'),
              /* 省份*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'cityId',
              label: this.$t('org.label.cityName'),
              /* 城市*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'countyId',
              label: this.$t('org.label.county'),
              /* 区县*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'userName',
              label: this.$t('org.label.adminAccount'),
              /* 管理员账号*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'userId',
              label: this.$t('org.label.adminAccount'),
              /* 管理员账号*/ hidden: true,
              align: 'center'
            },

            {
              prop: 'password',
              label: this.$t('org.label.adminPassword'),
              /* 管理员密码*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'roleId',
              label: this.$t('org.label.administratorRole'),
              /* 管理员角色*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'dlrStatus',
              label: '建店状态',
              /* 建店状态*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'dlrEnName',
              label: '经销商英文名',
              /* 经销商英文名*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'dlrNameOld',
              label: '曾用名',
              /* 曾用名*/ hidden: true,
              align: 'center'
            },
            // { prop: 'stockRight', label: “股权,/*股权*/ hidden: true, align: 'center' },
            {
              prop: 'climateStatus',
              label: '气候状态',
              /* 气候状态*/ hidden: true,
              align: 'center'
            },
            // { prop: 'closingTime', label: "停业时间",/*停业时间*/ hidden: true, align: 'center' },
            {
              prop: 'registerMoney',
              label: '注册资金',
              /* 注册资金*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'guno',
              label: '组织结构代码',
              /* 组织结构代码*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'updateControlId',
              label: '并发控制ID',
              /* 并发控制ID*/ width: null,
              align: 'center',
              hidden: true
            },
            {
              prop: 'email',
              label: '邮箱',
              /* 邮箱*/ width: null,
              align: 'center',
              hidden: true
            },
            {
              prop: 'linkAddr',
              label: '建店地址',
              /* 建店地址*/ width: null,
              align: 'center',
              hidden: true
            },
            {
              prop: 'dlrId',
              label: '经销商Id',
              /* 经销商Id*/ width: null,
              align: 'center',
              hidden: true
            },
            {
              prop: 'dlrLevel',
              label: '经销商级别',
              /* 经销商级别*/ width: null,
              align: 'center',
              hidden: true
            },
            // { prop: 'parentDlrId', label: '所属一网', /* 所属一网*/ width: null, align: 'center', hidden: true },
            // { prop: 'parentDlrName', label: '所属一网名称', /* 所属一网名称*/ width: null, align: 'center', hidden: true },
            {
              prop: 'dlrStatusName',
              label: '建店状态名',
              /* 建店状态名*/ width: null,
              align: 'center',
              hidden: true
            },
            {
              prop: 'rescuHotline',
              label: '救援热线',
              /* 救援热线*/ width: null,
              align: 'center',
              hidden: true
            }, // 电话格式
            {
              prop: 'urgSosTel',
              label: '紧急救援电话',
              /* 紧急救援电话*/ width: null,
              align: 'center',
              hidden: true
            }, // 手机格式
            {
              prop: 'carBrandCode',
              label: '主营品牌',
              /* 主营品牌*/ width: null,
              align: 'center',
              hidden: true
            }
          ],
      // 字段格式化转换（用于导出excel）（kvs表示键值转换）
      exportConverts: {
        isEnable: {
          convert: 'kvs',
          kvs: {
            '1': this.$t('org.label.startUsing') /* 启用*/,
            '0': this.$t('org.label.blockUp') /* 停用*/
          }
        }
      },
      // 查询条件
      formField: this.$utils.getFormField(
        this,
        {
          dlrCode: '',
          dlrId: '',
          dlrShortName: '',
          dlrType: '',
          areaId: '',
          smallAreaId: '',
          carBrandCode: '',
          isEnable: '',
          bigAreaId: '',
          onlineFlag: '',
          orgType: '',
          lookupValueCode: '1'
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      orgClickData: {},

      unFormField: {
        lookupValueCode: ''
      },

      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false
    }
  },
  mounted() {
    // 调用加载树的方法 params1 父节点ID, params2当前节点id
    this.$refs.multipleTable.queryOrganization('parentOrgTreeId', 'orgTreeId')
  },
  created() {},
  methods: {
    // 绑定单击树的事件
    handleNodeClick(data) {
      this.orgClickData = data
      this.reset()
      switch (data.orgBelongType) {
        case '0':
          break
        case '1':
          this.formField.dlrId = data.linkId
          this.formField.dlrShortName = data.orgName
          break
        case '4':
          this.formField.areaId = data.linkId
          break
        case '5':
          this.formField.bigAreaId = data.linkId
          break
        case '6':
          this.formField.smallAreaId = data.linkId
          break
        case '7':
          var childrenArry = data.children
          var areaIdData = []
          for (const i of childrenArry) {
            switch (i.orgBelongType) {
              case '0':
                break
              case '4':
                areaIdData.push(i.linkId)
                break
            }
          }
          this.formField.areaId = areaIdData.toString()
          break
      }
      // this.formField.dlrShortName = data.orgName
      this.$refs.multipleTable.queryTable(1)
    },

    queryTree() {
      // 调用加载树的方法 params1 父节点ID, params2当前节点id
      this.$refs.multipleTable.queryOrganization(
        'parentOrgTreeId',
        'orgTreeId'
      )
    }
  }
}
</script>

<style>
</style>
