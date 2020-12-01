<!--
* description: 公告管理-- 已发布公告
-->
<template>
  <section class="filter-params-e3s">
    <one-table-template
      ref="multipleTabled"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicIsInitTable="false"
      :dynamicIsShowSelect="false"
      :dynamicIsShowMoreBtn="false"
      :isShowPagination="false"
      :dynamicTableOtherHeight="86"
      :dynamicIsFixChoose="false"
      :dynamicIsFixIndex="false"
    />
    <div class="el-pagination is-background">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pageSizeArray"
        :page-size="dynamicPageSize"
        ref="oneTable.pageArea"
        layout="prev, pager, next, jumper, sizes, ->, total"
        :prev-text="$t('sys.content.prevPage')"
        :next-text="$t('sys.content.nextPage')"
        :current-page.sync="listQust.pageindex"
        :total="pages"
      ></el-pagination>
    </div>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { contsMixins } from "@/components/mixins/contsMixins";
import OneTableTemplate from "@/components/templates/oneTable";

export default {
  mixins: [oneTableWithViewTemplateMixins],
  name: "announcementManagement",
  components: {
    OneTableTemplate
  },
  props: {
    active: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {
      apiConfig: {},
      tableCols: [
        {
          prop: "controlBtn",
          label: "操作",
          codeField: "controlBtn",
          width: 100,
          align: "center",
          fixed: true,
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              align: "center",
              labelName: "修改",
              codeField: "editControlBtn",
              clickEvent: this.rowUpdate,
              compareField: "style",
              compareValue: true,
              component: () => import("@/components/org/linkButton")
            },
            {
              compKey: "propKey1",
              align: "center",
              labelName: "删除",
              codeField: "editControlBtn",
              clickEvent: this.dele,
              //  compareValue:true,
              compareField: "style",
              compareValue: true,
              component: () => import("@/components/org/linkButton")
            }
          ]
        }, //操作
        {
          prop: "title",
          label: "公告标题",
          width: null,
          align: "center"
        },
        {
          prop: "fullname",
          label: "发布对象",
          width: null,
          align: "center"
        },
        {
          prop: "author",
          label: "发布人",
          width: null,
          align: "center"
        },
        {
          prop: "last_update_date",
          label: "更新时间",
          width: null,
          align: "center"
        },
        {
          prop: "noticeid",
          label: "id",
          width: null,
          hidden: true,
          align: "center"
        }
      ],
      // formField: {
      //   category:"managenotice", //设置跟首页公告查询一致  managenotice原来listnotice
      // },
      listQust: {
        pagesize: this.dynamicPageSize,
        pageindex: 1,
      },
      listTotal:[],// 总参数
      pages:0
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    // 修改
    rowUpdate(index) {
      let lis = JSON.parse(JSON.stringify(this.$refs.multipleTabled.list));
      let row = lis[index];
      let detail = {};
      detail.ids = row.noticeid;
      this.$store
        .dispatch("sysManage/announcementSearchD", detail)
        .then(response => {
          let res = JSON.parse(JSON.stringify(response.rows));
          this.$emit("updated", res, "edit");
        });
    },
    // 删除
    dele(index) {
      this.$confirm("此操作将永久删除该公告, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let lis = JSON.parse(JSON.stringify(this.$refs.multipleTabled.list));
        let row = lis[index];
        let del = {};
        del.ids = row.noticeid;
        this.$store
          .dispatch("sysManage/announcementDel", del)
          .then(response => {
            if (response.result === "1") {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              // 刷新首页公告
              this.announcementInformation();
              this.$store.commit("app/SET_UNREADELETE");
              this.query();
            } else {
              this.$message({
                type: "warning",
                message: "删除失败"
              });
            }
          });
      });
    },
    // 未读公共信息查询
    announcementInformation() {
      this.$store
        .dispatch("sysManage/announcementInformation")
        .then(response => {
          if (response.result == "1") {
            // 传入VUEX
            this.$store.commit("app/SET_UNREAD", response.rows.num);
          }
        });
    },
    // 查询
   async query() {
      let form = {};
      let that = this;
      let thst = this.$refs.multipleTabled;
      let userLogin =
              "[" +
              that.$store.getters.orgInfo.empName +
              "]" +
              that.$store.getters.orgInfo.userName;
      let listRows=[]
      await this.$store.dispatch("sysManage/announcementList",{
        pagesize: 10000,
        pageindex: 1,
        category:"managenotice"
      })
      .then(response=>{
        listRows=response.rows.filter(x=>x.author==userLogin)
      })
      await this.$store.dispatch("sysManage/announcementList",{
        pagesize: 10000,
        pageindex: 1,
        category:"listnotice"
      }).then(response => {
        let lis = [...response.rows,...listRows];
        // 对发布时间进行排序
        lis.sort(function(a,b){
          return (new Date(b.last_update_date).getTime())-(new Date(a.last_update_date).getTime())
        })
        that.pages=lis.length
        let arr = [];
        for (const i in lis) {
          // 发布对象集合:audiences  界面显示(发布对象名称):fullname  操作列:style  true显示 false隐藏
          let str = "";
          if (lis[i].audiences == null) {
            lis[i].fullname = "全部";
            if(lis[i].author==null) {
               lis[i].style = false; continue
            }
            lis[i].author.includes(userLogin)?lis[i].style = true:lis[i].style = false
            continue;
          }
          lis[i].audiences.map(item => {
            str = str == "" ? item.fullname : str + "," + item.fullname;
            lis[i].author.includes(userLogin)?lis[i].style = true:lis[i].style = false
          });
          lis[i].fullname = str;
        }
        that.listTotal=lis// 总数据
        // 进行分页处理
        var begin =(that.listQust.pageindex - 1) * that.listQust.pagesize;
        var end =(that.listQust.pageindex - 1) * that.listQust.pagesize +that.listQust.pagesize;
        lis = lis.slice(begin, end);
        if (typeof this.$refs.multipleTabled != "undefined") {
          this.$refs.multipleTabled.list = lis;
        }
      });
    },
    // 选择分页事件
    handleSizeChange(val) {
      let that = this;
      let thst = this.$refs.multipleTabled;
      this.listQust.pagesize = val;
      this.listQust.pageindex = 1;
      thst.listIndex.pageIndex = 1;
      thst.listIndex.pageSize = val;
      var begin = (that.listQust.pageindex - 1) * that.listQust.pagesize;
      var end =(that.listQust.pageindex - 1) * that.listQust.pagesize +that.listQust.pagesize;
      thst.list = that.listTotal.slice(begin, end);
    },
    // 当前页选中事件
    handleCurrentChange(val) {
      let that = this;
      let thst = this.$refs.multipleTabled;
      debugger
      that.listQust.pageindex = val;
      thst.listIndex.pageIndex = val;
      var begin = (that.listQust.pageindex - 1) * that.listQust.pagesize;
      var end =(that.listQust.pageindex - 1) * that.listQust.pagesize +that.listQust.pagesize;
      thst.list = that.listTotal.slice(begin, end);
    },
  },
  watch: {
    active: {
      handler: function abs(params) {
        if (params == "b") {
          this.query();
        }
      }
    }
  }
};
</script>
