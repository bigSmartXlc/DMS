<!--
* description: 品牌管理
* author: luojx
* createdDate: 2019-07-31
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template ref="multipleTable"
      :key="oneTableKey"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicIsShowSelect="false"
      :dynamicIsInitTable="true"
      :dynamicIsColumnDrop="false"
      :isSetDefaultBrand="false"
      :dynamicExportConverts="exportConverts"
      :dynamicApiStyle="'restful'"
    >
      <!-- <template slot="controlBtn" slot-scope="{scope, row, col}"> -->
        <!-- <component v-if="row['carBrandCode'] === '1'" is="ControlButton" codeField="controlBtn" :com-type="scope.$index+''" :col-index="row.index+''" :comp-index="row.index+''" @clickEvent="edit" code="编辑" />
        <component v-if="row['carBrandCode'] !== '1'" is="ControlButton" codeField="controlBtn" :com-type="scope.$index+''" :col-index="row.index+''" :comp-index="row.index+''" @clickEvent="edit" code="新增" /> -->
        <!-- <a v-if="row['carBrandCode'] === '1'">编辑</a>
        <a v-if="row['carBrandCode'] !== '1'">新增</a> -->
      <!-- </template> -->
    </one-table-template>
    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      :isSetDefaultBrand="false"
      :dynamicApiStyle="'restful'"
      @close="close"
    ></edit>

    <print :popupsVisible="printPopupsVisible" @close="closePrint"></print>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins';
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from 'vue'

export default {
  name:"orgBrandManage",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit"),
    Print: () => import("@/views/table/print")
    ,ControlButton: () => import("@/components/org/linkButton")
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path,'orgBrandManageEdit'],
      function(){
        next()
      })
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.mdmCarBrandQueryByPage,
      // 动态组件-按钮
      tableButtons:
                this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
                && this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
                && this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons.length > 0 ?
                this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons : [
        {compKey: 'btnKey1', type: 'primary', size: 'small', clickEvent: () => this.queryTable(1), text: this.$t('sys.button.query'),name: 'search',
          position: 'component'},
        {compKey: 'btnKey2', type: '', size: 'small', clickEvent: () => this.add(), text: this.$t('sys.button.newAdd'),name: 'add',
          position: 'component'},
        // {compKey: 'btnKey7', type: '', size: 'small', clickEvent: () => this.synchrony('isEnable,carBrandCode'), text: '同步'},
        // {compKey: 'btnKey5', type: '', size: 'small', clickEvent: () => this.synchronyAll('isEnable,carBrandCode'), text: '全部同步'},
        {compKey: 'btnKey4', type: '', size: 'small', clickEvent: () => this.reset(), text: this.$t('sys.button.reset'),name: 'reset',
          position: 'component'}
        // {compKey: 'btnKey6', type: '', size: 'small', clickEvent: () => this.exportExcel(), text: this.$t('sys.button.export'),name: 'export',
        //   position: 'left'}
        // 打印样例
        // ,{compKey: 'btnKey7', type: '', size: 'small', clickEvent: () => this.printTest('param1', 'param2'), text: '打印样例', name: 'print', position: 'left'}
      ],
      // 动态组件-查询条件
      tableComponents: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] && this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents : [
        //品牌编码
        {compKey: 'compKey1', labelName: this.$t('org.label.carBrandCode'), codeField: 'carBrandCode', component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: true},
        //品牌名称
        {compKey: 'compKey2', labelName: this.$t('org.label.carBrand'), codeField: 'carBrandCn', component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: true},
        // 是否启用
        {compKey: 'compKey3', labelName: this.$t('org.label.isAble'), codeField: 'isEnable', clearable: true, component: () => import('@/components/org/isEnable/isEnable'), type: 'dropdownList', isMust: true}
        // 上传样例
        // ,{compKey: 'compKey4', labelName: '上传', category: 've', codeField: 'carBrandCode', component: () => import('@/components/upload'), type: 'upload', isMust: true}
        // 选装包样例
        // ,{compKey: 'compKey5', labelName: '选装包', codeField: 'carBrandCode', component: () => import('@/components/org/CarOptionalPack'), type: 'propus', isMust: true}
        // excel导入
        // ,{compKey: 'compKey6', labelName: 'excel导入', dataToObject: {importUrl: '/ly/mp/busicen/scc/excel/netToStoreMutationImport.do'}, component: () => import('@/components/importFile'), type: 'propus', isMust: true}
        // 表达式计算
        // ,{compKey: 'compKey7', labelName: '表达式1', codeField: 'exp1', component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: true}
        // ,{compKey: 'compKey8', labelName: '表达式2', codeField: 'exp2', component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: false}
        // ,{compKey: 'compKey9', labelName: '表达式3', codeField: 'exp3', component: () => import('@/components/org/commonInput/numberInput'), type: 'inputText', isMust: false}
        // ,{compKey: 'compKey10', labelName: '汇总', codeField: 'exp4', parentFileds: 'calculate:exp1*(exp2+exp3)', component: () => import('@/components/org/commonInput/numberInput'), type: 'inputText', isMust: false}
        // ,{
        //   compKey: "compKey11",
        //   labelName: "双日期",
        //   codeField: "date1,date2",
        //   component: () =>
        //     import("@/components/org/datePicker/andtDatePicker"),
        //   format: "yyyy-MM-dd",
        //   type: "twoDatePicker",
        //   dateOptionsType: "0",
        //   isMust: true
        // }
      ],
      // 动态生成网格列
      tableCols: this.$ConfigCache.CacheConfig.cacheData[viewPageCode]&& this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols: [
        // 操作
        { prop: 'controlBtn', label: this.$t('sys.content.operate'), codeField: 'controlBtn', width: 80, align: 'center', fixed: true , isComponent: true,
          // isSlot: true,
          //  编辑
          comps: [
            {compKey: 'propKey0'/*, rowFileds: 'show:isEnable--0'*/, labelName: this.$t('sys.button.edit'), codeField: 'editControlBtn', clickEvent: this.edit, component: () => import('@/components/org/linkButton')}
            //,{compKey: 'propKey1', rowFileds: 'show:isEnable-1-', labelName: this.$t('sys.button.delete'), codeField: 'delControlBtn', clickEvent: this.del, component: () => import('@/components/org/linkButton')}
          ]
        },
        //品牌编码
        { prop: 'carBrandCode', label: this.$t('org.label.carBrandCode'), width: null, align: 'center' },
        //品牌
        { prop: 'carBrandCn', label: this.$t('org.label.carBrandCn'), width: null, align: 'center' },
         /*, isComponent: true,
          comps: [{compKey: 'propKey2', isMul: false, isShowLabel: false, codeField: 'carBrandCode', clearable: false, filterable: false, clickEvent: () => null, component: () => import('@/components/org/carBrand/carBrand')}]
        },*/
        //品牌英文名称
        { prop: 'carBrandEn', label: this.$t('org.label.carBrandEn'), width: null, align: 'center' },
        // 是否启用名称
        // { prop: 'enableName', label: this.$t('org.label.isAble') , width: null, align: 'center' },
        /* isComponent: true,
          comps: [{compKey: 'propKey1', isShowLabel: false, codeField: 'isEnable', clickEvent: () => null, component: () => import('@/components/org/isEnable/isEnable')}]
        },*/
        { prop: 'updateControlId', label: '并发控制', width: null, align: 'center', hidden: true },
        { prop: 'uid', label: '主键ID', width: null, align: 'center', hidden: true },
        // 是否启用
        { prop: 'isEnable', label: this.$t('org.label.isAble'), width: null, align: 'center', hidden: false }
      ],
      // 字段格式化转换（用于导出excel）（kvs表示键值转换）
      exportConverts: {
        'isEnable': {
          'convert': 'kvs',
          'kvs': {
            '1': '是',
            '0': '否'
          }
        }
      },
      // 表单查询数据
      formField: this.$utils.getFormField(this, {
        carBrandCode: '',
        carBrandCn: '',
        isEnable: ''
        // , exp1: ''
        // , exp2: ''
        // , exp3: ''
        // , exp4: ''
        // , date1: ''
        // , date2: ''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      printPopupsVisible: false
    }
  },
  methods: {
    printTest(param1, param2) {
      console.log(param1, param2)
      this.printPopupsVisible = true
    },
    closePrint() {
      this.printPopupsVisible = false
    }
  }
}
</script>
