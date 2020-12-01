
<!--
* description: 组织权限
* logs:
    2019-12-5  mwhao 
-->
<template>
  <section class="app-container app-container-table">
    <div id="TreeTable">
      <!--树形区域-->
      <el-aside class="el-slide">
        <el-row class="box-bottom">
          <el-col :span="18">
            <el-input v-model="searchData" size="mini"></el-input>
          </el-col>
          <!-- <el-col :span="7">
            <el-button type="danger" icon="el-icon-search" plain @click="filterNode"></el-button>
          </el-col>-->
        </el-row>
        <el-tree
          auto-expand-parent
          ref="tree"
          node-key="id"
          :default-expanded-keys="expanded"
          :filter-node-method="filterNode"
          :data="menueList"
          highlight-current
          :key="eltree"
          :props="defaultProps"
          @node-click="handleNodeClick"
          accordion
          :expand-on-click-node="false"
        />
      </el-aside>
      <!-- 网格区域 -->
      <el-main ref="mainHeight">
        <one-table-template
          ref="multipleTable"
          :dynamicButtons="tableButtons"
          :dynamicComponents="tableComponents"
          :dynamicTableCols="tableCols"
          :dynamicFormFields="formField"
          :dynamicIsShowSelect="true"
          :dynamicIsInitTable="false"
          :dynamicIsColumnDrop="true"
          :positionSpan="[18,6]"
          :showbtnLength="8"
          :isShowPagination="true"
          :dynamicDefalutCount="9"
          :dynamicIsShowMoreBtn="true"
        />
      </el-main>
      <!-- 弹窗区域 -->
      <!-- API授权 -->
      <apiAuthorization ref="apiAuthorization" :key="apiKey" :handleVisible="showApi"></apiAuthorization>
    </div>
  </section>
</template>

<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
export default {
  mixins: [oneTableWithViewTemplateMixins],
  name: "organization",
  components: {
    OneTableTemplate,
    apiAuthorization: () =>
      import(
        "@/views/org/permissionManage/orguserRightsManagement/apiAuthorization.vue"
      )
  },
  watch: {
    // 侦听搜索框输入的变化
    searchData(val) {
      this.$refs.tree.filter(val);
      if (val === "") {
        this.collapseAll();
      }
    }
  },
  data() {
    return {
      // 默认展开的数组
      expanded: [],
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
          clickEvent: () => this.query(),
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
        }, //重置
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          name: "modifyCustomerProfile",
          position: "left",
          clickEvent: () => this.userAuthorizationd(),
          text: "组织授权" /*组织授权*/
        },
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          name: "search",
          position: "left",
          clickEvent: () => this.checkAuthorization(),
          text: "权限查看" /*权限查看*/
        },
        {
          compKey: "btnKey5",
          type: "",
          size: "small",
          name: "synchronizeCustomerProfile",
          position: "left",
          clickEvent: () => this.checkPerson(),
          text: "批量授权" /*批量授权*/
        },
        {
          compKey: "btnKey6",
          type: "",
          size: "small",
          name: "search",
          position: "left",
          clickEvent: () => this.userDialong(),
          text: "API授权" /*API授权*/
        },
        {
          compKey: "btnKey7",
          type: "",
          size: "small",
          name: "search",
          position: "left",
          clickEvent: () => this.checkApi(),
          text: "API权限查看" /*API权限查看*/
        },
        {
          compKey: "btnKey8",
          type: "",
          size: "small",
          name: "search",
          position: "left",
          clickEvent: () => this.apiPerson(),
          text: "API批量授权" /*API批量授权*/
        }
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
      // 树状图查询对象
      treeformField: {
        orgid: "",
        orgcode: "",
        orgname: "",
        pagesize: 10,
        pageindex: 1
      },
      //表单查询数据
      formField: {
        pagesize: 10,
        pageindex: 1,
        orgid: "",
        orgcode: "",
        orgname: ""
      },
      // API授权弹窗
      apiKey: "apiKey",
      showApi: false
    };
  },
  created() {
    this.tissueListd();
  },
  methods: {
    // 树状图全部折叠
    collapseAll() {
      let self = this;
      let treeList = this.menueList;
      for (let i = 0; i < treeList.length; i++) {
        self.$refs.tree.store.nodesMap[treeList[i].id].expanded = false;
      }
    },
    // 查询API
    query() {
      var that = this;
      this.$store
        .dispatch("authorityManage/gettissueClick", this.formField)
        .then(response => {
          if (response.result === "1") {
            console.log(response);
          }
        });
    },

    //树状图查询API
    tissueListd() {
      var that = this;
      this.$store.dispatch("authorityManage/tissueList").then(response => {
        if (response.result === "1") {
          that.menueList = [];
          for (var k in response.rows) {
            that.menueList.push(response.rows[k]);
          }
        }
      });
    },
    // 树状图点击回调API
    tissueClickd() {
      this.$store
        .dispatch("authorityManage/tissueClick", this.treeformField)
        .then(response => {
          if (response.result === "1") {
            console.log(response);
          }
        });
    },
    // 树状图点击后的回调
    handleNodeClick(a, b, c) {
      var that = this;
      // orgcode有误,测试为组织编号.具体传递数值不清楚
      that.treeformField.orgid = a.id;
      that.treeformField.orgcode = a.order;
      that.treeformField.orgname = a.text;
      that.tissueClickd();
    },

    // API授权
    userDialong() {
      // 判断是否点击
      const that = this.$refs.multipleTable;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.showApi = true;
      this.apiKey = this.apiKey + "1";
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
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .box-bottom {
  position: fixed;
  height: 38px;
  width: 18%;
  z-index: 1000;
  background: #ffff;
  border-bottom: 1px solid #f1f1f1;
  padding-top: 3px;
}
/deep/ .el-tree.el-tree--highlight-current {
  margin-top: 38px;
}
.box-bottom /deep/ .el-col-15 {
  margin-right: 15px;
}
</style>