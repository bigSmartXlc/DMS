<template>
  <div class="app-container orgManage">
    <!-- 查询条件 -->
    <div class="filter-container filter-params margin0">
      <el-row :gutter="26">
        <el-col :span="7">
          <label>{{$t('org.label.showDisabledOrg')}}</label>
          <!-- /*加载失效组织*/ -->
          <el-select
            collapse-tags
            filterable
            v-model="isEnable"
            clearable
            @change="queryMenue()"
            size="small"
          >
            <el-option
              v-for="item in optionDatas"
              :key="item.code"
              :label="item.label"
              :value="item.code"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="filter-container filter-title">{{$t('org.label.queryResult')}}</div>
    <!-- /*查询结果*/ -->
    <div class="content">
      <div class="groupMenue">
        <div class="">
          <el-tree
          :data="orgList"
          :props="defaultProps"
          class="filter-tree el-slide"
          v-loading="treeLoading"
          node-key="orgTreeId"
          @contextmenu.prevent.native="openMenu($event)"
          ref="tree"
          @node-click="handleNodeClick"
          :expand-on-click-node= false
          highlight-current
          :render-content="renderContent"
        ></el-tree>
        <el-card class="box-card treeOprMenu" v-show="isOpenMenu">
          <!-- <div> -->
          <div class="filter-container filter-button">
            <!-- <el-button
              :style="{left:left+'px',top:top+'px'}"
              size="small"
              @click="addNewItem()"
              class="addNewItemBtn"
            >{{$t('sys.button.add')}}</el-button> -->
            <!-- /*添加*/ -->
            <!-- </div> -->
          </div>
        </el-card>
        </div>
        <!-- <div class="prompt">
          <span>提示：选中组织后右击鼠标进行组织新增</span>
        </div> -->
      </div>
      <div class="groupMenueEdit">
        <div class="filter-container filter-params">
          <el-row :gutter="28">
            <!-- <groupType
              :span="isEnableSpan"
              :code="editQuery.orgBelongType"
              labelName="组织所属类型"
              :key="isGroupTypeKey"
              lookuptype="BASE0003"
              @changeCode="getGroupTypeCode"
              :isMul="false"
              :disabled="isEditFlag"
            />-->
            <el-col :span="20">
              <label>{{$t('org.label.typeOfOrg')}}</label>
              <!-- /*组织所属类型*/ -->
              <el-select
                collapse-tags
                filterable
                v-model="editQuery.orgBelongType"
                clearable
                @change="getGroupTypeCode"
                size="small"
                :disabled="isEditFlag"
              >
                <el-option
                  v-for="item in newOptionDatas.filter(o=>o.isShow===true)"
                  :key="item.code"
                  :label="item.label"
                  :value="item.code"
                  :disabled="item.flag"
                />
                  <!-- :disabled="item.flag" -->
              </el-select>
            </el-col>
            <el-col :span="20" v-if="isNotDlr">
              <label>{{g_groupCode}}</label>
              <el-input
                v-model="editQuery.orgCode"
                clearable
                :placeholder="$t('sys.tips.esTip13')"
                size="small"
                :disabled="isEditFlag"
              />
            </el-col>
            <el-col :span="20" v-if="isNotDlr">
              <label>{{g_groupName}}</label>
              <el-input :disabled="orgNameShow" clearable  v-model="editQuery.orgName" :placeholder="$t('sys.tips.esTip13')" size="small" />
            </el-col>
            <orgDlr :textField="editQuery.orgName" :span="20" @changeCode="getDlr" v-if="isDlr"/>
            <el-col :span="20">
              <label>{{$t('org.label.superiorOrgName')}}</label>
              <!-- /*上级组织名称*/ -->
              <el-input
                v-model="editQuery.parentOrgTreeName"
                clearable
                size="small"
                :disabled="true"
              />
            </el-col>
            <el-col :span="20">
              <label>{{$t('org.label.isUseable')}}</label>
              <!-- /*是否可用*/ -->
              <el-select
                collapse-tags
                filterable
                v-model="editQuery.isEnable"
                :disabled="isEnableDisabled"
                clearable
                size="small"
              >
                <el-option
                  v-for="item in isEnableOptionDatas"
                  :key="item.code"
                  :label="item.label"
                  :value="item.code"
                />
              </el-select>
            </el-col>
            <el-col :span="20">
              <div class="orgManageBtn">
                <div class="promptSpan" >
                <span>提示：集团状态一旦改为否则不能逆转操作</span>
              </div>
                <el-button type="primary" icon="iconfont  icon-preservation" size="small" @click="saveNew()">{{$t('sys.button.save')}}</el-button><!-- /*保存*/ -->
                <el-button size="small" icon="iconfont  icon-reset" @click="reset()">{{$t('sys.button.reset')}}</el-button><!-- /*重置*/ -->
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="" v-if="isDlrTable">
          <el-row>
            <el-table
              v-loading="listLoading"
              :data="areaDlrList"
               :element-loading-text="$store.state.app.loadingText"
              border
              stripe
              :height="tableHeight"
              header-cell-class-name="header-cell"
              highlight-current-row
              ref="multipleTable"
            >
            <el-table-column
              align="center"
              prop="dlrCode"
              label="经销商编码"
              >
              <template slot-scope="scope">
                {{ scope.row.dlrCode }}
              </template>
            </el-table-column>
             <el-table-column
              align="center"
              prop="dlrShortName"
              label="经销商名称"
              >
              <template slot-scope="scope">
                {{ scope.row.dlrShortName }}
              </template>
            </el-table-column>
            </el-table>
                <el-pagination
                class="pagination"
                  background
                  small
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[10, 20, 30]"
                  :page-size="10"
                  :prev-text="$t('sys.content.prevPage')"
                  :next-text="$t('sys.content.nextPage')"
                  layout="prev, pager, next, sizes, ->, total"
                  ref="paginationHeight"
                  :total="areaDlrPageTotal"
                  :current-page.sync="listQueryAreaDlr.pageIndex"
                >
                </el-pagination>
          </el-row>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { orgApis } from "@/api/apiList/org";

export default {
  name: "sysGroupOrgMgr",
  components: {
    isEnable: () => import("@/components/org/isEnable/isEnable"),
    groupType: () => import("@/components/org/LookupValue"),
    orgDlr: () => import("@/components/org/orgDlr")
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      areaDlrList:[],
      listLoading:false,
      isDlrTable:false,
      tableHeight:185,
      areaDlrPageTotal:0,
      isNotDlr:true,
      isDlr:false,
      orgNameShow:false,
      testArry: [1],
      list: [],
      orgList: [],
      dataList:[],
      flag: false,
      treeLoading:false,
      flagforchoose: false,
      isOpenMenu: false,
      left: 0,
      isEditFlag: false,
      isEnableKey: "a",
      isGroupTypeKey: "b",
      top: 0,
      // dataNewList: [],
      g_groupName: this.$t('org.label.orgName'),/*集团名称*/
      g_groupCode: this.$t('org.label.orgCode'),/*集团编码*/
      isEnableSpan: 20,
      defaultProps: {
        children: "children",
        label: "orgName"
      },
      isEnableOptionDatas: [{ code: "0", label: "否" }, { code: "1", label: "是" }],
      optionDatas: [{ code: "1", label: "否" }, { code: "0", label: "是" }],
      newOptionDatas: [],
      checkOptionDatas: [],
      listLoading: false,
      listQuery: {
        isEnable: "1",
       companyid: this.$store.getters.orgInfo.COMPANY_ID
      },
      listQueryAreaDlr:{
        pageIndex:1,
        pageSize:10,
        dataInfo:{
          orgTreeId:''
        }
      },
      orgTreeId:'',
      editQuery: {
        orgCode: "",
        orgName: "",
        orgBelongType: "",
        parentOrgTreeId: "",
        isEnable: "",
        parentOrgTreeName: "",
        parentOrgTreeId: "",
        orgTreeId: "",
        orgType: ""
        // isEnableCode: '1'
      },
      initData:{},
      resetState:0,
      isEnableDisabled:false,
      isEnable:'1',
      isact:""
    };
  },
  created() {
    this.queryMenue(true);
    this.queryOriginalDropdownList(1);
  },
  mounted() {},
  watch: {
    isOpenMenu(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
    editQuery(val) {
      this.isEnableKey = "a" + 1;
      this.isGroupTypeKey = "b" + 1;
    }
  },
  methods: {
     //tree自定义事件
     renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node" on-mouseenter={() => {
         this.mouseenteract(data)}}
          on-mouseleave={() => this.mouseleaveact(data)}>
             <span >{node.label}</span>
             {
              this.isact == data?
              <span>

             <a on-click={ (e) =>{ e.stopPropagation();this.addNewItem(data)}  }
            >{this.$t('sys.button.add')}
            </a>
            </span>
            :<span></span>

            }

          </span>)
      },
      //鼠标移出移入事件
      mouseenteract(da){
        this.isact = da
      },
      mouseleaveact(da){
       this.isact = da
      },
    saveNew() {
      for(let i = 0 ; i<this.newOptionDatas.length;i++){
        if(this.editQuery.orgBelongType==this.newOptionDatas[i].label){
          this.editQuery.orgBelongType=this.newOptionDatas[i].code
        }
      }
      if (this.editQuery.orgBelongType != "1") {
        this.saveOrgManage(1);
      } else {
        this.saveDlrManage(1);
      }
      if (this.flagforchoose) {
        for (var k in this.newOptionDatas) {
          this.newOptionDatas[k].flag = true;
          this.newOptionDatas[k].isShow = false;
        }
        this.flagforchoose = false;
      }
    },
    queryMenue(page) {
      const that = this;
      this.treeLoading = true
      if(this.isEnable === '0'){
        this.listQuery.isEnable = ''
      }else{
        this.listQuery.isEnable = '1'

      }
      let queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgRelationRealGroupQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: [
              "orgName",
              "orgCode",
              "orgBelongType",
              "orgTreeId",
              "linkId",
              "isEnable",
              "parentOrgTreeId",
              "treeType",
              "orgRealId",

            ]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: that.listQuery
        }
      };
      //转换了中台请求格式数据
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        if (
          response.result === "1"
        ) {
           this.dataList =
            response.rows;
          var tree = this.$utils.parseTreeFromList(
             this.dataList,
            "parentOrgTreeId",
            "orgTreeId"
          );
          this.treeLoading = false
          this.orgList = tree;
        }
      });
    },
    //查询列表值,值列表查询
    queryOriginalDropdownList(page) {
      const that = this;
      let queryObj = {
        // api配置
        apiConfig: orgApis.mdsLookupValueQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: ["lookupValueName", "lookupValueCode"]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: { lookupTypeCode: "BASE0003" }
        }
      };
      //转换了中台请求格式数据
      var dataNewList;
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        if (
          response.result === "1"
        ) {
          dataNewList =
            response.rows;

          for (var k in dataNewList) {
            var context = {
              code: dataNewList[k].lookupValueCode,
              label: dataNewList[k].lookupValueName,
              flag: true,
              isShow:false
            };
            this.newOptionDatas.push(context);
          }
        }
      });
    },
    //查询对应的可用字段
    queryDropdownList(page, cb) {
      const that = this;
      let queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgNodeRelQueryFindAll,
        // 需要调用的API服务配置
        apiServices: [
          {
            //表格中台返回网格的字段
            apiQueryRow: ["childOrgNodeType", "childTypeName"]
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          pageSize: -1,
          pageIndex: 1,
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: { orgNodeType: this.editQuery.orgBelongType }
        }
      };
      //转换了中台请求格式数据
      var dataNewListFor;
      var paramD = that.$getParams(queryObj);
      // 调用中台API方法（可复用）
      that.$requestAPI(paramD).then(response => {
        if (
          response.result === "1"
        ) {
          dataNewListFor =
            response.rows;
            if(dataNewListFor != []){
               for (var k in dataNewListFor) {
                var context = {
                  code: dataNewListFor[k].childOrgNodeType,
                  label: dataNewListFor[k].childTypeName
                };
                this.checkOptionDatas.push(context);
              }
            }
        }
        if (typeof cb === "function") {
          cb.call(
            response.rows
          );
        }
      });
      return this.checkOptionDatas;
    },
    //查询区域经销商
    fetchAreaDlrData() {
      this.listLoading = true
      const queryObj = {
        // api配置
        apiConfig: orgApis.mdmOrgAreaDlrQueryByPage,
        // 需要调用的API服务配置
        apiServices: [
          {
            // 表格中台返回网格的字段
            apiQueryRow: [
              "dlrId",
              "dlrShortName",
              "dlrCode",
            ]
          }
        ],
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: this.listQueryAreaDlr
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）

      this.$requestAPI(paramD).then(response => {
        if (
          response.result === "1" &&
          response.rows
        ) {
          this.areaDlrList =
            response.rows;
        }
        this.listLoading = false
      });
    },
    reset(){
      if(this.resetState === 1){
        //修改的重置
        let name = this.editQuery.parentOrgTreeName
        let id = this.editQuery.parentOrgTreeId
        this.editQuery = {
          orgCode: "",
          orgName: "",
          orgBelongType: "",
          parentOrgTreeId: "",
          isEnable: "",
          parentOrgTreeName: "",
          parentOrgTreeId: "",
          orgTreeId: "",
          orgType: ""
          // isEnableCode: '1'
        }
        this.editQuery.parentOrgTreeName = name
        this.editQuery.parentOrgTreeId = id
      }else if(this.resetState === 0){
        //新增的重置
        this.$utils.deepClone(this.editQuery, this.initData)
      }else{
        this.initData = {
          isEnable: "",
          orgBelongType: "",
          orgCode: "",
          orgName: "",
          orgRealId: "",
          orgTreeId: "",
          orgType: "",
          parentOrgTreeId: "",
          parentOrgTreeName: ""
        }
        this.$utils.deepClone(this.editQuery, this.initData)
      }

    },
    getGroupTypeCode(val) {
      this.newOptionDatas.sort(function(a, b) {
        return a.code - b.code;
      });
      this.editQuery.orgBelongType = val;
      let name = ''
      this.isNotDlr = true
      this.isDlr = false
      this.isDlrTable = false
      switch(this.newOptionDatas[val].label){
          case '供应商':
            name = this.$t('org.label.supplier');
            break;
          case '品牌':
            name = this.$t('org.label.carBrandCn');
            break;
          case '地区':
            name = this.$t('org.label.area');
            break;
          case '大区':
            name = this.$t('org.label.region');
            break;
          case '小区':
            name = this.$t('org.label.smallAreaName');
            break;
          case '总部':
            name = this.$t('org.label.headquarters');
            break;
          case '经销商':
            name = this.$t('org.label.dlr');
            this.isNotDlr = false;
            this.isDlr = true
            this.isDlrTable = true
            this.listQueryAreaDlr.dataInfo.orgTreeId = this.orgTreeId
            this.fetchAreaDlrData()
            break;
          case '部门':
            name = this.$t('org.label.department');
            break;
          case '集团':
            name = this.$t('org.label.orgName1');
            break;
        }
      this.g_groupName = name + this.$t('org.label.nameOfOptions');/* 名称*/
      this.g_groupCode = name + this.$t('org.label.codeOfOptions');/* 编码*/


    },
    //保存
    saveOrgManage(page) {
      this.orgManageVisible = true;
      const that = this;

      if (that.$utils.isEmpty(that.editQuery.orgBelongType)) {
        that.$message({
          message: this.$t('org.label.OrganizationTypeNotNull')/*组织所属类型不能为空*/,
          type: "warning",
          duration: 2000
        });
        return;
      }
      if (that.$utils.isEmpty(that.editQuery.orgCode)) {
        that.$message({
          message: that.g_groupCode +' '+ this.$t('org.label.NotNull')/*集团编码不能为空*/,
          type: "warning",
          duration: 2000
        });
        return;
      }
      if (that.$utils.isEmpty(that.editQuery.orgName)) {
        //四种情况
        that.$message({
          message: that.g_groupName + ' '+this.$t('org.label.NotNull')/*集团名称不能为空*/,
          type: "warning",
          duration: 2000
        });
        return;
      }

      if (that.$utils.isEmpty(that.editQuery.isEnable)) {
        that.$message({
          message: this.$t('org.label.isUseable')+ ' '+this.$t('org.label.NotNull')/*是否可用不能为空*/,
          type: "warning",
          duration: 2000
        });
        return;
      }

      const queryObj = {
        // api配置
        type: "mutation",
        typeParam: "($dataInfo:ExInputMdmOrgRelationReal)",
        apiConfig: orgApis.mdmOrgRelationRealMutationSave,
        // 需要调用的API服务配置
        apiServices: [
          {
            apiServiceParam: "(dataInfo:$dataInfo)"
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            orgName: this.editQuery.orgName,
            orgCode: this.editQuery.orgCode,
            orgTreeId: this.editQuery.orgTreeId,
            parentOrgTreeId: this.editQuery.parentOrgTreeId,
            orgBelongType: this.editQuery.orgBelongType,
            isEnable: this.editQuery.isEnable
          }
        }
      };
      //转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          // 保存成功
          // this.sendCode("1");
          this.$message({
            message: this.$t('sys.tips.esTip5')/*保存成功*/,
            type: "success",
            duration: 2000
          });
          this.queryMenue(true);
          this.resetState = 3
          this.reset()
        } else {
          // 保存失败
          // this.sendCode('0')
          this.$message({
            message:
              this.$t('sys.tips.esTip10')/*保存失败：*/ + response.msg,
            type: "warn",
            duration: 2000
          });
          this.queryMenue(true);
        }
      });
    },
    closeMenu() {
      this.isOpenMenu = false;
    },
    //保存
    saveDlrManage(page) {
      this.orgManageVisible = true;
      const that = this;

      if (that.$utils.isEmpty(that.editQuery.orgBelongType)) {
        that.$message({
          message: this.$t('org.label.OrganizationTypeNotNull')/*组织所属类型不能为空*/,
          type: "warning",
          duration: 2000
        });
        return;
      }
      if (that.$utils.isEmpty(that.editQuery.orgCode)) {
        that.$message({
          message: that.g_groupCode +' '+ this.$t('org.label.NotNull')/*集团编码不能为空*/,
          type: "warning",
          duration: 2000
        });
        return;
      }
      if (that.$utils.isEmpty(that.editQuery.orgName)) {
        //四种情况
        that.$message({
          message: that.g_groupName + ' '+this.$t('org.label.NotNull')/*集团名称不能为空*/,
          type: "warning",
          duration: 2000
        });
        return;
      }

      if (that.$utils.isEmpty(that.editQuery.isEnable)) {
        that.$message({
          message: this.$t('org.label.isUseable')+ ' '+this.$t('org.label.NotNull')/*是否可用不能为空*/,
          type: "warning",
          duration: 2000
        });
        return;
      }

      const queryObj = {
        // api配置
        type: "mutation",
        typeParam: "($dataInfo:ExInputMdmOrgRelationReal)",
        apiConfig: orgApis.mdmOrgAreaDlrMutationSave,
        // 需要调用的API服务配置
        apiServices: [
          {
            apiServiceParam: "(dataInfo:$dataInfo)"
          }
        ],
        //条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          //当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            // orgName: this.editQuery.orgName,
            linkId: this.editQuery.orgCode,
            // orgTreeId: this.editQuery.orgTreeId,
            parentOrgTreeId: this.editQuery.parentOrgTreeId,
            // orgBelongType: this.editQuery.orgBelongType,
            isEnable: this.editQuery.isEnable,
          }
        }
      };
      //转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          // 保存成功
          // this.sendCode("1");
          this.$message({
            message:this.$t('sys.tips.esTip5')/*保存成功*/,
            type: "success",
            uration: 2000
          });
          this.queryMenue(true);
          this.resetState = 3
          this.reset()
        } else {
          // 保存失败
          // this.sendCode('0')
          this.$message({
            message:
                this.$t('sys.tips.esTip10')/*保存失败：*/ +':'+ response.msg,
            type: "warn",
            uration: 2000
          });
          this.queryMenue(true);
        }
      });
    },
    handleNodeClick(a, b, c) {
      this.initData = {}
      this.isEnableDisabled = false
      this.resetState = 0
      this.isEditFlag = true;
      this.isNotDlr = true
      this.isDlr = false
      this.isDlrTable = false
      this.orgNameShow = false
      this.g_groupName=this.$t('org.label.orgName')/*集团名称*/
      this.g_groupCode = this.$t('org.label.orgCode')/*集团编码*/
      for(let i = 0 ; i<this.newOptionDatas.length;i++){
        if(b.data.orgBelongType==this.newOptionDatas[i].code){
          this.editQuery.orgBelongType=this.newOptionDatas[i].label
        }
      }
      // this.editQuery.orgBelongType = b.data.orgBelongType;
      this.editQuery.orgCode = b.data.orgCode;
      this.editQuery.orgName = b.data.orgName;
      this.editQuery.isEnable = b.data.isEnable;
      // this.editQuery.parentOrgTreeName = b.parent.data.orgName;
      this.editQuery.parentOrgTreeId = b.data.parentOrgTreeId;
      this.editQuery.orgTreeId = b.data.orgTreeId;
      this.orgTreeId = b.data.orgTreeId;
      this.editQuery.orgType = b.data.treeType;
      this.editQuery.orgRealId = b.data.orgRealId;
      if( this.editQuery.parentOrgTreeId === '-1'){
        this.editQuery.parentOrgTreeName = ''
      }else{
        for(let i in this.dataList){
          if(this.editQuery.parentOrgTreeId === this.dataList[i].orgTreeId){
            this.editQuery.parentOrgTreeName = this.dataList[i].orgName;
          }
        }
      }
      this.isOpenMenu = false;
      if (this.flagforchoose) {
        for (var k in this.newOptionDatas) {
          this.newOptionDatas[k].flag = true;
          this.newOptionDatas[k].isShow = false;
        }
        this.flagforchoose = false;
      }
      if(b.data.orgBelongType === '1'){
        this.orgNameShow = true
      }
      this.initData = JSON.parse(JSON.stringify(this.editQuery))
      if(this.editQuery.isEnable === "0"){
        this.isEnableDisabled = true
      }
    },
    openMenu(e) {
      const menuMinWidth = 105;
      const offsetLeft = this.$el.getBoundingClientRect().left; // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      const left = e.clientX - offsetLeft + 5; // 5: margin right
      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }
      this.top = e.clientY - this.$el.offsetTop - 30;
      // this.$el.getBoundingClientRect().height -
      // 100;
      // this.left = 200
      // this.top = 300
      this.isOpenMenu = true;
    },
    addNewItem(data) {
      //  if(this.editQuery.parentOrgTreeId === ""){
      //   this.$message({
      //     message: this.$t('org.message.selOrg')/*请先选中组织*/,
      //     type: "warning",
      //     duration: -1
      //   });
      //   return false
      // }
      this.isEnableDisabled = false
      this.resetState = 1
      var that = this;
      this.orgNameShow = false;
       that.editQuery.orgBelongType = data.orgBelongType;
      // 这里request为向服务的发请求的方法
      for (var r in that.testArry) {
        that.queryDropdownList(1, function() {
          for (var k in that.checkOptionDatas) {
            for (var j in that.newOptionDatas) {
              if (
                that.checkOptionDatas[k].code == that.newOptionDatas[j].code
              ) {
                that.newOptionDatas[j].flag = false;
                that.newOptionDatas[j].isShow = true;
              }
            }
          }
          that.flagforchoose = true;
          that.checkOptionDatas = [];
          that.isEditFlag = false;
          that.editQuery.parentOrgTreeName = data.orgName;
          that.editQuery.parentOrgTreeId = data.orgTreeId;
          that.editQuery.orgBelongType = "";
          that.editQuery.orgCode = "";
          that.editQuery.orgTreeId = "";
          that.editQuery.orgName = "";
          that.editQuery.isEnable = "1";
          that.isOpenMenu = false;
        });
      }
    },
    // 获取经销商弹窗信息
    getDlr(code,text){
      this.editQuery.orgCode = code
      this.editQuery.orgName = text
    },
    // 处理每页显示改变事件
    handleSizeChange(val) {
      this.listQueryAreaDlr.pageSize = val
      this.queryTable()
    },

    // 当前页记录
    handleCurrentChange(val) {
      this.listQueryAreaDlr.pageIndex = val
      this.queryTable()
    },
  }
};
</script>
<style lang="scss" scoped>
.el-slide {
  height: calc(90vh - 185px);
  overflow-y: auto;
  background: #fff;
}
.orgManage {
  position: relative;
}
.orgManageDialog {
  height: 240px;
  margin-top: calc(26vh) !important;
}
.orgManageBtn {
  height: 38px;
  position: relative;
}
.content {
  height: calc(100vh - 200px);
  background: #ffffff;
}

.groupMenue {
  height: inherit;
  width: 50%;
  float: left;
}

.groupMenueEdit {
  border-left: 10px solid #eee;
  height: inherit;
  width: 50%;
  float: left;
}

.addNewItemBtn {
  position: absolute;
  left: 15px;
  top: 15px;
}
.treeWidth{
  width: 50%;
}
/deep/.pagination{
  padding: 3px;
  height: 38px;
}
/deep/.margin0{
  margin-top: 0;
}
.prompt{
  position: absolute;
    bottom: 7px;
    left: 30px;
    color: red;
}
.promptSpan{
    color: #e70020;
    display: inline-block;
    padding-right: 60px;
}
/deep/ .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  /deep/ .custom-tree-node a {
    font-size: 12px;
  }
</style>
