<!--
* description: 服务调用报表
* author: mwhao
* createdDate: 2020-2-21
-->
<template>
  <div class="filter-params-e3s">
    <el-tabs type="card" @tab-click="handleClick" class="container-app">
      <!-- <el-tab-pane label="服务调用图表">
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
        :dynamicIsFixChoose="false"
        :dynamicIsFixIndex="false"
      />
      <eachart></eachart>
      </el-tab-pane>-->
      <el-tab-pane label="服务调用明细">
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
          :dynamicParentTableRef="journa2"
          :dynamicTableOtherHeight="40 + pageCompHeight"
          :isShowPagination="false"
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
import { orgApis } from "@/api/apiList/org";
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
      // 总条数
      pages2: 0,
      // 网格key
      oneTableKey: "oneTableKey",
      apiConfig2: orgApis.logInvokingQueryFindAll,
      // 网格ref
      journa1: "multipleTable1",
      journa2: "multipleTable2",
      // 分页查询条件
      pageSize2: this.dynamicPageSize,
      pageindex2: 1,
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
                labelName: "统计功能数量:" /*统计功能数量*/,
                codeField: "funcNum",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: "服务调用排列:" /*服务调用排列*/,
                // lookuptype: "VE0021",
                codeField: "sort",
                component: () =>
                  import("@/components/org/dropdownList/dropdownList"),
                type: "dropdownList",
                isMust: true,
                options: [
                  { value: "asc", label: "最少" },
                  { value: "desc", label: "最多" }
                ]
              },
              {
                compKey: "compKey3",
                labelName: "日期范围" /*日期范围*/,
                codeField: "startTime,endTime",
                component: () =>
                  import("@/components/org/datePicker/twoDatePicker"),
                format: "yyyy-MM-dd",
                dataToObject: { timer: true },
                isRequire: true,
                type: "twoDatePicker",
                dateOptionsType: "0",
                isMust: true
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
                labelName: "功能名称" /*功能名称*/,
                codeField: "realFuncname",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey6",
                labelName: "功能编号" /*功能编号*/,
                codeField: "realFuncid",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey7",
                labelName: "日期范围" /*日期范围*/,
                codeField: "invAccesstimeStart,invAccesstimeEnd",
                component: () =>
                  import("@/components/org/datePicker/twoDatePicker"),
                format: "yyyy-MM-dd HH:mm:ss",
                dataToObject: { timer: true, presentTime: true },
                isRequire: true,
                type: "twoDatePicker",
                dateOptionsType: "0",
                isMust: true
              },
              {
                compKey: "compKey8",
                labelName: "服务接口" /*服务接口*/,
                codeField: "invServiceurl",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey9",
                labelName: "访问IP" /*访问IP*/,
                codeField: "invAccessip",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: false
              },
              // {
              //   compKey: "compKey10",
              //   labelName: "调用平台类型" /*调用平台类型*/,
              //   lookuptype: "DB0130",
              //   codeField: "invPlattype",
              //   component: () => import("@/components/org/LookupValue"),
              //   type: "dropdownList",
              //   isMust: false
              // },
              {
                compKey: "compKey11",
                labelName: "浏览器" /*浏览器*/,
                lookuptype: "DB0120",
                codeField: "invBrowser",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: false
              },
              //  {
              //   compKey: "compKey12",
              //   labelName: "访问用户ID" /*访问用户ID*/,
              //   codeField: "invUserid",
              //   component: () => import("@/components/org/commonInput"),
              //   type: "inputText",
              //   isMust: false
              // },
              {
                compKey: "compKey13",
                labelName: "访问用户名" /*访问用户名*/,
                codeField: "invUsername",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: false
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
                prop: "invProjectid",
                // label: this.$t("org.label.carBrandCode"),
                label: "项目编号",
                width: null,
                align: "center"
              }, // 项目编号
              {
                prop: "realFuncid",
                // label: this.$t("org.label.carBrandCode"),
                label: "功能编号",
                width: null,
                align: "center"
              }, // 功能编号
              {
                prop: "realFuncname",
                // label: this.$t("org.label.carBrandCode"),
                label: "功能名称",
                width: null,
                align: "center"
              }, // 功能名称
              {
                prop: "invServiceurl",
                // label: this.$t("org.label.carBrandCode"),
                label: "服务接口",
                width: null,
                align: "center"
              }, // 服务接口
              {
                prop: "invId",
                // label: this.$t("org.label.carBrandCode"),
                label: "调用日志ID",
                width: null,
                align: "center",
                hidden: true
              }, // 用户id

              {
                prop: "invAccesstime",
                // label: this.$t("org.label.carBrandCode"),
                label: "调用时间",
                width: null,
                align: "center"
              }, // 访问总次数
              {
                prop: "invAccessip",
                // label: this.$t("org.label.carBrandCode"),
                label: "访问IP",
                width: null,
                align: "center"
              }, //访问IP
              {
                prop: "invBrowserName",
                // label: this.$t("org.label.carBrandCode"),
                label: "浏览器",
                width: null,
                align: "center"
              }, //浏览器
              {
                prop: "invBrowser",
                // label: this.$t("org.label.carBrandCode"),
                label: "浏览器",
                width: null,
                align: "center",
                hidden: true
              }, //浏览器
              {
                prop: "invPlattype",
                // label: this.$t("org.label.carBrandCode"),
                label: "调用平台",
                width: null,
                align: "center",
                hidden: true
              }, //调用平台
              {
                prop: "invPlattypeName",
                // label: this.$t("org.label.carBrandCode"),
                label: "调用平台",
                width: null,
                align: "center"
              }, //调用平台
              {
                prop: "invUserid",
                // label: this.$t("org.label.carBrandCode"),
                label: "访问用户ID",
                width: null,
                align: "center"
              }, //访问用户ID
              {
                prop: "invUsername",
                // label: this.$t("org.label.carBrandCode"),
                label: "访问用户名",
                width: null,
                align: "center"
              } //访问用户ID
            ],
      // 表单查询数据
      formField: this.$utils.getFormField(
        this,
        {
          funcNum: "15",
          sort: "desc",
          startTime: "",
          endTime: ""
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      formField2: this.$utils.getFormField(
        this,
        {
          realFuncname: "",
          realFuncid: "",
          invServiceurl: "",
          invAccesstimeStart: "",
          invAccesstimeEnd: "",
          invAccessip: "",
          invPlattype: "",
          invBrowser: "",
          invUserid: "",
          invUsername: ""
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      // 错误提示
      errorHint: {
        l0402100025: "统计数据只能查询7天的数据"
      }
    };
  },
  created() {
    // this.getCurrentDate(1);
    this.resetTime();
  },
  methods: {
    // 用户活跃度报表查询
    queryTable() {
      const that = this;
      this.$store
        .dispatch("apiManage/servechartQuery", this.formField)
        .then(response => {
          //   that.pages = response.records;
          //   var tmpLst = this.$utils.changeToOneDeepArray(response.rows);
          //   for (var i = 0; i < tmpLst.length; i++) {
          //     if (!tmpLst[i].index) {
          //       tmpLst[i].index = i;
          //     }
          //   }
          //   that.$children[0].list = tmpLst;
        });
    },
    // 用户访问列表查询
    queryTable2() {
      let that = this;
      that.$refs.multipleTable2.listLoading = true;
      let queryObj = {
        // api配置
        type: "query",
        apiConfig: that.apiConfig2,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: [
              "invId",
              "invProjectid",
              "realFuncid",
              "realFuncname",
              "invServiceurl",
              "invAccesstime",
              "invAccessip",
              "invBrowser",
              "invBrowserName",
              "invPlattype",
              "invPlattypeName",
              "invUserid",
              "invUsername"
            ]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: that.pageSize2,
          pageIndex: that.pageindex2,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.formField2
        }
      };
      //转换了中台请求格式数据
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        if (response.result == "1") {
          let tmpLst = response.rows;
          //  that.$refs.multipleTable2.pageTotal =
          //   response.records;
          that.pages2 = response.records;
          that.$refs.multipleTable2.list = tmpLst;
        }
        that.$refs.multipleTable2.listLoading = false;
      });
    },
    // 重置
    reset() {
      this.$refs.multipleTable.reset();
    },
    reset2() {
      this.pageSize2 = this.dynamicPageSize;
      this.pageindex2 = 1;
      this.pages2=0;
      this.$refs.multipleTable2.reset();
    },
    // tab切换网格自适应高度
    handleClick(even) {
      this.oneTableKey = this.oneTableKey + "1";
    },
    // // 选择分页事件
    handleSizeChange(val) {
      this.pageSize2 = val;
      this.pageindex2 = 1;
      this.queryTable2();
    },
    // 当前页选中事件
    handleCurrentChange(val) {
      this.pageindex2 = val;
      this.queryTable2();
    },
    resetTime() {
      var now = new Date();
      let endDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      // now.setMonth(now.getMonth() - 1);
      now.setDate(now.getDate() - 1);
      let beginDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      this.timer = [beginDate, endDate];
      this.formField.startTime = this.timer[0];
      this.formField.endTime = this.timer[1];
      this.formField2.invAccesstimeStart = this.timer[0] += " 00:00:00";
      this.formField2.invAccesstimeEnd = this.timer[1] += " 00:00:00";
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ #scrollRightEle {
  bottom: 70px;
}
/deep/ #scrollLeftEle {
  bottom: 70px;
}
/deep/ .el-tabs__content {
  background: #fff;
}
/deep/ .el-tabs__header {
  margin: 0 !important;
}

/deep/.el-tree-node:focus > .el-tree-node__content {
  background-color: #ddd !important;
}

/deep/.el-card__body {
  padding: 10px 0 0 10px;
}
/deep/.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 10px;
}
/deep/.el-transfer-panel__body {
  height: 277px;
  font-size: 12px;
}
/deep/.el-transfer-panel .el-transfer-panel__footer {
  text-align: center;
}
/deep/.el-transfer-panel__list {
  height: 99%;
}
/deep/.el-tabs__nav-scroll {
  padding: 0 0 0 10px;
}
/deep/.container-app {
  // padding: 10px 0 0 0;
  background: #fff;
  margin: 10px 10px 0 10px;
}
/deep/.filter-params-e3s {
  background: #fff;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none !important;
}
/deep/ .el-tabs__item.is-top {
  border-left: none;
}
</style>
