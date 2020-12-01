<template>
    <div class="filter-container filter-params" style="height:100%">
    <div class="filter-container filter-title">储区信息维护</div>
        <one-table-template
      ref="multipleTable"
      :dynamic-api-config="dynamicApiConfig"
      :dynamic-buttons="dynamicButtons"
      :dynamic-components="tableComponents"
      :dynamic-table-cols="dynamicTableCols"
      :dynamic-form-fields="formField"
      :dynamic-is-show-more-btn="true"
      :dynamic-is-show-select="true"
      :dynamic-export-converts="dynamicExportConverts"
      :refresh-table-key="refreshTableKey"
    />
    </div>
</template>

<script>
import mixForm from '@/components/basicComponent/mixForm'
import mixButton from '@/components/basicComponent/mixButton'
import OneTableTemplate from "@/components/templates/oneTable"
import { orgApis } from '@/api/apiList/org'
// import { setDynamicFieldsData } from '@/utils/dataOperation'
// import { testApis } from '@/api/graphQLApiList/test'
export default {
  components: {
    mixForm,
    mixButton,
    OneTableTemplate
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    const viewPageCode = this.$route.path;
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode]);
    return {
      refreshTableKey: "0",
      // table表格查询API配置对象
      dynamicApiConfig: orgApis.stoTransferInstructionQueryByPage,
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
              .tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: "仓库名称",
                codeField: "apiCode",
                isRequire:true,
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                span: 24,
              },
              {
                compKey: "compKey2",
                labelName: "储位编码",
                codeField: "apiName",
                isRequire:true,
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                span: 24,
              },
              {
                compKey: "compKey3",
                labelName: "库位编码",
                codeField: "apiName",
                isRequire:true,
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                span: 24,
              },
              {
                compKey: "compKey4",
                labelName: "启用状态",
                codeField: "apiName",
                isRequire:true,
                component: () => import('@/components/org/isEnable/isEnableOne'),
                type: "dropdownList",
                isMust: true,
                span: 24,
              },
              {
                compKey: "compKey5",
                labelName: "备注",
                codeField: "apiName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true,
                span: 24,
              }
            ],
      // form 的表单对象
      formField: this.$utils.getFormField(
        this,
        {
          apiCode: "",
          apiName: "",
        },
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode]
      ),
      // 动态组件-按钮
      dynamicButtons:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          .length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons
          : [
              {
                compKey: "btnKey1",
                type: "primary",
                size: "small",
                name: "search",
                clickEvent: () => this.queryTable(1),
                text: "保存",
              },
              {
                compKey: "btnKey2",
                type: "",
                size: "small",
                icon: 'iconfont  icon-cancel',
                clickEvent: () => this.closeEdit(1),
                text: "重置",
              }
            ],
      // 动态组件-表格网格列
      dynamicTableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length >
          0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [],
      // 字段格式化转换（用于导出excel）（kvs表示键值转换）
      dynamicExportConverts: {
        isEnable: {
          convert: "kvs",
          kvs: {
            "1": "是",
            "0": "否",
          },
        },
      },
      // 单表格模版页面组件回调事件
      callbackObj: {
        // 当选择项发生变化时会触发该事件（多选时）
        onCheckSelectChange: (selection) => {
          this.handleSelectionChange(selection);
        },
      },
    };
  },
  mounted() {
    this.initData()
  },
  methods: {
    // form表单组件每个元素所占栅格栏数每行24格
    spanNum() {
      return 24
    },

    // 关闭弹窗
    closeEdit(type) {

    },

    // 表单数据初始化
    initData() {
      // if (JSON.stringify(this.dataForForm) === '{}') {
      //   this.titleName = '新增'
      //   this.dynamicFieldsData.senceCode = 'Ｘ'
      //   return
      // } else {
      //   this.titleName = '修改'
      //   this.dynamicFieldsData.id = this.dataForForm.id
      //   this.dynamicFieldsData.updateControlId = this.dataForForm.updateControlId
      //   this.dynamicFormFields.forEach((item) => {
      //     if (item.label === '接口编码') {
      //       item.disabled = true
      //     }
      //   })
      //   this.queryById()
      // }
    },

    // 编辑表单详情数据查询
    queryById() {
    //   const that = this
    //   const saveObj = { id: this.dataForForm.id }
    //   const apiQueryRow = ['apiCode', 'apiName']
    //   that.$utils.apiRrequest(that, 'mutation', testApis.dbSenceApiQueryFindObjectById, saveObj, (data) => {
    //     if (data) {
    //       const resultData = data.data[testApis.dbSenceApiQueryFindObjectById.ServiceCode].rows
    //       setDynamicFieldsData(this.dynamicFieldsData, resultData)
    //     }
    //   }, apiQueryRow)
    },

    // 保存
    save() {
    //   const that = this
    //   this.$refs['multipleForm'].$children[0].validate(valid => {
    //     if (valid) {
    //       that.$utils.apiRrequest(that, 'mutation', testApis.dbSenceApiMutationSaveObject, this.dynamicFieldsData, (data) => {
    //         if (data) {
    //           that.$message({
    //             message: '保存成功',
    //             type: 'success',
    //             duration: 2000
    //           })
    //           this.closeEdit(1)
    //         }
    //       })
    //     }
    //   })
    },

    // 重置
    // resetData() {
    //   const that = this
    //   this.dynamicFormFields.forEach((e, i) => {
    //     that.dynamicFieldsData[e.codeField] = ''
    //   })
    //   if (JSON.stringify(this.dataForForm) !== '{}') {
    //     this.dynamicFieldsData.apiCode = this.dataForForm.apiCode
    //   }
    //   this.$refs['multipleForm'].$children[0].clearValidate()
    // }
  }
}
</script>
<style scoped>
.filter-params {
    width: 500px;
    padding: 10px 5px 5px 5px;
    text-align: right;
    border: none;
    border-radius: 0px;
    margin:auto;
}
</style>
