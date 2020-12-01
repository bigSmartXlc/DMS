<template>
  <section>
    <el-dialog v-dialogDrag
      width="900px"
      :title="$t('org.label.viewRole')/*角色查看*/"
      :visible.sync="handleVisibled"
      center
      @close="sendCodeHandleVisible"
      :close-on-click-modal="false"
      :append-to-body="true"
    >
      <dialogHeader
        slot="title"
        :title="$t('org.label.viewRole')/*角色查看*/"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
        <one-table-template ref="multipleTable"
        :dynamicApiConfig="apiConfig"
        :dynamicTableCols="tableCols"
        :dynamicFormFields="formField"
        :dynamicIsShowSelect="false"
        :isshowSearchTableButton="false"
        :isshowSearchConTile="false"
        :dynamicIsInitTable="true"
      />
    </el-dialog>
  </section>
</template>
<script>
import { oneTableTemplateMixins } from '@/components/mixins/oneTableTemplateMixins';
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from '@/components/templates/popupsOneTable'
export default {
  // 组件混入对象：{data[listQuery] methods[queryTable]}
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
      type: null
    },
    userId:{
      type: String,
      default: function() {
        return "";
      }
    },
    roleName: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.sysRoleUserQueryByPage,
      handleVisibled: this.handleVisible,
      showTableData: this.showData,
      // 动态生成网格列
      tableCols: [
           { prop: 'roleName', label: this.$t('org.label.roleName')/*角色名称*/, width: 200, align: 'center' },
           { prop: 'roleCode', label: this.$t('org.label.roleCode')/*角色编码*/, width: 300, align: 'center' },
           { prop: 'roleDesc', label: this.$t('org.label.roleDesc')/*角色描述*/, width: 300, align: 'center' },
      ],
      formField: {
        userId: this.userId
      },
    };
  },
  created() {
    this.queryTable();
  },
  methods: {
    sendCodeHandleVisible() {
      this.handleVisibled = false;
    },
    queryData(userId){
      this.formField.userId = userId
      this.queryTable();
    }
  }
};
</script>

