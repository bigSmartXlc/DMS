<!--
* description: 公告管理-发布对象
*createdDate:
            mwhao 更换为mp请求,修改部分逻辑  2020-1-11
-->

<template>
  <section class="editCarBrand filter-params-e3s" id="typeEdit">
    <el-dialog
      v-dialogDrag
      width="1000px"
      title="选择成员"
      :visible.sync="handleVisibled"
      :append-to-body="true"
      center
      @close="sendCodeHandleVisible"
    >
      <dialogHeader slot="title" :title="'选择成员'" :styleType="$store.state.app.dialogType"></dialogHeader>
      <div id="searchFormGroup" class="filter-container filter-params" ref="oneTable.searchArea">
        <!-- 头部 -->
        <el-row>
          <!-- <el-col :span="6">
            <label>对象类型</label>
            <el-select v-model="modelValue" placeholder="请选择" @change="changeCo">
              <el-option
                v-for="item in options"
                :key="item.index"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
          </el-col>-->
          <el-col :span="10">
            <el-input v-model="searchCode" placeholder="请输入" size="small" />
            <el-button type="primary" icon="el-icon-search" size="small" @click="queryF">查询</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row id="elTableD">
        <!-- 树状图 -->
        <el-col :span="8">
          <div id="treeD" :style="{height:currentHeight+'px'}">
            <el-tree
              row-key="id"
              class="filter-tree"
              :data="menuList"
              :node-key="nodeKeys"
              :props="defaultProps"
              height="400"
              ref="tree"
              @node-click="handleNodeClick"
              highlight-current
              :key="treeKey"
            ></el-tree>
          </div>
        </el-col>
        <!-- 左边网格列 -->
        <el-col :span="8">
          <div>
            <a class="clickOpeation" @click="clickAll">全选</a>
            <el-table
              row-key="id"
              :key="treeKey"
              v-loading="listLoading2"
              :data="list"
              :element-loading-text="$store.state.app.loadingText"
              border
              stripe
              height="400"
              header-cell-class-name="header-cell"
              highlight-current-row
              ref="multipleTable"
              @row-dblclick="rowDbClick"
            >
              <el-table-column label="待选项" align="center" v-if="!DeptS">
                <template slot-scope="scope">{{ scope.row.text }}</template>
              </el-table-column>
              <el-table-column label="待选项（用户）" align="center" v-if="DeptS">
                <template slot-scope="scope">{{scope.row.USER_NAME}}</template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
        <!-- 右边网格列 -->
        <el-col :span="8">
          <a class="clickOpeation" @click="escAll">清空</a>
          <el-table
            row-key="id"
            v-loading="listLoading"
            :data="list2"
            :element-loading-text="$store.state.app.loadingText"
            border
            height="400"
            stripe
            header-cell-class-name="header-cell"
            highlight-current-row
            ref="multipleTable2"
          >
            <el-table-column label="已选项" align="center" v-if="!DeptS">
              <template slot-scope="scope">{{ scope.row.text }}</template>
            </el-table-column>
            <el-table-column label="待选项" align="center" v-if="DeptS">
              <template slot-scope="scope">
                {{scope.row.USER_NAME}}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              >
              <template slot-scope="scope" width="60">
                <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="table-col">
          <mix-button v-if="bounce" name="searchBtns" :dynamicButtons="tableButtons"></mix-button>
        </el-col>
      </el-row>
    </el-dialog>
  </section>
</template>

<script>
import { orgApis } from "@/api/apiList/org";
import mixButton from "@/components/basicComponent/mixButton";
export default {
  components: {
    mixButton,
    dialogHeader: () => import("@/components/dialogHeader"), //弹窗标题
  },
  props: {
    handleVisible: {type: Boolean,default: function () {return false;},},
    formLis: {type: Array,default: function () {return [];},},
  },
  // 组件混入对象
  data() {
    return {
      // 传递过来的参数
      fromLisd: this.formLis,
      bounce: true,
      nodeKeys: "orgTreeId",
      // 右侧网格表格参数
      list: [],
      list2: [],
      listLoading: false,
      listLoading2: false,
      // 弹窗
      handleVisibled: this.handleVisible,
      // 下拉框选择参数
      modelValue: "0",
      // 输入框参数
      searchCode: "",
      // 网格key
      treeKey: "a",
      // 按钮
      tableButtons: [
        {
          compKey: "btnKey11",
          type: "primary",
          size: "small",
          clickEvent: () => this.save(),
          position: "right",
          name: "confirm",
          text: "确认",
        },
        {
          compKey: "btnKey12",
          type: "",
          size: "small",
          clickEvent: () => this.sendCodeHandleVisible(),
          position: "right",
          name: "cancel",
          text: "取消",
        },
      ],
      // 树状图参数
      menuList: [],
      // 输入框查询
      resetList: [],
      // 下拉框
      // options: [
      //   { code: "0", name: "组织" },
      //   { code: "1", name: "用户" }
      // ],
      // 查询条件
      listQuery: {
        isEnable: "1",
      },
      // 树状图参数
      defaultProps: {
        children: "children",
        label: "text",
      },
      // 组织是true  用户是 false
      DeptS: false,
      currentHeight: 0,
      // 类型
      typeofObj: "0",
      // 用户点击
      userclickList: {
        orgid: "",
      },
      // 清空查询上一次点击的父级ID(用户)
      emptyuserID: {
        id: "",
      },
      //组织
      organizationID: {},
      // 删除已选项需要父级ID
      parentRowID: "",
      // 备份数据
      listBackups: [],
    };
  },
  created() {
    if (this.handleVisibled == true) {
      this.$nextTick(() => {
        this.getCurrentHeight();
        if (this.fromLisd != null) {
          var obj = this.fromLisd;
          for (let i = 0; i < obj.length; i++) {
            obj[i].text = this.fromLisd[i].fullname;
            obj[i].USER_NAME = this.fromLisd[i].fullname;
          }
          //   // 用户
          //   // if (this.fromLisd[0].objtype === "5") {
          //     this.DeptS = true;
          //     this.modelValue = "1";
          //     this.typeofObj = "1";
        } else {
          var obj = [];
        }
        //   // // 组织
        //   // if (this.fromLisd[0].objtype === "0") {
        this.DeptS = false;
        this.modelValue = "0";
        this.typeofObj = "0";
        //   // }
        this.list2 = obj;
        // this.queryMenue();
        // } else {
        this.queryMenue();
        // }
      });
    }
  },
  methods: {
    // 全选事件
    clickAll() {
      for (var j in this.list) {
        var isOrg = this.list[j].id !== undefined;
        if (isOrg) {
          // 组织
          if (!(this.list2.findIndex((o) => o.objid === this.list[j].id) > -1)) {
            var a = {
              USER_NAME: this.list[j].text,
              text: this.list[j].text,
              fullname: this.list[j].text,
              objid: this.list[j].id,
              objtype: "0",
              parentID: this.list[j].parentID,
            };
            this.list2.push(a);
          }
        } else {
          // 用户
          if (!(this.list2.findIndex((o) => o.objid === this.list[j].USER_ID) > -1)) {
            var a = {
              fullname: this.list[j].USER_NAME,
              text: this.list[j].USER_NAME,
              USER_NAME: this.list[j].USER_NAME,
              objid: this.list[j].USER_ID,
              objtype: "5",
              parentID: this.list[j].parentID,
            };
            this.list2.push(a);
          }
        }
      }
      // 左边网格列清空
      this.list = [];
    },
    // 清空事件
    escAll() {
      this.list2 = [];
      this.$nextTick(() => {
        if (this.modelValue === "0") this.handleNodeClick(this.organizationID);
        if (this.modelValue === "1") this.userAPIquery(this.emptyuserID);
      });
    },
    // 弹窗关闭
    sendCodeHandleVisible() {
      this.handleVisibled = false;
      this.$emit("colseEdit");
    },
    // 树状图点击事件
    handleNodeClick(data, id, id2) {
      this.emptyuserID.id = data.id;
      this.organizationID = data;
      this.fromLisd = [];
      let that = this;
            debugger
      // 组织
      if (!(data && data.length > 0)) {
        if (this.typeofObj !== "0") return
          let lis = [];
          if (data.children.length != 0) {
            // 添加主组织
            let oneList = JSON.parse(JSON.stringify(data));
            oneList.children = [];
            lis.push(oneList);
            let child = data.children;
            for (let i in child) {
              // 左边网格列清除需求
              if (that.list2 && that.list2.length > 0) {
                // 组织
                if (this.modelValue === "0") {
                  if (!(that.list2.findIndex((o) => o.id === child[i].id || o.objid === child[i].id) > -1)) {
                    lis.push(child[i]);
                  }
                }
              } else {
                lis.push(child[i]);
              }
            }
              // 添加总部门处理
            if (that.list2.length > 0) {
              lis = lis.filter((x) => {
                for (let y of that.list2) {
                  return x.text != y.USER_NAME;
                }
              });
            }
            that.listBackups = lis; // 用于处理总部门备份数据
            that.list = lis;
          } else {
            // 左边网格列清除需求
            let leftList = that.list2.some(function (val) {
              return val.id == data.id;
            });
            let leftList2 = that.list2.some(function (val) {
              return val.objid == data.id;
            });
            if (!(leftList || leftList2)) {
              lis.push(data);
              this.$nextTick(() => {
                that.list = lis;
              });
            } else {
              that.list = [];
            }
          }

      }
      // 用户
      if (this.typeofObj === "1") {
        this.userAPIquery(data);
      }
    },
    // 用户点击事件
    userAPIquery(val) {
      this.DeptS = true;
      var that = this;
      this.userclickList.orgid = val.id;
      let lis = [];
      this.$store
        .dispatch("sysManage/issueuserclickQuery", this.userclickList)
        .then((response) => {
          if (response.result === "1") {
            this.nodeKeys = "orgTreeId";
            let rows = response.rows;
            // 转换格式
            for (let i = 0; i < rows.length; i++) {
              let str = "[" + rows[i].EMP_NAME + "]" + rows[i].USER_NAME;
              rows[i].USER_NAME = str;
              // // 左边网格列清除需求(用户)
              if (!(this.list2.findIndex((o) =>o.USER_ID === rows[i].USER_ID ||o.objid === rows[i].USER_ID) > -1)) {
                lis.push(rows[i]);
              }
            }
            this.list = lis;
          }
        });
    },
    // 左边表格点击事件
    rowDbClick(row, column) {
      let list2 = JSON.parse(JSON.stringify(this.list2));
      if (list2 == null) list2 = [];
      let obj = row;
      // 组织和用户一起存在时显示
      if (obj.USER_NAME) obj.text = obj.USER_NAME;
      if (obj.text) obj.USER_NAME = obj.text;
      // 去重
      for (let i = 0; i < list2.length; i++) {
        // 组织
        if (list2[i].id) {
          if (obj.id === list2[i].id) {
            this.messaged();
            return;
          }
        }
        // 用户
        if (list2[i].USER_ID) {
          if (obj.USER_ID === list2[i].USER_ID) {
            this.messaged();
            return;
          }
        }
        // 修改判断
        if (list2[i].objid) {
          if (obj.USER_ID === list2[i].objid) {
            this.messaged();
            return;
          }
          if (obj.id === list2[i].objid) {
            this.messaged();
            return;
          }
        }
      }

      // 点击之后全选不判断问题解决
      obj.objid = obj.id;
      list2.push(obj);
      this.list2 = list2;
      // 左边网格列清除需求
      // 组织
      let leftList = [];
      if (this.modelValue === "0") {
        for (let i = 0; i < this.list.length; i++) {
          if (!(list2.findIndex((o) => o.id === this.list[i].id) > -1))  leftList.push(this.list[i]);
        }
      }
      // 用户
      if (this.modelValue === "1") {
        for (let i = 0; i < this.list.length; i++) {
          if (!(list2.findIndex((o) => o.USER_ID === this.list[i].USER_ID) > -1)) {
            leftList.push(this.list[i]);
          }
        }
      }
      this.list = leftList;
    },
    // 重复选择提示
    messaged() {
      this.$message({
        message: "请勿重复选择用户/组织",
        type: "warning",
      });
    },
    // 删除问题
    handleDelete(index, row) {
      // 添加总部门处理
      if (row.parentID == "-1") {
        this.list2=this.list2.filter((item) => item.id != row.id);
        if(this.list2.length>0){
          this.list=this.listBackups.filter((x) => {
          for (let i of this.list2) {
            return x.id != i.id;
          }
        });
        }else{
          this.list=this.listBackups.concat()
        }
        return;
      }
      let i = index;
      // 截取数组然后删除
      let list = JSON.parse(JSON.stringify(this.list2));
      list.splice(i, 1);
      this.list2 = list;
      let parentRow = row;
      if (row.parentID == "undefined") {
        for (let i = 0; i < this.resetList.length; i++) {
          if (this.resetList[i].id === row.parentID) parentRow = this.resetList[i];
        }
        this.handleNodeClick(parentRow);
      } else {
        this.parentidFun(this.resetList, row);
        if (this.parentRowID === "") {
          this.parentRowID = row;
          this.parentRowID.id = row.objid;
          this.parentRowID.children = [];
        }
        this.handleNodeClick(this.parentRowID);
      }
      // 左边网格列清除需求
      // 组织
      // if (this.modelValue === "0") {
      // let parentRow = row;
      // for (let i = 0; i < this.resetList.length; i++) {
      //   if (this.resetList[i].id === row.parentID) {
      //     parentRow = this.resetList[i];
      //   }
      // }
      // }
      // if (this.modelValue === "1") {
      // this.list.push(row);
      //   this.userAPIquery(this.emptyuserID);
      // }
    },
    // 递归获取父级ID
    parentidFun(menueList, row) {
      if (menueList && menueList.length > 0) {
        for (var k in menueList) {
          if (menueList[k].children) {
            if (menueList[k].children.filter((o) => o.id === row.objid).length > 0) {
              // menueList[k].children.splice(menueList[k].children.length - 1, 1);
              this.parentRowID = menueList[k];
              return;
            } else {
              this.parentidFun(menueList[k].children);
            }
          }
        }
      }
    },
    // 下拉框选择
    // changeCo(val) {
    //   if (val === "0") {
    //     this.typeofObj = "0";
    //   }
    //   if (val === "1") {
    //     this.typeofObj = "1";
    //   }
    //   this.list = [];
    //   this.queryMenue();
    // },
    // 保存
    save() {
      this.$emit("getObj", this.list2);
      this.sendCodeHandleVisible();
    },
    // 组织树查询
    queryMenue() {
      this.DeptS = false;
      const that = this;
      let method={} // 查询参数
      // 判断是否为主机厂账号
      that.$store.getters.orgInfo.DLR_ID=="HOST"?method["method"]="getorgtreeall":method["method"]="getOrgTree"
      this.$store.dispatch("sysManage/issuetreetoQuery",method).then((response) => {
        if (response.result === "1") {
          this.nodeKeys = "orgTreeId";
          this.defaultProps.label = "text";
          var dataList = response.rows;
          // 添加经销商显示
          for (let i = 0; i < dataList.length; i++) {
            for (let k = 0; k < dataList[i].children.length; k++) {
              let paren = dataList[i].children[k].parentID;
              if (dataList[i].id === paren) {
                let str =`[${dataList[i].text}]` + dataList[i].children[k].text;
                dataList[i].children[k].text = str;
              }
            }
          }
          this.menuList = dataList;
          this.resetList = dataList;
        }
      });
    },
    // 自适应高度
    getCurrentHeight(val) {
      this.currentHeight =document.getElementById("elTableD").offsetHeight + 40;
    },
    // 查询按钮
    queryF() {
      // 搜索数值
      let pars = this.searchCode;
      if (pars === "") {
        this.menuList = this.resetList;
        return false;
      }
      // 树状图参数
      let lis = JSON.parse(JSON.stringify(this.resetList));
      var menuL;
      if (!this.DeptS) {
        var paren = [];
        var child = [];
        paren = lis.filter(function (lis) {
          return lis.text.includes(pars);
        });
        if (paren.length === 0) {
          for (var c in lis) {
            let res = lis[c].children.filter(function (lis) {return lis.text.includes(pars);
          });
          if (res.length !== 0)
          for (var r in res) {
            child.push(res[r]);
           }
          }
        }
        menuL = paren;
        for (var i in child) {
          menuL.push(child[i]);
        }
      } else {
        menuL = lis.filter(function (lis) {return lis.deptName.includes(pars);});
      }
      this.menuList = menuL;
    },
  },
  watch: {
    // 输入查询
    searchCode: {
      handler: function abb(val) {
        if (val === "")  this.menuList = this.resetList;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/#treeD {
  // max-height: 400px;
  overflow-y: auto;
}
/deep/.u-btn-right {
  text-align: right;
}
/deep/ .clickOpeation {
  position: absolute;
  z-index: 1000;
  color: blue;
  font-size: 12px;
  right: 20px;
  top: 8px;
  cursor: pointer;
}
</style>

