<!--
* description: 公告列表(MP)
* author: mwhao
* createdDate: 2019-12-27
-->
<template>
  <div class="app-container app-container-table">
    <div>
      <one-table-template
        ref="multipleTable"
        :dynamicButtons="tableButtons"
        :dynamicComponents="tableComponents"
        :dynamicApiConfig="apiConfig"
        :dynamicTableCols="tableCols"
        :dynamicFormFields="formField"
        :dynamicIsClickShowSelect="true"
        :dynamicIsShowSelect="false"
        :dynamicIsInitTable="false"
        :dynamicIsColumnDrop="true"
        :isShowPagination="false"
        :dynamicIsFixChoose="false"
        :dynamicIsFixIndex="false"
        :dynamicPageSize="20"
        :dynamicTableOtherHeight="pageCompHeight"
      />
    </div>
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
  </div>
</template>

<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
export default {
  name: "announcementList",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
  },
  data() {
    return {
      // 总条数
      pages: 0,
      // 弹窗是否隐藏
      listLoading: false,
      // 网格查询API配置对象
      apiConfig: {},
      // 动态组件-按钮
      tableButtons: [
        // {
        //   compKey: "btnKey2",
        //   type: "",
        //   size: "small",
        //   position: "left",
        //   name: "add",
        //   clickEvent: () => this.add(),
        //   text: this.$t("sys.button.add")
        // } // '新增'
      ],
      // 动态组件-查询条件
      tableComponents: [],
      // 动态生成网格列
      tableCols: [
        {
          prop: "controlBtn",
          label: "操作",
          codeField: "controlBtn",
          width: 60,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey1",
              labelName: "查看",
              codeField: "delControlBtn",
              clickEvent: this.queryArticle,
              component: () => import("@/components/org/linkButton"),
            },
          ],
        },
        {
          prop: "title",
          label: "公告主题",
          align: "left",
        }, //API URL
        {
          prop: "sources",
          label: "数据来源",
          width: 200,
          align: "center",
        }, //API名称
        {
          prop: "last_update_date",
          label: "更新时间",
          width: null,
          align: "center",
        },
      ],
      //表单查询数据
      formField: {
        pagesize: this.dynamicPageSize,
        pageindex: 1,
      },
      // 单击选中的id
      deleteObj: {
        apiIds: "",
      },
      // 网格选择行
      selectionObj: {
        apiIds: "",
      },
    };
  },
  created() {
    this.query();
  },

  methods: {
    // 查看
    queryArticle(index) {
      var noticeid = this.$children[0].list[index].noticeid;
      this.$router.push({
        name: `publicAnnouncementDetail`,
        query: { noticeid: noticeid },
      });
    },
    // 新增
    // add(val) {
    //   this.$router.push({ name: `announcementManagement` });
    // },
    //查询API
    query() {
      const that = this;
      this.$store
        .dispatch("sysManage/announcementHome", this.formField)
        .then((response) => {
          if (response.result === "1") {
            that.pages = response.records;
            var tmpLst = this.$utils.changeToOneDeepArray(response.rows);
            for (var i = 0; i < tmpLst.length; i++) {
              if (!tmpLst[i].index) {
                tmpLst[i].index = i;
              }
            }
            that.$children[0].list = tmpLst;
          }
        });
      // that.$children[0].listLoading = false;
    },
    // 网格行单击事件
    selectRowsData(val) {
      if (val !== null) {
        this.deleteObj.apiIds = val.apiId;
      }
    },
    // 网格行双击事件
    handleTableRowDbClick(row, column, event) {
      if (row !== null) {
        this.deleteObj.apiIds = row.apiId;
      }
    },
    // 选择分页事件
    handleSizeChange(val) {
      this.formField.pagesize = val;
      this.formField.pageindex = 1;
      this.$refs.multipleTable.listIndex.pageSize=val
      this.query();
    },
    // 当前页选中事件
    handleCurrentChange(val) {
      this.formField.pageindex = val;
      this.$refs.multipleTable.listIndex.pageIndex=val
      this.query();
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .filter-params {
  padding: 0px !important;
}
/deep/ .app-container.app-container-table {
  padding: 0;
}
</style>
