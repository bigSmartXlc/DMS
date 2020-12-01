<!--
* description: 组件编辑弹窗
* author: limwm
* createdDate: 2019-11-26
-->
<template>
  <section class="editCarBrand">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="快捷代码生成"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      :key="popupsTableKey"
      width="500px"
    >
      <dialogHeader slot="title" title="快捷代码生成" :styleType="$store.state.app.dialogType"></dialogHeader>
      <div class="filter-container filter-params" v-loading="listLoading" >
        <el-row :gutter="26" ref="vailComponentList">
          <component
            v-for="comp in tableComponents.filter(o => o.isMust === true)"
            :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
            :validrule="comp.validrule"
            :key="comp.compKey"
            :codeField="comp.codeField"
            :textField="comp.textField"
            :popupsKey="comp.compKey"
            :is="comp.component"
            :code="formField[comp.codeField]"
            @changeCode="getComponentCode"
            @focusCode="getFocusCode"
            :disabled="comp.disabled"
            :isRequire="comp.isRequire"
            :isShow="comp.isShow"
            :isMul="comp.isMul"
            :span="comp.span || 8"
            :labelName="comp.labelName"
            :lookuptype="comp.lookuptype"
            :dateOptionsType="comp.dateOptionsType"
          ></component>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer" >
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
import request from "@/utils/request";
import store from "@/store";
import config from "@/utils/config";
export default {
  // 组件混入对象
  mixins: [formMixins],
  components: {
    dialogHeader: () => import("@/components/dialogHeader") //弹窗标题
  },
  data() {
    return {
      listLoading:false,
      // 保存API配置对象
      apiConfig: orgApis.proComponentTypeMutationSave,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey3",
          type: "primary",
          size: "small",
          clickEvent: () => this.confirm(),
          text: this.$t("org.label.confirm") //确认
        },
        {
          compKey: "btnKey1",
          type: "",
          size: "small",
          clickEvent: () => this.sendCode(),
          text: this.$t("org.label.cancel") //取消
        }
      ],
      // 动态组件-查询条件
      tableComponents: [],
      // 静态组件-查询条件
      staticTableComponents: [
        {
          compKey: "compKey1",
          labelName: "中台中心", //api编码
          codeField: "busiCenter",
          isRequire: true,
          component: () =>
            import(
              "@/views/org/configurablePageManagement/comp/busiCenter.vue"
            ),
          type: "inputText",
          span: 22,
          isMust: true
        },
        {
          compKey: "compKey2",
          labelName: "api编码", //api编码
          codeField: "api",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          span: 22,
          isMust: true
        }
      ],
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        busiCenter: "",
        api: ""
      }
    };
  },
  created() {
    // this.getApiInfo();
  },
  methods: {
    getApiInfo() {
      const that = this
      that.listLoading = true
      var data = {
        query:
          " query IntrospectionQuery{ __schema{ queryType{name} mutationType{name} subscriptionType{name} types{ ...FullType } directives{ name description locations args{ ...InputValue } } } }  fragment FullType on __Type{ kind name description fields(includeDeprecated:true){ name description args{ ...InputValue } type{ ...TypeRef } isDeprecated deprecationReason } inputFields{ ...InputValue } interfaces{ ...TypeRef } enumValues(includeDeprecated:true){ name description isDeprecated deprecationReason } possibleTypes{ ...TypeRef } }  fragment InputValue on __InputValue{ name description type{...TypeRef} defaultValue }  fragment TypeRef on __Type{ kind name ofType{ kind name ofType{ kind name ofType{ kind name ofType{ kind name ofType{ kind name ofType{ kind name ofType{ kind name } } } } } } } }"
      };
      var apiUrl =
        "/ly/mp/busicen/" + this.formField.busiCenter + "/graphql.do";
      request({
        url: apiUrl + config.cH + "token=" + store.getters.token,
        method: "post",
        data
      }).then(response => {
        if (response.result === "1") {
          var apiInfoList = response.data.__schema.types.filter(o => o.name === "Query")[0];
          var apiInfo = apiInfoList.fields.filter(o => o.name === this.formField.api)[0]
          if (!apiInfo) {
            this.$message({
              message: '未找到api编码对应的信息，请重新输入查询的api！',
              type: "warn",
              uration: 2000
            });
            that.listLoading = false
            return
          }
          // 找到输入类型
          var dataInfoCode = apiInfo.args.filter(o => o.name === 'dataInfo')[0].type.name
          var dataInfo = response.data.__schema.types.filter(o => o.name === dataInfoCode)[0]
          var rowCode =  response.data.__schema.types.filter(o => o.name === apiInfo.type.name)[0]
          var listResult =  response.data.__schema.types.filter(o => o.name === apiInfo.type.name)[0]
          var rowsCode = listResult.fields.filter(o => o.name === 'rows')[0].type.ofType.name
          var rows = response.data.__schema.types.filter(o => o.name === rowsCode)[0]
          // 生成tableComponents和formFields
          var inputFields = dataInfo.inputFields
          var tableComponents = ''
          var formFields = ''
          for(var k in inputFields){
            var comp = '\n{'+
              'compKey: "compKey'+(parseInt(k)+1)+'", '+
              'labelName:"'+inputFields[k].description+'", '+
              'codeField:"'+inputFields[k].name+'", '+
              'component: () => import("@/components")'+", "+
              'type: ""'+", "+
              'isMust:false'+ 
              "},"
            var codeField = ''
            if(parseInt(k)=== inputFields.length-1){
              codeField = '\n'+inputFields[k].name+':""//'+inputFields[k].description
            }else{
              codeField = '\n'+inputFields[k].name+':"",//'+inputFields[k].description
            }
            formFields = formFields + codeField
            tableComponents = tableComponents+comp
          } 
          tableComponents = tableComponents.substr(1)
          tableComponents = tableComponents.substr(0, tableComponents.length-1);
          formFields = formFields.substr(1)
          //生成tableCols
          var fields = rows.fields 
          var tableCols = ''
          for(var k in fields){
            var col = '\n{'+
              'prop:"'+fields[k].name+'", '+
              'label:"'+fields[k].description+'", '+
              'width: null, align: "center",hidden:false},'
            tableCols = tableCols + col
          }
          tableCols = tableCols.substr(1)
          tableCols = tableCols.substr(0, tableCols.length-1);
          that.codeGenerate(tableComponents, formFields, tableCols)
          that.listLoading = false
        } else {
          this.$message({
            message: response.msg,
            type: "warn",
            uration: 2000
          });
        }
        that.listLoading = false
      });
    },
    confirm() {
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        this.getApiInfo();
      }
    },
    codeGenerate(tableComponents, formField, tableCols){
      var myDate = new Date()
      var code = '<!--'+
        '\n* description: '+
        '\n* author: '+
        '\n* createdDate: '+this.$utils.parseTime(new Date(),'{y}-{m}-{d}')+
        '\n-->'+
        '\n<template>'+
        '\n<div class="app-container app-container-table">'+
        '\n<one-table-template ref="multipleTable"'+
        '\n:key="oneTableKey"'+
        '\n:dynamicButtons="tableButtons"'+
        '\n:dynamicComponents="tableComponents"'+
        '\n:dynamicApiConfig="apiConfig"'+
        '\n:dynamicTableCols="tableCols"'+
        '\n:dynamicFormFields="formField"'+
        '\n:dynamicIsShowSelect="false"'+
        '\n/>'+
        '\n</div>'+
        '\n</template>'+
        '\n<script>'+
        '\nimport { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";'+
        '\nimport {Apis } from "@/api/apiList/"'+
        '\nimport Vue from "vue"'+
        '\n'+
        '\nexport default {'+
        '\nname:"'+this.formField.api+'",'+
        '\n// 组件混入对象'+
        '\nmixins: [oneTableWithViewTemplateMixins],'+
        '\ncomponents: {'+
        '\nOneTableTemplate,'+
        '\n},'+
        '\n// 阻塞路由预加载网格中组件的数据'+
        '\nbeforeRouteEnter(to, from, next) {'+
        '\nVue.prototype.$ConfigCache.CacheConfig.initData('+
        '\n// 加载当前页面配置'+
        '\nto.path,function(){next()})'+
        '\n},'+
        '\ndata() {'+
        '\n// 页面标识（与上面beforeRouteEnter中的对应）'+
        '\nlet viewPageCode = this.$route.path'+
        '\n// 绑定事件配置化事件'+
        '\nthis.$ConfigCache.CacheConfig.bindEvent(this, [viewPageCode])'+
        '\nreturn {'+
      '\n// 网格查询API配置对象'+
        '\napiConfig: Apis.'+this.formField.api+","+
        '\n// 动态组件-按钮'+
        '\ntableButtons:this.$ConfigCache.CacheConfig.cacheData[viewPageCode] && this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableButtons : ['+
        '\n{compKey: "btnKey1", type: "primary", size: "small", clickEvent: () => this.queryTable(1), text: this.$t("sys.button.query"),name: "search",position: "right"},'+
        '\n{compKey: "btnKey2", type: "", size: "small", clickEvent: () => this.reset(), text: this.$t("sys.button.reset"),name: "reset",position: "right"},'+
      '\n{compKey: "btnKey3", type: "", size: "small", clickEvent: () => this.exportExcel(), text: this.$t("sys.button.export"),name: "export",position: "left"}'+
        '\n],'+
        '\n// 动态组件-查询条件'+
        '\ntableComponents: this.$ConfigCache.CacheConfig.cacheData[viewPageCode] && this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableComponents : ['+
        '\n'+ tableComponents+
        '\n],'+
        '\n// 动态生成网格列'+
        '\ntableCols: this.$ConfigCache.CacheConfig.cacheData[viewPageCode]&& this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols.length > 0 ? this.$ConfigCache.CacheConfig.cacheData[viewPageCode].tableCols: ['+
        '\n'+ tableCols+
        '\n],'+
        '\n// 表单查询数据'+
        '\nformField: this.$utils.getFormField(this, {'+
        '\n'+ formField +
        '\n}, this.$ConfigCache.CacheConfig.cacheData[viewPageCode]),'+
        '\n}'+
        '\n},'+
        '\nmethods: {'+
        '\n}'+
        '\n}'+
        '\n<'+ "/script>"
      // this.$utils.downloadFile(code,this.formField.api+".vue",'vue')
      var fileName = this.formField.api+".vue"
        var blob = new Blob([code], { type: 'vue' })
        if (window.navigator.msSaveOrOpenBlob) { // IE10
          navigator.msSaveBlob(blob, fileName)
        } else {
          var url = window.URL.createObjectURL(blob)
          var aLink = document.createElement('a')
          aLink.style.display = 'none'
          aLink.href = url
          aLink.setAttribute('download', fileName)
          document.body.appendChild(aLink)
          aLink.click()
          document.body.removeChild(aLink) // 下载完成移除元素
          window.URL.revokeObjectURL(url) // 释放对象
        }
      this.$message({
        message: "代码生成成功！",
        type: "success",
        uration: 2000
      });
    },
  }
};
</script>
