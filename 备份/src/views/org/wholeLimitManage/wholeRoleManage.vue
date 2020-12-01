<!--
* description: 全局角色管理
* author: luojx
* createdDate: 2019-07-31
* logs:
      mwhao  添加api授权/api查看功能
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
      :dynamicIsInitTable="true"
      :dynamicIsColumnDrop="true"
      :positionSpan="[18,6]"
      :showbtnLength="7"
    />

    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      @close="close"
    ></edit>

    <userAuthorization
      :key="authKey"
      :handleVisible="showAuthorz"
      :handleTitle="handleTitle"
      :editData="selectDate"
      @visible="closeAuthorz"
    ></userAuthorization>
    <addUserAuthorization
      :orgId="formField.orgId"
      :key="modalData.addPermissSettingKey"
      :handleVisible="modalData.addPermissSettingShow"
      :handleTitle="modalData.addPermissSettingTitle"
      :editData="modalData.addPermissSettingData"
    ></addUserAuthorization>
    <!-- API授权 -->
    <apiAuthorization
      ref="apiAuthorization"
      :key="apiKey"
      :handleVisible="showApi"
      :userId="userId"
      :mpType="mpType"
    ></apiAuthorization>
    <!-- API查看弹窗 -->
    <apiPerson
      ref="apiPersontion"
      :key="apiPersonKey"
      :handleVisible="apiPersonApi"
      :userId="userId"
      :mpType="mpType"
    ></apiPerson>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";
export default {
  name: "orgWholeRoleManage",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit"),
    userAuthorization: () =>
      import("@/views/org/permissionManage/roleAuthManage/userAuthorization"),
    addUserAuthorization: () =>
      import(
        "@/views/org/permissionManage/roleAuthManage/addUserAuthorization"
      ),
    apiAuthorization: () =>
      import(
        "@/views/org/permissionManage/orguserRightsManagement/apiAuthorization"
      ),
    apiPerson: () =>
      import("@/views/org/permissionManage/orguserRightsManagement/showPurview")
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path,'globalRole-Edit'], function() {
      next();
    });
  },

  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.sysRoleQueryGloableByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          name: "search",
          position: "right",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query")
        }, //查询
        {
          compKey: "btnKey2",
          name: "add",
          position: "left",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
          text: this.$t("sys.button.add")
        }, // '新增'
        {
          compKey: "btnKey3",
          name: "details",
          position: "left",
          type: "",
          size: "small",
          clickEvent: () => this.checkAuthorization(),
          text: this.$t("org.label.ViewPermissions")
        } /*查看权限*/,
        {
          compKey: "btnKey4",
          name: "temporaryStorage",
          position: "left",
          type: "",
          size: "small",
          clickEvent: () => this.userAuthorizationd(),
          text: this.$t("org.label.funPreSettings")
        } /*功能权限设置*/,
        // {
        //   compKey: "btnKey5",
        //   name: "temporaryStorage",
        //   position: "left",
        //   type: "",
        //   size: "small",
        //   clickEvent: () => this.apiPerson(),
        //   text: "角色授权"
        // } /*角色授权*/,
        // {
        //   compKey: "btnKey6",
        //   name: "temporaryStorage",
        //   position: "left",
        //   type: "",
        //   size: "small",
        //   clickEvent: () => this.apiPerson(1),
        //   text: "权限查看"
        // } /*权限查看*/,
        // {
        //   compKey: "btnKey7",
        //   name: "temporaryStorage",
        //   position: "left",
        //   type: "",
        //   size: "small",
        //   clickEvent: () => this.checkApi(2),
        //   text: this.$t("sys.button.apiAuthorization")//API授权
        // } /*功能权限设置*/,
        // {
        //   compKey: "btnKey8",
        //   name: "temporaryStorage",
        //   position: "left",
        //   type: "",
        //   size: "small",
        //   clickEvent: () => this.apiPerson(2),
        //   text: this.$t("sys.button.apiPermissionsView")//API权限查看
        // } /*功能权限设置*/,
        {
          compKey: "btnKey9",
          name: "reset",
          position: "right",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } //重置
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
          .tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
              .tableComponents
          : [
              // {compKey: 'compKey1', labelName: this.$t('org.label.roleCode'), codeField: 'roleCode', component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: true},//角色编码
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.roleName"),
                codeField: "roleName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              }, //j角色名称
              // 组织类型（值列表）
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.orgTypeName"),
                lookuptype: "BASE0003",
                codeField: "roleOrgType",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: true
              }
            ],
      // 动态生成网格列
      tableCols: this.getCols(),

      //表单查询数据
      formField: {
        roleCode: "",
        roleName: "",
        roleOrgType: ""
      },
      //查看权限
      authKey: "a",
      apiKey: "apiKey",
      apiPersonKey: "apiPersonKey",
      showAuthorz: false,
      selectDate: {},
      showAuthorz: false,
      handleTitle: 0,
      showApi: false,
      apiPersonApi: false,
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      // 选中行id
      userId: "",
      // api权限查看/api授权  1:用户权限 api授权  2:全局角色管理 api授权
      mpType: 1
    };
  },
  methods: {
    del() {
      console.info("删除");
    },
    closeAuthorz() {
      this.showAuthorz = false;
    },
    checkAuthorization() {
      const that = this.$refs.multipleTable;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData"),
          /*请选择一条数据*/ type: "warning"
        });
        return false;
      }
      this.handleTitle = 0;
      this.showAuthorz = true;
      this.authKey = this.authKey + 1;
      this.selectDate = selectData;
    },
    userAuthorizationd() {
      const that = this.$refs.multipleTable;

      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData"),
          /*请选择一条数据*/ type: "warning"
        });
        return false;
      }
      this.handleTitle = 1;
      this.authKey = that.authKey + 1;
      this.showAuthorz = true;
      this.selectDate = selectData;
    },
    // 编辑按钮事件
    edit(index) {
      var curIndex = index;

      const that = this.$refs.multipleTable;
      if (curIndex === undefined || curIndex === null) {
        var currentRow;
        if (that.isMul === true) {
          // 多选
          var selectData = that.selection;
          if (selectData.length > 0) {
            currentRow = selectData[0];
          }
        } else {
          // 单选
          currentRow = that.currentRow;
        }
        if (currentRow) {
          curIndex = currentRow.index;
        }
      }

      if (curIndex === undefined || curIndex === null) {
        this.$alert("请选择需要修改的数据", "提示");
        return;
      }
      this.editRowData = that.list[curIndex];
      this.editRowData.enabled = String(this.editRowData.enabled);
      this.showEdit("edit");
    },
    getCols() {
      var cols = [
        
      ];
      if (
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
      ) {
        cols = cols.concat(
          this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
        );
      } else {
        cols = cols.concat([
          {
          prop: "controlBtn",
          label: this.$t("sys.content.operate"),
          codeField: "controlBtn",
          width: 60,
          align: "center",
          fixed: true,
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              align: "center",
              labelName: this.$t("sys.button.edit"),
              codeField: "editControlBtn",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton")
            }
          ]
        } ,//操作
          {
            prop: "roleCode",
            label: this.$t("org.label.roleCode"),
            width: null,
            align: "center"
          }, //角色编码
          {
            prop: "roleName",
            label: this.$t("org.label.roleName"),
            width: null,
            align: "center"
          }, //角色名称
          {
            prop: "builtInName",
            label: this.$t("org.label.builtInName"),
            width: null,
            align: "center"
          }, //是否内置
          {
            prop: "enableStatus",
            label: this.$t("org.label.isAble"),
            width: null,
            align: "center"
          }, //启用状态
          {
            prop: "orgTypeName",
            label: this.$t("org.label.orgTypeName"),
            width: null,
            align: "center"
          }, //组织类型

          {
            prop: "roleDesc",
            label: "角色描述",
            width: null,
            align: "center",
            hidden: true
          },
          {
            prop: "roleId",
            label: "角色ID",
            width: null,
            align: "center",
            hidden: true
          },

          {
            prop: "roleOrgType",
            label: "组织类型编码",
            width: null,
            align: "center",
            hidden: true
          },
          {
            prop: "enabled",
            label: "是否启用编码",
            width: null,
            align: "center",
            hidden: true
          },
          {
            prop: "builtIn",
            label: "是否内置编码",
            width: null,
            align: "center",
            hidden: true
          }
        ]);
      }
      return cols;
    },
    // API授权
    checkApi(val) {
      const that = this.$refs.multipleTable;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.mpType = val;
      this.userId = selectData.roleId;
      this.showApi = true;
      this.apiKey = this.apiKey + "1";
    },
    // API查看
    apiPerson(val) {
      const that = this.$refs.multipleTable;
      let selectData = that.currentRow;
      if (selectData == null) {
        this.$message({
          message: this.$t("org.message.selOneData") /*请选择一条数据*/,
          type: "warning"
        });
        return false;
      }
      this.mpType = val;
      this.userId = selectData.roleId;
      this.apiPersonApi = true;
      this.apiPersonKey = this.apiPersonKey + "1";
    }
  }
};
</script>
