<!--
* description: 可配置页面组件管理
* author: linzewen
* createdDate: 2019-09-11
-->
<template>
  <div class="app-container app-container-table">
    <one-table-template
      ref="multipleTable"
      :dynamicButtons="tableButtons"
      :dynamicComponents="tableComponents"
      :dynamicApiConfig="apiConfig"
      :dynamicTableCols="tableCols"
      :dynamicFormFields="formField"
      :dynamicUnFormFields="unFormField"
      :dynamicIsShowSelect="true"
      :dynamicIsColumnDrop="true"
    />
    <edit
      :dynamicEditRowData="editRowData"
      :popupsVisible="editPopupsVisible"
      :key="editPopupsKey"
      :popupsState="editPopupsState"
      :options="optionDatas"
      :colsOptionDatas="colsOptionDatas"
      @close="close"
    ></edit>
  </div>
</template>
<script>
import { oneTableWithViewTemplateMixins } from "@/components/mixins/oneTableWithViewTemplateMixins";
import { orgApis } from "@/api/apiList/org";
import OneTableTemplate from "@/components/templates/oneTable";
import { tagsViewMixin } from "@/layout/components/TagsView/tagsViewMixin";
import request from "@/utils/request";
import config from "@/utils/config";
import store from "@/store";
import storage from '@/utils/storage'

export default {
  name: "orgconfigurablePageComponentsManage",
  // 组件混入对象
  mixins: [oneTableWithViewTemplateMixins, tagsViewMixin],
  components: {
    OneTableTemplate,
    Edit: () => import("./editComponents")
  },
  watch:{
    $route(val){
      if(this.formField.pageId !== "" && this.$route.query.pageId !== undefined && this.$route.query.pageId !== this.formField.pageId){
        this.formField.pageId = this.$route.query.pageId;
        this.formField.pageName = this.$route.query.pageName;
        this.queryTable();
        this.queryCodeFields()
        this.queryColsData();
      }
    }
  },
  created() {
    if (this.$route.query != null) {
      // 判断传入query参数，初始化数据
      if (this.$route.query.pageId != null && this.$route.query.pageId !== "") {
        this.formField.pageId = this.$route.query.pageId;
        this.formField.pageName = this.$route.query.pageName;
      }
    }
  },
  mounted() {
    this.queryTable();
    this.queryCodeFields();
    this.queryColsData();
  },
  data() {
    return {
      // 网格查询API配置对象
      apiConfig: orgApis.proConfigComponentQueryByPage,
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.queryTable(),
          name:'search',
          position:'right',
          text: this.$t('org.label.query')//查询
        },
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.add(),
          text: this.$t('sys.button.add'),//新增
          name:'add',
          position:'left'
        },
        {
          compKey: "btnKey3",
          type: "",
          size: "small",
          name:'reset',
          position:'right',
          clickEvent: () => this.reset(),
          text: this.$t('sys.button.reset')//重置
        },
        {
          compKey: "btnKey4",
          type: "",
          size: "small",
          clickEvent: () => this.copyComp(),
          text: this.$t('org.label.copyTheComponents'),//复制组件
          position:'left'
        }
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: this.$t('org.label.pageName'), //"页面名称"
          codeField: "pageName",
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          // isRequire: true,
          isMust: true,
          disabled: true
        },
        {
          compKey: "compKey2",
          labelName: this.$t('org.label.compType'), //所属类型
          codeField: "compType",
          lookuptype: "PRO0003",
          component: () => import("@/components/org/LookupValue"),
          type: "inputText",
          isMust: true
        },
        {
          compKey: "compKey3",
          labelName: this.$t('org.label.isEnable'), //是否启用
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey4",
          labelName: this.$t('org.label.lang'),//语言类型
          codeField: "lang",
          lookuptype: "PRO0004",
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isRequire: true,
          isMust: true,
          isMul: false
        },
        {
          compKey: "compKey5",
          labelName: this.$t('org.label.pageArea'),//页面区域
          codeField: "pageArea",
          component: () => import("@/components/org/commonInput"),
          type: "dropdownList",
          isMust: false,
          isMul: false
        },
        {
          compKey: "compKey6",
          labelName: this.$t('org.label.isEnable'),//"是否可用",
          codeField: "isEnable",
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: false
        }
      ],
      // 动态生成网格列
      tableCols: [
        {prop: "controlBtn",label: this.$t('org.label.operation'),codeField: "controlBtn", width: 120, align: "center",isComponent: true,
          comps: [{compKey: "propKey0",labelName: this.$t('sys.button.edit'),codeField: "editControlBtn",clickEvent: this.edit,component: () => import("@/components/org/linkButton") },
            {compKey: "propKey1",labelName: this.$t('sys.button.delete'),codeField: "delControlBtn",clickEvent: this.del,component: () => import("@/components/org/linkButton") }]
        },
        //标签名称
        {prop: "labelName",label: this.$t('org.label.labelName'),width: 170, align: "center",hidden: true},
        //页面ID
        {prop: "pageId",label: this.$t('org.label.pageId'), align: "center",hidden: true},
        //页面名称
        {prop: "proConfigPageviewExtend.pageName",label: this.$t('org.label.pageName'),width: 250,align: "center"},
        //排序
        {prop: "sort",label: this.$t('org.label.sort'),width: null,align: "center"},
        //是否默认展示
        {prop: "isMust",label: this.$t('org.label.isMust'),width: 130,isFlag:true,align: "center"},
        //所属类型
        {prop: "compType",label: this.$t('org.label.compType'),align: "center", hidden: true},
        //所属类型
        {prop: "compTypeCn",label: this.$t('org.label.compType'),width: 100,align: "center"},
       //页面区域
        {prop: "pageArea",label: this.$t('org.label.pageArea'),width: 120,align: "center"},
        //主键Id
        {prop: "compId",label: this.$t('org.label.compId'),align: "center",hidden: true},
        //是否显示标签
        {prop: "isShowLabel",label: this.$t('org.label.isShowLabel'),isFlag:true,width: 120,align: "center"},
        //标签名称
        {prop: "proConfigLangExtend.langLabel",label: this.$t('org.label.labelName'),width: 150,align: "center"},
        //标签名称（多语言）
        {prop: "proConfigLangExtend.langType",label: this.$t('org.label.langType'),width: 150,align: "center"},
         //组件Key
        {prop: "compKey", label: this.$t('org.label.compKey'), width: 120, align: "center" },
        //绑定数据字段
        {prop: "codeField",label: this.$t('org.label.codeField'),width: 120,align: "center"},
        //绑定文本字段
        {prop: "textField",label: this.$t('org.label.textField'),width: 120,align: "center"},
        //条件字段
        {prop: "parentFields",label: this.$t('org.label.parentFields'),width: null,align: "center"},
        //组件路径
        {prop: "component",label: this.$t('org.label.component'),width: 300,align: "center"},
        //组件类型
        {prop: "controlType",label: this.$t('org.label.controlType'), hidden: true,align: "center"},
        //组件类型
        {prop: "controlTypeCn",label: this.$t('org.label.controlType'), width: 120,align: "center"},
        //是否多选
        {prop: "isMul",label: this.$t('org.label.isMul'),width: null,isFlag:true,align: "center"},
        //是否必填
        {prop: "isRequire",label: this.$t('org.label.isRequire'),width: null,isFlag:true,align: "center"},
        //行宽比例
        {prop: "span",label: this.$t('org.label.span'),width: null,align: "center"},
        //排序
        {prop: "sort",label: this.$t('org.label.sort'),width: null,align: "center"},
        //是否启用
        {prop: "isEnable",label: this.$t('org.label.isEnable'),width: null,align: "center"},
        //是否可清除
        {prop: "clearable",label: this.$t('org.label.clearable'),width: 100,isFlag:true,align: "center"},
        //是否可过滤
        {prop: "filterable",label: this.$t('org.label.filterable'),width: 100,isFlag:true,align: "center"},
        //所属网格列ID
        {prop: "colsId",label: this.$t('org.label.colsId'),width: 150,align: "center"},
        //输入类型
        {prop: "inputType",label: this.$t('org.label.inputType'),width: null,align: "center"},
        //日期选项类型
        {prop: "dateOptionsType",label: this.$t('org.label.dateOptionsType'),width: 120,align: "center"},
        //日期格式
        {prop: "format",label: this.$t('org.label.format'),width: null,align: "center"},
        //日期类型
        {prop: "dateType",label: this.$t('org.label.dateType'),width: null,align: "center"},
        //值列表类型
        {prop: "lookupType",label: this.$t('org.label.lookupType'),width: 100,align: "center"},
        //点击事件
        {prop: "clickEvent",label: this.$t('org.label.clickEvent'),width: null,align: "center"},
        //是否系统组件
        {prop: "isSys",label: this.$t('org.label.isSys'),width: 120,isFlag:true,align: "center"},
        //比较字段
        {prop: "compareField",label: this.$t('org.label.compareField'),width: null,align: "center"},
        //比较值
        {prop: "compareValue",label: this.$t('org.label.compareValue'),width: null,align: "center"},
        //计算表达式
        {prop: "contWay",label: this.$t('org.label.contWay'),width: 100,align: "center"},
        //页面区域
        {prop: "pageArea",label: this.$t('org.label.pageArea'),width: null,align: "center"},
        //是否显示组件
        {prop: "isShow",label: this.$t('org.label.isShow'),width: 120,isFlag:true,align: "center"},
        //组件间传值对象
        {prop: "valueObject",label: this.$t('org.label.valueObject'),width: 130,align: "center"},
        //查询条件字段
        {prop: "mustFields",label: this.$t('org.label.mustFields'),width: 120,align: "center"},
        //显示组件字段
        {prop: "showFields",label: this.$t('org.label.showFields'),width: 120,align: "center"},
        //返回code字段
        {prop: "returnCodeFields",label: this.$t('org.label.returnCodeFields'),width: 120,align: "center"},
        //返回text字段
        {prop: "returnTextFields",label: this.$t('org.label.returnTextFields'),width: 120,align: "center"},
        //其它返回字段
        {prop: "otherFields",label: this.$t('org.label.otherFields'),width: 120,align: "center"},
        //是否使用默认值
        {prop: "isUseDeafult",label: this.$t('org.label.isUseDeafult'),width: 130,isFlag:true,align: "center"},
        //是否网格中组件
        {prop: "isColComp",label: this.$t('org.label.isColComp'),width: 130,isFlag:true,align: "center"},
        //是否异步加载数据
        {prop: "isAsync",label: this.$t('org.label.isAsync'),width: 130,isFlag:true,align: "center"},
        //行内传值对象
        {prop: "rowFields",label: this.$t('org.label.rowFields'),width: 120,align: "center"},
        //传入绑定值
        {prop: "oFields",label: this.$t('org.label.oFields'),width: 160,align: "center"},
        //传入绑定值
        {prop: "dataToObject",label: '数据传输对象',hidden: true,align: "center"},
        //并发ID
        {prop: "updateControlId",label: this.$t('org.label.updateControlId'), width: null,align: "center",hidden: true}
      ],
      tableHeight: 310,
      //表单查询数据
      formField: {
        pageName: this.$route.query.pageName,
        pageId: this.$route.query.pageId,
        compType: "",
        isEnable: "",
        pageArea:"",
        lang: "ZH"
      },
      unFormField:{
        pageName:""
      },
      optionDatas:[],
      colsOptionDatas:[],
      // 是否使用刷新Key的方式刷新弹窗
      resetDialogKey: false
    };
  },
  methods: {
    //计算网格组件和其他组件的数量
    count(){
      const list = this.$refs.multipleTable.list
      this.compKeyCount=0
      this.propKeyCount=0
      for(var k in list){
        if (list[k].compKey.indexOf("compKey")>-1) {
          this.compKeyCount++
        }else {
          this.propKeyCount++
        }
      }
    },
    add(){
      this.count()
      this.editRowData = {}
      this.showEdit('add')
    },
    copyComp(){
      const that = this.$refs.multipleTable;
      let saveState = true;
      let saveCount = 0;
      let msg = "";
      const selectData = that.$refs.multipleTable.selection;
      if (selectData.length !== 1) {
        that.$message({
          message: this.$t("org.label.selectTheComponentPathRecordThatYouWantACopyOf"),/*请选择需要一条复制的组件路径记录！*/
          type: "warning",
          duration: 2000
        });
        return;
      }
      this.count()
      var saveObj = selectData[0]
      delete saveObj['index']
      delete saveObj['compId']
      delete saveObj['updateControlId']
      delete saveObj['proConfigLangExtend.langLabel']
      delete saveObj['proConfigLangExtend.langType']
      delete saveObj['proConfigPageviewExtend.pageName']
      delete saveObj['compTypeCn']
      delete saveObj['controlTypeCn']

      saveObj.compKey = saveObj.compType === 'TABLE' ? 'propKey' + (this.$utils.generateId()) : 'compKey' + (this.$utils.generateId())
      saveObj.labelName = saveObj.labelName + 'copy'
      saveObj.langLabelName = '[{"langType":"ZH","langLabel":"'+saveObj.labelName+'"}]'
      saveObj.sort = that.list.length + 1 +''
      const queryObj = {
          // 保存mutation
          type: "mutation",
          // api配置
          apiConfig: orgApis.proConfigComponentMutationSave,
          variables: {
            // 当前中台使用的名称有dataInfo、info，具体查看API文档
            dataInfo: saveObj
          }
        };
        // 转换了中台请求格式数据
        var paramD = that.$getParams(queryObj);
        // 调用中台API方法（可复用）
        that.$requestAPI(paramD).then(response => {
          if (response.result === "1") {
            saveCount++;
          } else {
            saveState = false;
            msg = response.msg;
            that.$message({
              message: msg,
              type: "warning",
              duration: 2000
            });
          }
          if (saveCount == selectData.length) {
            that.$message({
              message: this.$t("org.label.copySuccess"),/*复制成功*/
              type: "success",
              duration: 2000
            });
            that.queryTable(1);
            storage.remove(this.$route.query.pageCode)
          }
        });
    },
    queryCodeFields() {
      var busiCenter = this.$route.query.busiCenter
      if (busiCenter !== null && busiCenter !== undefined) {
        busiCenter = busiCenter.toLowerCase()
      }
      var serviceCode = this.$route.query.serviceCode
      this.optionDatas = [];
      if (
        busiCenter === null || busiCenter === undefined || serviceCode === undefined ||
        serviceCode === null || busiCenter === "" || serviceCode === ""
      ) {
        return;
      }
      var type = (serviceCode.indexOf("Query") > -1 || serviceCode.indexOf("Qry") > -1) ? '"Query"' : '"Mutation"'
      var paramD = {
        apiUrl:
          "/ly/mp/busicen/" + busiCenter + "/graphql.do",
        query:
          'query{ __type(name:'+type+') {name fields {description name args {name type {kind inputFields {name description}ofType{name description inputFields{ name description }}}}}}}',
        variables: { info: {} }
      };
      this.requestGraphQL(paramD).then(response => {
        if (response.result === "1") {
          var needDatas = response.data.__type.fields.filter(o => o.name === serviceCode)[0]
          if (needDatas === undefined) return
          needDatas =  needDatas.args.filter(o => o.name === "dataInfo")[0]

          if (needDatas.type.kind === 'LIST') {
            needDatas = needDatas.type.ofType.inputFields
          } else{
            needDatas = needDatas.type.inputFields
          }
          this.optionDatas = needDatas === null ? [] : needDatas

          var control = {
            name: "controlBtn",
            description: this.$t("org.label.operation")/*操作*/
          };
          this.optionDatas.splice(0,0,control)
          this.deleteDatas(this.optionDatas);
        }
      });
    },
    requestGraphQL(data) {
      // 截取url
      var url = data.apiUrl;
      delete data.apiUrl;

      return request({
        url: url + config.cH + "token=" + store.getters.token,
        method: "post",
        data
      });
    },
    //刪去某些字段，如groupCode、groupId等
    deleteDatas(optionDatas) {
      var finalOptionDatas = [];
      var columnIndex = [];
      for (var k in optionDatas) {

        if (optionDatas[k].name === "createdName") continue;

        if (optionDatas[k].name === "creator") continue;

        if (optionDatas[k].name === "modifier") continue;

        if (optionDatas[k].name === "modifyName") continue;

        if (optionDatas[k].name === "mycatOpTime") continue;

        if (optionDatas[k].name === "updateControlId") continue;

        if (optionDatas[k].name.indexOf("column") >-1 ) {
          columnIndex.push(k)
          continue
        }
        finalOptionDatas.push(optionDatas[k]);
      }
      for(var k in columnIndex){
        finalOptionDatas.push(optionDatas[columnIndex[k]]);
      }
      this.optionDatas = finalOptionDatas;
    },
     queryColsData(){
      const queryObj = {
      // api配置
      apiConfig: orgApis.proConfigColumnQueryByPage,
        // 需要调用的API服务配置
      apiServices: [{
        // 表格中台返回网格的字段
        apiQueryRow: ["colsId","label","prop","isComponent"]
      }],
      variables: {
        pageSize: 100,
        pageIndex: 1,
        dataInfo: {
          pageId:this.formField.pageId
        }
      }
    };
    const that = this
      // 转换了中台请求格式数据
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
      if (response.result === "1") {
        that.colsOptionDatas = response.rows.filter(o =>o.isComponent === '1')
      }
    });
  },
  del(index){
    this.$confirm(this.$t("org.message.confirmDeletion")+"?"/*确认删除*/, this.$t("org.label.warnning")/*提示*/, {
      confirmButtonText: this.$t("org.label.confirm")/*确认*/,
      cancelButtonText: this.$t("org.label.cancel")/*取消*/,
      type: "warning"
    }).then(() => {
      var curIndex = index;
      const that = this.$refs.multipleTable;
      if (curIndex === undefined || curIndex === null) {
        this.$alert(this.$t("org.label.selDelData")/*请选择需要删除的数据*/, this.$t("org.label.warnning")/*提示*/);
        return;
      }
      var currentRow = that.currentRow;
      var editRowData = that.list[curIndex];
      const queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.proConfigComponentMutationDelete,
        variables: {
        // 当前中台使用的名称有dataInfo、info，具体查看API文档
        dataInfo: {
          compId:editRowData.compId,
          updateControlId:editRowData.updateControlId
        }
      }
    };
      var paramD = that.$getParams(queryObj);
      this.$requestAPI(paramD).then(response =>{
        if(response.result === '1'){
          this.$message({message:this.$t("org.label.successfullyDelete")/*删除成功*/,type: 'success'});
          this.queryTable(1);
        } else{
        this.$message({message:response.msg});
        }
      })
    }).catch(() => {
      return
    })
  }
},
};
</script>
