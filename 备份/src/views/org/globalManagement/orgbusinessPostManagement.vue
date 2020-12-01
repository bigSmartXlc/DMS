/**
* description: 组织架构>全局权限管理>业务岗位管理
* author: liyanm
* createdDate: 2019-07-25
*/
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicIsShowSelect="false"
      :callbackObj="callbackObj"
      :dynamicExportConverts="exportConverts"
    />

    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import Vue from "vue";
export default {
  name: "orgbusinessPostManagement",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins],
  components: {
    OneTableTemplate,
    Edit: () => import("./edit")
  },
  // 阻塞路由预加载网格中组件的数据
  beforeRouteEnter(to, from, next) {
    Vue.prototype.$ConfigCache.CacheConfig.initData([to.path,'businessPosts-Edit'], function() {
      next();
    });
  },
  data() {
    // 页面标识（与上面beforeRouteEnter中的对应）
    let viewPageCode = this.$route.path
    // 绑定事件配置化事件
    this.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])
    return {
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
          text: this.$t("sys.button.query")//查询
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          name: "add",
          position: "left",
          clickEvent: () => this.add(),
          text: this.$t("sys.button.add")//新增
        },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          name: "temporaryStorage",
          position: "left",
          clickEvent: () => this.edit1(),
          text: this.$t("sys.button.modify")//修改
        },
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          name: "reset",
          position: "right",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")//重置
        }
      ],
      // 动态组件-查询条件
      tableComponents:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents
          : [
              {
                compKey: "compKey1",
                labelName: this.$t("org.label.StationCode"),//业务岗位编码
                codeField: "stationCode",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey2",
                labelName:  this.$t("org.label.StationName"),//业务岗位名称
                codeField: "stationName",
                component: () => import("@/components/org/commonInput"),
                type: "inputText",
                isMust: true
              },
              {
                compKey: "compKey4",
                labelName:  this.$t("org.label.isEnableCn"),//是否启用
                codeField: "isEnable",
                component: () => import("@/components/org/isEnable/isEnableOne"),
                type: "dropdownList",
                isMust: true
              }
            ],
      // 动态生成网格列
      tableCols:
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode] &&
        this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0
          ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols
          : [ 
              {
                prop: "column1",
                label: "岗位类型",//业务岗位编码
                width: null,
                align: "center"
              },
              {
                prop: "stationCode",
                label: this.$t("org.label.StationCode"),//业务岗位编码
                width: null,
                align: "center"
              },
              {
                prop: "stationName",
                label: this.$t("org.label.StationName"),//业务岗位名称
                width: null,
                align: "center"
              },
              {
                prop: "deptName",
                label: this.$t("org.label.affiliatedOrganization"),//所属组织
                width: null,
                align: "center"
              },
               {
                prop: "isDlrStation",
                label: "组织类型",//所属组织
                width: null,
                align: "center"
              },
              {
                prop: "stationId",
                label: this.$t("org.label.stationName"),//岗位ID
                width: 350,
                hidden: true,
                align: "center"
              },
              {
                prop: "isEnable",
                label: this.$t("org.label.isEnableCn"),//是否启用
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "column2",
                label: this.$t("org.label.isEnableCn"),//启用状态
                width: null,
                align: "center"
              },
              {
                prop: "deptId",
                label: "部门ID",//部门ID
                width: null,
                align: "center",
                hidden: true
              },
               {
                prop: "orgId",
                label: "部门ID",//部门ID
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "column1",
                label: "对应工作台方案",//对应工作台方案
                width: null,
                align: "center",
                hidden: true
              },
              {
                prop: "updateControlId",
                label: "并发ID",//并发ID
                width: null,
                align: "center",
                hidden: true
              }
            ],
      //表单查询数据
      formField: this.$utils.getFormField(this, {
        stationName: "",
        stationCode: "",
        isEnable: '',
        isDlrStation: this.$store.getters.orgInfo.ORG_TYPE==="1"?1:0,
        deptId: this.$store.getters.orgInfo.COMPANY_ID || ''
      }, this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),
      callbackObj: {
        onQueryReturn: response => {
          this.onQueryReturn(response)
        },
        resetDialogKey: false,
      },
      // exportConverts: {
      //   isDlrStation: {
      //     convert: "kvs",
      //     kvs: {
      //       "1": "经销商",
      //       "0": "主机厂"
      //     }
      //   }
      // },
    };
  },
  methods: {
    onQueryReturn(response){
      let list = [];
      list = response.rows;
      for (let i = 0; i < list.length; i++) {
         if(list[i].isDlrStation ==="0"){
            list[i].column1 = '主机厂岗位'
          }else if(list[i].isDlrStation ==="1"){
              if((list[i].orgId ===''||list[i].orgId ===null)){
                list[i].column1 = '经销商通用岗位'
              }else{
                list[i].column1 = '经销商自建岗位'
              }
          }
        if (list[i].isEnable === '1') {
          list[i].column2 = '启用'
        } else if (list[i].isEnable === '0') {
          list[i].column2 = '停用'
        }
        if (list[i].isDlrStation === '1') {
          list[i].isDlrStation = '经销商'
        } else if (list[i].isDlrStation === '0') {
          list[i].isDlrStation = '主机厂'
        }
      }
    },
    edit1(){
      if (this.$refs.multipleTable.currentRow.column1 =="经销商通用岗位") {
        this.$message({
          message: "此账号不能修改通用岗位信息",
          type: "warning",
          duration: 2000
        });
        return;
      }
      else{
        this.edit()
      }
      
    }
  }
};
</script>
