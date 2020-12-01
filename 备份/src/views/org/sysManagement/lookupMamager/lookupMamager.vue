<!--
* description: 值列表管理
* author: wangcx
* createdDate: 2019-11-19
-->
<template>
  <div class="app-container app-container-table" id="twoTable">
    <el-main class="leftMail MailOne">
      <one-table-template :ref="leftTable.tableRef"
        :key="leftTable.oneTableKey"
        :dynamicButtons="leftTable.tableButtons"
        :dynamicComponents="leftTable.tableComponents"
        :dynamicApiConfig="leftTable.apiConfig"
        :dynamicTableCols="leftTable.tableCols"
        :dynamicFormFields="leftTable.formField"
        :dynamicIsShowSelect="false"
        :dynamicIsInitTable="true"
        :callbackObj="leftTable.callbackObj"
        :dynamicParentTableRef="leftTable.tableRef"
        :dynamicPagerCount="5"
      />
    </el-main>
    <el-main class="rightElmain MailOne">
      <one-table-template :ref="rightTable.tableRef"
        :key="rightTable.oneTableKey"
        :dynamicButtons="rightTable.tableButtons"
        :dynamicComponents="rightTable.tableComponents"
        :dynamicApiConfig="rightTable.apiConfig"
        :dynamicTableCols="rightTable.tableCols"
        :dynamicFormFields="rightTable.formField"
        :dynamicUnFormFields="rightTable.unFormField"
        :dynamicIsShowSelect="false"
        :dynamicIsInitTable="false"
        :callbackObj="rightTable.callbackObj"
        :dynamicParentTableRef="rightTable.tableRef"
        :dynamicPagerCount="5"
      />
    </el-main>
  </div>
</template>
<script>
import { moreTableWithViewTemplateMixins } from '@/components/mixins/moreTableWithViewTemplateMixins';
import { orgApis } from '@/api/apiList/org'
import OneTableTemplate from '@/components/templates/oneTable'
import Vue from "vue";
export default {
  name:"lookupMamager",
  // 组件混入对象
  mixins: [moreTableWithViewTemplateMixins],
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData(['lookupMamagerLeft','lookupMamagerRight'], function() {
      next();
    });
  },
  components: {
    OneTableTemplate
  },
  data() {
    // 左网格pageCode
    const leftPageCode = 'lookupMamagerLeft'
    // 右网格pageCode
    const rightPageCode = 'lookupMamagerRight'
    // 绑定事件配置化事件
    // this.$ConfigCache.CacheConfig.bindEvent(this, [leftPageCode, rightPageCode])
    return {
      // 定义watch对象（用于组件联动监控）
      watchObj: [
        { formFieldName: 'leftTable.formField', tableComponentsName: 'leftTable.tableComponents', tableRef: 'leftTableRef' },
        { formFieldName: 'rightTable.formField', tableComponentsName: 'rightTable.tableComponents', tableRef: 'rightTableRef' }
      ],
      // 左网格
      leftTable: {
        // 网格Ref
        tableRef: 'leftTableRef',
        // 网格Key
        oneTableKey: 'leftTable',
        // 网格查询API配置对象
        apiConfig: orgApis.mdsLookupTypeQueryByPage,
        // 动态组件-按钮
        tableButtons: [
          {
            compKey: "btnKey1",
            type: "primary",
            size: "small",
            clickEvent: () => this.query(this.leftTable.tableRef),
            text: "查询",
            name: "search", //按钮图标样式
            position: "right",
            fuzzySearch: true
          },
          {
            compKey: "btnKey4",
            type: "",
            size: "small",
            clickEvent: () => this.reset(this.leftTable.tableRef),
            text: "重置",
            name: "reset",
            position: "right"
          }
        ],
        // 动态组件-查询条件
        tableComponents:
          this.$ConfigCache.CacheConfig.cacheData[leftPageCode] &&
          this.$ConfigCache.CacheConfig.cacheData[leftPageCode].tableComponents.length > 0
            ? this.$ConfigCache.CacheConfig.cacheData[leftPageCode].tableComponents
            : [
          {
            compKey: "compKey1",
            span: 12,
            labelName: "值列表编码",
            codeField: "lookupTypeCode",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            // change: this.getCompValue,
            // changed: this.getCompValue,
            isMust: true
          },
          {
            compKey: "compKey2",
            span: 12,
            labelName: "值列表名称",
            codeField: "lookupTypeName",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          },
          {
            compKey: "compKey3",
            span: 12,
            labelName: "启用状态",
            codeField: "isEnable",
            component: () => import("@/components/org/isEnable/isEnableOne"),
            type: "dropdownList",
            isMust: false
          },
          {
            compKey: "compKey4",
            span: 12,
            labelName: "是否内置",
            codeField: "isSystem",
            component: () => import("@/components/org/isEnable/isEnable"),
            type: "dropdownList",
            isMust: false
          }
        ],
        // 动态生成网格列
        tableCols:
          this.$ConfigCache.CacheConfig.cacheData[leftPageCode] &&
          this.$ConfigCache.CacheConfig.cacheData[leftPageCode].tableCols.length > 0
            ? this.$ConfigCache.CacheConfig.cacheData[leftPageCode].tableCols
            : [
          {
            prop: "lookupTypeCode",
            label: "值列表编码",
            width: null,
            align: "center"
          },
          {
            prop: "lookupTypeName",
            label: "值列表名称",
            width: null,
            align: "center"
          },
          // { prop: "lookupTypeName", label: "值列表名称", width: null, align: "center", isComponent: true,
          //   comps: [
          //     {
          //       compKey: "propKey1",
          //       isShowLabel: false,
          //       codeField: "lookupTypeName",
          //       clickEvent: () => null,
          //       change: this.getCompValue,
          //       changed: this.getCompValue,
          //       component: () => import("@/components/org/commonInput")
          //     }
          //   ]
          // },
          { prop: "isEnable", label: "启用状态", width: null, align: "center", isComponent: true,
            comps: [
              {
                compKey: "propKey1",
                isShowLabel: false,
                codeField: "isEnable",
                clickEvent: () => null,
                component: () => import("@/components/org/isEnable/isEnableText")
              }
            ]
          },
          {
            prop: "isSystem",
            label: "是否内置",
            width: null,
            align: "center",
            isComponent: true,
            comps: [
              {
                compKey: "propKey1",
                isMul: false,
                isShowLabel: false,
                codeField: "isSystem",
                clickEvent: () => null,
                component: () => import("@/components/org/isGlobalShow")
              }
            ]
          },
          {
            prop: "updateControlId",
            label: "并发控制",
            width: null,
            align: "center",
            hidden: true
          }
        ],
        // 表单查询数据
        formField: this.$utils.getFormField(this, {
          lookupTypeCode: "",
          lookupTypeName: "",
          isSystem: "",
          isEnable: ""
        }, this.$ConfigCache.CacheConfig.cacheData[leftPageCode]),
        // 回调方法对象
        callbackObj: {
          // 网格点击回调事件
          onRowClick: (currentRow) => {
            this.onLeftRowClick(currentRow)
          }
        }
      },

      // 右网格
      rightTable: {
        // 网格Ref
        tableRef: 'rightTableRef',
        // 网格Key
        oneTableKey: 'rightTable',
        // 网格查询API配置对象
        apiConfig: orgApis.mdsLookupValueQueryByPage,
        // 动态组件-按钮
        tableButtons: [
          {
            compKey: "btnKey1",
            type: "primary",
            size: "small",
            clickEvent: () => this.save(this.rightTable.tableRef),
            text: "保存",
            name: "preservation",
            position: "right"
          },
          {
            compKey: "btnKey3",
            type: "",
            size: "small",
            clickEvent: () => this.resetRight(this.rightTable.tableRef),
            text: "重置",
            name: "reset",
            position: "right"
          }
        ],
        // 动态组件-查询条件
        tableComponents:
          this.$ConfigCache.CacheConfig.cacheData[rightPageCode] &&
          this.$ConfigCache.CacheConfig.cacheData[rightPageCode].tableComponents.length > 0
            ? this.$ConfigCache.CacheConfig.cacheData[rightPageCode].tableComponents
            : [
          // 显示组件
          // {
          //   compKey: "compKey0",
          //   span: 12,
          //   labelName: "值列表编码",
          //   codeField: "lookupTypeCode",
          //   isRequire: true,
          //   disabled: true,
          //   component: () => import("@/components/org/commonInput"),
          //   type: "inputText",
          //   isMust: true
          // },
          {
            compKey: "compKey1",
            span: 12,
            labelName: "值列表明细编码",
            codeField: "lookupValueCode",
            isRequire: true,
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true
          },
          {
            compKey: "compKey2",
            span: 12,
            labelName: "值列表明细名称",
            isRequire: true,
            codeField: "lookupValueName",
            component: () => import("@/components/org/commonInput"),
            type: "inputText",
            isMust: true,
            fuzzySearch: true
          },
          {
            compKey: "compKey4",
            span: 12,
            labelName: "启用状态",
            codeField: "isEnable",
            component: () => import("@/components/org/isEnable/isEnableOne"),
            type: "dropdownList",
            isMust: false,
            isRequire: true
          }
        ],
        // 动态生成网格列
        tableCols:
          this.$ConfigCache.CacheConfig.cacheData[rightPageCode] &&
          this.$ConfigCache.CacheConfig.cacheData[rightPageCode].tableCols.length > 0
            ? this.$ConfigCache.CacheConfig.cacheData[rightPageCode].tableCols
            : [
          {
            prop: "lookupValueCode",
            label: "值列表明细编码",
            width: null,
            align: "center"
          },
          {
            prop: "lookupValueName",
            label: "值列表明细名称",
            width: null,
            align: "center"
          },
          { prop: "isEnable", label: "启用状态", width: null, align: "center", isComponent: true,
            comps: [
              {
                compKey: "propKey1",
                isShowLabel: false,
                codeField: "isEnable",
                clickEvent: () => null,
                component: () => import("@/components/org/isEnable/isEnableText")
              }
            ]
          },
          {
            prop: "updateControlId",
            label: "并发控制",
            width: 0,
            align: "center",
            hidden: true
          },
          {
            prop: "uid",
            label: "主键id",
            width: 0,
            align: "center",
            hidden: true
          }
        ],
        // 表单数据
        formField: this.$utils.getFormField(this, {
          lookupValueCode: "",
          lookupValueName: "",
          isEnable: "1",
          lookupTypeName: "",
          lookupTypeCode: "",
          dlrId: "HOST",
          column1:"",
          updateControlId: "",
          uid: ""
        }, this.$ConfigCache.CacheConfig.cacheData[rightPageCode]),
        // 排除表单查询条件
        unFormField: {
          lookupValueCode: "",
          lookupValueName: "",
          isEnable: "",
          lookupTypeName: "",
          dlrId: "HOST",
          updateControlId: "",
          column1:"",
          // index:'',
          uid: ""
        },
        // 回调方法对象
        callbackObj: {
          // 网格点击回调事件
          onRowClick: (currentRow) => {
            this.onRightRowClick(currentRow)
          }
        }
      }
    }
  },
  methods: {
    // 左边网格行点击
    onLeftRowClick(currentRow) {
      // 复制对象 1(默认):创建、2:清空、3:不操作
      if (currentRow) {
        this.$utils.deepClone(this.rightTable.formField, currentRow, '3')
      }
      this.resetRight()
      this.query(this.rightTable.tableRef, false)
    },
    // 右边网格行点击
    onRightRowClick(currentRow) {
      // 复制对象 1(默认):创建、2:清空、3:不操作
      this.$utils.deepClone(this.rightTable.formField, currentRow, '3')
    },
    // 重置右网格查询条件
    resetRight(tableRef) {
      // 复制对象 1(默认):创建、2:清空、3:不操作
      this.$utils.deepClone(this.rightTable.formField, this.rightTable.unFormField, '3')
    },
    // 保存
    save(tableRef) {
      let that = this
      if(that.$refs.rightTableRef.currentRow === null || undefined){
        that.rightTable.formField.column1 = ""
      }else{
        that.rightTable.formField.column1 = that.$refs.rightTableRef.currentRow.lookupValueCode
      }

      if(that.rightTable.formField.isEnable === ""||undefined){
        that.$message({
              message: "是否启用不能为空",
              type: "warning",
              duration: 2000
            });
            return;
      }
      // validpopups 组件弹窗  validpage 表单查询
      that.$utils.validataMoth(that, 'validpage', null, tableRef)
      // if (that.valid) {
        let queryObj = {
          // 保存mutation
          type: "mutation",
          // api配置
          apiConfig: orgApis.mdsLookupValueMutationSave,
          //条件/实体参数（变量），根据typeParam中的定义配置
          variables: {
            //当前中台使用的名称有dataInfo、info，具体查看API文档
            dataInfo: that.rightTable.formField
          }
        };
        //转换了中台请求格式数据
        var paramD = that.$getParams(queryObj);
        // 调用中台API方法（可复用）
        that.$requestAPI(paramD).then(response => {
          if (response.result === '0') {
            return
          }
          var getResult = response;
          if (getResult.result === "1") {
            that.$message({
              message: getResult.msg,
              type: "success",
              duration: 2000
            });
            // 重置表单
            that.resetRight(tableRef)
            // 重新加载
            that.onLeftRowClick(null);
          } else {
            that.$message({
              message: getResult.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
      // }
    },
    // 获取值
    getCompValue(val, index, row) {
      console.info(val)
      console.info(index)
      console.info(row)
    }
  }
}
</script>
