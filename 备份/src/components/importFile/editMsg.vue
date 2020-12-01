<!--
    消息提示框
-->
<template>
  <section>
    <el-dialog
      v-dialogDrag
      width="400px"
      :visible.sync="handleVisibled"
      :title="textMap"
      :append-to-body="true"
      center
      :close-on-click-modal="false"
      @close="sendColse"
    >
      <dialogHeader slot="title" :title="textMap" :styleType="$store.state.app.dialogType"></dialogHeader>
      <ul>
        <li v-for="(item, index) in msgArr" :key="index" class="stys">{{item}}</li>
      </ul>
      <div class="filter-container filter-button btns">
        <el-button type="primary" @click="sendColse" icon="iconfont icon-preservation">确认</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
export default {
  components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    handleVisible: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    msg: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      textMap: "提示",
      handleVisibled: this.handleVisible,
      msgArr: []
    };
  },
  mounted() {
    if (this.handleVisible === true) {
      this.handleVisibled = true;
      this.getArray(this.msg);
    }
  },
  methods: {
    sendColse() {
      this.handleVisibled = false;
      this.$emit("close", false);
    },
    getArray(msg) {
      msg = msg.replace(/\[|]/g, "");
      this.msgArr = msg.split(",");
    }
  }
};
</script>
<style lang="scss" scoped>
.stys {
  text-align: center;
}
.btns{
  padding: 10px;
}
ul,ol {
  max-height: 250px;
  overflow: auto;
  margin: 0;
  padding: 0 0 10px 0;
  list-style: none;
}
</style>

