 <!--
* description: 首页-快捷菜单弹窗组件
* createdDate: 2019-11-28
* author: 对快捷菜单可配置化进行修改 mawenhao  2019-11-18
-->

<template>
  <section class="addMenu">
    <el-dialog v-dialogDrag
      title="添加快捷菜单"
      :visible.sync="addMenuVisibled"
      width="600px"
      @close="sendCode"
      class="addMenuDialog"
      :append-to-body="true"
    >
      <dialogHeader
        slot="title"
        :title="'添加快捷菜单'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-container filter-params">
        <Search class="funcContent" :isShow="true" :isAddMenu="isAddMenu" @getAddMenu="dealAddMenu"></Search>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import Search from "@/components/HeaderSearch";
export default {
  components: {
    Search,
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    addMenuVisible: {
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      isAddMenu: true,
      addMenuVisibled: this.addMenuVisible
    };
  },
  watch: {
    addMenuVisible(newV) {
      this.addMenuVisibled = newV
    }
  },
  methods: {
    sendCode() {
      var val = "close";
      this.$emit("getAddMenu", val);
    },
    dealAddMenu(val) {
      this.$emit("getAddMenu", val);
    }
  }
};
</script>
<style lang="scss">
.addMenuDialog {
  .el-dialog {
    height: 200px;
  }
}
.addMenu {
  .funcName {
    height: 32px;
    line-height: 32px;
    width: 20%;
    float: left;
  }
  .funcContent {
    height: 32px;
    width: 70%;
    float: left;
    .el-select {
      width: 90%;
      border-radius: 2px;
      height: 32px;
      float: left;
    }
  }
}
</style>
