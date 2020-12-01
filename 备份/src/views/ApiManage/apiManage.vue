<!--
* description: API管理VUE
* author: mwhao
* createdDate: 2019-12-4
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
        :dynamicIsShowSelect="true"
        :dynamicIsClickShowSelect="true"
        :dynamicIsInitTable="false"
        :dynamicIsColumnDrop="true"
        :isShowPagination="false"
        :dynamicTableOtherHeight="pageCompHeight"
        :callbackObj="callbackObj"
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
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
import Edit from "./edit";
export default {
  name: "apiManage",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit
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
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          position: "right",
          name: "search",
          clickEvent: () => this.query(),
          text: this.$t("sys.button.query")
        }, //查询
        {
          compKey: "btnKey5",
          type: "",
          size: "small",
          position: "right",
          name: "reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        }, //重置
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          position: "left",
          name: "add",
          clickEvent: () => this.add(),
          text: this.$t("sys.button.add")
        }, // '新增'
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          position: "left",
          name: "add",
          clickEvent: () => this.export(),
          text: "导出"
        } // '导出'
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: "API名称:",
          codeField: "apiName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //API名称
        {
          compKey: "compKey2",
          labelName: "服务名称:",
          codeField: "serviceName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //服务名称
        {
          compKey: "compKey3",
          labelName: "API URL:",
          codeField: "apiUrl",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //APIURL,

        {
          compKey: "compKey4",
          labelName: "导入",
          category: "ve",
          codeField: "fileChannel",
          dataToObject: { fileUrl: "/mp/org/api/manage/import.do" }, // 导入时请求url
          component: () => import("@/components/upload"),
          type: "upload",
          isMust: true
        } //导入
      ],
      // 动态生成网格列
      tableCols: [
        {
          prop: "controlBtn",
          label: "操作",
          codeField: "controlBtn",
          width: 100,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              labelName: "编辑",
              codeField: "editControlBtn",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton")
            },
            {
              compKey: "propKey1",
              labelName: "删除",
              codeField: "delControlBtn",
              clickEvent: this.del,
              component: () => import("@/components/org/linkButton")
            }
          ]
        },
        {
          prop: "apiUrl",
          label: "API URL",
          align: "center"
        }, //API URL
        {
          prop: "apiName",
          label: "API名称",
          width: 200,
          align: "center"
        }, //API名称
        {
          prop: "serviceName",
          label: "API服务名称",
          width: null,
          align: "center"
        }, //API服务名称

        {
          prop: "desc",
          label: "API描述",
          width: 150,
          align: "center"
        } // API描述
      ],
      //表单查询数据
      formField: {
        pagesize: this.dynamicPageSize,
        pageindex: 1,
        apiName: "",
        apiUrl: "",
        serviceName: "",
        fileChannel: ""
      },
      // 单击选中的id
      deleteObj: {
        apiIds: ""
      },
      // 网格选择行
      selectionObj: {
        apiIds: ""
      },
      // 回调方法对象
      callbackObj: {
        // 查询条件变化时触发
        onCompCodeChange: this.compCodeChange
      }
    };
  },
  created() {
    this.query();
  },
  mounted() {
    this.hintData();
  },
  methods: {
    // 添加备注信息
    hintData() {
      // 获取标签
      var str = document.querySelector(".u-btn-left.el-col.el-col-12");
      var div = document.createElement("div"); // 创建div
      div.className = "fontClass";
      div.innerHTML = "<div class='hint'>(备注：不选记录则导出所有数据)</div>";
      str.appendChild(div);
    },
    //查询
    query() {
      const that = this;
      this.$store
        .dispatch("apiManage/getApiManage", this.formField)
        .then(response => {
          that.pages = response.records;
          var tmpLst = this.$utils.changeToOneDeepArray(response.rows);
          for (var i = 0; i < tmpLst.length; i++) {
            if (!tmpLst[i].index) {
              tmpLst[i].index = i;
            }
          }
          that.$children[0].list = tmpLst;
        });
      // that.$children[0].listLoading = false;
    },
    // 删除
    del(index) {
      var that = this;
      const selection = that.$refs.multipleTable.$refs.multipleTable.selection;
      // 判断是否多选
      if (selection && selection.length > 1) {
        that.$message({
          type: "warning",
          message: "删除不能多选,请单选删除!"
        });
      } else {
        that
          .$confirm("此操作将永久删除该API, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            that.$store
              .dispatch("apiManage/deleteManage", that.deleteObj)
              .then(response => {
                if (response.result == "1") {
                  that.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  that.query();
                }
              });
          });
      }
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
      this.query();
    },
    // 当前页选中事件
    handleCurrentChange(val) {
      this.formField.pageindex = val;
      this.query();
    },
    // 导出事件
    export() {
      const selectData = this.$refs.multipleTable.$refs.multipleTable.selection;
      var string = "";
      for (var i = 0; i < selectData.length; i++) {
        string += selectData[i].apiId;
        string += ",";
      }
      string = string.substring(0, string.length - 1);
      this.selectionObj.apiIds = string;
      this.$store
        .dispatch("apiManage/exportManage", this.selectionObj)
        .then(response => {
          if (response.result == "1") {
            window.location.href = response.downloadUrl;
          }
        });
    },
    // 导入回调
    compCodeChange(
      popupsKey,
      textField,
      otherField,
      selectData,
      val,
      txt,
      codeField,
      comType
    ) {
      if (codeField === "fileChannel") {
        this.query();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .fontClass {
  display: inline-block;
  .hint {
    display: inline-block;
    color: #c90329;
    font-weight: bold;
    background: #fff;
  }
}
</style>
