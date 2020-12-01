<!--
* description: 区县管理
* author:
* createdDate: 2019-07-31
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicIsShowSelect="false"
      :dynamicIsInitTable="false"
      :dynamicIsColumnDrop="true"
      :dynamicIsShowMoreBtn="false"

    />

    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins';
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from "vue";

export default {
  name:"countryManage",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(to.path, function() {
      next();
    });
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgCommunityQueryFindAll,
      // 动态组件-按钮
      tableButtons: [
        {compKey: 'btnKey1', type: 'primary', size: 'small', clickEvent: () => this.queryTable(1), text: this.$t('sys.button.query'),name:'search',position:'right'},//查询
        {compKey: 'btnKey2', type: '', size: 'small', clickEvent: () => this.add(), text:this.$t('sys.button.add'),name:'add',position:'left'},//新增
        {compKey: 'btnKey4', type: '', size: 'small', clickEvent: () => this.reset(), text:this.$t('sys.button.reset'),name:'reset',position:'right'}],//重置
      // 动态组件-查询条件
      tableComponents: this.$ConfigCache.CacheConfig.cacheData[this.$route.path] && this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents && this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents: [
        {compKey: 'compKey2',isMul: false,labelName: this.$t('org.label.provinceName'),//所属省份
         codeField: 'provinceId', component: () => import('@/components/org/ProvinceQuery'), type: 'dropdownList', isMust: true},
        {compKey: 'compKey3', labelName:  this.$t('org.label.cityName'),//所属城市
         parentFileds: 'provinceId',codeField: 'cityId', component: () => import('@/components/org/CitySelect'), type: 'dropdownList', isMust: true},
        {compKey: 'compKey1', labelName:  this.$t('org.label.countyName'),//区县名称
         codeField: 'countyName', component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: true},
        {compKey: 'compKey4', labelName:  this.$t('org.label.isEnableCn'),//启用状态
         codeField: 'isEnable', component: () => import('@/components/org/isEnable/isEnable'), type: 'dropdownList', isMust: true}
      ],
      // 动态生成网格列
      tableCols: this.getCols(),
      //表单查询数据
      formField:this.$utils.getFormField(this, {
        countyName: '',
        provinceId: '',
        cityId:'',
        isEnable:''
      },this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false
    }
  },
  methods: {
    del() {
    }
  },
   methods:{
    getCols() {
      var cols = [
        { prop: 'controlBtn', label: this.$t('sys.content.operate'),//操作
         codeField: 'controlBtn', width: 60, align: 'center', fixed: true, isComponent: true,
          comps:[{compKey: 'propKey0', align: 'center', labelName: this.$t('sys.button.edit'),//编辑
           codeField: 'editControlBtn', clickEvent: this.edit, component: () => import('@/components/org/linkButton')}]
        },
      ];
      if (
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols.length > 0
      ) {
        cols = cols.concat(this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols);
      } else {
        cols = cols.concat([
        { prop: 'countyName', label: this.$t('org.label.countyName'),//区县名称
        width: null, align: 'center' },
        { prop: 'provinceName', label: this.$t('org.label.provinceName'),//所属省份
         width: null, align: 'center' },
        { prop: 'cityName', label: this.$t('org.label.cityName'),//所属城市
        width: null, align: 'center' },
        { prop: 'isEnable', label: this.$t('org.label.isEnableCn'),//启用状态
        width: null, align: 'center' },
        // { prop: 'isEnableCode', label: '是否启用编码', width: null, align: 'center', hidden: true },
        { prop: 'countyCode', label: this.$t('org.label.countyCode'),//区县编码
         width: null, align: 'center', hidden: true },
        { prop: 'countyId', label: this.$t('org.label.countyID'),//区县ID
         width: null, align: 'center', hidden: true },
        { prop: 'provinceId', label: this.$t('org.label.provinceID'),//省份ID
         width: null, align: 'center', hidden: true },
        { prop: 'cityId', label: this.$t('org.label.cityID'),//城市ID
         width: null, align: 'center', hidden: true },
        { prop: 'updateControlId', label:this.$t('org.label.updateControlId'), //并发控制id
        width: null, align: 'center', hidden: true },
        { prop: 'countyId', label:this.$t('org.label.majorID'), //主键id
        width: null, align: 'center', hidden: true }
        ]);
      }
      return cols;
    }
  }
}
</script>
