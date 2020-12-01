<!--
* description: 系统岗位弹出框
* author: mwhao
* createdDate: 2020-1-2
-->

<template>
  <section class="orgDlr">
    <el-dialog v-dialogDrag
      id="orgDlr"
      title="系统岗位"
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
        :title="'系统岗位'"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <!-- 系统岗位 -->
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
    OneTableTemplate,   dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  props: {
    popupsVisible: { type: Boolean, default: false }
  },
  data() {
    return {
      curLabelName: this.labelName === "" ? "系统岗位" : this.labelName,
      curPopupsVisible: this.popupsVisible,
      // 网格查询API配置对象
      apiConfig: orgApis.mdsSysPositionQueryFindAll,
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
          name: "confirm",
          position: "right",
          clickEvent: () => this.sendCode("positionId", "positionName"),
          text: this.$t("sys.button.confirm")
        } //确认
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
          .tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path]
              .tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.PositionCode"), //岗位编码
                codeField: "positionCode",
                span: 6,
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName: this.$t("org.label.PositionName"), //岗位名称
                codeField: "positionName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                span: 6
              },
              {
                compKey: "compKey3",
                labelName: this.$t("org.label.OrganizationType"), //组织类型
                codeField: "orgType",
                lookuptype: "BASE0003",
                component: () => import("@/components/org/LookupValue"),
                type: "dropdownList",
                isMust: false,
                span: 6
              },
              {
                compKey: "compKey4",
                labelName: this.$t("org.label.isEnable"), //是否启用
                codeField: "isEnable",
                component: () => import("@/components/org/isEnable/isEnable"),
                type: "dropdownList",
                isMust: false,
                span: 6
              }
            ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
              {
                prop: "positionId",
                label: "岗位id",
                hidden: true,
                align: "center"
              },
              {
                prop: "positionCode",
                label: this.$t("org.label.PositionCode"), //岗位编码
                width: null,
                align: "center"
              },
              {
                prop: "carBrandCode",
                label: this.$t("org.label.carBrandCode"),
                hidden: true,
                align: "center"
              }, //品牌
              {
                prop: "positionName",
                label: this.$t("org.label.PositionName"),
                width: null,
                align: "center"
              }, //岗位名称
              {
                prop: "orgTypeName",
                label: this.$t("org.label.OrganizationType"),
                width: null,
                align: "center"
              }, //组织类型
              {
                prop: "orgType",
                label: this.$t("org.label.OrganizationType"),
                hidden: true,
                align: "center"
              }, //组织类型
              {
                prop: "isEnable",
                label: this.$t("org.label.isEnable"),
                width: null,
                align: "center"
              }, //是否启用
              {
                prop: "updateControlId",
                label: this.$t("org.label.concurrencyControl"), //并发控制
                align: "center",
                hidden: true
              }
            ],
      //表单查询数据
      formField: {
        positionCode: "",
        positionName: "",
        orgType: "",
        isEnable: ""
      }
    };
  },
  methods: {
    // 双击事件
    handleTableRowDbClick() {
      this.sendCode("positionId", "positionName");
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