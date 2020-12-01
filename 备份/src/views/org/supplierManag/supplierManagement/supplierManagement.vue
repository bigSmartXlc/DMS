<!--
* description: 供应商员工信息管理
* author: wangcx
* createdDate: 2019-10-30
-->
<template>
  <div>
    <div class="app-container app-container-table">
      <TreeTable
        ref="multipleTable"
        :treeObject="treeObject"
        :dynamicButtons="tableButtons"
        :dynamicComponents="tableComponents"
        :dynamicFormFields="formField"
        :dynamicTableCols="tableCols"
        :dynamicApiConfig="apiConfig"
        :dynamicIsShowMoreBtn="isMoreBtn"
        :dynamicIsShowSelect="false"
        :dynamicExpandAll="true"
      />
      <edit
        :editData="gridData"
        :dlrId="dlrId"
        :dlrCode="dlrCode"
        :showOrgName="showOrgName"
        :showOrgRealId="showOrgRealId"
        :dynamicEditRowData="editRowData"
        :popupsVisible="editPopupsVisible"
        :key="editPopupsKey"
        :popupsState="editPopupsState"
        :parentFileds="parentFileds"
        @close="close"
      ></edit>
      <toView
        :key="showToView"
        :managementRowData="managementRowData"
        :handleVisible="toViewd"
        :roleName="seleUserName"
        :roleOrgType="roleOrgType"
        :roleId="showroleId"
        :toviewroleId="toviewroleId"
      ></toView>
    </div>
  </div>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import TreeTable from "@/components/templates/treeTable";
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import Vue from 'vue'
export default {
  mixins: [oneTableWithViewTemplateMixins],
  name: "roleAuthManage",
  components: {
    TreeTable,
    Edit: () => import("./oprtion"),
    toView: () => import("./toView")
  },
  mounted() {
    //调用加载树的方法 params1 父节点ID, params2当前节点id
    this.$refs.multipleTable.queryOrganization("parentOrgTreeId", "orgTreeId");
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path,'supplierEmployee-Edit','supplierEmployee-toView'],
      function(){
        next()
      })
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      // 用户id
      showroleId: "",
      toviewroleId: "",
      gridData: {},
      roleOrgType: "",
      showOrgName: "",
      showOrgRealId: "",
      dlrId: "",
      dlrCode: "",
      roleId: "",
      managementRowData: "",
      //隐藏弹出框
      toViewd: false,
      showToView: "b",
      //选中的角色名称
      seleUserName: "",
      // tableKeyChange:"c",
      authKey: "a",
      showAuthorz: false,
      selectDate: {},
      //树对象
      treeObject: {
        // 配置树网格查询API配置对象
        treeApiConfig: orgApis.mdmOrgRelationRealQueryByPage,
        // treeApiConfig: orgApis.mdmOrgEmployeeQueryFindAll,
        // 树接口需要返回的字段
        returnTreeCol: [
          "orgName",
          "orgCode",
          "orgBelongType",
          "orgRealId",
          "groupCode",
          "groupId",
          "orgTreeId",
          "linkId",
          "parentOrgTreeId"
        ],
        // 树的查询条件
        treeQuery: {
          //  orgTreeId:'-1'
          isEnable: "1",
          orgBelongType: "3,4,5,6,7,8",
          companyid: this.$store.getters.orgInfo.COMPANY_ID
        },
        //排序的对象 label现在是名字 , children 子节点
        defaultProps: {
          children: "children",
          label: "orgName"
        }
      },
      isMoreBtn: true,
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgEmployeeQueryFindAll,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          name: "search", //按钮图标样式
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query"),
          position: "right"
        } /*查询*/,
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
          name: "add", //按钮图标样式
          text: this.$t("sys.button.add"),
          position: "left"
        } /*新增*/,
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          name: "reset", //按钮图标样式
          clickEvent: () => this.localReset(),
          text: this.$t("sys.button.reset"),
          position: "right"
        } /*重置*/
      ],

      // 动态组件-查询条件
      tableComponents: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] && this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents : [
        {
          compKey: "compKey2",
          span: 8,
          labelName: this.$t("org.label.userName"),
          /*创建登录名*/ codeField: "userName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey1",
          span: 8,
          labelName: this.$t("org.label.empName"),
          /*员工姓名*/ codeField: "empName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          span: 8,
          labelName: this.$t("org.label.orgName"),
          /*所属组织*/ codeField: "orgName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey4",
          span: 8,
          labelName: this.$t("org.label.situation"), // 在职状态
          codeField: "isEnable",
          component: () => import("@/components/org/LookupValue"),
          lookuptype: "DB0081",
          type: "dropdownList",
          isMust: false
        }
      ],
      // 动态生成网格列
      tableCols: this.$ConfigCache.CacheConfig.cacheData[viewPageCode]&& this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols: [
        {
          prop: "controlBtn",
          label: this.$t("sys.content.operate"),
          /*操作*/ codeField: "controlBtn",
          width: 125,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey0",
              labelName: this.$t("sys.button.edit"),
              /*修改*/ codeField: "controlBtn",
              clickEvent: this.handleClick,
              component: () => import("@/components/org/linkButton")
            },
            {
              compKey: "propKey1",
              //明细
              labelName: this.$t("sys.button.getDetail"),
              codeField: "controlBtn",
              clickEvent: this.showView,
              component: () => import("@/components/org/linkButton")
            }
          ]
        },
        {
          //员工编码
          prop: "empCode",
          /*empCode*/ width: null,
          align: "center",
          label:"员工编码",
          hidden: true
        },
        {
          prop: "stationId",
          label: '岗位ID',
          /*岗位ID*/ width: 150,
          align: "center",
          hidden: true
        },
          {
          prop: "stationName",
          label: this.$t("org.label.stationName"),
          /*岗位名称*/ width: 150,
          align: "center",
          hidden: true
        },
        {
          prop: "userName",
          label: this.$t("org.label.userName"),
          /*登录账号名*/ width: 150,
          align: "center"
        },
        {
          //手机号码
          prop: "mobile",
          label: '手机号码',
          /*empCode*/ width: null,
          align: "center",
          hidden: true
        },
        {
          //工作电话
          prop: "workTel",
          label: '工作电话',
          /*empCode*/ width: null,
          align: "center",
          hidden: true
        },
        {
          //公历日期
          prop: "birthDate",
          label: '公历日期',
          /*empCode*/ width: null,
          align: "center",
          hidden: true
        },
        {
          //国籍
          prop: "nationalityCode",
          /*empCode*/ width: null,
          label: '国籍',
          align: "center",
          hidden: true
        },
        {
          //政治面貌
          prop: "politicsCode",
          /*empCode*/ width: null,
          label: '政治面貌',
          align: "center",
          hidden: true
        },
        {
          //毕业学校
          prop: "school",
          /*empCode*/ width: null,
          label: '毕业学校',
          align: "center",
          hidden: true
        },
        {
          //联系人电话
          prop: "workTel",
          /*empCode*/ width: null,
          label: '联系人电话',
          align: "center",
          hidden: true
        },
        {
          //领驾照时间
          prop: "driverDate",
          /*empCode*/ width: null,
          label: '领驾照时间',
          align: "center",
          hidden: true
        },
        {
          //状态
          prop: "isFrozen",
          /*empCode*/ width: null,
          label: '状态',
          align: "center",
          hidden: true
        },
        {
          //员工性别
          prop: "genderCode",
          /*empCode*/ width: null,
          label: '员工性别',
          align: "center",
          hidden: true
        },
        {
          //证件类型
          prop: "credTypeCode",
          label: '证件类型',
          /*empCode*/ width: null,
          align: "center",
          hidden: true
        },
        {
          //招聘方式
          prop: "employType",
          /*empCode*/ width: null,
          label: '招聘方式',
          align: "center",
          hidden: true
        },
        {
          //Email
          prop: "email",
          /*empCode*/ width: null,
          label: '状态',
          align: "center",
          hidden: true
        },
        {
          //籍贯
          prop: "nativePlace",
          /*empCode*/ width: null,
          align: "center",
          label: '籍贯',
          hidden: true
        },
        {
          //专业
          prop: "degreepro",
          /*empCode*/ width: null,
          label: '专业',
          align: "center",
          hidden: true
        },
        {
          //家庭电话
          prop: "familyPhone",
          /*empCode*/ width: null,
          label: '家庭电话',
          align: "center",
          hidden: true
        },
        {
          //从事汽车行业时间
          prop: "businessDate",
          label: '从事汽车行业时间',
          /*empCode*/ width: null,
          align: "center",
          hidden: true
        },
        {
          //离职日期
          prop: "leaveDate",
          /*empCode*/ width: null,
          label: '离职日期',
          align: "center",
          hidden: true
        },
        {
          //冻结状态
          prop: "isFrozen",
          /*empCode*/ width: null,
          align: "center",
          label: '冻结状态',
          hidden: true
        },
        {
          //证件号码
          prop: "credNo",
          /*empCode*/ width: null,
          align: "center",
          label: '证件号码',
          hidden: true
        },
        {
          //入职日期
          prop: "employDate",
          /*empCode*/ width: null,
          align: "center",
          label: '入职日期',
          hidden: true
        },
        {
          //紧急联系人
          prop: "secondMan",
          /*empCode*/ width: null,
          align: "center",
          label: '紧急联系人',
          hidden: true
        },
        {
          //民族
          prop: "nationCode",
          /*empCode*/ width: null,
          align: "center",
          label: '民族',
          hidden: true
        },
        {
          //学历
          prop: "degreeCode",
          /*empCode*/ width: null,
          align: "center",
          label: '学历',
          hidden: true
        },
        {
          //传真
          prop: "fax",
          /*empCode*/ width: null,
          align: "center",
          label: '传真',
          hidden: true
        },
        {
          //个人通信地址
          prop: "personAddr",
          /*empCode*/ width: null,
          align: "center",
          label: '个人通信地址',
          hidden: true
        },
        {
          //邮编
          prop: "zip",
          /*empCode*/ width: null,
          align: "center",
          label: '邮编',
          hidden: true
        },
        //专营店编码
        {
          prop: "dlrCode",
          /*empCode*/ width: null,
          label: '专营店编码',
          align: "center",
          hidden: true
        },
        {
          //专营店ID
          prop: "dlrId",
          /*empCode*/ width: null,
          align: "center",
          label: '专营店ID',
          hidden: true
        },
        {
          prop: "userId",
          /*empCode*/ width: null,
          align: "center",
          label: '用户ID',
          hidden: true
        },
        {
          prop: "deptId",
          /*deptId*/ width: null,
          label: '部门id',
          align: "center",
          hidden: true
        },
        {
          prop: "empName",
          label: this.$t("org.label.empName"),
          /*员工姓名*/ width: null,
          align: "center"
        },
        {
          prop: "genderName",
          label: this.$t("org.label.genderName"),
          /*性别*/ width: 130,
          align: "center"
        },
        {
          prop: "orgName",
          label: this.$t("org.label.orgName"),
          /*所属组织*/ width: null,
          align: "center"
          // isDefalus: true
        },
        {
          prop: "userName",
          label: this.$t("org.label.userName1"),
          /*登录帐号名*/ width: 130,
          align: "center",
          hidden: true
        },
        {
          prop: "isFrozen",
          label: this.$t("org.label.isFrozen"),
          /*状态*/ width: null,
          align: "center",
          isDefalus: true,
          hidden: true
        },
        {
          prop: "marriagedCode",
          label: this.$t("org.label.marriagedCode"),
          /*marriagedCode*/ width: null,
          align: "center",
          hidden: true
        },
        //紧急联络人联系方式
        {
          prop: "secondManTel",
          label: this.$t("org.label.secondManTel"),
          /*secondManTel*/ width: null,
          align: "center",
          hidden: true
        },
        {
          prop: "empId",
          label: this.$t("org.label.empId"),
          /*角色ID*/ width: null,
          align: "center",
          hidden: true
        },
        {
          prop: "isEnable",
          label: this.$t("org.label.isFrozen"),
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey1",
              isMul: false,
              isShowLabel: false,
              codeField: "isEnable",
              clickEvent: () => null,
              component: () => import("@/components/org/isWork")
            }
          ]
        },
        {
          prop: "updateControlId",
          label: "并发控制",
          width: null,
          align: "center",
          hidden: true
        }
      ],
      //查询条件
      formField: this.$utils.getFormField(this, {
        empName: "",
        userName: "",
        deptId: "",
        isEnable: "",
        orgName: ""
        // orgId: ""
      },this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false,
      handleTitle: 0,
      orgClickData: {}
    };
  },
  methods: {
    //增加
    add() {
      if (JSON.stringify(this.orgClickData) == "{}") {
        this.$message({
          message: this.$t("org.message.chooseOrgName") /*请选择组织*/,
          type: "warning",
          duration: 2000
        });
        return;
      }
      this.editRowData = {};
      this.editRowData.orgName = this.orgClickData.orgName;
      this.editRowData.orgId = this.orgClickData.orgTreeId;
      this.showEdit("add");
    },
    // 绑定单击树的事件
    handleNodeClick(data) {
      //赋值给所属组织
      this.formField.orgName = data.orgName;
      this.formField.deptId = data.orgTreeId;
      // this.tableKeyChange=this.tableKeyChange+"1"
      this.orgClickData = data;
      // this.formField.orgId = data.orgTreeId;

      // this.$refs.multipleTable.queryTable(1);
      // 组织类型
      this.roleOrgType = data.orgBelongType;
      // 新增/修改需要的值
      this.dlrId = data.groupId;
      this.dlrCode = data.groupCode;
      this.showOrgName = data.orgName;
      this.showOrgRealId = data.orgTreeId;
      this.queryTable(1);
    },

    //编辑
    handleClick(row) {
      const thats = this.$refs.multipleTable;
      this.roleOrgType = thats.list[row].orgName;
      // 报错修改 经销商编码-经销商ID 为空问题
      this.dlrCode = thats.list[row].dlrCode;
      this.dlrId = thats.list[row].dlrId;
      this.showroleId = thats.list[row].userId;
      this.edit(row);
      
    },

    localReset() {
      this.reset();
      this.orgClickData = {};
      this.$refs.multipleTable.$refs.tree.setCurrentKey(null);
      this.formField.userName = "";
      this.formField.empName = "";
      this.formField.isEnable = "";
      this.formField.orgName = "";
      this.formField.deptId = "";
    },

    closeAuthorz() {
      this.showAuthorz = false;
    },

    // 查看
    showView(row) {
      const that = this.$refs.multipleTable;
      this.toViewd = true;
      this.showToView = this.showToView + "1";
      this.toviewroleId = that.list[row].userId;
      // console.log(that.list[row]);
      // console.log(that);
    }
  }
};
</script>
<style scoped>
/* /deep/aside.el-aside.el-slide {
  height: calc(90vh - 57px);
} */
</style>
