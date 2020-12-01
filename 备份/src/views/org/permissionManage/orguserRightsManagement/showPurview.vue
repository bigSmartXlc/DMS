<!--
* description: MP功能-树状图查看-API查看/权限查看弹窗
* author:  mwhao
* createdDate: 2019-12-07
-->
<template>
  <section >
    <el-dialog v-dialogDrag
      :title='$t("org.label.apiCheck")/*API查看*/'
      :visible.sync="apilockDialog"
      width="800px"
      lock-scroll
      :append-to-body="true"
      :close-on-click-modal="false"
    >
     <dialogHeader
        slot="title"
        :title='$t("org.label.apiCheck")/*API查看*/'
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="tree">
        <el-tree
          :default-expanded-keys="treeExpanded"
          auto-expand-parent
          ref="tree"
          node-key="id"
          :data="apiList"
          highlight-current
          :key="apieltree"
          :props="defaultProps"
          :expand-on-click-node="false"
        />
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
    // 选中行数据id
    userId: {
      type: String,
      default: function() {
        return "1";
      }
    },
    // 功能  1=用户权限api授权  2=全局角色管理api授权
    mpType: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  created() {
    this.apiPurviewd();
  },
   components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      // 树状图默认展开/选中的值
      treeExpanded: ["1"],
      apilockDialog: this.handleVisible,
      // 树状图渲染数组
      apiList: [],
      apieltree: "apieltree",
      // 树状显示的参数
      defaultProps: {
        children: "children",
        label: "text"
      },
      formField: {
        userId: this.userId
      }
    };
  },
  methods: {
    apiPurviewd() {
      const that = this;
      var urlstr="authorityManage/showPurview"
      if(this.mpType === 2){
        urlstr="authorityManage/roleshowPurview"
        this.formField = { roleId: this.userId };
      }
      this.$store
        .dispatch(urlstr,that.formField)
        .then(response => {
          if (response.result === "1") {
            that.apiList.push(response.rows[0]);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .tree {
  height: 500px;
  overflow: auto;
}
</style>