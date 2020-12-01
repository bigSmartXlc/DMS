<!--
* description: 新增/编辑 公告
*createdDate:
            mwh 完善上传附件功能  2019-12-27
-->
<template>
  <section class="filter-params-e3s">
    <div
      id="searchFormGroup"
      class="filter-container filter-params"
      v-if="tableComponents.length > 0"
      ref="searcheHeight"
    >
      <el-tabs v-model="active" type="card" :key="tabsKey" class="container-app">
        <!-- /*价格设置*/ -->
        <el-tab-pane :label="textMap" class="po-rel" name="a">
          <el-row ref="mustCompHeight">
            <el-col :span="22" class="table-col">
              <component
                v-for="comp in tableComponents.filter(o => o.isMust === true)"
                :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
                :key="comp.compKey"
                :v-show="comp.isShow"
                :codeField="comp.codeField"
                :textField="comp.textField"
                :popupsKey="comp.compKey"
                :is="comp.component"
                :isShow="comp.isShow"
                :code="formField[comp.codeField]"
                :readonly="comp.readonly"
                @filed="filed"
                @delectfiled="delectfiled"
                @changeCode="getComponentCode"
                @focusCode="getFocusCode"
                @clickEvent="receiveEvent(comp.clickEvent)"
                :disabled="comp.disabled"
                :isMul="comp.isMul"
                :isRequire="comp.isRequire"
                :span="comp.span || 6"
                :isFunc="comp.isFunc"
                :labelName="comp.labelName"
                :lookuptype="comp.lookuptype"
                :dateOptionsType="comp.dateOptionsType"
                :format="comp.format"
                :dateType="comp.dateType"
                :inputType="comp.inputType"
                :filterable="comp.filterable"
                :parentFileds="comp.parentFileds || ''"
                :mustFields="comp.mustFields || ''"
                :returnCodeField="comp.returnCodeField"
                :returnTextField="comp.returnTextField"
                :otherField="comp.otherField"
                :validrule="comp.validrule"
                :isUseDefault="comp.isUseDefault"
                :isHost="comp.isHost"
                :oFields="comp.oFields"
              ></component>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" v-show="this.fileEdit.length>0">
              <div class="futextd">
                <div class="tTitle">附件展示</div>
                <div v-for="(val,index) in fileEdit" :key="index" class="fileDiv">
                  <a @click="fileDownload(val)" style="cursor:pointer">
                    <i class="el-icon-paperclip"></i>
                    {{fileEditName(val)}}
                  </a>
                  <span class="fileDel" style="cursor:pointer" @click="fileDel(val,index)">删除</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- 富文本组件 -->
          <el-row>
            <el-col :span="22">
              <div class="futext">
                <div class="tTitle">
                  <i class="ired">*</i>正文
                </div>
                <div class="textRow">
                  <VueUeditorWrap :config="myConfig" v-model="formField.content"></VueUeditorWrap>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24" class="butClass">
            <el-col :span="24" class="table-col">
              <mix-button name="searchBtns" :dynamicButtons="tableButtons" :formField="formField"></mix-button>
            </el-col>
          </el-row>
          <edit
            :key="showToView"
            :handleVisible="toViewd"
            @getObj="returnObj"
            :formLis="formLis"
            @colseEdit="colseEdit"
          ></edit>
        </el-tab-pane>
        <!-- /*设置历史* -->
        <el-tab-pane label="已发布公告" name="b">
          <hisManagement @updated="sendUP" ref="rightList" :actived="active"></hisManagement>
        </el-tab-pane>
      </el-tabs>
    </div>
  </section>
</template>
<script>
import { oneTableTemplateMixins } from "@/components/mixins/oneTableTemplateMixins";
import { contsMixins } from "@/components/mixins/contsMixins";
import { valueObjectMixins } from "@/components/mixins/valueObjectMixins";
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  mixins: [oneTableTemplateMixins, valueObjectMixins, contsMixins],
  name: "announcementManagement",
  components: {
    mixButton: () => import("@/components/basicComponent/mixButton"),
    hisManagement: () => import("./hisManagement"),
    Edit: () => import("./Edit"),
    VueUeditorWrap
  },
  data() {
    return {
      // 发布状态提示
      issueStyle: {
        l0200400041: "功能编号重复",
        l0301100001: "公告获取失败",
        l0301100002: "公告删除失败",
        l0301100003: "标题不能为空",
        l0301100004: "内容不能为空",
        l0301100005: "公告发布失败",
        l0301100006: "公告修改失败",
        l0301100007: "今天已发布该标题的公告",
        l0301100008: "数据来源不能为空",
        l0301100009: "公告已被删除"
      },
      textMap: "新增公告",
      updata: {},
      isLabel: "发布",
      active: "a",
      showToView: "b",
      state: "add",
      toViewd: false,
      tabsKey: "t",
      resetDialogKey: false,
      // 富文本
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: true,
        // 初始容器高度
        initialFrameHeight: 150,
        // 初始容器宽度
        initialFrameWidth: "100%",
        UEDITOR_HOME_URL: "/UEditor/"
      },
      dialogVisible: false,
      importKey: "importKey",
      apiConfig: {},
      tableButtons: [
        {
          compKey: "btnKey11",
          type: "primary",
          size: "small",
          clickEvent: () => this.issue(),
          position: "left",
          text: "发布"
        } /*发布*/,
        {
          compKey: "btnKey12",
          type: "",
          size: "small",
          clickEvent: () => this.resetd(),
          position: "left",
          text: "清空"
        } /*清空*/,
        {
          compKey: "btnKey72",
          type: "",
          size: "small",
          class: "showBtn",
          // name: "add",
          clickEvent: () => this.togle(),
          position: "right",
          text: "新增"
        } /*清空*/
      ],

      tableComponents: [
        {
          compKey: "compKey1",
          span: 22,
          // labelName: this.$t("org.label.carConfig") /*标题*/,
          labelName: "标题" /*标题*/,
          codeField: "title",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          isMust: true
        },
        {
          compKey: "compKey2",
          span: 22,
          // labelName: this.$t("org.label.carColor") /*数据来源*/,
          labelName: "数据来源" /*标题*/,
          codeField: "src",
          isRequire: true,
          component: () => import("@/components/org/commonInput"),
          isMust: true
        },
        {
          compKey: "compKey3",
          span: 22,
          labelName: "发布对象" /*发布对象*/,
          clickEvent: () => this.edited(),
          codeField: "target",
          isFunc: true,
          readonly: true,
          component: () => import("@/components/org/commonInput"),
          isMust: true
        },
        {
          compKey: "compKey4",
          span: 22,
          labelName: "公告摘要" /*公告摘要*/,
          codeField: "summary",
          component: () => import("@/components/org/commonInput"),
          inputType: "textarea",
          isMust: true
        },
        {
          compKey: "compKey5",
          codeField: "files",
          labelName: "附件" /*附件*/,
          span: 22,
          component: () => import("@/components/upload/upLoad"),
          type: "propus",
          isMust: true
        }
        // {
        //   compKey: "compKey24",
        //   span: 22,
        //   labelName: "正文" /*公告摘要*/,
        //   codeField: "content",
        //   component: () => import("@/components/org/commonInput"),
        //   inputType: "textarea",
        //   isRequire: true,
        //   isMust: true
        // }
      ],
      formLis: [],
      // 保存参数
      // formField: {},
      formField: {
        title: "", //标题
        content: "", //正文
        target: "",
        files: "", //文件
        src: "", //数据来源
        summary: "",//公告摘要
        notReqValid:true
        // target: [
        //   {
        //     type: "0",  组织或用户
        //     id: "948434a5df6c4a6581c0edc9a2d78214",  orgRealId
        //     userType: "undefined",
        //     text: "23523514124",  orgName
        //     isChangeSetting: "undefined",
        //     orgRealationId: "948434a5df6c4a6581c0edc9a2d78214"  orgRealId
        //   }
        // ], //对象类型
      },
      // 修改参数
      xiugai: {
        noticeid: "2c24a8216c3643e0909144ae66c94599",
        title: 11,
        content: 44,
        src: 22,
        target: [
          {
            type: "0",
            id: "948434a5df6c4a6581c0edc9a2d78214",
            userType: "undefined",
            text: "23523514124",
            isChangeSetting: "undefined"
          }
        ],
        files: "",
        summary: 33
      },
      noticeid: "",
      // 附件展示名字
      fileEdit: []
    };
  },
  methods: {
    receiveEvent(clickEvent) {
      if (clickEvent === null || clickEvent === undefined) {
        console.info("empty event");
      } else {
        clickEvent.call();
      }
    },
    // 清空
    resetd() {
      this.formLis = [];
      this.fileEdit = [];
      this.$refs.compKey5[0].filePath = "";
      this.reset();
    },
    // 发布对象确定按钮
    returnObj(row) {
      let list = JSON.parse(JSON.stringify(row));
      if (list.length === 0) {
        // 清空发布对象内容
        (this.formField.target = ""), (this.formLis = []);
        return false;
      }
      let str = "";
      let oArr = [];
      for (let i = 0; i < list.length; i++) {
        // 组织
        // if (list[i].id) {
        list[i].type = "0";
        str += list[i].text + ",";
        let obj = {};
        obj.objtype = list[i].type;
        if (list[i].objid) {
          obj.objid = list[i].objid;
        }
        if (list[i].id) {
          obj.objid = list[i].id;
        }
        if (list[i].USER_ID) {
          obj.objid = list[i].USER_ID;
        }
        obj.fullname = list[i].text;
        oArr.push(obj);
        // } else {
        //   // 用户
        //   list[i].type = "5";
        //   str += list[i].USER_NAME + ",";
        //   let obj = {};
        //   obj.objtype = list[i].type;
        //   if (list[i].objid) {
        //     obj.objid = list[i].objid;
        //   }
        //   if (list[i].USER_ID) {
        //     obj.objid = list[i].USER_ID;
        //   }
        //  if (list[i].id) {
        //   obj.objid = list[i].id;
        // }
        // obj.fullname = list[i].USER_NAME;
        // oArr.push(obj);
        // }
      }
      str = str.substring(0, str.lastIndexOf(","));
      this.formField.target = str;
      this.formLis = oArr;
      this.toViewd = false;
    },
    colseEdit() {
      this.toViewd = false;
    },
    // 发布对象打开弹窗
    edited() {
      const that = this.$refs.multipleTable;
      if (this.formField.releaseObject == "") {
        this.formLis = [];
      }
      this.toViewd = true;
      this.showToView = this.showToView + "1";
    },
    // 已发布公告编辑事件
    sendUP(val, sta) {
      let res = JSON.parse(JSON.stringify(val));
      this.updata = JSON.parse(JSON.stringify(val));
      this.active = "a";
      // this.tabsKey = this.tabsKey + 1;        // 修复编辑页面不显示
      this.state = sta;
      this.textMap = "修改公告";
      this.tableButtons[0].text = "修改";
      this.tableButtons[0].compKey = this.tableButtons[0].compKey + 1;
      this.tableButtons[2].class = null;
      this.tableButtons[2].compKey = this.tableButtons[2].compKey + 1;
      this.formField.title = res.title;
      this.formField.content = res.content;
      this.$refs.compKey5[0].filePath = this.fileUplodName(
        res.attachfiles.split(";")
      ); // 上传附件组件名称展示
      this.fileEdit = res.attachfiles.split(";"); // 编辑附件展示
      // 附件展示无数据时隐藏
       if(res.attachfiles==""){
         this.fileEdit=[]
       }
      this.formField.files = res.attachfiles;
      this.formField.src = res.sources;
      this.formField.summary = res.summary;
      this.noticeid = res.noticeid;

      let tars = JSON.parse(JSON.stringify(res.audiences));
      let str = "";
      for (const i in tars) {
        if (tars[i].objtype === "0") {
          str += tars[i].fullname + ",";
        } else if (tars[i].objtype === "5") {
          str += tars[i].fullname + ",";
        }
      }
      str = str.substring(0, str.lastIndexOf(","));
      this.formField.target = str;
      this.formLis = tars;
    },
    // 编辑 上传组件显示名称
    fileUplodName(val) {
      let str = "";
      if (val != "") {
        for (let i = 0; i < val.length; i++) {
          str += val[i].split("|")[0];
          str += ",";
        }
      }
      return str;
    },
    // 附件展示回调
    fileEditName(val) {
      return val.split("|")[0];
    },
    // 点击上传事件
    filed(file) {
      this.upload(file);
    },
    // 上传API
    upload(param) {
      var that = this;
      const url = "/mp/file/notice/upload.do";
      that
        .$requestUpload(url, param)
        .then(response => {
          if (response.result === "1") {
            // 多个附件判断
            if (that.formField.files == "") {
              that.formField.files = response.path[0][0];
            } else {
              that.formField.files += ";";
              that.formField.files += response.path[0][0];
            }
            that.fileEdit = that.formField.files.split(";");
          }
        })
        .catch(err => {
          console.info(err);
        });
    },
    // 发布事件
    issue() {
      this.saveApi();
    },
    // 附件展示下载
    fileDownload(val) {
      window.location.href = val.split("|")[1];
    },
    // 附件删除
    fileDel(val, index) {
      this.$confirm("请确定是否删除该附件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let file = this.formField.files.split(";");
        let del = file.splice(index, 1);
        // 上传保存需要参数
        this.formField.files = file.join(";");
        // 附件展示需要参数
        this.fileEdit = file;
        // 上传组件名称需要参数
        this.$refs.compKey5[0].filePath = this.fileUplodName(file);
      });
    },
    // 附件清空删除事件
    delectfiled() {
      this.formField.files = "";
      this.fileEdit = [];
      this.$refs.compKey5[0].filePath = "";
    },
    //  保存api
    saveApi() {
      var that = this;
      let sta = this.state;
      // 替换文本中的img图片,解决传递图片的问题
      this.formField.content = this.formField.content.replace(/<\/?(img)[^>]*>/gi, '');
      // 保存参数
      let list2 = JSON.parse(JSON.stringify(this.formLis));
      let saveData = JSON.parse(JSON.stringify(this.formField));
      let arr = [];
      if (list2 != null) {
        for (let i = 0; i < list2.length; i++) {
          // 组织
          if (list2[i].objtype === "0") {
            let obj = {};
            obj.type = list2[i].objtype;
            obj.id = list2[i].objid;
            obj.userType = undefined;
            obj.text = list2[i].fullname;
            obj.isChangeSetting = undefined;
            obj.orgRealationId = list2[i].objid;
            arr.push(obj);
          }
          // if (list2[i].objtype === "5") {
          //   // 用户
          //   let obj = {};
          //   obj.type = list2[i].objtype;
          //   obj.id = list2[i].objid;
          //   obj.userType = 0;
          //   obj.text = list2[i].fullname;
          //   obj.isChangeSetting = undefined;
          //   arr.push(obj);
          // }
        }
      }
      // 新增
      if (sta === "add") {
        saveData.target = JSON.stringify(arr);
        this.$store
          .dispatch("sysManage/announcementAdd", saveData)
          .then(response => {
            if (response.result === "1") {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.togle("succ");
              this.announcementInformation()
              this.$refs.rightList.query();
            } else {
              this.$message({
                type: "warning",
                message: this.issueStyle[response.msg] || "保存失败"
              });
            }
          });
        // 保存
      } else if (sta === "edit") {
        saveData.target = JSON.stringify(arr);
        saveData.noticeid = this.noticeid;
        saveData.orgRealationId = this.noticeid;
        this.$store
          .dispatch("sysManage/announcementUpdate", saveData)
          .then(response => {
            if (response.result === "1") {
              this.$message({
                type: "success",
                message: "修改成功"
              });
              this.togle("succ");
              this.announcementInformation()
              this.$refs.rightList.query();
            } else {
              this.$message({
                type: "warning",
                message: this.issueStyle[response.msg] || "修改失败"
              });
            }
          });
      } else {
        return false;
      }
    },
    // 未读公共信息查询
    announcementInformation(){
      this.$store.dispatch("sysManage/announcementInformation").then(response=>{
        if(response.result=="1"){
          // 传入VUEX
          this.$store.commit("app/SET_UNREAD",response.rows.num)
        }
      })
    },
    // 新增
    togle(type) {
      if (type == "succ") {
        this.formLis = [];
        this.fileEdit = [];
        this.formField.title = "";
        this.formField.content = "";
        this.formField.target = "";
        this.formField.files = "";
        this.formField.src = "";
        this.formField.summary = "";
        this.active = "b";
        this.state = "add";
        this.btnShow = null;
        this.textMap = "新增公告";
        this.tableButtons[0].text = "发布";
        this.tableButtons[0].compKey = this.tableButtons[0].compKey + 1;
        this.tableButtons[2].class = "showBtn";
        this.tableButtons[2].compKey = this.tableButtons[2].compKey + 1;
        this.tabsKey = this.tabsKey + 1;
      } else {
        this.$confirm("此操作将会舍弃当前的修改，是否继续?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        }).then(() => {
          this.formLis = [];
          this.fileEdit = [];
          this.formField.title = "";
          this.formField.content = "";
          this.formField.target = "";
          this.formField.files = "";
          this.formField.src = "";
          this.formField.summary = "";
          this.active = "a";
          this.state = "add";
          this.btnShow = null;
          this.textMap = "新增公告";
          this.tableButtons[0].text = "新增";
          this.tableButtons[0].compKey = this.tableButtons[0].compKey + 1;
          this.tableButtons[2].class = "showBtn";
          this.tableButtons[2].compKey = this.tableButtons[2].compKey + 1;
          this.tabsKey = this.tabsKey + 1;
        });
      }
    }
  },
  watch: {
    active: {
      handler: function name(params) {
        this.active = params;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.filter-params{
  padding:0!important
}
/deep/.filter-params .el-col .el-input {
  max-width: 100% !important;
}
/deep/.futext {
  display: flex;
  margin-left: -10px;
}
/deep/ .futextd {
  display: flex;
  margin-left: -20px;
  margin-bottom: 10px;
}
/deep/.tTitle {
  margin-right: 8px;
  margin: 0 8px 0 48px;
  white-space: normal;
}
/deep/.textRow {
  width: 83%;
}
/deep/ .ired {
  color: #f00;
  margin-right: 5px;
}
/deep/ .fileDel {
  margin-left: 5px;
  color: #1b1bf7;
}
/deep/ .fileDiv {
  margin-right: 20px;
}
/deep/.container-app {
  padding: 10px 0 0 0;
  background: #fff;
  margin: 0 10px;
  height: calc(100vh - 81px);
}
/deep/.filter-params-e3s {
  background: #fff;
}
/deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav{
  border:none!important
}
/deep/ .el-tabs__item.is-top{
  border-left: none;
}

</style>

