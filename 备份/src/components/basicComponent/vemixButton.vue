<!--
* description: 模板-表单
* author: zhongchh
* createdDate: 2019-10-06
* logs:
  2019-12-06 linwm 添加按钮的可配置是否显示
-->
<template>
  <section class="mixButton">
    <el-row v-if="!templateType">
      <!-- 左边按钮 -->
      <el-col :span="positionSpan[0]" class="u-btn-left">
        <el-button
          v-for="(item, i) in btnA"
          :key="`${name}A_${i}`"
          :type="item.type"
          :name="item.name"
          :disabled="item.disabled"
          :class="item.class"
          v-show="item.isShow || item.isShow === undefined ? true: false"
        >
          <a class="linkFont" :href="item.URL" :download="item.name">{{item.text||"导入模板下载"}}</a>
        </el-button>
        <!-- 上传按钮 -->
        <slot name="uploadSlot">
          <el-upload
            ref="upload"
            class="upload-demo"
            action
            :http-request="handleChange"
            :data="uploadData"
            name="excelFile"
            :on-preview="handlePictureCardPreview"
            :file-list="fileList"
            :on-error="uploadFalse"
            :auto-upload="true"
            :before-upload="beforeAvatarUpload"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :on-change="handFileListChange"
            :limit="1"
            :show-file-list="false"
            :disabled="isDisabled"
            list-type="text"
          >
            <el-button
              v-for="(item, i) in btnUpload"
              :key="`${name}upload_${i}`"
              :compKey="item.compKey"
              :type="item.type"
              :size="item.size"
              :class="item.class"
              :disabled="item.disabled"
              @click="doChildEvent(item.clickEvent, item.argument)"
            >{{item.text}}</el-button>
          </el-upload>
        </slot>

        <!-- 附件上传 -->
        <el-input
          v-model="modeCode"
          style="width:200px;"
          readonly
          v-if="btnAttachUpload.length !== 0"
        >
          <el-upload
            class="upload-demo"
            ref="attachUpload"
            slot="append"
            action
            :http-request="attachHandleChange"
            :show-file-list="false"
          >
            <el-button
              v-for="(item, i) in btnAttachUpload"
              :key="`${name}attachUpload_${i}`"
              :compKey="item.compKey"
              type="primary"
              size="small"
              :class="item.class"
              @click="doChildEvent(item.clickEvent, item.argument)"
            >{{item.text}}</el-button>
          </el-upload>
        </el-input>

        <el-button
          v-for="(item, i) in btnLeft"
          :key="`${name}Left_${i}`"
          :compKey="item.compKey"
          :type="item.type"
          :size="item.size"
          @click="doChildEvent(item.clickEvent, item.argument)"
          :class="item.class"
          :disabled="item.disabled"
           v-show="item.isShow || item.isShow === undefined ? true: false"
        >{{item.text}}</el-button>
        <el-dropdown @command="handleCommand" v-if="btnLeftMore.length !== 0">
          <span class="el-dropdown-link">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :icon="item.class"
              v-for="(item, i) in btnLeftMore"
              :key="`${name}LeftMore${i}`"
              :command="item"
            >{{item.text}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <!-- 右边按钮 -->
      <el-col :span="positionSpan[1]" class="u-btn-right">
        <div class="right-btn" :class="isshowMoreButton  ? 'floatDiv-left':'floatDiv-right'">
          <el-button
            v-show="(toggleParam && showfuzzyQuery)||!showfuzzyQuery"
            v-for="(item, i) in btnRight"
            :key="`${name}Right_${i}`"
            :compKey="item.compKey"
            :type="item.type"
            :size="item.size"
            @click="doChildEvent(item.clickEvent, item.argument)"
            :class="item.class"
            :disabled="item.disabled"
          >{{item.text}}</el-button>
        </div>
        <!-- 模糊搜索 -->
        <div
          :class="isshowMoreButton  ? 'floatDiv-left':'floatDiv-right'"
          id="fuzzyquery"
          class="right-btn"
          v-show="!toggleParam && showfuzzyQuery"
        >
          <el-input :placeholder="searchFields" v-model="searchValue" class="input-with-select">
            <el-button
              type="primary"
              slot="append"
              icon="el-icon-search"
              @click="doChildEvent(scFields.clickEvent,scFields.argument)"
            >{{searchLabel}}</el-button>
          </el-input>
        </div>
        <!-- 高级搜索 -->
        <el-button
          v-if="isshowMoreButton"
          :icon="moreBtnIcon"
          @click="changeToggleParam"
          class="serachButton-el"
          plain
        ></el-button>
      </el-col>
    </el-row>

    <el-row v-if="templateType">
      <!-- 右边按钮 -->
      <el-col :span="24" class="u-btn-right">
        <div class="floatDiv-right">
          <el-button
            v-for="(item, i) in tableButtons"
            :key="`${name}Right_${i}`"
            :compKey="item.compKey"
            :type="item.type"
            :size="item.size"
            @click="doChildEvent(item.clickEvent, item.argument)"
            :class="item.class"
          >{{item.text}}</el-button>
        </div>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  props: {
    // 创建表单的参数
    dynamicButtons: { type: Array, default: () => {} },
    //查询条件个数是否显示高级搜索
    isShowMore: { type: Boolean, default: false },
    // 组件名
    name: { type: String, default: "" },
    // 自定义按钮个数
    showbtnLength: { type: Number, default: 5 },
    // 组件识别名称（模拟key）
    compKey: { type: String, default: "" },
    // 按钮样式
    type: { type: String, default: "" },
    // 按钮尺寸
    size: { type: String, default: "small" },
    // 模糊搜索值
    svFields: { type: String, default: "" },
    // 导入列表
    fileList: { type: Array, default: () => [] },
    //导入参数
    uploadData: { type: Object, default: () => {} },
    //模糊搜索查询条件
    formField: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 动态组件
    dynamicComponents: {
      type: Array,
      default: function() {
        return [];
      }
    },
    //是否弹窗
    templateType: { type: Boolean, default: false },
    category: { type: String, default: "se" },
    positionSpan: { type: Array, default: () => [12, 12] },
    //上传按钮是否禁用
    isDisabled: {type: Boolean, default: false}
  },
  data() {
    return {
      // 表单列
      btnA: [],
      btnLeft: [],
      btnLeftMore: [],
      btnRight: [],
      btnUpload: [],
      //附件上传
      btnAttachUpload: [],
      tableButtons:this.dynamicButtons,
      modeCode: "",
      moreLabel: "高级搜索",
      searchLabel: "搜索",
      moreBtnIcon: "el-icon-caret-bottom",
      //是否显示高级搜索按钮
      isshowMoreButton: false,
      toggleParam: false,
      //搜索框数值
      searchValue: this.svFields,
      //搜索框默认提示内容
      searchFields: "",
      //单个模糊查询条件
      searchformField: {},
      //是否显示模糊查询
      showfuzzyQuery: { type: Boolean, default: false },
      //模糊搜索框显示项目
      scFields: {
        type: Object,
        default: function() {
          return [];
        }
      },
      //默认是否显示查询条件
      defaultSearchCompons: { type: Boolean, default: false },
      //数组模糊查询条件
      arraysearchformField: [],
      //附件上传返回路径
      attachUploadPath: ""
    };
  },
  created() {
    //设置button的图标
    this.setBtns();
    this.getFuzzySearch();
    if (this.templateType) {
      this.showfuzzyQuery = false;
      this.isshowMoreButton = false;
      //弹窗按钮
    } else {
      this.getIsnopopus();
    }
    this.getSearchButton();
  },
  watch: {
    searchValue(val) {
      for (var y in this.formField) {
        if (this.searchformField.codeField === y) {
          console.log(this.searchformField.codeField, y);
          this.formField[y] = val;
        }
      }
    }
  },
  methods: {
    //获取查询按钮
    getSearchButton() {
      if (
        this.tableButtons.length !== 0 &&
        this.dynamicComponents !== undefined
      ) {
        for (var i = 0; i < this.tableButtons.length; i++) {
          if (
            this.tableButtons[i].fuzzySearch !== "" &&
            this.tableButtons[i].fuzzySearch !== undefined &&
            this.tableButtons[i].fuzzySearch
          ) {
            this.scFields = this.tableButtons[i];
          }
        }
      }
    },
    //获取模糊查询条件
    getFuzzySearch() {
      if (
        this.dynamicComponents !== [] &&
        this.dynamicComponents !== undefined
      ) {
        var x = []; //默认是否显示查询条件
        var y = []; //数组模糊查询条件
        for (var i = 0; i < this.dynamicComponents.length; i++) {
          x.push(this.dynamicComponents[i].isMust);
          //是否显示模糊查询
          this.defaultSearchCompons = x;
          if (
            this.dynamicComponents[i].fuzzySearch !== undefined &&
            this.dynamicComponents[i].fuzzySearch !== "" &&
            this.dynamicComponents[i].fuzzySearch
          ) {
            y.push(this.dynamicComponents[i]); //多模糊查询条件
            this.arraysearchformField = y;
            this.searchformField = this.dynamicComponents[i]; //模糊查询条件
          }
        }
        //模糊查询框模糊条件提示
        for (var m = 0; m < y.length; m++) {
          if (y.length !== 0 && this.searchFields !== "") {
            this.searchFields = this.searchFields + " / " + y[m].labelName;
          } else {
            this.searchFields = y[m].labelName;
          }
        }
      }
    },
    //非弹窗模式
    getIsnopopus() {
      //非弹窗按钮
      if (this.dynamicComponents.length > 0) {
        // 显示模糊搜索
        this.defaultSearchCompons.includes(true)
          ? (this.showfuzzyQuery = false)
          : (this.showfuzzyQuery = true);
        //显示高级搜索
        this.defaultSearchCompons.includes(false)
          ? (this.isshowMoreButton = true)
          : (this.isshowMoreButton = false);
        //有查询条件，显示高级搜索按钮
      } else if (this.dynamicComponents.length === 0) {
        this.showfuzzyQuery = false;
        this.isshowMoreButton = false;

        //没有查询条件，只显示普通按钮
      }
    },
    //左侧更多下拉按钮方法
    handleCommand(command) {
      this.doChildEvent(command.clickEvent, command.argument);
    },
    //高级搜索方法
    changeToggleParam() {
      this.$emit("toggle");
      this.$emit("changWHeight");
      this.toggleParam = !this.toggleParam;
      if (this.toggleParam) {
        this.moreBtnIcon = "el-icon-caret-top";
        this.moreLabel = "收起";
      } else {
        this.moreBtnIcon = "el-icon-caret-bottom";
        this.moreLabel = "高级搜索";
      }
    },
    //按钮布局
    setBtns() {
      const that = this;
      var leftButtons = [];
      var uploadButtons = [];
      var attachUploadButtons = [];
      var rightButtons = [];
      var downloadButton = [];
      for (let index in this.tableButtons) {
        var m = this.tableButtons[index];
        if (m.position === "left") {
          leftButtons.push(m);
        } else if (m.position === "upload") {
          uploadButtons.push(m);
        } else if (m.position === "attachUpload") {
          attachUploadButtons.push(m);
        } else if (m.position === "download") {
          downloadButton.push(m);
        } else {
          rightButtons.push(m);
        }
      }
      this.btnLeft = leftButtons.slice(0, this.showbtnLength);
      if (this.tableButtons.length > this.showbtnLength) {
        this.btnLeftMore = leftButtons.slice(this.showbtnLength);
      }
      this.btnRight = rightButtons;
      this.btnLeft.map(function(item, i) {
        that.setIcon(item);
      });
      this.btnLeftMore.map(function(item, i) {
        that.setIcon(item);
      });
      this.btnRight.map(function(item, i) {
        that.setIcon(item);
      });
      this.btnUpload = uploadButtons;
      this.btnAttachUpload = attachUploadButtons;
      this.btnA = downloadButton;
    },
    //按钮图标
    setIcon(item) {
      switch (item.name) {
        case "add": //新增
          item.class = "iconfont icon-newlyAdded";
          break;
        case "search": //查询
          item.class = "iconfont icon-search";
          break;
        case "reset": //重置
          item.class = "iconfont icon-reset";
          break;
        case "export": //导出
          item.class = "iconfont icon-export";
          break;
        case "reject": //驳回
          item.class = "iconfont icon-reject";
          break;
        case "stock": //库存
          item.class = "iconfont icon-stock";
          break;
        case "detailed": //明细
          item.class = "iconfont icon-detailed";
        case "refuse": //拒绝
          item.class = "iconfont icon-refuse";
          break;
        case "reasonRecovery": //回复原因
          item.class = "iconfont icon-reasonRecovery";
          break;
        case "closingInventory": //结束盘点
          item.class = "iconfont icon-closingInventory";
          break;
        case "closingAdded": //盘点新增
          item.class = "iconfont  icon-closingAdded";
          break;
        case "startCounting": //开始盘点
          item.class = "iconfont icon-startCounting";
          break;
        case "printing": //打印
          item.class = "iconfont icon-printing";
          break;
        case "SMSsending": //短信发送
          item.class = "iconfont icon-SMSsending";
          break;
        case "add": //PDI检查单
          item.class = "iconfont icon-newlyAdded";
          break;
        case "printReceipt": //打印入库单
          item.class = "iconfont icon-printReceipt";
          break;
        case "printStockInstruction": //打印入库指导单
          item.class = "iconfont icon-printStockInstruction";
          break;
        case "cancelApplicationForm": //撤销结算申请单
          item.class = "iconfont icon-cancelApplicationForm";
          break;
        case "importVINCode": //导入VIN码
          item.class = "iconfont icon-importVINCode";
          break;
        case "reverseAudit": //反审核
          item.class = "iconfont icon-reverseAudit";
          break;
        case "export": //导出
          item.class = "iconfont icon-export";
        case "cancel": //取消
          item.class = "iconfont icon-cancel";
          break;
        case "outStock": //出库
          item.class = "iconfont icon-outStock";
          break;
        case "matchingAudit": //匹配审核
          item.class = "iconfont icon-matchingAudit";
          break;
        case "inventoryModification": //盘点修改
          item.class = "iconfont  icon-inventoryModification";
          break;
        case "deleteSheet": //删除盘点单
          item.class = "iconfont icon-deleteSheet";
          break;
        case "adopt": //通过
          item.class = "iconfont icon-adopt";
          break;
        case "batchSubmit": //批量提交
          item.class = "iconfont icon-batchSubmit";
          break;

        case "warehousing": //入库
          item.class = "iconfont icon-warehousing";
          break;
        case "batchReason": //批量删除回复原因
          item.class = "iconfont icon-batchReason";
          break;
        case "exportDetails": //导出明细
          item.class = "iconfont icon-exportDetails";
          break;
        case "submissionUp": //提交
          item.class = "iconfont icon-submissionUp";
          break;
        case "newOrder": //新建订单
          item.class = "iconfont icon-newOrder";
          break;
        case "modifyCustomerProfile": //修改客户档案
          item.class = "iconfont icon-modifyCustomerProfile";
          break;
        case "returnTo": //退回
          item.class = "iconfont icon-returnTo";
        case "exportMasterTable": //导出主表
          item.class = "iconfont icon-exportMasterTable";
          break;
        case "applicationForm": //制作结算申请单
          item.class = "iconfont icon-applicationForm";
          break;
        case "financialAudit": //财务审核
          item.class = "iconfont icon-financialAudit";
          break;
        case "preservation": //保存
          item.class = "iconfont  icon-preservation";
          break;
        case "examine": //审核
          item.class = "iconfont icon-examine";
          break;
        case "synchronizeCustomerProfile": //同步客户档案
          item.class = "iconfont icon-synchronizeCustomerProfile";
          break;
        case "regenerateDocument": //重新生成单据
          item.class = "iconfont icon-regenerateDocument";
          break;

        case "importTemplateDownload": //导入模版下载
          item.class = "iconfont icon-importTemplateDownload";
          break;
        case "manHourAllocation": //工时分摊
          item.class = "iconfont icon-manHourAllocation";
          break;
        case "importRecallProject": //导入召回专案
          item.class = "iconfont icon-importRecallProject";
          break;
        case "return": //返回
          item.class = "iconfont icon-return";
          break;
        case "importTemplate": //导入模版
          item.class = "iconfont icon-importTemplate";
          break;
        case "importAppointment": //导入预约
          item.class = "iconfont icon-importAppointment";
          break;
        case "customerVehicleDetails": //客户车辆详情
          item.class = "iconfont icon-customerVehicleDetails";
        case "inventoryEntry": //盘点录入
          item.class = "iconfont icon-inventoryEntry";
          break;
        case "showBtn": //显示隐藏按钮
          item.class = "showBtn";
          break;
        case "submission": //提交
          item.class = "iconfont icon-submission";
          break;
        case "saveSubmit": //保存并提交
          item.class = "iconfont icon-saveSubmit";
          break;
        case "confirm": //确认
          item.class = "iconfont  icon-confirm";
          break;
        case "maintenanceResume": //维修履历
          item.class = "iconfont icon-maintenanceResume";
          break;
        case "realImport": //实数导入
          item.class = "iconfont icon-realImport";
          break;
        case "signOut": //退出
          item.class = "iconfont icon-signOut";
          break;

        case "selectCustomers": //选择客户
          item.class = "iconfont icon-selectCustomers";
          break;
        case "temporaryStorage": //修改
          item.class = "iconfont icon-temporaryStorage";
          break;
        case "temporaryStorage": //暂存
          item.class = "iconfont icon-temporaryStorage";
          break;
        case "GPS": //gps
          item.class = "iconfont icon-GPS";
          break;
        case "additionalHours": //新增工时
          item.class = "iconfont icon-additionalHours";
          break;
        case "details": //详情
          item.class = "iconfont icon-details";
          break;
        case "deleteHour": //删除工时
          item.class = "iconfont icon-deleteHour";
        case "more": //更多
          item.class = "iconfont icon-more";
          break;
        case "message": //消息
          item.class = "iconfont icon-remind_fill";
          break;
        case "help": //帮助
          item.class = "iconfont icon-help";
          break;
        case "advancedSearch": //高级搜索
          item.class = "iconfont  icon-advancedSearch";
          break;

        case "returnVisit": //投诉回访
          item.class = "iconfont icon-returnVisit";
          break;
        case "capital": //资金明细
          item.class = "iconfont icon-capital";
          break;
        case "synchronization": //同步
          item.class = "iconfont icon-synchronization";
          break;
        case "applicationComplaint": //投诉申诉申请
          item.class = "iconfont icon-applicationComplaint";
        case "carProgress": //提车进度
          item.class = "iconfont icon-carProgress";
          break;
        case "clueCleaning": //线索清洗
          item.class = "iconfont icon-clueCleaning";
          break;
        case "heallSynchronizationlp": //全部同步
          item.class = "iconfont icon-allSynchronization";
          break;
        case "switch": //经销商启用开关
          item.class = "iconfont  icon-switch";
          break;
      }
    },
    //按钮方法
    doChildEvent(clickEvent, args, name) {
      args = args || {};
      if (typeof clickEvent === "function") {
        clickEvent({ ...args });
      } else {
        if (clickEvent) {
          let t = this.$parent;
          while (!t[clickEvent]) {
            t = t.$parent;
          }
          t[clickEvent]({ ...args });
        }
      }
    },
    //上传前
    handleChange(param) {
      let t = this.$parent;
      while (!t.handleChange) {
        t = t.$parent;
      }
      t.handleChange(param);
    },
    //上传成功
    uploadSuccess(response) {
      let t = this.$parent;
      while (!t.uploadSuccess) {
        t = t.$parent;
      }
      t.uploadSuccess(response);
      this.$refs.upload.clearFiles();
    },
    //上传失败
    uploadFalse(response, file, fileList) {
      let t = this.$parent;
      while (!t.uploadFalse) {
        t = t.$parent;
      }
      t.uploadFalse(response, file, fileList);
    },

    beforeAvatarUpload(file) {
      this.$refs.upload.clearFiles();
      let t = this.$parent;
      while (!t.beforeAvatarUpload) {
        t = t.$parent;
      }
      return t.beforeAvatarUpload(file);
    },
    beforeRemove(file, fileList) {
      let t = this.$parent;
      while (!t.beforeRemove) {
        t = t.$parent;
      }
      return t.beforeRemove(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$refs.upload.clearFiles();
      this.$parent.handleExceed(files, fileList);
    },
    handFileListChange(file, fileList) {
      let t = this.$parent;
      while (!t.handFileListChange) {
        t = t.$parent;
      }
      t.handFileListChange(file, fileList);
    },
    handlePictureCardPreview(file) {
      let t = this.$parent;
      while (!t.handlePictureCardPreview) {
        t = t.$parent;
      }
      t.handlePictureCardPreview(file);
    },
    //附件上传
    attachHandleChange(param) {
      const that = this;
      // MP上传url
      const url = "/mp/file/" + that.category + "/upload.do";
      that
        .$requestUpload(url, param)
        .then(response => {
          let code = "";
          let text = "";
          that.modeCode = "";
          if (
            response.result === "1" &&
            response.path.length > 0 &&
            response.path[0].length > 0 &&
            response.path[0][0].indexOf("|") > -1
          ) {
            // 返回格式：[["xxxx.png|/upload/{category}/{yyyyMMdd}/{guid}/xxxx.jpg","xxx.xx KB"]]
            // 截取出/upload/{category}/{yyyyMMdd}/{guid}/xxxx.jpg返回
            that.modeCode = response.path[0][0].split("|")[0];
            //获取返回路径
            that.attachUploadPath = response.path[0][0].split("|")[1];
            console.log(that.attachUploadPath);
            // code = that.modeCode;
          }
          // that.$emit("changeCode", code, text, that.codeField, that.comType);
        })
        .catch(err => {
          that.modeCode = "";
          console.info(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-input-group--append input {
  height: 30px;
}
/deep/.showBtn {
  display: none;
}
.serachButton-el{
  // width:100%;
  border: 0px;
}
</style>
