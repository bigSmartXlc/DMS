<!--
* description: 页面管理
* author: yxyan
* createdDate: 2019-10-29
* logs:
* 2019-11-18 补充删除/编辑/添加 mwhao
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicIsShowSelect="false"
      :dynamicIsInitTable="false"
      :dynamicIsColumnDrop="true"
      :isShowPagination="false"
      :callbackObj="callbackObj"
      :dynamicTableOtherHeight="tableOtherHeight + pageCompHeight"
    />
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
    <definitionEdit
      @sendCodeClose="sendCodeClose"
      :defineditDate="defineditDate"
      :popupsVisible="definitionEditVisible"
      :key="definitionEditKey"
    ></definitionEdit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
import Edit from "./edit";
// import { orgApis } from "@/api/apiList/org";
export default {
  name: "pageManage",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit,
    definitionEdit: () => import("./definitionEdit.vue")
  },
  props: {
    tableOtherHeight: { type: Number, default: 0 }
  },
  data() {
    return {
      // 功能定义
      definitionEditVisible: false,
      definitionEditKey: "definitionEditKey",
      defineditDate: {},
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
          compKey: "btnKey2",
          type: "",
          size: "small",
          position: "left",
          name: "add",
          clickEvent: () => this.add(),
          text: this.$t("sys.button.add")
        }, // '新增'
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          position: "left",
          disabled: true,
          parentFileds: "disabled:table",
          name: 'temporaryStorage',
          clickEvent: () => this.definition(),
          text: "功能定义"
        }, // '功能定义'
        {
          compKey: "btnKey5",
          type: "",
          size: "small",
          position: "right",
          name: "reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } //重置
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: "页面名称",
          codeField: "pagedesc",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //页面名称
        {
          compKey: "compKey2",
          labelName: "页面路径",
          codeField: "target",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        } //页面路径
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
          prop: "formID",
          label: "页面ID",
          width: null,
          hidden: true,
          align: "center"
        }, //页面ID
        {
          prop: "pageDesc",
          label: "页面名称",
          width: 200,
          align: "center"
        }, //页面名称
        {
          prop: "target",
          label: "页面路径",
          width: null,
          align: "center"
        }, //页面路径

        {
          prop: "lastUpdatedTime",
          label: "最后更新时间",
          width: 150,
          align: "center"
        }
      ],
      //表单查询数据
      formField: {
        pagedesc: "",
        target: "",
        pagesize: this.dynamicPageSize,
        pageindex: 1
      },
      // 网格点击回调事件（单选时）
      callbackObj: {
        onRowClick: currentRow => {
          this.onRowClick(currentRow);
        }
      }
    };
  },
  methods: {
    // 功能定义弹窗
    definition() {
      this.definitionEditVisible = true;
      this.definitionEditKey += "1";
    },
    sendCodeClose() {
      this.definitionEditVisible = false;
      this.definitionEditKey += "1";
    },
    // 网格点击回调事件
    onRowClick(currentRow) {
      this.defineditDate = currentRow;
      const btns = this.tableButtons.filter(
        o =>
          o.disabled !== undefined &&
          o.parentFileds.indexOf("disabled:table") > -1
      );
      btns.forEach((item, index) => {
        item.disabled = false;
      });
      this.selectRowsData(currentRow)
    },
    //页面管理查询
    query() {
      const that = this;
      that.$refs.multipleTable.listLoading = true;
      this.$store
        .dispatch("sysManage/getWebFormListPaged", this.formField)
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
      that.$refs.multipleTable.listLoading = false;
    },
    // 页面管理删除
    del(index) {
      const that = this.$refs.multipleTable;
      if (that.list[index].orgRealationType === "1") {
        this.$message({ message: "不可删除全局页面！", type: "warning" });
        return false;
      }
      this.$confirm(
        this.$t("org.message.confirmDeletion"),
        this.$t("org.label.warnning"),
        {
          cancelButtonText: this.$t("sys.button.cancel"),
          confirmButtonText: this.$t("sys.button.confirm"),
          type: "warning"
        }
      ).then(() => {
        var delformField = {
          formid: that.list[index].formID,
          force: false
        };
        this.$store
          .dispatch("sysManage/deleteWebForm", delformField)
          .then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.query();
          });
      });
    },
    // 网格行单击事件
    selectRowsData(val) {
      if (this.$parent.$parent.selectData) {
        this.$parent.$parent.selectData.formDesc = val.pageDesc;
        this.$parent.$parent.selectData.formID = val.formID;
        this.$parent.$parent.selectData.target = val.target;
        this.$parent.$parent.selectData.platform_Type = String(
          val.platform_Type
        );
      }
      this.defineditDate = val;
    },
    // 网格行双击事件
    handleTableRowDbClick(row, column, event) {
      if (this.$parent.$parent.selectData) {
        this.$parent.$parent.selectData.formDesc = row.pageDesc;
        this.$parent.$parent.selectData.formID = row.formID;
        this.$parent.$parent.selectData.target = row.target;
        this.$parent.$parent.selectData.platform_Type = String(
          row.platform_Type
        );
        this.defineditDate = row;
        this.$parent.$parent.menuSend();
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
    }
  }
};
</script>

