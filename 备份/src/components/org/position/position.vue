<!--
* description: 业务岗位选择
* author: mwhao
* createdDate: 2020-1-2
-->

<template>
  <section class="orgDlr">
    <el-dialog v-dialogDrag
      id="orgDlr"
      title="业务岗位"
      :visible.sync="curPopupsVisible"
      width="1063px"
      center
      @close="closeCode"
      :append-to-body="true"
      :close-on-click-modal="false"
      :lock-scroll="true"
    >
      <dialogHeader
        slot="title"
        :title="'业务岗位'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <!-- 业务岗位 -->
      <one-table-template
        ref="multipleTable"
        :dynamicButtons="tableButtons"
        :dynamicComponents="tableComponents"
        :dynamicApiConfig="apiConfig"
        :dynamicTableCols="tableCols"
        :dynamicFormFields="formField"
        :dynamicIsShowSelect="false"
      />
    </el-dialog>
  </section>
</template>

<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/popupsOneTable";
export default {
  // 组件混入对象：{data[listQuery] methods[queryTable]}
  mixins: [oneTableWithViewTemplateMixins, valueObjectMixins],
  components: {
    OneTableTemplate,
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    deptId: { type: String, default: '' },
    popupsVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      curLabelName: this.labelName === "" ? "业务岗位" : this.labelName,
      curPopupsVisible: this.popupsVisible,
      // 网格查询API配置对象 
      apiConfig: orgApis.mdmOrgStationQueryFindAll,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          name: "search",
          position: "right",
          clickEvent: () => this.queryTable(1),
          text: "查询"
        },
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          name: "reset",
          position: "right",
          clickEvent: () => this.reset(),
          text: "重置"
        },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          position: "right",
          clickEvent: () => this.sendCode("stationId", "stationName"),
          text: this.$t("sys.button.confirm")
        } //确认
      ],
      // 动态组件-查询条件
      tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: "业务岗位编码",
                codeField: "stationCode",

                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: "业务岗位名称",
                codeField: "stationName",

                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey4",
                labelName: "是否启用",
                codeField: "isEnable",
                component: () => import("@/components/org/isEnable/isEnable"),
                type: "dropdownList",
                isMust: true
              }
            ],
      // 动态生成网格列
      tableCols:[
              {
                prop: "stationCode",
                label: "业务岗位编码",
                width: null,
                align: "center"
              },
              {
                prop: "stationName",
                label: "业务岗位名称",
                width: null,
                align: "center"
              },
              {
                prop: "deptName",
                label: "所属组织",
                width: null,
                align: "center"
              },
              {
                prop: "stationId",
                label: "岗位ID",
                width: 350,
                hidden: true,
                align: "center"
              },
              {
                prop: "isEnable",
                label: "是否启用",
                width: null,
                align: "center"
              },
              {
                prop: "deptId",
                label: "部门ID",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "column1",
                label: "对应工作台方案",
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "updateControlId",
                label: "并发ID",
                width: null,
                align: "center",
                hidden: true
              }
            ],
      //表单查询数据
      formField: {
        stationName: "",
        stationCode: "",
        isEnable: "",
        deptId:this.deptId,
        isDlrStation: this.$store.getters.orgInfo.ORG_TYPE==="1"?1:0,
      }
    };
  },
  methods: {
    // 双击事件
    handleTableRowDbClick() {
      this.sendCode("stationId", "stationName");
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .menuButton {
  float: right;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
}
</style>
