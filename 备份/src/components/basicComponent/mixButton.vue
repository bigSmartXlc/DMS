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
        <template v-for="(item, i) in btnLeft">
          <el-link
            style="margin-left: 10px"
            v-if="item.type === 'text'"
            :key="`${item.name}btn_${i}`"
            class="linkFont"
            :href="item.URL"
            :download="item.name"
            :underline="false"
            >{{ item.text || "导入模板下载" }}</el-link
          >
          <!-- 备注 -->
          <el-link
            style="margin-left: 10px"
            v-else-if="item.type === 'remark'"
            :key="`${item.name}btn_${i}`"
            class="linkFont linkRemark"
            :underline="false"
            >{{ item.text }}</el-link
          >
          <!-- 附件上传 -->
          <el-upload
            v-else-if="item.position === 'upload'"
            :key="`${item.name}btn_${i}`"
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
              class="iconfont icon-importTemplate"
              :compKey="item.compKey"
              :type="item.type"
              :size="item.size"
              :class="item.class"
              :disabled="item.disabled"
              @click="doChildEvent(item.clickEvent, item.argument)"
              style="margin-left: 10px"
              >{{ item.text }}</el-button
            >
          </el-upload>
          <el-upload
            v-else-if="item.position === 'uploadMul'"
            :key="`${item.name}uploadMul_${i}`"
            ref="uploadMul"
            class="upload-demo"
            action
            :http-request="item.handleChange"
            :data="uploadData"
            name="excelFile"
            :on-preview="item.handlePictureCardPreview"
            :file-list="fileList"
            :on-error="item.uploadFalse"
            :auto-upload="true"
            :before-upload="item.beforeAvatarUpload"
            :before-remove="item.beforeRemove"
            :on-exceed="item.handleExceed"
            :on-change="item.handFileListChange"
            :limit="1"
            :show-file-list="false"
            :disabled="isDisabled"
            list-type="text"
          >
            <el-button
              v-for="(obj, i) in item.btnUpload"
              :key="`${name}attachUpload_${i}`"
              class="iconfont icon-importTemplate"
              :compKey="obj.compKey"
              :type="obj.type"
              :size="obj.size"
              :class="obj.class"
              :disabled="obj.disabled"
              @click="doChildEvent(obj.clickEvent, obj.argument)"
              style="margin-left: 10px"
              >{{ obj.text }}</el-button
            >
          </el-upload>
          <el-button
            v-else
            :key="`${item.name}Left_${i}`"
            :compKey="item.compKey"
            :type="item.type"
            :size="item.size"
            @click="doChildEvent(item.clickEvent, item.argument)"
            :class="item.class"
            :disabled="item.disabled"
            v-show="item.isShow || item.isShow === undefined ? true : false"
            >{{ item.text }}</el-button
          >
        </template>
        <el-dropdown v-if="btnLeftMore.length !== 0">
          <span class="el-dropdown-link">
            更多
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item, i) in btnLeftMore"
              :key="`${item.name}LeftMore${i}`"
              :command="item"
            >
              <el-link
                v-if="item.type === 'text'"
                :key="`${item.name}btn_${i}`"
                class="linkFont"
                :href="item.URL"
                :download="item.name"
                :underline="false"
                >{{ item.text || "导入模板下载" }}</el-link
              >
              <!-- 附件上传 -->
              <el-upload
                v-else-if="item.position === 'upload'"
                :key="`${item.name}btn_${i}`"
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
                  class="iconfont icon-importTemplate"
                  :compKey="item.compKey"
                  :type="item.type"
                  :size="item.size"
                  :class="item.class"
                  :disabled="item.disabled"
                  @click="doChildEvent(item.clickEvent, item.argument)"
                  style="margin-left: 10px"
                  >{{ item.text }}</el-button
                >
              </el-upload>
              <el-upload
                v-else-if="item.position === 'uploadMul'"
                :key="`${item.name}uploadMul_${i}`"
                ref="uploadMul"
                class="upload-demo"
                action
                :http-request="item.handleChange"
                :data="uploadData"
                name="excelFile"
                :on-preview="item.handlePictureCardPreview"
                :file-list="fileList"
                :on-error="item.uploadFalse"
                :auto-upload="true"
                :before-upload="item.beforeAvatarUpload"
                :before-remove="item.beforeRemove"
                :on-exceed="item.handleExceed"
                :on-change="item.handFileListChange"
                :limit="1"
                :show-file-list="false"
                :disabled="isDisabled"
                list-type="text"
              >
                <el-button
                  v-for="(obj, i) in item.btnUpload"
                  :key="`${name}attachUpload_${i}`"
                  class="iconfont icon-importTemplate"
                  :compKey="obj.compKey"
                  :type="obj.type"
                  :size="obj.size"
                  :class="obj.class"
                  :disabled="obj.disabled"
                  @click="doChildEvent(obj.clickEvent, obj.argument)"
                  style="margin-left: 10px"
                  >{{ obj.text }}</el-button
                >
              </el-upload>
              <el-button
                v-else
                :key="`${item.name}Left_${i}`"
                :compKey="item.compKey"
                :type="item.type"
                :size="item.size"
                @click="doChildEvent(item.clickEvent, item.argument)"
                :class="item.class"
                :disabled="item.disabled"
                v-show="item.isShow || item.isShow === undefined ? true : false"
                >{{ item.text }}</el-button
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <!-- 右边按钮 -->
      <el-col :span="positionSpan[1]" class="u-btn-right">
        <div
          class="right-btn"
          :class="isshowMoreButton ? 'floatDiv-left' : 'floatDiv-right'"
        >
          <el-button
            v-show="
              (item.isShow || item.isShow === undefined ? true : false) &&
              ((toggleParam && showfuzzyQuery) || !showfuzzyQuery)
            "
            v-for="(item, i) in btnRight"
            :key="`${item.name}Right_${i}`"
            :compKey="item.compKey"
            :type="item.type"
            :size="item.size"
            @click="doChildEvent(item.clickEvent, item.argument)"
            :class="item.class"
            :disabled="item.disabled"
            >{{ item.text }}</el-button
          >
        </div>
        <!-- 模糊搜索 -->
        <div
          :class="isshowMoreButton ? 'floatDiv-left' : 'floatDiv-right'"
          id="fuzzyquery"
          class="right-btn"
          v-show="!toggleParam && showfuzzyQuery"
        >
          <el-input
            :placeholder="searchFields"
            v-model="searchValue"
            class="input-with-select"
          >
            <el-button
              type="primary"
              slot="append"
              icon="el-icon-search"
              @click="doChildEvent(scFields.clickEvent, scFields.argument)"
              >{{ searchLabel }}</el-button
            >
          </el-input>
        </div>
        <!-- 高级搜索 -->
        <el-button
          v-if="isshowMoreButton"
          :icon="moreBtnIcon"
          type="default"
          @click="changeToggleParam"
          class="moreParam"
          plain
          >{{ moreLabel }}</el-button
        >
      </el-col>
    </el-row>

    <el-row v-if="templateType">
      <!-- 右边按钮 -->
      <el-col :span="24" class="u-btn-right">
        <div class="floatDiv-right">
          <el-button
            v-for="(item, i) in tableButtons"
            :key="`${item.name}Right_${i}`"
            :compKey="item.compKey"
            :disabled="item.disabled"
            :type="item.type"
            :size="item.size"
            @click="doChildEvent(item.clickEvent, item.argument)"
            :class="item.class"
            >{{ item.text }}</el-button
          >
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
    // 默认展示查询内容
    dynamicToggleParam: { type: Boolean, default: false },
    // 是否显示高级搜索内容
    isShowMore: { type: Boolean, default: false },
    // 是否显示高级搜索内容
    isShowMoreText: { type: String, default: "" },
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
      default: function () {
        return {};
      },
    },
    // 动态组件
    dynamicComponents: {
      type: Array,
      default: function () {
        return [];
      },
    },
    //是否弹窗
    templateType: { type: Boolean, default: false },
    category: { type: String, default: "se" },
    positionSpan: { type: Array, default: () => [12, 12] },
    //上传按钮是否禁用
    isDisabled: { type: Boolean, default: false },
  },
  data() {
    return {
      // 表单列
      btnLeft: [],
      btnLeftMore: [],
      btnRight: [],
      tableButtons: this.dynamicButtons,
      modeCode: "",
      moreLabel:
        this.isShowMoreText || this.$t("sys.button.advSearch") /* 高级搜索 */,
      searchLabel: this.$t("sys.button.genSearch") /* 搜索 */,
      moreBtnIcon: "iconfont icon-dowm",
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
        default: function () {
          return [];
        },
      },
      //默认是否显示查询条件
      defaultSearchCompons: { type: Boolean, default: false },
      //数组模糊查询条件
      arraysearchformField: [],
      //附件上传返回路径
      attachUploadPath: "",
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
    if (this.dynamicToggleParam === true && this.isshowMoreButton === true) {
      this.$nextTick(() => {
        this.changeToggleParam();
      })
    }
  },
  watch: {
    searchValue(val) {
      for (var y in this.formField) {
        if (this.searchformField.codeField === y) {
          console.log(this.searchformField.codeField, y);
          this.formField[y] = val;
        }
      }
    },
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
      this.$emit("toggle", true);
      this.$emit("changWHeight");
      this.toggleParam = !this.toggleParam;
      if (this.toggleParam) {
        this.moreBtnIcon = "iconfont icon-up";
        this.moreLabel = this.$t("sys.button.pubAway"); /* 收起 */
      } else {
        this.moreBtnIcon = "iconfont icon-dowm";
        this.moreLabel =
          this.isShowMoreText || this.$t("sys.button.advSearch"); /* 高级搜索 */
      }
    },
    //按钮布局
    setBtns() {
      const that = this;
      var leftButtons = [];
      var rightButtons = [];
      for (let index in this.tableButtons) {
        var m = this.tableButtons[index];
        if (m.position) {
          if (m.position === "right") {
            rightButtons.push(m);
          } else {
            leftButtons.push(m);
          }
        } else {
          rightButtons.push(m);
        }
      }
      this.btnLeft = leftButtons.slice(0, this.showbtnLength);
      if (this.tableButtons.length > this.showbtnLength) {
        this.btnLeftMore = leftButtons.slice(this.showbtnLength);
      }
      this.btnRight = rightButtons;
      this.btnLeft.map(function (item) {
        that.setIcon(item);
      });
      this.btnLeftMore.map(function (item) {
        that.setIcon(item);
      });
      this.btnRight.map(function (item) {
        that.setIcon(item);
      });
    },
    //按钮图标
    setIcon(item) {
      // 若查看icon/name名称路径src\utils\iconfontMoth.js；（使用mixButton的用name赋值：例如： icon: "preservation";若没使用mixButton(网格弹窗)的用icon赋值：例如： icon: "iconfont  icon-preservation",）
      this.iconfontMoth.iconfont(item);
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
      this.$refs.upload[0].clearFiles();
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
      this.$refs.upload[0].clearFiles();
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
      this.$refs.upload[0].clearFiles();
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
        .then((response) => {
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
          }
          // that.$emit("changeCode", code, text, that.codeField, that.comType);
        })
        .catch((err) => {
          that.modeCode = "";
          console.info(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-input-group--append input {
  height: 30px;
}
/deep/.showBtn {
  display: none;
}
.linkFont {
  font-size: 12px;
}
a:hover,
a:focus {
  text-decoration: underline;
}
.el-link.is-underline:hover:after {
  border: none;
}
.el-dropdown-menu--small .el-dropdown-menu__item {
  line-height: 30px;
}
.linkRemark {
  cursor: default !important;
  text-decoration: none !important;
  color: red !important;
  height: 26px;
}
</style>
