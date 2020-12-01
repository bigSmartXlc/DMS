
<!--
* description: API权限分析
* logs:
    2019-12-11  mwhao
-->
<template>
  <section class="app-container app-container-table">
    <div id="TreeTable">
      <!--树形区域-->
      <el-aside class="el-slide">
        <el-row class="box-bottom">
          <el-col :span="24">
            <el-input v-model="searchData"></el-input>
          </el-col>
        </el-row>
        <el-tree
          :default-expanded-keys="expanded"
          auto-expand-parent
          ref="tree"
          node-key="id"
          :filter-node-method="filterNode"
          :data="menueList"
          highlight-current
          :key="eltree"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
        />
      </el-aside>
      <!-- 网格区域 -->
      <el-main ref="mainHeight">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="组织" name="first">
            <one-table-template
              ref="multipleTablefirst"
              :dynamicButtons="tableButtons"
              :dynamicComponents="tableComponents"
              :dynamicTableCols="tableCols"
              :dynamicFormFields="formField"
              :dynamicIsInitTable="false"
              :dynamicIsColumnDrop="true"
              :isShowPagination="false"
              :dynamicIsShowSelect="false"
              :dynamicTableOtherHeight="40 + pageCompHeight"
            />
          </el-tab-pane>
          <el-tab-pane label="角色" name="second">
            <one-table-template
              ref="multipleTableRole"
              :key="oneTablekey"
              :dynamicButtons="tableButtons"
              :dynamicComponents="tableComponents"
              :dynamicTableCols="tableCols"
              :dynamicFormFields="formField"
              :dynamicIsInitTable="false"
              :dynamicIsColumnDrop="true"
              :isShowPagination="false"
              :dynamicIsShowSelect="false"
              :dynamicTableOtherHeight="40 + pageCompHeight"
            />
          </el-tab-pane>
          <el-tab-pane label="用户" name="third">
            <one-table-template
              ref="multipleTablethird"
              :key="oneTablekey"
              :dynamicButtons="tableButtons"
              :dynamicComponents="tableComponents"
              :dynamicTableCols="tableCols"
              :dynamicFormFields="formField"
              :dynamicIsInitTable="false"
              :dynamicIsColumnDrop="true"
              :isShowPagination="false"
              :dynamicIsShowSelect="false"
              :dynamicTableOtherHeight="40 + pageCompHeight"
            />
          </el-tab-pane>
        </el-tabs>
        <!-- 分页器 -->
        <div class="el-pagination is-background">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="pageSizeArray"
            :page-size="dynamicPageSize"
            ref="oneTable.pageArea"
            layout="prev, pager, next, sizes, ->, total"
            :prev-text="$t('sys.content.prevPage')"
            :next-text="$t('sys.content.nextPage')"
            :total="pages"
          ></el-pagination>
        </div>
      </el-main>
    </div>
  </section>
</template>

<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
export default {
  mixins: [oneTableWithViewTemplateMixins],
  name: "menuAnalyze",
  components: {
    OneTableTemplate
  },
  watch: {
    // 侦听搜索框输入的变化
    searchData(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      // 总条数
      pages: 0,
      // key
      oneTablekey: "oneTablekey",
      // 默认显示的标签页
      activeName: "first",
      // 默认展开的数组
      expanded: ["1"],
      // 树状图渲染数组
      menueList: [],
      // key值
      eltree: "eltree",
      // 树状显示的参数
      defaultProps: {
        children: "children",
        label: "text"
      },
      // 树状图搜索过滤
      searchData: "",
      //  按钮控件
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.getMenuPuerviewInfod(),
          name: "search",
          position: "right",
          fuzzySearch: true,
          text: this.$t("sys.button.query")
        }, //查询
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          name: "reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } //重置
      ],
      // 动态组件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
          .tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
              .tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: "组织名称" /*组织名称*/,
                codeField: "orgname",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: "组织编号" /*组织编号*/,
                codeField: "orgcode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              }
            ],
      // 动态生成网格列
      tableCols: [
        {
          prop: "orgcode",
          label: "组织编号" /*组织编号*/,
          width: 300,
          align: "center"
        },
        {
          prop: "orgname",
          label: "组织名称" /*组织名称*/,
          width: 300,
          align: "center"
        },
        {
          prop: "tissueUrl",
          label: "组织路径" /*组织路径*/,
          width: 300,
          align: "center"
        },
        {
          prop: "tissueDescribe",
          label: "组织描述" /*组织描述*/,
          width: null,
          align: "center"
        },
        { prop: "userId", label: "用户Id", hidden: true, align: "center" }
      ],
      //表单查询数据
      formField: {
        sourceId: "1",
        pageSize: "",
        pageIndex: "",
        viewType: "org",
        pageSize: this.dynamicPageSize,
        pageIndex: 1,
        searchCode: "",
        searchName: "",
        BUILT_IN: 0,
        ORG_NAME: "",
        ROLE_CODE: "",
        ROLE_ID: "",
        ROLE_NAME: "",
        USER_NAME: "",
        EMP_NAME: ""
      },
      // ref
      refd: "multipleTablefirst",
      // 标签页label 组织=1;角色=2;用户=3;
      label: "1"
    };
  },
  created() {
    this.tissueListd();
  },
  methods: {
    // 网格查询API
    getMenuPuerviewInfod() {
      var that = this;
      if (that.label === "1") {
      }
      if (that.label === "2") {
        that.formField.searchName = that.formField.ROLE_NAME;
        that.formField.searchCode = that.formField.ROLE_CODE;
      }
      if (that.label === "3") {
        that.formField.searchName = that.formField.EMP_NAME;
        that.formField.searchCode = that.formField.USER_NAME;
      }
      this.$store
        .dispatch("authorityManage/apiPurviewSource", this.formField)
        .then(response => {
          if (response.result === "1") {
            that.pages = response.records;
            that.$refs[that.refd].list = response.rows;
          }
        });
    },
    // 标签页点击事件
    handleClick(tab, event) {
      var that = this;
      // 组织参数不对.待后期修改
      if (tab.label === "组织") {
        that.tableComponents = [
          {
            compKey: "compKey1",
            labelName: "组织名称" /*组织名称*/,
            codeField: "orgname",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          },
          {
            compKey: "compKey2",
            labelName: "组织编号" /*组织编号*/,
            codeField: "orgcode",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          }
        ];
        that.tableCols = [
          {
            prop: "orgcode",
            label: "组织编号" /*组织编号*/,
            width: 300,
            align: "center"
          },
          {
            prop: "orgname",
            label: "组织名称" /*组织名称*/,
            width: 300,
            align: "center"
          },
          {
            prop: "tissueUrl",
            label: "是否内置" /*组织路径*/,
            width: 300,
            align: "center"
          }
        ];
        that.refd = "multipleTablefirst";
        that.formField.viewType = "org";
        that.label = "1";
        that.getMenuPuerviewInfod();
      }
      if (tab.label === "角色") {
        that.tableComponents = [
          {
            compKey: "compKey1",
            labelName: "角色编号" /*角色编号*/,
            codeField: "ROLE_CODE",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          },
          {
            compKey: "compKey2",
            labelName: "角色名称" /*角色名称*/,
            codeField: "ROLE_NAME",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          }
        ];
        that.tableCols = [
          {
            prop: "ROLE_CODE",
            label: "角色编号" /*角色编号*/,
            width: 300,
            align: "center"
          },
          {
            prop: "ROLE_NAME",
            label: "角色名称" /*角色名称*/,
            width: 300,
            align: "center"
          },
          {
            prop: "ORG_NAME",
            label: "组织结构" /*组织结构*/,
            width: 300,
            align: "center"
          },
          {
            prop: "BUILT_IN",
            label: "是否内置" /*是否内置*/,
            width: 300,
            align: "center"
          }
        ];
        that.refd = "multipleTableRole";
        that.formField.name = that.formField.ROLE_NAME;
        that.formField.code = that.formField.ROLE_CODE;
        that.label = "2";
        that.formField.viewType = "role";
        that.getMenuPuerviewInfod();
      }
      if (tab.label === "用户") {
        that.tableComponents = [
          {
            compKey: "compKey1",
            labelName: "用户名" /*用户名*/,
            codeField: "USER_NAME",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          },
          {
            compKey: "compKey2",
            labelName: "员工姓名" /*员工姓名*/,
            codeField: "EMP_NAME",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          }
        ];
        that.tableCols = [
          {
            prop: "USER_NAME",
            label: "用户名" /*用户名*/,
            width: 300,
            align: "center"
          },
          {
            prop: "EMP_NAME",
            label: "员工姓名" /*员工姓名*/,
            width: 300,
            align: "center"
          },
          {
            prop: "ORG_NAME",
            label: "组织结构" /*组织结构*/,
            width: 300,
            align: "center"
          },
          {
            prop: "BUILT_IN",
            label: "是否内置" /*是否内置*/,
            width: 300,
            align: "center"
          }
        ];
        that.refd = "multipleTablethird";
        that.formField.viewType = "user";
        that.formField.name = that.formField.EMP_NAME;
        that.formField.code = that.formField.USER_NAME;
        that.label = "3";
        that.getMenuPuerviewInfod();
      }
      this.oneTablekey = this.oneTablekey + 1;
    },
    // 重置
    reset() {
      var that = this;
      if (that.label === "1") {
      }
      if (that.label === "2") {
        that.formField.ROLE_NAME = "";
        that.formField.ROLE_CODE = "";
      }
      if (that.label === "3") {
        that.formField.EMP_NAME = "";
        that.formField.USER_NAME = "";
      }
    },
    //树状图查询API
    tissueListd() {
      var that = this;
      this.$store.dispatch("authorityManage/allPurview").then(response => {
        if (response.result === "1") {
          that.menueList.push(response.rows[0]);
        }
      });
    },
    // 树状图点击后的回调
    handleNodeClick(a, b, c) {
      this.formField.sourceId = a.id;
      this.getMenuPuerviewInfod();
    },
    // 树状图筛选功能
    filterNode(value, data, node) {
      if (!value) return true;
      let level = node.level;
      let _array = []; //这里使用数组存储 只是为了存储值。
      this.getReturnNode(node, _array, value);
      let result = false;
      _array.forEach(item => {
        result = result || item;
      });
      return result;
    },
    // 树状图筛选递归  备注:如果数据量大的话,会很卡
    getReturnNode(node, _array, value) {
      let isPass =
        node.data && node.data.text && node.data.text.indexOf(value) !== -1;
      isPass ? _array.push(isPass) : "";
      this.index++;
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value);
      }
    },
    // 选择分页事件
    handleSizeChange(val) {
      this.formField.pageSize = val;
      this.formField.pageIndex = 1;
      this.getMenuPuerviewInfod();
    },
    // 当前页选中事件
    handleCurrentChange(val) {
      this.formField.pageIndex = val;
      this.getMenuPuerviewInfod();
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .box-bottom {
  position: absolute;
  height: 38px;
  width: 100%;
  background: #ffff;
  border-bottom: 1px solid #f1f1f1;
  padding-top: 3px;
}
/deep/ .el-tree.el-tree--highlight-current {
  margin-top: 38px;
}
/deep/ .el-tabs__nav.is-top {
  margin-left: 10px;
}
.box-bottom /deep/ .el-col-15 {
  margin-right: 15px;
}
.el-main /deep/ .el-tabs__header.is-top {
  background: #ffff;
  background: #ffff;
}
/deep/ .el-tabs__header {
  margin: 0;
}
</style>
