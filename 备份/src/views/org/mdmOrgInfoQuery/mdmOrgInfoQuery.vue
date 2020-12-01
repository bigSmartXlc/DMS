<!--
* description: 集团信息管理
* xulfan
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
      :dynamicIsShowMoreBtn="false"
      :dynamicIsInitTable="true"
    />

    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :userNameShow='userNameShow'
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      :isShowChooes="isShowChooes"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins';
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";
export default {
  name: "mdmOrgInfoQuery",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path,'groupMessage-Edit'], function() {
      next();
    });
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      userNameShow:false,
      // 网格查询API配置对象
      apiConfig: orgApis.mdmOrgInfoQueryGroupByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(1),
          text: this.$t("sys.button.query"),
          name:'search',
          position:'right'
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
          text: this.$t("sys.button.add"),
          name:'add',
          position:'left',
        },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset"),
          name:'reset',
          position:'right'
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.orgCode"),
                codeField: "orgCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              } /*集团编码*/,
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.orgName1"),
                codeField: "orgName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              }, /*集团名称*/
              {compKey: 'compKey4', labelName: this.$t('org.label.isEnable'), codeField: 'isEnable',component: () => import('@/components/org/isEnable/isEnable'), type: 'dropdownList', isMust: true},//是否启用
            ],
      // 动态生成网格列
      tableCols: this.getCols(),

      //表单查询数据
      formField:this.$utils.getFormField(this, {
        orgCode: "",
        orgName: "",
        isEnable:'',
      },this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),
      isShowChooes:false,
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: true
    };
  },
  methods: {
    add() {
      this.editRowData = {}
      this.isShowChooes = true
      this.userNameShow = false
      this.showEdit('add')
    },
    edit(index) {
      var curIndex = index
      const that = this.$refs.multipleTable
      if (curIndex === undefined || curIndex === null) {
        var currentRow
        if (that.isMul === true) {
          // 多选
          var selectData = that.selection
          if (selectData.length > 0) {
            currentRow = selectData[0]
          }
        } else {
          // 单选
          currentRow = that.currentRow
        }
        if (currentRow) {
          curIndex = currentRow.index
        }
      }

      if (curIndex === undefined || curIndex === null) {
        this.$alert('请选择需要修改的数据', '提示')
        return
      }
      this.editRowData = that.list[curIndex]
      if(this.editRowData.isEnable === '0') {

        this.isShowChooes = true
      }else if(this.editRowData.isEnable === '1'){

        this.isShowChooes = false
      }
      if(this.editRowData.userName !=null||this.editRowData.userName !=""){
        this.userNameShow = true
      }else{
        this.userNameShow = false
      }
      this.showEdit('edit')
    },
    getCols() {
      var cols = [
      ];
      if (
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols.length > 0
      ) {
        cols = cols.concat(this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols);
      } else {
        cols = cols.concat([
          
        {
          prop: "controlBtn",
          label: this.$t("sys.content.operate") /*操作*/,
          codeField: "controlBtn",
          width: 60,
          align: "center",
          isComponent: true,
          comps: [
            {
              compKey: "propKey1",
              labelName: this.$t("sys.button.edit"),
              codeField: "editControlBtn",
              clickEvent: this.edit,
              component: () => import("@/components/org/linkButton")
            }
          ]
        },
          {
            prop: "orgCode",
            label: this.$t("org.label.orgCode"),
            width: null,
            align: "center"
          },
          {
            prop: "orgName",
            label: this.$t("org.label.orgName1"),
            width: null,
            align: "center"
          },
          {
            prop: "isEnable",
            label: this.$t("org.label.isEnable"),
            width: null,
            align: "center"
          },
          // {
          //   prop: "roleName",
          //   label: "管理员角色",
          //   width: null,
          //   align: "center",
          //   hidden: true
          // },
          // { prop: 'roleCode', label: '管理员角色', width: null, align: 'center', hidden: true },
          {
            prop: "userName",
            label: this.$t("org.label.adminAccount"),
            width: null,
            align: "center",
            hidden: true
          } /*管理员账号*/,
          {
            prop: "password",
            label: this.$t("org.label.adminPassword"),
            width: null,
            align: "center",
            hidden: true
          } /*管理员密码*/,
          {
            prop: "updateControlId",
            label: "并发控制",
            width: null,
            align: "center",
            hidden: true
          },
          //主键ID
          {
            prop: "orgId",
            label: "组织Id",
            width: null,
            align: "center",
            hidden: true
          },
          //主键ID
          {
            prop: "roleId",
            label: "角色Id",
            width: null,
            align: "center",
            hidden: true
          },
          //主键ID
          {
            prop: "userId",
            label: "主键ID",
            width: null,
            align: "center",
            hidden: true
          }
        ]);
      }
      return cols;
    }
  }
};
</script>
