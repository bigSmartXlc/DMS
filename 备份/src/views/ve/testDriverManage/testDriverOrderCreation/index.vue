<!--
* description: 试驾车订单创建
* author: wangml
* createdDate: 2020-11-12
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
      :dynamic-is-show-more-btn="true"
      :dynamic-is-show-select="true"
      :dynamic-api-style="apiStyle"
      :dynamicPageSize="15"
      :refresh-table-key="refreshTableKey"
      :callback-obj="callbackObj"
      @hiddenColData="hiddenColData"
    />
    <!--      :dynamic-export-converts="dynamicExportConverts"-->
    <edit
      :dynamic-api-config="{APIUrl: 've/orderadd'}"
      dynamic-api-style="restful"
      :popups-visible.sync="showdia"
      :popups-state="popstate"
      :dynamic-text-map="{edit:'修改订单',add:'新增订单制作'}"
      :dynamicEditRowData="clickRowsData"
      @close="popClose"
    />
  </div>
</template>
<script>
  import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
  import OneTableTemplate from '@/components/templates/oneTable'
  import edit from "./edit";
  import Vue from 'vue'
  import api from '@/api/testDriver'
  import {requestRestful} from "@/api/commonRequest";
  // import MixForm from "@/components/basicComponent/mixForm";


  export default {
    name: 'orderCreation',
    components: {
      // MixForm,
      OneTableTemplate,
      edit
    },
    mixins: [oneTableWithViewTemplateMixins],
    // 阻塞路由预加载网格中组件的数据
    beforeRouteEnter(to, from, next) {
      Vue.prototype.$ConfigCache.CacheConfig.initData(
        // 同时加载当前页面和编辑框页面的配置
        [to.path, ''],
        function() {
          next()
        })
    },
    data() {
      // 页面标识（与上面beforeRouteEnter中的对应）
      const viewPageCode = this.$route.path
      // 绑定事件配置化事件
      this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
      return {
        selectList:[],
        clickRowsData:{},
        popstate:'add',
        showdia: false,
        // 指定请求类型 可以统一在 utils/config.js中配置
        apiStyle:'restful',
        dynamicApiConfig: api.orderCreation ,
        refreshTableKey: '0',
        ruleSettingShow: false,
        // table表格查询API配置对象
        // 动态组件-查询条件
        tableComponents:
          this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents :
          [
            {
              compKey: 'compKey1',
              labelName: 'OA单号',
              codeField: 'oaCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey2',
              labelName: '内部用车单号',
              codeField: 'insideCarCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey3',
              labelName: '审核状态',
              codeField: 'auditStatus',
              component: () => import('@/components/org/LookupValue'),
              type: 'dropdownList',
              lookuptype:"AI0021",
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey4',
              labelName: '下单时间',
              codeField: 'orderTime',
              component: () => import('@/components/org/datePicker/datePicker'),
              type: 'dropdownList',
              isMust: true,
              span: 6
            },
            {
              compKey: 'compKey5',
              labelName: '交付中心',
              codeField: 'deliveryCenter',
              component: () => import('@/components/org/CitySelectX'),
              type: 'dropdownList',
              isMust: true,
              span: 6
            },
          ],

        // form 的表单对象
        formField: this.$utils.getFormField(this, {
          oaCode: '', // OA单号
          insideCarCode: '', // 内部用车单号
          auditStatus: '',  // 审核状态
          orderTime:'', // 下单时间
          deliveryCenter:'' ,// 交付中心
          plannedDistribution:'', // 计划配车数量
          actualDistribution:'', // 实际配车数量
          remark:'' // 备注
        }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),
        // 动态组件-按钮
        dynamicButtons: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons : [
            {
              compKey: 'btnKey1',
              type: 'primary',
              size: 'small',
              name: 'search',
              clickEvent: () => this.queryTable(1),
              text: '查询'
            },
            {
              compKey: 'btnKey2',
              type: '',
              size: 'small',
              name: 'reset',
              clickEvent: this.reset,
              text: '重置'
            },
            // {
            //   compKey: 'btnKey2',
            //   type: '',
            //   size: 'small',
            //   icon: 'el-icon-view',
            //   clickEvent: this.showCol,
            //   text: '列显隐'
            // },
            {
              compKey: 'btnKey3',
              type: '',
              size: 'small',
              name: 'add',
              position: 'left',
              clickEvent: this.add,
              text: '新增',
            },
            {
              compKey: 'btnKey4',
              type: '',
              size: 'small',
              name: 'apply',
              position: 'left',
              clickEvent: this.add,
              text: '申请',
              disabled: true
            },
            {
              compKey: 'btnKey4',
              type: '',
              size: 'small',
              name: 'del',
              position: 'left',
              clickEvent: this.delData,
              text: '作废',
              disabled: true,
            },
            // {
            //   compKey: 'btnKey4',
            //   type: '',
            //   size: 'small',
            //   name: 'deleteSheet',
            //   position: 'left',
            //   clickEvent: this.delSeleteData,
            //   text: '删除',
            //   disabled: true
            // }
          ],
        // 动态组件-表格网格列
        dynamicTableCols: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols : [
            {
              label: '操作',
              minWidth: 180,
              fixed: true,
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  labelName: '编辑',
                  component: () => import('@/components/org/linkButton'),
                  // component: () => import('@/components/org/datePicker/datePicker.vue'),
                  clickEvent: (index) => this.edit(index)
                },
              ]
            },
            {
              prop: 'releaseId',
              label: '主键ID',
              hidden: true,
              alwaysHidden: true
            },
            {
              prop: 'updateControlId',
              label: '并发控制ID',
              hidden: true,
              alwaysHidden: true
            },
            {
              prop: 'oaCode',
              label: 'OA单号'
            },
            {
              prop: 'insideCarCode',
              label: '内部用车单号'
            },
            {
              prop: 'deliveryCityText',
              label: '交付中心',
            },
            {
              prop: 'auditStatus',
              label: '审核状态',
            },
            {
              prop: 'orderTime',
              label: '下单时间'
            },
            {
              prop: 'plannedDistribution',
              label: '计划配车数量'
            },
            {
              prop: 'actualDistribution',
              label: '实际配车数量',
            },
            {
              prop: 'remark',
              label: '备注'
            }
          ],
        // 字段格式化转换（用于导出excel）（kvs表示键值转换）
        // dynamicExportConverts: {
        //   'isForce': {
        //     'convert': 'kvs',
        //     'kvs': {
        //       '1': '是',
        //       '0': '否'
        //     }
        //   }
        // },
        // 单表格模版页面组件回调事件
        callbackObj: {
          // 当选择项发生变化时会触发该事件（多选时）
          onCheckSelectChange: (selection) => {
            this.selectList = selection
            this.handleSelectionChange(selection)
          }
        }
      }
    },
    mounted() {
      // 列表查询
      this.queryTable(1)
    },
    methods: {
      // 保存 或新增 后会调用此方法
      popClose(type){
        this.showdia = false
        if (type == 1){
          this.queryTable(1)
        }
      },
      // 当选择项发生变化时会触发该事件
      handleSelectionChange(selection) {
        const btns = this.dynamicButtons.filter(o => o.disabled !== undefined)
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

      // 新增
      add() {
        this.clickRowsData = {}
        this.popstate = 'add'
        this.showdia = true
      },

      // 编辑
      edit(index) {
        this.clickRowsData = this.$refs['multipleTable'].list[index]
        this.popstate = 'edit'
        this.showdia = true
      },
      // selectRowsData(rowdata){
      //
      // },


      // 查看附件
      checkFile(index, type) {
        // location.href = process.env.VUE_APP_BASE_API + this.$refs['multipleTable'].list[index].downloadUrl
        window.open(this.$refs['multipleTable'].list[index][type])
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
        const that = this
        this.$confirm('确定要作废选中订单吗?', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // requestRestful({
          //   apiUrl: '',
          //   variables: {},
          //   method: 'POST', // 默认post
          //   contentType: '', // 默认 'application/json; charset=UTF-8'
          //   lock: '',
          //   urlType: 'GET' // 处理非json请求
          // })
        }).catch(() => {})
      }
    }
  }
</script>

