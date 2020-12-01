<!--
* description: 页面管理-功能定义弹窗
* author: mawenhao
* createdDate: 2020-5-11
-->
<template>
  <section class="editWholeRoleManage">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      title="功能定义"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCodeClose"
      width="900px"
    >
      <dialogHeader slot="title" title="功能定义" :styleType="$store.state.app.dialogType"></dialogHeader>
      <!-- <div class="filter-container filter-params">
        <el-row :gutter="26" ref="vailComponentList">


        </el-row>
      </div>-->
      <div id="TreeTable">
        <!--树形区域-->
        <el-aside class="el-slide">
          <!-- <div class="box-bottom">
            <el-button icon="el-icon-plus" plain @click="addMenu">{{$t('sys.button.add')}}</el-button>
            <el-button icon="el-icon-close" plain @click="deleteMenu">{{$t('sys.button.delete')}}</el-button>
          </div>-->
          <el-tree
            :default-expanded-keys="treeExpanded"
            auto-expand-parent
            :current-node-key="treeChecked"
            ref="tree"
            node-key="id"
            :data="menueList"
            highlight-current
            :key="eltree"
            :props="defaultProps"
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
          />
        </el-aside>
        <!-- 右边区域 -->
        <div class="box">
          <div class="filter-container filter-params">
            <el-row :gutter="28">
              <el-col :span="18">
                <label>数据来源API:</label>
                <el-input
                  class="formDescstyle"
                  ref="definRef"
                  suffix-icon="el-icon-menu"
                  v-model="olddataSource"
                  clearable
                  placeholder="请选择数据来源API"
                  size="small"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  @focus="targetEvent()"
                />
              </el-col>
              <!-- <el-col :span="18">
                <label>数据保存API:</label>
                <el-input
                  :autosize="{ minRows: 2, maxRows: 4}"
                  v-model="dataStorage"
                  class="formDescstyle"
                  suffix-icon="el-icon-menu"
                  clearable
                  placeholder="请选择数据保存API"
                  size="small"
                  @focus="targetEvent()"
                />
              </el-col>-->
              <el-col :span="18">
                <label>管理配置:</label>
                <el-input
                  class="formDescstyle"
                  ref="manageMentRef"
                  suffix-icon="el-icon-menu"
                  v-model="manageMentModel"
                  clearable
                  placeholder="请选择"
                  size="small"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  @focus="manageMentFocus()"
                />
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          v-for="comp in tableButtons"
          :key="comp.compKey"
          :type="comp.type"
          @click="comp.clickEvent"
        >{{comp.text}}</el-button>
      </div>
      <!-- API授权 -->
      <definition-api-edit
        @saveInformation="saveInformation"
        @close="close"
        :userList="userList"
        ref="apiAuthorization"
        :key="apiKey"
        :handleVisible="showApi"
      ></definition-api-edit>
      <!-- 管理配置 -->
      <definition-manage-edit
        @manageConfirm="manageConfirm"
        @close="manageClose"
        :key="manageKey"
        :handleVisible="manageVisible"
      ></definition-manage-edit>
    </el-dialog>
  </section>
</template>
<script>
import { orgApis } from "@/api/apiList/org";
export default {
  components: {
    dialogHeader: () => import("@/components/dialogHeader"), //弹窗标题
    definitionApiEdit: () => import("./definitionApiEdit"),// 数据来源api
    definitionManageEdit: () => import("./definitionManageEdit"),// 数据来源api
  },
  props: {
    // 参数
    defineditDate: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 弹窗显示
    popupsVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.save")
        } // '保存'
        // {
        //   compKey: "btnKey2",
        //   type: "",
        //   size: "small",
        //   clickEvent: () => this.reset(),
        //   text: this.$t("sys.button.reset")
        // } //重置
      ],
      // 树状显示的参数
      defaultProps: {
        children: "children",
        label: "text"
      },
      // 树状key值
      eltree: "key",
      // 树状渲染数组
      menueList: [],
      // 默认展开的值
      treeExpanded: ["-1"],
      // 默认选中的值
      treeChecked: "",
      curPopupsVisible: false,
      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        ctrlId: ""
      },
      manageSaveformField:{
         pageIds:"",// 可配置ID
         formId:"",//MP页面ID
        //  pageName:""
      }, // 管理配置保存数据
      formFieldSave: {
        text: "", //树状图名称
        controlType: "0",
        readApiText: "", // apiUrl路径 (数据来源)
        readApi: "", //id(数据来源)
        writeApiText: "", //apiUrl路径 (数据保存)
        writeApi: "", //id(数据保存)
        controlId: "", //  ctrlId
        selector: "",
        selectorIndex: "",
        formId: "", // formId
        menuId: "1b6952a29b61422aa53ffe66157cfd67", // 不知道为啥固定
        menuName: "页面管理" // 不知道为啥固定
      },
      olddataSource: "", // 数据来源
      manageMentModel:"",// 管理配置
      dataStorage: "", // 数据保存
      apiKey: "apiKey",
      manageKey: "manageKey",
      showApi: false,
      manageVisible:false,
      userList: {} // 默认选中/展开对象
    };
  },
  created() {
      this.curPopupsVisible = this.popupsVisible;
    if(this.curPopupsVisible){
      this.formField.ctrlId = this.defineditDate.formID;
      this.manageSaveformField.formId =this.defineditDate.formID;
      this.dendrogramQuery();
      this.manageQueryApi()
    }

  },
  methods: {
    // 树状图查询
    dendrogramQuery() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        this.$store
          .dispatch("sysManage/getdefinitionQuery", that.formField)
          .then(response => {
            if (response.result == "1") {
              var list = response.rows;
              if (list && list.length > 0) {
                that.menueList = list;
                that.formFieldSave.controlId = list[0].controlId;
                that.formFieldSave.formId = list[0].formId;
                that.formFieldSave.controlType = list[0].controlType;
                that.formFieldSave.readApi = list[0].readApi; // ID
                that.formFieldSave.readApiText = list[0].readApiText; // 路径
                this.olddataSource = list[0].readApiText;
                this.userList.apiurl = list[0].readApiText;
                this.userList.id = list[0].readApi;
                that.formFieldSave.text = list[0].text;
                that.formFieldSave.writeApiText = list[0].writeApiText;
                that.formFieldSave.writeApi = list[0].writeApi;
              }
            }
          });
      }
    },
    // 管理配置查询
    manageQueryApi(){
      let that=this
      let queryObj = {
            // api配置
            type: "query",
            apiConfig: orgApis.proConfigPageviewMpPageRelQueryByPage,
            // 需要调用的API服务配置
            apiServices: [
              {
                //表格中台返回网格的字段
                apiQueryRow: [
                  "formId", //MP页面ID
                  "pageIds", //可配置页面ID（多个以“,”隔开）
                  "pageNames",//可配置页面名称（多个以“,”隔开）
                ]
              }
            ],
            //条件/实体参数（变量），根据typeParam中的定义配置
            variables: {
              pageSize: -1,
              pageIndex: 1,
              //当前中台使用的名称有dataInfo、info，具体查看API文档
              dataInfo: {
                formId:that.formField.ctrlId
              }
            }
          };
          //转换了中台请求格式数据
          var paramD = that.$getParams(queryObj);
          // 调用中台API方法（可复用）
          that.$requestAPI(paramD).then(response => {
            let list = response.rows;
            if(!list.length>0)return
            if (response.result == "1") {
              if(list[0].formId)that.manageSaveformField.formId=list[0].formId;
              if(list[0].pageIds)that.manageSaveformField.pageIds=list[0].pageIds;
              if(list[0].pageNames) that.manageMentModel=list[0].pageNames;
            }
          })
    },
    // 树状图点击回调
    handleNodeClick(a, b, c) {
      this.formField.ctrlId = a.formId;
      this.dendrogramQuery();
    },
    // API弹窗
    targetEvent() {
      this.$refs.definRef.blur() // 失去焦点 解决切换重新加载问题
      this.showApi = true;
      this.apiKey +=  "1";
    },
    // 管理配置弹窗
    manageMentFocus() {
      this.$refs.manageMentRef.blur() // 失去焦点 解决切换重新加载问题
      this.manageVisible = true;
      this.manageKey +=  "1";
    },
    close(){
       this.showApi = false;
       this.apiKey +=  "1";
    },
    // 管理配置关闭弹窗
    manageClose(){
       this.manageVisible = false;
       this.manageKey +=  "1";
    },
    // 管理配置确认
    manageConfirm(response){
      this.manageMentModel=response.pageName;
      // this.manageSaveformField.pageName=response.pageName;
      this.manageSaveformField.pageIds=response.pageId;
      this.manageClose()
    },
    // api选择弹窗确认数据
    saveInformation(val) {
      var val = val.filter(o => !o.children); // 过滤父组
      var apiurl = [];
      var id = [];
      for (var i in val) {
        apiurl.push(val[i].apiUrl);
        id.push(val[i].id);
      }
      this.formFieldSave.readApiText = apiurl.join(",");
      this.olddataSource = apiurl.join(",");
      this.formFieldSave.readApi = id.join(",");
      this.userList.id = id.join(",");
    },
    //功能定义api保存按钮
    save() {
      const that = this;
      this.$utils.validataMoth(this, "validpopup");
      if (this.valid) {
        // 功能定义api保存
        this.$store
          .dispatch("sysManage/getdefinitionApiSave", that.formFieldSave)
          .then(response => {
            if (response.result === "1") {
                that.manageSaveApi()
            }
          });

      }
    },
    // 管理配置保存接口
    manageSaveApi(){
      let that=this
        const queryObj = {
        // 保存mutation
        type: 'mutation',
        // api配置
        apiConfig: orgApis.proConfigPageviewMpPageRelSave,
        variables: {
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: this.manageSaveformField
        }
      }
      // 转换了中台请求格式数据
      var paramD = that.$getParams(queryObj)
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
           if (response.result === "1") {
             that.$emit("sendCodeClose",false)
              this.$message({
                showClose: true,
                message: "保存成功" /*保存成功*/,
                type: "success"
              });
            }
      })
    },
    // 关闭按钮
    sendCodeClose() {
      this.$emit("sendCodeClose");
    },
    // 新增按钮
    addMenu() {},
    // 删除按钮按钮
    deleteMenu() {}
  }
};
</script>
<style lang="scss" scoped>
.filter-container /deep/.el-select {
  width: 75%;
}
.el-col /deep/.el-input {
  width: 75%;
}
.filter-container /deep/ label {
  width: 20%;
}
/deep/.el-aside.el-slide {
  width: 30% !important;
  height: calc(100vh - 400px) !important;
  z-index: 100000;
}
/deep/ .box-bottom {
  padding: 0 0 5% 5%;
}
/deep/ .filter-params.el-col {
  margin-bottom: 22px;
}
</style>
