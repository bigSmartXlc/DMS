<template>
  <div
    id="login-container"
    class="login-container"
    :style="note"
  >
    <!-- <lang-select
      :logo="true"
      class="right-menu-item hover-effect lang"
    /> -->
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
      :inline-message=true
    >
      <div class="title-container">
        <h3
          :style="titleLable"
          class="titleFont"
          :class="this.$store.state.styleSheets.isProduct +'title'"
        >
          {{$t('sys.login.title')}}
        </h3>
      </div>

      <el-form-item prop="username">
        <!-- <span class="svg-container">
          <svg-icon icon-class="user" />
        </span> -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          :placeholder="$t('sys.login.username')"
          name="username"
          type="text"
          tabindex="1"
          @blur="blurUserName"
        />
      </el-form-item>

      <el-form-item prop="password">
        <!-- <span class="svg-container">
          <svg-icon icon-class="password" />
        </span> -->
        <!--@keyup.enter.native="handleLogin"-->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          :placeholder="$t('sys.login.password')"
          name="password"
          tabindex="2"
          @keyup.enter.native="handlePopover"
        />
      </el-form-item>

      <el-form-item
        prop="vcode"
        v-if="vcode !== '' && vcode && vcode && vCodeType === '1'"
      >
        <el-input
          ref="vcode"
          v-model="loginForm.vcode"
          placeholder="请输入验证码"
          name="vcode"
          type="text"
          tabindex="3"
          class="val-input"
        />
        <img
          :src="vcode"
          class="val-img"
          @click="getVCode"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handlePopover"
        :disabled="btnDisabled"
      >{{$t('sys.login.logIn')}}</el-button>

      <!-- <el-popover
        placement="top"
        v-if="vCodeType === '2'"
        @show="getImageCheckCode"
        @hide="hidePopover"
        :disabled="popovDisabled"
        trigger="click"
      > -->

        <div
          id="verifyImage"
          style="width:340px;height:280px;padding:20px; background: #ffffff;position:absolute;top:0;left:10px;display:none;"
          :style="vstyle"
          @click="verifyImageClick"
        >
          <div style="width:300px;padding: 0px;height:200px;">
            <img
              alt=""
              id="bgImage"
            />
            <img
              alt=""
              id="cutImage"
              style="position: absolute;z-index: 999;"
            />
          </div>
          <el-slider
            :max="245"
            @input="changeData"
            @change="submitData"
            v-model="x"
            :show-tooltip="false"
          ></el-slider>
          <div style="color: #334433d3;">
            <span>拖动滑块完成验证</span>
            <span
              style="color:red;"
              id="timmer-num"
            ></span>
            <!-- <em class="el-icon-close" style=" cursor: pointer; float: right;margin-left: 10px;background-color: white;font-weight: 500;color: #ff0000bf; font-size:16px;"></em> -->
            <em
              class="el-icon-refresh"
              @click="getImageCheckCode"
              style=" cursor: pointer;float: right; font-size:16px;font-weight: 800;color: #409eff;"
            ></em>
          </div>
        </div>

        <!-- <el-button
          :loading="loading"
          type="primary"
          slot="reference"
          :disabled="btnDisabled"
          @click.native.prevent="handlePopover"
        >{{$t('sys.login.logIn')}}</el-button> -->
      <!-- </el-popover> -->
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { validUsername } from "@/utils/validate";
export default {
  name: "Login",
  components: {
    LangSelect: () => import("@/components/LangSelect")
  },
  data() {
    // 账号登录密码为空弹窗提示 如需使用 规则需添加 validator: validateUsername
    // const validateUsername = (rule, value, callback) => {
    //   if (!value) {
    //     callback(
    //       this.$message({
    //         message: this.$t("sys.login.promptUser"),
    //         type: "warning",
    //         duration: 2000
    //       })
    //     );
    //   } else {
    //     callback();
    //   }
    // };
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 1) {
    //     callback(
    //       this.$message({
    //         message: this.$t("sys.login.promptPass"),
    //         type: "warning",
    //         duration: 2000
    //       })
    //     );
    //   } else {
    //     callback();
    //   }
    // };
    return {
      // 1:验证码验证,2:滑块验证
      vCodeType: this.$config.loginConfig.vCodeType || "1",
      btnDisabled: false,
      loginForm: {
        username: "",
        password: "",
        vcode: "",
        clientid: "",
        slidercode: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [{ required: true, trigger: "blur", message: "密码不能为空" }]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      note: {
        backgroundImage: `url(${require("@/assets/login/" +
          this.$store.state.styleSheets.loginCss.loginBgUrl)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize:
          this.$store.state.styleSheets.loginCss.loginBgSize + "%",
        backgroundColor:
          "#" + this.$store.state.styleSheets.loginCss.loginBgColor
      },
      vstyle: {
        display: 'none'
      },
      titleLable: {
        fontSize: this.$store.state.styleSheets.loginCss.titleFontSize + "px"
      },
      // infos: {
      //   l0100100001: "用户名不能为空",
      //   l0100100002: "用户不存在",
      //   l0100100003: "用户禁用，请联系管理员",
      //   l0100100004: "用户名密码错误",
      //   l0100100006: "操作异常，请联系管理员",
      //   l0100100007:
      //     "登录失败超过限制次数，请联系管理员；或通过找回密码功能重置密码后再登录",
      //   l0100100008: "密码已过期,请通过【找回密码】重置",
      //   l0100100009: "用户已失效，请联系管理员",
      //   l0100100010: "用户未激活，请联系管理员",
      //   l0100100019: "验证码不能为空",
      //   l0100100020: "验证码失效",
      //   l0100100024: "验证码错误",
      //   l9900000041: "长时间未操作，请刷新页面."
      // },
      vcode: "",
      // 验证码是否第一次显示,进行提示判断
      boolInfo: true,
      // 滑块验证
      popovDisabled: true,
      x: 5,
      refeshTime: 30,
      timer1: null,
      timer2: null,
      clientid: null
    };
  },
  mounted() {
    this.automaticLogin();
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    const that = this;
    this.initConfig();
    document.onclick = function () {
      that.hidePopover();
    }
  },
  activated() {
    this.initConfig()
  },
  methods: {
    ...mapMutations(["SET_THEMEINFO"]),
    // 是否自动登录
    automaticLogin() {
      var that = this;
      var automatic = that.$utils.getQueryVariable('automatic');
      if (automatic) {
        //对密码进行Base64解码
        let Base64 = require('js-base64').Base64;
        that.loginForm.password = Base64.decode(unescape(that.$utils.getQueryVariable('uqt')));
        that.loginForm.username = decodeURI(that.$utils.getQueryVariable('username'));
        setTimeout(function() {
          that.handleLogin();
        }, 600);
      }
    },
    initConfig() {
      const that = this;
      that.SET_THEMEINFO('red');
      that.$store.dispatch("user/setSererTime", NaN);
      that.$store.dispatch("user/sysConfig", { type: "5" }).then(response => {
        if (response.result === "1") {
          if (response.currentTime) {
            that.$store.dispatch("user/setSererTime", response.currentTime);
          }
        }
      });

      // if (that.$config.loginConfig.validPassword === true) {
      //   that.$store
      //     .dispatch("sysConfig/systemSetLoad", { datatype: "5" })
      // }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin(cb) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          if (this.vCodeType === "2") {
            // 滑块验证
            delete this.loginForm.vcode;
          } else {
            // 验证码验证
            delete this.loginForm.slidercode;
          }
          // 记录密码强度是否符合
          if (this.$store.getters.accountConfig.pwd_express && this.$store.getters.accountConfig.pwd_express !== "") {
            const pattern = new RegExp(
              this.$store.getters.accountConfig.pwd_express
            );
            this.$store.dispatch("user/setPwdIsRuleFromLogin", pattern.test(this.loginForm.password) ? '1' : '0');
          } else {
            this.$store.dispatch("user/setPwdIsRuleFromLogin", '1');
          }
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              let that = this;
              if (typeof cb === "function") {
                cb.call(this, { result: "1" });
              }
              that.$router.push({ path: this.redirect || "/" });
              setTimeout(function() {
                that.loading = false;
              }, 5000);
            })
            .catch(response => {
              var errInfo = "登录失败，请重试[" + response.msg + "]";
              if (!response.msg) {
                errInfo = '无法连接到服务器，请联系管理员！';
              }
              if (this.$mpErrMsg.infos[response.msg]) {
                errInfo = this.$mpErrMsg.infos[response.msg];
              } else if (response.msg && response.msg.indexOf('l0100100149_') > -1 && this.$mpErrMsg.infos['l0100100149']) {
                const errs = response.msg.split('_')
                if (errs.length > 2) {
                  errInfo = this.$mpErrMsg.infos['l0100100149'].replace('{0}', errs[1]).replace('{1}', errs[2])
                }
              }
              if (response.vcode !== "" && response.vcode) {
                this.loginForm.clientid = response.clientid;
                this.vcode = response.vcode;
              }
              if (errInfo === this.$mpErrMsg.infos["l0100100019"] && this.boolInfo) {
                this.boolInfo = false;
              }else {
                this.$message({
                  message: errInfo,
                  type: "warning",
                  duration: 2000
                });
              }

              if (typeof cb === "function") {
                cb.call(this, response);
              }

              this.loading = false;
            });
        } else {
          if (
            this.loginForm.username === "" ||
            this.loginForm.password === ""
          ) {
            this.$message({
              message: "账号和密码不能为空.",
              type: "warning",
              duration: 2000
            });
          }
          return false;
        }
      });
    },
    // 获取验证码
    getVCode() {
      this.$store.dispatch("user/login", this.loginForm).catch(response => {
        if (response.vcode !== "" && response.vcode) {
          this.loginForm.clientid = response.clientid;
          this.vcode = response.vcode;
        }
      });
    },
    // 滑动数据
    changeData(v) {
      $("#cutImage").css("left", 20 + v);
    },
    blurUserName() {
      if (this.loginForm.username !== "") {
        this.$store
          .dispatch("user/checkUser", { username: this.loginForm.username })
          .then(response => {
            if (response.result === "1") {
              if (response.rows) {
                this.clientid = response.rows.clientid;
                this.loginForm.clientid = response.rows.clientid;
                this.vcode = response.rows.vcode;
              }
            }
          });
      }
    },
    submitData(v) {
      let _verifyImage = this;
      _verifyImage.loginForm.slidercode = v;
      _verifyImage.handleLogin(function(result) {
        if (result.result === "1") {
          _verifyImage.hidePopover();
        } else {
          if (result.msg === "l0100100024") {
            _verifyImage.showPopover();
            // 验证码错误或失效
            _verifyImage.getImageCheckCode();
          } else {
            _verifyImage.hidePopover();
          }
        }
      });
    },
    handlePopover(e) {
      e = e || event;
      this.stopFunc(e);
      let _self = this;
      _self.$refs.loginForm.validate(valid => {
        if (valid) {
          if (_self.vcode && _self.vcode !== "") {
            _self.showPopover();
          } else {
            _self.handleLogin();
          }
        } else {
          _self.hidePopover();
          if (
            _self.loginForm.username === "" ||
            _self.loginForm.password === ""
          ) {
            _self.$message({
              message: "账号和密码不能为空.",
              type: "warning",
              duration: 2000
            });
          }
          return false;
        }
      });
    },
    showPopover() {
      this.popovDisabled = false;
      this.btnDisabled = true;
      this.getImageCheckCode()
      $("#verifyImage").show();
    },
    hidePopover() {
      //清除定时
      clearInterval(window.verifyImagetimer1);
      clearInterval(window.verifyImagetimer2);
      this.popovDisabled = true;
      $("#verifyImage").hide();
      this.btnDisabled = false;
      $("#bgImage").attr("src", "data:image/jpg;base64,");
      $("#cutImage").attr("src", "data:image/jpg;base64,");
    },
    getImageCheckCode() {
      var _self = this;
      this.$store
        .dispatch("user/sliderCode", { clientId: this.clientid })
        .then(response => {
          if (response.result === "1") {
            _self.loginForm.clientid = response.rows.clientid;
            //倒计时
            $("#timmer-num").text(_self.refeshTime);
            //清除定时
            clearInterval(window.verifyImagetimer1);
            clearInterval(window.verifyImagetimer2);

            window.verifyImagetimer2 = setInterval(function() {
              var num = $("#timmer-num").text() * 1 - 1;
              $("#timmer-num").text(num >= 0 ? num : "0");
            }, 1000);

            //倒计时自动刷新
            window.verifyImagetimer1 = setInterval(function() {
              _self.getImageCheckCode();
            }, _self.refeshTime * 1000);

            _self.clientid = response.rows.clientid;
            $("#bgImage").attr(
              "src",
              "data:image/jpg;base64," + response.rows.bigImage
            );
            $("#cutImage").attr(
              "src",
              "data:image/jpg;base64," + response.rows.cutImage
            );
            $("#cutImage").css("top", response.rows.y + 20);
            $("#cutImage").css("left", 25);
            _self.x = 5;
          } else {
            _self.$message({
              message: response.msg,
              type: "warning",
              duration: 2000
            });
          }
        });
    },
    //定义stopPropagation 方法的使用，该方法将停止事件的传播，阻止它被分派到其他 Document 节点
    stopFunc(e) {
      e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    },
    verifyImageClick(e) {
      e = e || event;
      this.stopFunc(e);
    }
  }
};
</script>
<style scoped>
.val-input {
  width: 65% !important;
}
</style>

