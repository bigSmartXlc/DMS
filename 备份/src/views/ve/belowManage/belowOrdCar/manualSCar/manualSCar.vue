 <!--
* description: 手动配车
* author: 
* createdDate: 
-->
<template>
  <section class="manualSCarQuery">
    <el-dialog
      id="manualSCar"
      v-dialogDrag
      title="手动配车"
      :visible.sync="popupsVisible"
      width="1050px"
      center
      :append-to-body="true"
      :lock-scroll="true"
      :before-close="handleClose"
    >
      <dialogHeader
        slot="title"
        :title="'手动配车'"
        :style-type="$store.state.app.dialogType"
      />
      <one-table-template
        ref="multipleTable"
        :dynamic-api-config="dynamicApiConfig"
        :dynamic-buttons="dynamicButtons"
        :dynamic-components="tableComponents"
        :dynamic-table-cols="dynamicTableCols"
        :dynamic-form-fields="formField"
        :dynamicTableDefultHeight="300"
        :dynamic-is-show-more-btn="true"
        :dynamic-is-show-select="true"
        :dynamic-api-style="apiStyle"
        :dynamicPageSize="15"
        :refresh-table-key="refreshTableKey"
        :callback-obj="callbackObj"
        @hiddenColData="hiddenColData"
      />
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
           :icon="comp.icon"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from "vue";
export default {
  name: 'manualSCar',
  components: {
    lableName: () => import('@/components/lableName'), // 标题溢出样式组件
    dialogHeader: () => import('@/components/dialogHeader'), // 弹窗标题,
    OneTableTemplate
  },
  mixins: [oneTableWithViewTemplateMixins],
  props: {
     code: { type: String, default: '' },
    // 代码字段，这里传按钮控件的唯一编（如controlBtn）
    codeField: { type: String, default: '' },
    // 控件传入label名称
    labelName: { type: String, default: '' },
    // 组件类型标识（用于标识不同组件，每个视图中唯一）(预留)
    comType: { type: String, default: '' },
    // 是否显示标签
    isShowLabel: { type: Boolean, default: true },
    // 是否显示组件
    isShow: { type: Boolean, default: true },
    // 字段格式（type=show或value，show：监听组件显示，value：监听组件值，空：同value）：
    // 如：
    // 监听组件值传递：value:监听字段(本组件)1-对应父组件字段1|监听字段(本组件)2-对应父组件字段2
    // 监听组件显示：show:监听字段(父组件formField的对应字段)-显示组件值-隐藏组件值
    parentFileds: { type: String, default: '' },
    // 网格列索引
    colIndex: { type: String, default: '' },
    // 网格列中组件索引
    compIndex: { type: String, default: '' },
    // 网格中使用组件联动，传入网格row数据对象
    curTableRow: { type: Object, default: null },
    // 本组件-row对象对应字段集合：本组件字段1-row对象字段1|本组件字段2-row对象字段2
    rowFileds: { type: String, default: '' },
    // 是否网格中组件
    isColComp: { type: Boolean, default: true },
  },
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path, ''],
      function() {
        next()
      })
  },
  data() {

    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      table:null,
      curSelected:null,
      selectData:{},
      clickRowsData:{},
      dynamicApiConfig:{
        APIUrl:'',
      },
      apiStyle: 'restful',
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          icon: "",
          clickEvent: () => this.confirm(),
          text: this.$t("sys.button.confirm")
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "",
          clickEvent: () => this.sendCode(),
          text: this.$t("sys.button.cancel")
        }
      ],
      dynamicButtons: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons :
        [
          {
            compKey: "btnKey1",
            type: "primary",
            size: "small",
            clickEvent: () => this.queryTable(1),
            text: this.$t('sys.button.query'), // 查询
            name: '', // 按钮图标样式
            position: 'right',
            fuzzySearch: true
          },
          {
            compKey: 'btnKey2',
            type: '',
            size: 'small',
            clickEvent: () => this.reset(),
            text: this.$t('sys.button.reset'),
            name: '',
            position: 'right' // 重置
          },
        ],

      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents :
          [
            {
              compKey: 'compKey1',
              labelName: 'VIN码：', 
              codeField: 'VINCode',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey2',
              labelName: '车型配置：',
              codeField: 'carConfig',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              disabled: true,
              isMust: true
            },
            {
              compKey: 'compKey3',
              labelName: '车身颜色：', 
              codeField: 'carBodyColor',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              disabled: true,
              isMust: true
            },
            {
              compKey: 'compKey5',
              labelName: '内饰颜色：',
              codeField: 'interiorColor',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              disabled: true,
              isMust: true
            },
            {
              compKey: 'compKey6',
              labelName: '合格证：',
              codeField: 'certificate',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
          ],
      dynamicTableCols: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols :
        [
          {
            prop: "brand",
            label: "品牌"
          },
          {
            prop: "VINCode",
            label: "VIN码"
          },
          {
            prop: "carType",
            label: "车型"
          },
          {
            prop: "carBodyColor",
            label: "车身颜色"
          },
          {
            prop: "interiorColor",
            label: "内饰颜色"
          },
          {
            prop: "batteryPack",
            label: "电池包"
          },
          {
            prop: "motorNumber",
            label: "电机号"
          },
          {
            prop: "inventoryDays",
            label: "库存天数"
          },
          {
            prop: "warehouseName",
            label: "仓库名称"
          }
        ],
      refreshTableKey: '0',
      ruleSettingShow: false,
      curPopupsVisible: this.popupsVisible,

      callbackObj: {
        // 当选择项发生变化时会触发该事件（多选时）
        onCheckSelectChange: (selection) => {
          // console.log(this.$refs.multipleTable.$parent.$parent)
          this.handleOneSelect(selection)
          this.handleSelectionChange(selection)
        },
      },

      formField: this.$utils.getFormField(this, {
        VINCode:'',
        carConfig:'',
        carBodyColor:'',
        interiorColor:'',
        certificate:''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),

    }
  },
  methods: {
    //关闭弹窗
    handleClose(){
      let message;
      this.selectData.hasOwnProperty('index') ? message = '确认关闭？' : message = '确认关闭？'
      this.$confirm(`${message}`)
        .then(_ => {
          this.$emit('update:popupsVisible',false)
          this.table.toggleRowSelection(this.curSelected,false)
          done();
        })
        .catch(_ => {});
    },
    hiddenColData(data) {
      if (data && data.length > 0) {
        this.refreshTableKey += 1
        this.dynamicTableCols = data
      }
    },
  }
}
</script>
