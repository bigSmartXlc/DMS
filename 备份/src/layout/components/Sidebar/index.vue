<template>
  <div
    :class="{'has-logo':showLogo}"
    id="sideBar"
  >
    <logo
      v-if="showLogo"
      :collapse="isCollapse"
    />

    <el-scrollbar
      wrap-class="scrollbar-wrapper"
      :class="{isHorScrollbar:menuStyle.isHorizontal}"
    >
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >

        <!-- 全量菜单 "-->
        <el-submenu
          index="2"
          v-if="$config.useFullMenu"
          class="allMenus"
          :class="{'isNoneEL':menuStyle.isHorizontal}"
        >
          <template
            slot="title"
            v-if="!menuStyle.isHorizontal"
          >
            <div
              class="menuallClass"
              @click="menuallClick"
            >
              <span class="menuspanClass">所有菜单</span>
              <i class="el-icon-s-unfold"></i>
            </div>
          </template>
        </el-submenu>
        <!-- 其余菜单 -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          ref="sidebar_item"
        />
      </el-menu>
    </el-scrollbar>
    <!--移动按钮-->
    <div class="move-buttom">
      <el-button
        v-show="this.showleftButtom && this.showIndex.length !== 0 "
        class="svg-icon iconfont icon-leftrun"
        type="text"
        @click="leftMove"
      ></el-button>
      <el-button
        v-show="this.showrightButtom && this.noneIndex.length !== 0"
        class="svg-icon iconfont icon-rightrun"
        type="text"
        @click="rightMove"
      ></el-button>
    </div>

    <!-- 全量菜单组件 -->
    <unfoldMenu
      v-if="$config.useFullMenu"
      :show="show"
      @escarrowClickd="escarrowClickd"
    ></unfoldMenu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: {
    SidebarItem,
    Logo,
    unfoldMenu: () => import("@/components/unfoldMenu/index.vue")
  },
  computed: {
    ...mapGetters(["sidebar", "nowTheme", "menuStyle"]),
    routes() {
      var $routes = this.$router.options.routes;
      for (var i = 0; i < $routes.length; i++) {
        this.changeTitle($routes[i]);
      }

      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      variables.menuActiveText = this.nowTheme.colorNumber;
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  data() {
    return {
      show: false,
      screenWidth: document.body.clientWidth, //获取页面宽度
      menuWidth: 0, //导航宽度
      noneIndex: [], //隐藏路由
      showIndex: [], //显示路由
      totoWidth: 0, //显示菜单宽度
      showleftButtom: false, //0显示左按钮
      showrightButtom: false, //0显示右按钮
      showMenuWidth: 0, //显示按钮宽度
      lastMenu: 0,
      firstMenu: 0
    };
  },
  mounted() {
    const that = this;
    that.showMenu();

    window.addEventListener("resize", () => {
      if (this.menuStyle.isHorizontal) {
        const that = this;
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
        that.showMenu();
      }
    });
  },
  watch: {
    screenWidth(val) {
      if (this.menuStyle.isHorizontal) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true;
          let that = this;
          setTimeout(function() {
            that.showMenu();
            that.timer = false;
          }, 400);
        }
      }
    },
    "menuStyle.isHorizontal": function(val) {
      if (val) {
        this.showMenu();
      }
    }
  },
  methods: {
    //判断显示横导航数
    showMenu() {
      if (
        this.menuStyle.isHorizontal &&
        this.$refs.sidebar_item !== undefined
      ) {
        this.totoWidth = 0;
        this.showIndex = [];
        this.noneIndex = [];
        for (var i = 0; i < this.$refs.sidebar_item.length; i++) {
          var m = this.$refs.sidebar_item;
          if (
            m[i].item.hidden !== undefined &&
            m[i].item.IdType !== undefined
          ) {
            if (!m[i].item.hidden && m[i].item.IdType === 0) {
              m[i].$el.dataset.Id = m[i].item.menuId;

              m[i].$el.classList.add("displayMenu-block");

              if (document.querySelector(".isHorScrollbar") !== null) {
                this.menuWidth = document.querySelector(
                  ".isHorScrollbar"
                ).clientWidth;
              } else {
                this.menuWidth = this.screenWidth - 612;
              }
              var w = m[i].$el.clientWidth;
              m[i].$el.dataset.width = w;
              this.totoWidth = w + this.totoWidth;
              if (this.menuWidth < this.totoWidth) {
                m[i].$el.classList.add("displayMenu-none");
                m[i].$el.classList.remove("displayMenu-block");
                this.noneIndex.push(m[i].item.menuId);
                this.lastMenu = this.noneIndex[this.noneIndex.length - 1];
                this.showleftButtom = true;
                this.showrightButtom = false;
              } else {
                m[i].$el.classList.add("displayMenu-block");
                m[i].$el.classList.remove("displayMenu-none");
                this.showIndex.push(m[i].item.menuId);
                this.firstMenu = this.showIndex[0];
                this.showleftButtom = false;
                this.showrightButtom = false;
              }
            }
          }
        }
      }
    },
    //左移动
    leftMove() {
      if (this.showIndex.length !== 0) {
        var index = document.querySelectorAll(
          "div[data--id='" + this.showIndex[0] + "']"
        );
        index[0].classList.add("displayMenu-none");
        index[0].classList.remove("displayMenu-block");
        if (this.noneIndex.length !== 0) {
          var indexnone = document.querySelectorAll(
            "div[data--id='" + this.noneIndex[0] + "']"
          );
          indexnone[0].classList.add("displayMenu-block");
          indexnone[0].classList.remove("displayMenu-none");
        }
        this.noneIndex.push(this.showIndex[0]);
        this.showIndex.push(this.noneIndex[0]);
        this.noneIndex.shift();
        this.showIndex.splice(0, 1);
        if (this.showIndex[0] !== this.firstMenu) {
          this.showrightButtom = true;
        } else {
          this.showrightButtom = false;
        }
        if (this.showIndex[this.showIndex.length - 1] === this.lastMenu) {
          this.showleftButtom = false;
        } else {
          this.showleftButtom = true;
        }
      }
    },
    //右移动
    rightMove() {
      if (this.noneIndex.length !== 0) {
        var index = document.querySelectorAll(
          "div[data--id='" + this.noneIndex[this.noneIndex.length - 1] + "']"
        );
        index[0].classList.add("displayMenu-block");
        index[0].classList.remove("displayMenu-none");
        this.showIndex.unshift(this.noneIndex[this.noneIndex.length - 1]);
        this.noneIndex.unshift(this.showIndex[this.showIndex.length - 1]);
        this.showIndex.pop();
        this.noneIndex.pop();
        if (this.showIndex[0] === this.firstMenu) {
          this.showleftButtom = true;
          this.showrightButtom = false;
        } else {
          this.showleftButtom = true;
          this.showrightButtom = true;
        }
      }
    },
    // 所有菜单点击事件
    menuallClick(val) {
      this.show = !this.show;
    },
    // 箭头关闭事件
    escarrowClickd(val) {
      this.show = val;
    },
    changeTitle(obj) {
      if (obj["menuId"] != undefined) {
        if (obj["meta"] != undefined) {
          if (
            this.$t("sys.router." + obj["menuId"]) !=
            "sys.router." + obj["menuId"]
          ) {
            obj["meta"]["title"] = this.$t("sys.router." + obj["menuId"]);
          }
        }
        if (typeof obj["children"] === "object") {
          for (var j = 0; j < obj["children"].length; j++) {
            this.changeTitle(obj["children"][j]);
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-menu--collapse.el-menu {
  .el-submenu {
    .el-icon-s-unfold {
      margin-left: 15px;
      margin-top: 0px;
      cursor: pointer;
    }
    // 未折叠状态
    .menuallClass {
      border-bottom: 1px #cccccc solid !important;
      margin-left: 10px !important;
      line-height: 29px !important;
      width: 50px !important;
    }
  }
}
</style>
