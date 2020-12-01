<template>
  <section class="app-container app-container-table">
    <div id="TreeTable">
      <!--left-->
      <el-aside class="el-slide">
        <one-table-template
          ref="multipleTable"
          :dynamic-buttons="tableButtons"
          :dynamic-components="tableComponents"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="true"
          :dynamic-is-init-table="false"
          :dynamic-is-column-drop="true"
        />
        <div class="el-bottom">
          <one-table-template
            ref="multipleTable"
            :dynamic-buttons="tableButtons2"
            :dynamic-components="tableComponents2"
            :dynamic-api-config="apiConfig"
            :dynamic-table-cols="tableCols2"
            :dynamic-form-fields="formField"
            :dynamic-is-show-select="false"
            :dynamic-is-init-table="false"
            :dynamic-is-column-drop="true"
          />
        </div>
      </el-aside>
      <!-- right -->
      <el-main ref="mainHeight" class="el-main">
        <!--网格区域-->
        <one-table-template
          ref="multipleTable"
          :dynamic-buttons="tableButtons1"
          :dynamic-components="tableComponents1"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols1"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-init-table="false"
          :dynamic-is-column-drop="true"
        />
        <div class="app-container app-container-table orgManage">
          <div class="filter-title">清空月需求计划</div>
          <div class="filter-container filter-params">
            <el-row :gutter="26">
              <el-row :span="24">
                <el-col :span="20">
                  <label>考核月</label>
                  <el-input
                    v-model="listQuery.orgCode"
                    placeholder="请选择"
                    size="small"
                  />
                </el-col>
              </el-row>
            </el-row>
          </div>

          <div class="filter-container filter-button">
            <el-button size="small" @click="add()">清空</el-button>
          </div>

          <div class="filter-title">注：重新进行门店授权的机型需要（车辆授权刷新）后数据才可下发</div>
          <div class="filter-title">注：双击网格中数据可以进行维护</div>
        </div></el-main>
    </div>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
// import TreeTable from '@/components/templates/treeTable'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from 'vue'
export default {
  name: 'VeRegionCity',
  components: {
    OneTableTemplate
  },
  filters: {},
  mixins: [oneTableWithViewTemplateMixins],
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      to.path,
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
      listQuery: { orgCode: undefined },
      dialogShow: false,
      // 树形结构
      menueParam: {},

      // 网格查询API配置对象
      apiConfig: orgApis.sysMenuRoleQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '下发',
          name: '',
          position: 'left',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.add(),
          text: '查询',
          name: 'search',
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey3',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '重置',
          name: 'reset',
          position: 'right',
          fuzzySearch: true
        }
      ],
      // 动态组件-查询条件
      tableComponents: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents : [
          {
            compKey: 'compKey1',
            span: 8,
            labelName: '拟年月',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey2',
            span: 8,
            labelName: '状态',
            codeField: 'roleName',
            component: () => import('@/components/org/LookupValue'),
            type: 'dropdownList',
            isMust: true
          }
        ],
      // 动态生成网格列
      tableCols: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols : [
          {
            prop: 'roleId',
            label: '角色ID',
            hidden: true,
            width: null,
            align: 'center'
          },
          {
            prop: 'roleName',
            label: '品牌',
            width: null,
            align: 'center'
          },
          {
            prop: 'roleDesc',
            label: '计划月份',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '定制年月',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '状态',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '可下发数量',
            width: null,
            align: 'center'
          }
        ],

      tableButtons1: [
        {
          compKey: 'btnKey1',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '维护车型',
          name: '',
          position: 'left',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '车型授权刷新',
          name: '',
          position: 'left',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '保存',
          name: '',
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey3',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '清除',
          name: '',
          position: 'right',
          fuzzySearch: true
        }
      ],
      // 动态组件-查询条件
      tableComponents1: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents1 : [
          {
            compKey: 'compKey1',
            labelName: '考核月份',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 20
          },
          {
            compKey: 'compKey2',
            labelName: '拟开始日期',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 20
          },
          {
            compKey: 'compKey3',
            labelName: '制定结束日期',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 20
          },
          {
            compKey: 'compKey4',
            labelName: '审核开始日期',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 20
          },
          {
            compKey: 'compKey5',
            labelName: '审核结束日期',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true,
            span: 20
          }
        ],
      // 动态生成网格列
      tableCols1: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols1
        : [],

      // 左下
      tableButtons2: [
        {
          compKey: 'btnKey1',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '导出',
          name: '',
          position: 'left',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey2',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.add(),
          text: '查询',
          name: 'search',
          position: 'right',
          fuzzySearch: true
        },
        {
          compKey: 'btnKey3',
          type: '',
          size: 'small',
          clickEvent: () => this.add(),
          text: '重置',
          name: 'reset',
          position: 'right',
          fuzzySearch: true
        }
      ],
      // 动态组件-查询条件
      tableComponents2: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents2 : [
          {
            compKey: 'compKey1',
            span: 8,
            labelName: '门店',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey2',
            span: 8,
            labelName: '车型',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey3',
            span: 8,
            labelName: '是否可下发',
            codeField: 'roleName',
            component: () => import('@/components/org/LookupValue'),
            type: 'dropdownList',
            isMust: true
          },
          {
            compKey: 'compKey1',
            span: 8,
            labelName: '计划月份',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: false
          }
        ],
      // 动态生成网格列
      tableCols2: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols2 : [
          {
            prop: 'roleId',
            label: '角色ID',
            hidden: true,
            width: null,
            align: 'center'
          },
          {
            prop: 'roleName',
            label: '大区',
            width: null,
            align: 'center'
          },
          {
            prop: 'roleDesc',
            label: '小区',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '门店',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '自定义车系',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '基准车系',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '车型',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: 'VIN码',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '计划月份',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '创立月份',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '制定开始时间',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '审核开始时间',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '审核结束时间',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '下发状态',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '是否可下发',
            width: null,
            align: 'center'
          }
        ],
      // 表单查询数据
      formField: {
        menuId: '',
        roleName: ''
      },

      tableHeaderRowClassName({ row, rowIndex }) {
        if (rowIndex === 0) {
          return 'background-color:rgb(239, 239, 239);height:32px;'
        }
      },

      // 组件数据
      isEnableSpan: 20
    }
  },
  created() {
    // this.queryMenue(true);
  },
  mounted() {},
  methods: {
    add() {
      this.dialogShow = true
    },
    closeEdit() {
      this.dialogShow = false
    },
    // 网格
    // queryTable(page, dataType, size, filterObj, cb) {
    //   if (this.formField.menuId === "") {
    //     this.$message({
    //       message: this.$t("org.message.selMul") /*请选择一条数据*/,
    //       type: "warning",
    //       duration: 1000
    //     });
    //     return false;
    //   }
    //   // popups 组件弹窗  page 表单查询
    //   this.$utils.validataMoth(this, "validpage");
    //   if (this.valid) {
    //     this.$refs.multipleTable.queryTable(
    //       page,
    //       dataType,
    //       size,
    //       filterObj,
    //       cb
    //     );
    //   }
    // },
    // 树形结构
    // queryMenue(page) {
    //   const that = this;
    //   const queryObj = {
    //     // api配置
    //     apiConfig: orgApis.sysMenuQueryByPage,
    //     // 需要调用的API服务配置
    //     apiServices: [
    //       {
    //         // 表格中台返回网格的字段
    //         apiQueryRow: [
    //           "menuCode",
    //           "menuId",
    //           "menuName",
    //           "menuOrder",
    //           "parentMenuId"
    //         ]
    //       }
    //     ],
    //     // 条件/实体参数（变量），根据typeParam中的定义配置
    //     variables: {
    //       pageSize: "",
    //       pageIndex: "",
    //       // 当前中台使用的名称有dataInfo、info，具体查看API文档
    //       dataInfo: that.menueParam
    //     }
    //   };
    //   // 转换了中台请求格式数据
    //   var paramD = that.$getParams(queryObj);
    //   // 调用中台API方法（可复用）
    //   that.$requestAPI(paramD).then(response => {
    //     if (
    //       response.data[queryObj.apiConfig.ServiceCode].result === "1" &&
    //       response.data[queryObj.apiConfig.ServiceCode].rows != ""
    //     ) {
    //       var dataList = response.data[queryObj.apiConfig.ServiceCode].rows;
    //       // that.menueList = response.data[queryObj.apiConfig.ServiceCode].rows;
    //       // 数据格式转换
    //       var tree = this.$utils.parseTreeFromList(
    //         dataList,
    //         "parentMenuId",
    //         "menuId"
    //       );
    //       that.menueList = tree;
    //     }
    //   });
    // },
    handleNodeClick(menueList) {
      console.log(menueList)
    //   this.formField.menuId = b.data.menuId;  a  b  c
    //   this.queryTable(1);
      // this.formField.orgName = b.data.orgName;
    }
  }
}
</script>
<style scoped>
#TreeTable .el-slide {
    width: 65% !important;
    background: #ededed;
}
#TreeTable .el-bottom {
  margin-top:10px;
  height: 100%
}
#TreeTable .el-main{
  width: 35% !important;
  height:510px;
  background: white;
}
.hander-bg{
  background: white;
}

</style>
