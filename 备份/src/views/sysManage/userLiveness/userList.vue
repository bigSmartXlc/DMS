<!--
* description: 用户访问列表
* author: mwhao
* createdDate: 2020-1-8
-->
<template>
  <section>
    <!-- 头部查询条件 -->
    <theheadQuery :typeName="2"></theheadQuery>
    <!-- 网格列 -->
    <div class="bottomList">
      <el-table :data="tableData" stripe style="width: 100% ">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <!-- <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column> -->
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        :page-size="10"
        :prev-text="$t('sys.content.prevPage')"
        :next-text="$t('sys.content.nextPage')"
        layout="prev, pager, next, sizes, ->, total"
        ref="oneTable.pageArea"
        :total="pageTotal"
        :current-page.sync="listQuery.pageIndex"
        :pager-count="dynamicPagerCount"
      ></el-pagination>
    </div>
  </section>
</template>
<script>
export default {
  name: "userStatement",
  components: {
    eachart: () => import("@/views/sysManage/userLiveness/eachart.vue"),
    theheadQuery: () =>
      import("@/views/sysManage/userLiveness/theheadQuery.vue")
  },
  data() {
    return {
        // 总页数
        pageTotal:0,
        dynamicPagerCount:7,
        // 当前页数
        listQuery:{
            pageIndex:1
        },
        // 表格数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
    };
  },
  methods: {
    // 处理每页显示改变事件
    handleSizeChange(val) {
      console.log(val);
    },
    // 当前页记录
    handleCurrentChange(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="scss" scoped>
    /deep/ .el-table{
        height: 300px;
    }
</style>
