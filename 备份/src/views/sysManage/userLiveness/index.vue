<!--
* description: 用户活跃度报表
* author: mwhao
* createdDate: 2020-2-21
-->
<template>
<div class="filter-params-e3s">
  <el-tabs type="card" @tab-click="handleClick" class="container-app">
    <!-- <el-tab-pane label="用户活跃度报表">
      <one-table-template
        ref="multipleTable"
        :key="oneTableKey"
        :dynamicButtons="tableButtons"
        :dynamicComponents="tableComponents"
        :dynamicTableCols="tableCols"
        :dynamicFormFields="formField"
        :dynamicIsShowSelect="false"
        :dynamicIsInitTable="false"
        :dynamicIsColumnDrop="false"
        :dynamicTableOtherHeight="79"
        :dynamicParentTableRef="journa1"
        :isShowPagination="false"
      />
      <eachart></eachart>
    </el-tab-pane> -->
    <el-tab-pane label="用户访问列表">
      <one-table-template
        ref="multipleTable2"
        :key="oneTableKey"
        :dynamicButtons="tableButtons2"
        :dynamicComponents="tableComponents2"
        :dynamicTableCols="tableCols2"
        :dynamicFormFields="formField2"
        :dynamicIsShowSelect="false"
        :dynamicIsInitTable="false"
        :dynamicIsColumnDrop="false"
        :dynamicTableOtherHeight="53 + pageCompHeight"
        :dynamicParentTableRef="journa2"
        :isShowMoveIcon="false"
        :isShowPagination="false"
        :dynamicIsFixChoose="false"
        :dynamicIsFixIndex="false"
      />
      <div class="el-pagination is-background">
        <el-pagination
          @size-change="handleSizeChange2"
          @current-change="handleCurrentChange2"
          :page-sizes="pageSizeArray"
          :page-size="dynamicPageSize"
          ref="oneTable.pageArea"
          layout="prev, pager, next, sizes, ->, total"
          :prev-text="$t('sys.content.prevPage')"
          :next-text="$t('sys.content.nextPage')"
          :total="pages2"
        ></el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
// import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";
export default {
  name: "userLiveness",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    eachart: () => import("@/views/sysManage/userLiveness/eachart.vue")
  },
  // 阻塞路由预加载网格中组件的数据
  //   beforeRouteEnter(to, from, next) {
  //     Vue.prototype.$ConfigCache.CacheConfig.initData(
  //       // 同时加载当前页面和编辑框页面的配置
  //       [to.path,'orgBrandManageEdit'],
  //       function(){
  //         next()
  //       })
  //   },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path;
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode]);
    return {
      // 网格key
      oneTableKey: "oneTableKey",
      // 网格ref
      journa1: "multipleTable1",
      journa2: "multipleTable2",
      // 动态组件-按钮
      tableButtons:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          : [
              {
                compKey: "btnKey1",
                type: "primary",
                size: "small",
                clickEvent: () => this.queryTable(),
                text: this.$t("sys.button.query"),
                name: "search",
                position: "right"
              }, // 查询
              {
                compKey: "btnKey2",
                type: "",
                size: "small",
                clickEvent: () => this.reset(),
                text: this.$t("sys.button.reset"),
                name: "reset",
                position: "right"
              } // 重置
            ],
      tableButtons2:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          : [
              {
                compKey: "btnKey3",
                type: "primary",
                size: "small",
                clickEvent: () => this.queryTable2(),
                text: this.$t("sys.button.query"),
                name: "search",
                position: "right"
              }, // 查询
              {
                compKey: "btnKey4",
                type: "",
                size: "small",
                clickEvent: () => this.reset2(),
                text: this.$t("sys.button.reset"),
                name: "reset",
                position: "right"
              } // 重置
            ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
              .tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: "统计用户数量:" /*统计用户数量*/,
                codeField: "funcName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.dateRange") /*日期范围*/,
                codeField: "startTime,endTime",
                dataToObject: { timer: true, presentTime: true },
                component: () =>
                  import("@/components/org/datePicker/twoDatePicker"),
                format: "yyyy-MM-dd",
                isRequire: true,
                type: "twoDatePicker",
                dateOptionsType: "0",
                isMust: true
              },
              {
                compKey: "compKey3",
                labelName: "活跃度排列:" /*活跃度排列*/,
                // lookuptype: "VE0021",
                codeField: "type",
                component: () =>
                  import("@/components/org/dropdownList/dropdownList"),
                type: "dropdownList",
                isMust: true,
                options: [
                  { value: "-1", label: "不活跃" },
                  { value: "0", label: "活跃" }
                ]
              },
              {
                compKey: "compKey4",
                labelName: "访问平台:" /*访问平台*/,
                // lookuptype: "VE0021",
                codeField: "type",
                component: () =>
                  import("@/components/org/dropdownList/dropdownList"),
                type: "dropdownList",
                isMust: true,
                options: [
                  { value: "-1", label: "不限" },
                  { value: "0", label: "pc端" },
                  { value: "0", label: "移动端" }
                ]
              }
            ],
      tableComponents2:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
              .tableComponents
          : [
              {
                compKey: "compKey5",
                labelName: "用户名称" /*用户名称*/,
                codeField: "search",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey6",
                labelName: this.$t("org.label.dateRange") /*日期范围*/,
                codeField: "startTime,endTime",
                dataToObject: { timer: true, presentTime: true },
                component: () =>
                  import("@/components/org/datePicker/twoDatePicker"),
                format: "yyyy-MM-dd",
                isRequire: true,
                type: "twoDatePicker",
                dateOptionsType: "0",
                isMust: true
              },
              {
                compKey: "compKey7",
                labelName: "访问平台" /*访问平台*/,
                // lookuptype: "VE0021",
                codeField: "platType",
                component: () =>
                  import("@/components/org/dropdownList/dropdownList"),
                type: "dropdownList",
                isMust: true,
                options: [
                  { value: "-1", label: "不限" },
                  { value: "0", label: "PC端" },
                  { value: "1", label: "移动端" }
                ]
              },
              {
                compKey: "compKey8",
                labelName: "活跃度排列:" /*活跃度排列*/,
                // lookuptype: "VE0021",
                codeField: "sort",
                component: () =>
                  import("@/components/org/dropdownList/dropdownList"),
                type: "dropdownList",
                isMust: true,
                options: [
                  { value: "asc", label: "不活跃" },
                  { value: "desc", label: "活跃" }
                ]
              }
            ],

      // 网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [],
      tableCols2:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
              {
                prop: "USERNAME",
                // label: this.$t("org.label.carBrandCode"),
                label: "用户名称",
                width: null,
                align: "center"
              }, // 功能编号
              {
                prop: "USERID",
                // label: this.$t("org.label.carBrandCode"),
                label: "用户id",
                width: null,
                align: "center",
                hidden: true
              }, // 功能编号

              {
                prop: "TOTAL",
                // label: this.$t("org.label.carBrandCode"),
                label: "访问总次数",
                width: null,
                align: "center"
              }, // 访问总次数
              {
                prop: "FUNCID",
                // label: this.$t("org.label.carBrandCode"),
                label: "功能编号",
               width: null,
                align: "center"
              }, //功能编号
              {
                prop: "FUNCNAME",
                // label: this.$t("org.label.carBrandCode"),
                label: "功能名称",
                width: null,
                align: "center"
              }, //功能名称
              {
                prop: "SERVICEURL",
                // label: this.$t("org.label.carBrandCode"),
                label: "服务接口",
                width: null,
                align: "center"
              }, //服务接口
              {
                prop: "PLATTYPE",
                // label: this.$t("org.label.carBrandCode"),
                label: "调用平台",
                width: null,
                align: "center"
              }, //调用平台
              {
                prop: "USERCOUNT",
                // label: this.$t("org.label.carBrandCode"),
                label: "访问次数",
                width: null,
                align: "center"
              } //访问次数
            ],
      // 表单查询数据
      formField: this.$utils.getFormField(
        this,
        {
          funcNum: "5",
          type: "-1",
          startTime: "2020-02-20",
          endTime: " 2020-02-21"
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      formField2: this.$utils.getFormField(
        this,
        {
          pagesize: this.dynamicPageSize,
          pageindex: "1",
          search: "", // 用户名称
          sort: "desc", // 活跃度排序 desc活跃 asc不活跃
          platType: "-1", // 访问平台
          startTime: "",
          endTime: ""
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      // 分页总条数
      pages: 0,
      pages2: 0,
      // 错误提示
      errorHint: {
        l0402100025: "统计数据只能查询7天的数据",
        l0402100026: "统计数据只能查询30天的数据",
        l9900000035: "开始日期大于结束日期",
        l9900000036: "开始日期或结束日期为空",
        l0402100008: "统计功能调用出错"
      },
      // 重置时间
      scheduleStart: "",
      scheduleEnd: ""
    };
  },
  created() {
    this.resetTime();
  },
  methods: {
    // 当前时间
    resetTime() {
      var now = new Date();
      let endDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      // now.setMonth(now.getMonth() - 1);
      now.setDate(now.getDate() - 1);
      let beginDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      this.timer = [beginDate, endDate];
      this.scheduleStart = this.timer[0];
      this.scheduleEnd = this.timer[0];
      this.formField.startTime = this.timer[1];
      this.formField.endTime = this.timer[1];
      this.formField2.startTime = this.timer[0];
      this.formField2.endTime = this.timer[1];
    },
    // 用户活跃度报表查询
    queryTable() {},
    // 用户访问列表查询
    queryTable2() {
      const that = this;
      that.$refs.multipleTable2.listLoading = true;
      this.$store
        .dispatch("sysManage/uservisitQuery", this.formField2)
        .then(response => {
          let rows = response.rows;
          if (response.result === "1") {
            that.pages2 = response.records;
            for (let i = 0; i < rows.length; i++) {
              if (rows[i].PLATTYPE === "0") {
                rows[i].PLATTYPE = "PC端";
              } else {
                rows[i].PLATTYPE = "移动端";
              }
            }
            that.$refs.multipleTable2.list = rows;
          } else {
            this.$message({
              message: that.errorHint[response.msg],
              type: "success"
            });
          }
          that.$refs.multipleTable2.listLoading = false;
        });
    },
    // 选择分页事件
    handleSizeChange2(val) {
      this.formField2.pagesize = val;
      this.formField2.pageindex = 1;
      this.queryTable2();
    },
    // 当前页选中事件
    handleCurrentChange2(val) {
      this.formField2.pageindex = val;
      this.queryTable2();
    },
    // tab切换网格自适应高度
    handleClick(even) {
      this.oneTableKey = this.oneTableKey + "1";
    },
    // 重置
    reset2() {
      this.formField2 = {
        pagesize: this.dynamicPageSize,
        pageindex: "1",
        search: "", // 用户名称
        sort: "desc", // 活跃度排序 desc活跃 asc不活跃
        platType: "-1", // 访问平台
        startTime: this.scheduleStart,
        endTime: this.scheduleEnd
      };
      this.handleClick();
      this.queryTable2();
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.container-app {
  // padding: 10px 0 0 0;
  background: #fff;
  margin: 10px 10px 0 10px;
}
/deep/.filter-params-e3s {
  background: #fff;
}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border:none!important
}
/deep/ .el-tabs__item.is-top{
  border-left: none;
}
</style>
