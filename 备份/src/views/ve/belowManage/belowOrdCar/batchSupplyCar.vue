<!--
* description: 展车订单配置批量配车
* author: 
* createdDate: 
-->
<template>
  <section class="editBatchSupplyCar">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      width="1000px"
      center
      @close="sendCode"
    >
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :style-type="$store.state.app.dialogType"
      />
      <one-table-template
        ref="multipleTable"
        :dynamic-buttons="dynamicButtons"
        :dynamicComponents="tableComponents"
        :dynamicApiConfig="dynamicApiConfig"
        :dynamicTableCols="dynamicTableCols"
        :dynamicFormFields="formField"
        :dynamicIsShowMoreBtn="false"
        :dynamicIsInitTable="true"
      />
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          :icon="comp.icon"
          @click="comp.clickEvent"
        >{{ comp.text }}</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { orgApis } from '@/api/apiList/org'
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import OneTableTemplate from "@/components/templates/popupsOneTable";
export default {
  components: {
    OneTableTemplate,
    dialogHeader: () => import('@/components/dialogHeader') // 弹窗标题
  },
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  data() {
    const viewPageCode = 'batchSupplyCar-edit'
    return {

      // 保存API配置对象
      dynamicApiConfig: orgApis.mdmOrgInfoMutationSupplierSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          icon: "",
          clickEvent: () => this.confirm(),
          text: this.$t("sys.button.confirm")
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          icon: "",
          clickEvent: () => this.sendCode(),
          text: this.$t("sys.button.cancel")
        }
      ],
      dynamicButtons: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
      this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons.length > 0
        ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons : 
        [
          {
            compKey: 'btnKey1',
            type: '',
            size: 'small',
            // clickEvent: () => this.queryTable(1),
            text: "批量配车", 
          },
        ],

      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path] &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols &&
        this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[this.$route.path].tableCols
          : [
        {
          prop: 'carOrder',
          label: '车辆单号'
        },
        {
          prop: 'belowResult',
          label: '配车结果'
        },
        {
          prop: 'allotOrder',
          label: '调拨订单号'
        },
        {
          prop: 'carConfig',
          label: '车型配置'
        },
        {
          prop: 'VINCode',
          label: 'VIN码'
        },
        {
          prop: 'deliveryCity',
          label: '交付城市'
        },
        {
          prop: 'deliveryCenter',
          label: '交付中心'
        },
        {
          prop: 'carStatus',
          label: '车辆状态'
        },
        {
          prop: 'createTime',
          label: '创建时间'
        },
        {
          prop: 'creator',
          label: '创建人'
        },
      ],
      // 标题
      textMap: {
        edit: '手动配置', 
      },
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        
      },
      initForm: {}
    }
  },
  created() {

  },
  methods: {
  }
}
</script>
<style scoped>
.promptSpan{
  position: absolute;
    bottom: 26px;
    right: 335px;
    color: #e70020;
}
</style>
