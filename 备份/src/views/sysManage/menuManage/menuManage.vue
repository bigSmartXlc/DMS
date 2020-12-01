<!--
* description: 菜单页面管理
* author: mwhao
* createdDate: 2019-11-19
-->
<template>
  <section class="app-container app-container-table">
    <div id="TreeTable">
      <!--树形区域-->
      <el-aside class="el-slide">
        <div class="box-bottom">
          <el-button icon="el-icon-plus" plain @click="addMenu">{{$t('sys.button.add')}}</el-button>
          <el-button icon="el-icon-close" plain @click="deleteMenu">{{$t('sys.button.delete')}}</el-button>
        </div>
        <el-tree
          :default-expanded-keys="treeExpanded"
          auto-expand-parent
          :current-node-key="treeChecked"
          ref="tree"
          node-key="id"
          :data="menueList"
          highlight-current
          :key="eltree"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :expand-on-click-node="false"
        />
      </el-aside>
      <el-main ref="mainHeight">
        <!-- 此节点没有数据 -->
        <div v-show="noData" class="nodata">
          <div>
            <span>此节点没有数据</span>
          </div>
        </div>
        <!--网格区域-->
        <div class="box">
          <div class="tite">{{titleTable}}</div>
          <div class="groupMenueEdit">
            <div class="filter-container filter-params">
              <el-row :gutter="28">
                <el-col :span="10">
                  <label>
                    <span class="mutid">*</span>功能编号:
                  </label>
                  <el-input
                    v-model="editQuery.menuCode"
                    clearable
                    :placeholder="$t('sys.tips.esTip13')"
                    size="small"
                    @blur="inputChange"
                  />
                </el-col>
                <el-col :span="10">
                  <label>
                    <span class="mutid">*</span>功能名称:
                  </label>
                  <el-input
                    v-model="editQuery.menuName"
                    clearable
                    :placeholder="$t('sys.tips.esTip13')"
                    size="small"
                    @blur="inputChange"
                  />
                </el-col>
                <el-col :span="10">
                  <label>
                    <span class="mutid">*</span>功能分类:
                  </label>
                  <el-select
                    collapse-tags
                    filterable
                    v-model="editQuery.menuType"
                    clearable
                    size="small"
                    :disabled="isEditFlag"
                    @change="inputChange"
                  >
                    <el-option
                      v-for="item in menutypeOption"
                      :key="item.code"
                      :label="item.label"
                      :value="item.code"
                      :disabled="item.flag"
                    />
                  </el-select>
                </el-col>
                <el-col :span="10">
                  <label>
                    <span class="mutid">*</span>是否隐藏:
                  </label>
                  <el-select
                    collapse-tags
                    filterable
                    v-model="editQuery.isauto_refresh"
                    clearable
                    size="small"
                    @change="inputChange"
                  >
                    <el-option
                      v-for="item in isauto_refreshOption"
                      :key="item.code"
                      :label="item.label"
                      :value="item.code"
                      :disabled="item.flag"
                    />
                  </el-select>
                </el-col>

                <el-col :span="20">
                  <label>
                    <span class="mutid">*</span>对应页面:
                  </label>
                  <el-input
                    class="formDescstyle"
                    suffix-icon="el-icon-menu"
                    v-model="editQuery.formDesc"
                    clearable
                    placeholder="请选择对应页面"
                    size="small"
                    :disabled="isMenuType"
                    @focus="targetEvent()"
                    @blur="inputChange"
                  />
                </el-col>
                <!-- 隐藏 -->
                <el-col :span="10" class="conceal">
                  <label>
                    <span class="mutid">*</span>菜单打开方式:
                  </label>
                  <el-select
                    collapse-tags
                    filterable
                    v-model="editQuery.openstyle"
                    clearable
                    size="small"
                    :disabled="isEnableDisabled"
                    @change="inputChange"
                  >
                    <el-option
                      v-for="item in openstyleOption"
                      :key="item.code"
                      :label="item.label"
                      :value="item.code"
                      :disabled="item.flag"
                    />
                  </el-select>
                </el-col>
                <!-- 隐藏 -->
                <el-col :span="10" class="conceal">
                  <label>
                    <span class="mutid">*</span>平台类型:
                  </label>
                  <el-select
                    collapse-tags
                    filterable
                    v-model="editQuery.platformtype"
                    clearable
                    size="small"
                    :disabled="isPlatform"
                    @change="inputChange"
                  >
                    <el-option
                      v-for="item in platformtypeOption"
                      :key="item.code"
                      :label="item.label"
                      :value="item.code"
                      :disabled="item.flag"
                    ></el-option>
                  </el-select>
                </el-col>

                <el-col :span="10">
                  <label>
                    <span class="mutid">*</span>是否有效:
                  </label>
                  <el-select
                    collapse-tags
                    filterable
                    v-model="editQuery.isEnabled"
                    clearable
                    size="small"
                    @change="inputChange"
                  >
                    <el-option
                      v-for="item in isenabledOption"
                      :key="item.code"
                      :label="item.label"
                      :value="item.code"
                      :disabled="item.flag"
                    />
                  </el-select>
                </el-col>
                <el-col :span="10">
                  <label>
                    <span class="mutid">*</span>同级序号:
                  </label>
                  <el-input
                    v-model="editQuery.menuOrder"
                    clearable
                    :placeholder="$t('sys.tips.esTip13')"
                    size="small"
                    @blur="inputChange"
                  />
                </el-col>
                <el-col :span="20">
                  <label>功能图标:</label>
                  <el-input
                    v-model="editQuery.menuIcon"
                    clearable
                    placeholder="请输入图标样式名称"
                    size="small"
                    @blur="inputChange"
                  />
                </el-col>
                <el-col :span="20">
                  <label>功能描述:</label>
                  <el-input
                    type="textarea"
                    :rows="1"
                    v-model="editQuery.menuDesc"
                    clearable
                    placeholder="请输入功能描述"
                    size="small"
                    @blur="inputChange"
                  />
                </el-col>
                <el-col :span="20">
                  <div class="orgManageBtn">
                    <el-button
                      type="primary"
                      size="small"
                      @click="saveNew()"
                    >{{$t('sys.button.save')}}</el-button>
                    <!-- /*保存*/ -->
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </el-main>
      <menuDialog
        :popupsVisible="curPopupsVisible"
        :key="menuDialogd"
        ref="dialogMultipleTable"
        @close="close"
      />
    </div>
  </section>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import menuDialog from "./edit";
export default {
  name: "menuManage",
  components: {
    menuDialog,
  },
  filters: {},
  mixins: [oneTableWithViewTemplateMixins],
  data() {
    return {
      // 无数据
      noData: false,
      // 点击后的对象
      position: {},
      // 树状点击查询
      formField: {
        menuid: "",
      },
      menuDialogd: "menuDialog",
      // 树状渲染数组
      menueList: [],
      // 树状显示的参数
      defaultProps: {
        children: "children",
        label: "name",
      },
      // 保存请求的参数
      editQuery: {
        menuCode: "",
        menuName: "",
        menuOrder: "",
        isEnabled: "1",
        menuIcon: "",
        menuDesc: "",
        isauto_refresh: "0",
        platformtype: "0",
        menuType: "P",
        formDesc: "",
        menuID: "",
        menuParm: "",
        openstyle: "1",
        method: "insert",
        parentid: "-1",
        formID: "",
        plattype: "0",
      },
      // 新菜单对象
      newMenu: {
        code: "",
        icon: "",
        id: "1",
        isauto_refresh: "0",
        openstyle: "1",
        order: "",
        parentID: "",
        parm: "",
        type: "M",
        name: "新菜单",
      },
      // 是否禁用
      isEditFlag: false, // 功能分类
      isPlatform: false, // 平台类型
      isEnableDisabled: false, // 菜单打开类型
      isMenuType: false, //  对应页面
      // 下拉框循环数组
      menutypeOption: [
        { code: "M", label: "模板" },
        { code: "P", label: "页面" },
      ],
      platformtypeOption: [
        { code: "1", label: "C/S" },
        { code: "0", label: "B/S" },
      ],
      isauto_refreshOption: [
        { code: "1", label: "是" },
        { code: "0", label: "否" },
      ],
      isenabledOption: [
        { code: "1", label: "是" },
        { code: "0", label: "否" },
      ],
      openstyleOption: [
        { code: "1", label: "框架内打开" },
        { code: "2", label: "新窗口打开(带框架菜单)" },
        { code: "3", label: "新窗口打开(不带框架菜单)" },
      ],
      // 标题显示文字
      titleTable: "新建菜单",
      // 刷新key值
      eltree: "key",
      // 默认展开的值
      treeExpanded: ["-1"],
      // 默认选中的值
      treeChecked: "",
      // 弹窗显示
      curPopupsVisible: false,
      // 是否显示编辑提示
      compilt: false,
      // 是否为新菜单
      isnewMenu: false,
      // 判断保存功能  提交/编辑
      isMethod: false,
      // 值改变对比的参数
      inputChangeObject: {},
      // 判断是否为主页面
      oneTyle: true,
      // 添加新页面判断
      addMenued: false,
      // 上一次点击的回调
      lastCallback: null,
    };
  },
  created() {
    this.getMyMenuTree();
  },
  watch: {
    "editQuery.menuType"(val) {
      if (val === "M") {
        this.isEnableDisabled = true;
        this.isMenuType = true;
        this.editQuery.formDesc = "";
      } else {
        this.isEnableDisabled = false;
        this.isMenuType = false;
      }
    },
  },
  mounted() {},
  methods: {
    // 复原界面
    escEditQuery() {
      // 修改为全部折叠
      // this.treeExpanded=["-1"];
      // this.treeChecked="";
      // 复原参数
      this.isEditFlag = false;
      this.isPlatform = false;
      this.isEnableDisabled = false;
      this.isMenuType = false;
      this.oneTyle = true;
      (this.editQuery.formID = ""),
        (this.editQuery.isEnabled = "1"),
        (this.editQuery.isauto_refresh = "0"),
        (this.editQuery.menuCode = ""),
        (this.editQuery.menuDesc = ""),
        (this.editQuery.menuID = ""),
        (this.editQuery.menuIcon = ""),
        (this.editQuery.menuName = ""),
        (this.editQuery.menuOrder = ""),
        (this.editQuery.menuParm = ""),
        (this.editQuery.menuType = "P"),
        (this.editQuery.parentID = ""),
        (this.editQuery.platformtype = "0"),
        (this.editQuery.formDesc = ""),
        (this.editQuery.method = ""),
        (this.editQuery.plattype = "0"),
        (this.editQuery.openstyle = "1");
      this.titleTable = "新建菜单";
    },
    // 树状图查询API
    getMyMenuTree() {
      const that = this;
      (that.menueList = [
        {
          code: "orgMgr",
          icon: "",
          id: "-1",
          isauto_refresh: 0,
          name: "所有菜单",
          openstyle: 1,
          order: "1",
          parentID: "-2",
          parm: "",
          formDesc: "",
          type: "M",
          children: [],
        },
      ]),
        this.$store.dispatch("sysManage/getMenuTree").then((response) => {
          if (response.result === "1") {
            response.rows.forEach((item) => {
              that.menueList[0].children.push(item);
            });
          }
        });
    },
    // 点击树状后的查询API
    getMenuInfo() {
      const that = this;
      if (this.isnewMenu) {
        this.compilt = true;
        this.isMethod = true;
        this.escEditQuery();
      } else {
        this.$store
          .dispatch("sysManage/getMenuInfo", this.formField)
          .then((response) => {
            if (this.formField.menuid === "-1") {
              this.noData = true;
            } else {
              this.noData = false;
            }
            if (response.result === "1") {
              (this.editQuery.formDesc = response.formDesc),
                (this.editQuery.formID = response.formID),
                (this.editQuery.isEnabled = response.isEnabled),
                (this.editQuery.isauto_refresh = response.isauto_refresh),
                (this.editQuery.menuCode = response.menuCode),
                (this.editQuery.menuDesc = response.menuDesc),
                (this.editQuery.menuID = response.menuID),
                (this.editQuery.menuIcon = response.menuIcon),
                (this.editQuery.menuName = response.menuName),
                (this.editQuery.menuOrder = response.menuOrder),
                (this.editQuery.menuParm = response.menuParm),
                (this.editQuery.menuType = response.menuType),
                (this.editQuery.parentID = response.parentID),
                (this.editQuery.platformtype = response.platformtype),
                (this.editQuery.openstyle = response.openstyle),
                (this.inputChangeObject = JSON.parse(
                  JSON.stringify(this.editQuery)
                ));
              // 标题判断
              if (this.editQuery.menuName) {
                this.titleTable = this.editQuery.menuName;
              } else {
                this.titleTable = "新建菜单";
              }
              // 禁用判断
              if (this.editQuery.menuType === "P") {
                this.isEditFlag = true;
                this.isPlatform = true;
                this.isEnableDisabled = false;
                this.isMenuType = false;
              } else {
                this.isEditFlag = true;
                this.isPlatform = true;
                this.isEnableDisabled = true;
                this.isMenuType = true;
              }
              this.isMethod = false;
            }
          });
      }
    },
    // 点击后的回调
    handleNodeClick(a, b, c) {
      // 获取上一次点击树状图参数
      if (
        !this.lastCallback &&
        typeof this.lastCallback != "undefined" &&
        this.lastCallback != 0
      ) {
        this.lastCallback = a;
      }
      if (this.compilt) {
        if (this.isnewMenu) {
          this.editQuery.menuid = "";
        } else {
          this.editQuery.menuid = a.id;
        }
        if (this.newMenu === a) return;
        this.$confirm("正在编辑菜单节点数据,是否放弃编辑的数据?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning",
        })
          .then(() => {
            this.isEnableDisabled = true;
            this.compilt = false;
            this.isnewMenu = false;
            this.addMenued = false;
            this.delMenu(this.menueList);
            this.position = a;
            this.treeChecked = a.id;
            this.lastCallback = null;
            this.addMenued = false;
            this.treeExpanded = [];
            this.treeExpanded.push(this.a.parentID);
            // 选中事件需刷新key值,一开始刷新报未知错误
            if (this.formField.menuid) {
              this.eltree = this.eltree + "1";
            }
            this.formField.menuid = a.id;
            this.getMenuInfo();
          })
          .catch(() => {
            if (this.isnewMenu) {
              this.treeChecked = "1";
            } else {
              this.treeChecked = this.lastCallback.id;
              this.treeExpanded = [];
              this.treeExpanded.push(this.lastCallback.parentID);
            }
            this.position = a;
            if (this.treeChecked) {
              this.eltree = this.eltree + "1";
            }
            this.compilt = true;
            return;
          });
      } else {
        this.position = a;
        this.formField.menuid = a.id;
        this.editQuery.parentid = a.id;
        this.oneTyle = false;
        this.getMenuInfo();
      }
    },
    // 递归删除 新建页面菜单
    delMenu(menueList) {
      if (menueList && menueList.length > 0) {
        for (var k in menueList) {
          if (menueList[k].children) {
            if (menueList[k].children.filter((o) => o.id === "1").length > 0) {
              menueList[k].children.splice(menueList[k].children.length - 1, 1);
              return;
            } else {
              this.delMenu(menueList[k].children);
            }
          }
        }
      }
    },
    // 删除页面API
    deleteMenu() {
      var that = this;
      this.$confirm("确定要删除选定的记录吗?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        this.$store
          .dispatch("sysManage/deleteMenu", this.formField)
          .then((response) => {
            if (response.result === "1") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.treeExpanded = [];
              this.treeExpanded.push(this.lastCallback.parentID);
              this.titleTable = "新建菜单";
              this.oneTyle = true;
              // 树状图查询
              this.getMyMenuTree();
              // 复原界面
              this.escEditQuery();
              this.eltree = this.eltree + "1";
            } else {
              if (that.$mpErrMsg.infos[response.msg]) {
                that.$message({
                  message: "查询失败：" + that.$mpErrMsg.infos[response.msg],
                  type: "warn",
                  uration: 2000,
                });
              }
            }
          });
      });
    },
    // 保存请求API
    saveMenu() {
      const that = this;
      // 判断是否为编辑菜单 method参数中insert=保存  update=编辑
      if (this.isMethod) {
        this.editQuery.method = "insert";
      } else {
        this.editQuery.method = "update";
        this.editQuery.menuID = this.position.id;
        this.editQuery.parentid = this.position.parentID;
      }
      // 判断是否为主页面
      if (this.oneTyle) {
        this.editQuery.method = "insert";
        this.oneTyle = false;
      }
      this.editQuery.plattype = this.editQuery.platformtype;
      this.$store
        .dispatch("sysManage/saveMenu", this.editQuery)
        .then((response) => {
          if (response.result === "1") {
            this.$message({
              type: "success",
              message: "保存成功!",
            });
            this.addMenued = false;
            this.compilt = false;

            this.getMyMenuTree();
            this.escEditQuery();
          } else {
            if (that.$mpErrMsg.infos[response.msg]) {
              that.$message({
                message: "查询失败：" + that.$mpErrMsg.infos[response.msg],
                type: "warn",
                uration: 2000,
              });
            }
          }
        });
    },
    // 添加页面
    addMenu() {
      var that = this;
      // 判断是否能添加新菜单
      if (this.editQuery.menuType === "M" || this.position.type === "M") {
        if (this.noData) {
          this.noData = false;
        }
        this.isMethod = true;
        this.oneTyle = true;
        if (this.addMenued) {
          this.$alert("请先完成当前新页面的编辑", "提示信息", {
            confirmButtonText: "确定",
          });
        } else {
          if (this.position.children === null) {
            this.position.children = [this.newMenu];
          } else {
            // 增加新菜单
            this.position.children.push(this.newMenu);
          }
          this.treeExpanded = [];
          // 增加的时候是展开
          this.treeExpanded.push(this.position.id);
          // 默认选中的值
          this.treeChecked = "1";
          this.addMenued = true;
          this.compilt = true;
          this.isEnableDisabled = false;
          this.titleTable = "新建菜单";
          this.isnewMenu = true;
          this.getMenuInfo();
          // 刷新key值放到getMenuInfo后 ,不然会有未知错误
          this.eltree = this.eltree + "1";
          this.isPlatform = true;
        }
      } else {
        this.$alert("页面下不能添加内容,请在模块下添加", "提示信息", {
          confirmButtonText: "确定",
        });
      }
    },
    // 对应页面触发事件
    targetEvent() {
      this.curPopupsVisible = true;
      this.menuDialogd = this.menuDialogd + 1;
    },
    // 关闭弹窗
    close() {
      this.curPopupsVisible = false;
      this.menuDialogd = this.menuDialogd + 1;
    },
    // 保存
    saveNew() {
      var that = this;
      if (that.$utils.isEmpty(that.editQuery.menuCode)) {
        that.$message({
          message: "功能编号不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (that.$utils.isEmpty(that.editQuery.menuName)) {
        that.$message({
          message: "功能名称不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (!that.isEditFlag && that.$utils.isEmpty(that.editQuery.menuType)) {
        that.$message({
          message: "功能分类不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (
        !that.isPlatform &&
        that.$utils.isEmpty(that.editQuery.platformtype)
      ) {
        that.$message({
          message: "平台类型不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (!that.isMenuType && that.$utils.isEmpty(that.editQuery.formDesc)) {
        that.$message({
          message: "对应页面不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (
        !that.isEnableDisabled &&
        that.$utils.isEmpty(that.editQuery.openstyle)
      ) {
        that.$message({
          message: "菜单打开方式不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (that.$utils.isEmpty(that.editQuery.isauto_refresh)) {
        that.$message({
          message: "是否刷新不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (that.$utils.isEmpty(that.editQuery.isEnabled)) {
        that.$message({
          message: "是否有效不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      if (that.$utils.isEmpty(that.editQuery.menuOrder)) {
        that.$message({
          message: "同级序号不能为空",
          type: "warning",
          duration: 2000,
        });
        return;
      }
      this.saveMenu();
    },
    // input值改变事件
    inputChange() {
      // 判断是否有改变参数
      if (
        JSON.stringify(this.inputChangeObject) ===
        JSON.stringify(this.editQuery)
      ) {
        this.compilt = false;
      } else {
        this.isnewMenu = false;
        this.compilt = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
// 隐藏平台类型/菜单打开方式,
/deep/ .conceal {
  display: none;
}
/deep/ #TreeTable main.el-main {
  height: calc(100vh - 90px) !important;
  overflow-y: auto;
}
/deep/ .el-main {
  height: 100%;
}

/deep/ .box {
  background: #fff;
  height: calc(100vh - 90px);
}
/deep/ .box-bottom {
  position: fixed;
  height: 38px;
  width: 18%;
  z-index: 1000;
  background: #fff;
  border-bottom: 1px solid #f1f1f1;
}
/deep/ .box-bottom button {
  margin: 4px;
}
/deep/ .el-tree.el-tree--highlight-current {
  margin-top: 38px;
}
/deep/ .tite {
  font-size: 16px;
  text-align: center;
  line-height: 37px;
  border-bottom: 1px solid #f1f1f1;
}
/deep/ .filter-params {
  padding: 30px 100px 5px 63px;
  margin-left: 51px;
}
/deep/ .el-col.el-col-10 {
  margin-bottom: 20px;
}
/deep/ .el-col.el-col-20 {
  margin-bottom: 20px;
}
/deep/.el-col-10 {
  height: 20px;
}
/deep/.el-col-20 {
  height: 20px;
}
/deep/ .formDescstyle.el-input.el-input--small.el-input--suffix {
  .el-input__inner {
    background: #f5f7fa;
  }
}
/deep/ .filter-params.el-col.el-input.input {
  border-radius: 5px;
}
/deep/ .el-input--small.el-input__inner {
  height: 33px;
}
.mutid {
  color: red;
}
.orgManageBtn {
  margin-top: -5px;
}
.nodata {
  position: relative;
  z-index: 10000;
  background: #fff;
  width: 100%;
  height: 100%;
  div {
    position: absolute;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    span {
      font-size: 30px;
    }
  }
}
.groupMenueEdit {
  background: #fff;
}
</style>
