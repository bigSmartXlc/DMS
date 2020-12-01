<!--
* description: 系统设置
* author: yxyan
* createdDate: 2019-10-17
-->
<template>
  <section class="systemSet">
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      :title="textMap[popupsState]"
      :append-to-body="true"
      :visible.sync="curPopupsVisible"
      @close="sendCode"
      width="700px"
    >
      <dialogHeader
        slot="title"
        :title="textMap[popupsState]"
        :styleType="$store.state.app.dialogType"
      ></dialogHeader>
      <div class="filter-params-e3s">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="container-app">
          <el-tab-pane label="系统设置" name="first">
            <div class="filter-container filter-params">
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
                  :isMul="comp.isMul"
                  :inputType="comp.inputType"
                  :span="comp.span || 8"
                  :labelName="comp.labelName"
                  :lookuptype="comp.lookuptype"
                  :dateOptionsType="comp.dateOptionsType"
                ></component>
              </el-row>
            </div>
            <div class="dialog-footer setIntoRight sysbottom">
              <el-button
                v-for="comp in tableButtons"
                :key="comp.compKey"
                :type="comp.type"
                @click="comp.clickEvent"
              >{{comp.text}}</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="安全设置" name="second">
            <div class="filter-container filter-params">
              <el-row :gutter="26" ref="vailComponentList">
                <component
                  v-for="comp in tableComponents1.filter(o => o.isMust === true && o.pageArea === '登录方式')"
                  :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
                  :validrule="comp.validrule"
                  :key="comp.compKey"
                  :codeField="comp.codeField"
                  :textField="comp.textField"
                  :popupsKey="comp.compKey"
                  :is="comp.component"
                  :code="formField1[comp.codeField]"
                  @changeCode="getComponentCode1"
                  @focusCode="getFocusCode"
                  :options="comp.options"
                  :oFields="comp.oFields"
                  :dataToObject="comp.dataToObject"
                  :disabled="comp.disabled"
                  :isRequire="comp.isRequire"
                  :isMul="comp.isMul"
                  :inputType="comp.inputType"
                  :span="comp.span || 8"
                  :labelName="comp.labelName"
                  :lookuptype="comp.lookuptype"
                  :dateOptionsType="comp.dateOptionsType"
                ></component>
              </el-row>
            </div>

            <div class="filter-container filter-params">
              <el-row :gutter="26" ref="vailComponentList">
                <div class="filter-container filter-title" ref="passwordSet">密码设置</div>
                <component
                  v-for="comp in tableComponents1.filter(o => o.isMust === true && o.pageArea === '密码设置')"
                  :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
                  :validrule="comp.validrule"
                  :key="comp.compKey"
                  :codeField="comp.codeField"
                  :textField="comp.textField"
                  :popupsKey="comp.compKey"
                  :is="comp.component"
                  :code="formField1[comp.codeField]"
                  @changeCode="getComponentCode1"
                  @focusCode="getFocusCode"
                  :dataToObject="comp.dataToObject"
                  :disabled="comp.disabled"
                  :isRequire="comp.isRequire"
                  :isMul="comp.isMul"
                  :inputType="comp.inputType"
                  :span="comp.span || 8"
                  :labelName="comp.labelName"
                  :lookuptype="comp.lookuptype"
                  :dateOptionsType="comp.dateOptionsType"
                ></component>
              </el-row>
            </div>
            <div class="filter-container filter-params">
              <div class="filter-container filter-title" ref="authenticationMode">账号锁定设置</div>
            </div>
            <div class="lock">
              <div class="noUseLockLeft">
                <span>账号异常锁定：</span>
              </div>
              <div class="noUseLockRight">
                <span>每</span>
                <commonInput :code="errtime" @changeCode="geterrtime" :span="2" />
                <span>分钟，密码或验证码录入错误</span>
                <commonInput :code="errnums" @changeCode="geterrnums" :span="2" />
                <span>次以上，锁定账号</span>
                <commonInput :code="blocktime" @changeCode="getblocktime" :span="2" />
                <span>分钟</span>
              </div>
            </div>
            <!-- <div class="note">
            <span>说明:规定时间内用户密码、验证码录入错误次数累计超出规定次数，账号将被锁定，账号锁定后在规定时间内不能登录系统.</span>
            </div>-->

            <div class="lock" v-show="true">
              <div class="noUseLockLeft">
                <span>账号未使用锁定：</span>
              </div>
              <div class="noUseLockRight">
                <div class="datePart">
                  <twoDatePicker
                    :dateType="datetime"
                    :isShowLabel="showLabel"
                    :span="14"
                    :code="date1"
                    @changeCode="getDate1"
                  />
                  <span>连续</span>
                  <commonInput :code="blockDay1" @changeCode="getBlockDay1" :span="2" />
                  <span>天不登录，锁定账号</span>
                </div>
                <div class="datePart">
                  <twoDatePicker
                    :dateType="datetime"
                    :isShowLabel="showLabel"
                    :span="14"
                    :code="date2"
                    @changeCode="getDate2"
                  />
                  <span>连续</span>
                  <commonInput :code="blockDay2" @changeCode="getBlockDay2" :span="2" />
                  <span>天不登录，锁定账号</span>
                </div>
                <div class="datePart">
                  <twoDatePicker
                    :dateType="datetime"
                    :isShowLabel="showLabel"
                    :span="14"
                    :code="date3"
                    @changeCode="getDate3"
                  />
                  <span>连续</span>
                  <commonInput :code="blockDay3" @changeCode="getBlockDay3" :span="2" />
                  <span>天不登录，锁定账号</span>
                </div>
              </div>
            </div>
            <div class="lock" v-show="true">
              <div class="noUseLockLeft">
                <span>系统开放时间：</span>
              </div>
              <div class="noUseLockRight">
                <span>每天</span>
                <timePicker :code="beginTime" @changeCode="getBeginTime" :span="6" format="HH:mm" />
                <span>——</span>
                <timePicker :span="6" :code="endTime" @changeCode="getEndTime" format="HH:mm" />
                <span>系统可正常登录</span>
              </div>
            </div>

            <div class="dialog-footer setIntoRight sysbottom">
              <el-button
                v-for="comp in tableButtons1"
                :key="comp.compKey"
                :type="comp.type"
                @click="comp.clickEvent"
              >{{comp.text}}</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="功能设置" name="three">
            <div class="filter-container filter-params">
              <div class="filter-container filter-title" ref="authenticationMode">显示系统功能</div>
            </div>
            <div class="authenticationMode">
              <el-row :gutter="24" ref="vailComponentList">
                <el-checkbox v-model="isSysSet" disabled>系统设置</el-checkbox>
                <el-checkbox v-model="isPsdChange">修改密码</el-checkbox>
                <el-checkbox v-model="isExit" disabled>注销</el-checkbox>
              </el-row>
            </div>
            <div class="dialog-footer setIntoRight sysbottom">
              <el-button
                v-for="comp in tableButtons1"
                :key="comp.compKey"
                :type="comp.type"
                @click="comp.clickEvent"
              >{{comp.text}}</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配置信息" name="configuring">
            <div class="filter-container filter-params">
              <el-row :gutter="26" ref="vailComponentList">
                <component
                  v-for="comp in tableComponents2.filter(o => o.isMust === true)"
                  :ref="comp.isRequire ? comp.isRequire+ comp.compKey : comp.compKey"
                  :validrule="comp.validrule"
                  :key="comp.compKey"
                  :codeField="comp.codeField"
                  :textField="comp.textField"
                  :popupsKey="comp.compKey"
                  :is="comp.component"
                  :code="formField2[comp.codeField]"
                  @changeCode="getComponentCode2"
                  @focusCode="getFocusCode"
                  :disabled="comp.disabled"
                  :isRequire="comp.isRequire"
                  :options="comp.options"
                  :oFields="comp.oFields"
                  :isMul="comp.isMul"
                  :inputType="comp.inputType"
                  :span="comp.span || 8"
                  :labelName="comp.labelName"
                  :lookuptype="comp.lookuptype"
                  :dateOptionsType="comp.dateOptionsType"
                ></component>
              </el-row>
            </div>
            <div class="dialog-footer setIntoRight sysbottom">
              <el-button
                v-for="comp in tableButtons2"
                :key="comp.compKey"
                :type="comp.type"
                @click="comp.clickEvent"
              >{{comp.text}}</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { formMixins } from "@/components/mixins/formMixins";
import { orgApis } from "@/api/apiList/org";
import { validUsername } from "@/utils/validate";
import storage from "@/utils/storage";
import qs from "qs";
export default {
  // 组件混入对象
  mixins: [formMixins],
  components: {
    dialogHeader: () => import("@/components/dialogHeader"), //弹窗标题
    commonInput: () => import("@/components/org/commonInput"), //输入框
    twoDatePicker: () => import("@/components/org/datePicker/twoDatePicker"),
    timePicker: () => import("@/components/org/timePicker/timePicker")
  },
  data() {
    return {
      //默认选第一个选项卡
      activeName: "first",
      // 保存API配置对象
      apiConfig: orgApis.sysRoleMutationGlobalSave,
      //模式认证的值
      normallogin: true,
      safedouble: false,
      dycodelogin: false,
      weixinlogin: false,
      facelogin: false,
      adlogin: false,

      //账号锁定设置的值
      errnums: "",
      errtime: "",
      blocktime: "",
      showLabel: false,
      datetime: "datetimerange",
      date1: "",
      date2: "",
      date3: "",
      beginTime: "",
      endTime: "",
      blockDay1: "",
      blockDay2: "",
      blockDay3: "",

      //功能设置弹窗
      isSysSet: true,
      isPsdChange: false,
      isExit: true,

      // 动态组件-按钮
      tableButtons: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.save(),
          text: this.$t("sys.button.save")
        }, // '保存'
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } //重置
      ],
      tableButtons1: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.save1(),
          text: this.$t("sys.button.save")
        }, // '保存'
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } //重置
      ],
      tableButtons2: [
        {
          compKey: "btnKey1",
          type: "primary",
          size: "small",
          clickEvent: () => this.save2(),
          text: this.$t("sys.button.save")
        }, // '保存'
        {
          compKey: "btnKey2",
          type: "",
          size: "small",
          clickEvent: () => this.reset(),
          text: this.$t("sys.button.reset")
        } //重置
      ],
      // 动态组件-查询条件
      tableComponents: [
        {
          compKey: "compKey1",
          labelName: "公司名称", //this.$t("org.label.roleCode"),
          codeField: "CompanyName",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //公司名称
        {
          compKey: "compKey2",
          labelName: "系统名称", //this.$t("org.label.roleName"),
          codeField: "sysName",
          inputType: "text",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //系统名称

        {
          compKey: "compKey3",
          labelName: "系统备案号", // this.$t("org.label.roleDesc"),
          codeField: "sysRegs",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //系统备案号
        {
          compKey: "compKey4",
          labelName: "系统编号", // this.$t("org.label.roleDesc"),
          codeField: "sysCode",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //系统编号
        {
          compKey: "compKey5",
          labelName: "系统版本号", // this.$t("org.label.roleDesc"),
          codeField: "sysVersion",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        } //系统版本号
      ],
      tableComponents1: [
        {
          compKey: "compKey1",
          labelName: "密码规则", //this.$t("org.label.roleCode"),
          codeField: "pwd_express",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          pageArea: '密码设置'
        }, //密码规则
        {
          compKey: "compKey2",
          labelName: "规则描述", //this.$t("org.label.roleName"),
          codeField: "pwd_express_desc",
          inputType: "text",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          pageArea: '密码设置'
        }, //规则描述
        {
          compKey: "compKey3",
          labelName: "过期时间（天）", // this.$t("org.label.roleDesc"),
          codeField: "usr_expires",
          span: 24,
          dataToObject: { maxWordCount: 7 },
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true,
          pageArea: '密码设置'
        }, //过期时间
        {
          compKey: "compKey11",
          labelName: "登录方式",
          codeField: "loginType",
          span: 24,
          oFields: 'value,text',
          options: [{value: '0', text: 'DMS账号认证'}, {value: '1', text: 'IAM统一认证'}],
          component: () => import("@/components/org/LookupValue"),
          type: "dropdownList",
          isMust: true,
          pageArea: '登录方式'
        } //登录方式：IAM统一认证、DMS账户认证
        // {
        //   compKey: "compKey4",
        //   labelName: "冲突次数", // this.$t("org.label.roleDesc"),
        //   codeField: "usr_errnums",
        //   span: 24,
        //   component: () => import("@/components/org/commonInput"),
        //   type: "inputText",
        //   isMust: true
        // } //冲突次数
      ],
      // 动态组件-查询条件
      tableComponents2: [
        {
          compKey: "compKey5",
          labelName: "是否启用配置化",
          codeField: "useConfigisEnable",
          span: 24,
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        }, //是否启用配置化
        {
          compKey: "compKey6",
          labelName: "是否启用配置缓存",
          codeField: "useCacheisEnable",
          span: 24,
          component: () => import("@/components/org/isEnable/isEnable"),
          type: "dropdownList",
          isMust: true
        }, //是否启用配置缓存
        {
          compKey: "compKey7",
          labelName: "缓存时长(秒)",
          codeField: "iscacheDuration",
          inputType: "text",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //缓存时长
        {
          compKey: "compKey8",
          labelName: "帆软服务路径",
          codeField: "fineReportUrl",
          inputType: "text",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //帆软报表服务器路径
        {
          compKey: "compKey9",
          labelName: "帆软账号",
          codeField: "fineReportUser",
          inputType: "text",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        }, //帆软报表服务器账号
        {
          compKey: "compKey10",
          labelName: "帆软密码",
          codeField: "fineReportPwd",
          inputType: "password",
          span: 24,
          component: () => import("@/components/org/commonInput"),
          type: "inputText",
          isMust: true
        } //帆软报表服务器密码

        // {
        //   compKey: "compKey3",
        //   labelName: "页面主题",
        //   codeField: "sysRegs",
        //   span: 24,
        //   component: () => import("@/components/org/commonInput"),
        //   type: "inputText",
        //   isMust: true
        // }, //页面主题
        // {
        //   compKey: "compKey4",
        //   labelName: "主菜单显示方式",
        //   codeField: "sysRegs",
        //   span: 24,
        //   component: () => import("@/components/org/commonInput"),
        //   type: "inputText",
        //   isMust: true
        // } //主菜单显示方式
      ],

      // 标题
      textMap: {
        edit: "系统设置", //修改弹框名字
        add: this.$t("org.label.addRole") //新增弹框名字
      },

      // 表单数据（无需赋值，由混入对象赋值）
      formField: {
        sysName: "",
        CompanyName: "", //{"ZH_CN":""},
        sysRegs: "",
        sysCode: "",
        sysVersion: ""
      },
      formField1: {
        pwd_express: "",
        pwd_express_desc: "",
        usr_errnums: "",
        usr_expires: "",
        loginType: this.$config.loginConfig.loginType
      },
      formField2: {
        useConfigisEnable: "", // 是否启用配置化
        useCacheisEnable: "", // 是否启用配置缓存
        iscacheDuration: "", // 缓存秒速
        fineReportUrl: "", // 帆软服务器路径
        fineReportUser: "",
        fineReportPwd: "",
        userId: this.$store.getters.orgInfo.userId || "", // 用户ID
        tableId: "", // 主键ID 编辑需传
        updateControlId: "", // 并发ID 编辑需传
        dataType: 10002, // 数据类型 系统设置10002 用户设置10003
        xmlString: {} // 保存JS字符串
      },
      // formField2中的JSON字段
      xmlStringJson: {},
      infos: {
        l0200400014: "保存成功",
        l0200400015: "保存失败",
        l0200300006: "获取菜单树失败!",
        l0200300007: "加载系统设置成功",
        l0200300008: "加载系统设置失败",
        l0200300009: "保存系统设置成功",
        l0200300010: "保存系统设置失败",
        l0200300011: "密码不符合密码规则",
        l9900000003: "您没有权限操作",
        l0200300012: "新密码不能与最近三次设置的密码相同"
      },
      //查询返回结果
      rows: ""
    };
  },
  watch: {
    popupsVisible(newV, oldV) {
      this.curPopupsVisible = newV;
      if (newV === true) {
        this.query();
      }
    }
  },
  created() {
    // 初始化加载到store
    this.query();
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name == "first") {
        this.query();
      }
      if (tab.name == "second" || tab.name === "three") {
        this.query1();
      }
      if (tab.name == "configuring") {
        this.query2();
      }
    },
    geterrtime(val) {
      this.errtime = val;
    },
    geterrnums(val) {
      this.errnums = val;
    },
    getblocktime(val) {
      this.blocktime = val;
    },
    getBeginTime(val) {
      this.beginTime = val;
    },
    getEndTime(val) {
      this.endTime = val;
    },
    getDate1(val) {
      this.date1 = val;
    },
    getDate2(val) {
      this.date2 = val;
    },
    getDate3(val) {
      this.date3 = val;
    },
    getBlockDay1(val) {
      this.blockDay1 = val;
    },
    getBlockDay2(val) {
      this.blockDay2 = val;
    },
    getBlockDay3(val) {
      this.blockDay3 = val;
    },
    getComponentCode1(val, txt, codeField, comType, popupsKey, textField) {
      if (comType === "propus" && !this.$utils.isEmpty(popupsKey)) {
        // 弹窗赋值
        // 根据popupsKey找到对应的弹窗key的弹窗组件
        var dynamicPopup = this.dynamicComponents.filter(
          o => o.compKey === popupsKey
        );
        if (dynamicPopup.length > 0) {
          if (dynamicPopup[0].popups && dynamicPopup[0].popups.state) {
            // 弹窗状态不是为已打开才进行计算
            dynamicPopup[0].popups.state = false;
            dynamicPopup[0].popups.key = codeField + this.$utils.generateId();
          }
        }
      }
      // 赋值
      if (codeField in this.formField1) {
        this.formField1[codeField] = val;
      }
      if (textField in this.formField1) {
        this.formField1[textField] = txt;
      }
    },
    getComponentCode2(val, txt, codeField, comType, popupsKey, textField) {
      if (comType === "propus" && !this.$utils.isEmpty(popupsKey)) {
        // 弹窗赋值
        // 根据popupsKey找到对应的弹窗key的弹窗组件
        var dynamicPopup = this.dynamicComponents.filter(
          o => o.compKey === popupsKey
        );
        if (dynamicPopup.length > 0) {
          if (dynamicPopup[0].popups && dynamicPopup[0].popups.state) {
            // 弹窗状态不是为已打开才进行计算
            dynamicPopup[0].popups.state = false;
            dynamicPopup[0].popups.key = codeField + this.$utils.generateId();
          }
        }
      }
      // 赋值
      if (codeField in this.formField2) {
        this.formField2[codeField] = val;
      }
      if (textField in this.formField2) {
        this.formField2[textField] = txt;
      }
    },
    //查询系统设置
    query() {
      const that = this;
      this.$store
        .dispatch("sysConfig/systemSetLoad", { datatype: "4" })
        .then(response => {
          let resData = "";
          if (JSON.stringify(response.rows) != "{}") {
            this.rows = response.rows;
            if(response.rows.xml_string){
              resData = JSON.parse(response.rows.xml_string);
            this.formField.CompanyName = resData.CompanyName.ZH_CN
              ? resData.CompanyName.ZH_CN
              : "";
            this.formField.sysName = resData.SysName.ZH_CN
              ? resData.SysName.ZH_CN
              : "";
            this.formField.sysRegs = resData.SysRegs.ZH_CN
              ? resData.SysRegs.ZH_CN
              : "";
            this.formField.sysCode = resData.SysCode;
            this.formField.sysVersion = resData.SysVersion;
            that.$store.dispatch(
              "sysConfig/setSystemVerson",
              resData.SysVersion
            );

            }

          }
        });
    },
    //保存系统设置
    save() {
      const that = this;
      var json1 = {
        SysName: {
          ZH_CN: that.formField.sysName,
          EN_US: "",
          JA_JP: ""
        },
        CompanyName: {
          ZH_CN: that.formField.CompanyName,
          EN_US: "",
          JA_JP: ""
        }, //{"ZH_CN":""},
        SysRegs: {
          ZH_CN: that.formField.sysRegs,
          EN_US: "",
          JA_JP: ""
        },
        SysCode: that.formField.sysCode,
        SysVersion: that.formField.sysVersion
        //  aboutsystem:{"apinfo":"","dbinfo":""},
        //  Language:"zh-CN",
        //  process_tree:"0",
        //  menu_tree:"0",
        //  processstart_tree:"0"
      };
      var saveform = {
        pwdexpress: that.rows.pwd_express || "",
        // pwdexpdesc: that.rows.pwd_express_desc || '',
        expires: that.rows.usr_expires || 30,
        errnums: that.rows.usr_errnums || 3,
        json: JSON.stringify(json1),
        datatype: "4"
      };
      this.$store
        .dispatch("sysConfig/systemSetSave", saveform)
        .then(response => {
          if (response.result == "1") {
            that.$message({
              message: this.$t("sys.tips.esTip5") /*保存成功*/,
              type: "success",
              duration: 2000
            });
            that.curPopupsVisible = false;
            that.$store.dispatch(
              "sysConfig/setSystemVerson",
              that.formField.sysCode
            );
          } else {
            let errInfo = "保存失败,请重试";
            if (that.infos[response.msg]) {
              errInfo = that.infos[response.msg];
            }
            that.$message({
              message: errInfo,
              type: "warning",
              duration: 2000
            });
          }
        })
        .catch(response => {
          let errInfo = "保存失败,请重试";
          if (that.infos[response.msg]) {
            errInfo = that.infos[response.msg];
          }

          that.$message({
            message: errInfo,
            type: "warning",
            duration: 2000
          });
          that.loading = false;
        });

      // }
    },
    //查询安全设置
    query1() {
      const that = this;
      this.$store
        .dispatch("sysConfig/systemSetLoad", { datatype: "5" })
        .then(response => {
          that.rows1 = response.rows;
          let resData = JSON.parse(response.rows.xml_string);
          that.formField1.pwd_express = that.rows1.pwd_express || "";
          that.formField1.pwd_express_desc = that.rows1.pwd_express_desc || "";
          that.formField1.usr_expires = that.rows1.usr_expires || "";
          that.formField1.usr_errnums = that.rows1.usr_errnums || "";
          //账号锁定
          that.errnums = that.rows1.usr_errnums || "";
          that.errtime = that.rows1.usr_inputtimes || "";
          that.blocktime = that.rows1.usr_blocktimes || "";
          that.beginTime = that.rows1.login_begin_time || "";
          that.endTime = that.rows1.login_end_time || "";
          if (that.rows1.block_rules) {
            let blockrule1 = response.rows.block_rules[0];
            let blockrule2 = response.rows.block_rules[1];
            let blockrule3 = response.rows.block_rules[2];

            if (blockrule1) {
              let D1 = [];
              D1.push(blockrule1.BEGIN_DATE);
              D1.push(blockrule1.END_DATE);
              that.date1 = D1.join(",");
              that.blockDay1 = blockrule1.BLOCK_DAYS;
            }
            if (blockrule2) {
              let D2 = [];
              D2.push(blockrule2.BEGIN_DATE);
              D2.push(blockrule2.END_DATE);
              that.date2 = D2.join(",");
              that.blockDay2 = blockrule2.BLOCK_DAYS;
            }
            if (blockrule3) {
              let D3 = [];
              D3.push(blockrule3.BEGIN_DATE);
              D3.push(blockrule3.END_DATE);
              that.date3 = D3.join(",");
              that.blockDay3 = blockrule3.BLOCK_DAYS;
            }
          }

          //认证模式
          that.safedouble = resData.safedouble;
          that.dycodelogin = resData.dycodelogin;
          that.weixinlogin = resData.weixinlogin;
          that.facelogin = resData.facelogin;
          that.adlogin = resData.adlogin;

          // 登录方式
          that.formField1.loginType = resData.loginType;

          //功能设置
          that.isSysSet = resData.syssetting;
          that.isPsdChange = resData.updatepwd;
          that.isExit = resData.logout;
        });
    },
    //保存安全设置
    save1() {
      const that = this;
      let json2 = {
        syssetting: true,
        updatepwd: that.isPsdChange,
        logout: true,
        menumgr: true,
        notice: false,
        safenormal: true,
        normallogin: that.normallogin,
        safedouble: that.safedouble,
        dycodelogin: that.dycodelogin,
        weixinlogin: that.weixinlogin,
        facelogin: that.facelogin,
        adlogin: that.adlogin,
        loginType: that.formField1.loginType
      };
      let blockrules = [];
      let date1 = that.date1 != "" ? that.date1.split(",") : "";
      let date2 = that.date2 != "" ? that.date2.split(",") : "";
      let date3 = that.date3 != "" ? that.date3.split(",") : "";
      let lockRule1 = {
        begin_date: date1[0] || "",
        end_date: date1[1] || "",
        block_days: that.blockDay1
      };
      let lockRule2 = {
        begin_date: date2[0] || "",
        end_date: date2[1] || "",
        block_days: that.blockDay2
      };
      let lockRule3 = {
        begin_date: date3[0] || "",
        end_date: date3[1] || "",
        block_days: that.blockDay3
      };

      blockrules.push(lockRule1);
      blockrules.push(lockRule2);
      blockrules.push(lockRule3);
      blockrules = JSON.stringify(blockrules);
      //  let blockrules1 = JSON.stringify(blockrules);
      //  console.log(blockrules1)
      let saveform = {
        blockrules: blockrules,
        pwdexpdesc: that.formField1.pwd_express_desc,
        pwdexpress: that.formField1.pwd_express,
        expires: that.formField1.usr_expires,
        errnums: that.formField1.usr_errnums,
        errnums: that.errnums,
        errtime: that.errtime,
        blocktime: that.blocktime,
        login_begin_time: that.beginTime,
        login_end_time: that.endTime,
        json: JSON.stringify(json2),
        datatype: "5" // 5：安全规则
      };

      this.$store
        .dispatch("sysConfig/systemSetSave", saveform)
        .then(response => {
          if (response.result == "1") {
            that.$message({
              message: this.$t("sys.tips.esTip5") /*保存成功*/,
              type: "success",
              duration: 2000
            });
            this.$store.dispatch("sysConfig/systemSetLoad", {
              datatype: saveform.datatype
            });
            that.curPopupsVisible = false;
          } else {
            let errInfo = "保存失败,请重试";
            if (that.infos[response.msg]) {
              errInfo = that.infos[response.msg];
            }
            that.$message({
              message: errInfo,
              type: "warning",
              duration: 2000
            });
          }
        })
        .catch(response => {
          let errInfo = "保存失败,请重试";
          if (that.infos[response.msg]) {
            errInfo = that.infos[response.msg];
          }

          that.$message({
            message: errInfo,
            type: "warning",
            duration: 2000
          });
          that.loading = false;
        });

      // }
    },
    // 配置信息查询
    query2() {
      let that = this;
      // 判断是否有用户ID
      if (typeof this.$store.getters.orgInfo.userId != "undefined") {
        const queryObj = {
          // api配置
          apiConfig: orgApis.proConfigDesktopQueryByPage,
          // 需要调用的API服务配置
          apiServices: [
            {
              // 表格中台返回网格的字段
              apiQueryRow: [
                "tableId",
                "dataType",
                "userId",
                "pwdExpress",
                "updateControlId"
              ]
            }
          ],
          // 条件/实体参数（变量），根据typeParam中的定义配置
          variables: {
            pageSize: 100,
            pageIndex: 1,
            // 当前中台使用的名称有dataInfo、info，具体查看API文档
            dataInfo: {
              userId: this.$store.getters.orgInfo.userId || "", // 用户ID
              dataType: 10002 // 数据类型 数字类型
            }
          }
        };
        // 转换了中台请求格式数据
        const paramD = this.$getParams(queryObj);
        // 调用中台API方法（可复用）
        this.$requestAPI(paramD).then(response => {
          if (response.result === "1") {
            let list = response.rows;
            if (list.length != 0) {
              // 编辑需要ID
              that.formField2.tableId = list[0].tableId;
              that.formField2.updateControlId = list[0].updateControlId;
              let json = JSON.parse(list[0].pwdExpress);
              that.xmlStringJson = json;
              if (JSON.stringify(json) != "{}") {
                // 是否启用配置化
                that.formField2.useConfigisEnable = json.useConfigisEnable;
                // 是否启用配置缓存
                that.formField2.useCacheisEnable = json.useCacheisEnable;
                // 缓存秒速
                that.formField2.iscacheDuration = json.iscacheDuration;
                // 帆软服务路径
                that.formField2.fineReportUrl = json.fineReportUrl;
                // 帆软服务账号
                that.formField2.fineReportUser = json.fineReportUser;
                // 帆软服务密码
                that.formField2.fineReportPwd = json.fineReportPwd;
              }
            } else {
              // 读取默认配置信息
              // 是否启用配置化
              if (that.$ConfigCache.CacheConfig.useConfig == true) {
                that.formField2.useConfigisEnable = "1";
              } else {
                that.formField2.useConfigisEnable = "0";
              }
              // 是否启用配置缓存
              if (that.$ConfigCache.CacheConfig.useCache == true) {
                that.formField2.useCacheisEnable = "1";
              } else {
                that.formField2.useCacheisEnable = "0";
              }
              // 缓存时长
              that.formField2.iscacheDuration =
                that.$ConfigCache.CacheConfig.cacheSeconds;
              // 帆软服务路径
              that.formField2.fineReportUrl =
                that.$config.fineReport.fineReportUrl;
              // 帆软服务账号
              that.formField2.fineReportUser =
                that.$config.fineReport.fineReportUser;
              // 帆软服务密码
              that.formField2.fineReportPwd =
                that.$config.fineReport.fineReportPwd;
            }
          } else {
            // 保存失败
            this.$message({
              message:
                "查询失败:" + response.msg,
              type: "warn",
              uration: 1000
            });
          }
        });
      } else {
        // 保存失败
        this.$message({
          message: "该账号没有用户ID请确认",
          type: "warn",
          uration: 1000
        });
      }
    },
    // 配置信息保存
    save2() {
      let that = this;
      that.xmlStringJson.iscacheDuration = this.formField2.iscacheDuration;
      that.xmlStringJson.fineReportUrl = this.formField2.fineReportUrl;
      that.xmlStringJson.fineReportUser = this.formField2.fineReportUser;
      that.xmlStringJson.fineReportPwd = this.formField2.fineReportPwd;
      that.xmlStringJson.useConfigisEnable = this.formField2.useConfigisEnable;
      that.xmlStringJson.useCacheisEnable = this.formField2.useCacheisEnable;
      that.formField2.xmlString = JSON.stringify(that.xmlStringJson);
      const queryObj = {
        // 保存mutation
        type: "mutation",
        // api配置
        apiConfig: orgApis.proConfigDesktopMutationSave,
        // 条件/实体参数（变量），根据typeParam中的定义配置
        variables: {
          // 当前中台使用的名称有dataInfo、info，具体查看API文档
          dataInfo: {
            tableId: that.formField2.tableId || "",
            dataType: 10002,
            userId: that.$store.getters.orgInfo.userId,
            xmlString: that.formField2.xmlString,
            updateControlId: that.formField2.updateControlId || ""
          }
        }
      };
      // 转换了中台请求格式数据
      var paramD = this.$getParams(queryObj);
      // 调用中台API方法（可复用）
      this.$requestAPI(paramD).then(response => {
        if (response.result === "1") {
          // 是否启用配置化
          if (that.formField2.useConfigisEnable == "1") {
            that.$ConfigCache.CacheConfig.useConfig = true;
          } else {
            that.$ConfigCache.CacheConfig.useConfig = false;
          }
          // 是否启用配置缓存
          if (that.formField2.useCacheisEnable == "1") {
            that.$ConfigCache.CacheConfig.useCache = true;
          } else {
            that.$ConfigCache.CacheConfig.useCache = false;
          }
          // 缓存时长
          that.$ConfigCache.CacheConfig.cacheSeconds =
            that.formField2.iscacheDuration;
          // 帆软配置
          that.$config.fineReport.fineReportUrl = that.formField2.fineReportUrl;
          that.$config.fineReport.fineReportUser =
            that.formField2.fineReportUser;
          that.$config.fineReport.fineReportPwd = that.formField2.fineReportPwd;
          // 保存成功
          this.$message({
            message: "保存成功",
            type: "success",
            uration: 1000
          });
          // 清除缓存
          storage.clear();
          that.curPopupsVisible = false;
        } else {
          // 保存失败
          this.$message({
            message:
              "保存失败：" + response.msg,
            type: "warn",
            uration: 1000
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped >
/deep/ .sysbottom {
  position: absolute;
  right: 12px;
  text-align: right;
  bottom: 12px;
}
/deep/ .el-tabs--border-card {
  height: auto;
}
.lock .el-col-2,
.lock .el-col-6 {
  float: none !important;
  display: inline-block;
}
.lock .el-col-14 {
  display: inline-block;
}
.lock /deep/ .el-input__inner {
  padding-left: 2px !important;
  padding-right: 0px !important;
  min-width: 0px !important;
}
.lock,
.vailComponentList,
.authenticationMode {
  line-height: 30px;
  font-size: 12px;
  font-weight: normal !important;
  color: #333333;
  padding-left: 10px;
  margin: 3px;
}
.noUseLockRight /deep/ .el-date-editor {
  width: calc(100% - 5px) !important;
}
.noUseLockLeft {
  width: 20%;
  float: left;
  text-align: right;
  padding: 3px;
}
.noUseLockRight {
  width: 80%;
  float: left;
  padding: 3px;
}
/deep/ .el-col.el-col-2 {
  .el-input.el-input--small.el-input--suffix {
    width: 100% !important;
  }
}
/deep/ .el-tabs__content {
  height: 450px;
  overflow: auto;
}
.datePart {
  margin-top: 7px;
}
/deep/.el-col-14 .el-icon-time:before {
  position: relative;
  left: 7px;
}
.note {
  font-size: 10px;
  font-weight: normal !important;
  color: red;
  padding-left: 10px;
}
/deep/.container-app {
  padding: 10px 0 0 0;
  background: #fff;
  margin: 0 10px;
}
/deep/.filter-params-e3s {
  background: #fff;
}
/deep/.filter-params {
  padding: 5px 5px 0 5px !important;
}
/deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none !important;
}
/deep/ .el-tabs__item.is-top {
  border-left: none;
}
</style>
