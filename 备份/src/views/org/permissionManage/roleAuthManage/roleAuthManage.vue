/**
  角色权限管理
 */
<template>
  <div>
    <div class="app-container app-container-table">
      <TreeTable
        ref="multipleTable"
        :tree-object="treeObject"
        :dynamic-buttons="tableButtons"
        :dynamic-components="tableComponents"
        :dynamic-form-fields="formField"
        :dynamic-table-cols="tableCols"
        :is-show-pagination="false"
        :dynamic-api-config="apiConfig"
        :dynamic-un-form-fields="dynamicUnFormFields"
        :callback-obj="callbackObj"
        :dynamic-is-show-more-btn="isMoreBtn"
        :dynamic-is-show-select="false"
        :refresh-table-key="refreshTableKey"
        :dynamic-expand-all="true"
      />
      <edit
        :key="editPopupsKey"
        :dynamic-edit-row-data="editRowData"
        :popups-visible="editPopupsVisible"
        :popups-state="editPopupsState"
        @close="close"
      />
      <userAuthorization
        :key="authKey"
        :handle-visible="showAuthorz"
        :handle-title="handleTitle"
        :edit-data="selectDate"
        @visible="closeAuthorz"
      />
      <expotAuthorization
        :key="expAuthKey"
        :handle-visible="showExpAuthorz"
        :handle-title="handleTitle"
        :edit-data="selectDate"
        @visible="closeExpAuthorz"
      />
      <addUserAuthorization
        :key="modalData.addPermissSettingKey"
        :org-id="formField.orgId"
        :handle-visible="modalData.addPermissSettingShow"
        :handle-title="modalData.addPermissSettingTitle"
        :edit-data="modalData.addPermissSettingData"
      />
      <personManageg
        :key="personManagegKey"
        :edit-datad="personManagegData"
        :member-edit-visible="personManagegShow"
      />
    </div>
  </div>
</template>
<script>
import { orgApis } from '@/api/apiList/org'
import TreeTable from '@/components/templates/treeTable'
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins'
import Vue from 'vue'
export default {
  name: 'RoleAuthManage',
  components: {
    TreeTable,
    Edit: () => import('./edit'),
    userAuthorization: () =>
      import('@/views/org/permissionManage/roleAuthManage/userAuthorization'),
    expotAuthorization: () => import('./expotAuthorization'),
    addUserAuthorization: () =>
      import(
        '@/views/org/permissionManage/roleAuthManage/addUserAuthorization'
      ),
    personManageg: () => import('./personManage')
  },
  mixins: [oneTableWithViewTemplateMixins],
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
      authKey: 'a',
      showAuthorz: false,
      callbackObj: {
        // 查询成功后回调
        onQueryReturn: response => {
          this.onQueryReturn(response)
        }
      },
      selectDate: {},
      refreshTableKey: '',
      // 导出授权
      expAuthKey: 'b',
      showExpAuthorz: false,
      // 树对象
      treeObject: {
        // 配置树网格查询API配置对象
        treeApiConfig: orgApis.mdmOrgRelationRealQueryByPage,
        // 树接口需要返回的字段
        returnTreeCol: [
          'orgName',
          'orgCode',
          'orgBelongType',
          'orgTreeId',
          'linkId',
          'parentOrgTreeId'
        ],
        // 树的查询条件
        treeQuery: {
          orgBelongType: this.$store.getters.orgInfo.ORG_TYPE === '0' ? '0,8' : '',
          isEnable: '1',
          companyid: this.$store.getters.orgInfo.COMPANY_ID

        },
        // 排序的对象 label现在是名字 , children 子节点
        defaultProps: {
          children: 'children',
          label: 'orgName'
        }
      },
      isMoreBtn: false,
      // 网格查询API配置对象
      apiConfig: orgApis.sysRoleQueryCommonByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: 'btnKey1',
          type: 'primary',
          name: 'search',
          position: 'right',
          size: 'small',
          clickEvent: () => this.queryTable(1, null, -1),
          text: this.$t('sys.button.query')
        } /* 查询*/,
        {
          compKey: 'btnKey2',
          type: '',
          name: 'add',
          position: 'left',
          size: 'small',
          clickEvent: () => this.add(),
          text: this.$t('sys.button.add')
        } /* 新增*/,
        {
          compKey: 'btnKey3',
          type: '',
          name: '',
          position: 'left',
          size: 'small',
          clickEvent: () => this.openPersonManageg(),
          text: this.$t('org.label.MemberManagement')
        } /* 成员管理*/,
        {
          compKey: 'btnKey4',
          type: '',
          name: '',
          position: 'left',
          size: 'small',
          clickEvent: () => this.checkAuthorization(),
          text: this.$t('org.label.ViewPermissions')
        } /* 查看权限*/,
        // {
        //   compKey: "btnKey5",
        //   type: "",
        //   name: "",
        //   position: "left",
        //   size: "small",
        //   clickEvent: () => this.userAuthorizationd(),
        //   text: this.$t("org.label.funPreSettings")
        // }, /*功能权限设置*/
        {
          compKey: 'btnKey6',
          type: '',
          name: '',
          position: 'left',
          size: 'small',
          clickEvent: () => this.expAuthorizationd(),
          text: this.$t('org.label.funPreSettings')
        } /* 导出权限设置*//* 功能权限设置*/
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
              compKey: 'compKey1',
              span: 8,
              labelName: this.$t('org.label.roleName'),
              /* 角色名称*/ codeField: 'roleName',
              component: () => import('@/components/org/commonInput'),
              type: 'inputText',
              isMust: true
            },
            {
              compKey: 'compKey17',
              span: 8,
              labelName: this.$t('org.label.globalRole'),
              codeField: 'isGlobalRole',
              isRequire: false,
              clearable: false,
              component: () =>
                import('@/components/org/dropdownList/dropdownList'),
              type: 'dropdownList',
              options: [
                { value: '0', label: '全部' },
                { value: '1', label: '是' },
                { value: '2', label: '否' }
              ],
              isMust: true
            },
            // {
            //   compKey: 'compKey2',
            //   codeField: 'roleType',
            //   isRequire: false,
            //   component: () => import('@/components/org/isEnable/isEnable'),
            //   type: 'dropdownList',
            //   isMust: true
            // }, // 是否显示全局
            {
              compKey: 'compKey7',
              labelName: '是否启用',
              codeField: 'isEnable',
              span: 8,
              component: () => import('@/components/org/isEnable/isEnable'),
              type: 'dropdownList',
              isMust: true
            }
          ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [
            {
              prop: 'controlBtn',
              label: this.$t('sys.content.operate'),
              /* 操作*/ codeField: 'controlBtn',
              width: 100,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey0',
                  labelName: this.$t('sys.button.edit'),
                  /* 修改*/ codeField: 'editControlBtn',
                  clickEvent: this.edit,
                  component: () => import('@/components/org/linkButton')
                },
                {
                  compKey: 'propKey1',
                  labelName: this.$t('sys.button.delete'),
                  /* 删除*/ codeField: 'delControlBtn',
                  clickEvent: this.del,
                  component: () => import('@/components/org/linkButton')
                }
              ]
            },
            {
              prop: 'roleId',
              label: this.$t('org.label.roleName'),
              /* 角色ID*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'roleCode',
              label: this.$t('org.label.roleCode'),
              /* 角色编码*/ width: 150,
              align: 'center'
            },
            {
              prop: 'roleName',
              label: this.$t('org.label.roleName'),
              /* 角色名称*/ width: null,
              align: 'center'
            },

            {
              prop: 'roleDesc',
              label: this.$t('org.label.roleDesc'),
              /* 角色描述*/ width: 150,
              align: 'center'
            },
            {
              prop: 'orgName',
              label: this.$t('org.label.orgName'),
              /* 所属部门*/ width: null,
              align: 'center'
            },
            {
              prop: 'orgRealationType',
              label: this.$t('org.label.roleType') /* 是否全局*/,
              width: null,
              align: 'center',
              isComponent: true,
              comps: [
                {
                  compKey: 'propKey1',
                  isMul: false,
                  isShowLabel: false,
                  codeField: 'orgRealationType',
                  clickEvent: () => null,
                  component: () => import('@/components/org/isGlobalShow')
                }
              ]
            },
            // { prop: 'roleOrgType', width: null, align: 'center',isDefalus:true},

            {
              prop: 'orgId',
              label: this.$t('org.label.orgName'),
              /* 所属部门ID*/ hidden: true,
              align: 'center'
            },
            {
              prop: 'enableStatus',
              label: this.$t('org.label.isAble'),
              /* 是否启用*/ width: null,
              align: 'center'
            },
            {
              prop: 'enabled',
              label: this.$t('org.label.isEnable') /* 是否启用*/,
              width: null,
              align: 'center',
              isComponent: true,
              hidden: true,
              comps: [
                {
                  compKey: 'propKey2',
                  isMul: false,
                  isShowLabel: false,
                  codeField: 'enabled',
                  clickEvent: () => null,
                  component: () => import('@/components/org/isGlobalShow')
                }
              ]
            }
            // { prop: 'updateControlId', label: '并发控制', width: null, align: 'center', hidden: true}
          ],
      selectRowsDatas: {},
      clickRowsData: {},
      personManagegKey: 'personManagegKey',
      personManagegData: {},
      personManagegShow: false,
      dynamicUnFormFields: {
        isEnable: '',
        isGlobalRole: ''
      },
      // 查询条件
      formField: this.$utils.getFormField(
        this,
        {
          roleName: '',
          roleType: '1',
          isGlobalRole: '2',
          isEnable: '',
          orgId: this.$store.getters.orgInfo.ORG_ID
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      refreshTableKey: 'refreshTableKey',
      handleTitle: 0,
      orgClickData: {},

      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false
    }
  },
  watch: {
    'formField.roleType'(val) {
      if (val == '1') {
        this.formField.roleOrgType = this.orgClickData.orgBelongType || ''
        this.formField.enabled = 1
        this.refreshTableKey = this.refreshTableKey + '1'
      } else {
        delete this.formField.roleOrgType
        delete this.formField.enabled
        this.refreshTableKey = this.refreshTableKey + '1'
      }
    }
  },
  mounted() {
    // 调用加载树的方法 params1 父节点ID, params2当前节点id
    this.$refs.multipleTable.queryOrganization('parentOrgTreeId', 'orgTreeId')
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(
      // 同时加载当前页面和编辑框页面的配置
      [to.path, 'roleAuthority-Edit'],
      function() {
        next()
      }
    )
  },
  methods: {
    onQueryReturn(response) {
      if (response) {
        response.rows =
        this.getList(this.formField.isGlobalRole, response.rows)
      }
    },
    getList(type, data) {
      let list = []
      if (type === '0') {
        return data
      }
      list = data.filter(o => o.orgRealationType === type)
      // if (type === '1') {
      //   for (const i of data) {
      //     if (i.orgRealationType === '1') {
      //       list.push[i]
      //     }
      //   }
      // } else if (type === '2') {
      //   for (const i of data) {
      //     if (i.orgRealationType === '2') {
      //       list.push[i]
      //     }
      //   }
      // }
      return list
    },
    queryTable(page, dataType, size, filterObj, cb, dto) {
      // validpopups 组件弹窗  validpage 表单查询
      if (this.formField.isEnable != '') {
        const enabled = Number(this.formField.isEnable)
        this.formField.enabled = enabled
      } else {
        delete this.formField.enabled
      }
      this.$utils.validataMoth(this, 'validpage')
      if (this.valid) {
        this.resetKey()
        this.$refs.multipleTable.queryTable(
          page,
          dataType,
          size,
          filterObj,
          cb,
          dto
        )
      }
    },
    openPersonManageg() {
      const obj = this.clickRowsData
      if (JSON.stringify(obj) == '{}' || obj === null) {
        this.$message({
          message: this.$t('org.message.selOneData'),
          /* 请选择一条数据*/ type: 'warning'
        })
        return false
      }
      if (JSON.stringify(obj.enabled) === '0') {
        this.$message({ message: '该组织是禁用状态，不能添加成员！', type: 'warning' })
        return false
      }
      if (obj.orgRealationType === '1') {
        this.$message({ message: '不可设置全局角色成员！', type: 'warning' })
        return false
      }

      this.personManagegData = obj
      this.personManagegShow = true
      this.personManagegKey += 1
    },
    // 增加
    add() {
      if (JSON.stringify(this.orgClickData) == '{}') {
        this.$message({
          message: this.$t('org.message.chooseOrgName') /* 请选择组织*/,
          type: 'warning',
          duration: 2000
        })
        return false
      }
      this.editRowData = {}
      this.editRowData.orgName = this.orgClickData.orgName
      this.editRowData.orgId = this.orgClickData.orgTreeId
      this.showEdit('add')
    },
    // 绑定单击树的事件
    handleNodeClick(data) {
      this.orgClickData = data
      this.formField.orgId = data.orgTreeId
      if (this.formField.roleType === '1') {
        this.formField.roleOrgType = this.orgClickData.orgBelongType
      } else {
        delete this.formField.roleOrgType
      }
      this.$refs.multipleTable.queryTable(1, null, -1)
    },
    // 编辑按钮事件
    edit(index) {
      var curIndex = index
      const that = this.$refs.multipleTable
      if (that.list[index].orgRealationType === '1') {
        this.$message({ message: '不可编辑全局角色！', type: 'warning' })
        return false
      }
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
      this.editRowData.enabled = this.editRowData.enabled.toString()
      this.showEdit('edit')
    },
    queary(roleId, cd) {
      const queryObj = {
        // api配置
        apiConfig: orgApis.sysRoleUserQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: ['userId', 'userName', 'empName', 'orgName']
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: -1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            roleId: roleId || ''
          }
        }
      }
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj)
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (
          response.result === '1'
        ) {
          const roleName =
            response.rows

          if (typeof cd === 'function') {
            cd.call(roleName)
          }
        }
      })
    },
    // 删除
    del(index) {
      const taht_ = this
      const that = this.$refs.multipleTable
      const roleId = that.list[index].roleId
      this.queary(roleId, function() {
        if (this.length <= 0) {
          if (that.list[index].orgRealationType === '1') {
            that.$message({ message: '不可删除全局角色！', type: 'warning' })
            return false
          }
          that.$confirm(
            that.$t('org.message.confirmDeletion'),
            that.$t('org.label.warnning'),
            {
              confirmButtonText: that.$t('sys.button.confirm'),
              cancelButtonText: that.$t('sys.button.cancel'),
              type: 'warning'
            }
          )
            .then(() => {
              taht_.delData(index)
            })
            .catch(() => {})
        } else {
          that.$message({ message: '该角色有成员，不能删除！', type: 'warning' })
          return false
        }
      })
      // let queryObj = {
      //   // api配置
      //   apiConfig: orgApis.sysRoleUserQueryByPage,
      //   // 需要调用的API服务配置
      //   apiServices: [
      //     {
      //       //表格中台返回网格的字段
      //       apiQueryRow: ["userId", "userName", "empName", "orgName"]
      //     }
      //   ],
      //   //条件/实体参数（变量），根据typeParam中的定义配置
      //   variables: {
      //     pageSize: -1,
      //     pageIndex: -1,
      //     //当前中台使用的名称有dataInfo、info，具体查看API文档
      //     dataInfo: {
      //       roleId: roleId || ""
      //     }
      //   }
      // };
      // //转换了中台请求格式数据
      // var paramD = this.$getParams(queryObj);
      // // 调用中台API方法（可复用）
      // this.$requestAPI(paramD).then(response => {
      //   if (
      //     response.result ==="1"
      //   ) {
      //     let roleName =
      //       response.rows;
      //     if (roleName.length <= 0) {
      // if (that.list[index].orgRealationType === "1") {
      //  that.$message({ message: "不可删除全局角色！", type: "warning" });
      //   return false;
      // }
      // that.$confirm(
      //   that.$t("org.message.confirmDeletion"),
      //   that.$t("org.label.warnning"),
      //   {
      //     confirmButtonText: this.$t("sys.button.confirm"),
      //     cancelButtonText: this.$t("sys.button.cancel"),
      //     type: "warning"
      //   }
      // )
      //   .then(() => {
      //     that.delData(index);
      //   })
      //   .catch(() => {});
      // }else{
      //   that.$message({ message: "该组织有成员，不能删除！", type: "warning" });
      //     return false;
      // }
      // }
      // });
    },
    delData(index) {
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
        this.$alert(
          this.$t('org.message.selDelData'),
          /* 请选择需要删除的数据*/ '提示'
        )
        return
      }
      var editRowData = that.list[curIndex]
      const role = editRowData.roleId
      const queryObj = {
        // 保存需要传 type="mutation"
        type: 'mutation',
        // api配置
        apiConfig: orgApis.sysRoleMutationCommonDel,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: []
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //  pageSize: 1000,
          //  pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            roleId: role
          }
        }
      }
      // 转换了中台请求格式数据
      var paramD = that.$getParams(queryObj)
      this.$requestAPI(paramD).then(response => {
        if (
          response === true
        ) {
          // 通关如果的状态确认是编辑还是添加
          this.$message({
            message: this.$t('sys.tips.esTip14'),
            /* 删除成功*/ type: 'success'
          })
          this.queryTable(1, null, -1)
        }
      })
    },
    selectRowsData(row) {
      this.selectRowsDatas = row
    },
    checkAuthorization() {
      const obj = this.clickRowsData
      const that = this.$refs.multipleTable
      const selectData = that.$refs.multipleTable.selection
      if (JSON.stringify(obj) == '{}' || obj === null) {
        this.$message({
          message: this.$t('org.message.selOneData'),
          /* 请选择一条数据*/ type: 'warning'
        })
        return false
      }
      this.handleTitle = 0
      this.showAuthorz = true
      this.authKey = this.authKey + 1
      this.selectDate = obj
    },
    closeAuthorz() {
      this.showAuthorz = false
    },
    userAuthorizationd() {
      const that = this.$refs.multipleTable
      const obj = this.clickRowsData
      const selectData = that.$refs.multipleTable.selection
      if (JSON.stringify(obj) == '{}' || obj === null) {
        this.$message({
          message: this.$t('org.message.selOneData'),
          /* 请选择一条数据*/ type: 'warning'
        })
        return false
      }
      if (obj.orgRealationType === '1') {
        this.$message({
          message: '不可设置全局角色功能权限！',
          type: 'warning'
        })
        return false
      }

      this.handleTitle = 1
      this.authKey = that.authKey + 1
      this.showAuthorz = true
      this.selectDate = obj
    },
    // 导出权限弹窗

    closeExpAuthorz() {
      this.showExpAuthorz = false
    },
    expAuthorizationd() {
      const that = this.$refs.multipleTable
      const obj = this.clickRowsData
      const selectData = that.$refs.multipleTable.selection
      if (JSON.stringify(obj) == '{}' || obj === null) {
        this.$message({
          message: this.$t('org.message.selOneData'),
          /* 请选择一条数据*/ type: 'warning'
        })
        return false
      }
      if (obj.orgRealationType === '1') {
        this.$message({
          message: '不可设置全局角色功能权限！',
          type: 'warning'
        })
        return false
      }

      this.handleTitle = 1
      this.expAuthKey = that.expAuthKey + 1
      this.showExpAuthorz = true
      this.selectDate = obj
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/aside.el-aside.el-slide {
  height: calc(90vh - 57px);
}
/deep/#TreeTable .el-slide {
  width: 20% !important;
  float: left;
  position: relative;
  top: 0;
  overflow-x: hidden;
}

</style>
