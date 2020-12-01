<!--
* description: 用户授权分析弹窗
* author:  mwhao
* createdDate: 2019-12-05
-->
<template>
  <section >
    <el-dialog v-dialogDrag
      title="用户权限分析"
      :visible.sync="handleVisibled"
      width="900px"
      lock-scroll
      center
      :append-to-body="true"
      :close-on-click-modal="false"
    >
      <dialogHeader
        slot="title"
        :title="'用户权限分析'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div id="TreeTable">
        <el-container>
          <!-- 左边树状图 -->
          <el-aside class="el-slide">
            <el-tree
              :default-expanded-keys="treeExpanded"
              auto-expand-parent
              ref="tree"
              node-key="id"
              :data="menueList"
              highlight-current
              :key="eltree"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :expand-on-click-node="false"
            />
          </el-aside>
          <!-- 右边网格 -->
          <el-main ref="mainHeight">
            <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column property="type" label="类型" ></el-table-column>
              <el-table-column property="value" label="来源" ></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
    components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    // 弹窗显示
    handleVisible: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      // 弹窗显示
      handleVisibled: this.handleVisible,
      // 树状渲染数组
      menueList: [],
      // 树状显示的参数
      defaultProps: {
        children: "children",
        label: "text"
      },
      // 树状图key
      eltree: "eltree",
      // 表格数据
      tableData: [],
      // 树状图查询
      get: {
        userid: "1"
      },
      // 树状图点击后的回调
      formField:{
        puerid: "",
        userid: "1",
        _search: false,
        nd: "1575537159623",
        rows: "10000",
        page: "1",
        sidx: "",
        sord: "asc",
        pagesize: "10000",
        pageindex: "1",
        rw: ""
      },
      // 默认展开的值
      treeExpanded: ["-1"],
    };
  },
  created() {
    this.getAnalysed();
  },
  methods: {
    //  树状图查询api
    getAnalysed() {
      const that = this;
      that.menueList = [
        {
          checkState: false,
          id: "-1",
          index: "0",
          inputType: "checkbox",
          isParent: false,
          objType: "1",
          open: true,
          order: "0",
          text: "根节点",
          children: []
        }
      ];
      this.$store
        .dispatch("authorityManage/getAnalyse", this.get)
        .then(response => {
          if (response.result === "1") {
            response.rows.children.forEach(item => {
              that.menueList[0].children.push(item);
            });
          }
        });
    },
    // 树状图点击回调查询api
    purviewSourced() {
      const that=this;
      this.$store
        .dispatch("authorityManage/purviewSource", this.formField)
        .then(response => {
             if (response.result === "1") {
                 that.tableData=response.rows
             }
        });
    },
    // 点击树状后的回调
    handleNodeClick(a, b, c) {
      this.formField.puerid=a.id
      this.purviewSourced()
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ #TreeTable main.el-main {
  height: calc(100vh - 122px) !important;
  overflow-y: auto;
}
/deep/ #TreeTable .el-slide {
  width: 30% !important;
}
/deep/ .el-main {
  height: 100%;
}
</style>
