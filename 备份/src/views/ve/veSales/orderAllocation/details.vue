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
      :visible="detpopupsVisible"
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
          ref="multipleTable1"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols1"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="false"
          :dynamic-table-defult-height="80"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <one-table-template
          ref="multipleTable2"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols2"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="80"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <one-table-template
          ref="multipleTable3"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols3"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="80"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">合同签署人信息(车主)</h3>
        <one-table-template
          ref="multipleTable4"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols4"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="80"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">联系人信息</h3>
        <one-table-template
          ref="multipleTable5"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols5"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="80"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">车辆信息</h3>
        <one-table-template
          ref="multipleTable6"
          :dynamic-buttons="tableButtons6"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols6"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="80"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">活动及权益</h3>
        <one-table-template
          ref="multipleTable7"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols7"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="80"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">订单收款流水</h3>
        <one-table-template
          ref="multipleTable8"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols8"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="80"
          :is-show-pagination="false"
          :callback-obj="callbackObj"
        />
        <h3 class="tabletitle">金融方案</h3>
        <one-table-template
          ref="multipleTable9"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols9"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-show-more-btn="true"
          :dynamic-table-defult-height="80"
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
  props: {
    detpopupsVisible: {
      type: Boolean,
      default: false
    },
    dataForForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      titleName: '订单详情',
      // 网格查询API配置对象
      apiConfig: orgApis.orderInvoice,
      // 动态生成网格列
      tableCols1:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
            {
              prop: 'orderCode',
              label: 'DMS订单编号', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '订单状态', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '下单时间', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '客户姓名', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '客户电话', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '性别', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '销售人员',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
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
              prop: 'orderCode',
              label: '购买方式', // 供应商编码
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'orgcode',
              label: '购车用途', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'pName',
              label: '购买形态', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'isVAT',
              label: '预计交付日期', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'ERPjl',
              label: '实际交付日期', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '交付城市', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '交付门店',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
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
              prop: 'orderCode',
              label: '是否代上牌', // 供应商编码
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'orgcode',
              label: '上牌省份', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'pName',
              label: '上牌城市', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'isVAT',
              label: '开票城市', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'ERPjl',
              label: '订单来源', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: 'C端订单号', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'roleName',
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
              prop: 'orderCode',
              label: '合同编号', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '合同日期', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '姓名', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '联系电话', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '证件类型', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'isVAT',
              label: '开票城市', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'ERPjl',
              label: '客户类型', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '企业名称', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
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
              prop: 'orderCode',
              label: '联系人信息', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '联系人性别', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '联系人电话', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
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
              prop: 'orderCode',
              label: '品牌', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '车系', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '车型', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '车型配置', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '车身颜色', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '内饰色', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '电机号', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '电池包', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
              label: '', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isEnable',
              label: '', // 管理员帐号
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isEnable',
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
              prop: 'orderCode',
              label: '权益ID', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '权益类型', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '权益名称', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '权益描述', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '权益分类', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '权益值', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '活动描述', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPcz',
              label: '活动开始时间', // 管理员帐号
              width: null,
              isMul: false,
              align: 'center'
            },
            // 是否启用
            {
              prop: 'isEnable',
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
              prop: 'orderCode',
              label: '按揭首付', // 供应商编码
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'orgcode',
              label: '按揭款', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'orgcode',
              label: '贴息金额', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'orgcode',
              label: '按揭机构', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
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
              prop: 'pName',
              label: '按揭期数', // 供应商ID
              width: null,
              isMul: false,
              align: 'center',
              isComponent: true,
              comps: [ // 表格编辑行公共普通输入框组件
                {
                  compKey: 'propKey1',
                  isShowLabel: false,
                  isMul: false,
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
              prop: 'orderCode',
              label: '收款项目', // 供应商编码
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '应收金额', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '实收金额', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'orgcode',
              label: '收款方式', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'pName',
              label: '收款时间', // 供应商ID
              width: null,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'isVAT',
              label: '收款状态', // 供应商名称
              width: 100,
              isMul: false,
              align: 'center'
            },
            {
              prop: 'ERPjl',
              label: '收款单号', // 管理员帐号
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
    // this.queryTable(1)
  },
  methods: {
    // 关闭弹窗
    closeEdit(type) {
      this.$emit('closedet', type)
    },
    // 保存
    save(res) {
    }
  }
}
</script>
<style scoped>
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

