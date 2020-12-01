<!--
* description: 日志报表
* author: mwhao
* createdDate: 2020-2-21
-->
<template>
  <div class="filter-params-e3s">
    <el-tabs type="card" @tab-click="handleClick" class="container-app">
      <!-- <el-tab-pane label="日志图表">
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
      :dynamicApiConfig="apiConfig"-->
      <!-- </el-tab-pane>  -->
      <el-tab-pane label="功能访问日志">
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
          :dynamicTableOtherHeight="40 + pageCompHeight"
          :dynamicIsFixChoose="false"
          :dynamicIsFixIndex="false"
          :dynamicParentTableRef="journa2"
          :isShowMoveIcon="false"
          :isShowPagination="false"
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
      <!-- <el-tab-pane label="菜单授权日志">
        <one-table-template
          ref="multipleTable3"
          :key="oneTableKey"
          :dynamicButtons="tableButtons3"
          :dynamicComponents="tableComponents3"
          :dynamicTableCols="tableCols3"
          :dynamicFormFields="formField3"
          :dynamicIsShowSelect="false"
          :dynamicIsInitTable="false"
          :dynamicIsColumnDrop="false"
          :dynamicTableOtherHeight="79"
          :dynamicParentTableRef="journa3"
          :dynamicIsFixChoose="false"
          :dynamicIsFixIndex="false"
      />-->
      <!-- :dynamicApiConfig="apiConfig3" -->
      <!-- </el-tab-pane> -->
      <el-tab-pane label="用户表操作日志">
        <one-table-template
          ref="multipleTable4"
          :key="oneTableKey"
          :dynamicButtons="tableButtons4"
          :dynamicComponents="tableComponents4"
          :dynamicTableCols="tableCols4"
          :dynamicFormFields="formField4"
          :dynamicIsShowSelect="false"
          :dynamicIsInitTable="false"
          :dynamicIsColumnDrop="false"
          :dynamicTableOtherHeight="40 + pageCompHeight"
          :dynamicParentTableRef="journa4"
          :isShowMoveIcon="false"
          :isShowPagination="false"
          :dynamicIsFixChoose="false"
          :dynamicIsFixIndex="false"
        />
        <div class="el-pagination is-background">
          <el-pagination
            @size-change="handleSizeChange4"
            @current-change="handleCurrentChange4"
            :page-sizes="pageSizeArray"
            :page-size="dynamicPageSize"
            ref="oneTable.pageArea"
            layout="prev, pager, next, sizes, ->, total"
            :prev-text="$t('sys.content.prevPage')"
            :next-text="$t('sys.content.nextPage')"
            :total="pages4"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="数据操作日志">
        <one-table-template
          ref="multipleTable5"
          :key="oneTableKey"
          :dynamicButtons="tableButtons5"
          :dynamicComponents="tableComponents5"
          :dynamicTableCols="tableCols5"
          :dynamicFormFields="formField5"
          :dynamicIsShowSelect="false"
          :dynamicIsInitTable="false"
          :dynamicIsColumnDrop="false"
          :dynamicTableOtherHeight="40 + pageCompHeight"
          :dynamicParentTableRef="journa5"
          :isShowMoveIcon="false"
          :isShowPagination="false"
          :dynamicIsFixChoose="false"
          :dynamicIsFixIndex="false"
        />
        <div class="el-pagination is-background">
          <el-pagination
            @size-change="handleSizeChange5"
            @current-change="handleCurrentChange5"
            :page-sizes="pageSizeArray"
            :page-size="dynamicPageSize"
            ref="oneTable.pageArea"
            layout="prev, pager, next, sizes, ->, total"
            :prev-text="$t('sys.content.prevPage')"
            :next-text="$t('sys.content.nextPage')"
            :total="pages5"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="菜单访问日志">
        <one-table-template
          ref="multipleTable6"
          :key="oneTableKey"
          :dynamicButtons="tableButtons6"
          :dynamicComponents="tableComponents6"
          :dynamicTableCols="tableCols6"
          :dynamicFormFields="formField6"
          :dynamicIsShowSelect="false"
          :dynamicIsInitTable="false"
          :dynamicIsColumnDrop="false"
          :dynamicTableOtherHeight="40"
          :dynamicParentTableRef="journa6"
          :dynamicApiConfig="apiConfig6"
          :isShowMoveIcon="false"
          :dynamicIsFixChoose="false"
          :dynamicIsFixIndex="false"
        />
      </el-tab-pane>
    </el-tabs>
    <lookusertable
      :lookUserVisible="lookUserVisible"
      :bssId="bssId"
      :key="lookUserKey"
      @lookuserClose="lookuserClose"
      :lookType="lookType"
    ></lookusertable>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";

import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";

export default {
  name: "accessLog",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    // eachart: () => import("@/views/sysManage/userLiveness/eachart.vue")
    lookusertable: () =>
      import("@/views/org/sysManagement/journaLing/lookusertable.vue")
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
      // 查看详情id
      bssId: "",
      // 弹窗显示
      lookType: "1",
      lookUserVisible: false,
      lookUserKey: "lookUserVisible",
      // 网格key
      oneTableKey: "oneTableKey",
      // 网格ref
      // journa1: "multipleTable1",
      journa2: "multipleTable2",
      // journa3: "multipleTable3",
      journa4: "multipleTable4",
      journa5: "multipleTable5",
      journa6: "multipleTable6",
      //   // 网格查询API配置对象
      //   apiConfig: orgApis.mdmCarBrandQueryByPage,
      apiConfig2: orgApis.logRunQueryFindAll,
      //   apiConfig3: orgApis.mdmCarBrandQueryByPage,
      // apiConfig4: orgApis.mdmCarBrandQueryByPage,
      // apiConfig5: orgApis.mdmCarBrandQueryByPage,
      apiConfig6: orgApis.SysNavigationLogQueryFindAll,
      // 动态组件-按钮
      // tableButtons:
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
      //     .length > 0
      //     ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
      //     : [
      //         {
      //           compKey: "btnKey1",
      //           type: "primary",
      //           size: "small",
      //           clickEvent: () => this.queryTable(),
      //           text: this.$t("sys.button.query"),
      //           name: "search",
      //           position: "right"
      //         }, // 查询
      //         {
      //           compKey: "btnKey2",
      //           type: "",
      //           size: "small",
      //           clickEvent: () => this.reset(),
      //           text: this.$t("sys.button.reset"),
      //           name: "reset",
      //           position: "right"
      //         } // 重置
      //       ],
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
      // tableButtons3:
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
      //     .length > 0
      //     ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
      //     : [
      //         {
      //           compKey: "btnKey5",
      //           type: "primary",
      //           size: "small",
      //           clickEvent: () => this.queryTable3(),
      //           text: this.$t("sys.button.query"),
      //           name: "search",
      //           position: "right"
      //         }, // 查询
      //         {
      //           compKey: "btnKey6",
      //           type: "",
      //           size: "small",
      //           clickEvent: () => this.reset(),
      //           text: this.$t("sys.button.reset"),
      //           name: "reset",
      //           position: "right"
      //         } // 重置
      //       ],
      tableButtons4:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          : [
              {
                compKey: "btnKey7",
                type: "primary",
                size: "small",
                clickEvent: () => this.queryTable4(),
                text: this.$t("sys.button.query"),
                name: "search",
                position: "right"
              }, // 查询
              {
                compKey: "btnKey8",
                type: "",
                size: "small",
                clickEvent: () => this.reset4(),
                text: this.$t("sys.button.reset"),
                name: "reset",
                position: "right"
              } // 重置
            ],
      tableButtons5:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          : [
              {
                compKey: "btnKey9",
                type: "primary",
                size: "small",
                clickEvent: () => this.queryTable5(),
                text: this.$t("sys.button.query"),
                name: "search",
                position: "right"
              }, // 查询
              {
                compKey: "btnKey10",
                type: "",
                size: "small",
                clickEvent: () => this.reset5(),
                text: this.$t("sys.button.reset"),
                name: "reset",
                position: "right"
              } // 重置
            ],
      tableButtons6:
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
                clickEvent: () => this.queryTable6(),
                text: this.$t("sys.button.query"),
                name: "search",
                position: "right"
              }, // 查询
              {
                compKey: "btnKey4",
                type: "",
                size: "small",
                clickEvent: () => this.reset6(),
                text: this.$t("sys.button.reset"),
                name: "reset",
                position: "right"
              } // 重置
            ],
      tableComponents2:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
              .tableComponents
          : [
              {
                compKey: "compKey4",
                labelName: this.$t("org.label.functionName") /*功能名称*/,
                codeField: "realFuncname",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey21",
                labelName: "服务接口" /*服务接口*/,
                codeField: "runServiceurl",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey5",
                labelName: this.$t("org.label.logType") /*日志类型*/,
                lookuptype: "DB0110",
                codeField: "runType",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: true,
                hidden: true
              },
              {
                compKey: "compKey6",
                labelName: this.$t("org.label.dateRange") /*日期范围*/,
                codeField: "runTimeStart,runTimeEnd",
                component: () =>
                  import("@/components/org/datePicker/twoDatePicker"),
                format: "yyyy-MM-dd HH:mm:ss",
                isRequire: true,
                dataToObject: { timer: true, presentTime: true },
                type: "twoDatePicker",
                dateOptionsType: "0",
                isMust: true
              },
              {
                compKey: "compKey22",
                labelName: "访问IP" /*访问IP*/,
                codeField: "runIp",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                isMust: false
              },
              {
                compKey: "compKey23",
                labelName: "调用平台类型" /*调用平台类型*/,
                lookuptype: "DB0130",
                codeField: "runPlattype",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: true,
                isMust: false
              },
              {
                compKey: "compKey24",
                labelName: "浏览器" /*浏览器*/,
                lookuptype: "DB0120",
                codeField: "runBrowser",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: true,
                isMust: false
              },
              {
                compKey: "compKey4",
                labelName: "访问用户名ID" /*访问用户名ID*/,
                codeField: "runUserid",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                isMust: false
              },
              {
                compKey: "compKey25",
                labelName: "访问用户名" /*访问用户名*/,
                codeField: "runUsername",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                isMust: false
              }
            ],
      tableComponents4:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
              .tableComponents
          : [
              {
                compKey: "compKey11",
                labelName: this.$t("org.label.operating") /*操作人员*/,
                codeField: "username",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey10",
                labelName: this.$t("org.label.operationType") /*操作类型*/,
                // lookuptype: "VE0021",
                codeField: "optiontype",
                component: () =>
                  import("@/components/org/dropdownList/dropdownList"),
                type: "dropdownList",
                isMust: true,
                options: [
                  { value: "-1", label: "不限" },
                  { value: "1", label: "新增" },
                  { value: "2", label: "修改" },
                  { value: "3", label: "删除" }
                ]
              },
              {
                compKey: "compKey12",
                labelName: this.$t("org.label.dateRange") /*日期范围*/,
                codeField: "starttime,endtime",
                component: () =>
                  import("@/components/org/datePicker/twoDatePicker"),
                format: "yyyy-MM-dd",
                isRequire: true,
                dataToObject: { timer: true, thirtyTime: true, hhmmss: true },
                type: "twoDatePicker",
                dateOptionsType: "0",
                isMust: true
              }
            ],
      tableComponents5:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
              .tableComponents
          : [
              {
                compKey: "compKey13",
                labelName: this.$t("org.label.operationType") /*操作类型*/,
                // lookuptype: "VE0021",
                codeField: "optiontype",
                component: () =>
                  import("@/components/org/dropdownList/dropdownList"),
                type: "dropdownList",
                isMust: true,
                options: [
                  { value: "-1", label: "不限" },
                  { value: "1", label: "新增" },
                  { value: "2", label: "修改" },
                  { value: "3", label: "删除" }
                ]
              },
              {
                compKey: "compKey14",
                labelName: this.$t("org.label.dataForm") /*数据表名*/,
                codeField: "tabname",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey15",
                labelName: this.$t("org.label.operating") /*操作人员*/,
                codeField: "username",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey16",
                labelName: this.$t("org.label.dateRange") /*日期范围*/,
                codeField: "starttime,endtime",
                component: () =>
                  import("@/components/org/datePicker/twoDatePicker"),
                format: "yyyy-MM-dd",
                isRequire: true,
                dataToObject: { timer: true, thirtyTime: true, hhmmss: true },
                type: "twoDatePicker",
                dateOptionsType: "0",
                isMust: true
              }
            ],
      tableComponents6:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
              .tableComponents
          : [
              // {
              //   compKey: "compKey18",
              //   labelName: this.$t("org.label.logType"),
              //   // lookuptype: "VE0021",
              //   codeField: "logType",
              //   component: () =>
              //     import("@/components/org/dropdownList/dropdownList"),
              //   type: "dropdownList",
              //   isMust: true,
              //   options: [
              //     { value: "0", label: "菜单" },
              //     { value: "1", label: "流程发起" }
              //   ]
              // }, // 日志类型
              {
                compKey: "compKey19",
                labelName: this.$t("org.label.UserName"), // 用户名称
                codeField: "empName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                isShow: true
              },
              {
                compKey: "compKey17",
                labelName: this.$t("org.label.menuName"), // 菜单名称
                codeField: "menuName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                isShow: true
              },
              {
                compKey: "compKey18",
                labelName: "菜单地址", // 菜单地址
                codeField: "menuUrl",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                isShow: true
              },
              {
                compKey: "compKey40",
                labelName: "访问时间" /*访问时间*/,
                codeField: "startTime,endTime",
                component: () =>
                  import("@/components/org/datePicker/twoDatePicker"),
                format: "yyyy-MM-dd 00:00:00",
                isRequire: true,
                dataToObject: { timer: true, thirtyTime: true },
                type: "twoDatePicker",
                dateOptionsType: "0",
                isMust: true
              }
              // {
              //   compKey: "compKey20",
              //   labelName: this.$t("org.label.menuName"),
              //   codeField: "menuId",
              //   component: () => import("@/components/org/correspondingMenu"),
              //   type: "inputText",
              //   isMust: true
              // } /*菜单ID*/
            ],
      // 动态生成网格列
      // tableCols:
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
      //     0
      //     ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
      //     : [
      // {
      //   prop: "carBrandCode",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "功能编号",
      //   width: null,
      //   align: "center"
      // }, // 功能编号
      // {
      //   prop: "carBrandCn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "功能名称",
      //   width: null,
      //   align: "center"
      // }, // 功能名称
      // {
      //   prop: "carBrandEn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "服务接口",
      //   width: null,
      //   align: "center"
      // }, //服务接口
      // {
      //   prop: "carBrandEn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "执行时间",
      //   width: null,
      //   align: "center"
      // }, //执行时间
      // {
      //   prop: "carBrandEn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "日志内容",
      //   width: null,
      //   align: "center"
      // }, //日志内容
      // {
      //   prop: "carBrandEn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "浏览器",
      //   width: null,
      //   align: "center"
      // }, //浏览器
      // {
      //   prop: "carBrandEn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "访问IP",
      //   width: null,
      //   align: "center"
      // }, //访问IP
      // {
      //   prop: "carBrandEn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "调用平台",
      //   width: null,
      //   align: "center"
      // }, //调用平台
      // {
      //   prop: "carBrandEn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "访问用户ID",
      //   width: null,
      //   align: "center"
      // }, //访问用户ID
      // {
      //   prop: "carBrandEn",
      //   // label: this.$t("org.label.carBrandCode"),
      //   label: "访问用户名",
      //   width: null,
      //   align: "center"
      // }, //访问用户名
      // {
      //   prop: "updateControlId",
      //   label: "并发控制",
      //   width: null,
      //   align: "center",
      //   hidden: true
      // },
      // {
      //   prop: "uid",
      //   label: "主键ID",
      //   width: null,
      //   align: "center",
      //   hidden: true
      // }
      // ],
      tableCols2:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
              {
                prop: "realFuncid",
                label: this.$t("org.label.functionNumber"),
                width: null,
                align: "center"
              }, // 功能编号

              {
                prop: "realFuncname",
                label: this.$t("org.label.functionName"),
                width: null,
                align: "center"
              }, // 功能名称
              {
                prop: "runServiceurl",
                label: this.$t("org.label.serviceInterface"),
                width: null,
                align: "center"
              }, //服务接口
              {
                prop: "runTime",
                label: this.$t("org.label.executionTime"),
                width: null,
                align: "center"
              }, //执行时间
              {
                prop: "runMsg",
                label: this.$t("org.label.logContents"),
                width: null,
                align: "center"
              }, //日志内容
              {
                prop: "runType",
                label: "日志类型",
                width: null,
                align: "center",
                hidden: true
              }, //日志类型
              {
                prop: "runTypeName",
                label: "日志类型",
                width: null,
                align: "center"
              }, //日志类型
              {
                prop: "runBrowser",
                label: this.$t("org.label.browser"),
                width: null,
                align: "center",
                hidden: true
              }, //浏览器
              {
                prop: "runBrowserName",
                label: this.$t("org.label.browser"),
                width: null,
                align: "center"
              }, //浏览器
              {
                prop: "runIp",
                label: this.$t("org.label.visitIP"),
                width: null,
                align: "center"
              }, //访问IP
              {
                prop: "runPlattype",
                label: this.$t("org.label.callPlatform"),
                width: null,
                align: "center",
                hidden: true
              }, //调用平台
              {
                prop: "runPlattypeName",
                label: this.$t("org.label.callPlatform"),
                width: null,
                align: "center"
              }, //调用平台
              {
                prop: "runUserid",
                label: this.$t("org.label.accessUserID"),
                width: null,
                align: "center"
              }, //访问用户ID
              {
                prop: "runUsername",
                label: this.$t("org.label.accessUsername"),
                width: null,
                align: "center"
              } //访问用户名
            ],
      // tableCols3:
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
      //     0
      //     ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
      //     : [
      //         {
      //           prop: "carBrandCode",
      //           label: this.$t("org.label.authorizationType"),
      //           width: null,
      //           align: "center"
      //         }, // 授权类型

      //         {
      //           prop: "carBrandCn",
      //           label: this.$t("org.label.operatingTime"),
      //           width: null,
      //           align: "center"
      //         }, // 操作时间
      //         {
      //           prop: "carBrandEn",
      //           label: this.$t("org.label.operating"),
      //           width: null,
      //           align: "center"
      //         }, //操作人员
      //         {
      //           prop: "carBrandEn",
      //           label: this.$t("org.label.detailsData"),
      //           width: null,
      //           align: "center"
      //         } //数据详情
      //       ],
      tableCols4:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
              // 操作
              {
                prop: "controlBtn",
                label: this.$t("sys.content.operate"),
                codeField: "controlBtn",
                width: 65,
                align: "center",
                // fixed: true,
                isComponent: true,
                //  编辑
                comps: [
                  {
                    compKey: "propKey4" /*, rowFileds: 'show:isEnable--0'*/,
                    labelName: this.$t("org.label.detailsData"),
                    // codeField: "editControlBtn",
                    clickEvent: this.look4,
                    component: () => import("@/components/org/linkButton")
                  }
                  //,{compKey: 'propKey1', rowFileds: 'show:isEnable-1-', labelName: this.$t('sys.button.delete'), codeField: 'delControlBtn', clickEvent: this.del, component: () => import('@/components/org/linkButton')}
                ]
              },

              {
                prop: "BSS_OPTTYPE",
                label: this.$t("org.label.operationType"),
                width: null,
                align: "center"
              }, // 操作类型
              {
                prop: "BSS_ID",
                label: this.$t("org.label.operationType"),
                width: null,
                align: "center",
                hidden: true
              }, // 操作类型ID

              {
                prop: "BSS_TIME",
                label: this.$t("org.label.lastUpdatedTime"),
                width: null,
                align: "center"
              }, // 修改时间
              {
                prop: "BSS_USERNAME",
                label: this.$t("org.label.operating"),
                width: null,
                align: "center"
              } //操作人员
              // {
              //   prop: "carBrandEn",
              //   label: this.$t("org.label.detailsData"),
              //   width: null,
              //   align: "center"
              // } //数据详情
            ],
      tableCols5:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
              // 操作
              {
                prop: "controlBtn",
                label: this.$t("sys.content.operate"),
                codeField: "controlBtn",
                width: 65,
                align: "center",
                fixed: true,
                isComponent: true,
                //  编辑
                comps: [
                  {
                    compKey: "propKey5" /*, rowFileds: 'show:isEnable--0'*/,
                    labelName: this.$t("org.label.detailsData"),
                    // codeField: "editControlBtn",
                    clickEvent: this.look5,
                    component: () => import("@/components/org/linkButton")
                  }
                  //,{compKey: 'propKey1', rowFileds: 'show:isEnable-1-', labelName: this.$t('sys.button.delete'), codeField: 'delControlBtn', clickEvent: this.del, component: () => import('@/components/org/linkButton')}
                ]
              },

              {
                prop: "BSS_TABLENAME",
                label: this.$t("org.label.dataForm"),
                width: null,
                align: "center"
              }, // 数据表名

              {
                prop: "BSS_OPTTYPE",
                label: this.$t("org.label.operationType"),
                width: null,
                align: "center"
              }, // 操作类型
              {
                prop: "BSS_ID",
                label: this.$t("org.label.operationType"),
                width: null,
                align: "center",
                hidden: true
              }, // 操作类型ID
              {
                prop: "BSS_TIME",
                label: this.$t("org.label.lastUpdatedTime"),
                width: null,
                align: "center"
              }, //修改时间
              {
                prop: "BSS_USERNAME",
                label: this.$t("org.label.operating"),
                width: null,
                align: "center"
              } //操作人员
              // {
              //   prop: "carBrandEn",
              //   label: this.$t("org.label.detailsData"),
              //   width: null,
              //   align: "center"
              // } //数据详情
            ],
      tableCols6:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
              {
                prop: "logId",
                label: this.$t("org.label.No"),
                width: null,
                align: "center",
                hidden: true
              }, // 序号

              {
                prop: "logType",
                label: this.$t("org.label.logType"),
                width: null,
                align: "center",
                hidden: true
              }, // 日志类型
              {
                prop: "userId",
                label: this.$t("org.label.userId"),
                width: null,
                align: "center",
                hidden: true
              }, //用户ID
              {
                prop: "loginName",
                label: this.$t("org.label.accessUsername"),
                width: null,
                align: "center"
              }, //访问用户
              {
                prop: "menuId",
                label: this.$t("org.label.menuId"),
                width: null,
                align: "center",
                hidden: true
              }, //菜单ID
              {
                prop: "menuName",
                label: this.$t("org.label.menuName"),
                width: null,
                align: "center"
              }, //菜单名称
              {
                prop: "menuUrl",
                label: this.$t("org.label.menuUrl"),
                width: null,
                align: "center"
              }, //菜单地址
              {
                prop: "lastUpdatedTime",
                label: "访问时间",
                width: null,
                align: "center"
              } //修改时间
            ],
      // 表单查询数据
      // formField: this.$utils.getFormField(
      //   this,
      //   {
      //     funcNum: "5",
      //     type: "-1",
      //     startTime: "",
      //     endTime: ""
      //   },
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      // ),
      formField2: this.$utils.getFormField(
        this,
        {
          realFuncname: "",
          runServiceurl: "",
          runTimeStart: "",
          runTimeEnd: "",
          runIp: "",
          runPlattype: "",
          runType: "",
          runBrowser: "",
          runUserid: "",
          runUsername: ""
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      // formField3: this.$utils.getFormField(
      //   this,
      //   {
      //     pagesize: "10",
      //     pageindex: "1",
      //     tabname: "",
      //     username: "",
      //     starttime: "",
      //     endtime: ""
      //   },
      //   this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      // ),
      formField4: this.$utils.getFormField(
        this,
        {
          pagesize: this.dynamicPageSize,
          pageindex: "1",
          username: "",
          starttime: "",
          endtime: "",
          optiontype: "-1"
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      formField5: this.$utils.getFormField(
        this,
        {
          pagesize: this.dynamicPageSize,
          pageindex: "1",
          tabname: "",
          username: "",
          starttime: "",
          endtime: "",
          optiontype: "-1"
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      formField6: this.$utils.getFormField(
        this,
        {
          empName: "", // 用户名
          startTime: "", //开始时间
          endTime: "", // 截止时间
          menuName: "", // 菜单名称
          menuUrl: "" // 菜单路径
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      // 错误提示
      errorHint: {
        l0402100025: "统计数据只能查询7天的数据",
        l0402100026: "统计数据只能查询30天的数据",
        l9900000035: "开始日期大于结束日期",
        l9900000036: "开始日期或结束日期为空",
        l9900000040: "用户没有执行操作的权限",
        l0402100007: "查询功能调用出错"
      },
      // 重置时间
      scheduleStart: "",
      scheduleEnd: "",
      scheduleyearStart: "",
      scheduleyearEnd: "",
      // MP分页
      pages2: 0,
      pages4: 0,
      pages5: 0,
      // 请求页数
      pageSize2: this.dynamicPageSize,
      pageIndex2: 1
    };
  },
  created() {
    this.resetTime();
    this.resetTime4();
  },
  methods: {
    // 日志报表查询
    // queryTable() {
    //   const that = this;
    //   this.$store
    //     .dispatch("sysManage/logchartQuery", this.formField)
    //     .then(response => {
    //       console.log("成功");
    //     });
    // },
    //功能访问日志查询
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
              "runId",
              "realFuncid",
              "realFuncname",
              "runServiceurl",
              "runTime",
              "runMsg",
              "runType",
              "runTypeName",
              "runIp",
              "runBrowser",
              "runBrowserName",
              "runPlattype",
              "runPlattypeName",
              "runUserid",
              "runUsername"
            ]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: that.pageSize2,
          pageIndex: that.pageIndex2,
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
          // that.$refs.multipleTable2.pageTotal =
          //   response.records;
          for (let i = 0; i < tmpLst.length; i++) {
            if (
              tmpLst[i].runPlattype == null ||
              tmpLst[i].runPlattypeName == null
            ) {
              tmpLst[i].runPlattype = "0";
              tmpLst[i].runPlattypeName = "PC端";
            }
          }
          that.pages2 = response.records;
          that.$refs.multipleTable2.list = tmpLst;
        }
        that.$refs.multipleTable2.listLoading = false;
      });
    },
    //菜单授权日志查询
    // queryTable3() {
    //   const that = this;
    //   this.$store
    //     .dispatch("sysManage/menuauthorizationQuery", this.formField3)
    //     .then(response => {
    //       if (response.result === "1") {
    //         //   that.pages = response.records;
    //         var tmpLst = this.$utils.changeToOneDeepArray(response.rows);
    //         for (var i = 0; i < tmpLst.length; i++) {
    //           if (!tmpLst[i].index) {
    //             tmpLst[i].index = i;
    //           }
    //         }
    //         that.$refs.multipleTable3.list = tmpLst;
    //       } else {
    //         this.$message({
    //           message: that.errorHint[response.msg],
    //           type: "success"
    //         });
    //       }
    //     });
    // },
    //用户表操作日志  //提示返回有问题 应该返回30天, 返回没有数据
    queryTable4() {
      const that = this;
      that.$refs.multipleTable4.listLoading = true;
      this.$store
        .dispatch("sysManage/usertableQuery", this.formField4)
        .then(response => {
          if (response.result === "1") {
            let row = response.rows;
            for (let i = 0; i < row.length; i++) {
              if (row[i].BSS_OPTTYPE === 1) {
                row[i].BSS_OPTTYPE = "新增";
              } else if (row[i].BSS_OPTTYPE === 2) {
                row[i].BSS_OPTTYPE = "修改";
              } else if (row[i].BSS_OPTTYPE === 3) {
                row[i].BSS_OPTTYPE = "删除";
              }
            }
            that.pages4 = response.records;
            that.$refs.multipleTable4.list = row;
          } else {
            this.$message({
              message: that.errorHint[response.msg],
              type: "success"
            });
          }
          that.$refs.multipleTable4.listLoading = false;
        });
    },
    //数据操作日志查询
    queryTable5() {
      const that = this;
      that.$refs.multipleTable5.listLoading = true;
      this.$store
        .dispatch("sysManage/operationQuery", this.formField5)
        .then(response => {
          if (response.result === "1") {
            that.pages5 = response.records;
            let row = response.rows;
            for (let i = 0; i < row.length; i++) {
              if (row[i].BSS_OPTTYPE === 1) {
                row[i].BSS_OPTTYPE = "新增";
              } else if (row[i].BSS_OPTTYPE === 2) {
                row[i].BSS_OPTTYPE = "修改";
              } else if (row[i].BSS_OPTTYPE === 3) {
                row[i].BSS_OPTTYPE = "删除";
              }
            }
            that.$refs.multipleTable5.list = row;
          } else {
            this.$message({
              message: that.errorHint[response.msg],
              type: "success"
            });
          }
          that.$refs.multipleTable5.listLoading = false;
        });
    },
    //菜单访问日志
    queryTable6() {
      let that = this;
      that.$refs.multipleTable6.listLoading = true;
      let queryObj = {
        // api配置
        type: "query",
        apiConfig: that.apiConfig6,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: [
              "logId",
              "logType",
              "userId",
              "loginName",
              "menuId",
              "menuName",
              "menuUrl",
              "lastUpdatedTime"
            ]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: this.dynamicPageSize,
          pageIndex: 1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.formField6
        }
      };
      //转换了中台请求格式数据
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        if (response.result == "1") {
          let tmpLst = response.rows;
          that.$refs.multipleTable6.pageTotal =
            response.records;
          that.$refs.multipleTable6.list = tmpLst;
        }
        that.$refs.multipleTable6.listLoading = false;
      });
    },
    // tab切换网格自适应高度
    handleClick(even) {
      this.oneTableKey = this.oneTableKey + "1";
      this.pages2=0
      this.pages4=0
      this.pages5=0
    },
    // 获取当前时间
    resetTime() {
      var now = new Date();
      let endDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      // now.setMonth(now.getMonth() - 1);
      // endDate += " 00:00:00";
      now.setDate(now.getDate() - 1);
      let beginDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      // beginDate += " 00:00:00";
      this.timer = [beginDate, endDate];
      this.scheduleStart = this.timer[0];
      this.scheduleEnd = this.timer[0];
      // this.formField.startTime = this.timer[0];
      // this.formField.endTime = this.timer[1];
      this.formField2.runTimeStart = this.timer[0] += " 00:00:00";
      this.formField2.runTimeEnd = this.timer[1] += " 00:00:00";
      // this.formField3.starttime = this.timer[0];
      // this.formField3.endtime = this.timer[1];
      // this.formField4.starttime = this.timer[0];
      // this.formField4.endtime = this.timer[1];
      this.formField5.starttime = this.timer[0];
      this.formField5.endtime = this.timer[1];
    },
    // 一个月时间
    resetTime4() {
      var now = new Date();
      let endDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      now.setMonth(now.getMonth() - 1);
      now.setDate(now.getDate() + 2);
      let beginDate = this.$utils.parseTime(now, "{y}-{m}-{d}");
      this.timer = [beginDate, endDate];
      this.scheduleyearStart = this.timer[0];
      this.scheduleyearEnd = this.timer[1];
      this.formField4.starttime = this.timer[0];
      this.formField4.endtime = this.timer[1];
      this.formField6.startTime = this.timer[0];
      this.formField6.endTime = this.timer[1];
    },
    // 重置
    reset2() {
      this.formField2 = {
        realFuncname: "",
        runServiceurl: "",
        runTimeStart: "",
        runTimeEnd: "",
        runIp: "",
        runPlattype: "",
        runType: "",
        runBrowser: "",
        runUserid: "",
        runUsername: ""
      };
      this.pageSize2 = this.dynamicPageSize;
      this.pageIndex2 = 1;
      this.pages2 = 0;
      this.handleClick();
      this.resetTime();
      this.queryTable2();
    },
    reset4() {
      this.formField4 = {
        pagesize: this.dynamicPageSize,
        pageindex: "1",
        username: "",
        starttime: this.scheduleyearStart,
        endtime: this.scheduleyearEnd,
        optiontype: "-1"
      };
      this.handleClick();
      this.queryTable4();
    },
    reset5() {
      this.formField5 = {
        pagesize: this.dynamicPageSize,
        pageindex: "1",
        tabname: "",
        username: "",
        starttime: this.scheduleyearStart,
        endtime: this.scheduleyearEnd,
        optiontype: "-1"
      };
      this.handleClick();
      this.queryTable5();
    },
    reset6() {
      this.formField6 = {
        empName: "", // 用户名
        startTime: "", //开始时间
        endTime: "", // 截止时间
        menuName: "", // 菜单名称
        menuUrl: "" // 菜单路径
      };
      this.handleClick();
      this.queryTable6();
    },
    // 选择分页事件
    handleSizeChange2(val) {
      this.pageSize2 = val;
      this.pageIndex2 = 1;
      this.queryTable2();
    },
    handleCurrentChange2(val) {
      this.pageIndex2 = val;
      this.queryTable2();
    },
    handleSizeChange4(val) {
      this.formField4.pagesize = val;
      this.formField4.pageindex = 1;
      this.queryTable4();
    },
    handleCurrentChange4(val) {
      this.formField4.pageindex = val;
      this.queryTable4();
    },
    handleSizeChange5(val) {
      this.formField5.pagesize = val;
      this.formField5.pageindex = 1;
      this.queryTable5();
    },
    handleCurrentChange5(val) {
      this.formField5.pageindex = val;
      this.queryTable5();
    },
    // 操作弹窗
    look4(val) {
      this.lookType = "1";
      this.bssId = this.$refs.multipleTable4.list[val].BSS_ID;
      this.lookUserVisible = true;
      this.lookUserKey = this.lookUserKey + "1";
    },
    // 数据操作弹窗
    look5(val) {
      this.lookType = "2";
      this.bssId = this.$refs.multipleTable5.list[val].BSS_ID;
      this.lookUserVisible = true;
      this.lookUserKey = this.lookUserKey + "1";
    },
    // 返回事件
    lookuserClose() {
      this.lookUserVisible = false;
      this.lookUserKey = this.lookUserKey + "1";
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
/deep/.app-container {
  padding: 0 5px 0 5px;
}
/deep/ .el-transfer-panel {
  width: 37%;
  /* height: 500px; */
}
/deep/ .cardUl {
  width: 100%;
  float: left;
}
/deep/ .cardUl li {
  width: 35%;
  float: left;
  list-style-type: none;
}
/deep/ .el-tabs__content {
  background: #fff;
}
/deep/ .el-tabs__header {
  margin: 0 !important;
}
/deep/.text {
  font-size: 14px;
}

/deep/.item {
  padding: 18px 0;
}

/deep/.box-card {
  width: 100%;
}
/deep/.clearfix:before,
/deep/.clearfix:after {
  display: table;
  content: "";
}
/deep/.clearfix:after {
  clear: both;
}
/deep/.el-tree-node:focus > .el-tree-node__content {
  background-color: #ddd !important;
}
/deep/.cardName {
  margin-left: 25px;
  font-size: 14px;
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
/deep/div#fuzzyquery {
  line-height: 32px;
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
