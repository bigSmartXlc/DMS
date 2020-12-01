<template>
  <section class="editCarBrand">
    <el-dialog v-dialogDrag
      :close-on-click-modal="false"
      title="选择组织"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="closeCode"
      width="800px"
    >
      <dialogHeader
        slot="title"
        :title="'选择组织'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-container filter-params">
        <el-tree
          :data="menueList"
          :empty-text="emptyText"
          @node-click="handleNodeClick"
          :props="defaultProps"
          class="filter-tree el-slide"
          :default-expand-all="false"
          node-key="orgTreeId"
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
export default {
 components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    popupsVisible: { type: Boolean, default: false },
    code: { type: String, default: "" },
    comType: { type: String, default: "" },
    codeField: { type: String, default: "" },
    otherField: { type: String, default: "" },
    textField: { type: String, default: "" },
    popupsKey: { type: String, default: "" },
    isMul: { type: Boolean, default: true },
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
        companyid:  this.$store.getters.orgInfo.COMPANY_ID,
        orgBelongType:''
      },
      defaultProps: {
        children: "children",
        label: "orgName"
      },
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          icon: "iconfont  icon-confirm",
          clickEvent: () => this.sendCode(),
          text: "确定"
        },
        {
          compKey: "btnKey1",
          type: "",
          size: "small",
          icon: "iconfont  icon-cancel",
          clickEvent: () => this.closeCode(),
          text: "取消"
        }
      ]
    };
  },
  created() {
    this.getlLstQuery()
    this.queryMenue();
  },
  methods: {
    getlLstQuery(){
      let orgType = this.$store.getters.orgInfo.ORG_TYPE
      switch(orgType){
        //经销商
        case "1":
          this.listQuery.orgBelongType = "1,8"
          break;
     //超级管理员
        case null:
          this.listQuery.orgBelongType = "0,1,2,3,4,5,6,7,8"
          break;
      //厂商
        default:
          this.listQuery.orgBelongType = "0,2,3,4,5,6,7,8"
          break;
      }
    },
    queryMenue(page) {
      const that = this;
      that.emptyText = that.$t('sys.content.loading')
      let queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgRelationRealQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: [
              "orgName",
              "orgCode",
              "orgBelongType",
              "orgTreeId",
              "linkId",
              "groupCode",
              "groupId",
              "isEnable",
              "parentOrgTreeId",
              "treeType",
              "orgRealId"
            ]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: -1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.listQuery
        }
      };
      //转换了中台请求格式数据
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        that.emptyText = that.$t('sys.content.emptyData')
        if (
          response.result === "1" &&
          response.rows != ""
        ) {
          var dataList =
            response.rows;
          var tree = this.$utils.parseTreeFromList(
            dataList,
            "parentOrgTreeId",
            "orgTreeId"
          );
          this.menueList = tree;
        }
      });
    },
    close() {
      this.$emit("close", "");
    },
    handleNodeClick(data) {
      this.sendData.name = data.orgName;
      this.sendData.orgCode = this.otherField && this.otherField !== '' ? data[this.otherField] : data.orgTreeId;
      this.sendData.dlrId = data.groupId;
      this.sendData.dlrCode = data.groupCode;
      if (!this.sendData.dlrId) {
        this.sendData.dlrId = "";
      }
      if (!this.sendData.dlrCode) {
        this.sendData.dlrCode = "";
      }
    },
    sendCode() {
      if (JSON.stringify(this.sendData) !== "{}") {
        this.$emit(
          "changeCode",
          this.sendData.orgCode.toString(),
          this.sendData.name.toString(),
          this.sendData.dlrId.toString(),
          this.sendData.dlrCode.toString(),
          this.codeField,
          this.comType,
          this.popupsKey
        );
      } else {
        this.$emit("changeCode");
      }
    }
  }
};
</Script>

<style lang="scss" scoped>
/deep/.el-slide {
  height: calc(90vh - 185px);
  overflow-y: auto;
  background: #fff;
}
</style>

