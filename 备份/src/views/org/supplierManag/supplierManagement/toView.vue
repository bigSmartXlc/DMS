<!--
* description: 集团员工明细查看弹窗
* author: lixb
* createdDate: 2019-10-14
-->
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
import Vue from "vue";
import OneTableTemplate from "@/components/templates/popupsOneTable";
export default {
  mixins: [oneTableTemplateMixins],
  components: {
    OneTableTemplate, dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
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
    roleId: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    const viewPageCode = 'supplierEmployee-toView'
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
        //角色名称
        userId: this.roleId
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
      var cols = [];
      const viewPageCode = 'supplierEmployee-toView'
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
            prop: "roleCode",
            label: this.$t("org.label.roleCode"),
            width: 0,
            // hidden: true,
            align: "center"
          }, //角色编码
          {
            prop: "roleDesc",
            label: this.$t("org.label.roleDesc"),
            width: 0,
            align: "center"
          } //角色描述
          // {
          //   prop: "orgName",
          //   label: this.$t("org.label.orgName"),
          //   width: null,
          //   align: "center"
          // } //所属组织
        ]);
      }
      return cols;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

