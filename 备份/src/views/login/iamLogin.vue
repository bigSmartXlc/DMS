<template>
  <div
    id="login-container"
    class="login-container"
    :style="note"
  >
    <el-form
      ref="loginForm"
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

      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handlePopover"
        :disabled="btnDisabled"
        class="iam-loginbtn"
      >{{btnText}}</el-button>

    </el-form>
  </div>
</template>
<script>
import { getToken } from '@/utils/auth' // 从Cookie中读取token
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      redirect: undefined,
      btnDisabled: false,
      btnText: this.$t('sys.login.iamLogin'),
      note: {
        backgroundImage: `url(${require("@/assets/login/" +
          this.$store.state.styleSheets.loginCss.loginBgUrl)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize:
          this.$store.state.styleSheets.loginCss.loginBgSize + "%",
        backgroundColor:
          "#" + this.$store.state.styleSheets.loginCss.loginBgColor
      },
      titleLable: {
        fontSize: this.$store.state.styleSheets.loginCss.titleFontSize + "px"
      },
      loading: false
    }
  },
  created() {
    const that = this
    this.initConfig();
    const code = that.$utils.getQueryVariable('code')
    const state = that.$utils.getQueryVariable('state')
    if (code && code.length > 0 && state && state.length > 0) {
      that.iamLogin(0, code, state)
    }
    // 判断是否已经登陆
    const hasToken = getToken()
    if (hasToken) {
      // 如果已经登陆则先退出登录
      that.$store.dispatch("user/logout").then(response => {
        location.href = that.$config.loginConfig.iamLoginOutUrl
        if (that.$utils.isIE() || that.$utils.isEdge()) {
          location.reload();
        }
      })
    }
    // 判断是否从IAM退出登录页面切换（是：跳转到，否：跳转到）
    if (document.referrer.indexOf('http/logout.do') > -1) {
      location.href = that.$config.loginConfig.iamLoginUrl
    }
  },
  activated() {
    this.initConfig()
  },
  methods: {
    ...mapMutations(["SET_THEMEINFO"]),
    handlePopover(e) {
      this.iamLogin(1)
    },
    iamLogin(type, code, state) {
      const that = this
      that.loading = true
      that.btnDisabled = true
      if (type === 0 && code && code.length > 0 && state && state.length > 0) {
        that.btnText = 'DMS正在验证登陆信息...'
        // IAM登录验证
        that.$store.dispatch("user/iamLogin", {code: code, state: state}).then(() => {
          that.$router.push({ path: that.redirect || "/" })
          that.btnText = '验证成功，正在跳转...'
          that.loading = false
          that.btnDisabled = false
        }).catch(response => {
          that.$message({
            message: 'DMS不存在该用户，请联系管理员',
            type: "warning",
            duration: 2000
          })
          setTimeout(function() {
            location.href = that.$config.loginConfig.iamLoginOutUrl
            that.loading = false
            that.btnDisabled = false
            that.btnText = this.$t('sys.login.iamLogin')
          }, 2000)
        })
      } else {
        that.gotoIAMLogin()
      }
    },
    gotoIAMLogin() {
      // IAM登录跳转
      location.href = this.$config.loginConfig.iamLoginUrl
      this.loading = false
      this.btnDisabled = false
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
    }
  }
}
</script>
<style scoped>
.login-container .login-form {
  min-height: 100px !important;
  top: 58% !important;
}
</style>
