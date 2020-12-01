<!--
* description: 整车销售---订单管理
* author:xlc
* createdDate: 2020-11-17
-->
<template>
  <div class="app-container app-container-table">
    <el-dialog
      v-dialogDrag
      style="margin:15px"
      :visible="popupsVisible"
      :title="titleName"
      center
      width="90%"
      :append-to-body="true"
      :close-on-click-modal="false"
      @close="closeEdit"
    >
      <dialogHeader slot="title" :title="titleName" :style-type="$store.state.app.dialogType" />
      <div class="filter-container filter-params">
        <!-- 表单组件 -->
        <h3 class="tabletitle">订单信息</h3>
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols1"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="false"
          :dynamic-table-defult-height="56"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols2"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="56"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols3"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="56"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">合同签署人信息(车主)</h3>
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols4"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="56"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">联系人信息</h3>
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols5"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="56"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">车辆信息</h3>
        <one-table-template
          ref="multipleTable"
          :dynamic-buttons="tableButtons6"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols6"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="56"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">活动及权益</h3>
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols7"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">订单收款流水</h3>
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols8"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">金融方案</h3>
        <one-table-template
          ref="multipleTable"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols9"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="56"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <div>
          <h3 class="tabletitle">合同附件</h3>
          <el-row>
            <el-col :span="4">合同附件预览:</el-col>
            <el-col class="zjimg" :span="20">
              <el-row>
                <el-col :span="6"><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1576765316,2609041935&fm=26&gp=0.jpg" alt=""></el-col>
                <el-col :span="6"><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1576765316,2609041935&fm=26&gp=0.jpg" alt=""></el-col>
                <el-col :span="6"><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1576765316,2609041935&fm=26&gp=0.jpg" alt=""></el-col>
                <el-col :span="6"><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1576765316,2609041935&fm=26&gp=0.jpg" alt=""></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row style="padding:2rem">
        <el-col :span="20">
          <el-row>
            <el-col v-for="(value,key,index) in formField1" :key="index" :span="3">
              <el-row>
                <el-col :span="24" style="color:red">{{ value }}</el-col>
                <el-col :span="24">{{ key }}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4"><el-button type="primary">确认</el-button></el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import dialogHeader from '@/components/dialogHeader'
import Vue from 'vue'
export default {
  components: {
    OneTableTemplate,
    dialogHeader
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
      tableData: [{ dms: 1, dms1: 2, dms2: 2, dms3: 2, dms4: 2, dms5: 2, dms6: 2, dms7: 8 }],
      titleName: '订单详情',
      editRowData: {},
      editPopupsState: '',
      editPopupsVisible: false,
      // 网格查询API配置对象
      apiConfig: orgApis.detailsquery,
      // 动态生成网格列
      tableCols1:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode1',
              label: 'DMS订单编号',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode2',
              label: '订单状态',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode3',
              label: '下单时间',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode4',
              label: '客户姓名', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode5',
              label: '客户电话', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode6',
              label: '性别', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'orderCode7',
              label: '销售人员',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode8',
              label: '订单标签', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      tableCols2:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode9',
              label: '购买方式',
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/LookupValue')
                }
              ]
            },
            {
              prop: 'orderCode10',
              label: '购车用途',
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/LookupValue')
                }]
            },
            {
              prop: 'orderCode11',
              label: '购买形态',
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/LookupValue')
                }]
            },
            {
              prop: 'orderCode12',
              label: '预计交付日期', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/datePicker/datePicker.vue')
                }]
            },
            {
              prop: 'orderCode13',
              label: '实际交付日期', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode14',
              label: '交付城市', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'orderCode15',
              label: '交付门店',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode16',
              label: '交付专员', // 管理员角色
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      tableCols3:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode17',
              label: '是否代上牌',
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/LookupValue')
                }
              ]
            },
            {
              prop: 'orderCode18',
              label: '上牌省份',
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/CitySelect')
                }]
            },
            {
              prop: 'orderCode19',
              label: '上牌城市',
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/CountrySelect')
                }]
            },
            {
              prop: 'orderCode20',
              label: '开票城市', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/CountrySelect')
                }]
            },
            {
              prop: 'orderCode21',
              label: '订单来源', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode22',
              label: 'C端订单号', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'orderCode23',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode24',
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      tableCols4:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode24',
              label: '合同编号',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode25',
              label: '合同日期',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode26',
              label: '姓名',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode27',
              label: '联系电话',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode28',
              label: '证件类型',
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/commonInput')
                }]
            },
            {
              prop: 'orderCode29',
              label: '开票城市', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/CountrySelect')
                }]
            },
            {
              prop: 'orderCode30',
              label: '客户类型', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode31',
              label: '企业名称', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'orderCode32',
              label: '社会信用代码', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      tableCols5:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode33',
              label: '联系人信息',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode34',
              label: '联系人性别',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode35',
              label: '联系人电话',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode36',
              label: '',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode37',
              label: '',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode38',
              label: '', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode39',
              label: '', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode40',
              label: '', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'orderCode41',
              label: '', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      // 动态组件-按钮
      tableButtons6: [
        {
          compKey: 'btnKey1',
          type: 'default',
          size: 'small',
          clickEvent: () => this.exprot(),
          text: '导出', // 查询
          name: 'add', // 按钮图标样式
          position: 'right'
        }
      ],
      tableCols6:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode42',
              label: '品牌',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode43',
              label: '车系',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode44',
              label: '车型',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode45',
              label: '车型配置',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode46',
              label: '车身颜色',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode47',
              label: '内饰色', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode48',
              label: '电机号', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode49',
              label: '电池包', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'orderCode50',
              label: '', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'orderCode51'
            },
            {
              prop: 'isEnable',
              label: '', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode52',
              label: '', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode53',
              label: '', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      tableCols7:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode54',
              label: '权益ID',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode55',
              label: '权益类型',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode56',
              label: '权益名称',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode57',
              label: '权益描述',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode58',
              label: '权益分类',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode59',
              label: '权益值', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode60',
              label: '活动描述', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode61',
              label: '活动开始时间', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'orderCode62',
              label: '活动结束时间', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            }
          ],
      tableCols9:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode63',
              label: '按揭首付',
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  span: 24,
                  align: 'center',
                  isColComp: true,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/commonInput')
                }]
            },
            {
              prop: 'orderCode64',
              label: '按揭款',
              width: null,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/commonInput')
                }]
            },
            {
              prop: 'orderCode65',
              label: '贴息金额',
              width: null,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/commonInput')
                }]
            },
            {
              prop: 'orderCode66',
              label: '按揭机构',
              width: null,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  codeField: 'countryCode',
                  lookuptype: 'BASE0003',
                  isAsync: true,
                  clickEvent: () => null,
                  component: () => import('@/components/org/LookupValue')
                }]
            },
            {
              prop: 'orderCode67',
              label: '按揭期数',
              width: null,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  codeField: 'countryCode',
                  clickEvent: () => null,
                  component: () => import('@/components/org/commonInput')
                }]
            }
          ],
      tableCols8:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode68',
              label: '收款项目',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode69',
              label: '应收金额',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode70',
              label: '实收金额',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode71',
              label: '收款方式',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode72',
              label: '收款时间',
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode73',
              label: '收款状态', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orderCode74',
              label: '收款单号', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            }
          ],
      formField: {
        orderCode1: '',
        orderCode2: '',
        orderCode3: '',
        orderCode4: '',
        orderCode5: '',
        orderCode6: '',
        orderCode7: '',
        orderCode8: '',
        orderCode9: '',
        orderCode10: '',
        orderCode11: '',
        orderCode12: '',
        orderCode13: '',
        orderCode14: '',
        orderCode15: '',
        orderCode16: '',
        orderCode17: '',
        orderCode18: '',
        orderCode19: '',
        orderCode20: '',
        orderCode21: '',
        orderCode22: '',
        orderCode23: '',
        orderCode24: '',
        orderCode25: '',
        orderCode26: '',
        orderCode27: '',
        orderCode28: '',
        orderCode29: '',
        orderCode30: '',
        orderCode31: '',
        orderCode32: '',
        orderCode33: '',
        orderCode34: '',
        orderCode35: '',
        orderCode36: '',
        orderCode37: '',
        orderCode38: '',
        orderCode39: '',
        orderCode40: '',
        orderCode41: '',
        orderCode42: '',
        orderCode43: '',
        orderCode44: '',
        orderCode45: '',
        orderCode46: '',
        orderCode47: '',
        orderCode48: '',
        orderCode49: '',
        orderCode50: '',
        orderCode51: '',
        orderCode52: '',
        orderCode53: '',
        orderCode54: '',
        orderCode55: '',
        orderCode56: '',
        orderCode57: '',
        orderCode58: '',
        orderCode59: '',
        orderCode60: '',
        orderCode61: '',
        orderCode62: '',
        orderCode63: '',
        orderCode64: '',
        orderCode65: '',
        orderCode66: '',
        orderCode67: '',
        orderCode68: '',
        orderCode69: '',
        orderCode70: '',
        orderCode71: '',
        orderCode72: '',
        orderCode73: '',
        orderCode74: ''
      },
      formField1: {
        '整车价格': 350000,
        '抵扣费用': 500,
        '附加费用': 500,
        '定金': 13500,
        '应收总金额': 33500
      },
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      // 单表格模版页面组件回调事件
      callbackObj: {

      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.queryTable(1)
    })
  },
  methods: {
    // 关闭弹窗
    closeEdit(type) {
      this.$emit('close', type)
    },
    // 保存
    save(res) {
    }
  }
}
</script>
<style scoped>
.filter-params .el-col .el-input,.filter-params .el-col .el-select{
  width:calc(100%-15px)
}
  .filter-params{
    text-align: left;
  }
  .filter-container{
    height:40rem;
    overflow-y:auto;
  }
  .tabletitle{
    border-left: 5px solid blue;
    padding-left:40px;
    margin-top:1.5em
    }
  el-dialog{
    padding:15px 15px 40px 15px
  }
  img{
    width:10rem
  }
</style>

