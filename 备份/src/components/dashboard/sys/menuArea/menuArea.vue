 <!--
* description: 首页-快捷菜单组件
* author: mawenhao 修改
* createdDate: 2019-11-28
-->
<template>
  <!-- 快捷菜单 -->
  <el-col :span="span" class="menuAreaHight" style="height: calc(100% - 130px)!important">
    <div class="menuArea myNoticeLeft" :style="doDoStyle">
      <span class="partTitle">
        <a>{{'快捷菜单'}}</a>
      </span>
      <el-col class="menuPart" :span="4" v-for="(menuItem,index) in menuItems" :key="index">
        <div class="menuIcon" :style="menuItem.menuStyle" @click="linkTo(menuItem.path)"></div>
        <div class="menuPartText" @click="linkTo(menuItem.path)">
          <a class="menuaLog">{{menuItem.text}}</a>
        </div>
        <i class="el-icon-close closeIcon" v-show="isClose" @click="delMenuItem(index)"></i>
      </el-col>
      <div class="bottomStyle">
        <div v-if="menuItems.length < 23" class="menuPart menuPartAdd">
          <i class="el-icon-plus menuPartAddIcon" @click="addMenu()"></i>
          <div>
            <a class="menuaStyle">添加</a>
          </div>
        </div>
        <div v-if="menuItems.length >0" class="menuPart menuPartAdd">
          <i class="el-icon-minus menuPartAddIcon" @click="delMenu()"></i>
          <div>
            <a class="menuaStyle">删除</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 快捷菜单弹窗组件 -->
    <AddMenu @getAddMenu="dealAddMenu" :addMenuVisible="addMenuVisible" :key="addMenuKey"></AddMenu>
  </el-col>
</template>
<script>
import AddMenu from "./addMenu";
import { orgApis } from "@/api/apiList/org";
export default {
  components: {
    AddMenu
  },
  props: {
    // 行内占比
    span: { type: Number, default: 24 },
    // doDoStyle: { type: String, default: "margin-top:-120px" }
    doDoStyle: { type: String, default: "" }
  },
  data() {
    return {
      //key值
      addMenuKey: "addMenuKey",
      addMenuVisible: false,
      isClose: false,
      ismenuItems: [],
      // 快捷菜单参数
      menuItems: [],
      indexId: null,
      // 快捷菜单参数
      dafoutMenuItems: [],
      totoleMenu: [],
      // 快捷菜单背景图
      backgroundArr: [
        "url(" + require("@/assets/icon1.png") + ")",
        "url(" + require("@/assets/icon2.png") + ")",
        "url(" + require("@/assets/icon3.png") + ")",
        "url(" + require("@/assets/icon4.png") + ")",
        "url(" + require("@/assets/icon5.png") + ")",
        "url(" + require("@/assets/icon1.png") + ")",
        "url(" + require("@/assets/icon2.png") + ")",
        "url(" + require("@/assets/icon3.png") + ")",
        "url(" + require("@/assets/icon4.png") + ")",
        "url(" + require("@/assets/icon5.png") + ")",
        "url(" + require("@/assets/icon1.png") + ")",
        "url(" + require("@/assets/icon2.png") + ")",
        "url(" + require("@/assets/icon3.png") + ")",
        "url(" + require("@/assets/icon4.png") + ")",
        "url(" + require("@/assets/icon5.png") + ")",
        "url(" + require("@/assets/icon1.png") + ")",
        "url(" + require("@/assets/icon2.png") + ")",
        "url(" + require("@/assets/icon3.png") + ")",
        "url(" + require("@/assets/icon4.png") + ")",
        "url(" + require("@/assets/icon5.png") + ")",
        "url(" + require("@/assets/icon1.png") + ")",
        "url(" + require("@/assets/icon2.png") + ")",
        "url(" + require("@/assets/icon3.png") + ")",
        "url(" + require("@/assets/icon4.png") + ")",
        "url(" + require("@/assets/icon5.png") + ")"
      ],
      // 查询数据
      queryMenu: [],
      formField: {
        isEnable: "1",
        menuPath: "",
        userId: this.$store.getters.orgInfo.userId
      },
      // 自适应高度
      menuAreaHight: ""
    };
  },
  mounted() {
    this.query();
    // this.menuAreaHight=  `height:calc(100%-${this.$parent.$children[0].$refs.todoArea.scrollHeight})`
  },
  methods: {
    // 配置化用户快捷菜单查詢
    query() {
      const queryObj = {
        // api配置
        apiConfig: orgApis.proConfigUserShortcutMenuQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: [
              "menuPath",
              "menuName",
              "userId",
              "backgroundImage",
              "backgroundSize",
              "isEnable",
              "userId",
              "createdName",
              "createdDate",
              "modifyName",
              "lastUpdatedDate",
              "updateControlId"
            ]
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: 100,
          pageIndex: 1,
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: this.formField
        }
      };
      // 转换了中台请求格式数据
      const paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          this.queryMenu = response.rows;
          if (this.queryMenu.length !== 0) {
            for (var i = 0; i < this.queryMenu.length; i++) {
              var Menu = [];
              if (
                this.queryMenu[i].userId === this.$store.getters.orgInfo.userId
              ) {
                Menu.menuStyle = {};
                Menu.menuStyle.backgroundImage = this.backgroundArr[
                  this.queryMenu[i].backgroundImage
                ];
                Menu.menuStyle.backgroundSize = this.queryMenu[
                  i
                ].backgroundSize;
                Menu.text = this.queryMenu[i].menuName;
                Menu.path = this.queryMenu[i].menuPath;
                Menu.updateControlId = this.queryMenu[i].updateControlId;
                this.menuItems.push(Menu);
              }
            }
          }
        }
      });
    },
    // 快捷按钮添加弹窗
    dealAddMenu(val) {
      if (val == "close") {
        this.addMenuVisible = false;
        return false;
      }

      const query = val.query ? "?" + this.$utils.getUrlVars(val.query) : "";

      if (this.menuItems.filter(o => o.path === val.path + query).length > 0) {
        this.$message({
          message: "该菜单已添加",
          type: "warn",
          uration: 50
        });
        return false;
      }
      var randomItem = this.backgroundArr[
        Math.floor(Math.random() * this.backgroundArr.length)
      ];
      var obj = {};
      var text = val.title[val.title.length - 1];
      //省略快捷菜单名字
      // if (text.length > 7) {
      //   obj.text = text.substring(0, 7) + "...";
      // } else {
      //不省略快捷菜单名字
      obj.text = text;
      // }
      obj.path = val.path + query;
      obj.menuStyle = {};
      (obj.menuStyle.backgroundImage = randomItem),
        (obj.menuStyle.backgroundSize = "cover");
      // this.menuItems.push(obj);
      this.formField.menuPath = obj.path;
      let that = this;
      const queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.proConfigUserShortcutMenuMutationSave,
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            menuPath: that.formField.menuPath,
            menuName: obj.text,
            userId: this.$store.getters.orgInfo.userId,
            backgroundImage: this.menuItems.length,
            backgroundSize: obj.menuStyle.backgroundSize,
            isEnable: that.formField.isEnable
          }
        }
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.data[queryObj.apiConfig.ServiceCode].result === "1") {
          // // 保存成功
          // 保存成功
          this.$message({
            message: "添加成功",
            type: "success",
            uration: 1000
          });

          that.query();
        } else {
          // 保存失败
          this.$message({
            message:
              "添加失败：" + response.data[queryObj.apiConfig.ServiceCode].msg,
            type: "warn",
            uration: 1000
          });
        }
      });
      // if (JSON.parse(window.localStorage.getItem("dafoutMenuItems")) === null) {
      //   if (this.dafoutMenuItems.length === 0) {
      //     this.dafoutMenuItems.push(this.$store.getters.orgInfo.userId);
      //     this.dafoutMenuItems.push(this.menuItems);
      //     this.totoleMenu.push(this.dafoutMenuItems);
      //   }
      //   window.localStorage.setItem(
      //     "dafoutMenuItems",
      //     JSON.stringify(this.totoleMenu)
      //   );
      // } else {
      //   for (
      //     let i = 0;
      //     i < JSON.parse(window.localStorage.getItem("dafoutMenuItems")).length;
      //     i++
      //   ) {
      //     if (
      //       JSON.parse(window.localStorage.getItem("dafoutMenuItems"))[i][0] ===
      //       this.$store.getters.orgInfo.userId
      //     ) {
      //       this.indexId = i;
      //     }
      //   }
      //   this.dafoutMenuItems = JSON.parse(
      //     window.localStorage.getItem("dafoutMenuItems")
      //   );
      //   if (
      //     this.dafoutMenuItems[this.indexId] !== undefined &&
      //     this.indexId !== null
      //   ) {
      //     this.dafoutMenuItems[
      //       this.indexId
      //     ][0] = this.$store.getters.orgInfo.userId;
      //     this.dafoutMenuItems[this.indexId][1] = this.menuItems;
      //   } else {
      //     this.totoleMenu = [];
      //     this.totoleMenu.push(this.$store.getters.orgInfo.userId);
      //     this.totoleMenu.push(this.menuItems);
      //     this.dafoutMenuItems.push(this.totoleMenu);
      //   }
      //   window.localStorage.setItem(
      //     "dafoutMenuItems",
      //     JSON.stringify(this.dafoutMenuItems)
      //   );

      // }
      this.addMenuVisible = false;
    },
    addMenu() {
      this.isClose = false;
      this.addMenuVisible = true;
      // this.addMenuKey = this.addMenuKey + 1;
    },
    delMenu() {
      this.isClose = !this.isClose;
    },
    delMenuItem(index) {
      var deleteMenu = this.menuItems[index];
      let that = this;
      const queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.proConfigUserShortcutMenuMutationDelete,
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            menuPath: deleteMenu.path,
            userId: this.$store.getters.orgInfo.userId,
            updateControlId: deleteMenu.updateControlId
          }
        }
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.data[queryObj.apiConfig.ServiceCode].result === "1") {
          // // 保存成功
          // 保存成功
          this.$message({
            message: "删除成功",
            type: "success",
            uration: 1000
          });
          this.menuItems.splice(index, 1);
        } else {
          // 保存失败
          this.$message({
            message:
              "删除失败：" + response.data[queryObj.apiConfig.ServiceCode].msg,
            type: "warn",
            uration: 1000
          });
        }
      });
      // for (
      //   let i = 0;
      //   i < JSON.parse(window.localStorage.getItem("dafoutMenuItems")).length;
      //   i++
      // ) {
      //   if (
      //     JSON.parse(window.localStorage.getItem("dafoutMenuItems"))[i][0] ===
      //     this.$store.getters.orgInfo.userId
      //   ) {
      //     this.ismenuItems = JSON.parse(
      //       window.localStorage.getItem("dafoutMenuItems")
      //     );
      //     this.ismenuItems[i][1] = this.menuItems;
      //     window.localStorage.setItem(
      //       "dafoutMenuItems",
      //       JSON.stringify(this.ismenuItems)
      //     );
      //   }
      // }
    },
    linkTo(val) {
      this.$router.push(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.bottomStyle {
  position: absolute;
  right: 20px;
  bottom: 8px;
}
.menuaStyle {
  margin-left: 5px !important;
}
.menuaLog {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.menuAreaHight {
  a {
    color: black;
    word-break: break-word;
    text-overflow: inherit;
    overflow: initial;
    white-space: inherit;
    line-height: 18px;
  }
}
// .menuPartText{
//       margin-left: 30px;
// }
</style>
