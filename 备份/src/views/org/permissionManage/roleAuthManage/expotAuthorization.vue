<!-- 角色权限管理--导出权限设置 -->
<template>
  <section>
    <el-dialog
      v-dialogDrag
      width="900px"
      :title="showTitle "
      :visible.sync="handleVisibled"
      center
      @close="sendCodeHandleVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :lock-scroll="true"
      v-bind:class="isValiad ? 'checkInput' :'validInput'"
    >
      <dialogHeader slot="title" :title="showTitle " :styleType="$store.state.app.dialogType"></dialogHeader>

      <one-table-template
        ref="multipleTable"
        :dynamicFormFields="formField"
        :dynamicComponents="tableComponents"
        :dynamicIsShowSelect="false"
        :isshowSearchConTile="false"
        :isshowTable="false"
        :isShowPagination="false"
        :isshowSearchTableButton="false"
        :isshowSearchResult="false"
      />
      <div style="text-align:right; padding-right: 10px;" v-if="showAuthorize">
        <!-- 授权 -->
        <el-button
          type="primary"
          @click="authorize"
          icon="iconfont  icon-shouquan"
        >{{$t('sys.button.authorization')}}</el-button>
      </div>
      <div
        class="filter-container filter-title"
        ref="resultTitleHeight"
      >{{$t('sys.content.gridTitle')}}</div>
      <el-aside class="el-slide" style="background-color: #fff" width="897px">
        <el-tree
          :render-content="renderContent"
          class="filter-tree"
          :data="orgList"
          :props="defaultProps"
          v-loading="loading"
          :default-expand-all="false"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckeDeys"
          :filter-node-method="filterNode"
          :show-checkbox="isShowCheckBox"
          height="450px"
          node-key="menuId"
          ref="tree"
          highlight-current
          @check="nodeClick"
          :render-after-expand=false
        ></el-tree>
      </el-aside>
    </el-dialog>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/popupsOneTable";
export default {
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    handleVisible: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    handleTitle: {
      type: Number,
      default: function() {
        return 1;
      }
    },
    editData: {
      type: null,
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      apiConfig: orgApis.sysRolePrivQueryByPage,
      handleVisibled: this.handleVisible,
      showTitle:
        this.handleTitle == 0
          ? this.$t("org.label.ViewPermissions") /*权限查看*/
          : this.$t("org.label.funPreSettings") /*权限变更*/,
      disbleEdit: this.handleTitle == 0 ? false : true,
      isValiad: false,
      //是否只查看有权限
      selectedOnly: this.handleTitle == 0 ? "1" : "0",
      showAuthorize: this.handleTitle == 0 ? false : true,
      isShowCheckBox: this.handleTitle == 0 ? false : true,
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t("org.label.roleName") /*授权对象*/,
          codeField: "roleName",
          disabled: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey2",
          labelName: this.$t("org.label.roleName1") /*对象名称*/,
          codeField: "roleName",
          disabled: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: this.$t("org.label.functionName") /*功能名称*/,
          codeField: "functionName",
          isInput: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }
      ],
      formField: {
        roleName: this.editData.roleName,
        roleName: this.editData.roleName,
        functionName: ""
      },
      orgList: [],
      defaultProps: {
        children: "children",
        label: "menuName"
      },
      defaultCheckeDeys: [],
      defaultExpandedKeys: []
    };
  },
  mounted() {
    if (this.handleVisible) {
      this.queryOrganization();
    }
  },
  watch: {
    // 过滤树
    "formField.functionName"(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    //设置默认选中
    getDefaultCheckeDeys(arr, deep, v) {
      if (v) {
        // this.$nextTick(()=>{
        for (let i of arr) {
          if (
            document.getElementById("a" + i.menuId) != null &&
            document.getElementById("b" + i.menuId) != null
          ) {
            document.getElementById("a" + i.menuId).checked =
              i.expFlag == "0" || i.expFlag == "null" ? false : true;
            document.getElementById("b" + i.menuId).checked =
              i.senseFlag == "0" || i.senseFlag == "null" ? false : true;
          }
        }
        // })
      } else {
        for (let i of arr) {
          if (i.children.length > 0) {
            this.getDefaultCheckeDeys(i.children, ++deep);
          } else {
            if (i.isSelected === "1") {
              this.defaultCheckeDeys.push(i.menuId);
              if (this.defaultExpandedKeys.length < 500) {
                this.defaultExpandedKeys.push(i.menuId);
              }
            }
          }
        }
      }
    },
    //查询组织
    queryOrganization() {
      const that = this;
      this.loading = true;
      let obj = {};
      if (this.handleTitle !== 1) {
        obj.roleId = this.editData.roleId;
        obj.selectedOnly = 1;
      } else {
        obj.roleId = this.editData.roleId;
      }
      let queryObj = {
        // api配置
        apiConfig: orgApis.sysRolePrivQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: ["menuName", "menuId", "isSelected", "parentMenuId"]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: obj
        }
      };
      //转换了中台请求格式数据
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result ==="1") {
          var dataList =response.rows;
          var tree = that.$utils.parseTreeFromList(
            dataList,
            "parentMenuId",
            "menuId"
          );
          that.loading = false;
          that.orgList = tree;
          obj = {};
          if (that.handleTitle === 1) {
            that.getDefaultCheckeDeys(that.orgList, 0);
          }
        } else {
          that.loading = false;
        }
        that.queryOrganization1();
      });
    },
    //查询导出
    queryOrganization1() {
      const that = this;
      this.loading = true;
      let obj = {};
      if (this.handleTitle != 1) {
        obj.roleId = this.editData.roleId;
        obj.selectedOnly = 1;
      } else {
        obj.roleId = this.editData.roleId;
      }
      let queryObj = {
        // api配置
        apiConfig: orgApis.exportAuthQuryFindAll,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: [
              "isSelected",
              "objId",
              "objType",
              "objTypeName",
              "objId",
              "objName",
              "menuId",
              "expFlag",
              "senseFlag",
              "isEnable",
              "creator",
              "createdDate",
              "modifier",
              "lastUpdatedDate"
            ]
            // apiQueryRow: ["menuName", "menuId", "isSelected", "parentMenuId"]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            objId: this.editData.roleId,
            objType: "2"
          }
        }
      };
      //转换了中台请求格式数据
      let paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          let dataList = response.rows;
          let tree = that.$utils.parseTreeFromList(
            dataList,
            "parentMenuId",
            "menuId"
          );
          that.loading = false;
          // this.orgList = tree;
          obj = {};
          if (that.handleTitle === 1) {
            that.getDefaultCheckeDeys(tree, 0, 1);
          }
        } else {
          that.loading = false;
        }
      });
    },
    sendCodeHandleVisible() {
      this.$emit("visible", false);
      this.orgList.splice(0)
      document.getElementsByName('vehicle').forEach(item => {
        item.remove()
      })
    },
    //授权
    authorize() {
      this.authorize1(), this.authorize2();
    },
    //授权保存角色
    authorize1(val) {
      var data = this.$refs.tree.getCheckedNodes(false, true);
      var menuList = [];
      if (data.length == 0) {
        // this.$message({
        //   message: this.$t('org.message.selMenuAuthor'),//请选择要授权的菜单
        //   type: 'warning',
        //   duration: 2000
        // });
        // return
        menuList = [-1];
      } else {
        for (var k in data) {
          menuList.push(data[k].menuId);
        }
      }
      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.sysRolePrivMutationSave,
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            roleId: this.editData.roleId,
            menuId: menuList.toString()
          }
        }
      };
      //转换了中台请求格式数
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          this.$message({
            message:
              this.$t("org.label.authorization") +
              " " +
              this.$t("sys.tips.esTip5"), //授权成功
            type: "success",
            duration: 2000
          });
          this.sendCodeHandleVisible();
        } else {
          msg = response.msg;
          this.$message({
            message: msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    //授权保存导出
    authorize2(val) {
      var data = this.$refs.tree.getCheckedNodes(false, true);
      var menuList = [];
      if (data.length == 0) {
        // this.$message({
        //   message: this.$t('org.message.selMenuAuthor'),//请选择要授权的菜单
        //   type: 'warning',
        //   duration: 2000
        // });
        // return
        menuList = [-1];
      } else {
        let obj = {};
        for (var k in data) {
          obj = {
            objType: "2",
            objTypeName: "角色",
            expFlag:
              document.getElementById("a" + data[k].menuId) == null ||
              document.getElementById("a" + data[k].menuId).checked == false
                ? "0"
                : "1",
            senseFlag:
              document.getElementById("b" + data[k].menuId) == null ||
              document.getElementById("b" + data[k].menuId).checked == false
                ? "0"
                : "1",
            menuId: data[k].menuId,
            objId: this.editData.roleId,
            objName: this.editData.roleName
          };

          menuList.push(obj);
        }
      }
      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.exportAuthMutationSave,
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: menuList
        }
      };
      //转换了中台请求格式数
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          this.$message({
            message:
              this.$t("org.label.authorization") +
              " " +
              this.$t("sys.tips.esTip5"), //授权成功
            type: "success",
            duration: 2000
          });
          this.sendCodeHandleVisible();
        } else {
          msg = response.msg;
          this.$message({
            message: msg,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    // 树过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.menuName.indexOf(value) !== -1;
    },
    //tree自定义事件--每行树后面的复选框
    renderContent(h, { node, data, store }) {
      const that = this
      let aChecked = false
      let bChecked = false
      if(node.parent && node.parent.data.constructor === Object){
        document.getElementById("a" + node.parent.data.menuId) && document.getElementById("a" + node.parent.data.menuId).checked ? aChecked = true : false
        document.getElementById("b" + node.parent.data.menuId) && document.getElementById("b" + node.parent.data.menuId).checked ? bChecked = true : false
      }
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          {(data.children.length !== 0 && data.children[0].children.length === 0) || data.children.length === 0 ? (
          <span>
            <input
              type="checkbox"
              name="vehicle"
              value="Car"
              id={"a" + data.menuId}
              on-click={e => {
                let is = e.target.checked;
                if (is) {
                  is = false
                  if(!that.defaultCheckeDeys.includes(data.menuId)){
                    that.$refs.tree.setChecked(data.menuId, true);
                    if(data.children.length !== 0 && !data.children.children){
                      that.setAllChildNodeCheck(data, true, 'a')
                    }
                  }
                } else {
                  is = true
                  // that.$refs.tree.setChecked(data.menuId, false);
                  if(data.children.length !== 0 && !data.children.children){
                    that.setAllChildNodeCheck(data, false, 'a')
                  }
                }
                e.stopPropagation();
              }}
              checked={aChecked ? true : false}
            />{" "}
            <label for={"a" + data.menuId}>导出</label>
            <input
              type="checkbox"
              name="vehicle1"
              value="Car"
              id={"b" + data.menuId}
              on-click={e => {
                let is = e.target.checked;
                if (is) {
                  is = false
                  if(!that.defaultCheckeDeys.includes(data.menuId)){
                    that.$refs.tree.setChecked(data.menuId, true);
                    if(data.children.length !== 0 && !data.children.children){
                      that.setAllChildNodeCheck(data, true, 'b')
                    }
                  }
                } else {
                  is = true
                  // that.$refs.tree.setChecked(data.menuId, false);
                  if(data.children.length !== 0 && !data.children.children){
                    that.setAllChildNodeCheck(data, false, 'b')
                  }
                }
                e.stopPropagation();
              }}
              checked={bChecked ? true : false}
            />{" "}
            <label for={"b" + data.menuId}>取消脱敏</label>
          </span>):(<span></span>)
            }
        </span>
      )
    },
    setAllChildNodeCheck(data, val, type){
      const that = this
      let nodes = data
      nodes.children.forEach(item => {
        val ? that.$refs.tree.setChecked(item.menuId, val) : false;
        type === 'a' ? (document.getElementById("a" + item.menuId) ? document.getElementById("a" + item.menuId).checked = val : false) :false
        type === 'b' ? (document.getElementById("b" + item.menuId) ? document.getElementById("b" + item.menuId).checked = val : false) :false
        if(item.children && item.children.length !== 0){
          that.setAllChildNodeCheck(item, val, type)
        }
      })
    },
    //勾选左边时候，同时勾选导出,取消左边时取消勾选导出和脱敏
    nodeClick(data, checkState) {
      this.$nextTick(() => {
        if (checkState.checkedKeys.includes(data.menuId)) {
          if (document.getElementById("a" + data.menuId) != null) {
            document.getElementById("a" + data.menuId).checked = true;
          }
          if (document.getElementById("b" + data.menuId) != null) {
            document.getElementById("b" + data.menuId).checked = false;
          }
        } else {
          if (document.getElementById("a" + data.menuId) != null) {
            document.getElementById("a" + data.menuId).checked = false;
          }
          if (document.getElementById("b" + data.menuId) != null) {
            document.getElementById("b" + data.menuId).checked = false;
          }
        }
        if (data.children.length !== 0) {
          for (let i of data.children) {
            if(checkState.checkedKeys.includes(data.menuId)){
              if (document.getElementById("a" + i.menuId) != null) {
                document.getElementById("a" + i.menuId).checked = true;
              }
              if (document.getElementById("b" + i.menuId) != null) {
                document.getElementById("b" + i.menuId).checked = false;
              }

            }else{
              if (document.getElementById("a" + i.menuId) != null) {
                document.getElementById("a" + i.menuId).checked = false;
              }
              if (document.getElementById("b" + i.menuId) != null) {
                document.getElementById("b" + i.menuId).checked = false;
              }
            }
          }
        }
      });
    },
    //勾选默认展开
    checkOpen(arr) {
      for (let i of arr) {
        if (i.children.length > 0) {
          this.checkOpen(i.children);
        } else {
          this.defaultCheckeDeys.push(i.menuId);
          if (this.defaultExpandedKeys.length < 50) {
            this.defaultExpandedKeys.push(i.menuId);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-slide {
  height: 450px;
  background: #fff;
  position: relative;
  margin-top: 10px;
  border-radius: 2px;
  -webkit-box-shadow: 2px 3px 2px #c1c1c1;
  box-shadow: 2px 3px 2px #c1c1c1;
}
/deep/ .el-button--small {
  margin-right: 25px;
}
/deep/ .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
/deep/ .custom-tree-node input,
/deep/ .custom-tree-node label {
  font-size: 12px !important;
  font-weight: normal;
}
</style>
