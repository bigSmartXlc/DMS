<!--
* description: 用户风险分析
* author: mwhao
* createdDate: 2020-1-8
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
      :dynamicTableOtherHeight="pageCompHeight"
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
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
// import { orgApis } from "@/api/apiList/org";
export default {
  name: "pageManage",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate
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
          compKey: "btnKey2",
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
          labelName: "用户名",
          codeField: "userName",
          span: 8,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        } //用户名
      ],
      // 动态生成网格列
      tableCols: [
        {
          prop: "USER_NAME",
          label: "用户名",
          width: null,
          align: "center"
        }, //用户名
        {
          prop: "USER_ID",
          label: "用户ID",
          width: null,
          hidden: true,
          align: "center"
        }, //用户ID
        {
          prop: "TOKEN",
          label: "会话token",
          width: null,
          hidden: true,
          align: "center"
        }, //会话token
        {
          prop: "IP",
          label: "IP地址",
          width: 200,
          align: "center"
        }, //IP地址
        // {
        //   prop: "RISK_LEVEL",
        //   label: "风险等级",
        //   width: null,
        //   align: "center"
        // }, // 风险等级  注:因无明确文档猜测字段 英文翻译为风险等级
        {
          prop: "controlBtn",
          label: "风险等级",
          codeField: "controlBtn",
          width: 100,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey2",
              labelName: "中止会话",
              codeField: "RISK_LEVEL",
              // clickEvent: this.edit,
              component: () =>
                import("@/views/sysManage/useriskAnalyze/linkButton.vue")
            }
          ]
        }, // 风险等级
        {
          prop: "LOGIN_TIME",
          label: "登录时间",
          width: 150,
          align: "center"
        }, // 登录时间
        {
          prop: "controlBtn",
          label: "操作",
          codeField: "controlBtn",
          width: 100,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey1",
              labelName: "中止会话",
              codeField: "delControlBtn",
              clickEvent: this.del,
              component: () => import("@/components/org/linkButton")
            }
          ]
        }
      ],
      //表单查询数据
      formField: {
        userName: "",
        pagesize: this.dynamicPageSize,
        pageindex: 1
      },
      // 返回参数msg
      returnMsg: {
        l0500200016: "用户将在{0}分钟后强制退出"
      }
    };
  },
  created() {
    this.query();
  },
  methods: {
    //页面管理查询
    query() {
      const that = this;
      this.$store
        .dispatch("sysManage/useriskanalyzaQuery", this.formField)
        .then(response => {
          if (response.result === "1") {
            // 对风险程度等级做替换
            response.rows.filter(o => {
              if (o.RISK_LEVEL === 0) {
                return (o.RISK_LEVEL = "安全");
              }
               if (o.RISK_LEVEL === 1) {
                return (o.RISK_LEVEL = "危险");
              }
            });
            that.pages = response.records;
            var tmpLst = this.$utils.changeToOneDeepArray(response.rows);
            for (var i = 0; i < tmpLst.length; i++) {
              if (!tmpLst[i].index) {
                tmpLst[i].index = i;
              }
            }
            // console.log(tmpLst)
            // tmpLst[1].RISK_LEVEL="危险"
            that.$children[0].list = tmpLst;
          }
        });
      // that.$children[0].listLoading = false;
    },
    // 页面管理删除
    del(index) {
      let that = this;
      let delformField = {
        uToken: that.$refs.multipleTable.list[index].TOKEN
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store
          .dispatch("sysManage/useriskanalyzaDelete", delformField)
          .then(response => {
            if (response.result === "1") {
              let mess = that.returnMsg[response.msg];
              let lang = response.rows;
              let str = mess.replace("{0}", lang);
              this.$message({
                type: "success",
                message: str || "操作成功"
              });
              that.query();
            }
          });
      });
    },
    // 网格行单击事件
    // selectRowsData(val) {
    // },
    // 网格行双击事件
    // handleTableRowDbClick(row, column, event) {
    // },
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

