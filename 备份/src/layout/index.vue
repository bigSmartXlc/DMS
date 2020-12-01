<template>
  <div
    :class="classObj"
    class="app-wrapper"
  >
    <div
      v-if="showContent && device==='mobile'&&sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <div v-if="showContent" :class="{'is-horManu':menuStyle.isHorizontal}">
      <sidebar
        class="sidebar-container"
        ref="sidebar"
      />
      <navbar
        v-if="menuStyle.isHorizontal"
        :class="{isShowHor:menuStyle.isHorizontal}"
      />
    </div>
    <div
      :class="{hasTagsView:needTagsView}"
      class="main-container"
      @click="menmSeout"
    >
      <div
        v-if="showContent"
        :class="{'fixed-header':fixedHeader}"
      >
        <navbar
          v-if="!menuStyle.isHorizontal"
          :class="{isShowHor:menuStyle.isHorizontal}"
        />
      </div>
      <app-main />
      <tags-view v-if="showContent && needTagsView" />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapGetters } from "vuex";
// import horizontalMenu from "./components/Sidebar/horizontalMenu.vue";
export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar,
    TagsView
    // horizontalMenu
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(["menuStyle"]),
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    needTagsView() {
      return this.$store.state.settings.tagsView;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    showContent() {
      return this.$store.state.settings.showContent;
    },
    classObj() {
      if (!this.menuStyle.isHorizontal) {
        return {
          hideSidebar: !this.sidebar.opened,
          openSidebar: this.sidebar.opened,
          withoutAnimation: this.sidebar.withoutAnimation,
          closeSidebar: !this.showContent,
          mobile: this.device === "mobile"
        };
      } else {
        return "isHorizontal";
      }
    }
  },
  methods: {
    // 移出菜单栏,次级菜单自动收回
    menmSeout(e) {
      // var vertical = document.querySelectorAll(".el-menu--vertical");
      // for (let i = 0; i < vertical.length; i++) {
      //   $(vertical[i]).fadeOut()
      // }
      if (this.$refs.sidebar && this.$refs.sidebar.$refs && this.$refs.sidebar.$refs.sidebar_item) {
        const items = this.$refs.sidebar.$refs.sidebar_item.filter(
          o =>
            o.item.hidden === false &&
            o.$refs.subMenu &&
            o.$refs.subMenu.opened === true
        );
        this.handleMouseleave(e, items);
      }
    },
    handleMouseleave(e, items) {
      const _self = this;
      if (items && items.length > 0) {
        items.forEach(function(item) {
          const subitems = item.$refs.sidebar_item.filter(
            o =>
              o.item.hidden === false &&
              o.$refs.subMenu &&
              o.$refs.subMenu.opened === true
          );
          // 关闭子子菜单
          _self.handleMouseleave(e, subitems);
          // 关闭子菜单
          item.$refs.subMenu.handleMouseleave(e || window.event);
        });
      }
    },
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
