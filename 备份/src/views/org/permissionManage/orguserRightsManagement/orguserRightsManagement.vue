<!--
* description: 用户权限管理
* logs:
    2019-12-5  mwhao 添加用户授权分析/API授权/API权限管理
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
      :positionSpan="[18,6]"
      :showbtnLength="8"
    />
    <!-- 导出授权 -->
     <exporAuthorization
      :key="expAuthKey"
      :handleVisible="showExpAuthorz"
      @visible="closeExpAuthorz"
      :editData="selectDate"
    ></exporAuthorization>
    <userAuthorization
      :key="authKey"
      :handleVisible="showAuthorz"
      :handleTitle="handleTitle"
      :editData="selectDate"
      @visible="closeAuthorz"
      @changeCode="getUserAuthorization"
    ></userAuthorization>
    <toView
      ref="toView"
      :key="showToView"
      :handleVisible="toViewd"
      :roleOrgType="roleOrgType"
      :roleName="seleUserName"
      :userId="userId"
    ></toView>
    <!-- 用户权限分析 -->
    <userAuthorizeAnalyze
      ref="userAuthorizeAnalyze"
      :key="analyze"
      :handleVisible="showanalyze"
    ></userAuthorizeAnalyze>
    <!-- API授权 -->
    <apiAuthorization
    ref="apiAuthorization"
    :key="apiKey"
    :handleVisible="showApi"
    :userId="userId"
    ></apiAuthorization>
    <!-- API查看弹窗 -->
    <apiPerson
      ref="apiPersontion"
       :key="apiPersonKey"
       :handleVisible="apiPersonApi"
       :userId="userId"
    ></apiPerson>
  </div>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";
export default {
  mixins: [oneTableWithViewTemplateMixins],
  name: "orguserRightsManagement",
  components: {
    OneTableTemplate,
    exporAuthorization: () => import("./exporAuthorization"),
    userAuthorization: () => import("./userAuthorization"),
    toView: () => import("./toView"),
    userAuthorizeAnalyze:()=>import("./userAuthorizeAnalyze"),
    apiAuthorization:()=>import("./apiAuthorization"),
    apiPerson:()=>import("./showPurview")
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(to.path, function() {
      next();
    });
  },
  data() {
    return {
      apiConfig: orgApis.mdmOrgEmployeeQueryFindAll,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(1),
          name: "search",
          position: "right",
          fuzzySearch: true,
          text: this.$t("sys.button.query")
        }, //查询
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          name: "reset",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        }, //重置
        {
          compKey: "btnKey9",
          type: "",
          size: "small",
          name: "temporaryStorage",
          position: "left",
          clickEvent: () => this.exportAuthorizationd(),
          text: "用户授权" /*导出授权*/
        },
        // {
        //   compKey: "btnKey3",
        //   type: "",
        //   size: "small",
        //   name: "temporaryStorage",
        //   position: "left",
        //   clickEvent: () => this.userAuthorizationd(),
        //   text: this.$t("org.label.userAuthorization") /*用户授权*/
        //},
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          name: "search",
          position: "left",
          clickEvent: () => this.checkAuthorization(),
          text: this.$t("org.label.viewPermission") /*查看权限*/
        },
        {
          compKey: "btnKey5",
          type: "",
          size: "small",
          name: "synchronizeCustomerProfile",
          position: "left",
          clickEvent: () => this.checkPerson(),
          text: this.$t("org.label.viewingRoles") /*查看角色*/
        },
        // {
        //   compKey: "btnKey6",
        //   type: "",
        //   size: "small",
        //   name: "selectCustomers",
        //   position: "left",
        //   clickEvent: () => this.userDialong(),
        //   text: this.$t("sys.button.userAuthorizationAnalysis") /*用户授权分析*/
        // },
        // {
        //   compKey: "btnKey7",
        //   type: "",
        //   size: "small",
        //   name: "synchronization",
        //   position: "left",
        //   clickEvent: () => this.checkApi(),
        //   text: this.$t("sys.button.apiAuthorization") /*API授权*/
        // },
        // {
        //   compKey: "btnKey8",
        //   type: "",
        //   size: "small",
        //   name: "heallSynchronizationlp",
        //   position: "left",
        //   clickEvent: () => this.apiPerson(),
        //   text:this.$t("sys.button.apiPermissionsView") /*API权限查看*/
        // }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.UserName") /*用户名*/,
                codeField: "userName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.employeeNumber") /*员工编号*/,
                codeField: "empCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.employeeName") /*员工姓名*/,
                codeField: "empName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              }
            ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
              {
                prop: "userName",
                label: this.$t("org.label.UserName") /*用户名*/,
                width: 300,
                align: "center"
              },
              {
                prop: "empCode",
                label: this.$t("org.label.employeeNumber") /*员工编号*/,
                width: 300,
                align: "center"
              },
              {
                prop: "empName",
                label: this.$t("org.label.employeeName") /*员工姓名*/,
                width: 300,
                align: "center"
              },
              {
                prop: "orgName",
                label: this.$t("org.label.orgName") /*员工姓名*/,
                width: null,
                align: "center"
              },
              { prop: "userId", label: "用户Id", hidden: true, align: "center" }
            ],
      toViewd: false,
      formField: {
        userName: "",
        empCode: "",
        empName: "",
        dlrCode:this.$store.getters.orgInfo.DLR_CODE
      },
      selectRowsDatas: {},
      handleTitle: 0,
      showAuthorz: false,
      selectDate: {},
      authKey: "a",
      showToView: "b",
      analyze:"c",
       // 导出授权弹窗
      showExpAuthorz:false,
      expAuthKey: "e",
      //组织类型
      roleOrgType: "",
      //选中的角色名称
      seleUserName: "",
      //选中的用户ID
      userId: "",
      showanalyze:false,
      // 用户权限分析弹窗
      showanalyze:false,
      // API授权弹窗
      apiKey:"apiKey",
      showApi:false,
      // API查看
      apiPersonKey:"apiPersonKey",
      apiPersonApi:false
    };
  },
  methods: {
    getUserAuthorization() {},
    closeAuthorz() {
      this.showAuthorz = false;
    },
    selectRowsData(row) {
      this.selectRowsDatas = row;
    },
     //关闭导出授权
     closeExpAuthorz() {
      this.showExpAuthorz = false;
    },
     //导出授权
    exportAuthorizationd() {
      let obj = this.selectRowsDatas;
      const that = this.$refs.multipleTable;

      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      //this.handleTitle = 1;
      this.expAuthKey = that.expAuthKey + 1;
      this.showExpAuthorz = true;
      this.selectDate = obj;
    },
    //用户授权
    userAuthorizationd() {
      let obj = this.selectRowsDatas;
      const that = this.$refs.multipleTable;

      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.handleTitle = 1;
      this.authKey = that.authKey + 1;
      this.showAuthorz = true;
      this.selectDate = obj;
    },
    //查看权限
    checkAuthorization() {
      // let obj = this.selectRowsDatas
      const that = this.$refs.multipleTable;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.handleTitle = 0;
      this.showAuthorz = true;
      this.authKey = this.authKey + 1;
      this.selectDate = selectData;
    },
    //查看角色
    checkPerson() {
      const that = this.$refs.multipleTable;
      let obj = this.selectRowsDatas;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.toViewd = true;
      this.seleUserName = obj.empName;
      this.userId = obj.userId;
      // this.$refs.toView.queryData(userId)
      this.showToView = this.showToView + "1";
      this.roleOrgType = obj.orgTreeId;
    },
    // 用户授权分析
    userDialong(){
       const that = this.$refs.multipleTable;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.showanalyze=true;
      this.analyze=this.analyze+"1"
    },
    // API授权
    checkApi(){
       const that = this.$refs.multipleTable;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.userId = selectData.userId;
      this.showApi=true;
      this.apiKey=this.apiKey+"1"

    },
    // API查看
    apiPerson(){
      const that = this.$refs.multipleTable;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.userId = selectData.userId;
      this.apiPersonApi=true;
      this.apiPersonKey=this.apiPersonKey+"1"

    }

  }
};
</script>
