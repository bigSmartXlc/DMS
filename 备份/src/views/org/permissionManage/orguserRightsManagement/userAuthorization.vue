<template>
  <section>
    <el-dialog v-dialogDrag
      width="600px"
      :title="showTitle "
      :visible.sync="handleVisibled"
      center
      @close="sendCodeHandleVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <dialogHeader
        slot="title"
        :title="showTitle "
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>

      <one-table-template ref="multipleTable"
        :dynamicApiConfig="apiConfig"
        :dynamicFormFields="formField"
        :dynamicComponents="tableComponents"
        :dynamicIsShowSelect="false"
        :isshowSearchConTile="false"
        :isshowTable="false"
        :isShowPagination="false"
        :isshowSearchTableButton="false"
        :isshowSearchResult="false"
      />
      <div style="text-align:right;padding-right: 10px;" v-if="showAuthorize">
      <el-button type="primary" icon="iconfont  icon-shouquan" @click="authorize" >{{$t('org.label.authorization')/*授权*/}}</el-button>
      </div>
       <div class="filter-container filter-title" ref="resultTitleHeight">{{$t('sys.content.gridTitle')/*查询结果*/}}</div>
      <el-aside class="el-slide" style="background-color: #fff" width="100%" >
        <el-tree
          :render-content="renderContent"
          class="filter-tree"
          :data="orgList"
          :empty-text="emptyText"
          :props="defaultProps"
          :default-expand-all="false"
           highlight-current
          v-loading="queryState"
          :default-expanded-keys="defaultExpandedKeys"
          :default-checked-keys="defaultCheckeDeys"
          :filter-node-method="filterNode"
          :show-checkbox="isShowCheckBox"
          height="300px"
          node-key="menuId"
          ref="tree"
          :render-after-expand=false
        ></el-tree>
      </el-aside>
    </el-dialog>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from '@/components/mixins/oneTableWithViewTemplateMixins';
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from '@/components/templates/popupsOneTable'
export default {
    // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate, dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
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
      apiConfig: orgApis.sysUserPrivQueryByPage,
      handleVisibled: this.handleVisible,
      queryState:false,
      showTitle: this.handleTitle == 0 ? this.$t('org.label.userRightsView')/*用户权限查看*/ : this.$t('org.label.userRightsChange')/*用户权限变更*/,
      //是否只查看有权限
      selectedOnly:this.handleTitle == 0 ? "1" : "0",
      //是否显示授权按钮
      showAuthorize:this.handleTitle == 0 ? false : true,
      //是否显示复选框
      isShowCheckBox:this.handleTitle == 0 ? false : true,
      tableComponents: [
          {compKey: 'compKey1', span: 12, labelName: this.$t('org.label.authorizedObject')/*授权对象*/, codeField: 'userName',disabled:true,component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: true},
          {compKey: 'compKey2', span: 12, labelName: this.$t('org.label.functionName') /*功能名称*/, codeField: 'functionName', isInput:true,component: () => import('@/components/org/commonInput'), type: 'inputText', isMust: true}
       ],
      formField: {
        userName:this.editData.userName,
        functionName:''
      },
      orgList: [],
      defaultProps: {
        children: "children",
        label: "menuName"
      },
      //默认选中数组
      defaultCheckeDeys:[],
      // 默认展开数组
      defaultExpandedKeys:[],
      //角色赋权菜单ID数组
      roleMenuId:[]
    };
  },
  created() {
    this.queryOrganization();
  },
  watch: {
    // 过滤树
    'formField.functionName'(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    //设置默认选中
    getDefaultCheckeDeys(arr, v){
      if (v) {
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
      } else {
        for(let i  of arr){
          if(i.children.length>0){
            this.getDefaultCheckeDeys(i.children)
          }else{
            if(i.isSelected === "1"){
              this.defaultCheckeDeys.push(i.menuId)
              if (this.defaultExpandedKeys.length < 50) {
                this.defaultExpandedKeys.push(i.menuId)
              }
            }
          }
        }
      }
    },
    //查找角色赋权的menuId
    selectRoleEmpowerment(dataList){
      let str = "(角色赋权)"
      for(let i in dataList){
        if(dataList[i].menuName.indexOf(str)!=-1 && dataList[i].isSelected === "1"){
          this.roleMenuId.push(dataList[i].menuId)
        }
      }
    },
    //查询组织
    queryOrganization() {
      this.emptyText = this.$t('sys.content.loading')
      this.queryState=true;
      const that = this;
      let obj = {}
      if(this.handleTitle !== 1){
        obj.roleId = this.editData.roleId
        obj.selectedOnly = 1
      }else{
        obj.roleId = this.editData.roleId
      }
      let queryObj = {
        // api配置
        apiConfig: orgApis.sysUserPrivQueryByPage,
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
          dataInfo: {
            userId: this.editData.userId,
            selectedOnly:this.selectedOnly
          }
        }
      };
      //转换了中台请求格式数据
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        this.emptyText = this.$t('sys.content.emptyData')
        if (
          response.result === "1"
        ) {
          var dataList =
            response.rows;

          var tree = this.$utils.parseTreeFromList(
            dataList,
            "parentMenuId",
            "menuId"
          );
          this.orgList = tree;
          this.selectRoleEmpowerment(dataList)
          this.getDefaultCheckeDeys(this.orgList)
          this.queryState=false;

        }
        this.queryOrganization1()
      });
    },
    //查询导出
    queryOrganization1() {
      const that = this;
      this.emptyText = this.$t("sys.content.loading");
      this.queryState = true;
      let obj = {};
      if (this.handleTitle !== 1) {
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
            // apiQueryRow: ["menuName", "menuId", "isSelected", "parentMenuId"] "userId",
            apiQueryRow: [
              "isSelected",
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
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            objId: this.editData.userId,
            objType: "1"
            // selectedOnly: this.selectedOnly
          }
        }
      };
      //转换了中台请求格式数据
      let paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        that.emptyText = that.$t("sys.content.emptyData");
        if (response.result === "1") {
          let dataList = response.rows;
          let tree = that.$utils.parseTreeFromList(
            dataList,
            "parentMenuId",
            "menuId"
          );
          that.getDefaultCheckeDeys(tree, 1);
          that.queryState = false;
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
    authorize(val) {
     var menuList = [];
      var data = this.$refs.tree.getCheckedNodes(false,true);
      if(data.length == 0){
        // this.$message({
        //   message: this.$t('org.message.selMenuAuthor')/*请选择要授权的菜单*/,
        //   type: 'warning',
        //   duration: 2000
        // });
        // return
        menuList=[-1]
      }else{
         for (var k in data) {
          menuList.push(data[k].menuId);
        }
      }
      // if(this.roleMenuId.length>0){
      //   for(let i of this.roleMenuId){
      //     for(let j in menuList){
      //       if(i === menuList[j]){
      //         menuList.splice(1,j)
      //       }
      //     }
      //   }
      // }

      let queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.sysUserPrivMutationSave,
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            userId: this.editData.userId,
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
            message: this.$t('org.label.userRightsChange')/*用户权限变更*/+this.$t('sys.tips.esTip5')/*保存成功*/,
            type: "success",
            duration: 2000
          });
          this.sendCodeHandleVisible()
        }else {
            msg = response.msg;
            this.$message({
              message: msg,
              type: 'warning',
              duration: 2000
            });
          }
      });
    },
    sendCode(){
      this.handleVisibled = false
      this.$emit('changeCode', code, text)
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
