<!--
* description: 对应菜单弹窗
* author: mwhao
* createdDate: 2019-12-23
-->
<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      title="选择菜单"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      width="600px"
    >
      <dialogHeader
        slot="title"
        :title="'选择菜单'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-container filter-params">
        <div class="search">
          <el-input
            v-model="searchData"
            placeholder="菜单搜索"
            size="mini"
            suffix-icon="el-icon-search"
          ></el-input>
        </div>
        <el-tree
          :data="menueList"
          @node-click="handleNodeClick"
          :props="defaultProps"
          class="filter-tree el-slide"
          :filter-node-method="filterNode"
          :default-expand-all="false"
          node-key="id"
          ref="tree"
          :expand-on-click-node="false"
          highlight-current
        ></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          :icon="comp.icon"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { orgApis } from "@/api/apiList/org";
import { formMixins } from "@/components/mixins/formMixins";
import { debuglog } from "util";
import { constants } from "crypto";
export default {
 components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    // 弹窗
    popupsVisible: { type: Boolean, default: false },
    code: { type: String, default: "" },
    comType: { type: String, default: "" },
    codeField: { type: String, default: "" },
    textField: { type: String, default: "" },
    popupsKey: { type: String, default: "" },
    isMul: { type: Boolean, default: true }
  },
  // 组件混入对象
  mixins: [formMixins],
  data() {
    return {
      menueList: [],
      sendData: {},
      curPopupsVisible: this.popupsVisible,
      listQuery: {
        isEnable: "1",
        column1: "1",
        orgBelongType: ""
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          icon: "iconfont  icon-preservation",
          clickEvent: () => this.sendCode(),
          text: "确定"
        },
        {
          compKey: "btnKey1",
          type: "",
          size: "small",
          icon: "iconfont  icon-cancel",
          clickEvent: () => this.close(),
          text: "取消"
        }
      ],
      // 树状图搜索过滤
      searchData: ""
    };
  },
  watch: {
    // 侦听搜索框输入的变化
    searchData(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.tissueListd();
  },
  methods: {
    //树状图查询API
    tissueListd() {
      var that = this;
      this.$store.dispatch("sysManage/getMyMenuTree").then(response => {
        if (response.result === "1") {
          this.menueList = response.rows;
        }
      });
    },
    close() {
      this.$emit("close", "");
    },
    handleNodeClick(data) {
      this.sendData.name = data.name;
      this.sendData.id = data.id;
    },
    sendCode() {
      if (JSON.stringify(this.sendData) !== "{}") {
        this.$emit(
          "changeCode",
          this.sendData.name.toString(),
          this.sendData.id.toString(),
          this.codeField,
          this.comType,
          this.popupsKey,
          this.textField
        );
      } else {
        this.$emit("changeCode");
      }
    },
    // 树状图筛选功能
    filterNode(value, data, node) {
      if (!value) return true;
      if (node) {
        let level = node.level;
        let _array = []; //这里使用数组存储 只是为了存储值。
        this.getReturnNode(node, _array, value);
        let result = false;
        _array.forEach(item => {
          result = result || item;
        });
        return result;
      }
    },
    // 树状图筛选递归  备注:如果数据量大的话,会很卡
    getReturnNode(node, _array, value) {
      let isPass =
        node.data && node.data.name && node.data.name.indexOf(value) !== -1;
      isPass ? _array.push(isPass) : "";
      this.index++;
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-slide {
  height: calc(90vh - 185px);
  overflow-y: auto;
  background: #fff;
}
/deep/ .search {
  width: 50%;
}
</style>

