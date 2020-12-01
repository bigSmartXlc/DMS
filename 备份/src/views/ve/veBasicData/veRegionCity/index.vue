<template>
  <section class="app-container app-container-table">
    <div id="TreeTable">
      <!--树形区域-->
      <el-aside class="el-slide">
        <input type="text" placeholder="请输入搜索内容" class="tree-input">
        <el-tree
          :data="menueList"
          highlight-current
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </el-aside>
      <el-main ref="mainHeight">
        <!--网格区域-->
        <one-table-template
          ref="multipleTable"
          :dynamic-buttons="tableButtons"
          :dynamic-components="tableComponents"
          :dynamic-api-config="apiConfig"
          :dynamic-table-cols="tableCols"
          :dynamic-form-fields="formField"
          :dynamic-is-show-select="false"
          :dynamic-is-init-table="false"
          :dynamic-is-column-drop="true"
        />
        <Edit
          v-if="dialogShow"
          :is-dialog-visible="dialogShow"
          :data-for-form="editRowData"
          @close="close"
        />
      </el-main>
    </div>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import { orgApis } from '@/api/apiList/org'
// import TreeTable from '@/components/templates/treeTable'
import OneTableTemplate from '@/components/templates/oneTable'
import Edit from './edit'
import Vue from 'vue'
export default {
  name: 'VeRegionCity',
  components: {
    OneTableTemplate,
    Edit
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
      dialogShow: false,
      // 树形结构
      menueParam: {},
      menueList: [
        {
          label: '门店1',
          children: [{
            label: '广州城市仓库'
          }]
        },
        {
          label: '广州交付店',
          children: [{
            label: '广州天河库',
            children: [{
              label: '98128931',
              children: [{
                label: '123123123'
              }]
            }]
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      // 网格查询API配置对象
      apiConfig: orgApis.sysMenuRoleQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          size: 'small',
          clickEvent: () => this.add(),
          text: '添加城市仓库',
          name: 'search',
          position: 'left',
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
            labelName: '仓库名称',
            codeField: 'roleName',
            isRequire: true,
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey2',
            span: 8,
            labelName: '仓库编码',
            codeField: 'roleName',
            isRequire: true,
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey3',
            span: 8,
            labelName: '管理员',
            codeField: 'roleName',
            isRequire: true,
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey4',
            span: 8,
            labelName: '电话',
            codeField: 'roleName',
            isRequire: true,
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey5',
            span: 8,
            labelName: '库容',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey6',
            span: 8,
            labelName: '默认搬入地',
            codeField: 'roleName',
            component: () => import('@/components/org/isEnable/isEnableOne'),
            type: 'dropdownList',
            isMust: true
          },
          {
            compKey: 'compKey7',
            span: 8,
            labelName: '省份',
            codeField: 'roleName',
            isRequire: true,
            component: () => import('@/components/org/LookupValue'),
            type: 'dropdownList',
            isMust: true
          },
          {
            compKey: 'compKey8',
            span: 8,
            labelName: '城市',
            codeField: 'roleName',
            isRequire: true,
            component: () => import('@/components/org/LookupValue'),
            type: 'dropdownList',
            isMust: true
          },
          {
            compKey: 'compKey9',
            span: 8,
            labelName: '地址',
            codeField: 'roleName',
            isRequire: true,
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
            isMust: true
          },
          {
            compKey: 'compKey10',
            span: 8,
            labelName: '启动状态',
            codeField: 'roleName',
            isRequire: true,
            component: () => import('@/components/org/isEnable/isEnableOne'),
            type: 'dropdownList',
            isMust: true
          },
          {
            compKey: 'compKey11',
            span: 8,
            labelName: '备注',
            codeField: 'roleName',
            component: () => import('@/components/org/commonInput'),
            type: 'inputText',
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
            label: '操作',
            width: null,
            align: 'center',
            isComponent: true,
            comps: [
              {
                compKey: 'propKey1',
                labelName: '删除',
                align: 'center',
                codeField: 'editControlBtn',
                clickEvent: this.edit,
                component: () => import('@/components/org/linkButton')
              }
            ]
          },
          {
            prop: 'roleDesc',
            label: '城市',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '城市仓库名称',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '所属区域仓名称',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '仓库类型',
            width: null,
            align: 'center'
          },
          {
            prop: 'orgName',
            label: '启用状态',
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
    close() {
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
.tree-input{
    width: 90%;
    border: 1px solid #999;
    outline: none;
    margin:10px 5%;
}
.hander-bg{
  height: 514px;
  background: white;
}

</style>
