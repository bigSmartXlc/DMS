<template>
  <section>
    <el-dialog v-dialogDrag
      width="900px"
      :title="showTitle"
      :visible.sync="handleVisibled"
      :append-to-body="true"
      center
      @close="sendCodeHandleVisible"
    >
      <dialogHeader
        slot="title"
        :title="showTitle"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <one-table-template
        :dynamicApiConfig="apiConfig"
        :dynamicTableCols="tableCols"
        :dynamicFormFields="formField"
        :dynamicIsShowSelect="false"
        :dynamicIsInitTable="true"
        :dynamicIsColumnDrop="true"
      />
      <!-- ref="multipleTables" -->
    </el-dialog>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
import { oneTableTemplateMixins } from "@/components/mixins/oneTableTemplateMixins";
import OneTableTemplate from "@/components/templates/popupsOneTable";
export default {
  mixins: [oneTableTemplateMixins],
  components: {
    OneTableTemplate,  dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    handleVisible: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    //组织类型
    roleOrgType: {
      type: String,
      default: function() {
        return "";
      }
    },
    toviewroleId: {
      type: String,
      default: function() {
        return "";
      },
      persionuserId: {
        type: String,
        default: function() {
          return "";
        }
      }
    }
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = 'orgstaffManagement-toView'
    return {
      handleVisibled: this.handleVisible,
      apiConfig: orgApis.sysRoleUserQueryByPage,
      showTableData: this.showData,
      showTitle: "查看角色",
      list: [],
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        limit: 20
      },
      formField: {
        //用户id
        // userId: this.persionuserId
        // //角色名称
        userId: this.toviewroleId
        // //组织类型
        // roleOrgType: this.roleOrgType
      },
      pageTotal: 0,
      tableCols: this.getCols()
    };
  },
  created() {
    this.queryTable();
  },
  methods: {
    sendCodeHandleVisible() {
      this.handleVisibled = false;
    },
    getCols() {
      // console.log(this.persionuserId);
      var cols = [];
      var viewPageCode = 'orgstaffManagement-toView'
      if (
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0
      ) {
        cols = cols.concat(this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols);
      } else {
        cols = cols.concat([
          {
            prop: "roleName",
            label: this.$t("org.label.roleName"),
            width: 0,
            align: "center"
          }, //角色名称
          {
            prop: "roleDesc",
            label: this.$t("org.label.roleTypes"),
            width: 0,
            align: "center"
          }, //角色类型
          {
            prop: "roleCode",
            label: this.$t("org.label.roleCode"),
            width: 0,
            align: "center"
          }, //角色编码
        ]);
      }
      return cols;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

