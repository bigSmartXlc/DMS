<!--
* description: API授权弹窗
* author:  mwhao
* createdDate: 2019-12-05
-->
<template>
  <section>
    <el-dialog v-dialogDrag
      :title='$t("sys.button.apiAuthorization")/*API授权*/'
      :visible.sync="apiDialog"
      width="800px"
      lock-scroll
      :append-to-body="true"
      :close-on-click-modal="false"
    >
     <dialogHeader
        slot="title"
        :title='$t("sys.button.apiAuthorization")/*API授权*/'
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <!-- 顶部 -->
      <div class="apiTop">
        <span>{{$t("org.label.queryWay")/*查询方式*/}}</span>
        <el-input :placeholder='$t("org.label.pleaseEnterContent")/*请输入内容*/' v-model="search" class="input-with-select">
          <el-select v-model="select" slot="prepend" :placeholder='$t("org.label.pleaseChoose")/*请选择*/'>
            <el-option label="Name" value="1"></el-option>
            <el-option label="URL" value="2"></el-option>
          </el-select>
          <el-button
            type="danger"
            slot="append"
            icon="el-icon-search"
            size="mini"
            plain
            @click="filterNode"
          ></el-button>
        </el-input>
      </div>
      <!-- 树状图 -->
      <div class="tree">
        <el-tree
          :default-expanded-keys="treeExpanded"
          :default-checked-keys="treeChecked"
          :filter-node-method="filterNode"
          auto-expand-parent
          ref="tree"
          node-key="id"
          show-checkbox
          :data="menueList"
          highlight-current
          :key="eltree"
          :props="defaultProps"
          @node-click="apileNodeClick"
          :expand-on-click-node="false"
        />
      </div>
      <div class="menuButton">
        <el-button type="primary" icon="iconfont  icon-preservation" plain @click="menuSend">{{ this.$t("org.label.confirm")/*确认*/}}</el-button>
        <el-button plain @click="sendCo" icon="iconfont  icon-cancel">{{ this.$t("org.label.cancel")/*取消*/}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  props: {
    // 弹窗显示
    handleVisible: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 选中行id
    userId: {
      type: String,
      default: function() {
        return "1";
      }
    },
    // 功能  1:用户权限api授权  2:全局角色管理api授权 
    mpType: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  watch: {
    // 侦听搜索框输入的变化
    search(val) {
      this.$refs.tree.filter(val);
    }
  },
    components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      // 选中行的参数
      selectData: this.currentRow,
      // key
      eltree: "eltree",
      // 弹窗显示
      apiDialog: this.handleVisible,
      // 输入框
      search: "",
      select: "Name",
      // 树状渲染数组
      menueList: [],
      // 默认选中的数组
      checkedList: [],
      // 树状显示的参数
      defaultProps: {
        children: "children",
        label: "text"
      },
      // 树状图默认展开/选中的值
      treeExpanded: ["1"],
      treeChecked: [],
      // 确定授权
      purviewList: {
        userId: this.userId,
        apiIds: ""
      }
    };
  },
  mounted() {
    this.getPurviewd();
  },
  created() {
    if (this.mpType === 2) {
      this.purviewList = {
        roleId: this.userId,
        apiIds: ""
      };
    }
  },
  methods: {
    // 树状图显示api
    getPurviewd() {
      const that = this;
      that.menueList = [
        {
          checkState: true,
          id: "1",
          isParent: true,
          parentID: "-1",
          text:this.$t("org.label.allApi")/*所有API*/,
          children: []
        }
      ];
      var urlstr = "authorityManage/getPurview";
      if (that.mpType === 2) {
        urlstr = "authorityManage/rolegetPurview";
      }
      this.$store.dispatch(urlstr, this.purviewList).then(response => {
        if (response.result === "1") {
          response.rows[0].children.forEach(item => {
            that.menueList[0].children.push(item);
          });
          // 默认选中跟展开数组赋值
          const check = that.menueList[0].children;
          that.defaultChilck(check, that);
          that.eltree = that.eltree + "1";
        }
      });
    },
    // 默认展开/选中
    defaultChilck(check, that) {
      for (var i = 0; i < check.length; i++) {
        if (check[i].checkState && !check[i].isParent) {
          that.treeChecked.push(check[i].id);
        }
        for (var k = 0; k < check[i].children.length; k++) {
          if (
            check[i].children[k].checkState &&
            !check[i].children[k].isParent
          ) {
            that.treeChecked.push(check[i].children[k].id);
            that.treeExpanded.push(check[i].children[k].id);
          }
        }
      }
    },
    // 点击树状后的回调
    apileNodeClick(a, b, c) {},
    // 树状图筛选功能
    filterNode(value, data, node) {
      if (!value) return true;
      let level = node.level;
      let _array = []; //这里使用数组存储 只是为了存储值。
      this.getReturnNode(node, _array, value);
      let result = false;
      _array.forEach(item => {
        result = result || item;
      });
      return result;
    },
    // 树状图筛选递归  备注:如果数据量大的话,会很卡
    getReturnNode(node, _array, value) {
      let isPass =
        node.data && node.data.text && node.data.text.indexOf(value) !== -1;
      isPass ? _array.push(isPass) : "";
      this.index++;
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value);
      }
    },
    // 关闭弹窗
    sendCo() {
      // this.$emit("close", false);
      this.apiDialog = false;
      this.eltree = this.eltree + "1";
    },
    // 授权确认按钮
    menuSend() {
      const that = this;
      // 获取选中的id
      that.purviewList.apiIds = that.$refs.tree.getCheckedKeys().toString(",");
      var strurl = "authorityManage/purviewButton";
      if (that.mpType === 2) {
        strurl = "authorityManage/savePurview";
      }
      // 用户权限api授权
      this.$store.dispatch(strurl, that.purviewList).then(response => {
        if (response.result === "1") {
          this.$message({
            showClose: true,
            message: this.$t("org.label.authorizationSuccess")/*授权成功*/,
            type: "success"
          });
        }
      });
      this.sendCo();
    }
  }
};
</script>

<style lang="scss" scoped>
.apiTop {
  margin-left: 20px;
  .input-with-select.el-input.el-input--small.el-input-group.el-input-group--append.el-input-group--prepend {
    margin-left: 10px;
    width: 65%;
  }
}
/deep/ .el-input-group__prepend {
  width: 17%;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #dcdfe6;
}
// /deep/ .el-input__inner {
//   margin-left: 10px;
//   width: 94%;
// }
/deep/ .el-icon-search {
  color: #ffff;
}
/deep/ .menuButton {
  float: right;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
/deep/ .tree {
  height: 470px;
  overflow: auto;
}
</style>