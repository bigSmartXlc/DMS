<template>
  <div id="app" :data-theme="nowTheme.colorTheme">
    <router-view />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import storage from "@/utils/storage";
import { orgApis } from "@/api/apiList/org";
export default {
  name: "App",
  data() {
    return {
      // 提示框隐藏计时器
      toastSj: 0,
      // 导航显示方式
      navigationMode: false,
      formField: {
        userId: this.$store.getters.orgInfo.userId, // 用户ID
        dataType: 10003 // 数据类型 数字类型
      }
    };
  },
  computed: {
    ...mapGetters(["nowTheme", "menuStyle"])
  },
  beforeDestroy() {
    document.body.removeAttribute(
      "data-theme",
      this.nowTheme.colorTheme + "-theme"
    );
  },
  created() {
    this.bodyClick();
    if (this.$store.state.settings.showContent === true) {
      // 非只显示内页时读取系统配置信息
      this.$store.dispatch("styleSheets/productName");
    }
  },
  updated() {
    if (this.$store.state.settings.showContent === true) {
      // 非只显示内页时读取页面风格
      this.chickThemeColor(this.nowTheme.colorTheme)
    }
  },
  mounted() {
    if (this.$store.state.settings.showContent === true) {
      // 非只显示内页时读取页面风格
      const that = this
      this.colorThemequery()
      window.addEventListener("load", () => {
        // 滚动事件变为 scroll
        if (
          location.href.indexOf("/login") === -1 &&
          location.href.indexOf("/iamLogin") === -1 &&
          location.href.indexOf("manual=") !== -1
        ) {
          this.$store.dispatch("tagsView/delAllViews", this.$store);
        }
      });
    }
  },
  methods: {
    ...mapMutations(["SET_THEMEINFO"]),
    // 设置主题颜色
    chickThemeColor(val) {
      document.getElementsByTagName("body")[0].dataset.theme = val;
      // 判断显示的方式
      if (this.menuStyle.isHorizontal) {
        document.getElementsByTagName("body")[0].className =
          "isHorShowItemList";
      }
    },
    // 为body添加点击事件  用于点击空白处清除提示框
    bodyClick() {
      var that = this;
      document.body.addEventListener("click", function() {
        var warning = document.querySelectorAll(".el-message--warning"); // 警告
        var error = document.querySelectorAll(".el-message--error"); // 错误
        var success = document.querySelectorAll(".el-message--success"); // 成功
        var info = document.querySelectorAll(".el-message--info"); //  信息
        var warn = document.querySelectorAll(".el-message--warn"); // 提示
        // 警告
        if (
          warning.length === 1 ||
          info.length === 1 ||
          warn.length === 1 ||
          error.length === 1
        ) {
          //
          if (that.toastSj === 1) {
            if (warning[0] || error[0] || info[0] || success[0] || warn[0]) {
              that.$message.closeAll();
            }
            that.toastSj = 0;
          } else {
            that.toastSj++;
          }
        } else {
          that.toastSj = 0;
          // 成功
          if (success.length === 1) {
            that.$message.closeAll();
          }
        }
      });
    },
    // 颜色主题查询
    colorThemequery() {
      // 默认本地缓存皮肤设置
      var chickColor = storage.get("chickColor");
      if (chickColor) {
        this.SET_THEMEINFO(chickColor);
      }
      this.chickThemeColor(this.nowTheme.colorTheme); //获取主题色
      if (this.$store.getters.orgInfo.userId) {
        let that = this;
        const queryObj = {
          // api配置
          apiConfig: orgApis.proConfigDesktopQueryByPage,
          // 需要调用的API服务配置
          apiServices: [
            {
              // 表格中台返回网格的字段
              apiQueryRow: ["dataType", "userId", "pwdExpress"]
            }
          ],
          // 条件/实体参数（变量），根据typeParam中的定义配置
          variables: {
            pageSize: 100,
            pageIndex: 1,
            // 当前中台使用的名称有dataInfo、info，具体查看API文档
            dataInfo: this.formField
          }
        };
        // 转换了中台请求格式数据
        const paramD = this.$getParams(queryObj);
        // 调用中台API方法（可复用）
        this.$requestAPI(paramD).then(response => {
          if (response.result === "1") {
            let list = response.rows;
            if (list.length != 0) {
              that.formField.userId = list[0].userId;
              let json = JSON.parse(list[0].pwdExpress);
              // 判断是否有本地缓存皮肤设置
              if (!chickColor) {
                this.$nextTick(() => {
                  let queryColor = json.nowTheme;
                  if (queryColor) {
                    this.SET_THEMEINFO(queryColor);
                  }
                  this.chickThemeColor(queryColor); //获取主题色
                });
              }
            }
          } else {
            // 判断是否token过期
            if (response.msg != "l9900000001") {
              // 获取失败
              this.$message({
                message: "皮肤主题获取失败：" + response.msg,
                type: "warn",
                uration: 1000
              });
            }
          }
        });
      }
    }
  }
};
</script>


